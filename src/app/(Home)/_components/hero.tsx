'use client';
import { useState, useEffect, useRef } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from '@/components/ui/carousel';
import { URLS } from '@/utils/urls';

export const HeroSection = () => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);
  const [autoplay, setAutoplay] = useState(true);
  const autoplayRef = useRef<NodeJS.Timeout | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  console.log('isLoaded', isLoaded);
  useEffect(() => {
    // Set loaded state after component mounts to enable animations
    setIsLoaded(true);
  }, []);

  const slides = [
    {
      badge: 'New',
      badgeText: 'Design is out now!',
      title: (
        <>
          Build Your{' '}
          <span className="to-primary bg-gradient-to-r from-yellow-300 bg-clip-text px-2 text-transparent">
            Dream
          </span>{' '}
          PC
        </>
      ),
      description:
        'Custom-build your perfect PC with our intelligent configurator. Answer a few questions and let us recommend the best components for your needs.',
      image: '/desktop-pc/pc2.png',
      alt: 'Gaming PC with RGB lighting',
      color: 'from-yellow-500/20',
    },
    {
      badge: 'Hot',
      badgeText: 'Gaming PCs available!',
      title: (
        <>
          Unleash Your{' '}
          <span className="to-primary bg-gradient-to-r from-yellow-300 bg-clip-text px-2 text-transparent">
            Gaming
          </span>{' '}
          Potential
        </>
      ),
      description:
        'Experience next-level gaming with our high-performance custom builds. Designed for maximum FPS and stunning visuals.',
      image: '/desktop-pc/pc3.png',
      alt: 'High-performance gaming PC',
      color: 'from-red-500/20',
    },
    {
      badge: 'Pro',
      badgeText: 'Workstation solutions',
      title: (
        <>
          Power Your{' '}
          <span className="to-primary bg-gradient-to-r from-yellow-300 bg-clip-text px-2 text-transparent">
            Workflow
          </span>{' '}
          Today
        </>
      ),
      description:
        'Professional-grade workstations for content creators, developers, and designers. Built for reliability and performance.',
      image: '/desktop-pc/pc4.png',
      alt: 'Professional workstation PC',
      color: 'from-blue-500/20',
    },
  ];

  useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap());

    api.on('select', () => {
      setCurrent(api.selectedScrollSnap());

      // Reset autoplay timer when manually changed
      if (autoplayRef.current) {
        clearTimeout(autoplayRef.current);
      }

      // Pause autoplay for 10 seconds after manual interaction
      setAutoplay(false);
      const timeout = setTimeout(() => setAutoplay(true), 10000);

      return () => clearTimeout(timeout);
    });
  }, [api]);

  // Handle autoplay
  useEffect(() => {
    if (!autoplay || !api) return;

    const startAutoplay = () => {
      autoplayRef.current = setTimeout(() => {
        api.scrollNext();
        startAutoplay();
      }, 5000);
    };

    startAutoplay();

    return () => {
      if (autoplayRef.current) {
        clearTimeout(autoplayRef.current);
      }
    };
  }, [api, autoplay]);

  return (
    <section className="bg-primary-gray-600 relative flex h-[calc(100vh-65px)] w-full items-center justify-center overflow-hidden">
      {/* Background gradient effect that changes with slides */}
      <div className="absolute inset-0 z-0 opacity-30">
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7 }}
            className={`bg-gradient-radial absolute inset-0 ${slides[current].color} to-transparent`}
          />
        </AnimatePresence>
      </div>

      <Carousel
        setApi={setApi}
        className="mx-auto w-full max-w-7xl"
        opts={{
          align: 'center',
          loop: true,
        }}
      >
        <CarouselContent>
          {slides.map((slide, index) => (
            <CarouselItem
              key={index}
              className="flex items-center justify-center"
            >
              <div className="grid grid-cols-1 items-center gap-8 px-6 md:grid-cols-2">
                {/* Left side - Text content */}
                <AnimatePresence mode="wait">
                  {current === index && (
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      transition={{ duration: 0.5, delay: 0.1 }}
                      className="space-y-8 text-left"
                    >
                      <Badge variant="outline" className="py-2 text-sm">
                        <span className="text-primary mr-2">
                          <Badge>{slide.badge}</Badge>
                        </span>
                        <span> {slide.badgeText} </span>
                      </Badge>

                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="max-w-screen-md text-left text-4xl font-bold md:text-6xl"
                      >
                        <h1>{slide.title}</h1>
                      </motion.div>

                      <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        className="text-muted-foreground max-w-screen-sm text-xl"
                      >
                        {slide.description}
                      </motion.p>

                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                        className="flex flex-wrap gap-4"
                      >
                        <Button
                          size={'lg'}
                          className="group/arrow text-base font-bold"
                        >
                          <Link href={URLS.computer}>
                            Configure with Presets
                          </Link>
                          <ArrowRight className="ml-2 size-5 transition-transform group-hover/arrow:translate-x-1" />
                        </Button>

                        <Button
                          size={'lg'}
                          asChild
                          variant="outline"
                          className="text-base font-bold"
                        >
                          <Link href={URLS.build}>Configure Custom PC Now</Link>
                        </Button>
                      </motion.div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Right side - PC Image - ADJUSTED SIZE */}
                <div className="relative flex h-[300px] items-center justify-center md:h-[400px]">
                  <AnimatePresence mode="wait">
                    {current === index && (
                      <motion.div
                        key={`image-${index}`}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ duration: 0.5 }}
                        className="relative flex h-full w-full items-center justify-center"
                      >
                        <div className="flex items-center justify-center">
                          {/* Glow effect behind the image */}
                          <div
                            className={`absolute h-48 w-48 rounded-full bg-gradient-to-r blur-3xl filter ${
                              index === 0
                                ? 'from-yellow-300/30 to-yellow-500/10'
                                : index === 1
                                  ? 'from-red-300/30 to-red-500/10'
                                  : 'from-blue-300/30 to-blue-500/10'
                            }`}
                          />

                          {/* PC Image - ADJUSTED SIZE */}
                          <motion.div
                            animate={{
                              y: [0, -10, 0],
                              rotateY: [0, 5, 0],
                            }}
                            transition={{
                              duration: 6,
                              repeat: Number.POSITIVE_INFINITY,
                              repeatType: 'reverse',
                              ease: 'easeInOut',
                            }}
                            className="relative z-10"
                          >
                            <Image
                              src={slide.image || '/placeholder.svg'}
                              alt={slide.alt}
                              width={350}
                              height={400}
                              className="max-h-[300px] object-contain drop-shadow-2xl md:max-h-[350px]"
                              priority
                            />
                          </motion.div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        <CarouselPrevious
          className="left-4 border-none bg-black/20 text-white hover:bg-black/40"
          onClick={() => setAutoplay(false)}
        />
        <CarouselNext
          className="right-4 border-none bg-black/20 text-white hover:bg-black/40"
          onClick={() => setAutoplay(false)}
        />
      </Carousel>

      {/* Custom indicators */}
      <div className="absolute right-0 bottom-8 left-0 z-10">
        <div className="mt-2 flex justify-center gap-2">
          {Array.from({ length: count }).map((_, index) => (
            <div
              key={index}
              className={`h-2 cursor-pointer rounded-full transition-all duration-300 ${
                index === current ? 'bg-primary w-4' : 'w-2 bg-gray-400'
              }`}
              onClick={() => {
                api?.scrollTo(index);
                setAutoplay(false);
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
