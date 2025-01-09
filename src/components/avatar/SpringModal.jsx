// SpringModal.jsx

import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import avatar1 from '../../assets/avatar.png';
import avatar2 from '../../assets/new_avatar.png';
import {
  IoCloudUploadSharp,
  IoNotificationsSharp,
  IoInformationCircleOutline,
  IoChevronBack,
  IoChevronForward,
  IoCheckmarkSharp, // Importing checkmark icon
} from 'react-icons/io5';
import bank from '../../assets/bank.webp';
import google from '../../assets/Googles.png';
import outlook from '../../assets/8500323.webp';
import whatsapp from '../../assets/Whatsapp.png';
import apple from '../../assets/apple.png';
import foxProduct1 from '../../assets/Frame 3.png';
import foxProduct2 from '../../assets/Frame 2.png';
import foxProduct3 from '../../assets/Frame 5 (1).png';
import foxSkill1 from '../../assets/machineleaning.webp';
import foxSkill2 from '../../assets/dataanalysis.webp';
import foxSkill3 from '../../assets/dataprivacy.webp';
import check from '../../assets/checklist.png';


const foxFeatures = {
  foxProducts: [
    {
      name: 'WhatsApp Bot',
      src: foxProduct1,
      description: 'GenFox AI is a smart WhatsApp bot that simplifies tasks like scheduling, reminders, to-do lists, and quick queries. Its your personal assistant for boosting productivity, all through an intuitive chat interface.',
    },
    {
      name: 'Voice Call',
      src: foxProduct2,
      description: 'A voice-call-based GenFox AI could offer users an intuitive way to interact using speech, allowing them to manage tasks, set reminders, or get answers without relying on typing or messaging.',
    },
    {
      name: 'Integration Platform',
      src: foxProduct3,
      description: 'Integrating GenFox AI with third-party software expands its functionality, making it a comprehensive personal assistant. '
    },
  ],
  foxSkills: [
    {
      name: 'Adaptive Learning System',
      src: foxSkill1,
      description: 'GenFox delivers insights that matter, when they matter. With real-time data analytics and intelligent forecasting, it empowers you to make informed decisions and stay ahead, effortlessly',
    },
    {
      name: 'Real-Time Data Analytics & Forecasting',
      src: foxSkill2,
      description: 'Unlock deeper understanding with GenFox’s AI-Powered Insights Engine. It analyzes patterns, delivers actionable recommendations, and helps you make smarter decisions in every aspect of your life.',
    },
    {
      name: 'Privacy and Security AI',
      src: foxSkill3,
      description: 'Your privacy is our priority. GenFox is built with advanced encryption and privacy-first AI to ensure your data is secure, confidential, and always under your control. Because trust is the foundation of every great assistant.s.',
    },
  ],
};

const SpringModal = ({ isOpen, setIsOpen }) => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    selectedAvatar: null,
    customAvatar: null,
    aiName: '',
    notificationFrequency: 'Rarely',
    dynamicNotifications: {
      expenseAlerts: false,
      lowBalanceNotifications: false,
      paymentDueReminders: false,
      savingsGoalProgress: false,
    },
    selectedPlatforms: [],
    selectedProducts: [],
    selectedSkills: [],
  });
  const [errors, setErrors] = useState({
    aiName: '',
    selectedPlatforms: '',
    selectedFeatures: '',
  });

  // Carousel state
  const [productIndex, setProductIndex] = useState(0);
  const [skillIndex, setSkillIndex] = useState(0);

  // Use the internal JSON data
  const foxProducts = foxFeatures.foxProducts;
  const foxSkills = foxFeatures.foxSkills;

  const handleNextProduct = () => {
    setProductIndex((prev) => (prev + 1) % foxProducts.length);
  };

  const handlePrevProduct = () => {
    setProductIndex(
      (prev) => (prev - 1 + foxProducts.length) % foxProducts.length
    );
  };

  const handleNextSkill = () => {
    setSkillIndex((prev) => (prev + 1) % foxSkills.length);
  };

  const handlePrevSkill = () => {
    setSkillIndex((prev) => (prev - 1 + foxSkills.length) % foxSkills.length);
  };

  // Reset form data when modal closes
  useEffect(() => {
    if (!isOpen) {
      setCurrentStep(1);
      setFormData({
        selectedAvatar: null,
        customAvatar: null,
        aiName: '',
        notificationFrequency: 'Rarely',
        dynamicNotifications: {
          expenseAlerts: false,
          lowBalanceNotifications: false,
          paymentDueReminders: false,
          savingsGoalProgress: false,
        },
        selectedPlatforms: [],
        selectedProducts: [],
        selectedSkills: [],
      });
      setErrors({
        aiName: '',
        selectedPlatforms: '',
        selectedFeatures: '',
      });
    }
  }, [isOpen]);

  // Prevent background scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      const originalStyle = window.getComputedStyle(document.body).overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = originalStyle;
      };
    }
  }, [isOpen]);

  const handleNextStep = () => {
    setErrors({ aiName: '', selectedPlatforms: '', selectedFeatures: '' });

    if (currentStep === 1 && !formData.selectedAvatar) {
      alert('Please select an avatar to proceed.');
      return;
    }

    if (currentStep === 3 && formData.aiName.trim() === '') {
      setErrors({
        aiName: 'Please enter a name for your AI assistant.',
      });
      return;
    }

    if (currentStep === 6 && formData.selectedPlatforms.length === 0) {
      setErrors({
        selectedPlatforms: 'Please select at least one platform to proceed.',
      });
      return;
    }

    if (
      currentStep === 7 &&
      (formData.selectedProducts.length === 0 ||
        formData.selectedSkills.length === 0)
    ) {
      setErrors({
        selectedFeatures:
          'Please select at least one product and one skill to proceed.',
      });
      return;
    }

    if (currentStep < 8) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handlePreviousStep = () => {
    setCurrentStep((prev) => (prev > 1 ? prev - 1 : prev));
    if (currentStep === 2) {
      setFormData((prev) => ({ ...prev, customAvatar: null }));
    }
  };

  const handleAvatarUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setFormData((prev) => ({ ...prev, customAvatar: event.target.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const toggleDynamicNotification = (key) => {
    setFormData((prev) => ({
      ...prev,
      dynamicNotifications: {
        ...prev.dynamicNotifications,
        [key]: !prev.dynamicNotifications[key],
      },
    }));
  };

  // Toggle Platform Selection
  const togglePlatform = (platform) => {
    setFormData((prev) => {
      const isSelected = prev.selectedPlatforms.includes(platform);
      if (isSelected) {
        return {
          ...prev,
          selectedPlatforms: prev.selectedPlatforms.filter((p) => p !== platform),
        };
      } else {
        return {
          ...prev,
          selectedPlatforms: [...prev.selectedPlatforms, platform],
        };
      }
    });
  };

  // Toggle Product Selection
  const toggleProduct = (productName) => {
    setFormData((prev) => {
      const isSelected = prev.selectedProducts.includes(productName);
      if (isSelected) {
        return {
          ...prev,
          selectedProducts: prev.selectedProducts.filter((p) => p !== productName),
        };
      } else {
        return {
          ...prev,
          selectedProducts: [...prev.selectedProducts, productName],
        };
      }
    });
  };

  // Toggle Skill Selection
  const toggleSkill = (skillName) => {
    setFormData((prev) => {
      const isSelected = prev.selectedSkills.includes(skillName);
      if (isSelected) {
        return {
          ...prev,
          selectedSkills: prev.selectedSkills.filter((s) => s !== skillName),
        };
      } else {
        return {
          ...prev,
          selectedSkills: [...prev.selectedSkills, skillName],
        };
      }
    });
  };

  // Retrieve user's full name from Local Storage
  const [userFullName, setUserFullName] = useState('');

  useEffect(() => {
    if (isOpen) {
      const storedName = localStorage.getItem('userFullName');
      if (storedName) {
        setUserFullName(storedName);
      }
    }
  }, [isOpen]);

  // Tooltip component
  const Tooltip = ({ content }) => (
    <div className='relative inline-block group'>
      <IoInformationCircleOutline className='text-lg text-gray-500 ml-1 cursor-pointer' />
      <div className='absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-40 text-center hidden group-hover:block'>
        <div className='bg-gray-800 text-white text-xs rounded py-1 px-2'>
          {content}
        </div>
      </div>
    </div>
  );
  const TooltipTwo = ({ content }) => (
    <div className='relative inline-block group'>
      <IoInformationCircleOutline className='text-lg text-white ml-1 cursor-pointer' />
      <div className='absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-40 text-center hidden group-hover:block'>
        <div className='bg-gray-800 text-white text-xs rounded py-1 px-2'>
          {content}
        </div>
      </div>
    </div>
  );

  // Step details
  const stepDetails = {
    1: { label: 'Synchronizing Identity', percentage: 15 },
    2: { label: 'Materializing Avatar', percentage: 30 },
    3: { label: 'Naming Your AI', percentage: 45 },
    4: { label: 'Configuring Notifications', percentage: 60 },
    5: { label: 'Setting Up KYC', percentage: 75 },
    6: { label: 'Choosing Platform', percentage: 85 },
    7: { label: 'Exploring FOX Features', percentage: 95 },
    8: { label: 'Finalizing Setup', percentage: 100 },
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className='bg-white/30 backdrop-blur-lg p-8 fixed inset-0 z-50 flex justify-center items-center overflow-y-auto glass-effect'
        >
          <motion.div
            initial={{ scale: 0, rotate: '12.5deg' }}
            animate={{ scale: 1, rotate: '0deg' }}
            exit={{ scale: 0, rotate: '0deg' }}
            onClick={(e) => e.stopPropagation()}
            role='dialog'
            aria-modal='true'
            className='bg-white/20 backdrop-blur-md border border-white/10 text-gray-900 rounded-lg w-full max-w-4xl h-auto sm:h-[80%] max-h-[80%] shadow-xl relative flex flex-col'
          >
            {/* Step Indicator */}
            <div className='absolute top-3 sm:top-4 left-4 bg-indigo-500 text-white text-xs font-semibold py-1 px-3 rounded-full shadow-md'>
              Step {currentStep} of 8
            </div>

            {/* Bell Icon */}
            {(currentStep === 4 || currentStep === 5) && (
              <IoNotificationsSharp className='absolute top-3 right-12 text-xl text-gray-900 cursor-pointer' />
            )}

            {/* Progress Bar with Integrated Loader */}
            <div className='w-full px-6 sm:px-8 mt-10'>
              <div className='flex mb-2 mt-3 w-full gap-x-2 justify-center'>
                <span className='text-sm'>
                  {stepDetails[currentStep]?.label || ''}
                </span>
                <span className='text-sm text-xs font-semibold bg-white text-gray-900 px-2 py-0.5 rounded-lg shadow'>
                  {stepDetails[currentStep]?.percentage || 0}%
                </span>
              </div>
              <div className='relative w-full h-3 bg-gray-300 rounded-full overflow-visible'>
                {/* Progress Bar */}
                <motion.div
                  initial={{ width: 0 }}
                  animate={{
                    width: `${stepDetails[currentStep]?.percentage || 0}%`,
                  }}
                  transition={{ duration: 0.5, ease: 'easeInOut' }}
                  className='absolute h-full bg-gradient-to-r from-blue-400 via-blue-500 to-indigo-500 rounded-full shadow-lg'
                ></motion.div>

                {/* Loader Positioned at the End of the Progress Bar */}
                <motion.div
                  className='absolute top-1/2 -translate-y-1/2  rounded-full'
                  animate={{
                    left: `calc(${stepDetails[currentStep]?.percentage || 0}% - 10px)`,
                  }}
                  transition={{
                    type: 'tween',
                    duration: 0.5,
                    ease: 'easeInOut',
                  }}
                >
                  <div className='loading-wrapper w-5 h-5 sm:w-7 sm:h-7 rounded-full bg-white'>
                    {' '}
                    {/* Reduced size by ~10% */}
                    <div className='loader relative w-5 h-5 sm:w-7 sm:h-7 rounded-full border-[2px] border-gray-200 animate-pulse1572'>
                      {' '}
                      {/* Reduced size by ~10% */}
                      <div className='loader-inner absolute top-1/2 left-1/2 w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-gradient-to-b from-blue-400 to-pink-500 transform -translate-x-1/2 -translate-y-1/2 animate-innerPulse934 shadow-[0_19px_38px_rgba(0,0,0,0.3),0_15px_12px_rgba(0,0,0,0.22)]' />{' '}
                      {/* Reduced size by ~10% */}
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>

            {/* Content Area */}
            <div className='flex-1 overflow-y-auto px-6 sm:px-8 py-4'>
              {currentStep === 1 && (
                <div className='px-4 sm:px-8'>
                  <h3 className='text-md sm:text-xl md:text-2xl font-medium mb-2 sm:mb-4 mt-4 sm:mt-6 text-center text-gray-900'>
                    Choose Your AI's Gender
                  </h3>
                  <img
                    src={
                      formData.customAvatar ||
                      formData.selectedAvatar ||
                      avatar1
                    }
                    alt='Selected Avatar'
                    className={`block  mx-auto transition-all duration-300 ${
                      formData.selectedAvatar === avatar2
                        ? 'pr-6 h-[190px] sm:h-[240px] md:h-[310px]' // Styles for Female Avatar
                        : 'pr-0 h-[180px] sm:h-[220px] md:h-[300px]' // Default Styles
                    }`}
                  />
                </div>
              )}

              {currentStep === 2 && (
                <div>
                  <h3 className='text-sm sm:text-2xl mt-4 font-medium mb-4 text-center text-gray-900'>
                    Upload Your AI Avatar
                  </h3>
                  <img
                    src={
                      formData.customAvatar ||
                      formData.selectedAvatar ||
                      avatar1
                    }
                    alt='Selected Avatar'
                    className={`block  mx-auto transition-all duration-300 ${
                      formData.selectedAvatar === avatar2
                        ? 'pr-6 h-[190px] sm:h-[240px] md:h-[310px]' // Styles for Female Avatar
                        : 'pr-0 h-[180px] sm:h-[220px] md:h-[300px]' // Default Styles
                    }`}
                  />
                </div>
              )}

              {currentStep === 3 && (
                <div>
                  <h3 className='text-md sm:text-2xl mt-4 font-medium mb-4 text-center text-gray-900'>
                    Name Your AI Assistant
                  </h3>

                  <div className='flex w-full'>
                    <div className='justify-center w-[40%] flex-col items-center hidden sm:flex'>
                      <input
                        type='text'
                        placeholder='What do you want to call me?'
                        value={formData.aiName}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            aiName: e.target.value,
                          }))
                        }
                        className={`p-2 sm:p-3 rounded border ${
                          errors.aiName ? 'border-red-500' : 'border-gray-300'
                        } text-black w-[200px] sm:w-[270px] sm:text-sm text-xs text-center font-semibold focus:outline-none focus:ring-2 focus:ring-indigo-400`}
                        aria-label='AI Assistant Name'
                      />
                      {errors.aiName && (
                        <p className='text-red-500 text-xs sm:text-sm mt-1'>
                          {errors.aiName}
                        </p>
                      )}
                    </div>
                    <img
                      src={
                        formData.customAvatar ||
                        formData.selectedAvatar ||
                        avatar1
                      }
                      alt='Selected Avatar'
                      className={`block  mx-auto transition-all duration-300 ${
                        formData.selectedAvatar === avatar2
                          ? 'pr-6 h-[190px] sm:h-[240px] md:h-[310px]' // Styles for Female Avatar
                          : 'pr-0 h-[180px] sm:h-[220px] md:h-[300px]' // Default Styles
                      }`}
                    />
                  </div>
                </div>
              )}

              {currentStep === 4 && (
                <div className='px-4 sm:px-8'>
                  <h3 className='text-lg sm:text-2xl mt-4 font-medium mb-4 text-center text-gray-900'>
                    Control AI Notifications
                  </h3>
                  {/* Notification Frequency */}
                  <div className='mb-5 mt-5'>
                    <div className='flex flex-col sm:flex-row items-center justify-center mb-4'>
                      <h4 className='font-medium text-sm sm:text-md shadow-sm bg-slate-950/40 w-fit px-3 sm:px-5 rounded-full text-center flex items-center text-white'>
                        Notification Frequency
                        <TooltipTwo content='Choose how often you want to receive notifications.' />
                      </h4>
                    </div>
                    <div className='flex flex-col sm:flex-row flex-wrap w-[80%] mx-auto bg-[#e8e8e8] px-2 rounded-md justify-center py-2 gap-2 sm:gap-2'>
                      {['Rarely', 'Occasionally', 'Frequently'].map((freq) => (
                        <label key={freq} className='flex-1 text-center'>
                          <input
                            type='radio'
                            name='notificationFrequency'
                            className='hidden'
                            checked={formData.notificationFrequency === freq}
                            onChange={() =>
                              setFormData((prev) => ({
                                ...prev,
                                notificationFrequency: freq,
                              }))
                            }
                          />
                          <span
                            className={`flex cursor-pointer items-center justify-center py-2 px-2 rounded text-xs sm:text-[13px] transition-all ease-in-out duration-150 ${
                              formData.notificationFrequency === freq
                                ? 'bg-white text-black font-semibold shadow-sm'
                                : 'text-gray-900 hover:bg-gray-300 font-medium'
                            }`}
                            aria-label={`Select ${freq} frequency`}
                          >
                            {freq}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>
                  {/* Dynamic Notifications */}
                  <div>
                    <div className='flex flex-col sm:flex-row items-center justify-center mb-2'>
                      <h4 className='font-medium text-sm sm:text-md bg-slate-950/40 w-fit px-3 sm:px-5 rounded-full text-center flex items-center text-white'>
                        Dynamic Notifications
                        <TooltipTwo content='Toggle specific dynamic notifications on or off.' />
                      </h4>
                    </div>
                    {Object.entries(formData.dynamicNotifications).map(
                      ([key, value]) => (
                        <div
                          key={key}
                          className='flex flex-row justify-between mx-2 sm:mx-10 my-5 items-center text-center sm:text-left'
                        >
                          <span className='capitalize text-[12px] sm:text-[14px] text-gray-900'>
                            {key.replace(/([A-Z])/g, ' $1')}
                          </span>
                          <div className='flex items-center mt-2 sm:mt-0'>
                            <label className='relative inline-flex items-center cursor-pointer'>
                              <input
                                type='checkbox'
                                className='sr-only peer'
                                checked={value}
                                onChange={() => toggleDynamicNotification(key)}
                                aria-label={`Toggle ${key.replace(
                                  /([A-Z])/g,
                                  ' $1'
                                )}`}
                              />
                              <div
                                className="group peer ring-0 bg-gradient-to-bl from-neutral-200 via-neutral-100 to-gray-400 rounded-full outline-none duration-300 after:duration-200 w-10 h-5 sm:w-12 sm:h-6 shadow-md peer-focus:outline-none 
                          after:content-[''] 
                          after:rounded-full 
                          after:absolute 
                          after:bg-white 
                          peer-checked:after:rotate-180 
                          after:bg-conic-gradient(from_135deg, #e2e2e2, #ffffff, #f7f7f7, #ffffff, #e2e2e2) 
                          after:outline-none 
                          after:h-4 sm:after:h-5 
                          after:w-4 sm:after:w-5 
                          after:top-0.5 
                          after:left-0.5 
                          peer-checked:after:translate-x-5 sm:peer-checked:after:translate-x-6 
                          peer-hover:after:scale-95 
                          peer-checked:bg-gradient-to-r 
                          peer-checked:from-blue-400 
                          peer-checked:to-blue-600"
                              />
                            </label>
                            <Tooltip
                              content={`Toggle ${key
                                .replace(/([A-Z])/g, ' $1')
                                .toLowerCase()} notifications.`}
                            />
                          </div>
                        </div>
                      )
                    )}
                  </div>
                </div>
              )}

              {currentStep === 5 && (
                <div className='text-center px-4 sm:px-8'>
                  <h3 className='text-sm hidden sm:block sm:text-2xl font-medium mt-4 mb-6 text-gray-900'>
                    Setup KYC
                  </h3>
                  <p className='mb-4 text-gray-600 font-medium text-xs sm:text-base'>
                    To proceed, we need to verify your identity through a quick
                    KYC (Know Your Customer) process. Completing KYC ensures
                    secure transactions and protects your account.
                  </p>

                  <img
                    className='block h-32 w-32 sm:h-56 sm:w-56 mx-auto my-5'
                    src={bank}
                    alt='Bank Building'
                  />
                </div>
              )}

              {currentStep === 6 && (
                <div className='px-4 sm:px-8'>
                  <h3 className='text-sm sm:text-2xl font-medium mt-3 mb-3 text-center text-gray-900'>
                    Choose Integration Platform
                  </h3>
                  {errors.selectedPlatforms && (
                    <p className='text-red-500 text-xs sm:text-sm text-center mb-2'>
                      {errors.selectedPlatforms}
                    </p>
                  )}
                  <p className='sm:block hidden text-gray-700 text-center mb-4 text-xs sm:text-sm'>
                  Seamlessly connect your world with GenFox AI’s integration platform bringing your apps, data, and tasks together for smarter living.
                  </p>
                  <div className='grid grid-cols-2 gap-4 sm:gap-6'>
                    {[
                      { name: 'Google', src: google },
                      { name: 'WhatsApp', src: whatsapp },
                      { name: 'Apple', src: apple },
                      { name: 'Outlook', src: outlook },
                    ].map((platform) => (
                      <div
                        key={platform.name}
                        className={`border-4 rounded-lg p-2 cursor-pointer transition-shadow relative ${
                          formData.selectedPlatforms.includes(platform.name)
                            ? 'border-blue-400'
                            : 'border-transparent'
                        } hover:shadow-lg`}
                        onClick={() => togglePlatform(platform.name)}
                        aria-label={`Select ${platform.name} platform`}
                      >
                        <img
                          src={platform.src}
                          alt={platform.name}
                          className='h-[35px] sm:h-20 rounded-lg mx-auto'
                        />
                        <p className='text-center text-sm font-medium text-gray-900 mt-2'>
                          {platform.name}
                        </p>
                        {/* Checkmark Overlay */}
                        {formData.selectedPlatforms.includes(platform.name) && (
                          <img src={check} alt="check" className='absolute top-2 right-2 h-5'   />
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 7 */}
              {currentStep === 7 && (
                <div className='px-4 sm:px-8'>
                  <h3 className='text-sm sm:text-2xl font-semibold mt-3 mb-3 text-center text-gray-900'>
                    FOX Products
                  </h3>
                  {errors.selectedFeatures && (
                    <p className='text-red-500 text-xs sm:text-sm text-center mb-2'>
                      {errors.selectedFeatures}
                    </p>
                  )}
                  {/* Products Carousel for Mobile */}
                  <div className='block sm:hidden mb-8'>
                    <div className='relative'>
                      <button
                        onClick={handlePrevProduct}
                        className='absolute -left-4 top-[70px] -translate-y-1/2 bg-gray-700 bg-opacity-50 text-white p-2 rounded-full focus:outline-none z-10'
                        aria-label='Previous Product'
                      >
                        <IoChevronBack size={20} />
                      </button>
                      <div className='overflow-hidden'>
                        <div
                          className='flex transition-transform duration-300'
                          style={{
                            transform: `translateX(-${productIndex * 100}%)`,
                          }}
                        >
                          {foxProducts.map((product) => (
                            <div
                              key={product.name}
                              className='flex-shrink-0 w-full'
                            >
                              <div className='text-center relative'>
                                <img
                                  src={product.src}
                                  alt={product.name}
                                  className='h-[105px] mx-auto mb-3 rounded-lg shadow-md cursor-pointer'
                                  onClick={() => toggleProduct(product.name)}
                                />
                                <p className='text-sm font-medium text-gray-900'>
                                  {product.name}
                                </p>
                                <p className='text-xs text-gray-700 mt-1'>
                                  {product.description}
                                </p>
                                {/* Checkmark Overlay */}
                                {formData.selectedProducts.includes(product.name) && (
                                  <img src={check} alt="check" className='absolute top-2 right-2 h-5' />
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                      <button
                        onClick={handleNextProduct}
                        className='absolute -right-4 top-[70px] -translate-y-1/2 bg-gray-700 bg-opacity-50 text-white p-2 rounded-full focus:outline-none z-10'
                        aria-label='Next Product'
                      >
                        <IoChevronForward size={20} />
                      </button>
                    </div>
                  </div>
                  {/* Products Grid for Desktop */}
                  <div className='hidden sm:grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-8'>
                    {foxProducts.map((product) => (
                      <div
                        key={product.name}
                        className='text-center relative cursor-pointer'
                        onClick={() => toggleProduct(product.name)}
                      >
                        <img
                          src={product.src}
                          alt={product.name}
                          className='h-32 mx-auto mb-3 rounded-lg shadow-md'
                        />
                        <p className='text-sm font-medium text-gray-900'>
                          {product.name}
                        </p>
                        <p className='text-xs text-gray-700 mt-1'>
                          {product.description}
                        </p>
                        {/* Checkmark Overlay */}
                        {formData.selectedProducts.includes(product.name) && (
                          <img src={check} alt="check" className='absolute top-2 right-2 h-5' />
                        )}
                      </div>
                    ))}
                  </div>

                  <h3 className='text-sm sm:text-2xl font-semibold mt-6 mb-6 text-center text-gray-900'>
                    FOX Skills
                  </h3>
                  {/* Skills Carousel for Mobile */}
                  <div className='block sm:hidden mb-8'>
                    <div className='relative'>
                      <button
                        onClick={handlePrevSkill}
                        className='absolute -left-4 top-[70px] -translate-y-1/2 bg-gray-700 bg-opacity-50 text-white p-2 rounded-full focus:outline-none z-10'
                        aria-label='Previous Skill'
                      >
                        <IoChevronBack size={20} />
                      </button>

                      <div className='overflow-hidden'>
                        <div
                          className='flex transition-transform duration-300 ease-in-out'
                          style={{
                            transform: `translateX(-${skillIndex * 100}%)`,
                          }}
                        >
                          {foxSkills.map((skill) => (
                            <div
                              key={skill.name}
                              className='flex-shrink-0 w-full px-4'
                            >
                              <div className='text-center relative'>
                                <img
                                  src={skill.src}
                                  alt={skill.name}
                                  className='h-32 w-32 mx-auto mb-3 rounded-lg shadow-md cursor-pointer'
                                  onClick={() => toggleSkill(skill.name)}
                                />
                                <p className='text-sm font-medium text-gray-900'>
                                  {skill.name}
                                </p>
                                <p className='text-xs text-gray-700 mt-1'>
                                  {skill.description}
                                </p>
                                {/* Checkmark Overlay */}
                                {formData.selectedSkills.includes(skill.name) && (
                                  <img src={check} alt="check" className='absolute top-2 right-2 h-5' />
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      <button
                        onClick={handleNextSkill}
                        className='absolute -right-4 top-[70px] -translate-y-1/2 bg-gray-700 bg-opacity-50 text-white p-2 rounded-full focus:outline-none z-10'
                        aria-label='Next Skill'
                      >
                        <IoChevronForward size={20} />
                      </button>
                    </div>
                  </div>

                  {/* Skills Grid for Desktop */}
                  <div className='hidden sm:grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6'>
                    {foxSkills.map((skill) => (
                      <div
                        key={skill.name}
                        className='text-center relative cursor-pointer'
                        onClick={() => toggleSkill(skill.name)}
                      >
                        <img
                          src={skill.src}
                          alt={skill.name}
                          className='h-32 w-32 mx-auto mb-3 rounded-lg shadow-md'
                        />
                        <p className='text-sm font-medium text-gray-900'>
                          {skill.name}
                        </p>
                        <p className='text-xs text-gray-700 mt-1'>
                          {skill.description}
                        </p>
                        {/* Checkmark Overlay */}
                        {formData.selectedSkills.includes(skill.name) && (
                          <img src={check} alt="check" className='absolute top-2 right-2 h-5' />
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 8 */}
              {currentStep === 8 && (
                <div className='flex h-full flex-col md:flex-row items-center justify-center gap-6 px-6 sm:px-10'>
                  <img
                    src={
                      formData.customAvatar ||
                      formData.selectedAvatar ||
                      avatar1
                    }
                    alt='Selected Avatar'
                    className='w-40 h-40 sm:w-full sm:h-[300px] object-cover'
                  />
                  <div className='text-left max-w-md'>
                    <h3 className='text-base sm:text-3xl font-medium mb-2 text-center md:text-left text-gray-900'>
                      I'm Ready, {userFullName || 'User'}
                    </h3>
                    <p className='text-gray-700 text-xs sm:text-base text-center md:text-left leading-relaxed'>
                      Hi there, I'm {formData.aiName || 'Donna'}—your personal
                      AI assistant. I’m here to help you manage your goals, stay
                      on track, and make life simpler. Whether it’s fitness,
                      finances, or productivity, I’ve got your back. Let’s get
                      started—what can I help you with today?
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Centered Buttons for Mobile */}
            <div className='px-6 sm:px-8 py-4 bg-transparent flex justify-center sm:hidden'>
              <div className='flex flex-col items-center gap-4'>
                {currentStep === 1 && (
                  <div className='flex gap-3 sm:gap-4'>
                    <button
                      className={`bg-gray-200 hover:bg-gray-300 shadow-sm text-sm sm:text-md transition-colors text-gray-900 w-[80px] sm:w-[100px] font-semibold py-1.5 sm:py-2 px-3 sm:px-4 rounded-lg ${
                        formData.selectedAvatar === avatar1
                          ? 'ring ring-blue-400'
                          : ''
                      }`}
                      onClick={() =>
                        setFormData((prev) => ({
                          ...prev,
                          selectedAvatar: avatar1,
                          customAvatar: null,
                        }))
                      }
                      aria-label='Select Male Avatar'
                    >
                      Male
                    </button>
                    <button
                      className={`bg-gray-200 hover:bg-gray-300 shadow-sm transition-colors text-sm sm:text-md text-gray-900 w-[80px] sm:w-[100px] font-semibold py-1.5 sm:py-2 px-3 sm:px-4 rounded-lg ${
                        formData.selectedAvatar === avatar2
                          ? 'ring ring-blue-400'
                          : ''
                      }`}
                      onClick={() =>
                        setFormData((prev) => ({
                          ...prev,
                          selectedAvatar: avatar2,
                          customAvatar: null,
                        }))
                      }
                      aria-label='Select Female Avatar'
                    >
                      Female
                    </button>
                  </div>
                )}

                {currentStep === 2 && (
                  <div className='text-center'>
                    <label
                      htmlFor='avatar-upload-bottom'
                      className='bg-gray-200 hover:bg-gray-300 w-fit mx-auto transition-colors text-gray-900 font-semibold py-2 px-4 rounded cursor-pointer flex items-center justify-center gap-2 text-sm'
                    >
                      Upload Avatar
                      <IoCloudUploadSharp className='text-lg' />
                    </label>
                    <input
                      type='file'
                      id='avatar-upload-bottom'
                      accept='image/*'
                      className='hidden'
                      onChange={handleAvatarUpload}
                    />
                  </div>
                )}

                {currentStep === 3 && (
                  <div className='flex flex-col items-center'>
                    <input
                      type='text'
                      placeholder='What do you want to call me?'
                      value={formData.aiName}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          aiName: e.target.value,
                        }))
                      }
                      className={`p-2 sm:p-3 rounded border ${
                        errors.aiName ? 'border-red-500' : 'border-gray-300'
                      } text-black w-[200px] sm:w-[250px] sm:text-sm text-[11px] text-center font-semibold focus:outline-none focus:ring-2 focus:ring-indigo-400`}
                      aria-label='AI Assistant Name'
                    />
                    {errors.aiName && (
                      <p className='text-red-500 text-xs sm:text-sm mt-1'>
                        {errors.aiName}
                      </p>
                    )}
                  </div>
                )}

                {currentStep === 5 && (
                  <button
                    onClick={() => {
                      alert('KYC Completed!');
                      setCurrentStep(6);
                    }}
                    className='bg-gray-300 text-sm text-black hover:bg-gray-200 font-semibold py-2 px-4 rounded shadow-md'
                    aria-label='Complete your KYC'
                  >
                    Complete KYC
                  </button>
                )}
              </div>
            </div>

            {/* Bottom Navigation Buttons */}
            <div className='px-6 sm:px-8 py-4 bg-transparent flex items-center justify-between'>
              {/* Back Button */}
              {currentStep > 1 && currentStep !== 8 ? (
                <button
                  onClick={handlePreviousStep}
                  className='bg-transparent text-sm sm:text-base hover:bg-gray-200 transition-colors text-gray-900 font-semibold py-2 px-4 rounded'
                  aria-label='Go Back'
                >
                  Back
                </button>
              ) : currentStep === 8 ? (
                <button
                  onClick={handlePreviousStep}
                  className='bg-gray-200 hover:bg-gray-300 transition-colors text-gray-900 font-semibold py-2 px-4 rounded'
                  aria-label='Go Back'
                >
                  Back
                </button>
              ) : (
                <div></div>
              )}

              {/* Step-Specific Buttons for Desktop */}
              <div className='hidden sm:flex justify-center gap-4'>
                {currentStep === 1 && (
                  <div className='flex gap-3 sm:gap-4 ml-[0] sm:ml-[35%]'>
                    <button
                      className={`bg-gray-200 hover:bg-gray-300 shadow-sm transition-colors text-gray-900 w-[80px] sm:w-[100px] font-semibold py-1.5 sm:py-2 px-3 sm:px-4 rounded-lg ${
                        formData.selectedAvatar === avatar1
                          ? 'ring ring-blue-400'
                          : ''
                      }`}
                      onClick={() =>
                        setFormData((prev) => ({
                          ...prev,
                          selectedAvatar: avatar1,
                          customAvatar: null,
                        }))
                      }
                      aria-label='Select Male Avatar'
                    >
                      Male
                    </button>
                    <button
                      className={`bg-gray-200 hover:bg-gray-300 shadow-sm transition-colors text-gray-900 w-[80px] sm:w-[100px] font-semibold py-1.5 sm:py-2 px-3 sm:px-4 rounded-lg ${
                        formData.selectedAvatar === avatar2
                          ? 'ring ring-blue-400'
                          : ''
                      }`}
                      onClick={() =>
                        setFormData((prev) => ({
                          ...prev,
                          selectedAvatar: avatar2,
                          customAvatar: null,
                        }))
                      }
                      aria-label='Select Female Avatar'
                    >
                      Female
                    </button>
                  </div>
                )}

                {currentStep === 2 && (
                  <div className='text-center'>
                    <label
                      htmlFor='avatar-upload-bottom-desktop'
                      className='bg-gray-200 hover:bg-gray-300 w-fit mx-auto transition-colors text-gray-900 font-semibold py-2 px-4 rounded cursor-pointer flex items-center justify-center gap-2'
                    >
                      Upload Avatar
                      <IoCloudUploadSharp className='text-lg' />
                    </label>
                    <input
                      type='file'
                      id='avatar-upload-bottom-desktop'
                      accept='image/*'
                      className='hidden'
                      onChange={handleAvatarUpload}
                    />
                  </div>
                )}

                {currentStep === 5 && (
                  <button
                    onClick={() => {
                      alert('KYC Completed!');
                      setCurrentStep(6);
                    }}
                    className='bg-gray-300 text-black hover:bg-gray-200 font-semibold py-2 px-4 rounded shadow-md'
                    aria-label='Complete your KYC'
                  >
                    Complete KYC
                  </button>
                )}

                {currentStep === 8 && (
                  <button
                    onClick={() => {
                      navigate('/dashboard/lobby');
                      setIsOpen(false);
                    }}
                    className='bg-gradient-to-r absolute bottom-3 right-7 from-blue-500 via-purple-400 to-purple-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded shadow-md'
                    aria-label='Go to Dashboard'
                  >
                    Dashboard
                  </button>
                )}
              </div>

              {/* Next Button */}
              {currentStep < 8 ? (
                <button
                  onClick={handleNextStep}
                  className={`bg-gray-200 text-sm sm:text-base hover:bg-gray-300 transition-colors text-gray-900 shadow-sm font-semibold py-2 px-4 rounded ${
                    (currentStep === 3 && formData.aiName.trim() === '') ||
                    (currentStep === 6 && formData.selectedPlatforms.length === 0) ||
                    (currentStep === 7 &&
                      (formData.selectedProducts.length === 0 ||
                        formData.selectedSkills.length === 0))
                      ? 'opacity-50 cursor-not-allowed'
                      : ''
                  }`}
                  disabled={
                    (currentStep === 3 && formData.aiName.trim() === '') ||
                    (currentStep === 6 && formData.selectedPlatforms.length === 0) ||
                    (currentStep === 7 &&
                      (formData.selectedProducts.length === 0 ||
                        formData.selectedSkills.length === 0))
                  }
                  aria-label='Next Step'
                >
                  Next
                </button>
              ) : (
                <div></div>
              )}

              {/* Dashboard Button for Mobile on Step 8 */}
              {currentStep === 8 && (
                <button
                  onClick={() => {
                    navigate('/dashboard/lobby');
                    setIsOpen(false);
                  }}
                  className='sm:hidden bg-gradient-to-r from-blue-500 via-purple-400 to-purple-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded shadow-md'
                  aria-label='Go to Dashboard'
                >
                  Dashboard
                </button>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
      {/* Define Keyframe Animations and Classes for the Loader */}
      <style jsx>{`
        @keyframes pulse1572 {
          0% {
            border: 2px solid #fff;
          }
          50% {
            border: 10px solid #fff;
          }
          100% {
            border: 2px solid #fff;
          }
        }
        @keyframes innerPulse934 {
          0% {
            height: 6px;
            width: 6px;
          }
          50% {
            height: 20px;
            width: 20px;
          }
          100% {
            height: 6px;
            width: 6px;
          }
        }
        .animate-pulse1572 {
          animation: pulse1572 1.2s ease-in-out infinite;
        }
        .animate-innerPulse934 {
          animation: innerPulse934 1.2s ease-in-out infinite 0.6s;
        }
      `}</style>
    </AnimatePresence>
  );
};

export default SpringModal;
