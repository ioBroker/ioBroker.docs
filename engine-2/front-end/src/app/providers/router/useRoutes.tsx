import { Routes, Route } from 'react-router-dom';
import { HomePage } from '../../../pages/HomePage';
import InstallationPage from '../../../pages/InstallationPage/InstallationPage'

export const useRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/installation" element={<InstallationPage />} />
        </Routes>
    );
};
