import { makeStyles } from '../../theme';

export const useStyles = makeStyles()(theme => ({
    sectionTitle: {
        fontFamily: 'Audiowide, sans-serif',
        color: theme.palette.primary.main,
        letterSpacing: '-0.02em',
        fontWeight: '400',
        marginBottom: theme.spacing(4),
        whiteSpace: 'nowrap',
        wordBreak: 'keep-all',
        overflowWrap: 'normal',
        fontSize: '36px',
        lineHeight: 1.1,
        [theme.breakpoints.down('md')]: {
            fontSize: '28px',
        },
        [theme.breakpoints.down('sm')]: {
            fontSize: '22px',
            marginBottom: theme.spacing(3),
        },
    },
}));
