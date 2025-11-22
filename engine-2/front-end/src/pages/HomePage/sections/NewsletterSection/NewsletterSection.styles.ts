import { makeStyles } from '../../../../theme';

export const useStyles = makeStyles()(theme => ({
    container: {
        maxWidth: 1392,
        margin: '0 auto',
        padding: '0 40px',
        [theme.breakpoints.down('sm')]: {
            padding: '0 20px',
        },
    },
    newsletterSection: {
        padding: '245px 0 246px 0',
        position: 'relative',
        zIndex: 2,
        [theme.breakpoints.down('md')]: {
            padding: '108px 0',
        },
    },
    newsletterContent: {
        display: 'flex',
        gap: '55px',
        alignItems: 'end',
        [theme.breakpoints.down('md')]: {
            flexDirection: 'column',
            alignItems: 'center',
            gap: '51px',
        },
    },
    newslettertext: {
        width: '460px',
        marginRight: '153px',
        height: 'fit-content',
        [theme.breakpoints.down('lg')]: {
            margin: 'auto',
            alignItems: 'center',
        },
        [theme.breakpoints.down('md')]: {
            textAlign: 'left',
        },
        [theme.breakpoints.down('sm')]: {
            width: 'auto',
            margin: 'auto',
        },
    },
    newsletterTitle: {
        fontWeight: '500',
        fontSize: '30px',
        letterSpacing: '-0.03em',
        marginBottom: theme.spacing(1),
        marginTop: '30px',
        lineHeight: '130%',
        [theme.breakpoints.down('sm')]: {
            fontSize: '18px',
            marginTop: 0,
        },
        // [theme.breakpoints.down('md')]: {
        //     textAlign: 'center'
        // },
    },
    newsletterSubTitle: {
        fontWeight: '400',
        fontSize: '18px',
        letterSpacing: '0',
        marginBottom: theme.spacing(2),
        paddingBottom: '10px',
        lineHeight: '130%',
        [theme.breakpoints.down('sm')]: {
            fontSize: '16px',
            marginBottom: 0,
            paddingBottom: 0,
        },
    },
    newsletterInputContainer: {
        border: 'none',
        display: 'flex',
        alignItems: 'center',
        padding: `0 ${theme.spacing(1)}`,
        width: '409px',
        [theme.breakpoints.down('md')]: {
            width: '300px',
        },
        [theme.breakpoints.down('sm')]: {
            width: '250px',
        },
    },
    bracesLeft: {
        borderTop: `1px solid ${theme.palette.primary.main}`,
        borderBottom: `1px solid ${theme.palette.primary.main}`,
        borderLeft: `1px solid ${theme.palette.primary.main}`,
        width: 30,
        height: 86,
        [theme.breakpoints.down('md')]: {
            width: 20,
            height: 70,
        },
        [theme.breakpoints.down('sm')]: {
            width: 10,
            height: 46,
        },
    },
    bracesRight: {
        borderTop: `1px solid ${theme.palette.primary.main}`,
        borderBottom: `1px solid ${theme.palette.primary.main}`,
        borderRight: `1px solid ${theme.palette.primary.main}`,
        width: 30,
        height: 86,
        [theme.breakpoints.down('md')]: {
            width: 20,
            height: 70,
        },
        [theme.breakpoints.down('sm')]: {
            width: 10,
            height: 46,
        },
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
        '&::placeholder': {
            color: theme.palette.text.primary,
            opacity: 0.6,
        },
        [theme.breakpoints.down('md')]: {
            fontSize: '20px',
            padding: theme.spacing(1.5),
        },
        [theme.breakpoints.down('sm')]: {
            fontSize: '18px',
            padding: theme.spacing(1),
        },
    },
}));
