import { makeStyles } from '../theme';

/**
 * How a link looks inside rendered markdown - in the documentation, in a blog post, in an adapter
 * readme and in the legal texts alike.
 *
 * It lives here and not in the pages because every page that renders markdown needs it and every
 * page had to remember to hand it over. Two of the four forgot, and their links were
 * indistinguishable from the text around them: the reader could not tell there was anything to
 * click. A page may still pass a `link` class of its own, but nothing has to.
 */
export const useMarkdownLinkStyles = makeStyles()(theme => ({
    link: {
        color: theme.palette.primary.main,
        textDecoration: 'none',
        borderBottom: `1px solid ${theme.custom.hairlineStrong}`,
        transition: 'border-color 0.15s ease, color 0.15s ease',
        // A read link is not a different link: the browser's purple says something about the
        // reader's history, not about the document, and it clashes with everything else here.
        '&:visited': {
            color: theme.palette.primary.main,
        },
        '&:hover': {
            borderBottomColor: theme.palette.primary.main,
        },
        '&:focus-visible': {
            outline: `2px solid ${theme.palette.primary.main}`,
            outlineOffset: '2px',
            borderRadius: '2px',
        },
    },
}));
