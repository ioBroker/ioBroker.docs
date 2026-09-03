import { makeStyles } from '../../theme';

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
        padding: '40px 0 157px 0',
        margin: '0 auto',
        boxSizing: 'border-box',
        [theme.breakpoints.down(1360)]: {
            padding: '40px 24px 157px 24px',
        },
        [theme.breakpoints.down(1280)]: {
            padding: '32px 24px 157px 24px',
        },
        [theme.breakpoints.down('sm')]: {
            padding: '24px 16px 110px 16px',
        },
    },

    /* ---------------------------------------------------------------- intro */
    hero: {
        position: 'relative',
        background: 'url(/image-code.png) no-repeat right top',
        backgroundSize: 'contain',
        paddingBottom: '24px',
        '&::before': {
            content: '""',
            position: 'absolute',
            top: '48%',
            left: '16%',
            transform: 'translate(-50%, -50%)',
            width: 'min(780px, 60%)',
            height: '62%',
            background:
                theme.palette.mode === 'dark'
                    ? 'radial-gradient(ellipse at center, rgba(35, 86, 174, 0.2) 0%, rgba(29, 144, 202, 0.1) 30%, rgba(29, 144, 202, 0.04) 58%, rgba(29, 144, 202, 0) 85%)'
                    : 'none',
            filter: 'blur(70px)',
            pointerEvents: 'none',
            zIndex: 0,
        },
        [theme.breakpoints.down('md')]: {
            background: 'none',
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
        color: theme.palette.text.primary,
        marginBottom: '8px',
    },
    introText: {
        fontFamily: theme.typography.fontFamily,
        fontSize: '18px',
        lineHeight: 1.4,
        color: theme.custom.textMuted,
        // the sub-line steps back behind the welcome above it, like the section sub-lines do
        opacity: 0.5,
        maxWidth: '520px',
    },
    quickSelect: {
        minWidth: 340,
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
        color: theme.palette.text.primary,
        // the line below belongs to this heading - the gap between the entries separates them
        marginBottom: '-1px',
    },
    categoryText: {
        fontFamily: theme.typography.fontFamily,
        fontSize: '17px',
        lineHeight: 1.4,
        color: theme.custom.textMuted,
    },

    /* the promise below the intro: the software is free, a license supports the project */
    support: {
        position: 'relative',
        maxWidth: '820px',
        margin: '0 auto 96px auto',
        padding: '48px 56px',
        textAlign: 'center',
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
    supportLead: {
        fontFamily: theme.typography.h1.fontFamily,
        fontSize: '24px',
        fontWeight: 400,
        letterSpacing: '0.01em',
        lineHeight: 1.3,
        color: theme.palette.text.primary,
        [theme.breakpoints.down('md')]: {
            fontSize: '20px',
        },
    },
    supportText: {
        fontFamily: theme.typography.fontFamily,
        fontSize: '18px',
        lineHeight: 1.7,
        color: theme.custom.textMuted,
        marginTop: '16px',
    },
    supportAccent: {
        fontFamily: theme.typography.fontFamily,
        fontSize: '18px',
        lineHeight: 1.7,
        color: theme.palette.primary.main,
        marginTop: '24px',
    },
    supportThanks: {
        fontFamily: theme.typography.h1.fontFamily,
        fontSize: '17px',
        fontWeight: 400,
        letterSpacing: '0.01em',
        color: theme.palette.primary.main,
        marginTop: '12px',
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
        fontFamily: theme.typography.fontFamily,
        // the sub-line of a chevron entry is a caption, not reading text - it stays small
        fontSize: '15px',
        lineHeight: 1.4,
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
            gridTemplateColumns: '1fr 1fr',
        },
        [theme.breakpoints.down('md')]: {
            gridTemplateColumns: '1fr',
            gap: '32px',
        },
    },
    proseSplit: {
        display: 'grid',
        gridTemplateColumns: '1fr 368px',
        gap: '48px',
        alignItems: 'start',
        marginTop: '8px',
        [theme.breakpoints.down('md')]: {
            gridTemplateColumns: '1fr',
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
        fontSize: '17px',
        lineHeight: 1.7,
        color: theme.custom.textMuted,
        whiteSpace: 'pre-line',
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
        maxWidth: '760px',
        '& li': {
            display: 'flex',
            gap: '16px',
            fontFamily: theme.typography.fontFamily,
            fontSize: '17px',
            lineHeight: 1.5,
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
        fontSize: '17px',
        lineHeight: 1.5,
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
        color: theme.palette.primary.main,
        flexShrink: 0,
    },

    proseList: {
        margin: '12px 0',
        paddingLeft: '20px',
        fontFamily: theme.typography.fontFamily,
        fontSize: '17px',
        lineHeight: 1.7,
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
    marginBottom: '32px !important',
    fontSize: '26px !important',
    '@media (max-width:899.95px)': { fontSize: '22px !important' },
    '@media (max-width:599.95px)': { fontSize: '19px !important' },
} as const;
