import type { ReactNode } from 'react';
import type { AdapterItem } from '../AdapterItem/AdapterItem';
import { Box } from '@mui/material';
import { I18n } from '../../utils/i18n';
import { useStyles } from './AdapterBlock.styles';

export const AdapterBlock = (props: { adapter: AdapterItem }): ReactNode => {
    const { classes } = useStyles();
    return (
        <Box className={classes.card}>
            <Box className={classes.title}>{props.adapter.title[I18n.getLanguage()]}</Box>
            <Box>
                <Box className={classes.icon}>{props.adapter.icon}</Box>
                <Box className={classes.statsBlock}>
                    <Box className={classes.statsIcon}></Box>
                    <Box className={classes.statsNumber}>{props.adapter.version}</Box>
                    <Box className={classes.statsIcon}></Box>
                    <Box className={classes.statsNumber}>{props.adapter.stars}</Box>
                    <Box className={classes.statsIcon}></Box>
                    <Box className={classes.statsNumber}>{props.adapter.installs}</Box>
                </Box>
                <Box className={classes.authorBlock}>
                    <Box className={classes.authorIcon}></Box>
                    <Box className={classes.authorName}>{props.adapter.authors}</Box>
                </Box>
                <Box className={classes.description}>{props.adapter.description[I18n.getLanguage()]}</Box>
                <Box className={classes.bottomIcons}>
                    <Box className={classes.bottomIcon}></Box>
                    <Box className={classes.bottomIcon}></Box>
                    <Box className={classes.bottomIcon}></Box>
                </Box>
            </Box>
        </Box>
    );
};
