import { makeStyles } from '../../theme';

/** the description's own spacing - shared with the height it reserves for three lines */
const DESCRIPTION_PAD_BOTTOM = 20;
/** tighter than the running text: three short lines, read as one paragraph */
const DESCRIPTION_LINE_HEIGHT = 1.35;
/** the three lines the description keeps room for, whatever it actually holds */
const DESCRIPTION_LINES = 3;

export const useStyles = makeStyles()(theme => ({
    pageWrapper: {
        width: '100%',
        overflow: 'hidden',
        position: 'relative',
    },
    // the page frame the product overview and the adapter pages use, so the three sit on
    // one measure and their gutters step down together
    pageContainer: {
        width: '100%',
        maxWidth: theme.custom.layout.contentMaxWidth,
        padding: '40px 0 157px 0',
        margin: '0 auto',
        boxSizing: 'border-box',
        [theme.breakpoints.down(1360)]: {
            padding: `40px ${theme.custom.layout.gutter.lg}px 157px ${theme.custom.layout.gutter.lg}px`,
        },
        [theme.breakpoints.down(1280)]: {
            padding: `32px ${theme.custom.layout.gutter.md}px 157px ${theme.custom.layout.gutter.md}px`,
        },
        [theme.breakpoints.down('sm')]: {
            padding: `24px ${theme.custom.layout.gutter.sm}px 110px ${theme.custom.layout.gutter.sm}px`,
        },
    },
    subtitle: {
        // `&&` doubles the class: MUI's own Typography style would otherwise win
        // or lose depending on which stylesheet was injected first
        '&&': {
            fontSize: theme.custom.reading.lead.fontSize,
            lineHeight: theme.custom.reading.lead.lineHeight,
        },
        fontFamily: theme.typography.fontFamily,
        color: theme.custom.textMuted,
        maxWidth: '684px',
        marginBottom: '40px',
        [theme.breakpoints.down('sm')]: {
            fontSize: '16px',
            marginBottom: '32px',
        },
    },

    /* ------------------------------------------------- the recommended way */
    // A card is one calm surface step above the page ground, not a coloured frame. The
    // old page drew a brand-blue border around every block, which made the two card
    // levels read as the same thing twice.
    linuxCard: {
        display: 'flex',
        flexDirection: 'column',
        boxSizing: 'border-box',
        borderRadius: `${theme.custom.radius.card}px`,
        padding: '32px',
        background: theme.custom.surfaces.surface,
        boxShadow: theme.custom.elevation.card,
        marginBottom: '24px',
        [theme.breakpoints.down('sm')]: {
            padding: '20px 16px',
        },
    },
    cardHeader: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: '16px',
        marginBottom: '8px',
    },
    cardTitle: {
        fontFamily: 'Audiowide, Roboto, Arial, sans-serif',
        fontWeight: 400,
        fontSize: '28px',
        lineHeight: 1.2,
        textTransform: 'uppercase',
        color: theme.custom.textHeading,
        // a long name such as "RASPBERRY PI OS" has to give way, otherwise it pushes the
        // logo beside it out of the card on a phone
        minWidth: 0,
        overflowWrap: 'anywhere',
        [theme.breakpoints.down('md')]: {
            fontSize: '22px',
        },
        [theme.breakpoints.down(400)]: {
            fontSize: '18px',
        },
    },
    linuxIcon: {
        width: '72px',
        height: '72px',
        flexShrink: 0,
        [theme.breakpoints.down('md')]: {
            width: '48px',
            height: '48px',
        },
    },
    linuxSubHeader: {
        fontFamily: theme.typography.fontFamily,
        fontSize: theme.custom.reading.body.fontSize,
        lineHeight: theme.custom.reading.body.lineHeight,
        color: theme.custom.textMuted,
        maxWidth: '763px',
        marginBottom: '20px',
        [theme.breakpoints.down('sm')]: {
            fontSize: '16px',
        },
    },

    /* --------------------------------------------------------- the command */
    commandRow: {
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        flexWrap: 'wrap',
    },
    // the command keeps the solid brand band: white on #005894 is 7.4:1, and the block
    // says "this is something you copy", not something you read
    commandBox: {
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        boxSizing: 'border-box',
        // it may shrink below the length of the command - the text then wraps instead of
        // pushing the card past the edge of a 320 px screen
        minWidth: 0,
        flex: '1 1 480px',
        maxWidth: '790px',
        minHeight: `${theme.custom.control.height}px`,
        padding: '10px 16px',
        borderRadius: `${theme.custom.radius.control}px`,
        background: theme.palette.secondary.main,
        color: theme.palette.common.white,
    },
    commandText: {
        fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Consolas, monospace',
        fontSize: '17px',
        lineHeight: 1.5,
        minWidth: 0,
        overflowWrap: 'anywhere',
        [theme.breakpoints.down('sm')]: {
            fontSize: '14px',
        },
    },
    copyButton: {
        all: 'unset',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
        // a touch target of its own, so the icon stays small without becoming hard to hit
        width: `${theme.custom.control.height}px`,
        height: `${theme.custom.control.height}px`,
        marginRight: '-8px',
        borderRadius: `${theme.custom.radius.chip}px`,
        transition: 'opacity 0.2s ease, transform 0.1s ease',
        '&:hover': { opacity: 0.7 },
        '&:active': { transform: 'scale(0.92)' },
        '&:focus-visible': { outline: 'none', boxShadow: theme.custom.focusRing },
    },
    copyIcon: {
        width: '24px',
        height: '24px',
    },
    copyConfirmation: {
        flexShrink: 0,
        transition: 'opacity 0.3s ease',
        fontFamily: theme.typography.fontFamily,
        fontSize: '15px',
        color: theme.custom.textAccent,
    },

    /* ------------------------------------------------------------- the hint */
    hintText: {
        display: 'flex',
        alignItems: 'flex-start',
        gap: '8px',
        fontFamily: theme.typography.fontFamily,
        fontSize: theme.custom.reading.small.fontSize,
        lineHeight: theme.custom.reading.small.lineHeight,
        // a side note steps back through its own tone, not through opacity - opacity over
        // a light ground washes the text out instead of quieting it
        color: theme.custom.textSubtle,
        marginTop: '16px',
    },
    alertIcon: {
        width: '16px',
        height: '16px',
        flexShrink: 0,
        marginTop: '3px',
    },

    /* --------------------------------------------- when do I need an image? */
    imageInfoBox: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        gap: '24px',
        marginTop: '32px',
        paddingTop: '24px',
        borderTop: `1px solid ${theme.custom.hairline}`,
        [theme.breakpoints.down('md')]: {
            flexDirection: 'column',
            alignItems: 'stretch',
        },
    },
    imageInfoText: {
        minWidth: 0,
    },
    imageTextHeader: {
        fontFamily: theme.typography.fontFamily,
        fontWeight: 700,
        fontSize: '18px',
        lineHeight: 1.3,
        color: theme.custom.textHeading,
        marginBottom: '8px',
    },
    imageText: {
        fontFamily: theme.typography.fontFamily,
        fontSize: theme.custom.reading.body.fontSize,
        lineHeight: theme.custom.reading.body.lineHeight,
        color: theme.custom.textMuted,
        maxWidth: '620px',
    },

    /* ---------------------------------------------------- the alternatives */
    cardsGrid: {
        display: 'grid',
        // `1fr` keeps each card's min-content as a floor and pushed the row past a narrow
        // screen; `minmax(0, ...)` lets the tracks shrink with the viewport
        gridTemplateColumns: 'repeat(auto-fit, minmax(min(320px, 100%), 1fr))',
        // when the third card wraps onto a row of its own it keeps the height of the
        // two above it, rather than shrinking to its own content
        gridAutoRows: '1fr',
        gap: '24px',
    },
    card: {
        display: 'flex',
        flexDirection: 'column',
        boxSizing: 'border-box',
        minWidth: 0,
        borderRadius: `${theme.custom.radius.card}px`,
        padding: '24px',
        background: theme.custom.surfaces.surface,
        boxShadow: theme.custom.elevation.card,
        transition: 'background 0.2s ease, box-shadow 0.2s ease',
        '&:hover': {
            background: theme.custom.surfaces.raised,
            boxShadow: theme.custom.elevation.raised,
        },
        [theme.breakpoints.down('sm')]: {
            padding: '20px 16px',
        },
    },
    /**
     * Only the three platform cards: "RASPBERRY PI OS" wraps onto a second line while
     * "DOCKER" does not, and without this the taller heading pushed everything below it
     * out of line. Two lines of the title, again in `em` so it survives the two size
     * steps this heading takes.
     */
    platformCardTitle: {
        minHeight: '2.4em',
        display: 'flex',
        alignItems: 'center',
    },
    cardIcon: {
        width: 'auto',
        height: '48px',
        flexShrink: 0,
        [theme.breakpoints.down('md')]: {
            height: '40px',
        },
    },

    /**
     * What this way is, in one sentence. It sits directly under the name, centred,
     * and takes whatever height the card has left - so the rows and the buttons below
     * it end up on the same line across all three cards, however long the sentence is.
     */
    cardDescription: {
        display: 'flex',
        // top of the reserved space, not its middle - a short sentence then stays with
        // the name it belongs to instead of floating in the gap below it
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        textAlign: 'left',
        fontFamily: theme.typography.fontFamily,
        fontSize: theme.custom.reading.body.fontSize,
        // deliberately tighter than the reading scale: three short lines set as one
        // paragraph, which is what was asked for here. The size follows the scale, the
        // rhythm does not - and the reservation below is computed from this number, so
        // the two cannot drift apart.
        lineHeight: DESCRIPTION_LINE_HEIGHT,
        color: theme.palette.text.primary,
        minWidth: 0,
        overflowWrap: 'anywhere',
        padding: `0 0 ${DESCRIPTION_PAD_BOTTOM}px 0`,
        // Room for three lines of text, computed from the line height above so the two
        // cannot drift apart, and in `em` so it follows the font size instead of a
        // number that would need correcting at every breakpoint. The padding is added
        // on top because the box is border-box - without that the reservation swallows
        // its own padding and the longest sentence pushed its rows out of line.
        minHeight: `calc(${DESCRIPTION_LINES * DESCRIPTION_LINE_HEIGHT}em + ${DESCRIPTION_PAD_BOTTOM}px)`,
    },

    /* the label/value rows at the foot of the card - the facts worth comparing */
    detailsText: {
        display: 'flex',
        flexDirection: 'column',
        // tight enough that the rows and the note below them read as one block rather
        // than as three separate lines that happen to sit above the buttons
        gap: '4px',
        // whatever height the card has left collects above this block, not between it
        // and the buttons - the rows belong to the buttons they sit on top of
        marginTop: 'auto',
        marginBottom: '24px',
    },
    detailsRow: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'baseline',
        gap: '16px',
        fontFamily: theme.typography.fontFamily,
        fontSize: '16px',
        lineHeight: 1.5,
        // label and value sit on one line and wrap into two on a narrow card, rather than
        // the value being cut off at the right edge
        flexWrap: 'wrap',
    },
    detailsLabel: {
        color: theme.custom.textSubtle,
        flexShrink: 0,
    },
    detailsValue: {
        color: theme.palette.text.primary,
        textAlign: 'right',
        minWidth: 0,
        overflowWrap: 'anywhere',
    },
    /** the line under the password - what to do with it, not just what it is */
    passwordHint: {
        fontFamily: theme.typography.fontFamily,
        fontSize: theme.custom.reading.small.fontSize,
        lineHeight: theme.custom.reading.small.lineHeight,
        color: theme.custom.textSubtle,
        // it belongs to the password line above it, not to the block as a whole
        marginTop: '-2px',
    },

    /* ---------------------------------------------------------- the buttons */
    // `CustomButton` already carries the kit look - height, radius, colours and a
    // 200 px minimum width. The row only decides how the buttons share the space:
    // side by side while both minimums fit, wrapped underneath each other when the
    // card gets narrower. No breakpoint needed, the minimum width does the deciding.
    cardActions: {
        display: 'flex',
        flexWrap: 'wrap',
        gap: '12px',
        '& > *': { flex: '1 1 auto' },
    },
}));
