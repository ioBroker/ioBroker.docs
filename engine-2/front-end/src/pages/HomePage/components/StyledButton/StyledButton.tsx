import React from 'react';
import { Box, Typography } from '@mui/material';
import type { BoxProps } from '@mui/material';
import { useStyles } from './StyledButton.styles';
import ArrowIconSvg from '../../../../assets/img/arrowIcon.svg';

const ArrowIcon = () => <img width="30px" height={"30px"} src={ArrowIconSvg} alt="arrow" />;

interface StyledButtonProps extends Omit<BoxProps, 'onClick'> {
    children: React.ReactNode;
    onClick?: () => void;
}

export const StyledButton: React.FC<StyledButtonProps> = ({ children, onClick, sx, style, ...props }) => {
    const { classes } = useStyles();
    return (
        <Box
            className={classes.styledButton}
            onClick={onClick}
            sx={sx}
            style={style}
            {...props}
        >
            <Typography className={classes.buttonText}>{children}</Typography>
            <ArrowIcon />
        </Box>
    );
};
