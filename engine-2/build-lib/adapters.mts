// 1. Collect all possible adapters in docs/LN/adapterref and do not collect yet local files marked as "local: true"
// 2. Cross translate adapters in master/front-end/public/LN/adapterref. Start from english

import axios from 'axios';
import fs from 'node:fs';
import path from 'node:path';

import * as utils from './utils.mts';
import * as consts from './consts.mts';
import type {
    AdapterContent,
    AdapterPage,
    AdapterReadme,
    AdapterTypePage,
    LanguageCode,
    PreparedReadme,
    RepoAdapter,
    RepoAuthor,
    Repository,
    Statistics,
    Translated,
} from './types.mts';

const ADAPTERS_DIR = path.normalize(`${import.meta.dirname}/../../docs/LANG/adapterref/`).replace(/\\/g, '/');

const urlsCache: Record<string, Promise<string | Buffer | undefined>> = {};

function fixImages(
    lang: LanguageCode,
    adapter: string,
    body: string,
): { body: string; badges: Translated; doDownload: string[] } {
    const prefix = `${lang}/adapterref/iobroker.${adapter}/`;

    // replace all images like "<img src="src/img/rooms/006-double-bed.svg" height="48" />" with "<img src="LN/adapterref/iobroker.adapterName/src/img/rooms/006-double-bed.svg" height="48" />"
    const res = utils.replaceImages(body, prefix);

    return { body: res.body, badges: res.badges, doDownload: res.doDownload };
}

function getAuthor(data: RepoAuthor | string | undefined): string {
    return data && typeof data === 'object' ? `${data.name} <${data.email}>` : data || '';
}

/**
 * Scan a document for images. If some local references are found, try to find them in the same repo.
 * If not found => download them.
 */
async function downloadImagesForReadme(
    lang: LanguageCode,
    repo: RepoAdapter,
    data: AdapterReadme,
): Promise<PreparedReadme> {
    const { body } = utils.extractHeader(data.body);
    const result = fixImages(lang, repo.name, body);

    const localDirName = `${consts.SRC_DOC_DIR + lang}/adapterref/iobroker.${repo.name}/`;

    // check that all images exist
    await Promise.all(
        result.doDownload.map(async originalLink => {
            let link = originalLink.split('?')[0];
            link = link.split(' ')[0];

            let startsFromSlash = false;
            if (link.startsWith('/')) {
                startsFromSlash = true;
                link = link.substring(1);
            }

            const absLocalPath = path.normalize(localDirName + link).replace(/\\/g, '/');

            // Check if file should be downloaded within an adapter path
            if (!absLocalPath.startsWith(localDirName) || fs.existsSync(absLocalPath)) {
                return;
            }

            let relative: string;
            if (data.link) {
                const parts = data.link.split('/');
                if (startsFromSlash) {
                    parts.splice(6); // https:, "", "", github.com, iobroker, ioBroker.docs, master, ...
                } else {
                    parts.pop();
                }
                relative = `${parts.join('/')}/`;
            } else {
                relative = link;
            }

            try {
                const result = await axios<Buffer>(relative + link, { responseType: 'arraybuffer' });
                if (result?.data) {
                    utils.writeSafe(absLocalPath, result.data);
                }
            } catch (err) {
                console.error(`Cannot _download "${relative}${link}" to "${absLocalPath}": ${err}`);
            }
        }),
    );

    return { body: data.body, name: data.link ? data.link.replace(data.relative!, '') : 'README.md' };
}

/** Add the system information from the repository to the header of a README */
function prepareAdapterReadme(
    lang: LanguageCode,
    repo: RepoAdapter | undefined,
    data: AdapterReadme,
): PreparedReadme | undefined {
    const text = data.body;

    if (!repo) {
        console.error(
            `File possibly deleted from repository, but still in docs (${data.editLink}). Run "npm run remove -- --<adapterName>" to remove it`,
        );
        return undefined;
    }

    if (!text) {
        console.error(`No data found for ${repo.name}: ${data.link}`);
        return undefined;
    }

    const { header } = utils.extractHeader(text);
    let { body } = utils.extractHeader(text);

    header.adapter = true;
    header.editLink = data.editLink;
    header.license = repo.license;
    header.authors = repo.authors ? repo.authors.map(item => getAuthor(item)).join(', ') : getAuthor(repo.author);
    header.description = repo.desc ? repo.desc[lang] || repo.desc.en || '' : '';
    header.title = repo.titleLang ? repo.titleLang[lang] || repo.title : repo.title;
    header.keywords = repo.keywords ? repo.keywords.join(', ') : '';
    header.readme = repo.readme;
    header.mode = repo.mode;
    header.materialize = repo.materialize || false;
    header.compact = repo.compact || false;
    if (repo.published) {
        header.published = repo.published;
    }

    const affiliateFile = `${consts.SRC_DOC_DIR}${lang}/adapterref/iobroker.${repo.name}/affiliate.json`;
    if (fs.existsSync(affiliateFile)) {
        const affiliate = fs.readFileSync(affiliateFile).toString('utf-8');
        header.affiliate = JSON.stringify(JSON.parse(affiliate));
    }

    header.version = repo.version;
    header.latestVersion = repo.latestVersion;

    const result = fixImages(lang, repo.name, body);

    body = result.body;
    Object.keys(result.badges).forEach(name => {
        header[`BADGE-${name}`] = result.badges[name];
    });

    const lines = body.split('\n');

    // remove empty lines at start
    while (lines.length && !lines[0].trim()) {
        lines.shift();
    }

    // remove logo
    if (lines.length && lines[0].trim().startsWith('![')) {
        header.logo = utils.normalizePath(
            lines[0]
                .trim()
                .replace(/^!\[[^\]]*]\(/, '')
                .replace(/\)$/, ''),
        );
        lines.shift();
    }

    // remove empty lines at start
    while (lines.length && !lines[0].trim()) {
        lines.shift();
    }

    // remove title
    if (lines.length && lines[0].trim().startsWith('# ')) {
        lines.shift();
    }

    // remove empty lines at start
    while (lines.length && !lines[0].trim()) {
        lines.shift();
    }
    // remove =======
    if (lines.length && lines[0].trim().startsWith('=======')) {
        lines.shift();
    }

    // remove empty lines at start
    while (lines.length && !lines[0].trim()) {
        lines.shift();
    }

    return {
        body: utils.addHeader(lines.join('\n'), header),
        name: data.link ? data.link.replace(data.relative!, '') : 'README.md',
        logo: header.logo,
    };
}

/** Read the logo from the local copy or download it */
async function getIcon(url: string | undefined, checkFile?: string): Promise<Buffer | undefined> {
    if (!url) {
        return undefined;
    }
    if (checkFile && fs.existsSync(checkFile)) {
        return fs.readFileSync(checkFile);
    }
    return getUrl(url, true);
}

/** Download an URL. Every URL is only downloaded once */
function getUrl(url: string, binary: true): Promise<Buffer | undefined>;
function getUrl(url: string, binary?: false): Promise<string | undefined>;
function getUrl(url: string, binary?: boolean): Promise<string | Buffer | undefined> {
    if (!url) {
        return Promise.resolve(undefined);
    }
    urlsCache[url] ||= new Promise(resolve => {
        console.log(`Requested ${url}`);
        axios<Buffer>(url, { responseType: 'arraybuffer', validateStatus: status => status === 200 })
            .then(result => resolve(binary ? result.data : result.data.toString()))
            .catch(err => {
                console.error(`Cannot download ${url}: ${err}`);
                resolve(undefined);
            });
    });
    return urlsCache[url];
}

/**
 * 1. reads from remote repo the remoteRepo/README.md and all files in remoteRepo/docs/LN (if exist)
 * 2a. if a local version for this adapter exists, merge a local version and remoteRepo/README.md
 * 2b. if the remote version is in remoteRepo/docs/LN, so merge data with remote remoteRepo/README.md
 *
 * @returns the array of files that must be stored locally
 */
async function getReadme(
    lang: LanguageCode,
    dirName: string,
    repo: RepoAdapter,
    adapter: string,
): Promise<AdapterReadme[]> {
    repo.readme ||= repo.meta.replace('io-package.json', 'README.md');

    // download readme
    const readme = repo.readme
        .replace('github.com', 'raw.githubusercontent.com')
        .replace('/blob/master/', '/master/')
        .replace('/blob/main/', '/main/');

    const readmeDoc = await getUrl(readme);

    let links: string[] = [];

    if (repo.docs?.[lang]) {
        if (Array.isArray(repo.docs[lang])) {
            links = repo.docs[lang].map(link => readme.replace('/README.md', `/${link}`));
        } else {
            links.push(readme.replace('/README.md', `/${repo.docs[lang]}`));
        }
    }

    const results: AdapterReadme[] = await Promise.all(
        links.map(async link => ({ body: (await getUrl(link)) || '', downloaded: true, link })),
    );

    if (links.length) {
        const readmeParsed = utils.extractHeader(readmeDoc);
        if (!results[0].body) {
            return [];
        }

        // insert the changelog, logo, licenses, badges info from readme into the first file
        const { badges } = fixImages(lang, adapter, readmeParsed.body);
        const linkParsed = utils.extractHeader(results[0].body);

        Object.keys(badges).forEach(name => (linkParsed.header[`BADGE-${name}`] = badges[name]));

        if (readmeParsed.header.logo) {
            linkParsed.header.logo ||= readmeParsed.header.logo;
        }
        const logValid = utils.extractLicenseAndChangelog(readmeParsed.body);
        const logInvalid = utils.extractLicenseAndChangelog(linkParsed.body);
        linkParsed.body = utils.addChangelogAndLicense(logInvalid.body, logValid.changelog, logValid.license);

        results[0].body = utils.addHeader(linkParsed.body, linkParsed.header);
    } else if (lang === 'en') {
        results.push({ body: readmeDoc || '', link: readme });
    }

    if (results.length) {
        const parts = results[0].link!.split('/');
        parts.pop();
        const relative = `${parts.join('/')}/`;
        results.forEach(item => {
            item.relative = relative;
            item.editLink = item
                .link!.replace('/master/', '/edit/master/')
                .replace('/main/', '/edit/main/')
                .replace('raw.githubusercontent.com', 'github.com');
        });

        results[0].link = `${relative}README.md`;
    }

    let local = false;
    if (fs.existsSync(`${dirName}/README.md`)) {
        const text = fs.readFileSync(`${dirName}/README.md`).toString('utf-8');
        const localResult = utils.extractHeader(text);
        if (localResult.header.local) {
            local = true;
            // merge the whole data to this file
            const remoteHeader = utils.extractHeader(readmeDoc);
            const remoteLog = utils.extractLicenseAndChangelog(remoteHeader.body);
            const localLog = utils.extractLicenseAndChangelog(localResult.body);

            // replace changelog and license with remote one
            localLog.body = utils.addChangelogAndLicense(localLog.body, remoteLog.changelog, remoteLog.license);

            // merge headers
            results[0] = {
                body: utils.addHeader(localLog.body, Object.assign(remoteHeader.header, localResult.header)),
                editLink: `${consts.GITHUB_EDIT_ROOT}docs/${lang}/adapterref/iobroker.${adapter}/README.md`,
            };
        }
    }

    if (!local) {
        // check maybe locally other languages exists.
        const isLocalExist = consts.LANGUAGES.find(lang => {
            const file = `${consts.SRC_DOC_DIR + lang}/adapterref/iobroker.${adapter}/README.md`;
            if (fs.existsSync(file)) {
                const { header } = utils.extractHeader(fs.readFileSync(file).toString('utf-8'));
                return header.local;
            }
            return false;
        });
        if (isLocalExist) {
            console.log(`Ignore ${lang} for ${adapter} because locally exists in ${isLocalExist}`);
            // ignore the whole info
            return [];
        }
    }

    return results;
}

/**
 * 1. Check if file exists on disk
 * 2. If file on disk is marked as local: download remote file, get License and Changelog and write it into local file
 * 3. For non-local files, download the remote files and replace local ones
 */
async function processAdapterLang(
    adapter: string,
    repo: RepoAdapter,
    lang: LanguageCode,
    content: AdapterContent,
): Promise<void> {
    const dirName = `${ADAPTERS_DIR.replace('/LANG/', `/${lang}/`)}iobroker.${adapter}`;

    let iconName = repo.extIcon ? repo.extIcon.split('/').pop()! : '';

    if (!iconName) {
        console.error(`!!!! ADAPTER has no extIcon: ${adapter}`);
    }

    iconName = iconName.split('?')[0];

    try {
        // download logo
        const icon = await getIcon(
            repo.extIcon,
            `${consts.FRONT_END_DIR}${consts.LANGUAGES[0]}/adapterref/iobroker.${adapter}/${iconName}`,
        );

        if (icon) {
            utils.writeSafe(`${consts.FRONT_END_DIR}${lang}/adapterref/iobroker.${adapter}/${iconName}`, icon);
        } else if (adapter !== 'js-controller') {
            console.error(`!!!! ADAPTER has no icon: ${adapter}`);
        }

        const typePage: AdapterTypePage = (content.pages[repo.type] ||= {
            title: consts.ADAPTER_TYPES[repo.type] || { en: repo.type },
            pages: {},
        });
        typePage.pages ||= {};

        const adapterPage: AdapterPage = (typePage.pages[adapter] ||= {
            title: { [lang]: adapter },
            content: `adapterref/iobroker.${adapter}/README.md`,
        });
        adapterPage.title[lang] = adapter;

        if (iconName) {
            adapterPage.icon = `adapterref/iobroker.${adapter}/${iconName}`;
        }

        // NOTE: this promise is intentionally not awaited, exactly as in the original JavaScript version.
        // The readme files are downloaded in the background, while adapters.json is already written.
        void getReadme(lang, dirName, repo, adapter)
            .then(async results => {
                if (!results?.[0]?.body) {
                    return;
                }

                // if data from remoteRepo/docs/LN
                if (results.length > 1) {
                    const chapters: { pages: Record<string, { title: Translated; content: string }> } = { pages: {} };
                    // add title to every file
                    results.forEach(item => {
                        const name = `${lang}/adapterref/iobroker.${adapter}/${item.link!.replace(item.relative!, '')}`;
                        if (name.includes('://')) {
                            console.error(`Cannot replace in LINK: ${name}`);
                            console.error(`LINK    : ${item.link}`);
                            console.error(`RELATIVE: ${item.relative}`);
                        }
                        const title = utils.getTitle(item.body);
                        chapters.pages[name] = { title: { [lang]: title }, content: name };
                    });

                    // add chapters (links to other files)
                    results.forEach(item => {
                        const { body, header } = utils.extractHeader(item.body);
                        header.chapters = JSON.stringify(chapters);
                        item.body = utils.addHeader(body, header);
                    });
                }

                // store this information in content
                if (repo.keywords) {
                    adapterPage.keywords = repo.keywords.join(', ');
                }
                adapterPage.authors = repo.authors
                    ? repo.authors.map(item => getAuthor(item)).join(', ')
                    : getAuthor(repo.author);
                adapterPage.license = repo.license;
                adapterPage.published = repo.published;
                adapterPage.version = repo.version;
                adapterPage.latestVersion = repo.latestVersion;
                adapterPage.materialize = repo.materialize;
                adapterPage.compact = repo.compact;
                adapterPage.description = repo.desc;
                adapterPage.titleFull = repo.titleLang || repo.title;
                adapterPage.created = repo.created;
                adapterPage.branch = repo.readme.match(/\/blob\/([-_a-z0-9]+)\//)
                    ? repo.readme.match(/\/blob\/([-_a-z0-9]+)\//)![1]
                    : 'master';
                adapterPage.github = repo.readme
                    .replace('/blob/master/README.md', '')
                    .replace('/blob/main/README.md', '')
                    .replace('raw.githubusercontent.com', 'github.com');

                await Promise.all(
                    results.map(async result => {
                        const prepared = await downloadImagesForReadme(lang, repo, result);
                        utils.writeSafe(`${dirName}/${prepared.name}`, prepared.body);
                    }),
                );
            })
            .catch(error => console.error(`Cannot get readme for ${adapter}: ${error}`));
    } catch (error) {
        console.error(`Cannot process adapter (${adapter} lang(${lang}): ${error}`);
    }
}

/** Call processAdapterLang for the given adapter and for every language */
async function processAdapter(adapter: string, repo: RepoAdapter, content: AdapterContent): Promise<void> {
    await Promise.all(consts.LANGUAGES.map(lang => processAdapterLang(adapter, repo, lang, content)));
}

let repoPromise: Promise<Repository> | undefined;

/** Download the stable and the latest repository and apply the stable versions to the latest repository */
function downloadRepo(): Promise<Repository> {
    repoPromise ||= (async (): Promise<Repository> => {
        const stableResult = await axios<Repository>('https://iobroker.live/repo/sources-dist.json');
        const stable = stableResult.data;
        const latestResult = await axios<Repository>('https://iobroker.live/repo/sources-dist-latest.json');
        const latest = latestResult.data;

        delete (latest as Record<string, unknown>)._repoInfo;
        delete (stable as Record<string, unknown>)._repoInfo;

        // get stable versions
        Object.keys(latest).forEach(adapter => {
            latest[adapter].latestVersion = latest[adapter].version;
            latest[adapter].version = stable[adapter] ? stable[adapter].version : '-.-.-';
        });

        return latest;
    })();

    return repoPromise;
}

let statisticsPromise: Promise<Statistics> | undefined;

function downloadStatistics(): Promise<Statistics> {
    statisticsPromise ||= axios<Statistics | string>('https://iobroker.live/statistics.json').then(result =>
        typeof result.data === 'string' ? (JSON.parse(result.data) as Statistics) : result.data,
    );

    return statisticsPromise;
}

/**
 * Download stable and the latest repositories, apply versions from stable to the latest repo,
 * execute processAdapter for every adapter (it downloads the readme from repo and stores it in docs)
 * and then save adapters.json with the full list of adapters.
 *
 * @param adapter only process this adapter
 * @param _noDownload unused, kept for compatibility with the original signature
 */
export function buildAdapterContent(adapter?: string | boolean, _noDownload?: boolean): Promise<AdapterContent> {
    const adapterName: string | undefined = typeof adapter === 'string' ? adapter : undefined;

    return downloadRepo().then(
        repo =>
            new Promise<AdapterContent>(resolve => {
                const content: AdapterContent = {
                    pages: {
                        overview: {
                            title: consts.OVERVIEW,
                            content: 'adapters.md',
                        },
                    },
                };

                const promises = Object.keys(repo)
                    .filter(a => a !== 'js-controller' && (!adapterName || a === adapterName) && a !== '_repoInfo')
                    .map(name => processAdapter(name, repo[name], content));

                void downloadStatistics().then(stat => {
                    utils.queuePromises(promises, () => {
                        Object.keys(stat.adapters)
                            .filter(a => !adapterName || adapterName === a)
                            .forEach(a => {
                                Object.keys(content.pages).find(type => {
                                    const page = content.pages[type].pages?.[a];
                                    if (page) {
                                        page.installs = stat.adapters[a];
                                        page.weekDownloads = repo[a].weekDownloads;
                                        page.stars = repo[a].stars;
                                        page.issues = repo[a].issues;
                                        page.score = repo[a].score;
                                        return true;
                                    }
                                    return false;
                                });
                            });

                        // sort by name
                        const names = Object.keys(content.pages).sort();
                        const sorted: AdapterContent = { pages: {} };
                        names.forEach(name => (sorted.pages[name] = content.pages[name]));

                        fs.writeFileSync(`${consts.FRONT_END_DIR}adapters.json`, JSON.stringify(sorted, null, 2));
                        resolve(sorted);
                    });
                });
            }),
    );
}

/** Copy all documents of one adapter into the front-end directory */
export async function copyAdapterToFrontEnd(lang: LanguageCode, adapter: string): Promise<void> {
    const repo = await downloadRepo();
    const dirName = `${consts.SRC_DOC_DIR + lang}/adapterref/iobroker.${adapter}`;
    if (!fs.existsSync(dirName)) {
        console.error(`No local files found for ${adapter} in ${lang}`);
        return;
    }

    const files = utils.getAllFiles(dirName, false).filter(f => !f.match(/affiliate\.json$/));

    // first copy images
    files.forEach(file => {
        if (!file.match(/\.md$/i)) {
            const data = fs.readFileSync(file);
            utils.writeSafe(
                `${consts.FRONT_END_DIR}${lang}/adapterref/iobroker.${adapter}${file.replace(dirName, '')}`,
                data,
            );
        }
    });

    await Promise.all(
        files
            .filter(f => f.match(/\.md$/i))
            .map(async file => {
                const text = fs.readFileSync(file).toString('utf-8');
                const { header } = utils.extractHeader(text);
                let link = '';
                if (header.local) {
                    link = `${consts.GITHUB_EDIT_ROOT.replace('/edit/', '/').replace(
                        'github.com',
                        'raw.githubusercontent.com',
                    )}docs/${lang}/adapterref/iobroker.${adapter}${file.replace(dirName, '')}`;
                } else if (!repo[adapter]) {
                    console.error(`Invalid adapter entry for ${adapter}. Please fix it!!!!`);
                } else if (!repo[adapter].readme) {
                    console.error(`Adapter ${adapter} has no readme. Please fix it!!!!`);
                } else {
                    const relativeName = file.replace(dirName.endsWith('/') ? dirName : `${dirName}/`, '');
                    // ATTENTION: this condition is only false, if "/main/" is at position 0, so practically always true.
                    // It is kept as it is, to not change the generated links. Probably "!== -1" was meant.
                    if (repo[adapter].readme.indexOf('/main/') !== 0) {
                        link = `${repo[adapter].readme
                            .replace('/blob/main/README.md', '')
                            .replace('/main/README.md', '')
                            .replace('github.com', 'raw.githubusercontent.com')}/main/${relativeName}`;
                    } else {
                        link = `${repo[adapter].readme
                            .replace('/blob/master/README.md', '')
                            .replace('/master/README.md', '')
                            .replace('github.com', 'raw.githubusercontent.com')}/master/${relativeName}`;
                    }
                }

                const result = prepareAdapterReadme(lang, repo[adapter], {
                    body: text,
                    relative: dirName,
                    link: file,
                    editLink: link
                        .replace('raw.githubusercontent.com', 'github.com')
                        .replace('/master/', '/edit/master/')
                        .replace('/main/', '/edit/main/'),
                });

                if (!result) {
                    return;
                }

                utils.writeSafe(
                    `${consts.FRONT_END_DIR + lang}/adapterref/iobroker.${adapter}${result.name}`,
                    result.body,
                );

                if (!repo[adapter].extIcon) {
                    console.error(`WARNING adapter ${adapter} has no extIcon!!`);
                }

                const dst = `${consts.FRONT_END_DIR + lang}/adapterref/iobroker.${adapter}/${(repo[adapter].extIcon || '').split('/').pop()!.split('?')[0]}`;
                if (fs.existsSync(dst)) {
                    return;
                }

                const src = `${consts.FRONT_END_DIR}${result.logo}`;

                // copy logo into the main directory
                if (
                    fs.existsSync(src) &&
                    (src.toLowerCase().endsWith('.png') ||
                        src.toLowerCase().endsWith('.svg') ||
                        src.toLowerCase().endsWith('.jpg'))
                ) {
                    utils.writeSafe(dst, fs.readFileSync(src));
                } else {
                    const icon = await getIcon(repo[adapter].extIcon);
                    if (icon) {
                        utils.writeSafe(dst, icon);
                    }
                }
            }),
    );
}

/** Copy the documents of all adapters and of all languages into the front-end directory */
export async function copyAllAdaptersToFrontEnd(): Promise<void> {
    await Promise.all(
        consts.LANGUAGES.map(async lang => {
            const dirs = fs.readdirSync(`${consts.SRC_DOC_DIR + lang}/adapterref/`);
            await Promise.all(dirs.map(adapter => copyAdapterToFrontEnd(lang, adapter.replace('iobroker.', ''))));
        }),
    );
}

if (process.argv[1] === import.meta.filename) {
    buildAdapterContent('tesla-wallconnector3', true)
        .then(content => console.log(JSON.stringify(content)))
        .catch((error: unknown) => console.error(error));
}
