import { Routes, Route } from 'react-router-dom';
import { HomePage } from '../../../pages/HomePage';
import InstallationPage from '../../../pages/InstallationPage/InstallationPage';
import AdaptersPage from '../../../pages/AdaptersPage/AdaptersPage';

export const useRoutes = (): React.ReactElement => {
    return (
        <Routes>
            <Route
                path="/"
                element={<HomePage />}
            />
            <Route
                path="/installation"
                element={<InstallationPage />}
            />
            <Route
                path="/adapters"
                element={<AdaptersPage />}
            />
        </Routes>
    );
};
