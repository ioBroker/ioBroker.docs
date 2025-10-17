import { makeStyles } from '../../../../theme';

export const useStyles = makeStyles()(theme => ({
    sectionTitle: {
        fontFamily: 'Audiowide, sans-serif',
        color: theme.palette.primary.main,
        marginBottom: theme.spacing(4),
        fontSize: '1.5rem',
    },
}));
