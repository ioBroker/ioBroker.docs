import { Box, useMediaQuery } from '@mui/material';
import { SectionTitle } from '../../components/SectionTitle/SectionTitle';
import { I18n } from '../../utils/i18n';
import { DocsMenu } from '../../components/DocsMenu/DocsMenu';
import { docsData } from './DocsData';
import { useParams } from 'react-router-dom';
import { MenuToggle } from '../../components/MenuToggle/MenuToggle';
import { MenuArrowsToggle } from '../../components/MenuArrowsToggle/MenuArrowsToggle';
import { MarkdownView } from '../../components/MarkdownView/MarkdownView';
import { TopBarSearch } from '../../components/TopBarSearch/TopBarSearch';
import { useStyles } from './DocsPage.styles';
import { DocsTableOfContents } from '../../components/DocsTableOfContents/DocsTableOfContents';
import linkImage from '../../assets/img/docsIcons/blueLink.svg';
import { useEffect, useState } from 'react';

const DocsPage = (): React.ReactNode => {
    const [menuMode, setMenuMode] = useState<'all' | 'installed'>('all');
    const [isMenuCollapsed, setIsMenuCollapsed] = useState(false);
    const [expandAllDocs, setExpandAllDocs] = useState<boolean>(false);
    const isTablet = useMediaQuery('(max-width:1181px)');
    const isMobile = useMediaQuery('(max-width:768px)');
    const [search, setSearch] = useState('');
    const params = useParams();
    const { classes } = useStyles({ isMenuCollapsed });
    useEffect(() => {
        if (isMobile) {
            setIsMenuCollapsed(true)
        }
    }, [isMobile])

    const tableOfContentsItems = [
        {
            id: 'what-is-iobroker',
            title: 'Was ist ioBroker?',
        },
        {
            id: 'architecture',
            title: 'Architektur',
        },
        {
            id: 'adapters-instances',
            title: 'Adapter und Instanzen',
        },
        {
            id: 'objects',
            title: 'Objekte',
            subtitles: [
                { id: 'object-type', title: 'Objekttyp' },
                { id: 'object-common', title: 'Allgemeine Attribute' },
                { id: 'object-native', title: 'Native Attribute' },
            ],
        },
        {
            id: 'states',
            title: 'States',
        },
        {
            id: 'installation',
            title: 'Installation',
            subtitles: [
                { id: 'install-linux', title: 'Linux' },
                { id: 'install-windows', title: 'Windows' },
                { id: 'install-macos', title: 'macOS' },
                { id: 'install-docker', title: 'Docker' },
            ],
        },
    ];

    return (
        <Box>
            <SectionTitle
                sx={{ marginTop: '30px', marginLeft: '31px', letterSpacing: '-0.03em !important',
                    fontSize: !isTablet? '36px' : '28px !important'
                 }}
            >{I18n.t('home.docs.title')}</SectionTitle>
            <Box className={classes.pageWrapper}>
                <Box className={classes.topBar}>
                    <Box className={classes.menuToggleContainer}>
                        <MenuToggle
                            sx={{width: isMobile? '70px !important': '55px',
                                 height: isMobile? '40px !important': '32px'}}
                            buttonSx={{minWidth: isMobile? '35px !important': '27px',}}
                            value={menuMode}
                            onChange={setMenuMode}
                            onCollapse={setIsMenuCollapsed}
                        />
                        {!isMobile &&
                        <MenuArrowsToggle
                            onExpandAll={setExpandAllDocs}
                        />}
                    </Box>
                    <Box className={classes.searchContainer}>
                        <TopBarSearch
                            isFluid={isMobile}
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    height: isMobile ? '40px !important' : '32px',
                                },
                            }}
                            value={search}
                            onChange={setSearch}
                        />
                    </Box>
                </Box>
                {!isMenuCollapsed && (
                    <Box className={classes.menuBlockMobile}> 
                        <DocsMenu docsData={docsData} expandAll={expandAllDocs} setExpandAll={setExpandAllDocs} setIsMenuClosed={setIsMenuCollapsed} />
                    </Box>
                )}
                <Box className={classes.root}>
                    <Box className={classes.menuBlock}>
                        <DocsMenu docsData={docsData} expandAll={expandAllDocs} setExpandAll={setExpandAllDocs} />
                    </Box>
                    <Box className={classes.mainBlock}>
                        <Box className={classes.content}>
                            <Box id="what-is-iobroker" className={classes.head}>
                                <div>WAS IST IOBROKER? - ALLGEMEINE INFORMATIONEN</div>
                                <img src={linkImage} alt="link" className={classes.linkIcon} />
                            </Box>
                            <Box className={classes.paragraph}>
                                ioBroker ist eine auf Integration ausgerichtete IoT-Plattform. Somit ist ioBroker das zentrale Element
                                einer Hausautomation, welches verschiedene Systeme zu einem Gesamtsystem vereint. Wie bei jeder
                                Integrationslösung ist ioBroker modular aufgebaut. Ein Server (genannt Master) und über 400 Adapter
                                können nach Bedarf installiert werden. Jeder Adapter stellt die Verbindung zu verschiedenen Software-
                                oder Hardwaresystemen her. Adapter können Informationen aus verschiedenen Quellen beziehen und zur
                                Nutzung im System bereitstellen. Somit kann ioBroker auf Geräte und Daten verschiedenster Systeme
                                zugreifen und diese steuern.
                            </Box>

                            <Box id="architecture" className={classes.heading}>
                                <div>ARCHITEKTUR DES IOBROKER-SYSTEMS - ALLGEMEINE INFORMATIONEN</div>
                                <img src={linkImage} alt="link" className={classes.linkIcon} />
                            </Box>
                            <Box className={classes.paragraph}>
                                Der ioBroker-Server verwaltet alle installierten Adapter und speichert die Konfiguration und Werte
                                aller angebundenen Systeme. Die Daten werden in Form von Objekten gespeichert. Jeder Adapter erstellt
                                eine vordefinierte Objektstruktur, die alle Informationen enthält, die der Adapter bereitstellen kann.
                                Somit werden Informationen verschiedener Systeme in einer standardisierten Struktur gespeichert und
                                können einheitlich abgerufen werden, unabhängig vom Ursprungssystem.
                            </Box>

                            <Box className={classes.image}>
                                <img
                                    src="/path/to/architecture-diagram.png"
                                    alt="ioBroker Architektur"
                                    style={{ width: '100%', maxWidth: '600px' }}
                                />
                            </Box>

                            <Box id="adapters-instances" className={classes.heading}>
                                <div>ADAPTER UND INSTANZEN (INSTANCES)</div>
                                <img src={linkImage} alt="link" className={classes.linkIcon} />
                            </Box>
                            <Box className={classes.paragraph}>
                                Ein Adapter ist ein Softwaremodul, das die Verbindung zwischen ioBroker und einem bestimmten Gerät,
                                Dienst oder zur Bereitstellung einer bestimmten Funktionalität herstellt. Da ioBroker ein modulares
                                System ist, können nur die Adapter hinzugefügt werden, die tatsächlich benötigt werden. Adapter werden
                                aus verschiedenen Quellen installiert. Standardmäßig werden Adapter aus npm (Node Package Manager)
                                installiert. Adapter können jedoch auch von GitHub oder von der lokalen Festplatte installiert werden
                                (für Adapter-Entwickler).
                            </Box>
                            <Box className={classes.paragraph}>
                                Jeder Adapter kann in mehreren Instanzen installiert werden. Eine Instanz ist ein laufender Prozess
                                eines Adapters. Wenn Sie beispielsweise mehrere Geräte desselben Typs haben, können Sie mehrere
                                Instanzen eines Adapters erstellen. Jede Instanz hat ihre eigene Konfiguration und läuft unabhängig
                                von anderen Instanzen.
                            </Box>

                            <Box id="objects" className={classes.heading}>
                                <span>OBJEKTE</span>
                                <img src={linkImage} alt="link" className={classes.linkIcon} />
                            </Box>
                            <Box className={classes.paragraph}>
                                Objekte sind strukturierte Beschreibungen von Datenpunkten. Objekte enthalten Metainformationen,
                                die den Datenpunkt beschreiben und festlegen, wie er verarbeitet werden soll. Objekte haben folgende
                                Attribute:
                            </Box>
                            <Box component="ul" className={classes.list}>
                                <Box component="li" className={classes.listItem}>
                                    type - Objekttyp (state, channel, device, enum, host, adapter, instance, meta, config, script, user, group)
                                </Box>
                                <Box component="li" className={classes.listItem}>
                                    common - allgemeine Objektattribute
                                </Box>
                                <Box component="li" className={classes.listItem}>
                                    native - adapterspezifische Attribute
                                </Box>
                            </Box>

                            <Box id="states" className={classes.heading}>
                                <span>STATES (ZUSTÄNDE)</span>
                                <img src={linkImage} alt="link" className={classes.linkIcon} />
                            </Box>
                            <Box className={classes.paragraph}>
                                States sind die tatsächlichen Werte von Datenpunkten. States sind mit Objekten vom Typ "state"
                                verknüpft. Im Gegensatz zu Objekten, die statische Metainformationen enthalten, enthalten States
                                den tatsächlichen Wert des Datenpunkts, der sich im Laufe der Zeit ändern kann. Jede Änderung eines
                                States kann bestimmte Aktionen im System auslösen.
                            </Box>

                            <Box id="installation" className={classes.heading}>
                                <span>INSTALLATION</span>
                                <img src={linkImage} alt="link" className={classes.linkIcon} />
                            </Box>
                            <Box className={classes.paragraph}>
                                ioBroker kann auf verschiedenen Plattformen installiert werden:
                            </Box>
                            <Box component="ul" className={classes.list}>
                                <Box component="li" className={classes.listItem}>
                                    Linux (empfohlen: Debian oder Ubuntu)
                                </Box>
                                <Box component="li" className={classes.listItem}>
                                    Windows
                                </Box>
                                <Box component="li" className={classes.listItem}>
                                    macOS
                                </Box>
                                <Box component="li" className={classes.listItem}>
                                    Docker
                                </Box>
                            </Box>
                        </Box>
                    </Box>

                    {!isTablet && <DocsTableOfContents items={tableOfContentsItems} />}

                    {/* {`https://www.iobroker.net/en/${params['*']}`} */}
                    {/* <MarkdownView url={`/api/iobroker/en/${params['*']}`} /> */}
                </Box>
            </Box>
        </Box>
    );
};

export default DocsPage;
