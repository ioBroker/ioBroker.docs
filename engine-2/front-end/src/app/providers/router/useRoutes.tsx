import { Routes, Route} from 'react-router-dom';

export const useRoutes = () => {
    
    return (
        <Routes>
            <Route path="/" element={<div>Главная страница</div>} />
        </Routes>
    );
};
