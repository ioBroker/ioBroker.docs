import { makeStyles } from '../../../theme';

/**
 * Shared rhythm of the landing page sections.
 * Every section sits in the same content column and uses the same vertical
 * spacing, so the page reads as one grid instead of seven separate ideas.
 */
export const useSectionStyles = makeStyles()(theme => ({
    section: {
        position: 'relative',
        width: '100%',
        paddingTop: `${theme.custom.layout.section.lg}px`,
        paddingBottom: `${theme.custom.layout.section.lg}px`,
        [theme.breakpoints.down('md')]: {
            paddingTop: `${theme.custom.layout.section.md}px`,
            paddingBottom: `${theme.custom.layout.section.md}px`,
        },
        [theme.breakpoints.down('sm')]: {
            paddingTop: `${theme.custom.layout.section.sm}px`,
            paddingBottom: `${theme.custom.layout.section.sm}px`,
        },
    },
    container: {
        width: theme.custom.layout.contentMaxWidth + 2 * theme.custom.layout.gutter.lg,
        maxWidth: '100%',
        margin: '0 auto',
        padding: `0 ${theme.custom.layout.gutter.lg}px`,
        boxSizing: 'border-box',
        position: 'relative',
        zIndex: 1,
        [theme.breakpoints.down('md')]: {
            padding: `0 ${theme.custom.layout.gutter.md}px`,
        },
        [theme.breakpoints.down('sm')]: {
            padding: `0 ${theme.custom.layout.gutter.sm}px`,
        },
    },
    /** display size of the landing page - one step above the H1 of the kit */
    display: {
        fontFamily: 'Audiowide, sans-serif',
        fontSize: '56px',
        lineHeight: 1.1,
        fontWeight: 400,
        letterSpacing: '-0.02em',
        color: theme.palette.text.primary,
        [theme.breakpoints.down('md')]: {
            fontSize: '40px',
        },
        [theme.breakpoints.down('sm')]: {
            fontSize: '28px',
        },
    },
    displayAccent: {
        color: theme.palette.primary.main,
    },
}));
