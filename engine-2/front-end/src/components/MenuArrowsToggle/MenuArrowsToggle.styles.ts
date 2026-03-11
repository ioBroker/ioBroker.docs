import { makeStyles } from '../../theme';

export const useStyles = makeStyles()(theme => ({
    menuToggle: {
        flexShrink: 0,
        '& .MuiToggleButtonGroup-root': {
            border: `2px solid ${theme.palette.primary.main}`,
            borderRadius: '8px',
            height: '32px',
            width: '55px',
        },
        '& .MuiToggleButton-root': {
            border: 'none',
            borderRadius: '0',
            color: '#fff',
            alignItems: 'flex-start',
            padding: '8px 5px 0px 5px',
            minWidth: '27px',
            '&:not(:last-of-type)': {
                borderRight: `2px solid ${theme.palette.primary.main}`,
            }
        },
        '& img': {
            filter: theme.palette.mode !== 'dark'
                ? 'brightness(0) saturate(100%) invert(23%) sepia(89%) saturate(1247%) hue-rotate(175deg) brightness(95%) contrast(101%)'
                : 'none',
        },
    },
}));
