const searchitunes = require('searchitunes');

async function SearchItunesSoftware(term, country = 'NL', price = undefined, limit = 100) {
    const params = {
        entity: 'software',
        country,
        limit,
        price,
        term,
    };

    // Find free apps for iPhone in Dutch App Store
    return searchitunes(params);
}

module.exports.SearchItunesSoftware = SearchItunesSoftware
