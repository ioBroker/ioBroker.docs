import React from 'react';
import { Box, Typography } from '@mui/material';
import { useStyles } from './CommunitySection.styles';
import { SectionTitle } from '../../../../components/SectionTitle/SectionTitle';
import { CustomButton } from '../../../../components/Button/Button';
import { useForumStats } from '../../../../api/hooks/useForumStats';
import { I18n } from '../../../../utils/i18n';

// const mainText = `/* Die Community war von Anfang an ein zentraler Bestandteil der Entwicklung von ioBroker. Obwohl das Projekt ursprünglich sprachneutral konzipiert war, hat es sich im Laufe der Zeit ergeben, dass die deutschsprachige Community am aktivsten geworden ist - vermutlich, weil ioBroker seinen Ursprung in Deutschland hat.
//
// Heute ist das ioBroker-Forum die erste Anlaufstelle für Fragen, Problemlösungen und den Austausch mit anderen Nutzern. Hier findest du eine Vielzahl an Tutorials, Skripten und Best Practices, die dir helfen, das Beste aus ioBroker herauszuholen.
//
// Neben dem Forum gibt es auch eine sehr aktive Community auf Facebook und Discord, wo täglich diskutiert, geholfen und neue Ideen geteilt werden. Egal ob Einsteiger oder Profi - hier findest du immer Unterstützung und kannst selbst dein Wissen einbringen, um anderen zu helfen. */`;
//
// const secondaryText = 'Werde Teil der Community und gestalte die Zukunft von ioBroker mit!';

export const CommunitySection: React.FC = () => {
    const { classes } = useStyles();
    const { data: forumStats } = useForumStats();

    const communityData = [
        { title: I18n.t('home.community.forum'), count: forumStats?.users },
        { title: I18n.t('home.community.facebook'), count: '20543' },
        { title: I18n.t('home.community.discord'), count: '2000' },
    ];

    return (
        <Box
            component="section"
            className={classes.communitySection}
        >
            <Box className={classes.container}>
                <Box sx={{ width: '100%', maxWidth: '1311px', textAlign: { xs: 'left', md: 'left' } }}>
                    <SectionTitle sx={{ marginBottom: { xs: '10px !important', md: '24px !important' } }}>
                        {I18n.t('home.community.title')}
                    </SectionTitle>
                </Box>
                <Box className={classes.communityTextWrapper}>
                    <Typography
                        component="pre"
                        className={classes.communityText}
                    >
                        /* {I18n.t('home.community.mainText')}
                    </Typography>
                    <Typography className={classes.secondaryText}>{I18n.t('home.community.secondary')} */</Typography>
                </Box>
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
                                        <Box
                                            component="span"
                                            sx={{ fontSize: '32px', verticalAlign: 'middle' }}
                                        >
                                            {' '}
                                            +
                                        </Box>
                                    </Typography>
                                    <Typography className={classes.statLabel}>{I18n.t('home.community.users')}</Typography>
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
