import { Box } from '@mui/material';
import type React from 'react';
import { memo, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import { createSlugger, makeSlug } from '../../utils/markdown';
import { buildAnchorHref, getAnchorFromHash, scrollToAnchor, updateAnchorInUrl } from '../../utils/anchor';
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
        /** h4 only - h5/h6 keep the browser default on purpose */
        subheading?: string;
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
    /** anchor icon next to a heading - omit it and the headings carry no anchor link */
    linkImage?: string;
}

export const MarkdownView = memo(function MarkdownView({
    markdown,
    baseUrl,
    origin,
    headingIds,
    headingIdMap,
    classNames,
    linkImage,
}: MarkdownViewProps): React.ReactNode {
    const markdownForRender = markdown ? normalizeImageTags(markdown) : '';
    const scrollToHeading = (id: string) => (event: React.MouseEvent<HTMLAnchorElement>) => {
        event.preventDefault();
        scrollToAnchor(id);
        updateAnchorInUrl(id);
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
            scrollToAnchor(id);
        };
        // on a deep link the markdown is there but images and tables are not sized
        // yet - repeat the jump until the layout has settled
        const timers = [250, 700, 1400].map(delay => window.setTimeout(handleHash, delay));
        requestAnimationFrame(() => requestAnimationFrame(handleHash));
        window.addEventListener('hashchange', handleHash);
        return () => {
            timers.forEach(timer => window.clearTimeout(timer));
            window.removeEventListener('hashchange', handleHash);
        };
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

    const renderAnchorLink = (id: string, text: string): React.ReactNode =>
        linkImage ? (
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
        ) : null;

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
                            {renderAnchorLink(id, text)}
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
                            {renderAnchorLink(id, text)}
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
                            {renderAnchorLink(id, text)}
                        </Box>
                    );
                },
                h4: ({ children }) => (
                    <Box
                        component="h4"
                        className={classNames.subheading}
                    >
                        {children}
                    </Box>
                ),
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
                img: ({ src, alt, width }) => {
                    const declaredWidth = typeof width === 'string' ? parseInt(width, 10) : width;
                    const maxWidth =
                        typeof declaredWidth === 'number' && Number.isFinite(declaredWidth) && declaredWidth > 0
                            ? `${declaredWidth}px`
                            : '600px';
                    return (
                        <Box className={classNames.image}>
                            <img
                                src={resolveMarkdownUrl(src, baseUrl, origin)}
                                alt={alt ?? ''}
                                style={{ width: '100%', maxWidth }}
                            />
                        </Box>
                    );
                },
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
});
