import AnkiExport from "anki-apkg-export"
import * as app from "./app"

// apkg.save()
//   .then(zip => {
//     fs.writeFileSync('./output.apkg', zip, 'binary');
//     console.log(`Package has been generated: output.pkg`);
//   })
//   .catch(err => console.log(err.stack || err));
export function transform(text : string) : Promise<any> {
    let deck = app.parse(text);
     
    let apkg = new AnkiExport(deck.title);

    for(let section of deck.sections) {
        let tags = [section];
        for(let card of section.cards) {
            apkg.addCard(
                card.front,
                card.back,
                tags,
            )
        }
    }
    

// apkg.addCard('card #3 with image <img src="anki.png" />', 'card #3 back');

    return apkg.save();
}