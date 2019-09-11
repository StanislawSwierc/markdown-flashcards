import AnkiExport from "anki-apkg-export";
import * as app from "./app";
import { promises as fs } from "fs";
import * as path from "path";
import * as jsdom from "jsdom";
//import fetch, { FetchError } from "node-fetch";

export async function fromFile(path: string): Promise<Buffer> {
    return null;
}

export async function fromUrl(url: string): Promise<Buffer> {
    let response = await fetch(url);
    if (!response.ok) {
        throw new Error(
            `Invalid status ${response.status} ${response.statusText}: ${url}`);
    }
    let text = await response.text();
    let apkg = await transform(text, { 
        url: url,
        footer: true
    });
    return apkg;
}

export type ExportOptions = {
    /**
     * url sets the value used in resolution of relative URLs within the
     * document and the same-origin restrictions and referrer used while
     * fetching subresources.
     * It defaults to "about:blank".
     */
    url?: string;

    /**
     * footer controls whether each card should be decorated with a footer.
     */
    footer?: boolean;
};

type ExportContext = {
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

.card {
    font-size: 20px;
    background-color: white;
}
`
    };

    let deck = app.parse(text);
    let apkg = new AnkiExport(deck.title, template);


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
        let tags = [section];
        for (let card of section.cards) {

            apkg.addCard(
                card.front,
                card.back,
                tags,
            );
        }
    }


    // apkg.addCard('card #3 with image <img src="anki.png" />', 'card #3 back');

    return apkg.save();
}



function transformHtml(
    html: string,
    context: ExportContext,
    options: ExportOptions): string {

    let dom = new jsdom.JSDOM(html, {
        url: options.url
    });

    let imgs = dom.window.document.querySelectorAll("img");
    for (let img of Array.from(imgs)) {
        console.error("lol");
    }

    return "";
}
/*

This is what we can use to style audio tag in the Anki app.

<!DOCTYPE html>
<html>
<head>
	 <style>

audio::-webkit-media-controls-current-time-display {
    display: none;
}
audio::-webkit-media-controls-time-remaining-display {
    display: none;
}


     </style>
</head>
<body>

<audio id="myAudio" controls controlsList="nodownload">
  <source src="horse.ogg" type="audio/ogg">
  <source src="horse.mp3" type="audio/mpeg">
  Your browser does not support the audio element.
</audio>


</body>
</html>

*/
