import { BenefitsSection } from './_components/benefits';
import { CommunitySection } from './_components/community';
import { ContactSection } from './_components/contact';
import { FAQSection } from './_components/faq';
import { FeaturesSection } from './_components/features';
import { FooterSection } from './_components/footer';
import { HeroSection } from './_components/hero';
import { PricingSection } from './_components/pricing';
import { ServicesSection } from './_components/services';
import { SponsorsSection } from './_components/sponsors';
import { TeamSection } from './_components/team';
import { TestimonialSection } from './_components/testimonial';

export default function Home() {
  return (
    <div>
      <>
        <HeroSection />
        <SponsorsSection />
        <BenefitsSection />
        <FeaturesSection />
        <ServicesSection />
        <TestimonialSection />
        <TeamSection />
        <CommunitySection />
        <PricingSection />
        <ContactSection />
        <FAQSection />
        <FooterSection />
      </>
    </div>
  );
}
