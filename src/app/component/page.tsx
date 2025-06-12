import HeroHighlightSection from '@/components/global/HeroHighlightSection';
import React from 'react';
import ProductCarousel from './_components/ProductCarousel';
import WorkspaceConfigurator from './_components/WorkspaceConfigurator';
import { SetupConfiguration } from '@/lib/api/services/setup_configuration/setup_configuration';
import { ProductSectionData } from './types';

const productsCardData: ProductSectionData[] = [
  {
    title: 'Choose Your Perfect Desk',
    description:
      'Elevate your workspace with our premium desk options designed for comfort and productivity',
    category: 1, // desk category
    products: null,
  },
  {
    title: 'Find Your Ultimate Chair Experience',
    description:
      'Discover chairs crafted with precision, offering superior comfort, ergonomic support, and sleek design to elevate your workspace.',
    category: 2, // chair category
    products: null,
  },
  {
    title: 'Revolutionize Your Setup with Premium Peripherals',
    description:
      'Discover top-tier accessories—from gaming gear to advanced audio solutions—designed to boost productivity and elevate your immersive experience.',
    category: 3, // peripherals category
    products: null,
  },
];

const ComponentPage = async () => {
  // Fetch data for all sections in parallel
  const productSections = await Promise.all(
    productsCardData.map(async (section) => {
      if (!section.category) return section;

      const response = await SetupConfiguration.getSetupProductByFilters({
        category: section.category,
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
  console.log('productSections --->', productSections);

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
