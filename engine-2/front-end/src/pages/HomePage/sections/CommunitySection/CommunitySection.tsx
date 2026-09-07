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

    const format = (value: number | string | undefined): string =>
        value === undefined || value === null || value === ''
            ? ''
            : new Intl.NumberFormat('de-DE').format(Number(value));

    const communityData = [
        { title: I18n.t('home.community.forum'), count: format(forumStats?.users) },
        { title: I18n.t('home.community.facebook'), count: format('20543') },
        { title: I18n.t('home.community.discord'), count: format('2000') },
    ];

    return (
        <Box
            component="section"
            className={classes.communitySection}
        >
            <Box className={classes.container}>
                <Box sx={{ width: '100%', maxWidth: '1311px', textAlign: { xs: 'left', md: 'left' } }}>
                    <SectionTitle>{I18n.t('home.community.title')}</SectionTitle>
                </Box>
                <Box className={classes.communityTextWrapper}>
                    <Typography
                        component="pre"
                        className={classes.communityText}
                    >
                        /* {I18n.t('home.community.mainText')} */
                    </Typography>
                </Box>
                {/*
                 * Der Satz war der letzte Absatz im Kommentarblock, gehoert aber nicht zum
                 * Text, sondern zu den drei Kaesten: er fordert zu genau dem auf, was sie
                 * anbieten. Darum steht er jetzt als Ueberschrift ueber ihnen (Denis,
                 * 06.09.2026). Das schliessende Kommentarzeichen steht jetzt am Ende des Textes.
                 */}
                <Typography className={classes.statsHeading}>{I18n.t('home.community.secondary')}</Typography>
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
                                                // relativ zur Zahl, damit das Plus jede
                                                // Groesse mitmacht statt eigene Stufen zu haben
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
