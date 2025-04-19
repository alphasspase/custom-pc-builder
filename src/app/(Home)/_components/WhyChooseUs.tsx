import SectionIntro from '@/components/global/SectionIntro';
import React from 'react';
import { FaMagic, FaShieldAlt, FaSave, FaLock } from 'react-icons/fa';

const features = [
  {
    icon: <FaMagic size={32} className="text-indigo-600" />,
    title: 'Smart Recommendations',
    description:
      'Our AI-powered system suggests the perfect components based on your needs.',
  },
  {
    icon: <FaShieldAlt size={32} className="text-emerald-600" />,
    title: 'Compatibility Guaranteed',
    description:
      'All components are checked for compatibility before recommendation.',
  },
  {
    icon: <FaSave size={32} className="text-blue-500" />,
    title: 'Save Configurations',
    description: 'Save your build with a QR code or to your account for later.',
  },
  {
    icon: <FaLock size={32} className="text-red-500" />,
    title: 'Secure Checkout',
    description: 'Safe and secure payment processing for your peace of mind.',
  },
];

export default function WhyChooseUs() {
  return (
    <section className="bg-primary-gray-600 px-6 py-16">
      <div className="mx-auto max-w-6xl text-center">
        <SectionIntro title="Why Choose Our Configurator" />

        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2">
          {features.map((feature, index) => (
            <div key={index} className="flex items-start gap-4 text-left">
              <div>{feature.icon}</div>
              <div>
                <h3 className="mb-1 text-lg font-semibold">{feature.title}</h3>
                <p className="text-sm leading-relaxed text-gray-600">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
