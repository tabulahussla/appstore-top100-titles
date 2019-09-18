const fs = require('fs');
const path = require('path');
const { promisify } = require('util');

const { readFileSync: readFile, writeFileSync: writeFile } = fs;

const patch = readFile(path.resolve(__dirname, 'list.js'), 'utf8');
writeFile(
    path.resolve(__dirname, '../node_modules/app-store-scraper/lib/list.js'),
    patch,
);
