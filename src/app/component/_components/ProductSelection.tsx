'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, ChevronRight, Sparkles } from 'lucide-react';
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
import Image from 'next/image';

interface ProductOption {
  id: string;
  title: string;
  description: string;
  price: number;
  image: string;
  popular?: boolean;
  features: string[];
}

export default function ProductSelection() {
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null);

  const products: ProductOption[] = [
    {
      id: 'standing-desk',
      title: 'Premium Standing Desk',
      description:
        'Adjustable height with memory settings and premium materials',
      price: 599,
      image: '/placeholder.svg?height=400&width=600',
      popular: true,
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
      image: '/placeholder.svg?height=400&width=600',
      features: [
        'Solid wood construction',
        'Spacious work surface',
        'Built-in drawer storage',
        'Easy assembly',
        '5-year warranty',
      ],
    },
  ];

  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <div className="mb-12 text-center">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl mb-3">
          Choose Your Perfect Desk
        </h1>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          Elevate your workspace with our premium desk options designed for
          comfort and productivity
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
        {products.map((product) => (
          <motion.div
            key={product.id}
            whileHover={{ y: -5 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            <Card
              className={cn(
                'h-full overflow-hidden transition-all duration-300 cursor-pointer border-2',
                selectedProduct === product.id
                  ? 'border-primary shadow-lg shadow-primary/20'
                  : 'border-border hover:border-primary/50',
              )}
              onClick={() => setSelectedProduct(product.id)}
            >
              <div className="relative">
                <div className="aspect-[4/3] overflow-hidden bg-muted">
                  <Image
                    fill
                    src={product.image || '/placeholder.svg'}
                    alt={product.title}
                    className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                </div>

                {product.popular && (
                  <Badge className="absolute top-3 right-3 bg-primary text-primary-foreground font-medium">
                    <Sparkles className="h-3.5 w-3.5 mr-1" />
                    Most Popular
                  </Badge>
                )}

                {selectedProduct === product.id && (
                  <div className="absolute top-3 left-3 bg-primary text-primary-foreground rounded-full p-1">
                    <Check className="h-4 w-4" />
                  </div>
                )}
              </div>

              <CardHeader>
                <CardTitle className="text-2xl">{product.title}</CardTitle>
                <CardDescription className="text-base">
                  {product.description}
                </CardDescription>
              </CardHeader>

              <CardContent>
                <div className="text-3xl font-bold mb-4">${product.price}</div>

                <ul className="space-y-2">
                  {product.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <Check className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>

              <CardFooter>
                <Button
                  className="w-full group"
                  size="lg"
                  variant={
                    selectedProduct === product.id ? 'default' : 'outline'
                  }
                >
                  {selectedProduct === product.id ? 'Selected' : 'Select'}
                  <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        ))}
      </div>

      {selectedProduct && (
        <div className="mt-10 text-center">
          <Button size="lg" className="px-8">
            Continue to Checkout
          </Button>
        </div>
      )}
    </div>
  );
}
