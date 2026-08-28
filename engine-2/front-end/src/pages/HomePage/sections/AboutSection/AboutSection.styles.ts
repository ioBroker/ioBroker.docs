import { makeStyles } from '../../../../theme';

export const useStyles = makeStyles()(theme => ({
    container: {
        maxWidth: 1376,
        margin: '0 auto',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '0 32px',
        [theme.breakpoints.down('sm')]: {
            padding: '0 16px',
        },
    },
    aboutSection: {
        padding: '96px 0',
        [theme.breakpoints.down('md')]: {
            padding: '64px 0',
        },
        [theme.breakpoints.down('sm')]: {
            padding: '48px 0',
        },
    },
    itemTitle: {
        color: theme.palette.text.primary,
        fontSize: '24px',
        fontWeight: '400',
        fontFamily: 'Audiowide, sans-serif',
        letterSpacing: '-0.02em',
        lineHeight: '100%',
        marginBottom: '20px',
        [theme.breakpoints.down('md')]: {
            fontSize: '24px',
        },
        [theme.breakpoints.down('sm')]: {
            fontSize: '16px',
            marginBottom: '10px',
        },
    },
    itemDescription: {
        color: theme.custom.textMuted,
        fontSize: '18px',
        fontWeight: 400,
        lineHeight: '150%',
        [theme.breakpoints.down('md')]: {
            fontSize: '18px',
        },
        [theme.breakpoints.down('sm')]: {
            fontSize: '16px',
        },
        paddingRight: '16px',
    },
    buttonWrapper: {
        position: 'relative',
        display: 'block',
        zIndex: 0,
        width: '100%',
    },
}));
