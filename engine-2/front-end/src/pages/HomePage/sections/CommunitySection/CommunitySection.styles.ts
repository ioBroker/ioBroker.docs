import { makeStyles } from '../../../../theme';

export const useStyles = makeStyles()(theme => ({
    container: {
        maxWidth: 1393,
        margin: '0 auto',
        padding: '0 40px',
    },
    communitySection: {
        padding: '194px 0 100px 0',
        [theme.breakpoints.down('md')]: {
            padding: '50px 0',
        },
    },
    communityText: {
        fontFamily: 'inherit',
        whiteSpace: 'pre-wrap',
        fontSize: '18px',
        textIndent: '4em',
        fontWeight: 400,
        lineHeight: '150%',
        letterSpacing: '0.02em',
        paddingTop: '14px',
        textAlign: 'left',
        maxWidth: 945,
        margin: '0 0',
        zIndex: 1,
    },

    communityTextWrapper: {
        position: 'relative',
        '&::before': {
            content: '""',
            position: 'absolute',
            top: '40%',
            left: '90%',
            transform: 'translate(-50%, -50%)',
            width: '600px',
            height: '700px',
            background: 'radial-gradient(ellipse, rgba(0, 88, 148, 0.6) 0%, rgba(255, 255, 255, 0) 70%)',
            pointerEvents: 'none',
            zIndex: -1,
            [theme.breakpoints.down('md')]: {
                width: '600px',
                height: '600px',
                left: '30%',
            },
            [theme.breakpoints.down('sm')]: {
                width: '400px',
                height: '400px',
                left: '50%',
            },
        },

    },

    secondaryText: {
        textAlign: 'left',
        maxWidth: 945,
        fontSize: '18px',
        letterSpacing: '0.02em',
        fontWeight: 400,
        margin: `${theme.spacing(2)} 0`,
        marginBottom: theme.spacing(5),
        zIndex: 1,
    },
    statsContainer: {
        display: 'flex',
        justifyContent: 'space-between',
        marginTop: '183px',
        gap: theme.spacing(4),
        [theme.breakpoints.down('md')]: {
            flexDirection: 'column',
            marginTop: '100px',
            alignItems: 'center',
        },
    },

    statCard: {
        flex: 1,
        maxWidth: 350,
        minHeight: 398,
        display: 'flex',
        justifyContent: 'space-between',
    },

    statCardContentWrapper: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start'
    },


    bracesLeft: {
        borderTop: `1px solid ${theme.palette.primary.main}`,
        borderBottom: `1px solid ${theme.palette.primary.main}`,
        borderLeft: `1px solid ${theme.palette.primary.main}`,
        width: 30,
    },
    bracesRight: {
        borderTop: `1px solid ${theme.palette.primary.main}`,
        borderBottom: `1px solid ${theme.palette.primary.main}`,
        borderRight: `1px solid ${theme.palette.primary.main}`,
        width: 30,
    },

    bracesContent: {
        flex: 1,
        padding: `28px 0`,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        textAlign: 'center',
    },

    statTitle: {
        color: theme.palette.primary.main,
        fontSize: '40px',
        letterSpacing: '-0.03em'
    },
    statNumber: {
        fontFamily: 'Audiowide, sans-serif',
        fontSize: '60px',
        fontWeight: '400',
        letterSpacing: '-0.03em',
        margin: `${theme.spacing(2)} 0 0 0`,
        [theme.breakpoints.down('sm')]: {
                fontSize: '57px',
            },
    },
    statLabel: {
        fontFamily: 'Audiowide, sans-serif',
        fontSize: '20px',
        fontWeight: '400',
        letterSpacing: '-0.03em',
    },
    joinButton: {
        background: 'none',
        height: '60px',
        width: '292px',
        border: `1px solid ${theme.palette.primary.main}`,
        borderRadius: '8px',
        color: theme.palette.text.primary,
        fontFamily: 'Audiowide, sans-serif',
        fontSize: '16px',
        fontWeight: '400',
        letterSpacing: '-0.03em',
        cursor: 'pointer',
        padding: '10px 40px',
        alignSelf: 'center',
        position: 'relative',
        display: 'block',
        zindex: '0',
        '&::before': {
            content: '""',
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '600px',
            height: '200px',
            background: 'radial-gradient(ellipse, rgba(12, 36, 137, 0.3) 0%, rgba(255, 255, 255, 0) 70%)',
            pointerEvents: 'none',
            zIndex: 0,
        },
        '&:hover': {
            backgroundColor: theme.palette.primary.main,
            color: theme.palette.primary.contrastText,
        },
        [theme.breakpoints.down('sm')]: {
            width: '240px',
        },
    },
}));