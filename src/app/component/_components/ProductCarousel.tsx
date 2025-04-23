'use client';
import { motion } from 'framer-motion';
import { ProductCarousalProps } from '../type';
import ProductBanner from './ProductBanner';

export default function ProductCarousel({
  products,
  title,
  description,
}: ProductCarousalProps) {
  return (
    <div className="relative rounded-lg border bg-white p-6 shadow-sm">
      <div className="relative mx-auto max-w-7xl">
        <div className="mb-12 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h3>{title}</h3>
            <p className="text-muted-foreground mx-auto max-w-2xl text-lg">
              {description}
            </p>
          </motion.div>
        </div>

        <ProductBanner
          title={title}
          description={description}
          products={products}
        />
      </div>
    </div>
  );
}
