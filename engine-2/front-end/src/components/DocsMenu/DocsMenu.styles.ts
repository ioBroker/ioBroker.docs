import { makeStyles } from '../../theme';

export const useDocsMenuStyles = makeStyles()(theme => ({
    mainLevel: {
        fontSize: 18,
        borderWidth: 0,
        boxShadow: 'none',
        '&:before': {
            backgroundColor: 'transparent',
        },
    },
    childrenLevel: {
        paddingLeft: 32,
        fontSize: 16,
    },
}));
