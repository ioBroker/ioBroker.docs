import { makeStyles } from '../../theme';

const LIGHT_ICON_FILTER =
    'brightness(0) saturate(100%) invert(23%) sepia(89%) saturate(1247%) hue-rotate(175deg) brightness(95%) contrast(101%)';
const ACTIVE_ICON_FILTER =
    'brightness(0) saturate(100%) invert(47%) sepia(85%) saturate(1437%) hue-rotate(167deg) brightness(88%) contrast(89%)';

export const useStyles = makeStyles<{ isCollapsed: boolean }>()((theme, { isCollapsed }) => {
    const isDark = theme.palette.mode === 'dark';

    return {
        menu: {
            width: isCollapsed ? '56px' : '264px',
            marginLeft: '0px',
            marginTop: '4px',
            transition: 'width 0.3s ease',
            [theme.breakpoints.down(878)]: {
                width: isCollapsed ? '56px' : '272px',
            },
            // as an overlay panel on small screens it becomes a real surface
            [theme.breakpoints.down(661)]: {
                width: isCollapsed ? '56px' : '328px',
                backgroundColor: !isCollapsed ? theme.custom.surfaces.surface : 'transparent',
                padding: !isCollapsed ? '16px' : '0',
                marginLeft: !isCollapsed ? '24px' : '0px',
                borderRadius: !isCollapsed ? `${theme.custom.radius.card}px` : '0px',
                boxShadow: !isCollapsed ? theme.custom.elevation.overlay : 'none',
            },
            [theme.breakpoints.down(481)]: {
                marginLeft: !isCollapsed ? '10px' : '0px',
            },
            [theme.breakpoints.up(1440)]: {
                width: isCollapsed ? '56px' : '272px',
            },
        },
        menuInner: {
            overflowX: 'hidden',
            paddingRight: 0,
            display: 'flex',
            flexDirection: 'column',
            gap: '2px',
            [theme.breakpoints.down(661)]: {
                maxHeight: !isCollapsed ? 'calc(100vh - 165px)' : 'calc(100vh - 125px)',
            },
            '&::-webkit-scrollbar': {
                width: '8px',
            },
            '&::-webkit-scrollbar-track': {
                background: 'transparent',
            },
            '&::-webkit-scrollbar-thumb': {
                background: theme.custom.hairlineStrong,
                borderRadius: `${theme.custom.radius.pill}px`,
            },
            '&::-webkit-scrollbar-thumb:hover': {
                background: theme.palette.primary.main,
            },
        },
        // one quiet row, the active state is a surface step - not a frame
        menuItem: {
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            padding: isCollapsed ? '10px 8px' : '8px 12px',
            cursor: 'pointer',
            color: theme.palette.text.primary,
            fontSize: '14px',
            fontFamily: "'Roboto', sans-serif",
            transition: 'background 0.2s ease, color 0.2s ease',
            borderRadius: `${theme.custom.radius.control}px`,
            justifyContent: isCollapsed ? 'center' : 'flex-start',
            position: 'relative',
            zIndex: 1,
            '&:hover': {
                background: theme.custom.surfaces.surface,
            },
        },
        menuItemActive: {
            background: theme.custom.surfaces.raised,
            color: theme.palette.primary.main,
            '& img': {
                filter: ACTIVE_ICON_FILTER,
            },
        },
        menuIcon: {
            width: '22px',
            height: '22px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
            transition: 'all 0.3s ease',
            '& img': {
                width: '22px',
                height: '22px',
                opacity: isDark ? 0.8 : 1,
                filter: isDark ? 'none' : LIGHT_ICON_FILTER,
            },
            [theme.breakpoints.down(1280)]: {
                width: isCollapsed ? '26px' : '22px',
                height: isCollapsed ? '26px' : '22px',
                '& img': {
                    width: isCollapsed ? '26px' : '22px',
                    height: isCollapsed ? '26px' : '22px',
                    filter: isDark ? 'none' : LIGHT_ICON_FILTER,
                },
            },
        },
        menuText: {
            flex: 1,
            fontSize: '16px',
            lineHeight: 1.35,
            color: theme.custom.textMuted,
            fontFamily: "'Roboto', sans-serif",
            fontWeight: 400,
        },
        // "Gesamtanzahl" is the summary row, it carries a little more weight
        firstItemText: {
            fontWeight: 700,
            fontSize: '16px',
            color: theme.palette.text.primary,
        },
        activeText: {
            fontWeight: 700,
            color: theme.palette.primary.main,
        },
        menuCount: {
            fontSize: '13px',
            color: theme.custom.textSubtle,
            fontVariantNumeric: 'tabular-nums',
        },
        firstItemCount: {
            fontSize: '15px',
            fontWeight: 700,
            color: theme.palette.text.primary,
        },
        activeCount: {
            color: theme.palette.primary.main,
        },
    };
});
