import { makeStyles } from '../../../../theme';

/** Smallest useful bracket-card format; see `statCard` for its derivation. */
const MIN_CARD = 160;
/**
 * At this card width the content switches to a horizontal layout. It lies between the
 * two cases that coexist on a narrow screen: two side-by-side cards are about 175 px
 * wide, while one alone in its row is about 360 px wide.
 */
const WIDE_CARD = 300;
/**
 * Up to this point, one elongated card occupies each row; above it they follow available
 * space (Denis, 06.09.2026). This is a design decision, not a calculation: two cards
 * would fit side by side from 376 px, but looked cramped there.
 */
const SINGLE_COLUMN_UP_TO = 400;
/**
 * The largest card format, also derived from its content: the 44 px Audiowide number
 * needs about 191 px, the button needs 200 px with `min-width`, plus both bracket arms
 * (2x20), so content is complete at about 240 px. Everything beyond is empty space,
 * which was distracting on large screens (Denis, 06.09.2026). At 280 px, the card has
 * about 40 px of room beyond its 240 px content and is nearly square (280x260).
 * Note: this value also caps the row through `MAX_ROW` from around a 1000 px window;
 * otherwise dividing available space by three would produce wider cards.
 */
const MAX_CARD = 280;
/** Three cards at their largest format, plus two column gaps. */
const MAX_ROW = 3 * MAX_CARD + 2 * 48;

export const useStyles = makeStyles()(theme => ({
    container: {
        maxWidth: 1376,
        margin: '0 auto',
        padding: `0 ${theme.custom.layout.gutter.lg}px`,
        [theme.breakpoints.down('sm')]: {
            padding: `0 ${theme.custom.layout.gutter.sm}px`,
        },
    },
    communitySection: {
        padding: '96px 0',
        [theme.breakpoints.down('md')]: {
            padding: '64px 0',
        },
        [theme.breakpoints.down('sm')]: {
            padding: '48px 0',
        },
    },
    /*
     * Die Kennzeile der neuen Bloecke: "// COMMUNITY" in der Markenfarbe, statt der alten
     * grossen Ueberschrift (Denis, 11.09.2026).
     */
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
     * Der Text steht als gewoehnlicher Absatz: die Kommentarklammern und der Einzug
     * stammten aus der alten Fassung, in der er wie Quelltext gesetzt war.
     */
    communityText: {
        ...theme.custom.reading.body,
        color: theme.custom.textMuted,
        maxWidth: 820,
        margin: 0,
    },

    /**
     * The heading above the three cards has the row's width and aligns with the page's
     * left axis (Denis, 06.09.2026), so the heading, cards, and text above share an edge.
     * The upper spacing formerly on `statsContainer` now belongs here; only the short gap
     * to the row remains below.
     */
    statsHeading: {
        maxWidth: MAX_ROW,
        // sie steht jetzt oben, direkt unter der Kennzeile, und traegt den Abstand zum
        // Absatz darunter (Denis, 11.09.2026)
        margin: '0 0 16px',
        textAlign: 'left',
        letterSpacing: '0.02em',
        color: theme.custom.textHeading,
        // MUI provides its own values for both on `Typography`; see `statNumber`.
        '&&': {
            fontSize: '22px',
            fontWeight: 400,
            lineHeight: 1.4,
        },
        [theme.breakpoints.down('md')]: {
            '&&': {
                fontSize: theme.custom.reading.lead.fontSize,
            },
        },
    },
    /**
     * Three bracket cards side by side at every width. Below 900 px they previously
     * stacked, creating three 400 px high cards and a very long, empty section. They now
     * become smaller instead, as on mobile.
     */
    /**
     * The three bracket cards follow available space, not screen breakpoints: as many fit
     * side by side as their smallest useful width permits—three, then two plus one below,
     * and finally one per row. A card alone in a row lays out horizontally (number left,
     * button right) rather than growing taller. A container query on the card decides this,
     * since narrow and wide cards may coexist at the same screen width.
     */
    statsContainer: {
        /**
         * Grid rather than Flexbox: when a card is alone in the final row, it occupies
         * **one column** and retains exactly the format of the two above. Flexbox would
         * stretch it to the full width.
         */
        display: 'grid',
        gridTemplateColumns: `repeat(auto-fit, minmax(${MIN_CARD}px, 1fr))`,
        /**
         * The cap belongs on the row, not individual cards: a fixed maximum column width
         * would change the number of columns the grid derives from `MIN_CARD`. This
         * preserves the measured behavior below 1056 px; above it, only the free space to
         * the right grows and the row remains left-aligned with the page column.
         */
        maxWidth: MAX_ROW,
        marginLeft: 0,
        marginRight: 'auto',
        marginTop: '40px',
        gap: theme.spacing(6),
        [`@media (max-width: ${SINGLE_COLUMN_UP_TO - 0.05}px)`]: {
            gridTemplateColumns: '1fr',
        },
        /**
         * The gap separates two identically drawn brackets; when too small, the row reads
         * as one grid rather than three cards (Denis, 06.09.2026). Hence 32 instead of 24
         * and 24 instead of 16 px; it stays near the cards' inner spacing so space between
         * them does not exceed space inside them.
         */
        [theme.breakpoints.down('md')]: {
            marginTop: '24px',
            gap: theme.spacing(4),
        },
        [theme.breakpoints.down('sm')]: {
            gap: '24px',
        },
    },

    /**
     * MIN_CARD (above) is the smallest useful card format. Measured from its content,
     * not guessed: “20,543 +” needs 4.34 em in Audiowide, or 104 px at 24 px; the button
     * needs 111 px with 13 px text and inner spacing. With both brackets (2x16), this is
     * about 160 px. Below that width, the next card wraps to the following row.
     */
    statCard: {
        minWidth: 0,
        /**
         * Content needs about 195 px (40 inner spacing, 29 title, 60 number with spacing,
         * 14 label, 50 button). The rest is space distributed between groups by
         * `space-between`; 400 px provided too much.
         */
        minHeight: 260,
        display: 'flex',
        justifyContent: 'space-between',
        // Reference size for the container queries below.
        containerType: 'inline-size',
        /**
         * Below 1200 px this previously used a smaller height (220), left over from before
         * the width cap. That widened the ratio where cards are already widest: at 1199 px
         * they were 320x220 (1.45), while the accepted 1440 px version is 320x260 (1.23).
         * One height across desktop keeps the ratio stable from 900 to 1440 px.
         */
        [theme.breakpoints.down('md')]: {
            // From here, content determines height: a horizontal card is short and a
            // vertical card is as tall as needed.
            minHeight: 96,
        },
    },

    statCardContentWrapper: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        minWidth: 0,
        // Pushes the button to the bottom of a vertical card.
        marginBottom: 'auto',
        padding: '0 2px',
        [theme.breakpoints.down('sm')]: {
            padding: '0 0 0 2px',
        },
        /**
         * In the elongated card, the title is at the top while the number and label move
         * down to align with the button (Denis, 06.09.2026). The column must fill the
         * height (`stretch` rather than `bracesContent` centering); the upper
         * `margin-bottom: auto` would defeat this. The title supplies spacing with its own
         * `margin-bottom: auto`; `space-between` would also separate number and label.
         */
        [`@container (min-width: ${WIDE_CARD}px)`]: {
            marginBottom: 0,
            alignSelf: 'stretch',
        },
    },

    /**
     * The width of these two cards is the bracket-arm length and also the content's
     * distance from the vertical line, because content begins after the arms. The length
     * comes from `theme.custom.brace`, using the same drawing as the footer and newsletter.
     */
    bracesLeft: {
        borderTop: `1px solid ${theme.palette.primary.main}`,
        borderBottom: `1px solid ${theme.palette.primary.main}`,
        borderLeft: `1px solid ${theme.palette.primary.main}`,
        flexShrink: 0,
        width: theme.custom.brace.lg,
        [theme.breakpoints.down('md')]: {
            width: theme.custom.brace.md,
        },
        [theme.breakpoints.down('sm')]: {
            width: theme.custom.brace.sm,
        },
    },
    bracesRight: {
        borderTop: `1px solid ${theme.palette.primary.main}`,
        borderBottom: `1px solid ${theme.palette.primary.main}`,
        borderRight: `1px solid ${theme.palette.primary.main}`,
        flexShrink: 0,
        width: theme.custom.brace.lg,
        [theme.breakpoints.down('md')]: {
            width: theme.custom.brace.md,
        },
        [theme.breakpoints.down('sm')]: {
            width: theme.custom.brace.sm,
        },
    },

    bracesContent: {
        flex: 1,
        minWidth: 0,
        padding: `20px 0`,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        textAlign: 'center',
        [theme.breakpoints.down('md')]: {
            padding: '16px 0',
            // `space-between` alone is insufficient: a tight card has no free room to
            // distribute, leaving the button stuck to the text.
            gap: '14px',
            /**
             * The vertical card gets a minimum height so the title, number, and label form
             * a block at the top and the button sits at the bottom. Previously content set
             * the height, leaving everything tightly centered. The rule follows card width
             * because the elongated card (below 400 px) should remain short.
             */
            [`@container (max-width: ${WIDE_CARD - 0.05}px)`]: {
                minHeight: '186px',
                justifyContent: 'flex-start',
            },
            // The elongated card; see the comment above.
            [`@container (min-width: ${WIDE_CARD}px)`]: {
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                textAlign: 'left',
                gap: '12px',
                padding: '12px 2px',
                /**
                 * Content alone yields only about 87 px; at 336 px wide the card looked
                 * like a stripe and the brackets lost their form. 130 px was too much;
                 * at 112 px there is nearly a line of space above the title and below the
                 * number, giving a roughly 3:1 ratio (Denis, 06.09.2026).
                 */
                minHeight: '112px',
            },
        },
    },

    /**
     * FORUM / FACEBOOK / DISCORD use Audiowide (Denis, 06.09.2026), the kit's typeface
     * for headings and captions. They caption the number, so remain substantially smaller.
     */
    statTitle: {
        fontFamily: 'Audiowide, sans-serif',
        color: theme.palette.primary.main,
        fontSize: '24px',
        letterSpacing: '0.02em',
        textTransform: 'uppercase',
        [theme.breakpoints.down('lg')]: {
            // Fallback for browsers without container queries, then the actual rule:
            // a share of the card width. Emotion emits both declarations in sequence.
            fontSize: ['clamp(11px, 2.4vw, 20px)', 'min(20px, 8cqw)'],
        },
        [theme.breakpoints.down('md')]: {
            [`@container (min-width: ${WIDE_CARD}px)`]: {
                // 13 px was too quiet for the line naming the card (Denis, 06.09.2026).
                fontSize: '16px',
                // Pushes the number and label down; see statCardContentWrapper.
                marginBottom: 'auto',
            },
        },
    },
    statNumber: {
        fontFamily: 'Audiowide, sans-serif',
        fontSize: '44px',
        fontWeight: '400',
        letterSpacing: '-0.03em',
        whiteSpace: 'nowrap',
        // `&&` doubles specificity: MUI's Typography class sets a line height and would
        // otherwise win here (a known issue; see the design system). Without it, 44.8 px
        // line height remained on 28 px text.
        '&&': {
            lineHeight: 1,
        },
        margin: `${theme.spacing(2)} 0 0 0`,
        [theme.breakpoints.down('lg')]: {
            fontSize: ['clamp(14px, 4.2vw, 34px)', 'min(34px, 14cqw)'],
            margin: '8px 0 0 0',
        },
        [theme.breakpoints.down('md')]: {
            [`@container (min-width: ${WIDE_CARD}px)`]: {
                fontSize: '28px',
                margin: '2px 0 0 0',
            },
        },
    },
    /**
     * “Users” is a caption for the number, not a heading: Roboto rather than Audiowide,
     * small and in muted text color, so the number reads as the main content (Denis,
     * 06.09.2026).
     */
    statLabel: {
        fontFamily: theme.typography.fontFamily,
        fontSize: theme.custom.reading.small.fontSize,
        fontWeight: 400,
        letterSpacing: 0,
        color: theme.custom.textSubtle,
        // Directly below the number with no gap: “Users” belongs to it, not on its own
        // line (Denis, 06.09.2026). `&&` is again needed against Typography, or 1.6
        // lines are used instead of 1.15.
        '&&': {
            lineHeight: 1.15,
        },
        // Removes Roboto's ascender space, which would otherwise remain as empty space.
        marginTop: '-3px',
        [theme.breakpoints.down('lg')]: {
            fontSize: ['clamp(10px, 1.6vw, 15px)', 'min(15px, 6cqw)'],
        },
        [theme.breakpoints.down('md')]: {
            [`@container (min-width: ${WIDE_CARD}px)`]: {
                fontSize: theme.custom.reading.caption.fontSize,
                marginTop: '-2px',
            },
        },
    },
    joinButton: {
        alignSelf: 'center',
        display: 'block',
        position: 'relative',
        zIndex: 0,
        height: 50,
        /**
         * Filled rather than outlined on every screen (Denis, 06.09.2026). It uses the
         * kit's surface step rather than brand blue, because full blue overshadowed the
         * number, the card's main content. Hover steps one level down and press another:
         * the surface darkens rather than changing color. The hairline preserves an edge
         * against the white ground. `&&` doubles specificity so stylesheet order does not
         * decide against CustomButton's rules.
         */
        '&&': {
            backgroundColor: theme.custom.surfaces.surface,
            color: theme.custom.textAccent,
            boxShadow: `inset 0 0 0 1px ${theme.custom.hairlineStrong}`,
            '&:hover': {
                backgroundColor: theme.custom.surfaces.raised,
                color: theme.custom.textAccent,
            },
            '&:active': {
                backgroundColor: theme.custom.surfaces.overlay,
            },
        },
        /**
         * `CustomButton` brings `min-width: 200` and becomes full-width below 600 px.
         * Neither works here, where the button is in a 160 px card or beside the number.
         * `&&` doubles specificity; otherwise stylesheet order decides.
         */
        [theme.breakpoints.down('md')]: {
            /**
             * Full width between the brackets at compact height—44 px was too heavy here.
             * This changes only format; colors belong to the base rule. It is CSS rather
             * than `useMediaQuery` so it switches without going through component state.
             */
            '&&': {
                height: `${theme.custom.control.compactHeight}px`,
                width: '100%',
                minWidth: 0,
                padding: '0 12px',
                fontSize: '12px',
            },
            alignSelf: 'stretch',
            [`@container (min-width: ${WIDE_CARD}px)`]: {
                '&&': {
                    height: `${theme.custom.control.compactHeight}px`,
                    width: 'auto',
                    padding: '0 14px',
                    whiteSpace: 'nowrap',
                },
                // Bottom right in the bracket, aligned with “Users” (Denis).
                alignSelf: 'flex-end',
                flexShrink: 0,
            },
        },
    },
}));
