import React from 'react';
import { Box, Typography } from '@mui/material';
import { useStyles } from './CommunitySection.styles';
import { SectionTitle } from '../../components/SectionTitle';

export const CommunitySection: React.FC = () => {
    const { classes } = useStyles();
    return (
        <Box component="section" className={classes.section}>
            <Box className={classes.container}>
                <SectionTitle>COMMUNITY</SectionTitle>
                <Typography className={classes.communityText}>
                    Die Community war von Anfang an ein zentraler Bestandteil der Entwicklung von ioBroker. Obwohl das Projekt ursprünglich sprachneutral konzipiert war, hat es sich im Laufe der Zeit ergeben, dass die deutschsprachige Community am aktivsten geworden ist - vermutlich, weil ioBroker seinen Ursprung in Deutschland hat.
                </Typography>
                <Box className={classes.statsContainer}>
                    <Box className={classes.statCard}>
                        <Typography variant="h5">Forum</Typography>
                        <Typography className={classes.statNumber}>30941+</Typography>
                        <Typography className={classes.statLabel}>Nutzer</Typography>
                        <button className={classes.joinButton}>BEITRETEN</button>
                    </Box>
                    <Box className={classes.statCard}>
                        <Typography variant="h5">Facebook</Typography>
                        <Typography className={classes.statNumber}>20543+</Typography>
                        <Typography className={classes.statLabel}>Nutzer</Typography>
                        <button className={classes.joinButton}>BEITRETEN</button>
                    </Box>
                    <Box className={classes.statCard}>
                        <Typography variant="h5">Discord</Typography>
                        <Typography className={classes.statNumber}>2000+</Typography>
                        <Typography className={classes.statLabel}>Nutzer</Typography>
                        <button className={classes.joinButton}>BEITRETEN</button>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};
