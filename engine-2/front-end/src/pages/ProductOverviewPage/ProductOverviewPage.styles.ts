import { keyframes } from 'tss-react';
import { makeStyles } from '../../theme';

/*
 * The three dots appear one after another and fade out again, like a line that is being written.
 * Before, they wandered as a group from left to right, and exactly that read like one object
 * instead of a sequence (Denis, 12.09.2026). Writing it with `keyframes` from tss-react is
 * deliberate - `makeStyles` sits on Emotion here, and the JSS form "@keyframes" with "$name" does
 * not arrive there, the dots would stand still.
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
     * Image and light as in the first block of the home page ("Was ist ioBroker?"): the code image
     * lies as a layer of its own on the right half and fades out softly to the left, the light comes
     * in from the right. Before, the image lay as a background across the whole width and the light
     * stood on the left under the text. The light theme gets neither, there the delicate drawing
     * turns into a grey grid and the light into a stain (Denis, 12.09.2026).
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
            // 180 percent of the layer width is roughly the width of the section
            backgroundSize: '180% auto',
            maskImage: 'linear-gradient(to right, transparent 0%, #000 18%)',
            WebkitMaskImage: 'linear-gradient(to right, transparent 0%, #000 18%)',
            display: theme.palette.mode === 'light' ? 'none' : 'block',
            pointerEvents: 'none',
            zIndex: 0,
            // below 900 pixels the text takes the whole width, there is no more room
            // for the image beside it
            [theme.breakpoints.down('md')]: {
                display: 'none',
            },
        },
        '&::before': {
            content: '""',
            position: 'absolute',
            // the light has to fit into the section with its whole height, otherwise
            // its cut-off edge stands across the page like a step
            top: '45%',
            right: 0,
            // the centre of the light always sits behind the right edge, otherwise on
            // wide screens the bright core stands as a stain in the middle of the section
            transform: 'translate(55%, -50%)',
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
        // on narrow screens the block below stands alone on the surface anyway,
        // half the air is enough there (Denis, 16.09.2026)
        [theme.breakpoints.down('md')]: {
            marginBottom: '32px',
        },
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
        // the block stands on its own: more air above and below than between the other
        // sections, so that the bracket does not stick to the text before it
        margin: '80px auto 128px auto',
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
            marginTop: '24px',
            marginBottom: '64px',
        },
    },
    /*
     * The whole block speaks in one colour: white, muted white and blue twice side by side read like
     * four different voices. Now everything is blue, and the font separates the roles: Audiowide for
     * the two short statements, Roboto for the text in between. In the light theme the blue of the
     * kit carries it, the light blue would not be readable there (Denis, 12.09.2026).
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
     * The signal stands above the statement and runs horizontally into it: it draws the eye into the
     * block without cutting it apart - the vertical stroke did that (Denis, 12.09.2026). It stops when
     * the operating system asks for reduced motion.
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
        // each dot 0.18 seconds later: six dots arrive one by one from left to
        // right, not as a group
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
        // Roboto like the text above, only lighter and semi-bold: the line closes the
        // thought, it is not a second heading (Denis, 14.09.2026)
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
        // the digits of the heading font differ in width ("01" is narrower than "02"), so
        // the numbers get a column of their own, as wide as the widest of them - the "/"
        // then stand under each other and every text starts at the same place
        display: 'grid',
        gridTemplateColumns: 'max-content 1fr',
        columnGap: '16px',
        rowGap: '6px',
        // 960 instead of 760: at 760 the first step fell onto two lines, although there
        // was free room to its right (Denis, 14.09.2026)
        maxWidth: '960px',
        '& li': {
            display: 'grid',
            gridColumn: '1 / -1',
            gridTemplateColumns: 'subgrid',
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
        // right-aligned in the number column, so the "/" line up
        textAlign: 'right',
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
