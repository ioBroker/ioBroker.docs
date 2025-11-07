import React from 'react';
import logo from '../../../../assets/img/ioBroker-Title2.svg';
import { Box, Typography, Button } from '@mui/material';
import { useStyles } from './HeroSection.styles';
import AmazonIcon from "../../../../assets/img/amazonBlue.svg";
import PayPalIcon from "../../../../assets/img/paypalBlue.svg";
import HousesGroup from "../../../../assets/img/Houses.png";
import Divider from '../../../../components/Divider/Divider';
import { useScrollProgress } from '../../../../hooks/useScrollProgress';


export const HeroSection: React.FC = () => {
    const { classes } = useStyles();
    const { scrollPosition, sectionRef } = useScrollProgress();

    return (
        <Box component="section" className={classes.heroSection} ref={sectionRef}>
            <Box className={classes.heroBackgroundImage} />
            <Box className={classes.heroContentWrapper}>
                <Box className={`${classes.container} ${classes.heroContent}`}>
                    <Box className={classes.heroLeft}>
                        <img src={logo} alt="ioBroker Logo" className={classes.heroLogo} />
                        <Typography className={classes.heroPlatformText}>
                            <Box className={classes.platformTextComment}>// Open-Source-Plattform </Box> für Smart-Home-Automatisierung
                        </Typography>
                        <Button className={classes.installButton}>
                            Installieren
                        </Button>
                    </Box>

                    <Box className={classes.heroRight}>
                        <Box className={classes.housesImageWrapper}>
                            <img src={HousesGroup} alt="Houses" className={classes.housesImage} />
                        </Box>
                        <Typography className={classes.supportText}>
                            Unsere Software ist kostenlos. <br /> Unterstütze uns!
                        </Typography>
                         <Box className={classes.supportIcons}>
                            <Box className={classes.supportIconPayPal}><img alt="PayPal Icon" src={PayPalIcon} className={classes.paypalIconImage}/></Box>
                            <Box className={classes.supportIconAmazon}><img alt="Amazon Icon" src={AmazonIcon} className={classes.amazonIconImage} /></Box>
                        </Box>
                    </Box>
                </Box>
            </Box>
            <Divider
                position={scrollPosition}
                parentWidth={window.innerWidth}
                sx={{ marginBottom: '26px', marginTop: '61px' }}
            />
        </Box>
    );
};
