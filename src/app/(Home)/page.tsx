import { HeroSection } from './_components/hero';
import HowItWorks from './_components/HowItWorks';
import WhyChooseUs from './_components/WhyChooseUs';

import { TestimonialSection } from './_components/testimonial';

export default function Home() {
  return (
    <div>
      <>
        <HeroSection />
        <HowItWorks />
        <WhyChooseUs />
        <TestimonialSection />
      </>
    </div>
  );
}
