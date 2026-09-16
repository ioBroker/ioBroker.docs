import { makeStyles } from '../../../../theme';

export const useStyles = makeStyles()(theme => ({
    demoSection: {
        position: 'relative',
        backgroundColor: theme.custom.surfaces.canvas,
        overflow: 'hidden',
        paddingTop: theme.custom.layout.section.lg,
        paddingBottom: theme.custom.layout.section.lg,
        // a calm light behind the rule on the right, the same handwriting as in the banner
        '&::before': {
            content: '""',
            position: 'absolute',
            top: '55%',
            right: 0,
            transform: 'translate(35%, -50%)',
            width: 'min(900px, 80%)',
            height: '70%',
            background: theme.custom.glow.soft,
            filter: 'blur(70px)',
            display: theme.palette.mode === 'light' ? 'none' : 'block',
            pointerEvents: 'none',
            zIndex: 0,
        },
        [theme.breakpoints.down('md')]: {
            paddingTop: theme.custom.layout.section.md,
            paddingBottom: theme.custom.layout.section.md,
        },
        [theme.breakpoints.down('sm')]: {
            paddingTop: theme.custom.layout.section.sm,
            paddingBottom: theme.custom.layout.section.sm,
        },
    },
    container: {
        maxWidth: theme.custom.layout.contentMaxWidth + 2 * theme.custom.layout.gutter.lg,
        margin: '0 auto',
        padding: `0 ${theme.custom.layout.gutter.lg}px`,
        position: 'relative',
        zIndex: 1,
        textAlign: 'left',
        [theme.breakpoints.down('sm')]: {
            padding: `0 ${theme.custom.layout.gutter.sm}px`,
        },
    },
    /** the same label as in the section above */
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
    /** headline, and below it the explaining sentence - as in the section above */
    head: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        gap: '20px',
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
        /*
         * Two pixels smaller than the headings of the other sections. This one is the longest
         * of them, and at 24 pixels it breaks on a phone exactly where its colour changes:
         * "Vom ersten Klick bis zur" and below it "kompletten Automation." (Denis, 16.09.2026).
         */
        [theme.breakpoints.down('sm')]: {
            fontSize: '24px',
        },
    },
    titleAccent: {
        color: theme.palette.primary.main,
    },
    /*
     * The set break belongs to the wide headline. On a phone the first half already breaks
     * on its own and the break left a single "zur" on a line of its own, so there the
     * headline flows as one sentence (Denis on the phone, 16.09.2026).
     */
    titleBreak: {
        [theme.breakpoints.down('sm')]: {
            display: 'none',
        },
    },
    lead: {
        ...theme.custom.reading.body,
        color: theme.custom.textMuted,
        maxWidth: '560px',
    },
    /*
     * The selection on the left, the editor on the right. Below 900 pixels the three examples stand as
     * a row above the editor.
     */
    shell: {
        display: 'grid',
        gridTemplateColumns: '320px minmax(0, 1fr)',
        gap: `${theme.custom.layout.grid}px`,
        marginTop: '48px',
        alignItems: 'start',
        [theme.breakpoints.down('md')]: {
            gridTemplateColumns: 'minmax(0, 1fr)',
            marginTop: '32px',
        },
    },
    sceneList: {
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
        [theme.breakpoints.down('md')]: {
            flexDirection: 'row',
        },
        [theme.breakpoints.down('sm')]: {
            flexDirection: 'column',
        },
    },
    /*
     * An example to choose. It is a button, but looks like the tiles in the section above - the same
     * surface, the same radius, the same number.
     */
    scene: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: '12px',
        textAlign: 'left',
        width: '100%',
        padding: '16px 20px',
        border: 0,
        borderRadius: theme.custom.radius.card,
        backgroundColor: theme.custom.surfaces.surface,
        boxShadow: theme.custom.elevation.card,
        cursor: 'pointer',
        transition: 'background-color 0.2s, box-shadow 0.2s',
        '&:hover': {
            backgroundColor: theme.custom.surfaces.raised,
        },
        '&:hover .demo-scene-chevron': {
            color: theme.custom.textHeading,
            transform: 'translateX(2px)',
        },
        '&:focus-visible': {
            outline: 'none',
            boxShadow: theme.custom.focusRing,
        },
    },
    /** number, title and kind sit below each other, the arrow next to them */
    sceneBody: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        gap: '4px',
        flex: 1,
        minWidth: 0,
    },
    /*
     * The arrow is the sign that the three panels are switches. On the chosen one it points to
     * where the editor is: to the right, below 900 pixels downwards.
     */
    sceneChevron: {
        fontSize: '22px',
        color: theme.custom.textSubtle,
        flexShrink: 0,
        transition: 'color 0.2s, transform 0.2s',
        '@media (prefers-reduced-motion: reduce)': {
            transition: 'none',
        },
    },
    sceneChevronActive: {
        color: theme.palette.primary.main,
        [theme.breakpoints.down('md')]: {
            transform: 'rotate(90deg)',
        },
    },
    /** the chosen example carries a stripe in the brand colour on its left edge */
    sceneActive: {
        backgroundColor: theme.custom.surfaces.raised,
        boxShadow: `${theme.custom.elevation.raised}, inset 3px 0 0 0 ${theme.palette.primary.main}`,
    },
    /*
     * Number and title stand on one line, the kind below. Between 600 and 900 pixels the three
     * examples stand side by side and the column is too narrow for that - there the number stands
     * above the title instead of beside it.
     */
    sceneHead: {
        display: 'flex',
        alignItems: 'baseline',
        gap: '10px',
        [theme.breakpoints.down('md')]: {
            flexDirection: 'column',
            alignItems: 'flex-start',
            gap: '2px',
        },
        [theme.breakpoints.down('sm')]: {
            flexDirection: 'row',
            alignItems: 'baseline',
            gap: '10px',
        },
    },
    /** the same number as in the chain above and in the product overview */
    sceneNumber: {
        fontFamily: theme.typography.h1.fontFamily,
        fontSize: '15px',
        lineHeight: 1.6,
        color: theme.custom.textAccent,
        // "01 /" is a mark and not a sentence: in a narrow column the slash would
        // otherwise slip into the next line
        whiteSpace: 'nowrap',
        flexShrink: 0,
        // the digits of the font differ in width ("01" is narrower than "02") - a fixed box,
        // right-aligned, puts the "/" of the scenes under each other and lets every title
        // start at the same place
        display: 'inline-block',
        minWidth: '2.8em',
        textAlign: 'right',
        // between 600 and 900 pixels the number stands above the title: there the fixed box
        // would only push it away from the left edge
        [theme.breakpoints.down('md')]: {
            minWidth: 0,
            textAlign: 'left',
        },
        [theme.breakpoints.down('sm')]: {
            minWidth: '2.8em',
            textAlign: 'right',
        },
    },
    sceneTitle: {
        fontFamily: theme.typography.h1.fontFamily,
        fontSize: '17px',
        lineHeight: 1.3,
        color: theme.custom.textHeading,
    },
    sceneKind: {
        ...theme.custom.reading.caption,
        color: theme.custom.textSubtle,
    },
    /** the frame around the editor */
    card: {
        borderRadius: theme.custom.radius.card,
        backgroundColor: theme.custom.surfaces.surface,
        boxShadow: theme.custom.elevation.card,
        padding: '20px 24px 24px 24px',
        [theme.breakpoints.down('sm')]: {
            padding: '16px',
        },
    },
    cardTop: {
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        columnGap: '10px',
        rowGap: '6px',
        paddingBottom: '16px',
        borderBottom: `1px solid ${theme.custom.hairline}`,
    },
    /** the green dot says: the script is running, it is not just written down */
    statusDot: {
        width: '8px',
        height: '8px',
        borderRadius: '50%',
        backgroundColor: '#67ac58',
        boxShadow: '0 0 10px rgba(103, 172, 88, 0.8)',
        flexShrink: 0,
    },
    cardTopLabel: {
        ...theme.custom.reading.caption,
        textTransform: 'uppercase',
        letterSpacing: '0.08em',
        color: theme.custom.textSubtle,
    },
    cardTopTitle: {
        marginLeft: 'auto',
        fontFamily: theme.typography.h1.fontFamily,
        fontSize: '16px',
        color: theme.custom.textHeading,
    },
    stage: {
        display: 'grid',
    },
    /*
     * The views not chosen are invisible rather than removed. `visibility` also takes them out of the
     * tab order and out of what a screen reader sees.
     */
    panel: {
        gridArea: '1 / 1',
        minWidth: 0,
        display: 'flex',
        flexDirection: 'column',
        visibility: 'hidden',
        opacity: 0,
        transition: 'opacity 0.25s, visibility 0s 0.25s',
        '@media (prefers-reduced-motion: reduce)': {
            transition: 'none',
        },
    },
    panelActive: {
        visibility: 'visible',
        opacity: 1,
        transition: 'opacity 0.25s',
        '@media (prefers-reduced-motion: reduce)': {
            transition: 'none',
        },
    },
    /** the badge of the editor and, in one sentence, what it is */
    intro: {
        display: 'flex',
        alignItems: 'center',
        gap: '16px',
        padding: '16px 0',
        [theme.breakpoints.down('sm')]: {
            flexDirection: 'column',
            alignItems: 'flex-start',
            gap: '10px',
        },
    },
    introText: {
        ...theme.custom.reading.small,
        color: theme.custom.textMuted,
        margin: 0,
    },
}));
