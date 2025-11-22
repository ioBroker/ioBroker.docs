import { makeStyles } from '../../theme';

export const useStyles = makeStyles()(theme => ({
    styledButton: {
        border: `1px solid ${theme.palette.primary.main}`,
        borderRadius: '12px',
        padding: '12px 24px',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        cursor: 'pointer',
        minWidth: 250,
        transition: 'background-color 0.3s',
        backgroundColor: theme.palette.mode === 'light' ? '#005894' : 'transparent',
        '&:hover': {
            backgroundColor: theme.palette.mode === 'light' ? '#004a7a' : 'rgba(29, 144, 202, 0.1)',
        },
        [theme.breakpoints.down('sm')]: {
            borderRadius: '8px',
        },
    },
    buttonText: {
        fontSize: '24px',
        fontWeight: '400',
        fontFamily: 'Audiowide, sans-serif',
        letterSpacing: '-3%',
        color: theme.palette.mode === 'light' ? '#FFFFFF' : theme.palette.text.secondary,
        [theme.breakpoints.down('md')]: {
            fontSize: '16px',
        },
    },
}));
