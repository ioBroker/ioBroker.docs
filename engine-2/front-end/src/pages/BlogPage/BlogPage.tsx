import { Box, Paper, Typography } from '@mui/material';
import { PageMeta } from '../../components/PageMeta';
import type React from 'react';
import { useEffect, useMemo, useState } from 'react';
import { SectionTitle } from '../../components/SectionTitle/SectionTitle';
import { I18n } from '../../utils/i18n';
import { buildIoBrokerUrl } from '../../config/api';
import { useBlogContent } from '../../api/hooks/useBlog';
import { formatBlogDate, getAuthor, pickText, sortBlogPages } from './blogUtils';
import { useStyles } from './BlogPage.styles';

const RssIcon = (): React.ReactNode => (
    <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
    >
        <path d="M4 11a9 9 0 0 1 9 9" />
        <path d="M4 4a16 16 0 0 1 16 16" />
        <circle
            cx="5"
            cy="19"
            r="1.5"
            fill="currentColor"
            stroke="none"
        />
    </svg>
);

const BlogPage = (): React.ReactNode => {
    const { classes } = useStyles();
    const [language, setLanguage] = useState(I18n.getLanguage());
    const { data, isLoading, isError } = useBlogContent();

    useEffect(() => I18n.subscribe(setLanguage), []);
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    /*
     * All posts, newest first. Until 10.09.2026 a row of filters stood above the list (All,
     * Review, Announcement, News); Denis had them removed. The kind of post is still shown as a
     * tag on every card.
     */
    const pageIds = useMemo(() => (data?.pages ? sortBlogPages(data.pages) : []), [data]);

    return (
        <Box className={classes.pageWrapper}>
            <PageMeta title={I18n.t('Blog')} />
            <Box className={classes.pageContainer}>
                <Box className={classes.header}>
                    <Box className={classes.headerText}>
                        <SectionTitle sx={{ marginBottom: '12px', textTransform: 'uppercase' }}>
                            {I18n.t('blog.title')}
                        </SectionTitle>
                        <Typography
                            variant="body1"
                            className={classes.subtitle}
                        >
                            {I18n.t('blog.subtitle')}
                        </Typography>
                    </Box>
                    <Box className={classes.filterRow}>
                        <Box
                            component="a"
                            className={classes.rssLink}
                            href={buildIoBrokerUrl(`blog_${language}.xml`)}
                            target="_blank"
                            rel="noopener noreferrer"
                            title={I18n.t('blog.rss')}
                            aria-label={I18n.t('blog.rss')}
                        >
                            <RssIcon />
                        </Box>
                    </Box>
                </Box>

                {isLoading && <Typography className={classes.message}>{I18n.t('blog.loading')}</Typography>}
                {isError && <Typography className={classes.message}>{I18n.t('blog.loadError')}</Typography>}

                <Box className={classes.grid}>
                    {pageIds.map(pageId => {
                        const entry = data!.pages[pageId];
                        const title = pickText(entry.title, language);
                        const desc = pickText(entry.desc, language);
                        const author = getAuthor(entry);
                        /*
                         * Picture, title and button are links, not click handlers: a crawler finds a
                         * post only through an `href`, and the blog page linked none of them. A click
                         * still stays inside the app - `useAppLinks` takes it and hands it to the router.
                         */
                        const postLink = `/blog/${pageId}`;

                        return (
                            <Paper
                                key={pageId}
                                className={classes.card}
                                elevation={0}
                            >
                                {entry.logo ? (
                                    // the title below is the link to read and to tab to - this one only
                                    // makes the picture clickable, so it is left out of the tab order
                                    <Box
                                        component="a"
                                        href={postLink}
                                        className={classes.cardImageLink}
                                        tabIndex={-1}
                                        aria-hidden
                                    >
                                        <img
                                            src={buildIoBrokerUrl(entry.logo)}
                                            alt={title}
                                            loading="lazy"
                                            className={classes.cardImage}
                                        />
                                    </Box>
                                ) : (
                                    <Box className={classes.cardImagePlaceholder} />
                                )}

                                <Box className={classes.cardBody}>
                                    <Box className={classes.cardMeta}>
                                        {!!entry.type && (
                                            <Typography
                                                component="span"
                                                className={classes.cardType}
                                            >
                                                {I18n.t(`blog.type.${entry.type}`)}
                                            </Typography>
                                        )}
                                        <Typography
                                            component="span"
                                            className={classes.cardDate}
                                        >
                                            {formatBlogDate(pageId, entry.date, language)}
                                        </Typography>
                                    </Box>
                                    <Typography
                                        component="h2"
                                        className={classes.cardTitle}
                                    >
                                        <Box
                                            component="a"
                                            href={postLink}
                                            className={classes.cardTitleLink}
                                        >
                                            {title}
                                        </Box>
                                    </Typography>
                                    {!!desc && <Typography className={classes.cardDesc}>{desc}</Typography>}

                                    <Box className={classes.cardDivider} />
                                    <Box className={classes.cardFooter}>
                                        <Box
                                            component="a"
                                            href={postLink}
                                            className={classes.readButton}
                                        >
                                            {I18n.t('blog.read')}
                                        </Box>
                                        {!!author && (
                                            <Typography
                                                component="span"
                                                className={classes.cardAuthor}
                                            >
                                                {author}
                                            </Typography>
                                        )}
                                    </Box>
                                </Box>
                            </Paper>
                        );
                    })}
                </Box>
            </Box>
        </Box>
    );
};

export default BlogPage;
