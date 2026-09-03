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
        fontSize: '16px',
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
        // the short variant takes over below 736 - both were visible between 600 and 736
        [theme.breakpoints.down(736)]: {
            display: 'none',
        },
    },
    supportTextMobile: {
        display: 'none',
        [theme.breakpoints.down(736)]: {
            display: 'block',
            fontSize: '12px',
            textAlign: 'center',
            // two even lines instead of a single word hanging below
            textWrap: 'balance',
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
        // the rows carry their own hit area on a phone, so the gap between them can go
        [theme.breakpoints.down(736)]: { gap: 0 },
    },
    link: {
        color: theme.custom.textMuted,
        textDecoration: 'none',
        // wordBreak: 'break-word',
        // whiteSpace: 'normal',
        cursor: 'pointer',
        '&:hover': {
            color: theme.palette.primary.light,
            textDecoration: 'underline',
        },
        // a finger needs about 44 px - the links were 26 px high. The padding grows the
        // hit area without moving the text, because the column loses its gap for it.
        [theme.breakpoints.down(736)]: {
            display: 'flex',
            alignItems: 'center',
            minHeight: 40,
        },
    },
    socialButton: {
        display: 'block',
        color: theme.custom.textMuted,
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
        // on a phone the label stands above the icons - next to them it left the icons
        // two columns with a wide gap between them
        [theme.breakpoints.down('sm')]: {
            flexDirection: 'column',
            alignItems: 'stretch',
            gap: 12,
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
            rowGap: 24,
            columnGap: 8,
            justifyContent: 'space-between',
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
