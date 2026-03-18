import { makeStyles } from '../../theme';

export const useStyles = makeStyles<{ isMenuCollapsed: boolean }>()((theme, { isMenuCollapsed }) => ({
    pageWrapper: {
        position: 'relative',
        [theme.breakpoints.down(768)]: {
            overflow: 'visible',
        },
    },
    root: {
        display: 'flex',
        gap: '40px',
        margin: '0 32px',
        paddingBottom: '20px',
        position: 'relative',
        maxHeight: 'calc(100vh - 120px)',
        overflowY: 'scroll',
        overflowX: 'hidden',
        paddingRight: '12px',
        marginRight: '8px',
        '&::before': {
            content: '""',
            position: 'absolute',
            top: '150%',
            left: '13%',
            transform: 'translate(-50%, -50%)',
            width: '600px',
            height: '1000px',
            opacity: 0.5,
            pointerEvents: 'none',
            background:
                theme.palette.mode === 'dark'
                    ? 'radial-gradient(ellipse, rgba(35, 86, 174, 0.35) 0%, rgba(255, 255, 255, 0) 60%)'
                    : 'none',
            [theme.breakpoints.down(1278)]: {
               display: 'none'
            },
        },
        '&::after': {
            content: '""',
            position: 'absolute',
            top: '120%',
            right: '10%',
            transform: 'translate(50%, -50%)',
            width: '400px',
            height: '900px',
            opacity: 0.5,
            pointerEvents: 'none',
            background:
                theme.palette.mode === 'dark'
                    ? 'radial-gradient(ellipse, rgba(35, 86, 174, 0.3) 0%, rgba(255, 255, 255, 0) 60%)'
                    : 'none',
             [theme.breakpoints.down(1278)]: {
               display: 'none'
            },
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
            borderRadius: '8px',
        },
        '&::-webkit-scrollbar-thumb:hover': {
            background: theme.palette.secondary.main,
        },
        [theme.breakpoints.down(768)]: {
            position: !isMenuCollapsed ? 'relative' : 'static',
        },
         [theme.breakpoints.down(769)]: {
              maxHeight: '100%',
              overflowY: 'hidden',
        },
         [theme.breakpoints.down(481)]: {
            margin: '0 10px',
            paddingRight: '0px',   
        },
    },
    topBar: {
        display: 'flex',
        alignItems: 'center',
        margin: "0 32px 24px 32px",
        position: 'relative',
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
         [theme.breakpoints.down(769)]: {
            width: 'auto'
        },
    },
    searchContainer: {
        display: 'flex',
        justifyContent: 'space-between',
        flex: 1,
        marginLeft: 'calc(91px - 18px + 1px)',
        transition: 'margin-left 0.3s ease',
        [theme.breakpoints.up(1440)]: {
            marginLeft: 'calc(91px - 18px + 1px)',
        },
        [theme.breakpoints.down(769)]: {
            marginLeft: '98px',
        },
        [theme.breakpoints.down(661)]: {
            marginLeft: 'calc(80px - 55px + 1px)',
        },
        [theme.breakpoints.down(481)]: {
            justifyContent: 'end',
            marginLeft: 'calc(80px - 61px + 1px)',
        },
    },
    mainBlock: {
        flex: 1,
        minWidth: 0,
    },
    content: {
        color: theme.palette.text.primary,
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
        display: 'inline-flex',
        alignItems: 'flex-start',
        gap: '16px',
        cursor: 'pointer',
        maxWidth: '100%',
         [theme.breakpoints.down(481)]: {
            fontSize: '18px',
        },
    },
    heading: {
        color: theme.palette.primary.main,
        fontSize: '20px',
        fontFamily: 'Audiowide',
        fontWeight: 400,
        marginBottom: '20px',
        scrollMarginTop: '100px',
        letterSpacing: '-0.03em',
        display: 'inline-flex',
        alignItems: 'flex-start',
        gap: '16px',
        cursor: 'pointer',
        maxWidth: '100%',
         [theme.breakpoints.down(769)]: {
             fontSize: '18px',
        },
        [theme.breakpoints.down(481)]: {
            fontSize: '16px',
        },
    },
    linkIcon: {
        width: '20px',
        height: '20px',
        marginTop: '8px',
        flexShrink: 0,
    },
    paragraph: {
        marginBottom: '16px',
        fontSize: '18px',
        fontWeight: 300,
        letterSpacing: '0.01em',
         [theme.breakpoints.down(481)]: {
            fontSize: '16px',
        },
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
    menuBlock: {
        flexShrink: 0,
        [theme.breakpoints.down(769)]: {
            display: 'none',
        },
    },
    menuBlockMobile: {
        position: 'absolute',
        width: '350px',
        left: '32px',
        top: '0',
        zIndex: 1000,
        flexShrink: 0,
        [theme.breakpoints.up(769)]: {
            display: 'none',
            width: 'calc(91px - 18px + 1px)'
        },
         [theme.breakpoints.down(481)]: {
            width: 'calc(100% - 32px)',
             left: '16px',
            '&::before': {
                content: '""',
                position: 'absolute',
                top: 0,
                left: '-16px',
                right: '-16px',
                height: '100%',
                background: '#080B1C',
                zIndex: -1,
                pointerEvents: 'none',
            },
        },
    },
    menuButton: {},
    mainTopBlock: {},
    adaptersSearch: {},
    adaptersButton: {},
}));
