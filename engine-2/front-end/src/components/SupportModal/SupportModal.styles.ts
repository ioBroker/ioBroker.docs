import { makeStyles } from '../../theme';

export const useStyles = makeStyles()(theme => ({
    /**
     * The dialog is a surface step above the page, not a framed box: the old paper drew
     * a brand-blue 1 px border around a 1168 x 714 fixed rectangle, so on most screens
     * it was mostly empty. It now takes the height of what is in it.
     */
    dialogPaper: {
        boxSizing: 'border-box',
        width: '100%',
        maxWidth: '880px',
        backgroundColor: theme.custom.surfaces.surface,
        backgroundImage: 'none',
        color: theme.palette.text.primary,
        borderRadius: `${theme.custom.radius.card}px`,
        border: `1px solid ${theme.custom.hairline}`,
        boxShadow: theme.custom.elevation.overlay,
        padding: '40px',
        position: 'relative',
        overflow: 'hidden',
        [theme.breakpoints.down('sm')]: {
            padding: '24px 16px',
            borderRadius: `${theme.custom.radius.group}px`,
        },
    },

    /* -------------------------------------------------------------- the close */
    // a 44 px touch target around a small cross, rather than a 40 px icon that is
    // itself the button
    closeButton: {
        all: 'unset',
        position: 'absolute',
        top: '12px',
        right: '12px',
        boxSizing: 'border-box',
        width: `${theme.custom.control.height}px`,
        height: `${theme.custom.control.height}px`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        borderRadius: `${theme.custom.radius.chip}px`,
        color: theme.custom.textSubtle,
        transition: 'color 0.2s ease, background 0.2s ease',
        '&:hover': {
            color: theme.palette.text.primary,
            background: theme.custom.surfaces.raised,
        },
        '&:focus-visible': {
            outline: 'none',
            boxShadow: theme.custom.focusRing,
        },
    },
    closeIcon: {
        width: '14px',
        height: '14px',
    },

    /* -------------------------------------------------------------- the header */
    header: {
        marginBottom: '32px',
        [theme.breakpoints.down('sm')]: {
            marginBottom: '24px',
        },
    },
    title: {
        fontFamily: 'Audiowide, sans-serif',
        fontWeight: 400,
        fontSize: '28px',
        lineHeight: 1.2,
        letterSpacing: '-0.01em',
        textTransform: 'uppercase',
        color: theme.custom.textHeading,
        // only the heading has to keep clear of the cross in the corner - when this sat
        // on the whole header block it shortened every line of the text below it too,
        // which is what made the paragraph break well before the edge
        paddingRight: `${theme.custom.control.height}px`,
        marginBottom: '12px',
        [theme.breakpoints.down('sm')]: {
            fontSize: '22px',
        },
    },
    subtitle: {
        '&&': {
            fontFamily: theme.typography.fontFamily,
            fontSize: theme.custom.reading.lead.fontSize,
            lineHeight: theme.custom.reading.lead.lineHeight,
        },
        color: theme.palette.text.primary,
        marginBottom: '8px',
    },
    description: {
        '&&': {
            fontFamily: theme.typography.fontFamily,
            fontSize: theme.custom.reading.body.fontSize,
            lineHeight: theme.custom.reading.body.lineHeight,
        },
        color: theme.custom.textMuted,
    },

    /* ------------------------------------------------------------- the options */
    // two ways to help, side by side and of equal weight: the same card shape the
    // installation page uses, so the two pages read as one product
    optionsGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(min(280px, 100%), 1fr))',
        // the second card keeps the height of the first even when its text is shorter,
        // so both buttons end up on one line
        gridAutoRows: '1fr',
        gap: '24px',
        [theme.breakpoints.down('sm')]: {
            // stacked, the two cards are above each other rather than beside each other:
            // equal rows would then only pad the shorter card with empty space, because
            // there is no second button to line its own up with
            gridAutoRows: 'auto',
            gap: '16px',
        },
    },
    option: {
        display: 'flex',
        flexDirection: 'column',
        boxSizing: 'border-box',
        minWidth: 0,
        borderRadius: `${theme.custom.radius.card}px`,
        padding: '24px',
        background: theme.custom.surfaces.raised,
        [theme.breakpoints.down('sm')]: {
            padding: '20px 16px',
        },
    },
    /**
     * The two logos have very different aspect ratios - the PayPal strip is roughly
     * 6:1, the Amazon mark 2:1 - so they are aligned by a common height, not by a
     * width. The old modal gave them 130 px and 163 px boxes, which is what made them
     * look oversized next to everything else in the dialog.
     */
    // the row keeps one height in both cards, whatever the logo in it measures - the
    // text below it starts on the same line on the left and on the right
    logoBox: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
        height: '46px',
        marginBottom: '20px',
        [theme.breakpoints.down('sm')]: {
            height: '38px',
            marginBottom: '16px',
        },
    },
    logo: {
        height: '36px',
        width: 'auto',
        maxWidth: '100%',
        objectFit: 'contain',
        [theme.breakpoints.down('sm')]: {
            height: '30px',
        },
    },
    /**
     * The Amazon mark is drawn as a letter with a thin swoosh under it, so at the same
     * box height it carries much less ink than the PayPal strip beside it and reads as
     * the smaller of the two. It gets the full height of the row instead.
     */
    logoTall: {
        // the file was cropped to its drawing, so this is the height of the mark itself
        height: '32px',
        [theme.breakpoints.down('sm')]: {
            height: '27px',
        },
    },
    optionText: {
        '&&': {
            fontFamily: theme.typography.fontFamily,
            fontSize: theme.custom.reading.small.fontSize,
            lineHeight: theme.custom.reading.small.lineHeight,
        },
        color: theme.palette.text.primary,
        minWidth: 0,
        // whatever height the card has left collects above the button, so the buttons
        // of both cards sit on the same line
        flex: 1,
        marginBottom: '20px',
    },
    // the button is the point of the card and takes its full width
    optionButton: {
        '&&': {
            width: '100%',
            minWidth: 0,
        },
    },

    /* -------------------------------------------------------------- the footer */
    footer: {
        '&&': {
            fontFamily: theme.typography.fontFamily,
            fontSize: theme.custom.reading.caption.fontSize,
            lineHeight: theme.custom.reading.caption.lineHeight,
        },
        // a side note steps back through its own tone, not through opacity
        color: theme.custom.textSubtle,
        marginTop: '24px',
        paddingTop: '16px',
        borderTop: `1px solid ${theme.custom.hairline}`,
    },
}));
