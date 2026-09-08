import { useState } from 'react';
import { Box, Typography } from '@mui/material';
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

/** the one line that installs ioBroker on a Linux system */
const INSTALL_COMMAND = 'curl -sLf https://iobroker.net/install.sh | bash -';

/** how long the "copied" confirmation stays up, in ms */
const COPY_CONFIRMATION_MS = 4000;

/**
 * Every target the page links to, in one place - the three downloads live outside this
 * project and change whenever a new image is built, so they should be findable without
 * reading the markup. `info` is optional: Windows has no page to point at.
 */
const PLATFORMS = [
    {
        key: 'docker',
        logo: DockerLogo,
        /**
         * The label/value rows at the foot of the card. What used to be the "details"
         * row is now the description above them - a sentence carries itself and needs
         * no label, and the rows that remain are the ones worth comparing side by side.
         */
        rows: ['platform'],
        download: 'https://hub.docker.com/r/buanet/iobroker/',
        info: 'https://docs.buanet.de/iobroker-docker-image/',
    },
    {
        key: 'raspberry',
        logo: RaspberryLogo,
        rows: ['platform', 'password'],
        download: 'https://iobroker.live/images/ioBroker-image-RPi_5_2025_11_26.zip',
        info: 'https://github.com/ioBroker/raspi-image',
    },
    {
        key: 'windows',
        logo: WindowsLogo,
        rows: ['platform'],
        download: 'https://iobroker.live/images/win/iobroker-latest-windows-installer.exe',
        info: undefined,
    },
] as const;

/**
 * The page in our own documentation that explains when a prepared image is needed.
 * The app routes on the hash, so an internal target is written as one - `CustomButton`
 * renders a plain anchor and the router picks the change up like any other link.
 */
const LINUX_INFO_HREF = '/docs/install/linux.md';

const InstallationPage = (): React.ReactNode => {
    const { classes } = useStyles();
    const [copied, setCopied] = useState(false);

    const copyCommand = async (): Promise<void> => {
        try {
            await navigator.clipboard.writeText(INSTALL_COMMAND);
            setCopied(true);
            setTimeout((): void => setCopied(false), COPY_CONFIRMATION_MS);
        } catch (e) {
            console.error('Cannot copy to clipboard', e);
        }
    };

    return (
        <Box className={classes.pageWrapper}>
            <Box className={classes.pageContainer}>
                <SectionTitle sx={{ marginBottom: '8px !important' }}>{I18n.t('installation.title')}</SectionTitle>
                <Typography className={classes.subtitle}>{I18n.t('installation.subtitle')}</Typography>

                {/* The recommended way, given the room it deserves: one command, copied in one click. */}
                <Box className={classes.linuxCard}>
                    <Box className={classes.cardHeader}>
                        <Typography className={classes.cardTitle}>Linux</Typography>
                        <img
                            src={LinuxLogo}
                            alt=""
                            aria-hidden
                            className={classes.linuxIcon}
                        />
                    </Box>

                    <Typography className={classes.linuxSubHeader}>{I18n.t('installation.linux.simplest')}</Typography>

                    <Box className={classes.commandRow}>
                        <Box className={classes.commandBox}>
                            <code className={classes.commandText}>{INSTALL_COMMAND}</code>
                            <Box
                                component="button"
                                type="button"
                                title={I18n.t('installation.linux.copy')}
                                className={classes.copyButton}
                                onClick={copyCommand}
                            >
                                <img
                                    src={CopyIcon}
                                    alt=""
                                    aria-hidden
                                    className={classes.copyIcon}
                                />
                            </Box>
                        </Box>
                        {/* the fading label is the only feedback, so it is announced as well */}
                        <Box
                            className={classes.copyConfirmation}
                            style={{ opacity: copied ? 1 : 0 }}
                            role="status"
                        >
                            {copied ? I18n.t('installation.linux.copied') : ''}
                        </Box>
                    </Box>

                    <Typography className={classes.hintText}>
                        <img
                            src={AlertIcon}
                            alt=""
                            aria-hidden
                            className={classes.alertIcon}
                        />
                        {I18n.t('installation.linux.hint')}
                    </Typography>

                    <Box className={classes.imageInfoBox}>
                        <Box className={classes.imageInfoText}>
                            <Typography className={classes.imageTextHeader}>
                                {I18n.t('installation.linux.imageTitle')}
                            </Typography>
                            <Typography className={classes.imageText}>
                                {I18n.t('installation.linux.imageText')}
                            </Typography>
                        </Box>
                        <CustomButton
                            variant="secondary"
                            href={LINUX_INFO_HREF}
                        >
                            {I18n.t('installation.linux.info')}
                        </CustomButton>
                    </Box>
                </Box>

                {/* The alternatives, one card each - same shape, so they compare at a glance. */}
                <Box className={classes.cardsGrid}>
                    {PLATFORMS.map(platform => (
                        <Box
                            key={platform.key}
                            className={classes.card}
                        >
                            <Box className={classes.cardHeader}>
                                <Typography className={`${classes.cardTitle} ${classes.platformCardTitle}`}>
                                    {I18n.t(`installation.${platform.key}.title`)}
                                </Typography>
                                <img
                                    src={platform.logo}
                                    alt=""
                                    aria-hidden
                                    className={classes.cardIcon}
                                />
                            </Box>

                            {/* what this way is, in one sentence - it takes the slack in the
                                card, so the rows and buttons below line up across all three */}
                            <Typography className={classes.cardDescription}>
                                {I18n.t(`installation.${platform.key}.detailsValue`)}
                            </Typography>

                            <Box className={classes.detailsText}>
                                {platform.rows.map(row => (
                                    <Box
                                        key={row}
                                        className={classes.detailsRow}
                                    >
                                        <span className={classes.detailsLabel}>
                                            {I18n.t(`installation.${platform.key}.${row}`)}
                                        </span>
                                        <span className={classes.detailsValue}>
                                            {I18n.t(`installation.${platform.key}.${row}Value`)}
                                        </span>
                                    </Box>
                                ))}
                                {/* the image ships with a known password - saying so is only half the job */}
                                {platform.key === 'raspberry' ? (
                                    <Typography className={classes.passwordHint}>
                                        {I18n.t('installation.raspberry.passwordHint')}
                                    </Typography>
                                ) : null}
                            </Box>

                            <Box className={classes.cardActions}>
                                {/* Windows has no page to point at - that card carries one button */}
                                {platform.info ? (
                                    <CustomButton
                                        variant="secondary"
                                        href={platform.info}
                                        target="_blank"
                                    >
                                        {I18n.t(`installation.${platform.key}.info`)}
                                    </CustomButton>
                                ) : null}
                                <CustomButton
                                    variant="primary"
                                    href={platform.download}
                                >
                                    {I18n.t(`installation.${platform.key}.download`)}
                                </CustomButton>
                            </Box>
                        </Box>
                    ))}
                </Box>
            </Box>
        </Box>
    );
};

export default InstallationPage;
