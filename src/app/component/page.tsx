import HeroHighlightSection from '@/components/global/HeroHighlightSection';
import React from 'react';
import ProductCarousel from './_components/ProductCarousel';
import WorkspaceConfigurator from './_components/WorkspaceConfigurator';
import { SetupConfiguration } from '@/lib/api/services/setup_configuration/setup_configuration';

const ComponentPage = async () => {
  const categories = await SetupConfiguration.getCategoriesWithProduct();

  // Fetch data for all sections in parallel
  const productSections = await Promise.all(
    categories.map(async (section) => {
      if (!section.id) return section;

      const response = await SetupConfiguration.getSetupProductByFilters({
        category: section.id,
        page_size: 6,
      });

      return {
        ...section,
        products: response.results.map((product) => ({
          ...product,
          title: product.name, // Map name to title for compatibility
        })),
      };
    }),
  );

  return (
    <div className="relative">
      <HeroHighlightSection
        title="Setup Configurator"
        highlight="Our"
        description="Custom-build your perfect PC with our intelligent configurator.
   Answer a few questions and let us recommend the best components
   for your needs."
      />
      <div className="grid grid-cols-1 gap-5 p-5 md:grid-cols-3 lg:gap-8">
        <div className="col-span-2 space-y-5">
          {productSections.map((product, index) => (
            <ProductCarousel
              key={index}
              title={product.title}
              description={product.description}
              products={product.products}
            />
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
