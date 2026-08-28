import { makeStyles } from '../../theme';

/** white line art on dark surfaces, brand blue on light ones */
const LIGHT_ICON_FILTER =
    'brightness(0) saturate(100%) invert(23%) sepia(89%) saturate(1247%) hue-rotate(175deg) brightness(95%) contrast(101%)';

export const useStyles = makeStyles()(theme => {
    const isDark = theme.palette.mode === 'dark';
    const iconFilter = isDark ? 'none' : LIGHT_ICON_FILTER;

    return {
        // Card = one calm surface step above the page ground, no frame
        card: {
            width: '100%',
            height: '100%',
            minHeight: '244px',
            boxSizing: 'border-box',
            borderRadius: `${theme.custom.radius.card}px`,
            padding: '16px',
            background: theme.custom.surfaces.surface,
            color: theme.palette.text.primary,
            boxShadow: theme.custom.elevation.card,
            display: 'flex',
            flexDirection: 'column',
            transition: 'background 0.2s ease, box-shadow 0.2s ease, transform 0.2s ease',
            '&:hover': {
                background: theme.custom.surfaces.raised,
                boxShadow: theme.custom.elevation.raised,
                transform: 'translateY(-2px)',
            },
            '@media (max-width: 480px)': {
                padding: '14px',
            },
        },
        header: {
            display: 'flex',
            alignItems: 'flex-start',
            gap: '12px',
            minWidth: 0,
        },
        icon: {
            background: '#FFFFFF',
            borderRadius: `${theme.custom.radius.control}px`,
            padding: '6px',
            width: '56px',
            height: '56px',
            flexShrink: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            boxShadow: `inset 0 0 0 1px ${theme.custom.hairline}`,
            '& img': {
                width: '100%',
                height: '100%',
                objectFit: 'contain',
            },
            '@media (max-width: 480px)': {
                width: '48px',
                height: '48px',
            },
        },
        headerText: {
            minWidth: 0,
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            gap: '4px',
        },
        title: {
            fontFamily: "'Roboto', sans-serif",
            fontWeight: 700,
            fontSize: '18px',
            lineHeight: 1.25,
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            overflowWrap: 'anywhere',
            '@media (max-width: 480px)': {
                fontSize: '17px',
            },
        },
        titleLink: {
            display: 'block',
            color: 'inherit',
            textDecoration: 'none',
            transition: 'color 0.2s ease',
            '&:hover': {
                color: theme.palette.primary.main,
            },
        },
        authorBlock: {
            display: 'flex',
            alignItems: 'flex-start',
            gap: '6px',
            minWidth: 0,
        },
        authorIcon: {
            flexShrink: 0,
            display: 'flex',
            marginTop: '1px',
            opacity: isDark ? 0.55 : 0.7,
            '& img': {
                width: '14px',
                height: '14px',
                filter: iconFilter,
            },
        },
        authorName: {
            fontSize: '13px',
            lineHeight: 1.35,
            color: theme.custom.textSubtle,
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
        },
        description: {
            fontFamily: "'Roboto', sans-serif",
            fontWeight: 400,
            fontSize: '14px',
            lineHeight: 1.5,
            color: theme.custom.textMuted,
            cursor: 'pointer',
            marginTop: '14px',
            display: '-webkit-box',
            WebkitLineClamp: 3,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
        },
        // Meta row sits on the lower edge of the card, above the hairline
        statsBlocks: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '8px',
            marginTop: 'auto',
            paddingTop: '16px',
        },
        statsBlock: {
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            minWidth: 0,
        },
        statsIcon: {
            display: 'flex',
            flexShrink: 0,
            opacity: isDark ? 0.55 : 0.7,
            '& img': {
                width: '15px',
                height: '15px',
                filter: iconFilter,
            },
        },
        statsNumber: {
            maxWidth: '100%',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            color: theme.custom.textMuted,
            lineHeight: 1.2,
        },
        divider: {
            height: '1px',
            background: theme.custom.hairline,
            margin: '12px -16px 0 -16px',
            '@media (max-width: 480px)': {
                margin: '12px -14px 0 -14px',
            },
        },
        bottomIcons: {
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            paddingTop: '8px',
        },
        bottomIcon: {
            width: '32px',
            height: '32px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: `${theme.custom.radius.control}px`,
            cursor: 'pointer',
            opacity: isDark ? 0.6 : 0.75,
            transition: 'background 0.2s ease, opacity 0.2s ease',
            '& img': {
                width: '18px',
                height: '18px',
                filter: iconFilter,
            },
            '&:hover': {
                opacity: 1,
                background: theme.custom.surfaces.overlay,
            },
        },
    };
});
