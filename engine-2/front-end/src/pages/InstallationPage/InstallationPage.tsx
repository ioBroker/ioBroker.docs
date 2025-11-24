import { useState } from 'react';
import { Box, Button, Paper, Typography } from '@mui/material';
import { useStyles } from './InstallationPage.styles';
import { SectionTitle } from '../../components/SectionTitle/SectionTitle';
import { CustomButton } from '../../components/Button/Button';
import LinuxLogo from '../../assets/img/LinuxLogo.png';
import DockerLogo from '../../assets/img/Docker.png';
import RaspberryLogo from '../../assets/img/Raspberry.png';
import WindowsLogo from '../../assets/img/Windows_logo.png';
import CopyIcon from '../../assets/img/Copy.png';
import AlertIcon from '../../assets/img/Alert.png';

const InstallationPage = () => {
    const { classes } = useStyles();
    const [visible, setVisible] = useState(false);

    return (
        <Box className={classes.pageWrapper}>
            <Box className={classes.pageContainer}>
                <Box className={classes.title}>
                    <SectionTitle
                        sx={{
                            marginBottom: { xs: '8px !important', md: '8px !important' },
                            fontSize: { xs: '20px !important', sm: '48px !important' },
                        }}
                    >
                        IOBROKER INSTALLATION
                    </SectionTitle>
                </Box>
                <Typography
                    variant="body1"
                    className={classes.subtitle}
                >
                    ioBroker lässt sich auf allen Systemen installieren, die Node.js unterstützen und genügend RAM
                    haben.
                </Typography>
                <Box className={classes.cardContainer}>
                    <Paper className={classes.linuxCard}>
                        <Box>
                            <Box className={classes.cardHeader}>
                                <Typography
                                    variant="h4"
                                    className={classes.cardTitle}
                                >
                                    Linux
                                </Typography>
                                <img
                                    src={LinuxLogo}
                                    alt="linuxLogo"
                                    className={classes.linuxIcon}
                                />
                            </Box>
                            <Typography
                                variant="body1"
                                className={classes.linuxSubHeader}
                            >
                                Die einfachste Möglichkeit, ioBroker auf einem Linux-System zu installieren, ist mit
                                folgendem Befehl:
                            </Typography>
                            <Box className={classes.commandBox}>
                                <span className={classes.commandBoxText}>
                                    curl -sLf https://iobroker.net/install.sh | bash -
                                </span>
                                <img
                                    src={CopyIcon}
                                    alt="copyIcon"
                                    className={classes.copyButton}
                                    onClick={async (): Promise<void> => {
                                        // Copy to clipboard ' curl -sLf https://iobroker.net/install.sh | bash -'
                                        try {
                                            await navigator.clipboard.writeText(
                                                'curl -sLf https://iobroker.net/install.sh | bash -',
                                            );
                                            setVisible(true);
                                            setTimeout((): void => {
                                                setVisible(false);
                                            }, 4000);
                                        } catch (e) {
                                            console.error('Cannot copy to clipboard', e);
                                        }
                                    }}
                                />
                                <Box
                                    className={classes.copyConfirmation}
                                    style={{ opacity: visible ? 1 : 0 }}
                                >
                                    Copied!
                                </Box>
                            </Box>
                            <Typography className={classes.hintText}>
                                <span className={classes.alertIconWrapper}>
                                    <img
                                        src={AlertIcon}
                                        alt="alertIcon"
                                        className={classes.alertIcon}
                                    />
                                </span>{' '}
                                Hinweis: Die Installation kann je nach System einige Minuten dauern.
                            </Typography>
                        </Box>
                        <Box className={classes.imageInfoBox}>
                            <Box>
                                <Typography
                                    variant="h6"
                                    sx={{ mb: 1 }}
                                    className={classes.imageTextHeader}
                                >
                                    Wann benötige ich ein Image?
                                </Typography>
                                <Typography
                                    variant="body2"
                                    sx={{ mb: 2 }}
                                    className={classes.imageText}
                                >
                                    Ein vorkonfiguriertes Image ist nur erforderlich, wenn das Installationsskript nicht
                                    funktioniert oder keine Internetverbindung verfügbar ist. In den meisten Fällen
                                    reicht der oben genannte Befehl aus.
                                </Typography>
                            </Box>
                            <Button className={classes.buttonSecondaryLinux}>INFO</Button>
                        </Box>
                    </Paper>
                    <Box className={classes.cardsWrapper}>
                        <Paper className={classes.card}>
                            <Box className={classes.cardContent}>
                                <Box className={classes.cardHeader}>
                                    <Typography
                                        variant="h5"
                                        className={classes.cardTitle}
                                    >
                                        DOCKER
                                    </Typography>
                                    <img
                                        src={DockerLogo}
                                        alt="dockerLogo"
                                        className={classes.cardIcon}
                                    />
                                </Box>
                                <Box className={classes.detailsText}>
                                    <Typography
                                        variant="body2"
                                        component="span"
                                        className={classes.detailsLabel}
                                    >
                                        Platform:
                                    </Typography>
                                    <Typography
                                        variant="body2"
                                        component="span"
                                    >
                                        Docker
                                    </Typography>
                                    <Typography
                                        variant="body2"
                                        component="span"
                                        className={classes.detailsLabel}
                                    >
                                        Details:
                                    </Typography>
                                    <Typography
                                        variant="body2"
                                        component="span"
                                    >
                                        Flexibles Docker-Image
                                    </Typography>
                                </Box>
                            </Box>
                            <Box className={classes.cardActions}>
                                <CustomButton
                                    variant="primary"
                                    className={classes.buttonPrimary}
                                >
                                    DOWNLOAD
                                </CustomButton>
                                <Button
                                    fullWidth
                                    variant="outlined"
                                    className={classes.buttonSecondary}
                                >
                                    INFO
                                </Button>
                            </Box>
                        </Paper>

                        <Paper className={classes.card}>
                            <Box className={classes.cardContent}>
                                <Box className={classes.cardHeader}>
                                    <Typography
                                        variant="h5"
                                        className={classes.cardTitle}
                                    >
                                        RASPBERRY PI S
                                    </Typography>
                                    <img
                                        src={RaspberryLogo}
                                        alt="raspberryLogo"
                                        className={classes.cardIcon}
                                    />
                                </Box>
                                <Box className={classes.detailsText}>
                                    <Typography
                                        variant="body2"
                                        component="span"
                                        className={classes.detailsLabel}
                                    >
                                        Platform:
                                    </Typography>
                                    <Typography
                                        variant="body2"
                                        component="span"
                                    >
                                        Raspberry OS
                                    </Typography>
                                    <Typography
                                        variant="body2"
                                        component="span"
                                        className={classes.detailsLabel}
                                    >
                                        Details:
                                    </Typography>
                                    <Typography
                                        variant="body2"
                                        component="span"
                                    >
                                        Vorgefertigtes Raspberry OS Image
                                    </Typography>
                                    <Typography
                                        variant="body2"
                                        component="span"
                                        className={classes.detailsLabel}
                                    >
                                        Standart Passwort:
                                    </Typography>
                                    <Typography
                                        variant="body2"
                                        component="span"
                                    >
                                        2024=smart!
                                    </Typography>
                                </Box>
                            </Box>
                            <Box className={classes.cardActions}>
                                <CustomButton
                                    variant="primary"
                                    className={classes.buttonPrimary}
                                >
                                    DOWNLOAD
                                </CustomButton>
                                <Button
                                    fullWidth
                                    variant="outlined"
                                    className={classes.buttonSecondary}
                                >
                                    INFO
                                </Button>
                            </Box>
                        </Paper>

                        <Paper className={classes.card}>
                            <Box className={classes.cardContent}>
                                <Box className={classes.cardHeader}>
                                    <Typography
                                        variant="h5"
                                        className={classes.cardTitle}
                                    >
                                        WINDOWS
                                    </Typography>
                                    <img
                                        src={WindowsLogo}
                                        alt="windowsLogo"
                                        className={classes.cardIcon}
                                    />
                                </Box>
                                <Box className={classes.detailsText}>
                                    <Typography
                                        variant="body2"
                                        component="span"
                                        className={classes.detailsLabel}
                                    >
                                        Platform:
                                    </Typography>
                                    <Typography
                                        variant="body2"
                                        component="span"
                                    >
                                        Windows 32 / 64 Bit
                                    </Typography>
                                    <Typography
                                        variant="body2"
                                        component="span"
                                        className={classes.detailsLabel}
                                    >
                                        Details:
                                    </Typography>
                                    <Typography
                                        variant="body2"
                                        component="span"
                                    >
                                        Einfache Installation mit dem Windows-Installer
                                    </Typography>
                                </Box>
                            </Box>
                            <Box className={classes.cardActions}>
                                <CustomButton
                                    variant="primary"
                                    className={classes.buttonPrimary}
                                >
                                    DOWNLOAD
                                </CustomButton>
                                <Button
                                    fullWidth
                                    variant="outlined"
                                    className={classes.buttonSecondary}
                                >
                                    INFO
                                </Button>
                            </Box>
                        </Paper>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};

export default InstallationPage;
