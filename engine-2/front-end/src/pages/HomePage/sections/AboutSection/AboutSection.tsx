import React from 'react';
import { Box, Typography } from '@mui/material';
import { useStyles } from './AboutSection.styles';
import { SectionTitle } from '../../components/SectionTitle';
import { StyledButton } from '../../components/StyledButton';

export const AboutSection: React.FC = () => {
    const { classes } = useStyles();
    const items = [
        { title: 'ENORME FLEXIBILITÄT', description: 'Von einfachen „Wenn-dies-dann-das"-Szenarien bis hin zu komplexen Automatisierungen - ioBroker bietet grenzenlose Möglichkeiten mit Blockly und JavaScript.' },
        { title: 'OPEN-SOURCE', description: 'Als Open-Source-Projekt ist ioBroker nicht nur kostenlos zugänglich, sondern wird auch ständig von einer aktiven Community weiterentwickelt.' },
        { title: 'VISUALISIERUNG', description: 'Zahlreiche Optionen zur individuellen und intuitiven Gestaltung der Visualisierung, wie Vis-2, ioControl, Lovelace, HabPanel etc.' }
    ];

    return (
        <Box component="section" className={classes.section}>
            <Box className={classes.container}>
                <Box sx={{ width: '100%', maxWidth: '1311px', textAlign: { xs: 'center', md: 'left' }, mb: 4 }}>
                    <SectionTitle>ÜBER IOBROKER</SectionTitle>
                </Box>
                {items.map(item => (
                    <StyledButton
                        key={item.title}
                        sx={{
                            width: '100%',
                            minHeight: { xs: 'auto', md: '214px' },
                            padding: { xs: '20px', sm: '30px', md: '40px' },
                            marginBottom: '32px',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'flex-end',
                        }}
                        textSx={{
                            width: '100%',
                            maxWidth: '1010px'
                        }}
                        iconSx={{
                            alignSelf: 'flex-end',
                            mb: 1,
                            height: '40px',
                            width: '40px'
                        }}
                    >
                        <Box sx={{ textAlign: 'left', flex: 1 }}>
                            <Typography className={classes.itemTitle}>{item.title}</Typography>
                            <Typography className={classes.itemDescription}>{item.description}</Typography>
                        </Box>
                    </StyledButton>
                ))}
                <Box className={classes.buttonWrapper}>
                    <StyledButton
                        sx={{
                            marginTop: { xs: '20px', sm: '30px', md: '4px' },
                            height: { xs: '50px', sm: '60px', md: '80px' },
                            width: '100%',
                            padding: '10px 24px',
                            position: 'relative',
                            zIndex: 1
                        }}
                    >
                        MEHR
                    </StyledButton>
                </Box>
            </Box>
        </Box>
    );
};
