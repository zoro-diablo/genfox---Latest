import TextGenerateEffectDemo from './TextGenerateEffectDemo';
import iphone from '../assets/donna-image.png';
import { motion } from 'framer-motion';

const About = () => {
  return (
    <div className="flex flex-col my-[50px] px-4">
      <div className="flex sm:flex-row flex-col items-center sm:items-start justify-between gap-8">
        <div className="sm:w-[50%] h-full flex flex-col items-center sm:items-start text-center sm:text-left">
          <TextGenerateEffectDemo />
          <motion.p
            className="sm:pb-0 pb-8 font-semibold text-black/40 sm:text-[16px] leading-snug text-sm sm:pl-[120px] sm:mt-[10px] mt-[20px]"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 2 }}
          >
            GenFox is your all-in-one AI assistant designed to simplify your
            life. From managing tasks and tracking fitness to handling finances,
            GenFox seamlessly integrates into your day, making everything
            easier—right from a simple chat. It’s like having the future at
            your fingertips.
          </motion.p>
        </div>

        <div className="sm:w-[50%] flex justify-center items-center">
          <motion.img
            src={iphone}
            className="sm:h-[600px] h-auto w-auto max-w-full"
            alt="phone"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 2, delay: 0.2 }}
          />
        </div>
      </div>

      <motion.p
        className="mt-[20px] sm:mt-0 sm:pb-0 pb-8 font-medium text-black/60 sm:text-[16px] text-sm text-center sm:text-left sm:pl-[120px] sm:hidden block"
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 2 }}
      >
        GenFox is an advanced AI assistant that streamlines daily tasks,
        enhances productivity, and offers personalized, intelligent support.
      </motion.p>
    </div>
  );
};

export default About;
