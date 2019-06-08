import * as marked from "marked"
import * as jsdom from "jsdom"
import * as fs from "fs"
import * as parseFrontMatter from "front-matter"
import AnkiExport from "anki-apkg-export"

interface Card {
  front: string,
  back: string,
}

interface Deck {
  title: string,
  description: string,
  attributes: {},
  sections: Section[]
}

interface Section {
  title: string,
  description: string,
  cards: Card[]
}

enum State {
  DeckDescription,
  SectionDescription,
  Front,
  Back
}

export function parse(text: string): Deck {

  let doc = parseFrontMatter(text);
  let html = marked(doc.body);
  let dom = new jsdom.JSDOM(html);

  let deck = <Deck>{
    attributes: doc.attributes,
    sections: []
  };
  let section = <Section> {
    cards: []
  }

  let front = "";
  let back = "";
  let description = "";
  let state = State.DeckDescription;

  let nodes = dom.window.document.body.children;
  for (let i = 0; i < nodes.length; i++) {
    let node = nodes[i];
    let text = node.outerHTML;

    if (node.tagName === "H1") {
      // Use the first title set.
      if (!deck.title) {
        deck.title = node.innerHTML;
      }
      continue;
    }

    if (node.tagName === "H2") {
      if (section.title || section.description || section.cards.length) {
        deck.sections.push(section);
      }
      section = <Section> {
        title: node.innerHTML,
        cards: []
      }
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

    if (node.tagName === "P" && /\s*\?\s*/.test(node.innerHTML)) {
      state = State.Back;
      continue;
    }

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

  if (section.title || section.description || section.cards.length) {
    deck.sections.push(section);
  }

  deck.description = description;

  return deck;
}



let apkg = new AnkiExport('my deck');
// apkg.addCard('card #3 with image <img src="anki.png" />', 'card #3 back');

apkg.save()
  .then(zip => {
    fs.writeFileSync('./output.apkg', zip, 'binary');
    console.log(`Package has been generated: output.pkg`);
  })
  .catch(err => console.log(err.stack || err));
