import { makeStyles } from '../../theme';

export const useStyles = makeStyles()(theme => ({
    divider: {
        zIndex: 9,
        width: '100%',
        margin: 0,
        position: 'relative',
        overflow: 'visible',
        marginBottom: '8px'
    },
    logo: {
        position: 'absolute',
        width: 14,
        height: 14,
        top: -6,
        borderRadius: '50%',
        backgroundColor: theme.palette.background.default,
    },
}));
