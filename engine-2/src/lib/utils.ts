import type { DocHeader, Languages } from '../types';

/** The languages a document can be translated out of - the ones the site is built in */
const LANGUAGES: Languages[] = ['de', 'en', 'ru'];

/**
 * Trim character from the start and end of text
 *
 * @param text Text to trim
 * @param char Character to trim (default: space)
 * @returns Trimmed text
 */
function trim(text: string, char: string): string {
    char ||= ' ';
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

export function extractHeader(text: string): {
    header: DocHeader;
    body: string;
} | null {
    const attrs: DocHeader = {};
    if (text === undefined || text === null) {
        return null;
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
                    const attr: keyof DocHeader = line.substring(0, pos).trim() as keyof DocHeader;
                    const value = line
                        .substring(pos + 1)
                        .trim()
                        .replace(/^['"]|['"]$/g, '');

                    // `translatedFrom` names the language a document was translated out of, so it
                    // is the value that has to be one. The check read `line.substring(0, pos)` -
                    // the name of the attribute - and so asked whether "translatedFrom" is a
                    // language. It never is, and every one of them was thrown away.
                    if (attr === 'translatedFrom' && !LANGUAGES.includes(value as Languages)) {
                        return;
                    }

                    (attrs as any)[attr] = value;

                    /*if (attrs[attr] === 'true') {
                        attrs[attr] = true;
                    } else if (attrs[attr] === 'false') {
                        attrs[attr] = false;
                    } else if (parseFloat(attrs[attr]).toString() === attrs[attr]) {
                        attrs[attr] = parseFloat(attrs[attr]);
                    }*/
                } /* else {
                    attrs[line.trim()] = true;
                }*/
            });
            text = text.substring(pos + 7);
        }
    }

    return { header: attrs, body: trim(text, '\n').trimEnd() };
}

export function extractLicenseAndChangelog(text: string): {
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

export function getTitle(text: string): string {
    const result = extractHeader(text);
    if (!result) {
        return 'no title';
    }
    const { header } = result;
    let { body } = result;
    if (!header.title) {
        // remove {docsify-bla}
        body = body.replace(/{[^}]*}/g, '');
        body = body.trim();

        const lines = body.replace(/\r/g, '').split('\n');
        for (let i = 0; i < lines.length; i++) {
            if (lines[i].startsWith('# ')) {
                return lines[i].substring(2).trim();
            }
        }
        return 'no title';
    }
    return header.title;
}
