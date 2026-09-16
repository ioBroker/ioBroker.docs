import React from 'react';
import { Dialog, Box, Typography, useTheme } from '@mui/material';
import { useStyles } from './SupportModal.styles';
import { CustomButton } from '../../components/Button/Button';
import PayPalWhiteIcon from '../../assets/img/PayPal-visa-mastercardW.svg';
import AmazonWhiteIcon from '../../assets/img/amazonWhite.svg';
import PayPalBlueIcon from '../../assets/img/PayPal-visa-mastercardB.svg';
import AmazonBlueIcon from '../../assets/img/amazonBlue.svg';
import { I18n } from '../../utils/i18n';
import { EXTERNAL_LINKS } from '../../config/links';

interface SupportModalProps {
    open: boolean;
    onClose: () => void;
}

export const SupportModal: React.FC<SupportModalProps> = ({ open, onClose }) => {
    const { classes, cx } = useStyles();
    const theme = useTheme();
    const isLight = theme.palette.mode === 'light';

    /** the two ways to help, in one place - same shape, so they can be compared */
    const options = [
        {
            key: 'paypal',
            logo: isLight ? PayPalBlueIcon : PayPalWhiteIcon,
            alt: 'PayPal',
            href: EXTERNAL_LINKS.PAYPAL_DONATE,
        },
        {
            key: 'amazon',
            logo: isLight ? AmazonBlueIcon : AmazonWhiteIcon,
            alt: 'Amazon',
            /** see `logoTall`: the mark needs the full row height to hold its own */
            tall: true,
            href: EXTERNAL_LINKS.AMAZON,
        },
    ];

    return (
        <Dialog
            open={open}
            onClose={onClose}
            maxWidth="md"
            fullWidth
            scroll="body"
            slotProps={{
                paper: {
                    className: classes.dialogPaper,
                },
            }}
        >
            <Box
                component="button"
                type="button"
                aria-label={I18n.t('tooltip.close')}
                className={classes.closeButton}
                onClick={onClose}
            >
                <svg
                    className={classes.closeIcon}
                    viewBox="0 0 40 40"
                    fill="none"
                    aria-hidden
                >
                    <path
                        d="M20 24.2586L5.09506 39.1635C4.53739 39.7212 3.82763 40 2.96578 40C2.10393 40 1.39417 39.7212 0.836501 39.1635C0.278833 38.6058 0 37.8961 0 37.0342C0 36.1724 0.278833 35.4626 0.836501 34.9049L15.7414 20L0.836501 5.09506C0.278833 4.53739 0 3.82763 0 2.96578C0 2.10393 0.278833 1.39417 0.836501 0.836501C1.39417 0.278833 2.10393 0 2.96578 0C3.82763 0 4.53739 0.278833 5.09506 0.836501L20 15.7414L34.9049 0.836501C35.4626 0.278833 36.1724 0 37.0342 0C37.8961 0 38.6058 0.278833 39.1635 0.836501C39.7212 1.39417 40 2.10393 40 2.96578C40 3.82763 39.7212 4.53739 39.1635 5.09506L24.2586 20L39.1635 34.9049C39.7212 35.4626 40 36.1724 40 37.0342C40 37.8961 39.7212 38.6058 39.1635 39.1635C38.6058 39.7212 37.8961 40 37.0342 40C36.1724 40 35.4626 39.7212 34.9049 39.1635L20 24.2586Z"
                        fill="currentColor"
                    />
                </svg>
            </Box>

            <Box className={classes.header}>
                <Typography className={classes.title}>{I18n.t('support.title')}</Typography>
                <Typography className={classes.subtitle}>{I18n.t('support.subtitle')}</Typography>
                <Typography className={classes.description}>{I18n.t('support.description')}</Typography>
            </Box>

            <Box className={classes.optionsGrid}>
                {options.map(option => (
                    <Box
                        key={option.key}
                        className={classes.option}
                    >
                        <Box className={classes.logoBox}>
                            <img
                                src={option.logo}
                                alt={option.alt}
                                className={cx(classes.logo, option.tall && classes.logoTall)}
                            />
                        </Box>

                        <Typography className={classes.optionText}>{I18n.t(`support.${option.key}.text`)}</Typography>

                        <CustomButton
                            className={classes.optionButton}
                            href={option.href}
                            target="_blank"
                            variant="primary"
                        >
                            {I18n.t(`support.${option.key}.button`)}
                        </CustomButton>
                    </Box>
                ))}
            </Box>

            <Typography className={classes.footer}>{I18n.t('support.footer')}</Typography>
        </Dialog>
    );
};
