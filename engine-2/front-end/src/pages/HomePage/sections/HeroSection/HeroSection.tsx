import React from 'react';
import logo from '../../../../assets/img/ioBrokerTitle.svg';
import { Box, Typography, Button } from '@mui/material';
import { useStyles } from './HeroSection.styles';
import AmazonIcon from "../../../../assets/img/amazonBlue.svg";
import PayPalIcon from "../../../../assets/img/paypalBlue.svg";
// import ValuesGroup from "../../../../assets/img/Values group.png";
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
                            INSTALLIEREN
                        </Button>
                    </Box>

                    <Box className={classes.heroRight}>
                        {/* <Box className={classes.valuesImageWrapper}>
                            <img src={ValuesGroup} alt="Values" className={classes.valuesImage} />
                        </Box> */}
                        <Box className={classes.supportIcons}>
                            <Box className={classes.supportIconPayPal}><img alt="PayPal Icon" src={PayPalIcon} /></Box>
                            <Box className={classes.supportIconAmazon}><img alt="Amazon Icon" src={AmazonIcon} /></Box>
                        </Box>
                        <Typography className={classes.supportText}>
                            Unsere Software ist kostenlos. <br /> Unterstütze uns!
                        </Typography>
                    </Box>
                </Box>
            </Box>
            <Divider
                position={scrollPosition}
                parentWidth={window.innerWidth}
                sx={{ marginBottom: '26px', marginTop: '58px' }}
            />
        </Box>
    );
};
