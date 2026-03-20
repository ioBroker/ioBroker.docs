import { makeStyles } from '../../theme';

export const useDocsTableOfContentsStyles = makeStyles()(theme => ({
    container: {
        top: '1px',
        width: '222px',
        padding: '10px',
        alignSelf: 'flex-start',
        border: `1px solid ${theme.palette.primary.main}`,
        borderRadius: '8px',
        backgroundColor: theme.palette.mode === 'dark' ? '#080B1C' : '#FFFFFF',
        flexShrink: 0,
    },
    title: {
        fontSize: '18px',
        fontWeight: 400,
        color: theme.palette.primary.main,
        marginBottom: '16px',
        letterSpacing: '0.1em',
    },
     subTitle: {
        fontSize: '16px',
        fontWeight: 400,
        color: theme.palette.text.primary,
        marginBottom: '16px',
        letterSpacing: '0em',
    },
    list: {
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
    },
    item: {
        fontSize: '14px',
        fontWeight: 300,
        color: theme.palette.mode === 'dark' ? 'white' : theme.palette.secondary.main,
        cursor: 'pointer',
        transition: 'color 0.2s',
        '&:hover': {
            color: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.7)' : theme.palette.primary.main,
        },
    },
    subtitlesList: {
        display: 'flex',
        flexDirection: 'column',
        gap: '0px',
        marginTop: '8px',
        marginLeft: '8px',
    },
    subItem: {
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        fontSize: '14px',
        fontWeight: 300,
        color: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.5)' : 'rgba(0, 88, 148, 0.8)',
        cursor: 'pointer',
        transition: 'color 0.2s',
        '&:hover': {
            color: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 88, 148)',
        },
    },
    bullet: {
        fontSize: '16px',
        lineHeight: 1,
    },
}));
