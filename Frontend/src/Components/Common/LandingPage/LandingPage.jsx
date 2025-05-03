import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import StarBackground from '../../User/Threejs/StarBackground';
import Globe from '../../User/Threejs/Globe';
import Earth from '../../../assets/earth.png';
import bulb from '../../../assets/bulb.png';

function LandingPage() {
  const facts = [
    "Greece has over 6,000 islands.",
    "Australia is wider than the moon.",
    "Russia spans 11 time zones.",
    "Canada has more lakes than the rest of the world combined.",
    "Bhutan measures success by Gross National Happiness.",
    "Greenland is the world's largest island.",
  ];

  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % facts.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative min-h-screen bg-black overflow-hidden pb-24">
      <div className="absolute inset-0 z-0 pointer-events-none">
        <StarBackground />
      </div>

      <div className="relative z-10 pt-24 w-full text-center">
        <div className="flex justify-center items-center gap-3 flex-wrap px-4">
          <h2 className="text-white text-4xl md:text-5xl font-bold glow drop-shadow-lg">
            Explore Every Country on Earth
          </h2>
          <img src={Earth} alt="Earth Icon" className="w-10 h-10" />
        </div>

        <p className="text-cyan-300 text-lg mt-2 tracking-wide">
          Click, search about nations.
        </p>

       
        <div className="text-white mt-4 min-h-[32px]">
          <AnimatePresence mode="wait">
            <motion.p
              key={index}
              className="text-sm md:text-base text-gray-300"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.5 }}
            >
            <div className="flex items-center gap-x-2 justify-center">
              <img src={bulb} className="w-6 h-6" />
              <p className="text-sm md:text-base text-gray-300">
                Did you know? {facts[index]}
              </p>
            </div>

            </motion.p>
          </AnimatePresence>
        </div>

        <div className="">
          <Globe />
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
