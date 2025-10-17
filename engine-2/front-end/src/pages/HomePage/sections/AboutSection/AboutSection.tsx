import React from 'react';
import { Box, Typography, IconButton } from '@mui/material';
import { useStyles } from './AboutSection.styles';
import { SectionTitle } from '../../components/SectionTitle';

const ArrowIcon = () => <Typography component="span">→</Typography>;

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
                <SectionTitle>ÜBER IOBROKER</SectionTitle>
                {items.map(item => (
                    <Box key={item.title} className={classes.infoCard}>
                        <Box>
                            <Typography variant="h6" component="h3">{item.title}</Typography>
                            <Typography variant="body2">{item.description}</Typography>
                        </Box>
                        <IconButton><ArrowIcon /></IconButton>
                    </Box>
                ))}
            </Box>
        </Box>
    );
};
