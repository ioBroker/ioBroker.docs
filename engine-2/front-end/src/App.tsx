import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from './theme';
import AppContent from './app/AppContent';

export default function App() {
    return (
        <ThemeProvider defaultMode="dark">
            <BrowserRouter>
                <AppContent />
            </BrowserRouter>
        </ThemeProvider>
    );
}
