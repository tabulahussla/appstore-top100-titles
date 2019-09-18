const fs = require('fs');
const path = require('path');
const { promisify } = require('util');

const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);
(async function () {
    const patch = await readFile(path.resolve(__dirname, 'list.js'), 'utf8');
    await writeFile(
        path.resolve(__dirname, '../node_modules/app-store-scraper/lib/list.js'),
        patch,
    );
}())
