'use client';

import type React from 'react';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Sparkles, Star, ArrowRight, Zap, Shield } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import Image from 'next/image';

interface ProductOption {
  id: string;
  title: string;
  description: string;
  price: number;
  image: string;
  popular?: boolean;
  discount?: number;
  rating?: number;
  features: string[];
  color: string;
  icon: React.ReactNode;
}

export default function ProductCarousel() {
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const products: ProductOption[] = [
    {
      id: 'standing-desk',
      title: 'Premium Standing Desk',
      description:
        'Adjustable height with memory settings and premium materials',
      price: 599,
      discount: 100,
      rating: 4.9,
      image: '/placeholder.svg?height=400&width=600',
      popular: true,
      color: 'from-violet-500 to-purple-700',
      icon: <Zap className="h-5 w-5" />,
      features: [
        'Electric height adjustment',
        'Memory settings for quick adjustments',
        'Premium wood finish options',
        'Cable management system',
        '10-year warranty',
      ],
    },
    {
      id: 'classic-desk',
      title: 'Classic Work Desk',
      description: 'Sturdy construction with elegant design for your workspace',
      price: 299,
      rating: 4.7,
      image: '/placeholder.svg?height=400&width=600',
      color: 'from-emerald-500 to-teal-700',
      icon: <Shield className="h-5 w-5" />,
      features: [
        'Solid wood construction',
        'Spacious work surface',
        'Built-in drawer storage',
        'Easy assembly',
        '5-year warranty',
      ],
    },
    {
      id: 'corner-desk',
      title: 'L-Shaped Corner Desk',
      description: 'Maximize your space with this ergonomic corner design',
      price: 449,
      rating: 4.6,
      image: '/placeholder.svg?height=400&width=600',
      color: 'from-amber-500 to-orange-700',
      icon: <Star className="h-5 w-5" />,
      features: [
        'L-shaped design for corner spaces',
        'Dual work surfaces',
        'Integrated bookshelf',
        'Modular configuration',
        '7-year warranty',
      ],
    },
    {
      id: 'gaming-desk',
      title: 'Pro Gaming Desk',
      description: 'Designed for gamers with RGB lighting and cable management',
      price: 499,
      discount: 50,
      rating: 4.8,
      image: '/placeholder.svg?height=400&width=600',
      color: 'from-cyan-500 to-blue-700',
      icon: <Zap className="h-5 w-5" />,
      features: [
        'RGB lighting system',
        'Headphone hooks',
        'Cup holder',
        'Cable management grommets',
        'Controller stands',
      ],
    },
    {
      id: 'minimalist-desk',
      title: 'Minimalist Desk',
      description: 'Clean, simple design for a distraction-free workspace',
      price: 249,
      rating: 4.5,
      image: '/placeholder.svg?height=400&width=600',
      color: 'from-rose-500 to-pink-700',
      icon: <Star className="h-5 w-5" />,
      features: [
        'Sleek, minimal design',
        'Hidden cable management',
        'Compact footprint',
        'Eco-friendly materials',
        'Easy to clean surface',
      ],
    },
  ];

  const renderStars = (rating: number) => {
    return Array(5)
      .fill(0)
      .map((_, i) => (
        <Star
          key={i}
          className={cn(
            'h-4 w-4',
            i < Math.floor(rating)
              ? 'text-yellow-400 fill-yellow-400'
              : 'text-gray-300',
          )}
        />
      ));
  };

  return (
    <div className="relative overflow-hidden">
      {/* Background gradient elements */}
      {/* <div className="absolute -top-24 -left-24 w-96 h-96 bg-purple-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
      <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-yellow-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-pink-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div> */}

      <div className="relative mx-auto max-w-7xl  ">
        <div className="mb-12 text-center ">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* <span className="inline-block px-4 py-1.5 mb-4 text-sm font-medium rounded-full bg-gradient-to-r from-yellow-500 to-primary text-white">
              Premium Collection
            </span> */}
            <h3 className="">Choose Your Perfect Desk</h3>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Elevate your workspace with our premium desk options designed for
              comfort and productivity
            </p>
          </motion.div>
        </div>

        <Carousel
          opts={{
            align: 'start',
            loop: true,
          }}
          className="w-full"
        >
          <CarouselContent className="-ml-2 md:-ml-4">
            {products.map((product, index) => (
              <CarouselItem
                key={product.id}
                className="pl-2 md:pl-4 sm:basis-1/2 lg:basis-1/2"
              >
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  whileHover={{ y: -8 }}
                  className="h-full"
                >
                  <Card
                    className={cn(
                      'h-full overflow-hidden transition-all duration-300 cursor-pointer border-2 group',
                      selectedProduct === product.id
                        ? 'border-primary shadow-lg shadow-primary/20'
                        : 'border-border hover:border-primary/50',
                    )}
                    onClick={() => setSelectedProduct(product.id)}
                  >
                    <div className="relative">
                      <div className="aspect-3/2 overflow-hidden bg-muted">
                        <div
                          className={`absolute inset-0 bg-gradient-to-br ${product.color} opacity-80 z-10`}
                        ></div>
                        <Image
                          fill
                          src={product.image || '/placeholder.svg'}
                          alt={product.title}
                          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110 relative z-0"
                        />
                        <div className="absolute inset-0 bg-black/20 z-20"></div>
                        <div className="absolute bottom-0 left-0 right-0 p-4 text-white z-30">
                          <div className="flex items-center gap-1 mb-1">
                            {mounted &&
                              product.rating &&
                              renderStars(product.rating)}
                            <span className="text-sm ml-1">
                              ({product.rating})
                            </span>
                          </div>
                          <h3 className="text-xl font-bold">{product.title}</h3>
                        </div>
                      </div>

                      {product.popular && (
                        <Badge className="absolute top-3 right-3 bg-white text-black font-medium z-30 shadow-lg">
                          <Sparkles className="h-3.5 w-3.5 mr-1 text-yellow-500" />
                          Most Popular
                        </Badge>
                      )}

                      {product.discount && (
                        <Badge className="absolute top-3 left-3 bg-red-500 text-white font-medium z-30">
                          Save ${product.discount}
                        </Badge>
                      )}

                      {selectedProduct === product.id && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white text-primary rounded-full p-3 z-30 shadow-xl"
                        >
                          <Check className="h-6 w-6" />
                        </motion.div>
                      )}
                    </div>

                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div
                            className={`p-2 rounded-full bg-gradient-to-r ${product.color} text-white`}
                          >
                            {product.icon}
                          </div>
                          <CardTitle className="text-xl">
                            {product.title}
                          </CardTitle>
                        </div>
                      </div>
                      <CardDescription className="text-base mt-2">
                        {product.description}
                      </CardDescription>
                    </CardHeader>

                    <CardContent>
                      <div className="flex items-baseline mb-4">
                        <div className="text-3xl font-bold">
                          ${product.price - (product.discount || 0)}
                        </div>
                        {product.discount && (
                          <div className="ml-2 text-lg line-through text-muted-foreground">
                            ${product.price}
                          </div>
                        )}
                      </div>

                      <ul className="space-y-2">
                        {product.features.slice(0, 3).map((feature, index) => (
                          <motion.li
                            key={index}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.2, delay: index * 0.1 }}
                            className="flex items-start"
                          >
                            <Check className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                            <span>{feature}</span>
                          </motion.li>
                        ))}
                      </ul>
                    </CardContent>

                    <CardFooter>
                      <Button
                        className="w-full group relative overflow-hidden"
                        size="lg"
                        variant={
                          selectedProduct === product.id ? 'default' : 'outline'
                        }
                      >
                        <span className="relative z-10">
                          {selectedProduct === product.id
                            ? 'Selected'
                            : 'Select'}
                        </span>
                        <span className="absolute inset-0 bg-gradient-to-r from-primary to-primary-light transform translate-y-full group-hover:translate-y-0 transition-transform duration-300 z-0"></span>
                        <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1 relative z-10" />
                      </Button>
                    </CardFooter>
                  </Card>
                </motion.div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="flex items-center justify-center mt-8 gap-2">
            <CarouselPrevious className="relative static" />
            <CarouselNext className="relative static" />
          </div>
        </Carousel>

        <AnimatePresence>
          {selectedProduct && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="mt-12 text-center"
            ></motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
