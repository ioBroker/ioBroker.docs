import type { ReactNode } from 'react';
import { memo, useState } from 'react';
import type { AdapterItem } from '../AdapterItem/AdapterItem';
import { Box } from '@mui/material';
import { I18n } from '../../utils/i18n';
import { useStyles } from './AdapterBlock.styles';
import StackIcon from '../../assets/img/whiteStack.svg';
import StarIcon from '../../assets/img/whiteStar.svg';
import DownloadIcon from '../../assets/img/whiteDownloadIcon.svg';
import AuthorIcon from '../../assets/img/whiteUser.svg';
import GitHubIcon from '../../assets/img/whiteGithubIcon.svg';
import DiagramIcon from '../../assets/img/whitePieDiagram.svg';
import BookIcon from '../../assets/img/whiteBook.svg';
import { Link, useNavigate } from 'react-router-dom';
import { AdapterStatsModal } from '../AdapterStatsModal';

const stripEmails = (value: string): string => {
    return value
        .replace(/\s*<[^>]*>/g, '')
        .replace(/\s{2,}/g, ' ')
        .trim();
};

export const AdapterBlock = memo((props: { adapter: AdapterItem }): ReactNode => {
    const { classes } = useStyles();
    const navigate = useNavigate();
    const [isStatsOpen, setIsStatsOpen] = useState(false);
    const language = I18n.getLanguage();
    const title =
        props.adapter.title?.[language] ||
        props.adapter.title?.en ||
        props.adapter.title?.de ||
        props.adapter.title?.ru ||
        '';
    const slug = props.adapter.title?.en || title;
    const description =
        props.adapter.description?.[language] ||
        props.adapter.description?.en ||
        props.adapter.description?.de ||
        props.adapter.description?.ru ||
        '';
    const handleNavigate = (): void => {
        if (slug) {
            void navigate(`/adapters/${slug}`);
        }
    };
    const handleGitHubClick = (event: React.MouseEvent): void => {
        event.stopPropagation();
        if (props.adapter.github) {
            window.open(props.adapter.github, '_blank', 'noreferrer');
        }
    };
    const handleStatsClick = (event: React.MouseEvent): void => {
        event.stopPropagation();
        setIsStatsOpen(true);
    };
    const handleBookClick = (event: React.MouseEvent): void => {
        event.stopPropagation();
        handleNavigate();
    };
    return (
        <Box className={classes.card}>
            <Box className={classes.title}>
                <Link
                    to={`/adapters/${slug}`}
                    className={classes.titleLink}
                >
                    {title}
                </Link>
            </Box>
            <Box className={classes.topIcons}>
                <Box
                    className={classes.icon}
                    onClick={handleNavigate}
                >
                    <img
                        src={`https://www.iobroker.net/en/${props.adapter.icon}`}
                        alt={title}
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
                <Box className={classes.authorName}>{stripEmails(props.adapter.authors || '')}</Box>
            </Box>
            <Box
                className={classes.description}
                onClick={handleNavigate}
            >
                {description}
            </Box>
            <Box className={classes.bottomIcons}>
                <Box
                    className={classes.bottomIcon}
                    onClick={handleGitHubClick}
                >
                    <img
                        alt="GitHub Icon"
                        src={GitHubIcon}
                    />
                </Box>
                <Box
                    className={classes.bottomIcon}
                    onClick={handleStatsClick}
                >
                    <img
                        alt="Diagram Icon"
                        src={DiagramIcon}
                    />
                </Box>
                <Box
                    className={classes.bottomIcon}
                    onClick={handleBookClick}
                >
                    <img
                        alt="Book Icon"
                        src={BookIcon}
                    />
                </Box>
            </Box>
            <AdapterStatsModal
                open={isStatsOpen}
                onClose={() => setIsStatsOpen(false)}
                adapterName={title}
                adapterId={props.adapter.title?.en}
            />
        </Box>
    );
});

AdapterBlock.displayName = 'AdapterBlock';
