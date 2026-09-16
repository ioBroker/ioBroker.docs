export interface TocItem {
    id: string;
    title: string;
    subtitles?: { id: string; title: string }[];
}

export const removeFrontmatter = (markdown: string): string => {
    return markdown.replace(/^---\s*[\r\n]+[\s\S]*?[\r\n]+---\s*[\r\n]*/m, '');
};

/**
 * Whether a heading opens the changelog or the license appendix - the two chapters shown in their
 * own dialogs instead of in the running text.
 *
 * The rule is the one the pipeline uses (`build-lib/utils.mts`), and it is deliberately narrow in
 * one direction and wide in the other. The chapter has to *be* changelog or license: vis writes
 * `## License requirements` about licence keys in the middle of its text, and that has to stay
 * where it is, as does `### **7.) License**`, which is step seven of a tutorial in the admin
 * documentation. But the decoration around the word is ignored, because the same chapter appears
 * as `## Changelog:` (jeelink, lifx), `### Changelog` (opi) and `## Changelog <a id="change" />`
 * (air-q) - four adapters whose changelog otherwise stood in the middle of the page while their
 * changelog dialog stayed empty.
 *
 * @param line one line of the document
 */
export const appendixHeading = (line: string): 'changelog' | 'license' | undefined => {
    const match = /^#{1,6}\s+(.*?)\s*$/.exec(line);
    if (!match) {
        return undefined;
    }
    const text = match[1]
        .replace(/<[^>]*>/g, '')
        .replace(/[*_`]/g, '')
        .replace(/[:：]\s*$/, '')
        .replace(/#+\s*$/, '')
        .trim()
        .toLowerCase();

    if (text === 'changelog') {
        return 'changelog';
    }
    if (text === 'license' || text === 'licence') {
        return 'license';
    }
    return undefined;
};

/**
 * The same question for every line of a document, but with HTML comments taken into account.
 *
 * The miele readme keeps its whole licence chapter inside `<!-- … -->`, so none of it is shown on
 * GitHub. Reading `### License` there as the licence appendix would put a commented-out block,
 * closing marker and all, into the licence dialog.
 *
 * @param lines the document, split into lines
 */
export const appendixHeadings = (lines: string[]): (ReturnType<typeof appendixHeading> | undefined)[] => {
    let inComment = false;
    return lines.map(line => {
        if (inComment) {
            if (line.includes('-->')) {
                inComment = false;
            }
            return undefined;
        }
        if (line.includes('<!--') && !line.includes('-->')) {
            inComment = true;
            return undefined;
        }
        return appendixHeading(line);
    });
};

/**
 * Drop everything that is commented out.
 *
 * A comment is invisible on GitHub, so authors park things in one - and the ioBroker release
 * template does exactly that, keeping a `### **WORK IN PROGRESS**` inside `<!-- … -->` right above
 * the real one so the next release only has to be uncommented. Parsers that go by line starts
 * cannot tell the two apart and listed the placeholder as a second, empty release.
 *
 * An opening marker that is never closed swallows the rest of the text, which is what a browser
 * does with it too.
 *
 * @param text the document or a part of it
 */
export const stripHtmlComments = (text: string): string => text.replace(/<!--[\s\S]*?(?:-->|$)/g, '');

/**
 * The id of a heading, built the way GitHub builds it.
 *
 * This has to match GitHub exactly, because that is what the links in the documents were written
 * against: a readme author writes `[Back to top](#documentation-for-iobrokerbackitup)` after
 * seeing the anchor GitHub produced. GitHub *removes* punctuation, it does not turn it into a
 * hyphen - `ioBroker.backitup` becomes `iobrokerbackitup`, not `iobroker-backitup`. Only spaces
 * become hyphens; `-` and `_` survive as they are.
 *
 * @param text the heading as the reader sees it
 */
export const makeSlug = (text: string): string => {
    const base = text
        .toLowerCase()
        .trim()
        .replace(/[^\p{L}\p{N}\p{Zs}_-]/gu, '')
        // every single space becomes a hyphen, runs are not collapsed - dropping the "&" out of
        // "Backup & Restore" leaves two spaces, and GitHub's anchor is "backup--restore"
        .replace(/\p{Zs}/gu, '-');
    return base || 'section';
};

/**
 * Hands out the ids of one document, numbering repeated headings the way GitHub does: the second
 * "Installation" becomes `installation-1`, the third `installation-2`.
 */
export const createSlugger = () => {
    const usedIds = new Map<string, number>();
    return (text: string): string => {
        const base = makeSlug(text);
        const count = usedIds.get(base) ?? 0;
        usedIds.set(base, count + 1);
        return count === 0 ? base : `${base}-${count}`;
    };
};

const stripMarkdown = (text: string): string => {
    return (
        text
            .replace(/!\[[^\]]*\]\([^)]+\)/g, '')
            .replace(/\[([^\]]*)\]\([^)]+\)/g, '$1')
            .replace(/`([^`]+)`/g, '$1')
            .replace(/\*+/g, '')
            // `_` and `~` only where they decorate. `_Title_` is emphasis and the marks belong to the
            // markup, but the one in "Objects remote_trophies" is part of the word: CommonMark does not
            // read a single underscore inside a word as emphasis, so the heading on the page keeps it
            // and its id is `objects-remote_trophies`. Removing it here built the entry of the table of
            // contents as `objects-remotetrophies`, which pointed at no heading at all.
            .replace(/(^|\s)[_~]+|[_~]+(?=\s|$)/g, '$1')
            .replace(/<[^>]*>/g, '')
            .trim()
    );
};

export const buildTocItems = (markdown: string): TocItem[] => {
    const cleaned = removeFrontmatter(markdown);
    const lines = cleaned.split(/\r?\n/);
    const slugger = createSlugger();
    const items: TocItem[] = [];
    let current: TocItem | null = null;
    let inCodeFence = false;

    for (const line of lines) {
        const trimmed = line.trim();
        if (trimmed.startsWith('```')) {
            inCodeFence = !inCodeFence;
            continue;
        }
        if (inCodeFence) {
            continue;
        }

        const h2 = trimmed.match(/^##\s+(.+)/);
        if (h2) {
            const title = stripMarkdown(h2[1]);
            const id = slugger(title);
            current = { id, title };
            items.push(current);
            continue;
        }
        const h3 = trimmed.match(/^###\s+(.+)/);
        if (h3 && current) {
            const title = stripMarkdown(h3[1]);
            const id = slugger(title);
            current.subtitles ??= [];
            current.subtitles.push({ id, title });
        }
    }

    return items;
};
