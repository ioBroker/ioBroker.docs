import { Routes, Route } from 'react-router-dom';
import { HomePage } from '../../../pages/HomePage';
import InstallationPage from '../../../pages/InstallationPage/InstallationPage';
import AdaptersPage from '../../../pages/AdaptersPage/AdaptersPage';
import DocsPage from '../../../pages/DocsPage/DocsPage';
import AdapterPage from "../../../pages/AdapterPage/AdapterPage";
import { DocPage } from '../../../pages/DocPage/DocPage';

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
            <Route
                path="/adapters/:adapterId"
                element={<AdapterPage />}
            />
            <Route
                path="/docs"
                element={<DocsPage />}
            />
            <Route
                path="/docs/*"
                element={<DocsPage />}
            />
        </Routes>
    );
};
