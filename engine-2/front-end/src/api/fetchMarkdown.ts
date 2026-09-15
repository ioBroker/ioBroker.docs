/**
 * Fetch a markdown document and refuse an HTML page in its place.
 *
 * A missing markdown file does not always answer with 404. A server that falls back to
 * the single-page shell - the dev server does exactly that - answers the app's own
 * `index.html` with status 200, and the page then renders that HTML as if it were the
 * document. That is what made every adapter page show the contents of `index.html`
 * instead of the adapter's readme.
 */
export const fetchMarkdown = async (url: string, what: string): Promise<string> => {
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`Failed to fetch ${what}: ${response.status} ${url}`);
    }
    const text = await response.text();
    const looksLikeHtml =
        (response.headers.get('content-type') || '').includes('text/html') ||
        /^\s*(<!doctype html|<html\b|<script\b)/i.test(text);
    if (looksLikeHtml) {
        throw new Error(`Not markdown but an HTML page: ${url}`);
    }
    return text;
};
