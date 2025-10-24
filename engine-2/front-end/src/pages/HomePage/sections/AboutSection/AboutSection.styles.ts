import { makeStyles } from '../../../../theme';

export const useStyles = makeStyles()(theme => ({
    container: {
        maxWidth: 1311,
        margin: '0 auto',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        [theme.breakpoints.down('sm')]: {
            padding: '0 20px',
        },
    },
    section: {
        padding: '100px 0',
        [theme.breakpoints.down('md')]: {
            padding: '60px 0',
        },
        [theme.breakpoints.down('sm')]: {
            padding: '40px 0',
        },
    },
    itemTitle: {
        color: theme.palette.text.primary,
        fontSize: '32px',
        fontWeight: '400',
        fontFamily: 'Audiowide, sans-serif',
        letterSpacing: '-2%',
        lineHeight: '100%',
        marginBottom: '20px'
    },
    itemDescription: {
        color: theme.palette.text.primary,
        fontSize: '24px',
        fontWeight: '200',
        letterSpacing: '-3%',
        lineHeight: '150%',
    },
    buttonWrapper: {
        position: 'relative',
        display: 'block',
        zindex: '0',
        width: '100%',
        '&::before': {
            content: '""',
            position: 'absolute',
            top: '50%',
            left: '90%',
            transform: 'translate(-50%, -50%)',
            width: '900px',
            height: '300px',
            background: 'radial-gradient(ellipse, rgba(12, 36, 137, 0.3) 0%, rgba(255, 255, 255, 0) 70%)',
            pointerEvents: 'none',
            zIndex: 0,
        },
    },
}));
