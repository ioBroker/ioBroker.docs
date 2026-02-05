import { Box } from '@mui/material';
import { AdapterBlock } from '../../components/AdapterBlock/AdapterBlock';
import type { AdapterItem } from '../../components/AdapterItem/AdapterItem';
import { SectionTitle } from '../../components/SectionTitle/SectionTitle';
import { I18n } from '../../utils/i18n';
import { useStyles } from './AdaptersPage.styles';

const sampleItem: AdapterItem = {
    title: {
        de: 'alarm',
        en: 'alarm',
        ru: 'alarm',
        'zh-cn': 'alarm',
    },
    content: 'adapterref/iobroker.alarm/README.md',
    icon: 'adapterref/iobroker.alarm/alarm.png',
    keywords: 'alarm system, security, protection',
    authors: 'misanorot <audi16v@gmx.de>',
    license: 'MIT',
    published: '2019-09-24T18:30:07.162Z',
    version: '3.7.6',
    latestVersion: '3.7.6',
    compact: true,
    description: {
        en: 'Your own lttle alarm system',
        de: 'Ihre eigene kleine Alarmanlage',
        ru: 'Ваша собственная маленькая система сигнализации',
        pt: 'Seu próprio pequeno sistema de alarme',
        nl: 'Uw eigen kleine alarmsysteem',
        fr: "Votre propre petit système d'alarme",
        it: 'Il tuo piccolo sistema di allarme',
        es: 'Tu propio pequeño sistema de alarma',
        pl: 'Twój własny mały system alarmowy',
        uk: 'Ваша власна маленька система сигналізації',
        'zh-cn': '你自己的小警报系统',
    },
    titleFull: {
        en: 'Alarm',
        de: 'Alarm',
        ru: 'Сигнализация',
        pt: 'Alarme de alarme',
        nl: 'Alarm',
        fr: 'Alarme',
        it: 'Allarme',
        es: 'Alarma',
        pl: 'Alarma',
        uk: 'Напильник',
        'zh-cn': 'Alarm',
    },
    branch: 'master',
    github: 'https://github.com/misanorot/ioBroker.alarm',
    installs: 1661,
    weekDownloads: 167,
    stars: 24,
    issues: 0,
    score: 1,
};

const AdaptersPage = (): React.ReactNode => {
    const { classes } = useStyles();
    return (
        <Box>
            <SectionTitle>{I18n.t('home.adapters.title')}</SectionTitle>
            <Box>
                <Box className={classes.menuBlock}>
                    <Box className={classes.menuButton}></Box>
                </Box>
                <Box className={classes.mainBlock}>
                    <Box className={classes.mainTopBlock}>
                        <Box className={classes.adaptersSearch}></Box>
                        <Box className={classes.adaptersButton}></Box>
                    </Box>
                    <AdapterBlock adapter={sampleItem} />;
                </Box>
            </Box>
        </Box>
    );
};

export default AdaptersPage;
