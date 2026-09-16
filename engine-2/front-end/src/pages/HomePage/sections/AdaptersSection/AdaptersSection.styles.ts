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
    /** dieselbe Kennzeile wie in den beiden Abschnitten darueber */
    label: {
        ...theme.custom.reading.caption,
        textTransform: 'uppercase',
        letterSpacing: '0.08em',
        color: theme.palette.primary.main,
        marginBottom: '20px',
    },
    labelSlashes: {
        color: theme.palette.primary.main,
        marginRight: '8px',
    },
    title: {
        fontFamily: theme.typography.h1.fontFamily,
        fontSize: '44px',
        fontWeight: 400,
        letterSpacing: '-0.01em',
        '&&': {
            lineHeight: 1.12,
        },
        color: theme.custom.textHeading,
        margin: 0,
        [theme.breakpoints.down('md')]: {
            fontSize: '34px',
        },
        [theme.breakpoints.down('sm')]: {
            fontSize: '26px',
        },
    },
    titleAccent: {
        color: theme.palette.primary.main,
    },
    adaptersText: {
        ...theme.custom.reading.body,
        color: theme.custom.textMuted,
        maxWidth: '520px',
        marginTop: '24px',
        // der Absatz haelt den Platz zwischen Kopfzeile und Knopf, er waechst mit
        flexGrow: 1,
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
        // Das Licht hinter den Kacheln ist raus (Denis, 11.09.2026): mit dem Kreis in
        // der Mitte hatte die Flaeche zwei helle Stellen, das war eine zu viel.
        [theme.breakpoints.down('md')]: {
            order: 2,
            // When stacked, the block needs its full width; otherwise it shrinks to the
            // tiles' width and `justifyContent: center` has nothing to center, leaving
            // the group stuck to the left edge.
            width: '100%',
            flex: '0 0 auto',
        },
    },
    /*
     * Der Kreis in der Mitte der Wolke: er sagt in einer Zahl, wovon die Kacheln nur
     * einzelne Beispiele sind. Aus dem Entwurf uebernommen (Denis, 11.09.2026), hier auf
     * unseren Grund, unsere Markenfarbe und unsere Schriften gebracht.
     */
    count: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        /*
         * Die Mitte des Kastens ist nicht die Mitte der Kacheln: die Reihe steht 40
         * Bildpunkte vom rechten Rand ab, und die versetzten Spalten haengen 38 nach
         * unten, waehrend der Kasten diese 38 unten als Rand mitzaehlt. Der Kreis wird
         * deshalb um die Haelfte dieser beiden Werte nachgefuehrt - dann sitzt er in der
         * Mitte dessen, was man sieht.
         */
        transform: 'translate(calc(-50% - 20px), calc(-50% + 19px))',
        width: '150px',
        height: '150px',
        borderRadius: '50%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '2px',
        backgroundColor: theme.custom.surfaces.canvas,
        border: `2px solid ${theme.palette.primary.main}`,
        boxShadow: '0 0 40px rgba(29, 144, 202, 0.35)',
        pointerEvents: 'none',
        zIndex: 2,
        [theme.breakpoints.down('md')]: {
            transform: 'translate(calc(-50% - 20px), calc(-50% + 14px))',
        },
        // unter 600 steht die andere Reihe, die keinen Abstand nach rechts hat
        [theme.breakpoints.down('sm')]: {
            width: '120px',
            height: '120px',
            transform: 'translate(-50%, calc(-50% + 10px))',
        },
    },
    countNumber: {
        fontFamily: theme.typography.h1.fontFamily,
        fontSize: '34px',
        lineHeight: 1.1,
        color: theme.custom.textHeading,
        [theme.breakpoints.down('sm')]: {
            fontSize: '28px',
        },
    },
    countWord: {
        ...theme.custom.reading.caption,
        textTransform: 'uppercase',
        letterSpacing: '0.08em',
        color: theme.palette.primary.main,
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
        // wieder das dunkle Markenblau: hell war es ausprobiert und zu laut (Denis, 11.09.2026)
        backgroundColor: theme.palette.secondary.main,
        // weniger Rundung, die Kacheln wirkten sonst wie Knoepfe
        borderRadius: '13px',
        width: 84,
        height: 84,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
        '@media (max-width: 1080px)': {
            width: 70,
            height: 70,
            borderRadius: '11px',
        },
        '@media (max-width: 1000px)': {
            width: 64,
            height: 64,
            borderRadius: '10px',
        },
        // five columns of 64 px plus the gaps are 336 px - wider than a 320 px phone
        '@media (max-width: 380px)': {
            width: 54,
            height: 54,
            borderRadius: '9px',
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
