import React from 'react';
import { Box, Typography, useTheme } from '@mui/material';
import type { BoxProps } from '@mui/material';
import { useStyles } from './StyledButton.styles';
import ArrowIconSvg from '../../assets/img/arrowIcon.svg';
import WhiteArrowIconSvg from '../../assets/img/whiteArrowIcon.svg';

interface ArrowIconProps {
    sx?: BoxProps['sx'];
}

const ArrowIcon: React.FC<ArrowIconProps> = ({ sx }) => {
    const theme = useTheme();
    const arrowSrc = theme.palette.mode === 'light' ? WhiteArrowIconSvg : ArrowIconSvg;

    return (
        <Box
            component="img"
            src={arrowSrc}
            alt="arrow"
            sx={{
                marginLeft: '10px',
                width: { xs: '20px', sm: '24px' },
                height: { xs: '20px', sm: '24px' },
                ...sx,
            }}
        />
    );
};

interface StyledButtonProps extends Omit<BoxProps, 'onClick'> {
    children: React.ReactNode;
    onClick?: () => void;
    textSx?: BoxProps['sx'];
    iconSx?: BoxProps['sx'];
}

export const StyledButton: React.FC<StyledButtonProps> = ({
    children,
    onClick,
    sx,
    style,
    textSx,
    iconSx,
    ...props
}) => {
    const { classes } = useStyles();
    return (
        <Box
            className={classes.styledButton}
            onClick={onClick}
            sx={sx}
            style={style}
            {...props}
        >
            <Typography
                className={classes.buttonText}
                sx={textSx}
            >
                {children}
            </Typography>
            <ArrowIcon sx={iconSx} />
        </Box>
    );
};
