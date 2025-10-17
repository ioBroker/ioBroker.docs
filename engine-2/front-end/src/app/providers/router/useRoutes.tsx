import { Routes, Route } from 'react-router-dom';
import { HomePage } from '../../../pages/HomePage';

export const useRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<HomePage />} />
        </Routes>
    );
};
