import { makeStyles } from '../../theme';

export const useDocsMenuStyles = makeStyles()(theme => ({
    container: {
        maxHeight: 'calc(100vh - 125px)',
        overflowY: 'scroll',
        overflowX: 'hidden',
        paddingRight: '12px',
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
    },
    header: {
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        padding: '10px 0px',
        color: theme.palette.primary.main,
        fontSize: '18px',
        fontFamily: "'Saira', sans-serif",
        fontWeight: 500,
        marginBottom: '8px',
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
        gap: '8px',
        color: theme.palette.mode === 'dark' ? 'white' : theme.palette.secondary.main,
        fontSize: '18px',
        fontFamily: "'Saira', sans-serif",
        fontWeight: 200,
        cursor: 'pointer',
    },
    sectionIcon: {
        width: '24px',
        height: '24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    arrowIcon: {
        width: '16px',
        height: '16px',
        marginLeft: 'auto',
    },
    childrenLevel: {
        paddingLeft: 32,
        fontSize: 16,
        paddingTop: 0,
        paddingBottom: 0,
        '& a': {
            display: 'block',
            padding: '8px 0',
            color: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.7)' : theme.palette.secondary.main,
            textDecoration: 'none',
            fontSize: '16px',
            fontFamily: "'Saira', sans-serif",
            fontWeight: 200,
            '&:hover': {
                color: theme.palette.primary.main,
            },
        },
    },
}));
