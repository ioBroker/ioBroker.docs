import { makeStyles } from '../../../../theme';

/** kleinstes sinnvolles Format eines Klammerkastens - Herleitung siehe `statCard` */
const MIN_CARD = 160;
/**
 * Ab dieser Kastenbreite legt sich der Inhalt quer. Sie liegt zwischen den beiden
 * Faellen, die auf einem schmalen Schirm gleichzeitig vorkommen: zwei Kaesten
 * nebeneinander sind dort rund 175 px breit, einer allein in seiner Zeile rund 360 px.
 */
const WIDE_CARD = 300;
/**
 * Bis hierher steht ein laenglicher Kasten je Zeile, darueber ordnen sie sich nach dem
 * Platz (Denis, 06.09.2026). Der Wert ist eine Gestaltungsentscheidung, keine Rechnung:
 * zwei Kaesten passten rechnerisch schon ab 376 px nebeneinander, sahen dort aber gedraengt aus.
 */
const SINGLE_COLUMN_UP_TO = 400;
/**
 * Das groesste Format eines Kastens. Auch aus dem Inhalt hergeleitet: die Zahl braucht
 * in Audiowide bei 44 px rund 191 px, der Knopf mit seiner `min-width` 200 px, dazu die
 * beiden Klammerarme (2x20) - der Inhalt ist also bei rund 240 px vollstaendig da.
 * Alles darueber ist nur noch leere Flaeche, und genau die stoerte auf dem grossen
 * Schirm (Denis, 06.09.2026: "die Kaestchen sind riesig"). 320 px waren dann immer
 * noch zu breit ("sie sind mir zu breit"), 280 px lassen dem Inhalt rund 40 px Luft
 * ueber seine 240 px hinaus und stellen den Kasten fast ins Quadrat (280x260).
 * Achtung: der Wert wirkt nicht nur ganz aussen. Ueber `MAX_ROW` deckelt er die Reihe
 * und damit die Kastenbreite schon ab rund 1000 px Fenster - dort ergaebe "Platz
 * durch drei" sonst breitere Kaesten, ohne dass eine Hoechstbreite je Spalte greift.
 */
const MAX_CARD = 280;
/** drei Kaesten nebeneinander in ihrem groessten Format, dazu zwei Spalten Abstand */
const MAX_ROW = 3 * MAX_CARD + 2 * 48;

export const useStyles = makeStyles()(theme => ({
    container: {
        maxWidth: 1376,
        margin: '0 auto',
        padding: `0 ${theme.custom.layout.gutter.lg}px`,
        [theme.breakpoints.down('sm')]: {
            padding: `0 ${theme.custom.layout.gutter.sm}px`,
        },
    },
    communitySection: {
        padding: '96px 0',
        [theme.breakpoints.down('md')]: {
            padding: '64px 0',
        },
        [theme.breakpoints.down('sm')]: {
            padding: '48px 0',
        },
    },
    communityText: {
        fontFamily: 'inherit',
        whiteSpace: 'pre-wrap',
        fontSize: theme.custom.reading.body.fontSize,
        textIndent: '2em',
        fontWeight: 400,
        lineHeight: theme.custom.reading.body.lineHeight,
        letterSpacing: '0.02em',
        paddingTop: '14px',
        textAlign: 'left',
        maxWidth: 945,
        margin: '0 0',
        zIndex: 1,
    },

    communityTextWrapper: {
        position: 'relative',
    },

    /**
     * Die Ueberschrift ueber den drei Kaesten. Sie nimmt dieselbe Breite wie die Reihe
     * und steht mit ihr auf der linken Achse der Seite (Denis, 06.09.2026), damit
     * Ueberschrift, Kaesten und der Text darueber dieselbe Kante haben. Der Abstand nach
     * oben, der frueher an `statsContainer` hing, sitzt jetzt hier - darunter bleibt nur
     * noch der kurze Abstand zur Reihe.
     */
    statsHeading: {
        maxWidth: MAX_ROW,
        /**
         * 120 px liessen die Ueberschrift zwischen Text und Kaesten schweben; sie
         * gehoert aber zu den Kaesten (Denis, 06.09.2026). Jetzt 72 px nach oben und
         * 40 px nach unten zur Reihe - der Abstand ueber ihr bleibt deutlich groesser
         * als der unter ihr, sonst haengt sie am falschen Block.
         */
        margin: '72px 0 0',
        textAlign: 'left',
        letterSpacing: '0.02em',
        color: theme.custom.textHeading,
        // MUI bringt an `Typography` eigene Werte fuer beides mit - siehe `statNumber`
        '&&': {
            fontSize: '22px',
            fontWeight: 400,
            lineHeight: 1.4,
        },
        [theme.breakpoints.down('md')]: {
            marginTop: '40px',
            '&&': {
                fontSize: theme.custom.reading.lead.fontSize,
            },
        },
    },
    /**
     * Drei Klammerkaesten nebeneinander - auf jeder Breite. Bis 900 px stapelten sie sich
     * frueher untereinander, was drei 400 px hohe Kaesten und eine sehr lange, sehr leere
     * Sektion ergab. Sie werden jetzt stattdessen kleiner, so wie auf dem Handy.
     */
    /**
     * Die drei Klammerkaesten ordnen sich nach dem Platz, nicht nach Bildschirmstufen:
     * es passen so viele nebeneinander, wie in der kleinsten sinnvollen Kastenbreite
     * Platz haben - drei, dann zwei und einer darunter, zuletzt einer je Zeile.
     * Ein Kasten, der allein in seiner Zeile steht, legt sich innen quer (Zahl links,
     * Knopf rechts) statt in die Hoehe zu wachsen. Das entscheidet eine Container-Query
     * auf dem Kasten selbst, denn bei derselben Bildschirmbreite koennen schmale und
     * breite Kaesten nebeneinander vorkommen - eine Media-Query kann die beiden Faelle
     * nicht auseinanderhalten.
     */
    statsContainer: {
        /**
         * Raster statt Flexbox: bleibt ein Kasten allein in der letzten Zeile, belegt er
         * dort **eine Spalte** und behaelt damit genau das Format der beiden ueber ihm.
         * In einer Flexbox waere er auf die volle Breite gewachsen.
         */
        display: 'grid',
        gridTemplateColumns: `repeat(auto-fit, minmax(${MIN_CARD}px, 1fr))`,
        /**
         * Der Deckel sitzt auf der Reihe, nicht auf dem einzelnen Kasten: eine feste
         * Hoechstbreite je Spalte wuerde die Spaltenzahl aendern, die sich das Raster
         * sonst selbst aus `MIN_CARD` ausrechnet. So bleibt das gemessene Verhalten
         * unterhalb 1056 px unveraendert, und darueber waechst nur der freie Platz
         * rechts - die Reihe bleibt linksbuendig an der Spalte der Seite.
         */
        maxWidth: MAX_ROW,
        marginLeft: 0,
        marginRight: 'auto',
        marginTop: '40px',
        gap: theme.spacing(6),
        [`@media (max-width: ${SINGLE_COLUMN_UP_TO - 0.05}px)`]: {
            gridTemplateColumns: '1fr',
        },
        /**
         * Der Abstand trennt hier zwei gleich gezeichnete Klammern voneinander - ist er
         * zu klein, liest man die Reihe als ein Gitter statt als drei Kaesten (Denis,
         * 06.09.2026: "ich kann sie optisch schwer auseinanderhalten"). Darum 32 statt
         * 24 und 24 statt 16 px; er bleibt in der Naehe des Innenabstands der Kaesten,
         * damit die Luft zwischen ihnen nicht groesser wird als die Luft in ihnen.
         */
        [theme.breakpoints.down('md')]: {
            marginTop: '24px',
            gap: theme.spacing(4),
        },
        [theme.breakpoints.down('sm')]: {
            gap: '24px',
        },
    },

    /**
     * MIN_CARD (oben) ist das kleinste Format, in dem der Kasten noch etwas taugt.
     * Gemessen am Inhalt, nicht geschaetzt: die Zahl "20.543 +" braucht in Audiowide
     * 4,34 em, bei 24 px also 104 px; der Knopf "BEITRETEN" mit 13 px Schrift und
     * Innenabstand 111 px. Dazu die beiden Klammern (2x16) und der Innenabstand - macht
     * rund 160 px. Unter dieser Breite bricht der naechste Kasten in die folgende Zeile um.
     */
    statCard: {
        minWidth: 0,
        /**
         * Der Inhalt braucht rund 195 px (Innenabstand 40, Titel 29, Zahl mit Abstand 60,
         * "Nutzer" 14, Knopf 50). Der Rest ist Luft, die `space-between` zwischen die
         * Gruppen legt - 400 px waren davon zu viel.
         */
        minHeight: 260,
        display: 'flex',
        justifyContent: 'space-between',
        // Bezugsgroesse fuer die Container-Queries weiter unten
        containerType: 'inline-size',
        /**
         * Frueher stand hier unter 1200 px eine kleinere Hoehe (220). Das war der Rest
         * aus der Zeit ohne Breitendeckel und drehte das Verhaeltnis genau dort ins
         * Breite, wo die Kaesten ohnehin am breitesten sind: bei 1199 px waren sie
         * 320x220 (1,45), waehrend die abgenommene Fassung bei 1440 px 320x260 (1,23)
         * ist (Denis, 06.09.2026: "zu viel in die Breite gezogen"). Eine Hoehe fuer den
         * ganzen Desktop-Bereich haelt das Verhaeltnis zwischen 900 und 1440 px stabil.
         */
        [theme.breakpoints.down('md')]: {
            // ab hier bestimmt der Inhalt die Hoehe: ein quer liegender Kasten wird
            // niedrig, ein hochkant stehender so hoch, wie er sein muss
            minHeight: 96,
        },
    },

    statCardContentWrapper: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        minWidth: 0,
        // schiebt den Knopf im hochkant stehenden Kasten an den Boden
        marginBottom: 'auto',
        padding: '0 2px',
        [theme.breakpoints.down('sm')]: {
            padding: '0 0 0 2px',
        },
        /**
         * Im langgezogenen Kasten steht der Titel oben, Zahl und "Nutzer" ruecken nach
         * unten und liegen dort auf einer Linie mit dem Knopf (Denis, 06.09.2026).
         * Dafuer nimmt die Spalte die volle Hoehe (`stretch` statt der Zentrierung aus
         * `bracesContent`); das `margin-bottom: auto` von oben wuerde das aushebeln.
         * Den Abstand macht der Titel mit seinem eigenen `margin-bottom: auto` - ein
         * `space-between` hier wuerde auch Zahl und "Nutzer" auseinanderziehen, die
         * dicht beieinander bleiben sollen.
         */
        [`@container (min-width: ${WIDE_CARD}px)`]: {
            marginBottom: 0,
            alignSelf: 'stretch',
        },
    },

    /**
     * Die Breite dieser beiden Kaesten ist die Laenge der Klammerarme - und zugleich der
     * Abstand des Inhalts zur senkrechten Linie, denn der Inhalt beginnt hinter ihnen.
     * Die Laenge kommt aus `theme.custom.brace` - dieselbe Zeichnung wie im Footer und
     * am Newsletter-Feld.
     */
    bracesLeft: {
        borderTop: `1px solid ${theme.palette.primary.main}`,
        borderBottom: `1px solid ${theme.palette.primary.main}`,
        borderLeft: `1px solid ${theme.palette.primary.main}`,
        flexShrink: 0,
        width: theme.custom.brace.lg,
        [theme.breakpoints.down('md')]: {
            width: theme.custom.brace.md,
        },
        [theme.breakpoints.down('sm')]: {
            width: theme.custom.brace.sm,
        },
    },
    bracesRight: {
        borderTop: `1px solid ${theme.palette.primary.main}`,
        borderBottom: `1px solid ${theme.palette.primary.main}`,
        borderRight: `1px solid ${theme.palette.primary.main}`,
        flexShrink: 0,
        width: theme.custom.brace.lg,
        [theme.breakpoints.down('md')]: {
            width: theme.custom.brace.md,
        },
        [theme.breakpoints.down('sm')]: {
            width: theme.custom.brace.sm,
        },
    },

    bracesContent: {
        flex: 1,
        minWidth: 0,
        padding: `20px 0`,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        textAlign: 'center',
        [theme.breakpoints.down('md')]: {
            padding: '16px 0',
            // `space-between` allein reicht nicht: in einem knappen Kasten bleibt kein
            // freier Raum uebrig, den es verteilen koennte, und der Knopf klebt am Text
            gap: '14px',
            /**
             * Der hochkant stehende Kasten bekommt eine Mindesthoehe, damit oben ein
             * Block aus Titel, Zahl und "Nutzer" steht und der Knopf unten sitzt - vorher
             * bestimmte der Inhalt die Hoehe, alles lag dicht beieinander in der Mitte.
             * Die Regel haengt an der Kastenbreite, weil der langgezogene Kasten (unter
             * 400 px) niedrig bleiben soll.
             */
            [`@container (max-width: ${WIDE_CARD - 0.05}px)`]: {
                minHeight: '186px',
                justifyContent: 'flex-start',
            },
            // der langgezogene Kasten - siehe Kommentar oben
            [`@container (min-width: ${WIDE_CARD}px)`]: {
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                textAlign: 'left',
                gap: '12px',
                padding: '12px 2px',
                /**
                 * Aus dem Inhalt ergaeben sich nur rund 87 px - bei 336 px Breite wirkte
                 * der Kasten dann wie ein Streifen und die Klammern verloren ihre
                 * Zeichnung. 130 px waren dann wieder etwas zu viel; bei 112 px bleibt
                 * ueber dem Titel und unter der Zahl je eine knappe Zeile Luft, das
                 * Verhaeltnis liegt bei rund 3:1 (Denis, 06.09.2026).
                 */
                minHeight: '112px',
            },
        },
    },

    /**
     * FORUM / FACEBOOK / DISCORD sind Audiowide (Denis, 06.09.2026) - im Kit die Schrift
     * fuer Ueberschriften und Beschriftungen. Sie stehen als Beschriftung ueber der Zahl
     * und bleiben deshalb deutlich kleiner als diese.
     */
    statTitle: {
        fontFamily: 'Audiowide, sans-serif',
        color: theme.palette.primary.main,
        fontSize: '24px',
        letterSpacing: '0.02em',
        textTransform: 'uppercase',
        [theme.breakpoints.down('lg')]: {
            // Ruecklage fuer Browser ohne Container-Queries, danach die eigentliche Regel:
            // Anteil der Kastenbreite. Emotion schreibt beide Deklarationen nacheinander.
            fontSize: ['clamp(11px, 2.4vw, 20px)', 'min(20px, 8cqw)'],
        },
        [theme.breakpoints.down('md')]: {
            [`@container (min-width: ${WIDE_CARD}px)`]: {
                // 13 px waren zu leise fuer die Zeile, die den Kasten benennt (Denis, 06.09.2026)
                fontSize: '16px',
                // schiebt Zahl und "Nutzer" an den unteren Rand, siehe statCardContentWrapper
                marginBottom: 'auto',
            },
        },
    },
    statNumber: {
        fontFamily: 'Audiowide, sans-serif',
        fontSize: '44px',
        fontWeight: '400',
        letterSpacing: '-0.03em',
        whiteSpace: 'nowrap',
        // `&&` verdoppelt die Gewichtung: MUIs eigene Typography-Klasse setzt eine
        // Zeilenhoehe und gewinnt sonst gegen diese hier (bekannte Stelle, siehe
        // Design-System). Ohne das blieben 44,8 px Zeilenhoehe bei 28 px Schrift stehen.
        '&&': {
            lineHeight: 1,
        },
        margin: `${theme.spacing(2)} 0 0 0`,
        [theme.breakpoints.down('lg')]: {
            fontSize: ['clamp(14px, 4.2vw, 34px)', 'min(34px, 14cqw)'],
            margin: '8px 0 0 0',
        },
        [theme.breakpoints.down('md')]: {
            [`@container (min-width: ${WIDE_CARD}px)`]: {
                fontSize: '28px',
                margin: '2px 0 0 0',
            },
        },
    },
    /**
     * "Nutzer" ist eine Bildunterschrift zur Zahl, keine Ueberschrift: Roboto statt
     * Audiowide, klein und in der zurueckgenommenen Textfarbe - so liest sich die Zahl
     * als das Eigentliche (Denis, 06.09.2026).
     */
    statLabel: {
        fontFamily: theme.typography.fontFamily,
        fontSize: theme.custom.reading.small.fontSize,
        fontWeight: 400,
        letterSpacing: 0,
        color: theme.custom.textSubtle,
        // Direkt unter der Zahl, ohne Luft dazwischen: "Nutzer" gehoert zur Zahl, nicht
        // in eine eigene Zeile (Denis, 06.09.2026). Auch hier `&&` gegen die
        // Typography-Klasse, sonst stehen 1,6 Zeilen statt 1,15.
        '&&': {
            lineHeight: 1.15,
        },
        // holt die Oberlaenge von Roboto heraus, die sonst als Luft stehen bliebe
        marginTop: '-3px',
        [theme.breakpoints.down('lg')]: {
            fontSize: ['clamp(10px, 1.6vw, 15px)', 'min(15px, 6cqw)'],
        },
        [theme.breakpoints.down('md')]: {
            [`@container (min-width: ${WIDE_CARD}px)`]: {
                fontSize: theme.custom.reading.caption.fontSize,
                marginTop: '-2px',
            },
        },
    },
    joinButton: {
        alignSelf: 'center',
        display: 'block',
        position: 'relative',
        zIndex: 0,
        height: 50,
        /**
         * Gefuellt statt umrandet, auf jedem Schirm (Denis, 06.09.2026). Gefuellt wird
         * mit der Flaechenstufe des Kits und nicht mit dem Markenblau: das volle Blau
         * stach die Zahl aus, die im Kasten die Hauptsache ist. Beim Ueberfahren geht es
         * eine Stufe tiefer, beim Druecken noch eine - die Flaeche wird dunkler, statt
         * die Farbe zu wechseln. Die Haarlinie bleibt, damit die Flaeche auf dem weissen
         * Grund eine Kante behaelt.
         * `&&` verdoppelt die Gewichtung, sonst entscheidet gegen die Regeln von
         * `CustomButton` die Reihenfolge im Stylesheet.
         */
        '&&': {
            backgroundColor: theme.custom.surfaces.surface,
            color: theme.custom.textAccent,
            boxShadow: `inset 0 0 0 1px ${theme.custom.hairlineStrong}`,
            '&:hover': {
                backgroundColor: theme.custom.surfaces.raised,
                color: theme.custom.textAccent,
            },
            '&:active': {
                backgroundColor: theme.custom.surfaces.overlay,
            },
        },
        /**
         * `CustomButton` bringt `min-width: 200` mit und macht sich unterhalb 600 px ueber
         * die volle Breite. Beides passt hier nicht, wo der Knopf in einem 160 px schmalen
         * Kasten oder neben der Zahl sitzt. `&&` verdoppelt die Gewichtung, sonst
         * entscheidet die Reihenfolge im Stylesheet.
         */
        [theme.breakpoints.down('md')]: {
            /**
             * Ueber die ganze Breite zwischen den Klammern, in der kompakten Hoehe - 44 px
             * war hier zu schwer. Nur das Format, die Farben stehen in der Grundregel.
             * Als CSS und nicht ueber `useMediaQuery`, damit es ohne Umweg ueber den
             * Zustand der Komponente umschaltet.
             */
            '&&': {
                height: `${theme.custom.control.compactHeight}px`,
                width: '100%',
                minWidth: 0,
                padding: '0 12px',
                fontSize: '12px',
            },
            alignSelf: 'stretch',
            [`@container (min-width: ${WIDE_CARD}px)`]: {
                '&&': {
                    height: `${theme.custom.control.compactHeight}px`,
                    width: 'auto',
                    padding: '0 14px',
                    whiteSpace: 'nowrap',
                },
                // unten rechts in der Klammer, auf einer Linie mit "Nutzer" (Denis)
                alignSelf: 'flex-end',
                flexShrink: 0,
            },
        },
    },
}));
