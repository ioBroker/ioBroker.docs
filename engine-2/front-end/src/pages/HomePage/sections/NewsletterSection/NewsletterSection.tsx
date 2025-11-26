import React from 'react';
import { Box, Typography } from '@mui/material';
import { useStyles } from './NewsletterSection.styles';
import { SectionTitle } from '../../../../components/SectionTitle/SectionTitle';
import ArrowIconSvg from '../../../../assets/img/ArrowDownRight.svg';
import { useTranslation } from 'react-i18next';

const ArrowIcon: React.FC = () => (
    <Box
        component="img"
        sx={{
            width: { xs: '20px', sm: '40px' },
            height: { xs: '20px', sm: '40px' },
            margin: { xs: '0px', sm: '0 10px' },
        }}
        src={ArrowIconSvg}
        alt="arrow"
    />
);

export const NewsletterSection: React.FC = () => {
    const { classes } = useStyles();
    const { t } = useTranslation();
    return (
        <Box
            component="section"
            className={classes.newsletterSection}
        >
            <Box className={classes.container}>
                <Box sx={{ width: '100%', maxWidth: '1400px', textAlign: { xs: 'left', md: 'left' } }}>
                    <SectionTitle>{t('home.newsletter.title')}</SectionTitle>
                </Box>
                <Box className={classes.newsletterContent}>
                    <Box className={classes.newslettertext}>
                        <Typography className={classes.newsletterTitle}>{t('home.newsletter.headline')}</Typography>
                        <Typography className={classes.newsletterSubTitle}>
                            {t('home.newsletter.sub')}
                        </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', gap: { lg: '55px', md: '30px', sm: '20px', xs: '20px' } }}>
                        <Box sx={{ display: 'flex' }}>
                            <div className={classes.bracesLeft} />
                            <Box className={classes.newsletterInputContainer}>
                                <input
                                    className={classes.newsletterInput}
                                    placeholder={t('home.newsletter.placeholder')}
                                />
                            </Box>
                            <div className={classes.bracesRight} />
                        </Box>
                        <Box
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                width: { md: 'auto', sm: '77px', xs: '77px' },
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
