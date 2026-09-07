import React from 'react';
import { Box } from '@mui/material';

import MenuListIcon from '../icons/MenuListIcon';
import { useStyles } from './MenuOpenButton.styles';

interface MenuOpenButtonProps {
    onClick: () => void;
    title?: string;
}

export function MenuOpenButton({ onClick, title }: MenuOpenButtonProps): React.ReactNode {
    const { classes } = useStyles();

    return (
        <Box
            component="button"
            type="button"
            title={title}
            aria-label={title}
            className={classes.button}
            onClick={onClick}
        >
            <Box className={classes.frame}>
                <Box className={classes.tile}>
                    <MenuListIcon />
                </Box>
            </Box>
        </Box>
    );
}
