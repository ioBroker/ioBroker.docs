import { makeStyles } from '../../../../theme';

export const useStyles = makeStyles()(theme => ({
    container: {
        position: 'relative',
        zIndex: 1,
        maxWidth: 1376,
        margin: '0 auto',
        paddingLeft: '64px',
        [theme.breakpoints.down('md')]: {
            padding: '0 32px',
        },
        [theme.breakpoints.down('sm')]: {
            padding: '0 20px',
        },
    },
    adaptersSection: {
        position: 'relative',
        height: '100%',
        padding: '96px 0',
        [theme.breakpoints.down('md')]: {
            padding: '64px 0',
        },
        [theme.breakpoints.down('sm')]: {
            padding: '48px 0',
        },
    },
    adaptersContent: {
        display: 'flex',
        gap: theme.spacing(20),
        alignItems: 'stretch',
        [theme.breakpoints.down(980)]: {
            gap: theme.spacing(10),
        },
        [theme.breakpoints.down('md')]: {
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            gap: theme.spacing(8),
        },
        [theme.breakpoints.down('sm')]: {
            textAlign: 'left',
        },
    },
    adaptersTextSection: {
        flex: '1 1 45%',
        display: 'flex',
        textAlign: 'left',
        height: 450,
        fontSize: '18px',
        // maxWidth: 533,
        flexDirection: 'column',
        justifyContent: 'space-between',

        [theme.breakpoints.down('md')]: {
            height: 'auto',
            order: 1,
            justifyContent: 'flex-start',
        },
        [theme.breakpoints.down('sm')]: {
            width: '100%',
        },
    },
    adaptersText: {
        fontSize: '18px',
        textIndent: '2em',
        flexGrow: 1,
        [theme.breakpoints.down('sm')]: {
            fontSize: '18divpx',
        },
    },

    buttonWrapperDesktop: {
        position: 'relative',
        display: 'inline-block',
        [theme.breakpoints.down('md')]: {
            display: 'none',
        },
    },
    buttonWrapperMobile: {
        position: 'relative',
        display: 'none',
        width: '100%',
        [theme.breakpoints.down('md')]: {
            display: 'flex',
            justifyContent: 'center',
            order: 3,
            minHeight: '100px',
            alignItems: 'center',
        },
    },
    buttonGlow: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '600px',
        height: '200px',
        background:
            theme.palette.mode === 'dark'
                ? 'radial-gradient(ellipse, rgba(0, 88, 148, 0.6) 0%, rgba(0, 88, 148, 0.3) 40%, rgba(0, 88, 148, 0) 70%)'
                : 'none',
        pointerEvents: 'none',
        zIndex: 0,
    },
    adaptersGrid: {
        flex: '1 1 55%',
        position: 'relative',
        display: 'flex',
        justifyContent: 'center',
        // soft light behind the tiles, same family as the glow in the banner
        '&::before': {
            content: '""',
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '125%',
            height: '115%',
            background:
                theme.palette.mode === 'dark'
                    ? 'radial-gradient(ellipse at center, rgba(29, 144, 202, 0.55) 0%, rgba(29, 144, 202, 0.26) 42%, rgba(29, 144, 202, 0) 70%)'
                    : 'radial-gradient(ellipse at center, rgba(29, 144, 202, 0.22) 0%, rgba(29, 144, 202, 0.10) 42%, rgba(29, 144, 202, 0) 70%)',
            filter: 'blur(32px)',
            pointerEvents: 'none',
            zIndex: 0,
        },
        [theme.breakpoints.down('md')]: {
            order: 2,
        },
    },
    desktopGrid: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'center',
        gap: theme.spacing(1),
        marginRight: '40px',
        [theme.breakpoints.down('md')]: {
            gap: theme.spacing(0.75),
        },
        [theme.breakpoints.down('sm')]: {
            display: 'none',
        },
    },
    mobileGrid: {
        display: 'none',
        [theme.breakpoints.down('sm')]: {
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'flex-end',
            justifyContent: 'center',
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
        '@media (max-width: 1080px)': {
            width: 70,
            height: 70,
            borderRadius: '12px',
        },
        '@media (max-width: 1000px)': {
            width: 64,
            height: 64,
            borderRadius: '18px',
        },
        // five columns of 64 px plus the gaps are 336 px - wider than a 320 px phone
        '@media (max-width: 380px)': {
            width: 54,
            height: 54,
            borderRadius: '14px',
        },
    },
    iconImage: {
        maxWidth: '70%',
        maxHeight: '70%',
        objectFit: 'contain',
        [theme.breakpoints.down('sm')]: {
            maxWidth: '75%',
            maxHeight: '75%',
        },
    },
}));
