const {readFileSync, writeFileSync} = require('node:fs');

const json = readFileSync(`${__dirname}/news.json`, 'utf8');
let news;
try {
    news = JSON.parse(json);
    news.sort((a, b) => b.created - a.created);
} catch (e) {
    throw new Error(`Cannot parse news.json: ${e}`);
}
if (json !== JSON.stringify(news, null, 2)) {
    if (process.argv.includes('--check')) {
        throw new Error('News are not sorted');
    } else {
        writeFileSync('news.json', JSON.stringify(news, null, 2));
    }
}


