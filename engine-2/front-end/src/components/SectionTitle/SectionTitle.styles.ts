import { makeStyles } from '../../theme';

export const useStyles = makeStyles()(theme => ({
    sectionTitle: {
        fontFamily: 'Audiowide, sans-serif',
        color: theme.palette.primary.main,
        letterSpacing: '0.03em',
        fontWeight: '400',
        marginBottom: theme.spacing(4),
        whiteSpace: 'normal',
        wordBreak: 'keep-all',
        overflowWrap: 'normal',
        fontSize: '48px',
        [theme.breakpoints.down('md')]: {
            fontSize: '36px',
        },
        [theme.breakpoints.down('sm')]: {
            fontSize: '28px',
            marginBottom: theme.spacing(3),
        },
    },
}));
