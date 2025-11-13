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
        height: '654px',
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
        backgroundColor: theme.palette.secondary.main,
        padding: '8px 8px 27px 22px',
        width: 790,
        height: 77,
        fontSize: 24,
        borderRadius: theme.shape.borderRadius,
        color: theme.palette.common.white,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        wordBreak: 'break-all',
    },
    commandBoxText: {
        marginTop: 8
    },
    copyButton: {
        cursor: 'pointer',
        color: theme.palette.primary.light,
        marginLeft: theme.spacing(2),
    },
    hintText: {
        fontSize: '16px',
        color: theme.palette.text.primary,
        marginTop: 32,
        display: 'flex',
        alignItems: 'center',
        letterSpacing: 0
    },
    imageTextHeader: {
        fontFamily: "Saira",
        fontWeight: 600,
        fontSize: 24,
        letterSpacing: '-0.03em'
    },
    imageText: {
        fontFamily: "Saira",
        fontWeight: 400,
        color: theme.palette.text.primary,
        fontSize: 18,
        letterSpacing: '-0.03em',
        width: 455,
        // marginBottom: 75
    },
    imageInfoBox: {
        display: 'flex',
        justifyContent: 'space-between',
        marginTop: 67
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
        backgroundColor: theme.palette.secondary.main,
        color: theme.palette.text.primary,
        fontWeight: 600,
        height: 60,
        '&:hover': {
            backgroundColor: theme.palette.primary.dark,
        },
    },
    buttonSecondary: {
        borderColor: theme.palette.primary.dark,
        color: theme.palette.text.primary,
        fontWeight: 600,
        border: `1px solid ${theme.palette.primary.dark} !important`,
        fontSize: '28px',
        width: 128,
        height: 60,
        '&:hover': {
            borderColor: theme.palette.primary.main,
            backgroundColor: `${theme.palette.primary.main}22`,
        },
    },
     buttonSecondaryLinux: {
        borderColor: theme.palette.primary.dark,
        color: theme.palette.text.primary,
        fontWeight: 600,
        border: `1px solid ${theme.palette.primary.dark} !important`,
        fontSize: '28px',
        width: 128,
        height: 80,
        '&:hover': {
            borderColor: theme.palette.primary.main,
            backgroundColor: `${theme.palette.primary.main}22`,
        },
    },
}));