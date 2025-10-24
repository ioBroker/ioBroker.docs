import { makeStyles } from '../../../../theme';

export const useStyles = makeStyles()(theme => ({
    container: {
        position: 'relative',
        zIndex: 1,
        maxWidth: 1400,
        margin: '0 auto',
        paddingLeft: '64px',
         [theme.breakpoints.down('md')]: {
            padding: '0 40px',
        },
        [theme.breakpoints.down('sm')]: {
            padding: '0 20px',
        },
    },
    section: {
        position: 'relative',
        marginTop: '37px',
        padding: '80px 0',
        height: '100%',
        background: `url(/codeBackground.png) no-repeat center center`,
        backgroundPosition: 'top',
        backgroundSize: 'cover',
        [theme.breakpoints.down('md')]: {
            marginTop: '100px',
            padding: '60px 0',
        },
        [theme.breakpoints.down('sm')]: {
            marginTop: '60px',
            padding: '40px 0',
        },

    },
    adaptersContent: {
        display: 'flex',
        gap: theme.spacing(20),
        alignItems: 'stretch',
        // alignItems: 'flex-start',
        [theme.breakpoints.down('md')]: {
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            gap: theme.spacing(5),
        },
    },
    adaptersText: {
        flex: '1 1 45%',
        display: 'flex',
        height: 550,
        maxWidth: 533,
        flexDirection: 'column',
        justifyContent: 'space-between',
        [theme.breakpoints.down('md')]: {
            height: 'auto',
            alignItems: 'center',
        },
    },
    buttonWrapper: {
        position: 'relative',
        display: 'inline-block',
        '&::before': {
            content: '""',
            position: 'absolute',
            top: '50%',
            left: '45%',
            transform: 'translate(-50%, -50%)',
            width: '600px',
            height: '300px',
            background: 'radial-gradient(ellipse, rgba(12, 36, 137, 0.3) 0%, rgba(255, 255, 255, 0) 70%)',
            pointerEvents: 'none',
            zIndex: 0,
        },
    },
    adaptersGrid: {
        flex: '1 1 55%',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'center',
        gap: theme.spacing(1),
        position: 'relative',
        '&::before': {
            content: '""',
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '1200px',
            height: '1200px',
            background: 'radial-gradient(circle, rgba(0, 88, 148, 0.7) 0%, rgba(255, 255, 255, 0) 55%)',
            pointerEvents: 'none',
            zIndex: 0,
            [theme.breakpoints.down('md')]: {
                width: '600px',
                height: '600px',
            },
            [theme.breakpoints.down('sm')]: {
                width: '400px',
                height: '400px',
            },
        },
        [theme.breakpoints.down('md')]: {
            gap: theme.spacing(0.75),
        },
        [theme.breakpoints.down('sm')]: {
            gap: theme.spacing(0.5),
        },
    },
    adapterColumn: {
        display: 'flex',
        flexDirection: 'column',
        gap: theme.spacing(1),
        marginBottom: '38px',
        position: 'relative',
        zIndex: 1,
        [theme.breakpoints.down('md')]: {
            gap: theme.spacing(0.75),
            marginBottom: '28px',
        },
        [theme.breakpoints.down('sm')]: {
            gap: theme.spacing(0.5),
            marginBottom: '20px',
        },
    },
    offsetColumn: {
        transform: `translateY(38px)`,
        [theme.breakpoints.down('md')]: {
            transform: 'translateY(28px)',
        },
        [theme.breakpoints.down('sm')]: {
            transform: 'translateY(20px)',
        },
    },
    adapterIcon: {
        backgroundColor: theme.palette.secondary.main,
        borderRadius: '16px',
        width: 84,
        height: 84,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
        [theme.breakpoints.down('md')]: {
            width: 64,
            height: 64,
            borderRadius: '12px',
        },
        [theme.breakpoints.down('sm')]: {
            width: 50,
            height: 50,
            borderRadius: '10px',
        },
    },
    iconImage: {
        maxWidth: '70%',
        maxHeight: '70%',
        objectFit: 'contain',
        [theme.breakpoints.down('md')]: {
            maxWidth: '65%',
            maxHeight: '65%',
        },
        [theme.breakpoints.down('sm')]: {
            maxWidth: '60%',
            maxHeight: '60%',
        },
    },
}));