import React from 'react';
import { Box, Typography } from '@mui/material';
import { useStyles } from './HistorySection.styles';
import { StyledButton } from '../../components/StyledButton';

export const HistorySection: React.FC = () => {
    const { classes, cx } = useStyles();
    return (
        <Box component="section" className={cx(classes.section, classes.historySection)}>
            <Box className={classes.container}>
                <Box className={classes.historyNumberWrapper}>
                    <Box component="span" className={classes.historyNumber}>10</Box>
                    <Box component="span" className={classes.historyPlus}>+</Box>
                </Box>
                <Box className={classes.historyWrapper}>
                    <Typography className={classes.historyTitle}>
                        Jahre
                    </Typography>
                    <Typography className={classes.historySubTitle}>
                        BEGEISTERUNG FÜR SMART-HOME
                    </Typography>
                    <Typography component="p" className={classes.historyText}>
                        Was 2013 als Wunsch nach Automatisierung für das eigene Zuhause begann, entwickelte sich zu einer flexiblen und leistungsstarken Plattform mit einer großen Community.
                    </Typography>
                    <StyledButton
                    sx={{
                                height: { sm: '80px',  md: '60px' },
                                width: { sm: 'auto', md: '533px' },
                                maxWidth: '533px',
                                borderRadius: '10px!important'
                            }}
                    >IOBROKER GESCHICHTE</StyledButton>
                </Box>
            </Box>
        </Box>
    );
};
