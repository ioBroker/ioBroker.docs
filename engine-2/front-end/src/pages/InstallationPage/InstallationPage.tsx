import {
    Box,
    Button,
    Grid,
    Paper,
    Typography,
} from '@mui/material';
import { useStyles } from './InstallationPage.styles';

import LaptopIcon from '@mui/icons-material/Laptop';
import WidgetsOutlinedIcon from '@mui/icons-material/WidgetsOutlined';
import MemoryIcon from '@mui/icons-material/Memory';
import WindowIcon from '@mui/icons-material/Window';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';



const InstallationPage = () => {
    const { classes } = useStyles();

    return (
        <Box className={classes.pageContainer}>
            <Typography variant="h1" align="center" className={classes.title}>
                // IOBROKER INSTALLATION
            </Typography>
            <Typography variant="body1" className={classes.subtitle}>
                ioBroker lässt sich auf allen Systemen installieren, die Node.js unterstützen und genügend RAM haben.
            </Typography>

            <Grid container rowSpacing="32px" columnSpacing="24px">
                <Grid item xs={12}>
                    <Paper className={classes.linuxCard}>
                        <Box>
                            <Box className={classes.cardHeader}>
                                <Typography variant="h4" className={classes.cardTitle}>
                                    Linux
                                </Typography>
                                <LaptopIcon className={classes.cardIcon} />
                            </Box>
                            <Typography variant="body1" sx={{ mb: 2 }}>
                                Die einfachste Möglichkeit, ioBroker auf einem Linux-System zu installieren, ist mit folgendem Befehl:
                            </Typography>
                            <Box className={classes.commandBox}>
                                <span>curl -sLf https://iobroker.net/install.sh | bash -</span>
                                <ContentCopyIcon className={classes.copyButton} titleAccess="Copy" />
                            </Box>
                            <Typography className={classes.hintText}>
                                <span style={{ marginRight: '8px' }}>▲</span> Hinweis: Die Installation kann je nach System einige Minuten dauern.
                            </Typography>
                        </Box>
                        <Box mt={4}>
                            <Typography variant="h6" sx={{ mb: 1 }}>
                                Wann benötige ich ein Image?
                            </Typography>
                            <Typography variant="body2" color="text.disabled" sx={{ mb: 2 }}>
                                Ein vorkonfiguriertes Image ist nur erforderlich, wenn das Installationsskript nicht funktioniert oder keine Internetverbindung verfügbar ist.
                            </Typography>
                            <Button variant="outlined" className={classes.buttonSecondary}>
                                INFO
                            </Button>
                        </Box>
                    </Paper>
                </Grid>
                <Grid item xs={12}>
                    <Grid container rowSpacing="32px" columnSpacing="24px">
                        <Grid item xs={12} md={6}>
                            <Paper className={classes.card}>
                                <Box>
                                    <Box className={classes.cardHeader}>
                                        <Typography variant="h5" className={classes.cardTitle}>
                                            DOCKER
                                        </Typography>
                                        <WidgetsOutlinedIcon className={classes.cardIcon} />
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
                        </Grid>


                        <Grid item xs={12} md={6}>
                            <Paper className={classes.card}>
                                <Box>
                                    <Box className={classes.cardHeader}>
                                        <Typography variant="h5" className={classes.cardTitle}>
                                            RASPBERRY PI S
                                        </Typography>
                                        <MemoryIcon className={classes.cardIcon} />
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
                        </Grid>


                        <Grid item xs={12} md={6}>
                            <Paper className={classes.card}>
                                <Box>
                                    <Box className={classes.cardHeader}>
                                        <Typography variant="h5" className={classes.cardTitle}>
                                            WINDOWS
                                        </Typography>
                                        <WindowIcon className={classes.cardIcon} />
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
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Box>
    );
};

export default InstallationPage;