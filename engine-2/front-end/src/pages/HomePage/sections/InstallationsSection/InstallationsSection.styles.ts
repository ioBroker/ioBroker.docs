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
    installationsNumber: {
        fontFamily: 'Audiowide, sans-serif',
        fontSize: 'clamp(4rem, 10vw, 8rem)',
        textAlign: 'center',
        fontWeight: 'bold',
        marginBottom: theme.spacing(4),
    },
}));
