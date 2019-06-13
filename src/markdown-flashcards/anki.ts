import AnkiExport from "anki-apkg-export"
import * as app from "./app"
import * as fs from "fs"
import * as path from "path"

// apkg.save()
//   .then(zip => {
//     fs.writeFileSync('./output.apkg', zip, 'binary');
//     console.log(`Package has been generated: output.pkg`);
//   })
//   .catch(err => console.log(err.stack || err));
export async function transform(text: string): Promise<Buffer> {
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

.card {
    font-size: 20px;
    background-color: white;
}
`
    }

    let deck = app.parse(text);
    let apkg = new AnkiExport(deck.title, template);


    // Add media
    apkg.addMedia('_markdown_base.css', await fs.promises.readFile(
        './node_modules/github-markdown-css/github-markdown.css'));

    let content = await fs.promises.readFile(
        './node_modules/katex/dist/katex.css', 'utf-8');
    content = content.replace(/url\(fonts\//g, "url(_fonts_");
    apkg.addMedia('_markdown_katex.css', content);

    let fonts = await fs.promises.readdir(
        './node_modules/katex/dist/fonts');
    for (let font of fonts) {
        let content = await fs.promises.readFile(
           path.join('./node_modules/katex/dist/fonts/', font));
        apkg.addMedia(`_fonts_${font}`, content);
    }

    for (let section of deck.sections) {
        let tags = [section];
        for (let card of section.cards) {
            apkg.addCard(
                card.front,
                card.back,
                tags,
            )
        }
    }


    // apkg.addCard('card #3 with image <img src="anki.png" />', 'card #3 back');

    return apkg.save();
}