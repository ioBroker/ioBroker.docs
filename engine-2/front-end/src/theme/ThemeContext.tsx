import { createContext, useContext, useState, useMemo, type ReactNode } from 'react';
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
    const [mode, setMode] = useState<ThemeMode>(() => {
        const savedTheme = window.localStorage.getItem('theme') as ThemeMode;
        return savedTheme || defaultMode;
    });

    const theme = useMemo(() => (mode === 'dark' ? darkTheme : lightTheme), [mode]);

    const toggleTheme = () => {
        setMode((prevMode) => {
            const newMode = prevMode === 'dark' ? 'light' : 'dark';
            window.localStorage.setItem('theme', newMode);
            return newMode;
        });
    };

    const setTheme = (newMode: ThemeMode) => {
        window.localStorage.setItem('theme', newMode);
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
