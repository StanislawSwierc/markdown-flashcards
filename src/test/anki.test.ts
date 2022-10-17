import { expect } from 'chai';
import * as anki from '../anki';
import { promises as fs } from "fs";
import * as fetchMock from "fetch-mock";

describe("fromUrl", () => {
    it("executes fetch", async () => {
        let baseUrl = "https://raw.githubusercontent.com/StanislawSwierc/markdown-flashcards/master/";

        //fetchMock.get("*", url => fs.readFile(url.replace(baseUrl, "../"), "utf8"));
        let buffer = await anki.fromUrl(baseUrl + "decks/Markdown.md");
        //fetchMock.restore();

        await fs.writeFile("../decks/Markdown.apkg", buffer, 'binary');
    }).timeout(5000);
});

describe('anki', () => {
    it('can transform deck', async () => {
        let text = `
# title
deck description

## section
section description

---

front

?

back

---
`
        let buffer = await anki.transform(text);

        expect(buffer.length).to.greaterThan(0);

        await fs.writeFile("./test/anki.test.apkg", buffer, 'binary');
    });

    it('can transform Markdown deck', async () => {
        let text = await fs.readFile("/Users/stansw/src/markdown-flashcards/decks/Blackjack.md", 'utf-8');

        let buffer = await anki.transform(text, { id:"blackjack", url: "https://localhost"});

        expect(buffer.length).to.greaterThan(0);

        await fs.writeFile("/Users/stansw/src/markdown-flashcards/decks/Blackjack.apkg", buffer, 'binary');
    });
});
