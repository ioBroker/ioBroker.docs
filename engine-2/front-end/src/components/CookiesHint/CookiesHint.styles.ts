import { makeStyles } from '../../theme';

/** the card is always the brand blue, so its content is white in both themes */
const ON_BLUE = '#FFFFFF';

export const useStyles = makeStyles()(theme => ({
    overlay: {
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        backgroundColor: 'rgba(0, 0, 0, 0.55)',
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
        padding: '24px',
        boxSizing: 'border-box',
        [theme.breakpoints.down('sm')]: {
            padding: '12px',
            alignItems: 'center',
            justifyContent: 'center',
        },
    },
    card: {
        width: '100%',
        maxWidth: '650px',
        boxSizing: 'border-box',
        padding: '40px',
        borderRadius: '24px',
        backgroundColor: theme.palette.secondary.main,
        color: ON_BLUE,
        boxShadow: theme.custom.elevation.overlay,
        maxHeight: '100%',
        overflowY: 'auto',
        [theme.breakpoints.down('sm')]: {
            padding: '24px 20px',
            borderRadius: '20px',
        },
    },
    titleRow: {
        display: 'flex',
        alignItems: 'center',
        gap: '20px',
        marginBottom: '20px',
        '& svg': {
            width: '40px',
            height: '40px',
            flexShrink: 0,
        },
        [theme.breakpoints.down('sm')]: {
            gap: '14px',
            '& svg': {
                width: '32px',
                height: '32px',
            },
        },
    },
    title: {
        fontFamily: theme.typography.h1.fontFamily,
        fontSize: '30px',
        fontWeight: 400,
        lineHeight: 1.1,
        [theme.breakpoints.down('sm')]: {
            fontSize: '24px',
        },
    },
    text: {
        fontSize: '16px',
        lineHeight: 1.5,
        marginBottom: '24px',
        [theme.breakpoints.down('sm')]: {
            fontSize: '15px',
        },
    },
    customize: {
        display: 'inline-block',
        marginBottom: '28px',
        fontSize: '16px',
        textDecoration: 'underline',
        textUnderlineOffset: '4px',
        cursor: 'pointer',
        background: 'none',
        border: 'none',
        padding: 0,
        color: 'inherit',
        fontFamily: 'inherit',
        '&:hover': {
            opacity: 0.85,
        },
    },
    options: {
        display: 'flex',
        flexDirection: 'column',
        gap: '4px',
        marginBottom: '28px',
    },
    option: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '16px',
        fontSize: '16px',
    },
    // white knob, the track fills up when the option is on
    toggle: {
        '&.MuiSwitch-root': {
            padding: '9px',
        },
        '& .MuiSwitch-thumb': {
            backgroundColor: ON_BLUE,
        },
        '& .MuiSwitch-track': {
            borderRadius: '50px',
            border: `1px solid ${ON_BLUE}`,
            backgroundColor: 'transparent',
            opacity: 1,
        },
        '& .Mui-checked + .MuiSwitch-track': {
            backgroundColor: `${theme.palette.primary.main} !important`,
            borderColor: theme.palette.primary.main,
            opacity: 1,
        },
        '& .Mui-disabled + .MuiSwitch-track': {
            opacity: 0.7,
        },
        '& .Mui-disabled .MuiSwitch-thumb': {
            backgroundColor: ON_BLUE,
        },
    },
    buttons: {
        display: 'flex',
        gap: '16px',
        marginBottom: '28px',
        [theme.breakpoints.down('sm')]: {
            flexDirection: 'column',
            gap: '12px',
        },
    },
    button: {
        flex: 1,
        minHeight: '48px',
        padding: '10px 20px',
        borderRadius: `${theme.custom.radius.control}px`,
        fontFamily: theme.typography.fontFamily,
        fontSize: '16px',
        fontWeight: 400,
        lineHeight: 1.2,
        textTransform: 'none',
        cursor: 'pointer',
        transition: 'background-color 0.2s ease, color 0.2s ease',
    },
    buttonOutline: {
        border: `1px solid ${ON_BLUE}`,
        backgroundColor: 'transparent',
        color: ON_BLUE,
        '&:hover': {
            backgroundColor: 'rgba(255, 255, 255, 0.12)',
        },
    },
    buttonSolid: {
        border: `1px solid ${ON_BLUE}`,
        backgroundColor: ON_BLUE,
        color: theme.palette.secondary.main,
        '&:hover': {
            backgroundColor: 'rgba(255, 255, 255, 0.88)',
        },
    },
    links: {
        display: 'flex',
        gap: '24px',
        fontSize: '14px',
    },
    link: {
        color: ON_BLUE,
        textDecoration: 'none',
        cursor: 'pointer',
        '&:hover': {
            textDecoration: 'underline',
            textUnderlineOffset: '4px',
        },
    },
}));
