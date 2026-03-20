import { Box } from '@mui/material';
import type React from 'react';
import { Children, isValidElement } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { createSlugger, makeSlug, removeFrontmatter } from '../../utils/markdown';

interface MarkdownViewProps {
    markdown?: string;
    baseUrl: string;
    origin: string;
    headingIds?: string[];
    headingIdMap?: Record<string, string[]>;
    classNames: {
        head: string;
        heading: string;
        paragraph: string;
        list: string;
        listItem: string;
        image: string;
        linkIcon: string;
    };
    linkImage: string;
}

const normalizeText = (node: React.ReactNode): string => {
    return Children.toArray(node)
        .map((child) => {
            if (typeof child === 'string' || typeof child === 'number') {
                return String(child);
            }
            if (isValidElement(child)) {
                return normalizeText(child.props.children);
            }
            return '';
        })
        .join('');
};

const normalizeTables = (markdown: string): string => {
    const rawLines = markdown.split(/\r?\n/);
    const lines: string[] = [];

    rawLines.forEach((line) => {
        const headerSepMatch = line.match(/^(.*?)(\s{2,}-{3,}(?:\s{2,}-{3,})+)\s*$/);
        if (headerSepMatch && headerSepMatch[1].trim() && headerSepMatch[2].trim()) {
            lines.push(headerSepMatch[1].trim());
            lines.push(headerSepMatch[2].trim());
            return;
        }
        const sepInlineMatch = line.match(/^(\s*-{3,}(?:\s{2,}-{3,})+)\s+(.*)$/);
        if (sepInlineMatch) {
            lines.push(sepInlineMatch[1].trim());
            lines.push(sepInlineMatch[2].trim());
            return;
        }
        lines.push(line);
    });

    const out: string[] = [];
    let inCodeFence = false;

    const splitCols = (line: string): string[] => {
        return line.trim().split(/\s{2,}/).map((c) => c.trim()).filter((c) => c.length > 0);
    };
    const isSeparatorLine = (line: string, colCount: number): boolean => {
        const parts = splitCols(line);
        if (parts.length < colCount) return false;
        return parts.every((p) => /^-+$/.test(p));
    };

    let activePipeCols = 0;
    for (let i = 0; i < lines.length; i += 1) {
        const line = lines[i];
        const trimmed = line.trim();
        if (trimmed.startsWith('```')) {
            inCodeFence = !inCodeFence;
            out.push(line);
            continue;
        }
        if (inCodeFence) {
            out.push(line);
            continue;
        }

        if (trimmed.includes('|')) {
            const pipeParts = trimmed.replace(/^\\|/, '').replace(/\\|$/, '').split('|').map((c) => c.trim()).filter((c) => c.length > 0);
            // detect header separator to activate table mode
            if (pipeParts.length > 0 && pipeParts.every((p) => /^-+$/.test(p))) {
                activePipeCols = pipeParts.length;
                out.push(line);
                continue;
            }
            if (activePipeCols > 0 && pipeParts.length > activePipeCols && pipeParts.length % activePipeCols === 0) {
                for (let idx = 0; idx < pipeParts.length; idx += activePipeCols) {
                    const row = pipeParts.slice(idx, idx + activePipeCols);
                    out.push(`| ${row.join(' | ')} |`);
                }
                continue;
            }
            if (!trimmed) {
                activePipeCols = 0;
            }
            out.push(line);
            continue;
        } else if (!trimmed) {
            activePipeCols = 0;
        }

        const headerCols = splitCols(line);
        const next = lines[i + 1];
        if (headerCols.length >= 2 && next && isSeparatorLine(next, headerCols.length)) {
            const rows: string[][] = [];
            i += 1; // skip separator
            while (i + 1 < lines.length) {
                const rowLine = lines[i + 1];
                const rowTrimmed = rowLine.trim();
                if (!rowTrimmed) break;
                if (rowTrimmed.startsWith('#')) break;
                if (rowTrimmed.startsWith('- ') || rowTrimmed.startsWith('* ')) break;
                const cols = splitCols(rowLine);
                if (cols.length === 0) break;
                if (cols.length >= headerCols.length * 2) {
                    let idx = 0;
                    while (idx + headerCols.length <= cols.length) {
                        const chunk = cols.slice(idx, idx + headerCols.length);
                        rows.push(chunk);
                        idx += headerCols.length;
                    }
                    if (idx < cols.length && rows.length > 0) {
                        rows[rows.length - 1][headerCols.length - 1] += ` ${cols.slice(idx).join(' ')}`;
                    }
                } else {
                    while (cols.length < headerCols.length) cols.push('');
                    if (cols.length > headerCols.length) {
                        const head = cols.slice(0, headerCols.length - 1);
                        const tail = cols.slice(headerCols.length - 1).join(' ');
                        rows.push([...head, tail]);
                    } else {
                        rows.push(cols);
                    }
                }
                i += 1;
            }

            out.push(`| ${headerCols.join(' | ')} |`);
            out.push(`| ${headerCols.map(() => '---').join(' | ')} |`);
            rows.forEach((r) => {
                out.push(`| ${r.join(' | ')} |`);
            });
            continue;
        }

        out.push(line);
    }

    return out.join('\n');
};

const normalizeImageTags = (markdown: string): string => {
    let result = markdown;
    result = removeFrontmatter(result);
    result = result.replace(/^\s*<!--.*?-->\s*$/gm, '');
    result = result.replace(/<img\b[^>]*>/gi, (tag) => {
        const srcMatch = tag.match(/src=["']([^"']+)["']/i);
        if (!srcMatch) return '';
        const altMatch = tag.match(/alt=["']([^"']*)["']/i);
        const src = srcMatch[1];
        const alt = altMatch ? altMatch[1] : '';
        return `![${alt}](${src})`;
    });
    result = result.replace(/\bimg\s+[^\\r\\n]*?src=["']([^"']+)["'][^\\r\\n]*/gi, (_match, src) => {
        return `![](${src})`;
    });
    result = result.replace(/!\(\s*([^)\\s]+)\s*\)/g, (_match, src) => `![](${src})`);
    result = normalizeTables(result);
    return result;
};

const resolveMarkdownUrl = (src: string | undefined, baseUrl: string, origin: string): string => {
    if (!src) return '';
    if (/^https?:\/\//i.test(src)) return src;
    if (/^\/\//i.test(src)) return `https:${src}`;
    if (/^(data:|mailto:|tel:)/i.test(src)) return src;
    if (src.startsWith('/')) return `${origin}${src}`;
    if (/^[a-z]{2}(-[a-z]{2})?\//i.test(src)) return `${origin}/${src}`;
    try {
        return new URL(src, baseUrl).toString();
    } catch {
        return src;
    }
};

export const MarkdownView = ({ markdown, baseUrl, origin, headingIds, headingIdMap, classNames, linkImage }: MarkdownViewProps): React.ReactNode => {
    const markdownForRender = markdown ? normalizeImageTags(markdown) : '';
    const getUniqueId = createSlugger();
    let headingIndex = 0;
    const slugIndex = new Map<string, number>();
    const nextHeadingId = (text: string): string => {
        if (headingIdMap) {
            const slug = makeSlug(text);
            const list = headingIdMap[slug];
            if (list && list.length > 0) {
                const index = slugIndex.get(slug) ?? 0;
                slugIndex.set(slug, index + 1);
                return list[Math.min(index, list.length - 1)]!;
            }
        }
        if (headingIds && headingIndex < headingIds.length) {
            return headingIds[headingIndex++]!;
        }
        return getUniqueId(text);
    };

    return markdownForRender ? (
        <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
                h1: () => null,
                h2: ({ children }) => {
                    const text = normalizeText(children);
                    const id = nextHeadingId(text);
                    return (
                        <Box id={id} data-md-heading={makeSlug(text)} className={classNames.head}>
                            <div>{children}</div>
                            <img src={linkImage} alt="link" className={classNames.linkIcon} />
                        </Box>
                    );
                },
                h3: ({ children }) => {
                    const text = normalizeText(children);
                    const id = nextHeadingId(text);
                    return (
                        <Box id={id} data-md-heading={makeSlug(text)} className={classNames.heading}>
                            <div>{children}</div>
                            <img src={linkImage} alt="link" className={classNames.linkIcon} />
                        </Box>
                    );
                },
                p: ({ children }) => (
                    <Box className={classNames.paragraph}>{children}</Box>
                ),
                ul: ({ children }) => (
                    <Box component="ul" className={classNames.list}>
                        {children}
                    </Box>
                ),
                ol: ({ children }) => (
                    <Box component="ol" className={classNames.list}>
                        {children}
                    </Box>
                ),
                li: ({ children }) => (
                    <Box component="li" className={classNames.listItem}>
                        {children}
                    </Box>
                ),
                img: ({ src, alt }) => (
                    <Box className={classNames.image}>
                        <img
                            src={resolveMarkdownUrl(src, baseUrl, origin)}
                            alt={alt ?? ''}
                            style={{ width: '100%', maxWidth: '600px' }}
                        />
                    </Box>
                ),
                hr: () => null,
            }}
        >
            {markdownForRender}
        </ReactMarkdown>
    ) : null;
};
