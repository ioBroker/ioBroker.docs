import { makeStyles } from '../../theme';

export const useStyles = makeStyles()((theme) => ({
    pageContainer: {
        width: '1312px',
        padding: '78px 0px 157px 0px',
        margin: '0 auto',
        '&::before': {
            content: '""',
            position: 'absolute',
            top: '230%',
            left: '90%',
            transform: 'translate(-50%, -50%)',
            width: '900px',
            height: '900px',
            background: theme.palette.mode === 'dark'
                ? 'radial-gradient(circle, rgba(0, 88, 148, 0.8) 0%, rgba(255, 255, 255, 0) 55%)'
                : 'radial-gradient(circle, rgba(255, 255, 255, 0.8) 0%, rgba(255, 255, 255, 0) 55%)',
            pointerEvents: 'none',
            zIndex: 0,
        }
    },
    title: {
        width: '100%',
        maxWidth: '1311px',
        textAlign: 'left',
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
        justifyContent: 'space-between',
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
        width: 435,
        // marginBottom: 75
    },
    imageInfoBox: {
        display: 'flex',
        justifyContent: 'space-between',
        marginTop: 67,
        alignItems: 'start'
    },
    detailsText: {
        color: theme.palette.text.primary,
        marginBottom: theme.spacing(1),
        display: 'grid',
        gridTemplateColumns: 'auto 1fr',
        columnGap: 43,
        rowGap: 10,
        alignItems: 'baseline',
        fontSize: '18px !important',
        fontWeight: 400,
        letterSpacing: '0em',
        '& .MuiTypography-root': {
            fontSize: '18px !important',
        },
    },
    detailsLabel: {
        fontWeight: 400,
        color: theme.palette.text.primary,
    },
    cardContent: {
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
        justifyContent: 'space-between',
    },
    cardActions: {
        display: 'flex',
        gap: 36,
        marginTop: 43,
    },
    buttonPrimary: {
        borderRadius: '10px !important',
        fontFamily: 'Audiowide, Roboto, Arial, sans-serif !important',
        fontWeight: '400 !important',
        letterSpacing: '-0.03em !important',
        fontSize: '24px !important',
        width: '400px !important',
        height: '60px !important',
        padding: '0 !important',
    },
    buttonSecondary: {
        borderColor: theme.palette.primary.dark,
        color: theme.palette.text.primary,
        fontFamily: 'Audiowide, Roboto, Arial, sans-serif',
        fontWeight: 400,
        letterSpacing: '-0.03em',
        border: `1px solid ${theme.palette.secondary.main} !important`,
        borderRadius: 10,
        fontSize: '24px',
        width: 128,
        height: 60,
        '&:hover': {
            borderColor: theme.palette.primary.main,
            backgroundColor: `${theme.palette.primary.main}22`,
        },
    },
    buttonSecondaryLinux: {
        marginTop: 90,
        color: theme.palette.text.primary,
        fontFamily: 'Audiowide, Roboto, Arial, sans-serif',
        fontWeight: 400,
        letterSpacing: '-0.03em',
        border: `1px solid ${theme.palette.secondary.main} !important`,
        borderRadius: 16,
        fontSize: '28px',
        width: 128,
        height: 80,
        '&:hover': {
            borderColor: theme.palette.primary.main,
            backgroundColor: `${theme.palette.primary.main}22`,
        },
    },
}));