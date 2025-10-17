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
    infoCard: {
        border: `1px solid ${theme.palette.divider}`,
        padding: theme.spacing(3),
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: theme.spacing(2),
    },
}));
