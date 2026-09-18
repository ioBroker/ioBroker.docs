import { makeStyles } from '../../theme';

/**
 * The page a reader sees when the address names nothing.
 *
 * Two groups stand spread over the height: the status above (label and number) and the human part
 * below (joke, one sentence, buttons). The picture is one word set in the display face, a quiet blue
 * surface a step above the canvas - no image file, so it is sharp at any size and needs no second
 * version for the light theme.
 */
export const useStyles = makeStyles()(theme => ({
    pageRoot: {
        position: 'relative',
        // the header is 64 px and stands above the page, so this is the rest of the window
        minHeight: 'calc(100svh - 64px)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        // centres the content block when it is capped on a tall window, so it never sticks to the edges
        justifyContent: 'center',
        textAlign: 'center',
        padding: `${theme.spacing(5)} ${theme.custom.layout.gutter.lg}px ${theme.spacing(8)}`,
        overflow: 'hidden',
        [theme.breakpoints.down('sm')]: {
            padding: `${theme.spacing(3)} ${theme.custom.layout.gutter.sm}px ${theme.spacing(6)}`,
        },
    },
    /*
     * The two groups are pushed to the top and bottom of this box. The box grows to the window but is
     * capped, so on a very tall screen the number does not climb under the header and the buttons do
     * not fall to the bottom edge - the whole capped box is then centred by `pageRoot`.
     */
    content: {
        position: 'relative',
        zIndex: 1,
        width: '100%',
        maxWidth: theme.custom.layout.contentMaxWidth,
        flex: '1 1 auto',
        maxHeight: theme.spacing(80),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
        [theme.breakpoints.down('sm')]: {
            // on a phone the two groups sit close and centred, so the page fits without scrolling
            flex: '0 1 auto',
            maxHeight: 'none',
            justifyContent: 'center',
            gap: theme.spacing(5),
        },
    },
    /* top zone: the status - the heading and the number */
    top: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%',
    },
    /* middle zone: the joke alone, so it sits between the status above and the way on below */
    middle: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%',
    },
    /* bottom zone: the one plain sentence and the two buttons */
    bottom: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%',
    },
    /*
     * The heading. It is the h1 of the page, but it wears the section-label style, not the 30 px
     * display size: the status has to read as a quiet mark above the number while the joke below is
     * the large line. `--font-display` so the Russian interface swaps it to Roboto with the rest.
     */
    label: {
        fontFamily: 'var(--font-display)',
        fontSize: '13px',
        lineHeight: 1,
        // the label tracking of the system; Audiowide is a wide face already and needs little more
        letterSpacing: '0.04em',
        textTransform: 'uppercase',
        /*
         * The brand blue, the same in both themes, so the line and the `//` that opens it are one
         * mark and never fall apart into two blues. On white that blue reaches about 3.6:1, under
         * the 4.5:1 a reading text is held to; it is carried here as a short signature line above
         * the number, not as running text, and the lead below says the same thing in full contrast.
         */
        color: theme.palette.primary.main,
        marginBottom: theme.spacing(2.25),
        [theme.breakpoints.down('sm')]: {
            fontSize: '12px',
        },
    },
    /*
     * Audiowide by name, not through `--font-display`: the Russian interface swaps that variable
     * for Roboto because Audiowide carries no Cyrillic. Digits it does carry, and the number is to
     * look the same in every language.
     */
    number: {
        fontFamily: "'Audiowide', 'Roboto', Arial, sans-serif",
        fontSize: 'clamp(80px, 15vw, 180px)',
        lineHeight: 1,
        letterSpacing: '0.02em',
        /*
         * The brand blue of the `//` that opens the heading, worn thin. The number is the same voice
         * as the mark above it, only far back: a surface the eye passes over on the way to the
         * words, not a line it has to read. One value for both themes: the blue carries about as
         * far on white as it does on the dark canvas once it is this far back.
         */
        color: theme.palette.primary.main,
        opacity: 0.1,
        userSelect: 'none',
    },
    /*
     * The joke: plain running text in Roboto, not the display face. It is the largest line on the
     * page but it is not a heading - six of them are drawn at random, and the h1 above stays fixed.
     */
    jokeLine: {
        fontFamily: "'Roboto', Arial, sans-serif",
        fontWeight: 400,
        fontSize: '20px',
        lineHeight: 1.3,
        color: theme.custom.textHeading,
        maxWidth: '760px',
        [theme.breakpoints.down('md')]: {
            fontSize: '18px',
        },
        [theme.breakpoints.down('sm')]: {
            fontSize: '16px',
        },
    },
    jokePunchline: {
        marginTop: theme.spacing(1),
    },
    /*
     * The plain sentence stands a step back from the joke above it: it says what happened for
     * whoever wants to know, and should not compete with the line that carries the tone. That is
     * the subtle reading tone of the system, not an opacity of its own, so it turns with the theme
     * and keeps its contrast floor in both.
     */
    lead: {
        fontSize: '16px',
        lineHeight: 1.6,
        color: theme.custom.textSubtle,
        maxWidth: '620px',
    },
    /* the two ways on: the home page in full, the search still beside it. They stack on a phone. */
    actions: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexWrap: 'wrap',
        gap: theme.spacing(2),
        marginTop: theme.spacing(4),
        [theme.breakpoints.down('sm')]: {
            flexDirection: 'column',
            gap: theme.spacing(1.5),
            width: '100%',
            maxWidth: '320px',
            marginTop: theme.spacing(3),
        },
    },
    homeButton: {
        minWidth: '260px',
        gap: theme.spacing(1.5),
        [theme.breakpoints.down('sm')]: {
            minWidth: 'min(100%, 260px)',
        },
    },
    /* the mark is two-tone; on the blue of the button it is one colour, white */
    homeButtonIcon: {
        width: 22,
        height: 22,
        filter: 'brightness(0) invert(1)',
    },
    searchButton: {
        minWidth: '200px',
        gap: theme.spacing(1.25),
        [theme.breakpoints.down('sm')]: {
            minWidth: 'min(100%, 260px)',
        },
    },
    /* the magnifier takes the button's own colour through `currentColor` in the icon */
    searchIcon: {
        display: 'inline-flex',
        alignItems: 'center',
    },
    /* the mark and the words behind it are one line, so the colour lives on the heading itself */
    slash: {
        color: 'inherit',
    },
}));
