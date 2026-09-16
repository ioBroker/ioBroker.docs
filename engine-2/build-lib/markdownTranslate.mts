import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkStringify from 'remark-stringify';
import remarkGfm from 'remark-gfm';
import remarkFrontmatter from 'remark-frontmatter';
import { SKIP, visit } from 'unist-util-visit';
import type { Processor } from 'unified';
import type { Root } from 'mdast';
import type { Node } from 'unist';
import { parseInline, renderInline, type Slot } from './markdownInline.mts';

/**
 * Translating a markdown document without taking it apart.
 *
 * The old way cut the text into lines, replaced every image, link and piece of inline code with a
 * placeholder like `§§IIIII_0§§` and sent one paragraph per request. Two things were wrong with
 * that. The placeholders do not survive a translation engine reliably - the code even carried a
 * comment about them coming back in cyrillic - and a paragraph on its own gives the engine no
 * context, so the same term came back translated three different ways in one document.
 *
 * Here the document is parsed once and never leaves its syntax tree. Only the *text* is collected
 * and sent; images, links, code and raw HTML are nodes of their own and are simply not part of the
 * payload, so there is nothing for the engine to break. What comes back is written into the same
 * nodes and the tree is serialised again.
 */

/**
 * One block of the document on its way to the engine and back.
 *
 * A block - a paragraph, a heading, a table cell - travels whole, so the engine reads a sentence
 * and not the pieces between its bold words. `value` is that sentence as HTML.
 */
interface TextRun {
    id: number;
    value: string;
    apply: (translated: string) => void;
}

/**
 * The nodes whose children are words rather than more blocks. Everything else - a list, a
 * blockquote, a table - only holds these.
 */
const BLOCKS = new Set(['paragraph', 'heading', 'tableCell']);

/** Between these two comments a document is left alone, whatever stands in there */
const NO_TRANSLATE_START = /^<!--\s*notranslate\s*-->$/i;
const NO_TRANSLATE_END = /^<!--\s*\/\s*notranslate\s*-->$/i;

/**
 * How much text goes into one request.
 *
 * Google takes far more than this in one go, but a smaller payload keeps a single failure cheap
 * and makes the answer easier to check: every chunk is verified on its own.
 */
const CHUNK_LIMIT = 6000;

/**
 * Reading and writing in one processor, so the two can never drift apart: whatever dialect is
 * parsed here is the dialect that is written back.
 *
 * Every stringify option is named although most of them are today's defaults. The target files are
 * regenerated on every run, so a changed default in a future release would rewrite two and a half
 * thousand documents in a single commit.
 */
function processor(): Processor<Root, undefined, undefined, Root, string> {
    return unified().use(remarkParse).use(remarkGfm).use(remarkFrontmatter, ['yaml', 'toml']).use(remarkStringify, {
        bullet: '-',
        bulletOrdered: '.',
        // '_' and not '*': with emphasis and strong both on '*', a bold run next to an italic
        // one produces a '***' that reads back as something else. Fourteen documents changed
        // their meaning that way.
        emphasis: '_',
        strong: '*',
        fence: '`',
        fences: true,
        rule: '-',
        listItemIndent: 'one',
        resourceLink: false,
        tightDefinitions: true,
        incrementListMarker: true,
    });
}

/** Whether a run carries anything a translator could work with */
function isWorthTranslating(value: string): boolean {
    // a run of digits, punctuation or whitespace costs quota and comes back unchanged
    return /\p{L}/u.test(value);
}

function escapeHtml(value: string): string {
    return value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function unescapeHtml(value: string): string {
    return value
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&quot;/g, '"')
        .replace(/&#39;|&apos;/g, "'")
        .replace(/&nbsp;/g, ' ')
        .replace(/&amp;/g, '&');
}

/**
 * Every piece of the tree that should be translated, in the order it is read in.
 *
 * `code`, `inlineCode` and `html` keep their content in a `value` of their own and have no text
 * children, so walking the text nodes never reaches them - that is what makes code and raw HTML
 * safe here without a single guard. Of the attributes only the ones a reader sees are taken: the
 * alt text of an image and the title of a link, never their address.
 *
 * @param tree the parsed document
 */
export function collectRuns(tree: Root): TextRun[] {
    const runs: TextRun[] = [];
    let skipping = false;

    const add = (value: string, apply: (translated: string) => void): void => {
        if (skipping || !value.trim() || !isWorthTranslating(value)) {
            return;
        }
        /*
         * The whitespace at the ends of a block belongs to the document, not to the sentence: the
         * engine hands the words back without it. Only the core travels, the rest is put back.
         */
        const leading = /^\s*/.exec(value)![0];
        const trailing = /\s*$/.exec(value)![0];
        const core = value.slice(leading.length, value.length - trailing.length);
        runs.push({ id: runs.length, value: core, apply: text => apply(leading + text + trailing) });
    };

    visit(tree, (node: Node & { value?: string; children?: Node[] }) => {
        if (node.type === 'html' && typeof node.value === 'string') {
            const html = node.value.trim();
            if (NO_TRANSLATE_START.test(html)) {
                skipping = true;
            } else if (NO_TRANSLATE_END.test(html)) {
                skipping = false;
            }
            return;
        }

        // everything whose children are words: paragraphs, headings, table cells
        if (!BLOCKS.has(node.type) || !node.children) {
            return;
        }

        const slots: Slot[] = [];
        const html = renderInline(node.children, slots);
        add(html, translated => (node.children = parseInline(translated, slots)));

        /*
         * What a reader sees but the sentence does not carry: the alt text of an image and the
         * title of a link. They sit in the slots, which stay out of the block's payload, so they
         * are sent on their own - short strings, and each is a sentence in itself anyway.
         *
         * Mutating them afterwards works because `parseInline` puts these very objects back into
         * the tree; it does not copy them.
         */
        for (const slot of slots) {
            const held = slot as Node & { alt?: string | null; title?: string | null };
            if (typeof held.alt === 'string') {
                add(escapeHtml(held.alt), translated => (held.alt = unescapeHtml(translated)));
            }
            if (typeof held.title === 'string') {
                add(escapeHtml(held.title), translated => (held.title = unescapeHtml(translated)));
            }
        }

        // its children have been dealt with as one - do not walk into them again
        return SKIP;
    });

    return runs;
}

/**
 * The runs of one chunk as the one HTML document that is sent.
 *
 * The value of a run is already HTML: `renderInline` escaped the words and left the tags that
 * carry the formatting. Escaping it again here would send `&lt;b&gt;` and the engine would
 * translate the tag name.
 */
export function buildPayload(runs: TextRun[]): string {
    return runs.map(run => `<p id="${run.id}">${run.value}</p>`).join('\n');
}

/**
 * Reads the answer back apart.
 *
 * The ids are what makes this safe: an engine that drops or merges a paragraph is noticed here
 * instead of quietly shifting every following translation by one.
 *
 * @param html what the engine answered
 */
export function parsePayload(html: string): Map<number, string> {
    const result = new Map<number, string>();
    const pattern = /<p\b[^>]*\bid\s*=\s*["']?(\d+)["']?[^>]*>([\s\S]*?)<\/p>/gi;
    let match: RegExpExecArray | null;

    while ((match = pattern.exec(html)) !== null) {
        // the inner HTML is handed on as it is - parseInline reads the tags and unescapes the words
        result.set(parseInt(match[1], 10), match[2].trim());
    }

    return result;
}

/** Groups the runs so that no request grows past {@link CHUNK_LIMIT} */
export function chunkRuns(runs: TextRun[], limit = CHUNK_LIMIT): TextRun[][] {
    const chunks: TextRun[][] = [];
    let current: TextRun[] = [];
    let size = 0;

    for (const run of runs) {
        // a single run longer than the limit still has to go somewhere - on its own
        if (current.length && size + run.value.length > limit) {
            chunks.push(current);
            current = [];
            size = 0;
        }
        current.push(run);
        size += run.value.length;
    }
    if (current.length) {
        chunks.push(current);
    }

    return chunks;
}

/**
 * The shape of a document: everything except the words.
 *
 * Used to check the result against the original. Serialising a tree and parsing it again should
 * give the same tree, but it does not always: a readme that mixes raw HTML into a paragraph can
 * come back with the paragraph split and a following line of dashes turned into a heading. That
 * changes the document, not just its spelling, and it is not something to discover in production.
 *
 * @param tree a parsed document
 */
function shapeOf(tree: Root): string[] {
    const shape: string[] = [];

    visit(tree, (node: Node & { url?: string; value?: string; depth?: number; lang?: string | null }) => {
        switch (node.type) {
            case 'text':
            case 'yaml':
            case 'toml':
                // the words are what changes - they are not part of the shape
                break;
            case 'link':
            case 'image':
                shape.push(`${node.type}:${node.url ?? ''}`);
                break;
            case 'code':
                shape.push(`code:${node.lang ?? ''}:${node.value ?? ''}`);
                break;
            case 'inlineCode':
            case 'html':
                shape.push(`${node.type}:${node.value ?? ''}`);
                break;
            case 'heading':
                shape.push(`heading:${node.depth ?? ''}`);
                break;
            default:
                shape.push(node.type);
        }
    });

    return shape;
}

/**
 * Cuts every row of a table down to the width of its header.
 *
 * A readme now and then carries a row with one cell more than its header:
 *
 *     | Setting | Description |
 *     |---------|-------------|
 *     | Border radius (px) | Rounded corner radius for cards | `4` |
 *
 * GFM throws the extra cell away when it renders, so nobody has ever seen that `4` on the site.
 * The parser keeps it, and writing the tree back then widens the whole table by an empty column -
 * a table that suddenly has three columns where it had two. Cutting the row to the header's width
 * changes nothing about what a reader sees and lets the document survive being written back.
 *
 * @param tree the parsed document
 */
function trimRaggedTables(tree: Root): void {
    visit(tree, 'table', (table: Node & { children?: (Node & { children?: Node[] })[] }) => {
        const width = table.children?.[0]?.children?.length;
        if (!width) {
            return;
        }
        for (const row of table.children!) {
            if (!row.children) {
                continue;
            }
            // too many: GFM drops what is beyond the header, so nobody misses it
            if (row.children.length > width) {
                row.children.length = width;
            }
            // too few: GFM fills the row up with empty cells, and so does writing it back
            while (row.children.length < width) {
                row.children.push({ type: 'tableCell', children: [] } as unknown as Node);
            }
        }
    });
}

/** What the caller has to provide: something that translates one HTML document */
export type HtmlTranslator = (html: string) => Promise<string>;

/**
 * Translates a markdown document.
 *
 * @param markdown the document, frontmatter included
 * @param translateHtml sends one HTML payload to the translation engine
 */
export async function translateMarkdown(markdown: string, translateHtml: HtmlTranslator): Promise<string> {
    const md = processor();
    const tree = md.parse(markdown);
    trimRaggedTables(tree);
    const runs = collectRuns(tree);

    if (!runs.length) {
        // nothing but code, images and punctuation - the document is already what it will be
        return markdown;
    }

    for (const chunk of chunkRuns(runs)) {
        const answer = await translateHtml(buildPayload(chunk));
        const translated = parsePayload(answer);

        const missing = chunk.filter(run => !translated.has(run.id));
        if (missing.length) {
            throw new Error(
                `The translation lost ${missing.length} of ${chunk.length} paragraphs (ids ${missing
                    .map(run => run.id)
                    .join(', ')}) - the document is left untranslated rather than half translated`,
            );
        }

        for (const run of chunk) {
            run.apply(translated.get(run.id)!);
        }
    }

    const result = md.stringify(tree);

    /*
     * The last check: read the result back and compare it with what went in. Everything that is
     * not a word has to be in the same place - the same links, the same code, the same headings.
     * A document that does not survive this is handed back untouched, so the caller can fall back
     * to the older `translateMD` instead of writing something broken.
     */
    const original = md.parse(markdown);
    trimRaggedTables(original);
    const before = shapeOf(original);
    const after = shapeOf(md.parse(result));
    if (before.join('\u0000') !== after.join('\u0000')) {
        const at = before.findIndex((entry, i) => entry !== after[i]);
        throw new Error(
            `The document did not survive being written back: at position ${at} it read ` +
                `${JSON.stringify(before[at])} and now reads ${JSON.stringify(after[at])}`,
        );
    }

    return result;
}
