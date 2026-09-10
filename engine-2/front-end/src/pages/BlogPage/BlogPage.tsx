import { Box, Paper, Typography } from '@mui/material';
import { PageMeta } from '../../components/PageMeta';
import type React from 'react';
import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
    const navigate = useNavigate();
    const [language, setLanguage] = useState(I18n.getLanguage());
    const { data, isLoading, isError } = useBlogContent();

    useEffect(() => I18n.subscribe(setLanguage), []);
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    /*
     * Alle Beitraege, neueste zuerst. Bis zum 10.09.2026 stand ueber der Liste eine Reihe
     * von Filtern (Alle, Rueckblick, Ankuendigung, News); Denis hat sie entfernen lassen.
     * Die Art des Beitrags steht weiterhin als Marke auf jeder Karte.
     */
    const pageIds = useMemo(() => (data?.pages ? sortBlogPages(data.pages) : []), [data]);

    const openPage = (pageId: string): void => {
        void navigate(`/blog/${pageId}`);
    };

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

                        return (
                            <Paper
                                key={pageId}
                                className={classes.card}
                                elevation={0}
                            >
                                {entry.logo ? (
                                    <img
                                        src={buildIoBrokerUrl(entry.logo)}
                                        alt={title}
                                        loading="lazy"
                                        className={classes.cardImage}
                                        onClick={() => openPage(pageId)}
                                    />
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
                                        onClick={() => openPage(pageId)}
                                    >
                                        {title}
                                    </Typography>
                                    {!!desc && <Typography className={classes.cardDesc}>{desc}</Typography>}

                                    <Box className={classes.cardDivider} />
                                    <Box className={classes.cardFooter}>
                                        <button
                                            type="button"
                                            className={classes.readButton}
                                            onClick={() => openPage(pageId)}
                                        >
                                            {I18n.t('blog.read')}
                                        </button>
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
