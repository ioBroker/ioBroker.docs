import { makeStyles } from '../../theme';

export const useStyles = makeStyles()((theme) => ({
    pageContainer: {
        width: '1312px',
        padding: '78px 0px 32px 0px',
        margin: '0 auto'
    },
    title: {
        width: '100%',
        maxWidth: '1311px',
        textAlign:  'left' ,
    },
    subtitle: {
        marginBottom: 44,
        fontSize: '18px',
        color: theme.palette.text.primary,
        textAlign: 'left',
        maxWidth: '684px',
    },
    card: {
        display: 'flex',
        flexDirection: 'column',
        height: '537px',
        width: '644px',
        borderRadius: 24,
        padding: 40,
        backgroundColor: 'transparent !important',
        backgroundImage: 'none',
        border: `1px solid ${theme.palette.primary.main}`,
        transition: 'border-color 0.3s',
    },
    linuxCard: {
        display: 'flex',
        flexDirection: 'column',
        height: '537px',
        width: '1312px',
        padding: 40,
        backgroundColor: 'transparent',
        backgroundImage: 'none',
        border: `1px solid ${theme.palette.primary.main}`,
        borderRadius: 24,
        transition: 'border-color 0.3s',
    },
    cardHeader: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'start',
    },
    linuxSubHeader: {
        fontSize: 18,
        fontWeight: 400,
        marginBottom: 57,
        maxWidth: 763,
        marginTop: '-30px'
    },
    cardTitle: {
        fontFamily: 'Audiowide, Roboto, Arial, sans-serif',
        fontWeight: 400,
        fontSize: '32px',
        textTransform: 'uppercase',
    },
    cardIcon: {
        fontSize: '32px',
        color: theme.palette.primary.light,
    },
    commandBox: {
        backgroundColor: theme.palette.secondary.dark,
        padding: theme.spacing(1.5, 2),
        borderRadius: theme.shape.borderRadius,
        fontFamily: 'monospace',
        color: theme.palette.common.white,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        wordBreak: 'break-all',
    },
    copyButton: {
        cursor: 'pointer',
        color: theme.palette.primary.light,
        marginLeft: theme.spacing(2),
    },
    hintText: {
        fontSize: '0.9rem',
        color: theme.palette.text.disabled,
        marginTop: theme.spacing(1),
        display: 'flex',
        alignItems: 'center',
    },
    detailsText: {
        color: theme.palette.text.primary,
        marginBottom: theme.spacing(2),
        lineHeight: 1.6,
        '& strong': {
            color: theme.palette.text.primary,
            fontWeight: 600,
        },
    },
    cardActions: {
        display: 'flex',
        gap: theme.spacing(2),
        marginTop: 'auto',
        paddingTop: theme.spacing(2),
    },
    buttonPrimary: {
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.primary.contrastText,
        fontWeight: 600,
        '&:hover': {
            backgroundColor: theme.palette.primary.dark,
        },
    },
    buttonSecondary: {
        borderColor: theme.palette.primary.dark,
        color: theme.palette.primary.main,
        fontWeight: 600,
        '&:hover': {
            borderColor: theme.palette.primary.main,
            backgroundColor: `${theme.palette.primary.main}22`,
        },
    },
}));