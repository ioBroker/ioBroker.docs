import React from 'react';
import { Box, Typography } from '@mui/material';
import { useStyles } from './StyledButton.styles';

const ArrowIcon = () => <Typography component="span">→</Typography>;

interface StyledButtonProps {
    children: React.ReactNode;
    onClick?: () => void;
}

export const StyledButton: React.FC<StyledButtonProps> = ({ children, onClick }) => {
    const { classes } = useStyles();
    return (
        <Box className={classes.styledButton} onClick={onClick}>
            <Typography>{children}</Typography>
            <ArrowIcon />
        </Box>
    );
};
