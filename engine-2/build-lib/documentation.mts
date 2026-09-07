import fs from 'node:fs';
import path from 'node:path';

import * as utils from './utils.mts';
import * as consts from './consts.mts';
import * as translation from './translation.mts';
import type { Content, ContentPage, LanguageCode, SyncTask, Translated } from './types.mts';

const IGNORE = ['/adapterref'];

/** Title of one entry of content.md, with the optional link to the document */
interface TitleWords extends Translated {
    link: string;
}

/**
 * Parse one line of content.md
 *
 * Possible inputs:
 * - `[en:Basics;de:Einleitung;ru:Основы](basics/README)`
 * - `de:Grundlagen;en:Fundamentals`
 * - `Title`
 *
 * @param title one line of content.md without the leading "*"
 * @param inFolder directory, the linked documents are read from
 */
function translateTitle(title: string, inFolder?: string): TitleWords {
    const words: TitleWords = { link: '' };
    title = title.trim();
    if (title.startsWith('[')) {
        const m = title.match(/\[(.+)]\((.*)\)/);
        if (m) {
            title = m[1];
            words.link = m[2].trim();
            if (!words.link.includes('.')) {
                words.link += '.md';
            }
        }
    }

    const langs = title.split(';');
    langs.forEach(lang => {
        const parts = lang.split(':');
        if (parts.length === 2) {
            words[parts[0].trim()] = parts[1].trim();
        } else {
            words.en = lang.trim();
        }
    });

    consts.LANGUAGES.forEach(lang => {
        if (!words[lang]) {
            words[lang] = words.en || words.de;
            if (words[lang][2] !== '!') {
                words[lang] = `${lang}!${words[lang]}`;
            }
        }
    });

    // read title from file
    if (words.link) {
        consts.LANGUAGES.forEach(lang => {
            const name = path.join(inFolder || consts.SRC_DOC_DIR, lang, words.link);
            if (fs.existsSync(name)) {
                const data = fs.readFileSync(name).toString('utf-8');
                const title = utils.getTitle(data);
                if ((!words[lang] || words[lang].includes('!') || words[lang].startsWith('_')) && title) {
                    words[lang] = title;
                }
            }
        });
    }

    return words;
}

/**
 * Build content.json for the front-end out of docs/content.md
 *
 * ATTENTION: this function was async before, but it never awaited anything, so it is synchronous now.
 */
export function processContent(filePath: string): Content {
    const lines = fs.readFileSync(filePath).toString().replace(/\r/g, '').split('\n');
    const content: Content = { pages: {} };
    const levels: (ContentPage | Content)[] = [content];

    lines.forEach(line => {
        const pos = line.indexOf('*');
        if (pos === -1) {
            return;
        }
        const level = pos / 2;
        const words = translateTitle(line.substring(pos + 1));
        // Capitalize first letter of title
        words.ru = words.ru[0].toUpperCase() + words.ru.substring(1);

        const link = words.link;
        if (link) {
            // ignore links if en/"link" does not exist
            if (!fs.existsSync(path.join(consts.SRC_DOC_DIR, 'en', link))) {
                console.error(`DOCUMENT ${link} does not exist, but listed in content.md!`);
                return;
            }
            const header = utils.extractHeader(
                fs.readFileSync(path.join(consts.SRC_DOC_DIR, 'en', link)).toString('utf8'),
            );
            if (header.header.template) {
                console.error(`DOCUMENT ${link} is just template, do not include it into content.`);
                return;
            }
        }

        const title: Translated = { ...words };
        delete (title as Partial<TitleWords>).link;

        const obj: ContentPage = { title };
        if (link) {
            obj.content = link;
        }
        const pages: Record<string, ContentPage> = (levels[level].pages ||= {});
        pages[words.en] = obj;
        levels[level + 1] = obj;

        // special case for FAQ
        if (words.en !== 'FAQ') {
            return;
        }

        const faqPages: Record<string, ContentPage> = (obj.pages ||= {});
        const files = fs
            .readdirSync(path.join(consts.SRC_DOC_DIR, 'de', 'faq'))
            .filter(name => name.match(/^_\d/))
            .sort();

        files.forEach(file => {
            if (!fs.existsSync(path.join(consts.SRC_DOC_DIR, 'de', 'faq', file, 'README.md'))) {
                console.error(`DOCUMENT ${file} does not exist, but listed in content.md!`);
                return;
            }
            const faqWords = translateTitle(`[${file}](faq/${file.replace(/\.md$/, '')})`, consts.FRONT_END_DIR);
            const faqLink = faqWords.link;
            const faqTitle: Translated = { ...faqWords };
            delete (faqTitle as Partial<TitleWords>).link;

            const _obj: ContentPage = { title: faqTitle };
            if (faqLink) {
                _obj.content = faqLink;
            }
            faqPages[faqWords.en] = _obj;
        });
    });

    const name = filePath.replace(/\\/g, '/').split('/').pop()!.replace(/\.md$/, '.json');
    fs.writeFileSync(consts.FRONT_END_DIR + name, JSON.stringify(content, null, 2));
    return content;
}

/** Read one file and copy it into the front-end directory */
function processFile(fileName: string, root: string): void {
    root = root.replace(/\\/g, '/');
    fileName = fileName.replace(/\\/g, '/');

    let data: string | Buffer = fs.readFileSync(fileName);
    if (fileName.match(/\.md$/)) {
        const { header, body } = utils.extractHeader(data.toString());

        header.editLink = `${consts.GITHUB_EDIT_ROOT}docs/${fileName.replace(root, '')}`;

        let prefix = fileName.replace(root, '');
        const pos = prefix.lastIndexOf('/');
        if (pos !== -1) {
            prefix = prefix.substring(0, pos + 1);
        }

        const res = utils.replaceImages(body, prefix, true);

        data = utils.addHeader(res.body, header);
    }

    utils.writeSafe(path.join(consts.FRONT_END_DIR, fileName.replace(root, '/')).replace(/\\/g, '/'), data);
}

/** Fix the relative image links of a document, that was translated into another directory */
function replaceImages(text: string, sourceFile: string, targetFile: string): string {
    const lines = text.split('\n');
    targetFile = targetFile.replace(/\\/g, '/');
    sourceFile = sourceFile.replace(/\\/g, '/');
    let i = 0;
    while (sourceFile[i] === targetFile[i]) {
        i++;
    }
    targetFile = targetFile.substring(i);
    sourceFile = sourceFile.substring(i);
    const tParts = targetFile.split('/');
    const sParts = sourceFile.split('/');
    sParts.pop();

    const prefix = Array(tParts.length).join('../') + sParts.join('/');

    lines.forEach((line, i) => {
        // Find images in line and store it
        const m = line.match(/!\[[^]*]\([^)]+\)/g);
        if (m) {
            m.forEach(item => {
                const mm = item.match(/^!\[([^]*)]\(([^)]+)\)$/);
                if (mm) {
                    let link = mm[2].trim();
                    const text = mm[1].trim();
                    const pos = link.indexOf(' ');
                    let title = '';
                    if (pos !== -1) {
                        title = link
                            .substring(pos + 1)
                            .trim()
                            .replace(/^"|"$/g, '');
                        link = link.substring(0, pos);
                    }
                    if (!link.match(/^https?:/)) {
                        link = path.normalize(prefix + (link[0] === '/' ? link : `/${link}`)).replace(/\\/g, '/');

                        lines[i] = lines[i].replace(item, `![${text}](${link}${title ? ` "${title}"` : ''})`);
                    }
                }
            });
        }
    });
    return lines.join('\n');
}

/**
 * Translate one document into another language, if it is missing or outdated
 *
 * @returns true if the file was translated
 */
async function translateFile(
    sourceFileName: string,
    fromLang: LanguageCode,
    toLang: LanguageCode,
    root?: string,
): Promise<boolean> {
    root ||= consts.SRC_DOC_DIR;
    const targetFileName = sourceFileName.replace(`/${fromLang}/`, `/${toLang}/`);

    const resultSrc = utils.extractHeader(fs.readFileSync(sourceFileName).toString('utf-8'));

    const header = resultSrc.header;
    if (header.translatedFrom) {
        // this is not the source
        return false;
    }

    header.translatedFrom = fromLang;
    header.translatedWarning = consts.TRANSLATION_NOTICE[toLang];
    header.editLink = `${consts.GITHUB_EDIT_ROOT}docs/${targetFileName.replace(root, '')}`;

    const data = utils.extractLicenseAndChangelog(resultSrc.body);
    const { badges, body } = utils.extractBadges(data.body);

    const localHash = utils.getFileHash(body);

    let actualText: string | undefined;
    if (fs.existsSync(targetFileName)) {
        const resultTarget = utils.extractHeader(fs.readFileSync(targetFileName).toString('utf-8'));
        actualText = resultTarget.body;
        if (resultTarget.header.translatedFrom !== fromLang) {
            return false;
        }

        // Check src hash and compare it with stored one
        if (
            resultTarget.header.hash === localHash &&
            (resultTarget.header.template || false) === (header.template || false)
        ) {
            return false;
        }
    }

    const result = await translation.translateMD(fromLang, body, toLang, actualText, true, sourceFileName);
    actualText = replaceImages(result.result, sourceFileName, targetFileName);

    header.title = header.title || utils.getTitle(body);
    header.title = await translation.translateText(fromLang, header.title, toLang);
    header.translatedFrom = fromLang;
    header.translatedWarning = consts.TRANSLATION_NOTICE[toLang];
    header.hash = localHash;

    // translate badges
    const badgeNames = Object.keys(badges);
    const translatedNames = await Promise.all(
        badgeNames.map(name => translation.translateText(fromLang, name, toLang)),
    );
    const nBadges: Translated = {};
    badgeNames.forEach((name, i) => (nBadges[translatedNames[i]] = badges[name]));

    actualText = utils.addBadgesToBody(actualText, nBadges);

    utils.writeSafe(
        targetFileName,
        utils.addHeader(utils.addChangelogAndLicense(actualText, data.changelog, data.license), header),
    );
    console.log(
        `WARNING: File ${sourceFileName.replace(root, '/')} was translated from ${fromLang} to ${toLang} automatically`,
    );
    return true;
}

/** Translate all documents of one language into another language, one after another */
function sync2Languages(
    fromLang: LanguageCode,
    toLang: LanguageCode,
    testDir: string,
    cb?: () => void,
    files?: string[],
): void {
    files ||= utils.getAllFiles(consts.SRC_DOC_DIR + fromLang, true).sort();

    if (testDir) {
        const _testDir = `/${testDir}/`;
        files = files.filter(file => file.includes(_testDir));
    }

    if (!files.length) {
        cb?.();
        return;
    }

    const remaining = files;
    const file = remaining.shift()!;
    console.log(`Sync ${fromLang} => ${toLang} - ${file}`);
    void translateFile(file, fromLang, toLang).then(translated => {
        if (translated) {
            const parts = file.replace(/\\/g, '/').split('/');
            parts.pop();

            // Copy media files
            const fls = utils.getAllFiles(parts.join('/'), false).sort();
            fls.filter(f => !f.match(/\.md$/) && !f.match(/affiliate\.json$/)).forEach(file =>
                utils.writeSafe(file.replace(`/${fromLang}/`, `/${toLang}/`), fs.readFileSync(file)),
            );
        }
        setImmediate(() => sync2Languages(fromLang, toLang, testDir, cb, remaining));
    });
}

/** Execute the translation tasks one after another */
function processTasks(tasks: SyncTask[], testDir: string, cb?: () => void): void {
    if (!tasks?.length) {
        cb?.();
    } else {
        const task = tasks.shift()!;
        sync2Languages(task.fromLang, task.toLang, testDir, () =>
            setTimeout(() => processTasks(tasks, testDir, cb), 0),
        );
    }
}

/**
 * Translate all documents into all languages
 *
 * @param testDir if given, only the documents of this sub-directory will be translated
 * @param cb called when all translations are done
 */
export function syncDocs(testDir?: string | (() => void), cb?: () => void): void {
    const tasks: SyncTask[] = [];
    if (typeof testDir === 'function') {
        cb = testDir;
        testDir = '';
    }
    consts.LANGUAGES.forEach(lang =>
        consts.LANGUAGES.filter(lang2 => lang2 !== lang).forEach(lang2 =>
            tasks.push({ fromLang: lang, toLang: lang2 }),
        ),
    );
    processTasks(tasks, testDir || '', cb);
}

/** Copy all documents of a directory recursively into the front-end */
export async function processFiles(root: string, lang?: LanguageCode, originalRoot?: string): Promise<void> {
    root = root.replace(/\\/g, '/');
    if (!lang) {
        await Promise.all(
            consts.LANGUAGES.map(lang => processFiles(path.join(root, lang).replace(/\\/g, '/'), lang, root)),
        );
        return;
    }

    const promises = fs
        .readdirSync(root)
        .filter(name => !name.startsWith('_') && name !== 'adapterref')
        .map(async name => {
            const fileName = path.join(root, name).replace(/\\/g, '/');
            const stat = fs.statSync(fileName);
            if (stat.isDirectory()) {
                if (!IGNORE.includes(fileName.replace(root, ''))) {
                    await processFiles(fileName, lang, originalRoot);
                }
            } else {
                processFile(fileName, originalRoot!);
            }
        });
    await Promise.all(promises);
}

if (process.argv[1] === import.meta.filename) {
    syncDocs(() => console.log('DONE'));
}
