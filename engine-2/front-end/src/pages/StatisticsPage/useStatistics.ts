import { useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { STATISTICS_DATA_URL } from '../../config/api';

/**
 * The shape of `data/statistics.json`, as the ioBroker installations report it.
 * Every distribution is a plain name -> count map; they do NOT all cover the same
 * population (see `coverage` below), which is why nothing here is turned into a
 * percentage without carrying its own base along.
 */
export interface StatisticsData {
    /** ISO timestamp of the snapshot */
    date: string;
    /** installations counted in this snapshot */
    total: number;
    /** installations running more than one host */
    multihosts: number;
    /** adapter id -> installations */
    adapters: Record<string, number>;
    /** adapter id -> version -> installations */
    versions: Record<string, Record<string, number>>;
    /** country name -> installations (only those that report a location) */
    countries: Record<string, number>;
    /** ISO date -> installations, one point per snapshot since 2015 */
    counts: Record<string, number>;
    /** node major version -> installations */
    nodes: Record<string, number>;
    /** 'linux' | 'win32' | ... -> installations */
    platforms: Record<string, number>;
    /** language code -> installations */
    languages: Record<string, number>;
    /** 'normal' | 'docker' -> installations */
    docker: Record<string, number>;
    dbTypeObjects: Record<string, number>;
    dbTypeStates: Record<string, number>;
}

export interface Entry {
    name: string;
    value: number;
}

/** name -> count, sorted by count, largest first */
const ranked = (map: Record<string, number> | undefined): Entry[] =>
    Object.entries(map ?? {})
        .map(([name, value]) => ({ name, value: Number(value) }))
        .filter(entry => entry.value > 0)
        .sort((a, b) => b.value - a.value);

const sum = (entries: Entry[]): number => entries.reduce((acc, entry) => acc + entry.value, 0);

export interface Prepared {
    date: Date | null;
    total: number;
    multihosts: number;
    adapterCount: number;
    countries: Entry[];
    platforms: Entry[];
    languages: Entry[];
    adapters: Entry[];
    /** node versions in numeric order - the shape of the distribution is the point */
    nodes: Entry[];
    docker: { docker: number; normal: number; base: number };
    databases: { name: string; objects: number; states: number }[];
    growth: { date: string; value: number }[];
    /**
     * How many installations each distribution actually speaks for. The fields are
     * reported independently, so a country share is a share of the installations that
     * report a country - not of every installation. Every section states its own base.
     */
    coverage: { countries: number; platforms: number; languages: number; docker: number };
}

export const useStatistics = (): { data: Prepared | null; isLoading: boolean; isError: boolean } => {
    const { data, isLoading, isError } = useQuery<StatisticsData>({
        queryKey: ['statistics', STATISTICS_DATA_URL],
        queryFn: async () => {
            const response = await fetch(STATISTICS_DATA_URL);
            if (!response.ok) {
                throw new Error(`Failed to fetch statistics: ${response.status}`);
            }
            return (await response.json()) as StatisticsData;
        },
        staleTime: 1000 * 60 * 30,
    });

    const prepared = useMemo<Prepared | null>(() => {
        if (!data) {
            return null;
        }

        const countries = ranked(data.countries);
        const platforms = ranked(data.platforms);
        const languages = ranked(data.languages);
        const adapters = ranked(data.adapters);

        const nodes = Object.entries(data.nodes ?? {})
            .map(([name, value]) => ({ name, value: Number(value) }))
            .filter(entry => entry.value > 0)
            .sort((a, b) => Number(a.name) - Number(b.name));

        const dockerCount = Number(data.docker?.docker ?? 0);
        const normalCount = Number(data.docker?.normal ?? 0);

        // `other` is present in the file and sits at 0 - a legend entry for a bar that
        // does not exist is noise, so the empty rows are dropped rather than drawn
        const dbNames = [
            ...new Set([...Object.keys(data.dbTypeObjects ?? {}), ...Object.keys(data.dbTypeStates ?? {})]),
        ];
        const databases = dbNames
            .map(name => ({
                name,
                objects: Number(data.dbTypeObjects?.[name] ?? 0),
                states: Number(data.dbTypeStates?.[name] ?? 0),
            }))
            .filter(row => row.objects > 0 || row.states > 0)
            .sort((a, b) => b.objects + b.states - (a.objects + a.states));

        const growth = Object.entries(data.counts ?? {})
            .map(([date, value]) => ({ date, value: Number(value) }))
            .sort((a, b) => a.date.localeCompare(b.date));

        const parsedDate = data.date ? new Date(data.date) : null;

        return {
            date: parsedDate && !Number.isNaN(parsedDate.getTime()) ? parsedDate : null,
            total: Number(data.total ?? 0),
            multihosts: Number(data.multihosts ?? 0),
            adapterCount: Object.keys(data.adapters ?? {}).length,
            countries,
            platforms,
            languages,
            adapters,
            nodes,
            docker: { docker: dockerCount, normal: normalCount, base: dockerCount + normalCount },
            databases,
            growth,
            coverage: {
                countries: sum(countries),
                platforms: sum(platforms),
                languages: sum(languages),
                docker: dockerCount + normalCount,
            },
        };
    }, [data]);

    return { data: prepared, isLoading, isError };
};
