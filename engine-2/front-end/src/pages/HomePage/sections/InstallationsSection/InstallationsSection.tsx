import React from 'react';
import { Box, Typography } from '@mui/material';
import { useStyles } from './InstallationsSection.styles';
import { SectionTitle } from '../../components/SectionTitle';
import { StyledButton } from '../../components/StyledButton';
import Divider from '../../../../components/Divider/Divider';
import { useScrollProgress } from '../../../../hooks/useScrollProgress';

export const InstallationsSection: React.FC = () => {
    const { classes } = useStyles();
    const { scrollPosition, sectionRef } = useScrollProgress();
    return (
        <>
            <Box component="section" className={classes.section} ref={sectionRef}>
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
            <Divider
                position={scrollPosition}
                parentWidth={window.innerWidth}
                style={{borderBottom: '1px solid #3399CC4D'}}
                thick={1}
                sx={{ marginBottom: '26px', marginTop: '8px', borderBottom: '1px' }}
            />
        </>
    );
};
