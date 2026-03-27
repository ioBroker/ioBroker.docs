import type React from 'react';
import { memo, useEffect, useMemo, useState } from 'react';
import type { AdapterItem, Lang } from '../AdapterItem/AdapterItem';
import { Box, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import { I18n } from '../../utils/i18n';
import { Link } from 'react-router-dom';
import { useStyles } from './AdapterTable.styles';

const stripEmails = (value: string): string => {
    return value
        .replace(/\s*<[^>]*>/g, '')
        .replace(/\s{2,}/g, ' ')
        .trim();
};
import StackIcon from '../../assets/img/whiteStack.svg';
import StarIcon from '../../assets/img/whiteStar.svg';
import DownloadIcon from '../../assets/img/whiteDownloadIcon.svg';

const AdapterTableRow = memo(({ adapter, language }: { adapter: AdapterItem; language: string }) => {
    const classes = useStyles().classes;
    const lang = language as keyof Lang;
    const title = adapter.title?.[lang] || adapter.title?.en || adapter.title?.de || adapter.title?.ru || '';
    const slug = adapter.title?.en || title;
    const description =
        adapter.description?.[lang] ||
        adapter.description?.en ||
        adapter.description?.de ||
        adapter.description?.ru ||
        '';
    return (
        <TableRow
            className={classes.tableRow}
            key={slug}
        >
            <TableCell className={classes.nameCell}>
                <Link
                    to={`/adapters/${slug}`}
                    className={classes.nameContent}
                >
                    <Box className={classes.adapterIcon}>
                        <img
                            src={`https://www.iobroker.net/en/${adapter.icon}`}
                            alt={title}
                        />
                    </Box>
                    <Box className={classes.adapterName}>{title}</Box>
                </Link>
            </TableCell>
            <TableCell className={classes.descriptionCell}>
                <Link
                    to={`/adapters/${slug}`}
                    className={classes.nameContent}
                >
                    {description}
                </Link>
            </TableCell>
            <TableCell className={classes.authorCell}>
                <Link
                    to={`/adapters/${slug}`}
                    className={classes.nameContent}
                >
                    {stripEmails(adapter.authors || '')}
                </Link>
            </TableCell>
            <TableCell className={classes.statsCell}>
                <Link to={`/adapters/${slug}`}>{adapter.installs}</Link>
            </TableCell>
            <TableCell className={classes.statsCell}>
                <Link to={`/adapters/${slug}`}>{adapter.version}</Link>
            </TableCell>
            <TableCell className={`${classes.statsCell} ${classes.lastCell}`}>
                <Link to={`/adapters/${slug}`}>{adapter.stars}</Link>
            </TableCell>
        </TableRow>
    );
});

AdapterTableRow.displayName = 'AdapterTableRow';

export const AdapterTable = memo((props: { adapters: AdapterItem[] }): React.ReactNode => {
    const { classes } = useStyles();
    const language = I18n.getLanguage();
    const [visibleCount, setVisibleCount] = useState(0);

    useEffect(() => {
        const total = props.adapters.length;
        const initial = Math.min(80, total);
        setVisibleCount(initial);
        if (initial >= total) {
            return;
        }
        let cancelled = false;
        let current = initial;
        const schedule = (): void => {
            if (cancelled) {
                return;
            }
            if (current >= total) {
                return;
            }
            const next = Math.min(current + 120, total);
            current = next;
            setVisibleCount(next);
            if (current < total) {
                if ('requestIdleCallback' in window) {
                    (window as any).requestIdleCallback(schedule, { timeout: 200 });
                } else {
                    setTimeout(schedule, 0);
                }
            }
        };
        if ('requestIdleCallback' in window) {
            (window as any).requestIdleCallback(schedule, { timeout: 200 });
        } else {
            setTimeout(schedule, 0);
        }
        return () => {
            cancelled = true;
        };
    }, [props.adapters]);

    const visibleAdapters = useMemo(() => {
        return props.adapters.slice(0, visibleCount);
    }, [props.adapters, visibleCount]);

    return (
        <Box className={classes.tableContainer}>
            <Table className={classes.table}>
                <TableHead className={classes.tableHead}>
                    <TableRow>
                        <TableCell className={classes.nameCell}>Name</TableCell>
                        <TableCell className={classes.descriptionCell}>Beschreibung</TableCell>
                        <TableCell className={classes.authorCell}>Entwickler</TableCell>
                        <TableCell className={classes.statsCell}>
                            <Box className={classes.headerIcon}>
                                <img
                                    src={DownloadIcon}
                                    alt="Downloads"
                                />
                            </Box>
                        </TableCell>
                        <TableCell className={classes.statsCell}>
                            <Box className={classes.headerIcon}>
                                <img
                                    src={StackIcon}
                                    alt="Version"
                                />
                            </Box>
                        </TableCell>
                        <TableCell className={`${classes.statsCell} ${classes.lastCell}`}>
                            <Box className={classes.headerIcon}>
                                <img
                                    src={StarIcon}
                                    alt="Stars"
                                />
                            </Box>
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {visibleAdapters.map(adapter => (
                        <AdapterTableRow
                            key={adapter.content}
                            adapter={adapter}
                            language={language}
                        />
                    ))}
                </TableBody>
            </Table>
        </Box>
    );
});

AdapterTable.displayName = 'AdapterTable';
