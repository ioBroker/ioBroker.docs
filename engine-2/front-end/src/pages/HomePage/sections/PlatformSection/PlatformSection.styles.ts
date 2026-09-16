import { makeStyles } from '../../../../theme';

export const useStyles = makeStyles()(theme => ({
    platformSection: {
        position: 'relative',
        backgroundColor: theme.palette.background.default,
        overflow: 'hidden',
        /*
         * The code image at the size it has on the licenses page - so the lines stand there readable -
         * but only on the right half: the layer starts at 45 percent and runs to the right, fading in
         * softly on the left. It thus lies beside the text and not under it. The light theme does not get
         * it, there the delicate drawing turns into a grey grid.
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
            // 180 percent of the layer width is roughly the width of the section
            backgroundSize: '180% auto',
            maskImage: 'linear-gradient(to right, transparent 0%, #000 18%)',
            WebkitMaskImage: 'linear-gradient(to right, transparent 0%, #000 18%)',
            display: theme.palette.mode === 'light' ? 'none' : 'block',
            pointerEvents: 'none',
            zIndex: 0,
            // below 900 pixels the text takes the whole width, there is no more room for the
            // image beside it
            [theme.breakpoints.down('md')]: {
                display: 'none',
            },
        },
        paddingTop: theme.custom.layout.section.lg,
        paddingBottom: theme.custom.layout.section.lg,
        /*
         * A calm light behind the headline, the same handwriting as in the banner and in the history
         * further down: the centre lies on the left edge, so half of it outside the page, which makes it
         * seem to fall in from outside. The light theme does not have it, there it would be a stain
         * instead of light.
         */
        '&::before': {
            content: '""',
            position: 'absolute',
            /*
             * The box of the section clips whatever sticks out of it. The light therefore has to fit in with
             * its whole height, otherwise its cut-off edge stands across the page like a step: a centre at
             * 45 percent with a height of 78 percent means 6 to 84 percent, leaving air above and below.
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
    /** the line above the headline that says what the section is about */
    label: {
        ...theme.custom.reading.caption,
        textTransform: 'uppercase',
        letterSpacing: '0.08em',
        // in the brand colour, like the label "// ADAPTER" in the section below
        color: theme.palette.primary.main,
        marginBottom: '20px',
    },
    /** the brand motif in front of the line, like the evidence items in the banner */
    labelSlashes: {
        color: theme.palette.primary.main,
        marginRight: '8px',
    },
    /*
     * The text stands on the left and leaves the right half free: the code image lies there behind
     * it, as on the licenses page.
     */
    intro: {
        maxWidth: '58%',
        [theme.breakpoints.down('md')]: {
            maxWidth: '100%',
        },
    },
    /** headline and paragraphs stand together in the left column */
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
     * The second half of the headline carries the brand colour, as in the banner - namely `primary`,
     * not `textAccent`: in the light theme heading and `textAccent` are the same colour, so the two
     * lines would stand there without any difference.
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
     * The chain: four tiles of equal width, in the order in which a device takes its way through
     * ioBroker. On the tablet they stand in pairs, on the phone one below the other.
     */
    flow: {
        display: 'flex',
        alignItems: 'stretch',
        gap: '8px',
        marginTop: '56px',
        /*
         * Below 900 pixels the four stand one below the other - the chain stays, it just stands
         * vertically then. A grid of two columns would be the wrong place for it: a sequence that jumps
         * from left to right and back to the left no longer reads as a way.
         */
        [theme.breakpoints.down('md')]: {
            flexDirection: 'column',
            // the tiles do not take the whole width: a tile with four words in it
            // would otherwise be half a metre wide. Air remains on the right.
            alignItems: 'flex-start',
            marginTop: '40px',
        },
        [theme.breakpoints.down('sm')]: {
            marginTop: '32px',
        },
    },
    /*
     * The stroke between two tiles: it says that the four are a sequence and not an assortment. It
     * starts restrained and runs out into the brand colour towards the next tile. Stacked, it turns
     * along and stands vertically.
     */
    flowLine: {
        flex: '0 0 24px',
        alignSelf: 'center',
        height: '1px',
        background: `linear-gradient(90deg, ${theme.custom.hairlineStrong}, ${theme.palette.primary.main})`,
        [theme.breakpoints.down('md')]: {
            flex: '0 0 20px',
            // it stands below the number of the tile above, not in the middle of the row
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
         * The tile is roughly as tall as it is wide. Number and title stand at the top, the sentence at
         * the bottom, with the free space in between - that gives the tile air and an order, instead of
         * everything sticking to the top with nothing at the bottom.
         */
        minHeight: '224px',
        justifyContent: 'space-between',
        [theme.breakpoints.down('md')]: {
            maxWidth: '520px',
            // stacked, a square would be nothing but empty space, there the content counts.
            // `flex` has to be reset for that: in the column the basis 0 applies to the
            // height, the tile would otherwise be 48 pixels tall and the text would run
            // out of it.
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
        /*
         * Every tile is a link to the page that explains its step in full. It therefore does not look
         * like a link, but behaves like one: nothing is underlined, on hover the surface lifts a little,
         * and with the keyboard it gets the same ring as any other control (Denis, 14.09.2026).
         */
        textDecoration: 'none',
        color: 'inherit',
        cursor: 'pointer',
        transition: 'background-color 0.2s ease, box-shadow 0.2s ease, transform 0.2s ease',
        '&:hover': {
            backgroundColor: theme.custom.surfaces.raised,
            boxShadow: theme.custom.elevation.raised,
            transform: 'translateY(-2px)',
        },
        '&:focus-visible': {
            outline: 'none',
            boxShadow: theme.custom.focusRing,
        },
        '@media (prefers-reduced-motion: reduce)': {
            transition: 'none',
            '&:hover': {
                transform: 'none',
            },
        },
        [theme.breakpoints.down('sm')]: {
            padding: '20px',
        },
    },
    /** number and title belong together and stand as a pair at the top edge of the tile */
    stepHead: {
        display: 'flex',
        flexDirection: 'column',
        gap: '6px',
    },
    /*
     * The number names the place in the chain, not the importance. It is set exactly like the steps
     * in the product overview ("01 /"): the same font, the same size, the same colour - an element the
     * page already has, instead of a second one for it (Denis, 11.09.2026).
     */
    stepNumber: {
        fontFamily: theme.typography.h1.fontFamily,
        fontSize: '17px',
        lineHeight: 1.6,
        color: theme.custom.textAccent,
        flexShrink: 0,
        // number and title stand below each other here, so the number keeps no fixed box: a
        // right-aligned one pushed it away from the left edge of the tile while the title
        // stayed there (Denis on the phone, 16.09.2026)
        display: 'inline-block',
        textAlign: 'left',
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
