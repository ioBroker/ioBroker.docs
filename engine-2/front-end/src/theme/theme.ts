import { createTheme, type ThemeOptions } from '@mui/material/styles';

const secondary = '#005894';
/**
 * Reading scale of the light theme. Two fixed tones instead of opacity steps: opacity
 * lightens the text against the white ground rather than stepping it back, and the weaker
 * step came out at 2.7:1 - below the 4.5:1 a running text needs. Headings and running text
 * share the brand blue, so text and buttons carry one tone; only side notes step back.
 */
const lightText = {
    /** headings, values, running text and footer links - 7.4:1 on white, 6.6:1 on a card */
    primary: secondary,
    /** the same tone - kept as its own name so the roles stay readable at the usage site */
    muted: secondary,
    /**
     * labels and side notes. Darkened when the surface steps were corrected: on the
     * new card the old tone fell to 4.37:1, just under the 4.5:1 a label needs. Now
     * 5.8:1 on the page, 5.1:1 on a card and 4.6:1 on the raised step a card takes
     * on hover - the whole light scale stays above the line, not just the page.
     */
    subtle: '#3A678C',
};
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
    surface: '#031D38',
    raised: '#052E57',
    overlay: '#06386B',
};

// The light steps used to sit 4.8 / 3.4 / 2.7 points of L* apart - short of the 5-7
// this scale promises, so a card barely lifted off the white page and the steps above
// it ran together. Now 6.3 / 3.8 / 3.7.
const lightSurfaces = {
    canvas: '#FFFFFF',
    surface: '#E6EEF7',
    raised: '#D6E4F2',
    overlay: '#C8DAEC',
};

const reading = {
    lead: { fontSize: '18px', lineHeight: 1.6 },
    body: { fontSize: '16px', lineHeight: 1.6 },
    small: { fontSize: '15px', lineHeight: 1.5 },
    caption: { fontSize: '13px', lineHeight: 1.5 },
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

/**
 * Die Laenge der waagerechten Arme an den eckigen Klammern - dem Markenmotiv, das
 * Statistik-Kacheln, Newsletter-Feld und Footer-Spalten einfasst. Eine Zahl je Stufe,
 * damit die Klammer ueberall dieselbe Zeichnung ist und nicht je Bauteil eine andere.
 * Kurz gehalten (Denis, 06.09.2026): die Klammer soll als Zeichen wirken, nicht als
 * Rahmen. Achtung - der Arm ist zugleich der Abstand des Inhalts zur senkrechten Linie,
 * weil der Inhalt hinter ihm beginnt.
 *
 * Zweiter Durchgang am selben Tag: im Footer war ein Kasten uebersehen worden und hatte
 * noch 10 px. Denis hat den kuerzeren Arm gewaehlt - jetzt 10 px auf allen Stufen. Die
 * drei Schluessel bleiben, damit die Aufrufstellen unveraendert bleiben und eine spaetere
 * Staffelung wieder nur hier steht.
 */
const brace = { lg: 10, md: 10, sm: 10 };

const layout = {
    /** width of the text column, gutters come on top */
    contentMaxWidth: 1312,
    /**
     * The side margin of every content column on the site - one value per breakpoint,
     * and the same one on the landing page, the docs, the blog and the legal pages, so
     * that all of them stand on the same two vertical lines.
     * There is no own step for the tablet: between 600 and 899 px the layout stacks but
     * the screen is still wide enough for the full margin, and a narrower one there made
     * the sections look misaligned against the header and the footer above and below.
     * 20 instead of 16 on the phone, because that is what the hero and the footer have
     * been tuned to.
     * Two sections keep a wider margin of their own above 900 px: the hero and the
     * adapters, where the picture behind the text needs the room.
     */
    gutter: { lg: 32, md: 32, sm: 20 },
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
        /**
         * The reading scale. Running text used to sit anywhere between 14 and 18 px
         * with line heights from 1.4 to 1.7 - four different sizes on the product
         * overview alone - so a paragraph changed size depending on which page it
         * stood on. These four steps are the whole vocabulary; a size outside them
         * needs a reason.
         */
        reading: {
            /** the one intro paragraph under a page title */
            lead: { fontSize: string; lineHeight: number };
            /** running text - the default */
            body: { fontSize: string; lineHeight: number };
            /** captions, side notes, table cells, dense card text */
            small: { fontSize: string; lineHeight: number };
            /** the quietest line: hints and footnotes */
            caption: { fontSize: string; lineHeight: number };
        };
        /** headings - the brand tone on light, plain white on dark */
        textHeading: string;
        /**
         * Accent text that still has to be read: `primary` is only 3.6:1 on white and
         * misses the 4.5:1 a running text needs, so on light this steps down to the
         * brand tone. On dark `primary` is 5.5:1 and stays as it is.
         */
        textAccent: string;
        /** the one divider colour - it separates, it does not frame */
        hairline: string;
        /** slightly stronger hairline for outlined controls */
        hairlineStrong: string;
        /** ready to use box-shadow for a focused element */
        focusRing: string;
        elevation: { card: string; raised: string; overlay: string };
        /**
         * The soft light that lies behind a picture or a group of tiles. One hue for all
         * of them - the brand blue - so the page glows in one colour instead of three.
         * `soft` sits behind a background picture and must not swallow the text on it,
         * `strong` behind a group of tiles that it is meant to lift. `strong` carries its
         * colour far out rather than dropping off at 70 % - a steep falloff reads as a
         * spot in the middle of the group instead of as light over the whole of it.
         *
         * Always paired with a `filter: blur(...)`: without it the stops draw as rings.
         */
        glow: { soft: string; strong: string };
        textMuted: string;
        textSubtle: string;
        radius: typeof radius;
        control: typeof control;
        layout: typeof layout;
        brace: typeof brace;
    }
    interface Theme {
        custom: CustomTheme;
    }
    interface ThemeOptions {
        custom?: Partial<CustomTheme>;
    }
}

/**
 * The steps below switch at 599 px, which is the `sm` breakpoint of the layout - not at
 * 480, where they used to sit. 480 belonged to no breakpoint the rest of the site uses,
 * so a heading or a paragraph changed size in the middle of a range where nothing else
 * moved, and a component that set its own size for `sm` was silently overruled between
 * 480 and 600. That is what made the note in the banner jump: it kept its 24 px line
 * spacing down to 480 and was taken over by `body1` below it.
 *
 * `h3` lost its rule altogether - it set 16 px on top of 16 px and did nothing.
 */
const typography = (): Record<string, unknown> => ({
    fontFamily: ['Roboto', 'Saira', 'Arial', 'sans-serif'].join(','),
    fontWeightLight: 400,
    fontWeightRegular: 400,
    fontWeightMedium: 700,
    fontWeightBold: 700,
    // Audiowide stays the signature - but only for H1-H3 and the section title
    h1: {
        fontFamily: 'Audiowide, Roboto, Arial, sans-serif',
        fontSize: '36px',
        fontWeight: 400,
        lineHeight: 1.1,
        letterSpacing: '-0.02em',
        '@media (max-width:1279px)': {
            fontSize: '28px',
        },
        '@media (max-width:599px)': {
            fontSize: '22px',
            lineHeight: 1.2,
        },
    },
    h2: {
        fontFamily: 'Audiowide, Roboto, Arial, sans-serif',
        fontSize: '22px',
        fontWeight: 400,
        lineHeight: 1.23,
        letterSpacing: '-0.02em',
        '@media (max-width:599px)': {
            fontSize: '18px',
            lineHeight: 1.3,
        },
    },
    h3: {
        fontFamily: 'Audiowide, Roboto, Arial, sans-serif',
        fontSize: '16px',
        fontWeight: 400,
        lineHeight: 1.3,
        letterSpacing: '-0.02em',
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
        '@media (max-width:599px)': {
            fontSize: '16px',
            lineHeight: 1.6,
        },
    },
    body2: {
        fontWeight: 400,
        fontSize: '16px',
        lineHeight: 1.6,
        letterSpacing: '0.01em',
        '@media (max-width:599px)': {
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
const baseComponents = (
    surfaces: { overlay: string; surface: string },
    color: string,
    shadow: string,
    textColor: string,
): ThemeOptions['components'] => ({
    MuiInputBase: {
        styleOverrides: {
            input: {
                // the browser paints autofilled fields white - repaint them in the theme's colours
                '&:-webkit-autofill, &:-webkit-autofill:hover, &:-webkit-autofill:focus, &:-webkit-autofill:active': {
                    WebkitBoxShadow: `0 0 0 1000px ${surfaces.surface} inset`,
                    WebkitTextFillColor: textColor,
                    caretColor: textColor,
                    borderRadius: 'inherit',
                    // Chrome re-applies its own colour on a transition end, so never let it finish
                    transition: 'background-color 100000s ease-in-out 0s',
                },
            },
        },
    },
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
        glow: {
            soft: 'radial-gradient(ellipse at center, rgba(29, 144, 202, 0.34) 0%, rgba(29, 144, 202, 0.18) 32%, rgba(29, 144, 202, 0.07) 58%, rgba(29, 144, 202, 0) 85%)',
            strong: 'radial-gradient(ellipse at center, rgba(29, 144, 202, 0.58) 0%, rgba(29, 144, 202, 0.44) 24%, rgba(29, 144, 202, 0.22) 46%, rgba(29, 144, 202, 0.06) 70%, rgba(29, 144, 202, 0) 88%)',
        },
        textHeading: '#FFFFFF',
        textAccent: primary,
        textMuted: 'rgba(255, 255, 255, 0.78)',
        textSubtle: 'rgba(255, 255, 255, 0.55)',
        reading,
        radius,
        control,
        layout,
        brace,
    },
    components: baseComponents(
        darkSurfaces,
        '#FFFFFF',
        'inset 0 0 0 1px rgba(126, 195, 243, 0.18), 0 8px 20px -8px rgba(0, 0, 0, 0.8)',
        '#FFFFFF',
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
            primary: lightText.primary,
            secondary: '#1D90CA',
            disabled: 'rgba(0, 88, 148, 0.38)',
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
        glow: {
            // on the white page the same light has to be much quieter, or it reads as a
            // stain rather than as light
            soft: 'radial-gradient(ellipse at center, rgba(29, 144, 202, 0.16) 0%, rgba(29, 144, 202, 0.08) 32%, rgba(29, 144, 202, 0.03) 58%, rgba(29, 144, 202, 0) 85%)',
            strong: 'radial-gradient(ellipse at center, rgba(29, 144, 202, 0.26) 0%, rgba(29, 144, 202, 0.20) 24%, rgba(29, 144, 202, 0.10) 46%, rgba(29, 144, 202, 0.03) 70%, rgba(29, 144, 202, 0) 88%)',
        },
        // headings carry the brand tone - the very blue the buttons have
        textHeading: secondary,
        textAccent: secondary,
        textMuted: lightText.muted,
        textSubtle: lightText.subtle,
        reading,
        radius,
        control,
        layout,
        brace,
    },
    components: baseComponents(
        lightSurfaces,
        secondary,
        '0 1px 2px rgba(0, 88, 148, 0.12), 0 8px 20px -8px rgba(0, 88, 148, 0.4)',
        secondary,
    ),
});

export const theme = darkTheme;

export default theme;
