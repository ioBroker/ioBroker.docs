import React from 'react';
import { Box, Typography, IconButton } from '@mui/material';
import { useStyles } from './NewsletterSection.styles';
import { SectionTitle } from '../../components/SectionTitle';

const ArrowIcon = () => <Typography component="span">→</Typography>;

export const NewsletterSection: React.FC = () => {
    const { classes } = useStyles();
    return (
        <Box component="section" className={classes.section}>
            <Box className={classes.container}>
                <SectionTitle>NEWSLETTER</SectionTitle>
                <Box className={classes.newsletterContent}>
                    <Box flex={1}>
                        <Typography variant="h5">Keine Werbung, nur News!</Typography>
                        <Typography>
                            Unser Newsletter informiert dich ausschließlich über neue Blogbeiträge und besondere Aktionen wie Weihnachtsrabatte - garantiert ohne Spam!
                        </Typography>
                    </Box>
                    <Box className={classes.newsletterInputContainer}>
                        <input className={classes.newsletterInput} placeholder="deineemail@email.com" />
                        <IconButton><ArrowIcon /></IconButton>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};
