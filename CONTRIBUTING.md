# CONTRIBUTING

## Submitting a pull request
1. Fork and clone the repository.
2. Run: `npm i` in the repository root..
3. Create a new branch: `git checkout -b my-branch-name`
4. Add your changes.
5. Push to your fork and submit a pull request.
6. Wait for your pull request to be reviewed and merged.

## To meet the fair use requirements of the PokéAPI, all http requests must be cached. For this we have written an RXJS operator

```
getAllPkmns() {
    return this.http
      .get<ListQueryResponse<PokemonListQueryResponse>>(this.getAllpkmnsUrl)
      .pipe(
        map((resp) => {
          return resp.results;
        }),
        cacheResult(),
      );
  }
```


## Issues
### Where to find them?
You can go to [Github Issues](https://github.com/baronrafael/homemade-pokedex/issues) and find one that you might like solving/contributing.
Also, if you've found something terrible, **report it**! Go ahead and tell us about it by [filing an issue](https://github.com/baronrafael/homemade-pokedex/issues)

## Resources
- [How to contribute to Open Source](https://opensource.guide/how-to-contribute/)
- [About Pull Requests](https://help.github.com/en/articles/about-pull-requests)
