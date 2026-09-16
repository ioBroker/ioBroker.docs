import { makeStyles } from '../../../../theme';

export const useStyles = makeStyles()(theme => ({
    benefitsSection: {
        position: 'relative',
        backgroundColor: theme.palette.background.default,
        overflow: 'hidden',
        paddingTop: theme.custom.layout.section.lg,
        paddingBottom: theme.custom.layout.section.lg,
        // no light: the section stands on the calm background (Denis, 11.09.2026)
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
        /*
         * On a phone the heading is only 24 to 26 pixels, and a caption set across the
         * whole width in capitals and in the brand colour weighed as much as it: the two
         * no longer read as label and heading. Below 600 pixels the caption steps back
         * (Denis, 16.09.2026: "no contrast in the typography").
         */
        [theme.breakpoints.down('sm')]: {
            fontSize: '10px',
            letterSpacing: '0.06em',
        },
    },
    labelSlashes: {
        color: theme.palette.primary.main,
        marginRight: '8px',
    },
    /*
     * Two tiles side by side, as in the draft. Four in a row would be too narrow here: unlike the
     * four steps, every tile holds a whole sentence.
     */
    grid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: `${theme.custom.layout.grid}px`,
        // the label stands alone above the grid, 20 instead of 48 points apart
        marginTop: '20px',
        [theme.breakpoints.down('md')]: {
            marginTop: '16px',
        },
        [theme.breakpoints.down('sm')]: {
            gridTemplateColumns: '1fr',
        },
    },
    /*
     * The tile is taller than its content: number and title stand at the top, the sentence at the
     * bottom, with the free space in between. The four steps in the section "Was ist ioBroker?" are
     * built the same way - the tile thus gets air and an order, instead of the text sticking to the
     * title (Denis, 11.09.2026).
     */
    item: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        gap: '24px',
        minHeight: '250px',
        padding: '32px',
        borderRadius: theme.custom.radius.card,
        backgroundColor: theme.custom.surfaces.surface,
        boxShadow: theme.custom.elevation.card,
        [theme.breakpoints.down('md')]: {
            minHeight: '210px',
        },
        [theme.breakpoints.down('sm')]: {
            // stacked, the extra height would be nothing but empty space
            minHeight: 0,
            gap: '16px',
            padding: '20px',
        },
    },
    /** number and title belong together and stand as a pair at the top edge */
    itemHead: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        gap: '10px',
    },
    /** the same number as in the sections above */
    itemNumber: {
        fontFamily: theme.typography.h1.fontFamily,
        fontSize: '17px',
        lineHeight: 1.6,
        color: theme.custom.textAccent,
        whiteSpace: 'nowrap',
        // number and title stand below each other here, so the number keeps no fixed box: a
        // right-aligned one pushed it away from the left edge of the tile while the title
        // stayed there (Denis on the phone, 16.09.2026)
        display: 'inline-block',
        textAlign: 'left',
        flexShrink: 0,
    },
    itemTitle: {
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
    itemText: {
        ...theme.custom.reading.body,
        color: theme.custom.textMuted,
    },
}));
