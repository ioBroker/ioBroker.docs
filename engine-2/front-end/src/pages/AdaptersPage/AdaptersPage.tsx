import { Box, ToggleButton, ToggleButtonGroup, Tooltip, useMediaQuery, useTheme } from '@mui/material';
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
import { Footer } from '../../components/Footer/Footer';
import Divider from '../../components/Divider/Divider';
import { getLocalizedTitle, normalizeText } from './adaptersPageUtils';
import type { AdapterItem } from '../../components/AdapterItem/AdapterItem';

const STORAGE_KEY = 'adaptersPageState';

const loadSavedState = (): Record<string, unknown> | null => {
    try {
        const saved = sessionStorage.getItem(STORAGE_KEY);
        if (saved) {
            return JSON.parse(saved);
        }
    } catch {
        /* ignore */
    }
    return null;
};

const AdaptersPage = (): React.ReactNode => {
    const theme = useTheme();
    const saved = useMemo(() => loadSavedState(), []);
    const [mode, setMode] = useState<'block' | 'table'>(saved?.mode || 'block');
    const [, startTransition] = useTransition();
    const [search, setSearch] = useState(saved?.search || '');
    const [menuMode, setMenuMode] = useState<'all' | 'installed'>(saved?.menuMode || 'all');
    const [isMenuCollapsed, setIsMenuCollapsed] = useState(saved?.isMenuCollapsed || false);
    const [selectedMenuItem, setSelectedMenuItem] = useState(saved?.selectedMenuItem || '');
    const [selectedCategoryKey, setSelectedCategoryKey] = useState<string>(saved?.selectedCategoryKey || '');
    // One boundary for the whole page: below 900 px the layout stacks everywhere on this
    // site, so that is where the menu stops being a column and becomes an overlay panel.
    // It used to be 661 px here, 878 and 661 in the menu and 769 in the grid - four
    // numbers for one decision.
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const { data: adaptersData } = useAdapters();
    const language = I18n.getLanguage();
    const location = useLocation();
    const deferredSearch = useDeferredValue(search);
    const searchTerm = normalizeText(deferredSearch, language);

    // Persist page state to sessionStorage so it survives navigation
    useEffect(() => {
        sessionStorage.setItem(
            STORAGE_KEY,
            JSON.stringify({
                mode,
                search,
                menuMode,
                isMenuCollapsed,
                selectedMenuItem,
                selectedCategoryKey,
            }),
        );
    }, [mode, search, menuMode, isMenuCollapsed, selectedMenuItem, selectedCategoryKey]);

    const mainBlockRef = useRef<HTMLDivElement>(null);

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
        mainBlockRef.current?.scrollTo({ top: 0 });
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

    const adaptersGridContent = useMemo(() => {
        return adaptersList.map(adapter => (
            <AdapterBlock
                adapter={adapter}
                key={adapter.content}
            />
        ));
    }, [adaptersList]);

    const adaptersTableContent = useMemo(() => {
        return <AdapterTable adapters={adaptersList} />;
    }, [adaptersList]);

    return (
        <Box className={classes.pageRoot}>
            <Box className={classes.titleContainer}>
                {selectedMenuItem ? (
                    <Box className={classes.breadcrumbsContainer}>
                        <span className={classes.breadcrumbInactive}>
                            // {I18n.t('home.adapters.title').toUpperCase()}
                        </span>
                        <span className={classes.breadcrumbSlash}> / </span>
                        <span className={classes.breadcrumbActive}>{selectedMenuItem.toUpperCase()}</span>
                    </Box>
                ) : (
                    <SectionTitle
                        sx={theme => ({
                            // the page's side margin comes from the layout token, like
                            // everywhere else - the three hand-written values here were a
                            // scale of their own (16 / 24 / 32 on MUI's own sx steps)
                            marginLeft: {
                                xs: `${theme.custom.layout.gutter.sm}px`,
                                sm: `${theme.custom.layout.gutter.lg}px`,
                            },
                            marginBottom: '20px',
                        })}
                    >
                        {I18n.t('home.adapters.title')}
                    </SectionTitle>
                )}
            </Box>
            <Box className={classes.container}>
                <Box className={classes.leftColumn}>
                    {/* On a phone the toggle stands next to the search field, so the two form
                        one row and the opening menu no longer paints over the field. */}
                    {!isMobile && (
                        <Box className={classes.menuToggleWrapper}>
                            <MenuToggle
                                value={menuMode}
                                onChange={setMenuMode}
                                onCollapse={setIsMenuCollapsed}
                            />
                        </Box>
                    )}
                    <Box className={classes.menuBlock}>
                        <AdapterMenu
                            isCollapsed={isMenuCollapsed}
                            onMenuItemClick={handleMenuItemClick}
                            selectedItem={selectedMenuItem}
                            selectedCategoryKey={selectedCategoryKey}
                            search={search}
                        />
                    </Box>
                </Box>
                <Box className={classes.rightColumn}>
                    <Box className={classes.topBar}>
                        {isMobile && (
                            <MenuToggle
                                value={menuMode}
                                onChange={setMenuMode}
                                onCollapse={setIsMenuCollapsed}
                            />
                        )}
                        <TopBarSearch
                            value={search}
                            onChange={setSearch}
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
                                    <Tooltip title={I18n.t('adapters.tooltip.view_grid')}>
                                        <img
                                            alt="Grid Icon"
                                            src={GridIcon}
                                        />
                                    </Tooltip>
                                </ToggleButton>
                                <ToggleButton value="table">
                                    <Tooltip title={I18n.t('adapters.tooltip.view_table')}>
                                        <img
                                            alt="AdaptersList Icon"
                                            src={AdaptersListIcon}
                                        />
                                    </Tooltip>
                                </ToggleButton>
                            </ToggleButtonGroup>
                        </Box>
                    </Box>
                    <Box
                        className={classes.mainBlock}
                        ref={mainBlockRef}
                    >
                        {mode === 'block' ? (
                            <Box className={classes.adaptersGrid}>{adaptersGridContent}</Box>
                        ) : (
                            adaptersTableContent
                        )}
                        {/* ohne `position`: die Linie misst sich selbst, siehe Divider */}
                        <Divider beforeFooter />
                        <Footer />
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};

export default AdaptersPage;
