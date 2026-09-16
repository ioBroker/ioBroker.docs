// 1. Collect all possible adapters in docs/LN/adapterref and do not collect yet local files marked as "local: true"
// 2. Cross translate adapters in master/front-end/public/LN/adapterref. Start from english

import axios, { type AxiosError } from 'axios';
import fs from 'node:fs';
import path from 'node:path';

import * as utils from './utils.mts';
import * as consts from './consts.mts';
import * as docCrawl from './docCrawl.mts';
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

/**
 * How many adapters are worked on at the same time.
 *
 * Every adapter pulls its logo, its readme and the images of that readme, in four languages, from
 * raw.githubusercontent.com. Starting all ~800 of them at once made GitHub drop most of the
 * connections: of 792 adapters only 240 kept a logo, and which ones was pure luck of the draw.
 */
const PARALLEL_ADAPTERS = 10;
/** How often a download is attempted before it is given up on */
const DOWNLOAD_ATTEMPTS = 3;
/** Wait before the n-th retry, multiplied by the number of the attempt (ms) */
const RETRY_DELAY_MS = 500;
/** No single request may hang longer than this (ms) */
const DOWNLOAD_TIMEOUT_MS = 30_000;

function fixImages(
    lang: LanguageCode,
    adapter: string,
    body: string,
): { body: string; badges: Translated; doDownload: utils.ImageToDownload[] } {
    const prefix = `${lang}/adapterref/iobroker.${adapter}/`;

    // replace all images like "<img src="src/img/rooms/006-double-bed.svg" height="48" />" with "<img src="LN/adapterref/iobroker.adapterName/src/img/rooms/006-double-bed.svg" height="48" />"
    // The directory of the adapter is a root here: everything of it is collected in there, so a
    // link that climbs out of it (`../../admin/logo.svg`) is brought back in.
    const res = utils.replaceImages(body, prefix, false, true);

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
        result.doDownload.map(async image => {
            const local = image.local.split('?')[0].split(' ')[0].replace(/^\//, '');
            const remote = image.remote.split('?')[0].split(' ')[0];

            const absLocalPath = path.normalize(localDirName + local).replace(/\\/g, '/');

            // Check if file should be downloaded within an adapter path
            if (!absLocalPath.startsWith(localDirName) || fs.existsSync(absLocalPath)) {
                return;
            }

            /*
             * Where the file really lies. A link is written relative to its document, and the
             * document is not always at the root of the repository - the readmes under `docs/en/`
             * reach the logo beside the code as `../../admin/logo.svg`. `URL` follows those steps
             * the way a browser does; joining the two strings did not, and the request went out
             * with the `../` still in it. A link starting with "/" means the root of the
             * repository, which is the first seven segments of the address of the document.
             */
            let url: string;
            if (!data.link) {
                url = remote;
            } else if (remote.startsWith('/')) {
                // https:, "", "", raw.githubusercontent.com, owner, repo, branch, ...
                url = `${data.link.split('/').slice(0, 7).join('/')}${remote}`;
            } else {
                try {
                    url = new URL(remote, data.link).toString();
                } catch {
                    url = remote;
                }
            }

            try {
                const result = await axios<Buffer>(url, { responseType: 'arraybuffer' });
                if (result?.data) {
                    utils.writeSafe(absLocalPath, result.data);
                }
            } catch (err) {
                console.error(`Cannot _download "${url}" to "${absLocalPath}": ${err}`);
            }
        }),
    );

    // Clean the document before it is stored: step 5 translates what lies in `docs/`, and there is
    // no point in having a translator work on a link that does not survive publication. The title
    // is still part of the document here - it is cut off when the document is published, so a link
    // to it counts as dead already.
    const { header } = utils.extractHeader(data.body);
    const withoutDeadLinks = utils.removeDeadLinks(body, true);
    const cleaned = Object.keys(header).length ? utils.addHeader(withoutDeadLinks, header) : withoutDeadLinks;

    return { body: cleaned, name: data.link ? data.link.replace(data.relative!, '') : 'README.md' };
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
    header.versionDate = repo.versionDate;
    header.latestVersionDate = repo.latestVersionDate;

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

    // The title is gone by now, and with it the target of every "back to top" a readme closes its
    // chapters with. This has to happen after the removals above, not before, because that is what
    // makes those links dead in the first place.
    const cleaned = utils.removeDeadLinks(lines.join('\n'));

    return {
        body: utils.addHeader(cleaned, header),
        name: data.link ? data.link.replace(data.relative!, '') : 'README.md',
        logo: header.logo,
    };
}

/** The image formats a logo may come in, as far as their first bytes give them away */
const IMAGE_FORMATS = ['png', 'jpg', 'gif', 'webp', 'svg'] as const;

/** What a file really is, by its first bytes - `undefined` for anything not recognised */
function sniffImageFormat(buffer: Buffer): string | undefined {
    // An error page or a repository view where an image was expected. Naming it lets
    // matchesExtension() call the file stale instead of shrugging at content it does not know.
    if (/^s*(?:<!doctypes+html|<html[s>])/i.test(buffer.subarray(0, 512).toString('utf8'))) {
        return 'html';
    }
    if (buffer.length >= 8 && buffer.readUInt32BE(0) === 0x89504e47) {
        return 'png';
    }
    if (buffer.length >= 3 && buffer[0] === 0xff && buffer[1] === 0xd8 && buffer[2] === 0xff) {
        return 'jpg';
    }
    if (buffer.subarray(0, 4).toString('latin1') === 'GIF8') {
        return 'gif';
    }
    if (buffer.subarray(0, 4).toString('latin1') === 'RIFF' && buffer.subarray(8, 12).toString('latin1') === 'WEBP') {
        return 'webp';
    }
    // an SVG may open with an XML declaration, a doctype or a comment, so the tag is looked for
    if (buffer.subarray(0, 1024).toString('utf8').includes('<svg')) {
        return 'svg';
    }
    return undefined;
}

/** The image format a file name claims, with the spellings of jpeg folded into one */
function imageExtension(fileName: string): string {
    const extension = path.extname(fileName).slice(1).toLowerCase();
    return extension === 'jpeg' ? 'jpg' : extension;
}

/**
 * Whether a logo that is already on disk still is what its name says it is.
 *
 * Some adapters once shipped a renamed PNG as their `.svg` logo. That file was downloaded back
 * then and stayed, because the cache below only ever asked whether the file exists - long after
 * the adapter had checked in a real SVG. The browser goes by the extension, serves the PNG as
 * `image/svg+xml` and shows a broken image where the logo belongs.
 *
 * A format or an extension that is not recognised is nothing to complain about: only a file that
 * demonstrably is something else than its name promises counts as stale.
 *
 * @param fileName the name the file is stored under
 * @param buffer what is in it
 */
function matchesExtension(fileName: string, buffer: Buffer): boolean {
    const promised = imageExtension(fileName);
    const actual = sniffImageFormat(buffer);
    if (!actual || !IMAGE_FORMATS.includes(promised as (typeof IMAGE_FORMATS)[number])) {
        return true;
    }
    return actual === promised;
}

/**
 * The address a file really lives at.
 *
 * A few adapters point `extIcon` at the GitHub *page* of their logo instead of at the logo:
 * `github.com/<owner>/<repo>/blob/<ref>/<path>` answers with the HTML of the web view, and that
 * HTML then sits in the icon directory as a 228 kB `.svg` that no browser can draw. The raw host
 * serves the file itself. Anything that is not such an address is handed back untouched.
 *
 * @param url the address as the repository lists it
 */
export function rawGithubUrl(url: string): string {
    return url.replace(
        /^https?:\/\/(?:www\.)?github\.com\/([^/]+)\/([^/]+)\/(?:blob|raw)\/(.+)$/i,
        'https://raw.githubusercontent.com/$1/$2/$3',
    );
}

/** Read the logo from the local copy or download it */
async function getIcon(url: string | undefined, checkFile?: string): Promise<Buffer | undefined> {
    if (!url) {
        return undefined;
    }
    if (checkFile && fs.existsSync(checkFile)) {
        const cached = fs.readFileSync(checkFile);
        if (matchesExtension(checkFile, cached)) {
            return cached;
        }
        // The copy is of no use - fetch the file again. If the remote one is mislabelled as well,
        // this says so on every build, which is the only way anybody notices.
        console.error(
            `!!!! ICON ${checkFile} is a ${sniffImageFormat(cached)}, not what its name says - fetching it again`,
        );
    }
    return getUrl(rawGithubUrl(url), true);
}

/**
 * Whether a request that came back without a document is worth repeating.
 *
 * A reply carrying a status is the server's answer and does not change however often it is asked:
 * `404` means the file has been renamed or deleted in the repository. A failure without a status
 * never reached the server - a reset connection, a timeout, a refused socket - and that is exactly
 * what happens when a few hundred requests hit raw.githubusercontent.com at the same time. `429`
 * and the `5xx` family say "not now" rather than "not ever" and are repeated as well.
 *
 * @param error whatever axios rejected with
 */
function isRetryable(error: unknown): boolean {
    const status = (error as AxiosError | undefined)?.response?.status;
    if (status === undefined) {
        return true;
    }
    return status === 429 || status >= 500;
}

/**
 * Fetch an URL, repeating the attempt while the failure looks like a passing one.
 *
 * Nothing here caches: the caller decides what to do with a document it could not get. The delay
 * grows with every attempt, so a host that is briefly overwhelmed gets a moment to recover instead
 * of being asked three times in a row.
 *
 * @param url the address to read
 * @throws {Error} the last error, once the attempts are used up or the server gave a verdict
 */
async function requestWithRetry(url: string): Promise<Buffer> {
    for (let attempt = 1; ; attempt++) {
        try {
            const result = await axios<Buffer>(url, {
                responseType: 'arraybuffer',
                validateStatus: status => status === 200,
                timeout: DOWNLOAD_TIMEOUT_MS,
            });
            return result.data;
        } catch (error) {
            if (!isRetryable(error) || attempt >= DOWNLOAD_ATTEMPTS) {
                throw error;
            }
            console.warn(`Attempt ${attempt} of ${DOWNLOAD_ATTEMPTS} for ${url} failed: ${error}`);
            await new Promise(resolve => setTimeout(resolve, RETRY_DELAY_MS * attempt));
        }
    }
}

/**
 * Download an URL. Every URL is only downloaded once - but only an answer is remembered.
 *
 * The cache used to keep failures too, and one reset connection was enough to lose a logo for the
 * whole run: the second attempt in {@link copyAdapterToFrontEnd} got the cached `undefined` back
 * without ever touching the network, `adapters.json` still carried the file name, and the site
 * showed a broken image. A transport error is therefore retried a few times, and if it still does
 * not get through, the URL leaves no trace in the cache so that a later step may try again.
 */
function getUrl(url: string, binary: true): Promise<Buffer | undefined>;
function getUrl(url: string, binary?: false): Promise<string | undefined>;
function getUrl(url: string, binary?: boolean): Promise<string | Buffer | undefined> {
    if (!url) {
        return Promise.resolve(undefined);
    }
    urlsCache[url] ||= (async (): Promise<string | Buffer | undefined> => {
        console.log(`Requested ${url}`);
        try {
            const data = await requestWithRetry(url);
            return binary ? data : data.toString();
        } catch (error) {
            console.error(`Cannot download ${url}: ${error}`);
            if (isRetryable(error)) {
                // Not the server's verdict - forget it, so that a later step may ask again
                delete urlsCache[url];
            }
            return undefined;
        }
    })();
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
    // `readme` was settled by resolveReadme before the languages fanned out
    const readmeDoc = await getUrl(rawReadmeUrl(repo.readme));

    const declared: string[] = repo.docs?.[lang]
        ? Array.isArray(repo.docs[lang])
            ? repo.docs[lang]
            : [repo.docs[lang]]
        : [];

    /*
     * Which documents the adapter has.
     *
     * `common.docs` is only what an author bothered to declare - 88 of 791 do. So the declared
     * files (or the readme, when nothing is declared) are the starting points, and from there the
     * links into the same repository are followed. ecoflow-mqtt declares nothing and keeps 44
     * device manuals in `doc/devices/`; they were invisible on the site until now.
     *
     * The collection stays inside the directory of the first document, because that is where the
     * files are written: a document above it would have no name there.
     */
    const location = docCrawl.parseRepoLocation(repo.readme);
    const seeds = declared.length
        ? declared
        : [repo.readme.replace(/^https?:\/\/(?:www\.)?github\.com\/[^/]+\/[^/]+\/blob\/[^/]+\//i, '')];
    const root = path.posix.dirname(seeds[0]);

    /*
     * An icon pack has no documentation to follow. Its second document is an `ICONLIST.md` - some
     * thousand lines of `![Bullet Camera Filled.png](www/alarm/black/…)`, one per icon. Collecting
     * those cost a third of the whole translation bill for file names nobody reads as text, and
     * every reference in them is an image the pipeline then tries to download.
     */
    const isIconPack = repo.type === 'visualization-icons';

    let collected: { path: string; body: string }[] = [];
    if ((declared.length || lang === 'en') && location) {
        collected = await docCrawl.crawlDocuments(location, seeds, lang, docPath => getUrl(location.raw + docPath), {
            root: root === '.' ? '' : root,
            // an icon pack keeps what it declares and nothing more - no links are followed
            maxDepth: isIconPack ? 0 : undefined,
        });
    }

    /*
     * A link to a document that was collected leads to it on the site, everything else that points
     * into the repository leads to the file on GitHub. Without this every relative link died: the
     * browser resolved it against the address of the app instead of against the document.
     */
    if (location && collected.length) {
        const prefix = root === '.' ? '' : `${root}/`;
        const names = new Map(collected.map(doc => [doc.path, doc.path.substring(prefix.length)]));
        const siteUrlOf = (docPath: string): string | undefined => {
            const name = names.get(docPath);
            if (name === undefined) {
                return undefined;
            }
            // the first document is written as README.md and is the page of the adapter itself
            return docPath === collected[0].path || name === 'README.md'
                ? `/#/adapters/${adapter}`
                : `/#/docs/adapterref/iobroker.${adapter}/${name}`;
        };
        collected.forEach(doc => (doc.body = docCrawl.rewriteLinks(doc.body, doc.path, location, siteUrlOf)));
    }

    const results: AdapterReadme[] = collected.map(doc => ({
        body: doc.body,
        downloaded: true,
        link: location!.raw + doc.path,
    }));

    if (declared.length && results.length) {
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
    }

    if (!results.length && lang === 'en') {
        // no github address to crawl from, or nothing could be fetched - the readme alone, as before
        results.push({ body: readmeDoc || '', link: rawReadmeUrl(repo.readme) });
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

        /**
         * Only claim a logo that is really there.
         *
         * The name came out of `extIcon` and was written into the JSON whether the download had
         * worked or not, so a failed one left the site asking for a file that answers 404 and
         * drawing a broken image instead. All languages share one URL through the cache, so the
         * file either arrived for all of them or for none. Whatever is still missing here gets a
         * second chance in {@link copyAdapterToFrontEnd}, and {@link syncIconsInAdaptersJson}
         * writes the ones that succeed there back into the JSON.
         */
        if (iconName && icon) {
            adapterPage.icon = `adapterref/iobroker.${adapter}/${iconName}`;
        }

        /**
         * The readme used to be fetched in the background, un-awaited, "exactly as in the original
         * JavaScript version": adapters.json was written while several thousand downloads were
         * still in flight. That defeated any attempt to limit how much runs at once - an adapter
         * counted as done as soon as its logo was there - and it turned the fields assigned below
         * into a race, because `github`, `version` and the rest were set after the JSON had
         * already been written to disk.
         */
        await getReadme(lang, dirName, repo, adapter)
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
                adapterPage.versionDate = repo.versionDate;
                adapterPage.latestVersionDate = repo.latestVersionDate;
                adapterPage.materialize = repo.materialize;
                adapterPage.compact = repo.compact;
                adapterPage.description = repo.desc;
                adapterPage.titleFull = repo.titleLang || repo.title;
                adapterPage.created = repo.created;
                /*
                 * Both out of one reading of the address. This used to cut `/blob/master/README.md`
                 * off the end with a string replace, which only works on the web spelling of a
                 * GitHub link - seventeen adapters give the raw one, where there is no `/blob/`,
                 * and their "github" ended up as
                 * `https://github.com/tnowak/ioBroker.airly/master/README.md`. That is the address
                 * the icon on the adapter card opens, and GitHub answers it with a 404. The branch
                 * was read the same way and quietly fell back to `master` for all of them.
                 */
                const location = parseRepoUrl(repo.readme);
                if (location) {
                    adapterPage.branch = location.branch;
                    adapterPage.github = `https://github.com/${location.owner}/${location.repository}`;
                } else {
                    adapterPage.branch = 'master';
                }

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

/**
 * Settle where the readme of this adapter is before the languages fan out.
 *
 * A shape that cannot work was already replaced in {@link downloadRepo}. What is left is an address
 * that looks perfectly good and is not there: haassohn names the owner `grieger`, who does not have
 * the repository, while `meta` names `marvingrieger`, who does. Only such an adapter is asked
 * about, and the answer comes out of the cache the readme download fills anyway, so this costs
 * nothing for the 680 adapters whose two fields agree.
 *
 * @param repo the adapter as the repository describes it
 */
async function resolveReadme(repo: RepoAdapter): Promise<void> {
    const fromMeta = metaReadmeUrl(repo);
    if (!fromMeta || rawReadmeUrl(repo.readme) === rawReadmeUrl(fromMeta)) {
        return;
    }

    if (await getUrl(rawReadmeUrl(repo.readme))) {
        return;
    }

    if (await getUrl(rawReadmeUrl(fromMeta))) {
        console.warn(`Adapter ${repo.name}: ${repo.readme} is not there - using ${fromMeta} instead`);
        repo.readme = fromMeta;
    }
}

/** Call processAdapterLang for the given adapter and for every language */
async function processAdapter(adapter: string, repo: RepoAdapter, content: AdapterContent): Promise<void> {
    await resolveReadme(repo);
    await Promise.all(consts.LANGUAGES.map(lang => processAdapterLang(adapter, repo, lang, content)));
}

let repoPromise: Promise<Repository> | undefined;

/** Download the stable and the latest repository and apply the stable versions to the latest repository */
function downloadRepo(): Promise<Repository> {
    repoPromise ||= (async (): Promise<Repository> => {
        // Without a retry a single reset connection to iobroker.live ends the whole build before
        // the first adapter is even looked at.
        const stable = JSON.parse(
            (await requestWithRetry('https://iobroker.live/repo/sources-dist.json')).toString(),
        ) as Repository;
        const latest = JSON.parse(
            (await requestWithRetry('https://iobroker.live/repo/sources-dist-latest.json')).toString(),
        ) as Repository;

        delete (latest as Record<string, unknown>)._repoInfo;
        delete (stable as Record<string, unknown>)._repoInfo;

        // Settle the readme address here, so that every step works from the same one - the shape is
        // decided without asking the network, which is what makes it affordable in the steps that
        // download nothing.
        Object.keys(latest).forEach(adapter => {
            if (!namesDocument(latest[adapter].readme)) {
                const fromMeta = metaReadmeUrl(latest[adapter]);
                if (fromMeta) {
                    latest[adapter].readme = fromMeta;
                }
            }
        });

        // get stable versions
        Object.keys(latest).forEach(adapter => {
            latest[adapter].latestVersion = latest[adapter].version;
            latest[adapter].latestVersionDate = latest[adapter].versionDate;
            latest[adapter].version = stable[adapter] ? stable[adapter].version : '-.-.-';
            latest[adapter].versionDate = stable[adapter] ? stable[adapter].versionDate : undefined;
        });

        return latest;
    })();

    return repoPromise;
}

let statisticsPromise: Promise<Statistics> | undefined;

function downloadStatistics(): Promise<Statistics> {
    statisticsPromise ||= requestWithRetry('https://iobroker.live/statistics.json').then(
        data => JSON.parse(data.toString()) as Statistics,
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
export async function buildAdapterContent(adapter?: string | boolean, _noDownload?: boolean): Promise<AdapterContent> {
    const adapterName: string | undefined = typeof adapter === 'string' ? adapter : undefined;
    const repo = await downloadRepo();

    const content: AdapterContent = {
        pages: {
            overview: {
                title: consts.OVERVIEW,
                content: 'adapters.md',
            },
        },
    };

    const adapterNames = Object.keys(repo).filter(
        a => a !== 'js-controller' && (!adapterName || a === adapterName) && a !== '_repoInfo',
    );

    // The statistics come from a different host and are only needed at the end, so they are on
    // their way while the adapters are worked through - but no adapter waits for them.
    const [stat] = await Promise.all([
        downloadStatistics(),
        utils.queueTasks(
            adapterNames.map(name => () => processAdapter(name, repo[name], content)),
            PARALLEL_ADAPTERS,
        ),
    ]);

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

    // Sort by name - the types and the adapters inside each of them. adapters.json is checked in,
    // and the order used to be whatever order the adapters happened to finish in, so every build
    // rewrote most of the file and buried the real change in tens of thousands of moved lines.
    const sorted: AdapterContent = { pages: {} };
    Object.keys(content.pages)
        .sort()
        .forEach(type => {
            const typePage = content.pages[type];
            if (!typePage.pages) {
                sorted.pages[type] = typePage;
                return;
            }
            const pages: Record<string, AdapterPage> = {};
            Object.keys(typePage.pages)
                .sort()
                .forEach(adapter => (pages[adapter] = typePage.pages![adapter]));
            sorted.pages[type] = { ...typePage, pages };
        });

    fs.writeFileSync(`${consts.FRONT_END_DIR}adapters.json`, JSON.stringify(sorted, null, 2));
    return sorted;
}

/**
 * The readme derived from `meta`.
 *
 * `meta` is the io-package.json the repository entry was read from, so it is right by
 * construction - it is how the entry got there. The readme of an adapter sits beside it.
 *
 * @param repo the adapter as the repository describes it
 */
function metaReadmeUrl(repo: RepoAdapter): string {
    return repo.meta ? repo.meta.replace('io-package.json', 'README.md') : '';
}

/**
 * Whether `readme` names a document that can be fetched.
 *
 * The field is written by hand and a dozen adapters do not put a document in it: three give npm's
 * `<repo>#readme` form, one the bare repository, one the plain string `README.md`, aura the address
 * of its generated documentation site - which answered with 17 kB of VitePress HTML that went onto
 * the page, doctype and script tags and all - and five leave it out altogether.
 *
 * The test is deliberately narrow: an absolute address ending in a markdown file. Everything else
 * falls back to {@link metaReadmeUrl}, which is not a guess.
 *
 * @param readme the field as the repository writes it
 */
function namesDocument(readme: string | undefined): boolean {
    return !!readme && /^https?:\/\//i.test(readme) && /\.(?:md|markdown)$/i.test(readme.split(/[#?]/)[0]);
}

/** The raw address of a readme, given the way a repository writes it */
function rawReadmeUrl(url: string): string {
    return url
        .replace('github.com', 'raw.githubusercontent.com')
        .replace('/blob/master/', '/master/')
        .replace('/blob/main/', '/main/');
}

/**
 * The address a document of an adapter can be edited under on GitHub.
 *
 * The link used to be assembled by string surgery on `readme`, guarded by a condition that could
 * never be true (`indexOf('/main/') !== 0` - a URL never starts with that). Every adapter therefore
 * took the same branch, `/main/<file>` was appended to a path that already ended in `README.md`,
 * and the two `/edit/` replacements afterwards hit both halves:
 * `github.com/inventwo/ioBroker.vis-icontwo/blob/edit/master/README.md/edit/main/README.md`.
 *
 * Owner, repository and branch are simply read out of `readme` instead, which the repository writes
 * either as a web link (`github.com/<owner>/<repo>/blob/<branch>/…`) or as a raw one
 * (`raw.githubusercontent.com/<owner>/<repo>/<branch>/…`).
 *
 * The file is not always where it is stored here either: the documents of an adapter are flattened
 * into one directory, while `README.md` sits in the root of its repository and the further
 * documents under `docs/<lang>/`. `io-package.json` lists those paths, so the entry ending in the
 * wanted file name is the one to point at - and for a language the adapter does not document
 * itself, the English original is the next best thing to offer.
 *
 * @param repo the adapter as the repository describes it
 * @param lang the language of the document
 * @param relativeName the document, relative to the adapter's directory
 */
/** Owner, repository and branch, out of either spelling of a GitHub address */
export function parseRepoUrl(url: string | undefined): { owner: string; repository: string; branch: string } | null {
    const parsed =
        /^https?:\/\/(?:www\.)?github\.com\/([^/]+)\/([^/]+)\/(?:blob|raw|edit)\/([^/]+)\//i.exec(url || '') ||
        /^https?:\/\/raw\.githubusercontent\.com\/([^/]+)\/([^/]+)\/([^/]+)\//i.exec(url || '');
    return parsed ? { owner: parsed[1], repository: parsed[2], branch: parsed[3] } : null;
}

export function buildEditLink(repo: RepoAdapter, lang: LanguageCode, relativeName: string): string {
    // A readme that does not name a document is no use here either - aura pointed at its
    // documentation site, which has no editable source behind it, and five adapters give no
    // readme at all. `meta` names a file in the repository itself.
    const source = namesDocument(repo.readme) ? repo.readme : metaReadmeUrl(repo);
    const parsed = parseRepoUrl(source);
    if (!parsed) {
        return '';
    }

    const { owner, repository, branch } = parsed;
    const name = relativeName.replace(/^\/+/, '');
    const fileName = name.split('/').pop();
    const documented = [repo.docs?.[lang], repo.docs?.en]
        .map(entry => (typeof entry === 'string' ? [entry] : entry))
        .find(entries => entries?.some(entry => entry.split('/').pop() === fileName));

    const inRepo = documented?.find(entry => entry.split('/').pop() === fileName) || name;

    return `https://github.com/${owner}/${repository}/edit/${branch}/${inRepo}`;
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
                let editLink = '';
                if (header.local) {
                    // The document is maintained in this repository, not in the adapter's
                    editLink = `${consts.GITHUB_EDIT_ROOT}docs/${lang}/adapterref/iobroker.${adapter}${file.replace(dirName, '')}`;
                } else if (!repo[adapter]) {
                    console.error(`Invalid adapter entry for ${adapter}. Please fix it!!!!`);
                } else {
                    editLink = buildEditLink(
                        repo[adapter],
                        lang,
                        file.replace(dirName.endsWith('/') ? dirName : `${dirName}/`, ''),
                    );
                }

                const result = prepareAdapterReadme(lang, repo[adapter], {
                    body: text,
                    relative: dirName,
                    link: file,
                    editLink,
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

                /**
                 * Copy the logo into the main directory - but only if it is the same kind of image
                 * the name promises.
                 *
                 * The name of the destination comes from `extIcon`, the content from the picture the
                 * readme shows. Where those two disagree the file ends up lying about itself: seven
                 * adapters stored their readme PNG as `<name>.svg`, the server sent it as
                 * `image/svg+xml`, and the browser drew a broken image instead of the logo. When the
                 * formats do not match, the real icon is fetched instead.
                 */
                const sameFormat = imageExtension(src) === imageExtension(dst);
                if (
                    sameFormat &&
                    fs.existsSync(src) &&
                    (src.toLowerCase().endsWith('.png') ||
                        src.toLowerCase().endsWith('.svg') ||
                        src.toLowerCase().endsWith('.jpg'))
                ) {
                    utils.writeSafe(dst, fs.readFileSync(src));
                } else {
                    if (fs.existsSync(src) && !sameFormat) {
                        console.error(
                            `!!!! ICON ${adapter}: the readme logo is a ${imageExtension(src)} but extIcon says ${imageExtension(dst)} - downloading it`,
                        );
                    }
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
    const tasks: (() => Promise<unknown>)[] = [];
    consts.LANGUAGES.forEach(lang => {
        // A language may have no documents at all. Chinese is no longer translated (see
        // consts.SYNC_LANGUAGES) and its directory is on its way out, while `LANGUAGES` still
        // lists it because what was translated before is still published - so the directory can be
        // missing, and the step then ended on ENOENT instead of copying the other three languages.
        const root = `${consts.SRC_DOC_DIR + lang}/adapterref/`;
        if (!fs.existsSync(root)) {
            console.warn(`No documents for ${lang} - nothing to copy`);
            return;
        }

        // Only the `iobroker.` directories are adapters. Twenty images lie loose beside them -
        // `vis.png`, `shelly_restrict_login.png` and the like - and `media/` holds the device
        // pictures of mydlink, all left one level too high by an older layout and referenced by no
        // document. Each was taken for an adapter and reported as one that has no local files, on
        // every build and in every language.
        fs.readdirSync(root, { withFileTypes: true })
            .filter(entry => entry.isDirectory() && entry.name.startsWith('iobroker.'))
            .forEach(entry => tasks.push(() => copyAdapterToFrontEnd(lang, entry.name.replace('iobroker.', ''))));
    });

    // This step downloads too: every logo the download step did not get lands here, and firing all
    // of them off at once is what caused the losses in the first place.
    await utils.queueTasks(tasks, PARALLEL_ADAPTERS);

    await syncIconsInAdaptersJson();
}

/**
 * Bring the `icon` entries of adapters.json in line with what is really on disk.
 *
 * Two steps put logos in place: the download in {@link buildAdapterContent} and, for everything
 * that failed there, {@link copyAdapterToFrontEnd}. adapters.json is written between the two, so
 * a logo that only arrives in the second step would be missing from it. The front-end reads every
 * logo out of `en/`, so that is the copy that decides.
 */
async function syncIconsInAdaptersJson(): Promise<void> {
    const fileName = `${consts.FRONT_END_DIR}adapters.json`;
    if (!fs.existsSync(fileName)) {
        return;
    }

    const repo = await downloadRepo();
    const content = JSON.parse(fs.readFileSync(fileName).toString()) as AdapterContent;
    const lang: LanguageCode = consts.LANGUAGES.includes('en') ? 'en' : consts.LANGUAGES[0];
    let changed = false;

    Object.keys(content.pages).forEach(type => {
        const pages = content.pages[type].pages;
        Object.keys(pages || {}).forEach(adapter => {
            const page = pages![adapter];
            const extIcon = repo[adapter]?.extIcon;
            const iconName = extIcon ? extIcon.split('/').pop()!.split('?')[0] : '';
            const icon = iconName ? `adapterref/iobroker.${adapter}/${iconName}` : '';

            // A handful of adapters are documented here but no longer listed in the repository.
            // They have no extIcon to go by, so whatever they already point at has to speak for
            // itself - if that file is there, it stays.
            const stored = page.icon;
            const found = [icon, stored].find(
                candidate => candidate && fs.existsSync(`${consts.FRONT_END_DIR}${lang}/${candidate}`),
            );

            if (found) {
                if (stored !== found) {
                    page.icon = found;
                    changed = true;
                }
            } else if (stored !== undefined) {
                console.error(`!!!! ADAPTER has no icon: ${adapter}`);
                delete page.icon;
                changed = true;
            }
        });
    });

    if (changed) {
        fs.writeFileSync(fileName, JSON.stringify(content, null, 2));
    }
}

if (process.argv[1] === import.meta.filename) {
    buildAdapterContent('tesla-wallconnector3', true)
        .then(content => console.log(JSON.stringify(content)))
        .catch((error: unknown) => console.error(error));
}
