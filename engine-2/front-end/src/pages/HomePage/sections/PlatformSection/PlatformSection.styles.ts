import { makeStyles } from '../../../../theme';

export const useStyles = makeStyles()(theme => ({
    platformSection: {
        position: 'relative',
        backgroundColor: theme.palette.background.default,
        overflow: 'hidden',
        /*
         * Das Code-Bild in der Groesse, die es auf der Lizenzseite hat - die Zeilen
         * stehen also lesbar da -, aber nur auf der rechten Haelfte: die Ebene beginnt
         * bei 45 Prozent und laeuft nach rechts, links blendet sie weich ein. Es liegt
         * damit neben dem Text und nicht unter ihm. Die helle Fassung bekommt es nicht,
         * dort wird aus der zarten Zeichnung ein grauer Raster.
         */
        '&::after': {
            content: '""',
            position: 'absolute',
            top: 0,
            right: 0,
            width: '55%',
            height: '100%',
            backgroundImage: 'url(/image-code.png)',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'left top',
            // 180 Prozent der Ebenenbreite sind ungefaehr die Breite des Abschnitts
            backgroundSize: '180% auto',
            maskImage: 'linear-gradient(to right, transparent 0%, #000 18%)',
            WebkitMaskImage: 'linear-gradient(to right, transparent 0%, #000 18%)',
            display: theme.palette.mode === 'light' ? 'none' : 'block',
            pointerEvents: 'none',
            zIndex: 0,
            // unter 900 Bildpunkten nimmt der Text die ganze Breite, daneben ist fuer das
            // Bild kein Platz mehr
            [theme.breakpoints.down('md')]: {
                display: 'none',
            },
        },
        paddingTop: theme.custom.layout.section.lg,
        paddingBottom: theme.custom.layout.section.lg,
        /*
         * Ein ruhiges Licht hinter der Kopfzeile, dieselbe Handschrift wie im Banner und
         * in der Geschichte weiter unten: die Mitte liegt am linken Rand, die Haelfte
         * also ausserhalb der Seite, so dass es von aussen hereinzufallen scheint. Auf
         * der hellen Fassung gibt es das nicht, dort waere es ein Fleck statt Licht.
         */
        '&::before': {
            content: '""',
            position: 'absolute',
            /*
             * Der Kasten des Abschnitts schneidet ab, was ueber ihn hinausragt. Das Licht
             * muss deshalb mit seiner ganzen Hoehe hineinpassen, sonst steht seine
             * abgeschnittene Kante als Absatz quer ueber der Seite: 45 Prozent Mitte bei
             * 78 Prozent Hoehe heisst 6 bis 84 Prozent, oben und unten bleibt Luft.
             */
            top: '45%',
            right: 0,
            transform: 'translate(40%, -50%)',
            width: 'min(1000px, 85%)',
            height: '78%',
            background: theme.custom.glow.soft,
            filter: 'blur(70px)',
            display: theme.palette.mode === 'light' ? 'none' : 'block',
            pointerEvents: 'none',
            zIndex: 0,
        },
        [theme.breakpoints.down('md')]: {
            paddingTop: theme.custom.layout.section.md,
            paddingBottom: theme.custom.layout.section.md,
        },
        [theme.breakpoints.down('sm')]: {
            paddingTop: theme.custom.layout.section.sm,
            paddingBottom: theme.custom.layout.section.sm,
        },
    },
    container: {
        maxWidth: theme.custom.layout.contentMaxWidth + 2 * theme.custom.layout.gutter.lg,
        margin: '0 auto',
        padding: `0 ${theme.custom.layout.gutter.lg}px`,
        position: 'relative',
        zIndex: 1,
        textAlign: 'left',
        [theme.breakpoints.down('sm')]: {
            padding: `0 ${theme.custom.layout.gutter.sm}px`,
        },
    },
    /** die Zeile ueber der Kopfzeile, die sagt, wovon der Abschnitt handelt */
    label: {
        ...theme.custom.reading.caption,
        textTransform: 'uppercase',
        letterSpacing: '0.08em',
        // in der Markenfarbe, wie die Kennzeile "// ADAPTER" im Abschnitt darunter
        color: theme.palette.primary.main,
        marginBottom: '20px',
    },
    /** das Markenmotiv vor der Zeile, wie die Belege im Banner */
    labelSlashes: {
        color: theme.palette.primary.main,
        marginRight: '8px',
    },
    /*
     * Der Text steht links und laesst die rechte Haelfte frei: dort liegt das Code-Bild
     * hinter ihm, so wie auf der Lizenzseite.
     */
    intro: {
        maxWidth: '58%',
        [theme.breakpoints.down('md')]: {
            maxWidth: '100%',
        },
    },
    /** Kopfzeile und Absaetze stehen zusammen in der linken Spalte */
    copy: {
        display: 'flex',
        flexDirection: 'column',
        gap: '24px',
        maxWidth: '660px',
    },
    title: {
        fontFamily: theme.typography.h1.fontFamily,
        fontSize: '44px',
        fontWeight: 400,
        letterSpacing: '-0.01em',
        '&&': {
            lineHeight: 1.12,
        },
        color: theme.custom.textHeading,
        margin: 0,
        [theme.breakpoints.down('md')]: {
            fontSize: '34px',
        },
        [theme.breakpoints.down('sm')]: {
            fontSize: '26px',
        },
    },
    /*
     * Die zweite Haelfte der Kopfzeile traegt die Markenfarbe, wie im Banner - und zwar
     * `primary`, nicht `textAccent`: auf der hellen Fassung sind Ueberschrift und
     * `textAccent` dieselbe Farbe, die beiden Zeilen stuenden dort also ohne Unterschied.
     */
    titleAccent: {
        color: theme.palette.primary.main,
    },
    prose: {
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
    },
    paragraph: {
        ...theme.custom.reading.body,
        color: theme.custom.textMuted,
    },
    /*
     * Die Kette: vier gleich breite Felder, in der Reihenfolge, in der ein Geraet den Weg
     * durch ioBroker nimmt. Auf dem Tablet stehen sie zu zweit, auf dem Telefon
     * untereinander.
     */
    flow: {
        display: 'flex',
        alignItems: 'stretch',
        gap: '8px',
        marginTop: '56px',
        /*
         * Unter 900 Bildpunkten stehen die vier untereinander - die Kette bleibt, sie
         * steht dann senkrecht. Ein Raster aus zwei Spalten waere dafuer der falsche Ort:
         * eine Reihenfolge, die von links nach rechts und dann wieder nach links springt,
         * liest sich nicht mehr als Weg.
         */
        [theme.breakpoints.down('md')]: {
            flexDirection: 'column',
            // die Felder nehmen nicht die ganze Breite: ein Feld mit vier Woertern darin
            // waere sonst einen halben Meter breit. Rechts bleibt Luft.
            alignItems: 'flex-start',
            marginTop: '40px',
        },
        [theme.breakpoints.down('sm')]: {
            marginTop: '32px',
        },
    },
    /*
     * Der Strich zwischen zwei Feldern: er sagt, dass die vier eine Reihenfolge sind und
     * kein Sortiment. Er beginnt zurueckhaltend und laeuft zum naechsten Feld hin in die
     * Markenfarbe aus. Untereinander dreht er sich mit und steht senkrecht.
     */
    flowLine: {
        flex: '0 0 24px',
        alignSelf: 'center',
        height: '1px',
        background: `linear-gradient(90deg, ${theme.custom.hairlineStrong}, ${theme.palette.primary.main})`,
        [theme.breakpoints.down('md')]: {
            flex: '0 0 20px',
            // er steht unter der Nummer des Feldes darueber, nicht in der Mitte der Reihe
            alignSelf: 'flex-start',
            marginLeft: '36px',
            width: '1px',
            height: '20px',
            background: `linear-gradient(180deg, ${theme.custom.hairlineStrong}, ${theme.palette.primary.main})`,
        },
    },
    step: {
        flex: '1 1 0',
        minWidth: 0,
        width: '100%',
        /*
         * Das Feld ist ungefaehr so hoch wie breit. Nummer und Titel stehen oben, der
         * Satz unten, dazwischen liegt der freie Platz - das gibt dem Feld Luft und eine
         * Ordnung, statt dass alles oben klebt und unten nichts steht.
         */
        minHeight: '224px',
        justifyContent: 'space-between',
        [theme.breakpoints.down('md')]: {
            maxWidth: '520px',
            // untereinander waere ein Quadrat nur Leerraum, dort zaehlt der Inhalt.
            // `flex` muss dabei zurueckgesetzt werden: in der Spalte gilt die Basis 0
            // fuer die Hoehe, das Feld waere sonst 48 Bildpunkte hoch und der Text liefe
            // darueber hinaus.
            flex: '0 0 auto',
            minHeight: 0,
            gap: '12px',
        },
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        gap: '16px',
        padding: '24px',
        borderRadius: theme.custom.radius.card,
        backgroundColor: theme.custom.surfaces.surface,
        boxShadow: theme.custom.elevation.card,
        [theme.breakpoints.down('sm')]: {
            padding: '20px',
        },
    },
    /** Nummer und Titel gehoeren zusammen und stehen als Paar am oberen Rand des Feldes */
    stepHead: {
        display: 'flex',
        flexDirection: 'column',
        gap: '6px',
    },
    /*
     * Die Nummer benennt den Platz in der Kette, nicht die Wichtigkeit. Sie ist genauso
     * gesetzt wie die Schritte in der Produktuebersicht ("01 /"): dieselbe Schrift,
     * dieselbe Groesse, dieselbe Farbe - ein Element, das es auf der Seite schon gibt,
     * statt eines zweiten dafuer (Denis, 11.09.2026).
     */
    stepNumber: {
        fontFamily: theme.typography.h1.fontFamily,
        fontSize: '17px',
        lineHeight: 1.6,
        color: theme.custom.textAccent,
        flexShrink: 0,
    },
    stepTitle: {
        fontFamily: theme.typography.h1.fontFamily,
        fontSize: '18px',
        fontWeight: 400,
        '&&': {
            lineHeight: 1.3,
        },
        color: theme.custom.textHeading,
        margin: 0,
    },
    stepText: {
        ...theme.custom.reading.small,
        color: theme.custom.textMuted,
    },
}));
