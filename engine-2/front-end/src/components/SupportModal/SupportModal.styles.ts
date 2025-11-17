import { makeStyles } from '../../theme';

export const useStyles = makeStyles()((theme) => ({
    dialogPaper: {
        backgroundColor: '#0A1428',
        backgroundImage: 'none',
        borderRadius: '24px',
        border: '1px solid #1D90CA',
        maxWidth: '1000px',
        padding: '60px 80px',
        position: 'relative',
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
        color: '#FFFFFF',
    },
    closeButton: {
        position: 'absolute',
        top: '32px',
        right: '32px',
        width: '40px',
        height: '40px',
        cursor: 'pointer',
        color: '#FFFFFF',
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
        fontSize: '48px',
        fontWeight: 400,
        letterSpacing: '-0.03em',
        textAlign: 'center',
        marginBottom: '16px',
        color: '#FFFFFF',
        [theme.breakpoints.down('md')]: {
            fontSize: '36px',
        },
        [theme.breakpoints.down('sm')]: {
            fontSize: '24px',
        },
    },
    subtitle: {
        fontSize: '20px',
        fontWeight: 400,
        textAlign: 'center',
        marginBottom: '12px',
        color: '#FFFFFF',
        [theme.breakpoints.down('sm')]: {
            fontSize: '16px',
        },
    },
    description: {
        fontSize: '18px',
        fontWeight: 400,
        textAlign: 'center',
        marginBottom: '60px',
        maxWidth: '800px',
        lineHeight: '1.5',
        color: '#FFFFFF',
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
    },
    iconContainer: {
        marginBottom: '32px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '120px',
        [theme.breakpoints.down('sm')]: {
            height: '80px',
            marginBottom: '20px',
        },
    },
    paypalIcon: {
        height: '80px',
        width: 'auto',
        [theme.breakpoints.down('sm')]: {
            height: '60px',
        },
    },
    amazonIcon: {
        height: '100px',
        width: 'auto',
        [theme.breakpoints.down('sm')]: {
            height: '70px',
        },
    },
    optionText: {
        fontSize: '16px',
        fontWeight: 400,
        textAlign: 'center',
        marginBottom: '32px',
        lineHeight: '1.5',
        color: '#FFFFFF',
        minHeight: '100px',
        [theme.breakpoints.down('md')]: {
            minHeight: 'auto',
        },
        [theme.breakpoints.down('sm')]: {
            fontSize: '14px',
            marginBottom: '20px',
        },
    },
    button: {
        backgroundColor: '#005894',
        color: '#FFFFFF',
        fontFamily: 'Audiowide, sans-serif',
        fontSize: '16px',
        fontWeight: 400,
        letterSpacing: '-0.03em',
        padding: '14px 32px',
        borderRadius: '8px',
        textTransform: 'uppercase',
        width: '100%',
        maxWidth: '300px',
        '&:hover': {
            backgroundColor: '#1D90CA',
        },
        [theme.breakpoints.down('sm')]: {
            fontSize: '14px',
            padding: '12px 24px',
        },
    },
    footer: {
        fontSize: '14px',
        fontWeight: 400,
        textAlign: 'center',
        color: '#FFFFFF',
        fontStyle: 'italic',
        [theme.breakpoints.down('sm')]: {
            fontSize: '12px',
        },
    },
}));
