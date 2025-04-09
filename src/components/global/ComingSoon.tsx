'use client';
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FaInstagram, FaTwitter, FaFacebook, FaGithub } from 'react-icons/fa';

export default function ComingSoon() {
  interface Circle {
    width: number;
    height: number;
    left: string;
    top: string;
    x: number[];
    y: number[];
    duration: number;
  }

  const [circles, setCircles] = useState<Circle[]>([]);

  useEffect(() => {
    // Generate circle styles only on the client
    const newCircles = [...Array(20)].map(() => ({
      width: Math.random() * 200 + 50,
      height: Math.random() * 200 + 50,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      x: [0, Math.random() * 100 - 50],
      y: [0, Math.random() * 100 - 50],
      duration: Math.random() * 20 + 10,
    }));
    setCircles(newCircles);
  }, []); // Empty dependency array ensures this runs once on mount

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center relative overflow-hidden bg-gradient-to-br from-gray-700 via-gray-600 to-gray-500">
      <div className="absolute inset-0 overflow-hidden">
        {circles.map((circle, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-white/10 backdrop-blur-sm"
            style={{
              width: circle.width,
              height: circle.height,
              left: circle.left,
              top: circle.top,
            }}
            animate={{
              x: circle.x,
              y: circle.y,
            }}
            transition={{
              duration: circle.duration,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: 'reverse',
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>

      <div className="relative z-10 w-full max-w-5xl px-4 py-16 flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl md:text-7xl p-5 font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-300 mb-4">
            Coming Soon
          </h1>
          <p className="text-xl md:text-2xl text-gray-200 mb-12 max-w-2xl">
            We&apos;re working hard to bring you something amazing. Stay tuned
            for our big launch!
          </p>
        </motion.div>

        {/* Social links */}
        <motion.div
          className="flex space-x-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          {[
            { icon: FaInstagram, href: '#' },
            { icon: FaTwitter, href: '#' },
            { icon: FaFacebook, href: '#' },
            { icon: FaGithub, href: '#' },
          ].map((social, index) => (
            <a
              key={index}
              href={social.href}
              className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
            >
              <social.icon className="h-5 w-5 text-white" />
            </a>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
