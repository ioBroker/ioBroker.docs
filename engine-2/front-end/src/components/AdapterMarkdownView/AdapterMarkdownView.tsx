import { Box } from '@mui/material';
import type React from 'react';
import { Children, isValidElement } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import ContentCopyTwoToneIcon from '@mui/icons-material/ContentCopyTwoTone';
import theme from '../../theme';
import { removeFrontmatter } from '../../utils/markdown';

interface AdapterMarkdownViewProps {
    markdown?: string;
    baseUrl: string;
    origin: string;
    excludeHeadings?: string[];
    classNames: {
        head: string;
        heading: string;
        paragraph: string;
        list: string;
        listItem: string;
        image: string;
        table: string;
        tableHead: string;
        tableRow: string;
        tableHeaderCell: string;
        tableCell: string;
        codeBlockContainer: string;
        codeBlockHeader: string;
        codeBlockContent: string;
        inlineCode: string;
        blockquote: string;
    };
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

const removeSections = (markdown: string, headings: string[]): string => {
    if (!headings.length) return markdown;
    const lines = markdown.split('\n');
    const removeSet = new Set(headings.map(h => h.trim().toLowerCase()));
    const result: string[] = [];
    let skipping = false;

    for (const line of lines) {
        const match = line.match(/^##\s+(.+)$/);
        if (match) {
            const headingText = match[1].trim().toLowerCase();
            skipping = removeSet.has(headingText);
            if (!skipping) {
                result.push(line);
            }
            continue;
        }
        if (skipping) {
            continue;
        }
        result.push(line);
    }
    return result.join('\n');
};

const normalizeImageTags = (markdown: string, excludeHeadings: string[]): string => {
    let result = markdown;
    result = removeSections(result, excludeHeadings);
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

const getCodeLanguage = (className: string | undefined): string => {
    if (!className) return 'code';
    const match = className.match(/language-([^\s]+)/);
    return match?.[1] ?? 'code';
};

const isBadgeImage = (src: string | undefined): boolean => {
    if (!src) return false;
    return /shields\.io|badge|badges|travis|appveyor|nodei\.co\/npm|github\.com\/.*\/badge|donate|paypal/i.test(src);
};

export const AdapterMarkdownView = ({ markdown, baseUrl, origin, classNames, excludeHeadings = [] }: AdapterMarkdownViewProps): React.ReactNode => {
    const markdownForRender = markdown ? normalizeImageTags(markdown, excludeHeadings) : '';

    return markdownForRender ? (
        <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeRaw]}
            components={{
                h1: () => null,
                h2: ({ children }) => (
                    <Box className={classNames.head}>{children}</Box>
                ),
                h3: ({ children }) => (
                    <Box className={classNames.heading}>{children}</Box>
                ),
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
                    <Box
                        className={classNames.image}
                        sx={isBadgeImage(src) ? { display: 'inline-flex', margin: '6px 0' } : undefined}
                    >
                        <img
                            src={resolveMarkdownUrl(src, baseUrl, origin)}
                            alt={alt ?? ''}
                            style={isBadgeImage(src)
                                ? { width: 'auto', height: '28px', maxWidth: '240px', objectFit: 'contain' }
                                : { width: '100%', maxWidth: '600px' }}
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
                pre: ({ children }) => {
                    const child = Children.toArray(children)[0];
                    const className = isValidElement(child) ? (child.props as any).className : undefined;
                    const language = getCodeLanguage(className);
                    const codeText = isValidElement(child) ? normalizeText((child.props as any).children) : normalizeText(children);
                    const handleCopy = () => {
                        if (!codeText) return;
                        void navigator.clipboard?.writeText(codeText);
                    };
                    return (
                        <Box className={classNames.codeBlockContainer}>
                            <Box className={classNames.codeBlockHeader}>
                                <span>{language}</span>
                                <ContentCopyTwoToneIcon
                                    onClick={handleCopy}
                                    sx={{
                                        fontSize: 16,
                                        cursor: 'pointer',
                                        color: theme.palette.secondary.main,
                                        '@media (max-width: 769px)': {
                                            fontSize: 26,
                                        },
                                        '@media (max-width: 481px)': {
                                            fontSize: 22,
                                        },
                                        '& path:first-of-type': {
                                            opacity: 1,
                                            fill: theme.palette.secondary.main,
                                        },
                                    }}
                                />
                            </Box>
                            <Box component="pre" className={classNames.codeBlockContent}>
                                {children}
                            </Box>
                        </Box>
                    );
                },
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
