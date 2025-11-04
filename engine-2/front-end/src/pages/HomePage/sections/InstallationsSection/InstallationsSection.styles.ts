import { makeStyles } from '../../../../theme';
import BacklightImage from '../../../../assets/img/Backlight2.png';

export const useStyles = makeStyles()(theme => ({
    container: {
        maxWidth: 1260,
        margin: '0 auto',
        padding: '0 40px 0 24px',
        position: 'relative',
        zIndex: 2,
        '@media (min-width: 1440px)': {
            marginLeft: 'calc((100vw - 1440px) / 2 + 40px)',
            marginRight: 'auto',
        },
        [theme.breakpoints.down('md')]: {
            textAlign: 'left'
        },
        [theme.breakpoints.down('sm')]: {
            padding: '0 16px',
        },
    },
    installationSection: {
        marginTop: '110px',
        padding: '12px 0 306px 0',
        background: `url(/codeBackground.png) no-repeat center center`,
        backgroundPosition: 'top',
        backgroundSize: 'cover',
        position: 'relative',
        '&::after': {
            content: '""',
            position: 'absolute',
            bottom: 'calc(-70% + 200px)',
            left: '0',
            width: '2400px',
            height: '1400px',
            backgroundImage: `url(${BacklightImage})`,
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'left center',
            backgroundSize: 'contain',
            pointerEvents: 'none',
            zIndex: -2,
            filter: 'brightness(1.2)',
            [theme.breakpoints.down('md')]: {
                left: '-200px',
                bottom: 'calc(-120% )',
            },
            [theme.breakpoints.down('sm')]: {
                 display: 'none'
                // width: '1500px',
                // height: '1200px',
            },
        },
        '&::before': {
            content: '""',
            position: 'absolute',
            bottom: 'calc(-50% + 200px)',
            left: '0',
            width: '2400px',
            height: '1400px',
            background: 'linear-gradient(to right, #080B1C 0%, #080B1C 2%, transparent 18%, transparent 100%)',
            pointerEvents: 'none',
            zIndex: 2,
            [theme.breakpoints.down('md')]: {
                left: '-200px',
                bottom: 'calc(-120%)',
            },
            [theme.breakpoints.down('sm')]: {
                display: 'none'
                // width: '1500px',
                // height: '1200px',
            },
        },
        [theme.breakpoints.down('md')]: {
            marginTop: '50px',
            padding: '12px 0 108px 0',
        },
    },
    installationsNumber: {
        fontFamily: 'Audiowide, sans-serif',
        paddingLeft: '53px',
        marginTop: '155px',
        fontSize: 'clamp(65px, 10vw + 1rem, 160px)',
        fontWeight: '400',
        letterSpacing: '-0.03em',
        textAlign: 'left',
        marginBottom: '80px',
        [theme.breakpoints.down('md')]: {
            textAlign: 'center',
            marginTop: '40px',
            fontSize: '86px',
            marginBottom: '40px',
            paddingLeft: '0',
        },
        [theme.breakpoints.down('sm')]: {
            textAlign: 'left',
        },
    },
}));
