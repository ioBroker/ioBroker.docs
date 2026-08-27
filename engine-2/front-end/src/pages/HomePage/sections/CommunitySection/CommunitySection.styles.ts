import { makeStyles } from '../../../../theme';

export const useStyles = makeStyles()(theme => ({
    container: {
        maxWidth: 1376,
        margin: '0 auto',
        padding: '0 32px',
        [theme.breakpoints.down('md')]: {
            padding: '0 16px 0 16px',
        },
    },
    communitySection: {
        padding: '96px 0',
        [theme.breakpoints.down('md')]: {
            padding: '64px 0',
        },
        [theme.breakpoints.down('sm')]: {
            padding: '48px 0',
        },
    },
    communityText: {
        fontFamily: 'inherit',
        whiteSpace: 'pre-wrap',
        fontSize: '18px',
        textIndent: '2em',
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
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        marginTop: '120px',
        gap: theme.spacing(6),
        [theme.breakpoints.down(1281)]: {
            justifyContent: 'left',
        },
        [theme.breakpoints.down('md')]: {
            flexDirection: 'column',
            marginTop: '60px',
            alignItems: 'center',
            gap: theme.spacing(6),
        },
        [theme.breakpoints.down('sm')]: {
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'start',
            gap: '16px',
            width: '100%',
        },
        [theme.breakpoints.down(543)]: {
            width: '100%',
        },
        [theme.breakpoints.down(390)]: {
            width: '100%',
            flexDirection: 'column',
            flexWrap: 'wrap',
            justifyContent: 'center',
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
            width: 16,
        },
    },
    bracesRight: {
        borderTop: `1px solid ${theme.palette.primary.main}`,
        borderBottom: `1px solid ${theme.palette.primary.main}`,
        borderRight: `1px solid ${theme.palette.primary.main}`,
        width: 30,
        [theme.breakpoints.down('sm')]: {
            width: 16,
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
            fontSize: '16px',
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
            fontWeight: 400,
        },
    },
    joinButton: {
        alignSelf: 'center',
        display: 'block',
        position: 'relative',
        zIndex: 0,
        height: 50,
        [theme.breakpoints.down('sm')]: {
            height: 36,
        },
    },
}));
