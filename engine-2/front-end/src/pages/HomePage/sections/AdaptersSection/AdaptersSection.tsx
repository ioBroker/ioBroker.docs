import React from 'react';
import { Box, Typography } from '@mui/material';
import { useStyles } from './AdaptersSection.styles';
import { SectionTitle } from '../../components/SectionTitle';
import { StyledButton } from '../../components/StyledButton';

const PlaceholderIcon = ({ color = '#fff' }) => <Box sx={{ width: 32, height: 32, color }}>Icon</Box>;

export const AdaptersSection: React.FC = () => {
    const { classes } = useStyles();
    const adapterIcons = Array(18).fill(0);
    
    return (
        <Box component="section" className={classes.section}>
            <Box className={classes.container}>
                <SectionTitle>ADAPTER</SectionTitle>
                <Box className={classes.adaptersContent}>
                    <Box className={classes.adaptersText}>
                        <Typography paragraph>
                            Adapter sind die Schnittstellen zu verschiedenen Geräten, Diensten und Technologien. Ein Adapter fungiert dabei wie ein "Übersetzer", der Daten von einem spezifischen Gerät oder Protokoll in ein standardisiertes Format bringt, das ioBroker versteht.
                        </Typography>
                        <StyledButton>640+ ADAPTER</StyledButton>
                    </Box>
                    <Box className={classes.adaptersGrid}>
                        {/* {adapterIcons.map((_, index) => (
                            <Box key={index} className={classes.adapterIcon}>
                                <PlaceholderIcon />
                            </Box>
                        ))} */}
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};
