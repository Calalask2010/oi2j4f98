import { Header } from '@/components/header';
import { HeroSection } from '@/components/hero-section';
import { ServicesSection } from '@/components/services-section';
import { IndustriesSection } from '@/components/industries-section';
import { InteractiveProcess } from '@/components/interactive-process';
import { TestimonialsCarousel } from '@/components/testimonials-carousel';
import { ContactSection } from '@/components/contact-section';
import { EnhancedFooter } from '@/components/enhanced-footer';
import { AnimatedBackground } from '@/components/animated-background';

export default function Home() {
  return (
    <div className="min-h-screen relative">
      <AnimatedBackground />
      <div className="relative z-10">
        <Header />
        <HeroSection />
        <ServicesSection />
        <IndustriesSection />
        <InteractiveProcess />
        <TestimonialsCarousel />
        <ContactSection />
        <EnhancedFooter />
      </div>
    </div>
  );
}
