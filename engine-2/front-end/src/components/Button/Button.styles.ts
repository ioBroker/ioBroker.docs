import { makeStyles } from '../../theme';

export const useStyles = makeStyles()(theme => ({
    button: {
        border: 'none',
        cursor: 'pointer',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxSizing: 'border-box',
        transition: 'background-color 0.2s ease, color 0.2s ease, box-shadow 0.2s ease',
        '&:focus-visible': {
            outline: 'none',
            boxShadow: theme.custom.focusRing,
        },
    },
    primary: {
        fontFamily: 'Audiowide, sans-serif',
        fontWeight: 400,
        textTransform: 'uppercase',
        letterSpacing: '0.02em',
        height: theme.custom.control.height,
        minWidth: 200,
        padding: '0 24px',
        fontSize: '15px',
        borderRadius: theme.custom.radius.control,
        backgroundColor: `${theme.palette.secondary.main} !important`,
        color: '#FFFFFF',
        '&:hover': {
            backgroundColor: `${theme.palette.secondary.light} !important`,
        },
        '&:active': {
            backgroundColor: `${theme.palette.secondary.dark} !important`,
        },
        [theme.breakpoints.down('sm')]: {
            width: '100%',
            minWidth: 0,
            fontSize: '14px',
        },
    },
    secondary: {
        fontFamily: theme.typography.fontFamily,
        fontWeight: 400,
        height: theme.custom.control.height,
        minWidth: 200,
        padding: '0 20px',
        fontSize: '15px',
        borderRadius: theme.custom.radius.control,
        backgroundColor: 'transparent',
        boxShadow: `inset 0 0 0 1px ${theme.custom.hairlineStrong}`,
        color: theme.palette.mode === 'dark' ? theme.palette.primary.light : theme.palette.secondary.main,
        '&:hover': {
            backgroundColor: theme.custom.surfaces.raised,
            color: theme.palette.text.primary,
        },
        [theme.breakpoints.down('sm')]: {
            width: '100%',
            minWidth: 0,
            fontSize: '14px',
        },
    },
}));
