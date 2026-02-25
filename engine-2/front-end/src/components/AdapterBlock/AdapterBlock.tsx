import type { ReactNode } from 'react';
import type { AdapterItem } from '../AdapterItem/AdapterItem';
import { Box } from '@mui/material';
import { I18n } from '../../utils/i18n';
import { useStyles } from './AdapterBlock.styles';
import StackIcon from '../../assets/img/whiteStack.svg'
import StarIcon from '../../assets/img/whiteStar.svg'
import DownloadIcon from '../../assets/img/whiteDownloadIcon.svg'
import AuthorIcon from '../../assets/img/whiteUser.svg'
import GitHubIcon from '../../assets/img/whiteGithubIcon.svg';
import DiagramIcon from '../../assets/img/whitePieDiagram.svg';
import BookIcon from '../../assets/img/whiteBook.svg';
import { Link } from 'react-router-dom';

export const AdapterBlock = (props: { adapter: AdapterItem }): ReactNode => {
    const { classes } = useStyles();
    return (
        <Box className={classes.card}>
            <Box className={classes.title}>
                <Link to={`/adapters/${props.adapter.title.en}`} className={classes.titleLink}>{props.adapter.title[I18n.getLanguage()]}</Link>
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
                        <Box className={classes.statsIcon}>
                            <img
                                alt="Stack Icon"
                                src={StackIcon}
                            />
                        </Box>
                        <Box className={classes.statsNumber}>{props.adapter.version}</Box>
                    </Box>
                    <Box className={classes.statsBlock}>
                        <Box className={classes.statsIcon}>
                            <img
                                alt="Star Icon"
                                src={StarIcon}
                            />
                        </Box>
                        <Box className={classes.statsNumber}>{props.adapter.stars}</Box>
                    </Box>
                    <Box className={classes.statsBlock}>
                        <Box className={classes.statsIcon}>
                            <img
                                alt="Download Icon"
                                src={DownloadIcon}
                            />
                        </Box>
                        <Box className={classes.statsNumber}>{props.adapter.installs}</Box>
                    </Box>
                </Box>
            </Box>
            <Box className={classes.authorBlock}>
                <Box className={classes.authorIcon}>
                    <img
                        alt="Author Icon"
                        src={AuthorIcon}
                    />
                </Box>
                <Box className={classes.authorName}>{props.adapter.authors}</Box>
            </Box>
            <Box className={classes.description}>{props.adapter.description[I18n.getLanguage()]}</Box>
            <Box className={classes.bottomIcons}>
                <Box className={classes.bottomIcon}>
                    <img
                        alt="GitHub Icon"
                        src={GitHubIcon}
                    />
                </Box>
                <Box className={classes.bottomIcon}>
                    <img
                        alt="Diagram Icon"
                        src={DiagramIcon}
                    />
                </Box>
                <Box className={classes.bottomIcon}>
                    <img
                        alt="Book Icon"
                        src={BookIcon}
                    />
                </Box>
            </Box>
        </Box>
    );
};
