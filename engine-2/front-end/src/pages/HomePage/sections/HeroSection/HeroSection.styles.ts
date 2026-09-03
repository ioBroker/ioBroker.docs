import { makeStyles } from '../../../../theme';

export const useStyles = makeStyles()(theme => ({
    container: {
        width: '100%',
        margin: '0 auto',
        padding: '0 64px',
        position: 'relative',
        height: '100%',
        [theme.breakpoints.down('md')]: {
            padding: '0 32px',
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
        top: '62%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '100%',
        height: '55%',
        backgroundImage: 'url(/clippedBackground.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'top',
        backgroundRepeat: 'no-repeat',
        zIndex: 0,
        opacity: 0.3,

        [theme.breakpoints.down('md')]: {
            backgroundSize: '210%',
            backgroundPosition: 'center',
            top: '62%',
        },
    },
    heroBackgroundImageOverlay: {
        position: 'absolute',
        top: '62%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '100%',
        height: '55%',
        zIndex: 1,
        backgroundImage: 'linear-gradient(187deg, #080B1C 15%, #080B1C00 15%, #080B1C 80%, #080B1C 100%)',
        [theme.breakpoints.down('md')]: {
            backgroundSize: '210%',
            backgroundPosition: 'center',
            top: '62%',
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
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        // logo at the top, claim and button at the bottom - no hard coded gap
        minHeight: '560px',
        [theme.breakpoints.down('md')]: {
            textAlign: 'center',
            alignItems: 'center',
            justifyContent: 'flex-start',
            minHeight: 0,
        },
    },
    heroLogo: {
        width: '100%',
        maxWidth: '470px',
        marginTop: '-12px',
        [theme.breakpoints.down('md')]: {
            marginBottom: '56px',
            marginTop: theme.spacing(2),
            maxWidth: '400px',
        },
        [theme.breakpoints.down('sm')]: {
            maxWidth: '80%',
        },
    },
    // the claim sets the width, the button below picks it up exactly
    heroClaim: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'stretch',
        width: 'fit-content',
        maxWidth: '100%',
        gap: '36px',
        [theme.breakpoints.down('md')]: {
            gap: '28px',
        },
    },
    heroPlatformText: {
        fontSize: '24px',
        fontWeight: 400,
        lineHeight: 1.2,
        letterSpacing: '-0.01em',
        textAlign: 'left',
        // the banner image is dark in both themes, so the claim stays white
        color: '#FFFFFF',
        [theme.breakpoints.down('md')]: {
            fontSize: '20px',
        },
        [theme.breakpoints.down('sm')]: {
            fontSize: '18px',
        },
    },
    installButton: {
        width: '100%',
        minWidth: 0,
        [theme.breakpoints.down('md')]: {
            marginBottom: '40px',
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
        [theme.breakpoints.down(400)]: {
            gap: '70px',
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
        marginTop: '80px',
        marginBottom: '104px',
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
        [theme.breakpoints.down(980)]: {
            width: '320px',
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
            maxWidth: '100%',
        },
        // the picture is 361 px wide and the offset added 30 more - together wider than
        // a 375 px phone, which cut the claim above it off on both sides
        [theme.breakpoints.down(440)]: {
            marginLeft: 0,
        },
    },
    smallHousesImage: {
        display: 'none',
        [theme.breakpoints.down('md')]: {
            display: 'block',
            maxWidth: '100%',
            height: 'auto',
        },
    },
    supportText: {
        fontSize: 16,
        textAlign: 'left',
        lineHeight: '24px',
        letterSpacing: '-0.03em',
        fontWeight: 400,
        marginBottom: '10px',
        width: 222,
        color: '#FFFFFF',
        whiteSpace: 'normal',
        wordBreak: 'keep-all',
        overflowWrap: 'normal',
        [theme.breakpoints.down('md')]: {
            textAlign: 'left',
            // width: '224px',
            fontSize: 12,
        },
        [theme.breakpoints.down(400)]: {
            width: '100%',
        },
    },
    supportIcons: {
        display: 'flex',
        gap: 32,
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
