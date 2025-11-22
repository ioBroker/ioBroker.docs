import React from 'react';
import { Typography } from '@mui/material';
import type { SxProps, Theme } from '@mui/material';
import { useStyles } from './SectionTitle.styles';

interface SectionTitleProps {
    children: React.ReactNode;
    sx?: SxProps<Theme>;
}

export const SectionTitle: React.FC<SectionTitleProps> = ({ children, sx }) => {
    const { classes } = useStyles();
    return (
        <Typography
            variant="h4"
            className={classes.sectionTitle}
            sx={sx}
        >
            // {children}
        </Typography>
    );
};
