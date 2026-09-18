import React from 'react';
import { Box, Typography } from '@mui/material';
import { useStyles } from './CommunitySection.styles';
import { CustomButton } from '../../../../components/Button/Button';
import { useForumStats } from '../../../../api/hooks/useForumStats';
import { I18n } from '../../../../utils/i18n';
import { EXTERNAL_LINKS } from '../../../../config/links';

// const mainText = `/* The community has been a central part of ioBroker's development from the beginning. Although the project was originally designed to be language-neutral, the German-speaking community has become the most active over time—presumably because ioBroker originated in Germany.
//
// Today, the ioBroker forum is the first place for questions, solutions, and exchange with other users. There you will find many tutorials, scripts, and best practices to help you get the most from ioBroker.
//
// Alongside the forum, there is a highly active community on Facebook and Discord, where people discuss, help each other, and share ideas every day. Whether you are a beginner or a professional, you can find support here and share your own knowledge to help others. */`;
//
// const secondaryText = 'Become part of the community and help shape ioBroker’s future!';

export const CommunitySection: React.FC = () => {
    const { classes } = useStyles();
    const { data: forumStats } = useForumStats();

    const format = (value: number | string | undefined): string =>
        value === undefined || value === null || value === ''
            ? ''
            : new Intl.NumberFormat('de-DE').format(Number(value));

    /*
     * The three "join" buttons stood there without a destination and did nothing
     * (Denis on the phone, 16.09.2026). Facebook leads to the group, not to the page:
     * the number on the card is the one of the group and the button says "join".
     */
    const communityData = [
        { title: I18n.t('home.community.forum'), count: format(forumStats?.users), href: EXTERNAL_LINKS.FORUM },
        {
            title: I18n.t('home.community.facebook'),
            count: format('19700'),
            href: EXTERNAL_LINKS.FACEBOOK_GROUP,
        },
        { title: I18n.t('home.community.discord'), count: format('1500'), href: EXTERNAL_LINKS.DISCORD },
    ];

    return (
        <Box
            component="section"
            className={classes.communitySection}
        >
            <Box className={classes.container}>
                <Typography
                    component="p"
                    className={classes.label}
                >
                    <span className={classes.labelSlashes}>{'//'}</span>
                    {I18n.t('home.community.title')}
                </Typography>
                <Typography
                    component="h2"
                    className={classes.title}
                >
                    {I18n.t('home.community.title1')}
                    <br />
                    <span className={classes.titleAccent}>{I18n.t('home.community.title2')}</span>
                </Typography>
                <Typography className={classes.communityText}>{I18n.t('home.community.mainText')}</Typography>
                <Box className={classes.statsContainer}>
                    {communityData.map(item => (
                        <Box
                            key={item.title}
                            className={classes.statCard}
                        >
                            <div className={classes.bracesLeft} />
                            <Box className={classes.bracesContent}>
                                {/*
                                 * Label and button stand in one shared
                                 * column that is as wide as its widest piece
                                 * (the button) and sits centred in the bracket
                                 * as a whole. Both thereby share the same left
                                 * edge (Denis, 11.09.2026).
                                 */}
                                <Box className={classes.inner}>
                                    <Box className={classes.statCardContentWrapper}>
                                        <Typography
                                            variant="h5"
                                            className={classes.statTitle}
                                        >
                                            {item.title}
                                        </Typography>
                                        <Typography className={classes.statNumber}>
                                            {item.count}
                                            {item.count ? (
                                                <Box
                                                    component="span"
                                                    // Relative to the number, so the plus follows every
                                                    // size instead of requiring its own breakpoints.
                                                    sx={{ fontSize: '0.55em', verticalAlign: 'middle' }}
                                                >
                                                    {' '}
                                                    +
                                                </Box>
                                            ) : null}
                                        </Typography>
                                        <Typography className={classes.statLabel}>
                                            {I18n.t('home.community.users')}
                                        </Typography>
                                    </Box>
                                    <CustomButton
                                        variant="secondary"
                                        className={classes.joinButton}
                                        href={item.href}
                                        target="_blank"
                                    >
                                        {I18n.t('home.community.join')}
                                    </CustomButton>
                                </Box>
                            </Box>
                            <div className={classes.bracesRight} />
                        </Box>
                    ))}
                </Box>
            </Box>
        </Box>
    );
};
