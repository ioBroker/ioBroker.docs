import { makeStyles } from '../../theme';

export const useStyles = makeStyles()(theme => ({
    pageWrapper: {
        width: '100%',
        overflow: 'hidden',
        position: 'relative',
    },
    pageContainer: {
        // Centred like the single post, so the two blog pages stand in the same place. The column
        // may grow well past the standard content width on wide screens, it just stops before the
        // page sprawls across a 4K desktop - and beyond that width the rest is split evenly.
        width: '100%',
        maxWidth: 2560,
        margin: '0 auto',
        padding: `${theme.custom.layout.section.md}px ${theme.custom.layout.gutter.lg}px ${theme.custom.layout.section.lg}px`,
        boxSizing: 'border-box',
        [theme.breakpoints.down('md')]: {
            padding: `${theme.custom.layout.section.sm}px ${theme.custom.layout.gutter.md}px ${theme.custom.layout.section.md}px`,
        },
        [theme.breakpoints.down('sm')]: {
            padding: `${theme.custom.layout.section.sm}px ${theme.custom.layout.gutter.sm}px ${theme.custom.layout.section.md}px`,
        },
    },
    header: {
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'space-between',
        gap: '32px',
        marginBottom: '40px',
        [theme.breakpoints.down('sm')]: {
            flexDirection: 'column',
            alignItems: 'flex-start',
            gap: '16px',
            marginBottom: '32px',
        },
    },
    headerText: {
        display: 'flex',
        flexDirection: 'column',
    },
    subtitle: {
        // `&&` doubles the class: MUI's own Typography style would otherwise win
        // or lose depending on which stylesheet was injected first
        '&&': {
            fontSize: theme.custom.reading.lead.fontSize,
            lineHeight: theme.custom.reading.lead.lineHeight,
        },
        maxWidth: '620px',
        color: theme.custom.textMuted,
        // it carried no size of its own and simply inherited - which is why the blog
        // intro read a step smaller than the same line on every other page
    },
    /* Seit dem 10.09.2026 steht hier nur noch der Verweis auf den RSS-Strom - die Reihe
       der Filter ist entfallen. Die Reihe selbst bleibt: sie haelt ihn rechts oben. */
    filterRow: {
        display: 'flex',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '8px',
        [theme.breakpoints.down('sm')]: {
            gap: '6px',
        },
    },
    rssLink: {
        flexShrink: 0,
        height: '32px',
        width: '32px',
        borderRadius: theme.custom.radius.pill,
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        textDecoration: 'none',
        color: theme.palette.mode === 'dark' ? theme.palette.primary.light : theme.palette.secondary.main,
        backgroundColor: theme.custom.surfaces.surface,
        transition: 'background-color 0.2s ease',
        '&:hover': {
            backgroundColor: theme.custom.surfaces.raised,
        },
        '&:focus-visible': {
            outline: 'none',
            boxShadow: theme.custom.focusRing,
        },
    },
    grid: {
        display: 'grid',
        // the card width leads: ~600 px each, so the number of columns follows the
        // window - two on a laptop, three from ~1900 px, four on a very wide desktop
        gridTemplateColumns: 'repeat(auto-fill, minmax(560px, 1fr))',
        gap: `${theme.custom.layout.grid}px`,
        alignItems: 'stretch',
        [theme.breakpoints.down(1024)]: {
            gridTemplateColumns: 'minmax(0, 1fr)',
            gap: '20px',
        },
    },
    card: {
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        borderRadius: `${theme.custom.radius.card}px`,
        border: 'none',
        backgroundColor: theme.custom.surfaces.surface,
        backgroundImage: 'none',
        overflow: 'hidden',
        boxShadow: theme.custom.elevation.card,
        transition: 'background-color 0.2s ease, box-shadow 0.2s ease',
        '&:hover': {
            backgroundColor: theme.custom.surfaces.raised,
            boxShadow: theme.custom.elevation.raised,
        },
    },
    cardImage: {
        display: 'block',
        width: '100%',
        height: 'auto',
        aspectRatio: '1280 / 250',
        objectFit: 'cover',
        objectPosition: 'center',
        cursor: 'pointer',
        border: 'none',
    },
    cardImagePlaceholder: {
        width: '100%',
        aspectRatio: '1280 / 250',
        backgroundColor: theme.custom.surfaces.raised,
    },
    cardBody: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
        padding: '24px',
        [theme.breakpoints.down('sm')]: {
            padding: '20px 16px',
        },
    },
    cardMeta: {
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
    },
    cardType: {
        display: 'inline-flex',
        alignItems: 'center',
        padding: '5px 10px',
        borderRadius: theme.custom.radius.pill,
        fontSize: '12px',
        fontWeight: 700,
        letterSpacing: '0.09em',
        textTransform: 'uppercase',
        whiteSpace: 'nowrap',
        backgroundColor: theme.custom.surfaces.raised,
        color: theme.palette.mode === 'dark' ? theme.palette.primary.light : theme.palette.secondary.main,
    },
    cardDate: {
        fontSize: '13px',
        lineHeight: 1.4,
        color: theme.custom.textSubtle,
    },
    cardTitle: {
        fontFamily: 'Audiowide, sans-serif',
        fontWeight: 400,
        fontSize: '20px',
        lineHeight: '26px',
        letterSpacing: '-0.02em',
        color: theme.palette.text.primary,
        cursor: 'pointer',
        display: '-webkit-box',
        WebkitLineClamp: 2,
        WebkitBoxOrient: 'vertical',
        overflow: 'hidden',
        '&:hover': {
            color: theme.palette.primary.main,
        },
        [theme.breakpoints.down('sm')]: {
            fontSize: '18px',
            lineHeight: '24px',
        },
    },
    cardDesc: {
        // `&&` doubles the class: MUI's own Typography style would otherwise win
        // or lose depending on which stylesheet was injected first
        '&&': {
            fontSize: theme.custom.reading.small.fontSize,
            lineHeight: theme.custom.reading.small.lineHeight,
        },
        fontWeight: 400,
        letterSpacing: '0.01em',
        color: theme.custom.textMuted,
        display: '-webkit-box',
        WebkitLineClamp: 4,
        WebkitBoxOrient: 'vertical',
        overflow: 'hidden',
    },
    cardDivider: {
        height: '1px',
        backgroundColor: theme.custom.hairline,
        marginTop: 'auto',
    },
    cardFooter: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '12px',
    },
    readButton: {
        flexShrink: 0,
        height: theme.custom.control.height,
        padding: '0 24px',
        border: 'none',
        borderRadius: theme.custom.radius.control,
        cursor: 'pointer',
        fontFamily: 'Audiowide, sans-serif',
        fontSize: '15px',
        fontWeight: 400,
        letterSpacing: '0.02em',
        textTransform: 'uppercase',
        color: '#FFFFFF',
        backgroundColor: theme.palette.secondary.main,
        transition: 'background-color 0.2s ease',
        '&:hover': {
            backgroundColor: theme.palette.secondary.light,
        },
        '&:active': {
            backgroundColor: theme.palette.secondary.dark,
        },
        '&:focus-visible': {
            outline: 'none',
            boxShadow: theme.custom.focusRing,
        },
        [theme.breakpoints.down('sm')]: {
            fontSize: '14px',
            padding: '0 18px',
        },
    },
    cardAuthor: {
        flexShrink: 0,
        fontSize: '14px',
        fontWeight: 400,
        whiteSpace: 'nowrap',
        color: theme.palette.mode === 'dark' ? theme.palette.primary.light : theme.palette.secondary.main,
    },
    message: {
        fontSize: '18px',
        fontWeight: 400,
        color: theme.custom.textMuted,
    },
}));
