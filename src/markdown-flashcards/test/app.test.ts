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

    it('can process cards with emojis', () => {
        let text = `
---

front :question:

:question:

back :question:

---

front :grey_question:

:grey_question:

back :grey_question:

---

front :arrow_right_hook:

:arrow_right_hook:

back :arrow_right_hook:

---
`
        let deck = app.parse(text);
        expect(deck.sections.length).to.equal(1);

        let section = deck.sections[0];
        expect(section.cards.length).to.equal(3);

        let card = section.cards[0]
        expect(card.front).to.equal("<p>front ❓</p>");
        expect(card.back).to.equal("<p>back ❓</p>");

        card = section.cards[1]
        expect(card.front).to.equal("<p>front ❔</p>");
        expect(card.back).to.equal("<p>back ❔</p>");

        card = section.cards[2]
        expect(card.front).to.equal("<p>front ↪️</p>");
        expect(card.back).to.equal("<p>back ↪️</p>");
    })

    it('can process cards with math equations', () => {
        let text = `
---

Inline math expression: $c = \\pm\\sqrt{a^2 + b^2}$

?

back 1

---

Block math expression:

$$ y(x) = ax + b $$

?

back 2

---
`
        let deck = app.parse(text);
        expect(deck.sections.length).to.equal(1);

        let section = deck.sections[0];
        expect(section.cards.length).to.equal(2);

        let card = section.cards[0]
        expect(card.front).to.equal('<p>Inline math expression: <math><mi>y</mi><mfenced open="(" close=")"><mi>x</mi></mfenced><mo>=</mo><mrow><mi>a</mi><mi>x</mi></mrow><mo>+</mo><mi>b</mi></math></p>');
        expect(card.back).to.equal("<p>back 1</p>");

        card = section.cards[1]
        expect(card.front).to.equal('<p>Block math expression:</p><math display="block"><mi>y</mi><mfenced open="(" close=")"><mi>x</mi></mfenced><mo>=</mo><mrow><mi>a</mi><mi>x</mi></mrow><mo>+</mo><mi>b</mi></math>');
        expect(card.back).to.equal("<p>back 2</p>");
    })

    it('can process canonical deck with table', () => {
        let text = `
# title
deck description

## section
section description

| Front   | Back    | Extra   |
| ------- | ------- | ------- |
| front 1 | back 1  | extra 1 |
| front 2 | back 2  | extra 2 |
`
        let deck = app.parse(text);
        expect(deck.title).to.equal("title");
        expect(deck.description).to.equal("<p>deck description</p>");
        expect(deck.sections.length).to.equal(1);

        let section = deck.sections[0];
        expect(section.cards.length).to.equal(2);

        let card = section.cards[0];
        expect(card.front).to.equal("<p>front 1</p>");
        expect(card.back).to.equal("<p>back 1</p><p>extra 1</p>");

        card = section.cards[1];
        expect(card.front).to.equal("<p>front 2</p>");
        expect(card.back).to.equal("<p>back 2</p><p>extra 2</p>");
    });
});
