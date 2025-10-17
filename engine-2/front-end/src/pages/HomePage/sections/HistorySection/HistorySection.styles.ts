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
    historySection: {
        textAlign: 'center',
    },
    historyLogo: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: theme.spacing(2),
        fontFamily: 'Audiowide, sans-serif',
        fontSize: '8rem',
        fontWeight: 'bold',
        marginBottom: theme.spacing(2),
    },
    historyTitle: {
        fontFamily: 'Audiowide, sans-serif',
        fontSize: '2rem',
        marginBottom: theme.spacing(3),
    },
}));
