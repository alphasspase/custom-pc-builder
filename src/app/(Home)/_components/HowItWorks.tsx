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
    <section className=" py-16 px-6">
      <div className="max-w-6xl mx-auto text-center">
        <SectionIntro title="How It Works" />
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
          {steps.map((step, index) => (
            <div key={index}>
              <Card className="shadow-xl rounded-2xl p-6 bg-white hover:shadow-2xl transition">
                <CardContent className="flex flex-col items-center">
                  <div className="mb-4">{step.icon}</div>
                  <h3 className="text-xl font-semibold mb-2">
                    {index + 1}. {step.title}
                  </h3>
                  <p className="text-gray-600 text-sm">{step.description}</p>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
