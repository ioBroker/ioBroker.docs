import { Box } from '@mui/material';
import { useMemo } from 'react';
import { useStyles } from './AdapterMenu.styles';
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
import { useNavigate } from 'react-router-dom';

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
    adapterId?: string;
}

interface AdapterMenuProps {
    isCollapsed?: boolean;
    onMenuItemClick?: (label: string) => void;
    selectedItem?: string;
}

export const AdapterMenu = ({ isCollapsed = false, onMenuItemClick, selectedItem = '' }: AdapterMenuProps): React.ReactNode => {
    const { classes } = useStyles({ isCollapsed });
    const { data: adaptersData } = useAdapters();
    const language = I18n.getLanguage();
    const navigate = useNavigate();

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
        return menuOrder
            .map(item => {
                const category = adaptersData.pages[item.key];
                if (!category) {
                    return null;
                }
                const label = getLocalizedTitle(category.title, language) || item.key;
                const count = item.isTotal ? totalAdapters : Object.keys(category.pages || {}).length;
                const firstAdapter = Object.values(category.pages || {})[0];
                const adapterId = firstAdapter?.title?.en || getLocalizedTitle(firstAdapter?.title, language) || '';
                return { icon: item.icon, label, count, adapterId };
            })
            .filter((item): item is MenuItem => Boolean(item));
    }, [adaptersData, language, totalAdapters]);

    const handleItemClick = (label: string, adapterId?: string) => {
        if (onMenuItemClick) {
            onMenuItemClick(label);
        }
        if (adapterId) {
            navigate(`/adapters/${adapterId}`);
        }
    };

    return (
        <Box className={classes.menu}>
            <Box className={classes.menuInner}>
                {menuItems.map((item, index) => {
                    const isFirstItem = index === 0;
                    const isActive = !isFirstItem && item.label === selectedItem;

                    return (
                        <Box
                            key={index}
                            className={`${classes.menuItem} ${isActive ? classes.menuItemActive : ''}`}
                            onClick={() => handleItemClick(item.label, item.adapterId)}
                        >
                            <Box className={classes.menuIcon}>
                                <img src={item.icon} alt={item.label} />
                            </Box>
                            {!isCollapsed && (
                                <>
                                    <Box className={`${classes.menuText} ${isFirstItem ? classes.firstItemText : ''} ${isActive ? classes.activeText : ''}`}>
                                        {item.label}
                                    </Box>
                                    <Box className={`${classes.menuCount} ${isFirstItem ? classes.firstItemCount : ''} ${isActive ? classes.activeCount : ''}`}>
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
