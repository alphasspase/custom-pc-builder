'use client';
import { motion } from 'framer-motion';
import { Search } from 'lucide-react';
import PcComponentModal from './PcComponentModal';
import { Product } from '@/lib/api/services/pc_configuration/type';
import { usePCBuilder } from '@/hooks/usePCBuilder';

interface DiscoverMoreCardProps {
  componentName: string;
  componentDescription: string;
}

export function DiscoverMoreCard({
  componentName = 'PC Components',
  componentDescription = 'Browse all available PC components',
}: DiscoverMoreCardProps) {
  const { addProduct } = usePCBuilder();

  const handleProductSelect = (product: Product) => {
    addProduct(product);
  };

  const CardContent = (
    <motion.div
      whileHover={{
        scale: 1.05,
        boxShadow: '0 0 25px rgba(79,70,229,0.4)',
      }}
      whileTap={{ scale: 0.97 }}
      className="from-primary/5 via-primary/10 to-primary/5 hover:border-primary border-primary/30 group relative flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed bg-gradient-to-br p-3 transition-all"
    >
      <motion.div
        initial={{ y: 0 }}
        animate={{ y: [-4, 4, -4] }}
        transition={{
          duration: 2.5,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="relative mb-4"
      >
        <div className="relative flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-xl">
          <motion.div
            animate={{
              rotate: [0, 10, -10, 10, 0],
              scale: [1, 1.1, 1, 1.1, 1],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="text-primary relative z-10"
          >
            <Search className="size-8" />
          </motion.div>
          <div className="bg-primary/20 absolute inset-0 rounded-full blur-md" />
        </div>
        <div className="from-primary/20 absolute -inset-4 -z-10 rounded-full bg-gradient-to-b to-transparent blur-xl" />
      </motion.div>
      <p className="text-primary/90 group-hover:text-primary mb-1 text-center text-lg font-bold">
        Discover More
      </p>
      <motion.div
        className="from-primary/20 to-primary/20 absolute inset-0 -z-10 rounded-lg bg-gradient-to-br via-transparent opacity-0 blur-xl transition-opacity duration-300 group-hover:opacity-100"
        initial={false}
      />
      <motion.div
        className="absolute -inset-1 -z-20"
        initial={{ opacity: 0, scale: 0.8 }}
        whileHover={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        <div className="from-primary/20 via-primary/30 to-primary/20 h-full w-full rounded-lg bg-gradient-to-r blur-xl" />
      </motion.div>
    </motion.div>
  );

  return (
    <PcComponentModal
      products={[]}
      categoryName={componentName}
      componentDescription={componentDescription}
      onProductSelect={handleProductSelect}
    >
      {CardContent}
    </PcComponentModal>
  );
}
