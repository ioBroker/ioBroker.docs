import React from 'react';
import { PageMeta } from '../../components/PageMeta';
import { HeroSection } from './sections/HeroSection/HeroSection';
import Divider from '../../components/Divider/Divider';
import { useScrollProgress } from '../../hooks/useScrollProgress';
import { PlatformSection } from './sections/PlatformSection/PlatformSection';
import { DemoSection } from './sections/DemoSection/DemoSection';
import { BenefitsSection } from './sections/BenefitsSection/BenefitsSection';
import { FaqSection } from './sections/FaqSection/FaqSection';
import { AdaptersSection } from './sections/AdaptersSection/AdaptersSection';
import { CommunitySection } from './sections/CommunitySection/CommunitySection';
import { HistorySection } from './sections/HistorySection/HistorySection';
// import { InstallationsSection } from './sections/InstallationsSection/InstallationsSection';

export const HomePage: React.FC = () => {
    const { scrollPosition, sectionRef } = useScrollProgress();

    return (
        <>
            <PageMeta />
            <HeroSection sectionRef={sectionRef} />
            <Divider
                position={scrollPosition}
                parentWidth={window.innerWidth}
                sx={{ marginBottom: '26px', marginTop: '0' }}
            />
            <PlatformSection />
            <DemoSection />
            <AdaptersSection />
            <BenefitsSection />
            <CommunitySection />
            <HistorySection />
            <FaqSection />
            {/*<InstallationsSection />*/}
        </>
    );
};

export default HomePage;
