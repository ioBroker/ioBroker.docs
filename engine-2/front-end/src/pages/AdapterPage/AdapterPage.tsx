import React, { useState } from 'react';
import { Box, Typography } from '@mui/material';
import { useStyles } from './AdapterPage.styles';
import ArrowDownIcon from '../../assets/img/arrowIcon.svg';
import ContentCopyTwoToneIcon from '@mui/icons-material/ContentCopyTwoTone';
import SymbolAdapter from '../../assets/img/adapterPageIcons/SymbolAdapter.png'
import SaveIcon from '../../assets/img/adapterPageIcons/IconDownload.svg'
import DownLoadIcon from '../../assets/img/adapterPageIcons/download.svg'
import StarIcon from '../../assets/img/adapterPageIcons/star.svg'
import npmImage from '../../assets/img/adapterPageIcons/npm.png'
import GitHubIcon from '../../assets/img/adapterPageIcons/github.svg';
import HistoryIcon from '../../assets/img/adapterPageIcons/history.svg';
import LicenseIcon from '../../assets/img/adapterPageIcons/license.svg';
import EditIcon from '../../assets/img/adapterPageIcons/edit-fill.svg';
import theme from '../../theme';
import LicenseModal from './LicenseModal';
import HistoryModal from './HistoryModal';



const AdapterPage = (): React.ReactNode => {
    const { classes } = useStyles();
    const [isLicenseOpen, setIsLicenseOpen] = useState(false);
    const [isHistoryOpen, setIsHistoryOpen] = useState(false);

    return (
        <Box className={classes.pageGrid}>
            <Box className={classes.introArea}>
                <Box className={classes.breadcrumbs}>
                    <span className={classes.breadcrumbSlash}>//</span> ADAPTER
                    <span className={classes.breadcrumbSlash}>/</span> GARTEN
                    <span className={classes.breadcrumbsEnd}> / SOCKET.IO</span>
                </Box>
                <Typography className={classes.subTitle}>
                    Dieser Adapter ermöglicht die Kommunikation verschiedener Web-Anwendungen mit ioBroker.
                </Typography>
            </Box>

            <Box className={classes.sidebarArea}>

                <Box className={classes.sidebarLeft}>
                    <Box className={classes.sidebarCard}>
                        <Box className={classes.logoContainer}>
                            <Box className={classes.logo}>
                                <img src={SymbolAdapter} alt="SymbolAdapter" />
                            </Box>
                        </Box>

                        <Box className={classes.infoRow}>
                            <span className={classes.infoLabel}>Version:</span>
                            <span className={classes.infoValue}>6.7.1</span>
                        </Box>
                        <Box className={classes.infoRow}>
                            <span className={classes.infoLabel}>Entwickler:</span>
                            <span className={classes.infoValue}>bluefox</span>
                        </Box>
                        <Box className={classes.infoRow}>
                            <span className={classes.infoLabel}>Erster Release:</span>
                            <span className={classes.infoValue}>2015.01.02</span>
                        </Box>
                        <Box className={classes.infoRow}>
                            <span className={classes.infoLabel}>Aktueller Release:</span>
                            <span className={classes.infoValue}>2025.03.02</span>
                        </Box>

                        <Box className={classes.statsContainer}>
                            <Box className={classes.statItem}>
                                <img src={StarIcon} alt="Star Icon" /> 25
                            </Box>
                            <Box className={classes.statItem}>
                                <img src={DownLoadIcon} alt="DownLoadIcon" /> 16.000
                            </Box>
                            <Box className={classes.statItem}>
                                <img src={SaveIcon} alt="Save Icon" /> 39.400
                            </Box>
                        </Box>
                    </Box>
                </Box>

                <Box className={classes.sidebarRight}>
                    <Box component="a" href="#" className={classes.sidebarLink}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <img className={classes.sidebarLinkIcon} src={GitHubIcon} alt="Github Icon" />
                            GITHUB
                        </Box>
                        <img className={classes.arrowIconRight} src={ArrowDownIcon} alt="ArrowIconRight" />
                    </Box>
                    <Box component="div" className={classes.sidebarLink} onClick={() => setIsLicenseOpen(true)}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <img className={classes.sidebarLinkIcon} src={LicenseIcon} alt="License Icon" />
                            LIZENZ: MIT
                        </Box>
                        <img className={classes.arrowIcon} src={ArrowDownIcon} alt="ArrowDownIcon" />
                    </Box>
                    <Box component="div" className={classes.sidebarLink} onClick={() => setIsHistoryOpen(true)} >
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <img className={classes.sidebarLinkIcon} src={HistoryIcon} alt="History Icon" />
                            HISTORY
                        </Box>
                        <img className={classes.arrowIcon} src={ArrowDownIcon} alt="ArrowDownIcon" />
                    </Box>

                    <Box className={classes.badgesContainer}>
                        <Typography className={classes.badgeInfoLabel} sx={{ textTransform: 'uppercase' }}>Abzeichen:</Typography>
                        <img className={classes.npmImage} src={npmImage} alt="npm" />
                        <img src="https://img.shields.io/npm/v/iobroker.socketio.svg" alt="NPM version" className={classes.badgeImage} />
                        <img src="https://img.shields.io/npm/v/iobroker.socketio.svg?label=stable" alt="Stable version" className={classes.badgeImage} />
                        <img src="https://img.shields.io/npm/dm/iobroker.socketio.svg" alt="Downloads" className={classes.badgeImage} />
                        <img src="https://img.shields.io/badge/installed-39.4k-blue.svg" alt="Installed" className={classes.badgeImage} />
                    </Box>
                </Box>
            </Box>

            <Box className={classes.mainContentArea}>
                <Typography className={classes.paragraph}>
                    Dieser Adapter wird von WEB-Anwendungen und Adaptern verwendet, um über Websockets und das socket.io-Protokoll mit ioBroker zu kommunizieren.<br />
                    Wichtiger Hinweis: Seit v4.0 dieses Adapters werden ausschließlich reine Websockets verwendet! Socket.io wird nicht mehr durch die socket.io-Bibliothek implementiert, sondern über reine WebSockets simuliert!<br />
                    Benutzer können diesen Adapter verwenden, um ihre Produkte über Web-Sockets mit ioBroker zu verbinden. Tatsächlich könnte dieser Adapter von Echarts, Vis und vielen anderen Adaptern verwendet werden, um Daten aus ioBroker zu extrahieren.<br />
                    Wenn möglich, verwenden Sie bitte iobroker.ws anstelle dieses Adapters.<br />
                    Im Beispiel-Verzeichnis finden Sie eine einfache Anwendung, die diese Schnittstelle verwendet, um einige Daten anzuzeigen.<br />
                    Durch die Verwendung der socket.io-Schnittstelle sollte der Benutzer die Grundlagen und Konzept des Systems verstehen.<br />
                    Es ist auch nützlich, etwas über die Struktur der Objekte zu lesen.<br />
                    Dieser Adapter verwendet Sentry-Bibliotheken, um Ausnahmen und Codefehler automatisch an die Entwickler zu melden. Weitere Details und Informationen zum Deaktivieren der Fehlerberichterstattung finden Sie unter Sentry-Plugin-Dokumentation. Sentry Reporting wird ab js-controller 3.0 verwendet.
                </Typography>

                <Typography className={classes.sectionTitle}>
                    KURZE BESCHREIBUNG DES KONZEPTS
                </Typography>

                <Typography className={classes.subTitle}>Objekt</Typography>
                <Typography className={classes.paragraph}>
                    Objekt ist eine Beschreibung eines Datenpunkts oder einer Datengruppe. Die Gruppe könnte andere Datenpunkte enthalten, in diesem Fall wird sie als Kanal bezeichnet. Besteht eine Gruppe aus anderen Kanälen, wird sie in diesem Fall als Gerät bezeichnet.
                </Typography>
                <Typography className={classes.paragraph}>
                    Bei einem Objekt handelt es sich um Metainformationen, die einen Datenpunkt beschreiben und Folgendes enthalten können: Maximal-/Mindestwert, Einheit, Name, Standardwert, Werttyp, Informationen zum Adapter für die Kommunikation (z. B. IP-Adresse) usw.
                </Typography>

                <Typography className={classes.subTitle}>Zustand</Typography>
                <Typography className={classes.paragraph}>
                    Der Status ist der tatsächliche Wert des Datenpunkts und wird durch ein Javascript-Objekt dargestellt:
                </Typography>

                <Box className={classes.codeBlockContainer}>
                    <Box className={classes.codeBlockHeader}>
                        <span>json</span>
                        <ContentCopyTwoToneIcon
                            sx={{
                                fontSize: 16,
                                cursor: 'pointer',
                                color: theme.palette.secondary.main,
                                '@media (max-width: 769px)': {
                                    fontSize: 26,
                                },
                                 '@media (max-width: 481px)': {
                                    fontSize: 22,
                                },
                                '& path:first-of-type': {
                                    opacity: 1,
                                    fill: theme.palette.secondary.main,
                                },
                            }}
                        />
                    </Box>
                    <Box component="pre" className={classes.codeBlockContent}>
                        {`{
  val: `}<span className="value">VALUE</span>{`,
  ack: `}<span className="value">ACKNOWLEDGED</span>{`,
  ts: `}<span className="value">TIMESTAMP</span>{`, `}<span className="comment">// could be converted into time with "new Date(state.ts)" (In node..</span>{`
  lc: `}<span className="value">TIMESTAMP</span>{` of last change,
  from: `}<span className="value">ADAPTER_NAME</span>{`,
  q: `}<span className="value">QUALITY</span>{`
}`}
                    </Box>
                </Box>

                <Typography className={classes.paragraph}>
                    Zustände ändern sich im Vergleich zu den Objekten sehr häufig. (Normalerweise sollten Objekte bei der Erstellung einmal geändert werden und das ist alles).
                </Typography>

                <Typography className={classes.subTitle}>Wissen</Typography>
                <Typography className={classes.paragraph}>
                    Jeder Staat hat das Attribut ack. Es zeigt die Befehlsrichtung an.
                </Typography>
                <ul className={classes.list}>
                    <li>Wenn ack=false, bedeutet dies, dass ein anderer Adapter diese Variable steuern (schreiben) möchte, damit der Befehl ausgeführt wird (z. B. das Licht wird eingeschaltet).</li>
                    <li>Wenn ack=true, bedeutet dies, dass das Gerät über den neuen Wert informiert. (z. B. Licht wurde manuell eingeschaltet oder Bewegung wurde erkannt).</li>
                </ul>

                <Typography className={classes.paragraph}>
                    Beispiel: Wir haben einen Hausautomationsadapter (HAA), an den eine Lampe unter der Adresse haa.0.lamp1 angeschlossen ist.
                </Typography>
                <ul className={classes.list}>
                    <li>Die Lampe kann manuell mit einem physischen Schalter oder über WLAN mit Hilfe von HAA eingeschaltet werden.</li>
                    <li>Wenn vis die Lampe über WLAN einschalten möchte, sollte es den neuen Wert mit `{"{value: true, ack: false}"}` setzen.</li>
                    <li>Wenn die Lampe eingeschaltet wird, informiert sie HAA normalerweise über den neuen Status und der Wert sollte sofort mit `{"{value: true, ack: true}"}` überschrieben werden.</li>
                    <li>Wenn die Lampe manuell über einen physischen Schalter ausgeschaltet wird, informiert sie HAA über den neuen Status mit `{"{value: false, ack: true}"}`.</li>
                </ul>

                <Typography className={classes.subTitle}>Qualität</Typography>
                <Typography className={classes.paragraph}>
                    Jeder Datenpunkt hat ein Attribut q - Qualität.
                </Typography>

                <Typography className={classes.sectionTitle}>VERWENDUNG</Typography>
                <Typography className={classes.paragraph}>
                    Die Beschreibung jeder unterstützten Methode finden Sie Hier.<br />
                    Es wird empfohlen, für die Kommunikation Socket-Klasse zu verwenden.
                </Typography>

                <Typography className={classes.sectionTitle}>OPTIMIERUNG VON WEB-SOCKETS</Typography>
                <Typography className={classes.paragraph}>
                    Bei einigen Web-Sockets-Clients gibt es ein Leistungsproblem bei der Kommunikation. Manchmal ist dieses Problem darauf zurückzuführen, dass die Kommunikation von socket.io auf einen langen Abfragemechanismus zurückgreift. Sie können die Option Web-Sockets erzwingen so einstellen, dass nur die Verwendung von Web-Sockets-Transport erzwungen wird.
                </Typography>

                <Typography className={classes.subTitle} sx={{ mt: 4 }}>Deine Meinung zählt!</Typography>
                <Typography className={classes.paragraph}>
                    Hilf uns, diese Dokumentation zu<br />
                    verbessern - gib Feedback oder<br />
                    schlage eine Änderung vor.
                </Typography>

                <button className={classes.editButton}>
                    <img src={EditIcon} alt="Edit Icon" />
                    BEARBEITEN AUF GITHUB
                    <img className={classes.arrowIconEdit} style={{ marginLeft: '34px' }} src={ArrowDownIcon} alt="ArrowIconRight" />
                </button>
            </Box>
            <LicenseModal open={isLicenseOpen} onClose={() => setIsLicenseOpen(false)} />
            <HistoryModal open={isHistoryOpen} onClose={() => setIsHistoryOpen(false)} />
        </Box>
    );
};

export default AdapterPage;
