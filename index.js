
const inquirer = require('inquirer');
const chalk = require('chalk');
const figlet = require('figlet');
const shell = require('shelljs');
const store = require('app-store-scraper')
const fs = require('fs')
const pkg = require('./package.json');
const { SearchItunesSoftware } = require('./search');
const { ListByGenreId } = require('./list');
const { argv } = require('yargs');

/* YARGS */
const g = 'g';
const f = 'f';
const o = 'o';
const p = 'p';
const l = 'l';
const s = 's';

const PrintUsage = () =>
    console.log(`Usage:
node ${argv.$0} -o path to txt or csv file to save -s searchTerm -g grossingGenreId -f freeGenreId -p paidGenreId -l=100 -c=NL
-c country
-l limit`)

if (typeof argv.o !== 'string' || !argv.o.length) {
    return PrintUsage();
}

/* ENHANCE ASYNCHRONOUS MODE */
/* ......................... */
(async function () {
    // continue to check arguments... but found no answers...

    let applications
    // CHECK SEARCH
    if (s in argv) {
        /* IT IS SEARCH ! */
        const { results } = await SearchItunesSoftware(
        /* SEARCH TERM */ argv.s,
        /* COUNTRY CODE */ argv.c,
            /********************************************/
            /*      SET [PRICE VALUE FILTERING] TO "1"
                    FOR [-p]AID APPLICATIONS
                    AND "0" FOR [-f]REE APPLICATIONS */
            argv.p === true || argv.f === true ? 1 : undefined,
        /* LIMIT VALUE */ argv.l || 100
        );
        /* SAVE ARRAY OF APP TITLES */
        applications = results.map(app => app.trackName)
    }
    // IF NO SEARCH, ALSO CHECK THIS OUT
    else if (g in argv) {
        /* LOOKUP BY GENRE ID */
        const { g: genreId } = argv;
        const [category, collection] = genreId.slice('|');
        const applications = await ListByGenreId({
            category,
            collection,
            country,
            limit,
        })
    } else {
        return PrintUsage()
    }

    const output = fs.createWriteStream(argv.o)

}())