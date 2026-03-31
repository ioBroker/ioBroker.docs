import { makeStyles } from '../../theme';

export const useStyles = makeStyles<{ isCollapsed: boolean }>()((theme, { isCollapsed }) => ({
    menu: {
        width: isCollapsed ? '59px' : '264px',
        marginLeft: '0px',
        marginTop: '20px',
        transition: 'all 0.3s ease',
        [theme.breakpoints.down(878)]: {
            width: isCollapsed ? '59px' : '272px',
        },
        [theme.breakpoints.down(661)]: {
            width: isCollapsed ? '59px' : '328px',
            backgroundColor: !isCollapsed ? (theme.palette.mode === 'dark' ? '#080B1C' : '#FFFFFF') : 'transparent',
            padding: !isCollapsed ? '20px' : '0',
            marginLeft: !isCollapsed ? '24px' : '30px',
            borderRadius: !isCollapsed ? '10px' : '0px',
            border: !isCollapsed ? `2px solid ${theme.palette.primary.main}` : 'none',
            boxShadow: !isCollapsed ? '0 4px 20px rgba(0, 0, 0, 0.5)' : 'none',
        },
        [theme.breakpoints.down(401)]: {
            marginLeft: !isCollapsed ? '10px' : '30px',
        },
        [theme.breakpoints.up(1440)]: {
            width: isCollapsed ? '59px' : '272px',
        },
    },
    menuInner: {
        overflowX: 'hidden',
        [theme.breakpoints.down(661)]: {
            maxHeight: !isCollapsed ? 'calc(100vh - 165px)' : 'calc(100vh - 125px)',
        },
        [theme.breakpoints.down(481)]: {
            paddingRight: !isCollapsed ? '20px' : '12px',
        },
        [theme.breakpoints.down(878)]: {
            paddingRight: '20px',
        },
        [theme.breakpoints.up(1440)]: {
            paddingRight: '20px',
        },
        '&::-webkit-scrollbar': {
            width: '8px',
        },
        '&::-webkit-scrollbar-track': {
            background: 'rgba(255, 255, 255, 0.05)',
            borderRadius: '8px',
            border: `1px solid ${theme.palette.primary.main}`,
        },
        '&::-webkit-scrollbar-thumb': {
            background: theme.palette.secondary.main,
            borderRadius: '20px',
            borderLeft: '0px solid transparent',
            borderRight: '0px solid transparent',
            backgroundClip: 'padding-box',
        },
        '&::-webkit-scrollbar-thumb:hover': {
            background: theme.palette.secondary.main,
            borderLeft: '0px solid transparent',
            borderRight: '0px solid transparent',
            backgroundClip: 'padding-box',
        },
    },
    menuItem: {
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        padding: isCollapsed ? '12px 8px' : '10px 0px',
        cursor: 'pointer',
        color: theme.palette.mode === 'dark' ? 'white' : theme.palette.primary.main,
        fontSize: '14px',
        fontFamily: "'Saira'",
        transition: 'all 0.2s',
        borderRadius: '4px',
        justifyContent: isCollapsed ? 'center' : 'flex-start',
        position: 'relative',
        zIndex: 1,
        '&:hover': {
            color: theme.palette.mode === 'dark' ? 'white' : theme.palette.primary.main,
            background: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(29, 144, 202, 0.1)',
        },
    },
    menuItemActive: {
        color: theme.palette.primary.main,
        background: 'rgba(29, 144, 202, 0.1)',
        '& img': {
            filter: 'brightness(0) saturate(100%) invert(47%) sepia(85%) saturate(1437%) hue-rotate(167deg) brightness(88%) contrast(89%)',
        },
    },
    menuIcon: {
        width: '24px',
        height: '24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '14px',
        transition: 'all 0.3s ease',
        '& img': {
            filter:
                theme.palette.mode !== 'dark'
                    ? 'brightness(0) saturate(100%) invert(23%) sepia(89%) saturate(1247%) hue-rotate(175deg) brightness(95%) contrast(101%)'
                    : 'none',
        },
        [theme.breakpoints.down(1280)]: {
            width: isCollapsed ? '32px' : '24px',
            height: isCollapsed ? '32px' : '24px',
            '& img': {
                width: isCollapsed ? '32px' : '24px',
                height: isCollapsed ? '32px' : '24px',
                filter:
                    theme.palette.mode !== 'dark'
                        ? 'brightness(0) saturate(100%) invert(23%) sepia(89%) saturate(1247%) hue-rotate(175deg) brightness(95%) contrast(101%)'
                        : 'none',
            },
        },
    },
    menuText: {
        flex: 1,
        fontSize: '18px',
        color: theme.palette.mode === 'dark' ? 'white' : theme.palette.secondary.main,
        fontFamily: "'Saira', sans-serif",
        fontWeight: 200,
    },
    firstItemText: {
        fontWeight: 500,
        opacity: 1,
    },
    activeText: {
        fontWeight: 500,
        color: theme.palette.primary.main,
    },
    menuCount: {
        fontSize: '14px',
        opacity: 0.5,
        marginRight: '6px',
    },
    firstItemCount: {
        fontSize: '18px',
        opacity: 1,
        fontWeight: 500,
    },
    activeCount: {
        color: theme.palette.primary.main,
    },
}));
