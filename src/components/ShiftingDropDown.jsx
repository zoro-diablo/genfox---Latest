import { useEffect, useState } from 'react';
import {
  FiArrowRight,
  FiBarChart2,
  FiChevronDown,
  FiHome,
  FiPieChart,
} from 'react-icons/fi';
import { AnimatePresence, motion } from 'framer-motion';
import cryptoimg from '../assets/cryptowire.png';
import camoimg from '../assets/camoimg.webp';

export const ShiftingDropDown = () => {
  return (
    <div className='w-full flex justify-center py-4 px-4 shadow-custom rounded-full'>
      <Tabs />
    </div>
  );
};

const Tabs = () => {
  const [selected, setSelected] = useState(null);
  const [dir, setDir] = useState(null);

  const handleSetSelected = (val) => {
    if (typeof selected === 'number' && typeof val === 'number') {
      setDir(selected > val ? 'r' : 'l');
    } else if (val === null) {
      setDir(null);
    }

    setSelected(val);
  };

  return (
    <div
      onMouseLeave={() => handleSetSelected(null)}
      className='relative flex h-fit gap-2'
    >
      {TABS.map((t) => {
        return (
          <Tab
            key={t.id}
            selected={selected}
            handleSetSelected={handleSetSelected}
            tab={t.id}
          >
            {t.title}
          </Tab>
        );
      })}

      <AnimatePresence>
        {selected && <Content dir={dir} selected={selected} />}
      </AnimatePresence>
    </div>
  );
};

const Tab = ({ children, tab, handleSetSelected, selected }) => {
  return (
    <button
      id={`shift-tab-${tab}`}
      onMouseEnter={() => handleSetSelected(tab)}
      onClick={() => handleSetSelected(tab)}
      className={`flex items-center gap-1 rounded-md px-3 py-1.5 text-sm transition-colors font-medium ${
        selected === tab
          ? ' bg-neutral-100 text-neutral-400'
          : 'text-neutral-800'
      }`}
    >
      <span>{children}</span>
      <FiChevronDown
        className={`transition-transform ${
          selected === tab ? 'rotate-180' : ''
        }`}
      />
    </button>
  );
};

const Content = ({ selected, dir }) => {
  return (
    <motion.div
      id='overlay-content'
      initial={{
        opacity: 0,
        y: 8,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      exit={{
        opacity: 0,
        y: 8,
      }}
      className='absolute left-0 top-[calc(100%_+_24px)] w-96 rounded-lg bg-white p-4 shadow-custom'
    >
      <Bridge />
      <Nub selected={selected} />

      {TABS.map((t) => {
        return (
          <div className='overflow-hidden' key={t.id}>
            {selected === t.id && (
              <motion.div
                initial={{
                  opacity: 0,
                  x: dir === 'l' ? 100 : dir === 'r' ? -100 : 0,
                }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.25, ease: 'easeInOut' }}
              >
                <t.Component />
              </motion.div>
            )}
          </div>
        );
      })}
    </motion.div>
  );
};

const Bridge = () => (
  <div className='absolute -top-[24px] left-0 right-0 h-[24px]' />
);

const Nub = ({ selected }) => {
  const [left, setLeft] = useState(0);

  useEffect(() => {
    moveNub();
  }, [selected]);

  const moveNub = () => {
    if (selected) {
      const hoveredTab = document.getElementById(`shift-tab-${selected}`);
      const overlayContent = document.getElementById('overlay-content');

      if (!hoveredTab || !overlayContent) return;

      const tabRect = hoveredTab.getBoundingClientRect();
      const { left: contentLeft } = overlayContent.getBoundingClientRect();

      const tabCenter = tabRect.left + tabRect.width / 2 - contentLeft;

      setLeft(tabCenter);
    }
  };

  return (
    <motion.span
      style={{
        clipPath: 'polygon(0 0, 100% 0, 50% 50%, 0% 100%)',
      }}
      animate={{ left }}
      transition={{ duration: 0.25, ease: 'easeInOut' }}
      className='absolute left-1/2 top-0 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rotate-45 rounded-tl border border-neutral-600 bg-neutral-900'
    />
  );
};

const Products = () => {
  return (
    <div>
      <div>
        <div className='flex gap-4'>
          <div>
            <h3 className='mb-2 text-sm font-medium'>Startup</h3>
            <a
              href='#'
              className='mb-1 block text-[13px] text-neutral-400 hover:text-neutral-900'
            >
              Bookkeeping
            </a>
            <a
              href='#'
              className='block text-[13px] text-neutral-400 hover:text-neutral-900'
            >
              Invoicing
            </a>
          </div>
          <div>
            <h3 className='mb-2 text-sm font-medium'>Scaleup</h3>
            <a
              href='#'
              className='mb-1 block text-[13px] text-neutral-400 hover:text-neutral-900'
            >
              Live Coaching
            </a>
            <a
              href='#'
              className='mb-1 block text-[13px] text-neutral-400 hover:text-neutral-900'
            >
              Reviews
            </a>
            <a
              href='#'
              className='block text-[13px] text-neutral-400 hover:text-neutral-900'
            >
              Tax/VAT
            </a>
          </div>
          <div>
            <h3 className='mb-2 text-sm font-medium'>Enterprise</h3>
            <a
              href='#'
              className='mb-1 block text-[13px] text-neutral-400 hover:text-neutral-900'
            >
              White glove
            </a>
            <a
              href='#'
              className='mb-1 block text-[13px] text-neutral-400 hover:text-neutral-900'
            >
              SOX Compliance
            </a>
            <a
              href='#'
              className='block text-[13px] text-neutral-400 hover:text-neutral-900'
            >
              Staffing
            </a>
            <a
              href='#'
              className='block text-[13px] text-neutral-400 hover:text-neutral-900'
            >
              More
            </a>
          </div>
        </div>
      </div>

      <button className='ml-auto mt-4 flex items-center gap-1 text-sm text-black'>
        <span>View more</span>
        <FiArrowRight />
      </button>
    </div>
  );
};

const Pricing = () => {
  return (
    <div className='grid grid-cols-3 gap-4 divide-x divide-neutral-700'>
      <a
        href='#'
        className='flex w-full flex-col items-center justify-center py-2 text-neutral-400 transition-colors hover:text-neutral-900'
      >
        <FiHome className='mb-2 text-xl text-black' />
        <span className='text-xs'>Startup</span>
      </a>
      <a
        href='#'
        className='flex w-full flex-col items-center justify-center py-2 text-neutral-400 transition-colors hover:text-neutral-900'
      >
        <FiBarChart2 className='mb-2 text-xl text-black' />
        <span className='text-xs'>Scaleup</span>
      </a>
      <a
        href='#'
        className='flex w-full flex-col items-center justify-center py-2 text-neutral-400 transition-colors hover:text-neutral-900'
      >
        <FiPieChart className='mb-2 text-xl text-black' />
        <span className='text-xs'>Enterprise</span>
      </a>
    </div>
  );
};

const Blog = () => {
  return (
    <div>
      <div className='grid grid-cols-2 gap-2'>
        <a href='#'>
          <img
            className='mb-2 h-14 w-full rounded object-cover'
            src={cryptoimg}
            alt='Placeholder image'
          />
          <h4 className='mb-0.5 text-sm font-medium'>Lorem ipsum dolor</h4>
          <p className='text-xs text-neutral-400'>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet illo
            quidem eos.
          </p>
        </a>
        <a href='#'>
          <img
            className='mb-2 h-14 w-full rounded object-cover'
            src={camoimg}
            alt='Placeholder image'
          />
          <h4 className='mb-0.5 text-sm font-medium'>Lorem ipsum dolor</h4>
          <p className='text-xs text-neutral-400'>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet illo
            quidem eos.
          </p>
        </a>
      </div>
      <button className='ml-auto mt-4 flex items-center gap-1 text-sm text-black'>
        <span>View more</span>
        <FiArrowRight />
      </button>
    </div>
  );
};

const TABS = [
  {
    title: 'Home',
    Component: Products,
  },
  {
    title: 'Features',
    Component: Pricing,
  },
  {
    title: 'About',
    Component: Blog,
  },
].map((n, idx) => ({ ...n, id: idx + 1 }));
