import { useMemo, useState } from 'react';
import { Box, TextField, Typography, useTheme } from '@mui/material';
import ReactECharts from 'echarts-for-react';
import { useStyles } from './StatisticsPage.styles';
import { SectionTitle } from '../../components/SectionTitle/SectionTitle';
import { I18n } from '../../utils/i18n';
import { InstallationMap } from './InstallationMap';
import { useStatistics, type Entry } from './useStatistics';
import { chartPalette, databaseOption, formatNumber, formatShare, nodeVersionOption, rankedBarOption } from './charts';

/** how many rows the ranked charts show before the table takes over */
const TOP_COUNTRIES = 10;
const TOP_ADAPTERS = 15;

/** the platform ids as they arrive, in the words people use for them */
const PLATFORM_LABELS: Record<string, string> = {
    linux: 'Linux',
    win32: 'Windows',
    darwin: 'macOS',
    freebsd: 'FreeBSD',
    android: 'Android',
};

/** the long tail of a ranked chart, and its reading without colour */
const RankTable = ({ rows, base, head }: { rows: Entry[]; base: number; head: string }): React.ReactNode => {
    const { classes, cx } = useStyles();
    return (
        <Box className={classes.tableScroll}>
            <table className={classes.table}>
                <thead>
                    <tr>
                        <th className={cx(classes.th, classes.thNumeric)}>#</th>
                        <th className={classes.th}>{head}</th>
                        <th className={cx(classes.th, classes.thNumeric)}>{I18n.t('statistics.column.count')}</th>
                        <th className={cx(classes.th, classes.thNumeric)}>{I18n.t('statistics.column.share')}</th>
                    </tr>
                </thead>
                <tbody>
                    {rows.map((row, index) => (
                        <tr key={row.name}>
                            <td className={cx(classes.td, classes.tdNumeric, classes.tdMuted)}>{index + 1}</td>
                            <td className={classes.td}>{row.name}</td>
                            <td className={cx(classes.td, classes.tdNumeric)}>{formatNumber(row.value)}</td>
                            <td className={cx(classes.td, classes.tdNumeric, classes.tdMuted)}>
                                {formatShare(row.value, base)}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </Box>
    );
};

const StatisticsPage = (): React.ReactNode => {
    const { classes, cx } = useStyles();
    const theme = useTheme();
    const colors = chartPalette(theme);
    const { data, isLoading, isError } = useStatistics();

    const [countrySearch, setCountrySearch] = useState('');
    const [adapterSearch, setAdapterSearch] = useState('');

    const languageName = useMemo(() => {
        // `none` is not a language - it is an installation that reported no setting
        const display = new Intl.DisplayNames([I18n.getLanguage() || 'de'], { type: 'language' });
        return (code: string): string => {
            if (code === 'none') {
                return I18n.t('statistics.languages.none');
            }
            try {
                return display.of(code.toLowerCase().replace('zhch', 'zh-CN').replace('zhcn', 'zh-CN')) ?? code;
            } catch {
                return code;
            }
        };
    }, []);

    const filterRows = (rows: Entry[], term: string): Entry[] => {
        const needle = term.trim().toLowerCase();
        return needle ? rows.filter(row => row.name.toLowerCase().includes(needle)) : rows;
    };

    if (isLoading || isError || !data) {
        return (
            <Box className={classes.pageWrapper}>
                <Box className={classes.pageContainer}>
                    <SectionTitle sx={{ marginBottom: '8px !important' }}>{I18n.t('statistics.title')}</SectionTitle>
                    <Typography className={classes.message}>
                        {isError ? I18n.t('statistics.error') : I18n.t('statistics.loading')}
                    </Typography>
                </Box>
            </Box>
        );
    }

    const snapshot = data.date
        ? data.date.toLocaleDateString('de-DE', { day: '2-digit', month: 'long', year: 'numeric' })
        : '–';
    const dockerShare = formatShare(data.docker.docker, data.docker.base);
    const dockerPercent = data.docker.base > 0 ? (data.docker.docker / data.docker.base) * 100 : 0;

    const countryRows = filterRows(data.countries, countrySearch);
    const adapterRows = filterRows(data.adapters, adapterSearch);

    /** a chart's base line: how many installations this distribution speaks for */
    const baseNote = (covered: number): string =>
        I18n.t('statistics.base')
            .replace('%c', formatNumber(covered))
            .replace('%t', formatNumber(data.total))
            .replace('%p', formatShare(covered, data.total));

    return (
        <Box className={classes.pageWrapper}>
            <Box className={classes.pageContainer}>
                <SectionTitle sx={{ marginBottom: '8px !important' }}>{I18n.t('statistics.title')}</SectionTitle>
                <Typography className={classes.subtitle}>{I18n.t('statistics.subtitle')}</Typography>

                {/* Four unrelated headline numbers - tiles, not a chart. */}
                <Box className={classes.kpiRow}>
                    <Box className={classes.kpiTile}>
                        <Typography className={classes.kpiLabel}>{I18n.t('statistics.kpi.installations')}</Typography>
                        <Typography className={classes.kpiValue}>{formatNumber(data.total)}</Typography>
                    </Box>
                    <Box className={classes.kpiTile}>
                        <Typography className={classes.kpiLabel}>{I18n.t('statistics.kpi.adapters')}</Typography>
                        <Typography className={classes.kpiValue}>{formatNumber(data.adapterCount)}</Typography>
                    </Box>
                    <Box className={classes.kpiTile}>
                        <Typography className={classes.kpiLabel}>{I18n.t('statistics.kpi.multihosts')}</Typography>
                        <Typography className={classes.kpiValue}>{formatNumber(data.multihosts)}</Typography>
                        <Typography className={classes.kpiNote}>
                            {formatShare(data.multihosts, data.total)} {I18n.t('statistics.kpi.ofAll')}
                        </Typography>
                    </Box>
                    <Box className={classes.kpiTile}>
                        <Typography className={classes.kpiLabel}>{I18n.t('statistics.kpi.snapshot')}</Typography>
                        <Typography className={cx(classes.kpiValue, classes.kpiValueDate)}>{snapshot}</Typography>
                    </Box>
                </Box>

                {/* ---------------------------------------------------------- map */}
                <Box className={classes.card}>
                    <Typography className={classes.cardTitle}>{I18n.t('statistics.map.title')}</Typography>
                    <Typography className={classes.cardBase}>{baseNote(data.coverage.countries)}</Typography>
                    <InstallationMap />
                </Box>

                {/* ------------------------------------------- countries + platforms */}
                <Box className={classes.sectionGrid}>
                    <Box className={cx(classes.card, classes.cardInGrid)}>
                        <Typography className={classes.cardTitle}>{I18n.t('statistics.countries.title')}</Typography>
                        <Typography className={classes.cardBase}>{baseNote(data.coverage.countries)}</Typography>
                        <ReactECharts
                            className={classes.chart}
                            style={{ height: 360 }}
                            option={rankedBarOption(
                                theme,
                                data.countries.slice(0, TOP_COUNTRIES),
                                data.coverage.countries,
                            )}
                            notMerge
                            opts={{ renderer: 'svg' }}
                        />
                    </Box>
                    <Box className={cx(classes.card, classes.cardInGrid)}>
                        <Typography className={classes.cardTitle}>{I18n.t('statistics.platforms.title')}</Typography>
                        <Typography className={classes.cardBase}>{baseNote(data.coverage.platforms)}</Typography>
                        <ReactECharts
                            className={classes.chart}
                            style={{ height: 360 }}
                            option={rankedBarOption(
                                theme,
                                data.platforms,
                                data.coverage.platforms,
                                name => PLATFORM_LABELS[name] ?? name,
                            )}
                            notMerge
                            opts={{ renderer: 'svg' }}
                        />
                    </Box>
                </Box>

                {/* ------------------------------------------------- country table */}
                <Box className={classes.card}>
                    <Typography className={classes.cardTitle}>{I18n.t('statistics.countries.tableTitle')}</Typography>
                    <Typography className={classes.cardBase}>{baseNote(data.coverage.countries)}</Typography>
                    <Box className={classes.tableTools}>
                        <TextField
                            className={classes.search}
                            size="small"
                            placeholder={I18n.t('statistics.countries.search')}
                            value={countrySearch}
                            onChange={event => setCountrySearch(event.target.value)}
                        />
                        <Typography className={classes.tableCount}>
                            {I18n.t('statistics.rows')
                                .replace('%n', formatNumber(countryRows.length))
                                .replace('%t', formatNumber(data.countries.length))}
                        </Typography>
                    </Box>
                    <RankTable
                        rows={countryRows}
                        base={data.coverage.countries}
                        head={I18n.t('statistics.countries.column')}
                    />
                </Box>

                {/* ----------------------------------------- languages + node versions */}
                <Box className={classes.sectionGrid}>
                    <Box className={cx(classes.card, classes.cardInGrid)}>
                        <Typography className={classes.cardTitle}>{I18n.t('statistics.languages.title')}</Typography>
                        <Typography className={classes.cardBase}>{baseNote(data.coverage.languages)}</Typography>
                        <ReactECharts
                            className={classes.chart}
                            style={{ height: 360 }}
                            option={rankedBarOption(theme, data.languages, data.coverage.languages, languageName)}
                            notMerge
                            opts={{ renderer: 'svg' }}
                        />
                    </Box>
                    <Box className={cx(classes.card, classes.cardInGrid)}>
                        <Typography className={classes.cardTitle}>{I18n.t('statistics.nodes.title')}</Typography>
                        <Typography className={classes.cardBase}>{I18n.t('statistics.nodes.note')}</Typography>
                        <ReactECharts
                            className={classes.chart}
                            style={{ height: 360 }}
                            option={nodeVersionOption(theme, data.nodes, data.total)}
                            notMerge
                            opts={{ renderer: 'svg' }}
                        />
                    </Box>
                </Box>

                {/* --------------------------------------------- docker + databases */}
                <Box className={classes.sectionGrid}>
                    <Box className={cx(classes.card, classes.cardInGrid)}>
                        <Typography className={classes.cardTitle}>{I18n.t('statistics.docker.title')}</Typography>
                        <Typography className={classes.cardBase}>{baseNote(data.coverage.docker)}</Typography>
                        <Box className={classes.shareRow}>
                            <Typography className={classes.shareValue}>{dockerShare}</Typography>
                            <Typography className={classes.shareLabel}>
                                {I18n.t('statistics.docker.inDocker')}
                            </Typography>
                        </Box>
                        <Box
                            className={classes.shareTrack}
                            sx={{ background: colors.track }}
                            role="img"
                            aria-label={`${dockerShare} ${I18n.t('statistics.docker.inDocker')}`}
                        >
                            <Box
                                className={classes.shareFill}
                                sx={{ width: `${dockerPercent}%`, background: colors.series }}
                            />
                        </Box>
                        <Box className={classes.shareLegend}>
                            <span className={classes.shareLegendItem}>
                                <span
                                    className={classes.shareSwatch}
                                    style={{ background: colors.series }}
                                />
                                {I18n.t('statistics.docker.docker')} · {formatNumber(data.docker.docker)}
                            </span>
                            <span className={classes.shareLegendItem}>
                                <span
                                    className={classes.shareSwatch}
                                    style={{ background: colors.track }}
                                />
                                {I18n.t('statistics.docker.normal')} · {formatNumber(data.docker.normal)}
                            </span>
                        </Box>
                    </Box>
                    <Box className={cx(classes.card, classes.cardInGrid)}>
                        <Typography className={classes.cardTitle}>{I18n.t('statistics.databases.title')}</Typography>
                        <Typography className={classes.cardBase}>{I18n.t('statistics.databases.note')}</Typography>
                        <ReactECharts
                            className={classes.chart}
                            style={{ height: 300 }}
                            option={databaseOption(theme, data.databases, {
                                objects: I18n.t('statistics.databases.objects'),
                                states: I18n.t('statistics.databases.states'),
                            })}
                            notMerge
                            opts={{ renderer: 'svg' }}
                        />
                    </Box>
                </Box>

                {/* ------------------------------------------------------- adapters */}
                <Box className={classes.card}>
                    <Typography className={classes.cardTitle}>{I18n.t('statistics.adapters.title')}</Typography>
                    <Typography className={classes.cardBase}>
                        {I18n.t('statistics.adapters.note').replace('%n', formatNumber(TOP_ADAPTERS))}
                    </Typography>
                    <ReactECharts
                        className={classes.chart}
                        style={{ height: 480 }}
                        option={rankedBarOption(theme, data.adapters.slice(0, TOP_ADAPTERS), data.total)}
                        notMerge
                        opts={{ renderer: 'svg' }}
                    />
                </Box>

                <Box className={classes.card}>
                    <Typography className={classes.cardTitle}>{I18n.t('statistics.adapters.tableTitle')}</Typography>
                    <Typography className={classes.cardBase}>{I18n.t('statistics.adapters.tableNote')}</Typography>
                    <Box className={classes.tableTools}>
                        <TextField
                            className={classes.search}
                            size="small"
                            placeholder={I18n.t('statistics.adapters.search')}
                            value={adapterSearch}
                            onChange={event => setAdapterSearch(event.target.value)}
                        />
                        <Typography className={classes.tableCount}>
                            {I18n.t('statistics.rows')
                                .replace('%n', formatNumber(adapterRows.length))
                                .replace('%t', formatNumber(data.adapters.length))}
                        </Typography>
                    </Box>
                    <RankTable
                        rows={adapterRows}
                        base={data.total}
                        head={I18n.t('statistics.adapters.column')}
                    />
                </Box>
            </Box>
        </Box>
    );
};

export default StatisticsPage;
