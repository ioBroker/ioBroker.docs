import { createTheme } from '@mui/material/styles';

const secondary = '#005894';
const primary = '#1D90CA';

// типы темы MUI для кастомных полей
declare module '@mui/material/styles' {
    interface Theme {
        custom: {
            textColorHover: string;
            textSelected: string;
            backgroundColorOpacity: string;
            backgroundImage: string;
            visibleBorder: string;
            opacitySpotLight: number;
        };
    }
    interface ThemeOptions {
        custom?: {
            textColorHover?: string;
            textSelected?: string;
            backgroundColorOpacity?: string;
            backgroundImage?: string;
            visibleBorder?: string;
            opacitySpotLight?: number;
        };
    }
}

// Темная тема
export const darkTheme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: primary,
            light: '#7ec3f3',
            dark: '#1565c0',
            contrastText: '#fff',
        },
        secondary: {
            main: secondary,
            light: '#006bbc',
            dark: '#003d66',
            contrastText: '#fff',
        },
        background: {
            default: '#080B1C',
            paper: '#080B1C',
        },
        text: {
            primary: '#FFFFFF',
            secondary: '#1D90CA',
            disabled: 'rgba(255, 255, 255, 0.5)',
        },
        divider: 'rgba(255, 255, 255, 0.12)',
    },
    typography: {
        fontFamily: ['Saira', 'Roboto', 'Arial', 'sans-serif'].join(','),
        fontWeightLight: 200,
        h1: {
            fontFamily: 'Audiowide, Roboto, Arial, sans-serif',
            fontSize: '2.5rem',
            fontWeight: 600,
        },
        h2: {
            fontFamily: 'Audiowide, Roboto, Arial, sans-serif',
            fontSize: '2rem',
            fontWeight: 600,
        },
        h3: {
            fontFamily: 'Audiowide, Roboto, Arial, sans-serif',
            fontSize: '1.75rem',
            fontWeight: 600,
        },
        h4: {
            fontFamily: 'Audiowide, Roboto, Arial, sans-serif',
        },
        h5: {
            fontFamily: 'Audiowide, Roboto, Arial, sans-serif',
        },
        h6: {
            fontFamily: 'Audiowide, Roboto, Arial, sans-serif',
        },
        body1: {
            fontWeight: 200,
        },
        body2: {
            fontWeight: 200,
        },
    },
    spacing: 8,
    shape: {
        borderRadius: 8,
    },
    custom: {
        textColorHover: '#7ec3f3',
        textSelected: primary,
        backgroundColorOpacity: '#080B1CE0',
        backgroundImage: 'url(/www/background.webp)',
        visibleBorder: 'none',
        opacitySpotLight: 1,
    },
});

// Светлая тема
export const lightTheme = createTheme({
    palette: {
        mode: 'light',
        primary: {
            main: primary,
            light: '#7ec3f3',
            dark: '#1565c0',
            contrastText: '#fff',
        },
        secondary: {
            main: secondary,
            light: '#006bbc',
            dark: '#003d66',
            contrastText: '#fff',
        },
        background: {
            default: '#FFF',
            paper: '#FFF',
        },
        text: {
            primary: secondary,
            secondary: '#1D90CA',
            disabled: 'rgba(0, 88, 148, 0.5)',
        },
        divider: secondary,
    },
    typography: {
        fontFamily: ['Saira', 'Roboto', 'Arial', 'sans-serif'].join(','),
        h1: {
            fontFamily: 'Audiowide, Roboto, Arial, sans-serif',
            fontSize: '2.5rem',
            fontWeight: 600,
        },
        h2: {
            fontFamily: 'Audiowide, Roboto, Arial, sans-serif',
            fontSize: '2rem',
            fontWeight: 600,
        },
        h3: {
            fontFamily: 'Audiowide, Roboto, Arial, sans-serif',
            fontSize: '1.75rem',
            fontWeight: 600,
        },
        h4: {
            fontFamily: 'Audiowide, Roboto, Arial, sans-serif',
        },
        h5: {
            fontFamily: 'Audiowide, Roboto, Arial, sans-serif',
        },
        h6: {
            fontFamily: 'Audiowide, Roboto, Arial, sans-serif',
        },
    },
    spacing: 8,
    shape: {
        borderRadius: 8,
    },
    custom: {
        textColorHover: '#006bbc',
        textSelected: primary,
        backgroundColorOpacity: '#FFFFFFE0',
        backgroundImage: 'url(/www/background.webp)',
        visibleBorder: `1px solid ${secondary}`,
        opacitySpotLight: 0.3,
    },
});

export const theme = darkTheme;

export default theme;
