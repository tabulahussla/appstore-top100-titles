const store = require('app-store-scraper');

async function ListByGenreId({ category, collection, country = 'NL', limit = 100 }) {
    const params = {
        country,
        category,
        collection,
        num: limit,
    };

    // Find top N apps in category and collection
    return store.list(params);
}

module.exports.ListByGenreId = ListByGenreId
