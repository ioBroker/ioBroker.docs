import { Box } from '@mui/material';
import type React from 'react';
import { useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import { createSlugger, makeSlug } from '../../utils/markdown';
import { normalizeImageTags, normalizeText, resolveMarkdownUrl } from './markdownViewUtils';

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

export const MarkdownView = ({
    markdown,
    baseUrl,
    origin,
    headingIds,
    headingIdMap,
    classNames,
    linkImage,
}: MarkdownViewProps): React.ReactNode => {
    const markdownForRender = markdown ? normalizeImageTags(markdown) : '';
    const isHashRouter = (): boolean => window.location.hash.startsWith('#/');
    const getAnchorFromHash = (): string | null => {
        const hash = window.location.hash;
        if (!hash) {
            return null;
        }
        if (hash.startsWith('#/')) {
            const withoutHash = hash.slice(1);
            const queryIndex = withoutHash.indexOf('?');
            if (queryIndex === -1) {
                return null;
            }
            const query = withoutHash.slice(queryIndex + 1);
            const params = new URLSearchParams(query);
            return params.get('anchor');
        }
        return hash.length > 1 ? decodeURIComponent(hash.slice(1)) : null;
    };
    const buildAnchorHref = (id: string): string => {
        if (!isHashRouter()) {
            return `#${id}`;
        }
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
            if (canScroll) {
                return node;
            }
            node = node.parentElement;
        }
        return window;
    };
    const scrollToId = (id: string): void => {
        const target = document.getElementById(id);
        if (!target) {
            return;
        }
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
        if (!markdownForRender) {
            return;
        }
        const handleHash = (): void => {
            const id = getAnchorFromHash();
            if (!id) {
                return;
            }
            scrollToId(id);
        };
        requestAnimationFrame(() => requestAnimationFrame(handleHash));
        window.addEventListener('hashchange', handleHash);
        return () => window.removeEventListener('hashchange', handleHash);
    }, [markdownForRender]);

    const getUniqueId = createSlugger();
    let headingIndex = 0;
    const slugIndex = new Map<string, number>();
    const nextContentHeadingId = (text: string): string => {
        if (headingIdMap) {
            const slug = makeSlug(text);
            const list = headingIdMap[slug];
            if (list && list.length > 0) {
                const index = slugIndex.get(slug) ?? 0;
                slugIndex.set(slug, index + 1);
                if (index < list.length) {
                    return list[index];
                }
            }
        }
        if (headingIds && headingIndex < headingIds.length) {
            return headingIds[headingIndex++];
        }
        return getUniqueId(text);
    };

    return markdownForRender ? (
        <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeRaw]}
            components={{
                h1: ({ children }) => {
                    const text = normalizeText(children);
                    const id = getUniqueId(text);
                    return (
                        <Box
                            id={id}
                            data-md-heading={makeSlug(text)}
                            className={classNames.head}
                        >
                            <div>{children}</div>
                            <a
                                href={buildAnchorHref(id)}
                                aria-label={`Link to ${text}`}
                                style={{ display: 'inline-flex' }}
                                onClick={scrollToHeading(id)}
                            >
                                <img
                                    src={linkImage}
                                    alt="link"
                                    className={classNames.linkIcon}
                                />
                            </a>
                        </Box>
                    );
                },
                h2: ({ children }) => {
                    const text = normalizeText(children);
                    const id = nextContentHeadingId(text);
                    return (
                        <Box
                            id={id}
                            data-md-heading={makeSlug(text)}
                            className={classNames.head}
                        >
                            <div>{children}</div>
                            <a
                                href={buildAnchorHref(id)}
                                aria-label={`Link to ${text}`}
                                style={{ display: 'inline-flex' }}
                                onClick={scrollToHeading(id)}
                            >
                                <img
                                    src={linkImage}
                                    alt="link"
                                    className={classNames.linkIcon}
                                />
                            </a>
                        </Box>
                    );
                },
                h3: ({ children }) => {
                    const text = normalizeText(children);
                    const id = nextContentHeadingId(text);
                    return (
                        <Box
                            id={id}
                            data-md-heading={makeSlug(text)}
                            className={classNames.heading}
                        >
                            <div>{children}</div>
                            <a
                                href={buildAnchorHref(id)}
                                aria-label={`Link to ${text}`}
                                style={{ display: 'inline-flex' }}
                                onClick={scrollToHeading(id)}
                            >
                                <img
                                    src={linkImage}
                                    alt="link"
                                    className={classNames.linkIcon}
                                />
                            </a>
                        </Box>
                    );
                },
                p: ({ children }) => <Box className={classNames.paragraph}>{children}</Box>,
                ul: ({ children }) => (
                    <Box
                        component="ul"
                        className={classNames.list}
                    >
                        {children}
                    </Box>
                ),
                ol: ({ children }) => (
                    <Box
                        component="ol"
                        className={classNames.list}
                    >
                        {children}
                    </Box>
                ),
                li: ({ children }) => (
                    <Box
                        component="li"
                        className={classNames.listItem}
                    >
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
                    <Box
                        component="table"
                        className={classNames.table}
                    >
                        {children}
                    </Box>
                ),
                thead: ({ children }) => (
                    <Box
                        component="thead"
                        className={classNames.tableHead}
                    >
                        {children}
                    </Box>
                ),
                tbody: ({ children }) => <Box component="tbody">{children}</Box>,
                tr: ({ children }) => (
                    <Box
                        component="tr"
                        className={classNames.tableRow}
                    >
                        {children}
                    </Box>
                ),
                th: ({ children }) => (
                    <Box
                        component="th"
                        className={classNames.tableHeaderCell}
                    >
                        {children}
                    </Box>
                ),
                td: ({ children }) => (
                    <Box
                        component="td"
                        className={classNames.tableCell}
                    >
                        {children}
                    </Box>
                ),
                blockquote: ({ children }) => (
                    <Box
                        component="blockquote"
                        className={classNames.blockquote}
                    >
                        {children}
                    </Box>
                ),
                pre: ({ children }) => (
                    <Box className={classNames.codeBlockContainer}>
                        <Box
                            component="pre"
                            className={classNames.codeBlockContent}
                        >
                            {children}
                        </Box>
                    </Box>
                ),
                code: ({ children, ...props }) => {
                    const inline = !props.className?.includes('language-');
                    return inline ? (
                        <Box
                            component="code"
                            className={classNames.inlineCode}
                        >
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
