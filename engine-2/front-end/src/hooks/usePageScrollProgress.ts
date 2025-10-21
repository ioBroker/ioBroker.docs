import { useState, useEffect } from 'react';

interface UsePageScrollProgressReturn {
    scrollPosition: number;
}

export const usePageScrollProgress = (): UsePageScrollProgressReturn => {
    const [scrollPosition, setScrollPosition] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const viewWindowHeight = window.innerHeight;
            const totalPageHeight = document.documentElement.scrollHeight;
            const scrollTop = window.scrollY || document.documentElement.scrollTop;

            const scrollHeight = totalPageHeight - viewWindowHeight;
            const scrolledPercent = scrollHeight > 0 ? Math.round((scrollTop / scrollHeight) * 100) : 0;
            
            setScrollPosition(Math.min(100, Math.max(0, scrolledPercent)));
        };

        window.addEventListener('scroll', handleScroll);
        window.addEventListener('resize', handleScroll);
        handleScroll(); 
        
        return () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('resize', handleScroll);
        };
    }, []);

    return { scrollPosition };
};
