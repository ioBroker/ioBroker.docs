import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Dialog, Box, Typography, useTheme } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import ReactECharts from 'echarts-for-react';
import { useStyles } from './AdapterStatsModal.styles';
import { STATISTICS_DATA_URL } from '../config/api';
import { I18n } from '../utils/i18n';
// the statistics page already owns the ranked-bar builder of this design kit, palette
// included - the version chart is the same picture with a different set of rows, so it
// uses that builder rather than a second one that would drift from it
import { rankedBarOption } from '../pages/StatisticsPage/charts';

interface AdapterStatsModalProps {
    open: boolean;
    onClose: () => void;
    adapterName: string;
    adapterId?: string;
}

const formatNumber = (value: number | undefined): string => {
    if (value === undefined || value === null) {
        return '0';
    }
    return new Intl.NumberFormat('de-DE').format(value);
};

/** how many versions get their own bar before the rest are collected */
const TOP_VERSIONS = 5;

export const AdapterStatsModal: React.FC<AdapterStatsModalProps> = ({ open, onClose, adapterName, adapterId }) => {
    const { classes } = useStyles();
    const theme = useTheme();
    /**
     * The chart is built while the dialog is still growing into place, so ECharts measures
     * a container that is not its final size yet and lays the plot area out far too
     * narrow - every bar came out as a stub. ECharts only re-measures when it is told to,
     * and it listens to window resizes, not to its own box, so the dialog says when it has
     * finished opening.
     */
    const chartRef = useRef<ReactECharts>(null);
    const chartBoxRef = useRef<HTMLDivElement>(null);
    const resizeChart = (): void => chartRef.current?.getEchartsInstance().resize();
    const [sortKey, setSortKey] = useState<'version' | 'count'>('count');
    const [sortDir, setSortDir] = useState<'asc' | 'desc'>('desc');
    // the same source the statistics page reads - through the dev proxy in development,
    // same-origin in production. It used to build its own `./` path here, which the dev
    // server could not serve, so the dialog always said "no data" while developing.
    const statsUrl = STATISTICS_DATA_URL;

    const { data } = useQuery({
        queryKey: ['statistics', statsUrl],
        queryFn: async () => {
            const response = await fetch(statsUrl);
            if (!response.ok) {
                throw new Error('Failed to fetch statistics');
            }
            const text = await response.text();
            return JSON.parse(text);
        },
        staleTime: 1000 * 60 * 10,
        enabled: open,
    });

    const { total, tableRows, chartRows } = useMemo(() => {
        if (!data || !adapterId) {
            return { total: 0, tableRows: [], chartRows: [] };
        }

        const totalCount = Number(data.adapters?.[adapterId] ?? 0);
        const versionsMap: Record<string, number> = data.versions?.[adapterId] || {};

        const versionRows = Object.entries(versionsMap)
            .map(([version, count]) => ({ version, count: Number(count) }))
            .sort((a, b) => b.count - a.count);

        const baseRows = versionRows.map(row => ({
            version: row.version,
            count: row.count,
            percent: totalCount > 0 ? `${((row.count / totalCount) * 100).toFixed(2)}%` : '0%',
        }));

        const rows = [...baseRows].sort((a, b) => {
            if (sortKey === 'version') {
                const cmp = a.version.localeCompare(b.version, undefined, { numeric: true, sensitivity: 'base' });
                return sortDir === 'asc' ? cmp : -cmp;
            }
            const cmp = a.count - b.count;
            return sortDir === 'asc' ? cmp : -cmp;
        });

        const top = versionRows.slice(0, TOP_VERSIONS);
        const rest = versionRows.slice(TOP_VERSIONS);
        const othersCount = rest.reduce((sum, item) => sum + item.count, 0);
        const bars = othersCount > 0 ? [...top, { version: I18n.t('adapters.stats.others'), count: othersCount }] : top;

        return { total: totalCount, tableRows: rows, chartRows: bars };
    }, [data, adapterId, sortDir, sortKey]);

    // ...and the same for every later change of the box: the phone dialog settles after
    // it has opened, a font arrives, the browser turns. ECharts watches the window, not
    // its own element, so the element is watched here.
    useEffect(() => {
        const box = chartBoxRef.current;
        if (!open || !box || typeof ResizeObserver === 'undefined') {
            return undefined;
        }
        const observer = new ResizeObserver(() => resizeChart());
        observer.observe(box);
        return () => observer.disconnect();
    }, [open, chartRows.length]);

    const toggleSort = (key: 'version' | 'count'): void => {
        if (sortKey === key) {
            setSortDir(prev => (prev === 'asc' ? 'desc' : 'asc'));
            return;
        }
        setSortKey(key);
        setSortDir('asc');
    };

    const handleCloseClick = (event: React.MouseEvent<HTMLElement>): void => {
        event.stopPropagation();
        onClose();
    };

    const sortArrow = (key: 'version' | 'count'): string => {
        if (sortKey !== key) {
            return '';
        }
        return sortDir === 'asc' ? '↑' : '↓';
    };

    return (
        <Dialog
            open={open}
            onClose={onClose}
            maxWidth="md"
            fullWidth
            scroll="body"
            slotProps={{
                transition: { onEntered: resizeChart },
                paper: {
                    className: classes.dialogPaper,
                    onClick: (event: React.MouseEvent<HTMLDivElement>) => event.stopPropagation(),
                },
            }}
        >
            <Box
                component="button"
                type="button"
                aria-label={I18n.t('tooltip.close')}
                className={classes.closeButton}
                onClick={handleCloseClick}
            >
                <svg
                    className={classes.closeIcon}
                    viewBox="0 0 40 40"
                    fill="none"
                    aria-hidden
                >
                    <path
                        d="M20 24.2586L5.09506 39.1635C4.53739 39.7212 3.82763 40 2.96578 40C2.10393 40 1.39417 39.7212 0.836501 39.1635C0.278833 38.6058 0 37.8961 0 37.0342C0 36.1724 0.278833 35.4626 0.836501 34.9049L15.7414 20L0.836501 5.09506C0.278833 4.53739 0 3.82763 0 2.96578C0 2.10393 0.278833 1.39417 0.836501 0.836501C1.39417 0.278833 2.10393 0 2.96578 0C3.82763 0 4.53739 0.278833 5.09506 0.836501L20 15.7414L34.9049 0.836501C35.4626 0.278833 36.1724 0 37.0342 0C37.8961 0 38.6058 0.278833 39.1635 0.836501C39.7212 1.39417 40 2.10393 40 2.96578C40 3.82763 39.7212 4.53739 39.1635 5.09506L24.2586 20L39.1635 34.9049C39.7212 35.4626 40 36.1724 40 37.0342C40 37.8961 39.7212 38.6058 39.1635 39.1635C38.6058 39.7212 37.8961 40 37.0342 40C36.1724 40 35.4626 39.7212 34.9049 39.1635L20 24.2586Z"
                        fill="currentColor"
                    />
                </svg>
            </Box>

            <Box className={classes.header}>
                <Typography className={classes.title}>{I18n.t('adapters.stats.title', adapterName)}</Typography>
                <Typography className={classes.total}>
                    {I18n.t('adapters.stats.total')}: <span className={classes.totalValue}>{formatNumber(total)}</span>
                </Typography>
            </Box>

            <Box className={classes.content}>
                <Box
                    className={classes.card}
                    ref={chartBoxRef}
                >
                    {chartRows.length > 0 ? (
                        <ReactECharts
                            ref={chartRef}
                            option={rankedBarOption(
                                theme,
                                chartRows.map(row => ({ name: row.version, value: row.count })),
                                total,
                            )}
                            style={{ height: `${Math.max(180, chartRows.length * 40 + 16)}px`, width: '100%' }}
                        />
                    ) : (
                        <Box className={classes.emptyChart}>{I18n.t('adapters.stats.no_data')}</Box>
                    )}
                </Box>

                <Box className={`${classes.card} ${classes.tableCard}`}>
                    <Box className={classes.tableHeader}>
                        <Box
                            component="button"
                            type="button"
                            className={classes.sortHeader}
                            onClick={() => toggleSort('version')}
                        >
                            {I18n.t('adapters.stats.version')}
                            <span className={classes.sortArrow}>{sortArrow('version')}</span>
                        </Box>
                        <Box
                            component="button"
                            type="button"
                            className={classes.sortHeader}
                            sx={{ justifyContent: 'flex-end' }}
                            onClick={() => toggleSort('count')}
                        >
                            {I18n.t('adapters.stats.count')}
                            <span className={classes.sortArrow}>{sortArrow('count')}</span>
                        </Box>
                        <Box className={classes.columnLabel}>{I18n.t('adapters.stats.share')}</Box>
                    </Box>
                    {tableRows.map(row => (
                        <Box
                            className={classes.tableRow}
                            key={row.version}
                        >
                            <span>{row.version}</span>
                            <span className={classes.cellNumber}>{formatNumber(row.count)}</span>
                            <span className={classes.cellShare}>{row.percent}</span>
                        </Box>
                    ))}
                </Box>
            </Box>
        </Dialog>
    );
};
