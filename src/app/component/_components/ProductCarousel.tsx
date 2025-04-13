'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Carousel,
  CarouselContent,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { ProductCard } from './ProductCard';
import { ProductOption } from '../type';

export default function ProductCarousel({
  products,
  title,
  description,
}: {
  title: string;
  description: string;
  products: ProductOption[];
}) {
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="relative bg-white rounded-lg border p-6 shadow-sm ">
      <div className="relative mx-auto max-w-7xl">
        <div className="mb-12 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h3>{title}</h3>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              {description}
            </p>
          </motion.div>
        </div>

        <Carousel
          opts={{ align: 'start', loop: true }}
          className="w-full relative"
        >
          <CarouselContent className="-ml-2 md:-ml-4">
            {products.map((product, index) => (
              <ProductCard
                key={product.id}
                product={product}
                isSelected={selectedProduct === product.id}
                onSelect={setSelectedProduct}
                mounted={mounted}
                index={index}
              />
            ))}
          </CarouselContent>
          <div className="absolute top-1/2 left-1/2 bg-amber-300 z-40 transform -translate-x-1/2 w-full flex items-center justify-center gap-2">
            <CarouselPrevious className="ms-3" />
            <CarouselNext className="me-3" />
          </div>
        </Carousel>

        <AnimatePresence>
          {selectedProduct && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="mt-12 text-center"
            >
              {/* Insert additional details for the selected product if needed */}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
