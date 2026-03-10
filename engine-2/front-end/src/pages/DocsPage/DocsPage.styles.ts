import { makeStyles } from '../../theme';

export const useStyles = makeStyles<{ isMenuCollapsed: boolean }>()((theme, {isMenuCollapsed}) => ({
    root: {
        display: 'flex',
        gap: '40px',
        maxWidth: '1400px',
        margin: '0 auto',
        padding: '20px',
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
    heading: {
        color: theme.palette.primary.main,
        fontSize: '24px',
        fontFamily: 'Audiowide',
        fontWeight: 600,
        marginTop: '40px',
        marginBottom: '20px',
        scrollMarginTop: '100px',
    },
    paragraph: {
        marginBottom: '16px',
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
