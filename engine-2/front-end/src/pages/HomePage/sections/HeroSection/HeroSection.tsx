import React, { useState } from 'react';
import logo from '../../../../assets/img/ioBroker-Title2.svg';
import { Box, Typography } from '@mui/material';
import { useStyles } from './HeroSection.styles';
import AmazonIcon from "../../../../assets/img/amazonBlue.svg";
import PayPalIcon from "../../../../assets/img/paypalBlue.svg";
import HousesGroup from "../../../../assets/img/Houses.png";
import SmallHousesGroup from "../../../../assets/img/Houses-small.png";
import Divider from '../../../../components/Divider/Divider';
import { SupportModal } from '../../../../components/SupportModal/SupportModal';
import { useScrollProgress } from '../../../../hooks/useScrollProgress';
import { CustomButton } from '../../../../components/Button/Button';


export const HeroSection: React.FC = () => {
    const { classes } = useStyles();
    const { scrollPosition, sectionRef } = useScrollProgress();
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
                        <CustomButton variant="primary" className={classes.installButton}>
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
            <Divider
                position={scrollPosition}
                parentWidth={window.innerWidth}
                sx={{ marginBottom: '26px', marginTop: '61px' }}
            />

            <SupportModal
                open={supportModalOpen}
                onClose={() => setSupportModalOpen(false)}
            />
        </Box>
    );
};
