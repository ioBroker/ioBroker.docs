import { makeStyles } from '../../theme';

export const useStyles = makeStyles()((theme) => ({
    pageGrid: {
        display: 'grid',
        gridTemplateColumns: '1fr 320px',
        gridTemplateAreas: `
            "intro   sidebar"
            "content sidebar"
        `,
        gap: '0 40px', 
        margin: '0 32px',
        paddingBottom: '40px',
        color: theme.palette.text.primary,
        fontFamily: theme.typography.fontFamily,

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
            margin: '0 16px',
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
        gap: '16px',

        '@media (min-width: 769px) and (max-width: 1279px)': {
            flexDirection: 'row',
            alignItems: 'flex-start',
            gap: '24px',
            marginBottom: '16px', 
        },
    },
    sidebarLeft: {
        width: '100%',
        '@media (min-width: 769px) and (max-width: 1279px)': {
            flex: 1, 
        },
    },
    sidebarRight: {
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
        width: '100%',
        '@media (min-width: 769px) and (max-width: 1279px)': {
            flex: 1, 
        },
    },

    breadcrumbs: {
        fontFamily: 'Audiowide, sans-serif',
        fontSize: '28px',
        color: theme.palette.primary.main,
        marginBottom: '24px',
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        textTransform: 'uppercase',
        '@media (max-width: 480px)': {
            fontSize: '20px',
        },
    },
    breadcrumbSlash: {
        color: theme.palette.secondary.main,
    },
    paragraph: {
        fontWeight: 200,
        fontSize: '16px',
        lineHeight: 1.6,
        marginBottom: '16px',
        color: theme.palette.mode === 'dark' ? '#D0D0D0' : theme.palette.text.primary,
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
    },
    subTitle: {
        fontFamily: 'Audiowide, sans-serif',
        fontSize: '16px',
        color: theme.palette.text.primary,
        marginBottom: '8px',
        marginTop: '24px',
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
        borderRadius: '8px',
        overflow: 'hidden',
        border: `1px solid ${theme.palette.secondary.main}`,
        marginBottom: '24px',
    },
    codeBlockHeader: {
        backgroundColor: '#FFFFFF',
        color: '#000',
        padding: '4px 16px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        fontWeight: 600,
        fontSize: '14px',
    },
    codeBlockContent: {
        padding: '16px',
        margin: 0,
        fontFamily: 'monospace',
        fontSize: '14px',
        color: '#FFF',
        overflowX: 'auto',
        '& .key': { color: '#7ec3f3' },
        '& .value': { color: '#FFF' },
        '& .comment': { color: '#FFF' },
    },

    
    sidebarCard: {
        border: `1px solid ${theme.palette.primary.main}`,
        borderRadius: '8px',
        padding: '24px',
        backgroundColor: theme.palette.background.paper,
        marginTop: '40px',
         '@media (max-width: 1279px)': {
            marginTop: '0px',
        },
    },
    logoContainer: {
        display: 'flex',
        justifyContent: 'center',
        marginBottom: '24px',
    },
    logo: {
        width: '125px',
        height: '125px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    infoRow: {
        display: 'flex',
        justifyContent: 'space-between',
        marginBottom: '8px',
        fontSize: '14px',
        fontWeight: 200,
    },
    infoLabel: {
        color: theme.palette.text.disabled,
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
    },
    statsContainer: {
        display: 'flex',
        justifyContent: 'space-between',
        marginTop: '24px',
        paddingTop: '24px',
    },
    statItem: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        fontSize: '12px',
        fontWeight: 200,
        '& svg': {
            marginBottom: '4px',
            color: theme.palette.text.primary,
        }
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
        }
    },
    badgesContainer: {
        border: `1px solid ${theme.palette.primary.main}`,
        borderRadius: '8px',
        padding: '16px',
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
        marginTop: '8px', 
    },
    badgeImage: {
        height: '20px',
        objectFit: 'contain',
        objectPosition: 'left',
    },

    editButton: {
        display: 'inline-flex',
        alignItems: 'center',
        gap: '16px',
        padding: '12px 24px',
        border: `1px solid ${theme.palette.primary.main}`,
        borderRadius: '8px',
        color: theme.palette.primary.main,
        fontFamily: 'Audiowide, sans-serif',
        fontSize: '14px',
        fontWeight: 400,
        cursor: 'pointer',
        background: 'transparent',
        marginTop: '16px',
    }
}));