import { makeStyles } from '../../../../theme';

export const useStyles = makeStyles()(theme => ({
    section: {
        position: 'relative',
        marginTop: '145px',
        height: '100vh',
        background: `url(/codeBackground.png) no-repeat center center`,
        backgroundColor: theme.palette.background.default, 
        backgroundSize: 'cover',
        overflow: 'hidden', 
        '&::before': {
            content: '""',
            position: 'absolute',
            top: '50%',
            left: '25%', 
            transform: 'translate(-50%, -50%)',
            width: '1000px',
            height: '1000px',
            background: 'radial-gradient(circle, rgba(0, 88, 148, 0.7) 0%, rgba(255, 255, 255, 0) 55%)',
            pointerEvents: 'none',
        },
    },
    container: {
        maxWidth: 1400,
        margin: '0 auto',
        padding: '0 40px',
        position: 'relative',
        zIndex: 1,
        [theme.breakpoints.down('sm')]: {
            padding: '0 20px',
        },
    },
    platformTitle: {
        fontFamily: 'Audiowide, sans-serif',
        fontSize: '86px',
        lineHeight: '110%',
        fontWeight: '400',
        letterSpacing: '-3%',
        marginBottom: theme.spacing(8),
        color: theme.palette.text.primary,
    },
    platformTitleBlue: {
        color: theme.palette.text.secondary,
    },
    descriptionWrapper: {
        display: 'flex',
        justifyContent: 'flex-end',
    },
    descriptionContainer: {
        maxWidth: '867px', 
        [theme.breakpoints.down('md')]: {
            maxWidth: '75%',
        },
        [theme.breakpoints.down('sm')]: {
            maxWidth: '100%',
        },
    },
    platformSubtitle: {
        marginBottom: theme.spacing(3),
        fontSize: '1rem',
        lineHeight: 1.6,
        color: 'rgba(255, 255, 255, 0.8)',
    },
}));