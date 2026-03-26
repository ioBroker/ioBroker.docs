export const normalizeKey = (key: string): string => key.trim().toLowerCase();

export const cleanFrontmatterValue = (key: string, value: string): string => {
    let result = value.trim();
    if (key.toLowerCase() === 'logo') {
        const firstPart = result.split(/<br\s*\/?>/i)[0].trim();
        const match = firstPart.match(/\b[^\s<>"']+?\.(?:png|svg|jpg|jpeg|gif|webp)\b/i);
        if (match) {
            result = match[0];
        }
        result = result.replace(/[)\]]+$/, '').trim();
    }
    return result;
};

export const parseFrontmatter = (markdown: string | undefined): Record<string, string> => {
    if (!markdown) {
        return {};
    }
    const cleaned = markdown.replace(/^\uFEFF/, '').trimStart();
    const match = cleaned.match(/^---\s*[\r\n]+([\s\S]*?)\r?\n---\s*/);
    if (!match) {
        return {};
    }
    const block = match[1]?.trim() ?? '';
    const data: Record<string, string> = {};
    for (const rawLine of block.split('\n')) {
        const line = rawLine.trim();
        if (!line) continue;
        const colonIndex = line.indexOf(':');
        if (colonIndex === -1) continue;
        const key = line.slice(0, colonIndex).trim();
        const rawValue = line.slice(colonIndex + 1).trim();
        const value = cleanFrontmatterValue(key, rawValue);
        if (key) {
            data[key] = value;
            data[normalizeKey(key)] = value;
        }
    }
    return data;
};

export const extractSection = (markdown: string | undefined, heading: string, removeFrontmatter: (text: string) => string): string => {
    if (!markdown) return '';
    const cleaned = removeFrontmatter(markdown);
    const headingRegex = new RegExp(`^##\\s+${heading}\\s*$`, 'im');
    const match = headingRegex.exec(cleaned);
    if (!match) return '';
    const start = match.index + match[0].length;
    const rest = cleaned.slice(start);
    const nextHeading = rest.search(/^##\s+/m);
    if (nextHeading === -1) {
        return rest.trim();
    }
    return rest.slice(0, nextHeading).trim();
};

export type ChangelogItem = {
    version: string;
    date?: string;
    changes: string[];
};

export const parseChangelog = (markdown: string | undefined, removeFrontmatter: (text: string) => string): ChangelogItem[] => {
    const section = extractSection(markdown, 'Changelog', removeFrontmatter);
    if (!section) return [];
    const lines = section.split('\n');
    const items: ChangelogItem[] = [];
    let current: ChangelogItem | null = null;

    for (const rawLine of lines) {
        const line = rawLine.trim();
        if (!line) continue;
        if (line.startsWith('###')) {
            const title = line.replace(/^###\s*/, '').replace(/\*\*/g, '').trim();
            const match = title.match(/^(.*)\(([^)]+)\)\s*$/);
            if (current) items.push(current);
            current = {
                version: (match?.[1] || title).trim(),
                date: match?.[2]?.trim(),
                changes: [],
            };
            continue;
        }
        if (line.startsWith('- ') || line.startsWith('* ')) {
            if (!current) {
                current = { version: 'Changelog', changes: [] };
            }
            current.changes.push(line.slice(2).trim());
        }
    }
    if (current) items.push(current);
    return items;
};

export const parseLicenseParagraphs = (markdown: string | undefined, removeFrontmatter: (text: string) => string): string[] => {
    const section = extractSection(markdown, 'License', removeFrontmatter);
    if (!section) return [];
    return section
        .split(/\n\s*\n+/)
        .map(p => p.trim())
        .filter(Boolean);
};

export const getLocalizedText = (value: Record<string, string> | undefined, language: string): string => {
    if (!value) {
        return '';
    }
    return value[language] || value.en || value.de || value.ru || Object.values(value)[0] || '';
};

export const formatDate = (value: string | undefined): string => {
    if (!value) return '';
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return value;
    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, '0');
    const dd = String(date.getDate()).padStart(2, '0');
    return `${yyyy}.${mm}.${dd}`;
};

export const formatNumber = (value: number | undefined): string => {
    if (value === undefined || value === null) return '';
    return new Intl.NumberFormat('de-DE').format(value);
};

export const stripEmails = (value: string): string => {
    return value.replace(/\s*<[^>]*>/g, '').replace(/\s{2,}/g, ' ').trim();
};

export const resolveAssetUrl = (path: string | undefined, baseOrigin: string, language: string): string => {
    if (!path) return '';
    if (/^https?:\/\//i.test(path)) return path;
    if (path.startsWith('/')) return `${baseOrigin}${path}`;
    if (/^[a-z]{2}(-[a-z]{2})?\//i.test(path)) return `${baseOrigin}/${path}`;
    return `${baseOrigin}/${language}/${path}`;
};

export const buildEditLink = (editLink: string | undefined, readme: string | undefined, repo: string | undefined): string => {
    const clean = (value?: string) => (value ?? '').trim();
    const directEdit = clean(editLink);
    if (directEdit) return directEdit;
    const readmeUrl = clean(readme);
    if (readmeUrl) {
        if (/github\.com/i.test(readmeUrl) && readmeUrl.includes('/blob/')) {
            return readmeUrl.replace('/blob/', '/edit/');
        }
        return readmeUrl;
    }
    const repoUrl = clean(repo);
    if (repoUrl) {
        if (/github\.com/i.test(repoUrl)) {
            return `${repoUrl.replace(/\/$/, '')}/edit/main/README.md`;
        }
        return repoUrl;
    }
    return '';
};

export const getBadge = (
    frontmatter: Record<string, string>,
    keys: string[],
    patterns: RegExp[] = [],
): string => {
    for (const key of keys) {
        const value = frontmatter[key] || frontmatter[normalizeKey(key)];
        if (value) return value;
    }
    if (patterns.length > 0) {
        for (const [rawKey, value] of Object.entries(frontmatter)) {
            const key = normalizeKey(rawKey);
            if (!key.startsWith('badge-')) continue;
            if (patterns.some((pattern) => pattern.test(key))) {
                return value;
            }
        }
    }
    return '';
};
