import { makeStyles } from '../../theme';

export const useStyles = makeStyles<{ isCollapsed: boolean }>()((theme, { isCollapsed }) => ({
    menu: {
        width: isCollapsed ? '59px' : '264px',
        position: 'sticky',
        marginLeft: '32px',
        top: '80px',
        maxHeight: 'calc(100vh - 100px)',
        overflowY: 'scroll',
        overflowX: 'hidden',
        paddingRight: '12px',
        transition: 'all 0.3s ease',
        [theme.breakpoints.down(661)]: {
            width: isCollapsed ? '59px' : '272px',
            backgroundColor: !isCollapsed ? '#080B1C' : 'transparent',
            padding: !isCollapsed ? '20px' : '0px 12px 0px 0',
            borderRadius: !isCollapsed ? '10px' : '0px',
            border: !isCollapsed ? `2px solid ${theme.palette.primary.main}`: 'none',
            boxShadow: !isCollapsed ? '0 4px 20px rgba(0, 0, 0, 0.5)' : 'none',
        },
        [theme.breakpoints.down(878)]: {
            paddingRight: '20px',
            width: isCollapsed ? '59px' : '272px',
        },
        [theme.breakpoints.up(1440)]: {
            width: isCollapsed ? '59px' : '272px',
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
        color: 'rgba(255, 255, 255, 0.7)',
        fontSize: '14px',
        fontFamily: "'Saira'",
        transition: 'all 0.2s',
        borderRadius: '4px',
        justifyContent: isCollapsed ? 'center' : 'flex-start',
        '&:hover': {
            color: '#fff',
            background: 'rgba(255, 255, 255, 0.05)',
        },
    },
    menuItemActive: {
        color: '#fff',
        background: 'rgba(255, 255, 255, 0.1)',
    },
    menuIcon: {
        width: '24px',
        height: '24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '14px',
        transition: 'all 0.3s ease',
        [theme.breakpoints.down(1280)]: {
            width: isCollapsed ? '32px' : '24px',
            height: isCollapsed ? '32px' : '24px',
            '& img': {
             width: isCollapsed ? '32px' : '24px',
             height: isCollapsed ? '32px' : '24px',
        },
        },
    },
    menuText: {
        flex: 1,
        fontSize: '18px',
        color: 'white',
        fontFamily: "'Saira', sans-serif",
        fontWeight: 200,
    },
    firstItemText: {
        fontWeight: 500,
        opacity: 1
    },
    menuCount: {
        fontSize: '10px',
        opacity: 0.5,
    },
    firstItemCount: {
        fontSize: '18px',
        opacity: 1,
        fontWeight: 500,
    },
}));
