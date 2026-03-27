import { HashRouter } from 'react-router-dom';
import { ThemeProvider } from './theme';
import AppContent from './app/AppContent';
import React from 'react';

function App(): React.JSX.Element {
    return (
        <ThemeProvider defaultMode="dark">
            <HashRouter>
                <AppContent />
            </HashRouter>
        </ThemeProvider>
    );
}

export default App;
