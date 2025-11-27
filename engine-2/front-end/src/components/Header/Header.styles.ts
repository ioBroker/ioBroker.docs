import { makeStyles } from '../../theme';

export const useHeaderStyles = makeStyles()(theme => ({
    root: {
        position: 'fixed' as const,
        top: 0,
        left: 0,
        right: 0,
        paddingLeft: theme.spacing(4),
        paddingRight: theme.spacing(4),
        zIndex: 1000,
        height: 64,
        display: 'flex',
        flexDirection: 'row' as const,
        alignItems: 'center',
        backgroundColor: theme.palette.background.paper,
        color: theme.palette.text.primary,
        // boxShadow: '0 1px 3px rgba(0, 0, 0, 0.3)',
        boxSizing: 'border-box' as const,
        [theme.breakpoints.down('md')]: {
            paddingLeft: theme.spacing(2),
            paddingRight: theme.spacing(2),
        },
    },
    logo: {
        width: 32,
        height: 32,
        cursor: 'pointer',
        marginRight: theme.spacing(3),
    },
    searchBox: {
        display: 'flex',
        flexDirection: 'row' as const,
        alignItems: 'center',
        marginRight: theme.spacing(2),
        [theme.breakpoints.down('md')]: {
            display: 'none',
        },
    },
    searchInput: {
        width: 0,
        opacity: 0,
        transition: 'width 0.3s ease, opacity 0.3s ease',
        fontFamily: theme.typography.fontFamily,
        marginRight: 0,
        color: theme.palette.text.primary,
        '& .MuiInputBase-input': {
            padding: 0,
        },
        '&.visible': {
            marginRight: theme.spacing(2),
            width: 200,
            opacity: 1,
        },
        '&.MuiInputBase-root': {
            height: 32,
            '&:hover::before': {
                borderBottom: `1px solid ${theme.palette.text.disabled}`,
            },
            '&::before': {
                borderBottom: `1px solid ${theme.palette.text.disabled}`,
            },
        },
        '& .MuiButtonBase-root': {
            color: theme.palette.text.primary,
        },
    },
    languageSelect: {
        marginRight: theme.spacing(2),
        fontFamily: theme.typography.fontFamily,
        fontSize: 20,
        fontWeight: 400,
        color: theme.palette.text.primary,
        '& .MuiSelect-select': {
            paddingRight: '0 !important',
        },
        '&.MuiInput-root:before': {
            borderBottom: 'none',
        },
        '&.MuiInput-root:after': {
            borderBottom: 'none',
        },
        '&.MuiInput-root:hover:not(.Mui-disabled):before': {
            borderBottom: 'none',
        },
    },
    flexGrow: {
        flexGrow: 1,
    },
    navBox: {
        gap: theme.spacing(3),
        display: 'flex',
        alignItems: 'center',
        [theme.breakpoints.down('md')]: {
            gap: theme.spacing(2),
        },
    },
    link: {
        fontSize: 18,
        fontWeight: 400,
        textDecoration: 'none',
        color: theme.palette.text.primary,
        transition: 'color 0.2s ease',
        cursor: 'pointer',
        '&:hover': {
            color: theme.palette.text.secondary,
        },
        [theme.breakpoints.down('md')]: {
            display: 'none',
        },
    },
    linkSelected: {
        color: theme.palette.text.primary,
        cursor: 'default',
    },
    iconButton: {
        padding: theme.spacing(0.5),
        color: theme.palette.text.primary,
        '&:hover': {
            backgroundColor: 'rgba(255, 255, 255, 0.08)',
            color: theme.palette.text.secondary,
        },
        width: 44,
        height: 44,
    },
    profileMenu: {
        '& .MuiPaper-root': {
            fontFamily: theme.typography.fontFamily,
            backgroundColor: theme.palette.background.paper,
            border: `1px solid ${theme.palette.divider}`,
            color: theme.palette.text.secondary,
        },
        '& .MuiButtonBase-root:hover': {
            backgroundColor: 'rgba(255, 255, 255, 0.08)',
            color: theme.palette.text.primary,
        },
    },
    menuItem: {
        fontFamily: theme.typography.fontFamily,
        '&.Mui-selected': {
            backgroundColor: 'rgba(255, 255, 255, 0.08)',
            color: theme.palette.text.primary,
        },
    },
}));
