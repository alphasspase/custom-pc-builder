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
    <section className="bg-primary-gray-600 py-16 px-6">
      <div className="max-w-6xl mx-auto text-center">
        <SectionIntro title="Why Choose Our Configurator" />

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-10">
          {features.map((feature, index) => (
            <div key={index} className="flex items-start gap-4 text-left">
              <div>{feature.icon}</div>
              <div>
                <h3 className="text-lg font-semibold mb-1">{feature.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
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
