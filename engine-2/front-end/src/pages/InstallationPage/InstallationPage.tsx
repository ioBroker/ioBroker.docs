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
import { I18n } from '../../utils/i18n';

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
                            fontSize: {
                                xs: '20px !important', sm: '48px !important', '@media (max-width:400px)': {
                                    fontSize: '18px !important',
                                }
                            },
                        }}
                    >
                        {I18n.t('installation.title')}
                    </SectionTitle>
                </Box>
                <Typography
                    variant="body1"
                    className={classes.subtitle}
                >
                    {I18n.t('installation.subtitle')}
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
                                {I18n.t('installation.linux.simplest')}
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
                                    {I18n.t('installation.linux.copied')}
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
                                {I18n.t('installation.linux.hint')}
                            </Typography>
                        </Box>
                        <Box className={classes.imageInfoBox}>
                            <Box>
                                <Typography
                                    variant="h6"
                                    sx={{ mb: 1 }}
                                    className={classes.imageTextHeader}
                                >
                                    {I18n.t('installation.linux.imageTitle')}
                                </Typography>
                                <Typography
                                    variant="body2"
                                    sx={{ mb: 2 }}
                                    className={classes.imageText}
                                >
                                    {I18n.t('installation.linux.imageText')}
                                </Typography>
                            </Box>
                            <Button className={classes.buttonSecondaryLinux}>
                                {I18n.t('installation.linux.info')}
                            </Button>
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
                                        {I18n.t('installation.docker.title')}
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
                                        {I18n.t('installation.docker.platform')}
                                    </Typography>
                                    <Typography
                                        variant="body2"
                                        component="span"
                                    >
                                        {I18n.t('installation.docker.platformValue')}
                                    </Typography>
                                    <Typography
                                        variant="body2"
                                        component="span"
                                        className={classes.detailsLabel}
                                    >
                                        {I18n.t('installation.docker.details')}
                                    </Typography>
                                    <Typography
                                        variant="body2"
                                        component="span"
                                    >
                                        {I18n.t('installation.docker.detailsValue')}
                                    </Typography>
                                </Box>
                            </Box>
                            <Box className={classes.cardActions}>
                                <CustomButton
                                    variant="primary"
                                    className={classes.buttonPrimary}
                                >
                                    {I18n.t('installation.docker.download')}
                                </CustomButton>
                                <Button
                                    fullWidth
                                    variant="outlined"
                                    className={classes.buttonSecondary}
                                >
                                    {I18n.t('installation.docker.info')}
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
                                        {I18n.t('installation.raspberry.title')}
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
                                        {I18n.t('installation.raspberry.platform')}
                                    </Typography>
                                    <Typography
                                        variant="body2"
                                        component="span"
                                    >
                                        {I18n.t('installation.raspberry.platformValue')}
                                    </Typography>
                                    <Typography
                                        variant="body2"
                                        component="span"
                                        className={classes.detailsLabel}
                                    >
                                        {I18n.t('installation.raspberry.details')}
                                    </Typography>
                                    <Typography
                                        variant="body2"
                                        component="span"
                                    >
                                        {I18n.t('installation.raspberry.detailsValue')}
                                    </Typography>
                                    <Typography
                                        variant="body2"
                                        component="span"
                                        className={classes.detailsLabel}
                                    >
                                        {I18n.t('installation.raspberry.password')}
                                    </Typography>
                                    <Typography
                                        variant="body2"
                                        component="span"
                                    >
                                        {I18n.t('installation.raspberry.passwordValue')}
                                    </Typography>
                                </Box>
                            </Box>
                            <Box className={classes.cardActions}>
                                <CustomButton
                                    variant="primary"
                                    className={classes.buttonPrimary}
                                >
                                    {I18n.t('installation.raspberry.download')}
                                </CustomButton>
                                <Button
                                    fullWidth
                                    variant="outlined"
                                    className={classes.buttonSecondary}
                                >
                                    {I18n.t('installation.raspberry.info')}
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
                                        {I18n.t('installation.windows.title')}
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
                                        {I18n.t('installation.windows.platform')}
                                    </Typography>
                                    <Typography
                                        variant="body2"
                                        component="span"
                                    >
                                        {I18n.t('installation.windows.platformValue')}
                                    </Typography>
                                    <Typography
                                        variant="body2"
                                        component="span"
                                        className={classes.detailsLabel}
                                    >
                                        {I18n.t('installation.windows.details')}
                                    </Typography>
                                    <Typography
                                        variant="body2"
                                        component="span"
                                    >
                                        {I18n.t('installation.windows.detailsValue')}
                                    </Typography>
                                </Box>
                            </Box>
                            <Box className={classes.cardActions}>
                                <CustomButton
                                    variant="primary"
                                    className={classes.buttonPrimary}
                                >
                                    {I18n.t('installation.windows.download')}
                                </CustomButton>
                                <Button
                                    fullWidth
                                    variant="outlined"
                                    className={classes.buttonSecondary}
                                >
                                    {I18n.t('installation.windows.info')}
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
