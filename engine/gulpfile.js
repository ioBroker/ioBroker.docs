/*!
 * Copyright 2019, bluefox <dogafox@gmail.com>
 * ioBroker gulpfile
 * Date: 2019-03-17
 * Build documentation site
 */
'use strict';

const gulp = require('gulp');
const documentation = require('./build-lib/documentaion');
const faq = require('./build-lib/faq');
const adapters = require('./build-lib/adapters');
const blog = require('./build-lib/blog');
const consts = require('./build-lib/consts');
const utils = require('./build-lib/utils');
const path = require('path');
const fs = require('fs');
const request = require('request');
const EMPTY = '';
const fileName = 'temp_words.js';

const dir = __dirname + '/front-end/src/i18n/';
const languages = {
    en: {},
    de: {},
    ru: {},
    pt: {},
    nl: {},
    fr: {},
    it: {},
    es: {},
    pl: {},
    'zh-cn': {}
};
function lang2data(lang, isFlat) {
    let str = isFlat ? '' : '{\n';
    let count = 0;
    for (const w in lang) {
        if (lang.hasOwnProperty(w)) {
            count++;
            if (isFlat) {
                str += (lang[w] === '' ? (isFlat[w] || w) : lang[w]) + '\n';
            } else {
                const key = '    "' + w.replace(/"/g, '\\"') + '": ';
                str += key + '"' + lang[w].replace(/"/g, '\\"') + '",\n';
            }
        }
    }
    if (!count)
        return isFlat ? '' : '{\n}';
    if (isFlat) {
        return str;
    } else {
        return str.substring(0, str.length - 2) + '\n}';
    }
}

function readWordJs(src) {
    try {
        let words;
        words = fs.readFileSync(src + 'i18n/' + fileName).toString();
        words = words.substring(words.indexOf('{'), words.length);
        words = words.substring(0, words.lastIndexOf(';'));

        const resultFunc = new Function('return ' + words + ';');

        return resultFunc();
    } catch (e) {
        return null;
    }
}

function padRight(text, totalLength) {
    return text + (text.length < totalLength ? new Array(totalLength - text.length).join(' ') : '');
}

function writeWordJs(data, src) {
    let text = '';
    text += '/*global systemDictionary:true */\n';
    text += '\'use strict\';\n\n';
    text += 'systemDictionary = {\n';
    for (const word in data) {
        if (data.hasOwnProperty(word)) {
            text += '    ' + padRight('"' + word.replace(/"/g, '\\"') + '": {', 50);
            let line = '';
            for (const lang in data[word]) {
                if (data[word].hasOwnProperty(lang)) {
                    line += '"' + lang + '": "' + padRight(data[word][lang].replace(/"/g, '\\"') + '",', 50) + ' ';
                }
            }
            if (line) {
                line = line.trim();
                line = line.substring(0, line.length - 1);
            }
            text += line + '},\n';
        }
    }
    text += '};';
    fs.writeFileSync(src + '/i18n/' + fileName, text);
}

function languagesFlat2words(src) {
    const dirs = fs.readdirSync(src + 'i18n/flat/');
    const langs = {};
    const bigOne = {};
    const order = Object.keys(languages);
    dirs.sort((a, b) => {
        const posA = order.indexOf(a);
        const posB = order.indexOf(b);
        if (posA === -1 && posB === -1) {
            if (a > b)
                return 1;
            if (a < b)
                return -1;
            return 0;
        } else if (posA === -1) {
            return -1;
        } else if (posB === -1) {
            return 1;
        } else {
            if (posA > posB)
                return 1;
            if (posA < posB)
                return -1;
            return 0;
        }
    });
    const keys = fs.readFileSync(src + 'i18n/flat/index.txt').toString().split('\n');

    for (let l = 0; l < dirs.length; l++) {
        if (dirs[l] === 'index.txt') {
            continue;
        }
        let lang = dirs[l];
        const values = fs.readFileSync(src + 'i18n/flat/' + lang).toString().split('\n');
        lang = lang.replace('.txt', '');
        langs[lang] = {};
        keys.forEach((word, i) => langs[lang][word] = values[i]);

        const words = langs[lang];
        for (const word in words) {
            if (words.hasOwnProperty(word)) {
                bigOne[word] = bigOne[word] || {};
                if (words[word] !== EMPTY) {
                    bigOne[word][lang] = words[word];
                }
            }
        }
    }
    // read actual words.js
    const aWords = readWordJs(dir);

    const temporaryIgnore = ['index.txt'];
    if (aWords) {
        // Merge words together
        for (const w in aWords) {
            if (aWords.hasOwnProperty(w)) {
                if (!bigOne[w]) {
                    console.warn('Take from actual words.js: ' + w);
                    bigOne[w] = aWords[w];
                }
                dirs.forEach(lang => {
                    if (temporaryIgnore.indexOf(lang) !== -1) {
                        return;
                    }
                    !bigOne[w][lang] && console.warn('Missing "' + lang + '": ' + w);
                });
            }
        }

    }

    writeWordJs(bigOne, src);
}

function words2languagesFlat(src) {
    const langs = Object.assign({}, languages);
    const data = readWordJs(src);
    if (data) {
        for (const word in data) {
            if (data.hasOwnProperty(word)) {
                for (const lang in data[word]) {
                    if (data[word].hasOwnProperty(lang)) {
                        const _lang = lang.replace('.txt', '');
                        langs[_lang][word] = data[word][_lang];
                        //  pre-fill all other languages
                        for (const j in langs) {
                            if (langs.hasOwnProperty(j)) {
                                langs[j][word] = langs[j][word] || EMPTY;
                            }
                        }
                    }
                }
            }
        }
        const keys = Object.keys(langs.en);
        keys.sort();
        for (const l in langs) {
            if (!langs.hasOwnProperty(l)) {
                continue;
            }
            const obj = {};
            for (let k = 0; k < keys.length; k++) {
                obj[keys[k]] = langs[l][keys[k]];
            }
            langs[l] = obj;
        }
        if (!fs.existsSync(src + 'i18n/')) {
            fs.mkdirSync(src + 'i18n/');
        }
        if (!fs.existsSync(src + 'i18n/flat')) {
            fs.mkdirSync(src + 'i18n/flat');
        }
        for (const ll in langs) {
            if (!langs.hasOwnProperty(ll))
                continue;
            fs.writeFileSync(src + 'i18n/flat/' + ll + '.txt', lang2data(langs[ll], langs.en));
        }
        fs.writeFileSync(src + 'i18n/flat/index.txt', keys.join('\n'));
    } else {
        console.error('Cannot read or parse ' + fileName);
    }
}

gulp.task('i18n=>flat', done => {
    const files = fs.readdirSync(dir).filter(name => name.match(/\.json$/));
    const index = {};
    const langs = [];
    files.forEach(file => {
        const lang = file.replace(/\.json$/, '');
        langs.push(lang);
        const text = require(dir + file);

        for (const id in text) {
            if (text.hasOwnProperty(id)) {
                index[id] = index[id] || {};
                index[id][lang] = text[id] === undefined ? id : text[id];
            }
        }
    });

    const keys = Object.keys(index);
    keys.sort();

    if (!fs.existsSync(dir + '/flat/')) {
        fs.mkdirSync(dir + '/flat/');
    }

    langs.forEach(lang => {
        const words = [];
        keys.forEach(key => {
            words.push(index[key][lang]);
        });
        fs.writeFileSync(dir + '/flat/' + lang + '.txt', words.join('\n'));
    });
    fs.writeFileSync(dir + '/flat/index.txt', keys.join('\n'));
    done();
});

gulp.task('flat=>i18n', done => {
    if (!fs.existsSync(dir + '/flat/')) {
        console.error(dir + '/flat/ directory not found');
        return done();
    }
    const keys = fs.readFileSync(dir + '/flat/index.txt').toString().split(/[\r\n]/);
    while (!keys[keys.length - 1]) keys.splice(keys.length - 1, 1);

    const files = fs.readdirSync(dir + '/flat/').filter(name => name.match(/\.txt$/) && name !== 'index.txt');
    const index = {};
    const langs = [];
    files.forEach(file => {
        const lang = file.replace(/\.txt$/, '');
        langs.push(lang);
        const lines = fs.readFileSync(dir + '/flat/' + file).toString().split(/[\r\n]/);
        lines.forEach((word, i) => {
            index[keys[i]] = index[keys[i]] || {};
            index[keys[i]][lang] = word;
        });
    });
    langs.forEach(lang => {
        const words = {};
        keys.forEach((key, line) => {
            if (!index[key]) {
                console.log('No word ' + key + ', ' + lang + ', line: ' + line);
            }
            words[key] = index[key][lang];
        });
        fs.writeFileSync(dir + '/' + lang + '.json', JSON.stringify(words, null, 2));
    });
    done();
});

gulp.task('flat=>words.js', done => {
    languagesFlat2words(__dirname + '/front-end/src/');
    done();
});

gulp.task('words.js=>flat', done => {
    words2languagesFlat(__dirname + '/front-end/src/');
    done();
});

gulp.task('translate', async function () {
    let yandex;
    const i = process.argv.indexOf('--yandex');
    if (i > -1) {
        yandex = process.argv[i + 1];
    }
    if (fs.existsSync('./front-end/src/i18n/en/en.json')) {
        let enTranslations = require('./front-end/src/i18n/en.json');
        for (let l in languages) {
            if (!languages.hasOwnProperty(l)) continue;

            console.log('Translate Text: ' + l);
            let existing = {};
            if (fs.existsSync('./front-end/src/i18n/' + l + '.json')) {
                existing = require('./front-end/src/i18n/' + l + '.json');
            }
            for (let t in enTranslations) {
                if (enTranslations.hasOwnProperty(t) && !existing[t]) {
                    existing[t] = await translate(enTranslations[t], l, yandex);
                }
            }
            fs.writeFileSync('./front-end/src/i18n/' + l + '.json', JSON.stringify(existing, null, 4));
        }
    }
});

gulp.task('translateAndUpdateWordsJS', gulp.series('translate'));

gulp.task('downloadAndSyncOne', done => {
    const ADAPTER_NAME = 'landroid-s'; // <= edit this

    // delete all
    /*consts.LANGUAGES.forEach(lang => {
        utils.delDir(consts.SRC_DOC_DIR + lang + '/adapterref/iobroker.' + ADAPTER_NAME);
    });*/
    //utils.delDir(consts.SRC_DOC_DIR + 'de/adapterref/iobroker.' + ADAPTER_NAME);
    //utils.delDir(consts.SRC_DOC_DIR + 'en/adapterref/iobroker.' + ADAPTER_NAME);

    return adapters.buildAdapterContent(ADAPTER_NAME)
        .then(content => {
            documentation.syncDocs('iobroker.' + ADAPTER_NAME, () => {
                Promise.all(consts.LANGUAGES.map(lang => adapters.copyAdapterToFrontEnd(lang, ADAPTER_NAME)))
                    .then(() => {
                        done();
                    });
            });
        });

});

gulp.task('syncDocsTest', done => documentation.syncDocs('iobroker.ping', done));

gulp.task('downloadAdapterTest', () => {
    return adapters.buildAdapterContent('ping')
        .then(content => {
            console.log(JSON.stringify(content));
        });
});

// removes adapter from all languages "gulp remove --adapterName"
gulp.task('remove', done => {
    if (!process.argv[3]) {
        console.error('Please specify adapter name as "gulp remove --adapterName"');
    } else {
        let adapter = process.argv[3].replace(/^-+/, '').replace(/^iobroker\./i, '');
        console.log(process.argv[3].replace(/^-+/, ''));

        adapter = 'iobroker.' + adapter;
        consts.LANGUAGES.forEach(lang => {
            const dir = consts.SRC_DOC_DIR + lang + '/adapterref/' + adapter;
            if (fs.existsSync(dir)) {
                try {
                    utils.delDir(dir);
                } catch (e) {
                    console.error('Cannot delete ' + path.normalize(dir));
                }
            }
        });
    }

    done();
});

gulp.task('0.clean', done => {
    consts.LANGUAGES.forEach(lang => utils.delDir(path.join(consts.FRONT_END_DIR, lang)));
    done();
});

// translate and copy blogs
gulp.task('1.blog', () => {
    return blog.build()
        .then(() => console.log('Done'));
});

// download all adapters
gulp.task('2.downloadAdapters', () =>
    adapters.buildAdapterContent()
        .then(content =>
            console.log(JSON.stringify(content))));

gulp.task('3.downloadVisCordova', done => {
    request('https://raw.githubusercontent.com/ioBroker/ioBroker.vis.cordova/master/README.md', (err, state, body) => {
        fs.writeFileSync(path.join(consts.SRC_DOC_DIR, 'en/viz/app.md'),
            body.replace('[по русски](README.ru.md)', '').replace('[auf Deutsch](README.de.md)', '').replace('[auf Deutsch](README.de.md)', '').replace('# ioBroker.vis.cordova', '# vis App')
        );
        request('https://raw.githubusercontent.com/ioBroker/ioBroker.vis.cordova/master/README.ru.md', (err, state, body) => {
            fs.writeFileSync(path.join(consts.SRC_DOC_DIR, 'ru/viz/app.md'), body.replace('# ioBroker.vis.cordova', '# vis App'));
            request('https://raw.githubusercontent.com/ioBroker/ioBroker.vis.cordova/master/README.de.md', (err, state, body) => {
                fs.writeFileSync(path.join(consts.SRC_DOC_DIR, 'de/viz/app.md'), body.replace('# ioBroker.vis.cordova', '# vis App'));
                done && done();
            });
        });
    });
});

// translate all documents: adapters and docu
gulp.task('4.syncDocs', done => documentation.syncDocs(done));

// combine
gulp.task('5.faq', done => faq.processFiles(consts.SRC_DOC_DIR).then(() => done()));

// Build content.md file
gulp.task('6.documentation', () =>
    // build content
    documentation.processContent(path.join(consts.SRC_DOC_DIR, 'content.md')));

// copy all docs/LN/adapterref/* => engine/front-end/public/LN/adapterref/*
gulp.task('7.copyFiles', () => {
    return Promise.all([adapters.copyAllAdaptersToFrontEnd(), documentation.processFiles(consts.SRC_DOC_DIR)]);
});

function scanDir(folder, root, result) {
    result  = result || [];
    if (!root) {
        root = folder;
        folder = '/';
    }
    const newRoot = path.join(root, folder);
    const files = fs.readdirSync(newRoot);
    files.forEach(f => {
        const stat = fs.statSync(path.join(newRoot, f));
        if (stat.isDirectory()) {
            scanDir(path.join(folder, f), root, result);
        } else if (f.match(/\.md$/)) {
            result.push(path.join(folder, f).replace(/\\/g, '/'));
        }
    });
    return result;
}

gulp.task('8.createSitemap', done => {
    const root = 'https://doc.iobroker.net/';
    const links = [
        '#{lang}/download',
        '#{lang}/blog',
        '#{lang}/documentation',
        '#{lang}/adapters',
        '#{lang}/statistics',
        '#{lang}/imprint',
        '#{lang}/privacy',
    ];
    // add blogs
    consts.LANGUAGES.forEach(lang => {
        const files = fs.readdirSync(consts.FRONT_END_DIR + lang + '/blog').filter(f => f.match(/\.md$/));
        files.forEach(f => links.push('#' + lang.replace('{lang}', lang) + '/blog/' + f.replace(/\.md$/, '')));
    });
    // add documents
    consts.LANGUAGES.forEach(lang => {
        const files = scanDir(consts.FRONT_END_DIR + lang).filter(f => !f.startsWith('/adapterref') && !f.startsWith('/blog'));
        files.forEach(f => links.push('#' + lang + '/documentation' + f));
    });

    // add adapters
    consts.LANGUAGES.forEach(lang => {
        const files = scanDir(consts.FRONT_END_DIR + lang + '/adapterref');
        files.forEach(f => links.push('#' + lang + '/adapters/adapterref' + f));
    });

    // generate file
    let lines = [];
    links.forEach(l => {
        if (l.indexOf('{lang}') !== -1) {
            consts.LANGUAGES.forEach(lang => lines.push(root + l.replace('{lang}', lang)));
        } else {
            lines.push(root + l);
        }
    });
    fs.writeFileSync(consts.FRONT_END_DIR + 'sitemap.txt', lines.join('\n'));
    done();
});

gulp.task('9.build', done => {
    const { exec } = require('child_process');

    if (!fs.existsSync(__dirname + '/front-end/node_modules')) {
        const child = exec('npm install', {stdio: [process.stdin, process.stdout, process.stderr], cwd: __dirname + '/front-end'});
        child.on('exit', (code, signal) => {
            const child_ = exec('npm run build', {stdio: [process.stdin, process.stdout, process.stderr], cwd: __dirname + '/front-end'});
            child_.on('exit', (code, signal) => done());
        });
    } else {
        const child = exec('npm run build', {stdio: [process.stdin, process.stdout, process.stderr], cwd: __dirname + '/front-end'});
        child.on('exit', (code, signal) => done());
    }
});

gulp.task('default', gulp.series(
    '0.clean',              // clean dir
    '1.blog',               // translate and copy blogs
    '2.downloadAdapters',   // download all adapters an create adapter.json
    '3.downloadVisCordova', // download app documentation
    '4.syncDocs',           // translate documents and adapters
    '5.faq',                // combine FAQ together
    '6.documentation',      // create content for documentation
    '7.copyFiles',          // copy all adapters and docs to public
    '8.createSitemap',      // create sitemap for google
    '9.build'               // build react site
));


