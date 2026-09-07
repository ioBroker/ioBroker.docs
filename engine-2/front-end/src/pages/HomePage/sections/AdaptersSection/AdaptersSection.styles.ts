import { makeStyles } from '../../../../theme';

export const useStyles = makeStyles()(theme => ({
    container: {
        position: 'relative',
        zIndex: 1,
        maxWidth: 1376,
        margin: '0 auto',
        paddingLeft: '64px',
        [theme.breakpoints.down('md')]: {
            padding: `0 ${theme.custom.layout.gutter.lg}px`,
        },
        [theme.breakpoints.down('sm')]: {
            padding: `0 ${theme.custom.layout.gutter.sm}px`,
        },
    },
    adaptersSection: {
        position: 'relative',
        height: '100%',
        padding: '96px 0',
        [theme.breakpoints.down('md')]: {
            padding: '64px 0',
        },
        [theme.breakpoints.down('sm')]: {
            padding: '48px 0',
        },
    },
    adaptersContent: {
        display: 'flex',
        gap: theme.spacing(20),
        alignItems: 'stretch',
        [theme.breakpoints.down(980)]: {
            gap: theme.spacing(10),
        },
        [theme.breakpoints.down('md')]: {
            flexDirection: 'column',
            alignItems: 'flex-start',
            gap: theme.spacing(8),
        },
    },
    adaptersTextSection: {
        flex: '1 1 45%',
        display: 'flex',
        textAlign: 'left',
        height: 450,
        fontSize: '18px',
        // maxWidth: 533,
        flexDirection: 'column',
        justifyContent: 'space-between',

        [theme.breakpoints.down('md')]: {
            height: 'auto',
            order: 1,
            justifyContent: 'flex-start',
        },
        [theme.breakpoints.down('sm')]: {
            width: '100%',
        },
    },
    adaptersText: {
        fontSize: theme.custom.reading.body.fontSize,
        lineHeight: theme.custom.reading.body.lineHeight,
        textIndent: '2em',
        flexGrow: 1,
        // the distance to the title above comes from the title alone
        marginTop: 0,
    },

    buttonWrapperDesktop: {
        position: 'relative',
        display: 'inline-block',
        [theme.breakpoints.down('md')]: {
            display: 'none',
        },
    },
    buttonWrapperMobile: {
        // the hard-edged glow that used to sit behind this button is gone - it was the
        // one light in the section without a blur, so it read as a painted ellipse
        // rather than as light, and only ever showed in the dark theme
        display: 'none',
        width: '100%',
        [theme.breakpoints.down('md')]: {
            display: 'flex',
            justifyContent: 'center',
            order: 3,
            minHeight: '100px',
            alignItems: 'center',
        },
    },
    adaptersGrid: {
        flex: '1 1 55%',
        position: 'relative',
        display: 'flex',
        justifyContent: 'center',
        // soft light behind the tiles, same family as the glow in the banner
        '&::before': {
            content: '""',
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            // wider than the group of tiles and blurred further, so the light lies over
            // all of them instead of pooling in the middle
            width: '128%',
            height: '118%',
            background: theme.custom.glow.strong,
            filter: 'blur(44px)',
            pointerEvents: 'none',
            zIndex: 0,
        },
        [theme.breakpoints.down('md')]: {
            order: 2,
            // When stacked, the block needs its full width; otherwise it shrinks to the
            // tiles' width and `justifyContent: center` has nothing to center, leaving
            // the group stuck to the left edge.
            width: '100%',
            flex: '0 0 auto',
        },
    },
    desktopGrid: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'center',
        gap: theme.spacing(1),
        marginRight: '40px',
        [theme.breakpoints.down('md')]: {
            gap: theme.spacing(0.75),
        },
        [theme.breakpoints.down('sm')]: {
            display: 'none',
        },
    },
    mobileGrid: {
        display: 'none',
        [theme.breakpoints.down('sm')]: {
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'flex-end',
            justifyContent: 'center',
            gap: theme.spacing(0.5),
        },
    },
    adapterColumn: {
        display: 'flex',
        flexDirection: 'column',
        gap: theme.spacing(1),
        marginBottom: '38px',
        position: 'relative',
        zIndex: 1,
        [theme.breakpoints.down('md')]: {
            gap: theme.spacing(0.75),
            marginBottom: '28px',
        },
        [theme.breakpoints.down('sm')]: {
            gap: theme.spacing(0.5),
            marginBottom: '20px',
        },
    },
    offsetColumn: {
        transform: `translateY(38px)`,
        [theme.breakpoints.down('md')]: {
            transform: 'translateY(28px)',
        },
        [theme.breakpoints.down('sm')]: {
            transform: 'translateY(20px)',
        },
    },
    adapterIcon: {
        backgroundColor: theme.palette.secondary.main,
        borderRadius: '16px',
        width: 84,
        height: 84,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
        '@media (max-width: 1080px)': {
            width: 70,
            height: 70,
            borderRadius: '12px',
        },
        '@media (max-width: 1000px)': {
            width: 64,
            height: 64,
            borderRadius: '18px',
        },
        // five columns of 64 px plus the gaps are 336 px - wider than a 320 px phone
        '@media (max-width: 380px)': {
            width: 54,
            height: 54,
            borderRadius: '14px',
        },
    },
    iconImage: {
        maxWidth: '70%',
        maxHeight: '70%',
        objectFit: 'contain',
        [theme.breakpoints.down('sm')]: {
            maxWidth: '75%',
            maxHeight: '75%',
        },
    },
}));
