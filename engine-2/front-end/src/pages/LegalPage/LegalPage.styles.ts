import { makeStyles } from '../../theme';

export const useStyles = makeStyles()(theme => ({
    pageWrapper: {
        width: '100%',
        overflow: 'hidden',
        position: 'relative',
    },
    pageContainer: {
        // left aligned on the page gutter, like the other pages - the explicit
        // textAlign matters where the page sits in a centred container
        textAlign: 'left',
        width: '100%',
        maxWidth: theme.custom.layout.contentMaxWidth + 2 * theme.custom.layout.gutter.lg,
        margin: 0,
        padding: `${theme.custom.layout.section.md}px ${theme.custom.layout.gutter.lg}px ${theme.custom.layout.section.lg}px`,
        boxSizing: 'border-box',
        [theme.breakpoints.down('md')]: {
            padding: `${theme.custom.layout.section.sm}px ${theme.custom.layout.gutter.md}px ${theme.custom.layout.section.md}px`,
        },
        [theme.breakpoints.down('sm')]: {
            padding: `${theme.custom.layout.section.sm}px ${theme.custom.layout.gutter.sm}px ${theme.custom.layout.section.md}px`,
        },
    },
    // links inside the legal text keep the brand colour
    body: {
        '& a': {
            color: theme.palette.mode === 'dark' ? theme.palette.primary.light : theme.palette.secondary.main,
            textDecoration: 'none',
            '&:hover': {
                textDecoration: 'underline',
            },
        },
    },
    message: {
        color: theme.custom.textMuted,
        padding: '40px 0',
    },
    meta: {
        marginTop: '40px',
        fontSize: '14px',
        color: theme.custom.textSubtle,
    },
    editLinkRow: {
        marginTop: '40px',
        paddingTop: '24px',
        borderTop: `1px solid ${theme.custom.hairline}`,
        display: 'flex',
        justifyContent: 'flex-end',
    },
    editLink: {
        display: 'inline-flex',
        alignItems: 'center',
        gap: '6px',
        fontSize: '14px',
        fontWeight: 400,
        textDecoration: 'none',
        color: theme.custom.textSubtle,
        '&:hover': {
            color: theme.palette.primary.main,
        },
    },
    // the sections of a legal text are quiet labels, not display headings
    head: {
        fontFamily: theme.typography.fontFamily,
        fontSize: '20px',
        fontWeight: 700,
        lineHeight: 1.35,
        color: theme.palette.text.primary,
        marginTop: '40px',
        marginBottom: '12px',
        scrollMarginTop: '100px',
        display: 'block',
        maxWidth: '100%',
        '&:first-of-type': {
            marginTop: 0,
        },
        [theme.breakpoints.down(481)]: {
            fontSize: '18px',
        },
    },
    heading: {
        fontFamily: theme.typography.fontFamily,
        fontSize: '17px',
        fontWeight: 700,
        lineHeight: 1.4,
        color: theme.palette.text.primary,
        marginTop: '28px',
        marginBottom: '10px',
        scrollMarginTop: '100px',
        display: 'block',
        maxWidth: '100%',
    },
    subheading: {
        fontFamily: theme.typography.fontFamily,
        fontSize: '16px',
        fontWeight: 700,
        lineHeight: 1.4,
        color: theme.palette.text.primary,
        margin: '20px 0 8px 0',
    },
    linkIcon: {
        width: '20px',
        height: '20px',
        marginTop: '8px',
        flexShrink: 0,
    },
    paragraph: {
        marginBottom: '14px',
        fontSize: '16px',
        fontWeight: 400,
        lineHeight: 1.6,
        color: theme.custom.textMuted,
        [theme.breakpoints.down(481)]: {
            fontSize: '15px',
        },
    },
    list: {
        marginLeft: '24px',
        marginBottom: '16px',
        fontSize: '16px',
        lineHeight: 1.6,
        color: theme.custom.textMuted,
    },
    listItem: {
        marginBottom: '8px',
        // markdown can carry link texts without a space in them - without this one of them
        // pushes the whole content column past the screen
        overflowWrap: 'anywhere',
    },
    image: {
        maxWidth: '100%',
        height: 'auto',
        margin: '24px 0',
        borderRadius: `${theme.custom.radius.control}px`,
    },
    table: {
        width: '100%',
        maxWidth: '100%',
        borderCollapse: 'collapse',
        margin: '15px 0',
        fontSize: '16px',
        border: `1px solid ${theme.palette.divider}`,
        borderRadius: '8px',
        overflow: 'hidden',
        tableLayout: 'fixed',
        wordBreak: 'break-word',
        overflowWrap: 'anywhere',
        [theme.breakpoints.down(920)]: {
            fontSize: '14px',
            display: 'block',
            overflow: 'auto',
            whiteSpace: 'nowrap',
        },
        [theme.breakpoints.down(481)]: {
            fontSize: '12px',
        },
    },
    tableHead: {
        backgroundColor: theme.custom.surfaces.raised,
    },
    tableRow: {
        borderBottom: `1px solid ${theme.palette.divider}`,
        '&:last-child': {
            borderBottom: 'none',
        },
    },
    tableHeaderCell: {
        padding: '12px 16px',
        fontWeight: 600,
        textAlign: 'left',
        color: theme.palette.primary.main,
        borderRight: `1px solid ${theme.palette.divider}`,
        wordBreak: 'break-word',
        overflowWrap: 'anywhere',
        '&:last-child': {
            borderRight: 'none',
        },
        [theme.breakpoints.down(481)]: {
            padding: '6px 8px',
            minWidth: '100px',
        },
    },
    tableCell: {
        padding: '12px 16px',
        borderRight: `1px solid ${theme.palette.divider}`,
        wordBreak: 'break-word',
        overflowWrap: 'anywhere',
        display: 'table-cell',
        '&:last-child': {
            borderRight: 'none',
        },
        [theme.breakpoints.down(481)]: {
            padding: '6px 8px',
            minWidth: '100px',
        },
    },
    codeBlockContainer: {
        backgroundColor: theme.palette.secondary.main,
        borderRadius: `${theme.custom.radius.control}px`,
        border: 'none',
        margin: '16px 0 24px 0',
        overflow: 'hidden',
    },
    codeBlockContent: {
        padding: '10px 16px',
        margin: 0,
        fontFamily: 'monospace',
        fontSize: '16px',
        color: '#FFF',
        overflowX: 'hidden',
        overflowY: 'hidden',
        whiteSpace: 'pre-wrap',
        wordBreak: 'break-word',
        backgroundColor: theme.palette.secondary.main,
        '& code': {
            fontFamily: 'inherit',
            fontSize: 'inherit',
            color: 'inherit',
        },
        [theme.breakpoints.down(769)]: {
            fontSize: '12px',
        },
    },
    inlineCode: {
        fontFamily: 'monospace',
        fontSize: '0.95em',
        backgroundColor: theme.custom.surfaces.raised,
        padding: '2px 6px',
        borderRadius: '4px',
        color: theme.palette.text.primary,
    },
    blockquote: {
        margin: '12px 0 20px 0',
        padding: '14px 20px',
        border: 'none',
        backgroundColor: theme.custom.surfaces.raised,
        borderRadius: `${theme.custom.radius.control}px`,
        color: theme.palette.text.primary,
        '& p': {
            margin: 0,
        },
    },
}));
