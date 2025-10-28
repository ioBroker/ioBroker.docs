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
        background: `url(/codeBackground.png) no-repeat center center`,
        backgroundPosition: 'top',
        backgroundSize: 'cover',
    },
    installationsNumber: {
        fontFamily: 'Audiowide, sans-serif',
        fontSize: 'clamp(4rem, 10vw, 8rem)',
        fontWeight: 'bold',
        textAlign: 'left',
        marginBottom: theme.spacing(4),
    },
}));
