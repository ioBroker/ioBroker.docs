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
    newsletterContent: {
        display: 'flex',
        gap: theme.spacing(5),
        alignItems: 'center',
        [theme.breakpoints.down('md')]: {
            flexDirection: 'column',
        },
    },
    newsletterInputContainer: {
        border: `1px solid ${theme.palette.primary.main}`,
        borderLeftWidth: 10,
        borderRightWidth: 10,
        display: 'flex',
        alignItems: 'center',
        padding: `0 ${theme.spacing(1)}`,
        flex: 1,
        width: '100%',
    },
    newsletterInput: {
        flex: 1,
        backgroundColor: 'transparent',
        border: 'none',
        color: theme.palette.text.primary,
        padding: theme.spacing(2),
        fontSize: '1rem',
        outline: 'none',
    },
}));
