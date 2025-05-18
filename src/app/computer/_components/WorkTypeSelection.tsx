'use client';

import SectionIntro from '@/components/global/SectionIntro';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { URLS } from '@/utils/urls';
import Link from 'next/link';
import { useState } from 'react';
import { BsPcDisplay } from 'react-icons/bs';
import { motion } from 'framer-motion';
import { Question, QuestionOptions } from '@/services/demand_assessment/type';
import { DemandAssessments } from '@/services/demand_assessment/demand_assessment';
import Image from 'next/image';

// const options = [
//   {
//     title: 'Gaming',
//     description: 'Tell us about your needs and usage requirements',
//     icon: <FaGamepad size={40} />,
//   },
//   {
//     title: 'Streaming',
//     description: 'Review and customize recommended components',
//     icon: <FaVideo size={40} />,
//   },
//   {
//     title: 'All round',
//     description: 'Choose peripherals and complete your order',
//     icon: <FaDesktop size={40} />,
//   },
//   {
//     title: 'Music Production',
//     description: 'Optimize for audio recording and editing',
//     icon: <FaMusic size={40} />,
//   },
//   {
//     title: 'Web Development',
//     description: 'Perfect for coding and web app design',
//     icon: <FaCode size={40} />,
//   },
//   {
//     title: 'Creative Work',
//     description: 'For designers, artists, and digital creators',
//     icon: <FaLightbulb size={40} />,
//   },
//   {
//     title: 'Tablet Use',
//     description: 'Lightweight for portability and everyday use',
//     icon: <FaTabletAlt size={40} />,
//   },
//   {
//     title: 'Business/Office',
//     description: 'Essential for work, productivity, and meetings',
//     icon: <FaBriefcase size={40} />,
//   },
//   {
//     title: 'Media Consumption',
//     description: 'Perfect for watching movies and streaming',
//     icon: <FaAppleAlt size={40} />,
//   },
// ];
// Attractive icons\

const WorkTypeSelection = ({ question }: { question: Question }) => {
  const [selectedOption, setSelectedOption] = useState<QuestionOptions | null>(
    null,
  );
  const [questionList, setQuestionList] = useState<Question>(question);

  const handleNextQuestion = async (selectedId: number) => {
    const nextQuestion = await DemandAssessments.getNextQuestion(selectedId);
    setQuestionList(nextQuestion);
  };
  console.log('selectedOption --->', selectedOption);

  return (
    <div className="container mx-auto px-5 py-8">
      <section className="mb-8 text-center">
        <motion.div
          key={questionList.id} // This ensures that Framer Motion knows when to animate
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
        >
          <SectionIntro title={questionList.question} />
        </motion.div>

        <motion.div
          key={questionList.id} // This ensures that Framer Motion knows when to animate
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
        >
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
            {questionList.options.map((option, index) => (
              <Card
                key={index}
                className={`group relative transform cursor-pointer overflow-hidden rounded-xl border-2 border-gray-200 p-4 shadow-md transition duration-300 hover:shadow-xl ${
                  selectedOption?.id === option.id
                    ? 'border-primary ring-primary-300 ring-2'
                    : 'hover:border-primary-300'
                }`}
                onClick={() => setSelectedOption(option)}
              >
                <div className="h-40 w-full overflow-hidden rounded-lg bg-gray-100">
                  {option.icon ? (
                    <Image
                      width={500}
                      height={500}
                      src={`${option.icon}`}
                      alt={option.option_text}
                      className="h-full w-full transition duration-300 group-hover:scale-105"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center object-cover text-gray-500">
                      {option.icon || <BsPcDisplay size={40} />}
                    </div>
                  )}
                </div>

                <div className="mt-4 text-center">
                  <h3 className="text-lg font-bold text-gray-800">
                    {option.option_text}
                  </h3>
                </div>
              </Card>
            ))}
          </div>
        </motion.div>
      </section>

      <div className="mt-8 flex flex-wrap-reverse items-center justify-center gap-5">
        <Button asChild size={'lg'} variant="outline" className="px-6 py-2">
          <Link href={URLS.build} className="mr-2">
            Skip Questions
          </Link>
        </Button>

        {questionList.is_last ? (
          <Button asChild size={'lg'} className="px-6 py-2">
            <Link
              href={
                selectedOption?.configuration_preset_id
                  ? `${URLS.build}?id=${selectedOption.configuration_preset_id}`
                  : URLS.build
              }
              className="mr-2"
            >
              Finish
            </Link>
          </Button>
        ) : (
          <Button
            disabled={!selectedOption}
            onClick={() => {
              if (selectedOption?.id) {
                handleNextQuestion(selectedOption?.id);
              }
            }}
            size={'lg'}
            className="px-6 py-2"
          >
            Next
          </Button>
        )}
      </div>
    </div>
  );
};

export default WorkTypeSelection;
