import { HashRouter } from 'react-router-dom';
import { ThemeProvider } from './theme';
import AppContent from './app/AppContent';

function App() {
    return (
        <ThemeProvider defaultMode="dark">
            <HashRouter>
                <AppContent />
            </HashRouter>
        </ThemeProvider>
    );
}

export default App;
