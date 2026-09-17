import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';

import type { MarkdownFile, MarkdownHeader, Translated } from './types.mts';

/** Hosts that serve nothing but badges - an image from them is one, whatever the path says */
const BADGE_HOSTS = [
    'shields.io',
    'herokuapp.com',
    'snyk.io',
    'appveyor.com',
    'travis-ci.org',
    'codacy.com',
    'iobroker.live',
    'greenkeeper.io',
    'nodei.co',
    'weblate.iobroker.net',
    'gitlocalize.com',
    'badge.fury.io',
    'badgen.net',
    'codecov.io',
    'coveralls.io',
    'codeclimate.com',
    'gemnasium.com',
    'action-badges.now.sh',
    'sonarcloud.io',
    'circleci.com',
];

/**
 * A status badge, as opposed to a picture that belongs to the text.
 *
 * Most badge services do nothing else, so their host settles it. GitHub is the exception: it
 * serves the screenshots of a readme next to the build badges of its own Actions, so there the
 * path has to decide. Both spellings appear in the wild:
 *
 *     https://github.com/<owner>/<repo>/workflows/<workflow>/badge.svg
 *     https://github.com/<owner>/<repo>/actions/workflows/<file>.yml/badge.svg
 *
 * Deliberate calls to action are not badges, even though they look like one - a PayPal donate
 * button or a "get it on Google Play" image is content the author put there on purpose.
 *
 * @param link the address of the image
 */
export function isBadge(link: string): boolean {
    if (BADGE_HOSTS.some(host => link.includes(host))) {
        return true;
    }
    // owner and repository are not spelled out - one readme writes "github.com//owner/repo"
    return /github\.com\/.*\/(?:actions\/)?workflows\/.*badge\.svg/.test(link);
}

export function getFileHash(text: string): string {
    return crypto.createHash('sha256').update(text.trim()).digest('base64');
}

/**
 * Run the given tasks, never more than `limit` of them at the same time.
 *
 * The predecessor of this function took an array of promises and awaited them one by one. That
 * looked like a queue but throttled nothing: the caller had already built the array with `.map()`,
 * so every task was running before the first one was ever awaited. Taking functions instead means
 * a task only starts when this function calls it, which is what keeps a few hundred downloads from
 * being fired off at once.
 *
 * A task that throws is reported and does not stop the others, exactly as before.
 *
 * @param tasks the work to do, each one not yet started
 * @param limit how many may run at the same time
 */
export async function queueTasks(tasks: (() => Promise<unknown>)[], limit: number): Promise<void> {
    if (!tasks?.length) {
        return;
    }
    let next = 0;
    const workers = new Array(Math.max(1, Math.min(limit, tasks.length))).fill(0).map(async () => {
        while (next < tasks.length) {
            const task = tasks[next++];
            try {
                await task();
            } catch (error) {
                console.error(`Cannot process task: ${error}`);
            }
        }
    });

    await Promise.all(workers);
}

/**
 * The id of a heading, built the way GitHub builds it.
 *
 * The counterpart of `makeSlug` in `front-end/src/utils/markdown.ts` - the two have to agree,
 * because this one decides which links survive and that one builds the targets they point at.
 *
 * @param text the heading as the reader sees it
 */
export function makeSlug(text: string): string {
    const base = text
        .toLowerCase()
        .trim()
        .replace(/[^\p{L}\p{N}\p{Zs}_-]/gu, '')
        .replace(/\p{Zs}/gu, '-');
    return base || 'section';
}

/** Documents of the adapter repository that this site does not publish, so nothing may link to them */
const UNPUBLISHED_DOCUMENT = /(?:^|\/)CHANGELOG(?:_OLD)?\.md(?:#|$)/i;

/** A markdown link, captured as text and target */
const MARKDOWN_LINK = /\[([^\]]*)]\(([^)\s]*)(?:\s+"[^"]*")?\)/g;

/**
 * The address out of a markdown destination.
 *
 * Markdown lets the target stand in angle brackets - that is how a path holding a space is
 * written, and some readmes use it for paths that need nothing of the kind. The brackets are
 * punctuation and not part of the address. Left in place they travelled into the request:
 * `![object strcture](<../pictures/object_structure.png>)` in the readme of ioBroker.proxmox was
 * asked for as `<../pictures/object_structure.png>` and answered with 404, and the picture is
 * missing on the site.
 *
 * @param destination whatever stood between the parentheses
 */
export function linkDestination(destination: string): string {
    const trimmed = destination.trim();
    return trimmed.startsWith('<') && trimmed.endsWith('>') ? trimmed.substring(1, trimmed.length - 1).trim() : trimmed;
}

/**
 * The stretches of one line that are a code span.
 *
 * A span opens and closes with runs of backticks of the same length, so a run of one closes on the
 * next run of one, and a run of two on the next run of two. A run that never finds its partner is no
 * span at all and is left where it is.
 *
 * @param line one line of the document
 */
function inlineCodeRanges(line: string): [number, number][] {
    const runs: { start: number; length: number }[] = [];
    for (let i = 0; i < line.length;) {
        if (line[i] === '`') {
            let end = i;
            while (end < line.length && line[end] === '`') {
                end++;
            }
            runs.push({ start: i, length: end - i });
            i = end;
        } else {
            i++;
        }
    }

    const ranges: [number, number][] = [];
    const taken = new Set<number>();
    runs.forEach((open, a) => {
        if (taken.has(a)) {
            return;
        }
        const b = runs.findIndex((close, i) => i > a && !taken.has(i) && close.length === open.length);
        if (b > a) {
            taken.add(a);
            taken.add(b);
            ranges.push([open.start, runs[b].start + runs[b].length]);
        }
    });
    return ranges;
}

/**
 * The document with everything written as code blanked out, character for character.
 *
 * The positions stay what they were, so whatever is found in the copy can be replaced in the
 * original. Fenced blocks go whole, code spans go by the stretch they cover. The fence markers go
 * with their block: a line that opens or closes a fence is never content itself.
 *
 * The markers are paired up first, and one that never finds its partner is no fence at all. Simply
 * flipping a flag on every marker would hand the rest of the document to the first unclosed one:
 * the readmes of ioBroker.rpi2 and ioBroker.shuttercontrol each carry an odd marker somewhere in
 * the middle, and every picture below it - real pictures, in ordinary prose - would have been left
 * where it stood and never fetched.
 *
 * @param body the document
 */
function withoutCode(body: string): string {
    const lines = body.split('\n');
    const inFence = new Array<boolean>(lines.length).fill(false);

    let openedAt = -1;
    let openedWith = '';
    lines.forEach((line, index) => {
        const marker = line.match(/^\s*(`{3,}|~{3,})/);
        if (!marker) {
            return;
        }
        const character = marker[1][0];
        /*
         * What follows a backtick fence on its line is the info string, and that one may hold no
         * backtick - so a line like "```iobroker ALL=(ALL) NOPASSWD: ...```" is not a fence at all
         * but a paragraph with a code span, three backticks where one was meant. ioBroker.rpi2 has
         * exactly that, and reading it as a fence swallowed the fourteen lines below it, picture
         * and all, which is not what any reader of that readme sees.
         */
        if (character === '`' && line.substring(line.indexOf('`') + marker[1].length).includes('`')) {
            return;
        }
        if (openedAt < 0) {
            openedAt = index;
            openedWith = character;
        } else if (character === openedWith) {
            // a "~~~" does not close a "```"
            for (let i = openedAt; i <= index; i++) {
                inFence[i] = true;
            }
            openedAt = -1;
            openedWith = '';
        }
    });

    return lines
        .map((line, index) => {
            if (inFence[index]) {
                return ' '.repeat(line.length);
            }
            let masked = line;
            inlineCodeRanges(line).forEach(([from, to]) => {
                masked = masked.substring(0, from) + ' '.repeat(to - from) + masked.substring(to);
            });
            return masked;
        })
        .join('\n');
}

/**
 * Every anchor a document offers to link to.
 *
 * Headings are the usual ones, but readmes also set targets by hand - `<a id="change" />` inside a
 * heading, `<a name="top"></a>` above one - and those count just as much. Collecting more than
 * strictly exists is the safe direction here: an anchor wrongly believed to exist leaves a link
 * alone, while one wrongly believed to be missing would take a working link away.
 *
 * @param lines the document, split into lines
 * @param ignoreLeadingTitle leave out the heading the document opens with - see {@link removeDeadLinks}
 */
function collectAnchors(lines: string[], ignoreLeadingTitle: boolean): Set<string> {
    const anchors = new Set<string>();
    /** How often each slug has been seen - GitHub numbers repeats, see below */
    const seen = new Map<string, number>();
    let fenced = false;
    let firstHeading = true;

    lines.forEach(line => {
        if (/^\s*(?:```|~~~)/.test(line)) {
            fenced = !fenced;
            return;
        }
        if (fenced) {
            return;
        }
        const heading = /^(#{1,6})\s+(.*?)\s*$/.exec(line);
        if (heading) {
            const isTitle = firstHeading && heading[1].length === 1;
            firstHeading = false;
            const slug = makeSlug(
                heading[2]
                    .replace(/<[^>]*>/g, '')
                    .replace(/[`*]/g, '')
                    // Underscores only where they decorate: `_Title_` is emphasis and the marks go,
                    // while the one in `### Objects remote_trophies` is part of the word and GitHub
                    // keeps it in the id. Stripping it wholesale made five documents look as if
                    // every link into their object tables led nowhere.
                    .replace(/(^|\s)_+|_+(?=\s|$)/g, '$1'),
            );
            // A heading that occurs more than once cannot have the same id twice, so GitHub counts:
            // the second `## HTML Properties` is `#html-properties-1`, the third `-2`. vis-material-
            // design writes that heading twenty-two times and links to every one of them.
            const repeat = seen.get(slug) ?? 0;
            seen.set(slug, repeat + 1);
            if (!(isTitle && ignoreLeadingTitle)) {
                anchors.add(repeat ? `${slug}-${repeat}` : slug);
            }
        }
        for (const attribute of line.matchAll(/\b(?:id|name)\s*=\s*"([^"]+)"/g)) {
            anchors.add(attribute[1].toLowerCase());
        }
    });

    return anchors;
}

/**
 * Take out the links that lead nowhere.
 *
 * Two kinds of them survive into the published document. The title of a readme is cut off here -
 * the page shows it in its own heading - and backitup, like many others, closes every chapter with
 * `_[Back to top](#documentation-and-instructions-for-iobrokerbackitup)_`, fourteen links that all
 * pointed at the heading that is no longer there. And a readme may link to `CHANGELOG.md` or
 * `CHANGELOG_OLD.md` next to it in the repository, which this site does not publish at all.
 *
 * A link that is all its line holds takes the line with it; one inside a sentence leaves its text
 * behind, because the sentence still needs the words. A heading left with nothing under it goes
 * too - an empty chapter reads worse than no chapter.
 *
 * This runs before anything is translated, so the removed text never reaches a translator - which
 * is also why `ignoreLeadingTitle` exists. On the way into `docs/` the title is still part of the
 * document and a link to it would look perfectly alive; it is cut off later, when the document is
 * published, and the caller says so here rather than letting the link go through a translator
 * first and be dropped afterwards.
 *
 * @param body the document without its YAML header
 * @param ignoreLeadingTitle treat the heading the document opens with as already gone
 */
export function removeDeadLinks(body: string, ignoreLeadingTitle = false): string {
    const lines = body.split('\n');
    const anchors = collectAnchors(lines, ignoreLeadingTitle);
    let fenced = false;

    const emptied = new Set<number>();

    const kept = lines.map((line, index) => {
        if (/^\s*(?:```|~~~)/.test(line)) {
            fenced = !fenced;
            return line;
        }
        if (fenced || !line.includes('](')) {
            return line;
        }

        const dead: string[] = [];
        const rewritten = line.replace(MARKDOWN_LINK, (whole, text: string, rawTarget: string) => {
            const target = linkDestination(rawTarget);
            const isDeadAnchor = target.startsWith('#') && !anchors.has(target.substring(1).toLowerCase());
            if (!isDeadAnchor && !UNPUBLISHED_DOCUMENT.test(target)) {
                return whole;
            }
            dead.push(whole);
            return text;
        });

        if (!dead.length) {
            return line;
        }

        // Nothing but the link on this line - a "back to top" footer, a bullet holding one file
        // name - so the line itself has no reason to stay
        const bare = line.replace(/^\s*(?:[-*+]|\d+[.)])\s+/, '').replace(/[*_\s]/g, '');
        if (bare === dead.join('').replace(/[*_\s]/g, '')) {
            emptied.add(index);
            return undefined;
        }
        return rewritten;
    });

    return dropEmptySections(kept, emptied);
}

/**
 * Drop the headings that have nothing left under them.
 *
 * `## Older changes` above a single link to `CHANGELOG_OLD.md` is the whole chapter; once the link
 * is gone the heading announces nothing. A heading keeps its place as soon as anything at all
 * follows it before the next heading of the same or a higher level.
 *
 * Only a chapter this pass emptied is dropped. A readme that always had a bare heading keeps it:
 * that is how its author wrote it, and tidying it away is not what was asked for here.
 *
 * @param lines the document, with removed lines left as `undefined`
 * @param emptied the indexes of the lines that were removed
 */
function dropEmptySections(lines: (string | undefined)[], emptied: Set<number>): string {
    const result = lines.slice();

    result.forEach((line, index) => {
        const heading = line === undefined ? null : /^(#{1,6})\s+/.exec(line);
        if (!heading) {
            return;
        }
        const level = heading[1].length;
        let lostSomething = false;

        for (let i = index + 1; i < result.length; i++) {
            const next = result[i];
            if (next === undefined) {
                lostSomething ||= emptied.has(i);
                continue;
            }
            const following = /^(#{1,6})\s+/.exec(next);
            if (following) {
                if (following[1].length <= level) {
                    break;
                }
                return; // a sub-chapter is content enough
            }
            if (next.trim()) {
                return;
            }
        }

        if (lostSomething) {
            result[index] = undefined;
        }
    });

    return result
        .filter(line => line !== undefined)
        .join('\n')
        .replace(/\n{3,}/g, '\n\n')
        .trim();
}

/** Split a markdown document into the YAML like header and the body */
export function extractHeader(text: string | null | undefined): MarkdownFile {
    const attrs: MarkdownHeader = {};
    if (text === undefined || text === null) {
        return { header: attrs, body: '' };
    }
    if (text.substring(0, 3) === '---') {
        const pos = text.substring(3).indexOf('\n---');
        if (pos !== -1) {
            const _header = text.substring(3, pos + 3);
            const lines = _header.replace(/\r/g, '').split('\n');
            lines.forEach(line => {
                if (!line.trim()) {
                    return;
                }
                const pos = line.indexOf(':');
                if (pos !== -1) {
                    const attr = line.substring(0, pos).trim();
                    const value = line
                        .substring(pos + 1)
                        .trim()
                        .replace(/^['"]|['"]$/g, '');
                    if (value === 'true') {
                        attrs[attr] = true;
                    } else if (value === 'false') {
                        attrs[attr] = false;
                    } else if (parseFloat(value).toString() === value) {
                        attrs[attr] = parseFloat(value);
                    } else {
                        attrs[attr] = value;
                    }
                } else {
                    attrs[line.trim()] = true;
                }
            });
            text = text.substring(pos + 7);
        }
    }

    return { header: attrs, body: trim(text, '\n').trimEnd() };
}

/** Remove the given character from the start and from the end of the text */
export function trim(text: string, char?: string): string {
    char = char || ' ';
    // remove leading \n
    while (text && text[0] === char) {
        text = text.substring(1);
    }
    // remove trailing \n
    while (text && text[text.length - 1] === char) {
        text = text.substring(0, text.length - 1);
    }
    return text;
}

/** Read the title from the header or from the first "# " line of a markdown document */
export function getTitle(text: string): string {
    const { body, header } = extractHeader(text);
    if (header.title) {
        return header.title;
    }

    // remove {docsify-bla}
    const lines = body
        .replace(/{[^}]*}/g, '')
        .trim()
        .replace(/\r/g, '')
        .split('\n');

    for (let i = 0; i < lines.length; i++) {
        if (lines[i].startsWith('# ')) {
            return lines[i].substring(2).trim();
        }
    }
    return 'no title';
}

/** Write the YAML like header in front of the markdown document */
export function addHeader(text: string, header: MarkdownHeader): string {
    const lines = Object.keys(header).map(attr => `${attr}: ${header[attr]}`);
    lines.unshift('---');
    lines.push('---');
    return `${lines.join('\n')}\n${text}`;
}

export function createDir(dir: string): void {
    try {
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }
    } catch (e) {
        console.error(`Try to create a directory: ${dir}`);
        console.error(`Try to create a directory: ${(e as Error).toString()}`);
        console.error(`Actual directory: ${process.cwd()}`);
    }
}

/** Write a file and create all missing directories on the way */
export function writeSafe(fileName: string, data: string | Buffer): void {
    fileName = fileName.replace(/\?[^?]*$/, '');
    const parts = fileName.replace(/\\/g, '/').split('/');
    parts.pop();
    createDir(parts.join('/'));
    if (fileName.includes('https:')) {
        console.error(`Cannot save "${fileName}"`);
    } else {
        fs.writeFileSync(fileName, data);
    }
}

export function copyDir(source: string, target: string): void {
    fs.readdirSync(source).forEach(file => {
        const sourceName = path.join(source, file);
        const targetName = path.join(target, file);
        const stat = fs.statSync(sourceName);
        if (stat.isDirectory()) {
            if (!fs.existsSync(targetName)) {
                fs.mkdirSync(targetName);
            }
            copyDir(sourceName, targetName);
        } else if (targetName.includes('https:')) {
            console.error(`Cannot save "${targetName}"`);
        } else {
            fs.writeFileSync(targetName, fs.readFileSync(sourceName));
        }
    });
}

export function delDir(source: string): void {
    if (fs.existsSync(source)) {
        const stat = fs.statSync(source);
        if (stat.isDirectory()) {
            fs.readdirSync(source).forEach(file => {
                const sourceName = path.join(source, file);
                const stat = fs.statSync(sourceName);
                if (stat.isDirectory()) {
                    delDir(sourceName);
                } else {
                    fs.unlinkSync(sourceName);
                }
            });
            fs.rmdirSync(source);
        } else {
            console.error(`${source} is not a directory`);
        }
    }
}

/** Cut the chapters "Changelog" and "License" out of the document */
/**
 * Whether a heading opens the changelog or the license appendix - the two chapters that are cut
 * off before a document is translated and put back afterwards, so that version numbers, dates and
 * the licence text stay as they are.
 *
 * The chapter has to *be* that one, not merely start with the word. vis writes
 * `## License requirements` about licence keys in the middle of its text; a prefix match pulled
 * that chapter out of every translated page and left two `## License` headings at the end. The
 * decoration around the word is ignored though, because the same chapter is written
 * `## Changelog:`, `### Changelog` and `## Changelog <a id="change" />` in the wild.
 *
 * @param line one line of the document
 */
export function appendixHeading(line: string): 'changelog' | 'license' | undefined {
    const match = /^#{1,6}\s+(.*?)\s*$/.exec(line);
    if (!match) {
        return undefined;
    }
    const text = match[1]
        // an anchor the author left for their own table of contents
        .replace(/<[^>]*>/g, '')
        .replace(/[*_`]/g, '')
        .replace(/[:：]\s*$/, '')
        // a closed ATX heading ends in hashes again
        .replace(/#+\s*$/, '')
        .trim()
        .toLowerCase();

    if (text === 'changelog') {
        return 'changelog';
    }
    if (text === 'license' || text === 'licence') {
        return 'license';
    }
    return undefined;
}

/**
 * The same question for every line of a document, but with HTML comments taken into account.
 *
 * The miele readme keeps its whole licence chapter inside `<!-- … -->`, so nothing of it is shown
 * on GitHub. Reading `### License` there as the licence appendix would put a commented-out block,
 * closing marker and all, into the licence dialog.
 *
 * @param lines the document, split into lines
 */
export function appendixHeadings(lines: string[]): (ReturnType<typeof appendixHeading> | undefined)[] {
    let inComment = false;
    return lines.map(line => {
        if (inComment) {
            if (line.includes('-->')) {
                inComment = false;
            }
            return undefined;
        }
        if (line.includes('<!--') && !line.includes('-->')) {
            inComment = true;
            return undefined;
        }
        return appendixHeading(line);
    });
}

export function extractLicenseAndChangelog(text: string | null | undefined): {
    body: string;
    license: string;
    changelog: string;
} {
    const lines = (text || '').trim().split('\n');
    const changelog: string[] = [];
    let changelogA = false;
    const license: string[] = [];
    let licenseA = false;
    const newLines: string[] = [];
    const appendices = appendixHeadings(lines);
    lines.forEach((line, index) => {
        const appendix = appendices[index];
        if (appendix === 'changelog') {
            changelog.push('## Changelog');
            changelogA = true;
            licenseA = false;
        } else if (appendix === 'license') {
            license.push('## License');
            changelogA = false;
            licenseA = true;
        } else if (line.match(/^# |^## /)) {
            // if some other chapter detected
            newLines.push(line);
            changelogA = false;
            licenseA = false;
        } else if (licenseA) {
            license.push(line);
        } else if (changelogA) {
            changelog.push(line);
        } else {
            newLines.push(line);
        }
    });
    while (newLines.length && !newLines[0].trim()) {
        newLines.shift();
    }
    while (newLines.length && !newLines[newLines.length - 1].trim()) {
        newLines.pop();
    }

    while (changelog.length && !changelog[0].trim()) {
        changelog.shift();
    }
    while (changelog.length && !changelog[changelog.length - 1].trim()) {
        changelog.pop();
    }

    while (license.length && !license[0].trim()) {
        license.shift();
    }
    while (license.length && !license[license.length - 1].trim()) {
        license.pop();
    }

    return { body: newLines.join('\n'), license: license.join('\n'), changelog: changelog.join('\n') };
}

/** Append the chapters "Changelog" and "License" to the document again */
export function addChangelogAndLicense(body: string, changelog?: string, license?: string): string {
    return (
        body.trim().replace(/\n+$/, '') +
        (changelog ? `\n\n${changelog.trim().replace(/\n+$/, '')}` : '') +
        (license ? `\n\n${license.trim().replace(/\n+$/, '')}` : '')
    );
}

/** Collect all files of a directory recursively */
export function getAllFiles(root: string, onlyMd?: boolean, _result?: string[]): string[] {
    const result = _result || [];
    fs.readdirSync(root).forEach(name => {
        const fileName = path.join(root, name).replace(/\\/g, '/');
        const stat = fs.statSync(fileName);
        if (stat.isDirectory()) {
            getAllFiles(fileName, onlyMd, result);
        } else if (!name.startsWith('_') && (!onlyMd || name.match(/\.md$/i))) {
            result.push(fileName);
        }
    });
    return result;
}

/** Remove all badges (shields.io and co) from the body and return them separately */
export function extractBadges(body: string): { body: string; badges: Translated } {
    const badges: Translated = {};

    const images = body.match(/!\[[^\]]*]\([^)]*\)/g);
    if (images) {
        images.forEach(image => {
            const m = image.match(/!\[([^\]]*)]\(([^)]*)\)/);
            if (m && m.length === 3) {
                const alt = m[1];
                const link = m[2];
                if (link.toLowerCase().match(/^https?:\/\//) && isBadge(link)) {
                    badges[alt] = link;
                    body = body.replace(image, '--delete--');
                }
            }
        });
    }

    // [](https://www.npmjs.com/package/iobroker.admin)
    const lines = body.split('\n');
    for (let i = lines.length - 1; i >= 0; i--) {
        if (lines[i].includes('--delete--')) {
            lines.splice(i, 1);
        }
    }
    body = lines.join('\n').trim();

    return { body, badges };
}

/** Insert the badges after the logo and the title again */
export function addBadgesToBody(body: string, badges: Translated): string {
    if (!badges || !Object.keys(badges).length) {
        return body;
    }
    const lines = body.split('\n');
    let i = 0;
    // skip logo and title
    while (lines[i].startsWith('# ') || lines[i].startsWith('![')) {
        i++;
    }

    lines.splice(i, 0, '');

    Object.keys(badges).map((badge, j) => lines.splice(i + j + 1, 0, `![${badge}](${badges[badge]})`));

    if (lines[i + 1 + Object.keys(badges).length]) {
        lines.splice(i + 1 + Object.keys(badges).length, 0, '');
    }

    return lines.join('\n');
}

/**
 * Prefix all relative image links, collect the images, that must be downloaded, and extract the badges
 *
 * @param body markdown document
 * @param prefix path, that will be written in front of every relative link
 * @param noBadges do not extract the badges
 */
/** One image to fetch: where it really is, and where it has to end up here */
export interface ImageToDownload {
    /** the link as the document writes it, resolved against the document */
    remote: string;
    /** the path below the directory of the document on this site */
    local: string;
}

/**
 * Bring a link into the directory the document is written to.
 *
 * A readme of an adapter that lives in `docs/en/` of its repository points at the logo beside it
 * as `../../admin/javascript.svg`. Everything of an adapter is collected into one directory here,
 * so prefixing that link produced
 * `en/adapterref/iobroker.javascript/../../admin/javascript.svg`, which resolves to
 * `en/admin/javascript.svg` - a place nothing is ever written to, and the browser drew a broken
 * image where the logo belongs. The steps that climb out are dropped and what remains is taken
 * relative to the directory of the adapter, which is where the file is put.
 *
 * @param link the link as the document writes it
 */
/**
 * A path of this site: `<language>/adapterref/...`, the place the documents of the adapters are
 * written to, either in a directory of their own or directly beside it (`de/adapterref/pic.png`).
 *
 * What may not follow is another language directory. `img/../../de/img/icon.png` of ioBroker.imap
 * becomes `de/adapterref/de/img/icon.png` when joined, which looks like a path of this site and is
 * none: that picture belongs beside the adapter and is fetched there.
 */
const SITE_PATH = /^[a-z]{2}(-[a-z]{2})?\/adapterref\/(?![a-z]{2}(-[a-z]{2})?\/)/i;

function withoutClimb(link: string): string {
    // The steps do not have to stand at the front: imap writes `img/../../de/img/icon.png`, which
    // only climbs out once the first segment is taken back. Normalising first turns that into
    // `../de/img/icon.png`, and what is left to strip is then really at the front.
    return path.posix.normalize(link).replace(/^(?:\.{1,2}\/)+/, '');
}

/**
 * @param body the document
 * @param prefix the directory the document is written to
 * @param noBadges keep the badges in the text instead of collecting them
 * @param prefixIsRoot the prefix is a root of its own - a link climbing above it is brought back
 *        in, instead of pointing at a directory that does not exist. True for the readme of an
 *        adapter, false for the documentation, where `../` names a real sibling directory.
 */
export function replaceImages(
    body: string,
    prefix: string,
    noBadges?: boolean,
    prefixIsRoot?: boolean,
): { body: string; doDownload: ImageToDownload[]; badges: Translated } {
    const doDownload: ImageToDownload[] = [];
    const badges: Translated = {};

    if (prefix[prefix.length - 1] !== '/') {
        prefix += '/';
    }

    /**
     * The path the file gets here, and whether the prefix still belongs in front of it.
     *
     * Two kinds of link climb out of the adapter's directory. A readme that lives in `docs/en/`
     * of its repository reaches the logo beside the code as `../../admin/logo.svg`: that file is
     * collected into the adapter's directory, so the steps are dropped. A translated document
     * points back at the English copy on this site, `../../../en/adapterref/iobroker.x/admin/
     * logo.svg`: that path is already complete, and dropping the steps and prefixing it produced
     * `de/adapterref/iobroker.x/en/adapterref/iobroker.x/admin/logo.svg`, an address that exists
     * nowhere (OliverIO in the forum, 17.09.2026).
     */
    const localOf = (link: string): { local: string; prefixed: boolean } => {
        if (prefixIsRoot) {
            if (link.includes('../')) {
                const joined = path.posix.normalize(prefix + link);
                if (SITE_PATH.test(joined)) {
                    return { local: joined, prefixed: false };
                }
            }
            return { local: withoutClimb(link), prefixed: true };
        }
        return { local: link[0] === '/' ? link.substring(1) : link, prefixed: true };
    };

    const remember = (remote: string, local: string): void => {
        if (!doDownload.some(item => item.remote === remote)) {
            doDownload.push({ remote, local });
        }
    };

    /*
     * Pictures are looked for in this copy, where everything written as code is blanked out, and
     * rewritten in the real one at the positions found there. Two things come of that.
     *
     * A readme showing what to type is not showing a picture: `<img src="{onvif.0.IP_PORT.snapshot}">`
     * in a fenced block of ioBroker.onvif, and `` `<img src="...">` `` in a sentence of
     * ioBroker.cameras, were both fetched as if they were logos and answered with 404. The reader is
     * meant to see those lines as they stand, not to have them rewritten.
     *
     * And every occurrence is now rewritten where it stands. `body.replace(image, ...)` replaced the
     * first one in the document, so the second use of the same picture took the place of the first.
     */
    const masked = withoutCode(body);
    const edits: { start: number; end: number; text: string }[] = [];

    // replace all images like "mediaDir/blabla.png" with "LN/adapterref/iobroker.adapterName/mediaDir/blabla.png"
    for (const m of masked.matchAll(/!\[([^\]]*)]\(([^)]*)\)/g)) {
        const alt = m[1];
        const link = linkDestination(m[2]);
        if (!link.toLowerCase().match(/^https?:\/\//)) {
            const { local, prefixed } = localOf(link);
            // a path that is already on this site brings nothing along to download
            if (prefixed) {
                remember(link, local);
            }
            edits.push({
                start: m.index,
                end: m.index + m[0].length,
                text: `![${alt}](${prefixed ? prefix + local : local})`,
            });
        } else if (!noBadges && isBadge(link)) {
            badges[alt] = link;
            edits.push({ start: m.index, end: m.index + m[0].length, text: '--delete--' });
        }
    }

    // replace all images like "<img src="src/img/rooms/006-double-bed.svg" height="48" />" with "<img src="LN/adapterref/iobroker.adapterName/src/img/rooms/006-double-bed.svg" height="48" />"
    for (const m of masked.matchAll(/<img [^>]+>/g)) {
        const src = m[0].match(/src="([^"]*)"/);
        if (src) {
            const link = src[1];
            if (!link.toLowerCase().match(/^https?:\/\//)) {
                const { local, prefixed } = localOf(link);
                if (prefixed) {
                    remember(link, local);
                }
                edits.push({
                    start: m.index,
                    end: m.index + m[0].length,
                    text: m[0].replace(link, prefixed ? prefix + local : local),
                });
            }
        }
    }

    // from the back, so that one replacement does not move the position of the next
    edits.sort((a, b) => b.start - a.start);
    edits.forEach(e => (body = body.substring(0, e.start) + e.text + body.substring(e.end)));

    if (Object.keys(badges).length) {
        // a line that held nothing but a badge goes with it
        body = body
            .split('\n')
            .filter(line => !line.includes('--delete--'))
            .join('\n');
    }

    return { body, doDownload, badges };
}

/**
 * Put back the blank that the translation ate beside a piece of inline code.
 *
 * The engines hand a sentence back without the space in front of `` `code` ``: "standardmäßig
 * auf`auto` und folgen" instead of "standardmäßig auf `auto` und folgen". It happens in roughly
 * every third translated readme and reads like a typographic error (OliverIO in the forum,
 * 17.09.2026). A blank is put back where a letter, a digit, a closing emphasis or a sentence sign
 * stands directly against the code, and a blank that ended up in front of a closing bracket or a
 * comma is taken out again. Fenced blocks are left alone: there the spacing is the content.
 *
 * @param markdown the translated document
 */
export function restoreSpacesAroundInlineCode(markdown: string): string {
    const SPAN = /(?<!`)`([^`\n]+)`(?!`)/g;
    const EMPHASIS = ['**', '__', '*', '_'];
    const SENTENCE = '.,;:!?)';
    let inFence = false;

    return markdown
        .split('\n')
        .map(line => {
            if (/^\s*(```|~~~)/.test(line)) {
                inFence = !inFence;
                return line;
            }
            if (inFence) {
                return line;
            }
            let out = '';
            let last = 0;
            for (const match of line.matchAll(SPAN)) {
                const start = match.index!;
                const before = line.substring(0, start);
                out += line.substring(last, start);
                const previous = before[before.length - 1] ?? '';
                if (
                    previous &&
                    (/[\p{L}\p{N}]/u.test(previous) ||
                        SENTENCE.includes(previous) ||
                        EMPHASIS.some(sign => before.endsWith(sign)))
                ) {
                    out += ' ';
                }
                out += match[0];
                last = start + match[0].length;
                const rest = line.substring(last);
                if (rest && (/[\p{L}\p{N}]/u.test(rest[0]) || EMPHASIS.some(sign => rest.startsWith(sign)))) {
                    out += ' ';
                }
            }
            out += line.substring(last);
            // the blank the engine moved behind the code, in front of a sign that takes none
            return out.replace(/` ([)\],.;:])/g, '`$1');
        })
        .join('\n');
}

/**
 * Resolve "../" in a path
 *
 * de/adapterref/iobroker.ping/../../../en/adapterref/iobroker.ping/admin/ping.png
 * => en/adapterref/iobroker.ping/admin/ping.png
 */
export function normalizePath(filePath: string): string {
    if (filePath.includes('../')) {
        const parts = filePath.split('/');
        const pos = parts.indexOf('..');
        if (pos > 0) {
            parts.splice(pos - 1, 2);
            filePath = parts.join('/');
            return normalizePath(filePath);
        }
    }
    return filePath;
}
