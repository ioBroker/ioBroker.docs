import React from 'react';
import { Box, Typography } from '@mui/material';
import { useStyles } from './NewsletterSection.styles';
import { SectionTitle } from '../../../../components/SectionTitle/SectionTitle';
import ArrowIconSvg from '../../../../assets/img/ArrowDownRight.svg';
import { I18n } from '../../../../utils/i18n';

const ArrowIcon: React.FC = () => (
    <Box
        component="img"
        sx={{
            width: { xs: '20px', sm: '24px' },
            height: { xs: '20px', sm: '24px' },
            margin: { xs: '0px', sm: '0 8px' },
        }}
        src={ArrowIconSvg}
        alt="arrow"
    />
);

export const NewsletterSection: React.FC = () => {
    const { classes } = useStyles();
    return (
        <Box
            component="section"
            className={classes.newsletterSection}
        >
            <Box className={classes.container}>
                <Box sx={{ width: '100%', maxWidth: '1400px', textAlign: { xs: 'left', md: 'left' } }}>
                    <SectionTitle>{I18n.t('home.newsletter.title')}</SectionTitle>
                </Box>
                <Box className={classes.newsletterContent}>
                    <Box className={classes.newsletterText}>
                        <Typography className={classes.newsletterTitle}>
                            {I18n.t('home.newsletter.headline')}
                        </Typography>
                        <Typography className={classes.newsletterSubTitle}>{I18n.t('home.newsletter.sub')}</Typography>
                    </Box>
                    <Box
                        sx={{
                            display: 'flex',
                            // the column above centres its items instead of stretching them, so
                            // the row has to keep itself inside the page on its own
                            maxWidth: '100%',
                            // the distance between the field and the arrow beside it -
                            // 55 px let the two read as two separate controls instead of
                            // as one input with its button
                            gap: {
                                lg: '18px',
                                md: '16px',
                                sm: '14px',
                                xs: '14px',
                                '@media (max-width:400px)': {
                                    gap: '10px !important',
                                },
                            },
                        }}
                    >
                        <Box sx={{ display: 'flex', minWidth: 0, flex: '1 1 auto' }}>
                            <div className={classes.bracesLeft} />
                            <Box className={classes.newsletterInputContainer}>
                                <input
                                    className={classes.newsletterInput}
                                    placeholder={I18n.t('home.newsletter.placeholder')}
                                />
                            </Box>
                            <div className={classes.bracesRight} />
                        </Box>
                        <Box
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                width: { md: 'auto', sm: '64px', xs: '64px' },
                                justifyContent: 'space-between',
                            }}
                        >
                            <div className={classes.bracesLeft} />
                            <ArrowIcon />
                            <div className={classes.bracesRight} />
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};
