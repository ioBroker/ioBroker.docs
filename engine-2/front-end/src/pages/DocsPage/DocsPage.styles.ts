import { makeStyles } from '../../theme';

export const useStyles = makeStyles<{ isMenuCollapsed: boolean }>()((theme, { isMenuCollapsed }) => ({
    pageRoot: {
        display: 'flex',
        flexDirection: 'column',
        height: 'calc(100vh - 64px)',
        overflow: 'hidden',
        background: theme.custom.surfaces.canvas,
        // breathing room below the fixed header - same as the adapter pages
        paddingTop: '40px',
        [theme.breakpoints.down(1280)]: {
            paddingTop: '32px',
        },
        [theme.breakpoints.down(481)]: {
            paddingTop: '24px',
        },
    },
    pageWrapper: {
        flex: 1,
        minHeight: 0,
        position: 'relative',
        [theme.breakpoints.down(768)]: {
            overflow: 'visible',
        },
    },
    root: {
        display: 'flex',
        gap: '32px',
        margin: `0 ${theme.custom.layout.gutter.lg}px`,
        paddingBottom: '20px',
        position: 'relative',
        height: '100%',
        overflowX: 'hidden',
        '&::-webkit-scrollbar': {
            width: '8px',
        },
        '&::-webkit-scrollbar-track': {
            background: 'transparent',
        },
        '&::-webkit-scrollbar-thumb': {
            background: theme.custom.hairlineStrong,
            borderRadius: `${theme.custom.radius.pill}px`,
        },
        '&::-webkit-scrollbar-thumb:hover': {
            background: theme.palette.primary.main,
        },
        [theme.breakpoints.down(1280)]: {
            margin: `0 ${theme.custom.layout.gutter.md}px`,
            gap: '24px',
        },
        [theme.breakpoints.down(768)]: {
            position: !isMenuCollapsed ? 'relative' : 'static',
        },
        [theme.breakpoints.down(769)]: {
            maxHeight: '100%',
            overflowY: 'hidden',
        },
        [theme.breakpoints.down(481)]: {
            margin: '0',
            paddingLeft: `${theme.custom.layout.gutter.sm}px`,
            paddingRight: '0px',
        },
    },
    // right hand column: fixed tool row on top, the scrolling document below - so
    // the scrollbar starts under the row instead of running past it
    rightColumn: {
        flex: 1,
        minWidth: 0,
        minHeight: 0,
        display: 'flex',
        flexDirection: 'column',
    },
    topBar: {
        flexShrink: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '16px',
        paddingBottom: '20px',
        background: theme.custom.surfaces.canvas,
    },
    // switch for the table of contents - it lives in the tool row, so the panel
    // itself only takes width while it is open
    tocToggle: {
        flexShrink: 0,
        display: 'inline-flex',
        alignItems: 'center',
        gap: '8px',
        height: `${theme.custom.control.compactHeight}px`,
        padding: '0 10px 0 14px',
        border: 'none',
        borderRadius: `${theme.custom.radius.control}px`,
        background: theme.custom.surfaces.surface,
        boxShadow: `inset 0 0 0 1px ${theme.custom.hairline}`,
        cursor: 'pointer',
        fontFamily: theme.typography.fontFamily,
        fontSize: '15px',
        fontWeight: 400,
        whiteSpace: 'nowrap',
        color: theme.custom.textMuted,
        transition: 'background 0.2s ease, color 0.2s ease',
        '&:hover': {
            background: theme.custom.surfaces.raised,
            color: theme.palette.text.primary,
        },
        '&:focus-visible': {
            outline: 'none',
            boxShadow: theme.custom.focusRing,
        },
    },
    tocAnchor: {
        position: 'relative',
        flexShrink: 0,
        display: 'inline-flex',
    },
    // drops down under its switch and lies over the text
    tocDropdown: {
        position: 'absolute',
        top: 'calc(100% + 8px)',
        right: 0,
        width: '320px',
        maxWidth: 'calc(100vw - 48px)',
        zIndex: 1200,
    },
    tocToggleOpen: {
        background: theme.custom.surfaces.raised,
        color: theme.palette.text.primary,
    },
    tocChevron: {
        fontSize: '18px',
        flexShrink: 0,
        transition: 'transform 0.2s ease',
    },
    tocChevronOpen: {
        transform: 'rotate(180deg)',
    },
    menuToggleContainer: {
        flexShrink: 0,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: '12px',
        marginBottom: '16px',
        [theme.breakpoints.down(769)]: {
            width: 'auto',
        },
    },
    mainBlock: {
        flex: 1,
        minWidth: 0,
        minHeight: 0,
        overflowY: 'scroll',
        overflowX: 'hidden',
        '&::-webkit-scrollbar': {
            width: '8px',
        },
        '&::-webkit-scrollbar-track': {
            background: 'transparent',
        },
        '&::-webkit-scrollbar-thumb': {
            background: theme.custom.hairlineStrong,
            borderRadius: `${theme.custom.radius.pill}px`,
        },
        '&::-webkit-scrollbar-thumb:hover': {
            background: theme.palette.primary.main,
        },
    },
    content: {
        color: theme.palette.text.primary,
        lineHeight: 1.6,
        fontSize: '17px',
        paddingBottom: '20px',
        maxWidth: '1100px',
    },
    head: {
        color: theme.palette.primary.main,
        fontSize: '24px',
        fontFamily: 'Audiowide',
        fontWeight: 400,
        textTransform: 'uppercase',
        marginTop: '48px',
        marginBottom: '16px',
        paddingBottom: '10px',
        borderBottom: `1px solid ${theme.custom.hairline}`,
        '&:first-of-type': {
            marginTop: 0,
        },
        scrollMarginTop: '100px',
        letterSpacing: '-0.03em',
        display: 'inline-flex',
        width: '100%',
        alignItems: 'flex-start',
        gap: '16px',
        cursor: 'pointer',
        maxWidth: '100%',
        [theme.breakpoints.down(481)]: {
            fontSize: '18px',
        },
    },
    heading: {
        color: theme.palette.primary.main,
        fontSize: '20px',
        fontFamily: 'Audiowide',
        fontWeight: 400,
        textTransform: 'uppercase',
        marginTop: '40px',
        marginBottom: '16px',
        scrollMarginTop: '100px',
        letterSpacing: '-0.03em',
        display: 'inline-flex',
        alignItems: 'flex-start',
        gap: '16px',
        cursor: 'pointer',
        maxWidth: '100%',
        [theme.breakpoints.down(769)]: {
            fontSize: '18px',
        },
        [theme.breakpoints.down(481)]: {
            fontSize: '16px',
        },
    },
    linkIcon: {
        width: '20px',
        height: '20px',
        marginTop: '8px',
        flexShrink: 0,
    },
    paragraph: {
        marginBottom: '16px',
        fontSize: '17px',
        fontWeight: 400,
        lineHeight: 1.6,
        color: theme.custom.textMuted,
        [theme.breakpoints.down(481)]: {
            fontSize: '16px',
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
    },
    image: {
        maxWidth: '100%',
        height: 'auto',
        margin: '24px 0',
        borderRadius: `${theme.custom.radius.chip}px`,
    },
    table: {
        width: '100%',
        maxWidth: '100%',
        borderCollapse: 'collapse',
        margin: '15px 0',
        fontSize: '16px',
        border: `1px solid ${theme.custom.hairline}`,
        borderRadius: `${theme.custom.radius.chip}px`,
        overflow: 'hidden',
        tableLayout: 'fixed',
        wordBreak: 'break-word',
        overflowWrap: 'anywhere',
        [theme.breakpoints.down(1345)]: {
            fontSize: '14px',
        },
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
        backgroundColor: theme.custom.surfaces.surface,
    },
    tableRow: {
        borderBottom: `1px solid ${theme.custom.hairline}`,
        '&:last-child': {
            borderBottom: 'none',
        },
    },
    tableHeaderCell: {
        padding: '12px 16px',
        fontWeight: 600,
        textAlign: 'left',
        color: theme.palette.primary.main,
        borderRight: `1px solid ${theme.custom.hairline}`,
        wordBreak: 'break-word',
        overflowWrap: 'anywhere',
        '&:last-child': {
            borderRight: 'none',
        },
        [theme.breakpoints.down(1345)]: {
            padding: '10px 12px',
        },
        [theme.breakpoints.down(768)]: {
            padding: '8px 12px',
            minWidth: '120px',
        },
        [theme.breakpoints.down(481)]: {
            padding: '6px 8px',
            minWidth: '100px',
        },
    },
    tableCell: {
        padding: '12px 16px',
        borderRight: `1px solid ${theme.custom.hairline}`,
        wordBreak: 'break-word',
        overflowWrap: 'anywhere',
        display: 'table-cell',
        '&:last-child': {
            borderRight: 'none',
        },
        [theme.breakpoints.down(1345)]: {
            padding: '10px 12px',
        },
        [theme.breakpoints.down(768)]: {
            padding: '8px 12px',
            minWidth: '120px',
        },
        [theme.breakpoints.down(481)]: {
            padding: '6px 8px',
            minWidth: '100px',
        },
    },
    codeBlockContainer: {
        backgroundColor: theme.custom.surfaces.surface,
        borderRadius: `${theme.custom.radius.card}px`,
        boxShadow: `inset 0 0 0 1px ${theme.custom.hairline}`,
        margin: '16px 0 24px 0',
        overflow: 'hidden',
    },
    codeBlockContent: {
        padding: '10px 16px 10px 16px',
        margin: 0,
        fontFamily: 'monospace',
        fontSize: '15px',
        color: theme.palette.text.primary,
        overflowX: 'hidden',
        overflowY: 'hidden',
        whiteSpace: 'pre-wrap',
        wordBreak: 'break-word',
        backgroundColor: 'transparent',
        '& code': {
            fontFamily: 'inherit',
            fontSize: 'inherit',
            color: 'inherit',
        },
        '&::-webkit-scrollbar': {
            height: '7px',
        },
        '&::-webkit-scrollbar-track': {
            background: 'transparent',
            margin: '0 16px',
        },
        '&::-webkit-scrollbar-thumb': {
            background: theme.custom.hairlineStrong,
            borderRadius: `${theme.custom.radius.pill}px`,
        },
        '&::-webkit-scrollbar-thumb:hover': {
            background: theme.palette.primary.main,
        },
        [theme.breakpoints.down(769)]: {
            fontSize: '10px',
        },
    },
    inlineCode: {
        fontFamily: 'monospace',
        fontSize: '0.95em',
        backgroundColor: theme.custom.surfaces.raised,
        padding: '2px 6px',
        borderRadius: '6px',
        color: theme.palette.text.primary,
    },
    blockquote: {
        margin: '12px 0 16px 0',
        padding: '12px 16px',
        borderLeft: `3px solid ${theme.palette.primary.main}`,
        backgroundColor: theme.custom.surfaces.surface,
        borderRadius: `0 ${theme.custom.radius.chip}px ${theme.custom.radius.chip}px 0`,
        color: theme.custom.textMuted,
        '& p': {
            margin: 0,
        },
    },
    // the tool row stays, only the tree below it scrolls
    menuBlock: {
        flexShrink: 0,
        display: 'flex',
        flexDirection: 'column',
        minHeight: 0,
        overflow: 'hidden',
        [theme.breakpoints.down(769)]: {
            display: 'none',
        },
    },
    menuBlockMobile: {
        position: 'absolute',
        width: '380px',
        left: '32px',
        top: '0',
        zIndex: 1000,
        flexShrink: 0,
        [theme.breakpoints.up(769)]: {
            display: 'none',
            width: 'calc(91px - 18px + 1px)',
        },
        [theme.breakpoints.down(481)]: {
            width: 'calc(100% - 32px)',
            left: '16px',
            '&::before': {
                content: '""',
                position: 'absolute',
                top: 0,
                left: '-16px',
                right: '-16px',
                height: '100%',
                background: theme.custom.surfaces.canvas,
                zIndex: -1,
                pointerEvents: 'none',
            },
        },
    },
    menuButton: {},
    mainTopBlock: {},
    adaptersSearch: {},
    adaptersButton: {},
}));
