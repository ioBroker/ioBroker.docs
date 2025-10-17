import React from 'react';
import { Box, Typography } from '@mui/material';
import { useStyles } from './PlatformSection.styles';
import { StyledButton } from '../../components/StyledButton';

export const PlatformSection: React.FC = () => {
    const { classes } = useStyles();
    return (
        <Box component="section" className={classes.section}>
            <Box className={classes.container}>
                <Typography variant="h1" className={classes.platformTitle}>
                    Eine Plattform, <br /> unendliche Möglichkeiten
                </Typography>
                <Typography className={classes.platformSubtitle}>
                    ioBroker ist viel mehr als nur eine Software - es ist eine leistungsstarke und flexible Open-Source-Plattform für Smart Home und IoT-Integration.
                </Typography>
                <StyledButton>MEHR</StyledButton>
            </Box>
        </Box>
    );
};
