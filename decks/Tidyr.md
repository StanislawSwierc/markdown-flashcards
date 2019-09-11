

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


________________________________________________________________________________
Split a dataset into train and test datasets at random.

?

```R
df <- df %>% mutate(index = row_number())
df_train <- df %>% sample_frac(0.70)
df_test  <- df %>% anti_join(df_train, by="index")
```

First, create unique index column. Then, create a training set by sampling 70%
of the data with `sample_frac`. Finally, use `anti_join` function, which returns
all the rows from df where there are not matching values in df.

[source](https://medium.com/@HollyEmblem/training-and-test-dataset-creation-with-dplyr-41d9aa7eab31)

________________________________________________________________________________