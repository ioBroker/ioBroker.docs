import axios from 'axios';
import fs from 'node:fs';
import { v2 } from '@google-cloud/translate';

import type { MarkdownCode, MarkdownLink, MarkdownPart, MarkdownPartType, TranslatedMarkdown } from './types.mts';
import { translateMarkdown } from './markdownTranslate.mts';

// Your Google Cloud Platform project ID
const projectId = 'web-site-1377';
process.env.GOOGLE_APPLICATION_CREDENTIALS = `${import.meta.dirname}/../google-keys.json`;

const apiKeyFile = `${import.meta.dirname}/../../api-key.json`;
const key: string = fs.existsSync(apiKeyFile)
    ? ((JSON.parse(fs.readFileSync(apiKeyFile).toString('utf-8')) as { key?: string }).key ?? '')
    : '';

// Instantiates a client
const translate = key ? new v2.Translate({ key }) : new v2.Translate({ projectId });

/**
 * Choose the right translation API
 *
 * @param text The text to translate
 * @param targetLang The target language
 * @param yandex Yandex API key. If empty, google will be used
 * @param sourceLang The source language
 * @param html the text is an HTML document - the engine then keeps the tags and only touches what
 * stands between them, which is what `translateMarkdownDocument` relies on
 */
async function _translateText(
    text: string,
    targetLang: string,
    yandex: string | false,
    sourceLang?: string,
    html?: boolean,
): Promise<string> {
    if (yandex) {
        return translateYandex(text, targetLang, yandex, html);
    }
    return translateGoogle(text, targetLang, sourceLang, html);
}

/**
 * Translates text with Yandex API
 *
 * @param text The text to translate
 * @param targetLang The target language
 * @param yandex Yandex API key
 */
async function translateYandex(text: string, targetLang: string, yandex: string, html?: boolean): Promise<string> {
    if (targetLang === 'zh-cn') {
        targetLang = 'zh';
    }
    try {
        const url = `https://translate.yandex.net/api/v1.5/tr.json/translate?key=${yandex}&text=${encodeURIComponent(text)}&lang=en-${targetLang}${html ? '&format=html' : ''}`;
        const result = await axios<{ text?: string[] }>(url, { validateStatus: status => status === 200 });
        const json = result.data;
        if (json?.text?.[0]) {
            return json.text[0];
        }
        throw new Error(`Invalid answer: ${JSON.stringify(json)}`);
    } catch (e) {
        throw new Error(`Could not translate to "${targetLang}": ${e}`);
    }
}

const countGoogle: { start: number | null; count: number } = {
    start: null,
    count: 0,
};

function translateGoogleSync(
    text: string,
    targetLang: string,
    sourceLang: string | undefined,
    html: boolean | undefined,
    cb: (error: Error | null, text?: string) => void,
): void {
    if (!key && process.env.GOOGLE_APPLICATION_CREDENTIALS_JSON) {
        fs.writeFileSync(process.env.GOOGLE_APPLICATION_CREDENTIALS!, process.env.GOOGLE_APPLICATION_CREDENTIALS_JSON);
    }

    if (key || fs.existsSync(process.env.GOOGLE_APPLICATION_CREDENTIALS!)) {
        // we may not send more than 100.000 chars per minute, so we must calculate it: https://cloud.google.com/translate/quotas
        if (countGoogle.start && countGoogle.count + text.length >= 99999) {
            // Wait max one minute and reset stats
            setTimeout(
                () => {
                    countGoogle.start = Date.now();
                    countGoogle.count = 0;
                    translateGoogleSync(text, targetLang, sourceLang, html, cb);
                },
                Math.min(0, countGoogle.start + 60000 - Date.now()),
            );
        }
        countGoogle.start ||= Date.now();
        countGoogle.count += text.length;

        translate
            .translate(text, { to: targetLang, from: sourceLang, format: html ? 'html' : 'text' })
            .then(results => cb(null, results[0]))
            .catch((err: Error) => cb(err));
    } else {
        throw new Error('Cannot find any google keys!');
    }
}

/**
 * Translates text with Google API
 *
 * @param text The text to translate
 * @param targetLang The target language
 * @param sourceLang The source language (optional)
 */
async function translateGoogle(text: string, targetLang: string, sourceLang?: string, html?: boolean): Promise<string> {
    try {
        return await new Promise<string>((resolve, reject) => {
            translateGoogleSync(text, targetLang, sourceLang, html, (err, translated) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(translated || '');
                }
            });
        });
    } catch (e) {
        throw new Error(`Could not translate to "${targetLang}": ${e}`);
    }
}

/**
 * Split a markdown document into logical parts, that can be translated one by one.
 * Links, images and inline code are replaced with placeholders, so the translator cannot destroy them.
 *
 * @param text markdown document
 * @param addIds give every part a random ID, so it can be found again in the translated document
 */
function partsTake(text: string, addIds?: boolean): MarkdownPart[] {
    const lines = text.trim().replace(/\r/g, '').split('\n');

    let parts: MarkdownPart[] = [];
    // remove leading empty lines
    while (lines.length && !lines[0].trim()) {
        lines.shift();
    }

    // remove trailing empty lines
    while (lines.length && !lines[lines.length - 1].trim()) {
        lines.pop();
    }

    // 'source' is only a parser state and not a part type
    let current: MarkdownPartType | 'source' | '' = '';
    lines.forEach(line => {
        let last = parts.length - 1;

        let lineTrimmed = line.trim();

        if (current === 'code') {
            if (lineTrimmed.endsWith('```')) {
                current = '';
            }
            parts[last].lines.push(line.trimEnd());
            return;
        }

        // detect [SomeLink]:(at the end of the document)
        if (lineTrimmed.match(/^\[[^\]]+]:/)) {
            // link
            parts.push({ type: 'decoration', lines: [lineTrimmed] });
            current = '';
        } else if (!lineTrimmed || lineTrimmed.startsWith('=====')) {
            parts.push({ type: 'decoration', lines: [lineTrimmed] });
            current = '';
        } else if (lineTrimmed.match(/^-\s/) || lineTrimmed.match(/^\*\s/) || lineTrimmed.match(/^\d+\.\s/)) {
            // detect
            //    - blabla
            //    - seconds blabla
            // or
            //    * blabla
            //    * seconds blabla
            // or
            //    1. blabla
            //    2. seconds blabla
            parts.push({ type: 'list', lines: [] });
            last++;
            parts[last].lines.push(line);
            current = '';
        } else if (lineTrimmed.startsWith('```')) {
            parts.push({ type: 'code', lines: [] });
            last++;

            parts[last].lines.push(line);

            if (!lineTrimmed.substring(3).endsWith('```')) {
                current = 'code';
            } else {
                current = '';
            }
            line = '';
        } else if (lineTrimmed.startsWith('|') && lineTrimmed.endsWith('|')) {
            parts.push({ type: 'table', lines: [line] });
        } else if (lineTrimmed.startsWith('<!-- ID: ')) {
            if (parts[last]) {
                parts[last].id = parseInt(line.substring('<!-- ID: '.length, line.length - 4), 10);
            } else {
                console.warn(`ID ${line.substring('<!-- ID: '.length, line.length - 4)} skipped`);
            }
            current = '';
        } else if (current === 'source') {
            if (lineTrimmed.endsWith(' -->')) {
                current = '';
                line = lineTrimmed.substring(0, line.length - 4);
            }
            parts[last].source!.push(line);
        } else if (lineTrimmed.startsWith('<!-- SOURCE: ')) {
            if (!parts[last]) {
                console.error('Source without text!!!');
            }
            if (!lineTrimmed.endsWith(' -->')) {
                current = 'source';
            } else {
                lineTrimmed = lineTrimmed.substring(0, line.length - 4);
                current = '';
            }
            parts[last].source ||= [];
            line = lineTrimmed.substring('<!-- SOURCE: '.length);

            // extract id
            const m = line.match(/^(\d+)\s|^(\d+)$/);
            if (m) {
                parts[last].id = parseInt(m[1] || m[2], 10);
                line = line.substring((m[1] || m[2]).length + 1);
            }
            if (line) {
                parts[last].source!.push(line);
            } else {
                parts[last].doNotTranslate = true;
            }
        } else if (lineTrimmed.startsWith('#')) {
            // If chapter
            parts.push({ type: 'header', lines: [line] });
        } else if (line) {
            if (!current) {
                current = 'p';
                parts.push({ type: current, lines: [] });
                last++;
            }
            parts[last].lines.push(line);
        } else {
            current = '';
        }

        let changed = false;
        // Find images in line and store it
        let m = line.match(/!\[[^]*]\([^)]+\)/g);
        if (m) {
            if (!current) {
                current = 'p';
                parts.push({ type: current, lines: [] });
                last++;
            }

            m.forEach(item => {
                const mm = item.match(/^!\[([^]*)]\(([^)]+)\)$/);
                if (mm) {
                    mm[2] = mm[2].trim();
                    const pos = mm[2].indexOf(' ');
                    const images: MarkdownLink[] = (parts[last].images ||= []);
                    // if title exists (size instructions start with "=")
                    if (pos !== -1 && mm[2][pos + 1] !== '=') {
                        images.push({
                            text: mm[1].trim(),
                            link: mm[2].substring(0, pos),
                            title: mm[2]
                                .substring(pos + 1)
                                .trim()
                                .replace(/^"|"$/g, ''),
                        });
                    } else {
                        images.push({
                            text: mm[1].trim(),
                            link: mm[2],
                        });
                    }

                    line = line.replace(item, `§§IIIII_${images.length - 1}§§`);
                    changed = true;
                }
            });
        }

        // Find links in line and store it
        m = line.match(/\[[^]*]\([^)]+\)/g);
        if (m) {
            if (!current) {
                current = 'p';
                parts.push({ type: current, lines: [] });
                last++;
            }

            m.forEach(item => {
                const mm = item.match(/^\[([^]*)]\(([^)]+)\)$/);
                if (mm) {
                    mm[2] = mm[2].trim();
                    const links: MarkdownLink[] = (parts[last].links ||= []);
                    links.push({
                        text: mm[1].trim(),
                        link: mm[2].trim(),
                    });

                    line = line.replace(item, `§§LLLLL_${links.length - 1}§§`);
                    changed = true;
                }
            });
        }
        // Find codes in line and store it
        m = line.match(/```[^`]+```/g);
        if (m) {
            if (!current) {
                current = 'p';
                parts.push({ type: current, lines: [] });
                last++;
            }

            m.forEach(item => {
                const mm = item.match(/^```([^`]+)```$/);
                if (mm) {
                    const codes: MarkdownCode[] = (parts[last].codes ||= []);
                    codes.push({ code: mm[1], single: false });
                    // do not CAOT, because it can be replaced with cyrillic one
                    line = line.replace(item, `§§JJJJJ_${codes.length - 1}§§`);
                    changed = true;
                }
            });
        }

        m = line.match(/`[^`]+`/g);
        if (m) {
            if (!current) {
                current = 'p';
                parts.push({ type: current, lines: [] });
                last++;
            }

            m.forEach(item => {
                const mm = item.match(/^`([^`]+)`$/);
                if (mm) {
                    const codes: MarkdownCode[] = (parts[last].codes ||= []);
                    codes.push({ code: mm[1], single: true });
                    line = line.replace(item, `§§SSSSS_${codes.length - 1}§§`);
                    changed = true;
                }
            });
        }
        if (changed) {
            parts[last].lines[parts[last].lines.length - 1] = line;
        }
    });

    parts = parts.filter(part => part.lines.length);

    if (addIds) {
        parts.forEach(part => {
            part.id ||= Math.round(Math.random() * 1000000);
        });
    }

    return parts;
}

/**
 * Build a markdown document out of the parts and put the links, images and codes back in place
 *
 * @param parts parts of the document
 * @param saveNoSource do not write the "<!-- SOURCE: ... -->" and "<!-- ID: ... -->" comments
 */
function partsSave(parts: MarkdownPart[], saveNoSource?: boolean): string {
    const lines: string[] = [];
    parts.forEach((part, i) => {
        if (part.type === 'code') {
            // Remove by all lines the tabs
            if (part.lines[0][0] === ' ') {
                const pos = part.lines[0].indexOf('`');
                part.lines.forEach((_, j) => {
                    const tabs = part.lines[j].substring(0, pos);
                    if (tabs.trim()) {
                        console.log('Invalid formatting of code!!!');
                        console.log(part.lines.join('\n'));
                    }
                    part.lines[j] = part.lines[j].substring(pos);
                });
            }
        }

        let text = (part.text || part.lines.join('\n')).trimEnd();

        if (text.replace(/\n/g, '').trim() || part.original?.replace(/\n$/, '')) {
            text = text.replace(/\n$/, '');
            if (part.type === 'header') {
                const m = text.match(/^(#*) (.+)$/);
                if (m) {
                    text = `${m[1]} ${m[2][0].toUpperCase()}${m[2].substring(1)}`;
                }
            }

            if (part.links) {
                part.links.forEach((item, j) => {
                    const reg = new RegExp(`§§L+_${j}§§`);
                    text = text.replace(reg, `[${item.text}](${item.link})`);
                });
            }
            if (part.codes) {
                part.codes.forEach((item, j) => {
                    if (item.single) {
                        const reg = new RegExp(`§§S+_${j}§§`);
                        text = text.replace(reg, `\`${item.code}\``);
                    } else {
                        const reg = new RegExp(`§§J+_${j}§§`);
                        text = text.replace(reg, `\`\`\`${item.code}\`\`\``);
                    }
                });
            }
            if (part.images) {
                part.images.forEach((item, j) => {
                    const reg = new RegExp(`§§I+_${j}§§`);
                    text = text.replace(reg, `![${item.text}](${item.link}${item.title ? ` "${item.title}"` : ''})`);
                });
            }

            if (part.original) {
                // if the last line is empty, put <!----> just before it
                if (text.match(/\n$/)) {
                    lines.push(text);
                } else {
                    lines.push(`${text}\n`);
                }
                if (!saveNoSource) {
                    lines.push(`<!-- SOURCE: ${part.id} ${part.original.replace(/\n$/, '')} -->\n`);
                }
            } else {
                if (text.match(/\n$/)) {
                    lines.push(text);
                } else {
                    lines.push(`${text}\n`);
                }
                if (!saveNoSource) {
                    lines.push(`<!-- ID: ${part.id} -->\n`);
                }
            }

            // do not add new line after headers and tables (only after last table line)
            if (part.type !== 'header' && part.type !== 'table' && part.type !== 'list') {
                lines.push('\n');
            } else if (part.type === 'table' && parts[i + 1] && parts[i + 1].type !== 'table') {
                lines.push('\n');
            } else if (part.type === 'list' && parts[i + 1] && parts[i + 1].type !== 'list') {
                lines.push('\n');
            }
        }
    });

    // remove double new lines
    let changed;
    do {
        changed = false;
        for (let i = lines.length - 2; i >= 0; i--) {
            if (!lines[i + 1] && !lines[i]) {
                lines.splice(i + 1, 1);
                changed = true;
            }
        }
    } while (changed);

    return lines.join('');
}

/** Translate the texts and the titles of all links and images of one part */
function translateLinks(fromLang: string, part: MarkdownPart, toLang: string, cb: () => void): void {
    if (!part.links && !part.images) {
        cb();
        return;
    }

    let item = part.links?.find(item => item.text && !item.translated);
    item ||= part.images?.find(item => item.text && !item.translated);
    if (item) {
        const link = item;
        void translateText(fromLang, link.text, toLang).then(text => {
            link.original = link.text;
            link.text = text;
            link.translated = true;
            setTimeout(() => translateLinks(fromLang, part, toLang, cb), 0);
        });
        return;
    }

    const image = part.images?.find(item => item.title && !item.translatedTitle);
    if (image) {
        void translateText(fromLang, image.title!, toLang).then(title => {
            image.originalTitle = image.title;
            image.title = title;
            image.translatedTitle = true;
            setTimeout(() => translateLinks(fromLang, part, toLang, cb), 0);
        });
    } else {
        cb();
    }
}

/** Translate all parts, that are not translated yet, one after another */
function partsTranslate(
    fromLang: string,
    partsSource: MarkdownPart[],
    toLang: string,
    partsTarget: MarkdownPart[] | undefined,
    cb: (parts: MarkdownPart[]) => void,
): void {
    const target: MarkdownPart[] = partsTarget || [];

    let untranslated: number | undefined;
    for (let i = 0; i < partsSource.length; i++) {
        // do not translate twice
        if (partsSource[i].translated) {
            continue;
        }
        // do not translate code, but copy that
        if (partsSource[i].type === 'code' || partsSource[i].type === 'decoration') {
            if (!target[i] || partsSource[i].lines.join().trim() !== target[i].lines.join().trim()) {
                target[i] = JSON.parse(JSON.stringify(partsSource[i]));
            }
            partsSource[i].translated = true;
            continue;
        }
        // if nothing exists => translate
        if (!target[i]?.source) {
            untranslated = i;
            break;
        }
        // Do not translate text, modified by user
        if (target[i].doNotTranslate) {
            partsSource[i].translated = true;
            continue;
        }
        // If text is not empty and differs => re-translate
        if (
            partsSource[i].lines
                .join()
                .replace(/[\n\s]/g, '')
                .trim() &&
            target[i].source!.join('').trim() !== partsSource[i].lines.join('').trim()
        ) {
            untranslated = i;
            break;
        } else if (!target[i].original) {
            partsSource[i].translated = true;
            target[i].original = target[i].lines.join('\n');
        }
    }

    if (untranslated === undefined) {
        cb(target);
        return;
    }

    const pos = untranslated;
    target[pos] = JSON.parse(JSON.stringify(partsSource[pos]));
    target[pos].original = target[pos].lines.join('\n');

    void translateText(fromLang, target[pos].original, toLang)
        .then(text => {
            if (target[pos].type === 'table') {
                if (!text.trim().startsWith('|')) {
                    text = `| ${text}`;
                }
                if (!text.trim().endsWith('|')) {
                    text = `${text} |`;
                }
            }

            target[pos].text = text; // remember translated text
            translateLinks(fromLang, target[pos], toLang, () => {
                partsSource[pos].translated = true;
                setTimeout(() => partsTranslate(fromLang, partsSource, toLang, target, cb), 0);
            });
        })
        .catch(e => {
            console.error(`Cannot translate: ${e}`);
            partsSource[pos].translated = true;
            target[pos].text = target[pos].original;
        });
}

/** Bring the already translated parts in the same order as the source parts, using their IDs */
function tryToMerge(source: MarkdownPart[], target: MarkdownPart[]): MarkdownPart[] {
    const newTarget: MarkdownPart[] = [];
    source.forEach((item, i) => {
        const found = target.find(it => it.id === item.id);
        if (found) {
            newTarget[i] = found;
            target.splice(target.indexOf(found), 1);
        } else {
            newTarget[i] = JSON.parse(JSON.stringify(item));
        }
    });
    return newTarget;
}

/**
 * Translate a markdown document and re-use the already existing translation, where it is still up to date
 *
 * @param fromLang source language
 * @param text source document
 * @param toLang target language
 * @param translatedText the existing translation
 * @param saveNoSource do not write the source text as comment into the translation
 * @param fileName only used for the log output
 */
export function translateMD(
    fromLang: string,
    text: string,
    toLang: string,
    translatedText?: string,
    saveNoSource?: boolean,
    fileName?: string,
): Promise<TranslatedMarkdown> {
    return new Promise(resolve => {
        const partsSource = partsTake(text, true);
        let partsTarget = translatedText ? partsTake(translatedText) : undefined;

        if (partsTarget) {
            partsTarget = tryToMerge(partsSource, partsTarget);
        }

        console.log(`____________TRANSLATE ${fromLang} => ${toLang}_______________: ${fileName}`);

        partsTranslate(fromLang, partsSource, toLang, partsTarget, parts =>
            resolve({ result: partsSave(parts, saveNoSource), source: partsSave(partsSource) }),
        );
    });
}

/** Translate one text and repair the markdown formatting, the translator has destroyed */
/**
 * Translates a whole markdown document at once.
 *
 * The way `translateMD` below does it - line by line, with placeholders in place of every image,
 * link and piece of inline code - is the older one. This one hands the document to
 * `markdownTranslate.mts`, which keeps it in its syntax tree and sends only the text. Images,
 * links, code blocks and raw HTML are never part of the payload, and the engine sees whole
 * paragraphs in one request instead of one at a time, so a term stays the same word throughout.
 *
 * @param fromLang the language the document is written in
 * @param text the document, frontmatter included
 * @param toLang the language to translate into
 */
export async function translateMarkdownDocument(fromLang: string, text: string, toLang: string): Promise<string> {
    return translateMarkdown(text, html => _translateText(html, toLang, false, fromLang, true));
}

/**
 * Translates a document, with the whole-document engine where that can be vouched for.
 *
 * `translateMarkdownDocument` refuses a document whose markdown does not survive being written
 * back - a readme that mixes raw HTML into a paragraph can come back with a heading where none
 * was. Fifteen of the nine hundred English documents are like that. Rather than keeping a list of
 * them, every document is offered to the new engine and the ones it will not vouch for go through
 * the old one, which has translated them for years.
 *
 * @param fromLang the language the document is written in
 * @param text the document body, without its header
 * @param toLang the language to translate into
 * @param translatedText what the target file holds today - only the old engine can reuse it
 * @param fileName the source file, for the log
 */
export async function translateDocument(
    fromLang: string,
    text: string,
    toLang: string,
    translatedText?: string,
    fileName?: string,
): Promise<string> {
    try {
        return await translateMarkdownDocument(fromLang, text, toLang);
    } catch (error) {
        console.error(`!!!! ${fileName || 'document'}: ${String(error)}`);
        console.error(`     translated the old way instead`);
        const result = await translateMD(fromLang, text, toLang, translatedText, true, fileName);
        return result.result;
    }
}

export function translateText(fromLang: string, text: string, toLang: string): Promise<string> {
    if (!text) {
        return Promise.resolve('');
    }

    // detect LINKS, IMAGES and CODES and if the line has only that, do not translate it
    if (text.trim().match(/^[^\w]*§§[ILJ]+_\d+§§[^\w]*$/)) {
        return Promise.resolve(text);
    } else if (text.trim().match(/^[-|:]$/)) {
        // detect table header and do not translate it
        return Promise.resolve(text);
    } else if (!text.trim().match(/\w/)) {
        // it must be some words and not only special chars
        return Promise.resolve(text);
    }

    // remove new lines, because translator thinks it is end of sentence.
    if (text.includes('\n')) {
        // allow \n only after .
        const lines = text.split('\n');
        const newLines = [lines[0].trim()];
        for (let i = 1; i < lines.length; i++) {
            // if previous line ends with . or | => start new line
            if (lines[i - 1].trim().match(/[.|]$/) || lines[i].trim().startsWith('* ')) {
                newLines.push(lines[i].trim());
            } else {
                // add to previous line
                newLines[newLines.length - 1] += ` ${lines[i].trim()}`;
            }
        }
        text = newLines.join('\n');
    }

    console.log(`${fromLang}=>${toLang}: ${text}`);

    return _translateText(text, toLang, false, fromLang).then(translated => {
        // restore formatting of *, **, *** and __
        // | ** точка данных ** | ** Описание ** |  => | **точка данных** | **Описание** |
        let result = translated;

        if (result.startsWith('!&gt;') || result.startsWith('?&gt;')) {
            result = result.replace('&gt;', '>');
        }
        result = result.replace('° C', '°C');
        result = result.replace('° F', '°F');
        result = result.replace('& lt;', '&lt;');
        result = result.replace('& Lt;', '&lt;');
        result = result.replace('& lt ;', '&lt;');
        result = result.replace('& Lt ;', '&lt;');
        result = result.replace('& gt;', '&gt;');
        result = result.replace('& Gt;', '&gt;');
        result = result.replace('& gt ;', '&gt;');
        result = result.replace('& Gt ;', '&gt;');
        result = result.replace('& amp;', '&amp;');
        result = result.replace('% s', ' %s ');
        result = result.replace(/HTTP:\s\/\//i, 'http://');
        result = result.replace(/HTTPS:\s\/\//i, 'https://');
        result = result.replace(/IoBroker/g, 'ioBroker');

        /*
         * The translation turns the plain hyphen of the English source into a typographic
         * dash: "a - b" comes back as "a \u2013 b". Nothing in the sources asks for that.
         * The style guide requires the short form written with the minus sign
         * (docs/de/community/styleguidedoc.md), Denis asked for the same on 08.09.2026,
         * and at the start of a line the dash is worse than cosmetic: "\u2013 (foxriver76)
         * ..." is no longer a list item and the bullet disappears from the rendered page.
         * So this restores what the source had. The character class covers the figure
         * dash, en dash, em dash and horizontal bar; the ASCII hyphen and the minus sign
         * are deliberately left alone.
         * What this does NOT do is turn a parenthetical dash into the comma that German
         * usually wants there - that is a judgment call per sentence, and hand-written
         * pages make it themselves.
         */
        result = result.replace(/[\u2012\u2013\u2014\u2015]/g, '-');

        const urls = result.match(/https?:\/\/[-.\w\d]+:\s\d+/g);
        if (urls) {
            urls.forEach(url => {
                result = result.replace(url, url.replace(/\s/g, ''));
            });
        }

        // start with ***
        if (result.includes(' *** ')) {
            const parts = `${result} `.split(' ***');
            if (parts.length > 1) {
                if (parts.length % 2 === 0) {
                    console.error(`Cannot restore formatting!: ${result}`);
                } else {
                    result = '';
                    parts.forEach((part, i) => {
                        if (i % 2 === 0) {
                            result += part;
                        } else {
                            result += ` ***${part.trim()}*** `;
                        }
                    });
                    result = result.replace(/\s\s/g, ' ');
                }
            }
        }
        if (result.includes(' **_ ')) {
            const parts = `${result} `.split(/ \*\*_| _\*\*/);
            if (parts.length > 1) {
                if (parts.length % 2 === 0) {
                    console.error(`Cannot restore formatting!: ${result}`);
                } else {
                    result = '';
                    parts.forEach((part, i) => {
                        if (i % 2 === 0) {
                            result += part;
                        } else {
                            result += ` **_${part.trim()}_** `;
                        }
                    });
                    result = result.replace(/\s\s/g, ' ');
                }
            }
        }

        if (result.includes(' ** ')) {
            // then with **
            const parts = `${result} `.split(/ \*\*[^*]/);
            if (parts.length > 1) {
                if (parts.length % 2 === 0) {
                    console.error(`Cannot restore formatting!: ${result}`);
                } else {
                    result = '';
                    parts.forEach((part, i) => {
                        if (i % 2 === 0) {
                            result += part;
                        } else {
                            result += ` **${part.trim()}** `;
                        }
                    });
                }
            }
            result = result.replace(/\s\s/g, ' ');
        }

        // Fix in one line * text * => *text*
        if (result.trimStart().startsWith('* ') && result.trimEnd().endsWith(' *')) {
            result = result.replace(/\*\s/, '*');
            result = result.trimEnd().replace(/\s\*$/, '*');
        }

        // then with *
        if (result.includes(' * ')) {
            const parts = `${result} `.split(/ \*[^*]/);
            if (parts.length > 1) {
                if (parts.length % 2 === 0) {
                    console.error(`Cannot restore formatting!: ${result}`);
                } else {
                    result = '';
                    parts.forEach((part, i) => {
                        if (i % 2 === 0) {
                            result += part;
                        } else {
                            result += ` *${part.trim()}* `;
                        }
                    });
                    result = result.replace(/\s\s/g, ' ');
                }
            }
        }

        result = result.replace(/& EMSP;/gi, '&emsp;');
        result = result.replace(/& amp;/gi, '&amp;');

        return result;
    });
}
