appstore-top100-titles
======================

# Usage

- Clone repository

```shell
git clone https://github.com/tabulahussla/appstore-top100-titles.git
cd appstore-top100-titles
npm install
```

- Search, save to txt

```shell
node index.js -o top100titles.txt -s 'angry birds'
```

- Top Free in Arcade Games, save to csv

```shell
node index.js -o top100titles.csv -g GAMES_ARCADE:TOP_FREE_IOS
```

For a list of categories, reference this file: https://github.com/facundoolano/app-store-scraper/blob/master/lib/constants.js

Here are the shortcuts:

+ [\<Categoriy Names\>](https://github.com/facundoolano/app-store-scraper/blob/master/lib/constants.js#L19)

+ [\<Collection Names\>](https://github.com/facundoolano/app-store-scraper/blob/master/lib/constants.js#L3)

+ [\<Available Country Codes\>](https://github.com/facundoolano/app-store-scraper/blob/master/lib/constants.js#L104)

+ [\<WIKI: List_of_ISO_3166_country_codes\>](https://en.wikipedia.org/wiki/List_of_ISO_3166_country_codes#Current_ISO_3166_country_codes) (Search for `Alpha-2 Code[`)
