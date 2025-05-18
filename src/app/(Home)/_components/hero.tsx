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
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Track mouse position for parallax effects
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX / (typeof window !== 'undefined' ? window.innerWidth : 1),
        y: e.clientY / (typeof window !== 'undefined' ? window.innerHeight : 1),
      });
    };

    if (typeof window !== 'undefined') {
      window.addEventListener('mousemove', handleMouseMove);
    }

    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('mousemove', handleMouseMove);
      }
    };
  }, []);

  const slides = [
    {
      badge: 'New',
      badgeText: 'Design is out now!',
      title: (
        <>
          Build Your{' '}
          <span className="to-primary bg-gradient-to-l from-yellow-500 bg-clip-text px-2 text-transparent">
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
      accentColor: 'from-yellow-500 to-amber-300',
      particles: 'bg-yellow-300/20',
    },
    {
      badge: 'Hot',
      badgeText: 'Gaming PCs available!',
      title: (
        <>
          Unleash Your{' '}
          <span className="to-primary bg-gradient-to-l from-yellow-500 bg-clip-text px-2 text-transparent">
            Gaming
          </span>{' '}
          Potential
        </>
      ),
      description:
        'Experience next-level gaming with our high-performance custom builds. Designed for maximum FPS and stunning visuals.',
      image: '/desktop-pc/pc3.png',
      alt: 'High-performance gaming PC',
      color: 'from-yellow-500/20',
      accentColor: 'from-yellow-500 to-amber-300',
      particles: 'bg-yellow-300/20',
    },
    {
      badge: 'Pro',
      badgeText: 'Workstation solutions',
      title: (
        <>
          Power Your{' '}
          <span className="to-primary bg-gradient-to-l from-yellow-500 bg-clip-text px-2 text-transparent">
            Workflow
          </span>{' '}
          Today
        </>
      ),
      description:
        'Professional-grade workstations for content creators, developers, and designers. Built for reliability and performance.',
      image: '/desktop-pc/pc4.png',
      alt: 'Professional workstation PC',
      color: 'from-yellow-500/20',
      accentColor: 'from-yellow-500 to-amber-300',
      particles: 'bg-yellow-300/20',
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
      }, 3000);
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
      {/* Animated particles background */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={`particles-${current}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.8 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7 }}
            className="absolute inset-0"
          >
            {Array.from({ length: 20 }).map((_, i) => (
              <motion.div
                key={i}
                className={`absolute rounded-full ${slides[current].particles}`}
                initial={{
                  opacity: Math.random() * 0.5 + 0.3,
                  scale: Math.random() * 0.6 + 0.4,
                  x: Math.random() * 100,
                  y: Math.random() * 100,
                  width: Math.random() * 80 + 20,
                  height: Math.random() * 80 + 20,
                }}
                animate={{
                  y: [Math.random() * 100, Math.random() * 100 - 200],
                  opacity: [Math.random() * 0.5 + 0.3, 0],
                }}
                transition={{
                  duration: Math.random() * 10 + 15,
                  repeat: Infinity,
                  ease: 'linear',
                }}
              />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Background gradient effect that changes with slides */}
      <div className="absolute inset-0 z-0 opacity-40">
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7 }}
            className="absolute inset-0 overflow-hidden"
          >
            <motion.div
              className={`bg-gradient-radial absolute h-[100vh] w-[100vw] bg-gradient-to-r ${slides[current].accentColor} opacity-30`}
              style={{
                left: `calc(50% - 50vh)`,
                top: `calc(50% - 50vh)`,
                borderRadius: '50%',
                transform: `translate(${mousePosition.x * 40 - 20}px, ${mousePosition.y * 40 - 20}px)`,
              }}
            />
            <div
              className={`bg-gradient-radial absolute inset-0 ${slides[current].color} to-transparent`}
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Animated light beam effect */}
      <div className="absolute inset-0 z-0 overflow-hidden opacity-20">
        <motion.div
          animate={{
            rotate: 360,
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'linear',
          }}
          className="absolute -inset-1/4 h-[150%] w-[150%]"
        >
          <div
            className={`absolute top-0 left-1/2 h-full w-[1px] -translate-x-1/2 transform bg-gradient-to-b ${slides[current].accentColor}`}
          />
          <div
            className={`absolute top-1/2 left-0 h-[1px] w-full -translate-y-1/2 transform bg-gradient-to-r ${slides[current].accentColor}`}
          />
        </motion.div>
      </div>

      <Carousel
        setApi={setApi}
        className="z-10 mx-auto w-full max-w-7xl"
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
              <div className="grid grid-cols-1 items-center gap-8 px-15 max-sm:flex-wrap sm:grid-cols-3">
                {/* Left side - Text content */}
                <AnimatePresence mode="wait">
                  {current === index && (
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      transition={{ duration: 0.5, delay: 0.1 }}
                      className="col-span-2 space-y-4 text-left sm:space-y-8"
                    >
                      <motion.div
                        whileHover={{
                          scale: 1.05,
                          transition: {
                            type: 'spring',
                            stiffness: 400,
                            damping: 10,
                          },
                        }}
                      >
                        <Badge
                          variant="outline"
                          className="border-white/10 bg-black/5 py-2 text-sm backdrop-blur-sm"
                        >
                          <span className="text-primary mr-2">
                            <Badge
                              className={`bg-gradient-to-r ${slides[index].accentColor} `}
                            >
                              {slide.badge}
                            </Badge>
                          </span>
                          <span> {slide.badgeText} </span>
                        </Badge>
                      </motion.div>

                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="px-4 py-2 text-left max-sm:text-center"
                      >
                        <h1>{slide.title}</h1>
                      </motion.div>

                      <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        className="text-muted-foreground max-w-screen-sm px-4 py-2 text-center text-xl sm:text-left"
                      >
                        {slide.description}
                      </motion.p>

                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                        className="flex gap-4 max-sm:flex-col max-sm:items-center"
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
                          // className="border-white/20 text-base font-bold backdrop-blur-sm transition-all duration-300 hover:border-white/40 hover:shadow-lg"
                        >
                          <Link href={URLS.build}>Configure Custom PC Now</Link>
                        </Button>
                      </motion.div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Right side - PC Image with enhanced effects */}
                <div className="relative flex h-[300px] items-center justify-center max-sm:hidden md:h-[400px]">
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
                          {/* Enhanced glow effect behind the image */}
                          <motion.div
                            animate={{
                              scale: [1, 1.2, 1],
                              opacity: [0.5, 0.8, 0.5],
                            }}
                            transition={{
                              duration: 3,
                              repeat: Infinity,
                              repeatType: 'reverse',
                            }}
                            className={`absolute h-64 w-64 rounded-full bg-gradient-to-r ${slides[index].accentColor} opacity-30 blur-3xl filter`}
                          />

                          {/* Circular ring effect */}
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{
                              duration: 20,
                              repeat: Infinity,
                              ease: 'linear',
                            }}
                            className="absolute h-80 w-80"
                          >
                            <div
                              className={`absolute inset-0 rounded-full border-2 border-dashed ${slides[index].particles} opacity-40`}
                            />
                          </motion.div>

                          {/* PC Image with enhanced animations */}
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
                            style={{
                              x: mousePosition.x * 20 - 10,
                              y: mousePosition.y * 20 - 10,
                              filter:
                                'drop-shadow(0 0 15px rgba(255,255,255,0.3))',
                            }}
                          >
                            <Image
                              src={slide.image || '/placeholder.svg'}
                              alt={slide.alt}
                              width={350}
                              height={400}
                              className="max-h-[300px] object-contain drop-shadow-lg md:max-h-[350px]"
                              priority
                            />

                            {/* Shine effect overlay */}
                            <motion.div
                              className="absolute inset-0 bg-gradient-to-tr from-transparent via-white to-transparent opacity-0"
                              animate={{
                                opacity: [0, 0.4, 0],
                                left: ['-100%', '100%', '100%'],
                              }}
                              transition={{
                                duration: 3,
                                repeat: Infinity,
                                repeatDelay: 5,
                              }}
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
          className="left-4 z-20 border-none bg-black/20 text-white backdrop-blur-md transition-all hover:scale-110 hover:bg-black/40"
          onClick={() => {
            api?.scrollPrev();
            setAutoplay(false);
          }}
        />
        <CarouselNext
          className="right-4 z-20 border-none bg-black/20 text-white backdrop-blur-md transition-all hover:scale-110 hover:bg-black/40"
          onClick={() => {
            api?.scrollNext();
            setAutoplay(false);
          }}
        />
      </Carousel>

      {/* Custom indicators with enhanced styling */}
      <div className="absolute right-0 bottom-8 left-0 z-20">
        <div className="mt-2 flex justify-center gap-2">
          {Array.from({ length: count }).map((_, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.2 }}
              className={`h-2 cursor-pointer rounded-full transition-all duration-300 ${
                index === current
                  ? `w-10 bg-gradient-to-r ${slides[index].accentColor} shadow-lg`
                  : 'bg-primary-200 border-primary w-2 border'
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
