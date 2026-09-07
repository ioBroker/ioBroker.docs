import fs from 'node:fs';
import path from 'node:path';

import * as utils from './utils.mts';
import * as consts from './consts.mts';
import type { LanguageCode } from './types.mts';

const IGNORE: string[] = [];

/** Copy all images of one FAQ folder into the common media folder and fix the links */
function replaceImages(body: string, fileFolder: string, mediaFolder: string): string {
    const parts = fileFolder.split('/');
    const lang = parts[parts.length - 3];

    /** Copy one image into the media folder and return its new name */
    const copyImage = (link: string): string => {
        const newFileName = `${path.basename(fileFolder)}_${link.replace(/\\/g, '_').replace(/\//g, '_').replace(/\.\._/g, '')}`;
        if (fs.existsSync(path.join(fileFolder, link))) {
            fs.writeFileSync(path.join(mediaFolder, newFileName), fs.readFileSync(path.join(fileFolder, link)));
        }
        return newFileName;
    };

    // replace all images like "mediaDir/blabla.png" with "LN/adapterref/iobroker.adapterName/mediaDir/blabla.png"
    let images = body.match(/!\[[^\]]*]\([^)]*\)/g);
    if (images) {
        images.forEach(image => {
            const m = image.match(/!\[([^\]]*)]\(([^)]*)\)/);
            if (m && m.length === 3) {
                const alt = m[1];
                let link = m[2];
                if (!link.toLowerCase().match(/^https?:\/\//)) {
                    if (link[0] === '/') {
                        link = link.substring(1);
                    }
                    body = body.replace(image, `![${alt}](${lang}/faq/media/${copyImage(link)})`);
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
                let link = m[1];
                if (!link.toLowerCase().match(/^https?:\/\//)) {
                    if (link[0] === '/') {
                        link = link.substring(1);
                    }
                    const newImage = image.replace(link, `${lang}/faq/media/${copyImage(link)}`);
                    body = body.replace(image, newImage);
                }
            }
        });
    }

    return body;
}

/** Combine all markdown files of one FAQ folder into one document */
function processFolder(folder: string, lang: LanguageCode): void {
    const files = fs
        .readdirSync(folder)
        .filter(name => !name.startsWith('_') && name !== 'README.md' && name.endsWith('.md'))
        .sort();

    if (!fs.existsSync(path.join(folder, 'README.md'))) {
        console.warn(`Folder ${folder} skipped, because no README.md found`);
        return;
    }
    let parts = [fs.readFileSync(path.join(folder, 'README.md')).toString('utf-8')];

    files.forEach(file => parts.push(fs.readFileSync(path.join(folder, file)).toString('utf-8')));

    parts = parts.map((file, i) => {
        // remove headers
        const result = utils.extractHeader(file);
        return `${i ? `<!-- ${path.basename(folder)}/${files[i - 1]} -->\n` : ''}${result.body.trim()}`;
    });

    let text = parts.join('\n\n');
    const media = path.join(consts.FRONT_END_DIR, lang, 'faq', 'media');

    if (!fs.existsSync(media)) {
        utils.createDir(media);
    }

    // replace all media files and copy it in one directory
    text = replaceImages(text, folder, media);

    fs.writeFileSync(`${path.join(consts.FRONT_END_DIR, lang, 'faq', path.basename(folder))}.md`, text);
}

/** Build the FAQ documents of one or of all languages */
export async function processFiles(root: string, lang?: LanguageCode): Promise<void> {
    root = root.replace(/\\/g, '/');
    if (!lang) {
        await Promise.all(
            consts.LANGUAGES.map(lang => processFiles(path.join(root, lang, 'faq').replace(/\\/g, '/'), lang)),
        );
        return;
    }

    fs.readdirSync(root).forEach(name => {
        const folderName = path.join(root, name).replace(/\\/g, '/');
        const stat = fs.statSync(folderName);
        if (stat.isDirectory()) {
            if (!IGNORE.includes(folderName.replace(root, ''))) {
                processFolder(folderName, lang);
            } else {
                fs.writeFileSync(
                    `${path.join(consts.FRONT_END_DIR, lang, 'faq', name)}.md`,
                    fs.readFileSync(folderName),
                );
            }
        }
    });
}

if (process.argv[1] === import.meta.filename) {
    processFiles(consts.SRC_DOC_DIR)
        .then(() => console.log('done'))
        .catch((error: unknown) => console.error(error));
}
