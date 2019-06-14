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
        expect(card.front).to.equal('<p>Inline math expression: <eq><span class=\"katex\"><span class=\"katex-mathml\"><math><semantics><mrow><mi>c</mi><mo>=</mo><mo>±</mo><msqrt><mrow><msup><mi>a</mi><mn>2</mn></msup><mo>+</mo><msup><mi>b</mi><mn>2</mn></msup></mrow></msqrt></mrow><annotation encoding=\"application/x-tex\">c = \\pm\\sqrt{a^2 + b^2}</annotation></semantics></math></span><span class=\"katex-html\" aria-hidden=\"true\"><span class=\"base\"><span class=\"strut\" style=\"height:0.43056em;vertical-align:0em;\"></span><span class=\"mord mathdefault\">c</span><span class=\"mspace\" style=\"margin-right:0.2777777777777778em;\"></span><span class=\"mrel\">=</span><span class=\"mspace\" style=\"margin-right:0.2777777777777778em;\"></span></span><span class=\"base\"><span class=\"strut\" style=\"height:1.04em;vertical-align:-0.12661100000000003em;\"></span><span class=\"mord\">±</span><span class=\"mord sqrt\"><span class=\"vlist-t vlist-t2\"><span class=\"vlist-r\"><span class=\"vlist\" style=\"height:0.913389em;\"><span class=\"svg-align\" style=\"top:-3em;\"><span class=\"pstrut\" style=\"height:3em;\"></span><span class=\"mord\" style=\"padding-left:0.833em;\"><span class=\"mord\"><span class=\"mord mathdefault\">a</span><span class=\"msupsub\"><span class=\"vlist-t\"><span class=\"vlist-r\"><span class=\"vlist\" style=\"height:0.740108em;\"><span style=\"top:-2.9890000000000003em;margin-right:0.05em;\"><span class=\"pstrut\" style=\"height:2.7em;\"></span><span class=\"sizing reset-size6 size3 mtight\"><span class=\"mord mtight\">2</span></span></span></span></span></span></span></span><span class=\"mspace\" style=\"margin-right:0.2222222222222222em;\"></span><span class=\"mbin\">+</span><span class=\"mspace\" style=\"margin-right:0.2222222222222222em;\"></span><span class=\"mord\"><span class=\"mord mathdefault\">b</span><span class=\"msupsub\"><span class=\"vlist-t\"><span class=\"vlist-r\"><span class=\"vlist\" style=\"height:0.740108em;\"><span style=\"top:-2.9890000000000003em;margin-right:0.05em;\"><span class=\"pstrut\" style=\"height:2.7em;\"></span><span class=\"sizing reset-size6 size3 mtight\"><span class=\"mord mtight\">2</span></span></span></span></span></span></span></span></span></span><span style=\"top:-2.873389em;\"><span class=\"pstrut\" style=\"height:3em;\"></span><span class=\"hide-tail\" style=\"min-width:0.853em;height:1.08em;\"><svg width=\"400em\" height=\"1.08em\" viewBox=\"0 0 400000 1080\" preserveAspectRatio=\"xMinYMin slice\"><path d=\"M95,702c-2.7,0,-7.17,-2.7,-13.5,-8c-5.8,-5.3,-9.5,\n-10,-9.5,-14c0,-2,0.3,-3.3,1,-4c1.3,-2.7,23.83,-20.7,67.5,-54c44.2,-33.3,65.8,\n-50.3,66.5,-51c1.3,-1.3,3,-2,5,-2c4.7,0,8.7,3.3,12,10s173,378,173,378c0.7,0,\n35.3,-71,104,-213c68.7,-142,137.5,-285,206.5,-429c69,-144,104.5,-217.7,106.5,\n-221c5.3,-9.3,12,-14,20,-14H400000v40H845.2724s-225.272,467,-225.272,467\ns-235,486,-235,486c-2.7,4.7,-9,7,-19,7c-6,0,-10,-1,-12,-3s-194,-422,-194,-422\ns-65,47,-65,47z M834 80H400000v40H845z\"></path></svg></span></span></span><span class=\"vlist-s\">​</span></span><span class=\"vlist-r\"><span class=\"vlist\" style=\"height:0.12661100000000003em;\"><span></span></span></span></span></span></span></span></span></eq></p>');
        expect(card.back).to.equal("<p>back 1</p>");

        card = section.cards[1]
        expect(card.front).to.equal('<p>Block math expression:</p><section><eqn><span class=\"katex-display\"><span class=\"katex\"><span class=\"katex-mathml\"><math><semantics><mrow><mi>y</mi><mo stretchy=\"false\">(</mo><mi>x</mi><mo stretchy=\"false\">)</mo><mo>=</mo><mi>a</mi><mi>x</mi><mo>+</mo><mi>b</mi></mrow><annotation encoding=\"application/x-tex\"> y(x) = ax + b </annotation></semantics></math></span><span class=\"katex-html\" aria-hidden=\"true\"><span class=\"base\"><span class=\"strut\" style=\"height:1em;vertical-align:-0.25em;\"></span><span class=\"mord mathdefault\" style=\"margin-right:0.03588em;\">y</span><span class=\"mopen\">(</span><span class=\"mord mathdefault\">x</span><span class=\"mclose\">)</span><span class=\"mspace\" style=\"margin-right:0.2777777777777778em;\"></span><span class=\"mrel\">=</span><span class=\"mspace\" style=\"margin-right:0.2777777777777778em;\"></span></span><span class=\"base\"><span class=\"strut\" style=\"height:0.66666em;vertical-align:-0.08333em;\"></span><span class=\"mord mathdefault\">a</span><span class=\"mord mathdefault\">x</span><span class=\"mspace\" style=\"margin-right:0.2222222222222222em;\"></span><span class=\"mbin\">+</span><span class=\"mspace\" style=\"margin-right:0.2222222222222222em;\"></span></span><span class=\"base\"><span class=\"strut\" style=\"height:0.69444em;vertical-align:0em;\"></span><span class=\"mord mathdefault\">b</span></span></span></span></span></eqn></section>');
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

    it('can process embedded table', () => {
        let text = `
# title
deck description

## section
section description

---

Card with a table in the front

| Column 1 | Column 2 |
| -------- | -------- |
| value 1  | value 2  |

?

back 1

---

front 2

?

Card with a table in the back

| Column 1 | Column 2 |
| -------- | -------- |
| value 1  | value 2  |

---
`
        let deck = app.parse(text);
        expect(deck.sections.length).to.equal(1);

        let section = deck.sections[0];
        expect(section.cards.length).to.equal(2);

        let card = section.cards[0];
        expect(card.front).to.equal("<p>Card with a table in the front</p><table>\n<thead>\n<tr>\n<th>Column 1</th>\n<th>Column 2</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>value 1</td>\n<td>value 2</td>\n</tr>\n</tbody>\n</table>");
        expect(card.back).to.equal("<p>back 1</p>");

        card = section.cards[1];
        expect(card.front).to.equal("<p>front 2</p>");
        expect(card.back).to.equal("<p>back 2</p>");
    });
});
