import { makeStyles } from '../../../../theme';
import BacklightImage from '../../../../assets/img/Backlight2.png';

export const useStyles = makeStyles()(theme => ({
    sectionWrapper: {
        position: 'relative',
        '&::before': {
            content: '""',
            position: 'absolute',
            zIndex: 1,
            top: '-30%',
            left: '12%',
            transform: 'translate(-50%, -50%)',
            width: '1200px',
            height: '1200px',
            background:
                theme.palette.mode === 'dark'
                    ? 'radial-gradient(circle, rgba(35, 86, 174, 0.5) 0%, rgba(255, 255, 255, 0) 55%)'
                    : 'none',
            pointerEvents: 'none',
            [theme.breakpoints.down('md')]: {
                width: '600px',
                height: '600px',
                left: '30%',
            },
            [theme.breakpoints.down('sm')]: {
                left: '90%',
                top: '10%',
                width: '400px',
                height: '400px',
            },
        },
    },
    container: {
        maxWidth: 1260,
        margin: '0 auto',
        padding: '0 80px 0 24px',
        position: 'relative',
        zIndex: 2,
        '@media (min-width: 1440px)': {
            marginLeft: 'calc((100vw - 1440px) / 2 + 40px)',
            marginRight: 'auto',
        },
        [theme.breakpoints.down('md')]: {
            textAlign: 'left',
        },
        [theme.breakpoints.down('sm')]: {
            padding: '0 16px',
        },
    },
    installationSection: {
        marginTop: '100px',
        marginBottom: '0px',
        padding: '0px 0 175px 0',
        background: `url(/codeBackground.png) no-repeat center center`,
        backgroundPosition: 'top',
        backgroundSize: 'cover',
        zIndex: 0,
        position: 'relative',
        '&::after': {
            content: '""',
            position: 'absolute',
            bottom: 'calc(-70%)',
            left: '0',
            width: '2400px',
            height: '1400px',
            backgroundImage: theme.palette.mode === 'dark' ? `url(${BacklightImage})` : 'none',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'left center',
            backgroundSize: 'contain',
            pointerEvents: 'none',
            zIndex: 3,
            filter: 'brightness(1.2)',
            [theme.breakpoints.down('md')]: {
                left: '-200px',
                bottom: 'calc(-120% )',
            },
            [theme.breakpoints.down('sm')]: {
                display: 'none',
                // width: '1500px',
                // height: '1200px',
            },
        },
        '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background:
                theme.palette.mode === 'dark'
                    ? `
                    linear-gradient(to bottom, #080B1C 0%, #080B1C 3%, transparent 15%, transparent 92%, #080B1C 100%),
                    linear-gradient(to right, #080B1C 0%, transparent 5%, transparent 95%, #080B1C 100%)
                `
                    : `
                    linear-gradient(to bottom, #ffffff 0%, #ffffff 3%, transparent 15%, transparent 92%, #ffffff 100%),
                    linear-gradient(to right, #ffffff 0%, transparent 5%, transparent 95%, #ffffff 100%)
                `,
            pointerEvents: 'none',
            zIndex: 0,
        },
        [theme.breakpoints.down('md')]: {
            marginTop: '50px',
            padding: '12px 0 0 0',
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
         [theme.breakpoints.down(400)]: {
            fontSize: '82px',
        },
    },
}));
