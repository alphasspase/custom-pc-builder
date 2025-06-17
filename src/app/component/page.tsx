import HeroHighlightSection from '@/components/global/HeroHighlightSection';
import React from 'react';
import ProductCarousel from './_components/ProductCarousel';
import WorkspaceConfigurator from './_components/WorkspaceConfigurator';
import { SetupConfiguration } from '@/lib/api/services/setup_configuration/setup_configuration';

const ComponentPage = async () => {
  // Fetch all product sections with error handling
  const productSectionsData =
    await SetupConfiguration.getCategoriesWithProduct();

  return (
    <div className="relative">
      <HeroHighlightSection
        title="Setup Configurator"
        highlight="Our"
        description="Custom-build your perfect PC with our intelligent configurator.\n   Answer a few questions and let us recommend the best components\n   for your needs."
      />
      <div className="grid grid-cols-1 gap-5 p-5 md:grid-cols-3 lg:gap-8">
        <div className="col-span-2 space-y-5">
          {productSectionsData.map((section, index) => (
            <ProductCarousel key={section.id || index} {...section} />
          ))}
        </div>
        <div>
          <WorkspaceConfigurator />
        </div>
      </div>
    </div>
  );
};

export default ComponentPage;
