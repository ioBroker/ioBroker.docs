import { makeStyles } from '../../../../theme';

export const useStyles = makeStyles()(theme => ({
    sectionTitle: {
        fontFamily: 'Audiowide, sans-serif',
        color: theme.palette.primary.main,
        letterSpacing: '-3%',
        fontWeight: '400',
        marginBottom: theme.spacing(4),
        fontSize: '48px',
         [theme.breakpoints.down('md')]: {
            fontSize: '36px',
        },
    },
}));
