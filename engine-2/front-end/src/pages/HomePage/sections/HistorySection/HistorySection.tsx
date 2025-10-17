import React from 'react';
import { Box, Typography } from '@mui/material';
import { useStyles } from './HistorySection.styles';
import { SectionTitle } from '../../components/SectionTitle';
import { StyledButton } from '../../components/StyledButton';

export const HistorySection: React.FC = () => {
    const { classes, cx } = useStyles();
    return (
        <Box component="section" className={cx(classes.section, classes.historySection)}>
            <Box className={classes.container}>
                <Box className={classes.historyLogo}>
                    10+
                </Box>
                <Typography className={classes.historyTitle}>
                    JAHRE BEGEISTERUNG FÜR SMART-HOME
                </Typography>
                <Typography paragraph>
                    Was 2013 als Wunsch nach Automatisierung für das eigene Zuhause begann, entwickelte sich zu einer flexiblen und leistungsstarken Plattform mit einer großen Community.
                </Typography>
                <StyledButton>IOBROKER GESCHICHTE</StyledButton>
            </Box>
        </Box>
    );
};
