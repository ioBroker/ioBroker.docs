import { makeStyles } from '../../theme';

/**
 * The footer's right hand group, in numbers rather than in three places that have to be
 * kept in step by hand: three bracket blocks of BRACE_WIDTH with BRACE_GAP between them.
 * The group is given exactly that width, so its last block ends on the same line as the
 * content above it - without it the group was as wide as the flex row left over and the
 * blocks stopped 12 px short of the edge.
 */
export const FOOTER_BRACE_WIDTH = 160;
const FOOTER_BRACE_GAP = 24;
export const FOOTER_GROUP_WIDTH = FOOTER_BRACE_WIDTH * 3 + FOOTER_BRACE_GAP * 2;
/**
 * Between 600 and 900 px, cards occur in pairs per row (Denis, 06.09.2026). The group
 * receives that exact width, so rows naturally wrap after two cards and end on one line.
 */
/**
 * Mobile card minimum width. At a 360 px screen, 320 px remains after side margins,
 * allowing 152 per card with a 16 px gap; a third column naturally joins at about 530 px.
 */
const FOOTER_PHONE_MIN_CARD = 152;
/**
 * Row height for all footer cards. It follows link touch targets and establishes the
 * rhythm for the other cards: one row, one empty row, one row (Denis, 06.09.2026).
 */
const FOOTER_ROW = 40;
/**
 * From here there is room for the logo left of the card group. Below it the space remains
 * empty; a logo squeezed between the edge and cards looks worse than none.
 */
const FOOTER_LOGO_FROM = 660;
/**
 * The footer queries **its own width**, not the window's: in the profile app it sits beside
 * a sidebar. Container-query values equal the kit's breakpoints but measure something else.
 */
const CQ_UP = (px: number): string => `@container (min-width: ${px}px)`;
const CQ_DOWN = (px: number): string => `@container (max-width: ${px - 0.05}px)`;
const CQ_BETWEEN = (from: number, to: number): string =>
    `@container (min-width: ${from}px) and (max-width: ${to - 0.05}px)`;
/** Same limits as `theme.breakpoints`, but relative to the footer width. */
const SM = 600;
const MD = 900;
/** Bracket-card height: three FOOTER_ROW lines plus inner spacing. */
const FOOTER_BOX_HEIGHT = 171;

export const useFooterStyles = makeStyles()(theme => ({
    root: {
        width: '100%',
        // Reference size for the container queries above.
        containerType: 'inline-size',
        backgroundColor: theme.palette.background.default,
        display: 'flex',
        justifyContent: 'center',
        // the footer is secondary content: everything in it reads on the running step, so
        // the two captions no longer sit one tone darker than the links beside them
        color: theme.custom.textMuted,
        zIndex: 9,
    },
    /**
     * The same measure every section of the page uses: 1376 wide including the 32 px
     * gutters, centred. The footer had its own frame - `calc(100% - 120px)`, so 60 px of
     * side space against the 32 the page keeps, and no upper bound at all, which let it
     * run wider than the content above it on a large screen.
     */
    container: {
        width: '100%',
        maxWidth: 1376,
        boxSizing: 'border-box',
        margin: '100px auto 32px',
        padding: `0 ${theme.custom.layout.gutter.lg}px`,
        gap: '100px',
        display: 'flex',
        flexDirection: 'column',
        [CQ_DOWN(SM)]: {
            margin: '60px auto 23px',
            padding: `0 ${theme.custom.layout.gutter.sm}px`,
            gap: '50px',
        },
    },
    mainContent: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        zIndex: 9,
        gap: '48px',
        // Logo upper left, card group to its right, with free space between.
        [CQ_DOWN(MD)]: {
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            gap: '24px',
        },
        [CQ_DOWN(SM)]: {
            gap: '50px',
        },
    },
    logoBox: {
        flexGrow: 1,
        // it may not be squeezed to nothing at the narrow end of the range: without this
        // the group of blocks took what it needed and left the logo 123 px
        minWidth: 240,
        textAlign: 'left',
        [CQ_DOWN(MD)]: {
            display: 'none',
        },
        /**
         * Between 660 and 900 px the logo returns on the left, small and fixed-width so it
         * takes only needed space. Below 660 px it stays hidden to avoid squeezing.
         */
        [CQ_BETWEEN(FOOTER_LOGO_FROM, MD)]: {
            display: 'block',
            flex: '0 0 auto',
            width: 180,
            minWidth: 0,
        },
    },
    logo: {
        width: '100%',
        maxWidth: 393,
    },
    sectionsWrapper: {
        gap: '60px',
        display: 'flex',
        flexDirection: 'column',
        // exactly the three blocks wide, so both rows of the group end on the same line
        [CQ_UP(MD)]: {
            width: FOOTER_GROUP_WIDTH,
            flexShrink: 0,
        },
        /**
         * Below 900 px the wrapper itself is the grid, so the fourth card and elongated
         * “Follow us” card can share a row. `auto-fit` creates two or three columns.
         */
        [CQ_DOWN(MD)]: {
            display: 'grid',
            gridTemplateColumns: `repeat(auto-fit, minmax(${FOOTER_PHONE_MIN_CARD}px, 1fr))`,
            gap: '16px',
            // Takes space beside the logo; `minWidth: 0` prevents content pushing it out.
            flex: '1 1 auto',
            minWidth: 0,
        },
    },
    sectionsRow: {
        // The three bracket blocks stand together as one group with a fixed gap. The
        // group therefore keeps its width on every screen, and the room a wider screen
        // brings goes to the logo box beside it (it is the one that grows) - which puts
        // the empty space between the logo and the group instead of between the blocks.
        gap: `${FOOTER_BRACE_GAP}px`,
        display: 'flex',
        fontSize: '16px',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        [CQ_DOWN(MD)]: {
            flexWrap: 'wrap',
            gap: '16px',
            justifyContent: 'center',
        },
        /**
         * Below 900 px, `contents` makes the row's four cards grid children in
         * `sectionsWrapper`, sharing columns with the elongated card.
         */
        [CQ_DOWN(MD)]: {
            display: 'contents',
        },
    },
    braces: {
        flexWrap: 'nowrap',
        justifyContent: 'space-between',
        display: 'flex',
    },
    /**
     * Die Groesse der vier Kaesten. Sie stand bis 06.09.2026 als `style` an der
     * Komponente (160x171, unter 500 px 157x166) - und weil ein `style` jede Klasse
     * schlaegt, konnte kein Raster sie schmaler machen. Auf dem Handy war das der Grund
     * fuer die vier untereinander: zwei Kaesten zu 157 plus 16 Abstand sind 330 und
     * passen nicht in die 320 px, die 360 px Schirm uebrig lassen. Jetzt steht die
     * Groesse in der Klasse und unter 600 px bestimmt das Raster die Breite.
     */
    sectionBrace: {
        width: FOOTER_BRACE_WIDTH,
        height: FOOTER_BOX_HEIGHT,
        [CQ_DOWN(MD)]: {
            width: 'auto',
            minWidth: 0,
            height: 166,
        },
    },
    /**
     * Armlaenge aus dem Kit (`theme.custom.brace`) - dieselbe Zeichnung wie an den
     * Statistik-Kacheln und am Newsletter-Feld. Vorher liefen die Arme hier verkehrt
     * herum: 10 px auf dem Desktop, aber 25 px auf dem Handy, wo der Kasten am
     * schmalsten ist.
     */
    bracesLeft: {
        borderTop: `1px solid ${theme.palette.primary.main}`,
        borderBottom: `1px solid ${theme.palette.primary.main}`,
        borderLeft: `1px solid ${theme.palette.primary.main}`,
        // ohne das quetscht die Flexbox den Arm zusammen - im Footer war einer
        // davon auf 0 px geschrumpft und die Klammer fehlte auf einer Seite
        flexShrink: 0,
        borderRadius: '2px 0 0 2px',
        width: theme.custom.brace.lg,
        [CQ_DOWN(MD)]: {
            width: theme.custom.brace.md,
        },
        [CQ_DOWN(SM)]: {
            width: theme.custom.brace.sm,
        },
    },
    bracesRight: {
        borderTop: `1px solid ${theme.palette.primary.main}`,
        borderBottom: `1px solid ${theme.palette.primary.main}`,
        borderRight: `1px solid ${theme.palette.primary.main}`,
        // ohne das quetscht die Flexbox den Arm zusammen - im Footer war einer
        // davon auf 0 px geschrumpft und die Klammer fehlte auf einer Seite
        flexShrink: 0,
        borderRadius: '0 2px 2px 0',
        width: theme.custom.brace.lg,
        [CQ_DOWN(MD)]: {
            width: theme.custom.brace.md,
        },
        [CQ_DOWN(SM)]: {
            width: theme.custom.brace.sm,
        },
    },
    bracesContent: {
        padding: theme.spacing(1),
    },
    supportColumn: {
        display: 'flex',
        flexDirection: 'column',
        /**
         * Derselbe Rhythmus wie im Link-Kasten daneben: Beschriftung in der ersten
         * Zeile, eine Zeile Luft, Zeichen in der dritten. Drei Zeilen zu FOOTER_ROW,
         * mittig im Kasten - genau das, was die drei Links nebenan ergeben.
         */
        justifyContent: 'center',
        height: '100%',
        gap: FOOTER_ROW,
    },
    /**
     * Eine Beschriftung fuer jede Breite. Es gab zwei Fassungen, die bei 736 px
     * wechselten - dieselbe Zeichenkette, nur in 16 statt 12 px. Auf dem Desktop brach
     * die grosse Fassung im 160 px schmalen Kasten auf zwei Zeilen und schob die Zeichen
     * aus dem Rhythmus (Denis, 06.09.2026: "gestalte den Kasten wie in den Versionen
     * davor"). Die Beschriftung ist eine Bildunterschrift zu den beiden Zeichen, keine
     * Ueberschrift - 12 px ist ihre Rolle, nicht ihre Notloesung.
     */
    supportLabel: {
        display: 'flex',
        alignItems: 'center',
        // eine Zeile des Nachbarkastens - siehe FOOTER_ROW
        minHeight: FOOTER_ROW,
        fontSize: '12px',
        // zwei gleich lange Zeilen statt eines einzelnen Wortes darunter
        textWrap: 'balance',
    },
    /**
     * Die beiden Spendenzeichen sind unterschiedlich gross gezeichnet (PayPal 40, Amazon
     * 32 - beide im selben `viewBox`), und die Verweise legten ihr Bild jeweils an den
     * oberen Rand. Dadurch standen sie nicht auf einer Linie (Denis, 06.09.2026). Jetzt
     * sitzt jedes Zeichen mittig in seinem Verweis und beide Verweise mittig in der
     * Zeile, so dass die Mitten uebereinstimmen - unabhaengig von der Zeichengroesse.
     */
    donateButtons: {
        display: 'flex',
        gap: 26,
        justifyContent: 'center',
        alignItems: 'center',
        '& > a': {
            display: 'inline-flex',
            alignItems: 'center',
        },
        // dritte Zeile des Nachbarkastens - siehe FOOTER_ROW
        minHeight: FOOTER_ROW,
    },
    linksColumn: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        height: '100%',
        // kein Abstand zwischen den Zeilen - die Zeile selbst ist FOOTER_ROW hoch und
        // traegt ihre Trefferflaeche
        gap: 0,
        alignItems: 'start',
    },
    link: {
        color: theme.custom.textMuted,
        textDecoration: 'none',
        // wordBreak: 'break-word',
        // whiteSpace: 'normal',
        cursor: 'pointer',
        '&:hover': {
            color: theme.palette.primary.light,
            textDecoration: 'underline',
        },
        // siehe FOOTER_ROW: Trefferflaeche und Rhythmus in einer Zahl, auf jeder Breite
        display: 'flex',
        alignItems: 'center',
        minHeight: FOOTER_ROW,
    },
    socialButton: {
        display: 'block',
        color: theme.custom.textMuted,
        textDecoration: 'none',
        textAlign: 'center',
        fontSize: '10px',
        '&:hover': {
            textDecoration: 'none',
            color: theme.palette.primary.light,
        },
    },
    /**
     * Dieselbe Fassung wie im Spendenkasten, auf jeder Breite: Beschriftung oben,
     * Zeichen unten, dazwischen eine leere Zeile (Denis, 06.09.2026). Der Kasten wird
     * dadurch hoeher - vorher standen Beschriftung und Zeichen auf dem Desktop
     * nebeneinander in einem flachen Streifen.
     * `flex: 1` ist noetig, damit die Spalte die Kastenhoehe fuellt: ohne das bleibt sie
     * so hoch wie ihr Inhalt und der Rhythmus haette nichts zu verteilen, sobald das
     * Raster den Kasten auf die Hoehe des Nachbarn zieht.
     */
    socialRow: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'stretch',
        justifyContent: 'center',
        flex: 1,
        gap: FOOTER_ROW,
    },
    // erste Zeile, wie die Beschriftung im Spendenkasten - siehe FOOTER_ROW
    followUsText: {
        display: 'flex',
        alignItems: 'center',
        minHeight: FOOTER_ROW,
        fontSize: '12px',
        flexGrow: 0,
        flexShrink: 0,
    },
    socialIconsWrapper: {
        display: 'flex',
        flexDirection: 'row',
        gap: 16,
        alignItems: 'center',
        flexWrap: 'wrap',
        // dritte Zeile - siehe FOOTER_ROW. Nicht mitwachsen: sonst nimmt die Reihe die
        // freie Hoehe fuer sich und zentriert die Zeichen darin, statt auf ihrer Zeile
        // zu stehen
        flex: '0 0 auto',
        minHeight: FOOTER_ROW,
        marginLeft: 0,
        justifyContent: 'space-between',
        /**
         * Ab 900 px laeuft die Reihe nicht ueber den ganzen Kasten, sondern ueber die
         * Breite von zwei oberen Kaesten, rechts angeschlagen (Denis, 06.09.2026, mit
         * einem Rechteck ins Bild gezeichnet). Ueber die volle Breite verteilt standen
         * die fuenf Zeichen rund 75 px auseinander und zerfielen zu Einzelstuecken;
         * ueber 344 px sind es rund 43 px, und die Reihe bleibt eine Gruppe.
         */
        [CQ_UP(MD)]: {
            // `width` **und** `maxWidth`: `flex: 0 0 auto` macht die Reihe sonst nur so
            // breit wie ihre Zeichen, und `space-between` haette nichts zu verteilen
            width: '100%',
            maxWidth: FOOTER_BRACE_WIDTH * 2 + FOOTER_BRACE_GAP,
            marginLeft: 'auto',
        },
        // im schmalen Kasten ueber die Breite verteilt statt links gesammelt
        [CQ_DOWN(MD)]: {
            rowGap: 24,
            columnGap: 8,
            justifyContent: 'space-between',
        },
        /**
         * Erst unter 600 px werden die Zeichen kleiner (Denis, 06.09.2026) - drei
         * Viertel ihrer Grundgroesse. Der Faktor steht hier und nicht als feste Groesse
         * an den Zeichen, weil sie unterschiedlich gross gezeichnet sind (32 bis 42 px):
         * eine gemeinsame Zahl haette das Verhaeltnis zerstoert, das sie optisch gleich
         * gross wirken laesst. Jedes Zeichen rechnet seine eigene Grundgroesse mal
         * diesen Faktor.
         */
        [CQ_DOWN(SM)]: {
            // als Zeichenkette, sonst haengt Emotion an die Zahl ein 'px' und aus
            // calc(32px * 0.75) wird calc(32px * 0.75px) - ungueltig, ohne Fehlermeldung
            '--social-icon-scale': '0.75',
        },
    },
    /**
     * Cookies / Impressum / Datenschutz stehen auf dem Desktop unten in der Zeile mit dem
     * Copyright und wandern darunter in einen eigenen Klammerkasten. Die Grenze lag bei
     * 736 px; seit die Kaesten zwischen 600 und 900 px zu zweit in der Reihe stehen, ist
     * es 900 - sonst haette der Bereich mal vier Kaesten (2x2) und mal drei (2+1)
     * (Denis, 06.09.2026).
     */
    legalLinksMobile: {
        display: 'none',
        /**
         * `contents` statt `flex`: der Kasten darin wird dadurch selbst zum Kind der
         * Reihe und damit zur vierten Rasterzelle - sonst haette die Umhuellung die
         * Zelle belegt und der Kasten darin seine eigene Breite behalten.
         */
        [CQ_DOWN(MD)]: {
            display: 'contents',
        },
    },
    legalLinksDesktop: {
        [CQ_DOWN(MD)]: {
            display: 'none',
        },
    },
    copyright: {
        fontSize: 16,
        display: 'flex',
        flexDirection: 'row',
        /**
         * Ohne das streckt die Zeile ihre Kinder auf gleiche Hoehe, und jedes setzt
         * seinen Inhalt anders hinein: die Rechtstexte sind Flexkaesten und zentrieren,
         * der Copyright-Text ist ein Block und beginnt oben. Die Schriftlinien lagen
         * dadurch 10 px auseinander (Denis, 06.09.2026).
         */
        alignItems: 'center',
        gap: 16,
        lineHeight: '130%',
        letterSpacing: -0.16,
        [CQ_DOWN(MD)]: {
            fontSize: 11,
        },
    },
    copyrightText: {
        textAlign: 'left',
    },
    flexGrow: {
        flexGrow: 1,
    },
    /**
     * Der Pfeil ist 16 px hoch, seine Zelle in der Copyright-Zeile 40 (die Zeile streckt
     * ihre Kinder). Als Block sass er dadurch oben in seiner Zelle und stand 12 px ueber
     * der Schriftlinie daneben (Denis, 06.09.2026). Als Flexkasten sitzt er mittig.
     */
    scrollTop: {
        color: theme.palette.primary.main,
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
    },
    /**
     * Der langgezogene Kasten war beim Umstellen auf den Kit-Token uebersehen worden und
     * behielt seine 10 px, waehrend die drei Kaesten darueber 20 hatten (Denis,
     * 06.09.2026). Jetzt haengt auch er am Token - der inzwischen selbst auf 10 steht,
     * weil Denis den kuerzeren Arm gewaehlt hat.
     */
    socialBracesLeft: {
        borderTop: `1px solid ${theme.palette.primary.main}`,
        borderBottom: `1px solid ${theme.palette.primary.main}`,
        borderLeft: `1px solid ${theme.palette.primary.main}`,
        borderRadius: '2px 0 0 2px',
        flexShrink: 0,
        width: theme.custom.brace.lg,
    },
    socialBracesRight: {
        borderTop: `1px solid ${theme.palette.primary.main}`,
        borderBottom: `1px solid ${theme.palette.primary.main}`,
        borderRight: `1px solid ${theme.palette.primary.main}`,
        borderRadius: '0 2px 2px 0',
        flexShrink: 0,
        width: theme.custom.brace.lg,
    },
    /**
     * Unter 600 px stand der Block "Folgen Sie uns" frueher ohne Klammern da - als
     * einziger im Footer (Denis, 06.09.2026). Die Klammern gelten jetzt auf jeder
     * Breite; `minWidth: 0` haelt den Inhalt in seiner Spalte, damit die Flexbox die
     * Arme nicht wieder zusammendrueckt.
     */
    /**
     * Zwei Spalten breit. In einem zweispaltigen Raster passt daneben nichts mehr, er
     * nimmt also die ganze Zeile; in einem dreispaltigen bleibt links eine Spalte frei,
     * und der vierte Kasten rueckt neben ihn.
     */
    socialBrace: {
        /**
         * Dieselbe Hoehe wie die Kaesten darueber. Ohne sie war der Kasten genau so hoch
         * wie seine drei Zeilen, die Beschriftung klebte oben und die Zeichen unten am
         * Rand; jetzt sitzt der Dreizeiler mittig darin, mit rund 17 px Luft oben und
         * unten - wie im Bereich 600-900 px, wo das Raster den Kasten auf die Hoehe des
         * Nachbarn zieht (Denis, 06.09.2026).
         */
        [CQ_UP(MD)]: {
            minHeight: FOOTER_BOX_HEIGHT,
        },
        [CQ_DOWN(MD)]: {
            gridColumn: 'span 2',
            minWidth: 0,
        },
    },
    socialBracesContent: {
        padding: theme.spacing(1),
        minWidth: 0,
        flex: 1,
        /**
         * Steht der Kasten neben dem vierten Klammerkasten, zieht ihn das Raster auf
         * dessen Hoehe. Dann soll sein Inhalt in der Mitte sitzen und nicht oben kleben;
         * hat er die Zeile fuer sich, ist der Kasten so hoch wie sein Inhalt und die
         * Regel aendert nichts.
         */
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
    },
}));
