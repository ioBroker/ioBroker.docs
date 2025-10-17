import React from 'react';
import logo from '../../../../assets/img/ioBrokerTitle.svg';
import { Box, Typography, Button } from '@mui/material';
import { useStyles } from './HeroSection.styles';


export const HeroSection: React.FC = () => {
    const { classes } = useStyles();
    return (
        <Box component="section" className={classes.heroSection}>
            <Box className={classes.heroContentWrapper}>
                <Box className={`${classes.container} ${classes.heroContent}`}>
                    <Box className={classes.heroLeft}>
                        <img src={logo} alt="ioBroker Logo" className={classes.heroLogo} />
                        <Typography className={classes.heroPlatformText}>
                            // Open-Source-Plattform <br /> für Smart-Home-Automatisierung
                        </Typography>
                        <Button className={classes.installButton}>
                            INSTALLIEREN
                        </Button>
                    </Box>

                    <Box className={classes.heroRight}>
                        <Typography className={classes.supportText}>
                            Unsere Software ist kostenlos. <br /> Unterstütze uns!
                        </Typography>
                        <Box className={classes.supportIcons}>
                            <Box className={classes.supportIcon}>P</Box> 
                            <Box className={classes.supportIcon}>A</Box> 
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};
