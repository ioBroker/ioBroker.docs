import { makeStyles } from '../../../../theme';

export const useStyles = makeStyles()(theme => ({
    startSection: {
        position: 'relative',
        backgroundColor: theme.palette.background.default,
        overflow: 'hidden',
        paddingTop: theme.custom.layout.section.lg,
        paddingBottom: theme.custom.layout.section.lg,
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
    /*
     * The headline stands free above both, below it two columns as in the draft: the introduction on
     * the left, the three steps on the right - both start at the same height. Below 900 pixels they
     * stand one below the other.
     */
    grid: {
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '64px',
        alignItems: 'start',
        [theme.breakpoints.down('lg')]: {
            gap: '40px',
        },
        [theme.breakpoints.down('md')]: {
            gridTemplateColumns: '1fr',
            gap: '32px',
        },
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
        // the headline stands free across the whole width, it only breaks where the
        // line break stands in the text
        marginBottom: '24px',
        [theme.breakpoints.down('md')]: {
            fontSize: '34px',
        },
        [theme.breakpoints.down('sm')]: {
            /*
             * On the phone the size follows the width: "automatisieren."
             * is a word that cannot break, and in Audiowide at 26 points it is
             * wider than a narrow device (Denis, 11.09.2026).
             */
            fontSize: 'clamp(17px, 5.6vw, 26px)',
        },
    },
    /*
     * As in the section "Was ist ioBroker?": the second line carries the brand colour, namely
     * `primary` instead of `textAccent` - in the light theme heading and `textAccent` would otherwise
     * be the same colour.
     */
    titleAccent: {
        color: theme.palette.primary.main,
    },
    lead: {
        ...theme.custom.reading.body,
        color: theme.custom.textMuted,
        // a text column stays readable when it does not run across the whole page
        maxWidth: '640px',
    },
    /** the right column: the table and below it the two buttons */
    stepsColumn: {
        display: 'flex',
        flexDirection: 'column',
        // the list takes the whole column, otherwise its lines end where the
        // longest title ends
        alignItems: 'stretch',
    },
    /*
     * The three steps do not stand in tiles but as a list with hairlines in between: they are
     * instructions and not an assortment, and the section thus also looks different from the tile
     * blocks above it.
     */
    steps: {
        listStyle: 'none',
        // in the right column the list starts at the top, level with the headline
        margin: 0,
        padding: 0,
    },
    /*
     * One row per step: number, title, explanation. The three columns line up one below the other,
     * so the list reads as a sequence and not as three separate sections. Below 900 pixels the
     * explanation slips under the title, below 600 the number moves up as well.
     */
    step: {
        display: 'grid',
        /*
         * A fixed width for the number column, not an automatic one: every row is a grid of its own, and
         * `auto` would have produced a different width in every row - the titles would then stand a few
         * pixels offset below each other.
         * 48 instead of 44: "04 /" in Audiowide at 17 points is 45.6 pixels wide and stuck out of the
         * column.
         */
        gridTemplateColumns: '48px 1fr',
        alignItems: 'baseline',
        columnGap: '24px',
        rowGap: '6px',
        padding: '20px 0',
        borderTop: `1px solid ${theme.custom.hairline}`,
        // the first row starts without a line: it would otherwise stand free above the table
        // and cut the column off from the text beside it (Denis, 11.09.2026)
        '&:first-of-type': {
            borderTop: 'none',
            paddingTop: 0,
        },
        '&:last-of-type': {
            borderBottom: `1px solid ${theme.custom.hairline}`,
        },
        [theme.breakpoints.down('sm')]: {
            gridTemplateColumns: '1fr',
            columnGap: 0,
            padding: '16px 0',
        },
    },
    /** the same number as in the sections above */
    stepNumber: {
        fontFamily: theme.typography.h1.fontFamily,
        fontSize: '17px',
        lineHeight: 1.6,
        color: theme.custom.textAccent,
        whiteSpace: 'nowrap',
        flexShrink: 0,
        // the digits of the font differ in width ("01" narrower than "02"):
        // right-aligned in the column, the "/" line up exactly below each other
        textAlign: 'right',
        // on the phone the number stands above the title, there it belongs on the left
        [theme.breakpoints.down('sm')]: {
            textAlign: 'left',
        },
    },
    stepTitle: {
        fontFamily: theme.typography.h1.fontFamily,
        fontSize: '20px',
        fontWeight: 400,
        '&&': {
            lineHeight: 1.3,
        },
        color: theme.custom.textHeading,
        margin: 0,
        [theme.breakpoints.down('sm')]: {
            fontSize: '18px',
        },
    },
    stepText: {
        /*
         * The same size and brightness as the introduction beside it: at 15 points and in the same colour
         * the line looked almost transparent next to the large headline (Denis, 11.09.2026).
         */
        ...theme.custom.reading.body,
        color: theme.custom.textMuted,
        // the explanation stands below the title, not below the number
        gridColumn: 2,
        [theme.breakpoints.down('sm')]: {
            gridColumn: 1,
        },
    },
    /*
     * The two buttons stand below the table, in the same column and left-aligned with it. On the
     * phone they take the whole width.
     */
    actions: {
        display: 'flex',
        flexWrap: 'wrap',
        gap: '16px',
        marginTop: '56px',
        width: '100%',
        [theme.breakpoints.down('sm')]: {
            flexDirection: 'column',
            gap: '12px',
            marginTop: '40px',
        },
    },
}));
