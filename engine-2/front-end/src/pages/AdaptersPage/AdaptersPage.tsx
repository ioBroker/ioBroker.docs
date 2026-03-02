import { Box, TextField, ToggleButton, ToggleButtonGroup, InputAdornment, useMediaQuery } from '@mui/material';
import { AdapterBlock } from '../../components/AdapterBlock/AdapterBlock';
import type { AdapterItem } from '../../components/AdapterItem/AdapterItem';
import { SectionTitle } from '../../components/SectionTitle/SectionTitle';
import { I18n } from '../../utils/i18n';
import { useStyles } from './AdaptersPage.styles';
import { AdapterTable } from '../../components/AdapterTable/AdapterTable';
import { AdapterMenu } from '../../components/AdapterMenu/AdapterMenu';
import { useState, useEffect } from 'react';
import GridIcon from '../../assets/img/blueGrid.svg';
import AdaptersListIcon from '../../assets/img/whiteAdaptersList.svg';
import MenuListIcon from '../../assets/img/whiteMenuList.svg';
import SearchIcon from '../../assets/img/whiteSearchIcon.svg'

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

    const [mode, setMode] = useState<'block' | 'table'>('block');
    const [search, setSearch] = useState('');
    const [menuMode, setMenuMode] = useState<'all' | 'installed'>('all');
    const [isMenuCollapsed, setIsMenuCollapsed] = useState(false);
    const isMobile = useMediaQuery('(max-width:661px)');

    const { classes } = useStyles({ isMenuCollapsed });

    useEffect(() => {
        if (isMobile) {
            setIsMenuCollapsed(true);
        }
    }, [isMobile]);

    const handleMenuItemClick = () => {
        if (isMobile) {
            setIsMenuCollapsed(true)
        }
    }



    return (
        <Box>
            <SectionTitle
                sx={{
                    marginLeft: '32px',
                    color: 'white !important',
                    fontSize: {
                        '@media (max-width:770px)': { fontSize: '28px !important' },
                        '@media (max-width:480px)': { fontSize: '20px !important' },
                    },
                }}
            >{I18n.t('home.adapters.title')}
            </SectionTitle>
            <Box className={classes.topBar}>
                <Box className={classes.menuToggle}>
                    <ToggleButtonGroup
                        exclusive
                        value={menuMode}
                        onChange={(_, value) => value && setMenuMode(value)}
                    >
                        <ToggleButton
                            value="all"
                            onClick={() => setIsMenuCollapsed(false)}
                        >
                            <img
                                alt="MenuList Icon"
                                src={MenuListIcon}
                            />
                        </ToggleButton>
                        <ToggleButton
                            value="installed"
                            onClick={() => setIsMenuCollapsed(true)}
                        >
                            <Box sx={{ width: 20 }} />
                        </ToggleButton>
                    </ToggleButtonGroup>
                </Box>
                <Box className={classes.searchAndMenuButton}>
                    <Box className={classes.adaptersSearch}>
                        <TextField
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                            placeholder=""
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start" sx={{ marginLeft: '8px' }}>
                                        <img
                                            alt="Search Icon"
                                            src={SearchIcon}
                                        />
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </Box>
                    <Box className={classes.adaptersButton}>
                        <ToggleButtonGroup
                            exclusive
                            value={mode}
                            onChange={(_, value) => value && setMode(value)}
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
                    <AdapterMenu isCollapsed={isMenuCollapsed} onMenuItemClick={handleMenuItemClick} />
                </Box>
                <Box className={classes.mainBlock}>
                    {mode === 'block' ? (
                        <Box className={classes.adaptersGrid}>
                            <AdapterBlock adapter={sampleItem} />
                            <AdapterBlock adapter={sampleItem} />
                            <AdapterBlock adapter={sampleItem} />
                            <AdapterBlock adapter={sampleItem} />
                            <AdapterBlock adapter={sampleItem} />
                        </Box>
                    ) : (
                        <AdapterTable adapters={[sampleItem, sampleItem, sampleItem, sampleItem]} />
                    )}
                </Box>
            </Box>
        </Box>
    );
};

export default AdaptersPage;
