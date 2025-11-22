import React from 'react';
import { Box, Typography } from '@mui/material';
import { useStyles } from './PlatformSection.styles';
import { StyledButton } from '../../../../components/StyledButton/StyledButton';

export const PlatformSection: React.FC = () => {
    const { classes } = useStyles();
    return (
        <Box
            component="section"
            className={classes.platformSection}
        >
            <Box className={classes.container}>
                <Box className={classes.descriptionWrapper}>
                    <Box className={classes.descriptionContainer}>
                        <Box className={classes.platformTitleWrapper}>
                            <Typography
                                variant="h1"
                                className={classes.platformTitle}
                            >
                                Eine Plattform,
                            </Typography>
                            <Typography
                                variant="h1"
                                className={classes.platformTitleBlue}
                            >
                                unendliche Möglichkeiten
                            </Typography>
                        </Box>
                        <Typography className={classes.platformSubtitle}>
                            /* ioBroker ist viel mehr als nur eine Software - es ist eine leistungsstarke und flexible
                            Open-Source-Plattform für Smart Home und IoT-Integration.
                        </Typography>
                        <Typography className={classes.platformSubtitle}>
                            Mit ioBroker kannst du Geräte unterschiedlichster Hersteller und Protokolle wie Zigbee, KNX,
                            MQTT, Homematic, Modbus und viele mehr miteinander verbinden und zentral steuern. So
                            entsteht ein herstellerunabhängiges Smart Home, das sich ganz nach deinen Wünschen anpassen
                            und erweitern lässt.
                        </Typography>
                        <Typography className={classes.platformSubtitle}>
                            ioBroker ist für alle gedacht - von Einsteigern, die mit wenigen Klicks einfache
                            Automatisierungen erstellen, bis hin zu Technikbegeisterten, die komplexe Szenarien mit
                            JavaScript, Blockly oder Node-RED umsetzen möchten. Dabei läuft die gesamte Steuerung über
                            eine intuitive grafische Oberfläche, ohne dass komplizierte Konfigurationsdateien bearbeitet
                            werden müssen. */
                        </Typography>
                        <StyledButton
                            sx={{
                                marginTop: { xs: '20px', sm: '20px', md: '72px' },
                                height: { xs: '44px', sm: '44px', md: '60px' },
                                width: { xs: 'calc(100% - 0px)', sm: '368px', md: '533px' },
                                maxWidth: '867px',
                                padding: '10px 24px',
                                fontSize: '16px',
                                alignSelf: 'end',
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
