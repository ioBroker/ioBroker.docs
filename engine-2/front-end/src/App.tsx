import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from './theme';
import AppContent from './app/AppContent';

function App() {
  return (
    <ThemeProvider defaultMode="dark">
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
