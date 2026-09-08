import React, { useEffect, useMemo, useState } from 'react';
import { Box } from '@mui/material';
import { Link, useSearchParams } from 'react-router-dom';

import { I18n } from '../../utils/i18n';
import SearchIcon from '../../components/icons/SearchIcon';
import { SectionTitle } from '../../components/SectionTitle/SectionTitle';
import { Footer } from '../../components/Footer/Footer';
import {
    MIN_QUERY_LENGTH,
    SEARCH_CATEGORIES,
    useSearch,
    type SearchCategory,
    type TextPart,
} from '../../api/hooks/useSearch';
import { useStyles } from './SearchPage.styles';

/** How many hits one page shows */
const PAGE_SIZE = 20;

/** How long the typing has to stop before the address - and with it the question - follows */
const DEBOUNCE_MS = 300;

/** The parts of a field the server has marked, with the hits set off */
function Marked({ parts, className }: { parts: TextPart[]; className: string }): React.JSX.Element {
    return (
        <>
            {parts.map((part, index) =>
                part.hit ? (
                    <span
                        key={index}
                        className={className}
                    >
                        {part.text}
                    </span>
                ) : (
                    <React.Fragment key={index}>{part.text}</React.Fragment>
                ),
            )}
        </>
    );
}

/**
 * All results of a search, with the filter and the pages the palette has no room for.
 *
 * Everything that decides what is shown stands in the address: the query, the category and the
 * page. A result can therefore be linked to and survives a reload - and the browser's back button
 * walks the searches instead of leaving the page.
 */
const SearchPage = (): React.ReactNode => {
    const { classes, cx } = useStyles();
    const [params, setParams] = useSearchParams();
    const [language, setLanguage] = useState(I18n.getLanguage());

    const query = params.get('q') || '';
    const category = (SEARCH_CATEGORIES as readonly string[]).includes(params.get('category') || '')
        ? (params.get('category') as SearchCategory)
        : '';
    const page = Math.max(0, Number(params.get('page') || 0) || 0);

    const [draft, setDraft] = useState(query);

    useEffect(() => I18n.subscribe(setLanguage), []);
    useEffect(() => setDraft(query), [query]);
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [query, category, page]);

    // the field leads, the address follows a moment later - otherwise every letter is a history entry
    useEffect(() => {
        if (draft === query) {
            return;
        }
        const timer = setTimeout(() => {
            const next = new URLSearchParams(params);
            if (draft) {
                next.set('q', draft);
            } else {
                next.delete('q');
            }
            next.delete('page');
            setParams(next, { replace: true });
        }, DEBOUNCE_MS);
        return () => clearTimeout(timer);
    }, [draft, query, params, setParams]);

    const { data, isFetching, isError } = useSearch({
        query,
        language,
        category,
        limit: PAGE_SIZE,
        offset: page * PAGE_SIZE,
    });

    const update = (changes: Record<string, string | undefined>): void => {
        const next = new URLSearchParams(params);
        for (const [key, value] of Object.entries(changes)) {
            if (value === undefined || value === '') {
                next.delete(key);
            } else {
                next.set(key, value);
            }
        }
        setParams(next);
    };

    const total = data?.total ?? 0;
    const shown = data?.results ?? [];
    const lastPage = Math.max(0, Math.ceil(total / PAGE_SIZE) - 1);
    const counts = data?.categories;
    const allCount = useMemo(
        () => (counts ? SEARCH_CATEGORIES.reduce((sum, key) => sum + (counts[key] || 0), 0) : 0),
        [counts],
    );

    const tooShort = query.trim().length > 0 && query.trim().length < MIN_QUERY_LENGTH;
    const nothing = !isFetching && !isError && !tooShort && query.trim().length >= MIN_QUERY_LENGTH && !shown.length;

    return (
        <Box className={classes.pageWrapper}>
            <Box className={classes.pageContainer}>
                <SectionTitle>{I18n.t('search.title').toUpperCase()}</SectionTitle>

                <Box className={classes.searchRow}>
                    <Box className={classes.searchIcon}>
                        <SearchIcon />
                    </Box>
                    <Box
                        component="input"
                        autoFocus
                        className={classes.searchInput}
                        value={draft}
                        placeholder={I18n.t('search.placeholder')}
                        aria-label={I18n.t('search.placeholder')}
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => setDraft(event.target.value)}
                    />
                </Box>

                {!!query && (
                    <>
                        <Box className={classes.filters}>
                            <Box
                                component="button"
                                type="button"
                                className={cx(classes.filter, !category && classes.filterActive)}
                                onClick={() => update({ category: undefined, page: undefined })}
                            >
                                {I18n.t('search.filter.all')}
                                <span className={classes.filterCount}>{allCount}</span>
                            </Box>
                            {SEARCH_CATEGORIES.map(key => (
                                <Box
                                    component="button"
                                    type="button"
                                    key={key}
                                    className={cx(classes.filter, category === key && classes.filterActive)}
                                    onClick={() => update({ category: key, page: undefined })}
                                >
                                    {I18n.t(`search.category.${key}`)}
                                    <span className={classes.filterCount}>{counts?.[key] ?? 0}</span>
                                </Box>
                            ))}
                        </Box>

                        <Box className={classes.summary}>
                            {isFetching && !shown.length
                                ? I18n.t('search.searching')
                                : I18n.t('search.results', String(total), query)}
                        </Box>
                    </>
                )}

                {isError && <Box className={classes.message}>{I18n.t('search.error')}</Box>}
                {tooShort && <Box className={classes.message}>{I18n.t('search.tooShort')}</Box>}
                {nothing && <Box className={classes.message}>{I18n.t('search.empty', query.trim())}</Box>}

                {shown.map(hit => (
                    <Box
                        component={Link}
                        to={hit.route}
                        key={`${hit.category}/${hit.path}`}
                        className={classes.hit}
                    >
                        <Box className={classes.hitTitle}>
                            <Marked
                                parts={hit.title}
                                className={classes.mark}
                            />
                        </Box>
                        <Box className={classes.hitMeta}>
                            <span className={classes.hitBadge}>{I18n.t(`search.category.${hit.category}`)}</span>
                            <span>{hit.path}</span>
                        </Box>
                        {!!hit.snippet.length && (
                            <Box className={classes.hitSnippet}>
                                <Marked
                                    parts={hit.snippet}
                                    className={classes.mark}
                                />
                            </Box>
                        )}
                    </Box>
                ))}

                {total > PAGE_SIZE && (
                    <Box className={classes.pager}>
                        <Box
                            component="button"
                            type="button"
                            className={classes.pagerButton}
                            disabled={page <= 0}
                            onClick={() => update({ page: page > 1 ? String(page - 1) : undefined })}
                        >
                            ← {I18n.t('search.previous')}
                        </Box>
                        <Box className={classes.pagerPosition}>
                            {I18n.t('search.page', String(page + 1), String(lastPage + 1))}
                        </Box>
                        <Box
                            component="button"
                            type="button"
                            className={classes.pagerButton}
                            disabled={page >= lastPage}
                            onClick={() => update({ page: String(page + 1) })}
                        >
                            {I18n.t('search.next')} →
                        </Box>
                    </Box>
                )}
            </Box>
            <Footer />
        </Box>
    );
};

export default SearchPage;
