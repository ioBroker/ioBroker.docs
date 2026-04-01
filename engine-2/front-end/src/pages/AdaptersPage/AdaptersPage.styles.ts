import { makeStyles } from '../../theme';

// Debug helper: adds a colored border + label to a block
const debugBlock = (color: string, name: string) => ({
    border: `2px solid ${color}`,
    position: 'relative' as const,
    '&::before': {
        content: `"${name}"`,
        position: 'absolute' as const,
        top: 0,
        left: 0,
        background: color,
        color: '#000',
        fontSize: '11px',
        fontFamily: 'monospace',
        padding: '1px 6px',
        zIndex: 9999,
        pointerEvents: 'none' as const,
        lineHeight: '16px',
    },
});

export const useStyles = makeStyles<{ isMenuCollapsed: boolean }>()((theme, { isMenuCollapsed }) => ({
    // Root wrapper: full height, no scroll on body
    pageRoot: {
        display: 'flex',
        flexDirection: 'column',
        height: 'calc(100vh - 64px)', // viewport minus fixed header
        overflow: 'hidden',
        ...debugBlock('#fff', 'pageRoot'),
    },
    // Title/Breadcrumb bar: fixed height, not scrollable
    titleContainer: {
        flexShrink: 0,
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
        [theme.breakpoints.down(481)]: {
            paddingTop: '20px',
        },
        ...debugBlock('#0ff', 'titleContainer'),
    },
    // Container: takes all remaining height, splits into left + right
    container: {
        flex: 1,
        display: 'flex',
        gap: '30px',
        margin: '0 0 0 32px',
        minHeight: 0, // crucial for flex children to shrink & scroll
        [theme.breakpoints.down(661)]: {
            position: !isMenuCollapsed ? 'relative' : 'static',
        },
        [theme.breakpoints.down(1280)]: {
            margin: '0 0 0 24px',
        },
        [theme.breakpoints.down(770)]: {
            gap: '20px',
        },
        [theme.breakpoints.down(481)]: {
            margin: '0',
            paddingLeft: '10px',
            gap: '10px',
        },
        ...debugBlock('#f00', 'container'),
    },
    // Left column: MenuToggle (fixed) + menuBlock (scrollable)
    leftColumn: {
        flexShrink: 0,
        display: 'flex',
        flexDirection: 'column',
        minHeight: 0,
        [theme.breakpoints.down(661)]: {
            position: !isMenuCollapsed ? 'absolute' : 'static',
            zIndex: !isMenuCollapsed ? 1200 : 'auto',
            left: !isMenuCollapsed ? 0 : 'auto',
            top: !isMenuCollapsed ? 0 : 'auto',
        },
        ...debugBlock('#0f0', 'leftColumn'),
    },
    // Fixed MenuToggle wrapper — covers scrolling menu items
    menuToggleWrapper: {
        flexShrink: 0,
        position: 'relative',
        zIndex: 2,
        width: '100%',
        paddingBottom: '10px',
        backgroundColor: theme.palette.mode === 'dark' ? '#080B1C' : '#FFFFFF',
        ...debugBlock('#9cf', 'menuToggleWrapper'),
    },
    // Scrollable menu list
    menuBlock: {
        flex: 1,
        overflowY: 'auto',
        overflowX: 'hidden',
        minHeight: 0,
        paddingRight: '10px',
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
        [theme.breakpoints.down(769)]: {
            paddingRight: '0px',
            paddingLeft: '0px',
            '&::-webkit-scrollbar': {
                display: 'none',
            },
        },
        ...debugBlock('#3c3', 'menuBlock'),
    },
    // Right column: topBar (fixed) + mainBlock (scrollable)
    rightColumn: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        minHeight: 0,
        minWidth: 0,
        overflow: 'hidden',
        ...debugBlock('#fa0', 'rightColumn'),
    },
    // Scrollable content area with cards + footer
    mainBlock: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        overflowY: 'scroll',
        overflowX: 'hidden',
        minHeight: 0,
        paddingRight: '10px',  // gap between cards and scrollbar
        marginRight: '14px',   // 14px + 8px scrollbar = 22px to display edge
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
        [theme.breakpoints.down(1280)]: {
            paddingRight: '6px',
            marginRight: '10px',
        },
        [theme.breakpoints.down(481)]: {
            paddingRight: '0px',
            marginRight: '0px',
        },
        ...debugBlock('#a6f', 'mainBlock'),
    },
    // Search + view toggle above mainBlock
    topBar: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: '20px',
        flexShrink: 0,
        paddingRight: '32px', // align with cards: 10px + 14px marginRight + 8px scrollbar
        [theme.breakpoints.down(1280)]: {
            paddingRight: '24px', // align with cards: 6px + 10px marginRight + 8px scrollbar
        },
        ...debugBlock('#ff0', 'topBar'),
    },
    // Breadcrumbs
    breadcrumbsContainer: {
        fontFamily: 'Audiowide, sans-serif',
        display: 'flex',
        alignItems: 'center',
        flexWrap: 'wrap',
        columnGap: '8px',
        rowGap: '4px',
        marginLeft: '32px',
        marginBottom: '22px',
        textTransform: 'uppercase',
        [theme.breakpoints.down(1280)]: {
            marginLeft: '24px',
            marginBottom: '20px',
        },
        [theme.breakpoints.down(481)]: {
            marginLeft: '10px',
            marginBottom: '10px',
        },
        ...debugBlock('#f0f', 'breadcrumbsContainer'),
    },
    breadcrumbInactive: {
        fontSize: '20px',
        color: theme.palette.text.primary,
        letterSpacing: '-0.02em',
        fontWeight: 400,
        [theme.breakpoints.down(1280)]: {
            fontSize: '18px',
        },
        [theme.breakpoints.down(481)]: {
            fontSize: '16px',
        },
    },
    breadcrumbSlash: {
        fontSize: '20px',
        color: 'white',
        [theme.breakpoints.down(1280)]: {
            fontSize: '18px',
        },
        [theme.breakpoints.down(481)]: {
            fontSize: '16px',
        },
    },
    breadcrumbActive: {
        fontSize: '36px',
        color: theme.palette.primary.main,
        letterSpacing: '0.03em',
        fontWeight: 400,
        [theme.breakpoints.down(1280)]: {
            fontSize: '28px',
        },
        [theme.breakpoints.down(481)]: {
            fontSize: '20px',
        },
    },
    // Grid/List toggle
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
            '&.Mui-selected img': {
                filter: 'brightness(0) saturate(100%) invert(64%) sepia(98%) saturate(2476%) hue-rotate(169deg) brightness(101%) contrast(101%)',
            },
        },
        [theme.breakpoints.down(769)]: {
            display: 'none',
        },
        '& img': {
            filter:
                theme.palette.mode !== 'dark'
                    ? 'brightness(0) saturate(100%) invert(23%) sepia(89%) saturate(1247%) hue-rotate(175deg) brightness(95%) contrast(101%)'
                    : 'brightness(0) invert(100%)',
        },
        ...debugBlock('#f66', 'adaptersButton'),
    },
    // Cards grid
    adaptersGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
        gap: '20px',
        marginBottom: '100px',
        [theme.breakpoints.down(661)]: {
            marginLeft: !isMenuCollapsed ? '32px' : '0',
        },
        [theme.breakpoints.down(769)]: {
            gridTemplateColumns: !isMenuCollapsed ? '1fr' : 'repeat(auto-fit, minmax(251px, 1fr))',
        },
        [theme.breakpoints.down(481)]: {
            gridTemplateColumns: '1fr',
            gap: '16px',
        },
        ...debugBlock('#66f', 'adaptersGrid'),
    },
}));
