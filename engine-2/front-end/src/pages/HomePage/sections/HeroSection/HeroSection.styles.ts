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
        backgroundImage: 'url(/background.webp)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',


        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    heroContentWrapper: {
        width: '100%',
        marginTop: 'auto',
        paddingBottom: theme.spacing(8),
        [theme.breakpoints.down('md')]: {
            paddingBottom: theme.spacing(4),
        }
    },
    heroContent: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        width: '100%',
    },
    heroLeft: {
        textAlign: 'left',
        height: '100vh'
    },
    heroLogo: {
        width: '100%',
        maxWidth: '643px',
        marginBottom: '251px',
        marginTop: '100px'
    },
    heroSlogan: {
        fontFamily: 'Audiowide, sans-serif',
        fontSize: '1.25rem',
        color: theme.palette.primary.main,
        marginBottom: theme.spacing(8),
    },
    heroPlatformText: {
        fontSize: '24px',
        marginBottom: theme.spacing(9),
        color: 'rgba(255, 255, 255, 0.9)',
        lineHeight: '130%',
    },
    installButton: {
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.primary.contrastText,
        fontWeight: 'bold',
        padding: '14px 40px',
        fontSize: '1rem',
        borderRadius: theme.shape.borderRadius,
        '&:hover': {
            backgroundColor: theme.palette.primary.light,
        },
    },
    heroRight: {
        textAlign: 'right',
        [theme.breakpoints.down('md')]: {
            display: 'none',
        },
    },
    supportText: {
        fontSize: '0.9rem',
        marginBottom: '150px',
    },
    supportIcons: {
        display: 'flex',
        gap: theme.spacing(1.5),
        justifyContent: 'flex-end',
        marginBottom: '24px'
    },
    supportIcon: {
        border: `1px solid ${theme.palette.primary.main}`,
        borderRadius: theme.shape.borderRadius,
        padding: theme.spacing(1.5),
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'background-color 0.2s',
        '&:hover': {
            backgroundColor: 'rgba(29, 144, 202, 0.1)',
        }
    },
}));
