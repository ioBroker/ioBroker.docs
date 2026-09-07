import { makeStyles } from '../../../../theme';

export const useStyles = makeStyles()(theme => ({
    platformSection: {
        position: 'relative',
        height: '100%',
        background: `url(/image-code.png) no-repeat center center`,
        backgroundPosition: 'top',
        backgroundColor: theme.palette.background.default,
        backgroundSize: 'contain',
        /**
         * The code picture belongs to the dark theme: on the white ground it turns into
         * a grey pattern that competes with the text instead of lying behind it. On the
         * light theme the section keeps its plain ground - and the light above it goes
         * with the picture, since a glow without something to light is just a stain.
         */
        ...(theme.palette.mode === 'light' ? { backgroundImage: 'none' } : {}),
        overflow: 'hidden',
        padding: '96px 0',
        // a quiet light over the code background, so it stays readable behind the claim -
        // its centre sits on the left edge of the screen, so half of it lies outside and
        // it reads as light falling in from beyond the page, the same as in the history
        // section further down
        '&::before': {
            content: '""',
            position: 'absolute',
            top: '48%',
            left: 0,
            transform: 'translate(-50%, -50%)',
            width: 'min(1100px, 90%)',
            height: '80%',
            background: theme.custom.glow.soft,
            filter: 'blur(70px)',
            display: theme.palette.mode === 'light' ? 'none' : 'block',
            pointerEvents: 'none',
            zIndex: 0,
        },
        [theme.breakpoints.down('md')]: {
            padding: '64px 0',
        },
        [theme.breakpoints.down('sm')]: {
            padding: '48px 0',
        },
        [theme.breakpoints.down('sm')]: {
            padding: '48px 0',
            height: 'auto',
        },
    },
    container: {
        maxWidth: 1376,
        margin: '0 auto',
        padding: `0 ${theme.custom.layout.gutter.lg}px`,
        position: 'relative',
        zIndex: 1,
        [theme.breakpoints.down('sm')]: {
            padding: `0 ${theme.custom.layout.gutter.sm}px`,
        },
    },
    platformTitleWrapper: {
        [theme.breakpoints.down('sm')]: {
            textAlign: 'left',
            marginBottom: theme.spacing(4),
            width: '100%',
        },
    },
    platformTitle: {
        fontFamily: 'Audiowide, sans-serif',
        fontSize: '56px',
        lineHeight: '110%',
        fontWeight: '400',
        letterSpacing: '-0.03em',
        color: theme.palette.text.primary,
        [theme.breakpoints.down('md')]: {
            fontSize: '36px',
            textTransform: 'uppercase',
        },
        [theme.breakpoints.down('sm')]: {
            fontSize: '24px',
        },
    },
    platformTitleBlue: {
        fontFamily: 'Audiowide, sans-serif',
        fontSize: 56,
        lineHeight: '110%',
        fontWeight: '400',
        letterSpacing: '-0.03em',
        color: theme.palette.text.secondary,
        marginBottom: '40px',
        [theme.breakpoints.down('md')]: {
            fontSize: '36px',
            textTransform: 'uppercase',
            lineHeight: '1.3',
            marginBottom: theme.spacing(6),
        },
        [theme.breakpoints.down('sm')]: {
            marginBottom: theme.spacing(4),
            fontSize: '24px',
        },
    },
    descriptionWrapper: {
        display: 'flex',
        // The text stands in the right half because the picture holds the left one. On
        // the light theme there is no picture, so it moves back to the left edge instead
        // of leaving an empty half beside it.
        justifyContent: theme.palette.mode === 'light' ? 'flex-start' : 'flex-end',
        [theme.breakpoints.down('sm')]: {
            justifyContent: 'center',
        },
    },
    descriptionContainer: {
        maxWidth: '867px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        [theme.breakpoints.down('md')]: {
            maxWidth: '75%',
        },
        [theme.breakpoints.down('sm')]: {
            maxWidth: '100%',
            alignItems: 'center',
        },
    },
    platformHeadSubtitle: {
        marginBottom: theme.spacing(3),
        textIndent: '2em',
        fontSize: theme.custom.reading.body.fontSize,
        lineHeight: theme.custom.reading.body.lineHeight,
        [theme.breakpoints.down('sm')]: {
            marginBottom: theme.spacing(2),
        },
    },
    platformSubtitle: {
        marginBottom: theme.spacing(3),
        fontSize: theme.custom.reading.body.fontSize,
        lineHeight: theme.custom.reading.body.lineHeight,
        [theme.breakpoints.down('sm')]: {
            marginBottom: theme.spacing(2),
        },
    },
}));
