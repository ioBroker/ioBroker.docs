import { makeStyles } from '../../theme';

export const useStyles = makeStyles()(theme => ({
    pageWrapper: {
        width: '100%',
        overflow: 'hidden',
        position: 'relative',
    },
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
        marginBottom: '32px',
        [theme.breakpoints.down('sm')]: { fontSize: '16px' },
    },

    /* ------------------------------------------------------ the headline row */
    // Four numbers, so four stat tiles - a bar chart of four unrelated measures
    // would invite a comparison that means nothing.
    kpiRow: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(min(200px, 100%), 1fr))',
        gap: '16px',
        marginBottom: '32px',
    },
    kpiTile: {
        boxSizing: 'border-box',
        minWidth: 0,
        borderRadius: `${theme.custom.radius.card}px`,
        padding: '20px 24px',
        background: theme.custom.surfaces.surface,
        boxShadow: theme.custom.elevation.card,
        [theme.breakpoints.down('sm')]: { padding: '16px' },
    },
    kpiLabel: {
        fontFamily: theme.typography.fontFamily,
        fontSize: '14px',
        lineHeight: 1.4,
        color: theme.custom.textSubtle,
        marginBottom: '6px',
    },
    kpiValue: {
        fontFamily: theme.typography.h1.fontFamily,
        fontWeight: 400,
        fontSize: '34px',
        lineHeight: 1.1,
        color: theme.custom.textHeading,
        overflowWrap: 'anywhere',
        [theme.breakpoints.down('sm')]: { fontSize: '28px' },
    },
    /**
     * The date tile. A date is not a magnitude - set in the display face at the size
     * of the counts it wrapped onto three lines and pulled the whole row out of
     * shape, while inviting a comparison with numbers it has nothing to do with.
     */
    kpiValueDate: {
        fontFamily: theme.typography.fontFamily,
        fontWeight: 600,
        fontSize: '20px',
        letterSpacing: 0,
    },
    kpiNote: {
        // `&&` doubles the class: MUI's own Typography style would otherwise win
        // or lose depending on which stylesheet was injected first
        '&&': {
            fontSize: theme.custom.reading.small.fontSize,
            lineHeight: theme.custom.reading.small.lineHeight,
        },
        fontFamily: theme.typography.fontFamily,
        color: theme.custom.textSubtle,
        marginTop: '6px',
    },

    /* ----------------------------------------------------------- the sections */
    sectionGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(min(420px, 100%), 1fr))',
        gap: '24px',
        marginBottom: '24px',
    },
    card: {
        boxSizing: 'border-box',
        minWidth: 0,
        borderRadius: `${theme.custom.radius.card}px`,
        padding: '24px',
        background: theme.custom.surfaces.surface,
        boxShadow: theme.custom.elevation.card,
        marginBottom: '24px',
        [theme.breakpoints.down('sm')]: { padding: '20px 16px' },
    },
    cardInGrid: {
        marginBottom: 0,
        display: 'flex',
        flexDirection: 'column',
    },
    cardTitle: {
        fontFamily: theme.typography.h1.fontFamily,
        fontWeight: 400,
        fontSize: '20px',
        lineHeight: 1.2,
        textTransform: 'uppercase',
        color: theme.custom.textHeading,
        minWidth: 0,
        overflowWrap: 'anywhere',
    },
    /**
     * Every section says which population it is a share of. The fields are reported
     * independently - a country share is a share of the installations that report a
     * country, not of all of them - and a chart that hides that reads as if the
     * missing third did not exist.
     */
    cardBase: {
        // `&&` doubles the class: MUI's own Typography style would otherwise win
        // or lose depending on which stylesheet was injected first
        '&&': {
            fontSize: theme.custom.reading.small.fontSize,
            lineHeight: theme.custom.reading.small.lineHeight,
        },
        fontFamily: theme.typography.fontFamily,
        color: theme.custom.textSubtle,
        marginTop: '4px',
        marginBottom: '16px',
    },
    chart: {
        width: '100%',
        minWidth: 0,
        // no `flex: 1` here: the grid stretches the card, and a chart element that
        // grows past the size ECharts was initialised at squashes its own plot area
        // instead of re-laying it out
    },

    /* ------------------------------------------------------------ the share bar */
    // Two values are a ratio, not a chart. A single track with one filled part says
    // it in one line - a pie of two slices only makes the reader do trigonometry.
    shareRow: {
        display: 'flex',
        alignItems: 'baseline',
        justifyContent: 'space-between',
        gap: '16px',
        flexWrap: 'wrap',
        marginBottom: '10px',
    },
    shareValue: {
        fontFamily: theme.typography.h1.fontFamily,
        fontWeight: 400,
        fontSize: '30px',
        lineHeight: 1.1,
        color: theme.custom.textHeading,
    },
    shareLabel: {
        fontFamily: theme.typography.fontFamily,
        fontSize: theme.custom.reading.body.fontSize,
        lineHeight: theme.custom.reading.body.lineHeight,
        color: theme.custom.textMuted,
    },
    shareTrack: {
        position: 'relative',
        height: '14px',
        borderRadius: `${theme.custom.radius.pill}px`,
        overflow: 'hidden',
        marginBottom: '10px',
    },
    shareFill: {
        position: 'absolute',
        insetBlock: 0,
        left: 0,
        borderRadius: `${theme.custom.radius.pill}px`,
    },
    shareLegend: {
        display: 'flex',
        flexWrap: 'wrap',
        gap: '8px 20px',
        fontFamily: theme.typography.fontFamily,
        fontSize: '14px',
        color: theme.custom.textMuted,
    },
    shareLegendItem: {
        display: 'inline-flex',
        alignItems: 'center',
        gap: '8px',
    },
    shareSwatch: {
        width: '12px',
        height: '12px',
        borderRadius: '3px',
        flexShrink: 0,
    },

    /* ----------------------------------------------------------------- tables */
    // The chart shows the top of a long tail; the table is where the other 1200
    // adapters and 60 countries actually live - and it is the non-colour reading
    // of every chart above it.
    tableTools: {
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        flexWrap: 'wrap',
        marginBottom: '12px',
    },
    search: {
        flex: '1 1 260px',
        minWidth: 0,
        '& .MuiOutlinedInput-root': {
            height: `${theme.custom.control.compactHeight}px`,
            borderRadius: `${theme.custom.radius.control}px`,
            background: theme.custom.surfaces.canvas,
            fontFamily: theme.typography.fontFamily,
            fontSize: '15px',
        },
        '& .MuiOutlinedInput-notchedOutline': { borderColor: theme.custom.hairlineStrong },
    },
    tableCount: {
        // `&&` doubles the class: MUI's own Typography style would otherwise win
        // or lose depending on which stylesheet was injected first
        '&&': {
            fontSize: theme.custom.reading.small.fontSize,
            lineHeight: theme.custom.reading.small.lineHeight,
        },
        fontFamily: theme.typography.fontFamily,
        color: theme.custom.textSubtle,
    },
    tableScroll: {
        // a wide table scrolls inside its own card; the page never scrolls sideways
        overflowX: 'auto',
        maxHeight: '420px',
        overflowY: 'auto',
    },
    table: {
        width: '100%',
        borderCollapse: 'collapse',
        fontFamily: theme.typography.fontFamily,
        fontSize: theme.custom.reading.small.fontSize,
        lineHeight: theme.custom.reading.small.lineHeight,
    },
    th: {
        position: 'sticky',
        top: 0,
        zIndex: 1,
        textAlign: 'left',
        padding: '10px 12px',
        fontWeight: 600,
        color: theme.custom.textSubtle,
        background: theme.custom.surfaces.surface,
        borderBottom: `1px solid ${theme.custom.hairlineStrong}`,
        whiteSpace: 'nowrap',
    },
    thNumeric: { textAlign: 'right' },
    td: {
        padding: '9px 12px',
        color: theme.palette.text.primary,
        borderBottom: `1px solid ${theme.custom.hairline}`,
    },
    tdNumeric: {
        textAlign: 'right',
        fontVariantNumeric: 'tabular-nums',
        whiteSpace: 'nowrap',
    },
    tdMuted: { color: theme.custom.textSubtle },

    /* -------------------------------------------------------------- the map */
    // Google is a third party: the frame loads only after the reader asks for it,
    // so nothing leaves the browser before that.
    mapPlaceholder: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        gap: '16px',
        padding: '32px 24px',
        borderRadius: `${theme.custom.radius.card}px`,
        background: theme.custom.surfaces.raised,
        boxShadow: `inset 0 0 0 1px ${theme.custom.hairline}`,
    },
    mapNote: {
        fontFamily: theme.typography.fontFamily,
        fontSize: theme.custom.reading.body.fontSize,
        lineHeight: theme.custom.reading.body.lineHeight,
        color: theme.custom.textMuted,
        maxWidth: '620px',
    },
    /** what the map is showing, in words - the clusters themselves only say "many" */
    mapCount: {
        fontFamily: theme.typography.fontFamily,
        fontSize: '13px',
        color: theme.custom.textSubtle,
        marginTop: '10px',
    },
    mapFrame: {
        width: '100%',
        height: '520px',
        border: 'none',
        borderRadius: `${theme.custom.radius.card}px`,
        display: 'block',
        [theme.breakpoints.down('sm')]: { height: '360px' },
    },

    /* -------------------------------------------------------------- states */
    message: {
        fontFamily: theme.typography.fontFamily,
        fontSize: theme.custom.reading.body.fontSize,
        lineHeight: theme.custom.reading.body.lineHeight,
        color: theme.custom.textMuted,
    },
}));
