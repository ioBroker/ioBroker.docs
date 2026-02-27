import { makeStyles } from '../../theme';

export const useStyles = makeStyles()(theme => ({
    menu: {
        width: '264px',
        position: 'sticky',
        marginLeft: '32px',
        top: '80px',
        maxHeight: 'calc(100vh - 100px)',
        overflowY: 'scroll',
        overflowX: 'hidden',
        paddingRight: '12px',
        [theme.breakpoints.up(1440)]: {
            width: '272px',
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
            borderBottom: '100px solid transparent',
            borderLeft: '0px solid transparent',
            borderRight: '0px solid transparent',
            backgroundClip: 'padding-box',
        },
        '&::-webkit-scrollbar-thumb:hover': {
            background: theme.palette.secondary.main,
            borderBottom: '100px solid transparent',
            borderLeft: '0px solid transparent',
            borderRight: '0px solid transparent',
            backgroundClip: 'padding-box',
        },
    },
    menuItem: {
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        padding: '10px 0px',
        cursor: 'pointer',
        color: 'rgba(255, 255, 255, 0.7)',
        fontSize: '14px',
        fontFamily: "'Saira'",
        transition: 'all 0.2s',
        borderRadius: '4px',
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
        width: '16px',
        height: '16px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '14px',
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
