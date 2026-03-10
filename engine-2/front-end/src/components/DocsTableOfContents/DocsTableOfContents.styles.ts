import { makeStyles } from '../../theme';

export const useDocsTableOfContentsStyles = makeStyles()(theme => ({
    container: {
        position: 'sticky',
        top: '100px',
        width: '250px',
        padding: '20px',
         alignSelf: 'flex-start',
        border: `1px solid ${theme.palette.primary.main}`,
        borderRadius: '8px',
        backgroundColor: theme.palette.mode === 'dark' ? '#080B1C' : '#FFFFFF',
        marginLeft: '40px',
        flexShrink: 0,
    },
    title: {
        fontSize: '14px',
        fontWeight: 600,
        color: theme.palette.primary.main,
        marginBottom: '16px',
        letterSpacing: '0.5px',
    },
    list: {
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
    },
    item: {
        fontSize: '14px',
        color: theme.palette.mode === 'dark' ? '#a0aec0' : '#4a5568',
        cursor: 'pointer',
        transition: 'color 0.2s',
        '&:hover': {
            color: theme.palette.mode === 'dark' ? '#63b3ed' : '#3182ce',
        },
    },
}));
