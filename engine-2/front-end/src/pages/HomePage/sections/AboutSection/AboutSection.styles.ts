import { makeStyles } from '../../../../theme';

export const useStyles = makeStyles()(theme => ({
    container: {
        maxWidth: 1391,
        margin: '0 auto',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '0 40px',
        [theme.breakpoints.down('sm')]: {
            padding: '0 16px',
        },
    },
    aboutSection: {
        padding: '170px 0',
        [theme.breakpoints.down('md')]: {
            padding: '60px 0',
        },
    },
    itemTitle: {
        color: theme.palette.primary.contrastText,
        fontSize: '24px',
        fontWeight: '400',
        fontFamily: 'Audiowide, sans-serif',
        letterSpacing: '-2%',
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
        color: theme.palette.primary.contrastText,
        fontSize: '18px',
        fontWeight: '200',
        letterSpacing: '-3%',
        lineHeight: '150%',
        [theme.breakpoints.down('md')]: {
            fontSize: '18px',
        },
        [theme.breakpoints.down('sm')]: {
            fontSize: '16px',
        },
        opacity: 0.7,
    },
    buttonWrapper: {
        position: 'relative',
        display: 'block',
        zindex: '0',
        width: '100%',
        // '&::before': {
        //     content: '""',
        //     position: 'absolute',
        //     top: '50%',
        //     left: '90%',
        //     transform: 'translate(-50%, -50%)',
        //     width: '900px',
        //     height: '300px',
        //     background: 'radial-gradient(ellipse, rgba(12, 36, 137, 0.3) 0%, rgba(255, 255, 255, 0) 70%)',
        //     pointerEvents: 'none',
        //     zIndex: 0,
        // },
    },
}));
