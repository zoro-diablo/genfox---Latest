/* eslint-disable react/prop-types */
'use client';
import { useScroll, useTransform, motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import TextGenerateEffect from '../ui/TextGenerateEffect';

const words = 'Powerful Connections for Smarter Assistance';

export const Timeline = ({ data }) => {
  const ref = useRef(null);
  const containerRef = useRef(null);
  const [contentHeight, setContentHeight] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const updateScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    updateScreenSize();
    window.addEventListener('resize', updateScreenSize);

    return () => window.removeEventListener('resize', updateScreenSize);
  }, []);

  useEffect(() => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      const computedStyles = window.getComputedStyle(ref.current);
      const marginBottom = parseFloat(computedStyles.marginBottom);

      const buffer = isMobile ? 0 : 50;
      setContentHeight(rect.height + marginBottom + buffer);
    }
  }, [ref, data, isMobile]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 0%', 'end 100%'],
  });

  const heightTransform = useTransform(
    scrollYProgress,
    [0, 1],
    [0, contentHeight]
  );
  const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

  return (
    <div className='w-full bg-white font-sans md:px-10' ref={containerRef}>
      <div className='max-w-7xl mx-auto pt-10 px-4 md:px-8 lg:px-10'>
        <h2 className='text-lg md:text-3xl mb-4 text-[#2e2e2e] max-w-4xl custom-font'>
          <TextGenerateEffect duration={2} filter={false} words={words} />
        </h2>
        <p className='text-neutral-400 font-medium text-sm md:text-base max-w-xl'>
          Streamline your life with GenFox’s powerful platform integrations.
          Designed to work where you do, it turns everyday tools into a hub of
          intelligent support.
        </p>
      </div>
      <div ref={ref} className='relative max-w-7xl mx-auto pb-20'>
        {data?.map((item, index) => (
          <div
            key={index}
            className='flex justify-start pt-10 md:pt-40 md:gap-10'
          >
            <div className='sticky flex flex-col md:flex-row z-40 items-center top-40 self-start max-w-xs lg:max-w-sm md:w-full'>
              <div className='h-10 absolute left-3 md:left-3 w-10 rounded-full bg-neutral-200 flex items-center justify-center'>
                <div className='h-4 w-4 rounded-full bg-neutral-400 border border-neutral-300 p-2' />
              </div>
              <h3 className='hidden md:block text-xl md:pl-20 md:text-3xl font-bold text-neutral-500'>
                {item.title}
              </h3>
            </div>

            <div className='relative pl-20 pr-4 md:pl-4 w-full'>
              <h3 className='md:hidden block text-2xl mb-4 text-left font-bold text-neutral-500'>
                {item.title}
              </h3>
              {item.content}
            </div>
          </div>
        ))}
        <div
          style={{
            height: `${contentHeight}px`,
          }}
          className='absolute md:left-8 left-8 top-0 overflow-hidden w-[2px] bg-[linear-gradient(to_bottom,var(--tw-gradient-stops))] from-transparent from-[0%] via-neutral-200 to-transparent to-[99%] [mask-image:linear-gradient(to_bottom,transparent_0%,black_10%,black_90%,transparent_100%)]'
        >
          <motion.div
            style={{
              height: heightTransform,
              opacity: opacityTransform,
            }}
            className='absolute inset-x-0 top-0 w-[2px] bg-gradient-to-t from-green-500 via-emerald-500 to-transparent from-[0%] via-[10%] rounded-full'
          />
        </div>
      </div>
    </div>
  );
};
