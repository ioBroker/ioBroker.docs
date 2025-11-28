import React, { useState, type RefObject } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../../../../assets/img/ioBroker-Title2.svg';
import { Box, Typography } from '@mui/material';
import { useStyles } from './HeroSection.styles';
import AmazonIcon from '../../../../assets/img/amazonBlue.svg';
import PayPalIcon from '../../../../assets/img/paypalBlue.svg';
import HousesGroup from '../../../../assets/img/Houses.png';
import SmallHousesGroup from '../../../../assets/img/Houses-small.png';
import { SupportModal } from '../../../../components/SupportModal/SupportModal';
import { CustomButton } from '../../../../components/Button/Button';
import { I18n } from '../../../../utils/i18n';

interface HeroSectionProps {
    sectionRef?: RefObject<HTMLElement | null>;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ sectionRef }) => {
    const { classes } = useStyles();
    const navigate = useNavigate();
    const [supportModalOpen, setSupportModalOpen] = useState(false);

    return (
        <Box
            component="section"
            className={classes.heroSection}
            ref={sectionRef}
        >
            <Box className={classes.heroBackgroundImage} />
            <Box className={classes.heroBackgroundImageOverlay} />
            <Box className={classes.heroContentWrapper}>
                <Box className={`${classes.container} ${classes.heroContent}`}>
                    <Box className={classes.heroLeft}>
                        <img
                            src={logo}
                            alt="ioBroker Logo"
                            className={classes.heroLogo}
                        />
                        <Box className={classes.smallHousesImageWrapper}>
                            <img
                                src={SmallHousesGroup}
                                alt="Houses"
                                className={classes.smallHousesImage}
                            />
                        </Box>
                        <Typography className={classes.heroPlatformText}>
                            <Box className={classes.platformTextComment}>// {I18n.t('home.hero.platform')} </Box>
                            {I18n.t('home.hero.platformSubtitle')}
                        </Typography>
                        <CustomButton
                            variant="primary"
                            onClick={() => navigate('/installation')}
                            className={classes.installButton}
                        >
                            {I18n.t('home.hero.install')}
                        </CustomButton>
                    </Box>

                    <Box className={classes.heroRight}>
                        <Box className={classes.housesImageWrapper}>
                            <img
                                src={HousesGroup}
                                alt="Houses"
                                className={classes.housesImage}
                            />
                        </Box>
                        <Typography className={classes.supportText}>
                            {I18n.t('home.hero.free')} <br />
                             {I18n.t('home.hero.support')}
                        </Typography>
                        <Box className={classes.supportIcons}>
                            <Box
                                className={classes.supportIconPayPal}
                                onClick={() => setSupportModalOpen(true)}
                            >
                                <img
                                    alt="PayPal Icon"
                                    src={PayPalIcon}
                                    className={classes.paypalIconImage}
                                />
                            </Box>
                            <Box
                                className={classes.supportIconAmazon}
                                onClick={() => setSupportModalOpen(true)}
                            >
                                <img
                                    alt="Amazon Icon"
                                    src={AmazonIcon}
                                    className={classes.amazonIconImage}
                                />
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </Box>

            <SupportModal
                open={supportModalOpen}
                onClose={() => setSupportModalOpen(false)}
            />
        </Box>
    );
};
