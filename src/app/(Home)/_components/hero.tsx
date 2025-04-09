'use client';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

export const HeroSection = () => {
  // const { theme } = useTheme();
  return (
    <section className="w-full h-[calc(100vh-65px)] flex items-center justify-center p-4 bg-primary-gray-600">
      <div className="text-center space-y-8">
        <Badge variant="outline" className="text-sm py-2">
          <span className="mr-2 text-primary">
            <Badge>New</Badge>
          </span>
          <span> Design is out now! </span>
        </Badge>

        <div className="max-w-screen-md mx-auto text-center text-4xl md:text-6xl font-bold">
          <h1>
            Build Your Dream PC
            <span className="text-transparent px-2 bg-gradient-to-r from-yellow-300 to-primary bg-clip-text">
              Dream
            </span>
            PC
          </h1>
        </div>

        <p className="max-w-screen-sm mx-auto text-xl text-muted-foreground">
          {`Custom-build your perfect PC with our intelligent configurator.
Answer a few questions and let us recommend the best components
for your needs.`}
        </p>

        <div className="space-y-4 md:space-y-0 md:space-x-4 ">
          <Button
            size={'xl'}
            className="w-5/6 md:w-1/3 text-base font-bold group/arrow"
          >
            Configure with Presets
            <ArrowRight className="size-5 ml-2 group-hover/arrow:translate-x-1 transition-transform" />
          </Button>

          <Button
            size={'xl'}
            asChild
            variant="secondary"
            className="w-5/6 md:w-1/3 font-bold text-base "
          >
            <Link
              href="https://github.com/nobruf/shadcn-landing-page.git"
              target="_blank"
            >
              Configure Custom PC Now
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};
