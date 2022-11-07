import MarkdownIt from "markdown-it";
import emoji from "markdown-it-emoji";
import * as jsdom from "jsdom";
import parseFrontMatter from "front-matter";
import katex from "katex";
import texmath from "markdown-it-texmath";
import highlightjs from "markdown-it-highlightjs";


interface Card {
  front: string;
  back: string;
}

interface Deck {
  title: string;
  description: string;
  attributes: {};
  sections: Section[];
}

interface Section {
  name: string;
  description: string;
  cards: Card[];
}

enum State {
  DeckDescription,
  SectionDescription,
  Front,
  Back
}

let md = new MarkdownIt(
  {
    html: true
  })
  .use(emoji)
  .use(texmath.use(katex))
  .use(highlightjs, {
    auto: false,
    code: false
  });


export function parse(text: string): Deck {

  let doc = parseFrontMatter(text);
  let html = md.render(doc.body);

  let dom = new jsdom.JSDOM(html);

  let deck = <Deck>{
    attributes: doc.attributes,
    sections: []
  };

  let front = "";
  let back = "";
  let description = "";
  let state = State.DeckDescription;
  let section = <Section>{
    cards: []
  };

  for (let node of Array.from(dom.window.document.body.children)) {
    if (node.tagName === "H1") {
      // Use the first title set.
      if (!deck.title) {
        deck.title = node.innerHTML;
      }
      continue;
    }

    if (node.tagName === "H2") {
      if (section.name || section.description || section.cards.length) {
        deck.sections.push(section);
      }
      section = <Section>{
        name: node.innerHTML,
        cards: []
      };
      state = State.SectionDescription;
      continue;
    }

    if (node.tagName === "HR") {
      if (/\S/.test(front)) {
        section.cards.push({
          front: front,
          back: back
        });
      }
      front = "";
      back = "";
      state = State.Front;
      continue;
    }

    // Tables are allowed only if they appear directly in the section.
    if (state === State.SectionDescription && node.tagName === "TABLE") {
      for (let row of Array.from(node.querySelectorAll("TR"))) {
        let card = <Card>{
          front: "",
          back: ""
        };
        let first = true;
        for (let col of Array.from(row.querySelectorAll("TD"))) {
          if (first) {
            card.front += `<p>${col.innerHTML}</p>`;
            first = false;
          } else {
            card.back += `<p>${col.innerHTML}</p>`;
          }
        }
        if (!first) {
          section.cards.push(card);
        }
      }
      continue;
    }

    if (node.tagName === "P" && /^\s*(\?|↪|❓|❔|↪️)\s*$/.test(node.innerHTML)) {
      state = State.Back;
      continue;
    }

    let text = node.outerHTML;
    switch (state) {
      case State.DeckDescription:
        description += text;
        break;
      case State.SectionDescription:
        // Ignore section description.
        break;
      case State.Front:
        front += text;
        break;
      case State.Back:
        back += text;
        break;
    }
  }

  if ((state === State.Front || state === State.Back) && /\S/.test(front)) {
    section.cards.push({
      front: front,
      back: back
    });
  }

  if (section.name || section.description || section.cards.length) {
    deck.sections.push(section);
  }

  deck.description = description;

  return deck;
}