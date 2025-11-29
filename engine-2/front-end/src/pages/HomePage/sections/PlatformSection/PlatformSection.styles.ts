import { makeStyles } from '../../../../theme';

export const useStyles = makeStyles()(theme => ({
    platformSection: {
        position: 'relative',
        // marginTop: '70px',
        paddingTop: '140px',
        height: '100%',
        background: `url(/image-code.png) no-repeat center center`,
        backgroundPosition: 'top',
        backgroundColor: theme.palette.background.default,
        backgroundSize: 'contain',
        overflow: 'hidden',
        paddingBottom: '60px',
        [theme.breakpoints.down('md')]: {
            paddingTop: '40px',
            marginTop: '60px',
        },
        [theme.breakpoints.down('sm')]: {
            paddingBottom: '40px',
            height: 'auto',
        },
        '&::before': {
            content: '""',
            position: 'absolute',
            top: '40%',
            left: '5%',
            transform: 'translate(-50%, -50%)',
            width: '1200px',
            height: '1200px',
            opacity: 0.5,
            background:
                theme.palette.mode === 'dark'
                    ? 'radial-gradient(circle, rgba(35, 86, 174, 0.5) 0%, rgba(255, 255, 255, 0) 55%)'
                    : 'radial-gradient(circle, rgba(255, 255, 255, 0.8) 0%, rgba(255, 255, 255, 0) 55%)',
            [theme.breakpoints.down('md')]: {
                width: '600px',
                height: '600px',
            },
            [theme.breakpoints.down('sm')]: {
                // background: 'radial-gradient(ellipse, rgba(35, 86, 174, 0.5) 0%, rgba(255, 255, 255, 0) 55%)',
                background:
                    theme.palette.mode === 'dark'
                        ? 'radial-gradient(ellipse, rgba(35, 86, 174, 0.5) 0%, rgba(255, 255, 255, 0) 55%)'
                        : 'none',
                left: '50%',
                top: '95%',
                width: '400px',
                height: '150px',
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
    platformTitleWrapper: {
        [theme.breakpoints.down('sm')]: {
            textAlign: 'left',
            marginBottom: theme.spacing(4),
            width: '100%'
        },
    },
    platformTitle: {
        fontFamily: 'Audiowide, sans-serif',
        fontSize: '56px',
        lineHeight: '110%',
        fontWeight: '400',
        letterSpacing: '-3%',
        color: theme.palette.text.primary,
        [theme.breakpoints.down('md')]: {
            fontSize: '36px',
            textTransform: 'uppercase',
        },
        [theme.breakpoints.down('sm')]: {
            fontSize: '24px',
        },
    },
    platformTitleBlue: {
        fontFamily: 'Audiowide, sans-serif',
        fontSize: 56,
        lineHeight: '110%',
        fontWeight: '400',
        letterSpacing: '-3%',
        color: theme.palette.text.secondary,
        marginBottom: theme.spacing(8),
        [theme.breakpoints.down('md')]: {
            fontSize: '36px',
            textTransform: 'uppercase',
            lineHeight: '1.3',
            marginBottom: theme.spacing(6),
        },
        [theme.breakpoints.down('sm')]: {
            marginBottom: theme.spacing(4),
            fontSize: '24px',
        },
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
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        [theme.breakpoints.down('md')]: {
            maxWidth: '75%',
        },
        [theme.breakpoints.down('sm')]: {
            maxWidth: '100%',
            alignItems: 'center',
        },
    },
    platformHeadSubtitle: {
        marginBottom: theme.spacing(3),
        textIndent: '2em',
        fontSize: '18px',
        lineHeight: 1.6,
        [theme.breakpoints.down('sm')]: {
            fontSize: '18px',
            marginBottom: theme.spacing(2),
        },
    },
    platformSubtitle: {
        marginBottom: theme.spacing(3),
        fontSize: '18px',
        lineHeight: 1.6,
        [theme.breakpoints.down('sm')]: {
            fontSize: '18px',
            marginBottom: theme.spacing(2),
        },
    },
}));
