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
    <div className="mx-auto w-full max-w-6xl">
      <div className="mb-8 flex flex-wrap gap-3">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => setActiveCategory(category.id)}
            onMouseEnter={() => setHoverCategory(category.id)}
            onMouseLeave={() => setHoverCategory(null)}
            className={cn(
              'group relative flex items-center gap-3 rounded-lg px-5 py-3 shadow-md transition-all duration-300',
              activeCategory === category.id
                ? `bg-primary text-white ${category.color} ${category.textColor} `
                : `hover:bg-primary-gray-500 border border-gray-100 bg-white`,
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
              <ChevronRight className="ml-1 h-4 w-4" />
            )}
            {activeCategory === category.id && (
              <span className="absolute -bottom-2 left-1/2 h-4 w-4 -translate-x-1/2 rotate-45 transform" />
            )}
          </button>
        ))}
      </div>

      <div className="bg-primary-gray-600 relative h-[400px] w-full overflow-hidden rounded-xl shadow-xl">
        {categories.map((category) => (
          <div
            key={category.id}
            className={cn(
              'absolute inset-0 flex h-full w-full items-center justify-center transition-all duration-700',
              activeCategory === category.id
                ? 'z-10 scale-100 opacity-100'
                : 'z-0 scale-95 opacity-0',
            )}
          >
            <Image fill src={category.image} alt={category.name} />
          </div>
        ))}
      </div>
    </div>
  );
}
