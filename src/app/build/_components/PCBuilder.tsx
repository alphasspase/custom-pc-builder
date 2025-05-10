'use client';

import { useState } from 'react';
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

const productCategories = [
  {
    id: 1,
    name: 'graphics',
    icon: 'abc',
    description: 'graphic Detail',
    products: [
      {
        id: 11,
        category: 'graphics',
        name: 'Nvidia RTX 5070 Graphics Card',
        description: 'Nvidia RTX 5070 Graphics Card',
        price: '55.00',
        stock: 4,
        image: '/media/product_image/graphic-card.jpg',
      },
      {
        id: 12,
        category: 'graphics',
        name: 'Nvidia RTX 3060',
        description: 'Nvidia RTX 3060',
        price: '899.00',
        stock: 44,
        image: '/media/product_image/graphic-card1.jpg',
      },
      {
        id: 13,
        category: 'graphics',
        name: 'Nvidia RTX 4070',
        description: 'Nvidia RTX 4070',
        price: '899.00',
        stock: 3,
        image: '/media/product_image/graphic-card2.jpg',
      },
      {
        id: 14,
        category: 'graphics',
        name: 'AMD Radeon RX 7800 XT',
        description: 'AMD Radeon RX 7800 XT',
        price: '899.00',
        stock: 4,
        image: '/media/product_image/graphic-card3.jpg',
      },
      {
        id: 15,
        category: 'graphics',
        name: 'Nvidia RTX 5070',
        description: 'Nvidia RTX 5070',
        price: '44.00',
        stock: 3,
        image: '/media/product_image/graphic-card4.jpg',
      },
      {
        id: 40,
        category: 'graphics',
        name: 'N vida',
        description: 'N vida',
        price: '25.00',
        stock: 325,
        image: null,
      },
    ],
  },
  {
    id: 2,
    name: 'processor',
    icon: 'processor',
    description: 'processor',
    products: [
      {
        id: 16,
        category: 'processor',
        name: 'AMD Ryzen 9',
        description: 'AMD Ryzen 9',
        price: '778.00',
        stock: 66677,
        image: null,
      },
      {
        id: 17,
        category: 'processor',
        name: 'AMD Ryzen 3',
        description: 'AMD Ryzen 3',
        price: '5780.00',
        stock: 7,
        image: '/media/product_image/processor1.jpg',
      },
      {
        id: 18,
        category: 'processor',
        name: 'AMD Ryzen 5',
        description: 'AMD Ryzen 5',
        price: '5678.00',
        stock: 88,
        image: '/media/product_image/processor2.jpg',
      },
      {
        id: 19,
        category: 'processor',
        name: 'AMD Ryzen 7',
        description: 'AMD Ryzen 7',
        price: '8889.00',
        stock: 6,
        image: '/media/product_image/processor3.jpg',
      },
      {
        id: 20,
        category: 'processor',
        name: 'AMD Ryzen 9',
        description: 'AMD Ryzen 9',
        price: '782.00',
        stock: 4,
        image: '/media/product_image/processor4.jpg',
      },
    ],
  },
  {
    id: 3,
    name: 'mainboard',
    icon: 'mainboard',
    description: 'mainboard',
    products: [
      {
        id: 21,
        category: 'mainboard',
        name: 'ANUS ROG STRAX X670E',
        description: 'ANUS ROG STRAX X670E',
        price: '6788.00',
        stock: 2,
        image: '/media/product_image/motherboard.jpg',
      },
      {
        id: 22,
        category: 'mainboard',
        name: 'MSI B450 Tomahawk',
        description: 'MSI B450 Tomahawk',
        price: '8778.00',
        stock: 77,
        image: '/media/product_image/motherboard1.jpg',
      },
      {
        id: 23,
        category: 'mainboard',
        name: 'ASRock X570 Phantom Gaming',
        description: 'ASRock X570 Phantom Gaming',
        price: '99.00',
        stock: 9,
        image: '/media/product_image/motherboard2.jpg',
      },
      {
        id: 24,
        category: 'mainboard',
        name: 'Gigabyte X670 Horus Elite',
        description: 'Gigabyte X670 Horus Elite',
        price: '69976.00',
        stock: 44,
        image: '/media/product_image/motherboard3.jpg',
      },
      {
        id: 25,
        category: 'mainboard',
        name: 'ANUS ROG STRAX X670E',
        description: 'ANUS ROG STRAX X670E',
        price: '6785.00',
        stock: 16,
        image: '/media/product_image/motherboard4.jpg',
      },
    ],
  },
  {
    id: 4,
    name: 'RAM',
    icon: 'ram',
    description: 'ram',
    products: [
      {
        id: 26,
        category: 'RAM',
        name: '64GB DDR5',
        description: '64GB DDR5',
        price: '788.00',
        stock: 6,
        image: '/media/product_image/ram.jpg',
      },
      {
        id: 27,
        category: 'RAM',
        name: '16GB DDR32',
        description: '16GB DDR32',
        price: '7875.00',
        stock: 7,
        image: '/media/product_image/ram1.jpg',
      },
      {
        id: 28,
        category: 'RAM',
        name: '32GB DDR5',
        description: '32GB DDR5',
        price: '9865.00',
        stock: 66,
        image: '/media/product_image/ram2.jpg',
      },
      {
        id: 29,
        category: 'RAM',
        name: '64GB DDR2',
        description: '64GB DDR2',
        price: '7654.00',
        stock: 66,
        image: '/media/product_image/ram4.jpg',
      },
      {
        id: 30,
        category: 'RAM',
        name: '128GB DDR5',
        description: '128GB DDR5',
        price: '6567.00',
        stock: 66,
        image: '/media/product_image/ram5.jpg',
      },
    ],
  },
  {
    id: 5,
    name: 'SSD',
    icon: 'SSD',
    description: 'SSD',
    products: [
      {
        id: 31,
        category: 'SSD',
        name: '2TB Samsung SSD',
        description: '2TB Samsung SSD',
        price: '64467.00',
        stock: 77,
        image: '/media/product_image/storage.png',
      },
      {
        id: 32,
        category: 'SSD',
        name: '500GB Samsung SSD',
        description: '500GB Samsung SSD',
        price: '8545.00',
        stock: 44,
        image: '/media/product_image/storage1.png',
      },
      {
        id: 33,
        category: 'SSD',
        name: '1TB Samsung SSD',
        description: '1TB Samsung SSD',
        price: '7773.00',
        stock: 33,
        image: '/media/product_image/storage2.png',
      },
      {
        id: 34,
        category: 'SSD',
        name: '2TB Samsung SSD',
        description: '2TB Samsung SSD',
        price: '2465.00',
        stock: 44,
        image: '/media/product_image/storage3.png',
      },
    ],
  },
  {
    id: 6,
    name: 'power supply',
    icon: 'power supply',
    description: 'power supply',
    products: [
      {
        id: 35,
        category: 'power supply',
        name: 'Corsair RM850x 850W',
        description: 'Corsair RM850x 850W',
        price: '344636.00',
        stock: 42,
        image: '/media/product_image/power-supply.png',
      },
      {
        id: 36,
        category: 'power supply',
        name: 'VEGA 550W Bronze',
        description: 'VEGA 550W Bronze',
        price: '2323.00',
        stock: 22,
        image: '/media/product_image/power-supply1.png',
      },
      {
        id: 37,
        category: 'power supply',
        name: 'Cooler Master 650W Gold',
        description: 'Cooler Master 650W Gold',
        price: '2234.00',
        stock: 13,
        image: '/media/product_image/power-supply2.png',
      },
      {
        id: 38,
        category: 'power supply',
        name: 'Seasonal 750W Platinum',
        description: 'Seasonal 750W Platinum',
        price: '7682.00',
        stock: 33,
        image: '/media/product_image/power-supply3.png',
      },
      {
        id: 39,
        category: 'power supply',
        name: 'Corsair RM850x 850W',
        description: 'Corsair RM850x 850W',
        price: '7685.00',
        stock: 22,
        image: '/media/product_image/power-supply4.png',
      },
    ],
  },
];

const data2 = {
  id: 1,
  name: 'configuration',
  description: 'configuration',
  total_price: '0.03',
  is_preset: true,
  components: [
    {
      id: 23,
      category: 'graphics',
      name: 'ASRock X570 Phantom Gaming',
      description: 'ASRock X570 Phantom Gaming',
      price: '99.00',
      stock: 9,
      image: 'http://127.0.0.1:8000/media/product_image/motherboard2.jpg',
    },
    {
      id: 24,
      category: 'processor',
      name: 'Gigabyte X670 Horus Elite',
      description: 'Gigabyte X670 Horus Elite',
      price: '69976.00',
      stock: 44,
      image: 'http://127.0.0.1:8000/media/product_image/motherboard3.jpg',
    },
    {
      id: 25,
      category: 'mainboard',
      name: 'ANUS ROG STRAX X670E',
      description: 'ANUS ROG STRAX X670E',
      price: '6785.00',
      stock: 16,
      image: 'http://127.0.0.1:8000/media/product_image/motherboard4.jpg',
    },
    {
      id: 27,
      category: 'RAM',
      name: '16GB DDR32',
      description: '16GB DDR32',
      price: '7875.00',
      stock: 7,
      image: 'http://127.0.0.1:8000/media/product_image/ram1.jpg',
    },

    {
      id: 32,
      category: 'SSD',
      name: '500GB Samsung SSD',
      description: '500GB Samsung SSD',
      price: '8545.00',
      stock: 44,
      image: 'http://127.0.0.1:8000/media/product_image/storage1.png',
    },

    {
      id: 35,
      category: 'power supply',
      name: 'Corsair RM850x 850W',
      description: 'Corsair RM850x 850W',
      price: '344636.00',
      stock: 42,
      image: 'http://127.0.0.1:8000/media/product_image/power-supply.png',
    },
  ],
};
export default function PCBuilder({
  productCategories1,
}: {
  productCategories1: ProductCategory[];
}) {
  console.log('productCategories --->', productCategories);
  console.log('productCategories --->', productCategories1);
  const router = useRouter();
  // const [expanded, setExpanded] = useState<string | null>('processor');
  const [total, setTotal] = useState<number>(2365.0);

  // const [components, setComponents] = useState<ProductCategory[]>([]);
  const [selectedProducts, setSelectedProducts] = useState<Product[]>(
    data2.components,
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

    let price = 0;
    selectedProducts.map((item) => {
      price += Number(item.price);
    });

    setTotal(price);
  };

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
