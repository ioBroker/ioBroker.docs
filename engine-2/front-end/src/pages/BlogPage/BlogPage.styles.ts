import { makeStyles } from '../../theme';

const CARD_BORDER_DARK = '#356D9A';

export const useStyles = makeStyles()(theme => ({
    pageWrapper: {
        width: '100%',
        overflow: 'hidden',
        position: 'relative',
    },
    pageContainer: {
        width: '1312px',
        maxWidth: '100%',
        margin: '0 auto',
        padding: '78px 24px 120px 24px',
        boxSizing: 'border-box',
        position: 'relative',
        [theme.breakpoints.down('sm')]: {
            padding: '48px 16px 80px 16px',
        },
        // spotlight behind the headline (top right)
        '&::before': {
            content: '""',
            position: 'absolute',
            top: '-40px',
            left: '58%',
            transform: 'translateX(-50%)',
            width: '1100px',
            height: '440px',
            maxWidth: '150%',
            background:
                theme.palette.mode === 'dark'
                    ? 'radial-gradient(ellipse, rgba(35, 86, 174, 0.45) 0%, rgba(255, 255, 255, 0) 60%)'
                    : 'none',
            pointerEvents: 'none',
            zIndex: -1,
        },
        // spotlight on the left side of the list
        '&::after': {
            content: '""',
            position: 'absolute',
            top: '28%',
            left: '-180px',
            width: '760px',
            height: '560px',
            background:
                theme.palette.mode === 'dark'
                    ? 'radial-gradient(ellipse, rgba(35, 86, 174, 0.35) 0%, rgba(255, 255, 255, 0) 60%)'
                    : 'none',
            pointerEvents: 'none',
            zIndex: -1,
        },
    },
    title: {
        width: '100%',
        textAlign: 'left',
        textTransform: 'uppercase',
    },
    grid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
        gap: '30px',
        alignItems: 'stretch',
        [theme.breakpoints.down(900)]: {
            gridTemplateColumns: 'minmax(0, 1fr)',
            gap: '20px',
        },
    },
    card: {
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        borderRadius: '12px',
        border: `1px solid ${theme.palette.mode === 'dark' ? CARD_BORDER_DARK : theme.palette.secondary.main}`,
        backgroundColor: 'transparent',
        backgroundImage: 'none',
        overflow: 'hidden',
        boxShadow: 'none',
        transition: 'border-color 0.2s ease, transform 0.2s ease',
        '&:hover': {
            borderColor: theme.palette.primary.main,
        },
    },
    cardImage: {
        display: 'block',
        width: '100%',
        height: 'auto',
        aspectRatio: '1280 / 250',
        objectFit: 'cover',
        objectPosition: 'center',
        cursor: 'pointer',
        border: 'none',
    },
    cardImagePlaceholder: {
        width: '100%',
        aspectRatio: '1280 / 250',
        background:
            theme.palette.mode === 'dark'
                ? 'linear-gradient(90deg, rgba(0, 88, 148, 0.9) 0%, rgba(29, 144, 202, 0.5) 100%)'
                : 'linear-gradient(90deg, rgba(0, 88, 148, 0.2) 0%, rgba(29, 144, 202, 0.1) 100%)',
    },
    cardBody: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        padding: '28px 20px 20px 20px',
        [theme.breakpoints.down('sm')]: {
            padding: '20px 16px 16px 16px',
        },
    },
    cardTitle: {
        fontFamily: "'Roboto', sans-serif",
        fontSize: '16px',
        fontWeight: 700,
        lineHeight: 1.35,
        letterSpacing: '0.01em',
        color: theme.palette.text.primary,
        cursor: 'pointer',
        marginBottom: '12px',
        display: '-webkit-box',
        WebkitLineClamp: 2,
        WebkitBoxOrient: 'vertical',
        overflow: 'hidden',
        '&:hover': {
            color: theme.palette.primary.main,
        },
        [theme.breakpoints.down('sm')]: {
            fontSize: '15px',
        },
    },
    cardDesc: {
        fontFamily: "'Roboto', sans-serif",
        fontSize: '16px',
        fontWeight: 400,
        lineHeight: 1.35,
        letterSpacing: '0.01em',
        color: theme.palette.text.primary,
        whiteSpace: 'pre-line',
        display: '-webkit-box',
        WebkitLineClamp: 6,
        WebkitBoxOrient: 'vertical',
        overflow: 'hidden',
        [theme.breakpoints.down('sm')]: {
            fontSize: '15px',
        },
    },
    cardFooter: {
        marginTop: 'auto',
        paddingTop: '28px',
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'space-between',
        gap: '12px',
    },
    readButton: {
        width: '286px',
        maxWidth: '100%',
        height: '38px',
        flexShrink: 1,
        border: 'none',
        borderRadius: '8px',
        cursor: 'pointer',
        fontFamily: 'Audiowide, sans-serif',
        fontSize: '16px',
        fontWeight: 400,
        letterSpacing: '0.02em',
        textTransform: 'uppercase',
        color: '#FFFFFF',
        backgroundColor: theme.palette.mode === 'dark' ? '#245790' : theme.palette.secondary.main,
        transition: 'background-color 0.2s ease',
        '&:hover': {
            backgroundColor: theme.palette.primary.main,
        },
        [theme.breakpoints.down('sm')]: {
            width: '100%',
            fontSize: '14px',
        },
    },
    cardDate: {
        flexShrink: 0,
        fontFamily: "'Roboto', sans-serif",
        fontSize: '13px',
        fontWeight: 400,
        lineHeight: 1,
        paddingBottom: '4px',
        whiteSpace: 'nowrap',
        color: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.75)' : 'rgba(0, 0, 0, 0.6)',
        [theme.breakpoints.down('sm')]: {
            fontSize: '11px',
        },
    },
    message: {
        fontFamily: "'Roboto', sans-serif",
        fontSize: '18px',
        fontWeight: 400,
        color: theme.palette.text.primary,
    },
}));
