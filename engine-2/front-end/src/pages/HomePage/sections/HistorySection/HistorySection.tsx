import React from 'react';
import { Box, Typography } from '@mui/material';
import { useStyles } from './HistorySection.styles';
import { StyledButton } from '../../../../components/StyledButton/StyledButton';
import { I18n } from '../../../../utils/i18n';

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
                        11
                    </Box>
                    <Box className={classes.plusJahreWrapper}>
                        <Box
                            component="span"
                            className={classes.historyPlus}
                        >
                            +
                        </Box>
                        <Typography className={cx(classes.historyTitle, classes.historyTitleMobile)}>{I18n.t('home.history.years')}</Typography>
                    </Box>
                </Box>
                <Box className={classes.historyWrapper}>
                    <Typography className={cx(classes.historyTitle, classes.historyTitleDesktop)}>{I18n.t('home.history.years')}</Typography>
                    <Typography className={classes.historySubTitle}>{I18n.t('home.history.slogan_for')}<br/>{I18n.t('home.history.slogan_smart')}</Typography>
                    <Typography
                        component="p"
                        className={classes.historyText}
                    >
                       /* {I18n.t('home.history.text')} */
                    </Typography>
                    <Box sx={{ textAlign: { xs: 'center', sm: 'center', md: 'left' } }}>
                        <StyledButton
                            sx={{
                                height: { xs: '44px', sm: '44px', md: '60px' },
                                width: { xs: '368px', sm: '368px', md: '533px', '@media (max-width:400px)': {
                                    width: '340px !important',
                                } },
                                maxWidth: '533px',
                            }}
                        >
                            {I18n.t('home.history.button')}
                        </StyledButton>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};
