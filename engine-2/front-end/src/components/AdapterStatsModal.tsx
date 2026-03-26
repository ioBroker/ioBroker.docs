import React, { useMemo, useState } from 'react';
import { Dialog, Box, Typography } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import ReactECharts from 'echarts-for-react';
import { useStyles } from './AdapterStatsModal.styles';
import { API_CONFIG } from '../config/api';

interface AdapterStatsModalProps {
    open: boolean;
    onClose: () => void;
    adapterName: string;
    adapterId?: string;
}

const formatNumber = (value: number | undefined): string => {
    if (value === undefined || value === null) return '0';
    return new Intl.NumberFormat('de-DE').format(value);
};

const CHART_COLORS = ['#4CB6E7', '#6AE7C8', '#5A6B9E', '#93A2D8', '#BFE7A0', '#D0D0D0'];

export const AdapterStatsModal: React.FC<AdapterStatsModalProps> = ({ open, onClose, adapterName, adapterId }) => {
    const { classes } = useStyles();
    const [sortKey, setSortKey] = useState<'version' | 'count'>('count');
    const [sortDir, setSortDir] = useState<'asc' | 'desc'>('desc');
    const statsUrl = `${API_CONFIG.IOBROKER_BASE_URL}/data/statistics.json`;
    
    const { data } = useQuery({
        queryKey: ['statistics', statsUrl],
        queryFn: async () => {
            const response = await fetch(statsUrl);
            if (!response.ok) {
                throw new Error('Failed to fetch statistics');
            }
            const text = await response.text();
            return JSON.parse(text) as any;
        },
        staleTime: 1000 * 60 * 10,
        enabled: open,
    });

    const { total, tableRows, chartData } = useMemo(() => {
        if (!data || !adapterId) {
            return { total: 0, tableRows: [], chartData: [] };
        }
        
        const totalCount = Number(data.adapters?.[adapterId] ?? 0);
        const versionsMap: Record<string, number> = data.versions?.[adapterId] || {};
        
        const versionRows = Object.entries(versionsMap)
            .map(([version, count]) => ({ version, count: Number(count) }))
            .sort((a, b) => b.count - a.count);
            
        const baseRows = versionRows.map((row) => ({
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
        
        const top = versionRows.slice(0, 5);
        const rest = versionRows.slice(5);
        const othersCount = rest.reduce((sum, item) => sum + item.count, 0);
        
        const chartRawData = othersCount > 0 ? [...top, { version: 'others', count: othersCount }] : top;
        
        const formattedChartData = chartRawData.map((item) => ({
            name: item.version,
            value: item.count
        }));

        return { total: totalCount, tableRows: rows, chartData: formattedChartData };
    }, [data, adapterId, sortDir, sortKey]);

    const toggleSort = (key: 'version' | 'count') => {
        if (sortKey === key) {
            setSortDir((prev) => (prev === 'asc' ? 'desc' : 'asc'));
            return;
        }
        setSortKey(key);
        setSortDir('asc');
    };

    const getChartOption = () => {
        return {
            color: CHART_COLORS,
            tooltip: {
                trigger: 'item',
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                borderColor: '#ccc',
                borderWidth: 1,
                textStyle: { color: '#333' },
                formatter: function (params: any) {
                    return `
                        <div style="font-family: inherit;">
                            <div style="color: #666; font-size: 13px; text-align: center; margin-bottom: 4px;">Count</div>
                            <div style="color: #333; font-size: 14px;">
                                ${params.name} : ${params.value} (${params.percent}%)
                            </div>
                        </div>
                    `;
                }
            },
            legend: {
                orient: 'vertical',
                right: '0%', 
                top: 'start',
                icon: 'roundRect',
                itemWidth: 14,
                itemHeight: 14,
                textStyle: {
                    color: '#5A5A5A',
                    fontSize: 12
                }
            },
            series: [
                {
                    name: 'Versions',
                    type: 'pie',
                    radius: '75%', 
                    center: ['40%', '50%'],
                    data: chartData,
                    label: {
                        show: true,
                        formatter: '{b}',
                        color: '#5A5A5A'
                    },
                    labelLine: {
                        show: true,
                        length: 15,
                        length2: 10,
                        smooth: true
                    },
                    emphasis: {
                        itemStyle: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        },
                    }
                }
            ]
        };
    };

    const handleCloseClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.stopPropagation();
        onClose();
    };

    return (
        <Dialog
            open={open}
            onClose={onClose}
            maxWidth="md"
            PaperProps={{
                className: classes.dialogPaper,
                onClick: (event: React.MouseEvent<HTMLDivElement>) => event.stopPropagation(),
            }}
        >
            <Box className={classes.container} onClick={(event) => event.stopPropagation()}>
                <Typography className={classes.title}>Adapter {adapterName} statistics</Typography>
                <Typography className={classes.total}>Total count: {formatNumber(total)}</Typography>
                
                <Box className={classes.content}>
                    <Box className={classes.chartCard}>
                        {chartData.length > 0 ? (
                            <ReactECharts 
                                option={getChartOption()} 
                                style={{ height: '300px', width: '100%' }}
                                notMerge={true}
                                lazyUpdate={true}
                            />
                        ) : (
                            <Box sx={{ display: 'flex', height: '300px', alignItems: 'center', justifyContent: 'center' }}>
                                <Typography color="textSecondary">No data</Typography>
                            </Box>
                        )}
                    </Box>

                    <Box className={classes.tableCard}>
                        <Box className={classes.tableHeader}>
                            <span className={classes.sortHeader} onClick={() => toggleSort('version')}>
                                Version <span className={classes.sortArrow}>{sortKey === 'version' ? (sortDir === 'asc' ? '↑' : '↓') : ''}</span>
                            </span>
                            <span className={classes.sortHeader} onClick={() => toggleSort('count')}>
                                Count <span className={classes.sortArrow}>{sortKey === 'count' ? (sortDir === 'asc' ? '↑' : '↓') : ''}</span>
                            </span>
                            <span>%</span>
                        </Box>
                        {tableRows.map((row, index) => (
                            <Box className={classes.tableRow} key={index}>
                                <span>{row.version}</span>
                                <span>{formatNumber(row.count)}</span>
                                <span>{row.percent}</span>
                            </Box>
                        ))}
                    </Box>
                </Box>

                <Box className={classes.closeRow}>
                    <button className={classes.closeButton} onClick={handleCloseClick}>CLOSE</button>
                </Box>
            </Box>
        </Dialog>
    );
};
