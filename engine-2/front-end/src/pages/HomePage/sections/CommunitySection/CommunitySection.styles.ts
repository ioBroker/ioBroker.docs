import { makeStyles } from '../../../../theme';

export const useStyles = makeStyles()(theme => ({
    container: {
        maxWidth: 1393,
        margin: '0 auto',
        padding: '0 40px',
        [theme.breakpoints.down('md')]: {
            padding: '0 16px 0 16px',
        },
    },
    communitySection: {
        padding: '20px 0 100px 0',
        [theme.breakpoints.down('md')]: {
            padding: '40px 0',
        },
    },
    communityText: {
        fontFamily: 'inherit',
        whiteSpace: 'pre-wrap',
        fontSize: '20px',
        textIndent: '2em',
        fontWeight: 200,
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
            background:
                theme.palette.mode === 'dark'
                    ? 'radial-gradient(ellipse, rgba(0, 88, 148, 0.4) 0%, rgba(255, 255, 255, 0) 70%)'
                    : 'radial-gradient(circle, rgba(255, 255, 255, 0.8) 0%, rgba(255, 255, 255, 0) 55%)',
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
                top: '135%',
                left: '80%',
            },
        },
    },

    secondaryText: {
        textAlign: 'left',
        maxWidth: 945,
        fontSize: '20px',
        letterSpacing: '0.02em',
        fontWeight: 400,
        margin: `${theme.spacing(2)} 0`,
        marginBottom: theme.spacing(5),
        zIndex: 1,
    },
    statsContainer: {
        display: 'flex',
        justifyContent: 'space-between',
        marginTop: '120px',
        gap: theme.spacing(4),
        [theme.breakpoints.down('md')]: {
            flexDirection: 'column',
            marginTop: '60px',
            alignItems: 'center',
            gap: '32px',
        },
        [theme.breakpoints.down('sm')]: {
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'start',
            gap: '16px',
        },
    },

    statCard: {
        flex: 1,
        maxWidth: 400,
        minHeight: 400,
        display: 'flex',
        justifyContent: 'space-between',
        [theme.breakpoints.down('sm')]: {
            maxWidth: 352,
            minHeight: 259,
        },
        [theme.breakpoints.down('sm')]: {
            flex: '1 1 150px',
            width: '174px',
            maxWidth: '174px',
            // minWidth: '174px',
            minHeight: 171,
        },
    },

    statCardContentWrapper: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        padding: '0 10px',
        [theme.breakpoints.down('sm')]: {
            padding: '0 5px',
        },
    },

    bracesLeft: {
        borderTop: `1px solid ${theme.palette.primary.main}`,
        borderBottom: `1px solid ${theme.palette.primary.main}`,
        borderLeft: `1px solid ${theme.palette.primary.main}`,
        width: 30,
        [theme.breakpoints.down('sm')]: {
            width: 9,
        },
    },
    bracesRight: {
        borderTop: `1px solid ${theme.palette.primary.main}`,
        borderBottom: `1px solid ${theme.palette.primary.main}`,
        borderRight: `1px solid ${theme.palette.primary.main}`,
        width: 30,
        [theme.breakpoints.down('sm')]: {
            width: 9,
        },
    },

    bracesContent: {
        flex: 1,
        padding: `28px 0`,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        textAlign: 'center',
        [theme.breakpoints.down('sm')]: {
            padding: '16px 0',
        },
        //  [theme.breakpoints.down('sm')]: {
        //        width: '292px',
        //        height: '259px'
        // },
    },

    statTitle: {
        color: theme.palette.primary.main,
        fontSize: '40px',
        letterSpacing: '-0.03em',
        [theme.breakpoints.down('sm')]: {
            fontSize: '20px',
            textTransform: 'uppercase',
        },
    },
    statNumber: {
        fontFamily: 'Audiowide, sans-serif',
        fontSize: '60px',
        fontWeight: '400',
        letterSpacing: '-0.03em',
        margin: `${theme.spacing(2)} 0 0 0`,
        [theme.breakpoints.down('sm')]: {
            fontSize: '28px',
            height: '40px',
            margin: '3px 0 0 0',
        },
    },
    statLabel: {
        fontFamily: 'Audiowide, sans-serif',
        fontSize: '20px',
        fontWeight: '400',
        letterSpacing: '-0.03em',
        [theme.breakpoints.down('sm')]: {
            fontSize: '12px',
            fontWeight: '200',
        },
    },
    joinButton: {
        alignSelf: 'center',
        display: 'block',
        position: 'relative',
        zIndex: 0,
        '&::before': {
            content: '""',
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '150px',
            height: '150px',
            background: 'none',
            pointerEvents: 'none',
            zIndex: 0,
            [theme.breakpoints.down('sm')]: {
                background:
                    theme.palette.mode === 'light'
                        ? 'radial-gradient(circle, rgba(0, 88, 148, 0.2) 0%, rgba(255, 255, 255, 0) 70%)'
                        : 'none',
            },
        },
    },
}));
