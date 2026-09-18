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
    /* bottom zone: the joke, the one plain sentence, the two buttons */
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
        letterSpacing: '0.16em',
        textTransform: 'uppercase',
        // blue like the // that opens it: textAccent is the brand blue on dark and steps down to
        // the readable deep blue on light, so the label stays legible in both themes
        color: theme.custom.textAccent,
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
        // one step up from the canvas on dark, so the number reads as a quiet surface, not a shout
        color: theme.palette.mode === 'light' ? theme.palette.primary.main : theme.custom.surfaces.overlay,
        opacity: theme.palette.mode === 'light' ? 0.22 : 1,
        userSelect: 'none',
    },
    /*
     * The joke: plain running text in Roboto, not the display face. It is the largest line on the
     * page but it is not a heading - six of them are drawn at random, and the h1 above stays fixed.
     */
    jokeLine: {
        fontFamily: "'Roboto', Arial, sans-serif",
        fontWeight: 400,
        fontSize: '24px',
        lineHeight: 1.2,
        color: theme.custom.textHeading,
        maxWidth: '760px',
        [theme.breakpoints.down('md')]: {
            fontSize: '20px',
        },
        [theme.breakpoints.down('sm')]: {
            fontSize: '17px',
            lineHeight: 1.25,
        },
    },
    jokePunchline: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(5),
        [theme.breakpoints.down('sm')]: {
            marginBottom: theme.spacing(3.5),
        },
    },
    lead: {
        fontSize: '16px',
        lineHeight: 1.6,
        color: theme.custom.textMuted,
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
    slash: {
        color: theme.palette.primary.main,
    },
}));
