import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';

import type { MarkdownFile, MarkdownHeader, Translated } from './types.mts';

const BADGES = [
    'shields.io',
    'herokuapp.com',
    'snyk.io',
    'appveyor.com',
    'travis-ci.org',
    'codacy.com',
    'iobroker.live',
    'greenkeeper.io',
    'nodei.co',
];

export function getFileHash(text: string): string {
    return crypto.createHash('sha256').update(text.trim()).digest('base64');
}

/** Execute the given promises one after another, with a small pause in between */
export function queuePromises(promises: Promise<unknown>[], cb?: () => void): void {
    if (!promises?.length) {
        cb?.();
    } else {
        const task = promises.shift()!;
        void task
            .catch(error => console.error(`Cannot process task: ${error}`))
            .then(() => setTimeout(() => queuePromises(promises, cb), 100));
    }
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
    lines.forEach(line => {
        if (line.match(/#+\sChangelog/i)) {
            changelog.push('## Changelog');
            changelogA = true;
            licenseA = false;
        } else if (line.match(/#+\sLicense/i)) {
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
                if (link.toLowerCase().match(/^https?:\/\//) && BADGES.find(badge => link.includes(badge))) {
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
export function replaceImages(
    body: string,
    prefix: string,
    noBadges?: boolean,
): { body: string; doDownload: string[]; badges: Translated } {
    const doDownload: string[] = [];
    const badges: Translated = {};

    if (prefix[prefix.length - 1] !== '/') {
        prefix += '/';
    }

    // replace all images like "mediaDir/blabla.png" with "LN/adapterref/iobroker.adapterName/mediaDir/blabla.png"
    let images = body.match(/!\[[^\]]*]\([^)]*\)/g);
    if (images) {
        images.forEach(image => {
            const m = image.match(/!\[([^\]]*)]\(([^)]*)\)/);
            if (m && m.length === 3) {
                const alt = m[1];
                const link = m[2];
                if (!link.toLowerCase().match(/^https?:\/\//)) {
                    if (!doDownload.includes(link)) {
                        doDownload.push(link);
                    }
                    body = body.replace(image, `![${alt}](${prefix + (link[0] === '/' ? link.substring(1) : link)})`);
                } else if (!noBadges && BADGES.find(badge => link.includes(badge))) {
                    badges[alt] = link;
                    body = body.replace(image, '--delete--');
                }
            }
        });

        // remove delete lines from array
        const lines = body.split('\n');
        for (let i = lines.length - 1; i >= 0; i--) {
            if (lines[i].includes('--delete--')) {
                lines.splice(i, 1);
            }
        }

        body = lines.join('\n');
    }

    // replace all images like "<img src="src/img/rooms/006-double-bed.svg" height="48" />" with "<img src="LN/adapterref/iobroker.adapterName/src/img/rooms/006-double-bed.svg" height="48" />"
    images = body.match(/<img [^>]+>/g);
    if (images) {
        images.forEach(image => {
            const m = image.match(/src="([^"]*)"/);
            if (m && m.length === 2) {
                const link = m[1];
                if (!link.toLowerCase().match(/^https?:\/\//)) {
                    const newImage = image.replace(link, prefix + (link[0] === '/' ? link.substring(1) : link));
                    if (!doDownload.includes(link)) {
                        doDownload.push(link);
                    }
                    body = body.replace(image, newImage);
                }
            }
        });
    }

    return { body, doDownload, badges };
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
