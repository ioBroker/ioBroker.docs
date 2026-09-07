/*!
 * Copyright 2019-2026, bluefox <dogafox@gmail.com>
 * ioBroker documentation site builder
 * Date: 2019-11-11
 *
 * This file and everything in build-lib is started directly as TypeScript (`node tasks.mts ...`),
 * so node.js >= 22.19 is required, because node strips the types on the fly.
 */
import path from 'node:path';
import fs from 'node:fs';
import { exec } from 'node:child_process';
import axios from 'axios';

import * as documentation from './build-lib/documentation.mts';
import * as faq from './build-lib/faq.mts';
import * as adapters from './build-lib/adapters.mts';
import * as blog from './build-lib/blog.mts';
import * as consts from './build-lib/consts.mts';
import * as utils from './build-lib/utils.mts';
import * as translation from './build-lib/translation.mts';
import type { LanguageWords, MultiLanguageWords } from './build-lib/types.mts';

const EMPTY = '';
const fileName = 'temp_words.js';

const dir = `${import.meta.dirname}/front-end/src/i18n/`;
const languages: Record<string, LanguageWords> = {
    en: {},
    de: {},
    ru: {},
    pt: {},
    nl: {},
    fr: {},
    it: {},
    es: {},
    pl: {},
    uk: {},
    'zh-cn': {},
};

function lang2data(lang: LanguageWords, isFlat?: LanguageWords): string {
    let str = isFlat ? '' : '{\n';
    let count = 0;
    for (const w in lang) {
        if (Object.prototype.hasOwnProperty.call(lang, w)) {
            count++;
            if (isFlat) {
                str += `${lang[w] === '' ? isFlat[w] || w : lang[w]}\n`;
            } else {
                const key = `    "${w.replace(/"/g, '\\"')}": `;
                str += `${key}"${lang[w].replace(/"/g, '\\"')}",\n`;
            }
        }
    }
    if (!count) {
        return isFlat ? '' : '{\n}';
    }
    if (isFlat) {
        return str;
    }
    return `${str.substring(0, str.length - 2)}\n}`;
}

function readWordJs(src: string): MultiLanguageWords | null {
    try {
        let words: string = fs.readFileSync(`${src}i18n/${fileName}`).toString();
        words = words.substring(words.indexOf('{'), words.length);
        words = words.substring(0, words.lastIndexOf(';'));

        // The old words.js is a JavaScript file and not JSON, so it must be evaluated
        // eslint-disable-next-line @typescript-eslint/no-implied-eval
        const resultFunc = new Function(`return ${words};`) as () => MultiLanguageWords;

        return resultFunc();
    } catch {
        return null;
    }
}

function padRight(text: string, totalLength: number): string {
    return text + (text.length < totalLength ? new Array(totalLength - text.length).join(' ') : '');
}

function writeWordJs(data: MultiLanguageWords, src: string): void {
    let text = '';
    text += '/*global systemDictionary:true */\n';
    text += "'use strict';\n\n";
    text += 'systemDictionary = {\n';
    for (const word in data) {
        if (Object.prototype.hasOwnProperty.call(data, word)) {
            text += `    ${padRight(`"${word.replace(/"/g, '\\"')}": {`, 50)}`;
            let line = '';
            for (const lang in data[word]) {
                if (Object.prototype.hasOwnProperty.call(data[word], lang)) {
                    line += `"${lang}": "${padRight(`${data[word][lang].replace(/"/g, '\\"')}",`, 50)} `;
                }
            }
            if (line) {
                line = line.trim();
                line = line.substring(0, line.length - 1);
            }
            text += `${line}},\n`;
        }
    }
    text += '};';
    fs.writeFileSync(`${src}/i18n/${fileName}`, text);
}

function languagesFlat2words(src: string): void {
    const dirs: string[] = fs.readdirSync(`${src}i18n/flat/`);
    const langs: Record<string, LanguageWords> = {};
    const bigOne: MultiLanguageWords = {};
    const order = Object.keys(languages);
    dirs.sort((a, b) => {
        const posA = order.indexOf(a);
        const posB = order.indexOf(b);
        if (posA === -1 && posB === -1) {
            if (a > b) {
                return 1;
            }
            if (a < b) {
                return -1;
            }
            return 0;
        } else if (posA === -1) {
            return -1;
        } else if (posB === -1) {
            return 1;
        }
        if (posA > posB) {
            return 1;
        }
        if (posA < posB) {
            return -1;
        }
        return 0;
    });
    const keys: string[] = fs.readFileSync(`${src}i18n/flat/index.txt`).toString().split('\n');

    for (let l = 0; l < dirs.length; l++) {
        if (dirs[l] === 'index.txt') {
            continue;
        }
        let lang = dirs[l];
        const values: string[] = fs.readFileSync(`${src}i18n/flat/${lang}`).toString().split('\n');
        lang = lang.replace('.txt', '');
        langs[lang] = {};
        keys.forEach((word, i) => (langs[lang][word] = values[i]));

        const words = langs[lang];
        for (const word in words) {
            if (Object.prototype.hasOwnProperty.call(words, word)) {
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
            if (Object.prototype.hasOwnProperty.call(aWords, w)) {
                if (!bigOne[w]) {
                    console.warn(`Take from actual words.js: ${w}`);
                    bigOne[w] = aWords[w];
                }
                dirs.forEach(lang => {
                    if (temporaryIgnore.includes(lang)) {
                        return;
                    }
                    if (!bigOne[w][lang]) {
                        console.warn(`Missing "${lang}": ${w}`);
                    }
                });
            }
        }
    }

    writeWordJs(bigOne, src);
}

function words2languagesFlat(src: string): void {
    const langs: Record<string, LanguageWords> = Object.assign({}, languages);
    const data = readWordJs(src);
    if (data) {
        for (const word in data) {
            if (Object.prototype.hasOwnProperty.call(data, word)) {
                for (const lang in data[word]) {
                    if (Object.prototype.hasOwnProperty.call(data[word], lang)) {
                        const _lang = lang.replace('.txt', '');
                        langs[_lang][word] = data[word][_lang];
                        //  pre-fill all other languages
                        for (const j in langs) {
                            if (Object.prototype.hasOwnProperty.call(langs, j)) {
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
            if (!Object.prototype.hasOwnProperty.call(langs, l)) {
                continue;
            }
            const obj: LanguageWords = {};
            for (let k = 0; k < keys.length; k++) {
                obj[keys[k]] = langs[l][keys[k]];
            }
            langs[l] = obj;
        }
        if (!fs.existsSync(`${src}i18n/`)) {
            fs.mkdirSync(`${src}i18n/`);
        }
        if (!fs.existsSync(`${src}i18n/flat`)) {
            fs.mkdirSync(`${src}i18n/flat`);
        }
        for (const ll in langs) {
            if (!Object.prototype.hasOwnProperty.call(langs, ll)) {
                continue;
            }
            fs.writeFileSync(`${src}i18n/flat/${ll}.txt`, lang2data(langs[ll], langs.en));
        }
        fs.writeFileSync(`${src}i18n/flat/index.txt`, keys.join('\n'));
    } else {
        console.error(`Cannot read or parse ${fileName}`);
    }
}

function scanDir(folder: string, root?: string, result?: string[]): string[] {
    const files: string[] = result || [];
    if (!root) {
        root = folder;
        folder = '/';
    }
    const newRoot = path.join(root, folder);
    const names: string[] = fs.readdirSync(newRoot);
    names.forEach(f => {
        const stat = fs.statSync(path.join(newRoot, f));
        if (stat.isDirectory()) {
            scanDir(path.join(folder, f), root, files);
        } else if (f.match(/\.md$/)) {
            files.push(path.join(folder, f).replace(/\\/g, '/'));
        }
    });
    return files;
}

function _0_clean(): void {
    consts.LANGUAGES.forEach(lang => utils.delDir(path.join(consts.FRONT_END_DIR, lang)));
}

async function _1_blog(): Promise<void> {
    await blog.build();
}

/** Download all adapters */
async function _2_downloadAdapters(): Promise<unknown> {
    return adapters.buildAdapterContent();
}

async function _3_downloadJsonConfig(): Promise<void> {
    const result = await axios<string>(
        'https://raw.githubusercontent.com/ioBroker/ioBroker.admin/master/packages/jsonConfig/README.md',
    );
    fs.writeFileSync(path.join(consts.SRC_DOC_DIR, 'en/dev/adapterjsonconfig.md'), result.data);
}

async function _4_downloadVisCordova(): Promise<void> {
    const resultEn = await axios<string>(
        'https://raw.githubusercontent.com/ioBroker/ioBroker.vis.cordova/master/README.md',
    );
    fs.writeFileSync(
        path.join(consts.SRC_DOC_DIR, 'en/viz/app.md'),
        resultEn.data
            .replace('[по русски](README.ru.md)', '')
            .replace('[auf Deutsch](README.de.md)', '')
            .replace('[auf Deutsch](README.de.md)', '')
            .replace('# ioBroker.vis.cordova', '# vis App'),
    );

    const resultRu = await axios<string>(
        'https://raw.githubusercontent.com/ioBroker/ioBroker.vis.cordova/master/README.ru.md',
    );
    fs.writeFileSync(
        path.join(consts.SRC_DOC_DIR, 'ru/viz/app.md'),
        resultRu.data.replace('# ioBroker.vis.cordova', '# vis App'),
    );

    const resultDe = await axios<string>(
        'https://raw.githubusercontent.com/ioBroker/ioBroker.vis.cordova/master/README.de.md',
    );
    fs.writeFileSync(
        path.join(consts.SRC_DOC_DIR, 'de/viz/app.md'),
        resultDe.data.replace('# ioBroker.vis.cordova', '# vis App'),
    );
}

/** Translate all documents: adapters and documentation */
async function _5_syncDocs(): Promise<void> {
    await new Promise<void>(resolve => documentation.syncDocs(resolve));
}

/** Combine FAQ */
async function _6_faq(): Promise<void> {
    await faq.processFiles(consts.SRC_DOC_DIR);
}

/** Build content.md file */
function _7_documentation(): void {
    // build content
    documentation.processContent(path.join(consts.SRC_DOC_DIR, 'content.md'));
}

// Copy all docs/LN/adapterref/* => engine/front-end/public/LN/adapterref/*
async function _8_copyFiles(): Promise<void> {
    await Promise.all([adapters.copyAllAdaptersToFrontEnd(), documentation.processFiles(consts.SRC_DOC_DIR)]);
}

function _9_createSitemap(): void {
    const root = 'https://www.iobroker.net/';
    const links: string[] = [
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
        const files: string[] = fs
            .readdirSync(`${consts.FRONT_END_DIR + lang}/blog`)
            .filter((f: string) => f.match(/\.md$/));
        files.forEach(f => links.push(`#${lang.replace('{lang}', lang)}/blog/${f.replace(/\.md$/, '')}`));
    });
    // add documents
    consts.LANGUAGES.forEach(lang => {
        const files = scanDir(consts.FRONT_END_DIR + lang).filter(
            f => !f.startsWith('/adapterref') && !f.startsWith('/blog'),
        );
        files.forEach(f => links.push(`#${lang}/documentation${f}`));
    });

    // add adapters
    consts.LANGUAGES.forEach(lang => {
        const files = scanDir(`${consts.FRONT_END_DIR + lang}/adapterref`);
        files.forEach(f => links.push(`#${lang}/adapters/adapterref${f}`));
    });

    // generate file
    const lines: string[] = [];
    links.forEach(l => {
        if (l.includes('{lang}')) {
            consts.LANGUAGES.forEach(lang => lines.push(root + l.replace('{lang}', lang)));
        } else {
            lines.push(root + l);
        }
    });
    fs.writeFileSync(`${consts.FRONT_END_DIR}sitemap.txt`, lines.join('\n'));
}

function _10_build(): Promise<void> {
    const SRC_DATA_DIR = `${import.meta.dirname}/front-end/build/data`;
    const TGT_DATA_DIR = `${import.meta.dirname}/front-end/data`;

    // save data folder
    if (fs.existsSync(SRC_DATA_DIR)) {
        if (!fs.existsSync(TGT_DATA_DIR)) {
            fs.mkdirSync(TGT_DATA_DIR);
        }

        fs.readdirSync(SRC_DATA_DIR).forEach((name: string) =>
            fs.writeFileSync(`${TGT_DATA_DIR}/${name}`, fs.readFileSync(`${SRC_DATA_DIR}/${name}`)),
        );
    }

    /** Restore the data folder that was deleted by the build */
    const restoreDataDir = (): void => {
        if (!fs.existsSync(SRC_DATA_DIR)) {
            fs.mkdirSync(SRC_DATA_DIR, { recursive: true });
        }
        if (fs.existsSync(TGT_DATA_DIR)) {
            fs.readdirSync(TGT_DATA_DIR).forEach((name: string) =>
                fs.writeFileSync(`${SRC_DATA_DIR}/${name}`, fs.readFileSync(`${TGT_DATA_DIR}/${name}`)),
            );
        }
    };

    /** Run one npm command in the front-end directory and show its output */
    const runInFrontEnd = (command: string): Promise<void> =>
        new Promise<void>(resolve => {
            const child = exec(command, { cwd: `${import.meta.dirname}/front-end` });
            child.stdout?.pipe(process.stdout);
            child.stderr?.pipe(process.stderr);
            child.on('exit', () => resolve());
        });

    const buildFrontEnd = async (): Promise<void> => {
        await runInFrontEnd('npm run build');
        // restore data folder
        restoreDataDir();
    };

    if (!fs.existsSync(`${import.meta.dirname}/front-end/node_modules`)) {
        return runInFrontEnd('npm install -f').then(() => buildFrontEnd());
    }

    return buildFrontEnd();
}

async function translateTask(): Promise<void> {
    if (!fs.existsSync(`${dir}en.json`)) {
        console.error(`Cannot find ${dir}en.json`);
        return;
    }
    const enTranslations: LanguageWords = JSON.parse(fs.readFileSync(`${dir}en.json`).toString());

    for (const lang in languages) {
        if (!Object.prototype.hasOwnProperty.call(languages, lang)) {
            continue;
        }

        console.log(`Translate Text: ${lang}`);
        let existing: LanguageWords = {};
        if (fs.existsSync(`${dir}${lang}.json`)) {
            existing = JSON.parse(fs.readFileSync(`${dir}${lang}.json`).toString());
        }
        for (const word in enTranslations) {
            if (Object.prototype.hasOwnProperty.call(enTranslations, word) && !existing[word]) {
                existing[word] = await translation.translateText('en', enTranslations[word], lang);
            }
        }
        fs.writeFileSync(`${dir}${lang}.json`, JSON.stringify(existing, null, 4));
    }
}

/** Convert all i18n JSON files into flat text files, that could be translated */
function i18n2flat(): void {
    const files: string[] = fs.readdirSync(dir).filter((name: string) => name.match(/\.json$/));
    const index: MultiLanguageWords = {};
    const langs: string[] = [];
    files.forEach(file => {
        const lang = file.replace(/\.json$/, '');
        langs.push(lang);
        const text: LanguageWords = JSON.parse(fs.readFileSync(dir + file).toString());

        for (const id in text) {
            if (Object.prototype.hasOwnProperty.call(text, id)) {
                index[id] = index[id] || {};
                index[id][lang] = text[id] === undefined ? id : text[id];
            }
        }
    });

    const keys = Object.keys(index);
    keys.sort();

    if (!fs.existsSync(`${dir}/flat/`)) {
        fs.mkdirSync(`${dir}/flat/`);
    }

    langs.forEach(lang => {
        const words: string[] = [];
        keys.forEach(key => words.push(index[key][lang]));
        fs.writeFileSync(`${dir}/flat/${lang}.txt`, words.join('\n'));
    });
    fs.writeFileSync(`${dir}/flat/index.txt`, keys.join('\n'));
}

/** Convert the flat text files back into the i18n JSON files */
function flat2i18n(): void {
    if (!fs.existsSync(`${dir}/flat/`)) {
        console.error(`${dir}/flat/ directory not found`);
        process.exit(1);
    }
    const keys: string[] = fs
        .readFileSync(`${dir}/flat/index.txt`)
        .toString()
        .split(/[\r\n]/);
    while (!keys[keys.length - 1]) {
        keys.splice(keys.length - 1, 1);
    }

    const files: string[] = fs
        .readdirSync(`${dir}/flat/`)
        .filter((name: string) => name.match(/\.txt$/) && name !== 'index.txt');
    const index: MultiLanguageWords = {};
    const langs: string[] = [];
    files.forEach(file => {
        const lang = file.replace(/\.txt$/, '');
        langs.push(lang);
        const lines: string[] = fs
            .readFileSync(`${dir}/flat/${file}`)
            .toString()
            .split(/[\r\n]/);
        lines.forEach((word, i) => {
            index[keys[i]] = index[keys[i]] || {};
            index[keys[i]][lang] = word;
        });
    });
    langs.forEach(lang => {
        const words: LanguageWords = {};
        keys.forEach((key, line) => {
            if (!index[key]) {
                console.log(`No word ${key}, ${lang}, line: ${line}`);
            }
            words[key] = index[key][lang];
        });
        fs.writeFileSync(`${dir}/${lang}.json`, JSON.stringify(words, null, 2));
    });
}

/** Remove one adapter from all languages: "npm run remove -- --adapterName" */
function removeAdapter(): void {
    if (!process.argv[3]) {
        console.error('Please specify adapter name as "npm run remove -- --adapterName"');
        return;
    }
    let adapter = process.argv[3].replace(/^-+/, '').replace(/^iobroker\./i, '');
    console.log(process.argv[3].replace(/^-+/, ''));

    adapter = `iobroker.${adapter}`;
    consts.LANGUAGES.forEach(lang => {
        const adapterDir = `${consts.SRC_DOC_DIR + lang}/adapterref/${adapter}`;
        if (fs.existsSync(adapterDir)) {
            try {
                utils.delDir(adapterDir);
            } catch {
                console.error(`Cannot delete ${path.normalize(adapterDir)}`);
            }
        }
    });
}

/** Download, translate and copy only one adapter */
async function downloadAndSyncOne(): Promise<void> {
    const ADAPTER_NAME = 'shelly'; // <= edit this

    // delete all
    /* consts.LANGUAGES.forEach(lang => {
        utils.delDir(`${consts.SRC_DOC_DIR + lang}/adapterref/iobroker.${ADAPTER_NAME}`);
    }); */

    await adapters.buildAdapterContent(ADAPTER_NAME);

    await new Promise<void>(resolve =>
        documentation.syncDocs(`iobroker.${ADAPTER_NAME}`, () => {
            void Promise.all(consts.LANGUAGES.map(lang => adapters.copyAdapterToFrontEnd(lang, ADAPTER_NAME))).then(
                () => resolve(),
            );
        }),
    );

    console.log('Done');
}

/** Build the site but do not download or translate anything */
async function buildOnly(): Promise<void> {
    _0_clean(); // clean dir
    await _1_blog(); // translate and copy blogs
    await _6_faq(); // combine FAQ
    _7_documentation(); // create content for documentation
    await _8_copyFiles(); // copy all adapters and docs to the public
    _9_createSitemap(); // create site-map for google
    await _10_build(); // build react site
}

/** Download, translate and build everything */
async function buildAll(): Promise<void> {
    _0_clean(); // clean dir
    await _1_blog(); // translate and copy blogs
    await _2_downloadAdapters(); // download all adapters and create adapter.json
    await _3_downloadJsonConfig(); // download jsonConfig documentation
    await _4_downloadVisCordova(); // download app documentation
    await _5_syncDocs(); // translate documents and adapters
    await _6_faq(); // combine FAQ
    _7_documentation(); // create content for documentation
    await _8_copyFiles(); // copy all adapters and docs to the public
    _9_createSitemap(); // create site-map for google
    await _10_build(); // build react site
}

async function main(): Promise<void> {
    if (process.argv.includes('--i18n=>flat')) {
        i18n2flat();
    } else if (process.argv.includes('--flat=>i18n')) {
        flat2i18n();
    } else if (process.argv.includes('--flat=>words.js')) {
        languagesFlat2words(`${import.meta.dirname}/front-end/src/`);
    } else if (process.argv.includes('--words.js=>flat')) {
        words2languagesFlat(`${import.meta.dirname}/front-end/src/`);
    } else if (process.argv.includes('--translate')) {
        await translateTask();
        console.log('Done');
    } else if (process.argv.includes('--downloadAndSyncOne')) {
        await downloadAndSyncOne();
    } else if (process.argv.includes('--syncDocsTest')) {
        documentation.syncDocs('iobroker.shelly');
    } else if (process.argv.includes('--downloadAdapterTest')) {
        const content = await adapters.buildAdapterContent('shelly');
        console.log(JSON.stringify(content));
    } else if (process.argv.includes('--remove')) {
        // removes adapter from all languages
        removeAdapter();
    } else if (process.argv.includes('--0.clean')) {
        _0_clean();
    } else if (process.argv.includes('--1.blog')) {
        // translate and copy blogs
        await _1_blog();
        console.log('Done');
    } else if (process.argv.includes('--2.downloadAdapters')) {
        // download all adapters
        const content = await _2_downloadAdapters();
        console.log(JSON.stringify(content));
    } else if (process.argv.includes('--3.downloadJsonConfig')) {
        await _3_downloadJsonConfig();
        console.log('Done');
    } else if (process.argv.includes('--4.downloadVisCordova')) {
        await _4_downloadVisCordova();
        console.log('Done');
    } else if (process.argv.includes('--5.syncDocs')) {
        // translate all documents: adapters and documentation
        await _5_syncDocs();
        console.log('Done');
    } else if (process.argv.includes('--6.faq')) {
        await _6_faq();
        console.log('Done');
    } else if (process.argv.includes('--7.documentation')) {
        // build content.md file
        _7_documentation();
        console.log('Done');
    } else if (process.argv.includes('--8.copyFiles')) {
        // copy all docs/LN/adapterref/* => engine/front-end/public/LN/adapterref/*
        await _8_copyFiles();
        console.log('Done');
    } else if (process.argv.includes('--9.createSitemap')) {
        _9_createSitemap();
    } else if (process.argv.includes('--10.build')) {
        await _10_build();
        console.log('Done');
    } else if (process.argv.includes('--buildOnly')) {
        await buildOnly();
    } else {
        await buildAll();
    }
}

main().catch((error: unknown) => {
    console.error(error);
    process.exit(1);
});
