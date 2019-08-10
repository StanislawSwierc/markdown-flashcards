

This looks like a good candidate to convert to flash cards.
https://github.com/rstudio/cheatsheets/blob/master/data-import.pdf

---

How to spread repeated measures of multiple variables into wide format?


?

```r
df %>% 
  gather(temp, score, starts_with("Score")) %>% 
  unite(temp1, Time, temp, sep = ".") %>% 
  spread(temp1, score)
```

[StackOverflow](https://stackoverflow.com/questions/29775461/how-can-i-spread-repeated-measures-of-multiple-variables-into-wide-format)


---