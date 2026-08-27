import { Box, Paper, Typography } from '@mui/material';
import type React from 'react';
import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { I18n } from '../../utils/i18n';
import { API_CONFIG, buildIoBrokerUrl } from '../../config/api';
import { useBlogContent, useBlogMarkdown } from '../../api/hooks/useBlog';
import { MarkdownView } from '../../components/MarkdownView/MarkdownView';
import linkImage from '../../assets/img/docsIcons/blueLink.svg';
import { extractHeader, formatBlogDate, getAuthor, pickText, sortBlogPages } from './blogUtils';
import { useStyles } from './BlogPostPage.styles';

const BlogPostPage = (): React.ReactNode => {
    const { classes, cx } = useStyles();
    const navigate = useNavigate();
    const params = useParams();
    const pageId = params.pageId;
    const [language, setLanguage] = useState(I18n.getLanguage());

    const { data: content } = useBlogContent();
    const { data: loaded, isLoading, isError } = useBlogMarkdown(pageId, language);

    useEffect(() => I18n.subscribe(setLanguage), []);
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pageId]);

    const { header, body } = useMemo(() => extractHeader(loaded?.text || ''), [loaded]);

    const entry = pageId && content?.pages ? content.pages[pageId] : undefined;
    const title = header.title || (entry ? pickText(entry.title, language) : '') || pageId || '';
    const logo = header.logo || entry?.logo;
    const author = header.author || (entry ? getAuthor(entry) : '');
    const date = pageId ? formatBlogDate(pageId, entry?.date, language) : '';

    const pageIds = useMemo(() => (content?.pages ? sortBlogPages(content.pages) : []), [content]);
    const position = pageId ? pageIds.indexOf(pageId) : -1;
    const newerId = position > 0 ? pageIds[position - 1] : undefined;
    const olderId = position !== -1 && position + 1 < pageIds.length ? pageIds[position + 1] : undefined;

    const markdownLanguage = loaded?.language || language;
    const baseOrigin = /^https?:\/\//i.test(API_CONFIG.IOBROKER_BASE_URL)
        ? API_CONFIG.IOBROKER_BASE_URL
        : window.location.origin;
    const markdownBaseUrl = `${baseOrigin}/${markdownLanguage}/blog/${pageId || ''}.md`;

    return (
        <Box className={classes.pageWrapper}>
            <Box className={classes.pageContainer}>
                <button
                    type="button"
                    className={classes.backLink}
                    onClick={() => void navigate('/blog')}
                >
                    {`← ${I18n.t('blog.backToOverview')}`}
                </button>

                {isLoading && <Typography className={classes.message}>{I18n.t('blog.loading')}</Typography>}
                {isError && <Typography className={classes.message}>{I18n.t('blog.notFound')}</Typography>}

                {!!loaded && (
                    <>
                        <Paper
                            className={classes.article}
                            elevation={0}
                        >
                            {!!logo && (
                                <img
                                    src={buildIoBrokerUrl(logo)}
                                    alt={title}
                                    className={classes.heroImage}
                                />
                            )}
                            <Box className={classes.articleBody}>
                                <Typography
                                    component="h1"
                                    className={classes.postTitle}
                                >
                                    {title}
                                </Typography>
                                <Box className={classes.postMeta}>
                                    {!!author && <span className={classes.postAuthor}>{author}</span>}
                                    <span>{I18n.t('blog.postedOn', date)}</span>
                                </Box>

                                {!!header.translatedFrom && (
                                    <Box className={classes.translatedHint}>
                                        {I18n.t('blog.translatedFrom', header.translatedFrom)}
                                    </Box>
                                )}

                                <Box className={classes.markdownBody}>
                                    <MarkdownView
                                        markdown={body}
                                        baseUrl={markdownBaseUrl}
                                        origin={baseOrigin}
                                        classNames={{
                                            head: classes.head,
                                            heading: classes.heading,
                                            paragraph: classes.paragraph,
                                            list: classes.list,
                                            listItem: classes.listItem,
                                            image: classes.image,
                                            linkIcon: classes.linkIcon,
                                            table: classes.table,
                                            tableHead: classes.tableHead,
                                            tableRow: classes.tableRow,
                                            tableHeaderCell: classes.tableHeaderCell,
                                            tableCell: classes.tableCell,
                                            codeBlockContainer: classes.codeBlockContainer,
                                            codeBlockContent: classes.codeBlockContent,
                                            inlineCode: classes.inlineCode,
                                            blockquote: classes.blockquote,
                                        }}
                                        linkImage={linkImage}
                                    />
                                </Box>

                                {!!header.editLink && (
                                    <Box className={classes.editLinkRow}>
                                        <a
                                            className={classes.editLink}
                                            href={header.editLink}
                                            rel="noopener noreferrer"
                                            target="_blank"
                                        >
                                            {I18n.t('blog.editOnGithub')}
                                        </a>
                                    </Box>
                                )}
                            </Box>
                        </Paper>

                        <Box className={classes.pagination}>
                            {!!newerId && (
                                <button
                                    type="button"
                                    className={classes.navButton}
                                    onClick={() => void navigate(`/blog/${newerId}`)}
                                >
                                    {`← ${formatBlogDate(newerId, content?.pages[newerId]?.date, language)}`}
                                </button>
                            )}
                            {!!olderId && (
                                <button
                                    type="button"
                                    className={cx(classes.navButton, classes.navButtonNext)}
                                    onClick={() => void navigate(`/blog/${olderId}`)}
                                >
                                    {`${formatBlogDate(olderId, content?.pages[olderId]?.date, language)} →`}
                                </button>
                            )}
                        </Box>
                    </>
                )}
            </Box>
        </Box>
    );
};

export default BlogPostPage;
