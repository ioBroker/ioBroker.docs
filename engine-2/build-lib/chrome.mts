/**
 * The headless Chrome the build draws with.
 *
 * Two steps of the pipeline open a browser: the social cards of the blog (`blogSocial.mts`) and the
 * snapshots for the crawlers (`snapshots.mts`). Both take the Chrome that puppeteer brings along,
 * unless `prerender.chromePath` in config.json names another one. On a server where the downloaded
 * Chrome cannot start - a minimal image has none of the libraries it needs, and the first one it
 * misses is `libnspr4.so` - that setting is what moves the whole build onto the Chrome of the
 * system, and it has to move both steps, not only the snapshots.
 *
 * `PUPPETEER_EXECUTABLE_PATH` works as well and needs no setting at all: puppeteer reads it itself
 * whenever no path is given here.
 */
import fs from 'node:fs';
import path from 'node:path';
import puppeteer, { type Browser } from 'puppeteer';

const ENGINE_DIR = path.join(import.meta.dirname, '..');

/** `prerender.chromePath` from config.json, or undefined for the Chrome puppeteer brings along */
export function chromePath(): string | undefined {
    const file = ['config.json', 'config.dist.json']
        .map(name => path.join(ENGINE_DIR, name))
        .find(name => fs.existsSync(name));
    const config = file ? (JSON.parse(fs.readFileSync(file, 'utf-8')) as { prerender?: { chromePath?: string } }) : {};
    return config.prerender?.chromePath || undefined;
}

/**
 * A headless Chrome, as both steps of the build need it.
 *
 * @param executablePath the Chrome to start - the one from config.json when not given
 */
export function launch(executablePath: string | undefined = chromePath()): Promise<Browser> {
    if (executablePath && !fs.existsSync(executablePath)) {
        throw new Error(`prerender.chromePath in config.json names a Chrome that is not there: ${executablePath}`);
    }
    return puppeteer.launch({
        headless: true,
        executablePath,
        // --no-sandbox because the build runs as root on the server, --disable-dev-shm-usage
        // because a container gives /dev/shm 64 MB and a page of the site needs more than that
        args: ['--no-sandbox', '--disable-dev-shm-usage'],
    });
}
