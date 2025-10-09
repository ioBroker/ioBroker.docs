import React, { createContext, useContext, useState, useMemo, ReactNode } from 'react';
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { darkTheme, lightTheme } from './theme';

type ThemeMode = 'light' | 'dark';

interface ThemeContextType {
    mode: ThemeMode;
    toggleTheme: () => void;
    setTheme: (mode: ThemeMode) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useThemeMode = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useThemeMode must be used within ThemeProvider');
    }
    return context;
};

interface ThemeProviderProps {
    children: ReactNode;
    defaultMode?: ThemeMode;
}

export const ThemeProvider = ({ children, defaultMode = 'dark' }: ThemeProviderProps) => {
    const [mode, setMode] = useState<ThemeMode>(defaultMode);

    const theme = useMemo(() => (mode === 'dark' ? darkTheme : lightTheme), [mode]);

    const toggleTheme = () => {
        setMode((prevMode) => (prevMode === 'dark' ? 'light' : 'dark'));
    };

    const setTheme = (newMode: ThemeMode) => {
        setMode(newMode);
    };

    const value = useMemo(
        () => ({
            mode,
            toggleTheme,
            setTheme,
        }),
        [mode]
    );

    return (
        <ThemeContext.Provider value={value}>
            <MuiThemeProvider theme={theme}>
                <CssBaseline />
                {children}
            </MuiThemeProvider>
        </ThemeContext.Provider>
    );
};
