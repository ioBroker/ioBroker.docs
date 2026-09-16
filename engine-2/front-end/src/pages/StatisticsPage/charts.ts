import type { Theme } from '@mui/material';
import type { Entry } from './useStatistics';

/**
 * The chart palette, validated against the card surface it is drawn on
 * (light #E6EEF7, dark #031D38) for lightness band, chroma, colour-vision
 * separation and contrast.
 *
 * Almost every chart on this page is single-series: one measure, many categories.
 * That is a job for one hue, not for a set of colours - colour here would encode
 * nothing that the bar length does not already say. `series` is that hue. `compare`
 * is the second slot, used only where two measures genuinely sit side by side
 * (objects against states); it is below 3:1 on the light card, so those bars carry
 * their values as visible labels.
 */
export const chartPalette = (theme: Theme): { series: string; compare: string; track: string } => {
    const dark = theme.palette.mode === 'dark';
    return {
        series: dark ? '#1D90CA' : '#005894',
        compare: dark ? '#D95926' : '#EB6834',
        track: dark ? 'rgba(126, 195, 243, 0.16)' : 'rgba(0, 88, 148, 0.14)',
    };
};

/** the ink of the chart itself - axes and labels are text, never the series colour */
const ink = (theme: Theme): { text: string; muted: string; line: string } => ({
    text: theme.palette.text.primary,
    muted: theme.custom.textSubtle,
    line: theme.custom.hairline,
});

const deFormat = new Intl.NumberFormat('de-DE');
export const formatNumber = (value: number): string => deFormat.format(Math.round(value));

/**
 * A share of its own base, never of the grand total. A single installation out of
 * 41.860 is not "0,00 %" - rounding it to zero says the row does not exist, when the
 * honest statement is that it is below the smallest share this page prints.
 */
export const formatShare = (value: number, base: number): string => {
    if (base <= 0) {
        return '–';
    }
    const share = (value / base) * 100;
    if (value > 0 && share < 0.01) {
        return '< 0,01 %';
    }
    return `${share.toFixed(share < 0.1 ? 2 : 1).replace('.', ',')} %`;
};

const tooltipStyle = (theme: Theme): Record<string, unknown> => ({
    backgroundColor: theme.custom.surfaces.overlay,
    borderColor: theme.custom.hairlineStrong,
    borderWidth: 1,
    textStyle: { color: theme.palette.text.primary, fontFamily: theme.typography.fontFamily, fontSize: 13 },
    extraCssText: `border-radius:${theme.custom.radius.chip}px; box-shadow:${theme.custom.elevation.overlay};`,
});

/**
 * NOT CURRENTLY RENDERED - the section was taken off the page on request. The builder
 * and its data stay because the curve is the one eleven-year story in this file and
 * putting it back is a matter of dropping the card in again, not rebuilding it.
 *
 * Installations over time: one series, so no legend - the heading names it. An area
 * under the line carries the sense of an accumulating total; the crosshair lets a
 * reader take a value off any of the 397 points instead of guessing between labels.
 */
export const growthOption = (theme: Theme, points: { date: string; value: number }[]): Record<string, unknown> => {
    const colors = chartPalette(theme);
    const c = ink(theme);
    return {
        grid: { left: 8, right: 16, top: 16, bottom: 8, containLabel: true },
        tooltip: {
            trigger: 'axis',
            axisPointer: { type: 'line', lineStyle: { color: c.muted, width: 1, type: 'dashed' } },
            ...tooltipStyle(theme),
            formatter: (params: { axisValue: string; data: number }[]): string => {
                const point = params[0];
                const date = new Date(point.axisValue);
                const label = Number.isNaN(date.getTime())
                    ? point.axisValue
                    : date.toLocaleDateString('de-DE', { day: '2-digit', month: 'long', year: 'numeric' });
                return `<div style="opacity:.7;margin-bottom:2px">${label}</div><b>${formatNumber(point.data)}</b>`;
            },
        },
        xAxis: {
            type: 'category',
            data: points.map(p => p.date),
            boundaryGap: false,
            axisLine: { lineStyle: { color: c.line } },
            axisTick: { show: false },
            axisLabel: {
                color: c.muted,
                fontFamily: theme.typography.fontFamily,
                formatter: (value: string): string => value.slice(0, 4),
                // one label per year, not per snapshot
                interval: (index: number, value: string): boolean =>
                    index === 0 || value.slice(5) === points[index - 1]?.date.slice(5)
                        ? false
                        : value.slice(0, 4) !== points[index - 1]?.date.slice(0, 4),
            },
        },
        yAxis: {
            type: 'value',
            axisLabel: {
                color: c.muted,
                fontFamily: theme.typography.fontFamily,
                formatter: (value: number): string => (value >= 1000 ? `${value / 1000}k` : String(value)),
            },
            // the grid is a reading aid, not part of the picture
            splitLine: { lineStyle: { color: c.line } },
        },
        series: [
            {
                type: 'line',
                data: points.map(p => p.value),
                showSymbol: false,
                lineStyle: { width: 2, color: colors.series },
                itemStyle: { color: colors.series },
                areaStyle: { color: colors.series, opacity: theme.palette.mode === 'dark' ? 0.22 : 0.12 },
                emphasis: { focus: 'none' },
            },
        ],
    };
};

/**
 * A ranked distribution: horizontal bars, because the categories are named and the
 * names need room. Values sit at the end of each bar, so nothing has to be read off
 * an axis - and the labels double as the relief the contrast check asks for.
 */
export const rankedBarOption = (
    theme: Theme,
    entries: Entry[],
    base: number,
    labelOf?: (name: string) => string,
): Record<string, unknown> => {
    const colors = chartPalette(theme);
    const c = ink(theme);
    // largest at the top: ECharts draws a category axis bottom-up
    const rows = [...entries].reverse();
    return {
        grid: { left: 8, right: 72, top: 8, bottom: 8, containLabel: true },
        tooltip: {
            trigger: 'item',
            ...tooltipStyle(theme),
            formatter: (p: { name: string; value: number }): string =>
                `<div style="opacity:.7;margin-bottom:2px">${labelOf ? labelOf(p.name) : p.name}</div>` +
                `<b>${formatNumber(p.value)}</b> · ${formatShare(p.value, base)}`,
        },
        xAxis: { type: 'value', show: false, max: 'dataMax' },
        yAxis: {
            type: 'category',
            data: rows.map(r => (labelOf ? labelOf(r.name) : r.name)),
            axisLine: { show: false },
            axisTick: { show: false },
            axisLabel: { color: c.text, fontFamily: theme.typography.fontFamily, fontSize: 14 },
        },
        series: [
            {
                type: 'bar',
                data: rows.map(r => r.value),
                barMaxWidth: 18,
                // rounded at the data end only - the baseline end stays square, so the
                // bar still starts exactly at zero
                itemStyle: { color: colors.series, borderRadius: [0, 4, 4, 0] },
                label: {
                    show: true,
                    position: 'right',
                    color: c.muted,
                    fontFamily: theme.typography.fontFamily,
                    fontSize: 13,
                    formatter: (p: { value: number }): string => formatNumber(p.value),
                },
            },
        ],
    };
};

/**
 * Node versions in numeric order rather than by size. Sorting these by count would
 * hide what the data actually shows: the even LTS releases carry almost everything
 * and the odd ones in between are a rounding error. That pattern only appears if the
 * axis stays the version number.
 */
export const nodeVersionOption = (theme: Theme, entries: Entry[], base: number): Record<string, unknown> => {
    const colors = chartPalette(theme);
    const c = ink(theme);
    return {
        grid: { left: 8, right: 8, top: 24, bottom: 8, containLabel: true },
        tooltip: {
            trigger: 'item',
            ...tooltipStyle(theme),
            formatter: (p: { name: string; value: number }): string =>
                `<div style="opacity:.7;margin-bottom:2px">Node.js ${p.name}</div>` +
                `<b>${formatNumber(p.value)}</b> · ${formatShare(p.value, base)}`,
        },
        xAxis: {
            type: 'category',
            data: entries.map(e => e.name),
            axisLine: { lineStyle: { color: c.line } },
            axisTick: { show: false },
            axisLabel: { color: c.muted, fontFamily: theme.typography.fontFamily, fontSize: 12 },
        },
        yAxis: {
            type: 'value',
            axisLabel: {
                color: c.muted,
                fontFamily: theme.typography.fontFamily,
                formatter: (value: number): string => (value >= 1000 ? `${value / 1000}k` : String(value)),
            },
            splitLine: { lineStyle: { color: c.line } },
        },
        series: [
            {
                type: 'bar',
                data: entries.map(e => e.value),
                barMaxWidth: 26,
                itemStyle: { color: colors.series, borderRadius: [4, 4, 0, 0] },
            },
        ],
    };
};

/**
 * Objects against states - the one place on this page where two measures really are
 * side by side, so the one place a second colour earns its keep. Both series are
 * direct-labelled: the light orange is below 3:1 on the card, and a visible value is
 * the documented relief for that.
 */
export const databaseOption = (
    theme: Theme,
    rows: { name: string; objects: number; states: number }[],
    labels: { objects: string; states: string },
): Record<string, unknown> => {
    const colors = chartPalette(theme);
    const c = ink(theme);
    const bar = (name: string, key: 'objects' | 'states', color: string): Record<string, unknown> => ({
        name,
        type: 'bar',
        data: rows.map(r => r[key]),
        barMaxWidth: 24,
        // the two bars of a pair stand apart far enough for their labels to clear each
        // other - at a tighter gap "53.850" and "52.858" printed on top of one another
        barGap: '70%',
        itemStyle: { color, borderRadius: [4, 4, 0, 0] },
        label: {
            show: true,
            position: 'top',
            color: c.muted,
            fontFamily: theme.typography.fontFamily,
            fontSize: 11,
            formatter: (p: { value: number }): string => formatNumber(p.value),
        },
    });
    return {
        grid: { left: 8, right: 8, top: 48, bottom: 8, containLabel: true },
        tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' }, ...tooltipStyle(theme) },
        legend: {
            top: 0,
            left: 0,
            icon: 'roundRect',
            itemWidth: 12,
            itemHeight: 12,
            textStyle: { color: c.text, fontFamily: theme.typography.fontFamily, fontSize: 13 },
        },
        xAxis: {
            type: 'category',
            data: rows.map(r => r.name),
            axisLine: { lineStyle: { color: c.line } },
            axisTick: { show: false },
            axisLabel: { color: c.text, fontFamily: theme.typography.fontFamily, fontSize: 13 },
        },
        yAxis: {
            type: 'value',
            axisLabel: {
                color: c.muted,
                fontFamily: theme.typography.fontFamily,
                formatter: (value: number): string => (value >= 1000 ? `${value / 1000}k` : String(value)),
            },
            splitLine: { lineStyle: { color: c.line } },
        },
        series: [bar(labels.objects, 'objects', colors.series), bar(labels.states, 'states', colors.compare)],
    };
};
