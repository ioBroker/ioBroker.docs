import { makeStyles } from '../../../../theme';

export const useStyles = makeStyles()(theme => ({
    startSection: {
        position: 'relative',
        backgroundColor: theme.palette.background.default,
        overflow: 'hidden',
        paddingTop: theme.custom.layout.section.lg,
        paddingBottom: theme.custom.layout.section.lg,
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
    label: {
        ...theme.custom.reading.caption,
        textTransform: 'uppercase',
        letterSpacing: '0.08em',
        color: theme.palette.primary.main,
        marginBottom: '20px',
    },
    labelSlashes: {
        color: theme.palette.primary.main,
        marginRight: '8px',
    },
    /*
     * Die Kopfzeile steht frei ueber beidem, darunter zwei Spalten wie im Entwurf: links
     * der Einleitungstext, rechts die drei Schritte - beide beginnen auf derselben Hoehe.
     * Unter 900 Bildpunkten stehen sie untereinander.
     */
    grid: {
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '64px',
        alignItems: 'start',
        [theme.breakpoints.down('lg')]: {
            gap: '40px',
        },
        [theme.breakpoints.down('md')]: {
            gridTemplateColumns: '1fr',
            gap: '32px',
        },
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
        // die Kopfzeile steht frei ueber der ganzen Breite, sie bricht nur dort, wo der
        // Zeilenumbruch im Text steht
        marginBottom: '24px',
        [theme.breakpoints.down('md')]: {
            fontSize: '34px',
        },
        [theme.breakpoints.down('sm')]: {
            /*
             * Auf dem Telefon richtet sich die Groesse nach der Breite: "automatisieren."
             * ist ein Wort, das nicht umbrechen kann, und in Audiowide ist es bei 26
             * Punkten breiter als ein schmales Geraet (Denis, 11.09.2026).
             */
            fontSize: 'clamp(17px, 5.6vw, 26px)',
        },
    },
    /*
     * Wie im Abschnitt "Was ist ioBroker?": die zweite Zeile traegt die Markenfarbe, und
     * zwar `primary` statt `textAccent` - auf der hellen Fassung waeren Ueberschrift und
     * `textAccent` sonst dieselbe Farbe.
     */
    titleAccent: {
        color: theme.palette.primary.main,
    },
    lead: {
        ...theme.custom.reading.body,
        color: theme.custom.textMuted,
        // eine Textspalte bleibt lesbar, wenn sie nicht ueber die ganze Seite laeuft
        maxWidth: '640px',
    },
    /** die rechte Spalte: die Tabelle und darunter die beiden Knoepfe */
    stepsColumn: {
        display: 'flex',
        flexDirection: 'column',
        // die Liste nimmt die ganze Spalte ein, sonst enden ihre Linien dort, wo der
        // laengste Titel endet
        alignItems: 'stretch',
    },
    /*
     * Die drei Schritte stehen nicht in Feldern, sondern als Liste mit Haarlinien
     * dazwischen: sie sind eine Anleitung und kein Sortiment, und der Abschnitt
     * unterscheidet sich damit auch im Bild von den Kachelbloecken darueber.
     */
    steps: {
        listStyle: 'none',
        // in der rechten Spalte beginnt die Liste oben, auf Hoehe der Kopfzeile
        margin: 0,
        padding: 0,
    },
    /*
     * Eine Zeile je Schritt: Nummer, Titel, Erklaerung. Die drei Spalten stehen
     * untereinander in einer Flucht, so liest sich die Liste als Ablauf und nicht als
     * drei einzelne Abschnitte. Unter 900 Bildpunkten rutscht die Erklaerung unter den
     * Titel, unter 600 auch die Nummer nach oben.
     */
    step: {
        display: 'grid',
        /*
         * Feste Breite fuer die Nummernspalte, keine automatische: jede Zeile ist ein
         * eigenes Raster, und `auto` haette in jeder Zeile eine andere Breite ergeben -
         * die Titel staenden dann ein paar Bildpunkte versetzt untereinander.
         */
        gridTemplateColumns: '44px 1fr',
        alignItems: 'baseline',
        columnGap: '24px',
        rowGap: '6px',
        padding: '20px 0',
        borderTop: `1px solid ${theme.custom.hairline}`,
        // die erste Zeile beginnt ohne Linie: sie stuende sonst frei ueber der Tabelle
        // und schnitte die Spalte vom Text daneben ab (Denis, 11.09.2026)
        '&:first-of-type': {
            borderTop: 'none',
            paddingTop: 0,
        },
        '&:last-of-type': {
            borderBottom: `1px solid ${theme.custom.hairline}`,
        },
        [theme.breakpoints.down('sm')]: {
            gridTemplateColumns: '1fr',
            columnGap: 0,
            padding: '16px 0',
        },
    },
    /** dieselbe Nummer wie in den Abschnitten darueber */
    stepNumber: {
        fontFamily: theme.typography.h1.fontFamily,
        fontSize: '17px',
        lineHeight: 1.6,
        color: theme.custom.textAccent,
        whiteSpace: 'nowrap',
        flexShrink: 0,
    },
    stepTitle: {
        fontFamily: theme.typography.h1.fontFamily,
        fontSize: '20px',
        fontWeight: 400,
        '&&': {
            lineHeight: 1.3,
        },
        color: theme.custom.textHeading,
        margin: 0,
        [theme.breakpoints.down('sm')]: {
            fontSize: '18px',
        },
    },
    stepText: {
        /*
         * Dieselbe Groesse und Helligkeit wie der Einleitungstext daneben: bei 15 Punkten
         * und derselben Farbe wirkte die Zeile neben der grossen Kopfzeile fast
         * durchsichtig (Denis, 11.09.2026).
         */
        ...theme.custom.reading.body,
        color: theme.custom.textMuted,
        // die Erklaerung steht unter dem Titel, nicht unter der Nummer
        gridColumn: 2,
        [theme.breakpoints.down('sm')]: {
            gridColumn: 1,
        },
    },
    /*
     * Die beiden Knoepfe stehen unter der Tabelle, in derselben Spalte und
     * linksbuendig mit ihr. Auf dem Telefon nehmen sie die ganze Breite.
     */
    actions: {
        display: 'flex',
        flexWrap: 'wrap',
        gap: '16px',
        marginTop: '56px',
        width: '100%',
        [theme.breakpoints.down('sm')]: {
            flexDirection: 'column',
            gap: '12px',
            marginTop: '40px',
        },
    },
}));
