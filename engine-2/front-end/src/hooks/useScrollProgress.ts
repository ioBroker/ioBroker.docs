import { useState, useEffect, useRef, type RefObject } from 'react';

interface UseScrollProgressReturn {
    scrollPosition: number;
    sectionRef: RefObject<HTMLElement | null>;
}

export const useScrollProgress = (): UseScrollProgressReturn => {
    const [scrollPosition, setScrollPosition] = useState(0);
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const handleScroll = () => {
            if (!sectionRef.current) return;

            const rect = sectionRef.current.getBoundingClientRect();
            const sectionTop = rect.top;
            const sectionHeight = rect.height;
            const viewportHeight = window.innerHeight;

            if (sectionTop >= viewportHeight) {
                setScrollPosition(0);
                return;
            }

            if (sectionTop + sectionHeight <= 0) {
                setScrollPosition(100);
                return;
            }

            const scrollableDistance = sectionHeight;
            const scrolled = Math.max(0, -sectionTop);
            const percent = (scrolled / scrollableDistance) * 100;

            setScrollPosition(Math.min(100, Math.max(0, Math.round(percent))));
        };

        window.addEventListener('scroll', handleScroll);
        window.addEventListener('resize', handleScroll);
        handleScroll();

        return () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('resize', handleScroll);
        };
    }, []);

    return { scrollPosition, sectionRef };
};
