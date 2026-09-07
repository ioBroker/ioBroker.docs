import { makeStyles } from '../../theme';

export const useStyles = makeStyles()(theme => ({
    sectionTitle: {
        fontFamily: 'Audiowide, sans-serif',
        color: theme.palette.primary.main,
        letterSpacing: '-0.02em',
        fontWeight: '400',
        // one distance from a section title to the text under it, everywhere: 40 px.
        // Before this every section brought its own value and the element below added
        // its own margin on top - the measured gaps ran from 24 to 80 px.
        marginBottom: '40px',
        whiteSpace: 'nowrap',
        wordBreak: 'keep-all',
        overflowWrap: 'normal',
        fontSize: '36px',
        lineHeight: 1.1,
        [theme.breakpoints.down('md')]: {
            fontSize: '28px',
        },
        // On a phone a long title no longer fits on one line - "// ADAPTER- UND
        // ZUGANGSLIZENZEN" needs 473 px at 22 px and the column has 343. It wraps at the
        // spaces instead of being cut off; words themselves stay unbroken.
        [theme.breakpoints.down('sm')]: {
            fontSize: '22px',
            marginBottom: '32px',
            whiteSpace: 'normal',
        },
    },
}));
