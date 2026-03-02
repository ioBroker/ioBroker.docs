import { Box } from '@mui/material';
import { useStyles } from './AdapterMenu.styles';
import GesamtanzahlIcon from '../../assets/img/adaptersMenuIcons/Gesamtanzahl.svg';
import BeliebteIcon from '../../assets/img/adaptersMenuIcons/Beliebte.svg';
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

const menuItems = [
    { icon: GesamtanzahlIcon, label: 'Gesamtanzahl', count: 642 },
    { icon: BeliebteIcon, label: 'Beliebte', count: 642 },
    { icon: AlarmIcon, label: 'Alarm', count: 642 },
    { icon: KlimaIcon, label: 'Klima / Lüftung', count: 642 },
    { icon: KommunicationIcon, label: 'Kommunikation', count: 642 },
    { icon: DatumIcon, label: 'Datum / Uhrzeit', count: 642 },
    { icon: EnergieIcon, label: 'Energie', count: 642 },
    { icon: GartenIcon, label: 'Garten', count: 642 },
    { icon: GrundfunktionenIcon, label: 'Grundfunktionen', count: 642 },
    { icon: GeopositionIcon, label: 'Geoposition / Location', count: 642 },
    { icon: HardwareIcon, label: 'Hardware', count: 642 },
    { icon: GesundheitIcon, label: 'Gesundheit', count: 642 },
    { icon: HaushaltIcon, label: 'Haushalt', count: 642 },
    { icon: InfrastrukturIcon, label: 'Infrastruktur', count: 642 },
    { icon: IoTIcon, label: 'IoT Systeme', count: 642 },
    { icon: BeleuchtungIcon, label: 'Beleuchtung', count: 642 },
    { icon: LogicIcon, label: 'Logik', count: 642 },
    { icon: BenachrichtigungIcon, label: 'Benachrichtigung', count: 642 },
    { icon: MessungIcon, label: 'Messung', count: 642 },
    { icon: SonstigeIcon, label: 'Sonstige', count: 642 },
    { icon: MultimediaIcon, label: 'Multimedia', count: 642 },
    { icon: NetzwerkIcon, label: 'Netzwerk', count: 642 },
    { icon: ProtokolleIcon, label: 'Protokolle', count: 642 },
    { icon: AufbewahrungIcon, label: 'Aufbewahrung', count: 642 },
    { icon: DienstprogrammIcon, label: 'Dienstprogramm', count: 642 },
    { icon: FahrzeugIcon, label: 'Fahrzeug', count: 642 },
    { icon: VisualisierungIcon, label: 'Visualisierung', count: 642 },
    { icon: VisualisierungIconsIcon, label: 'Visualisierung Icons', count: 642 },
    { icon: VisualisierungWidgetsIcon, label: 'Visualisierung Widgets', count: 642 },
    { icon: WetterIcon, label: 'Wetter', count: 642 },
];

interface AdapterMenuProps {
    isCollapsed?: boolean;
    onMenuItemClick?: () => void;
}

export const AdapterMenu = ({ isCollapsed = false, onMenuItemClick  }: AdapterMenuProps): React.ReactNode => {
    const { classes } = useStyles({ isCollapsed });

    const handleItemClick = () => {
        if (onMenuItemClick) {
            onMenuItemClick();
        }
    };

    return (
        <Box className={classes.menu}>
            {menuItems.map((item, index) => (
                <Box
                    key={index}
                    className={`${classes.menuItem} ${index === 0 ? classes.menuItemActive : ''}`}
                     onClick={handleItemClick}
                >
                    <Box className={classes.menuIcon}>
                        <img src={item.icon} alt={item.label} />
                    </Box>
                    {!isCollapsed && (
                        <>
                            <Box className={`${classes.menuText} ${index === 0 ? classes.firstItemText : ''}`}>{item.label}</Box>
                            <Box className={`${classes.menuCount} ${index === 0 ? classes.firstItemCount : ''}`}>{item.count}</Box>
                        </>
                    )}
                </Box>
            ))}
        </Box>
    );
};
