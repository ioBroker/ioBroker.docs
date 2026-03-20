export interface TocItem {
    id: string;
    title: string;
    subtitles?: { id: string; title: string }[];
}

export const removeFrontmatter = (markdown: string): string => {
    return markdown.replace(/^---\s*[\r\n]+[\s\S]*?[\r\n]+---\s*[\r\n]*/m, '');
};

export const makeSlug = (text: string): string => {
    const base = text
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');
    return base || 'section';
};

export const createSlugger = () => {
    const usedIds = new Map<string, number>();
    return (text: string): string => {
        const base = makeSlug(text);
        const count = usedIds.get(base) ?? 0;
        usedIds.set(base, count + 1);
        return count === 0 ? base : `${base}-${count + 1}`;
    };
};

const stripMarkdown = (text: string): string => {
    return text
        .replace(/!\[[^\]]*\]\([^)]+\)/g, '')
        .replace(/\[([^\]]*)\]\([^)]+\)/g, '$1')
        .replace(/`([^`]+)`/g, '$1')
        .replace(/[*_~]+/g, '')
        .replace(/<[^>]*>/g, '')
        .trim();
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
        if (inCodeFence) continue;

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
