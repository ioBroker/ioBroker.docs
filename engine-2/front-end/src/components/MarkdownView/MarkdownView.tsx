import { Box } from '@mui/material';
import type React from 'react';
import { Children, isValidElement, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
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
        table: string;
        tableHead: string;
        tableRow: string;
        tableHeaderCell: string;
        tableCell: string;
        codeBlockContainer: string;
        codeBlockContent: string;
        inlineCode: string;
        blockquote: string;
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
                return normalizeText((child.props as any).children);
            }
            return '';
        })
        .join('');
};

const fixTableFormat = (markdown: string): string => {
    const lines = markdown.split('\n');
    const processedLines: string[] = [];
    let expectedColumns = 0;
    let inTable = false;

    for (let i = 0; i < lines.length; i++) {
        let line = lines[i].trim();

        const isDelimiter = /^\s*\|?\s*:?-+:?\s*(\|\s*:?-+:?\s*)+\|?\s*$/.test(line);

        if (isDelimiter) {
            if (!line.startsWith('|')) line = '|' + line;
            if (!line.endsWith('|')) line = line + '|';

            expectedColumns = line.split('|').length - 2;

            let prevLine = processedLines.pop() || '';
            
            if (prevLine.trim() === '' && processedLines.length > 0) {
                prevLine = processedLines.pop() || '';
            }

            if (!prevLine.startsWith('|')) prevLine = '| ' + prevLine;
            if (!prevLine.endsWith('|')) prevLine = prevLine + ' |';

            processedLines.push(prevLine);
            processedLines.push(line);
            inTable = true;
            continue;
        }

        if (inTable) {
            if (line === '') {
                inTable = false;
                processedLines.push(lines[i]); 
            } else {
                let cells = line.split(/(?<!\\)\|/).map(c => c.trim());

                if (cells[0] === '') cells.shift();
                if (cells[cells.length - 1] === '') cells.pop();

                for (let j = 0; j < cells.length; j += expectedColumns) {
                    const chunk = cells.slice(j, j + expectedColumns);

                    while (chunk.length < expectedColumns) chunk.push('');                    
                    processedLines.push('| ' + chunk.join(' | ') + ' |');
                }
            }
        } else {
            processedLines.push(lines[i]);
        }
    }

    return processedLines.join('\n');
};


const normalizeImageTags = (markdown: string): string => {
    let result = markdown;
    result = removeFrontmatter(result);
    result = result.replace(/^\s*<!--.*?-->\s*$/gm, '');
    result = result.replace(/<image\b[^>]*>/gi, '');
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
    result = result.replace(/^\s*\[Image\s*#\d+\]\s*$/gmi, '');
    result = result.replace(/\[Image\s*#\d+\]/gi, '');
    result = result.replace(/^\s*!>\s+/gm, '> ');
    result = result.replace(/^\s*\?>\s+/gm, '> ');
    result = result.replace(/^\s*\*>\s+/gm, '> ');
    result = result.replace(/^\s*[✓✔]\s+/gm, '> ');

    result = fixTableFormat(result);

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
    const isHashRouter = () => window.location.hash.startsWith('#/');
    const getAnchorFromHash = (): string | null => {
        const hash = window.location.hash;
        if (!hash) return null;
        if (hash.startsWith('#/')) {
            const withoutHash = hash.slice(1);
            const queryIndex = withoutHash.indexOf('?');
            if (queryIndex === -1) return null;
            const query = withoutHash.slice(queryIndex + 1);
            const params = new URLSearchParams(query);
            return params.get('anchor');
        }
        return hash.length > 1 ? decodeURIComponent(hash.slice(1)) : null;
    };
    const buildAnchorHref = (id: string) => {
        if (!isHashRouter()) return `#${id}`;
        const hash = window.location.hash;
        const withoutHash = hash.startsWith('#') ? hash.slice(1) : hash;
        const queryIndex = withoutHash.indexOf('?');
        const path = queryIndex === -1 ? withoutHash : withoutHash.slice(0, queryIndex);
        const query = queryIndex === -1 ? '' : withoutHash.slice(queryIndex + 1);
        const params = new URLSearchParams(query);
        params.set('anchor', id);
        const nextHash = `${path}?${params.toString()}`;
        return `#${nextHash}`;
    };
    const getScrollParent = (element: HTMLElement | null): HTMLElement | Window => {
        let node = element?.parentElement ?? null;
        while (node) {
            const style = window.getComputedStyle(node);
            const canScroll = /(auto|scroll)/.test(style.overflowY || '') && node.scrollHeight > node.clientHeight;
            if (canScroll) return node;
            node = node.parentElement;
        }
        return window;
    };
    const scrollToId = (id: string) => {
        const target = document.getElementById(id);
        if (!target) return;
        const scrollParent = getScrollParent(target);
        if (scrollParent === window) {
            target.scrollIntoView({ block: 'start' });
            return;
        }
        const parent = scrollParent as HTMLElement;
        const parentRect = parent.getBoundingClientRect();
        const targetRect = target.getBoundingClientRect();
        const scrollMarginTop = parseFloat(window.getComputedStyle(target).scrollMarginTop || '0') || 0;
        const top = targetRect.top - parentRect.top + parent.scrollTop - scrollMarginTop;
        parent.scrollTo({ top, behavior: 'auto' });
    };
    const scrollToHeading = (id: string) => (event: React.MouseEvent<HTMLAnchorElement>) => {
        event.preventDefault();
        scrollToId(id);
        if (!isHashRouter()) {
            const url = new URL(window.location.href);
            url.hash = `#${id}`;
            const nextUrl = url.toString();
            if (window.location.hash !== `#${id}`) {
                window.history.replaceState(null, '', nextUrl);
            }
            return;
        }
        const href = buildAnchorHref(id);
        if (window.location.hash !== href) {
            window.history.replaceState(null, '', href);
        }
    };

    useEffect(() => {
        if (!markdownForRender) return;
        const handleHash = () => {
            const id = getAnchorFromHash();
            if (!id) return;
            scrollToId(id);
        };
        requestAnimationFrame(() => requestAnimationFrame(handleHash));
        window.addEventListener('hashchange', handleHash);
        return () => window.removeEventListener('hashchange', handleHash);
    }, [markdownForRender]);


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
            rehypePlugins={[rehypeRaw]}
            components={{
                h1: () => null,
                h2: ({ children }) => {
                    const text = normalizeText(children);
                    const id = nextHeadingId(text);
                    return (
                        <Box id={id} data-md-heading={makeSlug(text)} className={classNames.head}>
                            <div>{children}</div>
                            <a href={buildAnchorHref(id)} aria-label={`Link to ${text}`} style={{ display: 'inline-flex' }} onClick={scrollToHeading(id)}>
                                <img src={linkImage} alt="link" className={classNames.linkIcon} />
                            </a>
                        </Box>
                    );
                },
                h3: ({ children }) => {
                    const text = normalizeText(children);
                    const id = nextHeadingId(text);
                    return (
                        <Box id={id} data-md-heading={makeSlug(text)} className={classNames.heading}>
                            <div>{children}</div>
                            <a href={buildAnchorHref(id)} aria-label={`Link to ${text}`} style={{ display: 'inline-flex' }} onClick={scrollToHeading(id)}>
                                <img src={linkImage} alt="link" className={classNames.linkIcon} />
                            </a>
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
                table: ({ children }) => (
                    <Box component="table" className={classNames.table}>
                        {children}
                    </Box>
                ),
                thead: ({ children }) => (
                    <Box component="thead" className={classNames.tableHead}>
                        {children}
                    </Box>
                ),
                tbody: ({ children }) => (
                    <Box component="tbody">
                        {children}
                    </Box>
                ),
                tr: ({ children }) => (
                    <Box component="tr" className={classNames.tableRow}>
                        {children}
                    </Box>
                ),
                th: ({ children }) => (
                    <Box component="th" className={classNames.tableHeaderCell}>
                        {children}
                    </Box>
                ),
                td: ({ children }) => (
                    <Box component="td" className={classNames.tableCell}>
                        {children}
                    </Box>
                ),
                blockquote: ({ children }) => (
                    <Box component="blockquote" className={classNames.blockquote}>
                        {children}
                    </Box>
                ),
                pre: ({ children }) => (
                    <Box className={classNames.codeBlockContainer}>
                        <Box component="pre" className={classNames.codeBlockContent}>
                            {children}
                        </Box>
                    </Box>
                ),
                code: ({ children, ...props }) => {
                    const inline = !props.className?.includes('language-');
                    return inline ? (
                        <Box component="code" className={classNames.inlineCode}>
                            {children}
                        </Box>
                    ) : (
                        <code>{children}</code>
                    );
                },
                hr: () => null,
            }}
        >
            {markdownForRender}
        </ReactMarkdown>
    ) : null;
};
