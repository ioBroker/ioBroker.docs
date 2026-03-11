import { makeStyles } from '../../theme';

export const useStyles = makeStyles<{ isMenuCollapsed: boolean }>()((theme, { isMenuCollapsed }) => ({
    root: {
        display: 'flex',
        gap: '40px',
        margin: '0 32px',
        padding: '20px 0',
        maxHeight: 'calc(100vh - 120px)',
        overflowY: 'scroll',
        overflowX: 'hidden',
        paddingRight: '12px',
        marginRight: '8px',
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
            borderRadius: '8px',
        },
        '&::-webkit-scrollbar-thumb:hover': {
            background: theme.palette.secondary.main,
        },
    },
    topBar: {
        display: 'flex',
        alignItems: 'center',
        marginBottom: '24px',
        margin: "0 32px 30px 32px",
        [theme.breakpoints.down(481)]: {
            margin: "0 10px 30px 10px",
        },
    },
    menuToggleContainer: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '265px',
        flexShrink: 0,
    },
    searchContainer: {
        display: 'flex',
        justifyContent: 'space-between',
        flex: 1,
        marginLeft: isMenuCollapsed ? 'calc(91px - 55px + 1px)' : 'calc(296px - 55px + 1px)',
        transition: 'margin-left 0.3s ease',
        [theme.breakpoints.up(1440)]: {
            marginLeft: isMenuCollapsed ? 'calc(91px - 55px + 1px)' : 'calc(304px - 55px + 1px)',
        },
        [theme.breakpoints.down(770)]: {
            marginLeft: isMenuCollapsed ? 'calc(80px - 55px + 1px)' : 'calc(289px - 55px + 1px)',
        },
        [theme.breakpoints.down(661)]: {
            marginLeft: isMenuCollapsed ? 'calc(80px - 55px + 1px)' : '20px',
        },
        [theme.breakpoints.down(481)]: {
            justifyContent: 'end',
        },
    },
    mainBlock: {
        flex: 1,
        minWidth: 0,
    },
    content: {
        color: theme.palette.mode === 'dark' ? '#e2e8f0' : '#2d3748',
        lineHeight: 1.8,
        fontSize: '16px',
    },
    head: {
        color: theme.palette.primary.main,
        fontSize: '24px',
        fontFamily: 'Audiowide',
        fontWeight: 400,
        marginBottom: '20px',
        scrollMarginTop: '100px',
        letterSpacing: '-0.03em',
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        cursor: 'pointer',
    },
    heading: {
        color: theme.palette.primary.main,
        fontSize: '20px',
        fontFamily: 'Audiowide',
        fontWeight: 400,
        marginBottom: '20px',
        scrollMarginTop: '100px',
        letterSpacing: '-0.03em',
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        cursor: 'pointer',
    },
    linkIcon: {
        width: '20px',
        height: '20px',
        flexShrink: 0,
    },
    paragraph: {
        marginBottom: '16px',
        fontSize: '18px',
        fontWeight: 300,
        letterSpacing: '0.01em'
    },
    list: {
        marginLeft: '24px',
        marginBottom: '16px',
    },
    listItem: {
        marginBottom: '8px',
    },
    image: {
        maxWidth: '100%',
        height: 'auto',
        margin: '24px 0',
        borderRadius: '8px',
    },
    menuBlock: {},
    menuButton: {},
    mainTopBlock: {},
    adaptersSearch: {},
    adaptersButton: {},
}));
