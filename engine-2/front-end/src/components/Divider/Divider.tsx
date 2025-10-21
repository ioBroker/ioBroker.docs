import React from 'react';
import { Box } from '@mui/material';
import { useStyles } from './Divider.styles';
import { useTheme } from '@mui/material/styles';
import logo from '../../assets/img/logo_net_small.svg';

interface DividerProps {
    position?: number;
    parentWidth?: number;
    thick?: number;
    style?: React.CSSProperties;
    sx?: Record<string, any>;
}

export default function Divider(props: DividerProps): React.JSX.Element {
    const { classes } = useStyles();
    const theme = useTheme();

    let left: number | undefined;
    if (props.position !== undefined) {
        const parentWidth = props.parentWidth || window.innerWidth;
        left = parentWidth * (props.position / 100) - 15;
        if (left > parentWidth - 15) {
            left = parentWidth - 15;
        } else if (left < 0) {
            left = 0;
        }
    }

    return (
        <Box
            className={classes.divider}
            sx={{
                ...props.sx,
            }}
            style={{
                borderBottom: `${props.thick || 2}px solid ${theme.palette.primary.main}`,
                ...props.style,
            }}
        >
            {left !== undefined ? (
                <img
                    src={logo}
                    className={classes.logo}
                    style={{
                        left,
                    }}
                    alt="logo"
                />
            ) : null}
        </Box>
    );
}
