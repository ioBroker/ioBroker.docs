import { makeStyles } from '../theme';

export const useStyles = makeStyles()(theme => ({
    /**
     * The dialog is a surface step above the page, not a framed white box: the old paper
     * drew a grey border around #FFFFFF and ignored the dark theme entirely.
     */
    dialogPaper: {
        boxSizing: 'border-box',
        width: '100%',
        maxWidth: '920px',
        backgroundColor: theme.custom.surfaces.surface,
        backgroundImage: 'none',
        color: theme.palette.text.primary,
        borderRadius: `${theme.custom.radius.card}px`,
        border: `1px solid ${theme.custom.hairline}`,
        boxShadow: theme.custom.elevation.overlay,
        padding: '32px',
        position: 'relative',
        overflow: 'hidden',
        [theme.breakpoints.down('sm')]: {
            padding: '24px 16px',
            borderRadius: `${theme.custom.radius.group}px`,
        },
    },

    // a 44 px touch target around a small cross - the same close the support dialog has
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

    header: {
        // the cross sits in the top right corner - the heading keeps clear of it
        paddingRight: `${theme.custom.control.height}px`,
        marginBottom: '24px',
    },
    title: {
        '&&': {
            fontFamily: 'Audiowide, sans-serif',
            fontSize: '22px',
            lineHeight: 1.2,
        },
        fontWeight: 400,
        letterSpacing: '-0.02em',
        textTransform: 'uppercase',
        color: theme.custom.textHeading,
        marginBottom: '8px',
        overflowWrap: 'anywhere',
        [theme.breakpoints.down('sm')]: {
            '&&': { fontSize: '18px' },
        },
    },
    // the headline number of the dialog - left aligned like everything else on the site
    total: {
        '&&': {
            fontFamily: theme.typography.fontFamily,
            fontSize: theme.custom.reading.lead.fontSize,
            lineHeight: theme.custom.reading.lead.lineHeight,
        },
        color: theme.custom.textMuted,
    },
    totalValue: {
        color: theme.palette.text.primary,
        fontWeight: 700,
        fontVariantNumeric: 'tabular-nums',
    },

    content: {
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '24px',
        alignItems: 'start',
        [theme.breakpoints.down('md')]: {
            gridTemplateColumns: '1fr',
            gap: '16px',
        },
    },
    card: {
        boxSizing: 'border-box',
        minWidth: 0,
        background: theme.custom.surfaces.raised,
        borderRadius: `${theme.custom.radius.card}px`,
        padding: '16px',
    },
    tableCard: {
        maxHeight: '340px',
        overflowY: 'auto',
        // The head stays in view while the rows scroll past it, and for that it has to reach the
        // edges of the card - so the side padding sits on the head and on the rows, not here.
        padding: '0 0 16px',
        '&::-webkit-scrollbar': { width: '8px' },
        '&::-webkit-scrollbar-track': { background: 'transparent' },
        '&::-webkit-scrollbar-thumb': {
            background: theme.custom.hairlineStrong,
            borderRadius: `${theme.custom.radius.pill}px`,
        },
    },
    emptyChart: {
        display: 'flex',
        height: '240px',
        alignItems: 'center',
        justifyContent: 'center',
        color: theme.custom.textSubtle,
        fontSize: theme.custom.reading.small.fontSize,
    },

    /* ------------------------------------------------------------- the table */
    tableHeader: {
        // in view whatever the list does below it - the card is the scroll container
        position: 'sticky',
        top: 0,
        zIndex: 1,
        // opaque, or the rows would show through while they pass underneath
        background: theme.custom.surfaces.raised,
        display: 'grid',
        gridTemplateColumns: '1fr 88px 64px',
        gap: '8px',
        padding: '16px 16px 8px',
        borderBottom: `1px solid ${theme.custom.hairline}`,
    },
    // a sortable column head is a button, so it can be reached with the keyboard
    sortHeader: {
        all: 'unset',
        boxSizing: 'border-box',
        display: 'inline-flex',
        alignItems: 'center',
        gap: '4px',
        cursor: 'pointer',
        borderRadius: `${theme.custom.radius.chip}px`,
        padding: '2px 4px',
        margin: '-2px -4px',
        fontFamily: theme.typography.fontFamily,
        fontSize: theme.custom.reading.caption.fontSize,
        fontWeight: 700,
        color: theme.custom.textSubtle,
        textTransform: 'uppercase',
        letterSpacing: '0.02em',
        '&:hover': { color: theme.palette.text.primary },
        '&:focus-visible': { boxShadow: theme.custom.focusRing },
    },
    columnLabel: {
        fontSize: theme.custom.reading.caption.fontSize,
        fontWeight: 700,
        color: theme.custom.textSubtle,
        textTransform: 'uppercase',
        letterSpacing: '0.02em',
        textAlign: 'right',
    },
    sortArrow: {
        color: theme.palette.primary.main,
    },
    tableRow: {
        display: 'grid',
        gridTemplateColumns: '1fr 88px 64px',
        gap: '8px',
        padding: '8px 16px',
        fontSize: theme.custom.reading.small.fontSize,
        lineHeight: theme.custom.reading.small.lineHeight,
        color: theme.palette.text.primary,
        borderBottom: `1px solid ${theme.custom.hairline}`,
        '&:last-of-type': { borderBottom: 'none' },
    },
    cellNumber: {
        textAlign: 'right',
        fontVariantNumeric: 'tabular-nums',
    },
    cellShare: {
        textAlign: 'right',
        fontVariantNumeric: 'tabular-nums',
        color: theme.custom.textMuted,
    },
}));
