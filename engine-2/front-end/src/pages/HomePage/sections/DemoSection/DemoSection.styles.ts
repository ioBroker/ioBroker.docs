import { keyframes } from 'tss-react';
import { makeStyles } from '../../../../theme';

/*
 * Das Signal, das vom Ausloeser zu den Aktionen laeuft. Es steht ausserhalb der Regeln,
 * weil `makeStyles` hier auf Emotion sitzt: die Schreibweise "@keyframes" mit "$name",
 * die man aus JSS kennt, kommt dort nicht an - die Punkte standen deshalb still.
 */
const signal = keyframes({
    '0%': {
        transform: 'translateY(-9px)',
        opacity: 0,
    },
    '25%': {
        opacity: 1,
    },
    '75%': {
        opacity: 1,
    },
    '100%': {
        transform: 'translateY(9px)',
        opacity: 0,
    },
});

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
        maxWidth: '480px',
    },
    /*
     * Links die Auswahl, rechts die Regel. Unter 900 Bildpunkten stehen die drei Beispiele
     * als Reihe ueber der Regel.
     */
    shell: {
        display: 'grid',
        gridTemplateColumns: '320px 1fr',
        gap: `${theme.custom.layout.grid}px`,
        marginTop: '48px',
        alignItems: 'start',
        [theme.breakpoints.down('md')]: {
            gridTemplateColumns: '1fr',
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
    /** die Regel selbst: ein Ausloeser, drei Aktionen */
    card: {
        borderRadius: theme.custom.radius.card,
        backgroundColor: theme.custom.surfaces.surface,
        boxShadow: theme.custom.elevation.card,
        padding: '24px 28px 20px 28px',
        [theme.breakpoints.down('sm')]: {
            padding: '20px',
        },
    },
    cardTop: {
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        paddingBottom: '16px',
        borderBottom: `1px solid ${theme.custom.hairline}`,
    },
    /** der gruene Punkt sagt: die Regel ist scharf, nicht nur aufgeschrieben */
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
    rule: {
        display: 'grid',
        gridTemplateColumns: '72px 1fr',
        alignItems: 'center',
        margin: '20px 0',
        [theme.breakpoints.down('sm')]: {
            gridTemplateColumns: '1fr',
            gap: '8px',
        },
    },
    ruleLabel: {
        fontFamily: theme.typography.h1.fontFamily,
        fontSize: '13px',
        letterSpacing: '0.08em',
        color: theme.custom.textAccent,
    },
    device: {
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        padding: '12px 14px',
        borderRadius: theme.custom.radius.group,
        backgroundColor: theme.custom.surfaces.raised,
        boxShadow: `inset 0 0 0 1px ${theme.custom.hairline}`,
    },
    deviceIcon: {
        width: '40px',
        height: '40px',
        borderRadius: '50%',
        display: 'grid',
        placeItems: 'center',
        flexShrink: 0,
        fontSize: '22px',
        backgroundColor: theme.custom.surfaces.overlay,
        color: theme.palette.primary.main,
    },
    deviceName: {
        ...theme.custom.reading.small,
        fontWeight: 700,
        color: theme.custom.textHeading,
    },
    deviceDetail: {
        ...theme.custom.reading.caption,
        color: theme.custom.textSubtle,
    },
    /*
     * Die Strecke zwischen Ausloeser und Aktionen. Die drei Punkte laufen sie entlang -
     * das ist das Signal, das unterwegs ist. Wer Bewegung abgestellt hat, sieht die Linie
     * ohne sie.
     */
    connector: {
        height: '28px',
        marginLeft: '96px',
        borderLeft: `1px solid ${theme.palette.primary.main}`,
        display: 'flex',
        alignItems: 'center',
        gap: '4px',
        paddingLeft: '4px',
        '& i': {
            width: '4px',
            height: '4px',
            borderRadius: '50%',
            backgroundColor: theme.palette.primary.main,
            animation: `${signal} 1.6s ease-in-out infinite`,
        },
        '& i:nth-of-type(2)': {
            animationDelay: '0.25s',
        },
        '& i:nth-of-type(3)': {
            animationDelay: '0.5s',
        },
        '@media (prefers-reduced-motion: reduce)': {
            '& i': {
                animation: 'none',
            },
        },
        [theme.breakpoints.down('sm')]: {
            marginLeft: '20px',
        },
    },
    actions: {
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '10px',
        [theme.breakpoints.down('sm')]: {
            gridTemplateColumns: '1fr',
        },
    },
}));
