import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { FaQuestionCircle, FaCogs, FaCheckCircle } from 'react-icons/fa';
import SectionIntro from '@/components/global/SectionIntro';

const steps = [
  {
    icon: <FaQuestionCircle size={40} className="text-blue-600" />,
    title: 'Answer Questions',
    description: 'Tell us about your needs and usage requirements.',
  },
  {
    icon: <FaCogs size={40} className="text-green-600" />,
    title: 'Configure Parts',
    description: 'Review and customize recommended components.',
  },
  {
    icon: <FaCheckCircle size={40} className="text-purple-600" />,
    title: 'Complete Setup',
    description: 'Choose peripherals and complete your order.',
  },
];

export default function HowItWorks() {
  return (
    <section className="px-6 py-16">
      <div className="mx-auto max-w-6xl text-center">
        <SectionIntro title="How It Works" />
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 md:grid-cols-3">
          {steps.map((step, index) => (
            <div key={index}>
              <Card className="rounded-2xl bg-white p-6 shadow-xl transition hover:shadow-2xl">
                <CardContent className="flex flex-col items-center">
                  <div className="mb-4">{step.icon}</div>
                  <h3 className="mb-2 text-xl font-semibold">
                    {index + 1}. {step.title}
                  </h3>
                  <p className="text-sm text-gray-600">{step.description}</p>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
