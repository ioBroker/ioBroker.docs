import { makeStyles } from '../../theme';

export const useStyles = makeStyles<{ isMenuCollapsed: boolean }>()((theme, { isMenuCollapsed }) => ({
    topBar: {
        display: 'flex',
        alignItems: 'center',
        marginBottom: '24px',
        margin: "0 32px 30px 32px",
        [theme.breakpoints.down(481)]: {
            margin: "0 10px 30px 10px",
        },
    },
    container: {
        display: 'flex',
        gap: '30px',
        [theme.breakpoints.down(661)]: {
            position: !isMenuCollapsed ? 'relative' : 'static',
        },
        [theme.breakpoints.down(770)]: {
            gap: '20px',
        },
    },
    titleContainer: {
        display: 'flex',
        '&::after': {
            content: '""',
            position: 'absolute',
            top: '21%',
            left: '60%',
            transform: 'translate(-50%, -50%)',
            width: '1000px',
            height: '300px',
            opacity: 0.5,
            background:
                theme.palette.mode === 'dark'
                    ? 'radial-gradient(ellipse, rgba(35, 86, 174, 0.3) 0%, rgba(255, 255, 255, 0) 55%)'
                    : 'none',
            [theme.breakpoints.down(1280)]: {
                display: 'none',
            },

        },
    },
    breadCrumbs: {
        color: theme.palette.primary.main,
        fontSize: '20px',
        marginTop: '10px',
        marginLeft: '10px',
        fontWeight: 400,
        letterSpacing: '-0.02em',
        [theme.breakpoints.down(1280)]: {
            fontSize: '24px',
            marginTop: '4px',
        },
        [theme.breakpoints.down(769)]: {
            fontSize: '20px',
            marginTop: '6px',
        },
        [theme.breakpoints.down(481)]: {
            marginTop: '0px',
        },
    },
    menuBlock: {
        flexShrink: 0,
        [theme.breakpoints.down(661)]: {
            position: !isMenuCollapsed ? 'absolute' : 'static',
            zIndex: !isMenuCollapsed ? 1200 : 'auto',
            left: !isMenuCollapsed ? 0 : 'auto',
            top: !isMenuCollapsed ? 0 : 'auto',
        },
    },
    mainBlock: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        gap: '24px',
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
    searchAndMenuButton: {
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
    adaptersButton: {
        flexShrink: 0,
        '& .MuiToggleButtonGroup-root': {
            border: `2px solid ${theme.palette.primary.main}`,
            borderRadius: '8px',
            height: '32px',
            width: '76px',
        },
        '&& .MuiToggleButton-root': {
            color: 'rgba(255, 255, 255, 0.7)',
            border: 'none',
            padding: '8px 12px',
            minWidth: '38px',
            lineHeight: 1,
            '&:not(:last-of-type)': {
                borderRight: `2px solid ${theme.palette.primary.main}`,
            },
            '&:hover': {
                background: 'rgba(29, 144, 202, 0.1)',
            },
        },
        [theme.breakpoints.down(769)]: {
            display: 'none'
        },
        '& img': {
            filter: theme.palette.mode !== 'dark'
                ? 'brightness(0) saturate(100%) invert(23%) sepia(89%) saturate(1247%) hue-rotate(175deg) brightness(95%) contrast(101%)'
                : 'none',
        },
    },
    adaptersGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(251px, 1fr))',
        gap: '20px',
        paddingBottom: '120px',
        [theme.breakpoints.down(661)]: {
            marginLeft: !isMenuCollapsed ? '32px' : '0',
        },
        [theme.breakpoints.down(769)]: {
            gridTemplateColumns: !isMenuCollapsed ? '1fr' : 'repeat(auto-fit, minmax(251px, 1fr))',
        },
    },
}));
