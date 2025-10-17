
import React from 'react';
import { HeroSection } from './sections/HeroSection/HeroSection';
import { PlatformSection } from './sections/PlatformSection/PlatformSection';
import { AdaptersSection } from './sections/AdaptersSection/AdaptersSection';
import { AboutSection } from './sections/AboutSection/AboutSection';
import { CommunitySection } from './sections/CommunitySection/CommunitySection';
import { HistorySection } from './sections/HistorySection/HistorySection';
import { InstallationsSection } from './sections/InstallationsSection/InstallationsSection';
import { NewsletterSection } from './sections/NewsletterSection/NewsletterSection';

export const HomePage: React.FC = () => {
    return (
        <>
            <HeroSection />
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
