import HeroHighlightSection from '@/components/global/HeroHighlightSection';

import React from 'react';
import CategoryNavigation from './_components/CategoryNavigation';
import { GamepadIcon, Laptop, Monitor } from 'lucide-react';
import { FaComputer } from 'react-icons/fa6';

const categories = [
  {
    id: 'computer',
    name: 'Computer',
    image: '/desktop-pc/pc1.png',
    icon: <Monitor className="w-5 h-5" />,
  },
  {
    id: 'desktop pc',
    name: 'desktop pc',
    image: '/desktop-pc/pc2.png',
    icon: <FaComputer className="w-5 h-5" />,
  },
  {
    id: 'laptop',
    name: 'laptop',
    image: '/desktop-pc/pc3.png',
    icon: <Laptop className="w-5 h-5" />,
  },
  {
    id: 'gaming pc',
    name: 'gaming pc',
    image: '/desktop-pc/pc4.png',
    icon: <GamepadIcon className="w-5 h-5" />,
  },
];

const buildPage = () => {
  return (
    <div>
      <HeroHighlightSection
        title="Why Choose Our Configurator"
        highlight="Our"
        description="Custom-build your perfect PC with our intelligent configurator.
Answer a few questions and let us recommend the best components
for your needs."
      />

      <div className="grid grid-cols-1 md:grid-cols-2  gap-5 p-5">
        <div>
          <CategoryNavigation categories={categories} />
        </div>
        <div>b</div>
      </div>
    </div>
  );
};

export default buildPage;
