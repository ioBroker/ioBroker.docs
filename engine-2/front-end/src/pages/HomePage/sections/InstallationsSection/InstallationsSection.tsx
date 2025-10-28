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
                <Box sx={{ width: '100%', maxWidth: '1400px', textAlign: { xs: 'center', md: 'left' } }}>
                    <SectionTitle>INSTALLATIONEN</SectionTitle>
                </Box>
                <Typography className={classes.installationsNumber}>73 898</Typography>
                <Box sx={{ textAlign: { sm: 'center', md: 'right' } }}>
                    <StyledButton
                        sx={{
                            height: { sm: '80px', md: '60px' },
                            width: { sm: 'auto', md: '535px' },
                            maxWidth: '535px',
                            borderRadius: '10px!important'
                        }}
                    >ALLE STATISTIKEN</StyledButton>
                </Box>
            </Box>
        </Box>
    );
};
