import { makeStyles } from '../../theme';

export const useDocsTableOfContentsStyles = makeStyles()(theme => ({
    // a quiet surface card, no frame
    // the panel is a drop-down under its switch - it overlays the text instead of
    // taking a column of its own
    container: {
        width: '100%',
        padding: '16px',
        borderRadius: `${theme.custom.radius.card}px`,
        backgroundColor: theme.custom.surfaces.surface,
        boxShadow: theme.custom.elevation.overlay,
        maxHeight: 'min(60vh, 520px)',
        overflowY: 'auto',
        '&::-webkit-scrollbar': {
            width: '6px',
        },
        '&::-webkit-scrollbar-track': {
            background: 'transparent',
        },
        '&::-webkit-scrollbar-thumb': {
            background: theme.custom.hairlineStrong,
            borderRadius: `${theme.custom.radius.pill}px`,
        },
    },
    subTitle: {
        display: 'block',
        textDecoration: 'none',
        fontSize: '15px',
        fontWeight: 700,
        color: theme.palette.text.primary,
        marginBottom: '4px',
        cursor: 'pointer',
    },
    list: {
        display: 'flex',
        flexDirection: 'column',
        gap: '6px',
    },
    item: {
        fontSize: '14px',
        lineHeight: 1.4,
        fontWeight: 400,
        color: theme.custom.textMuted,
        cursor: 'pointer',
        transition: 'color 0.2s',
        '&:hover': {
            color: theme.palette.primary.main,
        },
    },
    subtitlesList: {
        display: 'flex',
        flexDirection: 'column',
        gap: '4px',
        marginTop: '6px',
        marginLeft: '8px',
    },
    subItem: {
        display: 'flex',
        textDecoration: 'none',
        alignItems: 'baseline',
        gap: '8px',
        fontSize: '13px',
        lineHeight: 1.4,
        fontWeight: 400,
        color: theme.custom.textSubtle,
        cursor: 'pointer',
        transition: 'color 0.2s',
        '&:hover': {
            color: theme.palette.primary.main,
        },
    },
    bullet: {
        fontSize: '14px',
        lineHeight: 1,
    },
}));
