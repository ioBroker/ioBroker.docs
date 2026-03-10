import { makeStyles } from '../../theme';

export const useStyles = makeStyles<{ isMenuCollapsed: boolean }>()((theme, { isMenuCollapsed }) => ({
    topBarSearch: {
        width: '460px',
        '& img': {
            filter: theme.palette.mode !== 'dark'
                ? 'brightness(0) saturate(100%) invert(23%) sepia(89%) saturate(1247%) hue-rotate(175deg) brightness(95%) contrast(101%)'
                : 'none',
        },
        [theme.breakpoints.down(902)]: {
            width: isMenuCollapsed ? '460px' : '312px',
        },
        [theme.breakpoints.down(595)]: {
            width: isMenuCollapsed ? '311px' : '312px',
        },
        [theme.breakpoints.down(451)]: {
            width: isMenuCollapsed ? '311px' : '281px',
        },
        [theme.breakpoints.down(429)]: {
            width: isMenuCollapsed ? '281px' : '281px',
        },
        '& .MuiTextField-root': {
            width: '460px',
            [theme.breakpoints.down(902)]: {
                width: isMenuCollapsed ? '460px' : '312px',
            },
            [theme.breakpoints.down(595)]: {
                width: isMenuCollapsed ? '311px' : '312px',
            },
            [theme.breakpoints.down(451)]: {
                width: isMenuCollapsed ? '311px' : '281px',
            },
            [theme.breakpoints.down(429)]: {
                width: isMenuCollapsed ? '281px' : '281px',
            },
        },
        '& .MuiOutlinedInput-root': {
            height: '32px',
            borderRadius: '10px',
            paddingLeft: '12px',
            '& fieldset': {
                borderColor: `${theme.palette.primary.main} !important`,
                borderWidth: '2px !important',
            },
            '&:hover fieldset': {
                borderColor: `${theme.palette.primary.main} !important`,
            },
            '&.Mui-focused fieldset': {
                borderColor: `${theme.palette.primary.main} !important`,
            },
        },
        '& .MuiInputBase-input': {
            color: theme.palette.mode === 'dark'
                ? 'white'
                : theme.palette.secondary.main,
            fontSize: '14px',
            padding: '0px',
        },
    },
}));
