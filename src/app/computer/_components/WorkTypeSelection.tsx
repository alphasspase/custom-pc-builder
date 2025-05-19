'use client';

import SectionIntro from '@/components/global/SectionIntro';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { URLS } from '@/utils/urls';
import Link from 'next/link';
import { useState } from 'react';
import { BsPcDisplay, BsCheckCircleFill } from 'react-icons/bs';
import { FiArrowRight } from 'react-icons/fi';
import { motion } from 'framer-motion';
import { Question, QuestionOptions } from '@/services/demand_assessment/type';
import { DemandAssessments } from '@/services/demand_assessment/demand_assessment';
import Image from 'next/image';
import { getBaseUrl } from '@/utils/env';

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
  // Add animation control states
  const [clickedIndex, setClickedIndex] = useState<number | null>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const handleNextQuestion = async (selectedId: number) => {
    const nextQuestion = await DemandAssessments.getNextQuestion(selectedId);
    setQuestionList(nextQuestion);
  };

  const handleCardClick = (option: QuestionOptions, index: number) => {
    setSelectedOption(option);
    setClickedIndex(index);

    // Reset animation state after animation completes
    setTimeout(() => {
      setClickedIndex(null);
    }, 300);
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
          key={`grid-${questionList.id}`} // This ensures that Framer Motion knows when to animate
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
        >
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
            {questionList.options.map((option, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                animate={
                  selectedOption?.id === option.id
                    ? {
                        y: [0, -8, 0],
                        transition: {
                          duration: 0.5,
                          times: [0, 0.3, 0.5],
                          ease: 'easeOut',
                        },
                      }
                    : {}
                }
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                className="flex"
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <Card
                  key={index}
                  className={`group relative flex h-full w-full transform cursor-pointer flex-col overflow-hidden rounded-xl border-2 p-4 shadow-md transition-all duration-300 ${
                    selectedOption?.id === option.id
                      ? 'border-primary from-primary-50 shadow-primary-100/50 bg-gradient-to-br to-white shadow-lg'
                      : 'hover:border-primary-300 border-gray-200 bg-gradient-to-br from-gray-50 to-white hover:shadow-xl'
                  }`}
                  onClick={() => handleCardClick(option, index)}
                >
                  {/* Selection check icon with enhanced animation */}
                  {selectedOption?.id === option.id && (
                    <div className="absolute top-3 right-3 z-10">
                      <motion.div
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{
                          scale: 1,
                          opacity: 1,
                        }}
                        transition={{
                          duration: 0.4,
                          ease: 'easeOut',
                        }}
                      >
                        <motion.div
                          animate={{
                            scale: [1, 1.15, 1],
                            boxShadow: [
                              '0px 0px 0px rgba(79, 70, 229, 0)',
                              '0px 0px 8px rgba(79, 70, 229, 0.5)',
                              '0px 0px 0px rgba(79, 70, 229, 0)',
                            ],
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            repeatType: 'loop',
                          }}
                          className="rounded-full"
                        >
                          <BsCheckCircleFill
                            size={26}
                            className="text-green-500 drop-shadow-sm"
                          />
                        </motion.div>
                      </motion.div>
                    </div>
                  )}

                  {/* Ripple effect when clicked with enhanced animation */}
                  {clickedIndex === index && (
                    <motion.div
                      initial={{ opacity: 0.7, scale: 0 }}
                      animate={{ opacity: 0, scale: 4 }}
                      transition={{ duration: 0.8 }}
                      className="bg-primary-100 absolute top-1/2 left-1/2 h-12 w-12 -translate-x-1/2 -translate-y-1/2 rounded-full"
                      style={{ zIndex: 5 }}
                    />
                  )}

                  {/* Enhanced image container with better transitions and effects */}
                  <div className="relative h-40 w-full overflow-hidden rounded-lg bg-gradient-to-b from-gray-100 to-gray-200">
                    {/* Subtle animated gradient overlay */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
                      animate={{
                        x: ['-100%', '100%'],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        repeatType: 'loop',
                        ease: 'linear',
                        repeatDelay: 1,
                      }}
                      style={{
                        opacity:
                          hoveredIndex === index ||
                          selectedOption?.id === option.id
                            ? 0.4
                            : 0,
                      }}
                    />

                    {option.icon ? (
                      <Image
                        width={500}
                        height={500}
                        src={`${getBaseUrl()}${option.icon}`}
                        alt={option.option_text}
                        className={`h-full w-full object-cover transition-all duration-500 ${
                          selectedOption?.id === option.id
                            ? 'scale-110 brightness-110'
                            : 'group-hover:scale-110 group-hover:brightness-105'
                        }`}
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center object-cover text-gray-500">
                        {option.icon || (
                          <motion.div
                            animate={
                              selectedOption?.id === option.id
                                ? {
                                    scale: [1, 1.2, 1],
                                    rotateZ: [0, 5, -5, 0],
                                  }
                                : {}
                            }
                            transition={{ duration: 0.8, repeat: 0 }}
                            className="rounded-full bg-gray-200/50 p-4"
                          >
                            <BsPcDisplay size={40} />
                          </motion.div>
                        )}
                      </div>
                    )}

                    {/* Add a subtle overlay on hover/selected */}
                    <div
                      className={`bg-primary-500/0 absolute inset-0 transition-colors duration-300 ${
                        selectedOption?.id === option.id
                          ? 'bg-primary-500/10'
                          : 'group-hover:bg-primary-500/5'
                      }`}
                    />
                  </div>

                  {/* Enhanced text area with fixed height to ensure uniform cards */}
                  <div className="mt-4 flex flex-1 flex-col items-center justify-between">
                    <h3 className="group-hover:text-primary-700 line-clamp-2 min-h-[3rem] text-lg font-bold text-gray-800">
                      {option.option_text}
                    </h3>

                    {/* Interactive selection indicator */}
                    <motion.div
                      className={`mt-2 flex w-full items-center justify-center ${
                        selectedOption?.id === option.id
                          ? 'opacity-100'
                          : 'opacity-0 group-hover:opacity-70'
                      }`}
                      animate={
                        selectedOption?.id === option.id
                          ? { y: 0, opacity: 1 }
                          : {}
                      }
                      initial={{ y: 10, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="text-primary-600 flex items-center text-sm font-medium">
                        <span>
                          {selectedOption?.id === option.id
                            ? 'Selected'
                            : 'Select'}
                        </span>
                        <motion.div
                          animate={
                            selectedOption?.id === option.id ||
                            hoveredIndex === index
                              ? { x: [0, 4, 0] }
                              : {}
                          }
                          transition={{
                            duration: 0.8,
                            repeat:
                              selectedOption?.id === option.id ? Infinity : 0,
                            repeatDelay: 0.5,
                          }}
                          className="ml-1"
                        >
                          <FiArrowRight size={14} />
                        </motion.div>
                      </div>
                    </motion.div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      <div className="mt-8 flex flex-wrap-reverse items-center justify-center gap-5">
        <Button
          asChild
          size={'lg'}
          variant="outline"
          className="px-6 py-2 transition-colors hover:bg-gray-100/80"
        >
          <Link href={URLS.build} className="mr-2">
            Skip Questions
          </Link>
        </Button>

        {questionList.is_last ? (
          <Button
            asChild
            size={'lg'}
            className="group relative overflow-hidden px-6 py-2"
          >
            <Link
              href={
                selectedOption?.configuration_preset_id
                  ? `${URLS.build}?id=${selectedOption.configuration_preset_id}`
                  : URLS.build
              }
              className="mr-2 flex items-center"
            >
              <span>Finish</span>
              <motion.div
                className="ml-1"
                animate={{ x: [0, 4, 0] }}
                transition={{
                  duration: 0.8,
                  repeat: Infinity,
                  repeatDelay: 0.5,
                }}
              >
                <FiArrowRight size={16} />
              </motion.div>
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
            className="group relative overflow-hidden px-6 py-2"
          >
            <span>Next</span>
            <motion.div
              className="ml-1"
              animate={selectedOption ? { x: [0, 4, 0] } : {}}
              transition={{
                duration: 0.8,
                repeat: Infinity,
                repeatDelay: 0.5,
              }}
            >
              <FiArrowRight size={16} />
            </motion.div>
          </Button>
        )}
      </div>
    </div>
  );
};

export default WorkTypeSelection;
