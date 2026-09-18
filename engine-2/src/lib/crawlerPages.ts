import path from 'node:path';
import type { Languages } from '../types.js';
import {
    LANGUAGES,
    documentTitle,
    escapeHtml,
    readJson,
    text,
    walk,
    withLanguage,
    type JsonPage,
    type Words,
} from './siteData.js';

/**
 * What a crawler finds in the page.
 *
 * The app draws every page in the browser. A crawler that does not run it - and a search engine
 * that does not wait for it - got a head and an empty `#root`: no heading, no text, not one link to
 * follow. The documents at least had their markdown in it; the pages made of the interface itself,
 * the start page, the installation, the licenses, had nothing.
 *
 * So the content is written as plain HTML here: the navigation, a heading and the text of the page.
 * For the documentation, the adapters and the blog that is the markdown; for the other pages the
 * words of the interface, read out of `front-end/src/i18n`, so nothing is kept twice. It is not the
 * app's layout and does not try to be - React replaces it the moment it starts.
 */

export type PageKind = 'plain' | 'document' | 'adapter' | 'post';

export interface CrawlerInput {
    /** the address without a trailing slash, "/" for the start page */
    route: string;
    lang: Languages;
    kind: PageKind;
    title: string;
    /** the markdown of the page as HTML, for the kinds that have one */
    documentHtml: string;
    /** that markdown file, absolute - relative links and pictures are resolved against it */
    file?: string;
    /** the entry of adapters.json or blog.json the page comes from */
    entry?: JsonPage;
    /** the directory the site is served from */
    publicDir: string;
    /** front-end/src, where the words of the interface and the installation targets are kept */
    frontEndSrc: string | null;
    /** the address names nothing - the page is the one the app shows for a 404 */
    notFound?: boolean;
}

/** The targets of the installation page - the same file `InstallationPage.tsx` reads */
interface InstallationTargets {
    command: string;
    linuxInfo: string;
    platforms: { key: string; rows: string[]; download: string; info: string }[];
}

/** The parts of data/statistics.json this page shows */
interface Statistics {
    date?: string;
    total?: number;
    adapters?: Record<string, number>;
    countries?: Record<string, number>;
}

/** A word of the interface by its key - English where a language lacks it, empty where both do */
type Say = (key: string) => string;
/** A branch of the words, for the parts that are shown in the order the file has them */
type Branch = (key: string) => Words | undefined;
/** A link to a page of the site, in the language of the page it stands on */
type Link = (route: string, label: string) => string;

const LANGUAGE_NAMES: Record<Languages, string> = { de: 'Deutsch', en: 'English', ru: 'Русский' };
const FORUM = 'https://forum.iobroker.net';
/** not ranked among the popular adapters: part of every installation - as on StatisticsPage.tsx */
const NOT_RANKED = ['js-controller'];

const esc = escapeHtml;

function lookup(words: Words | undefined, key: string): string | Words | undefined {
    if (!words) {
        return undefined;
    }
    // flat keys such as "menu-adapters" first, then the path through the levels
    if (Object.hasOwn(words, key)) {
        return words[key];
    }
    let node: string | Words | undefined = words;
    for (const part of key.split('.')) {
        if (!node || typeof node === 'string' || !Object.hasOwn(node, part)) {
            return undefined;
        }
        node = node[part];
    }
    return node;
}

function wordsFor(frontEndSrc: string | null, lang: Languages): { say: Say; branch: Branch } {
    const load = (language: Languages): Words | undefined =>
        frontEndSrc ? readJson<Words>(path.join(frontEndSrc, 'i18n', `${language}.json`)) : undefined;
    const own = load(lang);
    const english = lang === 'en' ? own : load('en');
    return {
        say: key => {
            const value = lookup(own, key);
            if (typeof value === 'string' && value) {
                return value;
            }
            const fallback = lookup(english, key);
            return typeof fallback === 'string' ? fallback : '';
        },
        branch: key => {
            const value = lookup(own, key) ?? lookup(english, key);
            return value && typeof value === 'object' ? value : undefined;
        },
    };
}

/** a text directly in a branch */
function str(branch: Words | undefined, key: string): string {
    const value = branch && Object.hasOwn(branch, key) ? branch[key] : undefined;
    return typeof value === 'string' ? value : '';
}

/** the branches below a branch, in the order of the file */
function children(branch: Words | undefined): [string, Words][] {
    return Object.entries(branch ?? {}).filter((entry): entry is [string, Words] => typeof entry[1] === 'object');
}

/** a text of the interface as paragraphs - an empty line in it starts a new one */
function paragraphs(value: string): string {
    return value
        .split(/\n\s*\n/)
        .map(part => part.trim())
        .filter(Boolean)
        .map(part => `<p>${esc(part).replace(/\n/g, '<br>')}</p>`)
        .join('');
}

function list(tag: 'ul' | 'ol', items: string[]): string {
    const filled = items.filter(Boolean);
    return filled.length ? `<${tag}>${filled.map(item => `<li>${item}</li>`).join('')}</${tag}>` : '';
}

/** a section with its heading - none at all when there is nothing to put in it */
function section(heading: string, content: string): string {
    return content ? `<section>${heading ? `<h2>${esc(heading)}</h2>` : ''}${content}</section>` : '';
}

function terms(pairs: [string, string][]): string {
    const filled = pairs.filter(([term, value]) => term && value);
    return filled.length
        ? `<dl>${filled.map(([term, value]) => `<dt>${esc(term)}</dt><dd>${esc(value)}</dd>`).join('')}</dl>`
        : '';
}

function dateOf(date: string): string {
    return `<time datetime="${esc(date.replace(/\./g, '-'))}">${esc(date)}</time>`;
}

/**
 * The addresses in a document, made to work where the crawler reads them.
 *
 * The markdown is written for the app: a picture next to the file ("media/tree.png"), a link to
 * another document relative to this one ("objects.md"). Read on /docs/basics/README.md those point
 * nowhere - the pictures lie in the language folder, and a document is a page of the site, not a
 * file. Links into the site also keep the language of the page they stand on.
 */
function rewriteDocumentUrls(html: string, input: CrawlerInput): string {
    const fileDir = input.file
        ? path.relative(input.publicDir, path.dirname(input.file)).split(path.sep).join('/')
        : '';
    return html.replace(/\b(href|src)="([^"]*)"/g, (whole: string, attribute: string, raw: string) => {
        const value = raw.replace(/&amp;/g, '&');
        if (!value || value.startsWith('#') || value.startsWith('//') || /^[a-z][a-z\d+.-]*:/i.test(value)) {
            return whole;
        }
        let target: string;
        if (value.startsWith('/')) {
            target = value;
        } else if (/^[a-z]{2}(-[a-z]{2})?\//i.test(value)) {
            // the pipeline writes the pictures from the root of the site but without the leading
            // slash ("de/basics/media/tree.png") - the same rule `resolveMarkdownUrl` in the app follows
            target = `/${value}`;
        } else {
            const hashAt = value.indexOf('#');
            const pathPart = hashAt === -1 ? value : value.slice(0, hashAt);
            const anchor = hashAt === -1 ? '' : value.slice(hashAt);
            target =
                attribute === 'href' && input.route.startsWith('/docs/') && /\.md$/i.test(pathPart)
                    ? `${path.posix.join(path.posix.dirname(input.route), pathPart)}${anchor}`
                    : `/${path.posix.join(fileDir, value)}`;
        }
        if (attribute === 'href' && /^\/(docs|adapters|blog)(\/|$|\?|#)/.test(target)) {
            target = withLanguage(target, input.lang);
        }
        return `${attribute}="${esc(target)}"`;
    });
}

function homeContent(say: Say, branch: Branch, link: Link): string {
    const heading = (prefix: string): string => `${say(`${prefix}.title1`)} ${say(`${prefix}.title2`)}`.trim();
    const items = (key: string, tag: 'ul' | 'ol'): string =>
        list(
            tag,
            children(branch(key)).map(
                ([, item]) => `<strong>${esc(str(item, 'title'))}</strong> ${esc(str(item, 'text'))}`,
            ),
        );
    const explain = Object.entries(branch('home.demo.explain') ?? {})
        .filter((entry): entry is [string, string] => typeof entry[1] === 'string')
        .map(([editor, value]): [string, string] => [say(`home.demo.editors.${editor}`), value]);
    const faq = children(branch('home.faq.items')).map(([, item]): [string, string] => [
        str(item, 'q'),
        str(item, 'a'),
    ]);

    return [
        paragraphs(say('home.hero.subtitle')),
        section(
            heading('home.platform'),
            paragraphs(say('home.platform.p1')) +
                paragraphs(say('home.platform.p2')) +
                items('home.platform.steps', 'ol'),
        ),
        section(heading('home.demo'), paragraphs(say('home.demo.lead')) + terms(explain)),
        section(
            heading('home.benefits'),
            `${items('home.benefits.items', 'ul')}<p>${link('/docs/README.md', say('home.benefits.more'))}</p>`,
        ),
        section(
            heading('home.start'),
            `${paragraphs(say('home.start.lead'))}${items('home.start.steps', 'ol')}<p>${link('/installation', say('home.start.install'))} · ${link('/docs', say('home.start.docs'))}</p>`,
        ),
        section(
            heading('home.adapters'),
            `${paragraphs(say('home.adapters.text'))}<p>${link('/adapters', say('home.adapters.explore'))}</p>`,
        ),
        section(
            heading('home.community'),
            `${paragraphs(say('home.community.mainText'))}<p><a href="${FORUM}">${esc(say('home.community.forum'))}</a></p>`,
        ),
        section(say('home.faq.label'), terms(faq)),
    ].join('\n');
}

function installationContent(input: CrawlerInput, say: Say, link: Link): string {
    const parts = [paragraphs(say('installation.subtitle'))];
    const targets = input.frontEndSrc
        ? readJson<InstallationTargets>(path.join(input.frontEndSrc, 'config', 'installation.json'))
        : undefined;
    if (!targets) {
        return parts.join('');
    }

    const linuxDocument =
        documentTitle(input.publicDir, input.lang, targets.linuxInfo.replace(/^\/docs\//, '')) || 'Linux';
    parts.push(
        section(
            'Linux',
            `${paragraphs(say('installation.linux.simplest'))}<pre><code>${esc(targets.command)}</code></pre>${paragraphs(say('installation.linux.hint'))}<h3>${esc(say('installation.linux.imageTitle'))}</h3>${paragraphs(say('installation.linux.imageText'))}<p>${link(targets.linuxInfo, linuxDocument)}</p>`,
        ),
    );

    for (const platform of targets.platforms) {
        const key = `installation.${platform.key}`;
        const name = say(`${key}.title`) || platform.key;
        const actions = [
            `<a href="${esc(platform.download)}">${esc(`${say(`${key}.download`)} ${name}`.trim())}</a>`,
            platform.info ? `<a href="${esc(platform.info)}">${esc(`${say(`${key}.info`)} ${name}`.trim())}</a>` : '',
        ]
            .filter(Boolean)
            .join(' · ');
        parts.push(
            section(
                name,
                `${
                    paragraphs(say(`${key}.detailsValue`)) +
                    terms(
                        platform.rows.map((row): [string, string] => [say(`${key}.${row}`), say(`${key}.${row}Value`)]),
                    ) +
                    paragraphs(say(`${key}.passwordHint`))
                }<p>${actions}</p>`,
            ),
        );
    }
    return parts.join('\n');
}

/** every adapter with its description, by category - the one page that links them all */
function adaptersContent(input: CrawlerInput, say: Say, link: Link): string {
    const adapters = readJson<JsonPage>(path.join(input.publicDir, 'adapters.json'));
    const sections = Object.entries(adapters?.pages ?? {}).map(([categoryKey, category]) => {
        const seen = new Set<string>();
        const items: string[] = [];
        walk(category, (key, page) => {
            if (page.content && !seen.has(key)) {
                seen.add(key);
                const description = text(page.description, input.lang);
                items.push(
                    `${link(`/adapters/${encodeURIComponent(key)}`, text(page.title, input.lang) || key)}${description ? ` – ${esc(description)}` : ''}`,
                );
            }
        });
        return section(text(category.title, input.lang) || categoryKey, list('ul', items));
    });
    return paragraphs(say('home.adapters.text')) + sections.join('\n');
}

/** the table of contents of the documentation, as nested lists of links */
function docsTree(pages: Record<string, JsonPage> | undefined, lang: Languages, link: Link): string {
    return list(
        'ul',
        Object.entries(pages ?? {}).map(([key, page]) => {
            const label = text(page.title, lang) || key;
            return (
                (page.content ? link(`/docs/${encodeURI(page.content)}`, label) : esc(label)) +
                docsTree(page.pages, lang, link)
            );
        }),
    );
}

function blogContent(input: CrawlerInput, say: Say, link: Link): string {
    const posts = Object.entries(readJson<JsonPage>(path.join(input.publicDir, 'blog.json'))?.pages ?? {}).sort(
        ([, a], [, b]) => (b.date ?? '').localeCompare(a.date ?? ''),
    );
    return (
        paragraphs(say('blog.subtitle')) +
        list(
            'ul',
            posts.map(([id, post]) => {
                const description = text(post.desc, input.lang);
                return `${post.date ? `${dateOf(post.date)} ` : ''}${link(`/blog/${encodeURIComponent(id)}`, text(post.title, input.lang) || id)}${description ? ` – ${esc(description)}` : ''}`;
            }),
        )
    );
}

/** "So richten Sie es ein": the numbered steps, then the voice services with their own items */
function setupContent(setup: Words): string {
    const steps = Object.keys(setup)
        .filter(key => /^step\d+$/.test(key))
        .map(key => esc(str(setup, key)));
    const groups = Object.keys(setup)
        .filter(key => /^[a-z]+$/i.test(key) && key !== 'title')
        .map(group => {
            const items = Object.keys(setup)
                .filter(key => key.startsWith(group) && /^\d+$/.test(key.slice(group.length)))
                .map(key => esc(str(setup, key)));
            return items.length ? `<p>${esc(str(setup, group))}</p>${list('ul', items)}` : '';
        });
    return `<h3>${esc(str(setup, 'title'))}</h3>${list('ol', steps)}${groups.join('')}`;
}

/** one product of the license page: its features, then every question it answers */
function productContent(product: Words): string {
    const features = product.features;
    const parts = [
        typeof features === 'object'
            ? list(
                  'ul',
                  children(features).map(
                      ([, feature]) =>
                          `<strong>${esc(str(feature, 'title'))}</strong>${str(feature, 'text') ? ` – ${esc(str(feature, 'text'))}` : ''}`,
                  ),
              )
            : '',
        paragraphs(str(product, 'text')),
    ];
    for (const [key, child] of children(product)) {
        if (key === 'setup') {
            parts.push(setupContent(child));
        } else if (str(child, 'title') && str(child, 'text')) {
            const items = Object.keys(child)
                .filter(name => /^item\d+$/.test(name))
                .map(name => esc(str(child, name)));
            parts.push(
                `<h3>${esc(str(child, 'title'))}</h3>${paragraphs(str(child, 'text'))}${list('ul', items)}${paragraphs(str(child, 'footer'))}`,
            );
        }
    }
    return parts.join('');
}

/**
 * The license page, walked in the order of the words file: every branch with `features` is a
 * product. The prices are left out - they come from the shop at the moment the page is opened.
 */
function licensesContent(say: Say, branch: Branch): string {
    const parts = [
        paragraphs(say('productOverview.welcome')),
        paragraphs(say('productOverview.intro')),
        list(
            'ul',
            children(branch('productOverview.categories')).map(
                ([, category]) => `<strong>${esc(str(category, 'title'))}</strong>: ${esc(str(category, 'text'))}`,
            ),
        ),
    ];
    const support = branch('productOverview.support');
    if (support) {
        parts.push(
            section(
                str(support, 'lead'),
                paragraphs(str(support, 'text')) +
                    paragraphs(str(support, 'accent')) +
                    paragraphs(str(support, 'thanks')),
            ),
        );
    }
    for (const [, product] of children(branch('productOverview')).filter(
        ([, child]) => typeof child.features === 'object',
    )) {
        parts.push(section(str(product, 'title'), productContent(product)));
    }
    const faq = children(branch('productOverview.faq'))
        .map(
            ([, group]) =>
                `<h3>${esc(str(group, 'title'))}</h3>${terms(children(group).map(([, item]): [string, string] => [str(item, 'q'), str(item, 'a')]))}`,
        )
        .join('');
    parts.push(section(say('productOverview.faq.title'), faq));
    return parts.join('\n');
}

function statisticsContent(input: CrawlerInput, say: Say, link: Link): string {
    const parts = [paragraphs(say('statistics.subtitle'))];
    const statistics = readJson<Statistics>(path.join(input.publicDir, 'data', 'statistics.json'));
    if (!statistics) {
        return parts.join('');
    }
    const format = new Intl.NumberFormat(input.lang === 'en' ? 'en-GB' : input.lang);
    const ranked = (map: Record<string, number> | undefined, count: number): [string, number][] =>
        Object.entries(map ?? {})
            .map(([name, value]): [string, number] => [name, Number(value)])
            .filter(([name, value]) => value > 0 && !NOT_RANKED.includes(name))
            .sort((a, b) => b[1] - a[1])
            .slice(0, count);

    const snapshot =
        statistics.date && !Number.isNaN(Date.parse(statistics.date))
            ? new Date(statistics.date).toISOString().slice(0, 10)
            : '';
    parts.push(
        terms([
            [say('statistics.kpi.installations'), statistics.total ? format.format(statistics.total) : ''],
            [
                say('statistics.kpi.adapters'),
                statistics.adapters ? format.format(Object.keys(statistics.adapters).length) : '',
            ],
            [say('statistics.kpi.snapshot'), snapshot],
        ]),
        section(
            say('statistics.adapters.title'),
            list(
                'ol',
                ranked(statistics.adapters, 15).map(
                    ([name, count]) =>
                        `${link(`/adapters/${encodeURIComponent(name)}`, name)} – ${esc(format.format(count))}`,
                ),
            ),
        ),
        section(
            say('statistics.countries.title'),
            list(
                'ol',
                ranked(statistics.countries, 10).map(([name, count]) => `${esc(name)} – ${esc(format.format(count))}`),
            ),
        ),
    );
    return parts.join('\n');
}

/**
 * The content of `#root` for a crawler: navigation, heading, the text of the page and a footer.
 *
 * @param input what the page is and what it is made of
 */
export function crawlerBody(input: CrawlerInput): string {
    const { route, lang, kind, title } = input;
    const { say, branch } = wordsFor(input.frontEndSrc, lang);
    const link: Link = (target, label) => `<a href="${esc(withLanguage(target, lang))}">${esc(label)}</a>`;
    const menu = (key: string, fallback: string): string => say(key) || fallback;

    const navigation = [
        link('/', 'ioBroker'),
        link('/adapters', menu('menu-adapters', 'Adapters')),
        link('/docs', menu('menu-docs', 'Docs')),
        link('/blog', menu('menu-blog', 'Blog')),
        link('/productoverview', menu('menu-licenses', 'Licenses')),
        link('/installation', menu('menu-installation', 'Installation')),
        link('/statistics', menu('menu-statistics', 'Statistics')),
        `<a href="${FORUM}">${esc(menu('menu-forum', 'Forum'))}</a>`,
    ].join(' · ');
    // the same page in the other languages - the links hreflang describes, to follow as well
    const languages = LANGUAGES.map(language =>
        language === lang
            ? `<strong lang="${language}">${LANGUAGE_NAMES[language]}</strong>`
            : `<a href="${esc(withLanguage(route, language))}" hreflang="${language}" lang="${language}">${LANGUAGE_NAMES[language]}</a>`,
    ).join(' · ');

    let heading = title;
    let content = '';
    let parent: [string, string] | null = null;

    /*
     * The address names nothing. The page is answered with 404 and `noindex`, so this is not
     * written for an index - it is written for the agent that follows a dead link and should
     * find its way from here, which is what `follow` in that header promises it.
     */
    if (input.notFound) {
        heading = say('notFound.title') || heading;
        content = `<p>${esc(say('notFound.lead'))}</p><p>${link('/', say('notFound.home') || 'ioBroker')}</p>`;
    } else if (kind === 'plain') {
        switch (route) {
            case '/':
                heading = `${say('home.hero.headline')} ${say('home.hero.headlineAccent')}`.trim() || title;
                content = homeContent(say, branch, link);
                break;
            case '/installation':
                heading = say('installation.title') || title;
                content = installationContent(input, say, link);
                break;
            case '/adapters':
                content = adaptersContent(input, say, link);
                break;
            case '/docs':
                content = docsTree(readJson<JsonPage>(path.join(input.publicDir, 'content.json'))?.pages, lang, link);
                break;
            case '/blog':
                heading = say('blog.title') || title;
                content = blogContent(input, say, link);
                break;
            case '/productoverview':
                heading = say('productOverview.title') || title;
                content = licensesContent(say, branch);
                break;
            case '/statistics':
                content = statisticsContent(input, say, link);
                break;
            default:
                break;
        }
    } else {
        const documentHtml = input.documentHtml ? rewriteDocumentUrls(input.documentHtml, input) : '';
        const meta: string[] = [];
        if (kind === 'adapter' && input.entry) {
            const description = text(input.entry.description, lang);
            if (description) {
                meta.push(`<p>${esc(description)}</p>`);
            }
            meta.push(
                terms([
                    [say('adapters.current_release'), input.entry.latestVersion ?? ''],
                    // the address in "name <mail>" is left out - a crawler has no use for it
                    [say('adapters.developer'), (input.entry.authors ?? '').replace(/\s*<[^>]*>/g, '')],
                    [say('adapters.license'), input.entry.license ?? ''],
                ]),
            );
        }
        if (kind === 'post' && input.entry?.date) {
            meta.push(`<p>${dateOf(input.entry.date)}</p>`);
        }
        // most documents open with their own first heading - one h1 on a page is enough
        if (/^\s*<h1[\s>]/i.test(documentHtml)) {
            heading = '';
        }
        content = meta.join('') + (documentHtml ? `<article>${documentHtml}</article>` : '');

        if (kind === 'adapter') {
            parent = ['/adapters', menu('menu-adapters', 'Adapters')];
        } else if (kind === 'post') {
            parent = ['/blog', menu('menu-blog', 'Blog')];
        } else if (route.startsWith('/docs/')) {
            parent = ['/docs', menu('menu-docs', 'Docs')];
        }
    }

    const breadcrumb = parent
        ? `<nav aria-label="breadcrumb">${link('/', 'ioBroker')} › ${link(parent[0], parent[1])} › ${esc(title)}</nav>`
        : '';
    const copyright = say('menu-copyright').replace('%s', String(new Date().getFullYear()));

    return [
        `<header><nav>${navigation}</nav><nav>${languages}</nav></header>`,
        '<main>',
        breadcrumb,
        heading ? `<h1>${esc(heading)}</h1>` : '',
        content,
        '</main>',
        `<footer><nav>${link('/imprint', menu('menu-imprint', 'Imprint'))} · ${link('/policy', menu('menu-policy', 'Privacy'))}</nav>${copyright ? `<p>${esc(copyright)}</p>` : ''}</footer>`,
    ]
        .filter(Boolean)
        .join('\n');
}
