import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Typography } from '@mui/material';
import { useStyles } from './AdaptersSection.styles';
import { StyledButton } from '../../../../components/StyledButton/StyledButton';
import { useAdapterCount } from '../../../../api/hooks/useAdapterCount';
import { I18n } from '../../../../utils/i18n';

import icon1 from '../../../../assets/img/Alexa.svg';
import icon2 from '../../../../assets/img/Pillips_hue.webp';
import icon3 from '../../../../assets/img/javascript_1.webp';
import icon4 from '../../../../assets/img/telegram.webp';
import icon5 from '../../../../assets/img/image_418.webp';
import icon6 from '../../../../assets/img/image_422.svg';
import icon7 from '../../../../assets/img/image_415.svg';
import icon8 from '../../../../assets/img/image_416.svg';
import icon9 from '../../../../assets/img/image_419.webp';
import icon10 from '../../../../assets/img/image_417.webp';
import icon11 from '../../../../assets/img/image_412.webp';
import icon12 from '../../../../assets/img/image_420.webp';
import icon13 from '../../../../assets/img/image_413.webp';
import icon14 from '../../../../assets/img/image_414.webp';
import icon15 from '../../../../assets/img/image_421.webp';
import icon16 from '../../../../assets/img/image_424.webp';
import icon17 from '../../../../assets/img/image_425.webp';
import icon18 from '../../../../assets/img/image_426.webp';
import icon19 from '../../../../assets/img/image_427.webp';
import icon20 from '../../../../assets/img/image_428.webp';
import icon21 from '../../../../assets/img/image_429.webp';
import icon22 from '../../../../assets/img/image_430.webp';
// The mobile grid needs 25 tiles, but only 22 icons existed, so the final three showed
// the same image three times. These come from the adapter-logo collection
// (public/<lang>/adapterref/) and fill the gap with actual adapters.
import icon23 from '../../../../assets/img/adapter_spotify.png';
import icon24 from '../../../../assets/img/adapter_unifi.png';
import icon25 from '../../../../assets/img/adapter_discord.png';

interface AdapterIcon {
    src: string;
    width: number;
    height: number;
    alt?: string;
}

export const AdaptersSection: React.FC = () => {
    const { classes } = useStyles();
    const navigate = useNavigate();
    const { data: adapterCount } = useAdapterCount();

    /*
     * The number carries a plus behind it, so it is a lower bound and not a count. Rounded down to
     * full tens it is true in any case and reads calmer: 798 becomes 790+ (Denis, 11.09.2026).
     */
    const totalAdapters = React.useMemo(() => Math.floor((adapterCount || 680) / 10) * 10, [adapterCount]);

    const adapterIcons: AdapterIcon[] = [
        { src: icon1, width: 48, height: 48, alt: 'Alexa' },
        { src: icon2, width: 48, height: 48, alt: 'Philips Hue' },
        { src: icon3, width: 48, height: 48, alt: 'JavaScript' },
        { src: icon4, width: 60, height: 60, alt: 'Telegram' },
        { src: icon5, width: 48, height: 48, alt: 'Zigbee' },
        { src: icon6, width: 60, height: 60, alt: 'Speedtest' },
        { src: icon7, width: 48, height: 48, alt: 'Sonoff' },
        { src: icon8, width: 48, height: 48, alt: 'AVM FRITZ!Box' },
        { src: icon9, width: 60, height: 34, alt: 'Tuya' },
        { src: icon10, width: 50, height: 50, alt: 'HomeMatic' },
        { src: icon11, width: 60, height: 60, alt: 'Shelly' },
        { src: icon12, width: 48, height: 48, alt: 'ioBroker Adapter' },
        { src: icon13, width: 48, height: 48, alt: 'MQTT' },
        { src: icon14, width: 60, height: 60, alt: 'InfluxDB' },
        { src: icon15, width: 60, height: 60, alt: 'Modbus' },
        { src: icon16, width: 48, height: 48, alt: 'Node-RED' },
        { src: icon17, width: 48, height: 48, alt: 'Photovoltaik' },
        { src: icon18, width: 48, height: 48, alt: 'KNX' },
        { src: icon19, width: 60, height: 60, alt: 'Tesla' },
        { src: icon20, width: 48, height: 48, alt: 'Kamera' },
        { src: icon21, width: 48, height: 48, alt: 'Daikin' },
        { src: icon22, width: 60, height: 60, alt: 'Mihome Vacuum' },
        { src: icon23, width: 48, height: 48, alt: 'Spotify' },
        { src: icon24, width: 48, height: 48, alt: 'UniFi' },
        { src: icon25, width: 48, height: 48, alt: 'Discord' },
    ];

    const columnsDesktop = [4, 5, 4, 5, 4];
    const columnsMobile = [5, 5, 5, 5, 5];

    const renderGrid = (columns: number[], isMobile: boolean = false): React.JSX.Element[] => {
        let iconCounter = 0;
        const totalIcons = columns.reduce((sum, num) => sum + num, 0);
        const iconsToRender = [...adapterIcons];

        while (iconsToRender.length < totalIcons) {
            iconsToRender.push({ src: '', width: 0, height: 0 });
        }

        return columns.map((numIconsInColumn, colIndex) => {
            const columnIcons = iconsToRender.slice(iconCounter, iconCounter + numIconsInColumn);
            iconCounter += numIconsInColumn;

            const shouldOffset = isMobile ? colIndex % 2 === 0 : numIconsInColumn === 5;

            return (
                <Box
                    key={colIndex}
                    className={`${classes.adapterColumn} ${shouldOffset ? classes.offsetColumn : ''}`}
                >
                    {columnIcons.map((icon, itemIndex) => (
                        <Box
                            key={itemIndex}
                            className={classes.adapterIcon}
                        >
                            {icon.src ? (
                                <img
                                    src={icon.src}
                                    alt={icon.alt || `Adapter ${iconCounter - columnIcons.length + itemIndex + 1}`}
                                    className={classes.iconImage}
                                />
                            ) : null}
                        </Box>
                    ))}
                </Box>
            );
        });
    };

    return (
        <Box
            component="section"
            className={classes.adaptersSection}
        >
            <Box className={classes.container}>
                <Box className={classes.adaptersContent}>
                    <Box className={classes.adaptersTextSection}>
                        <Box>
                            <Typography
                                component="p"
                                className={classes.label}
                            >
                                <span className={classes.labelSlashes}>{'//'}</span>
                                {I18n.t('home.adapters.label')}
                            </Typography>
                            <Typography
                                component="h2"
                                className={classes.title}
                            >
                                {I18n.t('home.adapters.title1')}
                                <br />
                                <span className={classes.titleAccent}>{I18n.t('home.adapters.title2')}</span>
                            </Typography>
                        </Box>
                        <Typography
                            component="p"
                            className={classes.adaptersText}
                        >
                            {I18n.t('home.adapters.text')}
                        </Typography>
                        <Box className={classes.buttonWrapperDesktop}>
                            <StyledButton
                                arrow="right"
                                onClick={() => void navigate('/adapters')}
                                sx={{
                                    height: '60px',
                                    width: '100%',
                                    maxWidth: '867px',
                                    padding: '10px 24px',
                                    borderRadius: '10px',
                                    position: 'relative',
                                    zIndex: 1,
                                }}
                            >
                                {I18n.t('home.adapters.explore')}
                            </StyledButton>
                        </Box>
                    </Box>
                    <Box className={classes.adaptersGrid}>
                        <Box className={classes.desktopGrid}>{renderGrid(columnsDesktop, false)}</Box>
                        <Box className={classes.mobileGrid}>{renderGrid(columnsMobile, true)}</Box>
                        <Box className={classes.count}>
                            <Typography
                                component="span"
                                className={classes.countNumber}
                            >
                                {`${totalAdapters}+`}
                            </Typography>
                            <Typography
                                component="span"
                                className={classes.countWord}
                            >
                                {I18n.t('home.adapters.word')}
                            </Typography>
                        </Box>
                    </Box>
                    <Box className={classes.buttonWrapperMobile}>
                        <StyledButton
                            arrow="right"
                            onClick={() => void navigate('/adapters')}
                            sx={{
                                height: { sm: '44px', xs: '44px' },
                                width: { sm: '500px', xs: '100%' },
                                maxWidth: '867px',
                                padding: '10px 24px',
                                borderRadius: '10px',
                                position: 'relative',
                                zIndex: 1,
                            }}
                        >
                            {I18n.t('home.adapters.explore')}
                        </StyledButton>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};
