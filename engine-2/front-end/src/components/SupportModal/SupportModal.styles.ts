import { makeStyles } from '../../theme';

export const useStyles = makeStyles()((theme) => ({
    dialogPaper: {
        backgroundColor: theme.palette.background.default,
        backgroundImage: 'none',
        color: theme.palette.text.primary,
        fontSize: '16px',
        borderRadius: '24px',
        border: '1px solid #1D90CA',
        maxWidth: '1000px',
        padding: '40px 80px',
        position: 'relative',
        overflow: 'hidden',
        [theme.breakpoints.up('lg')]: {
            width: '1168px',
            height: '714px',
            maxWidth: '1168px',
        },
        [theme.breakpoints.down('md')]: {
            padding: '40px 40px',
        },
        [theme.breakpoints.down('sm')]: {
            padding: '30px 20px',
        },
    },
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        color: 'inherit',
    },
    closeButton: {
        position: 'absolute',
        top: '32px',
        right: '32px',
        width: '40px',
        height: '40px',
        cursor: 'pointer',
        color: theme.palette.text.primary,
        transition: 'color 0.3s',
        '&:hover': {
            color: '#7ec3f3',
        },
        [theme.breakpoints.down('sm')]: {
            width: '28px',
            height: '28px',
            top: '20px',
            right: '20px',
        },
    },
    title: {
        fontFamily: 'Audiowide, sans-serif',
        fontSize: '32px',
        fontWeight: 400,
        letterSpacing: '-0.03em',
        textAlign: 'center',
        color: 'inherit',
        [theme.breakpoints.down('md')]: {
            fontSize: '24px',
        },
        [theme.breakpoints.down('sm')]: {
            fontSize: '24px',
        },
    },
    subtitle: {
        fontWeight: 400,
        textAlign: 'center',
        color: 'inherit',
         lineHeight: '1.7',
        [theme.breakpoints.down('sm')]: {
            fontSize: '16px',
        },
    },
    description: {
        fontWeight: 400,
        textAlign: 'center',
        marginBottom: '45px',
        maxWidth: '748px',
        lineHeight: '1.7',
        color: 'inherit',
        [theme.breakpoints.down('md')]: {
            marginBottom: '40px',
        },
        [theme.breakpoints.down('sm')]: {
            fontSize: '14px',
            marginBottom: '30px',
        },
    },
    optionsContainer: {
        display: 'flex',
        gap: '60px',
        width: '100%',
        marginBottom: '40px',
        [theme.breakpoints.down('md')]: {
            flexDirection: 'column',
            gap: '40px',
        },
    },
    option: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'end'
    },
    paypalIconContainer: {
        marginBottom: '32px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '130px',
        [theme.breakpoints.down('sm')]: {
            height: '80px',
            marginBottom: '20px',
        },
    },
    amazonIconContainer: {
        marginBottom: '35px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '163px',
        [theme.breakpoints.down('sm')]: {
            height: '80px',
            marginBottom: '20px',
        },
    },
    paypalIcon: {
        height: 'auto',
        width: '258px',
        [theme.breakpoints.down('sm')]: {
            height: '60px',
        },
    },
    amazonIcon: {
        height: 'auto',
        width: '163px',
        [theme.breakpoints.down('sm')]: {
            height: '70px',
        },
    },
    amazonOptionText: {
        fontSize: '16px',
        fontWeight: 400,
        width: 419,
        textAlign: 'center',
        lineHeight: '1.5',
        minHeight: '90px',
        color: 'inherit',
        [theme.breakpoints.down('md')]: {
            minHeight: 'auto',
        },
        [theme.breakpoints.down('sm')]: {
            fontSize: '14px',
            marginBottom: '20px',
        },
    },
    paypalOptionText: {
        fontSize: '16px',
        fontWeight: 400,
        width: 335,
        textAlign: 'center',
        lineHeight: '1.5',
        minHeight: '90px',
        color: 'inherit',
        [theme.breakpoints.down('md')]: {
            minHeight: 'auto',
        },
        [theme.breakpoints.down('sm')]: {
            fontSize: '14px',
            marginBottom: '20px',
        },
    },
    button: {
        fontFamily: 'Audiowide, sans-serif !important',
        fontSize: '16px !important',
        fontWeight: '400 !important',
        letterSpacing: '-0.03em !important',
        padding: '14px 32px !important',
        borderRadius: '8px !important',
        textTransform: 'uppercase',
        width: '320px !important',
        height: '48px',
        textAlign: 'center',
        [theme.breakpoints.down('sm')]: {
            fontSize: '14px !important',
            padding: '12px 24px !important',
        },
    },
    footer: {
        fontSize: '16px',
        fontWeight: 400,
        textAlign: 'center',
        marginTop: 55,
        color: 'inherit',
        [theme.breakpoints.down('sm')]: {
            fontSize: '12px',
        },
    },
}));
