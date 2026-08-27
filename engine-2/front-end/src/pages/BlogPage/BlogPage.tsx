import { Box, Paper, Typography } from '@mui/material';
import type React from 'react';
import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SectionTitle } from '../../components/SectionTitle/SectionTitle';
import { I18n } from '../../utils/i18n';
import { buildIoBrokerUrl } from '../../config/api';
import { useBlogContent } from '../../api/hooks/useBlog';
import { formatBlogDate, pickText, sortBlogPages } from './blogUtils';
import { useStyles } from './BlogPage.styles';

const BlogPage = (): React.ReactNode => {
    const { classes } = useStyles();
    const navigate = useNavigate();
    const [language, setLanguage] = useState(I18n.getLanguage());
    const { data, isLoading, isError } = useBlogContent();

    useEffect(() => I18n.subscribe(setLanguage), []);
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const pageIds = useMemo(() => (data?.pages ? sortBlogPages(data.pages) : []), [data]);

    const openPage = (pageId: string): void => {
        void navigate(`/blog/${pageId}`);
    };

    return (
        <Box className={classes.pageWrapper}>
            <Box className={classes.pageContainer}>
                <Box className={classes.title}>
                    <SectionTitle>{I18n.t('blog.title')}</SectionTitle>
                </Box>

                {isLoading && <Typography className={classes.message}>{I18n.t('blog.loading')}</Typography>}
                {isError && <Typography className={classes.message}>{I18n.t('blog.loadError')}</Typography>}

                <Box className={classes.grid}>
                    {pageIds.map(pageId => {
                        const entry = data!.pages[pageId];
                        const title = pickText(entry.title, language);
                        const desc = pickText(entry.desc, language);

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
                                    <Typography
                                        component="h2"
                                        className={classes.cardTitle}
                                        onClick={() => openPage(pageId)}
                                    >
                                        {title}
                                    </Typography>
                                    {!!desc && <Typography className={classes.cardDesc}>{desc}</Typography>}

                                    <Box className={classes.cardFooter}>
                                        <button
                                            type="button"
                                            className={classes.readButton}
                                            onClick={() => openPage(pageId)}
                                        >
                                            {I18n.t('blog.read')}
                                        </button>
                                        <Typography
                                            component="span"
                                            className={classes.cardDate}
                                        >
                                            {I18n.t('blog.postedOn', formatBlogDate(pageId, entry.date, language))}
                                        </Typography>
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
