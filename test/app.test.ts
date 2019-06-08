import { expect } from 'chai';
import * as app from '../app';

// https://medium.com/@FizzyInTheHall/run-typescript-mocha-tests-in-visual-studio-code-58e62a173575

describe('parse', () => {
    it('can process canonical deck', () => {
        let text = `
# title
deck description

## section
section description

---

front 1

?   

back 1

---

front 2

?   

back 2

---
`
        let deck = app.parse(text);
        expect(deck.title).to.equal("title");
        expect(deck.description).to.equal("<p>deck description</p>");
        expect(deck.sections.length).to.equal(1);

        let section = deck.sections[0];
        expect(section.cards.length).to.equal(2);

        let card = section.cards[0];
        expect(card.front).to.equal("<p>front 1</p>");
        expect(card.back).to.equal("<p>back 1</p>");

        card = section.cards[1];
        expect(card.front).to.equal("<p>front 2</p>");
        expect(card.back).to.equal("<p>back 2</p>");
    });

    it('can process single card with trailing whitespace', () => {
        let text = `
---

front

? 

back

---


`
        let deck = app.parse(text);
        expect(deck.sections.length).to.equal(1);

        let section = deck.sections[0];
        expect(section.cards.length).to.equal(1);
    });
});
