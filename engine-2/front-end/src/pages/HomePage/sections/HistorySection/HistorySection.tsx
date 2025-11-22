import React from 'react';
import { Box, Typography } from '@mui/material';
import { useStyles } from './HistorySection.styles';
import { StyledButton } from '../../../../components/StyledButton/StyledButton';

export const HistorySection: React.FC = () => {
    const { classes, cx } = useStyles();
    return (
        <Box
            component="section"
            className={cx(classes.section, classes.historySection)}
        >
            <Box className={classes.container}>
                <Box className={classes.historyNumberWrapper}>
                    <Box
                        component="span"
                        className={classes.historyNumber}
                    >
                        10
                    </Box>
                    <Box className={classes.plusJahreWrapper}>
                        <Box
                            component="span"
                            className={classes.historyPlus}
                        >
                            +
                        </Box>
                        <Typography className={cx(classes.historyTitle, classes.historyTitleMobile)}>Jahre</Typography>
                    </Box>
                </Box>
                <Box className={classes.historyWrapper}>
                    <Typography className={cx(classes.historyTitle, classes.historyTitleDesktop)}>Jahre</Typography>
                    <Typography className={classes.historySubTitle}>BEGEISTERUNG FÜR SMART-HOME</Typography>
                    <Typography
                        component="p"
                        className={classes.historyText}
                    >
                        /* Was 2013 als Wunsch nach Automatisierung für das eigene Zuhause begann, entwickelte sich zu
                        einer flexiblen und leistungsstarken Plattform mit einer großen Community. */
                    </Typography>
                    <Box sx={{ textAlign: { xs: 'center', sm: 'center', md: 'left' } }}>
                        <StyledButton
                            sx={{
                                height: { xs: '44px', sm: '44px', md: '60px' },
                                width: { xs: '368px', sm: '368px', md: '533px' },
                                maxWidth: '533px',
                            }}
                        >
                            IOBROKER GESCHICHTE
                        </StyledButton>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};
