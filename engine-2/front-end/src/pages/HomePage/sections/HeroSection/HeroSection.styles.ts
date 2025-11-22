import { makeStyles } from '../../../../theme';

export const useStyles = makeStyles()(theme => ({
    container: {
        width: '100%',
        margin: '0 auto',
        padding: '0 64px',
        position: 'relative',
        height: '100%',
        [theme.breakpoints.down('md')]: {
            padding: '0 40px',
        },
        [theme.breakpoints.down('sm')]: {
            padding: '0 20px',
        },
    },
    heroSection: {
        width: '100%',
        backgroundColor: '#080B1C',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'start',
        justifyContent: 'flex-start',
        overflowX: 'hidden',
        overflowY: 'visible',
        paddingBottom: '105px',
        [theme.breakpoints.down('md')]: {
            paddingBottom: '56px',
        },
    },
    heroBackgroundImage: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '100%',
        height: '55%',
        backgroundImage: 'url(/clippedBackground.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'top',
        backgroundRepeat: 'no-repeat',
        zIndex: 0,
        maskImage: 'linear-gradient(to bottom, transparent 0%, black 20%, black 80%, transparent 100%)',
        WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 20%, black 80%, transparent 100%)',
        [theme.breakpoints.down('md')]: {
            backgroundSize: '210%',
            backgroundPosition: 'center',
            top: '50%',
            maskImage: 'linear-gradient(to bottom, transparent 0%, black 10%, black 60%, transparent 100%)',
            WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 10%, black 60%, transparent 100%)',
        },
    },
    heroContentWrapper: {
        width: '100%',
        paddingTop: '64px',
        position: 'relative',
        zIndex: 1,
        // [theme.breakpoints.down('md')]: {
        //     paddingTop: '32px',
        // },
    },
    heroContent: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        width: '100%',
        [theme.breakpoints.down('md')]: {
            flexDirection: 'column',
            alignItems: 'center',
        },
    },
    heroLeft: {
        textAlign: 'left',
        [theme.breakpoints.down('md')]: {
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
        },
    },
    heroLogo: {
        width: '100%',
        maxWidth: '470px',
        marginBottom: '334px',
        marginTop: '36px',
        [theme.breakpoints.down('md')]: {
            marginBottom: '72px',
            marginTop: theme.spacing(2),
            maxWidth: '400px',
        },
        [theme.breakpoints.down('sm')]: {
            maxWidth: '354px',
        },
    },
    heroPlatformText: {
        fontSize: '24px',
        marginBottom: '63px',
        color: 'rgba(255, 255, 255, 0.9)',
        textAlign: 'right',
        lineHeight: '130%',
        [theme.breakpoints.down('md')]: {
            fontSize: '18px',
            textAlign: 'right',
            width: '290px',
            marginBottom: '66px',
            textIndent: '4em',
        },
    },
    installButton: {
        [theme.breakpoints.down('md')]: {
            marginBottom: '56px',
        },
    },
    heroRight: {
        textAlign: 'left',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-end',
        [theme.breakpoints.down('md')]: {
            flexDirection: 'row',
            alignItems: 'start',
            height: '48px',
            gap: '16px',
        },
    },
    supportIconsWrapper: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-end',
        [theme.breakpoints.down('md')]: {
            alignItems: 'flex-start',
        },
    },
    housesImageWrapper: {
        marginBottom: '184px',
        marginRight: 32,
        [theme.breakpoints.down('md')]: {
            marginBottom: '24px',
            display: 'none',
        },
    },

    housesImage: {
        width: '485px',
        height: 'auto',
        [theme.breakpoints.down('lg')]: {
            width: '400px',
        },
        [theme.breakpoints.down('md')]: {
            display: 'none',
        },
    },

    smallHousesImageWrapper: {
        display: 'none',
        [theme.breakpoints.down('md')]: {
            display: 'block',
            marginBottom: '15px',
            marginLeft: '30px',
        },
    },
    smallHousesImage: {
        display: 'none',
        [theme.breakpoints.down('md')]: {
            display: 'block',
        },
    },
    supportText: {
        fontSize: '15px',
        textAlign: 'left',
        lineHeight: '24px',
        letterSpacing: '-3%',
        fontWeight: '400',
        marginBottom: '10px',
        color: '#FFFFFF',
        [theme.breakpoints.down('md')]: {
            textAlign: 'left',
            width: '224px',
        },
    },
    supportIcons: {
        display: 'flex',
        gap: '25px',
        justifyContent: 'flex-end',
        [theme.breakpoints.down('md')]: {
            justifyContent: 'center',
            gap: '16px',
        },
    },
    supportIconAmazon: {
        border: '1px solid #1D90CA',
        borderRadius: theme.shape.borderRadius,
        padding: theme.spacing(1.5),
        width: '95px',
        height: '40px',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        paddingBottom: '25px',
        justifyContent: 'center',
        transition: 'background-color 0.2s',
        '&:hover': {
            backgroundColor: 'rgba(29, 144, 202, 0.1)',
        },
        [theme.breakpoints.down('md')]: {
            width: '56px',
            height: '46px',
            paddingBottom: '20px',
        },
    },
    supportIconPayPal: {
        border: '1px solid #1D90CA',
        borderRadius: theme.shape.borderRadius,
        padding: theme.spacing(1.5),
        width: '90px',
        height: '40px',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'background-color 0.2s',
        '&:hover': {
            backgroundColor: 'rgba(29, 144, 202, 0.1)',
        },
        [theme.breakpoints.down('md')]: {
            width: '56px',
            height: '46px',
        },
    },
    platformTextComment: {
        paddingLeft: '114px',
        [theme.breakpoints.down('md')]: {
            paddingLeft: '0',
        },
    },
    paypalIconImage: {
        width: '20px',
        height: '26px',
        [theme.breakpoints.down('md')]: {
            width: '24px',
            height: '30px',
        },
    },
    amazonIconImage: {
        width: '50px',
        height: '40px',
        [theme.breakpoints.down('md')]: {
            width: '36px',
            height: '37px',
        },
    },
}));
