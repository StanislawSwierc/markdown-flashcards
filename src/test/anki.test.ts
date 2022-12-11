import { expect } from 'chai';
import * as anki from '../anki';
import { promises as fs } from "fs";
import * as fetchMock from "fetch-mock";
import * as path from "path";

describe("fromUrl", function () {

    this.retries(4);


    it("executes fetch", async () => {
        let baseUrl = "https://raw.githubusercontent.com/StanislawSwierc/" +
            "markdown-flashcards/master/";

        //fetchMock.get("*", url => fs.readFile(url.replace(baseUrl, "../"), "utf8"));
        let buffer = await anki.fromUrl(new URL(baseUrl + "decks/Markdown.md"));
        //fetchMock.restore();

        await fs.writeFile("../decks/Markdown.apkg", buffer, 'binary');
    }).timeout(5000);
});

describe('anki', () => {
    it('can transform deck from string', async function () {
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
        let buffer = await anki.fromString(text);

        expect(buffer.length).to.greaterThan(0);
    }).timeout(5000);

    it('can transform Markdown deck', async function () {
        let deckPath = path.resolve(path.dirname(this.test.file), "../../../decks/Markdown.md");
        let buffer = await anki.fromPath(deckPath);

        expect(buffer.length).to.greaterThan(0);

        let apkgPath = path.resolve(path.dirname(this.test.file), "Markdown.apkg");
        await fs.writeFile(apkgPath, buffer, 'binary');
    }).timeout(10000);
});
