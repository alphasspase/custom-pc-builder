'use client';

import React, { useState } from 'react';

import { ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import Image from 'next/image';

interface CategoryProps {
  categories: {
    id: string;
    name: string;
    color?: string;
    hoverColor?: string;
    textColor?: string;
    icon: React.ReactNode;
    image: string;
  }[];
}

export default function CategoryNavigation({ categories }: CategoryProps) {
  const [activeCategory, setActiveCategory] = useState(categories[0]?.id);
  const [hoverCategory, setHoverCategory] = useState<string | null>(null);

  return (
    <div className="w-full max-w-6xl mx-auto">
      <div className="flex flex-wrap gap-3 mb-8">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => setActiveCategory(category.id)}
            onMouseEnter={() => setHoverCategory(category.id)}
            onMouseLeave={() => setHoverCategory(null)}
            className={cn(
              'relative flex items-center gap-3 px-5 py-3 rounded-lg transition-all duration-300 group shadow-md',
              activeCategory === category.id
                ? `bg-primary text-white ${category.color} ${category.textColor} `
                : `bg-white  hover:bg-primary-gray-500 border border-gray-100`,
            )}
            style={{
              transform:
                hoverCategory === category.id
                  ? 'translateY(-3px)'
                  : 'translateY(0)',
              boxShadow:
                hoverCategory === category.id || activeCategory === category.id
                  ? '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)'
                  : '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
            }}
          >
            <div
              className={cn(
                'flex items-center justify-center transition-all duration-300',
                hoverCategory === category.id &&
                  activeCategory !== category.id &&
                  'animate-bounce',
              )}
            >
              {category.icon}
            </div>
            <span className="font-medium">{category.name}</span>
            {activeCategory === category.id && (
              <ChevronRight className="ml-1 w-4 h-4" />
            )}
            {activeCategory === category.id && (
              <span className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-4 h-4 rotate-45" />
            )}
          </button>
        ))}
      </div>

      <div className="relative w-full h-[400px] bg-primary-gray-600 rounded-xl overflow-hidden shadow-xl">
        {categories.map((category) => (
          <div
            key={category.id}
            className={cn(
              'absolute inset-0 w-full h-full transition-all duration-700 flex items-center justify-center',
              activeCategory === category.id
                ? 'opacity-100 z-10 scale-100'
                : 'opacity-0 z-0 scale-95',
            )}
          >
            <Image fill src={category.image} alt={category.name} />
          </div>
        ))}
      </div>
    </div>
  );
}
