import React from 'react';
import { Box, Typography } from '@mui/material';
import { useStyles } from './HistorySection.styles';
import { StyledButton } from '../../../../components/StyledButton/StyledButton';
import { useTranslation } from 'react-i18next';

export const HistorySection: React.FC = () => {
    const { classes, cx } = useStyles();
    const { t } = useTranslation();
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
                        <Typography className={cx(classes.historyTitle, classes.historyTitleMobile)}>{t('home.history.years')}</Typography>
                    </Box>
                </Box>
                <Box className={classes.historyWrapper}>
                    <Typography className={cx(classes.historyTitle, classes.historyTitleDesktop)}>{t('home.history.years')}</Typography>
                    <Typography className={classes.historySubTitle}>{t('home.history.slogan_for')}<br/>{t('home.history.slogan_smart')}</Typography>
                    <Typography
                        component="p"
                        className={classes.historyText}
                    >
                       /* {t('home.history.text')} */
                    </Typography>
                    <Box sx={{ textAlign: { xs: 'center', sm: 'center', md: 'left' } }}>
                        <StyledButton
                            sx={{
                                height: { xs: '44px', sm: '44px', md: '60px' },
                                width: { xs: '368px', sm: '368px', md: '533px' },
                                maxWidth: '533px',
                            }}
                        >
                            {t('home.history.button')}
                        </StyledButton>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};
