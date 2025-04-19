'use client';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { URLS } from '@/utils/urls';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

export const HeroSection = () => {
  // const { theme } = useTheme();
  return (
    <section className="bg-primary-gray-600 flex h-[calc(100vh-65px)] w-full items-center justify-center p-4">
      <div className="space-y-8 text-center">
        <Badge variant="outline" className="py-2 text-sm">
          <span className="text-primary mr-2">
            <Badge>New</Badge>
          </span>
          <span> Design is out now! </span>
        </Badge>

        <div className="mx-auto max-w-screen-md text-center text-4xl font-bold md:text-6xl">
          <h1>
            Build Your Dream PC
            <span className="to-primary bg-gradient-to-r from-yellow-300 bg-clip-text px-2 text-transparent">
              Dream
            </span>
            PC
          </h1>
        </div>

        <p className="text-muted-foreground mx-auto max-w-screen-sm text-xl">
          {`Custom-build your perfect PC with our intelligent configurator.
Answer a few questions and let us recommend the best components
for your needs.`}
        </p>

        <div className="space-y-4 md:space-y-0 md:space-x-4">
          <Button
            size={'xl'}
            className="group/arrow w-5/6 text-base font-bold md:w-1/3"
          >
            <Link href={URLS.computer}> Configure with Presets</Link>

            <ArrowRight className="ml-2 size-5 transition-transform group-hover/arrow:translate-x-1" />
          </Button>

          <Button
            size={'xl'}
            asChild
            variant="outline"
            className="w-5/6 text-base font-bold md:w-1/3"
          >
            <Link href={URLS.build}>Configure Custom PC Now</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};
