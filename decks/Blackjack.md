# Blackjack
This deck describes optimal strategy for a popular game with 4-8 decks where dealer hits on soft 17.

Strategy was calculated with:
* https://wizardofodds.com/games/blackjack/strategy/calculator/

### Legend
* 🥊 - Hit
* ✋ - Stand
* 💵 - Double
* 👭 - Split
* 🐔 - Surrender

### Hard total
A hard total is any hand that does not start with an ace in it, or it has been dealt an ace that can only be counted as 1 instead of 11.

||2|3|4|5|6|7|8|9|10|A|
|-|-|-|-|-|-|-|-|-|-|-|
| 8|🥊|🥊|🥊|🥊|🥊|🥊|🥊|🥊|🥊|🥊|
| 9|🥊|💵|💵|💵|💵|🥊|🥊|🥊|🥊|🥊|
|10|💵|💵|💵|💵|💵|💵|💵|💵|🥊|🥊|
|11|💵|💵|💵|💵|💵|💵|💵|💵|💵|💵|
|12|🥊|🥊|✋|✋|✋|🥊|🥊|🥊|🥊|🥊|
|13|✋|✋|✋|✋|✋|🥊|🥊|🥊|🥊|🥊|
|14|✋|✋|✋|✋|✋|🥊|🥊|🥊|🥊|🥊|
|15|✋|✋|✋|✋|✋|🥊|🥊|🥊|🐔|🐔|
|16|✋|✋|✋|✋|✋|🥊|🥊|🐔|🐔|🐔|
|17|✋|✋|✋|✋|✋|✋|✋|✋|✋|🐔|
|18|✋|✋|✋|✋|✋|✋|✋|✋|✋|✋|
|19|✋|✋|✋|✋|✋|✋|✋|✋|✋|✋|
|20|✋|✋|✋|✋|✋|✋|✋|✋|✋|✋|


### Soft total
A soft total is any hand that has an Ace as one of the first two cards, the ace counts as 11 to start.

||2|3|4|5|6|7|8|9|10|A|
|-|-|-|-|-|-|-|-|-|-|-|
|A,2|🥊|🥊|🥊|💵|💵|🥊|🥊|🥊|🥊|🥊|
|A,3|🥊|🥊|🥊|💵|💵|🥊|🥊|🥊|🥊|🥊|
|A,4|🥊|🥊|💵|💵|💵|🥊|🥊|🥊|🥊|🥊|
|A,5|🥊|🥊|💵|💵|💵|🥊|🥊|🥊|🥊|🥊|
|A,6|🥊|💵|💵|💵|💵|🥊|🥊|🥊|🥊|🥊|
|A,7|💵|💵|💵|💵|💵|✋|✋|🥊|🥊|🥊|
|A,8|✋|✋|✋|✋|💵|✋|✋|✋|✋|✋|
|A,9|✋|✋|✋|✋|✋|✋|✋|✋|✋|✋|

### Pairs
||2|3|4|5|6|7|8|9|10|A|
|-|-|-|-|-|-|-|-|-|-|-|
|2,2|👭|👭|👭|👭|👭|👭|🥊|🥊|🥊|🥊|
|3,3|👭|👭|👭|👭|👭|👭|🥊|🥊|🥊|🥊|
|4,4|🥊|🥊|🥊|👭|👭|🥊|🥊|🥊|🥊|🥊|
|5,5|💵|💵|💵|💵|💵|💵|💵|💵|🥊|🥊|
|6,6|👭|👭|👭|👭|👭|🥊|🥊|🥊|🥊|🥊|
|7,7|👭|👭|👭|👭|👭|👭|🥊|🥊|🥊|🥊|
|8,8|👭|👭|👭|👭|👭|👭|👭|👭|👭|👭|
|9,9|👭|👭|👭|👭|👭|✋|👭|👭|✋|✋|
|10,10|✋|✋|✋|✋|✋|✋|✋|✋|✋|✋|
|A,A|👭|👭|👭|👭|👭|👭|👭|👭|👭|👭|

### Deck
________________________________________________________________________________
Pair of A's 

?

Always split aces.

||2|3|4|5|6|7|8|9|10|A|
|-|-|-|-|-|-|-|-|-|-|-|
|A,A|👭|👭|👭|👭|👭|👭|👭|👭|👭|👭|
________________________________________________________________________________
Pair of 10's 

?

Never split tens.

||2|3|4|5|6|7|8|9|10|A|
|-|-|-|-|-|-|-|-|-|-|-|
|10,10|✋|✋|✋|✋|✋|✋|✋|✋|✋|✋|
________________________________________________________________________________
Pair of 9's 

? 

Split against dealer 2 through 9, except for 7, otherwise stand.

||2|3|4|5|6|7|8|9|10|A|
|-|-|-|-|-|-|-|-|-|-|-|
|9,9|👭|👭|👭|👭|👭|✋|👭|👭|✋|✋|
________________________________________________________________________________
Pair of 8's

?

Always split 8's

||2|3|4|5|6|7|8|9|10|A|
|-|-|-|-|-|-|-|-|-|-|-|
|8,8|👭|👭|👭|👭|👭|👭|👭|👭|👭|👭|
________________________________________________________________________________
Pair of 7's 

?

Split against dealer 2 through 7, otherwise hit.

||2|3|4|5|6|7|8|9|10|A|
|-|-|-|-|-|-|-|-|-|-|-|
|7,7|👭|👭|👭|👭|👭|👭|🥊|🥊|🥊|🥊|
________________________________________________________________________________
Pair of 6's 

? 

Split against dealer 2 through 6, otherwise hit.

||2|3|4|5|6|7|8|9|10|A|
|-|-|-|-|-|-|-|-|-|-|-|
|6,6|👭|👭|👭|👭|👭|🥊|🥊|🥊|🥊|🥊|
________________________________________________________________________________
Pair of 5's 

?

Double against dealer 2 through 9 otherwise hit.

||2|3|4|5|6|7|8|9|10|A|
|-|-|-|-|-|-|-|-|-|-|-|
|5,5|💵|💵|💵|💵|💵|💵|💵|💵|🥊|🥊|
________________________________________________________________________________
Pair of 4's 

?

Split against dealer 5 and 6 , otherwise hit.

||2|3|4|5|6|7|8|9|10|A|
|-|-|-|-|-|-|-|-|-|-|-|
|4,4|🥊|🥊|🥊|👭|👭|🥊|🥊|🥊|🥊|🥊|
________________________________________________________________________________
Pair of 3's

?

Split against dealer 2 through 7, otherwise hit.

||2|3|4|5|6|7|8|9|10|A|
|-|-|-|-|-|-|-|-|-|-|-|
|3,3|👭|👭|👭|👭|👭|👭|🥊|🥊|🥊|🥊|
________________________________________________________________________________
Pair of 2's

?

Split against dealer 2 through 7, otherwise hit.

||2|3|4|5|6|7|8|9|10|A|
|-|-|-|-|-|-|-|-|-|-|-|
|2,2|👭|👭|👭|👭|👭|👭|🥊|🥊|🥊|🥊|
________________________________________________________________________________
Soft 20 (A,9)

?

Always stands

||2|3|4|5|6|7|8|9|10|A|
|-|-|-|-|-|-|-|-|-|-|-|
|A,9|✋|✋|✋|✋|✋|✋|✋|✋|✋|✋|
________________________________________________________________________________
Soft 19 (A,8)

?

Double against dealer 6, otherwise stand.

||2|3|4|5|6|7|8|9|10|A|
|-|-|-|-|-|-|-|-|-|-|-|
|A,8|✋|✋|✋|✋|💵|✋|✋|✋|✋|✋|
________________________________________________________________________________
Soft 18 (A,7)

?

Double against dealer 2 through 6, and hits against 9 through A, otherwise stand.

||2|3|4|5|6|7|8|9|10|A|
|-|-|-|-|-|-|-|-|-|-|-|
|A,7|💵|💵|💵|💵|💵|✋|✋|🥊|🥊|🥊|
________________________________________________________________________________
Soft 17 (A,6)

?

Double against dealer 3 through 6, otherwise hit.

||2|3|4|5|6|7|8|9|10|A|
|-|-|-|-|-|-|-|-|-|-|-|
|A,6|🥊|💵|💵|💵|💵|🥊|🥊|🥊|🥊|🥊|
________________________________________________________________________________
Soft 16 (A,5)

?

Double against dealer 4 through 6, otherwise hit.

||2|3|4|5|6|7|8|9|10|A|
|-|-|-|-|-|-|-|-|-|-|-|
|A,5|🥊|🥊|💵|💵|💵|🥊|🥊|🥊|🥊|🥊|
________________________________________________________________________________
Soft 15 (A,4)

?

Double against dealer 4 through 6, otherwise hit.

||2|3|4|5|6|7|8|9|10|A|
|-|-|-|-|-|-|-|-|-|-|-|
|A,4|🥊|🥊|💵|💵|💵|🥊|🥊|🥊|🥊|🥊|
________________________________________________________________________________
Soft 14 (A,3)

?

Double against dealer 5 through 6, otherwise hit.

||2|3|4|5|6|7|8|9|10|A|
|-|-|-|-|-|-|-|-|-|-|-|
|A,3|🥊|🥊|🥊|💵|💵|🥊|🥊|🥊|🥊|🥊|
________________________________________________________________________________
Soft 13 (A,2)

?

Double against dealer 5 through 6, otherwise hit.

||2|3|4|5|6|7|8|9|10|A|
|-|-|-|-|-|-|-|-|-|-|-|
|A,2|🥊|🥊|🥊|💵|💵|🥊|🥊|🥊|🥊|🥊|
________________________________________________________________________________
Hard 20

?

Always stand on 20.

||2|3|4|5|6|7|8|9|10|A|
|-|-|-|-|-|-|-|-|-|-|-|
|20|✋|✋|✋|✋|✋|✋|✋|✋|✋|✋|
________________________________________________________________________________
Hard 19

?

Always stand on 19.

||2|3|4|5|6|7|8|9|10|A|
|-|-|-|-|-|-|-|-|-|-|-|
|19|✋|✋|✋|✋|✋|✋|✋|✋|✋|✋|
________________________________________________________________________________
Hard 18

?

Always stand on 18.

||2|3|4|5|6|7|8|9|10|A|
|-|-|-|-|-|-|-|-|-|-|-|
|18|✋|✋|✋|✋|✋|✋|✋|✋|✋|✋|
________________________________________________________________________________
Hard 17

?

Always stand on 17.

||2|3|4|5|6|7|8|9|10|A|
|-|-|-|-|-|-|-|-|-|-|-|
|17|✋|✋|✋|✋|✋|✋|✋|✋|✋|🐔|

________________________________________________________________________________
Hard 16

?

Stand against dealer 2 through 6, surrender against 9 through A, otherwise hit.

||2|3|4|5|6|7|8|9|10|A|
|-|-|-|-|-|-|-|-|-|-|-|
|16|✋|✋|✋|✋|✋|🥊|🥊|🐔|🐔|🐔|
________________________________________________________________________________
Hard 15

?

Stand against dealer 2 through 6, surrender at 10 and A, otherwise hit.

||2|3|4|5|6|7|8|9|10|A|
|-|-|-|-|-|-|-|-|-|-|-|
|15|✋|✋|✋|✋|✋|🥊|🥊|🥊|🐔|🐔|
________________________________________________________________________________
Hard 14

?

Stand against dealer 2 through 6, otherwise hit.

||2|3|4|5|6|7|8|9|10|A|
|-|-|-|-|-|-|-|-|-|-|-|
|14|✋|✋|✋|✋|✋|🥊|🥊|🥊|🥊|🥊|
________________________________________________________________________________
Hard 13

?

Stand against dealer 2 through 6, otherwise hit.

||2|3|4|5|6|7|8|9|10|A|
|-|-|-|-|-|-|-|-|-|-|-|
|13|✋|✋|✋|✋|✋|🥊|🥊|🥊|🥊|🥊|
________________________________________________________________________________
Hard 12

?

Stand against dealer 4 through 6, otherwise hit.

||2|3|4|5|6|7|8|9|10|A|
|-|-|-|-|-|-|-|-|-|-|-|
|12|🥊|🥊|✋|✋|✋|🥊|🥊|🥊|🥊|🥊|
________________________________________________________________________________
Hard 11

?

Always double.

||2|3|4|5|6|7|8|9|10|A|
|-|-|-|-|-|-|-|-|-|-|-|
|11|💵|💵|💵|💵|💵|💵|💵|💵|💵|💵|
________________________________________________________________________________
Hard 10

?

Double against dealer 2 through 9 otherwise hit.

||2|3|4|5|6|7|8|9|10|A|
|-|-|-|-|-|-|-|-|-|-|-|
|10|💵|💵|💵|💵|💵|💵|💵|💵|🥊|🥊|
________________________________________________________________________________
Hard 9

?

Double against dealer 3 through 6 otherwise hit.

||2|3|4|5|6|7|8|9|10|A|
|-|-|-|-|-|-|-|-|-|-|-|
| 9|🥊|💵|💵|💵|💵|🥊|🥊|🥊|🥊|🥊|
________________________________________________________________________________
Hard 8

?

Always hit on 8.

||2|3|4|5|6|7|8|9|10|A|
|-|-|-|-|-|-|-|-|-|-|-|
| 8|🥊|🥊|🥊|🥊|🥊|🥊|🥊|🥊|🥊|🥊|