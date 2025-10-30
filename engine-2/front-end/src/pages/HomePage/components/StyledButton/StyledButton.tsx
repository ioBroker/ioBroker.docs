import React from 'react';
import { Box, Typography } from '@mui/material';
import type { BoxProps } from '@mui/material';
import { useStyles } from './StyledButton.styles';
import ArrowIconSvg from '../../../../assets/img/arrowIcon.svg';

interface ArrowIconProps {
    sx?: BoxProps['sx'];
}

const ArrowIcon: React.FC<ArrowIconProps> = ({ sx }) => (
    <Box
        component="img"
        src={ArrowIconSvg}
        alt="arrow"
        sx={{
            marginLeft: '10px',
            width: { xs: '20px', sm: '30px' },
            height: { xs: '20px', sm: '30px' },
            ...sx
        }}
    />
);

interface StyledButtonProps extends Omit<BoxProps, 'onClick'> {
    children: React.ReactNode;
    onClick?: () => void;
    textSx?: BoxProps['sx'];
    iconSx?: BoxProps['sx'];
}

export const StyledButton: React.FC<StyledButtonProps> = ({ children, onClick, sx, style, textSx, iconSx, ...props }) => {
    const { classes } = useStyles();
    return (
        <Box
            className={classes.styledButton}
            onClick={onClick}
            sx={sx}
            style={style}
            {...props}
        >
            <Typography className={classes.buttonText} sx={textSx}>{children}</Typography>
            <ArrowIcon sx={iconSx} />
        </Box>
    );
};
