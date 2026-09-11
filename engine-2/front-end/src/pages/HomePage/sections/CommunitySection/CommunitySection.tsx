import React from 'react';
import { Box, Typography } from '@mui/material';
import { useStyles } from './CommunitySection.styles';
import { CustomButton } from '../../../../components/Button/Button';
import { useForumStats } from '../../../../api/hooks/useForumStats';
import { I18n } from '../../../../utils/i18n';

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

    const communityData = [
        { title: I18n.t('home.community.forum'), count: format(forumStats?.users) },
        { title: I18n.t('home.community.facebook'), count: format('19700') },
        { title: I18n.t('home.community.discord'), count: format('1500') },
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
                {/*
                 * Die Einladung steht jetzt direkt unter der Kennzeile und nicht mehr ueber
                 * den drei Kacheln: sie ist die Aussage des Abschnitts, der Absatz darunter
                 * begruendet sie (Denis, 11.09.2026).
                 */}
                <Typography className={classes.statsHeading}>{I18n.t('home.community.secondary')}</Typography>
                <Typography className={classes.communityText}>{I18n.t('home.community.mainText')}</Typography>
                <Box className={classes.statsContainer}>
                    {communityData.map(item => (
                        <Box
                            key={item.title}
                            className={classes.statCard}
                        >
                            <div className={classes.bracesLeft} />
                            <Box className={classes.bracesContent}>
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
                                >
                                    {I18n.t('home.community.join')}
                                </CustomButton>
                            </Box>
                            <div className={classes.bracesRight} />
                        </Box>
                    ))}
                </Box>
            </Box>
        </Box>
    );
};
