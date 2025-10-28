import { makeStyles } from '../../../../theme';

export const useStyles = makeStyles()(theme => ({
    container: {
        maxWidth: 1200,
        margin: '0 auto',
        padding: '0 40px',
        [theme.breakpoints.down('sm')]: {
            padding: '0 20px',
        },
    },
    section: {
        padding: '180px 0 164px 0',
        position: 'relative',
        zIndex: 2,
    },
    newsletterContent: {
        display: 'flex',
        gap: theme.spacing(5),
        alignItems: 'end',
        [theme.breakpoints.down('md')]: {
            flexDirection: 'column',
        },
    },
    newsletterTitle: {
        fontWeight: '500',
        fontSize: '30px',
        letterSpacing: '-0.03em',
        marginBottom: theme.spacing(1),
        marginTop: '30px',
        lineHeight: '130%',
    },
    newsletterSubTitle: {
        fontWeight: '400',
        fontSize: '18px',
        letterSpacing: '0',
        marginBottom: theme.spacing(2),
        paddingBottom: "10px",
        lineHeight: '130%',
    },
    newsletterInputContainer: {
        border: 'none',
        display: 'flex',
        alignItems: 'center',
        padding: `0 ${theme.spacing(1)}`,
        width: '409px',
    },
    bracesLeft: {
        borderTop: `1px solid ${theme.palette.primary.main}`,
        borderBottom: `1px solid ${theme.palette.primary.main}`,
        borderLeft: `1px solid ${theme.palette.primary.main}`,
        width: 30,
        height: 86
    },
    bracesRight: {
        borderTop: `1px solid ${theme.palette.primary.main}`,
        borderBottom: `1px solid ${theme.palette.primary.main}`,
        borderRight: `1px solid ${theme.palette.primary.main}`,
        width: 30,
        height: 86
    },
    newsletterInput: {
        flex: 1,
        backgroundColor: 'transparent',
        fontSize: '24px',
        border: 'none',
        color: theme.palette.text.primary,
        padding: theme.spacing(2),
        outline: 'none',
        textAlign: 'center',
    },
}));
