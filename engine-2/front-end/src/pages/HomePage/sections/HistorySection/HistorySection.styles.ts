import { makeStyles } from '../../../../theme';

export const useStyles = makeStyles()(theme => ({
    container: {
        maxWidth: 1376,
        margin: '0 auto',
        padding: `0 ${theme.custom.layout.gutter.lg}px`,
        display: 'flex',
        // the gap between the "11+" and the column beside it - it moves the whole right
        // column, so "Jahre" and the slogan below it keep their common left edge
        gap: '24px',
        position: 'relative',
        zIndex: 2,
        // the "11+" and the "Jahre" beside it stand on one line: `baseline` lines up the
        // feet of the two words, which is what the eye reads as one line - `center` or
        // `flex-start` would line up boxes of very different height and look off
        [theme.breakpoints.up('md')]: {
            alignItems: 'baseline',
            // the same split the platform section has: the picture and the light keep the
            // left half of the screen to themselves, the content stands in the right one -
            // pulled back from the right edge by a tenth of the width, so it sits between
            // the middle and the edge rather than against it
            // on the light theme the picture beside it is hidden, so the group goes back
            // to the left edge rather than standing in an empty right half
            justifyContent: theme.palette.mode === 'light' ? 'flex-start' : 'flex-end',
            paddingRight: theme.palette.mode === 'light' ? 0 : '10%',
        },
        [theme.breakpoints.down('sm')]: {
            padding: `0 ${theme.custom.layout.gutter.sm}px`,
        },
        [theme.breakpoints.down('md')]: {
            flexDirection: 'column',
            alignItems: 'center',
            gap: '22px',
        },
        /**
         * Zwischen 600 und 900 px steht der ganze Block auf der linken Achse der Seite
         * (Denis, 06.09.2026). Vorher standen "11 + Jahre", der Zweizeiler und der Knopf
         * mittig, waehrend der Fliesstext ueber die volle Breite lief - zwei Achsen in
         * einem Block. Unter 600 px bleibt die Gruppe mittig: dort ist der Zweizeiler
         * fast so breit wie die Spalte, die Zentrierung faellt nicht auf.
         */
        [theme.breakpoints.between('sm', 'md')]: {
            alignItems: 'flex-start',
        },
        [theme.breakpoints.down('lg')]: {
            margin: '0 auto',
        },
    },
    section: {
        position: 'relative',
        overflow: 'visible',
        zIndex: 1,
        padding: '96px 0',
        [theme.breakpoints.down('md')]: {
            padding: '64px 0',
        },
        [theme.breakpoints.down('sm')]: {
            padding: '48px 0',
        },
    },
    historySection: {
        textAlign: 'center',
        position: 'relative',
        background: `url(/image-code.png) no-repeat center center`,
        backgroundPosition: 'top',
        backgroundColor: theme.palette.background.default,
        // `contain` shows the whole picture, exactly as the platform section above does -
        // `cover` cropped and enlarged it, so the same code appeared at two sizes on one
        // page
        backgroundSize: 'contain',
        /**
         * The code picture belongs to the dark theme: on the white ground it turns into
         * a grey pattern that competes with the text instead of lying behind it. On the
         * light theme the section keeps its plain ground - and the light above it goes
         * with the picture, since a glow without something to light is just a stain.
         */
        ...(theme.palette.mode === 'light' ? { backgroundImage: 'none' } : {}),

        overflow: 'visible',
        maskImage: 'linear-gradient(to bottom, transparent 0%, black 10%, black 90%, transparent 100%)',
        WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 10%, black 90%, transparent 100%)',
        // the same quiet light the code background gets in the platform section - without
        // it the picture behind this heading is so faint that it reads as an empty ground
        '&::before': {
            content: '""',
            position: 'absolute',
            top: '46%',
            // the centre of the light sits on the left edge of the screen, so half of it
            // is outside: it reads as light falling in from beyond the page rather than
            // as a lamp standing in the middle of the section
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
            maskImage: 'none',
            WebkitMaskImage: 'none',
        },
    },
    historyNumberWrapper: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'Audiowide, sans-serif',
        fontWeight: 400,
        letterSpacing: '-0.03em',
        marginBottom: 0,
        color: '#1d90cA',
        lineHeight: 1,
        [theme.breakpoints.up('md')]: {
            marginBottom: theme.spacing(2),
            alignItems: 'flex-start',
        },
    },

    plusJahreWrapper: {
        [theme.breakpoints.down('md')]: {
            display: 'flex',
            height: '205px',
            flexDirection: 'column',
            alignItems: 'start',
            justifyContent: 'space-between',
            marginLeft: theme.spacing(1.5),
        },
    },
    historyNumber: {
        lineHeight: 1,
        fontSize: 200,
        width: 'fit-content',
        letterSpacing: '-0.05em',
        display: 'inline-block',
        [theme.breakpoints.up('md')]: {
            alignSelf: 'flex-start',
        },
        [theme.breakpoints.down('md')]: {
            fontSize: '200px',
            lineHeight: 0.8,
            alignSelf: 'flex-end',
        },
    },
    historyPlus: {
        fontSize: '60px',
        lineHeight: 1,
        display: 'block',
        marginTop: '0.55em',
        [theme.breakpoints.down('sm')]: {
            alignSelf: 'flex-start',
            marginTop: '0.1em',
        },
    },
    historyWrapper: {
        // no head start any more - the baseline of the container does the aligning
        paddingTop: 0,
        textAlign: 'left',
        // below md the container is a centred column, and a centred flex item is not
        // stretched - it kept the width of its widest line and stuck out on both sides
        minWidth: 0,
        maxWidth: '100%',
        [theme.breakpoints.down('md')]: {
            textAlign: 'left',
            paddingTop: '0',
        },
    },
    historyTitle: {
        color: '#1d90cA',
        fontFamily: 'Audiowide, sans-serif',
        fontSize: '96px',
        fontWeight: '400',
        lineHeight: 1.5,
        letterSpacing: '-0.03em',
    },
    historyTitleDesktop: {
        [theme.breakpoints.down('md')]: {
            display: 'none',
        },
    },
    historyTitleMobile: {
        display: 'none',
        [theme.breakpoints.down('md')]: {
            display: 'block',
            fontSize: '80px',
            marginBottom: '6px',
            marginLeft: theme.spacing(2),
        },
        [theme.breakpoints.down('sm')]: {
            fontSize: '28px',
            marginLeft: theme.spacing(1),
            lineHeight: 1,
        },
    },
    historySubTitle: {
        fontFamily: 'Audiowide, sans-serif',
        fontSize: '34px',
        fontWeight: '400',
        letterSpacing: '-0.03em',
        width: '510px',
        whiteSpace: 'nowrap',
        marginBottom: theme.spacing(3),
        /**
         * Zwei Zeilen einer Versalzeile in Audiowide - die brauchen weniger Durchschuss
         * als ein Fliesstext, sonst zerfaellt der Zweizeiler in zwei Ueberschriften
         * (Denis, 06.09.2026). `&&` ist noetig, weil MUI an `Typography` eine eigene
         * Zeilenhoehe mitbringt (1,5) und die hier sonst gewinnt - dieselbe Falle wie
         * bei der Zahl in der CommunitySection.
         */
        '&&': {
            lineHeight: 1.15,
        },
        /**
         * Zwischen 900 und 1200 px stand hier `width: auto`. Damit wuchs die rechte
         * Spalte auf ihren Inhalt und schob die "11" an den linken Rand - der Block sah
         * dort ganz anders aus als ab 1200 px (Denis, 06.09.2026: "kannst du genau das
         * bei 900-1200 machen?"). Jetzt dieselbe Spaltenbreite wie oben, nur nach unten
         * nachgiebig: `100%` mit Deckel, damit der Flexkasten sie bei 900 px
         * zusammenschieben kann, statt aus der Seite zu laufen.
         */
        [theme.breakpoints.down('lg')]: {
            width: '100%',
            maxWidth: '510px',
        },
        /**
         * Unterhalb 900 px stehen "11 +" und dieser Zweizeiler untereinander und bilden
         * zusammen den Kopf des Abschnitts - darum stehen beide mittig (Denis,
         * 06.09.2026). Der Fliesstext darunter bleibt linksbuendig, er ist Lesetext.
         */
        [theme.breakpoints.down('md')]: {
            width: 'auto',
            maxWidth: 'none',
            fontSize: 36,
            textAlign: 'center',
            marginLeft: 'auto',
            marginRight: 'auto',
        },
        // the line may not break ("BEGEISTERUNG" stays one word), so the size has to follow
        // the screen instead of standing on one value - 32 px was 336 px wide on a 320 px phone
        /**
         * Der Zweizeiler ist in sich linksbuendig - beide Zeilen beginnen an derselben
         * Kante (Denis, 06.09.2026). Unter 600 px steht der Block als Ganzes mittig:
         * `fit-content` laesst ihn nur so breit wie seine laengste Zeile werden, sonst
         * wuerden die Zeilen am linken Rand eines 352 px breiten Kastens kleben.
         */
        [theme.breakpoints.down('sm')]: {
            fontSize: 'clamp(23px, 8.2vw, 32px)',
            maxWidth: '352px',
            width: 'fit-content',
            textAlign: 'left',
        },
        [theme.breakpoints.between('sm', 'md')]: {
            textAlign: 'left',
            marginLeft: 0,
            marginRight: 0,
        },
    },
    historyText: {
        fontSize: theme.custom.reading.body.fontSize,
        textIndent: '2em',
        fontWeight: '300',
        lineHeight: theme.custom.reading.body.lineHeight,
        letterSpacing: '-0.01em',
        // 140 px above and 48 below left the paragraph floating between the slogan and
        // its button, belonging to neither. 40 to the slogan is the distance every other
        // section keeps between a heading and its text; 24 to the button ties the two
        // together, while the 96 px to the next section still cuts clearly.
        marginTop: '40px',
        marginBottom: '24px',
        width: '550px',
        // siehe historySubTitle: zwischen 900 und 1200 px dieselbe Spalte wie ab 1200
        [theme.breakpoints.down('lg')]: {
            width: '100%',
            maxWidth: '550px',
        },
        [theme.breakpoints.down('md')]: {
            width: 'auto',
            maxWidth: 'none',
            marginBottom: '24px',
            marginTop: '32px',
            textAlign: 'left',
            letterSpacing: '-0.02em',
        },
    },
}));
