import React from 'react';
import { ServicesSection } from './ServicesSection';
import { FleetSection } from './FleetSection';
import { WhyChooseSection } from './WhyChooseSection';
import { InterludeSection } from './InterludeSection';
import { HowItWorksSection } from './HowItWorksSection';
import { CorporateSection } from './CorporateSection';
import { TestimonialsSection } from './TestimonialsSection';
import { Footer } from './Footer';
import { PortalModal } from '../common/PortalModal';

/**
 * Everything below the hero. Loaded as a separate chunk right after first paint so the cinematic
 * hero appears immediately and the initial download stays small.
 */
export const LandingSections: React.FC = () => (
  <>
    <ServicesSection />
    <FleetSection />
    <WhyChooseSection />
    <InterludeSection />
    <HowItWorksSection />
    <CorporateSection />
    <TestimonialsSection />
  </>
);

export const LandingClosing: React.FC = () => (
  <>
    <Footer />
    {/* Portal gateway modal, opened from the navigation and footer */}
    <PortalModal />
  </>
);
