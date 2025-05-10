'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Check, Cpu, Monitor, HardDrive, Layers, Plug } from 'lucide-react';
import { Button } from '@/components/ui/button';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { getBaseUrl } from '@/utils/env';
import {
  Product,
  ProductCategory,
} from '@/lib/api/services/pc_configuration/type';
import Link from 'next/link';
import { URLS } from '@/utils/urls';

export default function PCBuilder({
  defaultSelectedProducts = [],
  productCategories,
}: {
  defaultSelectedProducts: Product[];
  productCategories: ProductCategory[];
}) {
  console.log('productCategories --->', productCategories);
  console.log('defaultSelectedProducts --->', defaultSelectedProducts);
  const router = useRouter();

  const [total, setTotal] = useState<number>(0);

  const [selectedProducts, setSelectedProducts] = useState<Product[]>(
    defaultSelectedProducts,
  );

  const selectOption = (selectedOption: Product) => {
    setSelectedProducts((prev) => {
      // Check if a product with the same category already exists
      const existingProductIndex = prev.findIndex(
        (item) => item.category === selectedOption.category,
      );

      if (existingProductIndex !== -1) {
        // Replace the existing product with the new one
        return [
          ...prev.slice(0, existingProductIndex),
          selectedOption,
          ...prev.slice(existingProductIndex + 1),
        ];
      } else {
        // Add the new product if no product with the same category exists
        return [...prev, selectedOption];
      }
    });
  };
  useEffect(() => {
    const totalPrice = selectedProducts.reduce((acc, product) => {
      const price = parseFloat(product.price);

      return acc + (isNaN(price) ? 0 : price);
    }, 0);
    setTotal(totalPrice);
  }, [selectedProducts]);

  // Helper function to get component icon
  const getComponentIcon = (id: string) => {
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
  };

  return (
    <div className="mx-auto max-w-3xl rounded-lg border border-gray-100 bg-gradient-to-b from-white to-gray-50 p-4 shadow-lg">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-800">Build Your PC</h2>
        {/* <div className="flex items-center gap-2">
          <div className="text-sm font-medium text-gray-500">
            {completionPercentage}% Complete
          </div>
          <div className="h-2 w-32 overflow-hidden rounded-full bg-gray-200">
            <motion.div
              className="bg-primary h-full"
              initial={{ width: 0 }}
              animate={{ width: `${completionPercentage}%` }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
            />
          </div>
        </div> */}
      </div>

      {/* RAM, SSD, and PSU with Accordion */}
      <Accordion type="single" collapsible className="mb-6">
        {productCategories.map((component, index) => (
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
                            src={
                              selectedProducts.find(
                                (item) => item.category === component.name,
                              )?.image || '/noData.jpg'
                            }
                            alt={component.name}
                            width={60}
                            height={60}
                            className="object-contain"
                          />
                        </motion.div>
                      </div>
                      {/* {component.recommended && (
                        <Badge className="absolute -top-2 -right-2 scale-75 bg-amber-500 hover:bg-amber-500">
                          <Award className="mr-1 size-3" /> Best
                        </Badge>
                      )} */}
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
                    key={component.id}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mr-4 font-semibold"
                  >
                    {
                      selectedProducts.find(
                        (item) => item.category === component.name,
                      )?.price
                    }{' '}
                    €
                  </motion.div>
                </div>
              </AccordionTrigger>

              <AccordionContent className="data-[state=open]:animate-accordion-down data-[state=closed]:animate-accordion-up border-t border-gray-200 bg-gray-50 px-4 pt-4 pb-6">
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                  {component.products?.map((option) => (
                    <motion.div
                      key={option.id}
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => selectOption(option)}
                      className={cn(
                        'relative flex cursor-pointer flex-col items-center rounded-lg p-3 transition-all',
                        selectedProducts
                          .map((item) => item.id)
                          .includes(option.id)
                          ? 'bg-primary/10 border-primary border-2 shadow-[0_0_10px_rgba(79,70,229,0.2)]'
                          : 'border-2 border-gray-200 bg-white hover:border-gray-300',
                      )}
                    >
                      <div className="mb-2 flex h-16 w-16 items-center justify-center rounded-md bg-white">
                        <Image
                          src={
                            option.image
                              ? `${getBaseUrl()}${option.image}`
                              : '/placeholder.svg'
                          }
                          alt={option.name}
                          width={60}
                          height={60}
                          className="object-contain"
                        />
                      </div>
                      <p className="text-center text-sm font-medium">
                        {option.name}
                      </p>
                      <p className="text-sm font-bold">{option.price} €</p>

                      {selectedProducts
                        .map((item) => item.id)
                        .includes(option.id) && (
                        <motion.div
                          className="bg-primary absolute top-2 left-2 rounded-full p-1 text-white"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{
                            type: 'spring',
                            stiffness: 500,
                            damping: 15,
                          }}
                        >
                          <Check size={14} />
                        </motion.div>
                      )}
                    </motion.div>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          </motion.div>
        ))}
      </Accordion>

      <motion.div
        className="mt-8 border-t border-gray-200 pt-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
      >
        <div className="mb-2 flex items-center justify-between">
          <span className="text-gray-500">incl. VAT plus shipping</span>
          <motion.span
            key={total}
            initial={{ scale: 1.2, color: '#4F46E5' }}
            animate={{ scale: 1, color: '#1F2937' }}
            transition={{ duration: 0.5 }}
            className="text-xl font-bold"
          >
            {total.toFixed(2)} €
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
