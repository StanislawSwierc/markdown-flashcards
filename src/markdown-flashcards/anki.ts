import AnkiExport from "anki-apkg-export"
import * as app from "./app"
import * as fs from "fs"

// apkg.save()
//   .then(zip => {
//     fs.writeFileSync('./output.apkg', zip, 'binary');
//     console.log(`Package has been generated: output.pkg`);
//   })
//   .catch(err => console.log(err.stack || err));
export async function transform(text: string): Promise<Buffer> {
    let markdownCSS = await fs.promises.readFile('./node_modules/github-markdown-css/github-markdown.css', 'utf8');
    let katexCSS = await fs.promises.readFile('./node_modules/katex/dist/katex.min.css', 'utf8');
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
.card {
    font-size: 20px;
    background-color: white;
}

${markdownCSS}
${katexCSS}
`
    }


    let deck = app.parse(text);
    let apkg = new AnkiExport(deck.title, template);


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