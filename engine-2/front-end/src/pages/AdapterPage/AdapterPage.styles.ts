import { makeStyles } from '../../theme';

export const useStyles = makeStyles()((theme) => ({
    pageGrid: {
        display: 'grid',
        gridTemplateColumns: '1fr 350px',
        gridTemplateAreas: `
            "intro   sidebar"
            "content sidebar"
        `,
        position: 'relative',
        gap: '0 40px',
        margin: '0px 8px 0px 32px',
        paddingTop: '35px',
        paddingBottom: '40px',
        color: theme.palette.text.primary,
        fontFamily: theme.typography.fontFamily,
        maxHeight: 'calc(100vh - 120px)',
        overflowY: 'scroll',
        overflowX: 'hidden',
        paddingRight: '12px',
        '&::-webkit-scrollbar': {
            width: '8px',
        },
        '&::-webkit-scrollbar-track': {
            background: 'rgba(255, 255, 255, 0.05)',
            borderRadius: '8px',
            marginTop: '80px',
            border: `1px solid ${theme.palette.primary.main}`,
        },
        '&::-webkit-scrollbar-thumb': {
            background: theme.palette.secondary.main,
            borderRadius: '8px',
        },
        '&::-webkit-scrollbar-thumb:hover': {
            background: theme.palette.secondary.main,
        },
        '&::after': {
            content: '""',
            position: 'absolute',
            top: '13%',
            left: '60%',
            transform: 'translate(-50%, -50%)',
            width: '1000px',
            height: '300px',
            opacity: 0.5,
            background:
                theme.palette.mode === 'dark'
                    ? 'radial-gradient(ellipse, rgba(35, 86, 174, 0.3) 0%, rgba(255, 255, 255, 0) 55%)'
                    : 'none',
            '@media (min-width: 769px) and (max-width: 1279px)': {
                display: 'none'
            },
            '@media (max-width: 1440px)': {
                top: '14%',
            },
            '@media (max-width: 769px)': {
                top: '4%',
                background:
                    theme.palette.mode === 'dark'
                        ? 'radial-gradient(circle, rgba(35, 86, 174, 0.5) 0%, rgba(255, 255, 255, 0) 55%)'
                        : 'none',
                width: '400px',
                height: '400px',
                left: 'auto',
                right: '20%',
                transform: 'translate(50%, -50%)',
            },
            '@media (max-width: 481px)': {
                 top: '2%',
              
            },
        },
         '&::before': {
            content: '""',
            position: 'absolute',
            top: '90%',
            right: '-20%',
            transform: 'translateX(-50%)',
            width: '600px',
            height: '1200px',
            opacity: 0.5,
            background:
                theme.palette.mode === 'dark'
                    ? 'radial-gradient(ellipse, rgba(35, 86, 174, 0.4) 0%, rgba(255, 255, 255, 0) 55%)'
                    : 'none',
            pointerEvents: 'none',
            zIndex: 0,
             '@media (min-width: 769px) and (max-width: 1440px)': {
                right: '-30%',
            },
             '@media (min-width: 769px) and (max-width: 1279px)': {
                display: 'none'
            },
             '@media (max-width: 769px)': {
                 top: '35%',
            },
             '@media (max-width: 481px)': {
                  left: '80%',
                  top: '25%',
            },
        },

        '@media (min-width: 769px) and (max-width: 1279px)': {
            margin: '0px 8px 120px 32px',
            maxHeight: 'none',
            overflowY: 'hidden',
            gridTemplateColumns: '1fr',
            gridTemplateAreas: `
                "intro"
                "sidebar"
                "content"
            `,
            gap: '24px 0',
        },

        '@media (max-width: 768px)': {
            maxHeight: 'none',
            overflowY: 'hidden',
            gridTemplateColumns: '1fr',
            gridTemplateAreas: `
                "intro"
                "sidebar"
                "content"
            `,
            gap: '24px 0',
            margin: '0px 24px 120px 24px',
            paddingRight: '0px',
        },
        '@media (max-width: 480px)': {
            margin: '0px 10px 120px 10px',
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
            maxWidth: '460px'
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
        },
        '@media (max-width: 769px)': {
            maxWidth: 'none',
        },
    },

    breadcrumbs: {
        fontFamily: 'Audiowide, sans-serif',
        fontSize: '20px',
        color: theme.palette.text.primary,
        marginBottom: '24px',
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        textTransform: 'uppercase',
        '@media (max-width: 1279px)': {
            fontSize: '18px',
        },
        '@media (max-width: 480px)': {
            fontSize: '16px',
        },
    },
    breadcrumbsEnd: {
        fontFamily: 'Audiowide, sans-serif',
        fontSize: '36px',
        color: theme.palette.primary.main,
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        textTransform: 'uppercase',
        '@media (max-width: 1279px)': {
            fontSize: '28px',
        },
        '@media (max-width: 530px)': {
            fontSize: '24px',
        },
        '@media (max-width: 480px)': {
            fontSize: '20px',
        },
    },
    breadcrumbSlash: {
        color: theme.palette.secondary.main,
        ...(theme.palette.mode === 'dark' && { color: 'white !important' })
    },
    breadcrumbSlashEnd: {
        color: theme.palette.secondary.main,
    },
    paragraph: {
        fontWeight: 300,
        fontSize: '18px',
        lineHeight: 1.4,
        marginBottom: '16px',
        letterSpacing: '0.01em',
        color: theme.palette.text.primary,
        '@media (max-width: 480px)': {
            fontSize: '16px',
        },
    },
    sectionTitle: {
        fontFamily: 'Audiowide, sans-serif',
        fontSize: '18px',
        color: theme.palette.primary.main,
        textTransform: 'uppercase',
        marginTop: '32px',
        marginBottom: '16px',
        borderBottom: `1px solid ${theme.palette.primary.main}`,
        paddingBottom: '8px',
        '@media (max-width: 769px)': {
            fontSize: '16px',
        },
        '@media (max-width: 480px)': {
            fontSize: '18px',
        },
    },
    subTitle: {
        fontSize: '20px',
        fontWeight: 400,
        color: theme.palette.text.primary,
        marginBottom: '8px',
        marginTop: '24px',
        '@media (max-width: 1279px)': {
            fontSize: '18px',
            fontWeight: 300,
        },
        '@media (max-width: 480px)': {
            fontSize: '16px',
            fontWeight: 300,
        },
    },
    list: {
        margin: '0 0 16px 20px',
        padding: 0,
        fontWeight: 200,
        fontSize: '16px',
        color: theme.palette.mode === 'dark' ? '#D0D0D0' : theme.palette.text.primary,
        '& li': {
            marginBottom: '8px',
        }
    },

    codeBlockContainer: {
        backgroundColor: theme.palette.secondary.main,
        width: '820px',
        maxWidth: '100%',
        height: '274px',
        borderRadius: '8px',
        border: `1px solid ${theme.palette.secondary.main}`,
        marginBottom: '24px',
        paddingBottom: '16px',
        '@media (max-width: 769px)': {
            width: '630px',
            height: '202px',
        },
    },
    codeBlockHeader: {
        backgroundColor: '#FFFFFF',
        color: '#000',
        lineHeight: 1,
        borderRadius: '8px 8px 0 0',
        padding: '11px 16px 7px 16px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'end',
        fontWeight: 500,
        fontSize: '20px',
        flexShrink: 0,
        '@media (max-width: 769px)': {
            fontSize: '18px',
        },
    },
    codeBlockContent: {
        padding: '10px 16px 10px 16px',
        margin: 0,
        fontFamily: 'monospace',
        fontSize: '16px',
        color: '#FFF',
        flexGrow: 1,
        overflowX: 'scroll',
        overflowY: 'hidden',
        whiteSpace: 'pre',
        '& .key': { color: '#7ec3f3' },
        '& .value': { color: '#FFF' },
        '& .comment': { color: '#FFF' },
        '&::-webkit-scrollbar': {
            height: '7px',
        },
        '&::-webkit-scrollbar-track': {
            background: 'rgba(255, 255, 255, 0.05)',
            borderRadius: '4px',
            margin: '0 31px',
            border: `1px solid white`,
        },
        '&::-webkit-scrollbar-thumb': {
            background: 'white',
            borderRadius: '4px',
        },
        '&::-webkit-scrollbar-thumb:hover': {
            background: '#FFF',
        },
        '@media (max-width: 769px)': {
            fontSize: '10px'
        },

    },


    sidebarCard: {
        border: `1px solid ${theme.palette.primary.main}`,
        borderRadius: '16px',
        padding: '34px 24px',
        height: '425px',
        backgroundColor: theme.palette.background.paper,
        marginTop: '80px',
        '@media (max-width: 1279px)': {
            marginTop: '0px',
            height: '100%',
            borderRadius: '10px',
        },
        '@media (max-width: 769px)': {
            borderRadius: '16px',
            paddingTop: '20px'
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
        '@media (max-width: 1279px)': {
            '& img': {
                width: '104px',
                height: '104px',
            }
        },
    },
    infoRow: {
        display: 'flex',
        justifyContent: 'space-between',
        marginBottom: '8px',
        fontSize: '14px',
        fontWeight: 200,
    },
    infoLabel: {
        color: theme.palette.text.primary,
        fontSize: '16px',
        fontWeight: 400,
    },
    npmImage: {
        width: 242,
        height: 36
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
        fontSize: '16px',
        fontWeight: 400,
    },
    statsContainer: {
        display: 'flex',
        justifyContent: 'space-between',
        marginTop: '24px',
        paddingTop: '24px',
        '@media (max-width: 1279px)': {
            marginTop: '0px',
        },

    },
    statItem: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        fontSize: '14px',
        fontWeight: 200,
        '& svg': {
            marginBottom: '4px',
            color: theme.palette.text.primary,
        },
        '& img': {
            filter: theme.palette.mode === 'light' ? 'brightness(0) saturate(100%) invert(21%) sepia(96%) saturate(1992%) hue-rotate(190deg) brightness(95%) contrast(91%)' : 'none',
        },
    },
    sidebarLink: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '12px 16px',
        border: `1px solid ${theme.palette.primary.main}`,
        borderRadius: '8px',
        cursor: 'pointer',
        textTransform: 'uppercase',
        fontFamily: 'Audiowide, sans-serif',
        fontSize: '14px',
        color: theme.palette.primary.main,
        transition: 'all 0.2s',
        textDecoration: 'none',
        '&:hover': {
            borderColor: theme.palette.primary.main,
            backgroundColor: theme.custom.backgroundColorOpacity,
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
        border: `1px solid ${theme.palette.primary.main}`,
        borderRadius: '16px',
        padding: '24px',
        paddingRight: '84px',
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
        '@media (max-width: 1279px)': {
            padding: '19px 24px',
            borderRadius: '10px',
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
        padding: '13px 16px',
        border: `1px solid ${theme.palette.primary.main}`,
        borderRadius: '8px',
        color: theme.palette.primary.main,
        fontFamily: 'Audiowide, sans-serif',
        fontSize: '14px',
        fontWeight: 400,
        letterSpacing: '-0.03em',
        cursor: 'pointer',
        background: 'transparent',
        marginTop: '16px',
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
        }
    },

    licenseDialogPaper: {
        backgroundColor: theme.palette.background.default,
        border: `1px solid ${theme.palette.primary.main}`,
        backgroundImage: 'none',
        borderRadius: '10px',
        color: theme.palette.text.primary,
        maxWidth: '841px',
        width: '100%',
        margin: '16px',
    },
    licenseTitle: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '32px 32px 16px 32px',
        fontSize: '18px',
        fontWeight: 300,
        color: theme.palette.text.primary,
    },
    licenseCloseButton: {
        color: theme.palette.text.primary,
        padding: '4px',
        '& svg': {
            fontSize: '36px',
        }
    },
    licenseContent: {
        padding: '0 32px 32px 32px !important',
        '&::-webkit-scrollbar': {
            width: '6px',
        },
        '&::-webkit-scrollbar-track': {
            background: 'rgba(255, 255, 255, 0.05)',
            borderRadius: '4px',
        },
        '&::-webkit-scrollbar-thumb': {
            background: theme.palette.secondary.main,
            borderRadius: '4px',
        },
    },
    licenseParagraph: {
        fontSize: '18px',
        fontWeight: 300,
        lineHeight: 1.5,
        color: theme.palette.text.primary,
        marginBottom: '16px',
    },
    // СТИЛИ ДЛЯ МОДАЛЬНОГО ОКНА HISTORY
    historyDialogPaper: {
        backgroundColor: theme.palette.background.default,
        border: `1px solid ${theme.palette.primary.main}`,
        backgroundImage: 'none',
        borderRadius: '10px',
        color: theme.palette.text.primary,
        maxWidth: '809px',
        width: '100%',
        margin: '16px',
    },
    historyTitle: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '32px 32px 16px 32px',
        fontSize: '32px',
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
            background: 'rgba(255, 255, 255, 0.05)',
            borderRadius: '4px',
        },
        '&::-webkit-scrollbar-thumb': {
            background: theme.palette.secondary.main,
            borderRadius: '4px',
        },
    },
    historyItemBlock: {
        marginBottom: '20px',
        '&:last-child': {
            marginBottom: 0,
        }
    },
    historyVersionDate: {
        fontSize: '20px',
        fontWeight: 500,
        color: theme.palette.text.primary,
        marginBottom: '4px',
    },
    historyChangeList: {
        margin: 0,
        paddingLeft: '16px',
        color: theme.palette.text.primary,
        fontSize: '20px',
        fontWeight: 200,
        lineHeight: 1.4,
        '& li': {
            marginBottom: '4px',
            '&::marker': {
                color: '#FFFFFF',
            },
        },
    },
}));
