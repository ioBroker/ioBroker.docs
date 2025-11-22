import { makeStyles } from '../../theme';

export const useStyles = makeStyles()(theme => ({
    button: {
        border: 'none',
        fontWeight: '400',
        fontFamily: 'Audiowide, sans-serif',
        cursor: 'pointer',
        textTransform: 'uppercase',
        transition: 'background-color 0.2s',
    },
    primary: {
        backgroundColor: '#005894 !important',
        color: '#fff',
        letterSpacing: '-3%',
        width: '469px',
        height: '60px',
        padding: '14px 138px',
        fontSize: '19px',
        borderRadius: theme.shape.borderRadius,
        '&:focus': {
            backgroundColor: '#005894 !important',
        },
        '&:hover': {
            backgroundColor: '#7ec3f3 !important',
        },
        [theme.breakpoints.down('md')]: {
            width: 'calc(100% - 60px)',
                height: '48px',
            borderRadius: '8px',
            fontSize: '18px',
            padding: '14px 0',
        },
    },
    secondary: {
        height: '60px',
        width: '319px',
        backgroundColor: theme.palette.secondary.main,
        color: theme.palette.primary.contrastText,
        borderRadius: '12px',
        fontSize: '16px',
        letterSpacing: '-0.03em',
        padding: '10px 40px',
        '&:hover': {
            backgroundColor: theme.palette.primary.main,
            color: theme.palette.primary.contrastText,
        },
        [theme.breakpoints.down('sm')]: {
            width: '100%',
            maxWidth: '140px',
            backgroundColor: 'transparent',
            border: `1px solid ${theme.palette.secondary.main}`,
            color: theme.palette.text.primary,
            height: '32px',
            fontSize: '10px',
            padding: '5px 10px',
            borderRadius: '6px',
        },
    },
}));
