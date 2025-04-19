'use client';

import SectionIntro from '@/components/global/SectionIntro';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { URLS } from '@/utils/urls';
import Link from 'next/link';
import { useState } from 'react';
import {
  FaGamepad,
  FaVideo,
  FaDesktop,
  FaMusic,
  FaCode,
  FaLightbulb,
  FaTabletAlt,
  FaBriefcase,
  FaAppleAlt,
} from 'react-icons/fa'; // Adding more icons

const options = [
  {
    title: 'Gaming',
    description: 'Tell us about your needs and usage requirements',
    icon: <FaGamepad size={40} />,
  },
  {
    title: 'Streaming',
    description: 'Review and customize recommended components',
    icon: <FaVideo size={40} />,
  },
  {
    title: 'Allround',
    description: 'Choose peripherals and complete your order',
    icon: <FaDesktop size={40} />,
  },
  {
    title: 'Music Production',
    description: 'Optimize for audio recording and editing',
    icon: <FaMusic size={40} />,
  },
  {
    title: 'Web Development',
    description: 'Perfect for coding and web app design',
    icon: <FaCode size={40} />,
  },
  {
    title: 'Creative Work',
    description: 'For designers, artists, and digital creators',
    icon: <FaLightbulb size={40} />,
  },
  {
    title: 'Tablet Use',
    description: 'Lightweight for portability and everyday use',
    icon: <FaTabletAlt size={40} />,
  },
  {
    title: 'Business/Office',
    description: 'Essential for work, productivity, and meetings',
    icon: <FaBriefcase size={40} />,
  },
  {
    title: 'Media Consumption',
    description: 'Perfect for watching movies and streaming',
    icon: <FaAppleAlt size={40} />,
  },
];
// Attractive icons

const WorkTypeSelection = () => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  return (
    <div className="container mx-auto px-5 py-8">
      <section className="mb-8 text-center">
        <SectionIntro title="What type of work do you want to do?" />

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
          {options.map((option, index) => (
            <Card
              key={index}
              className={`transform cursor-pointer rounded-lg border-2 border-gray-300 p-6 transition-transform duration-300 ease-in-out hover:scale-105 ${
                selectedOption === option.title
                  ? 'bg-blue-100'
                  : 'hover:bg-gray-100'
              }`}
              onClick={() => setSelectedOption(option.title)}
            >
              <div className="mb-4 flex items-center justify-center text-gray-800">
                {option.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-800">
                {option.title}
              </h3>
              <p className="mt-2 text-gray-600">{option.description}</p>
            </Card>
          ))}
        </div>
      </section>

      <div className="mt-8 flex flex-wrap-reverse items-center justify-center gap-5">
        <Button asChild size={'lg'} variant="outline" className="px-6 py-2">
          <Link href={URLS.build} className="mr-2">
            Skip Questions
          </Link>
        </Button>
        <Button asChild size={'lg'} className="px-6 py-2">
          <Link href={URLS.build} className="mr-2">
            Next
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default WorkTypeSelection;
