import React from 'react';
import { Typography } from '@mui/material';
import { useStyles } from './SectionTitle.styles';

interface SectionTitleProps {
    children: React.ReactNode;
}

export const SectionTitle: React.FC<SectionTitleProps> = ({ children }) => {
    const { classes } = useStyles();
    return <Typography variant="h4" className={classes.sectionTitle}>// {children}</Typography>;
};
