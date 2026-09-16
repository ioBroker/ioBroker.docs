import { makeStyles } from '../../../../theme';

export const useStyles = makeStyles()(theme => ({
    demoSection: {
        position: 'relative',
        backgroundColor: theme.custom.surfaces.canvas,
        overflow: 'hidden',
        paddingTop: theme.custom.layout.section.lg,
        paddingBottom: theme.custom.layout.section.lg,
        // ein ruhiges Licht hinter der Regel rechts, dieselbe Handschrift wie im Banner
        '&::before': {
            content: '""',
            position: 'absolute',
            top: '55%',
            right: 0,
            transform: 'translate(35%, -50%)',
            width: 'min(900px, 80%)',
            height: '70%',
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
    /** dieselbe Kennzeile wie im Abschnitt darueber */
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
    /** Kopfzeile, darunter der erklaerende Satz - wie im Abschnitt darueber */
    head: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        gap: '20px',
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
    titleAccent: {
        color: theme.palette.primary.main,
    },
    lead: {
        ...theme.custom.reading.body,
        color: theme.custom.textMuted,
        maxWidth: '560px',
    },
    /*
     * Links die Auswahl, rechts der Editor. Unter 900 Bildpunkten stehen die drei Beispiele
     * als Reihe ueber dem Editor.
     */
    shell: {
        display: 'grid',
        gridTemplateColumns: '320px minmax(0, 1fr)',
        gap: `${theme.custom.layout.grid}px`,
        marginTop: '48px',
        alignItems: 'start',
        [theme.breakpoints.down('md')]: {
            gridTemplateColumns: 'minmax(0, 1fr)',
            marginTop: '32px',
        },
    },
    sceneList: {
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
        [theme.breakpoints.down('md')]: {
            flexDirection: 'row',
        },
        [theme.breakpoints.down('sm')]: {
            flexDirection: 'column',
        },
    },
    /*
     * Ein Beispiel zur Wahl. Es ist ein Knopf, sieht aber aus wie die Felder im Abschnitt
     * darueber - dieselbe Flaeche, derselbe Radius, dieselbe Nummer.
     */
    scene: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        gap: '4px',
        textAlign: 'left',
        width: '100%',
        padding: '16px 20px',
        border: 0,
        borderRadius: theme.custom.radius.card,
        backgroundColor: theme.custom.surfaces.surface,
        boxShadow: theme.custom.elevation.card,
        cursor: 'pointer',
        transition: 'background-color 0.2s, box-shadow 0.2s',
        '&:hover': {
            backgroundColor: theme.custom.surfaces.raised,
        },
        '&:focus-visible': {
            outline: 'none',
            boxShadow: theme.custom.focusRing,
        },
    },
    /** das gewaehlte Beispiel traegt einen Streifen in der Markenfarbe an seiner linken Kante */
    sceneActive: {
        backgroundColor: theme.custom.surfaces.raised,
        boxShadow: `${theme.custom.elevation.raised}, inset 3px 0 0 0 ${theme.palette.primary.main}`,
    },
    /*
     * Nummer und Titel stehen in einer Zeile, die Art darunter. Zwischen 600 und 900
     * Bildpunkten stehen die drei Beispiele nebeneinander und die Spalte ist zu schmal
     * dafuer - dort steht die Nummer ueber dem Titel statt daneben.
     */
    sceneHead: {
        display: 'flex',
        alignItems: 'baseline',
        gap: '10px',
        [theme.breakpoints.down('md')]: {
            flexDirection: 'column',
            alignItems: 'flex-start',
            gap: '2px',
        },
        [theme.breakpoints.down('sm')]: {
            flexDirection: 'row',
            alignItems: 'baseline',
            gap: '10px',
        },
    },
    /** dieselbe Nummer wie in der Kette darueber und in der Produktuebersicht */
    sceneNumber: {
        fontFamily: theme.typography.h1.fontFamily,
        fontSize: '15px',
        lineHeight: 1.6,
        color: theme.custom.textAccent,
        // "01 /" ist eine Marke und kein Satz: in einer schmalen Spalte rutschte der
        // Schraegstrich sonst in die naechste Zeile
        whiteSpace: 'nowrap',
        flexShrink: 0,
        // the digits of the font differ in width ("01" is narrower than "02") - a fixed box,
        // right-aligned, puts the "/" of the scenes under each other and lets every title
        // start at the same place
        display: 'inline-block',
        minWidth: '2.8em',
        textAlign: 'right',
    },
    sceneTitle: {
        fontFamily: theme.typography.h1.fontFamily,
        fontSize: '17px',
        lineHeight: 1.3,
        color: theme.custom.textHeading,
    },
    sceneKind: {
        ...theme.custom.reading.caption,
        color: theme.custom.textSubtle,
    },
    /** der Rahmen um den Editor */
    card: {
        borderRadius: theme.custom.radius.card,
        backgroundColor: theme.custom.surfaces.surface,
        boxShadow: theme.custom.elevation.card,
        padding: '20px 24px 24px 24px',
        [theme.breakpoints.down('sm')]: {
            padding: '16px',
        },
    },
    cardTop: {
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        columnGap: '10px',
        rowGap: '6px',
        paddingBottom: '16px',
        borderBottom: `1px solid ${theme.custom.hairline}`,
    },
    /** der gruene Punkt sagt: das Skript laeuft, es ist nicht nur aufgeschrieben */
    statusDot: {
        width: '8px',
        height: '8px',
        borderRadius: '50%',
        backgroundColor: '#67ac58',
        boxShadow: '0 0 10px rgba(103, 172, 88, 0.8)',
        flexShrink: 0,
    },
    cardTopLabel: {
        ...theme.custom.reading.caption,
        textTransform: 'uppercase',
        letterSpacing: '0.08em',
        color: theme.custom.textSubtle,
    },
    cardTopTitle: {
        marginLeft: 'auto',
        fontFamily: theme.typography.h1.fontFamily,
        fontSize: '16px',
        color: theme.custom.textHeading,
    },
    stage: {
        display: 'grid',
    },
    /*
     * Die nicht gewaehlten Ansichten sind unsichtbar statt entfernt. `visibility` nimmt sie
     * auch aus der Tab-Reihenfolge und aus dem, was ein Vorleseprogramm sieht.
     */
    panel: {
        gridArea: '1 / 1',
        minWidth: 0,
        display: 'flex',
        flexDirection: 'column',
        visibility: 'hidden',
        opacity: 0,
        transition: 'opacity 0.25s, visibility 0s 0.25s',
        '@media (prefers-reduced-motion: reduce)': {
            transition: 'none',
        },
    },
    panelActive: {
        visibility: 'visible',
        opacity: 1,
        transition: 'opacity 0.25s',
        '@media (prefers-reduced-motion: reduce)': {
            transition: 'none',
        },
    },
    /** die Marke des Editors und in einem Satz, was er ist */
    intro: {
        display: 'flex',
        alignItems: 'center',
        gap: '16px',
        padding: '16px 0',
        [theme.breakpoints.down('sm')]: {
            flexDirection: 'column',
            alignItems: 'flex-start',
            gap: '10px',
        },
    },
    introText: {
        ...theme.custom.reading.small,
        color: theme.custom.textMuted,
        margin: 0,
    },
}));
