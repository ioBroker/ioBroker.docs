import type { Node } from 'unist';

/**
 * Turning the inline content of one block into HTML and back.
 *
 * The first version of the translation sent every text node on its own. A sentence with a bold
 * word in it therefore left as three fragments, and the engine translated each of them without
 * ever seeing the sentence:
 *
 *     <p id="0">vis braucht den Adapter</p>
 *     <p id="1">web</p>
 *     <p id="2">, der bei der Installation automatisch mitinstalliert wird.</p>
 *
 * The leading comma of the third fragment did not come back, and a heading standing alone lost
 * every clue about what it meant - "Die Reiter im Kopfbereich" came back as horsemen.
 *
 * So a block now travels as one sentence. What carries words keeps a tag the engine understands
 * and preserves; what carries none - inline code, images, raw HTML - becomes an empty placeholder
 * marked `translate="no"`, with the real node kept aside. The placeholder carries its number, so
 * it lands in the right place even when the translation moves it, which German to Russian does.
 */

/** An inline node that is handed through untouched, kept out of the payload */
export type Slot = Node;

/** The tags that stand for markdown formatting. Their content is words and gets translated */
const WRAPPERS: Record<string, string> = { strong: 'b', emphasis: 'i', delete: 's' };
const WRAPPER_TYPES: Record<string, string> = { b: 'strong', i: 'emphasis', s: 'delete' };

function escapeHtml(value: string): string {
    return value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function unescapeHtml(value: string): string {
    return value
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&quot;/g, '"')
        .replace(/&#0?39;|&apos;/g, "'")
        .replace(/&nbsp;/g, ' ')
        .replace(/&amp;/g, '&');
}

/**
 * The inline children of a block as one HTML fragment.
 *
 * @param children what the block holds
 * @param slots collects the nodes that are not sent - the placeholders point into this
 */
export function renderInline(children: Node[], slots: Slot[]): string {
    let html = '';

    for (const child of children) {
        const node = child as Node & { value?: string; children?: Node[] };

        if (node.type === 'text' && typeof node.value === 'string') {
            html += escapeHtml(node.value);
            continue;
        }

        const wrapper = WRAPPERS[node.type];
        if (wrapper && node.children) {
            html += `<${wrapper}>${renderInline(node.children, slots)}</${wrapper}>`;
            continue;
        }

        if (node.type === 'link' && node.children) {
            // the address stays here, only the words of the link travel
            slots.push(node);
            html += `<a data-n="${slots.length - 1}">${renderInline(node.children, slots)}</a>`;
            continue;
        }

        // inline code, images, raw HTML, line breaks, footnote marks: nothing to translate
        slots.push(node);
        html += `<span translate="no" data-n="${slots.length - 1}"></span>`;
    }

    return html;
}

interface Cursor {
    at: number;
}

function readTag(html: string, cursor: Cursor): { name: string; closing: boolean; slot?: number } | null {
    const match = /^<(\/?)([a-zA-Z]+)((?:\s+[a-zA-Z-]+\s*=\s*"[^"]*")*)\s*(\/?)>/.exec(html.slice(cursor.at));
    if (!match) {
        return null;
    }
    cursor.at += match[0].length;
    const slot = /data-n\s*=\s*"(\d+)"/.exec(match[3] || '');
    return { name: match[2].toLowerCase(), closing: match[1] === '/', slot: slot ? parseInt(slot[1], 10) : undefined };
}

/**
 * The answer read back into inline nodes.
 *
 * Everything the engine may have done to the words is kept; everything it was told not to touch
 * is put back from `slots`, wherever the sentence now needs it.
 *
 * @param html one translated fragment
 * @param slots the nodes that were held back, in the order they were rendered
 * @param cursor where to continue reading - only used while recursing
 * @param until the tag whose closing ends this level
 */
export function parseInline(html: string, slots: Slot[], cursor: Cursor = { at: 0 }, until?: string): Node[] {
    const nodes: Node[] = [];
    let text = '';

    const flush = (): void => {
        if (text) {
            nodes.push({ type: 'text', value: unescapeHtml(text) } as Node);
            text = '';
        }
    };

    while (cursor.at < html.length) {
        const next = html.indexOf('<', cursor.at);
        if (next === -1) {
            text += html.slice(cursor.at);
            cursor.at = html.length;
            break;
        }
        text += html.slice(cursor.at, next);
        cursor.at = next;

        const tag = readTag(html, cursor);
        if (!tag) {
            // a lone "<" that is not a tag - it is part of the text
            text += '<';
            cursor.at++;
            continue;
        }

        if (tag.closing) {
            if (tag.name === until) {
                flush();
                return nodes;
            }
            // a closing tag nobody opened: drop it rather than lose the text around it
            continue;
        }

        flush();

        if (tag.name === 'span' && tag.slot !== undefined) {
            nodes.push(slots[tag.slot]);
            // its closing tag, if the engine kept one
            const save = cursor.at;
            const close = readTag(html, cursor);
            if (!close || !close.closing || close.name !== 'span') {
                cursor.at = save;
            }
            continue;
        }

        if (tag.name === 'a') {
            const children = parseInline(html, slots, cursor, 'a');
            const original = tag.slot !== undefined ? (slots[tag.slot] as Node & { children?: Node[] }) : undefined;
            if (original) {
                nodes.push({ ...original, children } as Node);
            } else {
                nodes.push(...children);
            }
            continue;
        }

        const type = WRAPPER_TYPES[tag.name];
        if (type) {
            nodes.push({ type, children: parseInline(html, slots, cursor, tag.name) } as Node);
            continue;
        }

        // any other tag the engine invented: keep what is inside it, drop the tag
        nodes.push(...parseInline(html, slots, cursor, tag.name));
    }

    flush();
    return nodes;
}
