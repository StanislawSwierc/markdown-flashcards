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
        expect(card.back).to.equal("<p>back break</p>");
    });

    it('card with soft line breaks around separator', () => {
        let text = `
___
regular
?
back
___
indented
   ?   
back
___
escaped
\\?
?
back
___
followed
? by text
?
back
___
question
:question:
back
___
`
        let deck = app.parse(text);
        expect(deck.sections.length).to.equal(1);

        let section = deck.sections[0];
        expect(section.cards.length).to.equal(5);

        expect(section.cards[0].front).to.equal("<p>regular</p>");
        expect(section.cards[0].back).to.equal("<p>back</p>");

        expect(section.cards[1].front).to.equal("<p>indented</p>");
        expect(section.cards[1].back).to.equal("<p>back</p>");

        expect(section.cards[2].front).to.equal("<p>escaped\n?</p>");
        expect(section.cards[2].back).to.equal("<p>back</p>");

        expect(section.cards[3].front).to.equal("<p>followed\n? by text</p>");
        expect(section.cards[3].back).to.equal("<p>back</p>");

        expect(section.cards[4].front).to.equal("<p>question</p>");
        expect(section.cards[4].back).to.equal("<p>back</p>");
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

front ↪

↪

back ↪

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
        expect(section.cards.length).to.equal(4);

        let card = section.cards[0]
        expect(card.front).to.equal("<p>front ↪</p>");
        expect(card.back).to.equal("<p>back ↪</p>");

        card = section.cards[1]
        expect(card.front).to.equal("<p>front ❓</p>");
        expect(card.back).to.equal("<p>back ❓</p>");

        card = section.cards[2]
        expect(card.front).to.equal("<p>front ❔</p>");
        expect(card.back).to.equal("<p>back ❔</p>");

        card = section.cards[3]
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
        expect(card.front).to.equal('<p>Inline math expression: <eq><span class=\"katex\"><span class=\"katex-mathml\"><math xmlns=\"http://www.w3.org/1998/Math/MathML\"><semantics><mrow><mi>c</mi><mo>=</mo><mo>±</mo><msqrt><mrow><msup><mi>a</mi><mn>2</mn></msup><mo>+</mo><msup><mi>b</mi><mn>2</mn></msup></mrow></msqrt></mrow><annotation encoding=\"application/x-tex\">c = \\pm\\sqrt{a^2 + b^2}</annotation></semantics></math></span><span class=\"katex-html\" aria-hidden=\"true\"><span class=\"base\"><span class=\"strut\" style=\"height:0.4306em;\"></span><span class=\"mord mathnormal\">c</span><span class=\"mspace\" style=\"margin-right:0.2778em;\"></span><span class=\"mrel\">=</span><span class=\"mspace\" style=\"margin-right:0.2778em;\"></span></span><span class=\"base\"><span class=\"strut\" style=\"height:1.04em;vertical-align:-0.1266em;\"></span><span class=\"mord\">±</span><span class=\"mord sqrt\"><span class=\"vlist-t vlist-t2\"><span class=\"vlist-r\"><span class=\"vlist\" style=\"height:0.9134em;\"><span class=\"svg-align\" style=\"top:-3em;\"><span class=\"pstrut\" style=\"height:3em;\"></span><span class=\"mord\" style=\"padding-left:0.833em;\"><span class=\"mord\"><span class=\"mord mathnormal\">a</span><span class=\"msupsub\"><span class=\"vlist-t\"><span class=\"vlist-r\"><span class=\"vlist\" style=\"height:0.7401em;\"><span style=\"top:-2.989em;margin-right:0.05em;\"><span class=\"pstrut\" style=\"height:2.7em;\"></span><span class=\"sizing reset-size6 size3 mtight\"><span class=\"mord mtight\">2</span></span></span></span></span></span></span></span><span class=\"mspace\" style=\"margin-right:0.2222em;\"></span><span class=\"mbin\">+</span><span class=\"mspace\" style=\"margin-right:0.2222em;\"></span><span class=\"mord\"><span class=\"mord mathnormal\">b</span><span class=\"msupsub\"><span class=\"vlist-t\"><span class=\"vlist-r\"><span class=\"vlist\" style=\"height:0.7401em;\"><span style=\"top:-2.989em;margin-right:0.05em;\"><span class=\"pstrut\" style=\"height:2.7em;\"></span><span class=\"sizing reset-size6 size3 mtight\"><span class=\"mord mtight\">2</span></span></span></span></span></span></span></span></span></span><span style=\"top:-2.8734em;\"><span class=\"pstrut\" style=\"height:3em;\"></span><span class=\"hide-tail\" style=\"min-width:0.853em;height:1.08em;\"><svg xmlns=\"http://www.w3.org/2000/svg\" width=\"400em\" height=\"1.08em\" viewBox=\"0 0 400000 1080\" preserveAspectRatio=\"xMinYMin slice\"><path d=\"M95,702\nc-2.7,0,-7.17,-2.7,-13.5,-8c-5.8,-5.3,-9.5,-10,-9.5,-14\nc0,-2,0.3,-3.3,1,-4c1.3,-2.7,23.83,-20.7,67.5,-54\nc44.2,-33.3,65.8,-50.3,66.5,-51c1.3,-1.3,3,-2,5,-2c4.7,0,8.7,3.3,12,10\ns173,378,173,378c0.7,0,35.3,-71,104,-213c68.7,-142,137.5,-285,206.5,-429\nc69,-144,104.5,-217.7,106.5,-221\nl0 -0\nc5.3,-9.3,12,-14,20,-14\nH400000v40H845.2724\ns-225.272,467,-225.272,467s-235,486,-235,486c-2.7,4.7,-9,7,-19,7\nc-6,0,-10,-1,-12,-3s-194,-422,-194,-422s-65,47,-65,47z\nM834 80h400000v40h-400000z\"></path></svg></span></span></span><span class=\"vlist-s\">​</span></span><span class=\"vlist-r\"><span class=\"vlist\" style=\"height:0.1266em;\"><span></span></span></span></span></span></span></span></span></eq></p>');
        expect(card.back).to.equal("<p>back 1</p>");

        card = section.cards[1]
        expect(card.front).to.equal('<p>Block math expression:</p><section><eqn><span class=\"katex-display\"><span class=\"katex\"><span class=\"katex-mathml\"><math xmlns=\"http://www.w3.org/1998/Math/MathML\" display=\"block\"><semantics><mrow><mi>y</mi><mo stretchy=\"false\">(</mo><mi>x</mi><mo stretchy=\"false\">)</mo><mo>=</mo><mi>a</mi><mi>x</mi><mo>+</mo><mi>b</mi></mrow><annotation encoding=\"application/x-tex\"> y(x) = ax + b </annotation></semantics></math></span><span class=\"katex-html\" aria-hidden=\"true\"><span class=\"base\"><span class=\"strut\" style=\"height:1em;vertical-align:-0.25em;\"></span><span class=\"mord mathnormal\" style=\"margin-right:0.03588em;\">y</span><span class=\"mopen\">(</span><span class=\"mord mathnormal\">x</span><span class=\"mclose\">)</span><span class=\"mspace\" style=\"margin-right:0.2778em;\"></span><span class=\"mrel\">=</span><span class=\"mspace\" style=\"margin-right:0.2778em;\"></span></span><span class=\"base\"><span class=\"strut\" style=\"height:0.6667em;vertical-align:-0.0833em;\"></span><span class=\"mord mathnormal\">a</span><span class=\"mord mathnormal\">x</span><span class=\"mspace\" style=\"margin-right:0.2222em;\"></span><span class=\"mbin\">+</span><span class=\"mspace\" style=\"margin-right:0.2222em;\"></span></span><span class=\"base\"><span class=\"strut\" style=\"height:0.6944em;\"></span><span class=\"mord mathnormal\">b</span></span></span></span></span></eqn></section>');
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
        expect(card.back).to.equal("<p>Card with a table in the back</p><table>\n<thead>\n<tr>\n<th>Column 1</th>\n<th>Column 2</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>value 1</td>\n<td>value 2</td>\n</tr>\n</tbody>\n</table>");
    });

    it('can process cards with images', () => {
        let text = `
____________________
![](logo_48.png)

?

back
____________________
`
        let deck = app.parse(text);
        let section = deck.sections[0];
        let card = section.cards[0];

        expect(card.front).to.equal('<p><img src=\"logo_48.png\" alt=\"\"></p>');
    })
});
