# Markdown Flashcards

*Markdown flashcards* is a convention from preparing flashcard in Markdown and
a suite of tools to export them to the existing flashcard software (e.g. Anki,
Quizlet).

Since flashcards coupled with spaced repetition are the best tools to aid 
memorization , what a better way of explaining the convention of creating them
than in a form of a deck of flashcards! 


## Basics
________________________________________________________________________________

Title of the deck

?

You can define the tile of the deck with a level 1 header.

```md
# Markdown Flashcards
```
________________________________________________________________________________

Group cards into sections by subject

? 

You can group cars into sections by subjects by using level 2 header.

```md
## Basics
```
________________________________________________________________________________

Card

?

Card, in its most basic form consists of Markdown text surrounded by two 
horizontal rules (line consisting of 3 or more underscore '`_`' characters) and 
separated by a question mark ('`?`'). Text before the question mark becomes the
front and the one after becomes the back of the card.
```md
___

Card

?

Card, in its most basic form consists of Markdown text surrounded...
___
```
________________________________________________________________________________

Allowed sides separators

?

While '`?`' is the easiest character to type, it is not the most appealing 
visually. Front and back of the cards can also be separated with other, more
elaborate symbols.

* ?
* ↪
* :question: - `:question:`
* :grey_question: - `:grey_question:`
* :arrow_right_hook: - `:arrow_right_hook:`

```md
___

front

:question:

back
___
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