import { makeStyles } from '../../theme';

const LIGHT_ICON_FILTER =
    'brightness(0) saturate(100%) invert(23%) sepia(89%) saturate(1247%) hue-rotate(175deg) brightness(95%) contrast(101%)';

export const useDocsMenuStyles = makeStyles()(theme => {
    const isDark = theme.palette.mode === 'dark';

    return {
        container: {
            paddingRight: '12px',
            backgroundColor: 'transparent',
            // fills the column below the fixed tool row, the list inside scrolls
            flex: 1,
            minHeight: 0,
            display: 'flex',
            flexDirection: 'column',
            // on small screens the menu is an overlay panel - there it becomes a surface
            [theme.breakpoints.down(769)]: {
                borderRadius: `${theme.custom.radius.card}px`,
                backgroundColor: theme.custom.surfaces.surface,
                boxShadow: theme.custom.elevation.overlay,
                padding: '16px',
            },
        },
        menuInner: {
            flex: 1,
            minHeight: 0,
            maxWidth: '300px',
            overflowY: 'auto',
            overflowX: 'hidden',
            paddingRight: '12px',
            backgroundColor: 'transparent',
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
            [theme.breakpoints.down(769)]: {
                maxHeight: '100%',
                maxWidth: '360px',
                overflowY: 'hidden',
                paddingRight: '0px',
            },
        },
        menuTopBar: {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '12px',
            '& img': {
                filter: isDark ? 'none' : LIGHT_ICON_FILTER,
            },
        },
        // the documentation root sits above the tree, a little heavier - but it is
        // only coloured when it is the page you are actually on
        header: {
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            padding: '8px 12px',
            marginBottom: '4px',
            borderRadius: `${theme.custom.radius.control}px`,
            color: theme.palette.text.primary,
            fontSize: '16px',
            fontFamily: "'Roboto', sans-serif",
            fontWeight: 700,
            '& a': {
                color: 'inherit',
                textDecoration: 'none',
            },
            '&:hover': {
                background: theme.custom.surfaces.surface,
            },
        },
        headerActive: {
            color: theme.palette.primary.main,
            background: theme.custom.surfaces.raised,
            '&:hover': {
                background: theme.custom.surfaces.raised,
            },
        },
        headerIcon: {
            width: '22px',
            height: '22px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
        },
        mainLevel: {
            fontSize: 16,
            borderWidth: 0,
            boxShadow: 'none',
            backgroundColor: 'transparent',
            backgroundImage: 'none',
            '&:before': {
                backgroundColor: 'transparent',
            },
            '& .MuiAccordionSummary-root': {
                padding: '0px',
                minHeight: 'auto',
                borderRadius: `${theme.custom.radius.control}px`,
                transition: 'background 0.2s ease',
                '&:hover': {
                    background: theme.custom.surfaces.surface,
                },
                '&.Mui-expanded': {
                    minHeight: 'auto',
                },
            },
            '& .MuiAccordionSummary-content': {
                margin: 0,
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                '&.Mui-expanded': {
                    margin: 0,
                },
            },
            '& .MuiAccordionSummary-expandIconWrapper': {
                display: 'none',
            },
            '& .MuiAccordionDetails-root': {
                paddingTop: '2px',
                paddingBottom: '2px',
            },
        },
        sectionTitle: {
            display: 'flex',
            alignItems: 'center',
            width: '272px',
            gap: '10px',
            padding: '8px 12px',
            boxSizing: 'border-box',
            color: theme.palette.text.primary,
            fontSize: '16px',
            lineHeight: 1.35,
            fontFamily: "'Roboto', sans-serif",
            fontWeight: 400,
            cursor: 'pointer',
            [theme.breakpoints.down(769)]: {
                width: '318px',
            },
            [theme.breakpoints.down(481)]: {
                width: '100%',
            },
        },
        sectionIcon: {
            width: '22px',
            height: '22px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
            '& img': {
                width: '20px',
                height: '20px',
                opacity: isDark ? 0.85 : 1,
                filter: isDark ? 'none' : LIGHT_ICON_FILTER,
            },
        },
        arrowIcon: {
            width: '14px',
            height: '14px',
            marginLeft: 'auto',
            flexShrink: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            opacity: 0.6,
            '& img': {
                width: '12px',
                height: '12px',
                filter: isDark ? 'none' : LIGHT_ICON_FILTER,
            },
        },
        // leaf pages: a dot instead of a folder, hover fills the row
        leaf: {
            '& a': {
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                padding: '7px 12px',
                borderRadius: `${theme.custom.radius.control}px`,
                color: theme.custom.textMuted,
                textDecoration: 'none',
                fontSize: '15px',
                lineHeight: 1.35,
                fontFamily: "'Roboto', sans-serif",
                fontWeight: 400,
                transition: 'background 0.2s ease, color 0.2s ease',
                '&::before': {
                    content: '""',
                    width: '5px',
                    height: '5px',
                    borderRadius: '50%',
                    backgroundColor: 'currentColor',
                    flexShrink: 0,
                    opacity: 0.6,
                },
                '&:hover': {
                    color: theme.palette.text.primary,
                    background: theme.custom.surfaces.surface,
                },
            },
        },
        childrenLevel: {
            paddingLeft: 32,
            fontSize: 15,
            paddingTop: 0,
            paddingBottom: 0,
            '& a': {
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                padding: '7px 12px',
                borderRadius: `${theme.custom.radius.control}px`,
                color: theme.custom.textMuted,
                textDecoration: 'none',
                fontSize: '15px',
                lineHeight: 1.35,
                fontFamily: "'Roboto', sans-serif",
                fontWeight: 400,
                transition: 'background 0.2s ease, color 0.2s ease',
                '&::before': {
                    content: '""',
                    width: '5px',
                    height: '5px',
                    borderRadius: '50%',
                    backgroundColor: 'currentColor',
                    flexShrink: 0,
                    opacity: 0.6,
                },
                '&:hover': {
                    color: theme.palette.text.primary,
                    background: theme.custom.surfaces.surface,
                },
            },
        },
        // current page
        activeLink: {
            '& a': {
                color: theme.palette.primary.main,
                fontWeight: 700,
                background: theme.custom.surfaces.raised,
                '&::before': {
                    opacity: 1,
                },
                '&:hover': {
                    color: theme.palette.primary.main,
                    background: theme.custom.surfaces.raised,
                },
            },
        },
    };
});
