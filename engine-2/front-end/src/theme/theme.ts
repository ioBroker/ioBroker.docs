import { createTheme } from '@mui/material/styles';

const secondary = '#005894';
const primary = '#1D90CA';

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
    fontFamily: [
      'Saira',
      'Roboto',
      'Arial',
      'sans-serif',
    ].join(','),
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
      secondary: 'rgba(0, 88, 148, 0.7)',
      disabled: 'rgba(0, 88, 148, 0.5)',
    },
    divider: secondary,
  },
  typography: {
    fontFamily: [
      'Saira',
      'Roboto',
      'Arial',
      'sans-serif',
    ].join(','),
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
});

export const theme = darkTheme;

export default theme;
