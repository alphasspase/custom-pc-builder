'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  AlertCircle,
  Check,
  Cpu,
  Monitor,
  HardDrive,
  Layers,
  Zap,
  Award,
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
      image: '/placeholder.svg?height=80&width=80',
      options: [
        {
          id: 'msib450',
          name: 'MSI B450 Tomahawk',
          price: 129.99,
          image: '/placeholder.svg?height=60&width=60',
        },
        {
          id: 'asrockx570',
          name: 'ASRock X570 Phantom Gaming',
          price: 179.99,
          image: '/placeholder.svg?height=60&width=60',
        },
        {
          id: 'gigax670',
          name: 'Gigabyte X670 Aorus Elite',
          price: 239.99,
          image: '/placeholder.svg?height=60&width=60',
        },
        {
          id: 'asusx670e',
          name: 'ASUS ROG STRIX X670E (Recommended)',
          price: 299.99,
          image: '/placeholder.svg?height=60&width=60',
          recommended: true,
        },
      ],
    },
    {
      id: 'ram',
      name: '64GB DDR5',
      price: 219.99,
      selected: true,
      image: '/placeholder.svg?height=80&width=80',
      recommended: true,
      options: [
        {
          id: 'ram16',
          name: '16GB DDR5',
          price: 79.99,
          image: '/placeholder.svg?height=60&width=60',
        },
        {
          id: 'ram32',
          name: '32GB DDR5',
          price: 149.99,
          image: '/placeholder.svg?height=60&width=60',
        },
        {
          id: 'ram64',
          name: '64GB DDR5 (Recommended)',
          price: 219.99,
          image: '/placeholder.svg?height=60&width=60',
          recommended: true,
        },
        {
          id: 'ram128',
          name: '128GB DDR5',
          price: 399.99,
          image: '/placeholder.svg?height=60&width=60',
        },
      ],
    },
    {
      id: 'ssd',
      name: '2TB Samsung SSD',
      price: 179.99,
      selected: true,
      image: '/placeholder.svg?height=80&width=80',
      options: [
        {
          id: 'ssd500',
          name: '500GB Samsung SSD',
          price: 69.99,
          image: '/placeholder.svg?height=60&width=60',
        },
        {
          id: 'ssd1',
          name: '1TB Samsung SSD',
          price: 109.99,
          image: '/placeholder.svg?height=60&width=60',
        },
        {
          id: 'ssd2',
          name: '2TB Samsung SSD (Recommended)',
          price: 179.99,
          image: '/placeholder.svg?height=60&width=60',
          recommended: true,
        },
      ],
    },
    {
      id: 'power-supply',
      name: 'Corsair RM850x 850W (Recommended)',
      price: 149.99,
      selected: true,
      image: '/placeholder.svg?height=80&width=80',
      recommended: true,
      options: [
        {
          id: 'psu550',
          name: 'EVGA 550W Bronze',
          price: 59.99,
          image: '/placeholder.svg?height=60&width=60',
        },
        {
          id: 'psu650',
          name: 'Cooler Master 650W Gold',
          price: 89.99,
          image: '/placeholder.svg?height=60&width=60',
        },
        {
          id: 'psu750',
          name: 'Seasonic 750W Platinum',
          price: 119.99,
          image: '/placeholder.svg?height=60&width=60',
        },
        {
          id: 'psu850',
          name: 'Corsair RM850x 850W (Recommended)',
          price: 149.99,
          image: '/placeholder.svg?height=60&width=60',
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

  // Helper function to get component label
  const getComponentLabel = (id: string) => {
    switch (id) {
      case 'graphics':
        return 'Graphic Card';
      case 'processor':
        return 'Prozessor';
      case 'mainboard':
        return 'Mainboard';
      case 'ram':
        return 'RAM';
      case 'ssd':
        return 'SSD';
      case 'psu':
        return 'Netzteil';
      default:
        return id;
    }
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
      case 'psu':
        return <Zap className="size-5" />;
      default:
        return null;
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-4 bg-gradient-to-b from-white to-gray-50 rounded-lg shadow-lg border border-gray-100">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Build Your PC</h2>
        <div className="flex items-center gap-2">
          <div className="text-sm font-medium text-gray-500">
            {completionPercentage}% Complete
          </div>
          <div className="w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-primary"
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
                'border rounded-lg mb-3 overflow-hidden hover:shadow-md transition-shadow',
                'data-[state=open]:border-primary/50 data-[state=open]:shadow-md',
              )}
            >
              <AccordionTrigger className="px-4 py-3 hover:no-underline group">
                <div className="flex items-center justify-between w-full">
                  <div className="flex items-center gap-4">
                    <div className="relative">
                      <div className="w-12 h-12 bg-gradient-to-br from-gray-50 to-gray-100 rounded-md flex items-center justify-center overflow-hidden border border-gray-200">
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
                        <Badge className="absolute -top-2 -right-2 bg-amber-500 hover:bg-amber-500 scale-75">
                          <Award className="size-3 mr-1" /> Best
                        </Badge>
                      )}
                    </div>
                    <div className="text-left">
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
                  <motion.div
                    key={component.price}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="font-semibold mr-4"
                  >
                    {component.price.toFixed(2)} €
                  </motion.div>
                </div>
              </AccordionTrigger>
              <AccordionContent className="border-t border-gray-200 bg-gray-50 px-4 pt-4 pb-6 data-[state=open]:animate-accordion-down data-[state=closed]:animate-accordion-up">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {component.options?.map((option) => (
                    <motion.div
                      key={option.id}
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => selectOption(component.id, option.id)}
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
              </AccordionContent>
            </AccordionItem>
          </motion.div>
        ))}
      </Accordion>

      {hasConflict && (
        <motion.div
          className="mt-6 p-4 bg-amber-50 border border-amber-200 rounded-lg flex items-center justify-between"
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
              Es gibt Konflikte mit deiner Konfiguration
            </span>
          </div>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              onClick={resolveConflicts}
              variant="outline"
              className="border-amber-300 hover:bg-amber-100 transition-all"
            >
              Löse die Konflikte
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
        <div className="flex justify-between items-center mb-2">
          <span className="text-gray-500">inkl. MwSt. zzgl. Versand</span>
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
        <div className="flex justify-between items-center mb-6">
          <span className="text-sm text-gray-500">35 Tage Lieferzeit</span>
          <span className="text-sm text-gray-500">
            inkl. MwSt. zzgl. Versand
          </span>
        </div>

        <div className="flex gap-4">
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex-1"
          >
            <Button variant="outline" className="w-full">
              Zurück
            </Button>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex-1"
          >
            <Button className="w-full" disabled={hasConflict}>
              Weiter
            </Button>
          </motion.div>
        </div>

        <div className="flex justify-end mt-4 gap-4">
          <motion.div
            whileHover={{ scale: 1.1 }}
            className="w-12 h-6 bg-gray-200 rounded flex items-center justify-center text-xs font-medium"
          >
            shop
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.1 }}
            className="w-12 h-6 bg-gray-800 text-white rounded flex items-center justify-center text-xs font-medium"
          >
            VISA
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
