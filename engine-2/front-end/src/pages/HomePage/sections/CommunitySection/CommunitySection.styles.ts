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
    communityText: {
        maxWidth: '80%',
        marginBottom: theme.spacing(5),
        [theme.breakpoints.down('md')]: {
            maxWidth: '100%',
        },
    },
    statsContainer: {
        display: 'flex',
        justifyContent: 'space-between',
        gap: theme.spacing(4),
        [theme.breakpoints.down('md')]: {
            flexDirection: 'column',
        },
    },
    statCard: {
        flex: 1,
        border: `1px solid ${theme.palette.primary.main}`,
        borderLeftWidth: 10,
        borderRightWidth: 10,
        padding: theme.spacing(4),
        textAlign: 'center',
    },
    statNumber: {
        fontFamily: 'Audiowide, sans-serif',
        fontSize: '3rem',
        fontWeight: 'bold',
    },
    statLabel: {
        marginBottom: theme.spacing(3),
    },
    joinButton: {
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.primary.contrastText,
        padding: '10px 30px',
        border: 'none',
        borderRadius: 4,
        cursor: 'pointer',
        textTransform: 'uppercase',
    },
}));
