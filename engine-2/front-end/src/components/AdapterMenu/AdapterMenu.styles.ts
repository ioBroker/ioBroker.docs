import { makeStyles } from '../../theme';

export const useStyles = makeStyles()(theme => ({
    menu: {
        width: '304px',
        position: 'sticky',
        marginLeft: '32px',
        top: '80px',
        maxHeight: 'calc(100vh - 100px)',
        overflowY: 'auto',
        overflowX: 'hidden',
        paddingRight: '8px',
        '&::-webkit-scrollbar': {
            width: '6px',
        },
        '&::-webkit-scrollbar-track': {
            background: 'rgba(255, 255, 255, 0.05)',
            borderRadius: '3px',
            border: '1px solid #00A8E1',
        },
        '&::-webkit-scrollbar-thumb': {
            background: '#00A8E1',
            borderRadius: '3px',
        },
        '&::-webkit-scrollbar-thumb:hover': {
            background: '#0096C9',
        },
    },
    menuItem: {
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        padding: '8px 12px',
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
