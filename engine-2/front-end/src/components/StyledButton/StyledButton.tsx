import React from 'react';
import { Box, Typography } from '@mui/material';
import type { BoxProps } from '@mui/material';
import { useStyles } from './StyledButton.styles';
import ArrowIconSvg from '../../assets/img/arrowIcon.svg';

interface ArrowIconProps {
    sx?: BoxProps['sx'];
    /** "diagonal" points down/right (expand), "right" points to the target page */
    direction?: 'diagonal' | 'right';
}

const ArrowIcon: React.FC<ArrowIconProps> = ({ sx, direction = 'diagonal' }) => {
    // the button is outlined in both themes now, so the blue arrow fits everywhere
    const arrowSrc = ArrowIconSvg;

    return (
        <Box
            component="img"
            src={arrowSrc}
            alt="arrow"
            sx={{
                marginLeft: '10px',
                width: { xs: '20px', sm: '24px' },
                height: { xs: '20px', sm: '24px' },
                // the source icon points down/right, -45deg makes it horizontal
                transform: direction === 'right' ? 'rotate(-45deg)' : undefined,
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
    /** "outline" is the compact button, "surface" the large content panel */
    variant?: 'outline' | 'surface';
    /** "right" for a button that leads somewhere, "diagonal" for one that expands */
    arrow?: 'diagonal' | 'right';
}

export const StyledButton: React.FC<StyledButtonProps> = ({
    children,
    onClick,
    sx,
    style,
    textSx,
    iconSx,
    variant = 'outline',
    arrow = 'diagonal',
    ...props
}) => {
    const { classes, cx } = useStyles();
    return (
        <Box
            className={cx(classes.styledButton, variant === 'surface' && classes.surface)}
            onClick={onClick}
            sx={sx}
            style={style}
            {...props}
        >
            <Typography
                className={cx(classes.buttonText, variant === 'outline' && classes.buttonLabel)}
                sx={textSx}
            >
                {children}
            </Typography>
            <ArrowIcon
                sx={iconSx}
                direction={arrow}
            />
        </Box>
    );
};
