import { makeStyles } from '../../../../theme';

export const useStyles = makeStyles()(theme => ({
    platformSection: {
        position: 'relative',
        height: '100%',
        background: `url(/image-code.png) no-repeat center center`,
        backgroundPosition: 'top',
        backgroundColor: theme.palette.background.default,
        backgroundSize: 'contain',
        overflow: 'hidden',
        padding: '96px 0',
        // a quiet light over the code background, so it stays readable behind the claim
        '&::before': {
            content: '""',
            position: 'absolute',
            top: '48%',
            left: '16%',
            transform: 'translate(-50%, -50%)',
            width: 'min(780px, 60%)',
            height: '62%',
            background:
                theme.palette.mode === 'dark'
                    ? 'radial-gradient(ellipse at center, rgba(35, 86, 174, 0.2) 0%, rgba(29, 144, 202, 0.1) 30%, rgba(29, 144, 202, 0.04) 58%, rgba(29, 144, 202, 0) 85%)'
                    : 'none',
            filter: 'blur(70px)',
            pointerEvents: 'none',
            zIndex: 0,
        },
        [theme.breakpoints.down('md')]: {
            padding: '64px 0',
        },
        [theme.breakpoints.down('sm')]: {
            padding: '48px 0',
        },
        [theme.breakpoints.down('sm')]: {
            padding: '48px 0',
            height: 'auto',
        },
    },
    container: {
        maxWidth: 1376,
        margin: '0 auto',
        padding: '0 32px',
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
            width: '100%',
        },
    },
    platformTitle: {
        fontFamily: 'Audiowide, sans-serif',
        fontSize: '56px',
        lineHeight: '110%',
        fontWeight: '400',
        letterSpacing: '-0.03em',
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
        letterSpacing: '-0.03em',
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
