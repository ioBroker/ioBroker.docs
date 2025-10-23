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
                    Eine Plattform, <br />
                    <span className={classes.platformTitleBlue}>
                        unendliche Möglichkeiten
                    </span>
                </Typography>
                <Box className={classes.descriptionWrapper}>
                    <Box className={classes.descriptionContainer}>
                        <Typography className={classes.platformSubtitle}>
                            /* ioBroker ist viel mehr als nur eine Software - es ist eine leistungsstarke und flexible Open-Source-Plattform für Smart Home und IoT-Integration. */
                        </Typography>
                        <Typography className={classes.platformSubtitle}>
                            Mit ioBroker kannst du Geräte unterschiedlichster Hersteller und Protokolle wie Zigbee, KNX, MQTT, Homematic, Modbus und viele mehr miteinander verbinden und zentral steuern. So entsteht ein herstellerunabhängiges Smart Home, das sich ganz nach deinen Wünschen anpassen und erweitern lässt.
                        </Typography>
                        <Typography className={classes.platformSubtitle}>
                            ioBroker ist für alle gedacht - von Einsteigern, die mit wenigen Klicks einfache Automatisierungen erstellen, bis hin zu Technikbegeisterten, die komplexe Szenarien mit JavaScript, Blockly oder Node-RED umsetzen möchten. Dabei läuft die gesamte Steuerung über eine intuitive grafische Oberfläche, ohne dass komplizierte Konfigurationsdateien bearbeitet werden müssen.
                        </Typography>
                        <StyledButton
                            sx={{
                                marginTop: { xs: '40px', sm: '80px', md: '130px' },
                                height: { xs: '50px', sm: '60px', md: '65px' },
                                width: '100%',
                                maxWidth: '867px',
                                padding: '10px 24px',
                            }}
                        >
                            MEHR
                        </StyledButton>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};