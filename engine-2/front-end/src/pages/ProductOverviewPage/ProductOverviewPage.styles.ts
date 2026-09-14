import { keyframes } from 'tss-react';
import { makeStyles } from '../../theme';

/*
 * Die drei Punkte erscheinen nacheinander und verloeschen wieder, wie eine Zeile, die
 * gerade geschrieben wird. Vorher wanderten sie als Gruppe von links nach rechts, und
 * genau das las sich wie ein Objekt statt wie eine Folge (Denis, 12.09.2026). Die
 * Schreibweise mit `keyframes` aus tss-react ist Absicht - `makeStyles` sitzt hier auf
 * Emotion, und die JSS-Form "@keyframes" mit "$name" kommt dort nicht an, die Punkte
 * stuenden still.
 */
const signal = keyframes({
    '0%': {
        opacity: 0,
        transform: 'scale(0.6)',
    },
    '15%': {
        opacity: 1,
        transform: 'scale(1)',
    },
    '45%': {
        opacity: 1,
        transform: 'scale(1)',
    },
    '70%': {
        opacity: 0,
        transform: 'scale(0.6)',
    },
    '100%': {
        opacity: 0,
        transform: 'scale(0.6)',
    },
});

export const useStyles = makeStyles()(theme => ({
    pageWrapper: {
        width: '100%',
        overflow: 'hidden',
        position: 'relative',
    },
    pageContainer: {
        width: '100%',
        maxWidth: theme.custom.layout.contentMaxWidth,
        // the distance below the fixed header is the one the adapter page uses
        padding: '0 0 157px 0',
        margin: '0 auto',
        boxSizing: 'border-box',
        [theme.breakpoints.down(1360)]: {
            padding: '0 24px 157px 24px',
        },
        [theme.breakpoints.down(1280)]: {
            padding: '0 24px 157px 24px',
        },
        [theme.breakpoints.down('sm')]: {
            padding: '0 16px 110px 16px',
        },
    },

    /* ---------------------------------------------------------------- intro */
    /*
     * Bild und Licht wie im ersten Block der Startseite ("Was ist ioBroker?"): das
     * Code-Bild liegt als eigene Ebene auf der rechten Haelfte und blendet nach links
     * weich aus, das Licht kommt von rechts herein. Vorher lag das Bild als
     * Hintergrund ueber die ganze Breite und das Licht stand links unter dem Text.
     * Die helle Fassung bekommt beides nicht, dort wird aus der zarten Zeichnung ein
     * grauer Raster und aus dem Licht ein Fleck (Denis, 12.09.2026).
     */
    hero: {
        position: 'relative',
        paddingBottom: '24px',
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
            // unter 900 Bildpunkten nimmt der Text die ganze Breite, daneben ist fuer
            // das Bild kein Platz mehr
            [theme.breakpoints.down('md')]: {
                display: 'none',
            },
        },
        '&::before': {
            content: '""',
            position: 'absolute',
            // das Licht muss mit seiner ganzen Hoehe in den Abschnitt passen, sonst
            // steht seine abgeschnittene Kante als Absatz quer ueber der Seite
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
    },
    heroContent: {
        position: 'relative',
        zIndex: 1,
    },
    introRow: {
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        gap: '32px',
        flexWrap: 'wrap',
        marginBottom: '56px',
    },
    welcome: {
        fontFamily: theme.typography.fontFamily,
        fontSize: '22px',
        fontWeight: 700,
        lineHeight: 1.3,
        color: theme.custom.textHeading,
        marginBottom: '8px',
    },
    introText: {
        // `&&` doubles the class: MUI's own Typography style would otherwise win
        // or lose depending on which stylesheet was injected first
        '&&': {
            fontSize: theme.custom.reading.lead.fontSize,
            lineHeight: theme.custom.reading.lead.lineHeight,
        },
        fontFamily: theme.typography.fontFamily,
        color: theme.custom.textMuted,
        // the sub-line steps back behind the welcome above it, like the section sub-lines do
        opacity: 0.5,
        maxWidth: '520px',
    },
    quickSelect: {
        // a min-width beats the max-width next to it - on a 320 px phone the 340 pushed
        // the field out of the page
        minWidth: 'min(340px, 100%)',
        maxWidth: '100%',
        '& .MuiOutlinedInput-notchedOutline': {
            borderColor: theme.palette.primary.main,
        },
        '& .MuiSelect-select': {
            fontFamily: theme.typography.fontFamily,
            fontSize: '16px',
            color: theme.palette.text.primary,
            padding: '12px 16px',
        },
        '& .MuiSvgIcon-root': {
            color: theme.palette.primary.main,
        },
        // the arrow image takes the place of the MUI icon, including its open state
        '& .MuiSelect-icon': {
            top: 'calc(50% - 8px)',
            right: '16px',
            transition: 'transform 0.3s ease',
        },
        '& .MuiSelect-iconOpen': {
            transform: 'rotate(180deg) scaleX(-1)',
        },
    },
    // an entry of the open list: the product art in front of its name
    quickSelectItem: {
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
    },
    quickSelectIcon: {
        width: '28px',
        height: '28px',
        objectFit: 'contain',
        flexShrink: 0,
    },

    /* the five category teasers */
    categories: {
        display: 'grid',
        gap: '16px',
        // wide enough for the longest line to stay on one line
        maxWidth: '760px',
        marginBottom: '72px',
    },
    categoryTitle: {
        fontFamily: theme.typography.h1.fontFamily,
        fontSize: '20px',
        fontWeight: 400,
        letterSpacing: '0.01em',
        textTransform: 'uppercase',
        lineHeight: 1.3,
        color: theme.custom.textHeading,
        // the line below belongs to this heading - the gap between the entries separates them
        marginBottom: '-1px',
    },
    categoryText: {
        fontFamily: theme.typography.fontFamily,
        fontSize: theme.custom.reading.body.fontSize,
        lineHeight: theme.custom.reading.body.lineHeight,
        color: theme.custom.textMuted,
    },

    /* the promise below the intro: the software is free, a license supports the project */
    support: {
        position: 'relative',
        maxWidth: '820px',
        margin: '0 auto 96px auto',
        padding: '48px 56px',
        // the corner brackets of the kit - a frame that does not close, so the band stays light
        '&::before, &::after': {
            content: '""',
            position: 'absolute',
            width: '24px',
            top: 0,
            bottom: 0,
            border: `1px solid ${theme.custom.hairlineStrong}`,
        },
        '&::before': { left: 0, borderRight: 'none' },
        '&::after': { right: 0, borderLeft: 'none' },
        [theme.breakpoints.down('md')]: {
            padding: '32px 28px',
            marginBottom: '64px',
        },
    },
    /*
     * Der ganze Block spricht in einer Farbe: Weiss, gedecktes Weiss und zweimal Blau
     * nebeneinander lasen sich als vier verschiedene Stimmen. Jetzt ist alles blau, und
     * die Schrift trennt die Rollen: Audiowide fuer die beiden kurzen Aussagen, Roboto
     * fuer den Text dazwischen. Auf der hellen Fassung traegt der Blauton des Kits, das
     * helle Blau waere dort nicht lesbar (Denis, 12.09.2026).
     */
    supportLead: {
        fontFamily: theme.typography.h1.fontFamily,
        fontSize: '24px',
        fontWeight: 400,
        letterSpacing: '0.01em',
        lineHeight: 1.3,
        color: theme.palette.mode === 'dark' ? theme.palette.primary.light : theme.palette.secondary.main,
        [theme.breakpoints.down('md')]: {
            fontSize: '20px',
        },
    },
    supportText: {
        fontFamily: theme.typography.fontFamily,
        fontSize: theme.custom.reading.body.fontSize,
        lineHeight: theme.custom.reading.body.lineHeight,
        color: theme.custom.textAccent,
        marginTop: '16px',
    },
    /*
     * Das Signal steht ueber der Aussage und laeuft waagerecht in sie hinein: es holt
     * das Auge in den Block, ohne ihn zu zerschneiden - der senkrechte Strich tat das
     * (Denis, 12.09.2026). Es haelt an, wenn das Betriebssystem weniger Bewegung
     * wuenscht.
     */
    supportSignal: {
        height: '8px',
        marginBottom: '16px',
        display: 'flex',
        alignItems: 'center',
        gap: '6px',
        '& i': {
            width: '4px',
            height: '4px',
            borderRadius: '50%',
            backgroundColor: theme.palette.primary.main,
            animation: `${signal} 1.8s ease-in-out infinite`,
        },
        // je Punkt 0,18 Sekunden spaeter: sechs Punkte kommen einzeln von links nach
        // rechts, nicht als Gruppe
        '& i:nth-of-type(2)': {
            animationDelay: '0.18s',
        },
        '& i:nth-of-type(3)': {
            animationDelay: '0.36s',
        },
        '& i:nth-of-type(4)': {
            animationDelay: '0.54s',
        },
        '& i:nth-of-type(5)': {
            animationDelay: '0.72s',
        },
        '& i:nth-of-type(6)': {
            animationDelay: '0.9s',
        },
        '@media (prefers-reduced-motion: reduce)': {
            '& i': {
                animation: 'none',
            },
        },
    },
    supportAccent: {
        fontFamily: theme.typography.fontFamily,
        fontSize: theme.custom.reading.body.fontSize,
        lineHeight: theme.custom.reading.body.lineHeight,
        color: theme.custom.textAccent,
        marginTop: '24px',
    },
    supportThanks: {
        // Roboto wie der Text darueber, nur heller und halbfett: die Zeile schliesst den
        // Gedanken ab, sie ist keine zweite Ueberschrift (Denis, 14.09.2026)
        fontFamily: theme.typography.fontFamily,
        fontSize: theme.custom.reading.body.fontSize,
        fontWeight: 700,
        letterSpacing: 0,
        color: theme.palette.mode === 'dark' ? theme.palette.primary.light : theme.palette.secondary.main,
        marginTop: '16px',
    },

    /* --------------------------------------------------------------- section */
    section: {
        marginBottom: '96px',
        scrollMarginTop: '96px',
    },
    /* the summary under the section heading reads as a block comment in source: the section title
       already opens with //, so the two lines below it are wrapped in the block form */
    /* the summary under the section heading: each line is marked with a chevron, the way a prompt
       marks a line in a console - no panel, so the page keeps its quiet surfaces */
    sectionFeatures: {
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
        // the summary and the questions below it are two thoughts - the gap says so
        // (the value wins over the following block's margin, which collapses into it)
        marginBottom: '86px',
    },
    featureTitle: {
        // the lines right under the section heading stay in the display face - they belong to the
        // heading, the block titles further down are text and use Roboto
        position: 'relative',
        paddingLeft: '28px',
        '&::before': {
            content: '"›"',
            position: 'absolute',
            left: 0,
            fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Consolas, monospace',
            color: theme.palette.primary.main,
        },
        fontFamily: theme.typography.h1.fontFamily,
        fontSize: '17px',
        fontWeight: 400,
        letterSpacing: '0.01em',
        textTransform: 'uppercase',
        lineHeight: 1.3,
        color: theme.palette.text.primary,
    },
    featureText: {
        // `&&` doubles the class: MUI's own Typography style would otherwise win
        // or lose depending on which stylesheet was injected first
        '&&': {
            fontSize: theme.custom.reading.small.fontSize,
            lineHeight: theme.custom.reading.small.lineHeight,
        },
        fontFamily: theme.typography.fontFamily,
        // the sub-line of a chevron entry is a caption, not reading text - it stays small
        color: theme.custom.textMuted,
        // the sub-line steps back behind the heading above it
        opacity: 0.5,
        // it belongs to the line above it - almost no gap, the space between the entries carries
        // the separation
        marginTop: '-2px',
        paddingLeft: '28px',
    },

    cardRow: {
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'stretch',
        gap: '24px',
    },

    /* prose columns below the vis-2 cards */
    prose: {
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '48px',
        marginTop: '56px',
        // the same distance the setup block keeps before the cards, so every section breathes alike
        marginBottom: '80px',
        [theme.breakpoints.down('lg')]: {
            gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr)',
        },
        [theme.breakpoints.down('md')]: {
            gridTemplateColumns: 'minmax(0, 1fr)',
            gap: '32px',
        },
    },
    proseSplit: {
        display: 'grid',
        gridTemplateColumns: '1fr 368px',
        gap: '48px',
        alignItems: 'start',
        marginTop: '8px',
        // `1fr` keeps the min-content width of its items as a lower bound, and the product
        // card is 368 px wide - that pushed the whole column past a 375 px phone screen.
        // `minmax(0, 1fr)` lets the track shrink, the card follows with its own max-width.
        [theme.breakpoints.down('md')]: {
            gridTemplateColumns: 'minmax(0, 1fr)',
        },
    },
    /* the "i" beside a line that has a page in the documentation */
    docsLink: {
        display: 'inline-flex',
        alignItems: 'center',
        marginLeft: '8px',
        verticalAlign: 'middle',
        fontSize: '18px',
        color: theme.palette.primary.main,
        opacity: 0.75,
        textDecoration: 'none',
        '&:hover': {
            opacity: 1,
        },
        '&:focus-visible': {
            outline: 'none',
            boxShadow: theme.custom.focusRing,
            borderRadius: '50%',
        },
    },
    proseTitle: {
        // Roboto in mixed case: these read as questions, not as labels
        fontFamily: theme.typography.fontFamily,
        fontSize: '18px',
        fontWeight: 600,
        lineHeight: 1.3,
        color: theme.palette.text.primary,
        marginBottom: '16px',
    },
    proseText: {
        fontFamily: theme.typography.fontFamily,
        fontSize: theme.custom.reading.body.fontSize,
        lineHeight: theme.custom.reading.body.lineHeight,
        color: theme.custom.textMuted,
        whiteSpace: 'pre-line',
    },
    // the last word of a line and the "i" behind it break together
    noWrap: {
        whiteSpace: 'nowrap',
    },
    /* the setup steps, no longer hidden in a dialog: they say what the purchase needs */
    setupInline: {
        // the steps are a block of their own - tight inside, generous around it
        marginTop: '80px',
        marginBottom: '88px',
        // the heading of this block sits closer to its list than a prose heading does
        '& > :first-of-type': {
            marginBottom: '8px',
        },
    },
    setupSteps: {
        margin: '12px 0 0 0',
        padding: 0,
        listStyle: 'none',
        display: 'flex',
        flexDirection: 'column',
        gap: '6px',
        // 960 statt 760: bei 760 fiel der erste Schritt in zwei Zeilen, obwohl rechts
        // daneben Platz frei war (Denis, 14.09.2026)
        maxWidth: '960px',
        '& li': {
            display: 'flex',
            gap: '16px',
            fontFamily: theme.typography.fontFamily,
            fontSize: theme.custom.reading.body.fontSize,
            lineHeight: theme.custom.reading.body.lineHeight,
            color: theme.custom.textMuted,
        },
    },
    /* the voice services under the last step - one column per service */
    setupServices: {
        display: 'flex',
        flexWrap: 'wrap',
        gap: '20px 56px',
        marginTop: '16px',
        paddingLeft: '44px',
        [theme.breakpoints.down('sm')]: {
            paddingLeft: 0,
        },
    },
    setupServiceTitle: {
        fontFamily: theme.typography.fontFamily,
        fontSize: '17px',
        fontWeight: 600,
        lineHeight: 1.6,
        color: theme.palette.text.primary,
    },
    setupServiceItems: {
        margin: '4px 0 0 0',
        paddingLeft: '20px',
        fontFamily: theme.typography.fontFamily,
        fontSize: theme.custom.reading.body.fontSize,
        lineHeight: theme.custom.reading.body.lineHeight,
        color: theme.custom.textMuted,
        maxWidth: '420px',
        '& li': {
            marginBottom: '2px',
        },
    },
    setupStepNumber: {
        fontFamily: theme.typography.h1.fontFamily,
        fontSize: '17px',
        lineHeight: 1.6,
        color: theme.custom.textAccent,
        flexShrink: 0,
    },

    proseList: {
        margin: '12px 0',
        paddingLeft: '20px',
        fontFamily: theme.typography.fontFamily,
        fontSize: theme.custom.reading.body.fontSize,
        lineHeight: theme.custom.reading.body.lineHeight,
        color: theme.custom.textMuted,
        '& li': {
            marginBottom: '8px',
        },
    },

    state: {
        fontFamily: theme.typography.fontFamily,
        fontSize: '16px',
        lineHeight: 1.6,
        color: theme.custom.textMuted,
        padding: '48px 0',
    },
}));

/**
 * The section headings sit one step below the page title. The shared SectionTitle class beats
 *  `sx`, so the smaller size has to be marked important.
 */
export const sectionHeadingSx = {
    marginBottom: '32px',
    fontSize: '26px',
    '@media (max-width:899.95px)': { fontSize: '22px' },
    '@media (max-width:599.95px)': { fontSize: '19px' },
} as const;
