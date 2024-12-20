import { ReactLenis } from 'lenis/dist/lenis-react';
import {
  motion,
  useMotionTemplate,
  useScroll,
  useTransform,
} from 'framer-motion';
import { FiArrowRight, FiMapPin } from 'react-icons/fi';
import { useRef } from 'react';
import genfoxheroimage from '../assets/GenFox.png';
import logo from '../assets/logogen.png';
import whatsapp from '../assets/Frame 3.png';
import call from '../assets/Frame 2.png';
import skills from '../assets/Frame 4.png';
import integration from '../assets/Frame 5 (1).png';

export const SmoothScrollHero = () => {
  return (
    <div className='bg-white'>
      <ReactLenis
        root
        options={{
          lerp: 0.05,
        }}
      >
        <Nav />
        <Hero />
      </ReactLenis>
    </div>
  );
};

const Nav = () => {
  return (
    <nav className='fixed left-0 right-0 top-0 z-50 flex flex-wrap mx-auto items-center justify-between px-4 py-3 text-white sm:flex-nowrap sm:px-6'>
      <img src={logo} className='h-8 sm:h-10' alt='logo' />
      <button
       
        className='flex items-center gap-1 text-xs text-zinc-400 sm:text-sm '
      >
        ... 
      </button>
    </nav>
  );
};

const SECTION_HEIGHT = 1500;

const Hero = () => {
  return (
    <div
      style={{ height: `calc(${SECTION_HEIGHT}px + 100vh)` }}
      className='relative w-full'
    >
      <CenterImage />
      <ParallaxImages />
      <div className='absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-b from-zinc-950/0 to-zinc-950 sm:h-96' />
    </div>
  );
};

const CenterImage = () => {
  const { scrollY } = useScroll();

  const clip1 = useTransform(scrollY, [0, 1500], [25, 0]);
  const clip2 = useTransform(scrollY, [0, 1500], [75, 100]);

  const clipPath = useMotionTemplate`polygon(${clip1}% ${clip1}%, ${clip2}% ${clip1}%, ${clip2}% ${clip2}%, ${clip1}% ${clip2}%)`;

  const backgroundSize = useTransform(
    scrollY,
    [0, SECTION_HEIGHT + 500],
    ['170%', '100%']
  );
  const opacity = useTransform(
    scrollY,
    [SECTION_HEIGHT, SECTION_HEIGHT + 500],
    [1, 0]
  );

  return (
    <motion.div
      className='sticky top-0 h-screen w-full'
      style={{
        clipPath,
        backgroundSize,
        opacity,
        backgroundImage: `url(${genfoxheroimage})`,
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    />
  );
};

const ParallaxImages = () => {
  return (
    <div className='mx-auto max-w-5xl px-4 pt-[200px]'>
      <ParallaxImg
        src={call}
        alt='fox call'
        start={-200}
        end={200}
        className='w-1/2 sm:w-1/3 rounded-lg'
      />
      <ParallaxImg
        src={whatsapp}
        alt='Whatsapp chat bot'
        start={200}
        end={-250}
        className='mx-auto w-3/4 sm:w-2/3 rounded-lg'
      />
      <ParallaxImg
        src={skills}
        alt='skills and stuff'
        start={-200}
        end={200}
        className='ml-auto w-1/2 sm:w-1/3 rounded-lg'
      />
      <ParallaxImg
        src={integration}
        alt='integration apps'
        start={0}
        end={-500}
        className='ml-12 w-2/3 sm:ml-24 sm:w-5/12 rounded-lg'
      />
    </div>
  );
};

const ParallaxImg = ({ className, alt, src, start, end }) => {
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: [`${start}px end`, `end ${end * -1}px`],
  });

  const opacity = useTransform(scrollYProgress, [0.75, 1], [1, 0]);
  const scale = useTransform(scrollYProgress, [0.75, 1], [1, 0.85]);

  const y = useTransform(scrollYProgress, [0, 1], [start, end]);
  const transform = useMotionTemplate`translateY(${y}px) scale(${scale})`;

  return (
    <motion.img
      src={src}
      alt={alt}
      className={className}
      ref={ref}
      style={{ transform, opacity }}
    />
  );
};
