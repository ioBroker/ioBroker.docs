import {
    Box,
    Button,
    Paper,
    Typography,
} from '@mui/material';
import { useStyles } from './InstallationPage.styles';
import { SectionTitle } from '../../components/SectionTitle/SectionTitle';
import LinuxLogo from '../../assets/img/LinuxLogo.png';
import DockerLogo from '../../assets/img/Docker.png';
import RaspberryLogo from '../../assets/img/Raspberry.png';
import WindowsLogo from '../../assets/img/Windows_logo.png';
import CopyIcon from '../../assets/img/Copy.png'
import AlertIcon from '../../assets/img/Alert.png'


const InstallationPage = () => {
    const { classes } = useStyles();

    return (
        <Box className={classes.pageContainer}>
             <Box className={classes.title}>
                    <SectionTitle sx={{ marginBottom: { xs: '8px !important', md: '8px !important' } }}>IOBROKER INSTALLATION</SectionTitle>
            </Box>
            <Typography variant="body1" className={classes.subtitle}>
                ioBroker lässt sich auf allen Systemen installieren, die Node.js unterstützen und genügend RAM haben.
            </Typography>

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: { xs: 4, md: 3 } }}>

                <Paper className={classes.linuxCard}>
                    <Box>
                        <Box className={classes.cardHeader}>
                            <Typography variant="h4" className={classes.cardTitle}>
                                Linux
                            </Typography>
                             <img
                                    src={LinuxLogo}
                                    alt='linuxLogo'
                                    className={classes.cardIcon}
                                    width={116}
                                    height={116}
                                />
                        </Box>
                        <Typography variant="body1" className={classes.linuxSubHeader}>
                            Die einfachste Möglichkeit, ioBroker auf einem Linux-System zu installieren, ist mit folgendem Befehl:
                        </Typography>
                        <Box className={classes.commandBox}>
                            <span className={classes.commandBoxText} >curl -sLf https://iobroker.net/install.sh | bash -</span>
                            <img
                                    src={CopyIcon}
                                    alt='copyIcon'
                                    className={classes.copyButton}
                                    width={32}
                                    height={32}
                                />
                        </Box>
                        <Typography className={classes.hintText}>
                            <span style={{ marginRight: '8px', marginTop: '6px'}}>
                                 <img
                                    src={AlertIcon}
                                    alt='alertIcon'
                                    className={classes.copyButton}
                                    width={18}
                                    height={18}
                                />
                                </span> Hinweis: Die Installation kann je nach System einige Minuten dauern.
                        </Typography>
                    </Box>
                    <Box  className={classes.imageInfoBox}>
                        <Box>
                        <Typography variant="h6" sx={{ mb: 1 }} className={classes.imageTextHeader} >
                            Wann benötige ich ein Image?
                        </Typography>
                        <Typography variant="body2" sx={{ mb: 2 }} className={classes.imageText}>
                            Ein vorkonfiguriertes Image ist nur erforderlich, wenn das Installationsskript nicht funktioniert oder keine Internetverbindung verfügbar ist.
                        </Typography>
                        </Box>
                        <Button variant="outlined" className={classes.buttonSecondaryLinux}>
                            INFO
                        </Button>
                    </Box>
                </Paper>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>

                    <Paper className={classes.card}>
                        <Box>
                            <Box className={classes.cardHeader}>
                                <Typography variant="h5" className={classes.cardTitle}>
                                    DOCKER
                                </Typography>
                                <img
                                    src={DockerLogo}
                                    alt='dockerLogo'
                                    className={classes.cardIcon}
                                />
                            </Box>
                            <Typography variant="body2" className={classes.detailsText}>
                                <strong>Plattform:</strong> Docker <strong>Details:</strong> Flexibles Docker-Image
                            </Typography>
                        </Box>
                        <Box className={classes.cardActions}>
                            <Button fullWidth variant="contained" className={classes.buttonPrimary}>DOWNLOAD</Button>
                            <Button fullWidth variant="outlined" className={classes.buttonSecondary}>INFO</Button>
                        </Box>
                    </Paper>

                    <Paper className={classes.card}>
                        <Box>
                            <Box className={classes.cardHeader}>
                                <Typography variant="h5" className={classes.cardTitle}>
                                    RASPBERRY PI S
                                </Typography>
                               <img
                                    src={RaspberryLogo}
                                    alt='raspberryLogo'
                                    className={classes.cardIcon}
                                />
                            </Box>
                            <Typography variant="body2" className={classes.detailsText}>
                                <strong>Plattform:</strong> Raspberry OS <strong>Details:</strong> Vorgefertigtes Raspberry OS Image <strong>Standart Passwort:</strong> 2024-smart!
                            </Typography>
                        </Box>
                        <Box className={classes.cardActions}>
                            <Button fullWidth variant="contained" className={classes.buttonPrimary}>DOWNLOAD</Button>
                            <Button fullWidth variant="outlined" className={classes.buttonSecondary}>INFO</Button>
                        </Box>
                    </Paper>

                    <Paper className={classes.card}>
                        <Box>
                            <Box className={classes.cardHeader}>
                                <Typography variant="h5" className={classes.cardTitle}>
                                    WINDOWS
                                </Typography>
                                <img
                                    src={WindowsLogo}
                                    alt='windowsLogo'
                                    className={classes.cardIcon}
                                />
                            </Box>
                            <Typography variant="body2" className={classes.detailsText}>
                                <strong>Plattform:</strong> Windows 32 / 64 Bit <strong>Details:</strong> Einfache Installation mit dem Windows-Installer
                            </Typography>
                        </Box>
                        <Box className={classes.cardActions}>
                            <Button fullWidth variant="contained" className={classes.buttonPrimary}>DOWNLOAD</Button>
                            <Button fullWidth variant="outlined" className={classes.buttonSecondary}>INFO</Button>
                        </Box>
                    </Paper>

                </Box>
            </Box>
        </Box>
    );
};

export default InstallationPage;