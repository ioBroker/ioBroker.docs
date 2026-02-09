import type { ReactNode } from 'react';
import type { AdapterItem } from '../AdapterItem/AdapterItem';
import { Box, IconButton } from '@mui/material';
import { I18n } from '../../utils/i18n';
import { useStyles } from './AdapterBlock.styles';
import { Link } from 'react-router-dom';

export const AdapterBlock = (props: { adapter: AdapterItem }): ReactNode => {
    const { classes } = useStyles();
    return (
        <Box className={classes.card}>
            <Box className={classes.title}>
                <Link to={`/adapters/${props.adapter.title.en}`}>{props.adapter.title[I18n.getLanguage()]}</Link>
            </Box>
            <Box className={classes.topIcons}>
                <Box className={classes.icon}>
                    <img
                        src={`https://www.iobroker.net/en/${props.adapter.icon}`}
                        alt={props.adapter.title[I18n.getLanguage()]}
                    />
                </Box>
                <Box className={classes.statsBlocks}>
                    <Box className={classes.statsBlock}>
                        <Box className={classes.statsIcon}></Box>
                        <Box className={classes.statsNumber}>{props.adapter.version}</Box>
                    </Box>
                    <Box className={classes.statsBlock}>
                        <Box className={classes.statsIcon}></Box>
                        <Box className={classes.statsNumber}>{props.adapter.stars}</Box>
                    </Box>
                    <Box className={classes.statsBlock}>
                        <Box className={classes.statsIcon}></Box>
                        <Box className={classes.statsNumber}>{props.adapter.installs}</Box>
                    </Box>
                </Box>
            </Box>
            <Box className={classes.authorBlock}>
                <Box className={classes.authorIcon}></Box>
                <Box className={classes.authorName}>{props.adapter.authors}</Box>
            </Box>
            <Box className={classes.description}>{props.adapter.description[I18n.getLanguage()]}</Box>
            <Box className={classes.bottomIcons}>
                <Box className={classes.bottomIcon}>
                    <IconButton></IconButton>
                </Box>
                <Box className={classes.bottomIcon}>
                    <IconButton></IconButton>
                </Box>
                <Box className={classes.bottomIcon}>
                    <IconButton></IconButton>
                </Box>
            </Box>
        </Box>
    );
};
