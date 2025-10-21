import React from 'react';
import logo from '../../../../assets/img/ioBrokerTitle.svg';
import { Box, Typography, Button } from '@mui/material';
import { useStyles } from './HeroSection.styles';
import AmazonIcon from "../../../../assets/img/amazonBlue.svg";
import PayPalIcon from "../../../../assets/img/paypalBlue.svg";


export const HeroSection: React.FC = () => {
    const { classes } = useStyles();
    return (
        <Box component="section" className={classes.heroSection}>
            <Box className={classes.heroBackgroundImage} />
            <Box className={classes.heroContentWrapper}>
                <Box className={`${classes.container} ${classes.heroContent}`}>
                    <Box className={classes.heroLeft}>
                        <img src={logo} alt="ioBroker Logo" className={classes.heroLogo} />
                        <Typography className={classes.heroPlatformText}>
                            <Box className={classes.platformTextComment}>// Open-Source-Plattform </Box> für Smart-Home-Automatisierung
                        </Typography>
                        <Button className={classes.installButton}>
                            INSTALLIEREN
                        </Button>
                    </Box>

                    <Box className={classes.heroRight}>
                        <Box className={classes.supportIcons}>
                            <Box className={classes.supportIconPayPal}><img alt="PayPal Icon" src={PayPalIcon} /></Box>
                            <Box className={classes.supportIconAmazon}><img style={{marginBottom: '20px'}}alt="Amazon Icon" src={AmazonIcon} /></Box>
                        </Box>
                        <Typography className={classes.supportText}>
                            Unsere Software ist kostenlos. <br /> Unterstütze uns!
                        </Typography>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};
