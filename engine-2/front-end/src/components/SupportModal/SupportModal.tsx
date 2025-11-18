import React from 'react';
import { Dialog, Box, Typography } from '@mui/material';
import { useStyles } from './SupportModal.styles';
import { CustomButton } from '../../components/Button/Button';
import PayPalIcon from '../../assets/img/paypalBlue.svg';
import AmazonIcon from '../../assets/img/amazonBlue.svg';

interface SupportModalProps {
    open: boolean;
    onClose: () => void;
}

export const SupportModal: React.FC<SupportModalProps> = ({ open, onClose }) => {
    const { classes } = useStyles();

    return (
        <Dialog
            open={open}
            onClose={onClose}
            maxWidth="md"
            fullWidth
            scroll="body"
            PaperProps={{
                className: classes.dialogPaper,
            }}
        >
            <Box className={classes.container}>
                <Box className={classes.closeButton} onClick={onClose}>
                    <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                        <path
                            d="M20 24.2586L5.09506 39.1635C4.53739 39.7212 3.82763 40 2.96578 40C2.10393 40 1.39417 39.7212 0.836501 39.1635C0.278833 38.6058 0 37.8961 0 37.0342C0 36.1724 0.278833 35.4626 0.836501 34.9049L15.7414 20L0.836501 5.09506C0.278833 4.53739 0 3.82763 0 2.96578C0 2.10393 0.278833 1.39417 0.836501 0.836501C1.39417 0.278833 2.10393 0 2.96578 0C3.82763 0 4.53739 0.278833 5.09506 0.836501L20 15.7414L34.9049 0.836501C35.4626 0.278833 36.1724 0 37.0342 0C37.8961 0 38.6058 0.278833 39.1635 0.836501C39.7212 1.39417 40 2.10393 40 2.96578C40 3.82763 39.7212 4.53739 39.1635 5.09506L24.2586 20L39.1635 34.9049C39.7212 35.4626 40 36.1724 40 37.0342C40 37.8961 39.7212 38.6058 39.1635 39.1635C38.6058 39.7212 37.8961 40 37.0342 40C36.1724 40 35.4626 39.7212 34.9049 39.1635L20 24.2586Z"
                            fill="currentColor"
                        />
                    </svg>
                </Box>

                <Typography className={classes.title}>
                    UNTERSTÜTZE UNS!
                </Typography>
                
                <Typography className={classes.subtitle}>
                    ioBroker ist kostenlos - und soll es auch bleiben!
                </Typography>
                
                <Typography className={classes.description}>
                    Doch Serverkosten, Weiterentwicklung und Verwaltung brauchen Power (und manchmal auch Kaffee).
                    Wenn du unser Projekt magst, freuen wir uns über deine Unterstützung!
                </Typography>

                <Box className={classes.optionsContainer}>
                    <Box className={classes.option}>
                        <Box className={classes.iconContainer}>
                            <img src={PayPalIcon} alt="PayPal" className={classes.paypalIcon} />
                        </Box>
                        
                        <Typography className={classes.optionText}>
                            Ob ein kleiner Betrag oder ein großer Boost - jede Spende fließt direkt in die Weiterentwicklung von ioBroker.
                        </Typography>
                        
                        <CustomButton 
                            className={classes.button}
                            href="https://www.paypal.com/donate"
                            target="_blank"
                            variant="primary"
                        >
                            JETZT SPENDEN
                        </CustomButton>
                    </Box>

                    <Box className={classes.option}>
                        <Box className={classes.iconContainer}>
                            <img src={AmazonIcon} alt="Amazon" className={classes.amazonIcon} />
                        </Box>
                        
                        <Typography className={classes.optionText}>
                            Bestellst du sowieso bei Amazon? Dann nutze unseren Link! Ein kleiner Prozentsatz deines Einkaufs geht an ioBroker - du zahlst keinen Cent mehr!
                        </Typography>
                        
                        <CustomButton 
                            className={classes.button}
                            href="https://www.amazon.de"
                            target="_blank"
                            variant="primary"
                        >
                            BEI AMAZON EINKAUFEN
                        </CustomButton>
                    </Box>
                </Box>

                <Typography className={classes.footer}>
                    PS: Deine Spende wird nicht für Luxus-Smart-Home-Geräte verprasst - versprochen!
                </Typography>
            </Box>
        </Dialog>
    );
};
