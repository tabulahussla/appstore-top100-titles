require('./patch/apply');
const store = require('app-store-scraper')
const fs = require('fs')
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
node ${argv.$0} -o path to txt or csv file to save -s searchTerm -g CATEGORY:COLLECTION -l=100 -c=NL

must specify only one of:
-s (search) or -g (CATEGORY:COLLECTION)

optional args:
-p to specify search for only paid apps
-f to specify search for only free apps
-c is country
-l is limit`)

const { o: outputPath = '' } = argv;

if (typeof outputPath !== 'string' || !outputPath.length) {
    return PrintUsage();
}

/* ENHANCE ASYNCHRONOUS MODE */
/* ......................... */
(async function () {
    // continue to check arguments... but found no answers...

    const {
        c: country = 'NL',
        s: search = '',
        g: genreId = '',
        l: limit = 100,
    } = argv;
    let [category, collection] = genreId.split(':');

    let applications
    // CHECK SEARCH
    if (s in argv) {
        /* IT IS SEARCH ! */
        const { results } = await SearchItunesSoftware(
        /* SEARCH TERM */ argv.s,
        /* COUNTRY CODE */ country,
            /********************************************/
            /*      SET [PRICE VALUE FILTERING] TO "1"
                    FOR [-p]AID APPLICATIONS
                    AND "0" FOR [-f]REE APPLICATIONS */
            argv.p === true ? 1 : argv.f === true ? 0 : undefined,
        /* LIMIT VALUE */ limit
        );
        /* SAVE ARRAY OF APP TITLES */
        applications = results.map(app => app.trackName)
    }
    // IF NO SEARCH, ALSO CHECK THIS OUT
    else if (g in argv) {
        /* RESOLVE CATEGORY */
        category = store.category[category] || category;
        collection = store.collection[collection] || collection;
        /* LOOKUP BY GENRE ID */
        const results = await ListByGenreId({
            category,
            collection,
            country,
            limit,
        });
        /* SAVE ARRAY OF APP TITLES */
        applications = results.map(app => app.title);
    } else {
        return PrintUsage();
    }

    const output = fs.createWriteStream(outputPath);

    if (outputPath.endsWith('.txt')) {
        for (const title of applications) {
            output.write(`${title}\n`);
        }
    } else if (outputPath.endsWith('.csv')) {
        output.write(`POSITION,TITLE\n`);
        for (let i = 1; i <= applications.length; i++) {
            const title = applications[i - 1];
            output.write(`${i},${title}\n`);
        }
    } else {
        return PrintUsage()
    }

    output.end()

}())