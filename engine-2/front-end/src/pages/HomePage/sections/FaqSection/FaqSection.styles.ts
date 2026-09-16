import { makeStyles } from '../../../../theme';

export const useStyles = makeStyles()(theme => ({
    faqSection: {
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
     * The questions stand as a list with hairlines, like the three steps in the section above: the
     * same handwriting, no second pattern for the same purpose. The answers are collapsed, so that
     * the list stays easy to take in as a whole.
     */
    list: {
        marginTop: '8px',
        borderBottom: `1px solid ${theme.custom.hairline}`,
    },
    item: {
        borderTop: `1px solid ${theme.custom.hairline}`,
        // the first question starts without a line, it would otherwise stand right below the label
        '&:first-of-type': {
            borderTop: 'none',
        },
    },
    /*
     * The question is the button. The browser's own triangle is hidden,
     * and a cross stands on the right instead, which turns when opening.
     */
    question: {
        listStyle: 'none',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '24px',
        padding: '22px 0',
        fontFamily: theme.typography.h1.fontFamily,
        fontSize: '20px',
        lineHeight: 1.3,
        color: theme.custom.textHeading,
        transition: 'color 0.2s ease',
        '&::-webkit-details-marker': {
            display: 'none',
        },
        '&:hover': {
            color: theme.palette.primary.main,
        },
        '&:focus-visible': {
            outline: 'none',
            boxShadow: theme.custom.focusRing,
            borderRadius: theme.custom.radius.control,
        },
        [theme.breakpoints.down('sm')]: {
            fontSize: '17px',
            gap: '16px',
            padding: '18px 0',
        },
    },
    /*
     * On the right stands our arrow, not a character of its own, and slanted like everywhere else on
     * the page: closed it points diagonally down, open diagonally up. The image lies the right way by
     * itself, and half a turn lies in between.
     */
    sign: {
        flexShrink: 0,
        width: '22px',
        height: '22px',
        transition: 'transform 0.2s ease',
        'details[open] &': {
            transform: 'rotate(180deg)',
        },
        [theme.breakpoints.down('sm')]: {
            width: '18px',
            height: '18px',
        },
    },
    answer: {
        ...theme.custom.reading.body,
        color: theme.custom.textMuted,
        maxWidth: '820px',
        margin: 0,
        padding: '0 0 24px',
        [theme.breakpoints.down('sm')]: {
            padding: '0 0 18px',
        },
    },
}));
