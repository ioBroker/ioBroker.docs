import { Box, Typography, ToggleButton, ToggleButtonGroup, useMediaQuery, useTheme } from '@mui/material';
import { AdapterBlock } from '../../components/AdapterBlock/AdapterBlock';
import { SectionTitle } from '../../components/SectionTitle/SectionTitle';
import { I18n } from '../../utils/i18n';
import { useStyles } from './AdaptersPage.styles';
import { AdapterTable } from '../../components/AdapterTable/AdapterTable';
import { AdapterMenu } from '../../components/AdapterMenu/AdapterMenu';
import { MenuToggle } from '../../components/MenuToggle/MenuToggle';
import { TopBarSearch } from '../../components/TopBarSearch/TopBarSearch';
import { useState, useEffect, useMemo, useDeferredValue, useTransition } from 'react';
import { useLocation } from 'react-router-dom';
import GridIcon from '../../assets/img/blueGrid.svg';
import AdaptersListIcon from '../../assets/img/whiteAdaptersList.svg';
import { useAdapters } from '../../api/hooks/useAdapters';
import { Footer } from '../../components/Footer/Footer';
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
                        <span className={classes.breadcrumbActive}>
                            {selectedMenuItem.toUpperCase()}
                        </span>
                    </Box>
                ) : (
                    <SectionTitle
                        sx={{
                            marginLeft: '32px',
                            fontSize: {
                                '@media (max-width:1279px)': { fontSize: '28px !important' },
                                '@media (max-width:480px)': { fontSize: '20px !important' },
                            },
                        }}
                    >
                        {I18n.t('home.adapters.title')}
                    </SectionTitle>
                )}
            </Box>
            <Box className={classes.container}>
                <Box className={classes.leftColumn}>
                    <Box className={classes.menuToggleWrapper}>
                        <MenuToggle
                            value={menuMode}
                            onChange={setMenuMode}
                            onCollapse={setIsMenuCollapsed}
                        />
                    </Box>
                    <Box className={classes.menuBlock}>
                        <AdapterMenu
                            isCollapsed={isMenuCollapsed}
                            onMenuItemClick={handleMenuItemClick}
                            selectedItem={selectedMenuItem}
                            search={search}
                        />
                    </Box>
                </Box>
                <Box className={classes.rightColumn}>
                    <Box className={classes.topBar}>
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
                    <Box className={classes.mainBlock}>
                        {mode === 'block' ? (
                            <Box className={classes.adaptersGrid}>
                                {adaptersGridContent}
                            </Box>
                        ) : (
                            adaptersTableContent
                        )}
                        <Footer />
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};

export default AdaptersPage;
