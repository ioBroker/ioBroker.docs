import React, { useState, type RefObject } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../../../../assets/img/ioBroker-Title2.svg';
import { Box, Typography } from '@mui/material';
import { useStyles } from './HeroSection.styles';
import AmazonIcon from "../../../../assets/img/amazonBlue.svg";
import PayPalIcon from "../../../../assets/img/paypalBlue.svg";
import HousesGroup from "../../../../assets/img/Houses.png";
import SmallHousesGroup from "../../../../assets/img/Houses-small.png";
import { SupportModal } from '../../../../components/SupportModal/SupportModal';
import { CustomButton } from '../../../../components/Button/Button';

interface HeroSectionProps {
    sectionRef?: RefObject<HTMLElement | null>;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ sectionRef }) => {
    const { classes } = useStyles();
    const navigate = useNavigate();
    const [supportModalOpen, setSupportModalOpen] = useState(false);

    return (
        <Box component="section" className={classes.heroSection} ref={sectionRef}>
            <Box className={classes.heroBackgroundImage} />
            <Box className={classes.heroContentWrapper}>
                <Box className={`${classes.container} ${classes.heroContent}`}>
                    <Box className={classes.heroLeft}>
                        <img src={logo} alt="ioBroker Logo" className={classes.heroLogo} />
                        <Box className={classes.smallHousesImageWrapper}>
                            <img src={SmallHousesGroup} alt="Houses" className={classes.smallHousesImage} />
                        </Box>
                        <Typography className={classes.heroPlatformText}>
                            <Box className={classes.platformTextComment}>// Open-Source-Plattform </Box> für Smart-Home-Automatisierung
                        </Typography>
                        <CustomButton variant="primary"
                            onClick={() => navigate('/installation')}
                            className={classes.installButton}>
                            Installieren
                        </CustomButton>
                    </Box>

                    <Box className={classes.heroRight}>
                        <Box className={classes.housesImageWrapper}>
                            <img src={HousesGroup} alt="Houses" className={classes.housesImage} />
                        </Box>
                        <Typography className={classes.supportText}>
                            Unsere Software ist kostenlos. <br /> Unterstütze uns!
                        </Typography>
                        <Box className={classes.supportIcons}>
                            <Box
                                className={classes.supportIconPayPal}
                                onClick={() => setSupportModalOpen(true)}
                            >
                                <img alt="PayPal Icon" src={PayPalIcon} className={classes.paypalIconImage} />
                            </Box>
                            <Box
                                className={classes.supportIconAmazon}
                                onClick={() => setSupportModalOpen(true)}
                            >
                                <img alt="Amazon Icon" src={AmazonIcon} className={classes.amazonIconImage} />
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
