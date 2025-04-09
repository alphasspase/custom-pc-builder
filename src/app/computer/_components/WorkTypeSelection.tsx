'use client';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useState } from 'react';

const WorkTypeSelection = () => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const options = [
    {
      title: 'Gaming',
      description: 'Tell us about your needs and usage requirements',
      icon: '🎮',
    },
    {
      title: 'Streaming',
      description: 'Review and customize recommended components',
      icon: '📹',
    },
    {
      title: 'Allround',
      description: 'Choose peripherals and complete your order',
      icon: '💻',
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <section className="text-center mb-8">
        <div className="text-center mb-12">
          <h2 className="mb-4"> What type of work do you want to do?</h2>
          <div className="w-24 h-1 bg-primary mx-auto rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {options.map((option, index) => (
            <Card
              key={index}
              className={`p-6 border border-gray-300 rounded-lg cursor-pointer transition duration-300 ease-in-out ${
                selectedOption === option.title
                  ? 'bg-blue-100'
                  : 'hover:bg-gray-100'
              }`}
              onClick={() => setSelectedOption(option.title)}
            >
              <div className="flex items-center justify-center text-4xl mb-4">
                {option.icon}
              </div>
              <h3 className="text-xl font-semibold">{option.title}</h3>
              <p className="text-gray-600 mt-2">{option.description}</p>
            </Card>
          ))}
        </div>
      </section>

      <div className="flex justify-between items-center mt-8">
        <Button variant="secondary">Skip Questions</Button>
        <Button>Next</Button>
      </div>

      <Separator className="my-8" />

      <footer className="text-center text-gray-600">
        <p className="text-sm">© 2025 PC Builder. All rights reserved.</p>
        <div className="flex justify-center gap-6 mt-4">
          <Button variant="link">Home</Button>
          <Button variant="link">Configure PC</Button>
          <Button variant="link">Components</Button>
          <Button variant="link">Support</Button>
        </div>
      </footer>
    </div>
  );
};

export default WorkTypeSelection;
