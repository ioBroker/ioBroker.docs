/*!
 * Conversion between the old "words.js" dictionary and the i18n directories.
 *
 * ATTENTION: this module is currently not used by the build pipeline. `tasks.mts` has its own
 * implementation of the flat <=> i18n conversion, that works with the JSON files in front-end/src/i18n.
 */
import fs from 'node:fs';

import { translateText } from './translation.mts';
import type { LanguageWords, MultiLanguageWords } from './types.mts';

const fileName = 'words.js';
const EMPTY = '';

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

/** Serialize the words of one language either as JSON or as flat text file */
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

/** Read the systemDictionary out of words.js */
function readWordJs(src: string): MultiLanguageWords | null {
    try {
        let words: string;
        if (fs.existsSync(`${src}js/${fileName}`)) {
            words = fs.readFileSync(`${src}js/${fileName}`).toString();
        } else {
            words = fs.readFileSync(src + fileName).toString();
        }
        words = words.substring(words.indexOf('{'), words.length);
        words = words.substring(0, words.lastIndexOf(';'));
        // words.js is a JavaScript file and not JSON, so it must be evaluated
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

/** Write the systemDictionary into words.js */
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
    if (fs.existsSync(`${src}js/${fileName}`)) {
        fs.writeFileSync(`${src}js/${fileName}`, text);
    } else {
        fs.writeFileSync(src + fileName, text);
    }
}

/** Fill all languages with the words of the dictionary and pre-fill the missing ones with an empty string */
function spreadWords(data: MultiLanguageWords): Record<string, LanguageWords> {
    const langs: Record<string, LanguageWords> = Object.assign({}, languages);
    for (const word in data) {
        if (!Object.prototype.hasOwnProperty.call(data, word)) {
            continue;
        }
        for (const lang in data[word]) {
            if (Object.prototype.hasOwnProperty.call(data[word], lang)) {
                langs[lang] ||= {};
                langs[lang][word] = data[word][lang];
                //  pre-fill all other languages
                for (const j in langs) {
                    if (Object.prototype.hasOwnProperty.call(langs, j)) {
                        langs[j][word] ||= EMPTY;
                    }
                }
            }
        }
    }
    return langs;
}

/** words.js => i18n/LANG/translations.json */
export function words2languages(src: string): void {
    const data = readWordJs(src);
    if (!data) {
        console.error(`Cannot read or parse ${fileName}`);
        return;
    }
    const langs = spreadWords(data);

    if (!fs.existsSync(`${src}i18n/`)) {
        fs.mkdirSync(`${src}i18n/`);
    }
    for (const l in langs) {
        if (!Object.prototype.hasOwnProperty.call(langs, l)) {
            continue;
        }
        const keys = Object.keys(langs[l]);
        keys.sort();
        const obj: LanguageWords = {};
        for (let k = 0; k < keys.length; k++) {
            obj[keys[k]] = langs[l][keys[k]];
        }
        if (!fs.existsSync(`${src}i18n/${l}`)) {
            fs.mkdirSync(`${src}i18n/${l}`);
        }
        fs.writeFileSync(`${src}i18n/${l}/translations.json`, lang2data(obj));
    }
}

/** words.js => i18n/LANG/flat.txt */
export function words2languagesFlat(src: string): void {
    const data = readWordJs(src);
    if (!data) {
        console.error(`Cannot read or parse ${fileName}`);
        return;
    }
    const langs = spreadWords(data);

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
    for (const ll in langs) {
        if (!Object.prototype.hasOwnProperty.call(langs, ll)) {
            continue;
        }
        if (!fs.existsSync(`${src}i18n/${ll}`)) {
            fs.mkdirSync(`${src}i18n/${ll}`);
        }
        fs.writeFileSync(`${src}i18n/${ll}/flat.txt`, lang2data(langs[ll], langs.en));
    }
    fs.writeFileSync(`${src}i18n/flat.txt`, keys.join('\n'));
}

/** Sort the language directories in the order of `languages` and put the unknown ones in front */
function sortLanguageDirs(dirs: string[]): string[] {
    const order = Object.keys(languages);
    return dirs.sort((a, b) => {
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
        }
        if (posA === -1) {
            return -1;
        }
        if (posB === -1) {
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
}

/** Merge the words, that are read from the language directories, with the actual words.js and write it back */
function mergeAndWrite(src: string, dirs: string[], bigOne: MultiLanguageWords, ignore: string[]): void {
    // read actual words.js
    const aWords = readWordJs(src);
    if (aWords) {
        // Merge words together
        for (const w in aWords) {
            if (!Object.prototype.hasOwnProperty.call(aWords, w)) {
                continue;
            }
            if (!bigOne[w]) {
                console.warn(`Take from actual words.js: ${w}`);
                bigOne[w] = aWords[w];
            }
            dirs.forEach(lang => {
                if (ignore.includes(lang)) {
                    return;
                }
                if (!bigOne[w][lang]) {
                    console.warn(`Missing "${lang}": ${w}`);
                }
            });
        }
    }
    writeWordJs(bigOne, src);
}

/** i18n/LANG/flat.txt => words.js */
export function languagesFlat2words(src: string): void {
    const dirs = sortLanguageDirs(fs.readdirSync(`${src}i18n/`));
    const bigOne: MultiLanguageWords = {};
    const keys = fs.readFileSync(`${src}i18n/flat.txt`).toString().split('\n');

    for (let l = 0; l < dirs.length; l++) {
        if (dirs[l] === 'flat.txt') {
            continue;
        }
        const lang = dirs[l];
        const values = fs.readFileSync(`${src}i18n/${lang}/flat.txt`).toString().split('\n');
        const words: LanguageWords = {};
        keys.forEach((word, i) => (words[word] = values[i]));

        for (const word in words) {
            if (Object.prototype.hasOwnProperty.call(words, word)) {
                bigOne[word] ||= {};
                if (words[word] !== EMPTY) {
                    bigOne[word][lang] = words[word];
                }
            }
        }
    }

    mergeAndWrite(src, dirs, bigOne, ['flat.txt']);
}

/** i18n/LANG/translations.json => words.js */
export function languages2words(src: string): void {
    const dirs = sortLanguageDirs(fs.readdirSync(`${src}i18n/`));
    const bigOne: MultiLanguageWords = {};

    for (let l = 0; l < dirs.length; l++) {
        if (dirs[l] === 'flat.txt') {
            continue;
        }
        const lang = dirs[l];
        const words: LanguageWords = JSON.parse(
            fs.readFileSync(`${src}i18n/${lang}/translations.json`).toString('utf-8'),
        );

        for (const word in words) {
            if (Object.prototype.hasOwnProperty.call(words, word)) {
                bigOne[word] ||= {};
                if (words[word] !== EMPTY) {
                    bigOne[word][lang] = words[word];
                }
            }
        }
    }

    mergeAndWrite(src, dirs, bigOne, ['flat.txt']);
}

/** Translate one word into all languages, that are still missing */
export async function translateNotExisting(obj: LanguageWords, baseText?: string): Promise<void> {
    const text = obj.en || baseText;
    if (!text) {
        return;
    }
    for (const lang in languages) {
        if (!obj[lang]) {
            const time = Date.now();
            obj[lang] = await translateText('en', text, lang);
            console.log(`en -> ${lang} ${Date.now() - time} ms`);
        }
    }
}
