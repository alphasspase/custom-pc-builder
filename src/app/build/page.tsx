import HeroHighlightSection from '@/components/global/HeroHighlightSection';

import React from 'react';
import CategoryNavigation from './_components/CategoryNavigation';
import { GamepadIcon, Laptop, Monitor } from 'lucide-react';
import { FaComputer } from 'react-icons/fa6';
import PCBuilder from './_components/PCBuilder';
import { PcConfiguration } from '@/lib/api/services/pc_configuration/pc_configuration';
import { SearchParams } from '@/lib/api/services/setup_configuration/type';

const categoriesTab = [
  {
    id: 'computer',
    name: 'Computer',
    image: '/desktop-pc/pc1.png',
    icon: <Monitor className="h-5 w-5" />,
  },
  {
    id: 'desktop pc',
    name: 'desktop pc',
    image: '/desktop-pc/pc2.png',
    icon: <FaComputer className="h-5 w-5" />,
  },
  {
    id: 'laptop',
    name: 'laptop',
    image: '/desktop-pc/pc3.png',
    icon: <Laptop className="h-5 w-5" />,
  },
  {
    id: 'gaming pc',
    name: 'gaming pc',
    image: '/desktop-pc/pc4.png',
    icon: <GamepadIcon className="h-5 w-5" />,
  },
];

const buildPage = async (props: { searchParams: SearchParams }) => {
  const searchParams = await props.searchParams;
  const combinedCategories = await PcConfiguration.getPcComponentsWithPreset(
    searchParams.id ? Number(searchParams.id) : undefined,
  );
  console.log('combinedCategories ---->', combinedCategories);
  const defaultSelectedProducts = combinedCategories?.preset_configuration;
  const categories = combinedCategories?.product_categories;

  return (
    <div>
      <HeroHighlightSection
        title="Why Choose Our Configurator"
        highlight="Our"
        description="Custom-build your perfect PC with our intelligent configurator.
Answer a few questions and let us recommend the best components
for your needs."
      />

      <div className="grid grid-cols-1 gap-5 p-5 md:grid-cols-2">
        <div>
          <CategoryNavigation categories={categoriesTab} />
        </div>
        <div>
          <PCBuilder
            defaultSelectedProducts={defaultSelectedProducts?.components || []}
            defaultSelectedSetupProducts={
              defaultSelectedProducts?.setup_products || []
            }
            productCategories={categories}
          />
        </div>
      </div>
    </div>
  );
};

export default buildPage;
