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
        // On the phone the donation block stands lower: the air above the divider
        // is cut from 32 to 18 pixels, and the block moves down by those 14.
        [theme.breakpoints.down('sm')]: {
            paddingBottom: '18px',
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
        // Between 600 and 900 the little houses sat above the network instead of on it: the
        // strip stands higher here, so that they stand on it.
        [theme.breakpoints.between('sm', 'md')]: {
            top: '48%',
        },
        // On a phone the picture runs down to the divider instead of stopping some
        // 60 px above it, and is held closer - at 150 % it read as a wide landscape
        // seen from far away on a 400 px screen.
        [theme.breakpoints.down('sm')]: {
            top: 'auto',
            bottom: 0,
            transform: 'translateX(-50%)',
            // taller: the strip reaches up behind the little houses, so that more of the network
            // can be seen than just its bottom edge
            height: '82%',
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
        // the cover sits exactly on the box it covers
        [theme.breakpoints.between('sm', 'md')]: {
            top: '48%',
        },
        // the cover has to sit on exactly the box it covers
        [theme.breakpoints.down('sm')]: {
            top: 'auto',
            bottom: 0,
            transform: 'translateX(-50%)',
            // taller: the strip reaches up behind the little houses, so that more of the network
            // can be seen than just its bottom edge
            height: '82%',
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
        /*
         * The column takes the full height of the row and puts its two ends at the edges: the wordmark at
         * the top, the claim at the bottom. The evidence line thus stands on the same line as the donation
         * buttons on the right (Denis, 11.09.2026) - the free space lies in between, not below.
         */
        alignSelf: 'stretch',
        gap: '44px',
        // no fixed height any more - the height comes from the right column
        minHeight: 0,
        [theme.breakpoints.down('md')]: {
            alignItems: 'flex-start',
            justifyContent: 'flex-start',
            minHeight: 0,
            width: '100%',
            flex: 1,
        },
        // Between 600 and 900 the two gaps alone took up 88 pixels that the image in
        // between was missing. 12 are enough here to separate the three parts.
        [theme.breakpoints.between('sm', 'md')]: {
            gap: '12px',
        },
    },
    /**
     * The wordmark says where one is; what the page offers is said by the headline below it. That is
     * why the mark stands smaller than it used to (470 px).
     */
    heroLogo: {
        width: '100%',
        maxWidth: '400px',
        marginTop: '-12px',
        [theme.breakpoints.down('md')]: {
            marginBottom: '20px',
            marginTop: 0,
            maxWidth: '330px',
        },
        [theme.breakpoints.down('sm')]: {
            maxWidth: '66%',
        },
    },
    // the claim sets the width, the button below picks it up exactly
    heroClaim: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'stretch',
        width: 'fit-content',
        maxWidth: '100%',
        // headline and sentence belong together, the button stands on its own: the spacing
        // therefore comes from the elements, not from a shared `gap`
        gap: 0,
        // On a phone the block takes the whole column instead of shrink-wrapping the
        // longest line - `installButton` already asks for the full width, it just had
        // only 261 px of parent to fill.
        [theme.breakpoints.down('md')]: {
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
            marginBottom: '14px',
        },
    },
    /**
     * The headline of the claim. Audiowide like every heading of the kit, but clearly smaller than an
     * H1: the wordmark already stands above it, and two large lines on top of each other read as a
     * competition. The line has two colours: the statement in white, the answer to it in the brand
     * colour.
     */
    heroHeadline: {
        fontFamily: theme.typography.h1.fontFamily,
        fontSize: '48px',
        fontWeight: 400,
        /*
         * Letter spacing and line height like the headline in the section "Geschichte", but in mixed
         * case: capitals were tried out here and are gone again (Denis, 11.09.2026).
         */
        letterSpacing: '-0.03em',
        '&&': {
            // tighter than the 1.15 of the history: capitals stand there, here the mixed case
            // has descenders and carries part of the spacing itself
            lineHeight: 1.02,
        },
        textAlign: 'left',
        // the image of the stage is dark in both themes, so the text stays white
        color: '#FFFFFF',
        /*
         * Between 900 and 1200 pixels the headline shares the row with the image and has only a good 450
         * pixels to itself. At 64 "Plattform." slipped onto a third line - at 48 both halves stand on one
         * line each again.
         */
        [theme.breakpoints.down('lg')]: {
            fontSize: '48px',
        },
        [theme.breakpoints.down('md')]: {
            fontSize: '46px',
        },
        [theme.breakpoints.down('sm')]: {
            fontSize: '34px',
        },
    },
    /** the slashes in front of every evidence item - the brand motif instead of a dash */
    heroTrustSlashes: {
        color: theme.palette.primary.main,
        marginRight: '8px',
        [theme.breakpoints.down('md')]: {
            marginRight: '4px',
        },
    },
    /** the second half of the headline carries the brand colour, the first stays white */
    heroHeadlineAccent: {
        color: theme.palette.primary.main,
    },
    /** the sentence that explains what the headline claims */
    heroSubtitle: {
        ...theme.custom.reading.lead,
        '&&': {
            // set tighter: the sentence should work as one block, not as three loose lines
            lineHeight: 1.35,
        },
        maxWidth: '520px',
        textAlign: 'left',
        color: '#FFFFFF',
        // close below the headline: the two belong together, the button stands on its own
        marginTop: '14px',
        [theme.breakpoints.down('md')]: {
            marginTop: '12px',
            fontSize: '16px',
        },
        /*
         * On the phone the sentence should stand on two lines. How much type fits for that depends on the
         * width of the window, not on a fixed breakpoint: the size therefore grows with the width and
         * stays between 10 and 16 pixels.
         */
        [theme.breakpoints.down('sm')]: {
            fontSize: 'clamp(10px, 3.1vw, 16px)',
        },
    },
    /**
     * Three evidence items below the button, each set off by a vertical stroke. They answer the three
     * questions that come after the first sentence: what it costs, how far it reaches, and whether it
     * runs without somebody else's cloud.
     */
    heroTrust: {
        display: 'flex',
        flexWrap: 'wrap',
        gap: '10px 24px',
        fontFamily: theme.typography.fontFamily,
        fontSize: '13px',
        lineHeight: 1.5,
        // the word that matters stands at full strength, the rest steps back
        color: 'rgba(255, 255, 255, 0.55)',
        '& b': {
            fontWeight: 700,
            color: '#FFFFFF',
        },
        // in the same narrow range as the headline: one step smaller, so that the three
        // evidence items stay on one line and the button above keeps its width
        [theme.breakpoints.down('lg')]: {
            fontSize: '12px',
            gap: '8px 18px',
        },
        /*
         * Between 600 and 900 the line shares the width with the donation block in the corner and has only
         * (window width - 300) to itself. The size therefore follows the width: 31 pixels of text per point
         * of type size, plus the gaps.
         */
        [theme.breakpoints.between('sm', 'md')]: {
            flexWrap: 'nowrap',
            gap: '0 8px',
            fontSize: 'clamp(7px, calc((100vw - 328px) / 31), 13px)',
            '& > span': {
                whiteSpace: 'nowrap',
            },
        },
        /*
         * On the phone the three evidence items stand on one line. Here too the size grows with the window
         * width, so that the line does not wrap on a narrow device - and no item is split within itself.
         */
        [theme.breakpoints.down('sm')]: {
            flexWrap: 'nowrap',
            // The evidence line stays on its line while headline, sentence and button
            // above it stand 14 pixels higher - the spacing in between absorbs that.
            // 8 instead of 14, because the gap of the group grew from 6 to 12: together
            // it remains the 20 that looked right here.
            marginTop: '8px',
            gap: '0 8px',
            fontSize: 'clamp(8px, calc((100vw - 68px) / 31), 12px)',
            '& > span': {
                whiteSpace: 'nowrap',
            },
        },
    },
    /**
     * Button and evidence line stand one below the other as a group. The group is as wide as its
     * widest child, and that is the evidence line; the button takes on that width. So it ends exactly
     * where "lokal betreibbar" ends, instead of aligning with the much wider headline
     * (Denis, 11.09.2026).
     */
    heroCta: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'stretch',
        /*
         * The button stands lower and moves up to the evidence line: the 14 pixels above the group are
         * exactly those taken away between button and evidence - the line itself thus stays level with the
         * donation buttons.
         */
        marginTop: '60px',
        // 32 instead of 22: the evidence line stands further below the button (Denis, 11.09.2026).
        // On the phone it stays at 12, the spacing was right there.
        gap: '32px',
        width: 'fit-content',
        maxWidth: '100%',
        /*
         * Between 600 and 900 pixels the donation block no longer stands in the row but fixed in the
         * bottom right corner - exactly level with button and evidence line. The group therefore ends
         * before it: 222 pixels for the block, 32 for the margin and 76 of spacing in between. Otherwise
         * the two run over each other.
         */
        [theme.breakpoints.between('sm', 'md')]: {
            maxWidth: 'calc(100vw - 300px)',
        },
        // On the phone the 30 pixels are too much: the claim block hangs at the top
        // and the button stands far below it. Without them the text slides down towards the
        // button, and the image above gets its height back.
        [theme.breakpoints.down('sm')]: {
            marginTop: '26px',
            gap: '12px',
            width: '100%',
        },
    },
    installButton: {
        /*
         * The button took on the width of the whole claim block, which is as wide as the headline - that
         * made it a band instead of a button. Now it is as wide as its label needs, at least 220 px. On the
         * phone it keeps the full width, the column is narrow there anyway.
         */
        alignSelf: 'stretch',
        width: '100%',
        minWidth: '220px',
        [theme.breakpoints.down('md')]: {
            marginBottom: '20px',
        },
        [theme.breakpoints.down('sm')]: {
            alignSelf: 'stretch',
            width: '100%',
            // as on the desktop: the evidence line stands close below the button, the
            // 20 pixels from above do not apply here
            marginBottom: 0,
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
            // the block is as wide as its content and no longer a fixed 222: line and
            // pair of buttons thus stand as one group instead of being pulled apart
            width: 'auto',
            gap: '8px',
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
        marginBottom: '87px',
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
        /*
         * On the phone the image gets the rest of the height, and that is scarce. A small lower bound keeps
         * the little houses recognisable without pushing the donation block below the edge of the window.
         */
        [theme.breakpoints.down('sm')]: {
            // a lower bound that grows with the window height: on a short window
            // the little houses stay modest, on a normal phone they stand
            // clearly larger.
            minHeight: 'clamp(115px, 21svh, 190px)',
        },
        // Between 600 and 900 the donation block stands in the corner and no longer in the
        // row - the height it frees belongs to the image. Here too a lower bound,
        // otherwise only a strip of it remains.
        [theme.breakpoints.between('sm', 'md')]: {
            minHeight: 'clamp(120px, 22svh, 320px)',
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
            /*
             * Full width instead of 80 percent. The image brings a wide transparent margin all around, in which
             * the glow fades out cleanly - the margin counts towards the width, so the little houses inside are
             * drawn smaller than the box suggests. It cannot be cut away: then the glow breaks off at the edge
             * and a rectangle stands on the background.
             */
            maxWidth: '100%',
            height: '100%',
            objectFit: 'contain',
            // An optical nudge, not a layout change: `transform` moves the drawing
            // without touching the box, so the height budget the banner is balanced on
            // stays exactly as it was. The 34 px put the right edge of the picture on
            // the same line as the right edge of the button below it, which is as far
            // right as it can go without leaving the column.
            transform: 'translate(0, 14px)',
        },
        // as on the phone: the factor recovers the height the transparent margin of the
        // image costs, without changing the box
        [theme.breakpoints.between('sm', 'md')]: {
            // the offset to the right as a share of the image width, not as a fixed number:
            // otherwise the right house hangs over the edge at 620 pixels
            transform: 'translate(24%, 14px) scale(1.6)',
        },
        // on a phone it moves 50 px further right, past the edge of the column, and sits
        // 50 px higher than elsewhere - it follows the photo behind it
        [theme.breakpoints.down('sm')]: {
            /*
             * The transparent margin of the image counts towards the height, so the little houses are drawn
             * smaller inside it. On the phone the factor recovers that: it only enlarges the drawing, the box
             * and with it the height calculation of the banner stay as they are.
             */
            transform: 'translate(50px, -1px) scale(1.4)',
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
        // like the evidence line below the button: the statement steps back, the
        // call to action stands at full strength. The background of the stage is dark in both themes,
        // half white comes to 5.3:1 here and thus clearly above the required 4.5:1.
        color: 'rgba(255, 255, 255, 0.55)',
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
        // the note gives up its fixed width here, otherwise it pulls the block apart
        // to 222 again. It does take on the width of the pair of buttons, though, so that its
        // lines start at the same edge as the buttons below.
        [theme.breakpoints.between('sm', 'md')]: {
            width: 'auto',
            alignSelf: 'stretch',
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
    /** the call to action, the second line of the donation note - it carries the weight */
    supportTextStrong: {
        color: '#FFFFFF',
    },
    supportIcons: {
        display: 'flex',
        // the two sit as close together as the pair still reads as two buttons; the note
        // above takes the same width, so both blocks share their left and right edge
        gap: 16,
        width: `${SUPPORT_BLOCK_WIDTH}px`,
        justifyContent: 'space-between',
        [theme.breakpoints.between('sm', 'md')]: {
            width: 'auto',
            justifyContent: 'flex-end',
            gap: '10px',
        },
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
        [theme.breakpoints.down('sm')]: {
            width: '56px',
            height: '36px',
            padding: theme.spacing(0.5),
            // The frame is 36 high, but the touch target stays 44: the invisible
            // area above and below catches the finger without making the button
            // look heavier.
            position: 'relative',
            '&::after': {
                content: '""',
                position: 'absolute',
                left: 0,
                right: 0,
                top: '-4px',
                bottom: '-4px',
            },
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
            width: '52px',
            height: '36px',
            padding: theme.spacing(0.75),
            // The frame is 36 high, but the touch target stays 44: the invisible
            // area above and below catches the finger without making the button
            // look heavier.
            position: 'relative',
            '&::after': {
                content: '""',
                position: 'absolute',
                left: 0,
                right: 0,
                top: '-4px',
                bottom: '-4px',
            },
        },
    },
    paypalIconImage: {
        width: '20px',
        height: '26px',
        [theme.breakpoints.down('sm')]: {
            width: '13px',
            height: '17px',
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
            height: '18px',
        },
    },
}));
