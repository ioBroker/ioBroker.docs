import React from 'react';
import { Box, Typography } from '@mui/material';
import { useStyles } from './NewsletterSection.styles';
import { SectionTitle } from '../../components/SectionTitle';
import ArrowIconSvg from '../../../../assets/img/arrowIcon.svg';

const ArrowIcon: React.FC = () => (
    <Box component="img" width="40px" height="40px" sx={{margin: "0 10px"}} src={ArrowIconSvg} alt="arrow" />
);

export const NewsletterSection: React.FC = () => {
    const { classes } = useStyles();
    return (
        <Box component="section" className={classes.section}>
            <Box className={classes.container}>
                <SectionTitle>NEWSLETTER</SectionTitle>
                <Box className={classes.newsletterContent}>
                    <Box flex={1}>
                        <Typography className={classes.newsletterTitle}>Keine Werbung, nur News!</Typography>
                        <Typography className={classes.newsletterSubTitle}>
                            Unser Newsletter informiert dich ausschließlich über neue Blogbeiträge und besondere Aktionen wie Weihnachtsrabatte - garantiert ohne Spam!
                        </Typography>
                    </Box>
                    <Box sx={{display: 'flex'}}>
                        <div className={classes.bracesLeft} />
                        <Box className={classes.newsletterInputContainer}>
                            <input className={classes.newsletterInput} placeholder="deineemail@email.com" />
                        </Box>
                        <div className={classes.bracesRight} />
                    </Box>
                    <Box sx={{display: 'flex', alignItems: 'center'}}>
                        <div className={classes.bracesLeft} />
                        <ArrowIcon/>
                        <div className={classes.bracesRight} />
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};
