import type React from 'react';
import { useState } from 'react';
import { Box, Typography } from '@mui/material';
import { PageMeta } from '../../components/PageMeta';
import { CustomButton } from '../../components/Button/Button';
import { I18n } from '../../utils/i18n';
import logo from '../../assets/img/logo_net_small.svg';
import { EXTERNAL_LINKS } from '../../config/links';
import { useStyles } from './NotFoundPage.styles';

/**
 * How many jokes stand in the language files under `notFound.jokes`.
 *
 * They are numbered from 0 there, and one of them is drawn when the page opens. The number is
 * kept here because `I18n` hands out single texts, not lists - a joke added to the three files
 * has to be counted up here as well, or it is never shown.
 */
const JOKE_COUNT = 6;

/**
 * The page for an address that names nothing.
 *
 * It is a page of the site, not a message of the server: header, footer, the light of the design
 * kit and a way on. The joke is the tone the project has everywhere else; under it stands in
 * plain words what happened, because a reader who came here from an old link wants to know that,
 * and not a number.
 *
 * The status is the server's: it answers a nameless address with 404 and `noindex, follow`, and
 * this renders inside that answer. `PageMeta` says the same again for anything that runs the app
 * and reads the document afterwards.
 */
const NotFoundPage = (): React.ReactNode => {
    const { classes } = useStyles();
    // drawn once when the page opens, and kept while the reader stands on it
    const [joke] = useState(() => Math.floor(Math.random() * JOKE_COUNT));

    return (
        <Box className={classes.pageRoot}>
            <PageMeta
                title={I18n.t('notFound.title')}
                noindex
            />
            <Box
                className={classes.glow}
                aria-hidden
            />
            <Box className={classes.content}>
                <Box
                    className={classes.number}
                    aria-hidden
                >
                    404
                </Box>

                {/* the heading of the page says what happened, the joke is how it says it */}
                <Typography
                    component="h1"
                    className={classes.jokeLine}
                >
                    {I18n.t(`notFound.jokes.${joke}.line1`)}
                </Typography>
                <Typography
                    component="p"
                    className={`${classes.jokeLine} ${classes.jokePunchline}`}
                >
                    {I18n.t(`notFound.jokes.${joke}.line2`)}
                </Typography>

                <Typography className={classes.lead}>{I18n.t('notFound.lead')}</Typography>
                <Typography className={classes.hint}>{I18n.t('notFound.hint')}</Typography>

                <CustomButton
                    href="/"
                    className={classes.homeButton}
                >
                    <img
                        src={logo}
                        className={classes.homeButtonIcon}
                        alt=""
                        aria-hidden
                    />
                    {I18n.t('notFound.home')}
                </CustomButton>

                <Box className={classes.links}>
                    <a
                        className={classes.link}
                        href="/adapters"
                    >
                        {I18n.t('notFound.adapters')}
                    </a>
                    <span className={classes.slash}>/</span>
                    <a
                        className={classes.link}
                        href="/docs"
                    >
                        {I18n.t('notFound.docs')}
                    </a>
                    <span className={classes.slash}>/</span>
                    <a
                        className={classes.link}
                        href={EXTERNAL_LINKS.FORUM}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        {I18n.t('notFound.forum')}
                    </a>
                </Box>
            </Box>
        </Box>
    );
};

export default NotFoundPage;
