/**
 * The picture a link to a blog post shows when the post is shared.
 *
 * The title banner of a post is three to five times as wide as it is high, because that is what the
 * page needs. Facebook, WhatsApp, LinkedIn and the forum want 1.91:1 and cut the rest away in the
 * middle, which takes the title off a banner like that. So this step draws a card of its own: the
 * banner on the dark surface of the site, a light from the right, the mark below it.
 *
 * The cards are drawn once per post into `blog/social/og/` and copied to `front-end/public/blog-og/`.
 * A card is drawn again only when the banner is newer than the card, so a build that changes no
 * banner costs nothing. The path of the card goes into `blog.json` as `social`, and `prerender.ts`
 * and `PageMeta.tsx` read it from there.
 *
 * It draws with the Chrome that puppeteer brings for the snapshots, so there is no image library.
 */
import fs from 'node:fs';
import path from 'node:path';
import puppeteer from 'puppeteer';

import * as consts from './consts.mts';
import type { BlogContent } from './types.mts';

/** what Facebook, LinkedIn, WhatsApp and X read as a wide card */
const WIDTH = 1200;
const HEIGHT = 630;
/** a card of this size is 40 to 180 kB as JPEG and two to ten times that as PNG */
const QUALITY = 90;

/** below `blog/` */
const CARD_DIR = 'social/og/';
/** below `front-end/public/` */
const PUBLIC_DIR = 'blog-og/';

const CANVAS = '#080B1C';

/** the round mark, the same file the header of the site uses */
const LOGO = '../front-end/src/assets/img/logo_net_small.svg';
/** the word mark, the same file the first screen of the site uses */
const WORDMARK = '../front-end/src/assets/img/ioBroker-Title2.svg';

const MIME: Record<string, string> = {
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.gif': 'image/gif',
    '.webp': 'image/webp',
    '.svg': 'image/svg+xml',
};

function dataUrl(file: string, replace?: (text: string) => string): string {
    const type = MIME[path.extname(file).toLowerCase()] || 'application/octet-stream';
    if (replace) {
        const text = replace(fs.readFileSync(file).toString('utf-8'));
        return `data:${type};base64,${Buffer.from(text, 'utf-8').toString('base64')}`;
    }
    return `data:${type};base64,${fs.readFileSync(file).toString('base64')}`;
}

/**
 * The banner of a post, as it lies in the source.
 *
 * `logo` in `blog.json` is the address below the site, `de/blog/images/<file>`, because that is what
 * the page needs. The file itself is in `blog/images/` or `blog/<lang>/images/`.
 */
function bannerFile(logo: string): string | undefined {
    const name = logo.replace(/^[a-z-]+\/blog\/images\//, '');
    if (name === logo) {
        // an address of its own, not one of our files
        return undefined;
    }
    const shared = path.join(consts.SRC_BLOG_DIR, 'images', name);
    if (fs.existsSync(shared)) {
        return shared;
    }
    const lang = logo.split('/')[0];
    const own = path.join(consts.SRC_BLOG_DIR, lang, 'images', name);
    return fs.existsSync(own) ? own : undefined;
}

/**
 * The card.
 *
 * The banner keeps its own shape and is only held inside a box, so that a banner of 2.6:1 and one
 * of 5:1 both leave the mark its place below.
 */
function card(banner: string, logo: string, wordmark: string): string {
    return `<!doctype html>
<html><head><meta charset="utf-8"><style>
    html, body { margin: 0; padding: 0; }
    body {
        width: ${WIDTH}px;
        height: ${HEIGHT}px;
        overflow: hidden;
        background: ${CANVAS};
        box-sizing: border-box;
        padding: 46px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 40px;
    }
    .banner {
        display: block;
        max-width: 1108px;
        max-height: 368px;
        width: auto;
        height: auto;
        border-radius: 10px;
    }
    .mark {
        display: flex;
        align-items: center;
        gap: 22px;
    }
    .mark img.round { height: 66px; }
    .mark img.words { width: 230px; }
</style></head>
<body>
    <img class="banner" src="${banner}">
    <div class="mark"><img class="round" src="${logo}"><img class="words" src="${wordmark}"></div>
</body></html>`;
}

/**
 * Draw the missing cards and write the path of each one into `content`.
 *
 * Returns the number of cards drawn, so that the build can say what it did.
 */
export async function build(content: BlogContent, force?: boolean): Promise<number> {
    const cardDir = path.join(consts.SRC_BLOG_DIR, CARD_DIR);
    fs.mkdirSync(cardDir, { recursive: true });

    const todo: { banner: string; file: string }[] = [];

    Object.keys(content.pages).forEach(name => {
        const entry = content.pages[name];
        const banner = entry.logo ? bannerFile(entry.logo) : undefined;
        if (!banner) {
            // a post without a banner of its own keeps the default picture of the site
            return;
        }
        const file = path.join(cardDir, `${name}.jpg`);
        entry.social = `${PUBLIC_DIR}${name}.jpg`;
        const drawn = fs.existsSync(file) && fs.statSync(file).mtimeMs >= fs.statSync(banner).mtimeMs;
        if (force || !drawn) {
            todo.push({ banner, file });
        }
    });

    if (todo.length) {
        const here = import.meta.dirname;
        // both as the site draws them, no colours of our own
        const logo = dataUrl(path.join(here, LOGO));
        const wordmark = dataUrl(path.join(here, WORDMARK));

        const browser = await puppeteer.launch({
            headless: true,
            args: ['--no-sandbox', '--disable-dev-shm-usage'],
        });
        try {
            const page = await browser.newPage();
            await page.setViewport({ width: WIDTH, height: HEIGHT, deviceScaleFactor: 1 });
            for (const item of todo) {
                await page.setContent(card(dataUrl(item.banner), logo, wordmark), { waitUntil: 'load' });
                await page.screenshot({ path: item.file as `${string}.jpg`, type: 'jpeg', quality: QUALITY });
                console.log(`Blog picture: ${path.basename(item.file)}`);
            }
        } finally {
            await browser.close();
        }
    }

    // the cards are the same in every language, so they are copied once, not once per language
    const target = path.join(consts.FRONT_END_DIR, PUBLIC_DIR);
    fs.mkdirSync(target, { recursive: true });
    fs.readdirSync(cardDir)
        .filter(file => file.toLowerCase().endsWith('.jpg'))
        .forEach(file => fs.copyFileSync(path.join(cardDir, file), path.join(target, file)));

    return todo.length;
}
