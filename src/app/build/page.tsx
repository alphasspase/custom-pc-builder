import HeroHighlightSection from '@/components/global/HeroHighlightSection';

import React from 'react';
import CategoryNavigation from './_components/CategoryNavigation';
import { GamepadIcon, Laptop, Monitor } from 'lucide-react';
import { FaComputer } from 'react-icons/fa6';
import PCBuilder from './_components/PCBuilder';
import { PcConfiguration } from '@/services/pc_configuration/pc_configuration';

const categories = [
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

const buildPage = async () => {
  const response = await PcConfiguration.getProductCategories();

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
          <CategoryNavigation categories={categories} />
        </div>
        <div>
          <PCBuilder productCategories={response} />
        </div>
      </div>
    </div>
  );
};

export default buildPage;
