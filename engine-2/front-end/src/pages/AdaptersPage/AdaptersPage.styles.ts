import { makeStyles } from '../../theme';

export const useStyles = makeStyles<{ isMenuCollapsed: boolean }>()((theme, { isMenuCollapsed }) => {
    // one scrollbar recipe for both columns: a hairline track, a quiet thumb
    const scrollbar = {
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
    } as const;

    return {
        // Root wrapper: full height, no scroll on body
        pageRoot: {
            display: 'flex',
            flexDirection: 'column',
            height: 'calc(100vh - 64px)', // viewport minus fixed header
            overflow: 'hidden',
            background: theme.custom.surfaces.canvas,
        },
        // Title/Breadcrumb bar: fixed height, not scrollable
        titleContainer: {
            flexShrink: 0,
            display: 'flex',
            alignItems: 'center',
            // breathing room below the fixed header
            paddingTop: '40px',
            paddingBottom: '4px',
            [theme.breakpoints.down('md')]: {
                paddingTop: '32px',
            },
            [theme.breakpoints.down('sm')]: {
                paddingTop: '24px',
            },
        },
        // Container: takes all remaining height, splits into left + right
        container: {
            flex: 1,
            display: 'flex',
            gap: '32px',
            margin: `0 0 0 ${theme.custom.layout.gutter.lg}px`,
            minHeight: 0, // crucial for flex children to shrink & scroll
            [theme.breakpoints.down('md')]: {
                // the open menu lies over the content, so the column it sits in needs a
                // positioned parent to be measured against
                position: !isMenuCollapsed ? 'relative' : 'static',
                gap: '24px',
            },
            [theme.breakpoints.down('sm')]: {
                margin: '0',
                paddingLeft: `${theme.custom.layout.gutter.sm}px`,
                gap: '12px',
            },
        },
        // Left column: MenuToggle (fixed) + menuBlock (scrollable)
        leftColumn: {
            flexShrink: 0,
            display: 'flex',
            flexDirection: 'column',
            minHeight: 0,
            // Open on a phone the menu lies over the content. This box only positions it -
            // the panel itself (surface, radius, shadow) comes from `AdapterMenu`, and a
            // second frame around it was one frame too many.
            [theme.breakpoints.down('md')]: {
                position: !isMenuCollapsed ? 'absolute' : 'static',
                zIndex: !isMenuCollapsed ? 1200 : 'auto',
                // `left: 0` would sit on the padding edge of the container, so the panel
                // hung on the screen edge
                left: !isMenuCollapsed ? `${theme.custom.layout.gutter.sm}px` : 'auto',
                maxWidth: !isMenuCollapsed ? `calc(100% - ${2 * theme.custom.layout.gutter.sm}px)` : 'none',
                // it starts below the row with the toggle and the search field
                top: !isMenuCollapsed ? `${theme.custom.control.compactHeight + 20}px` : 'auto',
                maxHeight: !isMenuCollapsed ? `calc(100% - ${theme.custom.control.compactHeight + 20}px)` : 'none',
            },
            // On a phone the closed icon strip ate 56 px of a 375 px screen - a sixth of
            // the width for a column nobody reads. Closed, it is gone; the button in the
            // row above opens it as the overlay panel.
            [theme.breakpoints.down('sm')]: {
                display: isMenuCollapsed ? 'none' : 'flex',
            },
        },
        // Fixed MenuToggle wrapper - covers scrolling menu items
        menuToggleWrapper: {
            flexShrink: 0,
            zIndex: 2,
            width: '100%',
            paddingBottom: '12px',
            backgroundColor: theme.custom.surfaces.canvas,
        },
        // Scrollable menu list
        menuBlock: {
            flex: 1,
            overflowY: 'auto',
            overflowX: 'hidden',
            minHeight: 0,
            paddingRight: '10px',
            ...scrollbar,
            [theme.breakpoints.down('md')]: {
                paddingRight: '0px',
                paddingLeft: '0px',
                '&::-webkit-scrollbar': {
                    display: 'none',
                },
            },
        },
        // Right column: topBar (fixed) + mainBlock (scrollable)
        rightColumn: {
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            minHeight: 0,
            minWidth: 0,
            overflow: 'hidden',
        },
        // Scrollable content area with cards + footer
        mainBlock: {
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            overflowY: 'scroll',
            overflowX: 'hidden',
            minHeight: 0,
            paddingRight: '10px', // gap between cards and scrollbar
            marginRight: '14px', // 14px + 8px scrollbar = 22px to display edge
            ...scrollbar,
            [theme.breakpoints.down('md')]: {
                paddingRight: '6px',
                marginRight: '10px',
            },
            [theme.breakpoints.down('sm')]: {
                paddingRight: '0px',
                marginRight: '0px',
            },
        },
        // Search + view toggle above mainBlock
        topBar: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '16px',
            marginBottom: '20px',
            flexShrink: 0,
            paddingRight: '32px', // align with cards: 10px + 14px marginRight + 8px scrollbar
            [theme.breakpoints.down('md')]: {
                paddingRight: '24px', // align with cards: 6px + 10px marginRight + 8px scrollbar
            },
        },
        // Breadcrumbs
        breadcrumbsContainer: {
            fontFamily: 'Audiowide, sans-serif',
            display: 'flex',
            alignItems: 'baseline',
            flexWrap: 'wrap',
            columnGap: '8px',
            rowGap: '4px',
            marginLeft: `${theme.custom.layout.gutter.lg}px`,
            marginBottom: '20px',
            textTransform: 'uppercase',
            [theme.breakpoints.down('md')]: {
                marginBottom: '18px',
            },
            [theme.breakpoints.down('sm')]: {
                marginLeft: `${theme.custom.layout.gutter.sm}px`,
                marginBottom: '10px',
            },
        },
        breadcrumbInactive: {
            fontSize: '18px',
            color: theme.custom.textSubtle,
            letterSpacing: '-0.02em',
            fontWeight: 400,
            [theme.breakpoints.down('md')]: {
                fontSize: '16px',
            },
            [theme.breakpoints.down('sm')]: {
                fontSize: '14px',
            },
        },
        breadcrumbSlash: {
            fontSize: '18px',
            color: theme.custom.textSubtle,
            [theme.breakpoints.down('md')]: {
                fontSize: '16px',
            },
            [theme.breakpoints.down('sm')]: {
                fontSize: '14px',
            },
        },
        breadcrumbActive: {
            fontSize: '32px',
            color: theme.palette.primary.main,
            letterSpacing: '-0.02em',
            fontWeight: 400,
            [theme.breakpoints.down('md')]: {
                fontSize: '26px',
            },
            [theme.breakpoints.down('sm')]: {
                fontSize: '20px',
            },
        },
        // Grid/List toggle - a segmented control on one surface step
        adaptersButton: {
            flexShrink: 0,
            '& .MuiToggleButtonGroup-root': {
                height: `${theme.custom.control.compactHeight}px`,
                borderRadius: `${theme.custom.radius.control}px`,
                background: theme.custom.surfaces.surface,
                boxShadow: `inset 0 0 0 1px ${theme.custom.hairline}`,
                padding: '3px',
                gap: '2px',
            },
            '&& .MuiToggleButton-root': {
                border: 'none',
                borderRadius: `${theme.custom.radius.chip}px`,
                padding: '0 10px',
                minWidth: '36px',
                lineHeight: 1,
                background: 'transparent',
                '&:hover': {
                    background: theme.custom.surfaces.raised,
                },
                '&.Mui-selected': {
                    background: theme.custom.surfaces.overlay,
                    '&:hover': {
                        background: theme.custom.surfaces.overlay,
                    },
                },
                '&.Mui-selected img': {
                    filter: 'brightness(0) saturate(100%) invert(64%) sepia(98%) saturate(2476%) hue-rotate(169deg) brightness(101%) contrast(101%)',
                },
            },
            [theme.breakpoints.down('sm')]: {
                display: 'none',
            },
            '& img': {
                width: '18px',
                height: '18px',
                opacity: 0.75,
                filter:
                    theme.palette.mode !== 'dark'
                        ? 'brightness(0) saturate(100%) invert(23%) sepia(89%) saturate(1247%) hue-rotate(175deg) brightness(95%) contrast(101%)'
                        : 'brightness(0) invert(100%)',
            },
        },
        // Cards grid
        adaptersGrid: {
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(244px, 1fr))',
            gap: `${theme.custom.layout.grid}px`,
            marginBottom: '100px',
            // `1fr` keeps the min-content width of the cards as a lower bound, so one long
            // adapter name pushed the whole column past the screen. `minmax(0, 1fr)` lets
            // the track shrink and the card wraps its text instead.
            [theme.breakpoints.down('md')]: {
                marginLeft: !isMenuCollapsed ? '32px' : '0',
                gridTemplateColumns: !isMenuCollapsed
                    ? 'minmax(0, 1fr)'
                    : 'repeat(auto-fit, minmax(min(251px, 100%), 1fr))',
            },
            [theme.breakpoints.down('sm')]: {
                gridTemplateColumns: 'minmax(0, 1fr)',
                gap: '16px',
            },
        },
    };
});
