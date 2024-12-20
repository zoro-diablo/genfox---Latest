/* eslint-disable react/prop-types */
import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import { Timeline } from './ui/Timeline';
import whatsapp from '../assets/WhatsApp.svg.webp';
import pic2 from '../assets/apple.png';
import pic3 from '../assets/Google__G__logo.svg.webp';
import pic4 from '../assets/8500323.webp';
import pic5 from '../assets/dataprivacy.webp';
import pic6 from '../assets/machineleaning.webp';
import pic7 from '../assets/dataanalysis.webp';
import pic8 from '../assets/insightsengine.webp';


const SpringModal = ({ isOpen, setIsOpen, content }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsOpen(false)}
          className='bg-black/50 backdrop-blur-sm fixed inset-0 z-50 flex items-center justify-center'
        >
          <motion.div
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.95 }}
            onClick={(e) => e.stopPropagation()}
            className='bg-white rounded-lg w-full max-w-lg shadow-xl p-6 text-black'
          >
            {/* Header */}
            <div className='flex items-center justify-center mb-4'>
              <div className='flex items-center justify-center gap-2'>
                <div className='w-10 h-10 rounded-full bg-black flex items-center justify-center'>
                  <img
                    src='/path-to-your-first-icon.png'
                    alt='First Icon'
                    className='w-6 h-6'
                  />
                </div>
                <div className='w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center'>
                  <img
                    src='/path-to-your-second-icon.png'
                    alt='Second Icon'
                    className='w-6 h-6'
                  />
                </div>
              </div>
            </div>

            {/* Title */}
            <h3 className='text-center text-2xl font-semibold text-gray-900 mb-2'>
              {content.title || 'Connect Untitled to Linear'}
            </h3>

            {/* Subtitle */}
            <p className='text-center text-gray-600 mb-6'>
              {content.description ||
                'Prioritize work based on customer needs and build a tighter feedback loop with your customers.'}
            </p>

            {/* Permissions List */}
            {content.permissions && content.permissions.length > 0 && (
              <ul className='text-gray-700 mb-6 space-y-2'>
                {content.permissions.map((permission, index) => (
                  <li key={index} className='flex items-start gap-2'>
                    <div className='w-5 h-5 flex items-center justify-center'>
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        fill='none'
                        viewBox='0 0 24 24'
                        strokeWidth={2}
                        stroke='currentColor'
                        className='text-indigo-600 w-5 h-5'
                      >
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          d='M5 13l4 4L19 7'
                        />
                      </svg>
                    </div>
                    <span>{permission}</span>
                  </li>
                ))}
              </ul>
            )}

            {/* Link and Copy Button */}
            <div className='bg-gray-100 rounded-md p-3 flex items-center justify-between mb-4'>
              <span className='text-gray-600 text-sm truncate'>
                {content.link || 'app.untitledui.com/integrations/linear'}
              </span>
              <button
                onClick={() =>
                  navigator.clipboard.writeText(
                    content.link || 'app.untitledui.com/integrations/linear'
                  )
                }
                className='text-indigo-600 text-sm font-semibold hover:underline'
              >
                Copy link
              </button>
            </div>

            {/* Action Buttons */}
            <div className='flex justify-between gap-4'>
              <button
                onClick={() => console.log('How it works clicked')}
                className='text-gray-600 hover:text-gray-800 font-medium text-sm'
              >
                How it works
              </button>
              <div className='flex gap-3'>
                <button
                  onClick={() => setIsOpen(false)}
                  className='bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium py-2 px-4 rounded-md'
                >
                  Cancel
                </button>
                <button
                  onClick={content.onConfirm}
                  className='bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-md'
                >
                  Allow access
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};


const boxVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.6,
      ease: 'easeOut'
    }
  },
};

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};


export function TimelineDemo() {
  const [isOpen, setIsOpen] = useState(false);
  const [modalContent, setModalContent] = useState({
    title: '',
    description: '',
    permissions: [],
    link: '',
    onConfirm: () => {},
  });

  const items = [
    {
      id: 1,
      logo: whatsapp,
      title: 'Whatsapp',
      website: 'whatsapp.com',
      description:
        'Seamlessly integrated with WhatsApp, GenFox enhances messaging capabilities, bringing smart assistance directly to the platform you use most. Manage tasks, track progress, and stay connected effortlessly.',
      modal: {
        title: 'WhatsApp Integration',
        description:
          'Seamlessly connect your platform with WhatsApp for real-time messaging and customer support.',
        permissions: ['Read Messages', 'Send Messages', 'Manage Contacts'],
        link: 'app.untitledui.com/integrations/linear/whatsapp',
        onConfirm: () => {
          console.log('WhatsApp Integration Confirmed');
          setIsOpen(false);
        },
      },
    },
    {
      id: 2,
      logo: pic2,
      title: 'Apple',
      website: 'apple.com',
      description:
        'GenFox integrates effortlessly with Apple services, leveraging their robust ecosystem to enhance your experience. From syncing with Apple Health to seamless calendar management, it’s built to work smarter for you.',
      modal: {
        title: 'Apple Integration',
        description:
          'Empower your platform with the capabilities of Apple services, including iCloud and Siri integrations.',
        permissions: ['Access iCloud', 'Use Siri Commands'],
        link: 'app.untitledui.com/integrations/linear/apple',
        onConfirm: () => {
          console.log('Apple Integration Confirmed');
          setIsOpen(false);
        },
      },
    },
    {
      id: 3,
      logo: pic3,
      title: 'Google',
      website: 'google.com',
      description:
        'GenFox integrates seamlessly with Google’s ecosystem, empowering you with tools for enhanced productivity, streamlined workflows, and effortless collaboration.',
      modal: {
        title: 'Google Integration',
        description:
          'Access the power of Google Workspace, Calendar, and Drive for seamless productivity enhancements.',
        permissions: ['Access Google Drive', 'Manage Calendar', 'Use Google Workspace'],
        link: 'app.untitledui.com/integrations/linear/google',
        onConfirm: () => {
          console.log('Google Integration Confirmed');
          setIsOpen(false);
        },
      },
    },
    {
      id: 4,
      logo: pic4,
      title: 'Outlook',
      website: 'outlook.com',
      description:
        'GenFox integrates with Outlook, bringing professional email and scheduling tools right to your fingertips. Manage your inbox and calendar effortlessly for a more organized day.',
      modal: {
        title: 'Outlook Integration',
        description:
          'Streamline communication with Outlook integration, offering robust email and calendar features.',
        permissions: ['Manage Emails', 'Sync Calendar'],
        link: 'app.untitledui.com/integrations/linear/outlook',
        onConfirm: () => {
          console.log('Outlook Integration Confirmed');
          setIsOpen(false);
        },
      },
    },
  ];

  const aiProducts = [
    {
      id: 1,
      image: pic5,
      title: 'Privacy and Security AI',
      description:
        'Your privacy is our priority. GenFox is built with advanced encryption and privacy-first AI to ensure your data is secure, confidential, and always under your control. Because trust is the foundation of every great assistant.',
      modal: {
        title: 'Privacy and Security AI',
        description:
          'GenFox ensures your data is protected with state-of-the-art encryption and privacy measures.',
        permissions: ['Data Encryption', 'Privacy Controls'],
        link: 'app.untitledui.com/ai/privacy-security',
        onConfirm: () => {
          console.log('Privacy and Security AI Confirmed');
          setIsOpen(false);
        },
      },
    },
    {
      id: 2,
      image: pic6,
      title: 'Adaptive Learning System',
      description:
        'GenFox delivers insights that matter, when they matter. With real-time data analytics and intelligent forecasting, it empowers you to make informed decisions and stay ahead, effortlessly.',
      modal: {
        title: 'Adaptive Learning System',
        description:
          'Use AI-driven adaptive learning systems to provide personalized educational experiences.',
        permissions: ['Personalized Learning', 'Real-Time Analytics'],
        link: 'app.untitledui.com/ai/adaptive-learning',
        onConfirm: () => {
          console.log('Adaptive Learning System Confirmed');
          setIsOpen(false);
        },
      },
    },
    {
      id: 3,
      image: pic7,
      title: 'Real-Time Data Analytics & Forecasting',
      description:
        'Unlock deeper understanding with GenFox’s AI-Powered Insights Engine. It analyzes patterns, delivers actionable recommendations, and helps you make smarter decisions in every aspect of your life.',
      modal: {
        title: 'Real-Time Data Analytics',
        description:
          'Leverage AI to analyze data in real-time and gain actionable insights for better decision-making.',
        permissions: ['Data Analysis', 'Forecasting'],
        link: 'app.untitledui.com/ai/data-analytics',
        onConfirm: () => {
          console.log('Real-Time Data Analytics Confirmed');
          setIsOpen(false);
        },
      },
    },
    {
      id: 4,
      image: pic8,
      title: 'AI-Powered Insights Engine',
      description:
        'Unlock deeper insights from your data using cutting-edge AI technologies. Transform data into powerful business strategies.',
      modal: {
        title: 'AI-Powered Insights Engine',
        description:
          'Discover transformative insights using advanced AI technologies for data analysis and business intelligence.',
        permissions: ['Business Intelligence', 'Data Transformation'],
        link: 'app.untitledui.com/ai/insights-engine',
        onConfirm: () => {
          console.log('AI-Powered Insights Engine Confirmed');
          setIsOpen(false);
        },
      },
    },
  ];

  const data = [
    {
      title: 'Platform Integration',
      content: (
        <motion.div
          className='grid grid-cols-1 sm:grid-cols-2 gap-6 p-4'
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {items.map((item) => (
            <motion.div
              key={item.id}
              className='shadow-md rounded-2xl w-full bg-white border border-1'
              variants={boxVariants}
            >
              <div className='flex items-center gap-2 px-5 py-2'>
                <img
                  src={item.logo}
                  alt={`${item.title}_logo`}
                  className='h-[65px] p-1'
                />
                <div>
                  <p className='font-semibold text-lg'>{item.title}</p>
                  <p className='text-black/70 text-[11px] font-medium'>
                    {item.website}
                  </p>
                </div>
              </div>
              <p className='text-[12px] sm:text-[14px] md:text-[10px] lg:text-[12px] xl:text-[14px] py-2 sm:py-4 md:py-5 px-3 sm:px-5 md:px-6 font-medium text-black/50'>
                {item.description}
              </p>

              {/* <div className='flex items-center justify-end pb-4 px-4'>
                <button
                  onClick={() => {
                    setModalContent(item.modal);
                    setIsOpen(true);
                  }}
                  className='py-2 px-3 font-semibold shadow-md rounded-md text-[14px] border border-1'
                >
                  View Integration
                </button>
              </div> */}
            </motion.div>
          ))}
        </motion.div>
      ),
    },
    {
      title: 'AI Products',
      content: (
        <motion.div
          className='grid grid-cols-1 sm:grid-cols-2 gap-6 p-4'
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {aiProducts.map((product) => (
            <motion.div
              key={product.id}
              className='shadow-md rounded-2xl w-full bg-white border border-1'
              variants={boxVariants}
            >
              <div className='flex items-center gap-2 px-5 py-2'>
                <img
                  src={product.image}
                  alt={`${product.title}_image`}
                  className='h-[65px] p-1'
                />
                <div>
                  <p className='font-semibold text-md'>{product.title}</p>
                </div>
              </div>
              <p className='text-[12px] sm:text-[14px] md:text-[10px] lg:text-[12px] xl:text-[14px] py-2 sm:py-4 md:py-5 px-3 sm:px-5 md:px-6 font-medium text-black/50'>
                {product.description}
              </p>
              {/* <div className='flex items-center justify-end pb-4 px-4'>
                <button
                  onClick={() => {
                    setModalContent(product.modal);
                    setIsOpen(true);
                  }}
                  className='py-2 px-3 font-semibold shadow-md rounded-md text-[14px] border border-1'
                >
                  Learn More
                </button>
              </div> */}
            </motion.div>
          ))}
        </motion.div>
      ),
    },
  ];

  return (
    <div className='w-full'>
      <Timeline data={data} />
      <SpringModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        content={modalContent}
      />
    </div>
  );
}
