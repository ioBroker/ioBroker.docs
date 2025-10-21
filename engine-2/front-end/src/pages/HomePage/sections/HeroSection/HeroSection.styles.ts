import { makeStyles } from '../../../../theme';


export const useStyles = makeStyles()(theme => ({
    container: {
        width: '100%',
        margin: '0 auto',
        padding: '0 64px',
        position: 'relative',
        height: '100%',
        [theme.breakpoints.down('md')]: {
            padding: '0 40px',
        },
        [theme.breakpoints.down('sm')]: {
            padding: '0 20px',
        },
    },
    heroSection: {
        minHeight: 'calc(100vh - 64px)',
        width: '100%',
        backgroundColor: theme.palette.background.default,
        position: 'relative',
        display: 'flex',
        alignItems: 'start',
        justifyContent: 'center',
        overflow: 'hidden',
    },
    heroBackgroundImage: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '100%',
        height: '55%',
        backgroundImage: 'url(/clippedBackground.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'top',
        backgroundRepeat: 'no-repeat',
        zIndex: 0,
        maskImage: 'linear-gradient(to bottom, transparent 0%, black 20%, black 80%, transparent 100%)',
        WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 20%, black 80%, transparent 100%)',
    },
    heroContentWrapper: {
        width: '100%',
        paddingTop: '64px',
        position: 'relative',
        zIndex: 1,
        [theme.breakpoints.down('md')]: {
            paddingBottom: theme.spacing(4),
        }
    },
    heroContent: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        width: '100%',
        [theme.breakpoints.down('md')]: {
            flexDirection: 'column',
            alignItems: 'flex-start',
        },
    },
    heroLeft: {
        textAlign: 'left',
        paddingBottom: '64px',
        [theme.breakpoints.down('md')]: {
            paddingBottom: theme.spacing(3),
        },
    },
    heroLogo: {
        width: '100%',
        maxWidth: '643px',
        marginBottom: '251px',
        marginTop: '36px',
        [theme.breakpoints.down('md')]: {
            marginBottom: theme.spacing(8),
            maxWidth: '400px',
        },
        [theme.breakpoints.down('sm')]: {
            maxWidth: '300px',
        },
    },
    heroPlatformText: {
        fontSize: '24px',
        marginBottom: theme.spacing(9),
        color: 'rgba(255, 255, 255, 0.9)',
        lineHeight: '130%',
        [theme.breakpoints.down('md')]: {
            fontSize: '20px'
        },
    },
    installButton: {
        backgroundColor: theme.palette.secondary.main,
        color: theme.palette.primary.contrastText,
        fontWeight: '400',
        fontFamily: 'Audiowide, sans-serif',
        letterSpacing: '-3%',
        width: '452px',
        height: '54px',
        padding: '14px 138px',
        fontSize: '24px',
        borderRadius: theme.shape.borderRadius,
        '&:hover': {
            backgroundColor: theme.palette.primary.light,
        },
        [theme.breakpoints.down('md')]: {
            width: '100%',
            maxWidth: '400px',
            padding: '14px 32px',
        },
        [theme.breakpoints.down('sm')]: {
            maxWidth: '100%',
            fontSize: '20px',
            height: '48px',
        },
    },
    heroRight: {
        textAlign: 'right',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'end',
        [theme.breakpoints.down('md')]: {
            textAlign: 'left',
            alignItems: 'flex-start',
            marginTop: theme.spacing(3),
        },
    },
    supportText: {
        fontSize: '16px'
    },
    supportIcons: {
        display: 'flex',
        gap: theme.spacing(1.5),
        justifyContent: 'flex-end',
        marginBottom: '24px',
        [theme.breakpoints.down('md')]: {
            justifyContent: 'flex-start',
        },
    },
    supportIconAmazon: {
        border: `1px solid ${theme.palette.primary.main}`,
        borderRadius: theme.shape.borderRadius,
        padding: theme.spacing(1.5),
        width: '112px',
        height: '55px',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'background-color 0.2s',
        '&:hover': {
            backgroundColor: 'rgba(29, 144, 202, 0.1)',
        }
    },
    supportIconPayPal: {
        border: `1px solid ${theme.palette.primary.main}`,
        borderRadius: theme.shape.borderRadius,
        padding: theme.spacing(1.5),
        width: '108px',
        height: '55px',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'background-color 0.2s',
        '&:hover': {
            backgroundColor: 'rgba(29, 144, 202, 0.1)',
        }


    },
    platformTextComment: {
        paddingLeft: '114px',
        [theme.breakpoints.down('md')]: {
            paddingLeft: '40px',
        },
        [theme.breakpoints.down('sm')]: {
            paddingLeft: '20px',
        },
    },
}));
