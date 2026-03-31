import { Box } from '@mui/material';
import { useMemo } from 'react';
import { useStyles } from './AdapterMenu.styles';
import type { AdapterItem } from '../AdapterItem/AdapterItem';
import GesamtanzahlIcon from '../../assets/img/adaptersMenuIcons/Gesamtanzahl.svg';
import AlarmIcon from '../../assets/img/adaptersMenuIcons/Alarm.svg';
import KlimaIcon from '../../assets/img/adaptersMenuIcons/Klima.svg';
import KommunicationIcon from '../../assets/img/adaptersMenuIcons/Kommunication.svg';
import DatumIcon from '../../assets/img/adaptersMenuIcons/Datum.svg';
import EnergieIcon from '../../assets/img/adaptersMenuIcons/Energie.svg';
import GartenIcon from '../../assets/img/adaptersMenuIcons/Garten.svg';
import GrundfunktionenIcon from '../../assets/img/adaptersMenuIcons/Grundfunktionen.svg';
import GeopositionIcon from '../../assets/img/adaptersMenuIcons/Geoposition.svg';
import HardwareIcon from '../../assets/img/adaptersMenuIcons/Hardware.svg';
import GesundheitIcon from '../../assets/img/adaptersMenuIcons/Gesundheit.svg';
import HaushaltIcon from '../../assets/img/adaptersMenuIcons/Haushalt.svg';
import InfrastrukturIcon from '../../assets/img/adaptersMenuIcons/Infrastruktur.svg';
import IoTIcon from '../../assets/img/adaptersMenuIcons/IoT.svg';
import BeleuchtungIcon from '../../assets/img/adaptersMenuIcons/Beleuchtung.svg';
import LogicIcon from '../../assets/img/adaptersMenuIcons/Logic.svg';
import BenachrichtigungIcon from '../../assets/img/adaptersMenuIcons/Benachrichtigung.svg';
import MessungIcon from '../../assets/img/adaptersMenuIcons/Messung.svg';
import SonstigeIcon from '../../assets/img/adaptersMenuIcons/Sonstige.svg';
import MultimediaIcon from '../../assets/img/adaptersMenuIcons/Multimedia.svg';
import NetzwerkIcon from '../../assets/img/adaptersMenuIcons/Netzwerk.svg';
import ProtokolleIcon from '../../assets/img/adaptersMenuIcons/Protokolle.svg';
import AufbewahrungIcon from '../../assets/img/adaptersMenuIcons/Aufbewahrung.svg';
import DienstprogrammIcon from '../../assets/img/adaptersMenuIcons/Dienstprogramm.svg';
import FahrzeugIcon from '../../assets/img/adaptersMenuIcons/Fahrzeug.svg';
import VisualisierungIcon from '../../assets/img/adaptersMenuIcons/Visualisierung.svg';
import VisualisierungIconsIcon from '../../assets/img/adaptersMenuIcons/VisualisierungIcons.svg';
import VisualisierungWidgetsIcon from '../../assets/img/adaptersMenuIcons/VisualisierungWidgets.svg';
import WetterIcon from '../../assets/img/adaptersMenuIcons/Wetter.svg';
import { useAdapters } from '../../api/hooks/useAdapters';
import { I18n } from '../../utils/i18n';

// Fallback translations for category keys when API data has no localized title
const categoryFallback: Record<string, Record<string, string>> = {
    'messaging': { de: 'Benachrichtigung', en: 'Messaging', ru: 'Уведомления' },
    'metering': { de: 'Messung', en: 'Metering', ru: 'Измерение' },
    'misc-data': { de: 'Sonstige', en: 'Miscellaneous', ru: 'Разное' },
    'climate-control': { de: 'Klimakontrolle', en: 'Climate Control', ru: 'Климат-контроль' },
    'date-and-time': { de: 'Datum und Uhrzeit', en: 'Date and Time', ru: 'Дата и время' },
    'iot-systems': { de: 'IoT Systeme', en: 'IoT Systems', ru: 'IoT системы' },
    'visualization-icons': { de: 'Visualisierungs-Icons', en: 'Visualization Icons', ru: 'Иконки визуализации' },
    'visualization-widgets': { de: 'Visualisierungs-Widgets', en: 'Visualization Widgets', ru: 'Виджеты визуализации' },
};

const menuOrder = [
    { key: 'overview', icon: GesamtanzahlIcon, isTotal: true },
    { key: 'alarm', icon: AlarmIcon },
    { key: 'climate-control', icon: KlimaIcon },
    { key: 'communication', icon: KommunicationIcon },
    { key: 'date-and-time', icon: DatumIcon },
    { key: 'energy', icon: EnergieIcon },
    { key: 'garden', icon: GartenIcon },
    { key: 'general', icon: GrundfunktionenIcon },
    { key: 'geoposition', icon: GeopositionIcon },
    { key: 'hardware', icon: HardwareIcon },
    { key: 'health', icon: GesundheitIcon },
    { key: 'household', icon: HaushaltIcon },
    { key: 'infrastructure', icon: InfrastrukturIcon },
    { key: 'iot-systems', icon: IoTIcon },
    { key: 'lighting', icon: BeleuchtungIcon },
    { key: 'logic', icon: LogicIcon },
    { key: 'messaging', icon: BenachrichtigungIcon },
    { key: 'metering', icon: MessungIcon },
    { key: 'misc-data', icon: SonstigeIcon },
    { key: 'multimedia', icon: MultimediaIcon },
    { key: 'network', icon: NetzwerkIcon },
    { key: 'protocols', icon: ProtokolleIcon },
    { key: 'storage', icon: AufbewahrungIcon },
    { key: 'utility', icon: DienstprogrammIcon },
    { key: 'vehicle', icon: FahrzeugIcon },
    { key: 'visualization', icon: VisualisierungIcon },
    { key: 'visualization-icons', icon: VisualisierungIconsIcon },
    { key: 'visualization-widgets', icon: VisualisierungWidgetsIcon },
    { key: 'weather', icon: WetterIcon },
];

const getLocalizedTitle = (title: Record<string, string> | undefined, language: string): string => {
    if (!title) {
        return '';
    }
    return title[language] || title.en || title.de || title.ru || Object.values(title)[0] || '';
};

interface MenuItem {
    icon: string;
    label: string;
    count: number;
    key: string;
    adapterId?: string;
}

interface AdapterMenuProps {
    isCollapsed?: boolean;
    onMenuItemClick?: (label: string, categoryKey?: string) => void;
    selectedItem?: string;
    selectedCategoryKey?: string;
    search?: string;
}

const normalizeText = (value: string, language: string): string => {
    const lowered = value.trim().toLocaleLowerCase(language === 'ru' ? 'ru' : undefined);
    return lowered.replace(/\u0451/g, '\u0435').replace(/\u0401/g, '\u0415');
};

export const AdapterMenu = ({
    isCollapsed = false,
    onMenuItemClick,
    selectedCategoryKey: selectedCategoryKeyProp = '',
    selectedItem = '',
    search = '',
}: AdapterMenuProps): React.ReactNode => {
    const { classes } = useStyles({ isCollapsed });
    const { data: adaptersData } = useAdapters();
    const language = I18n.getLanguage();
    const searchTerm = normalizeText(search, language);

    const adapterSearchIndex = useMemo(() => {
        if (!adaptersData?.pages) {
            return new Map<string, string>();
        }
        const map = new Map<string, string>();
        for (const category of Object.values(adaptersData.pages)) {
            for (const adapter of Object.values(category.pages || {})) {
                const normalized = normalizeText(
                    [
                        getLocalizedTitle(adapter.title as Record<string, string> | undefined, language),
                        ...(adapter.title ? Object.values(adapter.title) : []),
                        getLocalizedTitle(adapter.description as Record<string, string> | undefined, language),
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
        const result = text.includes(searchTerm);
        return result;
    };

    const totalAdapters = useMemo(() => {
        if (!adaptersData?.pages) {
            return 0;
        }
        return Object.values(adaptersData.pages).reduce((sum, category) => {
            return sum + (category?.pages ? Object.keys(category.pages).length : 0);
        }, 0);
    }, [adaptersData]);

    const menuItems = useMemo<MenuItem[]>(() => {
        if (!adaptersData?.pages) {
            return [];
        }
        return menuOrder.reduce<MenuItem[]>((acc, item) => {
            const category = adaptersData.pages[item.key];
            if (!category) {
                return acc;
            }
            const label = item.isTotal
                ? I18n.t('adapters.total')
                : getLocalizedTitle(category.title as Record<string, string>, language)
                  || (categoryFallback[item.key] && getLocalizedTitle(categoryFallback[item.key], language))
                  || item.key;
            const adapters = Object.values(category.pages || {});
            const matched = searchTerm ? adapters.filter(adapter => matchesSearchFast(adapter)) : adapters;
            const totalMatched = searchTerm
                ? Array.from(adapterSearchIndex.values()).filter(text => text.includes(searchTerm)).length
                : totalAdapters;
            const count = item.isTotal ? totalMatched : matched.length;
            if (searchTerm && !item.isTotal && count === 0) {
                return acc;
            }
            const firstAdapter = Object.values(category.pages || {})[0];
            const adapterId =
                firstAdapter?.title?.en ||
                getLocalizedTitle(firstAdapter?.title as Record<string, string> | undefined, language) ||
                '';
            acc.push({ icon: item.icon, label, count, key: item.key, adapterId });
            return acc;
        }, []);
    }, [adaptersData, language, totalAdapters, searchTerm, adapterSearchIndex, matchesSearchFast]);

    const handleItemClick = (label: string, categoryKey?: string): void => {
        if (onMenuItemClick) {
            onMenuItemClick(label, categoryKey);
        }
    };

    return (
        <Box className={classes.menu}>
            <Box className={classes.menuInner}>
                {menuItems.map((item, index) => {
                    const isFirstItem = index === 0;
                    const isActive = !isFirstItem && (selectedCategoryKeyProp ? item.key === selectedCategoryKeyProp : item.label === selectedItem);

                    return (
                        <Box
                            key={index}
                            className={`${classes.menuItem} ${isActive ? classes.menuItemActive : ''}`}
                            onClick={() => handleItemClick(item.label, item.key)}
                        >
                            <Box className={classes.menuIcon}>
                                <img
                                    src={item.icon}
                                    alt={item.label}
                                />
                            </Box>
                            {!isCollapsed && (
                                <>
                                    <Box
                                        className={`${classes.menuText} ${isFirstItem ? classes.firstItemText : ''} ${isActive ? classes.activeText : ''}`}
                                    >
                                        {item.label}
                                    </Box>
                                    <Box
                                        className={`${classes.menuCount} ${isFirstItem ? classes.firstItemCount : ''} ${isActive ? classes.activeCount : ''}`}
                                    >
                                        {item.count}
                                    </Box>
                                </>
                            )}
                        </Box>
                    );
                })}
            </Box>
        </Box>
    );
};
