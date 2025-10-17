import React from 'react';
import { Box, Typography } from '@mui/material';
import { useStyles } from './InstallationsSection.styles';
import { SectionTitle } from '../../components/SectionTitle';
import { StyledButton } from '../../components/StyledButton';

export const InstallationsSection: React.FC = () => {
    const { classes } = useStyles();
    return (
        <Box component="section" className={classes.section}>
            <Box className={classes.container}>
                <SectionTitle>INSTALLATIONEN</SectionTitle>
                <Typography className={classes.installationsNumber}>73 898</Typography>
                <Box sx={{ textAlign: 'center' }}>
                    <StyledButton>ALLE STATISTIKEN</StyledButton>
                </Box>
            </Box>
        </Box>
    );
};
