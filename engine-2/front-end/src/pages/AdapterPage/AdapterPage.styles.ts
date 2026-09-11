import { makeStyles } from '../../theme';

export const useStyles = makeStyles()(theme => ({
    pageRoot: {
        display: 'flex',
        flexDirection: 'column',
        height: 'calc(100vh - 64px)',
        overflow: 'hidden',
        position: 'relative',
    },
    titleContainer: {
        flexShrink: 0,
        margin: '0px 8px 0px 0px',
        // The content starts straight under the header - no gap, at any width.
        paddingTop: 0,
        [theme.breakpoints.down('sm')]: {
            margin: '0px',
            background: 'transparent',
        },
    },
    pageGrid: {
        display: 'grid',
        gridTemplateColumns: '1fr 350px',
        gridTemplateAreas: `
            "left sidebar"
        `,
        position: 'relative',
        flex: 1,
        minHeight: 0,
        gap: '0 40px',
        // the page's left edge comes from the layout token, like every other page
        margin: `0px 8px 0px ${theme.custom.layout.gutter.lg}px`,
        color: theme.palette.text.primary,
        fontFamily: theme.typography.fontFamily,
        overflowY: 'scroll',
        overflowX: 'hidden',
        paddingRight: '12px',
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

        [theme.breakpoints.down('lg')]: {
            margin: `0px 2px 0px ${theme.custom.layout.gutter.lg}px`,
            paddingRight: '10px',
        },

        [theme.breakpoints.between('md', 'lg')]: {
            gridTemplateColumns: '1fr',
            gridTemplateAreas: `
                "intro"
                "sidebar"
                "content"
            `,
            gap: '24px 0',
        },

        [theme.breakpoints.down('md')]: {
            gridTemplateColumns: '1fr',
            gridTemplateAreas: `
                "intro"
                "sidebar"
                "content"
            `,
            gap: '24px 0',
            paddingRight: '0px',
        },
        // below 600 px, not 480 - the same step as the rest of the site
        [theme.breakpoints.down('sm')]: {
            margin: '0px',
            padding: `0px 0px 0px ${theme.custom.layout.gutter.sm}px`,
        },
    },

    leftColumn: {
        gridArea: 'left',
        minWidth: 0,
        display: 'flex',
        flexDirection: 'column',
        gap: '0',
        [theme.breakpoints.down('lg')]: {
            display: 'contents',
        },
    },
    introArea: {
        gridArea: 'intro',
        minWidth: 0,
    },
    mainContentArea: {
        gridArea: 'content',
        minWidth: 0,
    },

    sidebarArea: {
        gridArea: 'sidebar',
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',

        // Below the wide layout the sidebar becomes a row of two cards rather than a
        // stack: on a tablet a stacked sidebar was capped at 460 px and left half the
        // screen empty beside it.
        [theme.breakpoints.between('sm', 'lg')]: {
            flexDirection: 'row',
            maxHeight: '408px',
            alignItems: 'stretch',
            gap: '24px',
            marginBottom: '16px',
        },
    },
    sidebarLeft: {
        width: '100%',
        [theme.breakpoints.between('sm', 'lg')]: {
            flex: 1,
            maxWidth: '348px',
        },
    },
    sidebarRight: {
        display: 'flex',
        flexDirection: 'column',
        maxWidth: '350px',
        gap: '12px',
        width: '100%',
        [theme.breakpoints.between('sm', 'lg')]: {
            flex: 1,
            maxWidth: '342px',
            gap: '16px',
            height: '100%',
        },
        [theme.breakpoints.down('sm')]: {
            maxWidth: 'none',
        },
    },

    breadcrumbs: {
        fontFamily: 'Audiowide, sans-serif',
        fontSize: '18px',
        color: theme.custom.textSubtle,
        marginBottom: '20px',
        marginLeft: `${theme.custom.layout.gutter.lg}px`,
        display: 'flex',
        alignItems: 'center',
        flexWrap: 'wrap',
        columnGap: '8px',
        rowGap: '4px',
        textTransform: 'uppercase',
        [theme.breakpoints.down('lg')]: {
            fontSize: '16px',
            marginBottom: '18px',
        },
        [theme.breakpoints.down('sm')]: {
            fontSize: '14px',
            marginLeft: `${theme.custom.layout.gutter.sm}px`,
        },
    },
    breadcrumbsEnd: {
        fontFamily: 'Audiowide, sans-serif',
        fontSize: '32px',
        color: theme.palette.primary.main,
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        textTransform: 'uppercase',
        [theme.breakpoints.down('lg')]: {
            fontSize: '26px',
        },
        [theme.breakpoints.down('sm')]: {
            fontSize: '20px',
        },
    },
    breadcrumbSlash: {
        color: theme.custom.textSubtle,
    },
    breadcrumbSlashEnd: {
        color: theme.custom.textSubtle,
    },
    paragraph: {
        fontWeight: 400,
        fontSize: theme.custom.reading.lead.fontSize,
        lineHeight: 1.6,
        marginBottom: '16px',
        color: theme.custom.textMuted,
        '& img': {
            marginLeft: '10px',
        },
        [theme.breakpoints.down('sm')]: {
            fontSize: '16px',
        },
    },
    sectionTitle: {
        fontFamily: 'Audiowide, sans-serif',
        fontSize: '18px',
        color: theme.palette.primary.main,
        textTransform: 'uppercase',
        marginTop: '40px',
        marginBottom: '16px',
        borderBottom: `1px solid ${theme.custom.hairline}`,
        paddingBottom: '10px',
        [theme.breakpoints.down('md')]: {
            fontSize: '16px',
        },
        [theme.breakpoints.down('sm')]: {
            fontSize: '18px',
        },
    },
    subTitle: {
        fontSize: '20px',
        fontWeight: 700,
        lineHeight: 1.35,
        color: theme.palette.text.primary,
        marginBottom: '10px',
        marginTop: '28px',
        [theme.breakpoints.down('lg')]: {
            fontSize: '18px',
        },
        [theme.breakpoints.down('sm')]: {
            fontSize: theme.custom.reading.body.fontSize,
        },
    },
    list: {
        margin: '0 0 16px 20px',
        padding: 0,
        fontWeight: 400,
        fontSize: '16px',
        lineHeight: 1.6,
        color: theme.custom.textMuted,
        '& li': {
            marginBottom: '8px',
        },
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
        [theme.breakpoints.down('lg')]: {
            fontSize: theme.custom.reading.small.fontSize,
        },
        [theme.breakpoints.down('md')]: {
            fontSize: theme.custom.reading.small.fontSize,
            display: 'block',
            overflow: 'auto',
            whiteSpace: 'nowrap',
        },
        [theme.breakpoints.down('sm')]: {
            fontSize: theme.custom.reading.caption.fontSize,
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
        [theme.breakpoints.down('lg')]: {
            padding: '10px 12px',
        },
        [theme.breakpoints.down('md')]: {
            padding: '8px 12px',
            minWidth: '120px',
        },
        [theme.breakpoints.down('sm')]: {
            padding: '6px 8px',
            minWidth: '100px',
        },
    },
    tableCell: {
        padding: '12px 16px',
        borderRight: `1px solid ${theme.custom.hairline}`,
        wordBreak: 'break-word',
        overflowWrap: 'anywhere',
        '&:last-child': {
            borderRight: 'none',
        },
        [theme.breakpoints.down('lg')]: {
            padding: '10px 12px',
        },
        [theme.breakpoints.down('md')]: {
            padding: '8px 12px',
            minWidth: '120px',
        },
        [theme.breakpoints.down('sm')]: {
            padding: '6px 8px',
            minWidth: '100px',
        },
    },
    inlineCode: {
        backgroundColor: theme.custom.surfaces.raised,
        padding: '2px 6px',
        borderRadius: '6px',
        fontFamily: 'monospace',
        fontSize: '0.9em',
    },
    blockquote: {
        borderLeft: `3px solid ${theme.palette.primary.main}`,
        paddingLeft: '16px',
        margin: '12px 0 16px 0',
        color: theme.custom.textMuted,
    },

    codeBlockContainer: {
        backgroundColor: theme.custom.surfaces.surface,
        width: '820px',
        maxWidth: '100%',
        minHeight: '274px',
        borderRadius: `${theme.custom.radius.card}px`,
        boxShadow: `inset 0 0 0 1px ${theme.custom.hairline}`,
        overflow: 'hidden',
        marginBottom: '24px',
        paddingBottom: '16px',
        display: 'flex',
        flexDirection: 'column',
        [theme.breakpoints.down('lg')]: {
            width: '100%',
            minHeight: 'unset',
        },
    },
    codeBlockHeader: {
        backgroundColor: theme.custom.surfaces.raised,
        color: theme.palette.text.primary,
        lineHeight: 1,
        borderBottom: `1px solid ${theme.custom.hairline}`,
        padding: '14px 16px 12px 16px',
        position: 'relative',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'end',
        fontWeight: 700,
        fontSize: '18px',
        flexShrink: 0,
        [theme.breakpoints.down('md')]: {
            fontSize: '18px',
        },
    },
    codeBlockContent: {
        padding: '10px 16px 10px 16px',
        margin: 0,
        fontFamily: 'monospace',
        fontSize: '15px',
        color: theme.palette.text.primary,
        flex: 1,
        flexGrow: 1,
        overflowX: 'auto',
        overflowY: 'hidden',
        whiteSpace: 'pre',
        '& .key': { color: theme.palette.primary.main },
        '& .value': { color: theme.palette.text.primary },
        '& .comment': { color: theme.custom.textSubtle },
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
        // 10 px is below anything the kit calls readable - the block scrolls sideways
        // anyway, so the code keeps the caption size instead of shrinking further
        [theme.breakpoints.down('md')]: {
            fontSize: theme.custom.reading.caption.fontSize,
        },
    },

    copyConfirmation: {
        position: 'absolute',
        top: 18,
        right: -90,
        transition: 'opacity 0.3s',
        background: theme.custom.surfaces.overlay,
        color: theme.palette.primary.main,
        borderRadius: `${theme.custom.radius.chip}px`,
        boxShadow: theme.custom.elevation.overlay,
        padding: '5px 10px',
        whiteSpace: 'nowrap',
        [theme.breakpoints.down('lg')]: {
            top: 45,
            right: 0,
        },
    },

    sidebarCard: {
        borderRadius: `${theme.custom.radius.card}px`,
        padding: '28px 24px',
        minHeight: '425px',
        backgroundColor: theme.custom.surfaces.surface,
        boxShadow: theme.custom.elevation.card,
        marginTop: '80px',
        [theme.breakpoints.down('lg')]: {
            marginTop: '0px',
            height: '100%',
        },
        [theme.breakpoints.down('md')]: {
            borderRadius: '16px',
            padding: '20px 24px',
            minHeight: 'unset',
        },
        [theme.breakpoints.down('sm')]: {
            padding: '20px 10px 20px 10px',
            minHeight: 'unset',
        },
    },
    logoContainer: {
        display: 'flex',
        justifyContent: 'center',
        marginBottom: '24px',
        [theme.breakpoints.down('md')]: {
            marginBottom: '0px',
        },
    },
    logo: {
        width: '125px',
        height: '125px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        '& img': {
            width: '100%',
            height: '100%',
            objectFit: 'contain',
        },
        [theme.breakpoints.down('lg')]: {
            '& img': {
                width: '104px',
                height: '104px',
            },
        },
    },
    infoRow: {
        display: 'flex',
        justifyContent: 'space-between',
        gap: '12px',
        marginBottom: '10px',
        fontSize: '15px',
        fontWeight: 400,
    },
    infoLabel: {
        color: theme.custom.textSubtle,
        fontSize: '15px',
        fontWeight: 400,
    },
    npmImage: {
        width: 'auto',
        height: '36px',
        objectFit: 'contain',
        objectPosition: 'left',
    },
    badgeInfoLabel: {
        fontFamily: 'Audiowide, sans-serif',
        fontSize: '16px',
        fontWeight: 400,
        color: theme.custom.textAccent,
    },
    infoValue: {
        color: theme.palette.text.primary,
        textAlign: 'right',
        fontSize: '15px',
        fontWeight: 400,
        maxWidth: '200px',
        flexShrink: 0,
    },
    infoValueOverflow: {
        fontSize: '12px !important',
    },
    /** the release date behind a version - it should be readable, but not compete with the number */
    infoValueDate: {
        marginLeft: '6px',
        fontSize: '12px',
        opacity: 0.6,
        whiteSpace: 'nowrap',
    },
    statsContainer: {
        display: 'flex',
        justifyContent: 'space-between',
        marginTop: '24px',
        paddingTop: '20px',
        borderTop: `1px solid ${theme.custom.hairline}`,
        [theme.breakpoints.down('lg')]: {
            marginTop: '0px',
        },
    },
    statItem: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        fontSize: '15px',
        fontWeight: 400,
        color: theme.custom.textMuted,
        '& svg': {
            marginBottom: '6px',
            color: theme.palette.text.primary,
        },
        '& img': {
            marginBottom: '6px',
            filter:
                theme.palette.mode === 'light'
                    ? 'brightness(0) saturate(100%) invert(21%) sepia(96%) saturate(1992%) hue-rotate(190deg) brightness(95%) contrast(91%)'
                    : 'none',
        },
    },
    sidebarLink: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '12px 16px',
        minHeight: `${theme.custom.control.height}px`,
        boxSizing: 'border-box',
        borderRadius: `${theme.custom.radius.control}px`,
        backgroundColor: theme.custom.surfaces.surface,
        boxShadow: `inset 0 0 0 1px ${theme.custom.hairline}`,
        cursor: 'pointer',
        textTransform: 'uppercase',
        fontFamily: 'Audiowide, sans-serif',
        fontSize: '15px',
        letterSpacing: '0.02em',
        color: theme.palette.primary.main,
        transition: 'background 0.2s ease, box-shadow 0.2s ease',
        textDecoration: 'none',
        '&:hover': {
            backgroundColor: theme.custom.surfaces.raised,
            boxShadow: `inset 0 0 0 1px ${theme.custom.hairlineStrong}`,
        },
        [theme.breakpoints.down('lg')]: {
            height: '40px',
        },
    },
    sidebarLinkIcon: {
        width: '16px',
        height: '16px',
        [theme.breakpoints.down('lg')]: {
            width: '14px',
            height: '14px',
        },
    },
    badgesContainer: {
        borderRadius: `${theme.custom.radius.card}px`,
        backgroundColor: theme.custom.surfaces.surface,
        boxShadow: theme.custom.elevation.card,
        padding: '24px',
        paddingRight: '84px',
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
        [theme.breakpoints.down('lg')]: {
            padding: '19px 24px',
            flex: 1,
        },
        [theme.breakpoints.down('md')]: {
            display: 'none',
        },
    },
    badgeImage: {
        height: '20px',
        objectFit: 'contain',
        objectPosition: 'left',
    },
    arrowIcon: {
        width: '24px',
        height: '24px',
        flexShrink: 0,
        [theme.breakpoints.down('lg')]: {
            width: '18px',
            height: '18px',
        },
        [theme.breakpoints.down('md')]: {
            width: '12px',
            height: '12px',
        },
    },
    arrowIconRight: {
        transform: 'rotate(-45deg)',
        width: '24px',
        height: '24px',
        flexShrink: 0,
        [theme.breakpoints.down('lg')]: {
            width: '18px',
            height: '18px',
        },
        [theme.breakpoints.down('md')]: {
            width: '12px',
            height: '12px',
        },
    },
    // The feedback note under a document: quieter than the documentation it follows, and running
    // the full width of the column instead of standing in a narrow block of its own.
    feedbackTitle: {
        marginTop: '32px',
        fontSize: '14px',
        fontWeight: 600,
        lineHeight: 1.5,
        color: theme.custom.textMuted,
    },
    feedbackText: {
        fontSize: '14px',
        fontWeight: 400,
        lineHeight: 1.6,
        color: theme.custom.textSubtle,
    },

    // "Edit on GitHub" is an aside, not an action the page is about: a plain italic line that the
    // eye passes over, underlined only when it is pointed at.
    editLink: {
        display: 'inline-block',
        marginTop: '16px',
        fontSize: '14px',
        fontStyle: 'italic',
        fontWeight: 400,
        color: theme.custom.textSubtle,
        textDecoration: 'none',
        transition: 'color 0.2s ease',
        '&:hover': {
            color: theme.palette.primary.main,
            textDecoration: 'underline',
        },
    },

    // СТИЛИ ДЛЯ МОДАЛЬНОГО ОКНА ЛИЦЕНЗИИ
    licenseDialogContainer: {
        justifyContent: 'flex-end',
        paddingRight: '12px',
        paddingTop: '64px',

        [theme.breakpoints.down('md')]: {
            justifyContent: 'center',
            alignItems: 'center',
            paddingRight: '0',
            paddingTop: '0',
        },
    },

    licenseDialogPaper: {
        backgroundColor: theme.custom.surfaces.surface,
        backgroundImage: 'none',
        borderRadius: `${theme.custom.radius.card}px`,
        boxShadow: `inset 0 0 0 1px ${theme.custom.hairlineStrong}, ${theme.custom.elevation.overlay}`,
        color: theme.palette.text.primary,
        maxWidth: '841px',
        width: '100%',
        margin: '16px',
    },
    licenseTitle: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '28px 32px 16px 32px',
        fontSize: '18px',
        fontWeight: 700,
        color: theme.palette.text.primary,
    },
    licenseCloseButton: {
        color: theme.custom.textMuted,
        padding: '6px',
        borderRadius: `${theme.custom.radius.control}px`,
        '& svg': {
            fontSize: '24px',
        },
        '&:hover': {
            backgroundColor: theme.custom.surfaces.raised,
        },
    },
    licenseContent: {
        padding: '0 32px 32px 32px !important',
        '&::-webkit-scrollbar': {
            width: '6px',
        },
        '&::-webkit-scrollbar-track': {
            background: 'transparent',
        },
        '&::-webkit-scrollbar-thumb': {
            background: theme.custom.hairlineStrong,
            borderRadius: `${theme.custom.radius.pill}px`,
        },
    },
    licenseParagraph: {
        fontSize: theme.custom.reading.body.fontSize,
        fontWeight: 400,
        lineHeight: 1.6,
        color: theme.custom.textMuted,
        marginBottom: '16px',
    },
    // СТИЛИ ДЛЯ МОДАЛЬНОГО ОКНА HISTORY
    historyDialogPaper: {
        backgroundColor: theme.custom.surfaces.surface,
        backgroundImage: 'none',
        borderRadius: `${theme.custom.radius.card}px`,
        boxShadow: `inset 0 0 0 1px ${theme.custom.hairlineStrong}, ${theme.custom.elevation.overlay}`,
        color: theme.palette.text.primary,
        maxWidth: '809px',
        width: '100%',
        margin: '16px',
    },
    historyTitle: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '28px 32px 16px 32px',
        fontSize: '26px',
        fontWeight: 400,
        fontFamily: 'Audiowide, sans-serif',
        color: theme.palette.primary.main,
        textTransform: 'uppercase',
    },
    historyContent: {
        padding: '0 32px 32px 32px !important',
        '&::-webkit-scrollbar': {
            width: '6px',
        },
        '&::-webkit-scrollbar-track': {
            background: 'transparent',
        },
        '&::-webkit-scrollbar-thumb': {
            background: theme.custom.hairlineStrong,
            borderRadius: `${theme.custom.radius.pill}px`,
        },
    },
    historyItemBlock: {
        marginBottom: '20px',
        '&:last-child': {
            marginBottom: 0,
        },
    },
    historyVersionDate: {
        fontSize: '18px',
        fontWeight: 700,
        color: theme.palette.text.primary,
        marginBottom: '6px',
    },
    historyChangeList: {
        margin: 0,
        paddingLeft: '18px',
        color: theme.custom.textMuted,
        fontSize: '16px',
        fontWeight: 400,
        lineHeight: 1.6,
        '& li': {
            marginBottom: '6px',
            '&::marker': {
                color: theme.palette.primary.main,
            },
        },
    },
}));
