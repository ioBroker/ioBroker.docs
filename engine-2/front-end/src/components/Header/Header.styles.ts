import { darkTheme, makeStyles } from '../../theme';

/**
 * `dark` keeps the bar on the dark palette even in the light theme - the home
 * page banner underneath is dark in both themes, a white bar would cut into it.
 */
export const useHeaderStyles = makeStyles<{ dark: boolean }>()((theme, { dark }) => {
    const bar = dark ? darkTheme : theme;

    return {
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
            backgroundColor: bar.palette.background.paper,
            color: bar.palette.text.primary,
            boxShadow: `inset 0 -1px 0 ${bar.custom.hairline}`,
            boxSizing: 'border-box' as const,
            [theme.breakpoints.down(1280)]: {
                paddingLeft: '24px',
                paddingRight: '24px',
            },
            [theme.breakpoints.down(481)]: {
                paddingLeft: '10px',
                paddingRight: '10px',
            },
        },
        logoLink: {
            display: 'flex',
            alignItems: 'center',
            marginRight: theme.spacing(3),
        },
        logo: {
            width: 32,
            height: 32,
            cursor: 'pointer',
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
            fontSize: 15,
            marginRight: 0,
            color: bar.palette.text.primary,
            '& .MuiInputBase-input': {
                padding: '0 14px',
            },
            '&.visible': {
                marginRight: theme.spacing(2),
                width: 220,
                opacity: 1,
            },
            '&.MuiInputBase-root': {
                height: bar.custom.control.compactHeight,
                borderRadius: bar.custom.radius.control,
                backgroundColor: bar.custom.surfaces.surface,
                '&:hover::before': {
                    borderBottom: 'none',
                },
                '&::before': {
                    borderBottom: 'none',
                },
                '&::after': {
                    borderBottom: 'none',
                },
                '&.Mui-focused': {
                    boxShadow: bar.custom.focusRing,
                },
            },
            '& .MuiButtonBase-root': {
                color: bar.palette.text.primary,
            },
        },
        languageSelect: {
            marginRight: theme.spacing(2),
            fontFamily: theme.typography.fontFamily,
            fontSize: 16,
            fontWeight: 400,
            color: bar.palette.text.primary,
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
            gap: theme.spacing(0.5),
            display: 'flex',
            alignItems: 'center',
            // the icon buttons get their own breathing room next to the nav links
            '& > .MuiIconButton-root': {
                marginLeft: theme.spacing(1),
            },
            [theme.breakpoints.down('md')]: {
                gap: theme.spacing(0.5),
            },
        },
        link: {
            height: theme.custom.control.compactHeight,
            padding: '0 14px',
            borderRadius: theme.custom.radius.control,
            display: 'flex',
            alignItems: 'center',
            fontSize: 15,
            fontWeight: 400,
            whiteSpace: 'nowrap' as const,
            textDecoration: 'none',
            color: bar.custom.textMuted,
            transition: 'color 0.2s ease, background-color 0.2s ease',
            cursor: 'pointer',
            '&:hover': {
                color: bar.palette.text.primary,
                backgroundColor: bar.custom.surfaces.surface,
            },
            '&:focus-visible': {
                outline: 'none',
                boxShadow: bar.custom.focusRing,
            },
            [theme.breakpoints.down('md')]: {
                display: 'none',
            },
        },
        linkSelected: {
            color: bar.palette.text.primary,
            backgroundColor: bar.custom.surfaces.raised,
            cursor: 'default',
        },
        iconButton: {
            padding: theme.spacing(0.5),
            borderRadius: theme.custom.radius.control,
            color: bar.custom.textMuted,
            '&:hover': {
                backgroundColor: bar.custom.surfaces.surface,
                color: bar.palette.text.primary,
            },
            '&:focus-visible': {
                boxShadow: bar.custom.focusRing,
            },
            width: theme.custom.control.compactHeight,
            height: theme.custom.control.compactHeight,
        },
        profileMenu: {
            '& .MuiPaper-root': {
                fontFamily: theme.typography.h1.fontFamily,
                backgroundColor: theme.custom.surfaces.overlay,
                backgroundImage: 'none',
                borderRadius: theme.custom.radius.group,
                boxShadow: theme.custom.elevation.overlay,
                color: theme.palette.text.primary,
            },
            '& .MuiButtonBase-root:hover': {
                backgroundColor: theme.custom.surfaces.raised,
                color: theme.palette.text.primary,
            },
        },
        /**
         * The icons of the profile menu carry their size from the outside - the
         * glyphs themselves are drawn at 100 % of their box.
         */
        profileMenuIcon: {
            // the glyphs are drawn at 100 % of their box via an inline style, and an
            // inline style beats every class - so the box itself has to carry the size
            minWidth: 20,
            width: 20,
            height: 20,
            marginRight: '12px',
            flexShrink: 0,
            color: 'inherit',
        },
        menuItem: {
            fontFamily: theme.typography.fontFamily,
            '&.Mui-selected': {
                backgroundColor: theme.custom.surfaces.raised,
                color: theme.palette.text.primary,
            },
        },
    };
});
