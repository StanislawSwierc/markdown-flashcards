import AnkiExport from "anki-apkg-export";
import * as app from "./app";
import { promises as fs } from "fs";
import * as path from "path";
import * as jsdom from "jsdom";
import * as crypto from "crypto"
import fetch from "node-fetch";
import * as isUrl from "is-url"

export async function fromFile(path: string): Promise<Buffer> {
    return null;
}

export async function fromUrl(url: string): Promise<Buffer> {
    let response = await fetch(url);
    if (!response.ok) {
        throw new Error(
            `Invalid status ${response.status} ${response.statusText}: ${response.url}`);
    }

    let id = crypto.createHash('md5').update(url).digest('hex');
    if (url.startsWith("https://raw.githubusercontent.com/")) {
        id = url.replace(/https:\/\/raw\.githubusercontent\.com\/([^\/]+)\/([^\/]+)\/.*/,
            "$1_$2_");
    }

    let text = await response.text();
    let apkg = await transform(text, {
        id: id,
        url: url,
        footer: true
    });
    return apkg;
}

export type ExportOptions = {
    /**
     * id identifies the package with all its resources.
     */
    id: string;

    /**
     * url sets the value used in resolution of relative URLs within the
     * document and the same-origin restrictions and referrer used while
     * fetching subresources.
     * It defaults to "about:blank".
     */
    url: string;

    /**
     * footer controls whether each card should be decorated with a footer.
     */
    footer?: boolean;
};

interface ExportContext {
    package: AnkiExport;
    media: { [key: string]: string; }
};

// apkg.save()
//   .then(zip => {
//     fs.writeFileSync('./output.apkg', zip, 'binary');
//     console.log(`Package has been generated: output.pkg`);
//   })
//   .catch(err => console.log(err.stack || err));
export async function transform(
    text: string,
    options?: ExportOptions): Promise<Buffer> {


    let footer = "";
    if (options
        && options.footer
        && options.url
        && options.url.startsWith("https://raw.githubusercontent.com/")) {
        let editUrl = options.url.replace(/https:\/\/raw\.githubusercontent\.com\/([^\/]+)\/([^\/]+)/,
            "https://github.com/$1/$2/blob");

        footer = `
<hr>
<p style="text-align:center">
    <a href="${editUrl}">
        <button><i class="fa fa-github"></i> edit</button>
    </a>
</p>
        `;
    }

    let template = {
        questionFormat: `
<div class="markdown-body">
    {{Front}}
</div>
`,
        answerFormat: `
<div class="markdown-body">
    {{Front}}
    <hr id="answer">
    {{Back}}
    ${footer}
</div>
`,
        css: `
@import url("_css_github-markdown.css");
@import url("_css_katex.css");
@import url("_css_highlightjs-github.css");
@import url("_css_font-awesome.min.css");

audio::-webkit-media-controls-current-time-display {
    display: none;
}

audio::-webkit-media-controls-time-remaining-display {
    display: none;
}

.card {
    font-size: 20px;
    background-color: white;
}
`
    };

    let deck = app.parse(text);
    let apkg = new AnkiExport(deck.title, template);


    let context: ExportContext = {
        package: apkg,
        media: {}
    };

    // Add media
    apkg.addMedia("_css_github-markdown.css", await fs.readFile(
        "./node_modules/github-markdown-css/github-markdown.css"));
    apkg.addMedia("_css_highlightjs-github.css", await fs.readFile(
        "./node_modules/highlight.js/styles/github.css"));

    let content = await fs.readFile(
        "./node_modules/katex/dist/katex.css", "utf-8");
    content = content.replace(/url\(fonts\//g, "url(_fonts_");
    apkg.addMedia("_css_katex.css", content);

    // Flatten structure as Anki does not support nested directories.
    let fonts = await fs.readdir("./node_modules/katex/dist/fonts");
    for (let font of fonts) {
        let content = await fs.readFile(
            path.join("./node_modules/katex/dist/fonts/", font));
        apkg.addMedia(`_fonts_${font}`, content);
    }

    content = await fs.readFile(
        "./node_modules/font-awesome/css/font-awesome.min.css", "utf-8");
    content = content.replace(/url\('\.\.\/fonts\//g, "url('_fonts_");
    apkg.addMedia("_css_font-awesome.min.css", content);

    // Flatten structure as Anki does not support nested directories.
    fonts = await fs.readdir("./node_modules/font-awesome/fonts");
    for (let font of fonts) {
        let content = await fs.readFile(
            path.join("./node_modules/font-awesome/fonts/", font));
        apkg.addMedia(`_fonts_${font}`, content);
    }

    for (let section of deck.sections) {
        let tags = [section.name];
        for (let card of section.cards) {

            apkg.addCard(
                await transformHtml(card.front, context, options),
                await transformHtml(card.back, context, options)
            );
        }
    }


    // apkg.addCard('card #3 with image <img src="anki.png" />', 'card #3 back');

    return apkg.save();
}



async function transformHtml(
    html: string,
    context: ExportContext,
    options: ExportOptions): Promise<string> {

    let dom = new jsdom.JSDOM(html, {
        url: options.url
    });

    let imgs = dom.window.document.querySelectorAll("img");
    for (let img of Array.from(imgs)) {
        if (!isUrl(img.src)) {
            console.warn(`Image src is not a valid URL: ${img.src}`)
            continue;
        }

        if (img.src in context.media) {
            img.src = context.media[img.src];
        } else {
            try {
                let mediaId = options.id + Object.keys(context.media).length.toString();

                let response = await fetch(img.src);
                if (!response.ok) {
                    throw new Error(
                        `Invalid status ${response.status} ${response.statusText}: ${response.url}`);
                }
                let imgBlob = await response.arrayBuffer();

                context.package.addMedia(mediaId, imgBlob);
                context.media[img.src] = mediaId;
                img.src = mediaId;
            } catch (e) {
                console.warn(e);
            }
        }
    }

    return dom.serialize();
}
