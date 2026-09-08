import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import { I18n } from '../../utils/i18n';
import SearchIcon from '../icons/SearchIcon';
import {
    MIN_QUERY_LENGTH,
    SEARCH_CATEGORIES,
    useSearch,
    type SearchCategory,
    type SearchHit,
    type TextPart,
} from '../../api/hooks/useSearch';
import { useStyles } from './SearchPalette.styles';

/** How many hits the palette shows before it sends the reader to the results page */
const PALETTE_LIMIT = 12;

/** How long the typing has to stop before the question goes out */
const DEBOUNCE_MS = 180;

const RECENT_KEY = 'searchRecent';
const RECENT_MAX = 5;

function readRecent(): string[] {
    try {
        const stored: unknown = JSON.parse(window.localStorage.getItem(RECENT_KEY) || '[]');
        return Array.isArray(stored) ? stored.filter((entry): entry is string => typeof entry === 'string') : [];
    } catch {
        // a browser that refuses storage - then there is simply no history
        return [];
    }
}

function rememberRecent(query: string): string[] {
    const trimmed = query.trim();
    if (!trimmed) {
        return readRecent();
    }
    const next = [trimmed, ...readRecent().filter(entry => entry !== trimmed)].slice(0, RECENT_MAX);
    try {
        window.localStorage.setItem(RECENT_KEY, JSON.stringify(next));
    } catch {
        // not being able to remember is no reason to stop searching
    }
    return next;
}

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

export interface SearchPaletteProps {
    open: boolean;
    onClose: () => void;
    /** what the header already had in its own field when the palette was opened */
    initialQuery?: string;
}

/**
 * The search of the site.
 *
 * It answers while it is typed and is driven from the keyboard: up and down walk the list, Enter
 * opens what is marked, Escape closes. What it shows is what the server sends - the hits inside a
 * title and inside the cropped snippet are already marked there, so nothing is matched twice.
 */
export default function SearchPalette({
    open,
    onClose,
    initialQuery = '',
}: SearchPaletteProps): React.JSX.Element | null {
    const { classes, cx } = useStyles();
    const navigate = useNavigate();
    const inputRef = useRef<HTMLInputElement | null>(null);
    const listRef = useRef<HTMLDivElement | null>(null);

    const [language, setLanguage] = useState(I18n.getLanguage());
    const [query, setQuery] = useState(initialQuery);
    const [debounced, setDebounced] = useState(initialQuery);
    const [active, setActive] = useState(0);
    const [recent, setRecent] = useState<string[]>(() => readRecent());

    useEffect(() => I18n.subscribe(setLanguage), []);

    // The field is the state; the question follows it a moment later, so a word being typed does
    // not cost one request per letter.
    useEffect(() => {
        const timer = setTimeout(() => setDebounced(query), DEBOUNCE_MS);
        return () => clearTimeout(timer);
    }, [query]);

    useEffect(() => {
        if (open) {
            setQuery(initialQuery);
            setDebounced(initialQuery);
            setActive(0);
            setRecent(readRecent());
            // the dialog is only in the DOM once it is open, so the focus has to wait for that
            setTimeout(() => inputRef.current?.focus(), 0);
        }
    }, [open, initialQuery]);

    const { data, isFetching, isError } = useSearch({
        query: debounced,
        language,
        limit: PALETTE_LIMIT,
    });

    const results = useMemo(
        () => (debounced.trim().length >= MIN_QUERY_LENGTH ? (data?.results ?? []) : []),
        [data, debounced],
    );

    /** the hits in the order they are shown, so a group label never breaks the keyboard walk */
    const ordered = useMemo(() => {
        const groups: { category: SearchCategory; hits: SearchHit[] }[] = [];
        for (const category of SEARCH_CATEGORIES) {
            const hits = results.filter(hit => hit.category === category);
            if (hits.length) {
                groups.push({ category, hits });
            }
        }
        return groups;
    }, [results]);

    const flat = useMemo(() => ordered.flatMap(group => group.hits), [ordered]);

    useEffect(() => setActive(0), [debounced]);

    const go = useCallback(
        (hit: SearchHit): void => {
            setRecent(rememberRecent(debounced));
            onClose();
            void navigate(hit.route);
        },
        [debounced, navigate, onClose],
    );

    const showAll = useCallback((): void => {
        const trimmed = query.trim();
        if (trimmed.length < MIN_QUERY_LENGTH) {
            return;
        }
        setRecent(rememberRecent(trimmed));
        onClose();
        void navigate(`/search?q=${encodeURIComponent(trimmed)}`);
    }, [navigate, onClose, query]);

    const onKeyDown = (event: React.KeyboardEvent): void => {
        if (event.key === 'Escape') {
            event.preventDefault();
            onClose();
            return;
        }
        if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
            event.preventDefault();
            if (!flat.length) {
                return;
            }
            const step = event.key === 'ArrowDown' ? 1 : -1;
            setActive(current => (current + step + flat.length) % flat.length);
            return;
        }
        if (event.key === 'Enter') {
            event.preventDefault();
            if (flat[active]) {
                go(flat[active]);
            } else {
                showAll();
            }
        }
    };

    // whatever the keyboard points at has to stay in sight, also at the ends of the list
    useEffect(() => {
        listRef.current?.querySelector('[data-active="true"]')?.scrollIntoView({ block: 'nearest' });
    }, [active, results]);

    if (!open) {
        return null;
    }

    const tooShort = debounced.trim().length > 0 && debounced.trim().length < MIN_QUERY_LENGTH;
    const nothing = !isFetching && !isError && !tooShort && debounced.trim().length >= MIN_QUERY_LENGTH && !flat.length;
    let index = -1;

    return (
        <Box
            className={classes.overlay}
            role="presentation"
            onMouseDown={event => {
                if (event.target === event.currentTarget) {
                    onClose();
                }
            }}
        >
            <Box
                className={classes.panel}
                role="dialog"
                aria-modal="true"
                aria-label={I18n.t('search.title')}
                onKeyDown={onKeyDown}
            >
                <Box className={classes.inputRow}>
                    <Box className={classes.inputIcon}>
                        <SearchIcon />
                    </Box>
                    <Box
                        component="input"
                        ref={inputRef}
                        className={classes.input}
                        value={query}
                        placeholder={I18n.t('search.placeholder')}
                        aria-label={I18n.t('search.placeholder')}
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => setQuery(event.target.value)}
                    />
                    {!!query && (
                        <Box
                            component="button"
                            type="button"
                            className={classes.clearButton}
                            aria-label={I18n.t('search.clear')}
                            onClick={() => {
                                setQuery('');
                                inputRef.current?.focus();
                            }}
                        >
                            ✕
                        </Box>
                    )}
                    <Box className={classes.escHint}>ESC</Box>
                </Box>

                <Box
                    className={classes.body}
                    ref={listRef}
                >
                    {isError && <Box className={classes.message}>{I18n.t('search.error')}</Box>}
                    {tooShort && <Box className={classes.message}>{I18n.t('search.tooShort')}</Box>}
                    {nothing && <Box className={classes.message}>{I18n.t('search.empty', debounced.trim())}</Box>}

                    {!debounced.trim() && !!recent.length && (
                        <>
                            <Box className={classes.groupLabel}>{I18n.t('search.recent')}</Box>
                            {recent.map(entry => (
                                <Box
                                    component="button"
                                    type="button"
                                    key={entry}
                                    className={classes.recentRow}
                                    onClick={() => {
                                        setQuery(entry);
                                        setDebounced(entry);
                                        inputRef.current?.focus();
                                    }}
                                >
                                    {entry}
                                </Box>
                            ))}
                        </>
                    )}

                    {ordered.map(group => (
                        <React.Fragment key={group.category}>
                            <Box className={classes.groupLabel}>
                                <span>{I18n.t(`search.category.${group.category}`)}</span>
                                <span>{data?.categories?.[group.category] ?? group.hits.length}</span>
                            </Box>
                            {group.hits.map(hit => {
                                index += 1;
                                const isActive = index === active;
                                const at = index;
                                return (
                                    <Box
                                        component="button"
                                        type="button"
                                        key={`${hit.category}/${hit.path}`}
                                        data-active={isActive}
                                        className={cx(classes.hit, isActive && classes.hitActive)}
                                        onMouseMove={() => setActive(at)}
                                        onClick={() => go(hit)}
                                    >
                                        <Box className={classes.hitTitle}>
                                            <Marked
                                                parts={hit.title}
                                                className={classes.mark}
                                            />
                                        </Box>
                                        <Box className={classes.hitPath}>{hit.path}</Box>
                                        {!!hit.snippet.length && (
                                            <Box className={classes.hitSnippet}>
                                                <Marked
                                                    parts={hit.snippet}
                                                    className={classes.mark}
                                                />
                                            </Box>
                                        )}
                                    </Box>
                                );
                            })}
                        </React.Fragment>
                    ))}
                </Box>

                <Box className={classes.footer}>
                    <Box className={classes.footerHints}>
                        <span>↑ ↓ {I18n.t('search.hintMove')}</span>
                        <span>↵ {I18n.t('search.hintOpen')}</span>
                    </Box>
                    {!!data?.total && (
                        <Box
                            component="button"
                            type="button"
                            className={classes.allButton}
                            onClick={showAll}
                        >
                            {I18n.t('search.showAll', String(data.total))}
                        </Box>
                    )}
                </Box>
            </Box>
        </Box>
    );
}
