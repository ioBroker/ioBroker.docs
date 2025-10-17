import { makeStyles } from '../../theme';

export const useHomePageStyles = makeStyles()((theme) => ({
    root: {
        width: '100%',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
    },
    heroSection: {
        position: 'relative',
        width: '100%',
        minHeight: '80vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundImage: 'url(/background.webp)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(8, 11, 28, 0.7)',
            zIndex: 1,
        },
    },
    heroContent: {
        position: 'relative',
        zIndex: 2,
        textAlign: 'center',
        padding: theme.spacing(4),
    },
    heroTitle: {
        color: theme.palette.primary.main,
        marginBottom: theme.spacing(2),
        fontWeight: 700,
        textShadow: '0 0 20px rgba(29, 144, 202, 0.5)',
        [theme.breakpoints.down('md')]: {
            fontSize: '3rem',
        },
        [theme.breakpoints.down('sm')]: {
            fontSize: '2rem',
        },
    },
    heroSubtitle: {
        color: theme.palette.text.primary,
        marginBottom: theme.spacing(1),
        fontWeight: 600,
        [theme.breakpoints.down('md')]: {
            fontSize: '1.5rem',
        },
        [theme.breakpoints.down('sm')]: {
            fontSize: '1.2rem',
        },
    },
    heroDescription: {
        color: theme.palette.text.secondary,
        marginTop: theme.spacing(3),
        fontSize: '1.2rem',
        maxWidth: 600,
        margin: '0 auto',
        marginTop: theme.spacing(3),
        [theme.breakpoints.down('sm')]: {
            fontSize: '1rem',
        },
    },
    contentSection: {
        width: '100%',
        padding: theme.spacing(8, 0),
        backgroundColor: theme.palette.background.default,
        [theme.breakpoints.down('sm')]: {
            padding: theme.spacing(4, 0),
        },
    },
    featuresGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: theme.spacing(4),
        padding: theme.spacing(2),
    },
    featureCard: {
        padding: theme.spacing(4),
        backgroundColor: theme.palette.mode === 'dark' 
            ? 'rgba(29, 144, 202, 0.05)' 
            : 'rgba(29, 144, 202, 0.1)',
        borderRadius: theme.shape.borderRadius,
        border: `1px solid ${theme.palette.primary.main}`,
        transition: 'all 0.3s ease',
        '&:hover': {
            transform: 'translateY(-5px)',
            boxShadow: `0 5px 20px ${theme.palette.primary.main}40`,
            borderColor: theme.palette.primary.light,
        },
    },
    featureTitle: {
        color: theme.palette.primary.main,
        marginBottom: theme.spacing(2),
        fontWeight: 600,
    },
    featureDescription: {
        color: theme.palette.text.primary,
        lineHeight: 1.6,
    },
}));
