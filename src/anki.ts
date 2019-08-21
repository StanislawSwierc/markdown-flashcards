import AnkiExport from "anki-apkg-export";
import * as app from "./app";
import * as fs from "fs";
import * as path from "path";
import * as jsdom from "jsdom";
import fetch from "node-fetch";

import * as fetchMock from "fetch-mock";

export async function fromFile(path: string): Promise<Buffer> {
    return null;
}

export async function fromUrl(url: string): Promise<Buffer> {

    fetchMock.get('*', { hello: 'world' });

    let response = await fetch(url);
    if (response.ok) {
        let buffer = await response.buffer();
        return buffer;
    }
    fetchMock.restore();

    return null;
}



export type ExportOptions = {
    /**
     * url sets the value used in resolution of relative URLs within the
     * document and the same-origin restrictions and referrer used while
     * fetching subresources.
     * It defaults to "about:blank".
     */
    url?: string;
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
</div>
`,
        css: `
@import url("_markdown_base.css");
@import url("_markdown_katex.css");
@import url("_markdown_highlight.css");

.card {
    font-size: 20px;
    background-color: white;
}
`
    };

    let deck = app.parse(text);
    let apkg = new AnkiExport(deck.title, template);


    // Add media
    apkg.addMedia("_markdown_base.css", await fs.promises.readFile(
        "./node_modules/github-markdown-css/github-markdown.css"));
    apkg.addMedia("_markdown_highlight.css", await fs.promises.readFile(
        "./node_modules/highlight.js/styles/github.css"));

    let content = await fs.promises.readFile(
        "./node_modules/katex/dist/katex.css", "utf-8");
    content = content.replace(/url\(fonts\//g, "url(_fonts_");
    apkg.addMedia("_markdown_katex.css", content);

    let fonts = await fs.promises.readdir(
        "./node_modules/katex/dist/fonts");
    for (let font of fonts) {
        let content = await fs.promises.readFile(
            path.join("./node_modules/katex/dist/fonts/", font));
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
