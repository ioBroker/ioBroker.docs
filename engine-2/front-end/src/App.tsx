import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from './theme';
import AppContent from './app/AppContent';
import React from 'react';

function App(): React.JSX.Element {
    return (
        <ThemeProvider defaultMode="dark">
            <BrowserRouter>
                <AppContent />
            </BrowserRouter>
        </ThemeProvider>
    );
}

export default App;
