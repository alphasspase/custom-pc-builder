'use client';

import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Cpu, Monitor, HardDrive, Layers, Plug } from 'lucide-react';
import { Button } from '@/components/ui/button';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { Product, ProductCategory } from '@/services/pc_configuration/type';
import Link from 'next/link';
import { URLS } from '@/utils/urls';
import { usePCBuilder } from '@/hooks/usePCBuilder';
import { useEffect, useState } from 'react';
import { BuildPCProductoptionCard } from './BuildPCProductoptionCard';
import { DiscoverMoreCard } from './DiscoverMoreCard';
import { Setup_Product } from '@/lib/api/services/setup_configuration/type';

// Helper function to get component icon
function getComponentIcon(id: string) {
  switch (id) {
    case 'graphics':
      return <Monitor className="size-5" />;
    case 'processor':
      return <Cpu className="size-5" />;
    case 'mainboard':
      return <Layers className="size-5" />;
    case 'ram':
      return <Layers className="size-5" />;
    case 'ssd':
      return <HardDrive className="size-5" />;
    case 'power supply':
      return <Plug className="size-5" />;
    default:
      return null;
  }
}

export default function PCBuilder({
  defaultSelectedProducts = [],
  defaultSelectedSetupProducts = [],
  productCategories: initialProductCategories,
}: {
  defaultSelectedProducts: Product[];
  defaultSelectedSetupProducts: Setup_Product[];
  productCategories: ProductCategory[];
}) {
  const router = useRouter();
  const { selectedProducts, componentsTotal, addProduct, addSetupProduct } =
    usePCBuilder();
  const [productCategories, setProductCategories] = useState<ProductCategory[]>(
    initialProductCategories,
  );

  useEffect(() => {
    // Add products to store
    defaultSelectedProducts.forEach((product) => {
      addProduct(product);
    });

    // Add setup products to store
    defaultSelectedSetupProducts.forEach((setupProduct) => {
      addSetupProduct(setupProduct);
    });
  }, [
    defaultSelectedProducts,
    defaultSelectedSetupProducts,
    addProduct,
    addSetupProduct,
  ]);

  const selectOption = (selectedOption: Product) => {
    addProduct(selectedOption);

    // Update product categories to move selected product to index 0
    setProductCategories((prevCategories) => {
      return prevCategories.map((category) => {
        if (category.name === selectedOption.category) {
          const products = [...category.products];
          const selectedIndex = products.findIndex(
            (p) => p.id === selectedOption.id,
          );

          if (selectedIndex !== -1) {
            // Remove the product from its current position and add it to the beginning
            const [product] = products.splice(selectedIndex, 1);
            products.unshift(product);
          }

          return {
            ...category,
            products,
          };
        }

        return category;
      });
    });
  };

  // Main render
  return (
    <div className="mx-auto max-w-3xl rounded-lg border border-gray-100 bg-gradient-to-b from-white to-gray-50 p-4 shadow-lg">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-800">Build Your PC</h2>
      </div>

      {/* Product Categories Accordion */}
      <Accordion type="single" collapsible className="mb-6">
        {productCategories.map((component, index) => {
          const selectedProduct = selectedProducts.find(
            (item) => item.category === component.name,
          );

          return (
            <motion.div
              key={component.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <AccordionItem
                value={component.name}
                className={cn(
                  'mb-3 overflow-hidden rounded-lg border transition-shadow hover:shadow-md',
                  'data-[state=open]:border-primary/50 data-[state=open]:shadow-md',
                )}
              >
                <AccordionTrigger className="group px-4 py-3 hover:no-underline">
                  <div className="flex w-full items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="relative">
                        <div className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-md border border-gray-200 bg-gradient-to-br from-gray-50 to-gray-100">
                          <motion.div
                            whileHover={{ scale: 1.05 }}
                            transition={{
                              type: 'spring',
                              stiffness: 400,
                              damping: 10,
                            }}
                          >
                            <Image
                              src={selectedProduct?.image || '/noData.jpg'}
                              alt={selectedProduct?.name || 'Pc Builder'}
                              width={60}
                              height={60}
                              className="object-contain"
                            />
                          </motion.div>
                        </div>
                      </div>
                      <div className="text-left">
                        <div className="flex items-center gap-2">
                          <motion.div
                            className="bg-primary/10 text-primary rounded-full p-1"
                            whileHover={{ rotate: 360 }}
                            transition={{ duration: 0.5 }}
                          >
                            {getComponentIcon(component.name.toLowerCase())}
                          </motion.div>
                          <p className="text-sm font-medium text-gray-500 uppercase">
                            {component.name}
                          </p>
                        </div>
                        <p className="font-semibold">{component.description}</p>
                      </div>
                    </div>
                    <motion.div
                      key={selectedProduct?.price}
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mr-4 font-semibold"
                    >
                      {selectedProduct?.price} €
                    </motion.div>
                  </div>
                </AccordionTrigger>

                <AccordionContent className="data-[state=open]:animate-accordion-down data-[state=closed]:animate-accordion-up border-t border-gray-200 bg-gray-50 px-4 pt-4 pb-6">
                  <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                    {component.products &&
                      component.products
                        .slice(0, 3)
                        .map((option) => (
                          <BuildPCProductoptionCard
                            key={option.id}
                            option={option}
                            isSelected={selectedProducts
                              .map((item) => item.id)
                              .includes(option.id)}
                            onSelect={selectOption}
                          />
                        ))}
                    <DiscoverMoreCard
                      componentName={component.name}
                      componentDescription={component.description}
                      selectOption={selectOption}
                    />
                  </div>
                </AccordionContent>
              </AccordionItem>
            </motion.div>
          );
        })}
      </Accordion>

      {/* Summary and Actions */}
      <motion.div
        className="mt-8 border-t border-gray-200 pt-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
      >
        <div className="mb-2 flex items-center justify-between">
          <span className="text-gray-500">incl. VAT plus shipping</span>
          <motion.span
            key={componentsTotal}
            initial={{ scale: 1.2, color: '#4F46E5' }}
            animate={{ scale: 1, color: '#1F2937' }}
            transition={{ duration: 0.5 }}
            className="text-xl font-bold"
          >
            {componentsTotal.toFixed(2)} €
          </motion.span>
        </div>
        <div className="mb-6 flex items-center justify-between">
          <span className="text-sm text-gray-500">35 days delivery time</span>
          <span className="text-sm text-gray-500">incl. VAT plus shipping</span>
        </div>

        <div className="flex gap-4">
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex-1"
          >
            <Button
              onClick={() => router.back()}
              variant="outline"
              className="w-full"
            >
              Back
            </Button>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex-1"
          >
            <Link href={URLS.component}>
              <Button className="w-full">Further</Button>
            </Link>
          </motion.div>
        </div>

        <div className="mt-4 flex justify-end gap-4">
          <motion.div
            whileHover={{ scale: 1.1 }}
            className="flex h-6 w-12 items-center justify-center rounded bg-gray-200 text-xs font-medium"
          >
            shop
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.1 }}
            className="flex h-6 w-12 items-center justify-center rounded bg-gray-800 text-xs font-medium text-white"
          >
            VISA
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
