import { makeStyles } from '../../../../theme';

export const useStyles = makeStyles()(theme => ({
    container: {
        maxWidth: 1067,
        margin: '0 auto 0 246px',
        display: 'flex',
        gap: '22px',
        padding: '0 40px',
        position: 'relative',
        zIndex: 2,
         '@media (min-width: 1440px)': {
            marginRight: 'calc((100vw - 1440px) / 2 + 115px)',
            marginLeft: 'auto',
        },
        [theme.breakpoints.down('sm')]: {
            padding: '0 20px',
        },
        [theme.breakpoints.down('md')]: {
            flexDirection: 'column',
        },
        [theme.breakpoints.down('lg')]: {
            margin: '0 auto',
        },
    },
    section: {
        padding: '156px 0 100px 0',
        position: 'relative',
        zIndex: 3,
    },
    historySection: {
        textAlign: 'center',
        position: 'relative',
        background: `url(/codeBackground.png) no-repeat center center`,
        backgroundPosition: 'top',
        backgroundSize: 'cover',
        '&::before': {
            content: '""',
            position: 'absolute',
            zIndex: 1,
            top: '70%',
            left: '22%',
            transform: 'translate(-50%, -50%)',
            width: '900px',
            height: '900px',
            background: 'radial-gradient(circle, rgba(0, 88, 148, 0.7) 0%, rgba(255, 255, 255, 0) 55%)',
            pointerEvents: 'none',
            [theme.breakpoints.down('md')]: {
                width: '600px',
                height: '600px',
                left: '30%',
            },
            [theme.breakpoints.down('sm')]: {
                left: '50%',
                top: '45%',
            },
        },
    },
    historyNumberWrapper: {
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'center',
        fontFamily: 'Audiowide, sans-serif',
        fontWeight: '400',
        letterSpacing: '-0.03em',
        marginBottom: theme.spacing(2),
        lineHeight: 1,
    },
    historyNumber: {
        lineHeight: 1,
        fontSize: '331px',
        display: 'inline-block',
        width: 'fit-content',
        letterSpacing: '-0.05em',
        [theme.breakpoints.down('lg')]: {
            fontSize: '250px',
        },
        [theme.breakpoints.down('lg')]: {
            fontSize: '200px',
        },
    },
    historyPlus: {
        fontSize: '60px',
        lineHeight: 1,
        display: 'block',
        marginTop: '0.55em'
    },
    historyWrapper: {
        paddingTop: '40px',
        textAlign: 'left',
    },
    historyTitle: {
        fontFamily: 'Audiowide, sans-serif',
        fontSize: '96px',
        fontWeight: '400',
        lineHeight: 1.5,
        letterSpacing: '-0.03em',
        [theme.breakpoints.down('sm')]: {
            fontSize: '84px',
        },
    },
    historySubTitle: {
        fontFamily: 'Audiowide, sans-serif',
        fontSize: '48px',
        fontWeight: '400',
        lineHeight: 1.3,
        letterSpacing: '-0.03em',
        width: '510px',
        marginBottom: theme.spacing(3),
        [theme.breakpoints.down('lg')]: {
            width: 'auto',
        },
        [theme.breakpoints.down('sm')]: {
            fontSize: '36px',
        },
    },
    historyText: {
        fontSize: '24px',
        fontWeight: '300',
        lineHeight: '140%',
        letterSpacing: '-0.01em',
        marginTop: '96px',
        marginBottom: '152px',
        width: '557px',
        [theme.breakpoints.down('lg')]: {
            width: 'auto',
        },
        [theme.breakpoints.down('sm')]: {
            fontSize: '18px',
        },
    }
}));
