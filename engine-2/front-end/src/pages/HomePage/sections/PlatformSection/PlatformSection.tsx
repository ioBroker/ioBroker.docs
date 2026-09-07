import React from 'react';
import { Box, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useStyles } from './PlatformSection.styles';
import { StyledButton } from '../../../../components/StyledButton/StyledButton';
import { I18n } from '../../../../utils/i18n';

export const PlatformSection: React.FC = () => {
    const { classes } = useStyles();
    const navigate = useNavigate();
    return (
        <Box
            component="section"
            className={classes.platformSection}
        >
            <Box className={classes.container}>
                <Box className={classes.descriptionWrapper}>
                    <Box className={classes.descriptionContainer}>
                        <Box className={classes.platformTitleWrapper}>
                            <Typography
                                variant="h1"
                                className={classes.platformTitle}
                            >
                                {I18n.t('home.platform.title1')}
                            </Typography>
                            <Typography
                                variant="h1"
                                className={classes.platformTitleBlue}
                            >
                                {I18n.t('home.platform.title2')}
                            </Typography>
                        </Box>
                        <Typography className={classes.platformHeadSubtitle}>
                            /* {I18n.t('home.platform.head')}
                        </Typography>
                        <Typography className={classes.platformSubtitle}>{I18n.t('home.platform.sub1')}</Typography>
                        <Typography className={classes.platformSubtitle}>{I18n.t('home.platform.sub2')} */</Typography>
                        <StyledButton
                            onClick={() => void navigate('/docs')}
                            // it leads to another page, so the arrow points at it rather
                            // than down - see the note in `StyledButton`
                            arrow="right"
                            sx={{
                                marginTop: { xs: '20px', sm: '20px', md: '8px' },
                                height: { xs: '44px', sm: '44px', md: '60px' },
                                width: { xs: 'calc(100% - 0px)', sm: '368px', md: '533px' },
                                maxWidth: '867px',
                                padding: '10px 24px',
                                fontSize: '16px',
                                alignSelf: 'end',
                            }}
                        >
                            {I18n.t('home.platform.more')}
                        </StyledButton>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};
