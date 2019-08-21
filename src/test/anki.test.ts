import { expect } from 'chai';
import * as anki from '../anki';
import { promises as fs } from "fs";
import * as fetchMock from "fetch-mock";

describe("fromUrl", () => {
    it("executes fetch", async () => {

        let buffer = await anki.fromUrl("http://examplsldkfjsdlfkjsdlfjsdlfkje.com");
    




    });
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
        let text = await fs.readFile("../../decks/Markdown.md", 'utf-8');

        let buffer = await anki.transform(text);

        expect(buffer.length).to.greaterThan(0);

        await fs.writeFile("../../decks/Markdown.apkg", buffer, 'binary');
    });
});
