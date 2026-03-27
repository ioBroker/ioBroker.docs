import { Box, Typography, ToggleButton, ToggleButtonGroup, useMediaQuery, useTheme } from '@mui/material';
import { AdapterBlock } from '../../components/AdapterBlock/AdapterBlock';
import { SectionTitle } from '../../components/SectionTitle/SectionTitle';
import { I18n } from '../../utils/i18n';
import { useStyles } from './AdaptersPage.styles';
import { AdapterTable } from '../../components/AdapterTable/AdapterTable';
import { AdapterMenu } from '../../components/AdapterMenu/AdapterMenu';
import { MenuToggle } from '../../components/MenuToggle/MenuToggle';
import { TopBarSearch } from '../../components/TopBarSearch/TopBarSearch';
import { useState, useEffect, useMemo, useDeferredValue, useTransition, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import GridIcon from '../../assets/img/blueGrid.svg';
import AdaptersListIcon from '../../assets/img/whiteAdaptersList.svg';
import { useAdapters } from '../../api/hooks/useAdapters';
import { getLocalizedTitle, normalizeText } from './adaptersPageUtils';
import type { AdapterItem } from '../../components/AdapterItem/AdapterItem';

const AdaptersPage = (): React.ReactNode => {
    const [mode, setMode] = useState<'block' | 'table'>('block');
    const [, startTransition] = useTransition();
    const [search, setSearch] = useState('');
    const [menuMode, setMenuMode] = useState<'all' | 'installed'>('all');
    const [isMenuCollapsed, setIsMenuCollapsed] = useState(false);
    const [selectedMenuItem, setSelectedMenuItem] = useState('');
    const [selectedCategoryKey, setSelectedCategoryKey] = useState<string>('');
    const isMobile = useMediaQuery('(max-width:661px)');
    const theme = useTheme();
    const { data: adaptersData } = useAdapters();
    const language = I18n.getLanguage();
    const location = useLocation();
    const deferredSearch = useDeferredValue(search);
    const searchTerm = normalizeText(deferredSearch, language);

    const { classes } = useStyles({ isMenuCollapsed });

    const adapterSearchIndex = useMemo(() => {
        if (!adaptersData?.pages) {
            return new Map<string, string>();
        }
        const map = new Map<string, string>();
        for (const category of Object.values(adaptersData.pages)) {
            for (const adapter of Object.values(category.pages || {})) {
                const normalized = normalizeText(
                    [
                        getLocalizedTitle(adapter.title, language),
                        ...(adapter.title ? Object.values(adapter.title) : []),
                        getLocalizedTitle(adapter.description, language),
                        ...(adapter.description ? Object.values(adapter.description) : []),
                        adapter.keywords || '',
                    ]
                        .filter(Boolean)
                        .join(' '),
                    language,
                );
                map.set(adapter.content, normalized);
            }
        }
        return map;
    }, [adaptersData, language]);

    const matchesSearchFast = (adapter: AdapterItem | undefined): boolean => {
        if (!searchTerm) {
            return true;
        }
        if (!adapter) {
            return false;
        }
        const text = adapterSearchIndex.get(adapter.content) || '';
        return text.includes(searchTerm);
    };

    useEffect(() => {
        if (isMobile) {
            setIsMenuCollapsed(true);
        }
    }, [isMobile]);

    useEffect(() => {
        const state = location.state as { categoryKey?: string; categoryLabel?: string } | null;
        if (!state?.categoryKey) {
            return;
        }
        setSelectedCategoryKey(state.categoryKey);
        if (state.categoryLabel) {
            setSelectedMenuItem(state.categoryLabel);
            return;
        }
        const category = adaptersData?.pages?.[state.categoryKey];
        const label = getLocalizedTitle(category?.title ?? {}, language ?? 'en');
        if (label) {
            setSelectedMenuItem(label);
        }
    }, [location.state, adaptersData, language]);

    useEffect(() => {
        if (!searchTerm || !selectedCategoryKey || !adaptersData?.pages?.[selectedCategoryKey]) {
            return;
        }
        const category = adaptersData.pages[selectedCategoryKey];
        const hasMatch = Object.values(category.pages || {}).some(adapter => matchesSearchFast(adapter));
        if (!hasMatch) {
            setSelectedCategoryKey('');
            setSelectedMenuItem('');
        }
    }, [searchTerm, selectedCategoryKey, adaptersData, adapterSearchIndex]);

    const handleMenuItemClick = (label: string, categoryKey?: string): void => {
        setSelectedMenuItem(label);
        if (categoryKey) {
            setSelectedCategoryKey(categoryKey);
        }
        if (isMobile) {
            setIsMenuCollapsed(true);
        }
    };

    const adaptersList = useMemo<AdapterItem[]>(() => {
        if (!adaptersData?.pages) {
            return [];
        }
        if (selectedCategoryKey && selectedCategoryKey !== 'overview') {
            const category = adaptersData.pages[selectedCategoryKey];
            if (!category?.pages) {
                return [];
            }
            const items = Object.values(category.pages);
            return searchTerm ? items.filter(adapter => matchesSearchFast(adapter)) : items;
        }
        const all = Object.values(adaptersData.pages).flatMap(category => Object.values(category.pages || {}));
        return searchTerm ? all.filter(adapter => matchesSearchFast(adapter)) : all;
    }, [adaptersData, selectedCategoryKey, searchTerm, adapterSearchIndex]);

    const mainBlockRef = useRef<HTMLDivElement | null>(null);
    const [scrollTop, setScrollTop] = useState(0);
    const [viewportHeight, setViewportHeight] = useState(0);
    const [gridWidth, setGridWidth] = useState(0);

    useEffect(() => {
        const node = mainBlockRef.current;
        if (!node) {
            return;
        }
        const update = (): void => {
            setViewportHeight(node.clientHeight);
            setScrollTop(node.scrollTop);
            setGridWidth(node.clientWidth);
        };
        update();
        const observer = new ResizeObserver(update);
        observer.observe(node);
        return () => observer.disconnect();
    }, []);

    const handleScroll = (event: React.UIEvent<HTMLDivElement>): void => {
        setScrollTop(event.currentTarget.scrollTop);
    };

    const virtualizedGrid = useMemo(() => {
        if (mode !== 'block') {
            return { items: adaptersList, offsetY: 0, totalHeight: 0 };
        }
        const gap = 20;
        const cardHeight = 294;
        const rowHeight = cardHeight + gap;
        const minColWidth = 251;
        const columns = Math.max(1, Math.floor((gridWidth + gap) / (minColWidth + gap)) || 1);
        const rowCount = Math.ceil(adaptersList.length / columns);
        const totalHeight = rowCount > 0 ? rowCount * rowHeight - gap : 0;
        const startRow = Math.max(0, Math.floor(scrollTop / rowHeight) - 1);
        const endRow = Math.min(rowCount - 1, Math.floor((scrollTop + viewportHeight) / rowHeight) + 1);
        const startIndex = startRow * columns;
        const endIndex = Math.min(adaptersList.length, (endRow + 1) * columns);
        const items = adaptersList.slice(startIndex, endIndex);
        return {
            items,
            offsetY: startRow * rowHeight,
            totalHeight,
        };
    }, [adaptersList, gridWidth, scrollTop, viewportHeight, mode]);

    const adaptersGridContent = useMemo(() => {
        return virtualizedGrid.items.map(adapter => (
            <AdapterBlock
                adapter={adapter}
                key={adapter.content}
            />
        ));
    }, [virtualizedGrid.items]);

    const adaptersTableContent = useMemo(() => {
        return <AdapterTable adapters={adaptersList} />;
    }, [adaptersList]);

    return (
        <Box>
            <Box className={classes.titleContainer}>
                <SectionTitle
                    sx={{
                        marginLeft: '32px',
                        color: `${theme.palette.text.primary} !important`,
                        fontSize: {
                            '@media (max-width:1279px)': { fontSize: '28px !important' },
                            '@media (max-width:480px)': { fontSize: '20px !important' },
                        },
                    }}
                >
                    {I18n.t('home.adapters.title')}
                </SectionTitle>
                {selectedMenuItem ? (
                    <Typography
                        variant="h4"
                        className={classes.breadCrumbs}
                    >
                        / {selectedMenuItem.toUpperCase()}
                    </Typography>
                ) : null}
            </Box>
            <Box className={classes.topBar}>
                <MenuToggle
                    value={menuMode}
                    onChange={setMenuMode}
                    onCollapse={setIsMenuCollapsed}
                />
                <Box className={classes.searchAndMenuButton}>
                    <TopBarSearch
                        value={search}
                        onChange={setSearch}
                        isMenuCollapsed={isMenuCollapsed}
                    />
                    <Box className={classes.adaptersButton}>
                        <ToggleButtonGroup
                            exclusive
                            value={mode}
                            onChange={(_, value) => {
                                if (!value) {
                                    return;
                                }
                                startTransition(() => {
                                    setMode(value);
                                });
                            }}
                        >
                            <ToggleButton value="block">
                                <img
                                    alt="Grid Icon"
                                    src={GridIcon}
                                />
                            </ToggleButton>
                            <ToggleButton value="table">
                                <img
                                    alt="AdaptersList Icon"
                                    src={AdaptersListIcon}
                                />
                            </ToggleButton>
                        </ToggleButtonGroup>
                    </Box>
                </Box>
            </Box>
            <Box className={classes.container}>
                <Box className={classes.menuBlock}>
                    <AdapterMenu
                        isCollapsed={isMenuCollapsed}
                        onMenuItemClick={handleMenuItemClick}
                        selectedItem={selectedMenuItem}
                        search={search}
                    />
                </Box>
                <Box
                    className={classes.mainBlock}
                    ref={mainBlockRef}
                    onScroll={handleScroll}
                >
                    {mode === 'block' ? (
                        <Box style={{ position: 'relative', height: virtualizedGrid.totalHeight || 'auto' }}>
                            <Box
                                className={classes.adaptersGrid}
                                style={{
                                    position: 'absolute',
                                    inset: 0,
                                    transform: `translateY(${virtualizedGrid.offsetY}px)`,
                                }}
                            >
                                {adaptersGridContent}
                            </Box>
                        </Box>
                    ) : (
                        adaptersTableContent
                    )}
                </Box>
            </Box>
        </Box>
    );
};

export default AdaptersPage;
