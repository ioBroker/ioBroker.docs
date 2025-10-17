import { makeStyles } from '../../../../theme';

export const useStyles = makeStyles()(theme => ({
    styledButton: {
        border: `1px solid ${theme.palette.primary.main}`,
        padding: '12px 24px',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        cursor: 'pointer',
        minWidth: 250,
        transition: 'background-color 0.3s',
        '&:hover': {
            backgroundColor: 'rgba(29, 144, 202, 0.1)',
        },
    },
}));
