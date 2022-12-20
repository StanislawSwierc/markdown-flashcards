# Markdown Flashcards

*Markdown Flashcards* is a simple way of creating flashcards with plain text.
Decks can be openly shared with others and imported to existing flashcard
software such as Anki.

Since flashcards with spaced repetition are one of the best tools to help
memorize content, we will use flashcards to learn about Markdown Flashcards!

________________________________________________________________________________
How to create a card?

?


Card consists of Markdown formatted text surrounded by two lines with 3 or
more underscore characters ('`___`'). Question and answer are separated by a
line with a question mark '`?`'. 

```md
___
How to create a card?

?

Card consists of a Markdown formatted text...
___
```
________________________________________________________________________________
How to separate question and answer?

:question:

Question and answer can be separated by a line with a plain question mark,
question mark emoji, or a text representation of the emoji ("`:question:`").

- ?
- ❓ or `:question:`
- ❔ or `:grey_question:`

```md
___
How to separate question and answer?

:question:

Questions and answers can be separated by...
___
```
________________________________________________________________________________
Can you use a line with hyphen '---' characters to separate cards?

?

While it is possible to use hyphens '`---`' and stars '`***`' to separate cards,
it is not recommended because these symbols have additional meaning. If they
appear directly under an answer they can accidentally turn it into a heading.


```md
---
Question

?

Heading, not an answer
---
```
________________________________________________________________________________
How to set title to the deck?

?


You can set the tile of the deck with a level 1 header.

```md
# Markdown Flashcards
```
________________________________________________________________________________

How to group cards into sections by subject?

? 

You can group cars into sections with level 2 headers.

```md
## Basics
```
________________________________________________________________________________

Tabular cards

?

Cards can also be defined as tables. By convention, the first column becomes the
front of the card while remaining columns become paragraphs in the back of the 
card.

single section can either consists of regular cards (separated by horizontal
rules) or a tables, but not both so avoid mixing them.

```md
## Section with at table

| Front   | Back    |
| ------- | ------- |
| front 1 | back 1  |
| front 2 | back 2  |
```
________________________________________________________________________________


## Common problems
While the convention was designed to be simple there are few aspects of Markdown
which can surprise new users.

________________________________________________________________________________

Is this good card?

```md
___

front
?
back
___
```

?

No. There have to be empty lines between front and the question mark, and 
between question mark and back of the card. Without it all 3 lines become the 
front of the card. 

Correct version of this card would look like this:

```md
___

front

?

back
___
```
________________________________________________________________________________

Is this a good card?

```
---

front

?

back
---
```

?

No. While you can use '`-`' and '`*`' characters to create a horizontal rule,
sequence of 3 or home hyphens '`---`' has a special meaning in Markdown when
it appears directly under some text. It turns the text into a level 2 header. 
In the card above, '`back`' would be turned into a header and start a new 
section in the deck.

To avoid this problem alltogether it is recommended to use underscore '`_`'
characters to separate cards.

Correct version with hyphens would look like this:

```md
---

front

?

back

---
```
________________________________________________________________________________

Can I mix regular and tabular cards within the same section?

?

No. Single section of cards can either consists of regular cards (separated by
horizontal rules) or a tables, but not both.

________________________________________________________________________________