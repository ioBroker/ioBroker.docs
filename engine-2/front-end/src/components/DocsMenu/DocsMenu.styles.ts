import { makeStyles } from '../../theme';

export const useDocsMenuStyles = makeStyles()(theme => ({
    container: {
        paddingRight: '12px',
        backgroundColor: theme.palette.mode === 'dark' ? '#080B1C' : '#FFFFFF',
        [theme.breakpoints.down(769)]: {
            borderRadius: '12px',
            border: `2px solid ${theme.palette.primary.main}`,
            padding: '16px 16px',
        },
    },
    menuInner: {
        maxHeight: 'calc(100vh - 125px)',
        maxWidth: '300px',  
        overflowY: 'scroll',
        overflowX: 'hidden',
        paddingRight: '16px',
        backgroundColor: theme.palette.mode === 'dark' ? '#080B1C' : '#FFFFFF',
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
         [theme.breakpoints.down(769)]: {
              maxHeight: '100%',
              overflowY: 'hidden',
              paddingRight: '0px',
        },

    },
    menuTopBar: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        '& img': {
            filter: theme.palette.mode === 'light' ? 'brightness(0) saturate(100%) invert(21%) sepia(96%) saturate(1992%) hue-rotate(190deg) brightness(95%) contrast(91%)' : 'none',
        },
    },
    header: {
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        padding: '10px 0px 0px 0px',
        color: theme.palette.primary.main,
        fontSize: '18px',
        fontFamily: "'Saira', sans-serif",
        fontWeight: 500,
    },
    headerIcon: {
        width: '24px',
        height: '24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    mainLevel: {
        fontSize: 18,
        borderWidth: 0,
        boxShadow: 'none',
        backgroundColor: 'transparent',
        '&:before': {
            backgroundColor: 'transparent',
        },
        '& .MuiAccordionSummary-root': {
            padding: '10px 0px',
            minHeight: 'auto',
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
    },
    sectionTitle: {
        display: 'flex',
        alignItems: 'center',
        width: '272px',
        gap: '8px',
        color: theme.palette.mode === 'dark' ? 'white' : theme.palette.secondary.main,
        fontSize: '18px',
        fontFamily: "'Saira', sans-serif",
        fontWeight: 300,
        cursor: 'pointer',
         [theme.breakpoints.down(769)]: {
               width: '318px',
        },
        [theme.breakpoints.down(481)]: {
               width: 'calc(100%)',
        },
    },
    sectionIcon: {
        width: '24px',
        height: '24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
         '& img': {
            filter: theme.palette.mode !== 'dark'
                ? 'brightness(0) saturate(100%) invert(23%) sepia(89%) saturate(1247%) hue-rotate(175deg) brightness(95%) contrast(101%)'
                : 'none',
        },
    },
    arrowIcon: {
        width: '16px',
        height: '16px',
        marginLeft: 'auto',
        textAlign: 'center',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    childrenLevel: {
        paddingLeft: 32,
        fontSize: 16,
        fontWeight: 300,
        paddingTop: 0,
        paddingBottom: 0,
        '& a': {
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: 0,
            color: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.7)' : theme.palette.secondary.main,
            textDecoration: 'none',
            fontSize: '16px',
            fontFamily: "'Saira', sans-serif",
            fontWeight: 300,
            '&::before': {
                content: '""',
                width: '6px',
                height: '6px',
                borderRadius: '50%',
                backgroundColor: 'currentColor',
                flexShrink: 0,
            },
            '&:hover': {
                color: theme.palette.primary.main,
            },
        },
    },
}));
