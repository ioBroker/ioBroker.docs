import React, { useState } from 'react';
import { Box, Typography, Collapse } from '@mui/material';
import { useStyles } from './AboutSection.styles';
import { SectionTitle } from '../../../../components/SectionTitle/SectionTitle';
import { StyledButton } from '../../../../components/StyledButton/StyledButton';
import { I18n } from '../../../../utils/i18n';

interface ItemData {
    title: string;
    description: string;
    details?: string;
}

const ALL_ITEMS: ItemData[] = [
    {
        title: 'ENORME FLEXIBILITÄT',
        description:
            'Mit ioBroker sind deiner Kreativität keine Grenzen gesetzt. Die Plattform unterstützt eine Vielzahl von Automatisierungsansätzen, von einfachen "Wenn-dies-dann-das"-Szenarien bis hin zu komplexen, mehrstufigen Logiken. Dank der Unterstützung von Blocky, JavaScript, TypeScript und Node.js können sowohl Einsteiger als auch erfahrene Entwickler ihre Smart-Home-Umgebung individuell gestalten und erweitern.',
        details:
            'Ob zeitgesteuerte Abläufe, Sensorwerte als Auslöser oder die intelligente Verknüpfung mehrerer Geräte: ioBroker bietet maximale Freiheit bei der Umsetzung deiner Automatisierungsideen. Dabei ist das System so offen gestaltet, dass nahezu jede Hardware und jedes Protokoll integriert werden kann – egal ob Zigbee, Z-Wave, MQTT, KNX oder cloudbasierte Dienste wie Alexa, Google Assistant oder HomeKit. Mit ioBroker automatisierst du nicht nur Abläufe, sondern schaffst ein vollständig vernetztes, intelligentes Zuhause . Ganz nach deinen Regeln.'
    },
    {
        title: 'OPEN-SOURCE',
        description:
            'Als Open-Source-Projekt ist ioBroker nicht nur kostenlos zugänglich, sondern wird auch ständig von einer aktiven Community weiterentwickelt.',
        details:
            'Als Open-Source-Projekt ist ioBroker nicht nur kostenlos zugänglich, sondern wird auch ständig von einer aktiven Community weiterentwickelt.',
    },
    {
        title: 'VISUALISIERUNG',
        description:
            'Zahlreiche Optionen zur individuellen und intuitiven Gestaltung der Visualisierung, wie Vis-2, ioControl, Lovelace, HabPanel etc.',
        details:
            'Zahlreiche Optionen zur individuellen und intuitiven Gestaltung der Visualisierung, wie Vis-2, ioControl, Lovelace, HabPanel etc.'
    },
    {
        title: 'ALLES ÜBER GUI',
        description: 'Vergiss komplizierte Konfigurationsdateien!  Alles bequem über eine grafische Benutzeroberfläche (GUI) konfigurieren, was die Nutzung besonders einfach macht.',
        details: 'Vergiss komplizierte Konfigurationsdateien!  Alles bequem über eine grafische Benutzeroberfläche (GUI) konfigurieren, was die Nutzung besonders einfach macht.'
    },
    {
        title: 'DEUTSCHE COMMUNITY',
        description: 'Die ioBroker-Community ist stark und aktiv, besonders im deutschsprachigen Raum. Hier findest du schnellen Support und hilfreiche Tipps.',
        details: 'Die ioBroker-Community ist stark und aktiv, besonders im deutschsprachigen Raum. Hier findest du schnellen Support und hilfreiche Tipps.'
    },
    {
        title: 'OFFENE ARCHITEKTUR',
        description: 'Bietet endlose Möglichkeiten zur Erweiterung. Neue Geräte, Dienste und Funktionen können flexibel integriert werden – unabhängig vom Hersteller.',
        details: 'Bietet endlose Möglichkeiten zur Erweiterung. Neue Geräte, Dienste und Funktionen können flexibel integriert werden – unabhängig vom Hersteller.'
    },
    {
        title: 'MODULARITÄT',
        description: 'hfhhfsshfhdkghkdgfjfgfgjb',
        details: 'hfhhfsshfhdkghkdgfjfgfgjb'
    },
    {
        title: 'BENUTZER-MANAGEMENT',
        description: 'Zugriffsrechte gezielt steuern und unterschiedliche Nutzerrollen definieren. Perfekt für Familien oder geteilte Smart-Home-Systeme.',
        details: 'Zugriffsrechte gezielt steuern und unterschiedliche Nutzerrollen definieren. Perfekt für Familien oder geteilte Smart-Home-Systeme.'
    },
    {
        title: 'REDIS ALS OPTIONALE DATENBANK',
        description: 'Die Integration von REDIS ermöglicht höchste Performance, beschleunigt Datenzugriffe und macht ioBroker ideal für anspruchsvolle Anwendungen.',
        details: 'Die Integration von REDIS ermöglicht höchste Performance, beschleunigt Datenzugriffe und macht ioBroker ideal für anspruchsvolle Anwendungen.'
    },
    {
        title: 'JAVA SCRIPT UND NODE. JS',
        description: 'Diese Basis ermöglicht schnelle, skalierbare Automatisierungen und individuelle Anpassungen und machen ioBroker flexibel und zukunftssicher.',
        details: 'Diese Basis ermöglicht schnelle, skalierbare Automatisierungen und individuelle Anpassungen und machen ioBroker flexibel und zukunftssicher.'
    },
    {
        title: 'SKALIERBARKEIT',
        description: 'ioBroker wächst mit deinen Anforderungen – vom kleinen Smart-Home-Setup bis hin zu komplexen Multi-Host-Systemen. Neue Geräte und Funktionen lassen sich jederzeit hinzufügen. ',
        details: 'ioBroker wächst mit deinen Anforderungen – vom kleinen Smart-Home-Setup bis hin zu komplexen Multi-Host-Systemen. Neue Geräte und Funktionen lassen sich jederzeit hinzufügen. '
    },
    {
        title: 'JS-CONTROLLER ',
        description: 'bla vla bla bla bla bjbfj mnskndf njanjsfnds kndskfnks ',
        details: 'bla vla bla bla bla bjbfj mnskndf njanjsfnds kndskfnks '
    },
    {
        title: 'SICHERHEIT',
        description: 'Daten bleiben lokal und unter deiner Kontrolle. Der Fernzugriff funktioniert ohne externe Cloud-Dienste, was maximale Privatsphäre garantiert.',
        details: 'Daten bleiben lokal und unter deiner Kontrolle. Der Fernzugriff funktioniert ohne externe Cloud-Dienste, was maximale Privatsphäre garantiert.'
    },
    {
        title: 'MULTI-HOST',
        description: 'Die Last kann auf mehrere Server verteilt werden, wodurch das System entlastet und gleichzeitig eine bessere Performance sowie höhere Ausfallsicherheit erreicht wird.',
        details: 'Die Last kann auf mehrere Server verteilt werden, wodurch das System entlastet und gleichzeitig eine bessere Performance sowie höhere Ausfallsicherheit erreicht wird.'
    }
];

export const AboutSection: React.FC = () => {
    const { classes } = useStyles();

    const [visibleCount, setVisibleCount] = useState(3);

    const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

    const handleShowMore = () => {
        setVisibleCount((prev) => prev + ALL_ITEMS.length);
    };

    const handleExpandClick = (index: number) => {
        setExpandedIndex((prevIndex) => (prevIndex === index ? null : index));
    };

    return (
        <Box
            component="section"
            className={classes.aboutSection}
        >
            <Box className={classes.container}>
                <Box
                    sx={{
                        width: '100%',
                        maxWidth: '1311px',
                        textAlign: { xs: 'left', md: 'left' },
                        mb: { xs: 0, md: 4 },
                    }}
                >
                    <SectionTitle sx={{
                        marginBottom: { xs: '32px !important', md: '24px !important' },
                        fontSize: { '@media (max-width:400px)': { fontSize: '26px !important' } }
                    }}>
                        {I18n.t('home.about.title')}
                    </SectionTitle>
                </Box>
                {ALL_ITEMS.slice(0, visibleCount).map((item, index) => {
                    const isExpanded = expandedIndex === index;
                    return (
                        <StyledButton
                            key={item.title}
                            onClick={() => handleExpandClick(index)}
                            sx={{
                                width: '100%',
                                minHeight: { xs: 'auto', md: isExpanded ? 'auto' : '140px' },
                                padding: { xs: '20px', sm: '24px', md: '24px 39px' },
                                marginBottom: { xs: '16px', md: '32px' },
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: isExpanded ? 'stretch' : 'flex-end',
                                transition: 'all 0.3s ease',
                                borderRadius: { xs: '16px', sm: '16px', md: '24px' },
                            }}
                            textSx={{
                                width: '100%',
                                maxWidth: '1010px',
                            }}
                            iconSx={{
                                alignSelf: 'flex-end',
                                mb: 0.1,
                                height: { xs: '20px', sm: '30px', md: '30px' },
                                width: { xs: '20px', sm: '30px', md: '30px' },
                                transform: isExpanded ? 'rotate(180deg) scaleX(-1)' : 'rotate(0deg) scaleX(1)',
                                transition: 'transform 0.3s ease',
                                // marginTop: isExpanded ? '20px' : '0',
                            }}
                        >
                            <Box sx={{ textAlign: 'left', flex: 1 }}>
                                <Typography className={classes.itemTitle}>
                                    {I18n.t(`home.about.items.${index}.title`, { defaultValue: item.title })}
                                </Typography>
                                <Typography className={classes.itemDescription}>
                                    {item.description}
                                </Typography>
                                <Collapse in={isExpanded} timeout="auto" unmountOnExit>
                                    <Typography
                                        className={classes.itemDescription}
                                        sx={{
                                            whiteSpace: 'pre-line',
                                            marginTop: 2
                                        }}
                                    >
                                        {item.details}
                                    </Typography>
                                </Collapse>
                            </Box>
                        </StyledButton>
                    )
                })}
                {visibleCount < ALL_ITEMS.length && (
                    <Box className={classes.buttonWrapper}>
                        <StyledButton
                            onClick={handleShowMore}
                            sx={{
                                marginTop: { xs: '0px', md: '4px' },
                                height: { xs: '50px', sm: '60px', md: '80px' },
                                width: '100%',
                                padding: { xs: '10px 20px', sm: '12px 24px', md: '20px 39px' },
                                position: 'relative',
                                zIndex: 1,
                                borderRadius: { xs: '8px', sm: '8px', md: '16px' },
                            }}
                            iconSx={{
                                alignSelf: 'flex-end',
                                mb: '5px',
                                height: { xs: '20px', sm: '30px', md: '30px' },
                                width: { xs: '20px', sm: '30px', md: '30px' },
                            }}
                        >
                            {I18n.t('home.about.more')}
                        </StyledButton>
                    </Box>
                )}
            </Box>
        </Box>
    );
};
