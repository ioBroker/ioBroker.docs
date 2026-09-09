import fs from 'node:fs';
import path from 'node:path';

import * as utils from './utils.mts';
import * as consts from './consts.mts';
import * as translation from './translation.mts';
import type { BlogContent, LanguageCode, MarkdownHeader, SyncTask } from './types.mts';

/** Read all blog posts of one language, copy them to the front-end and collect them in `content` */
function buildLanguage(lang: LanguageCode, content: BlogContent): Promise<BlogContent> {
    return new Promise(resolve => {
        if (!fs.existsSync(consts.SRC_BLOG_DIR + lang)) {
            resolve(content);
            return;
        }
        fs.readdirSync(consts.SRC_BLOG_DIR + lang).forEach(item => {
            if (item === 'README.md') {
                return;
            }
            if (item.match(/^\d\d\d\d_\d\d/)) {
                const name = item.replace(/\.md/i, '');
                const d = name.match(/^(\d\d\d\d)_(\d\d)_(\d\d)(_\d)?/);
                const text = fs.readFileSync(path.join(consts.SRC_BLOG_DIR + lang, item)).toString('utf-8');
                const parsed = utils.extractHeader(text);
                const header = parsed.header;
                const body = parsed.body.replace(/\r/g, '');
                header.title = header.title || utils.getTitle(body) || '';
                header.editLink = `${consts.GITHUB_EDIT_ROOT}blog/${lang}/${item}`;

                const lines = body.trim().split('\n');

                if (text.match(/!\[/)) {
                    const m = lines[0].match(/!\[([^\]]*)]\(([^)]*)\)/);
                    if (m && m.length === 3) {
                        lines.shift();
                        let link = m[2];
                        if (!link.toLowerCase().match(/^https?:\/\//)) {
                            if (link.startsWith('../')) {
                                link = `${lang}/blog/${link.substring(3)}`;
                            } else {
                                link = `${lang}/blog/${link}`;
                            }
                        }
                        header.logo = link;
                    }
                }

                // remove leading empty lines
                while (lines.length && !lines[0]) {
                    lines.shift();
                }

                // remove title from a text
                if (header.title && lines[0].startsWith('# ')) {
                    lines.shift();

                    // remove leading empty lines
                    while (lines.length && !lines[0]) {
                        lines.shift();
                    }
                }

                // take the first paragraph as description
                const desc: string[] = [];
                let i = 0;
                while (lines[i]) {
                    if (lines[i].startsWith('<!-- SOURCE: ') || lines[i].startsWith('<!-- ID: ')) {
                        break;
                    }
                    desc.push(lines[i]);
                    i++;
                }

                if (d) {
                    const date = `${d[1]}.${d[2]}.${d[3]}${d[4] ? `_${d[4]}` : ''}`;
                    content.pages[name] ||= {
                        date,
                        title: {},
                        logo: header.logo || '',
                        type: header.type || 'news',
                        originalName: item,
                        desc: {},
                    };
                    content.pages[name].title[lang] = header.title || date;
                    content.pages[name].desc[lang] = desc.join('\\n');
                    utils.writeSafe(
                        `${consts.FRONT_END_DIR + lang}/blog/${name}.md`,
                        utils.addHeader(lines.join('\n'), header),
                    );
                } else {
                    console.error(`Invalid name format: ${name}. Expected YEAR_MM_DD.md or YEAR_MM_DD_N.md`);
                }
            }
        });

        // copy blog/images if exists
        if (fs.existsSync(`${consts.SRC_BLOG_DIR}images/`)) {
            utils.createDir(`${consts.FRONT_END_DIR + lang}/blog/images/`);
            utils.copyDir(`${consts.SRC_BLOG_DIR}images/`, `${consts.FRONT_END_DIR + lang}/blog/images/`);
        }

        // copy images
        if (fs.existsSync(`${consts.SRC_BLOG_DIR + lang}/images/`)) {
            utils.createDir(`${consts.FRONT_END_DIR + lang}/blog/images/`);
            utils.copyDir(`${consts.SRC_BLOG_DIR + lang}/images/`, `${consts.FRONT_END_DIR + lang}/blog/images/`);
        }

        resolve(content);
    });
}

/** Translate the next outdated or missing blog post from one language into another */
function sync2Languages(
    fromLang: LanguageCode,
    toLang: LanguageCode,
    content: BlogContent,
    cb?: (content: BlogContent) => void,
): void {
    const file = Object.keys(content.pages).find(file => {
        const fromFile = `${consts.SRC_BLOG_DIR + fromLang}/${content.pages[file].originalName}`;
        const toFile = `${consts.SRC_BLOG_DIR + toLang}/${content.pages[file].originalName}`;

        // read from
        if (fs.existsSync(fromFile)) {
            const { header } = utils.extractHeader(fs.readFileSync(fromFile).toString('utf-8'));
            if (!header.translatedFrom) {
                let doTranslate = !fs.existsSync(toFile);
                if (!doTranslate) {
                    const targetHeader = utils.extractHeader(fs.readFileSync(toFile).toString('utf-8')).header;
                    const sourceBody = utils.extractHeader(fs.readFileSync(fromFile).toString('utf-8')).body;
                    if (targetHeader.translatedFrom === fromLang) {
                        const hash = utils.getFileHash(sourceBody);
                        if (targetHeader.hash !== hash) {
                            doTranslate = true;
                        }
                    }
                }
                return doTranslate;
            }
        }
        return false;
    });

    if (!file) {
        cb?.(content);
        return;
    }

    const fromFile = `${consts.SRC_BLOG_DIR + fromLang}/${content.pages[file].originalName}`;
    const toFile = `${consts.SRC_BLOG_DIR + toLang}/${content.pages[file].originalName}`;
    const toFilePublic = `${consts.FRONT_END_DIR + toLang}/blog/${file}.md`;

    // read from
    const source = utils.extractHeader(fs.readFileSync(fromFile).toString('utf-8'));
    const originalHeader = source.header;
    let body = source.body;
    let translatedBody: string | undefined;
    if (fs.existsSync(toFile)) {
        translatedBody = utils.extractHeader(fs.readFileSync(toFile).toString('utf-8')).body;
    }

    void translation
        .translateDocument(fromLang, source.body, toLang, translatedBody, fromFile)
        .then(translated => {
            body = utils.trim(translated, '\n');
            return translation.translateText(fromLang, originalHeader.title || '', toLang);
        })
        .then(title => {
            originalHeader.title = title;
            content.pages[file].title[toLang] = title;
            originalHeader.translatedFrom = fromLang;
            const from = utils.extractHeader(fs.readFileSync(fromFile).toString('utf-8'));

            originalHeader.hash = utils.getFileHash(from.body);
            const localHeader: MarkdownHeader = JSON.parse(JSON.stringify(originalHeader));
            delete localHeader.editLink;

            const lines = body.trim().split('\n');

            // remove leading empty lines
            while (lines.length && !lines[0]) {
                lines.shift();
            }

            // take the first paragraph as description
            const desc: string[] = [];
            let i = 0;
            while (lines[i]) {
                if (lines[i].startsWith('<!-- SOURCE: ')) {
                    break;
                }
                desc.push(lines[i]);
                i++;
            }

            content.pages[file].desc[toLang] = desc.join('\\n');

            utils.writeSafe(toFile, utils.addHeader(body, localHeader));
            utils.writeSafe(toFilePublic, utils.addHeader(body, originalHeader));
            setTimeout(() => sync2Languages(fromLang, toLang, content, cb), 200);
        });
}

/** Execute the translation tasks one after another */
function processTasks(tasks: SyncTask[], content: BlogContent, cb?: () => void): void {
    if (!tasks?.length) {
        cb?.();
    } else {
        const task = tasks.shift()!;
        sync2Languages(task.fromLang, task.toLang, content, () =>
            setTimeout(() => processTasks(tasks, content, cb), 0),
        );
    }
}

/** Read all blog posts, translate them into all languages and write blog.json and the RSS feeds */
export function build(): Promise<BlogContent> {
    const content: BlogContent = { pages: {} };
    return new Promise(resolve => {
        void Promise.all(consts.LANGUAGES.map(lang => buildLanguage(lang, content))).then(contents => {
            console.log(JSON.stringify(contents[0]));

            // sync all directories
            const tasks: SyncTask[] = [];
            consts.SYNC_LANGUAGES.forEach(lang =>
                consts.SYNC_LANGUAGES.filter(lang2 => lang2 !== lang).forEach(lang2 =>
                    tasks.push({ fromLang: lang, toLang: lang2 }),
                ),
            );
            processTasks(tasks, content, () => {
                // sort files
                const names = Object.keys(content.pages);
                names.sort((a, b) => {
                    if (b > a) {
                        return 1;
                    }
                    if (b < a) {
                        return -1;
                    }
                    return 0;
                });
                const old = content.pages;
                content.pages = {};
                names.forEach(name => (content.pages[name] = old[name]));

                fs.writeFileSync(`${consts.FRONT_END_DIR}blog.json`, JSON.stringify(contents[0], null, 2));

                void buildRSS().then(() => resolve(content));
            });
        });
    });
}

/** Create one RSS feed per language out of blog.json */
export function buildRSS(): Promise<void> {
    return new Promise(resolve => {
        const blog: BlogContent = JSON.parse(fs.readFileSync(`${consts.FRONT_END_DIR}blog.json`).toString('utf-8'));

        consts.LANGUAGES.forEach(lang => {
            let rss = '';

            Object.keys(blog.pages).forEach(date => {
                const item = blog.pages[date];
                const dateObj = new Date(`${date.replace(/_/g, '-')}T06:00:00.000Z`);

                if (!rss) {
                    rss =
                        '<rss xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:content="http://purl.org/rss/1.0/modules/content/" xmlns:atom="http://www.w3.org/2005/Atom" version="2.0">\n';
                    rss += `    <channel>\n`;
                    rss += `        <title><![CDATA[ ioBroker Blog ]]></title>\n`;
                    rss += `        <description><![CDATA[${consts.BLOG_TITLE[lang]}]]></description>\n`;
                    rss += `        <link>https://www.iobroker.net/#${lang}/blog</link>\n`;
                    rss += `        <lastBuildDate>${dateObj.toUTCString()}</lastBuildDate>\n`;
                    rss += `        <ttl>1440</ttl>\n`;
                }

                rss += `        <item>\n`;
                rss += `            <title><![CDATA[${item.title[lang]}]]></title>\n`;
                rss += `            <description><![CDATA[\n`;
                rss += `                <p>${item.desc[lang].replace(/\n/g, '<br />').replace(/>/g, '=&gt;').replace(/<>/g, '=&lt;')}</p>\n`;
                rss += `            ]]></description>\n`;
                rss += `            <link>https://www.iobroker.net/#${lang}/blog/${date}</link>\n`;
                rss += `            <guid isPermaLink="true">https://www.iobroker.net/#${lang}/blog/${date}</guid>\n`;
                rss += `            <dc:creator><![CDATA[ ioBroker ]]></dc:creator>\n`;
                rss += `            <pubDate>${dateObj.toUTCString()}</pubDate>\n`;
                rss += `        </item>\n`;
            });
            rss += `    </channel>\n`;
            rss += `</rss>\n`;

            fs.writeFileSync(`${consts.FRONT_END_DIR}blog_${lang}.xml`, rss);
        });

        resolve();
    });
}

if (process.argv[1] === import.meta.filename) {
    build()
        .then(() => console.log('Done'))
        .catch((error: unknown) => console.error(error));
}
