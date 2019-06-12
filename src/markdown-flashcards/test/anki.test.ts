import { expect } from 'chai';
import * as anki from '../anki';
import { promises as fs } from "fs"


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
});
