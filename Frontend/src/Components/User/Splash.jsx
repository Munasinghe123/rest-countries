
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import flag1 from '../../assets/flags/usa.png';
import flag2 from '../../assets/flags/india.jpg';
import flag3 from '../../assets/flags/japan.png';
import flag4 from '../../assets/flags/france.png';
import flag5 from '../../assets/flags/brazil.png';
import flag6 from '../../assets/flags/sri.jpg';
import flag7 from '../../assets/flags/china.png';

const flags = [flag1, flag2, flag3, flag4, flag5,flag6,flag7];

const generateAnimationProps = (index) => {
    const angle = (Math.PI * 2 * index) / flags.length;
    const radius = 200;
    const x = Math.cos(angle) * radius;
    const y = Math.sin(angle) * radius;
  
    return {
      initial: { opacity: 0, scale: 0.5, x: 0, y: 0 },
      animate: { opacity: 1, scale: 1, x, y },
      transition: {
        duration: 1,
        delay: index * 0.2,
        ease: "easeOut",
        type: "spring",
        stiffness: 100,
        damping: 12,
      },
    };
  };
  

export default function Splash() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => navigate('/homePage'), 3000);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-black overflow-hidden relative">
      {flags.map((src, idx) => (
        <motion.img
          key={idx}
          src={src}
          alt={`Flag ${idx}`}
          className="w-20 h-14 absolute"
          {...generateAnimationProps(idx)}
        />
      ))}
      <h1 className="absolute text-white text-4xl font-bold z-10">Welcome!</h1>
    </div>
  );
}
