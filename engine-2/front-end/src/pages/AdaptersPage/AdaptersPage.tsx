import { Box, Typography, ToggleButton, ToggleButtonGroup, useMediaQuery, useTheme } from '@mui/material';
import { AdapterBlock } from '../../components/AdapterBlock/AdapterBlock';
import { SectionTitle } from '../../components/SectionTitle/SectionTitle';
import { I18n } from '../../utils/i18n';
import { useStyles } from './AdaptersPage.styles';
import { AdapterTable } from '../../components/AdapterTable/AdapterTable';
import { AdapterMenu } from '../../components/AdapterMenu/AdapterMenu';
import { MenuToggle } from '../../components/MenuToggle/MenuToggle';
import { TopBarSearch } from '../../components/TopBarSearch/TopBarSearch';
import { useState, useEffect, useMemo } from 'react';
import GridIcon from '../../assets/img/blueGrid.svg';
import AdaptersListIcon from '../../assets/img/whiteAdaptersList.svg';
import { useAdapters } from '../../api/hooks/useAdapters';

type AdapterItem = {
    title: Record<string, string>;
    content: string;
    icon: string;
    keywords: string;
    authors: string;
    license: string;
    published: string;
    version: string;
    latestVersion: string;
    description: Record<string, string>;
    installs?: number;
    weekDownloads?: number;
    stars?: number;
};

const getLocalizedTitle = (title: AdapterItem['title'] | undefined, language: string): string => {
    if (!title) {
        return '';
    }
    return (
        title[language as keyof AdapterItem['title']] ||
        title.en ||
        title.de ||
        title.ru ||
        Object.values(title)[0] ||
        ''
    );
};

const AdaptersPage = (): React.ReactNode => {

    const [mode, setMode] = useState<'block' | 'table'>('block');
    const [search, setSearch] = useState('');
    const [menuMode, setMenuMode] = useState<'all' | 'installed'>('all');
    const [isMenuCollapsed, setIsMenuCollapsed] = useState(false);
    const [selectedMenuItem, setSelectedMenuItem] = useState('');
    const [selectedCategoryKey, setSelectedCategoryKey] = useState<'overview' | string>('overview');
    const isMobile = useMediaQuery('(max-width:661px)');
    const theme = useTheme();
    const { data: adaptersData } = useAdapters();
    const language = I18n.getLanguage();

    const { classes } = useStyles({ isMenuCollapsed });

    useEffect(() => {
        if (isMobile) {
            setIsMenuCollapsed(true);
        }
    }, [isMobile]);

    useEffect(() => {
        if (!selectedMenuItem && adaptersData?.pages?.overview?.title) {
            const overviewLabel = I18n.t('adapters.total') || getLocalizedTitle(adaptersData.pages.overview.title, language);
            if (overviewLabel) {
                setSelectedMenuItem(overviewLabel);
                setSelectedCategoryKey('overview');
            }
        }
    }, [adaptersData, language, selectedMenuItem]);

    const handleMenuItemClick = (label: string, categoryKey?: string) => {
        setSelectedMenuItem(label);
        if (categoryKey) {
            setSelectedCategoryKey(categoryKey);
        }
        if (isMobile) {
            setIsMenuCollapsed(true)
        }
    }

    const adaptersList = useMemo<AdapterItem[]>(() => {
        if (!adaptersData?.pages) {
            return [];
        }
        if (selectedCategoryKey && selectedCategoryKey !== 'overview') {
            const category = adaptersData.pages[selectedCategoryKey];
            if (!category?.pages) {
                return [];
            }
            return Object.values(category.pages);
        }
        return Object.values(adaptersData.pages).flatMap(category => Object.values(category.pages || {}));
    }, [adaptersData, selectedCategoryKey]);

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
                >{I18n.t('home.adapters.title')}
                </SectionTitle>
                <Typography
                    variant="h4"
                    className={classes.breadCrumbs}
                >
                    / {selectedMenuItem.toUpperCase()}
                </Typography>
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
                            onChange={(_, value) => value && setMode(value)}
                        >
                            <ToggleButton
                                value="block"
                            >
                                <img
                                    alt="Grid Icon"
                                    src={GridIcon}
                                />
                            </ToggleButton>
                            <ToggleButton
                                value="table"
                            >
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
                    />
                </Box>
                <Box className={classes.mainBlock}>
                    {mode === 'block' ? (
                        <Box className={classes.adaptersGrid}>
                            {adaptersList.map(adapter => (
                                <AdapterBlock adapter={adapter as any} key={adapter.content} />
                            ))}
                        </Box>
                    ) : (
                        <AdapterTable adapters={adaptersList as any} />
                    )}
                </Box>
            </Box>
        </Box>
    );
};

export default AdaptersPage;
