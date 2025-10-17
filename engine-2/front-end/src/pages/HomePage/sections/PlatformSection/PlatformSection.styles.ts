import { makeStyles } from '../../../../theme';

export const useStyles = makeStyles()(theme => ({
    container: {
        maxWidth: 1200,
        margin: '0 auto',
        padding: '0 40px',
        [theme.breakpoints.down('sm')]: {
            padding: '0 20px',
        },
    },
    section: {
        padding: '100px 0',
    },
    platformTitle: {
        fontFamily: 'Audiowide, sans-serif',
        fontSize: 'clamp(3rem, 6vw, 5rem)',
        lineHeight: 1.1,
        marginBottom: theme.spacing(3),
    },
    platformSubtitle: {
        maxWidth: 600,
        marginBottom: theme.spacing(4),
        fontSize: '1rem',
        color: 'rgba(255, 255, 255, 0.8)',
    },
}));
