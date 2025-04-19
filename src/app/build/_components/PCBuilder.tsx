'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  AlertCircle,
  Check,
  Cpu,
  Monitor,
  HardDrive,
  Layers,
  Award,
  Plug,
} from 'lucide-react';
import { Button } from '@/components/ui/button';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

import { Badge } from '@/components/ui/badge';
import Image from 'next/image';
import { cn } from '@/lib/utils';

interface Component {
  id: string;
  name: string;
  price: number;
  selected: boolean;
  image: string;
  recommended?: boolean;
  options?: {
    id: string;
    name: string;
    price: number;
    image: string;
    recommended?: boolean;
  }[];
}

export default function PCBuilder() {
  const router = useRouter();
  // const [expanded, setExpanded] = useState<string | null>('processor');
  const [total, setTotal] = useState<number>(2365.0);
  const [hasConflict, setHasConflict] = useState<boolean>(true);
  const [completionPercentage, setCompletionPercentage] = useState<number>(60);

  const [components, setComponents] = useState<Component[]>([
    {
      id: 'graphics',
      name: 'Nvidia RTX 5070 Graphics Card',
      price: 699.99,
      selected: true,
      image: '/graphic-card/graphic-card.jpg',
      options: [
        {
          id: 'rtx3060',
          name: 'Nvidia RTX 3060',
          price: 399.99,
          image: '/graphic-card/graphic-card1.jpg',
        },
        {
          id: 'rtx4070',
          name: 'Nvidia RTX 4070',
          price: 599.99,
          image: '/graphic-card/graphic-card2.jpg',
        },
        {
          id: 'rx7800xt',
          name: 'AMD Radeon RX 7800 XT',
          price: 549.99,
          image: '/graphic-card/graphic-card3.jpg',
        },
        {
          id: 'rtx5070',
          name: 'Nvidia RTX 5070 (Recommended)',
          price: 699.99,
          image: '/graphic-card/graphic-card.jpg',
          recommended: true,
        },
      ],
    },
    {
      id: 'processor',
      name: 'AMD Ryzen 9',
      price: 449.99,
      selected: true,
      image: '/processor/processor.jpg',
      options: [
        {
          id: 'ryzen3',
          name: 'AMD Ryzen 3',
          price: 100.0,
          image: '/processor/processor1.jpg',
          recommended: true,
        },
        {
          id: 'ryzen5',
          name: 'AMD Ryzen 5',
          price: 80.0,
          image: '/processor/processor2.jpg',
        },
        {
          id: 'ryzen7',
          name: 'AMD Ryzen 7',
          price: 40.0,
          image: '/processor/processor2.jpg',
        },
        {
          id: 'ryzen9',
          name: 'AMD Ryzen 9 (Recommended)',
          price: 449.99,
          image: '/processor/processor4.jpg',
        },
      ],
    },
    {
      id: 'mainboard',
      name: 'ASUS ROG STRIX X670E',
      price: 299.99,
      selected: true,
      image: '/motherboard/motherboard.jpg',
      options: [
        {
          id: 'msib450',
          name: 'MSI B450 Tomahawk',
          price: 129.99,
          image: '/motherboard/motherboard1.jpg',
        },
        {
          id: 'asrockx570',
          name: 'ASRock X570 Phantom Gaming',
          price: 179.99,
          image: '/motherboard/motherboard2.jpg',
        },
        {
          id: 'gigax670',
          name: 'Gigabyte X670 Aorus Elite',
          price: 239.99,
          image: '/motherboard/motherboard3.jpg',
        },
        {
          id: 'asusx670e',
          name: 'ASUS ROG STRIX X670E (Recommended)',
          price: 299.99,
          image: '/motherboard/motherboard4.jpg',
          recommended: true,
        },
      ],
    },
    {
      id: 'ram',
      name: '64GB DDR5',
      price: 219.99,
      selected: true,
      image: '/ram/ram.jpg',
      recommended: true,
      options: [
        {
          id: 'ram16',
          name: '16GB DDR5',
          price: 79.99,
          image: '/ram/ram1.jpg',
        },
        {
          id: 'ram32',
          name: '32GB DDR5',
          price: 149.99,
          image: '/ram/ram2.jpg',
        },
        {
          id: 'ram64',
          name: '64GB DDR5 (Recommended)',
          price: 219.99,
          image: '/ram/ram3.jpg',
          recommended: true,
        },
        {
          id: 'ram128',
          name: '128GB DDR5',
          price: 399.99,
          image: '/ram/ram4.jpg',
        },
      ],
    },
    {
      id: 'ssd',
      name: '2TB Samsung SSD',
      price: 179.99,
      selected: true,
      image: '/storage/storage.png',
      options: [
        {
          id: 'ssd500',
          name: '500GB Samsung SSD',
          price: 69.99,
          image: '/storage/storage1.png',
        },
        {
          id: 'ssd1',
          name: '1TB Samsung SSD',
          price: 109.99,
          image: '/storage/storage2.png',
        },
        {
          id: 'ssd2',
          name: '2TB Samsung SSD (Recommended)',
          price: 179.99,
          image: '/storage/storage3.png',
          recommended: true,
        },
      ],
    },
    {
      id: 'power supply',
      name: 'Corsair RM850x 850W (Recommended)',
      price: 149.99,
      selected: true,
      image: '/power-supply/power-supply.png',
      recommended: true,
      options: [
        {
          id: 'psu550',
          name: 'EVGA 550W Bronze',
          price: 59.99,
          image: '/power-supply/power-supply1.png',
        },
        {
          id: 'psu650',
          name: 'Cooler Master 650W Gold',
          price: 89.99,
          image: '/power-supply/power-supply2.png',
        },
        {
          id: 'psu750',
          name: 'Seasonic 750W Platinum',
          price: 119.99,
          image: '/power-supply/power-supply3.png',
        },
        {
          id: 'psu850',
          name: 'Corsair RM850x 850W (Recommended)',
          price: 149.99,
          image: '/power-supply/power-supply4.png',
          recommended: true,
        },
      ],
    },
  ]);

  // const toggleExpand = (id: string) => {
  //   if (expanded === id) {
  //     setExpanded(null);
  //   } else {
  //     setExpanded(id);
  //   }
  // };

  const selectOption = (componentId: string, optionId: string) => {
    // Get current price before update
    const currentComponent = components.find((c) => c.id === componentId);
    const oldPrice = currentComponent?.price || 0;

    setComponents(
      components.map((component) => {
        if (component.id === componentId && component.options) {
          const selectedOption = component.options.find(
            (option) => option.id === optionId,
          );
          if (selectedOption) {
            return {
              ...component,
              name: selectedOption.name,
              price: selectedOption.price,
              image: selectedOption.image,
            };
          }
        }

        return component;
      }),
    );

    // Simulate conflict check
    if (componentId === 'processor' && optionId === 'ryzen9') {
      setHasConflict(true);
    } else if (componentId === 'processor') {
      setHasConflict(false);
    }

    // Update total price
    const newComponent = components
      .find((c) => c.id === componentId)
      ?.options?.find((o) => o.id === optionId);
    const newPrice = newComponent?.price || 0;
    setTotal((prev) => prev - oldPrice + newPrice);
  };

  const resolveConflicts = () => {
    setHasConflict(false);
    setCompletionPercentage(80);
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
        <div className="flex items-center gap-2">
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
        </div>
      </div>

      {/* Graphics Card and Processor with custom expansion */}
      {/* <div className="space-y-4 mb-6">
        {components.slice(0, 3).map((component) => (
          <motion.div
            key={component.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Card
              className={cn(
                'overflow-hidden transition-all duration-200 hover:shadow-md',
                hasConflict && component.id === 'mainboard'
                  ? 'border-red-300 bg-red-50'
                  : '',
              )}
            >
              <div
                className="p-4 flex items-center justify-between cursor-pointer"
                onClick={() =>
                  component.options?.length ? toggleExpand(component.id) : null
                }
              >
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <div className="w-16 h-16 bg-gradient-to-br from-gray-50 to-gray-100 rounded-md flex items-center justify-center overflow-hidden border border-gray-200">
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        transition={{
                          type: 'spring',
                          stiffness: 400,
                          damping: 10,
                        }}
                      >
                        <Image
                          src={component.image || '/placeholder.svg'}
                          alt={component.name}
                          width={80}
                          height={80}
                          className="object-contain"
                        />
                      </motion.div>
                    </div>
                    {component.recommended && (
                      <Badge className="absolute -top-2 -right-2 bg-amber-500 hover:bg-amber-500">
                        <Award className="size-3 mr-1" /> Best
                      </Badge>
                    )}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <motion.div
                        className="p-1 rounded-full bg-primary/10 text-primary"
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.5 }}
                      >
                        {getComponentIcon(component.id)}
                      </motion.div>
                      <p className="text-sm font-medium text-gray-500">
                        {getComponentLabel(component.id)}
                      </p>
                    </div>
                    <p className="font-semibold">{component.name}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <motion.div
                    key={component.price}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="font-semibold"
                  >
                    {component.price.toFixed(2)} €
                  </motion.div>
                  {component.options?.length ? (
                    <motion.button
                      className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 hover:bg-gray-300 transition-colors"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {expanded === component.id ? (
                        <ChevronUp size={20} />
                      ) : (
                        <ChevronDown size={20} />
                      )}
                    </motion.button>
                  ) : (
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <motion.button
                            className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 hover:bg-gray-300 transition-colors"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <Plus size={20} />
                          </motion.button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Add options</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  )}
                </div>
              </div>

              <AnimatePresence>
                {expanded === component.id && component.options && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="border-t border-gray-200 bg-gray-50 overflow-hidden"
                  >
                    <div className="p-4">
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                        {component.options.map((option) => (
                          <motion.div
                            key={option.id}
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.97 }}
                            onClick={() =>
                              selectOption(component.id, option.id)
                            }
                            className={cn(
                              'flex flex-col items-center p-3 rounded-lg cursor-pointer transition-all relative',
                              component.name === option.name
                                ? 'bg-primary/10 border-2 border-primary shadow-[0_0_10px_rgba(79,70,229,0.2)]'
                                : 'bg-white border-2 border-gray-200 hover:border-gray-300',
                            )}
                          >
                            <div className="w-16 h-16 bg-white rounded-md flex items-center justify-center mb-2">
                              <Image
                                src={option.image || '/placeholder.svg'}
                                alt={option.name}
                                width={60}
                                height={60}
                                className="object-contain"
                              />
                            </div>
                            <p className="text-sm font-medium text-center">
                              {option.name}
                            </p>
                            <p className="text-sm font-bold">
                              {option.price.toFixed(2)} €
                            </p>
                            {option.recommended && (
                              <Badge className="absolute -top-2 -right-2 bg-amber-500 hover:bg-amber-500">
                                <Award className="size-3 mr-1" /> Best
                              </Badge>
                            )}
                            {component.name === option.name && (
                              <motion.div
                                className="absolute top-2 left-2 bg-primary text-white rounded-full p-1"
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
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {hasConflict && component.id === 'mainboard' && (
                <motion.div
                  className="bg-red-50 p-3 flex items-center gap-2 text-red-700 text-sm"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{
                      repeat: Number.POSITIVE_INFINITY,
                      duration: 2,
                    }}
                  >
                    <AlertCircle size={16} />
                  </motion.div>
                  <span>
                    Mainboard Socket passt nicht zum ausgewählten Prozessor
                  </span>
                </motion.div>
              )}
            </Card>
          </motion.div>
        ))}
      </div> */}

      {/* RAM, SSD, and PSU with Accordion */}
      <Accordion type="single" collapsible className="mb-6">
        {components.map((component, index) => (
          <motion.div
            key={component.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <AccordionItem
              value={component.id}
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
                            src={component.image || '/placeholder.svg'}
                            alt={component.name}
                            width={60}
                            height={60}
                            className="object-contain"
                          />
                        </motion.div>
                      </div>
                      {component.recommended && (
                        <Badge className="absolute -top-2 -right-2 scale-75 bg-amber-500 hover:bg-amber-500">
                          <Award className="mr-1 size-3" /> Best
                        </Badge>
                      )}
                    </div>
                    <div className="text-left">
                      <div className="flex items-center gap-2">
                        <motion.div
                          className="bg-primary/10 text-primary rounded-full p-1"
                          whileHover={{ rotate: 360 }}
                          transition={{ duration: 0.5 }}
                        >
                          {getComponentIcon(component.id)}
                        </motion.div>
                        <p className="text-sm font-medium text-gray-500 uppercase">
                          {component.id}
                        </p>
                      </div>
                      <p className="font-semibold">{component.name}</p>
                    </div>
                  </div>
                  <motion.div
                    key={component.price}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mr-4 font-semibold"
                  >
                    {component.price.toFixed(2)} €
                  </motion.div>
                </div>
              </AccordionTrigger>
              <AccordionContent className="data-[state=open]:animate-accordion-down data-[state=closed]:animate-accordion-up border-t border-gray-200 bg-gray-50 px-4 pt-4 pb-6">
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                  {component.options?.map((option) => (
                    <motion.div
                      key={option.id}
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => selectOption(component.id, option.id)}
                      className={cn(
                        'relative flex cursor-pointer flex-col items-center rounded-lg p-3 transition-all',
                        component.name === option.name
                          ? 'bg-primary/10 border-primary border-2 shadow-[0_0_10px_rgba(79,70,229,0.2)]'
                          : 'border-2 border-gray-200 bg-white hover:border-gray-300',
                      )}
                    >
                      <div className="mb-2 flex h-16 w-16 items-center justify-center rounded-md bg-white">
                        <Image
                          src={option.image || '/placeholder.svg'}
                          alt={option.name}
                          width={60}
                          height={60}
                          className="object-contain"
                        />
                      </div>
                      <p className="text-center text-sm font-medium">
                        {option.name}
                      </p>
                      <p className="text-sm font-bold">
                        {option.price.toFixed(2)} €
                      </p>
                      {option.recommended && (
                        <Badge className="absolute -top-2 -right-2 bg-amber-500 hover:bg-amber-500">
                          <Award className="mr-1 size-3" /> Best
                        </Badge>
                      )}
                      {component.name === option.name && (
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

      {hasConflict && (
        <motion.div
          className="mt-6 flex items-center justify-between rounded-lg border border-amber-200 bg-amber-50 p-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex items-center gap-2">
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ repeat: Number.POSITIVE_INFINITY, duration: 2 }}
            >
              <AlertCircle size={20} className="text-amber-500" />
            </motion.div>
            <span className="font-medium text-amber-800">
              There are conflicts with your configuration
            </span>
          </div>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              onClick={resolveConflicts}
              variant="outline"
              className="border-amber-300 transition-all hover:bg-amber-100"
            >
              Resolve the conflicts
            </Button>
          </motion.div>
        </motion.div>
      )}

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
            <Button className="w-full" disabled={hasConflict}>
              Further
            </Button>
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
