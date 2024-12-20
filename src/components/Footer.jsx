import { motion } from 'framer-motion';
import linkedin from '../assets/linkedin.png';

const Footer = () => {
  return (
    <motion.footer
      className=''
      initial={{ y: 50, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      viewport={{ once: true, amount: 0.3 }}
    >
      <div className='mx-auto max-w-5xl mt-[100px] px-4 py-16 sm:px-6 lg:px-8'>
        <div className='flex justify-center text-teal-600'>
          <img className='w-[60px]' src='/logo.png' alt='logo' />
        </div>

        <p className='text-xl font-semibold tracking-tight ml-1 sm:pr-0 pr-4 sm:text-3xl text-center'>
          GenFox
        </p>
        <p className='text-center text-black/40 pt-3 font-semibold text-[16px]'>
          Your assistant from future
        </p>

        <ul className='mt-12 flex text-black/60 font-medium gap-2 items-center justify-center'>
          <p className='text-sm'>Follow us :</p>
          <li>
            <a
              href='https://www.linkedin.com/company/genfox-ai/'
              rel='noreferrer'
              target='_blank'
              className='text-gray-500 transition hover:text-gray-700/75'
            >
              <span className='sr-only'>LinkedIn</span>
              <img
                src={linkedin}
                alt='LinkedIn'
                className='h-5 flex justify-center items-center mt-[2px]'
              />
            </a>
          </li>
        </ul>
      </div>
      <div className='mt-4 mb-2 border-t border-gray-200 mx-5'></div>
      <p className='text-neutral-300 mx-5 font-medium text-[12px]'>
        @ 2024 GenFox
      </p>
    </motion.footer>
  );
};

export default Footer;
