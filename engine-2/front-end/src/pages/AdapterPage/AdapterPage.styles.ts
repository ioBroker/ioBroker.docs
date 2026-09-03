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
        // breathing room below the fixed header
        paddingTop: '40px',
        '@media (max-width: 1279px)': {
            paddingTop: '32px',
        },
        '@media (max-width: 481px)': {
            paddingTop: '24px',
        },
        '@media (max-width: 480px)': {
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
        margin: '0px 8px 0px 32px',
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

        '@media (max-width: 1279px)': {
            margin: '0px 2px 0px 24px',
            paddingRight: '10px',
        },

        '@media (min-width: 769px) and (max-width: 1279px)': {
            gridTemplateColumns: '1fr',
            gridTemplateAreas: `
                "intro"
                "sidebar"
                "content"
            `,
            gap: '24px 0',
        },

        '@media (max-width: 768px)': {
            gridTemplateColumns: '1fr',
            gridTemplateAreas: `
                "intro"
                "sidebar"
                "content"
            `,
            gap: '24px 0',
            paddingRight: '0px',
        },
        '@media (max-width: 480px)': {
            margin: '0px',
            padding: '0px 0px 0px 10px',
        },
    },

    leftColumn: {
        gridArea: 'left',
        minWidth: 0,
        display: 'flex',
        flexDirection: 'column',
        gap: '0',
        '@media (max-width: 1279px)': {
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

        '@media (min-width: 769px) and (max-width: 1279px)': {
            flexDirection: 'row',
            maxHeight: '408px',
            alignItems: 'stretch',
            gap: '24px',
            marginBottom: '16px',
        },
        '@media (min-width: 480px) and (max-width: 769px)': {
            maxWidth: '460px',
        },
    },
    sidebarLeft: {
        width: '100%',
        '@media (min-width: 769px) and (max-width: 1279px)': {
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
        '@media (min-width: 769px) and (max-width: 1279px)': {
            flex: 1,
            maxWidth: '342px',
            gap: '16px',
            height: '100%',
        },
        '@media (max-width: 769px)': {
            maxWidth: 'none',
        },
    },

    breadcrumbs: {
        fontFamily: 'Audiowide, sans-serif',
        fontSize: '18px',
        color: theme.custom.textSubtle,
        marginBottom: '20px',
        marginLeft: '32px',
        display: 'flex',
        alignItems: 'center',
        flexWrap: 'wrap',
        columnGap: '8px',
        rowGap: '4px',
        textTransform: 'uppercase',
        '@media (max-width: 1279px)': {
            fontSize: '16px',
            marginLeft: '24px',
            marginBottom: '18px',
        },
        '@media (max-width: 480px)': {
            fontSize: '14px',
            marginLeft: '16px',
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
        '@media (max-width: 1279px)': {
            fontSize: '26px',
        },
        '@media (max-width: 530px)': {
            fontSize: '24px',
        },
        '@media (max-width: 480px)': {
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
        fontSize: '17px',
        lineHeight: 1.6,
        marginBottom: '16px',
        color: theme.custom.textMuted,
        '& img': {
            marginLeft: '10px',
        },
        '@media (max-width: 480px)': {
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
        '@media (max-width: 769px)': {
            fontSize: '16px',
        },
        '@media (max-width: 480px)': {
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
        '@media (max-width: 1279px)': {
            fontSize: '18px',
        },
        '@media (max-width: 480px)': {
            fontSize: '17px',
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
        '@media (max-width: 1345px)': {
            fontSize: '14px',
        },
        '@media (max-width: 920px)': {
            fontSize: '14px',
            display: 'block',
            overflow: 'auto',
            whiteSpace: 'nowrap',
        },
        '@media (max-width: 481px)': {
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
        '@media (max-width: 1345px)': {
            padding: '10px 12px',
        },
        '@media (max-width: 768px)': {
            padding: '8px 12px',
            minWidth: '120px',
        },
        '@media (max-width: 481px)': {
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
        '@media (max-width: 1345px)': {
            padding: '10px 12px',
        },
        '@media (max-width: 768px)': {
            padding: '8px 12px',
            minWidth: '120px',
        },
        '@media (max-width: 481px)': {
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
        '@media (max-width: 1279px)': {
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
        '@media (max-width: 769px)': {
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
        '@media (max-width: 769px)': {
            fontSize: '10px',
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
        '@media (max-width: 1279px)': {
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
        '@media (max-width: 1279px)': {
            marginTop: '0px',
            height: '100%',
        },
        '@media (max-width: 769px)': {
            borderRadius: '16px',
            padding: '20px 24px',
            minHeight: 'unset',
        },
        '@media (max-width: 480px)': {
            padding: '20px 10px 20px 10px',
            minHeight: 'unset',
        },
    },
    logoContainer: {
        display: 'flex',
        justifyContent: 'center',
        marginBottom: '24px',
        '@media (max-width: 769px)': {
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
        '@media (max-width: 1279px)': {
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
        color: theme.palette.primary.main,
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
    statsContainer: {
        display: 'flex',
        justifyContent: 'space-between',
        marginTop: '24px',
        paddingTop: '20px',
        borderTop: `1px solid ${theme.custom.hairline}`,
        '@media (max-width: 1279px)': {
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
        fontSize: '14px',
        letterSpacing: '0.02em',
        color: theme.palette.primary.main,
        transition: 'background 0.2s ease, box-shadow 0.2s ease',
        textDecoration: 'none',
        '&:hover': {
            backgroundColor: theme.custom.surfaces.raised,
            boxShadow: `inset 0 0 0 1px ${theme.custom.hairlineStrong}`,
        },
        '@media (max-width: 1279px)': {
            height: '40px',
        },
    },
    sidebarLinkIcon: {
        width: '16px',
        height: '16px',
        '@media (max-width: 1279px)': {
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
        '@media (max-width: 1279px)': {
            padding: '19px 24px',
            flex: 1,
        },
        '@media (max-width: 769px)': {
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
        '@media (max-width: 768px)': {
            width: '18px',
            height: '18px',
        },
        '@media (max-width: 1279px)': {
            width: '12px',
            height: '12px',
        },
    },
    arrowIconRight: {
        transform: 'rotate(-45deg)',
        width: '24px',
        height: '24px',
        flexShrink: 0,
        '@media (max-width: 768px)': {
            width: '18px',
            height: '18px',
        },
        '@media (max-width: 1279px)': {
            width: '12px',
            height: '12px',
        },
    },
    arrowIconEdit: {
        transform: 'rotate(-45deg)',
        width: '24px',
        height: '24px',
        flexShrink: 0,
    },

    editButton: {
        display: 'inline-flex',
        alignItems: 'center',
        gap: '16px',
        padding: '0 16px',
        height: `${theme.custom.control.height}px`,
        borderRadius: `${theme.custom.radius.control}px`,
        border: 'none',
        boxShadow: `inset 0 0 0 1px ${theme.custom.hairline}`,
        backgroundColor: theme.custom.surfaces.surface,
        color: theme.palette.primary.main,
        fontFamily: 'Audiowide, sans-serif',
        fontSize: '14px',
        fontWeight: 400,
        letterSpacing: '0.02em',
        textTransform: 'uppercase',
        cursor: 'pointer',
        marginTop: '24px',
        transition: 'background 0.2s ease, box-shadow 0.2s ease',
        '&:hover': {
            backgroundColor: theme.custom.surfaces.raised,
            boxShadow: `inset 0 0 0 1px ${theme.custom.hairlineStrong}`,
        },
    },

    // СТИЛИ ДЛЯ МОДАЛЬНОГО ОКНА ЛИЦЕНЗИИ
    licenseDialogContainer: {
        justifyContent: 'flex-end',
        paddingRight: '12px',
        paddingTop: '64px',

        '@media (max-width: 768px)': {
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
        fontSize: '17px',
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
