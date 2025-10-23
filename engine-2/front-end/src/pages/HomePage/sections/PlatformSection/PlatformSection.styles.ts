import { makeStyles } from '../../../../theme';

export const useStyles = makeStyles()(theme => ({
    section: {
        position: 'relative',
        marginTop: '165px',
        height: '100%',
        background: `url(/codeBackground.png) no-repeat center center`,
        backgroundColor: theme.palette.background.default,
        backgroundSize: 'cover',
        overflow: 'hidden',
        paddingBottom: '60px',
        [theme.breakpoints.down('md')]: {
            marginTop: '80px',
        },
        [theme.breakpoints.down('sm')]: {
            marginTop: '60px',
            paddingBottom: '40px',
            height: 'auto'
        },
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
            [theme.breakpoints.down('md')]: {
                width: '600px',
                height: '600px',
                left: '30%',
            },
            [theme.breakpoints.down('sm')]: {
                width: '400px',
                height: '400px',
                left: '50%',
            },
        },
    },
    container: {
        maxWidth: 1400,
        margin: '0 auto',
        padding: '0 40px',
        position: 'relative',
        zIndex: 1,
        [theme.breakpoints.down('md')]: {
            padding: '0 30px',
        },
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
        [theme.breakpoints.down('md')]: {
            fontSize: '56px',
            marginBottom: theme.spacing(6),
        },
        [theme.breakpoints.down('sm')]: {
            fontSize: '36px',
            marginBottom: theme.spacing(4),
        },
    },
    platformTitleBlue: {
        color: theme.palette.text.secondary,
    },
    descriptionWrapper: {
        display: 'flex',
        justifyContent: 'flex-end',
        [theme.breakpoints.down('sm')]: {
            justifyContent: 'center',
        },
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
        [theme.breakpoints.down('sm')]: {
            fontSize: '0.9rem',
            marginBottom: theme.spacing(2),
        },
    },
}));