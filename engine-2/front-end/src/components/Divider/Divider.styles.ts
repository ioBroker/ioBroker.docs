import { makeStyles } from '../../theme';

export const useStyles = makeStyles()(theme => ({
    divider: {
        zIndex: 9,
        width: '100%',
        position: 'relative',
        overflow: 'visible',
        marginBottom: '8px',
    },
    /**
     * The same line, but as the footer divider. Previously it only had the last section's
     * bottom padding above it—48 px on mobile, too little (Denis, 06.09.2026). The extra
     * space belongs here, not on `divider`, because the same line also divides sections
     * within pages, where the section rhythm must remain. The space below stays small so
     * the line belongs to the footer rather than floating between blocks.
     */
    beforeFooter: {
        marginTop: '64px',
        [theme.breakpoints.down('md')]: {
            marginTop: '48px',
        },
        [theme.breakpoints.down('sm')]: {
            marginTop: '40px',
        },
    },
    logo: {
        position: 'absolute',
        width: 14,
        height: 14,
        // The line is 1 px high and the dot is 14; half of that centers it.
        top: -7,
        borderRadius: '50%',
        backgroundColor: theme.palette.background.default,
    },
}));
