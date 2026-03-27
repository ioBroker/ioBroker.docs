import { Box } from '@mui/material';
import type React from 'react';
import { Children, isValidElement, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import ContentCopyTwoToneIcon from '@mui/icons-material/ContentCopyTwoTone';
import theme from '../../theme';
import {
    normalizeImageTags,
    normalizeText,
    resolveMarkdownUrl,
    getCodeLanguage,
    isBadgeImage,
    isPaypalButton,
} from './adapterMarkdownViewUtils';
import { I18n } from '../../utils/i18n';

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
        copyConfirmation: string;
    };
}

export const AdapterMarkdownView = ({
    markdown,
    baseUrl,
    origin,
    classNames,
    excludeHeadings = [],
}: AdapterMarkdownViewProps): React.ReactNode => {
    const markdownForRender = markdown ? normalizeImageTags(markdown, excludeHeadings) : '';
    const [copyVisible, setCopyVisible] = useState(false);

    return markdownForRender ? (
        <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeRaw]}
            components={{
                h1: () => null,
                h2: ({ children }) => <Box className={classNames.head}>{children}</Box>,
                h3: ({ children }) => <Box className={classNames.heading}>{children}</Box>,
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
                img: ({ src, alt }) => {
                    const isBadge = isBadgeImage(src);
                    const isPaypal = isPaypalButton(src);
                    return (
                        <Box
                            className={classNames.image}
                            sx={isBadge ? { display: 'inline-flex', margin: '6px 0' } : undefined}
                        >
                            <img
                                src={resolveMarkdownUrl(src, baseUrl, origin)}
                                alt={alt ?? ''}
                                style={
                                    isBadge
                                        ? isPaypal
                                            ? { width: 'auto', height: '50px', objectFit: 'contain' as const }
                                            : {
                                                  width: 'auto',
                                                  height: '28px',
                                                  maxWidth: '240px',
                                                  objectFit: 'contain' as const,
                                              }
                                        : { width: '100%', maxWidth: '600px' }
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
                pre: ({ children }) => {
                    const child = Children.toArray(children)[0];
                    const className = isValidElement<{ className?: string }>(child) ? child.props.className : undefined;
                    const language = getCodeLanguage(className);
                    const codeText = isValidElement<{ children?: React.ReactNode }>(child)
                        ? normalizeText(child.props.children)
                        : normalizeText(children);
                    const handleCopy = (): void => {
                        if (!codeText) {
                            return;
                        }
                        void navigator.clipboard?.writeText(codeText);
                        setCopyVisible(true);
                        window.setTimeout(() => {
                            setCopyVisible(false);
                        }, 4000);
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
                                <Box
                                    className={classNames.copyConfirmation}
                                    style={{ opacity: copyVisible ? 1 : 0 }}
                                >
                                    {I18n.t('installation.linux.copied')}
                                </Box>
                            </Box>
                            <Box
                                component="pre"
                                className={classNames.codeBlockContent}
                            >
                                {children}
                            </Box>
                        </Box>
                    );
                },
                code: ({ inline, className, children }: React.ComponentProps<'code'> & { inline?: boolean }) => {
                    if (inline) {
                        return (
                            <Box
                                component="code"
                                className={classNames.inlineCode}
                            >
                                {children}
                            </Box>
                        );
                    }
                    return <code className={className}>{children}</code>;
                },
                hr: () => null,
            }}
        >
            {markdownForRender}
        </ReactMarkdown>
    ) : null;
};
