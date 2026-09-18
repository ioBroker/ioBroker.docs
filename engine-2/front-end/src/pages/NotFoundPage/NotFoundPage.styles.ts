import { makeStyles } from '../../theme';

/**
 * The page a reader sees when the address names nothing.
 *
 * The picture is one word set in the display face, with the light of the design kit behind it -
 * no image file, so it is sharp at any size and needs no second version for the light theme.
 */
export const useStyles = makeStyles()(theme => ({
    pageRoot: {
        position: 'relative',
        // the header is 64 px and stands above the page, so this is the rest of the window
        minHeight: 'calc(100svh - 64px)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: `40px ${theme.custom.layout.gutter.lg}px 64px`,
        overflow: 'hidden',
        [theme.breakpoints.down('sm')]: {
            padding: `24px ${theme.custom.layout.gutter.sm}px 48px`,
        },
    },
    /* the light behind the number - the same one the sections of the home page stand in */
    glow: {
        position: 'absolute',
        top: '30%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 'min(1200px, 130%)',
        height: 'min(760px, 80%)',
        background: theme.custom.glow.strong,
        filter: 'blur(44px)',
        display: theme.palette.mode === 'light' ? 'none' : 'block',
        pointerEvents: 'none',
        zIndex: 0,
    },
    content: {
        position: 'relative',
        zIndex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        maxWidth: theme.custom.layout.contentMaxWidth,
        width: '100%',
    },
    /*
     * Audiowide by name, not through `--font-display`: the Russian interface swaps that variable
     * for Roboto because Audiowide carries no Cyrillic. Digits it does carry, and the number is to
     * look the same in every language.
     */
    number: {
        fontFamily: "'Audiowide', 'Roboto', Arial, sans-serif",
        fontSize: 'clamp(110px, 20vw, 260px)',
        lineHeight: 1,
        letterSpacing: '0.02em',
        // darker than the light it stands in, so the number reads as cut out of it
        color: theme.palette.mode === 'light' ? theme.palette.primary.main : theme.custom.surfaces.overlay,
        opacity: theme.palette.mode === 'light' ? 0.22 : 1,
        marginBottom: '28px',
        userSelect: 'none',
        [theme.breakpoints.down('sm')]: {
            marginBottom: '20px',
        },
    },
    /* the joke: the line that sets it up and the line that lands it */
    jokeLine: {
        fontFamily: 'var(--font-display)',
        fontSize: '26px',
        lineHeight: 1.35,
        letterSpacing: '-0.01em',
        color: theme.custom.textHeading,
        [theme.breakpoints.down('md')]: {
            fontSize: '22px',
        },
        [theme.breakpoints.down('sm')]: {
            fontSize: '18px',
        },
    },
    jokePunchline: {
        marginTop: '8px',
        marginBottom: '40px',
        [theme.breakpoints.down('sm')]: {
            marginBottom: '28px',
        },
    },
    lead: {
        fontSize: '15px',
        lineHeight: 1.6,
        color: theme.custom.textMuted,
        maxWidth: '620px',
    },
    hint: {
        fontSize: '15px',
        lineHeight: 1.6,
        color: theme.custom.textSubtle,
        maxWidth: '620px',
        marginTop: '4px',
        marginBottom: '32px',
    },
    homeButton: {
        minWidth: '260px',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '12px',
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
    /* the way on, for a reader who was looking for something else entirely */
    links: {
        marginTop: '28px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexWrap: 'wrap',
        columnGap: '10px',
        rowGap: '6px',
        fontFamily: 'var(--font-display)',
        fontSize: '13px',
        letterSpacing: '0.06em',
        textTransform: 'uppercase',
        color: theme.custom.textSubtle,
    },
    link: {
        color: theme.custom.textSubtle,
        textDecoration: 'none',
        '&:hover': {
            color: theme.custom.textColorHover,
        },
    },
    slash: {
        color: theme.palette.primary.main,
    },
}));
