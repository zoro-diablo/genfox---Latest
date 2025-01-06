// src/components/StepModal.jsx
import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import avatar1 from '../../assets/avatar.png'; // Male avatar
import avatar2 from '../../assets/new_avatar.png'; // Female avatar
import {
  IoCloudUploadSharp,
  IoNotificationsSharp,
  IoInformationCircleOutline,
  IoChevronBack,
  IoChevronForward,
} from 'react-icons/io5';
import bank from '../../assets/bank-building.png';
import google from '../../assets/Googles.png';
import outlook from '../../assets/8500323.webp';
import whatsapp from '../../assets/Whatsapp.png';
import apple from '../../assets/apple.png';
import foxProduct1 from '../../assets/Frame 3.png'; // FOX Products images
import foxProduct2 from '../../assets/Frame 2.png';
import foxProduct3 from '../../assets/Frame 5 (1).png';
import foxSkill1 from '../../assets/machineleaning.webp'; // FOX Skills images
import foxSkill2 from '../../assets/dataanalysis.webp';
import foxSkill3 from '../../assets/dataprivacy.webp';

const StepModal = ({ isOpen, setIsOpen }) => {
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
    selectedPlatform: null,
  });
  const [errors, setErrors] = useState({
    aiName: '',
  });

  // Step 7: State for Carousel
  const [productIndex, setProductIndex] = useState(0);
  const [skillIndex, setSkillIndex] = useState(0);

  const foxProducts = [
    { name: 'Product One', src: foxProduct1 },
    { name: 'Product Two', src: foxProduct2 },
    { name: 'Product Three', src: foxProduct3 },
  ];

  const foxSkills = [
    { name: 'Skill One', src: foxSkill1 },
    { name: 'Skill Two', src: foxSkill2 },
    { name: 'Skill Three', src: foxSkill3 },
  ];

  const handleNextProduct = () => {
    setProductIndex((prev) => (prev + 1) % foxProducts.length);
  };

  const handlePrevProduct = () => {
    setProductIndex((prev) => (prev - 1 + foxProducts.length) % foxProducts.length);
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
        selectedPlatform: null,
      });
      setErrors({
        aiName: '',
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
    // Reset errors
    setErrors({
      aiName: '',
    });

    // Validation for steps before Step 8
    if (currentStep === 1 && !formData.selectedAvatar) {
      alert('Please select an avatar to proceed.');
      return;
    }

    if (currentStep === 3 && formData.aiName.trim() === '') {
      setErrors((prev) => ({
        ...prev,
        aiName: 'Please enter a name for your AI assistant.',
      }));
      return;
    }

    if (currentStep === 6 && !formData.selectedPlatform) {
      alert('Please select a platform to proceed.');
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

  // Helper component for tooltips
  const Tooltip = ({ content }) => (
    <div className="relative inline-block group">
      <IoInformationCircleOutline className="text-lg text-white ml-1 cursor-pointer" />
      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-40 text-center hidden group-hover:block">
        <div className="bg-gray-800 text-white text-xs rounded py-1 px-2">
          {content}
        </div>
      </div>
    </div>
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          // Removed onClick to prevent closing on outside click
          className="bg-black/30 backdrop-blur-lg p-8 fixed inset-0 z-50 grid place-items-center overflow-y-auto glass-effect"
        >
          <motion.div
            initial={{ scale: 0, rotate: '12.5deg' }}
            animate={{ scale: 1, rotate: '0deg' }}
            exit={{ scale: 0, rotate: '0deg' }}
            // Prevent click inside modal from closing it
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            className={`
              bg-white/20 
              backdrop-blur-md 
              border border-white/10 
              text-white 
              p-6 
              rounded-lg 
              w-full 
              ${
                currentStep === 7 || currentStep === 8
                  ? 'max-w-2xl'
                  : 'max-w-lg'
              } 
              shadow-xl 
              relative 
              overflow-hidden
            `}
          >
            {/* Step Indicator */}
            <div className="absolute top-2 left-4 bg-indigo-500 text-white text-xs font-semibold py-1 px-3 rounded-full shadow-md">
              Step {currentStep} of 8
            </div>

            {/* Bell Icon */}
            {(currentStep === 4 || currentStep === 5) && (
              <IoNotificationsSharp className="absolute top-3 right-12 text-xl text-white" />
            )}

            <div className="relative z-10 text-center">
              {currentStep === 1 && (
                <div>
                  <h3 className="text-2xl font-medium mb-4 mt-5">
                    Choose Your AI's Gender
                  </h3>
                  <img
                    src={
                      formData.customAvatar ||
                      formData.selectedAvatar ||
                      avatar1
                    }
                    alt="Selected Avatar"
                    className="w-56 h-56 my-5 rounded-full mx-auto mb-4 border-4 border-white"
                  />
                  <div className="flex gap-4 justify-center mb-4">
                    <button
                      className={`bg-white/30 hover:bg-white/40 transition-colors text-white w-[100px] font-semibold py-2 px-4 rounded ${
                        formData.selectedAvatar === avatar1
                          ? 'ring ring-emerald-400'
                          : ''
                      }`}
                      onClick={() =>
                        setFormData((prev) => ({
                          ...prev,
                          selectedAvatar: avatar1,
                          customAvatar: null,
                        }))
                      }
                      aria-label="Select Male Avatar"
                    >
                      Male
                    </button>
                    <button
                      className={`bg-white/30 hover:bg-white/40 transition-colors text-white w-[100px] font-semibold py-2 px-4 rounded ${
                        formData.selectedAvatar === avatar2
                          ? 'ring ring-emerald-400'
                          : ''
                      }`}
                      onClick={() =>
                        setFormData((prev) => ({
                          ...prev,
                          selectedAvatar: avatar2,
                          customAvatar: null,
                        }))
                      }
                      aria-label="Select Female Avatar"
                    >
                      Female
                    </button>
                  </div>
                </div>
              )}

              {currentStep === 2 && (
                <div>
                  <h3 className="text-2xl mt-4 font-medium mb-4">
                    Upload Your AI Avatar
                  </h3>
                  <img
                    src={
                      formData.customAvatar ||
                      formData.selectedAvatar ||
                      avatar1
                    }
                    alt="Custom Avatar"
                    className="w-56 h-56 my-5 rounded-full mx-auto mb-4 border-4 border-white"
                  />
                  <div className="text-center">
                    <label
                      htmlFor="avatar-upload"
                      className="bg-white/30 hover:bg-white/40 w-fit mx-auto transition-colors text-white font-semibold py-2 px-4 rounded cursor-pointer flex items-center justify-center gap-2"
                    >
                      Upload Avatar
                      <IoCloudUploadSharp className="text-lg" />
                    </label>
                    <input
                      type="file"
                      id="avatar-upload"
                      accept="image/*"
                      className="hidden"
                      onChange={handleAvatarUpload}
                    />
                  </div>
                </div>
              )}

              {currentStep === 3 && (
                <div>
                  <h3 className="text-2xl mt-4 font-medium mb-4">
                    Name Your AI Assistant
                  </h3>
                  {/* Display the avatar */}
                  <img
                    src={
                      formData.customAvatar ||
                      formData.selectedAvatar ||
                      avatar1
                    }
                    alt="AI Avatar"
                    className="w-56 h-56 my-5 rounded-full mx-auto mb-4 border-4 border-white"
                  />
                  {/* Input for naming the AI */}
                  <input
                    type="text"
                    placeholder="What do you want to call me?"
                    value={formData.aiName}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        aiName: e.target.value,
                      }))
                    }
                    className={`p-3 rounded border ${
                      errors.aiName ? 'border-red-500' : 'border-gray-300'
                    } text-black w-[220px] sm:w-[300px] sm:text-[16px] text-[12px] text-center font-semibold focus:outline-none focus:ring-2 focus:ring-indigo-400`}
                    aria-label="AI Assistant Name"
                  />
                  {/* Display error message if name is not provided */}
                  {errors.aiName && (
                    <p className="text-red-500 text-sm mt-2">{errors.aiName}</p>
                  )}
                </div>
              )}

              {currentStep === 4 && (
                <div className="px-4 sm:px-8">
                  <h3 className="text-lg sm:text-2xl mt-4 font-medium mb-4 text-center">
                    Control AI Notifications
                  </h3>
                  {/* Notification Frequency */}
                  <div className="mb-5 mt-5">
                    <div className="flex flex-col sm:flex-row items-center justify-center mb-4">
                      <h4 className="font-medium text-sm sm:text-md bg-blue-500 w-fit px-3 sm:px-5 rounded-full text-center flex items-center">
                        Notification Frequency
                        {/* Information Icon with Tooltip */}
                        <Tooltip content="Choose how often you want to receive notifications." />
                      </h4>
                    </div>
                    <div className="flex flex-col sm:flex-row justify-center py-2 gap-2 sm:gap-5">
                      {['Rarely', 'Occasionally', 'Frequently'].map((freq) => (
                        <div key={freq} className="relative group">
                          <button
                            className={`py-2 px-4 text-sm sm:text-base rounded ${
                              formData.notificationFrequency === freq
                                ? 'bg-emerald-500 text-white'
                                : 'bg-white/30 text-white hover:bg-white/40'
                            }`}
                            onClick={() =>
                              setFormData((prev) => ({
                                ...prev,
                                notificationFrequency: freq,
                              }))
                            }
                            aria-label={`Select ${freq} frequency`}
                          >
                            {freq}
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                  {/* Dynamic Notifications */}
                  <div>
                    <div className="flex flex-col sm:flex-row items-center justify-center mb-2">
                      <h4 className="font-medium text-sm sm:text-md bg-blue-500 w-fit px-3 sm:px-5 rounded-full text-center flex items-center">
                        Dynamic Notifications
                        {/* Information Icon with Tooltip */}
                        <Tooltip content="Toggle specific dynamic notifications on or off." />
                      </h4>
                    </div>
                    {Object.entries(formData.dynamicNotifications).map(([key, value]) => (
                      <div
                        key={key}
                        className="flex flex-row justify-between mx-2 sm:mx-10 my-5 items-center mb-4 text-center sm:text-left"
                      >
                        <span className="capitalize text-[12px] sm:text-[14px]">
                          {key.replace(/([A-Z])/g, ' $1')}
                        </span>
                        <div className="flex items-center mt-2 sm:mt-0">
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              className="sr-only peer"
                              checked={value}
                              onChange={() => toggleDynamicNotification(key)}
                              aria-label={`Toggle ${key.replace(/([A-Z])/g, ' $1')}`}
                            />
                            <div
                              className="group peer ring-0 bg-gradient-to-bl from-neutral-800 via-neutral-700 to-neutral-600 rounded-full outline-none duration-300 after:duration-200 w-10 h-5 sm:w-12 sm:h-6 shadow-md peer-focus:outline-none 
                                after:content-[''] 
                                after:rounded-full 
                                after:absolute 
                                after:bg-[#0D2B39] 
                                peer-checked:after:rotate-180 
                                after:bg-conic-gradient(from_135deg, #b2a9a9, #b2a8a8, #ffffff, #d7dbd9, #ffffff, #b2a8a8) 
                                after:outline-none 
                                after:h-4 sm:after:h-5 
                                after:w-4 sm:after:w-5 
                                after:top-0.5 
                                after:left-0.5 
                                peer-checked:after:translate-x-5 sm:peer-checked:after:translate-x-6 
                                peer-hover:after:scale-95 
                                peer-checked:bg-gradient-to-r 
                                peer-checked:from-emerald-500 
                                peer-checked:to-emerald-900"
                            ></div>
                          </label>
                          {/* Information Icon with Tooltip for each dynamic notification */}
                          <Tooltip
                            content={`Toggle ${key.replace(/([A-Z])/g, ' $1').toLowerCase()} notifications.`}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

{currentStep === 5 && (
  <div>
    <h3 className="text-2xl font-medium mt-4 mb-6">Set Up KYC</h3>
    <p className="mb-4 text-gray-300 text-[13px] sm:text-[14px]">
      To proceed, we need to verify your identity through a quick KYC (Know Your Customer) process. 
      Completing KYC ensures secure transactions and protects your account.
    </p>
  
    <img
      className="h-52 w-52 mx-auto my-5"
      src={bank}
      alt="Bank Building"
    />
   
    <button
      onClick={() => {
        alert('KYC Completed!');
        // Proceed to next step
        setCurrentStep(6);
      }}
      className="bg-black text-white px-6 py-2 rounded font-semibold shadow-md hover:bg-gray-800"
      aria-label="Complete your KYC"
    >
      Complete your KYC
    </button>
  </div>
)}


              {currentStep === 6 && (
                <div>
                  <h3 className="text-2xl font-medium mt-6 mb-6">
                    Choose Integration Platform
                  </h3>
                  <p className="text-gray-300 mb-4">
                    Integrate your AI assistant with one of these platforms:
                  </p>
                  <div className="grid grid-cols-2 gap-6">
                    {[
                      { name: 'Google', src: google },
                      { name: 'WhatsApp', src: whatsapp },
                      { name: 'Apple', src: apple },
                      { name: 'Outlook', src: outlook },
                    ].map((platform) => (
                      <div
                        key={platform.name}
                        className={`border-4 rounded-lg p-2 cursor-pointer ${
                          formData.selectedPlatform === platform.name
                            ? 'border-emerald-400'
                            : 'border-transparent'
                        } hover:shadow-md`}
                        onClick={() =>
                          setFormData((prev) => ({
                            ...prev,
                            selectedPlatform: platform.name,
                          }))
                        }
                        aria-label={`Select ${platform.name} platform`}
                      >
                        <img
                          src={platform.src}
                          alt={platform.name}
                          className=" sm:h-40 rounded-lg mx-auto"
                        />
                        <p className="text-center text-sm font-medium mt-2">
                          {platform.name}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 7 */}
              {currentStep === 7 && (
                <div>
                  <h3 className="text-2xl font-medium mt-6 mb-4">
                    FOX Products
                  </h3>
                  {/* Products Carousel for Mobile */}
                  <div className="block sm:hidden mb-8">
                    <div className="relative">
                      <button
                        onClick={handlePrevProduct}
                        className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-700 bg-opacity-50 text-white p-2 rounded-full focus:outline-none"
                        aria-label="Previous Product"
                      >
                        <IoChevronBack size={20} />
                      </button>
                      <div className="overflow-hidden">
                        <div
                          className="flex transition-transform duration-300"
                          style={{ transform: `translateX(-${productIndex * 100}%)` }}
                        >
                          {foxProducts.map((product) => (
                            <div key={product.name} className="flex-shrink-0 w-full">
                              <div className="text-center">
                                <img
                                  src={product.src}
                                  alt={product.name}
                                  className="h-20 sm:h-32 mx-auto mb-2 rounded-lg shadow-md"
                                />
                                <p className="mt-2 text-sm font-medium">
                                  {product.name}
                                </p>
                                <p className="text-xs text-gray-300 mt-1">
                                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                  Vivamus lacinia odio vitae vestibulum vestibulum.
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                      <button
                        onClick={handleNextProduct}
                        className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-700 bg-opacity-50 text-white p-2 rounded-full focus:outline-none"
                        aria-label="Next Product"
                      >
                        <IoChevronForward size={20} />
                      </button>
                    </div>
                  </div>
                  {/* Products Grid for Desktop */}
                  <div className="hidden sm:grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-8">
                    {foxProducts.map((product) => (
                      <div key={product.name} className="text-center">
                        <img
                          src={product.src}
                          alt={product.name}
                          className="h-20 sm:h-32 mx-auto mb-2 rounded-lg shadow-md"
                        />
                        <p className="mt-2 text-sm font-medium">
                          {product.name}
                        </p>
                        <p className="text-xs text-gray-300 mt-1">
                          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                          Vivamus lacinia odio vitae vestibulum vestibulum.
                        </p>
                      </div>
                    ))}
                  </div>

                  <h3 className="text-2xl font-medium mt-6 mb-4">FOX Skills</h3>
                  {/* Skills Carousel for Mobile */}
                  <div className="block sm:hidden">
                    <div className="relative">
                      <button
                        onClick={handlePrevSkill}
                        className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-700 bg-opacity-50 text-white p-2 rounded-full focus:outline-none"
                        aria-label="Previous Skill"
                      >
                        <IoChevronBack size={20} />
                      </button>
                      <div className="overflow-hidden">
                        <div
                          className="flex transition-transform duration-300"
                          style={{ transform: `translateX(-${skillIndex * 100}%)` }}
                        >
                          {foxSkills.map((skill) => (
                            <div key={skill.name} className="flex-shrink-0 w-full">
                              <div className="text-center">
                                <img
                                  src={skill.src}
                                  alt={skill.name}
                                  className="h-20 sm:h-32 w-20 sm:w-32 mx-auto mb-2 rounded-lg shadow-md"
                                />
                                <p className="mt-2 text-sm font-medium">
                                  {skill.name}
                                </p>
                                <p className="text-xs text-gray-300 mt-1">
                                  Sed do eiusmod tempor incididunt ut labore et dolore magna
                                  aliqua. Ut enim ad minim veniam.
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                      <button
                        onClick={handleNextSkill}
                        className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-700 bg-opacity-50 text-white p-2 rounded-full focus:outline-none"
                        aria-label="Next Skill"
                      >
                        <IoChevronForward size={20} />
                      </button>
                    </div>
                  </div>
                  {/* Skills Grid for Desktop */}
                  <div className="hidden sm:grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {foxSkills.map((skill) => (
                      <div key={skill.name} className="text-center">
                        <img
                          src={skill.src}
                          alt={skill.name}
                          className="h-20 sm:h-32 w-20 sm:w-32 mx-auto mb-2 rounded-lg shadow-md"
                        />
                        <p className="mt-2 text-sm font-medium">
                          {skill.name}
                        </p>
                        <p className="text-xs text-gray-300 mt-1">
                          Sed do eiusmod tempor incididunt ut labore et dolore magna
                          aliqua. Ut enim ad minim veniam.
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 8 */}
              {currentStep === 8 && (
                <div className="flex flex-col md:flex-row items-center justify-center gap-6 mt-8">
                  {/* Selected Avatar */}
                  <img
                    src={
                      formData.customAvatar ||
                      formData.selectedAvatar ||
                      avatar1
                    }
                    alt="Selected Avatar"
                    className="w-40 h-40 rounded-full border-4 border-white"
                  />
                  {/* Welcome Message */}
                  <div className="text-left max-w-md">
                    <h3 className="text-2xl font-medium mb-2">
                      I'm Ready, {userFullName || 'User'}
                    </h3>
                    <p className="text-gray-300 text-[15px]">
                      Hi there, I'm {formData.aiName || 'Donna'}—your personal AI
                      assistant. I’m here to help you manage your goals, stay on
                      track, and make life simpler. Whether it’s fitness, finances,
                      or productivity, I’ve got your back. Let’s get started—what can
                      I help you with today?
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Bottom Navigation Buttons */}
            <div className="flex justify-between items-center mt-6">
              {/* General Back Button (excluding Step 8) */}
              {currentStep > 1 && currentStep !== 8 && (
                <button
                  onClick={handlePreviousStep}
                  className="bg-transparent hover:bg-white/10 transition-colors text-white font-semibold py-2 px-4 rounded"
                  aria-label="Go Back"
                >
                  Back
                </button>
              )}

              {/* Conditional Buttons */}
              {currentStep === 4 ? (
                <div className="flex flex-col sm:flex-row gap-4 sm:gap-4 mt-4 sm:mt-0 ml-auto sm:ml-0 w-full sm:w-auto">
                  <button
                    onClick={() => {
                      alert('We will continue on WhatsApp.');
                      // Proceed to the next step without closing the modal
                      setCurrentStep(5);
                    }}
                    className="bg-white/30 hover:bg-white/40 transition-colors text-[12px] sm:text-md text-white shadow-sm font-semibold whitespace-nowrap px-4 py-2 rounded w-fit sm:w-auto text-center"
                    aria-label="Continue on WhatsApp"
                  >
                    Continue on WhatsApp
                  </button>
                  <button
                    onClick={() => setCurrentStep(5)}
                    className="bg-black text-white hover:bg-gray-800 font-semibold py-2 px-4 text-sm sm:text-md rounded w-fit sm:w-auto text-center"
                    aria-label="Complete your KYC"
                  >
                    Complete your KYC
                  </button>
                </div>
              ) : currentStep < 8 ? (
                <button
                  onClick={handleNextStep}
                  className={`bg-white/30 hover:bg-white/40 transition-colors text-white shadow-sm font-semibold py-2 px-4 rounded ml-auto ${
                    // Disable the "Next" button if in step 3 and name is empty
                    currentStep === 3 && formData.aiName.trim() === ''
                      ? 'opacity-50 cursor-not-allowed'
                      : ''
                  }`}
                  disabled={currentStep === 3 && formData.aiName.trim() === ''}
                  aria-label="Next Step"
                >
                  Next
                </button>
              ) : (
                // Step 8 Navigation Buttons: Dashboard
                <div className="flex gap-4 ml-auto">
                  <button
                    onClick={handlePreviousStep}
                    className="bg-transparent hover:bg-white/10 transition-colors text-white font-semibold py-2 px-4 rounded"
                    aria-label="Go Back"
                  >
                    Back
                  </button>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="bg-green-500 text-white hover:bg-green-600 font-semibold py-2 px-4 rounded"
                    aria-label="Go to Dashboard"
                  >
                    Dashboard
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default StepModal;
