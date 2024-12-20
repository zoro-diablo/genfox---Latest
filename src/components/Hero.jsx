/* eslint-disable react/prop-types */
import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import whatsapp from '../assets/Whatsapp.png';
import drive from '../assets/Drive2OctDenoiserBeauty_002 2.png';
import gmail from '../assets/Gmail.png';
import web from '../assets/5285066.webp';
import outlook from '../assets/8500323.webp';
import dropbox from '../assets/DropboxOctDenoiserBeauty_002 2.png';
import avatar from '../assets/new_avatar.png';

const Hero = ({ contactRef, nameInputRef }) => {
  const [isScrolled, setIsScrolled] = useState(false);

  const scrollToContact = useCallback(() => {
    if (contactRef?.current) {
      contactRef.current.scrollIntoView({ behavior: 'smooth' });
      setTimeout(() => {
        nameInputRef.current?.focus();
      }, 1200);
    }
  }, [contactRef, nameInputRef]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollThreshold = 2400;
      setIsScrolled(window.scrollY > scrollThreshold);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const textVariants = {
    hidden: { y: -50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        stiffness: 100,
        damping: 25,
        delayChildren: 0.5,
        staggerChildren: 0.2,
      },
    },
  };

  const lineVariants = {
    hidden: { y: -30, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };

  const imageVariants = {
    hidden: { opacity: 0, y: -100 },
    visible: { opacity: 1, y: 0, transition: { duration: 1 } },
  };

  const buttonVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        type: 'spring',
        stiffness: 120,
        damping: 10,
        delay: 1,
      },
    },
  };

  const subTextVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 1,
        ease: 'easeOut',
        delay: 0.8,
      },
    },
  };

  const floatVariants = {
    initial: { y: 0 },
    animate: {
      y: [0, -10, 0],
      transition: {
        duration: 2,
        repeat: Infinity,
        repeatType: 'loop',
      },
    },
  };

  const whatsappPositionVariants = {
    initial: { x: 0, y: 50, opacity: 0 },
    visible: { x: 0, y: 50, opacity: 1, rotate: -10 },
    scrolled: { x: -100, y: -100, opacity: 0 },
  };

  const twitterPositionVariants = {
    initial: { x: -50, y: -200, opacity: 0, rotate: 40 },
    visible: {
      x: -50,
      y: -200,
      opacity: 1,
      rotate: 40,
      transition: { duration: 1.5 },
    },
    scrolled: { x: 200, y: -400, opacity: 0.5, rotate: 90 },
  };

  const gmailPositionVariants = {
    initial: { x: -100, y: -100, opacity: 0, scale: 0.5 },
    visible: {
      x: 60,
      y: -55,
      opacity: 1,
      rotate: -20,
      scale: 1,
      transition: { duration: 1, ease: 'easeInOut' },
    },
    scrolled: { x: -200, y: -200, opacity: 0.5, scale: 0.8 },
  };

  const outlookPositionVariants = {
    initial: { x: -200, y: -50, opacity: 0 },
    visible: { x: -50, y: -20, opacity: 1, rotate: -10, scale: 1.2 },
    scrolled: { x: -300, y: -100, opacity: 0, scale: 1.2 },
  };

  const dropboxPositionVariants = {
    initial: { x: 150, y: 150, opacity: 0 },
    visible: { x: 20, y: -100, opacity: 1, rotate: 20, scale: 1 },
    scrolled: { x: 200, y: 200, opacity: 0 },
  };

  const webPositionVariants = {
    initial: { x: -150, y: 100, opacity: 0 },
    visible: { x: 150, y: 150, opacity: 1 },
    scrolled: { x: -200, y: 200, opacity: 0 },
  };

  return (
    <div className='relative w-full h-[650px] overflow-hidden text-[#2e2e2e] px-5 flex justify-between items-center flex-col sm:flex-row sm:px-[100px] mt-[50px]'>
      <div className='w-full'>
        <motion.div
          className='custom-font text-[30px] md:text-[40px] lg:text-[40px] xl:text-[50px] leading-snug text-center sm:text-left'
          variants={textVariants}
          initial='hidden'
          whileInView='visible'
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.p variants={lineVariants}>Meet Your Ai</motion.p>
          <motion.p variants={lineVariants}>Assistant</motion.p>
          <motion.p variants={lineVariants}>from the Future</motion.p>
        </motion.div>
        <motion.div
          className='pl-2 font-medium text-[15px] lg:text-[14px] xl:text-[18px] sm:text-[18px] mt-5 text-[#898d91] text-center sm:text-left'
          variants={subTextVariants}
          initial='hidden'
          whileInView='visible'
          viewport={{ once: true, amount: 0.3 }}
        >
          <p>
            Join the Future be the Earliest to Meet Donna. <br />
            Customize your own fin AI so you can focus on your living.
          </p>
        </motion.div>
        <motion.div
          className='sm:float-left mt-5'
          variants={buttonVariants}
          initial='hidden'
          whileInView='visible'
          viewport={{ once: true, amount: 0.3 }}
        >
          <button
            type='submit'
            onClick={scrollToContact}
            className='flex justify-center items-center gap-2 mx-auto shadow-xl text-base sm:text-lg bg-gray-50 backdrop-blur-md font-medium lg:font-semibold isolation-auto border-gray-50 
  before:absolute before:w-full before:transition-all before:duration-700 before:hover:w-full before:-left-full before:hover:left-0 before:rounded-full 
  before:bg-emerald-500 hover:text-gray-50 before:-z-10 before:aspect-square before:hover:scale-150 before:hover:duration-700 
  relative z-10 px-4 py-2 sm:px-6 sm:py-3 md:px-8 md:py-4 overflow-hidden border-2 rounded-full group'
          >
            Join Now
            <svg
              className='w-6 h-6 sm:w-8 sm:h-8 justify-end group-hover:rotate-90 group-hover:bg-gray-50 text-gray-800 group-hover:text-gray-50 ease-linear duration-300 rounded-full 
    border border-gray-700 group-hover:border-none p-1 sm:p-2 rotate-45'
              viewBox='0 0 16 19'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M7 18C7 18.5523 7.44772 19 8 19C8.55228 19 9 18.5523 9 18H7ZM8.70711 0.292893C8.31658 -0.0976311 7.68342 -0.0976311 7.29289 0.292893L0.928932 6.65685C0.538408 7.04738 0.538408 7.68054 0.928932 8.07107C1.31946 8.46159 1.95262 8.46159 2.34315 8.07107L8 2.41421L13.6569 8.07107C14.0474 8.46159 14.6805 8.46159 15.0711 8.07107C15.4616 7.68054 15.4616 7.04738 15.0711 6.65685L8.70711 0.292893ZM9 18L9 1H7L7 18H9Z'
                className='fill-gray-800 group-hover:fill-gray-800'
              ></path>
            </svg>
          </button>
        </motion.div>
      </div>

      <div className='relative sm:w-[60%] flex items-center'>
        <div className='mr-7'>
          <motion.img
            src={avatar}
            alt='AI Assistant'
            className='w-full h-[305px] sm:h-[500px] md:h-[500px] lg:h-[500px] xl:h-[500px] 2xl:h-[500px] object-cover overflow-visible'
            variants={imageVariants}
            initial='hidden'
            whileInView='visible'
            viewport={{ once: true, amount: 0.3 }}
          />
        </div>
        {/* WhatsApp Icon */}
        <motion.div
          className='absolute top-1/2 transform -translate-y-1/2'
          initial='initial'
          animate={isScrolled ? 'scrolled' : 'visible'}
          variants={whatsappPositionVariants}
          transition={{ duration: 0.5 }}
        >
          <motion.img
            src={whatsapp}
            alt='WhatsApp icon'
            className='h-[70px] sm:h-[100px] object-contain'
            variants={floatVariants}
            initial='initial'
            animate='animate'
          />
        </motion.div>
        {/* Drive Icon */}
        <motion.div
          className='absolute top-1/2 right-0 transform -translate-y-1/2 z-[-2] rotate-45'
          initial='initial'
          animate={isScrolled ? 'scrolled' : 'visible'}
          variants={twitterPositionVariants}
          transition={{ duration: 0.5 }}
        >
          <motion.img
            src={drive}
            alt='Drive icon'
            className='h-[80px] sm:h-[100px] object-contain'
            variants={floatVariants}
            initial='initial'
            animate='animate'
          />
        </motion.div>
        {/* Gmail Icon */}
        <motion.div
          className='absolute top-0 left-0 transform translate-x-[-20%] translate-y-[-20%]'
          initial='initial'
          animate={isScrolled ? 'scrolled' : 'visible'}
          variants={gmailPositionVariants}
        >
          <motion.img
            src={gmail}
            alt='Gmail icon'
            className='h-[70px] sm:h-[100px] object-contain'
            variants={floatVariants}
            initial='initial'
            animate='animate'
          />
        </motion.div>
        {/* Dropbox Icon */}
        <motion.div
          className='absolute bottom-0 right-0 translate-x-[20%] translate-y-[20%] z-[-1] drop-shadow-xl'
          initial='initial'
          animate={isScrolled ? 'scrolled' : 'visible'}
          variants={dropboxPositionVariants}
          transition={{ duration: 1 }}
        >
          <motion.img
            src={dropbox}
            alt='Dropbox icon'
            className='h-[70px] sm:h-[130px] object-contain'
            variants={floatVariants}
            initial='initial'
            animate='animate'
          />
        </motion.div>
        {/* Outlook Icon */}
        <motion.div
          className='absolute top-[30%] left-[10%] z-[-2] drop-shadow-xl'
          initial='initial'
          animate={isScrolled ? 'scrolled' : 'visible'}
          variants={outlookPositionVariants}
          transition={{ duration: 1.5 }}
        >
          <motion.img
            src={outlook}
            alt='Outlook icon'
            className='w-[80px] object-contain'
            variants={floatVariants}
            initial='initial'
            animate='animate'
          />
        </motion.div>
        {/* Web Icon */}
        <motion.div
          className='absolute bottom-[15%] left-[20%]'
          initial='initial'
          animate={isScrolled ? 'scrolled' : 'visible'}
          variants={webPositionVariants}
          transition={{ duration: 1.5 }}
        >
          <motion.img
            src={web}
            alt='Web icon'
            className='h-[70px] sm:h-[100px] object-contain'
            variants={floatVariants}
            initial='initial'
            animate='animate'
          />
        </motion.div>
      </div>
    </div>
  );
};

export default Hero;
