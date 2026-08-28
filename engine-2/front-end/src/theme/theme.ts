import { createTheme } from '@mui/material/styles';
import type { ThemeOptions } from '@mui/material/styles';

const secondary = '#005894';
const primary = '#1D90CA';

/**
 * Design tokens of the "Ruhige Flächen" interface kit.
 * The brand colours are unchanged - what is new are the surface steps that are
 * derived from the page background, one hairline value instead of hard borders
 * and a single spacing/radius scale.
 */
// The steps are spaced by roughly 5-7 points of perceptual lightness (L*), so a
// card is clearly readable against the page ground without needing a border.
const darkSurfaces = {
    canvas: '#080B1C',
    surface: '#141A31',
    raised: '#1C2440',
    overlay: '#232C4E',
};

const lightSurfaces = {
    canvas: '#FFFFFF',
    surface: '#F4F8FC',
    raised: '#E8F1F9',
    overlay: '#DCEAF6',
};

const radius = {
    chip: 8,
    control: 10,
    group: 12,
    card: 16,
    pill: 999,
};

const control = {
    /** primary actions and form fields */
    height: 44,
    /** header, segmented controls, dense toolbars */
    compactHeight: 36,
};

const layout = {
    /** width of the text column, gutters come on top */
    contentMaxWidth: 1312,
    gutter: { lg: 32, md: 24, sm: 16 },
    section: { lg: 96, md: 64, sm: 48 },
    /** gap between cards in the content grid */
    grid: 24,
};

// типы темы MUI для кастомных полей
declare module '@mui/material/styles' {
    interface CustomTheme {
        textColorHover: string;
        textSelected: string;
        backgroundColorOpacity: string;
        backgroundImage: string;
        visibleBorder: string;
        opacitySpotLight: number;
        /** background steps, from the page ground upwards */
        surfaces: { canvas: string; surface: string; raised: string; overlay: string };
        /** the one divider colour - it separates, it does not frame */
        hairline: string;
        /** slightly stronger hairline for outlined controls */
        hairlineStrong: string;
        /** ready to use box-shadow for a focused element */
        focusRing: string;
        elevation: { card: string; raised: string; overlay: string };
        textMuted: string;
        textSubtle: string;
        radius: typeof radius;
        control: typeof control;
        layout: typeof layout;
    }
    interface Theme {
        custom: CustomTheme;
    }
    interface ThemeOptions {
        custom?: Partial<CustomTheme>;
    }
}

const typography = (): Record<string, unknown> => ({
    fontFamily: ['Roboto', 'Saira', 'Arial', 'sans-serif'].join(','),
    fontWeightLight: 400,
    fontWeightRegular: 400,
    fontWeightMedium: 700,
    fontWeightBold: 700,
    // Audiowide stays the signature - but only for H1-H3 and the section title
    h1: {
        fontFamily: 'Audiowide, Roboto, Arial, sans-serif',
        fontSize: '40px',
        fontWeight: 400,
        lineHeight: 1.1,
        letterSpacing: '-0.02em',
        '@media (max-width:1279px)': {
            fontSize: '32px',
        },
        '@media (max-width:480px)': {
            fontSize: '26px',
            lineHeight: 1.2,
        },
    },
    h2: {
        fontFamily: 'Audiowide, Roboto, Arial, sans-serif',
        fontSize: '26px',
        fontWeight: 400,
        lineHeight: 1.23,
        letterSpacing: '-0.02em',
        '@media (max-width:480px)': {
            fontSize: '22px',
            lineHeight: 1.3,
        },
    },
    h3: {
        fontFamily: 'Audiowide, Roboto, Arial, sans-serif',
        fontSize: '20px',
        fontWeight: 400,
        lineHeight: 1.3,
        letterSpacing: '-0.02em',
        '@media (max-width:480px)': {
            fontSize: '18px',
        },
    },
    h4: {
        fontFamily: 'Audiowide, Roboto, Arial, sans-serif',
        fontWeight: 400,
        letterSpacing: '-0.02em',
    },
    // everything below H3 is running text again
    h5: {
        fontFamily: ['Roboto', 'Arial', 'sans-serif'].join(','),
        fontSize: '18px',
        fontWeight: 700,
        lineHeight: 1.4,
    },
    h6: {
        fontFamily: ['Roboto', 'Arial', 'sans-serif'].join(','),
        fontSize: '16px',
        fontWeight: 700,
        lineHeight: 1.5,
    },
    body1: {
        fontWeight: 400,
        fontSize: '18px',
        lineHeight: 1.55,
        letterSpacing: '0.01em',
        '@media (max-width:480px)': {
            fontSize: '16px',
            lineHeight: 1.6,
        },
    },
    body2: {
        fontWeight: 400,
        fontSize: '16px',
        lineHeight: 1.6,
        letterSpacing: '0.01em',
        '@media (max-width:480px)': {
            fontSize: '15px',
        },
    },
    caption: {
        fontWeight: 400,
        fontSize: '13px',
        lineHeight: 1.4,
        letterSpacing: '0.01em',
    },
    button: {
        fontFamily: 'Audiowide, Roboto, Arial, sans-serif',
        fontSize: '15px',
        fontWeight: 400,
        letterSpacing: '0.02em',
        textTransform: 'uppercase',
    },
});

// Темная тема
/** small, quiet label on the overlay surface - same in both themes */
const tooltipComponents = (
    surfaces: { overlay: string },
    color: string,
    shadow: string,
): ThemeOptions['components'] => ({
    MuiTooltip: {
        defaultProps: {
            arrow: true,
            enterDelay: 350,
            enterNextDelay: 150,
        },
        styleOverrides: {
            tooltip: {
                backgroundColor: surfaces.overlay,
                color,
                fontFamily: ['Roboto', 'Arial', 'sans-serif'].join(','),
                fontSize: '13px',
                lineHeight: 1.4,
                fontWeight: 400,
                padding: '6px 10px',
                borderRadius: `${radius.chip}px`,
                boxShadow: shadow,
                maxWidth: '240px',
            },
            arrow: {
                color: surfaces.overlay,
            },
        },
    },
});

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
            default: darkSurfaces.canvas,
            paper: darkSurfaces.canvas,
        },
        text: {
            primary: '#FFFFFF',
            secondary: '#1D90CA',
            disabled: 'rgba(255, 255, 255, 0.35)',
        },
        divider: 'rgba(126, 195, 243, 0.14)',
    },
    typography: typography(),
    spacing: 8,
    shape: {
        borderRadius: radius.control,
    },
    custom: {
        textColorHover: '#7ec3f3',
        textSelected: primary,
        backgroundColorOpacity: '#080B1CE0',
        backgroundImage: 'url(/www/background.webp)',
        visibleBorder: 'none',
        opacitySpotLight: 1,
        surfaces: darkSurfaces,
        hairline: 'rgba(126, 195, 243, 0.14)',
        hairlineStrong: 'rgba(126, 195, 243, 0.28)',
        focusRing: `0 0 0 2px ${primary}`,
        elevation: {
            // the inset ring is an edge highlight, not a frame - it keeps the card
            // readable where the drop shadow disappears in the dark background
            card: 'inset 0 0 0 1px rgba(126, 195, 243, 0.08), 0 1px 2px rgba(0, 0, 0, 0.4), 0 14px 32px -20px rgba(0, 0, 0, 0.9)',
            raised: 'inset 0 0 0 1px rgba(126, 195, 243, 0.12), 0 2px 4px rgba(0, 0, 0, 0.45), 0 22px 44px -22px rgba(0, 0, 0, 1)',
            overlay:
                'inset 0 0 0 1px rgba(126, 195, 243, 0.12), 0 1px 2px rgba(0, 0, 0, 0.45), 0 12px 28px -12px rgba(0, 0, 0, 0.75)',
        },
        textMuted: 'rgba(255, 255, 255, 0.78)',
        textSubtle: 'rgba(255, 255, 255, 0.55)',
        radius,
        control,
        layout,
    },
    components: tooltipComponents(
        darkSurfaces,
        '#FFFFFF',
        'inset 0 0 0 1px rgba(126, 195, 243, 0.18), 0 8px 20px -8px rgba(0, 0, 0, 0.8)',
    ),
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
            default: lightSurfaces.canvas,
            paper: lightSurfaces.canvas,
        },
        text: {
            primary: secondary,
            secondary: '#1D90CA',
            disabled: 'rgba(0, 61, 102, 0.35)',
        },
        divider: 'rgba(0, 88, 148, 0.14)',
    },
    typography: typography(),
    spacing: 8,
    shape: {
        borderRadius: radius.control,
    },
    custom: {
        textColorHover: '#006bbc',
        textSelected: primary,
        backgroundColorOpacity: '#FFFFFFE0',
        backgroundImage: 'url(/www/background.webp)',
        visibleBorder: `1px solid ${secondary}`,
        opacitySpotLight: 0.3,
        surfaces: lightSurfaces,
        hairline: 'rgba(0, 88, 148, 0.14)',
        hairlineStrong: 'rgba(0, 88, 148, 0.28)',
        focusRing: `0 0 0 2px ${primary}`,
        elevation: {
            card: '0 1px 2px rgba(0, 88, 148, 0.10), 0 14px 32px -20px rgba(0, 88, 148, 0.6)',
            raised: '0 2px 4px rgba(0, 88, 148, 0.12), 0 22px 44px -22px rgba(0, 88, 148, 0.75)',
            overlay: '0 1px 2px rgba(0, 88, 148, 0.10), 0 14px 32px -16px rgba(0, 88, 148, 0.45)',
        },
        textMuted: 'rgba(0, 61, 102, 0.85)',
        textSubtle: 'rgba(0, 61, 102, 0.6)',
        radius,
        control,
        layout,
    },
    components: tooltipComponents(
        lightSurfaces,
        secondary,
        '0 1px 2px rgba(0, 88, 148, 0.12), 0 8px 20px -8px rgba(0, 88, 148, 0.4)',
    ),
});

export const theme = darkTheme;

export default theme;
