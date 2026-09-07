#!/usr/bin/env node
'use strict';

/**
 * Prueft und repariert die Bildverweise in den Adapter-Dokumenten unter `docs/<lang>/adapterref/`.
 *
 * WARUM DAS NOETIG IST
 * Die Readmes werden aus den Repositories der Adapter-Autoren uebernommen. Dort liegt eine
 * uebersetzte Readme oft in einem Unterordner (z.B. `docs/de/README.md`), und ein Bild wird
 * von dort mit `../../admin/bild.png` adressiert - bezogen auf die Wurzel jenes Repositories.
 * Beim Einsammeln landet dieselbe Datei flach in `docs/<lang>/adapterref/iobroker.<name>/`,
 * die zwei Ebenen ueber ihr gibt es hier aber nicht mehr: aus dem Verweis wird
 * `docs/<lang>/admin/bild.png` und damit ins Leere.
 *
 * Der Download-Schritt des Builds faengt das nicht ab: er laedt ein fehlendes Bild nur dann
 * nach, wenn der Pfad **innerhalb** des Adapterordners bleibt (`adapters.js`, Bedingung
 * `absLocalPath.startsWith(localDirName)`). Ein Verweis mit `../` faellt genau durch dieses
 * Raster - stillschweigend, ohne Meldung.
 *
 * WAS DAS SKRIPT TUT
 *   1. Es liest jede Markdown-Datei unter `docs/<lang>/adapterref/`, sammelt alle relativen
 *      Bildverweise (Markdown und <img>) und prueft, ob die Datei wirklich existiert.
 *   2. `--fix` schreibt einen kaputten Verweis auf eine Datei um, die im **selben Adapter**
 *      bereits vorliegt - meist im englischen Ordner, den die uebersetzten Seiten ohnehin
 *      mitbenutzen. Kein Netz noetig.
 *   3. `--download` holt, was danach noch fehlt, aus dem GitHub-Repository des Adapters
 *      (Adresse und Branch stehen in `front-end/public/adapters.json`), legt es im
 *      Adapterordner ab und schreibt den Verweis darauf um.
 *
 * Ohne Schalter aendert es nichts und gibt nur den Bericht aus.
 *
 * AUFRUF
 *   node build-lib/fixAdapterAssets.js                  # nur Bericht
 *   node build-lib/fixAdapterAssets.js --fix            # umschreiben, was lokal da ist
 *   node build-lib/fixAdapterAssets.js --fix --download # zusaetzlich fehlende Bilder holen
 *   node build-lib/fixAdapterAssets.js --fix --dry-run  # zeigen, was passieren wuerde
 *   node build-lib/fixAdapterAssets.js --adapter zigbee # nur einen Adapter
 *   node build-lib/fixAdapterAssets.js --json bericht.json
 *   node build-lib/fixAdapterAssets.js --strict         # Exit 1, wenn etwas kaputt bleibt
 *
 * Im Build gehoert es hinter das Einsammeln und vor das Kopieren ins Frontend, also
 * zwischen `5.syncDocs` und `8.copyFiles`.
 *
 * Das Skript ist wiederholbar: ein zweiter Lauf findet nichts mehr zu tun.
 */

const fs = require('node:fs');
const path = require('node:path');
const consts = require('./consts');

const LANGUAGES = consts.LANGUAGES;
/**
 * Standardmaessig der Dokumentenbaum des Projekts. `--docs <ordner>` setzt ihn um - damit
 * laesst sich der Lauf gefahrlos an einer Kopie ausprobieren, bevor er auf das echte
 * Verzeichnis losgelassen wird.
 */
let DOCS_DIR = consts.SRC_DOC_DIR.replace(/\/+$/, '');
let ADAPTERS_JSON = path.join(consts.FRONT_END_DIR, 'adapters.json');

/** Verweise, die nicht auf eine Datei im Baum zeigen und daher nie geprueft werden */
const EXTERNAL = /^(https?:)?\/\/|^data:|^#|^mailto:|^<|^\{/i;
/** Endungen, die als Bild gelten - alles andere ist ein Dokumentlink und wird nicht angefasst */
const ASSET_EXT = /\.(png|jpe?g|gif|svg|webp|bmp|ico|apng|avif)$/i;

// ---------------------------------------------------------------- Textwerkzeuge

/**
 * Bereiche, in denen nichts ersetzt werden darf: eingerueckte und eingezaeunte Codebloecke
 * sowie Code in Backticks. In Readmes stehen dort Beispielpfade, die keine Verweise sind.
 */
function protectedRanges(text) {
    const ranges = [];
    const fence = /^(\s*)(```|~~~)[^\n]*$/gm;
    let open = null;
    let m;
    while ((m = fence.exec(text)) !== null) {
        if (open === null) {
            open = m.index;
        } else {
            ranges.push([open, m.index + m[0].length]);
            open = null;
        }
    }
    if (open !== null) {
        ranges.push([open, text.length]);
    }
    const inline = /`[^`\n]*`/g;
    while ((m = inline.exec(text)) !== null) {
        ranges.push([m.index, m.index + m[0].length]);
    }
    return ranges;
}

function isProtected(ranges, index) {
    return ranges.some(([from, to]) => index >= from && index < to);
}

/**
 * Alle Bildverweise einer Datei. `start`/`end` zeigen auf den Pfad selbst, nicht auf das
 * ganze Tag - so bleibt beim Ersetzen alles andere (alt-Text, width, title) unberuehrt.
 */
function findReferences(text) {
    const ranges = protectedRanges(text);
    const refs = [];
    let m;

    // ![alt](pfad "titel")
    const md = /!\[[^\]]*]\(\s*([^)\s]+)/g;
    while ((m = md.exec(text)) !== null) {
        const start = m.index + m[0].length - m[1].length;
        if (!isProtected(ranges, m.index)) {
            refs.push({ link: m[1], start, end: start + m[1].length, kind: 'markdown' });
        }
    }

    // <img src="pfad"> und <img src='pfad'>
    const html = /<img\b[^>]*?\bsrc\s*=\s*("([^"]*)"|'([^']*)')/gi;
    while ((m = html.exec(text)) !== null) {
        const value = m[2] !== undefined ? m[2] : m[3];
        const start = m.index + m[0].length - value.length - 1;
        if (!isProtected(ranges, m.index)) {
            refs.push({ link: value, start, end: start + value.length, kind: 'img' });
        }
    }

    return refs.sort((a, b) => a.start - b.start);
}

// ---------------------------------------------------------------- Dateiwerkzeuge

function walk(dir, out) {
    out = out || [];
    let entries;
    try {
        entries = fs.readdirSync(dir, { withFileTypes: true });
    } catch {
        return out;
    }
    for (const entry of entries) {
        const full = path.join(dir, entry.name);
        if (entry.isDirectory()) {
            walk(full, out);
        } else {
            out.push(full.replace(/\\/g, '/'));
        }
    }
    return out;
}

/** docs-relativer, normalisierter Pfad - oder null, wenn er aus dem Baum herausfuehrt */
function resolveInsideDocs(mdFile, link) {
    const clean = decodeURIComponent(link.split('?')[0].split('#')[0].trim());
    if (!clean) {
        return null;
    }
    const base = path.posix.dirname(toDocsRelative(mdFile));
    const joined = clean.startsWith('/')
        ? path.posix.normalize(clean.slice(1))
        : path.posix.normalize(path.posix.join(base, clean));
    return joined.startsWith('..') ? null : joined;
}

function toDocsRelative(file) {
    return file.replace(/\\/g, '/').slice(DOCS_DIR.length + 1);
}

function adapterOf(docsRelative) {
    // <lang>/adapterref/iobroker.<name>/...
    const parts = docsRelative.split('/');
    return parts.length >= 3 && parts[1] === 'adapterref' ? parts[2] : null;
}

// ---------------------------------------------------------------- Kandidatensuche

/**
 * Index ueber alle vorhandenen Dateien: Kleinbuchstaben-Dateiname -> echte Pfade.
 * Der Vergleich ist absichtlich unabhaengig von Gross- und Kleinschreibung, weil die
 * Readmes von Windows- wie von Linux-Rechnern kommen.
 */
function buildAssetIndex() {
    const byName = new Map();
    const existing = new Set();
    for (const lang of LANGUAGES) {
        for (const file of walk(path.join(DOCS_DIR, lang, 'adapterref'))) {
            const rel = toDocsRelative(file);
            existing.add(rel.toLowerCase());
            if (rel.endsWith('.md')) {
                continue;
            }
            const name = path.posix.basename(rel).toLowerCase();
            if (!byName.has(name)) {
                byName.set(name, []);
            }
            byName.get(name).push(rel);
        }
    }
    return { byName, existing };
}

/**
 * Die passende vorhandene Datei zu einem kaputten Verweis - nur innerhalb desselben
 * Adapters. Ein gleichnamiges Bild in einem fremden Adapter waere geraten, nicht repariert;
 * solche Faelle kommen in den Bericht und werden nicht angefasst.
 * Reihenfolge: gleiche Sprache, dann Englisch (die uebersetzten Seiten benutzen ohnehin
 * meist die englischen Bilder), dann der kuerzeste Pfad.
 */
function pickCandidate(index, docsRelativeMd, link) {
    const adapter = adapterOf(docsRelativeMd);
    if (!adapter) {
        return { candidate: null, foreign: [] };
    }
    const wanted = path.posix.basename(decodeURIComponent(link.split('?')[0].split('#')[0])).toLowerCase();
    const all = index.byName.get(wanted) || [];
    const own = all.filter(p => adapterOf(p) === adapter);
    if (!own.length) {
        return { candidate: null, foreign: all };
    }
    const lang = docsRelativeMd.split('/')[0];
    const rank = p => {
        const l = p.split('/')[0];
        if (l === lang) {
            return 0;
        }
        return l === 'en' ? 1 : 2;
    };
    own.sort((a, b) => rank(a) - rank(b) || a.length - b.length);
    return { candidate: own[0], foreign: [] };
}

function relativeLink(fromMd, toAsset) {
    const rel = path.posix.relative(path.posix.dirname(fromMd), toAsset);
    return rel.startsWith('.') ? rel : `./${rel}`;
}

// ---------------------------------------------------------------- Download

function loadAdapterRepos() {
    const repos = new Map();
    let json;
    try {
        json = JSON.parse(fs.readFileSync(ADAPTERS_JSON, 'utf8'));
    } catch (e) {
        console.warn(`  adapters.json nicht lesbar (${ADAPTERS_JSON}): ${e.message}`);
        return repos;
    }
    const visit = node => {
        if (!node || typeof node !== 'object') {
            return;
        }
        if (typeof node.github === 'string' && typeof node.content === 'string') {
            const m = node.content.match(/adapterref\/(iobroker\.[^/]+)\//i);
            // `github` steht in adapters.json nicht immer als reine Repo-Adresse, sondern
            // haeufig als Readme-Link mit Branch und Dateinamen dahinter
            // (z.B. .../zechnerhubert/ioBroker.al-ko/master/README.md). Gebraucht wird nur
            // Eigentuemer und Repository.
            const repo = node.github.match(/github\.com\/([^/]+)\/([^/#?]+)/i);
            if (m && repo) {
                repos.set(m[1].toLowerCase(), {
                    owner: repo[1],
                    repo: repo[2].replace(/\.git$/i, ''),
                    branch: node.branch || 'master',
                });
            }
        }
        for (const value of Object.values(node)) {
            if (value && typeof value === 'object') {
                visit(value);
            }
        }
    };
    visit(json);
    return repos;
}

/**
 * Wie der Pfad im Repository des Adapters aussehen koennte. Der Verweis ist relativ zu einem
 * Ordner, den es hier nicht mehr gibt, also werden die fuehrenden `../` abgeschnitten - was
 * uebrig bleibt, ist in aller Regel der Pfad ab der Wurzel des Repositories.
 */
function repoCandidates(link) {
    const clean = decodeURIComponent(link.split('?')[0].split('#')[0]).replace(/^\.\//, '');
    const withoutUp = clean.replace(/^(\.\.\/)+/, '').replace(/^\//, '');
    const candidates = [withoutUp];
    // manche Verweise tragen den docs-Pfad einer anderen Sprache mit sich
    const cross = withoutUp.match(/^(?:de|en|ru|zh-cn)\/adapterref\/iobroker\.[^/]+\/(.+)$/i);
    if (cross) {
        candidates.push(cross[1]);
    }
    // Wenn die uebersetzte Readme im Repository unter `docs/<sprache>/` liegt, zeigt ein
    // `../` auf `docs/` und nicht auf die Wurzel. Die drei ueblichen Ablagen werden
    // deshalb zusaetzlich probiert.
    for (const base of candidates.slice()) {
        candidates.push(`docs/${base}`, `admin/${base}`, `media/${base}`);
    }
    return [...new Set(candidates)];
}

async function download(url) {
    const response = await fetch(url, { redirect: 'follow' });
    if (!response.ok) {
        return null;
    }
    return Buffer.from(await response.arrayBuffer());
}

// ---------------------------------------------------------------- Hauptlauf

async function run(options) {
    const index = buildAssetIndex();
    const repos = options.download ? loadAdapterRepos() : new Map();

    const report = { checked: 0, ok: 0, relinked: [], downloaded: [], ambiguous: [], unresolved: [] };
    const files = [];
    // Englisch zuerst: ein fehlendes Bild wird dann im englischen Ordner abgelegt, und die
    // uebersetzten Seiten zeigen darauf - genau die Aufteilung, die der Baum ohnehin hat
    const order = ['en', ...LANGUAGES.filter(l => l !== 'en')];
    for (const lang of order) {
        for (const file of walk(path.join(DOCS_DIR, lang, 'adapterref'))) {
            if (file.endsWith('.md')) {
                files.push(file);
            }
        }
    }

    for (const file of files) {
        const docsRel = toDocsRelative(file);
        if (options.adapter && !docsRel.includes(`iobroker.${options.adapter.replace(/^iobroker\./i, '')}/`)) {
            continue;
        }
        const original = fs.readFileSync(file, 'utf8');
        let text = original;
        // von hinten nach vorne ersetzen, damit die Positionen gueltig bleiben
        const refs = findReferences(original).reverse();

        for (const ref of refs) {
            if (EXTERNAL.test(ref.link) || !ASSET_EXT.test(ref.link.split('?')[0])) {
                continue;
            }
            report.checked++;
            const target = resolveInsideDocs(file, ref.link);
            if (target && index.existing.has(target.toLowerCase())) {
                report.ok++;
                continue;
            }

            const { candidate, foreign } = pickCandidate(index, docsRel, ref.link);
            if (candidate) {
                const newLink = relativeLink(docsRel, candidate);
                report.relinked.push({ file: docsRel, from: ref.link, to: newLink });
                if (options.fix) {
                    text = text.slice(0, ref.start) + newLink + text.slice(ref.end);
                }
                continue;
            }

            if (options.download) {
                const adapter = adapterOf(docsRel);
                const repo = adapter && repos.get(adapter.toLowerCase());
                if (repo) {
                    const raw = `https://raw.githubusercontent.com/${repo.owner}/${repo.repo}`;
                    // der eingetragene Branch zuerst, danach die beiden ueblichen Namen -
                    // in adapters.json steht oft pauschal "master", auch wenn das
                    // Repository laengst "main" benutzt
                    const branches = [...new Set([repo.branch, 'master', 'main'])];
                    const attempts = [];
                    for (const branch of branches) {
                        for (const candidatePath of repoCandidates(ref.link)) {
                            attempts.push({ branch, candidatePath });
                        }
                    }
                    let saved = null;
                    for (const attempt of attempts) {
                        const candidatePath = attempt.candidatePath;
                        const url = `${raw}/${attempt.branch}/${candidatePath}`;
                        let data = null;
                        try {
                            data = await download(url);
                        } catch (e) {
                            data = null;
                            if (options.verbose) {
                                console.warn(`      ${url}: ${e.message}`);
                            }
                        }
                        if (data) {
                            // der Unterordner aus dem Repository bleibt erhalten
                            // (admin/, doc/, img/ ...) - so liegt das Bild dort, wo es
                            // die uebrigen Sprachen ohnehin schon erwarten
                            const destination = path.posix.join(path.posix.dirname(docsRel), candidatePath);
                            if (!options.dryRun) {
                                const absolute = path.join(DOCS_DIR, destination);
                                fs.mkdirSync(path.dirname(absolute), { recursive: true });
                                fs.writeFileSync(absolute, data);
                            }
                            // auch im Probelauf eintragen, damit die weiteren Sprachen
                            // gleich auf diese Datei zeigen statt sie erneut zu holen
                            index.existing.add(destination.toLowerCase());
                            const name = path.posix.basename(destination).toLowerCase();
                            if (!index.byName.has(name)) {
                                index.byName.set(name, []);
                            }
                            index.byName.get(name).push(destination);
                            saved = { destination, url };
                            break;
                        }
                    }
                    if (saved) {
                        const newLink = relativeLink(docsRel, saved.destination);
                        report.downloaded.push({ file: docsRel, from: ref.link, to: newLink, url: saved.url });
                        if (!options.dryRun) {
                            text = text.slice(0, ref.start) + newLink + text.slice(ref.end);
                        }
                        continue;
                    }
                }
            }

            if (foreign.length) {
                report.ambiguous.push({ file: docsRel, link: ref.link, foreign: foreign.slice(0, 3) });
            } else {
                report.unresolved.push({ file: docsRel, link: ref.link });
            }
        }

        if (!options.dryRun && text !== original) {
            fs.writeFileSync(file, text);
        }
    }

    return report;
}

function summarize(report, options) {
    const line = (n, what) => console.log(`  ${String(n).padStart(6)}  ${what}`);
    console.log('\nBildverweise in den Adapter-Dokumenten');
    line(report.checked, 'geprueft');
    line(report.ok, 'in Ordnung');
    line(report.relinked.length, options.fix && !options.dryRun ? 'umgeschrieben (lokal vorhanden)' : 'umschreibbar (lokal vorhanden)');
    if (options.download) {
        line(report.downloaded.length, options.dryRun ? 'nachladbar aus dem Repository' : 'aus dem Repository geholt');
    }
    line(report.ambiguous.length, 'nur in einem fremden Adapter gefunden - nicht angefasst');
    line(report.unresolved.length, 'nicht aufloesbar');

    const sample = (list, title, format) => {
        if (!list.length) {
            return;
        }
        console.log(`\n${title} (${list.length}, erste ${Math.min(10, list.length)}):`);
        list.slice(0, 10).forEach(item => console.log(`  ${format(item)}`));
    };
    sample(report.relinked, 'Umgeschrieben', i => `${i.file}\n      ${i.from}  ->  ${i.to}`);
    sample(report.downloaded, 'Geholt', i => `${i.file}\n      ${i.from}  ->  ${i.to}\n      ${i.url}`);
    sample(report.ambiguous, 'Gleicher Dateiname in einem anderen Adapter', i => `${i.file} | ${i.link}`);
    sample(report.unresolved, 'Bleibt offen', i => `${i.file} | ${i.link}`);
}

function main() {
    const argv = process.argv.slice(2);
    const options = {
        fix: argv.includes('--fix'),
        download: argv.includes('--download'),
        dryRun: argv.includes('--dry-run'),
        strict: argv.includes('--strict'),
        verbose: argv.includes('--verbose'),
        adapter: null,
        json: null,
    };
    const value = flag => {
        const i = argv.indexOf(flag);
        return i !== -1 && argv[i + 1] ? argv[i + 1] : null;
    };
    options.adapter = value('--adapter');
    options.json = value('--json');
    // eine geholte Datei ohne den passenden Verweis waere nutzlos
    if (options.download) {
        options.fix = true;
    }

    const docsOverride = value('--docs');
    if (docsOverride) {
        DOCS_DIR = path.resolve(docsOverride).replace(/\\/g, '/').replace(/\/+$/, '');
    }
    const adaptersOverride = value('--adapters-json');
    if (adaptersOverride) {
        ADAPTERS_JSON = path.resolve(adaptersOverride);
    }

    console.log(`Dokumente: ${DOCS_DIR}`);
    console.log(
        `Modus: ${options.fix ? 'umschreiben' : 'nur Bericht'}${options.download ? ' + nachladen' : ''}${options.dryRun ? ' (Probelauf, nichts wird geschrieben)' : ''}`,
    );

    run(options)
        .then(report => {
            summarize(report, options);
            if (options.json) {
                fs.writeFileSync(options.json, JSON.stringify(report, null, 2));
                console.log(`\nBericht geschrieben: ${options.json}`);
            }
            const open = report.unresolved.length + report.ambiguous.length + (options.fix ? 0 : report.relinked.length);
            if (options.strict && open) {
                process.exitCode = 1;
            }
        })
        .catch(e => {
            console.error(e);
            process.exitCode = 2;
        });
}

if (require.main === module) {
    main();
}

module.exports = {
    run,
    findReferences,
    resolveInsideDocs,
    repoCandidates,
    /** nur fuer Tests: den Dokumentenbaum umbiegen */
    setDocsDir: dir => {
        DOCS_DIR = path.resolve(dir).replace(/\\/g, '/').replace(/\/+$/, '');
    },
};
