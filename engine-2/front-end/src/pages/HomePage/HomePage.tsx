import React from 'react';
import { HeroSection } from './sections/HeroSection/HeroSection';
import Divider from '../../components/Divider/Divider';
import { useScrollProgress } from '../../hooks/useScrollProgress';
import { PlatformSection } from './sections/PlatformSection/PlatformSection';
import { AdaptersSection } from './sections/AdaptersSection/AdaptersSection';
import { AboutSection } from './sections/AboutSection/AboutSection';
import { CommunitySection } from './sections/CommunitySection/CommunitySection';
import { HistorySection } from './sections/HistorySection/HistorySection';
import { InstallationsSection } from './sections/InstallationsSection/InstallationsSection';
import { NewsletterSection } from './sections/NewsletterSection/NewsletterSection';

export const HomePage: React.FC = () => {
    const { scrollPosition, sectionRef } = useScrollProgress();

    return (
        <>
            <HeroSection sectionRef={sectionRef} />
            <Divider
                position={scrollPosition}
                parentWidth={window.innerWidth}
                sx={{ marginBottom: '26px', marginTop: '0' }}
            />
            <PlatformSection />
            <AdaptersSection />
            <AboutSection />
            <CommunitySection />
            <HistorySection />
            <InstallationsSection />
            <NewsletterSection />
        </>
    );
};

export default HomePage;
