import { makeStyles } from '../../theme';

export const useStyles = makeStyles()(theme => ({
    styledButton: {
        minHeight: theme.custom.control.height,
        padding: '10px 20px',
        borderRadius: theme.custom.radius.control,
        border: 'none',
        boxShadow: `inset 0 0 0 1px ${theme.custom.hairlineStrong}`,
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        cursor: 'pointer',
        minWidth: 250,
        backgroundColor: 'transparent',
        transition: 'background-color 0.2s ease, box-shadow 0.2s ease',
        '&:hover': {
            backgroundColor: theme.custom.surfaces.raised,
        },
        '&:focus-visible': {
            outline: 'none',
            boxShadow: theme.custom.focusRing,
        },
        [theme.breakpoints.down('sm')]: {
            minWidth: 0,
        },
    },
    /** large content panel - a surface instead of an outline */
    surface: {
        boxShadow: theme.custom.elevation.card,
        backgroundColor: theme.custom.surfaces.surface,
        borderRadius: `${theme.custom.radius.card}px`,
        alignItems: 'flex-start',
        '&:hover': {
            backgroundColor: theme.custom.surfaces.raised,
            boxShadow: theme.custom.elevation.raised,
        },
    },
    buttonText: {
        fontSize: '16px',
        fontWeight: '400',
        fontFamily: theme.typography.fontFamily,
        letterSpacing: '0.01em',
        color: theme.palette.mode === 'light' ? theme.palette.secondary.main : theme.palette.primary.light,
        [theme.breakpoints.down('md')]: {
            fontSize: '15px',
        },
    },
    /** button label of the kit - Audiowide, uppercase */
    buttonLabel: {
        fontFamily: 'Audiowide, sans-serif',
        fontSize: '15px',
        letterSpacing: '0.02em',
        textTransform: 'uppercase',
    },
}));
