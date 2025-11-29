import { makeStyles } from '../../../../theme';

export const useStyles = makeStyles()(theme => ({
    container: {
        maxWidth: 1393,
        margin: '0 auto',
        padding: '0 40px',
        [theme.breakpoints.down('md')]: {
            padding: '0 16px 0 16px',
        },
        display: 'flex',
        gap: '51px',
        position: 'relative',
        zIndex: 2,
        [theme.breakpoints.down('sm')]: {
            padding: '0 20px',
        },
        [theme.breakpoints.down('md')]: {
            flexDirection: 'column',
            alignItems: 'center',
            gap: '22px',
        },
        [theme.breakpoints.down('lg')]: {
            margin: '0 auto',
        },
    },
    section: {
        padding: '156px 0 100px 0',
        position: 'relative',
        overflow: 'visible',
        zIndex: 1,
        [theme.breakpoints.down('md')]: {
            padding: '100px 0 100px 0',
        },
        [theme.breakpoints.down('md')]: {
            padding: '100px 0 50px 0',
        },
    },
    historySection: {
        textAlign: 'center',
        position: 'relative',
        background: `url(/image-code.png) no-repeat center center`,
        backgroundPosition: 'top',
        backgroundSize: 'cover',
        overflow: 'visible',
        maskImage: 'linear-gradient(to bottom, transparent 0%, black 10%, black 90%, transparent 100%)',
        WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 10%, black 90%, transparent 100%)',
        [theme.breakpoints.down('md')]: {
            maskImage: 'none',
            WebkitMaskImage: 'none',
        },
    },
    historyNumberWrapper: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'Audiowide, sans-serif',
        fontWeight: 400,
        letterSpacing: '-0.03em',
        marginBottom: 0,
        color: '#1d90cA',
        lineHeight: 1,
        [theme.breakpoints.up('md')]: {
            marginBottom: theme.spacing(2),
            alignItems: 'flex-start',
        },
    },

    plusJahreWrapper: {
        [theme.breakpoints.down('md')]: {
            display: 'flex',
            height: '205px',
            flexDirection: 'column',
            alignItems: 'start',
            justifyContent: 'space-between',
            marginLeft: theme.spacing(1.5),
        },
    },
    historyNumber: {
        lineHeight: 1,
        fontSize: 200,
        width: 'fit-content',
        letterSpacing: '-0.05em',
        display: 'inline-block',
        [theme.breakpoints.up('md')]: {
            alignSelf: 'flex-start',
        },
        [theme.breakpoints.down('md')]: {
            fontSize: '200px',
            lineHeight: 0.8,
            alignSelf: 'flex-end',
        },
    },
    historyPlus: {
        fontSize: '60px',
        lineHeight: 1,
        display: 'block',
        marginTop: '0.55em',
        [theme.breakpoints.down('sm')]: {
            alignSelf: 'flex-start',
            marginTop: '0.1em',
        },
    },
    historyWrapper: {
        paddingTop: '30px',
        textAlign: 'left',
        [theme.breakpoints.down('md')]: {
            textAlign: 'left',
            paddingTop: '0',
        },
    },
    historyTitle: {
        color: '#1d90cA',
        fontFamily: 'Audiowide, sans-serif',
        fontSize: '96px',
        fontWeight: '400',
        lineHeight: 1.5,
        letterSpacing: '-0.03em',
    },
    historyTitleDesktop: {
        [theme.breakpoints.down('md')]: {
            display: 'none',
        },
    },
    historyTitleMobile: {
        display: 'none',
        [theme.breakpoints.down('md')]: {
            display: 'block',
            fontSize: '80px',
            marginBottom: '6px',
            marginLeft: theme.spacing(2),
        },
        [theme.breakpoints.down('sm')]: {
            fontSize: '28px',
            marginLeft: theme.spacing(1),
            lineHeight: 1,
        },
    },
    historySubTitle: {
        fontFamily: 'Audiowide, sans-serif',
        fontSize: '48px',
        fontWeight: '400',
        lineHeight: 1.3,
        letterSpacing: '-0.03em',
        width: '510px',
        whiteSpace: 'nowrap',
        marginBottom: theme.spacing(3),
        [theme.breakpoints.down('lg')]: {
            width: 'auto',
        },
        [theme.breakpoints.down('md')]: {
            fontSize: 36,
        },
        [theme.breakpoints.down('sm')]: {
            fontSize: '32px',
            marginLeft: '4px',
            maxWidth: '352px',
        },
         [theme.breakpoints.down(400)]: {
            fontSize: '32px',
        },
    },
    historyText: {
        fontSize: '18px',
        textIndent: '2em',
        fontWeight: '300',
        lineHeight: '140%',
        letterSpacing: '-0.01em',
        marginTop: '140px',
        marginBottom: '48px',
        width: '550px',
        [theme.breakpoints.down('lg')]: {
            width: 'auto',
        },
        [theme.breakpoints.down('md')]: {
            marginBottom: '24px',
            marginTop: '64px',
            fontSize: '18px',
            textAlign: 'left',
            letterSpacing: '-0.02em',
        },
    },
}));
