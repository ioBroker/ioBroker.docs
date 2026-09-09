import { Box } from '@mui/material';
import React, { memo, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import { createSlugger, makeSlug } from '../../utils/markdown';
import { buildAnchorHref, getAnchorFromHash, scrollToAnchor, updateAnchorInUrl } from '../../utils/anchor';
import { isExternalLink, normalizeImageTags, normalizeText, resolveMarkdownUrl } from './markdownViewUtils';
import { useMarkdownLinkStyles } from '../markdownLink.styles';

interface MarkdownViewProps {
    markdown?: string;
    baseUrl: string;
    origin: string;
    headingIds?: string[];
    headingIdMap?: Record<string, string[]>;
    classNames: {
        head: string;
        /**
         * h2. Falls back to `head` when a page does not provide it, which keeps the blog
         * and the legal pages at the single heading size they were designed with.
         */
        subhead?: string;
        heading: string;
        /** h4 only - h5/h6 keep the browser default on purpose */
        subheading?: string;
        paragraph: string;
        list: string;
        listItem: string;
        image: string;
        linkIcon: string;
        /**
         * A link inside the text. Without it a link is indistinguishable from the running
         * text around it - it inherits the paragraph colour and carries no underline.
         */
        link?: string;
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
    const { classes: linkClasses } = useMarkdownLinkStyles();
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
                            className={classNames.subhead ?? classNames.head}
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
                a: ({ children, href, ...props }) => {
                    /*
                     * A link to a heading of the same page. In the markdown it is written as
                     * `[iobroker start](#iobroker-start)`, which is correct markdown but dies
                     * under the HashRouter: the browser replaces the whole hash and the app
                     * loses its route, leaving the reader on an empty page. The in-page tables
                     * of contents of the documentation are full of these - `config/cli.md`
                     * alone has 60 - so they are rewritten here rather than in 1500 places in
                     * the text.
                     */
                    if (href?.startsWith('#') && !href.startsWith('#/')) {
                        const id = decodeURIComponent(href.slice(1));
                        return (
                            <Box
                                component="a"
                                href={buildAnchorHref(id)}
                                className={classNames.link || linkClasses.link}
                                onClick={scrollToHeading(id)}
                                {...props}
                            >
                                {children}
                            </Box>
                        );
                    }
                    // a link out of the documentation opens beside it, not instead of it
                    const external = isExternalLink(href);
                    return (
                        <Box
                            component="a"
                            href={href}
                            className={classNames.link || linkClasses.link}
                            target={external ? '_blank' : undefined}
                            rel={external ? 'noopener noreferrer' : undefined}
                            {...props}
                        >
                            {children}
                        </Box>
                    );
                },
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
                    const hasWidth =
                        typeof declaredWidth === 'number' && Number.isFinite(declaredWidth) && declaredWidth > 0;
                    return (
                        <Box className={classNames.image}>
                            <img
                                src={resolveMarkdownUrl(src, baseUrl, origin)}
                                alt={alt ?? ''}
                                /* A picture without a declared width keeps its own size and is
                                   only ever made smaller - by the 600 px cap or by a column
                                   narrower than that. It used to carry `width: 100%`, which
                                   blew every small picture up to whatever space it stood in:
                                   the 90 px widget previews in the vis tables came out at
                                   333 px, blurred and taller than the row they describe.
                                   A declared width is an instruction and is still honoured. */
                                style={
                                    hasWidth
                                        ? { width: `${declaredWidth}px`, maxWidth: '100%', height: 'auto' }
                                        : { maxWidth: 'min(600px, 100%)', height: 'auto' }
                                }
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
