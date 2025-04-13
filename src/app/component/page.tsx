import HeroHighlightSection from '@/components/global/HeroHighlightSection';
import React from 'react';
import ProductCarousel from './_components/ProductCarousel';
import WorkspaceConfigurator from './_components/WorkspaceConfigurator';
import { chair_products, peripheralProducts, products } from '.';

const componentPage = () => {
  return (
    <div className="relative">
      <HeroHighlightSection
        title="Setup Configurator"
        highlight="Our"
        description="Custom-build your perfect PC with our intelligent configurator.
   Answer a few questions and let us recommend the best components
   for your needs."
      />
      <div className=" grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-8 p-5">
        {/* sub grid */}
        <div className="col-span-2 space-y-5">
          <ProductCarousel
            title="Choose Your Perfect Desk"
            description="Elevate your workspace with our premium desk options designed for
              comfort and productivity"
            products={products}
          />
          <ProductCarousel
            title="Find Your Ultimate Chair Experience"
            description="Discover chairs crafted with precision, offering superior comfort, ergonomic support, and sleek design to elevate your workspace."
            products={chair_products}
          />
          <ProductCarousel
            title="Revolutionize Your Setup with Premium Peripherals"
            description="Discover top-tier accessories—from gaming gear to advanced audio solutions—designed to boost productivity and elevate your immersive experience."
            products={peripheralProducts}
          />
        </div>
        {/* sub grid */}
        <div>
          <WorkspaceConfigurator />
        </div>
      </div>
    </div>
  );
};

export default componentPage;
