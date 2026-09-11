import { makeStyles } from '../../theme';

export const useStyles = makeStyles()(theme => ({
    pageWrapper: {
        width: '100%',
        overflow: 'hidden',
        position: 'relative',
    },
    pageContainer: {
        textAlign: 'left',
        width: '100%',
        maxWidth: theme.custom.layout.contentMaxWidth + 2 * theme.custom.layout.gutter.lg,
        margin: 0,
        padding: `0 ${theme.custom.layout.gutter.lg}px ${theme.custom.layout.section.lg}px`,
        boxSizing: 'border-box',
        [theme.breakpoints.down('md')]: {
            padding: `0 ${theme.custom.layout.gutter.md}px ${theme.custom.layout.section.md}px`,
        },
        [theme.breakpoints.down('sm')]: {
            padding: `0 ${theme.custom.layout.gutter.sm}px ${theme.custom.layout.section.md}px`,
        },
    },

    searchRow: {
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        boxSizing: 'border-box',
        height: `${theme.custom.control.height}px`,
        padding: '0 16px',
        marginBottom: '20px',
        background: theme.custom.surfaces.raised,
        border: `1px solid ${theme.custom.hairline}`,
        borderRadius: `${theme.custom.radius.control}px`,
        '&:focus-within': { boxShadow: theme.custom.focusRing },
    },
    searchIcon: {
        display: 'flex',
        color: theme.custom.textSubtle,
        flex: '0 0 auto',
    },
    searchInput: {
        all: 'unset',
        flex: '1 1 auto',
        minWidth: 0,
        fontFamily: theme.typography.fontFamily,
        fontSize: '16px',
        color: theme.palette.text.primary,
        '&::placeholder': { color: theme.custom.textSubtle },
    },

    filters: {
        display: 'flex',
        flexWrap: 'wrap',
        gap: '8px',
        marginBottom: '8px',
    },
    filter: {
        all: 'unset',
        boxSizing: 'border-box',
        cursor: 'pointer',
        padding: '6px 14px',
        borderRadius: `${theme.custom.radius.pill}px`,
        border: `1px solid ${theme.custom.hairline}`,
        fontSize: '13px',
        fontWeight: 700,
        textTransform: 'uppercase',
        letterSpacing: '0.02em',
        color: theme.custom.textSubtle,
        '&:hover': { color: theme.palette.text.primary },
        '&:focus-visible': { boxShadow: theme.custom.focusRing },
    },
    filterActive: {
        background: theme.palette.primary.main,
        borderColor: theme.palette.primary.main,
        color: theme.palette.mode === 'dark' ? theme.custom.surfaces.canvas : '#FFFFFF',
        '&:hover': { color: theme.palette.mode === 'dark' ? theme.custom.surfaces.canvas : '#FFFFFF' },
    },
    filterCount: {
        marginLeft: '6px',
        opacity: 0.75,
        fontVariantNumeric: 'tabular-nums',
    },

    summary: {
        fontSize: theme.custom.reading.small.fontSize,
        color: theme.custom.textSubtle,
        marginBottom: '20px',
    },

    hit: {
        display: 'block',
        textDecoration: 'none',
        padding: '16px 0',
        borderTop: `1px solid ${theme.custom.hairline}`,
        '&:last-of-type': { borderBottom: `1px solid ${theme.custom.hairline}` },
    },
    hitTitle: {
        fontSize: '17px',
        fontWeight: 600,
        color: theme.palette.text.primary,
        marginBottom: '4px',
        overflowWrap: 'anywhere',
        transition: 'color 0.15s ease',
    },
    hitMeta: {
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        gap: '8px',
        fontSize: '12px',
        color: theme.custom.textSubtle,
        marginBottom: '6px',
        overflowWrap: 'anywhere',
    },
    hitBadge: {
        padding: '1px 8px',
        borderRadius: `${theme.custom.radius.pill}px`,
        border: `1px solid ${theme.custom.hairline}`,
        textTransform: 'uppercase',
        fontWeight: 700,
        letterSpacing: '0.03em',
    },
    hitSnippet: {
        fontSize: theme.custom.reading.small.fontSize,
        lineHeight: theme.custom.reading.small.lineHeight,
        color: theme.custom.textMuted,
    },
    /** what the query matched */
    mark: {
        background: 'transparent',
        color: theme.palette.primary.main,
        fontWeight: 700,
    },

    message: {
        padding: '40px 0',
        color: theme.custom.textSubtle,
        fontSize: theme.custom.reading.lead.fontSize,
    },

    pager: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '16px',
        marginTop: '28px',
    },
    pagerButton: {
        all: 'unset',
        boxSizing: 'border-box',
        cursor: 'pointer',
        minHeight: `${theme.custom.control.height}px`,
        padding: '8px 20px',
        borderRadius: `${theme.custom.radius.control}px`,
        boxShadow: `inset 0 0 0 1px ${theme.custom.hairlineStrong}`,
        fontSize: '15px',
        color: theme.palette.text.primary,
        '&:hover': { background: theme.custom.surfaces.raised },
        '&:focus-visible': { boxShadow: theme.custom.focusRing },
        '&[disabled]': { opacity: 0.4, cursor: 'default', background: 'none' },
    },
    pagerPosition: {
        fontSize: theme.custom.reading.small.fontSize,
        color: theme.custom.textSubtle,
        fontVariantNumeric: 'tabular-nums',
    },
}));
