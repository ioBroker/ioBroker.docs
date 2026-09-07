import { makeStyles } from '../../../../theme';

/**
 * The note and the pair of donation buttons below it share one width, so both blocks
 * stand on the same line on the left and on the right.
 *
 * 205 rather than the 201 the pair of buttons measures (90 + 16 + 95): the longest line
 * of the note, "Unsere Software ist kostenlos.", needs 203 px at 16 px - at 201 it broke
 * into a third line. The four extra pixels go into the gap between the buttons, which
 * ends up at 20 instead of 16. If the note's wording changes, measure it again.
 */
const SUPPORT_BLOCK_WIDTH = 205;

export const useStyles = makeStyles()(theme => ({
    container: {
        width: '100%',
        margin: '0 auto',
        padding: '0 64px',
        position: 'relative',
        height: '100%',
        [theme.breakpoints.down('md')]: {
            padding: `0 ${theme.custom.layout.gutter.lg}px`,
        },
        [theme.breakpoints.down('sm')]: {
            padding: `0 ${theme.custom.layout.gutter.sm}px`,
        },
    },
    heroSection: {
        width: '100%',
        backgroundColor: '#080B1C',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'start',
        justifyContent: 'flex-start',
        overflowX: 'hidden',
        overflowY: 'visible',
        paddingBottom: '105px',
        /**
         * Below the desktop the banner takes exactly the visible window: `svh` is the
         * small viewport height, the one that stays put while a phone browser's toolbars
         * collapse and expand - `vh` would jump. The 64 px is the header, which `main`
         * already reserves as padding above this section.
         *
         * The 32 px of air above the divider are inside the section, so its dark ground
         * runs down to the line - as a margin they would be transparent and leave a pale
         * strip under the buttons. The minimum height grows by the same amount, so the
         * content box is still exactly one screen and the donation buttons keep the
         * lower edge of it.
         */
        [theme.breakpoints.down('md')]: {
            minHeight: 'calc(100svh - 64px + 32px)',
            alignItems: 'stretch',
            paddingBottom: '32px',
        },
    },
    heroBackgroundImage: {
        position: 'absolute',
        top: '62%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '100%',
        height: '55%',
        backgroundImage: 'url(/clippedBackground.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'top',
        backgroundRepeat: 'no-repeat',
        zIndex: 0,
        opacity: 0.3,

        [theme.breakpoints.down('md')]: {
            // 210% was roughly twice what was needed.
            backgroundSize: '150%',
            backgroundPosition: 'center',
            top: '62%',
            // The cover above is tilted by 7deg, which moves its stops by about 17% of
            // this box's height from one side of the screen to the other - so on one
            // side the fade began above the box and the picture's own straight top edge
            // was left standing there as a step. The picture now fades out at the top
            // itself, which no tilt of the cover can undo.
            maskImage: 'linear-gradient(to bottom, transparent 0%, #000 24%)',
            WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, #000 24%)',
        },
        // On a phone the picture runs down to the divider instead of stopping some
        // 60 px above it, and is held closer - at 150 % it read as a wide landscape
        // seen from far away on a 400 px screen.
        [theme.breakpoints.down('sm')]: {
            top: 'auto',
            bottom: 0,
            transform: 'translateX(-50%)',
            height: '62%',
            backgroundSize: '230%',
            // the middle of the photo, lifted by 120 px inside the frame
            backgroundPosition: '50% calc(50% - 120px)',
        },
    },
    heroBackgroundImageOverlay: {
        position: 'absolute',
        top: '62%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '100%',
        height: '55%',
        zIndex: 1,
        backgroundImage: 'linear-gradient(187deg, #080B1C 15%, #080B1C00 15%, #080B1C 80%, #080B1C 100%)',
        [theme.breakpoints.down('md')]: {
            // Below 900 px the photo is shown at 210 % and centred, which puts its bright
            // band of nodes exactly where the cover above ends. The stop is hard - opaque
            // and transparent both sit at 15 % - so that showed as a step running across
            // the picture. Here the same edge is a fade over roughly 70 px instead. The
            // desktop keeps its hard cut: there a dark part of the photo meets it and the
            // edge is what gives the banner its shape.
            backgroundImage: 'linear-gradient(187deg, #080B1C 4%, #080B1C00 26%, #080B1C 80%, #080B1C 100%)',
            top: '62%',
        },
        // the cover has to sit on exactly the box it covers
        [theme.breakpoints.down('sm')]: {
            top: 'auto',
            bottom: 0,
            transform: 'translateX(-50%)',
            height: '62%',
        },
    },
    heroContentWrapper: {
        width: '100%',
        paddingTop: '64px',
        position: 'relative',
        zIndex: 1,
        // On a phone the whole banner should fit above the fold - it was 749 px against
        // 541 usable, so the button sat half cut off at the bottom edge. The height is
        // taken out of the spacing rather than out of the content: every step below is
        // one of the eight places that made up those 208 px.
        [theme.breakpoints.down('md')]: {
            paddingTop: '24px',
            // the wrapper hands the height down instead of collapsing around its content
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            minHeight: 0,
        },
    },
    heroContent: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        width: '100%',
        [theme.breakpoints.down('md')]: {
            flexDirection: 'column',
            alignItems: 'center',
            // logo, picture and claim at the top, the donation row pushed to the very
            // bottom of the window - the space between them is whatever is left over
            flex: 1,
            minHeight: 0,
            justifyContent: 'space-between',
        },
    },
    heroLeft: {
        textAlign: 'left',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        // logo at the top, claim and button at the bottom - no hard coded gap
        minHeight: '560px',
        [theme.breakpoints.down('md')]: {
            alignItems: 'flex-start',
            justifyContent: 'flex-start',
            minHeight: 0,
            width: '100%',
            flex: 1,
        },
    },
    heroLogo: {
        width: '100%',
        maxWidth: '470px',
        marginTop: '-12px',
        [theme.breakpoints.down('md')]: {
            marginBottom: '20px',
            marginTop: 0,
            maxWidth: '400px',
        },
        [theme.breakpoints.down('sm')]: {
            maxWidth: '80%',
        },
    },
    // the claim sets the width, the button below picks it up exactly
    heroClaim: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'stretch',
        width: 'fit-content',
        maxWidth: '100%',
        gap: '36px',
        // On a phone the block takes the whole column instead of shrink-wrapping the
        // longest line - `installButton` already asks for the full width, it just had
        // only 261 px of parent to fill.
        [theme.breakpoints.down('md')]: {
            gap: '20px',
            width: '100%',
        },
        // Between phone and desktop the column is already 800 px wide, and a button
        // filling it reads as a coloured band rather than as something to press. Here
        // the block shrink-wraps its longest line again and the button takes that
        // width, exactly as it does on the desktop. The full width was asked for on
        // the phone, where the column is narrow - there it stays.
        [theme.breakpoints.between('sm', 'md')]: {
            width: 'fit-content',
        },
        // 30 px higher on a phone. The space is taken from the picture's box above, not
        // from the note below - so the note and the donation buttons keep the lower
        // edge, and the picture itself keeps its size: it is limited by its width here,
        // and its box stays taller than the picture is drawn.
        [theme.breakpoints.down('sm')]: {
            marginBottom: '30px',
        },
    },
    heroPlatformText: {
        fontSize: '24px',
        fontWeight: 400,
        // doubled so it beats MUI's own Typography class: that one asks for 1.6 and won,
        // which is why the two lines stood 28.8 px apart instead of the 1.2 written here
        '&&': {
            lineHeight: 1.2,
        },
        letterSpacing: '-0.01em',
        textAlign: 'left',
        // the banner image is dark in both themes, so the claim stays white
        color: '#FFFFFF',
        [theme.breakpoints.down('md')]: {
            fontSize: '20px',
        },
        [theme.breakpoints.down('sm')]: {
            fontSize: '18px',
        },
    },
    installButton: {
        width: '100%',
        minWidth: 0,
        [theme.breakpoints.down('md')]: {
            marginBottom: '20px',
        },
        // in this range the donation block stands beside it rather than below it, so
        // there is nothing left to keep clear of - and both buttons end on one line
        [theme.breakpoints.between('sm', 'md')]: {
            marginBottom: 0,
        },
    },
    heroRight: {
        textAlign: 'left',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-end',
        // The note and the two donation buttons used to share one 48 px row, the note on
        // the left and the buttons on the right. The note now stands on its own line
        // above them; the buttons keep the right edge of the column they had.
        [theme.breakpoints.down('md')]: {
            flexDirection: 'column',
            // note and button row are both 222 px wide and sit at the right edge of the
            // column, so the two stand on one line on the left as well as on the right
            alignItems: 'flex-end',
            width: '100%',
            minWidth: 0,
            gap: '12px',
        },
        /**
         * Between phone and desktop the block leaves the flow and stands in the bottom
         * right corner. The left column then has the full height to itself, which puts
         * the claim and its button on the same line as the donation buttons - and the
         * height the two used to take goes back to the picture above them.
         *
         * Only in this range: below 600 px the claim and its button take the whole
         * column, and the two would sit on top of each other.
         */
        [theme.breakpoints.between('sm', 'md')]: {
            position: 'absolute',
            right: `${theme.custom.layout.gutter.lg}px`,
            bottom: 0,
            width: `${SUPPORT_BLOCK_WIDTH}px`,
        },
        // On a phone the banner has to fit into the visible screen, and every line it
        // spends is one the picture above loses. Note and buttons therefore share one
        // line again: the note on the left, the pair at the right edge.
        [theme.breakpoints.down('sm')]: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '12px',
        },
    },
    supportIconsWrapper: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-end',
        [theme.breakpoints.down('md')]: {
            alignItems: 'flex-start',
            // the two buttons keep their size; the text beside them gives way
            flexShrink: 0,
        },
    },
    housesImageWrapper: {
        marginTop: '80px',
        marginBottom: '104px',
        marginRight: 32,
        [theme.breakpoints.down('md')]: {
            marginBottom: '24px',
            display: 'none',
        },
    },

    housesImage: {
        width: '485px',
        height: 'auto',
        [theme.breakpoints.down('lg')]: {
            width: '400px',
        },
        [theme.breakpoints.down(980)]: {
            width: '320px',
        },
        [theme.breakpoints.down('md')]: {
            display: 'none',
        },
    },

    smallHousesImageWrapper: {
        display: 'none',
        [theme.breakpoints.down('md')]: {
            marginBottom: '12px',
            maxWidth: '100%',
            // The picture is the elastic part: it takes whatever height is left after
            // the logo, the claim and the buttons have had theirs, and gives way first
            // on a short screen. It is the one element here that can lose height
            // without losing meaning.
            display: 'flex',
            alignItems: 'center',
            // right edge of the column, the same line the claim and the button end on.
            // The picture used to sit centred and was pulled back to that line with a
            // 34 px nudge - which was exactly right on a phone and 49 px short on a
            // tablet, because the leftover margin grows with the column.
            justifyContent: 'flex-end',
            // the column centres its items, so this box sized itself around the picture
            // instead of spanning the column - which made every offset measured against
            // the column land somewhere else
            width: '100%',
            // `flex-basis: 0` rather than `auto`: the box then takes its height from the
            // space left over instead of from the picture inside it, which is what makes
            // that height definite - and only a definite height lets the image below
            // resolve its own against it.
            flex: '1 1 0',
            minHeight: 0,
        },
    },
    smallHousesImage: {
        display: 'none',
        [theme.breakpoints.down('md')]: {
            display: 'block',
            // `height: 100%` resolves against the flex-sized box above and `contain`
            // keeps the proportions - `max-height: 100%` silently did nothing, because
            // a percentage cannot resolve against a height that comes from content.
            // The picture is width-limited at this size, not height-limited, so the
            // ceiling on the width is what actually makes it smaller; the height rule
            // still takes over on a short screen.
            width: '100%',
            maxWidth: '80%',
            height: '100%',
            objectFit: 'contain',
            // An optical nudge, not a layout change: `transform` moves the drawing
            // without touching the box, so the height budget the banner is balanced on
            // stays exactly as it was. The 34 px put the right edge of the picture on
            // the same line as the right edge of the button below it, which is as far
            // right as it can go without leaving the column.
            transform: 'translate(0, 14px)',
        },
        // on a phone it moves 50 px further right, past the edge of the column, and sits
        // 50 px higher than elsewhere - it follows the photo behind it
        [theme.breakpoints.down('sm')]: {
            transform: 'translate(50px, 29px)',
            // the picture is width limited here, so the ceiling on the width is what
            // decides how large it is drawn: 90 instead of 80 % of the column
            maxWidth: '90%',
        },
    },
    supportText: {
        fontSize: 16,
        textAlign: 'left',
        // A ratio, not a fixed 24 px. The fixed value was measured for the 16 px this
        // text has on the desktop; below 900 px the size drops to 12 px and the line
        // spacing stayed at 24 - twice the font size. Below 480 px MUI's own body1 rule
        // then overrode it with 1.6, which is why the spacing visibly jumped at exactly
        // that width. Doubled so it wins over that rule everywhere.
        '&&': {
            lineHeight: 1.5,
        },
        letterSpacing: '-0.03em',
        fontWeight: 400,
        marginBottom: '10px',
        width: SUPPORT_BLOCK_WIDTH,
        color: '#FFFFFF',
        // a side note beside the button, not a second message. The banner is dark in
        // both themes, so opacity steps the text back towards the ground instead of
        // washing it out - white at half strength is 5.3:1 here, clear of the 4.5:1
        // the 12 px version needs.
        opacity: 0.5,
        whiteSpace: 'normal',
        wordBreak: 'keep-all',
        overflowWrap: 'normal',
        [theme.breakpoints.down('md')]: {
            textAlign: 'left',
            fontSize: 12,
            // the fixed 222 was what pushed the row past the column - here it becomes a
            // ceiling instead of a demand, so the text gives way on a narrow screen
            // the same width the button row below it takes, so both blocks share their
            // left and their right edge. The lines themselves stay left aligned - only
            // the box is as wide as the pair of buttons under it.
            width: `${SUPPORT_BLOCK_WIDTH}px`,
            minWidth: 0,
        },
        [theme.breakpoints.down('sm')]: {
            // beside the buttons rather than above them: it takes what the pair leaves
            // and gives way first on a narrow screen
            width: 'auto',
            flex: '0 1 auto',
            minWidth: 0,
            marginBottom: 0,
        },
    },
    supportIcons: {
        display: 'flex',
        // the two sit as close together as the pair still reads as two buttons; the note
        // above takes the same width, so both blocks share their left and right edge
        gap: 16,
        width: `${SUPPORT_BLOCK_WIDTH}px`,
        justifyContent: 'space-between',
        // they sit at the right end of that one line, as close together as the pair
        // still reads as two separate buttons
        [theme.breakpoints.down('sm')]: {
            width: 'auto',
            flexShrink: 0,
            gap: '10px',
        },
    },
    supportIconAmazon: {
        border: '1px solid #1D90CA',
        borderRadius: theme.shape.borderRadius,
        // symmetric: the 25 px at the bottom pushed the mark 6 px above the middle of
        // the button and out over its top edge
        padding: theme.spacing(1),
        width: '95px',
        height: '40px',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'background-color 0.2s',
        '&:hover': {
            backgroundColor: 'rgba(29, 144, 202, 0.1)',
        },
        // on a phone the two are the only things here that are tapped rather than read,
        // and 40 px is under the 44 a touch target should keep
        [theme.breakpoints.down('sm')]: {
            // narrower and with a smaller mark inside, but still 44 px tall: that is the
            // floor for something a finger has to hit, and the height is not what makes
            // the pair look heavy - the width and the size of the marks do
            width: '64px',
            height: '44px',
            padding: theme.spacing(0.75),
        },
    },
    supportIconPayPal: {
        border: '1px solid #1D90CA',
        borderRadius: theme.shape.borderRadius,
        padding: theme.spacing(1.5),
        width: '90px',
        height: '40px',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'background-color 0.2s',
        '&:hover': {
            backgroundColor: 'rgba(29, 144, 202, 0.1)',
        },
        [theme.breakpoints.down('sm')]: {
            width: '60px',
            height: '44px',
            padding: theme.spacing(1),
        },
    },
    paypalIconImage: {
        width: '20px',
        height: '26px',
        [theme.breakpoints.down('sm')]: {
            width: '16px',
            height: '21px',
        },
    },
    /**
     * Height plus `width: auto`, not a fixed pair: the file is 163 x 176, and the fixed
     * 50 x 40 squeezed the mark to 80 % of its height. That is what made it read as
     * small and slightly off next to the PayPal mark beside it.
     */
    /**
     * Height plus `width: auto`, never a fixed pair - the file is drawn to its own
     * proportions. Since the two Amazon files were cropped to their drawing (05.09.2026)
     * these numbers are the height of the mark itself, not of a box with air above it.
     */
    amazonIconImage: {
        width: 'auto',
        height: '24px',
        [theme.breakpoints.down('sm')]: {
            height: '22px',
        },
    },
}));
