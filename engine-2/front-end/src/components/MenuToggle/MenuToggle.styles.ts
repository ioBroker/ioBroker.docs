import { makeStyles } from '../../theme';

export const useStyles = makeStyles()(theme => ({
    // segmented control: same recipe as the grid/list switch in the top bar
    menuToggle: {
        flexShrink: 0,
        '& .MuiToggleButtonGroup-root': {
            height: `${theme.custom.control.compactHeight}px`,
            borderRadius: `${theme.custom.radius.control}px`,
            background: theme.custom.surfaces.surface,
            boxShadow: `inset 0 0 0 1px ${theme.custom.hairline}`,
            padding: '3px',
            gap: '2px',
        },
        '&& .MuiToggleButton-root': {
            border: 'none',
            borderRadius: `${theme.custom.radius.chip}px`,
            color: theme.palette.text.primary,
            alignItems: 'center',
            justifyContent: 'center',
            padding: '0 8px',
            minWidth: '30px',
            background: 'transparent',
            '&:hover': {
                background: theme.custom.surfaces.raised,
            },
            '&.Mui-selected': {
                background: theme.custom.surfaces.overlay,
                '&:hover': {
                    background: theme.custom.surfaces.overlay,
                },
            },
            '& svg': {
                fontSize: '18px',
                opacity: 0.75,
                color: theme.palette.text.primary,
            },
            '&.Mui-selected svg': {
                opacity: 1,
                color: theme.palette.primary.main,
            },
            '&.Mui-selected img': {
                filter: 'brightness(0) saturate(100%) invert(64%) sepia(98%) saturate(2476%) hue-rotate(169deg) brightness(101%) contrast(101%)',
            },
        },
        '& img': {
            width: '18px',
            height: '18px',
            opacity: 0.75,
            filter:
                theme.palette.mode !== 'dark'
                    ? 'brightness(0) saturate(100%) invert(23%) sepia(89%) saturate(1247%) hue-rotate(175deg) brightness(95%) contrast(101%)'
                    : 'brightness(0) invert(100%)',
        },
    },
}));
