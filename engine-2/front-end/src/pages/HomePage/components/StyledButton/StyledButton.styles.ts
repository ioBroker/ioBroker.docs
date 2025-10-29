import { makeStyles } from '../../../../theme';

export const useStyles = makeStyles()(theme => ({
    styledButton: {
        border: `1px solid ${theme.palette.primary.main}`,
        borderRadius: '16px',
        padding: '12px 24px',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        cursor: 'pointer',
        minWidth: 250,
        transition: 'background-color 0.3s',
        '&:hover': {
            backgroundColor: 'rgba(29, 144, 202, 0.1)',
        },
    },
    buttonText: {
        fontSize: '24px',
        fontWeight: '400',
        fontFamily: 'Audiowide, sans-serif',
        letterSpacing: '-3%',
        color: theme.palette.text.secondary,
         [theme.breakpoints.down('md')]: {
            fontSize: '22px',
        },
         [theme.breakpoints.down('sm')]: {
            fontSize: '20px',
        },
    },
    
}));
