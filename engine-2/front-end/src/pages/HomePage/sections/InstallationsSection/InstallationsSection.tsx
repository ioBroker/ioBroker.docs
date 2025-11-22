import React from 'react';
import { Box, Typography } from '@mui/material';
import { useStyles } from './InstallationsSection.styles';
import { SectionTitle } from '../../../../components/SectionTitle/SectionTitle';
import { StyledButton } from '../../../../components/StyledButton/StyledButton';
import Divider from '../../../../components/Divider/Divider';
import { useScrollProgress } from '../../../../hooks/useScrollProgress';

export const InstallationsSection: React.FC = () => {
    const { classes } = useStyles();
    const { scrollPosition, sectionRef } = useScrollProgress();
    return (
        <>
            <Box className={classes.sectionWrapper}>
                <Box
                    component="section"
                    className={classes.installationSection}
                    ref={sectionRef}
                >
                    <Box className={classes.container}>
                        <Box sx={{ width: '100%', maxWidth: '1400px', textAlign: { xs: 'left', md: 'left' } }}>
                            <SectionTitle>INSTALLATIONEN</SectionTitle>
                        </Box>
                        <Typography className={classes.installationsNumber}>73 898</Typography>
                        <Box sx={{ textAlign: { xs: 'center', sm: 'center', md: 'right' } }}>
                            <StyledButton
                                sx={{
                                    height: { xs: '44px', sm: '44px', md: '60px' },
                                    width: { xs: '368px', sm: '368px', md: '535px' },
                                    maxWidth: '535px',
                                    borderRadius: '10px!important',
                                }}
                            >
                                ALLE STATISTIKEN
                            </StyledButton>
                        </Box>
                    </Box>
                </Box>
            </Box>
            <Divider
                position={scrollPosition}
                parentWidth={window.innerWidth}
                style={{ borderBottom: '1px solid #3399CC4D' }}
                thick={1}
                sx={{ marginBottom: '26px', marginTop: '8px', borderBottom: '1px' }}
            />
        </>
    );
};
