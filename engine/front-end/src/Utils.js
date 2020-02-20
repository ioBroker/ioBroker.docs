
let statistics;

class Utils {
    static getStatistics() {
        const d = new Date();
        statistics = statistics || Utils.fetchLocal(`data/statistics.json?$t=${d.getFullYear()}_${d.getMonth()}_${d.getDate()}`)
            .then(data => {
                try {
                    return JSON.parse(data)
                } catch (e) {
                    console.error('Cannot parse statistics');
                    return {adapters: {}};
                }
            });

        return statistics;
    }

    static fetchLocal(url) {
        return new Promise((resolve, reject) => {
            const oReq = new XMLHttpRequest();
            oReq.onload = function () {resolve(this.responseText);};
            oReq.open('get', url, true);
            oReq.addEventListener('error', function (e) {reject(e)}, false);
            oReq.send();
        });
    }

    static extractHeader(text) {
        const attrs = {};
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
                        attrs[attr] = line.substring(pos + 1).trim();
                        attrs[attr] = attrs[attr].replace(/^['"]|['"]$/g, '');
                        if (attrs[attr] === 'true') {
                            attrs[attr] = true;
                        } else if (attrs[attr] === 'false') {
                            attrs[attr] = false;
                        } else if (parseFloat(attrs[attr]).toString() === attrs[attr]) {
                            attrs[attr] = parseFloat(attrs[attr]);
                        }
                    } else {
                        attrs[line.trim()] = true;
                    }
                });
                text = text.substring(pos + 7);
            }
        }
        return {header: attrs, body: text};
    }

    static addHeader(text, header) {
        const lines = Object.keys(header).map(attr => `${attr}: ${header[attr]}`);
        if (lines) {
            lines.unshift('---');
            lines.push('---');
            return lines.join('\n') + '\n' + text;
        } else {
            return lines.join('\n');
        }
    }

    static removeDocsify(text) {
        const m = text.match(/{docsify-[^}]*}/g);
        if (m) {
            m.forEach(doc => text = text.replace(doc, ''));
        }
        return text;
    }

    static getTitle(text) {
        let {body, header} = Utils.extractHeader(text);
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
            return '';
        } else {
            return header.title;
        }
    }

    static text2link(text) {
        const m = text.match(/\d+\.\)\s/);
        if (m) {
            text = text.replace(m[0], m[0].replace(/\s/, '&nbsp;'));
        }

        return text.replace(/[^a-zA-Zа-яА-Я0-9]/g, '').trim().replace(/\s/g, '').toLowerCase();
    }

    static text2docLink(text, path) {
        const m = text.match(/\[([^\]]*)]\(([^)]*)\)/);
        if (m) {
            const parts = path.split('/');
            parts.pop();
            return {link: parts.join('/') + '/' + m[2], name: m[1]};
        } else {
            return null;
        }
    }

    static findTitle(line, level, path) {
        let name = line.substring(level + 3).trim()
        // remove bold and italic modifier
            .replace(/^\*|\*$/g, '')
            .replace(/^\*|\*$/g, '')
            .replace(/^\*|\*$/g, '');

        const t = Utils.text2link(name);

        // detect <a id="Systemeinstellungen"></a>9.) Systemeinstellungen
        const m = name.match(/<a [^>]*>(.*)<\/a>/);
        if (m) {
            name = name.replace(m[0], m[1]).trim();
        }

        const link = Utils.text2docLink(name, path);

        return {
            level: level,
            title: link ? link.name : name,
            link: link ? link.link : t,
            href: t,
            external: !!link
        };
    }

    static compareStrings(a, b, invert) {
        if (a === b) return 0;
        if (a > b) {
            return invert ? -1 : 1;
        } else {
            return invert ? 1 : -1;
        }
    }

    static extractLicenseAndChangelog(text, ignoreHeaders) {
        const lines = (text || '').trim().split('\n');
        const changelog = [];
        let changelogA = false;
        const license = [];
        let licenseA = false;
        let newLines = [];
        lines.forEach(line => {
            if (line.match(/#+\sChangelog/i)) {
                !ignoreHeaders && changelog.push('## Changelog');
                changelogA = true;
                licenseA = false;
            } else if (line.match(/#+\sLicense/i)) {
                !ignoreHeaders && license.push('## License');
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
        while (newLines.length && !newLines[0].trim()) newLines.shift();
        while (newLines.length && !newLines[newLines.length - 1].trim()) newLines.pop();

        while (changelog.length && !changelog[0].trim()) changelog.shift();
        while (changelog.length && !changelog[changelog.length - 1].trim()) changelog.pop();

        while (license.length && !license[0].trim()) license.shift();
        while (license.length && !license[license.length - 1].trim()) license.pop();

        return {body: newLines.join('\n'), license: license.join('\n'), changelog: changelog.join('\n')};
    }

    static decorateText(text, header, path) {
        path = path || '';

        let {body, license, changelog} = Utils.extractLicenseAndChangelog(text, true);

        const lines = body.split('\n');
        const content = {};
        let current = [null, null, null, null];

        const parts = [];
        while (lines.length && !lines[0].trim()) lines.shift();
        while (lines.length && !lines[lines.length - 1].trim()) lines.pop();

        let title;

        for (let i = 0; i < lines.length; i++) {
            let line = lines[i].trimRight();
            let last = parts.length - 1;

            if (line.startsWith('=========')) {
                // ignore it
            } else
            if (line.match(/^# /)) {
                const cont = Utils.findTitle(line, -1, path);
                title = cont.title;
            } else
            if (line.trim().startsWith('|')) {
                if (!parts[last] || parts[last].type !== 'table') {
                    parts.push({type: 'table', lines: [line]});
                } else {
                    parts[last].lines.push(line);
                }
            } else
            if (line.match(/^##+ /)) {
                parts.push({lines: [line], type: 'chapter'});
                last++;
                let level = line.split('#').length - 3;
                const cont = Utils.findTitle(line, level, path);
                content[cont.href] = cont;
                current[level] = cont;
                level++;
                while(current[level] !== undefined) level = null;
            } else
            if (line.startsWith('@@@')) {
                line = line.substring(3).trim();
                parts.push({lines: [line], type: '@@@'});
                last++;
                if (line.trim().endsWith('@@@')) {
                    parts[last].lines[0] = line.substring(0, line.length - 3);
                } else {
                    while(i + 1 < lines.length && !lines[i + 1].trim().endsWith('@@@')) {
                        parts[last].lines.push(lines[i + 1].trim());
                        i++;
                    }
                }
            } else if (line.trim().startsWith('```')) {
                parts.push({lines: [line], type: 'code'});
                last++;
                if (!line.substring(3).trim().endsWith('```')) {
                    while(i + 1 < lines.length && !lines[i + 1].trim().endsWith('```')) {
                        parts[last].lines.push(lines[i + 1]);
                        i++;
                    }
                    parts[last].lines.push(lines[i + 1]);
                    i++;
                }
            } else if (line.startsWith('?> ') || line.startsWith('!> ')) {
                parts.push({lines: [line.substring(3)], type: line.startsWith('?>') ? 'warn' : 'alarm'});
                last++;
                while(i + 1 < lines.length && lines[i + 1].trim()) {
                    parts[last].lines.push(lines[i + 1]);
                    i++;
                }
            } else if (line.startsWith('> ')) {
                parts.push({lines: [line.substring(2)], type: 'notice'});
                last++;
                while(i + 1 < lines.length && lines[i + 1].trim()) {
                    parts[last].lines.push(lines[i + 1]);
                    i++;
                }
            } else if (line.trim()) {
                parts.push({lines: [line], type: 'p'});
                last++;
                while(i + 1 < lines.length && //lines[i + 1].trim() &&
                    //!lines[i + 1].trim().match(/^>\s|^\?>\s|^!>\s|^@@@|^#+|^====|^\|/)) {
                    !lines[i + 1].trim().match(/^```|^>\s|^\?>\s|^!>\s|^@@@|^#+|^====|^\|/)) {
                    parts[last].lines.push(lines[i + 1].trimRight());
                    i++;
                }
            }
        }

        return {
            parts,
            content,
            title,
            changeLog: changelog,
            license
        };
    }

    static onCopy(e, text) {
        const el = window.document.createElement('textarea');
        el.value = text;
        el.style.position = 'absolute';
        el.style.left = '-9999px';
        window.document.body.appendChild(el);
        el.select();
        const selection = window.document.getSelection();
        const range = window.document.createRange();
        range.selectNode(el);
        selection.removeAllRanges();
        selection.addRange(range);
        console.log('copy success', window.document.execCommand('copy'));
        selection.removeAllRanges();
        window.document.body.removeChild(el);
        console.log(text);
        if (e) {
            e.stopPropagation();
            e.preventDefault();
        }
    }

    static openLink(url, target) {
        if (target === 'this') {
            window.location = url;
        } else {
            window.open(url, target || '_blank');
        }
    }

    static padding(num) {
        return num > 9 ? num.toString() : '0' + num;
    }
}

export default Utils;
