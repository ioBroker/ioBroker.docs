import type React from 'react';
import { useState } from 'react';
import { Box, Typography } from '@mui/material';
import { PageMeta } from '../../components/PageMeta';
import { CustomButton } from '../../components/Button/Button';
import SearchIcon from '../../components/icons/SearchIcon';
import { I18n } from '../../utils/i18n';
import logo from '../../assets/img/logo_net_small.svg';
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
 * It is a page of the site, not a message of the server: header, footer, and a way on. The header
 * already carries the site's destinations, so this page does not repeat them; it gives the reader
 * the two moves that fit a dead link - the home page in full and the search beside it.
 *
 * The content stands in two groups spread over the height: the status above (the heading and the
 * number) and the human part below (the joke, one plain sentence, the buttons). The heading is the
 * status line ("// SEITE NICHT GEFUNDEN"), because that is the one line that must say the same thing
 * on every visit; the joke below it is drawn at random, so it is deliberately NOT the heading.
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
            <Box className={classes.content}>
                {/*
                 * Top zone: the status. The heading carries the section-label style, not the display
                 * size - it reads as a quiet blue mark above the number. Visual and semantic hierarchy
                 * diverge here on purpose (see DESIGN.md).
                 */}
                <Box className={classes.top}>
                    <Typography
                        component="h1"
                        className={classes.label}
                    >
                        <span className={classes.slash}>{'//'}</span> {I18n.t('notFound.title')}
                    </Typography>

                    {/* the number is decoration read out by the heading; the screen reader skips it */}
                    <Box
                        className={classes.number}
                        aria-hidden
                    >
                        404
                    </Box>
                </Box>

                {/* Bottom zone: how the page speaks, one plain sentence, and the two ways on. */}
                <Box className={classes.bottom}>
                    <Typography
                        component="p"
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

                    <Box className={classes.actions}>
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
                        <CustomButton
                            href="/search"
                            variant="secondary"
                            className={classes.searchButton}
                        >
                            <span
                                className={classes.searchIcon}
                                aria-hidden
                            >
                                <SearchIcon />
                            </span>
                            {I18n.t('notFound.search')}
                        </CustomButton>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};

export default NotFoundPage;
