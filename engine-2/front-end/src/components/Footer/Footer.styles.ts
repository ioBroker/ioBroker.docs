import { makeStyles } from '../../theme';

export const useFooterStyles = makeStyles()(theme => ({
    root: {
        width: '100%',
        backgroundColor: theme.palette.background.default,
        display: 'flex',
        justifyContent: 'center',
        color: theme.palette.text.primary,
        zIndex: 9,
    },
    container: {
        margin: '100px 0px 32px 0px',
        gap: '100px',
        width: 'calc(100% - 120px)',
        display: 'flex',
        flexDirection: 'column',
        [theme.breakpoints.down('sm')]: {
            margin: '60px 23px 23px',
            width: 'calc(100% - 60px)',
            gap: '50px',
        },
    },
    mainContent: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        zIndex: 9,
        gap: '80px',
        [theme.breakpoints.down('sm')]: {
            gap: '50px',
        },
    },
    logoBox: {
        flexGrow: 1,
        textAlign: 'left',
        [theme.breakpoints.down('md')]: {
            display: 'none',
        },
    },
    logo: {
        width: '100%',
        maxWidth: 393,
    },
    sectionsWrapper: {
        gap: '60px',
        display: 'flex',
        flexDirection: 'column',
        [theme.breakpoints.down('sm')]: {
            gap: '40px',
        },
    },
    sectionsRow: {
        gap: '93px',
        display: 'flex',
        fontSize: '18px',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        [theme.breakpoints.down('md')]: {
            flexWrap: 'wrap',
            gap: '16px',
            justifyContent: 'center',
        },
    },
    braces: {
        flexWrap: 'nowrap',
        justifyContent: 'space-between',
        display: 'flex',
    },
    bracesLeft: {
        borderTop: `1px solid ${theme.palette.primary.main}`,
        borderBottom: `1px solid ${theme.palette.primary.main}`,
        borderLeft: `1px solid ${theme.palette.primary.main}`,
        borderRadius: '2px 0 0 2px',
        width: 10,
        [theme.breakpoints.down('sm')]: {
            width: 25,
        },
    },
    bracesRight: {
        borderTop: `1px solid ${theme.palette.primary.main}`,
        borderBottom: `1px solid ${theme.palette.primary.main}`,
        borderRight: `1px solid ${theme.palette.primary.main}`,
        borderRadius: '0 2px 2px 0',
        width: 10,
        [theme.breakpoints.down('sm')]: {
            width: 25,
        },
    },
    bracesContent: {
        padding: theme.spacing(1),
    },
    supportColumn: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        height: '100%',
        gap: 12,
    },
    supportText: {
        textAlign: 'center',
        [theme.breakpoints.down('sm')]: {
            display: 'none',
        },
    },
    supportTextMobile: {
        display: 'none',
        [theme.breakpoints.down(736)]: {
            display: 'inline-block',
            fontSize: '12px',
        },
    },
    donateButtons: {
        display: 'flex',
        gap: 26,
        justifyContent: 'center',
    },
    linksColumn: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        height: '100%',
        gap: 6,
        alignItems: 'start',
    },
    link: {
        color: theme.palette.text.primary,
        textDecoration: 'none',
        // wordBreak: 'break-word',
        // whiteSpace: 'normal',
        cursor: 'pointer',
        '&:hover': {
            color: theme.palette.primary.light,
            textDecoration: 'underline',
        },
    },
    socialButton: {
        display: 'block',
        color: theme.palette.text.primary,
        textDecoration: 'none',
        textAlign: 'center',
        fontSize: '10px',
        '&:hover': {
            textDecoration: 'none',
            color: theme.palette.primary.light,
        },
    },
    socialRow: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 103,
        [theme.breakpoints.down('md')]: {
            gap: 16,
        },
        [theme.breakpoints.down('sm')]: {
            alignItems: 'start',
        },
    },
    followUsText: {
        flexGrow: 1,
        [theme.breakpoints.down('sm')]: {
            fontSize: '12px',
            flexGrow: 0,
            flexShrink: 0,
        },
    },
    socialIconsWrapper: {
        display: 'flex',
        flexDirection: 'row',
        gap: 16,
        alignItems: 'center',
        flexWrap: 'wrap',
        marginLeft: 16,
        [theme.breakpoints.down('sm')]: {
            rowGap: 32,
            columnGap: 60,
            flex: 1,
            marginLeft: 0,
        },
    },
    legalLinksMobile: {
        display: 'none',
        [theme.breakpoints.down(736)]: {
            display: 'flex',
        },
    },
    legalLinksDesktop: {
        [theme.breakpoints.down(736)]: {
            display: 'none',
        },
    },
    copyright: {
        fontSize: 16,
        display: 'flex',
        flexDirection: 'row',
        gap: 16,
        lineHeight: '130%',
        letterSpacing: -0.16,
        [theme.breakpoints.down('md')]: {
            fontSize: 11,
        },
    },
    copyrightText: {
        textAlign: 'left',
    },
    flexGrow: {
        flexGrow: 1,
    },
    scrollTop: {
        color: theme.palette.primary.main,
        cursor: 'pointer',
    },
    hideOnSmall: {
        [theme.breakpoints.down('sm')]: {
            display: 'none',
        },
    },
    socialBracesLeft: {
        borderTop: `1px solid ${theme.palette.primary.main}`,
        borderBottom: `1px solid ${theme.palette.primary.main}`,
        borderLeft: `1px solid ${theme.palette.primary.main}`,
        borderRadius: '2px 0 0 2px',
        width: 10,
        [theme.breakpoints.down('sm')]: {
            display: 'none',
        },
    },
    socialBracesRight: {
        borderTop: `1px solid ${theme.palette.primary.main}`,
        borderBottom: `1px solid ${theme.palette.primary.main}`,
        borderRight: `1px solid ${theme.palette.primary.main}`,
        borderRadius: '0 2px 2px 0',
        width: 10,
        [theme.breakpoints.down('sm')]: {
            display: 'none',
        },
    },
    socialBracesContent: {
        padding: theme.spacing(1),
        [theme.breakpoints.down('sm')]: {
            padding: 0,
        },
    },
}));
