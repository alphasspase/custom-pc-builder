import HeroHighlightSection from '@/components/global/HeroHighlightSection';
import React from 'react';
import ProductCarousel from './_components/ProductCarousel';
import WorkspaceConfigurator from './_components/WorkspaceConfigurator';

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
        <div className="col-span-2 bg-white rounded-lg border p-6 shadow-sm ">
          <ProductCarousel />
        </div>
        <div>
          <WorkspaceConfigurator />
        </div>
      </div>
    </div>
  );
};

export default componentPage;
