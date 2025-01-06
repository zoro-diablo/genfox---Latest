import { useState } from 'react';
import avatar1 from '../assets/avatar.png';
import avatar2 from '../assets/new_avatar.png';
import bank from '../assets/bank.png';
import bell from '../assets/bell.png';
import checked from '../assets/checked.png';

const App = () => {
  const [step, setStep] = useState(1);
  const [selectedGender, setSelectedGender] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const handleGenderSelect = (gender) => {
    setSelectedGender(gender);
  };

  const nextStep = () => {
    if (step === 1 && !selectedGender) {
      setShowModal(true);
      return;
    }
    setStep(step + 1);
  };

  const previousStep = () => {
    setStep(step - 1);
  };

  // Updated to include responsive classes:
  const genderButtonStyles = (isSelected) =>
    `inline-flex items-center justify-center md:w-[200px] w-full py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white ${
      isSelected ? 'bg-blue-700' : 'bg-blue-600'
    } hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150 ease-in-out`;

  const renderStepContainer = (children) => {
    // A small helper to apply the container classes consistently across all steps
    return (
      <div className="bg-white md:w-[1200px] md:h-[650px] w-full h-auto rounded-xl shadow-md flex flex-col md:py-10 md:px-20 p-4">
        {children}
      </div>
    );
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return renderStepContainer(
          <>
            <div className="flex-grow">
              <p className="font-bold text-2xl">Step 1</p>
              <p className="font-bold text-xl text-center">Select your gender</p>
              <div className="mx-auto flex justify-center">
                {/* Make the image responsive */}
                <img
                  className="md:h-[380px] h-[300px] object-contain"
                  src={selectedGender === 'female' ? avatar2 : avatar1}
                  alt={selectedGender || 'male'}
                />
              </div>
              <div className="gap-2 flex md:flex-row flex-col justify-center items-center mt-5">
                <button
                  onClick={() => handleGenderSelect('male')}
                  className={genderButtonStyles(selectedGender === 'male')}
                >
                  Male
                </button>
                <button
                  onClick={() => handleGenderSelect('female')}
                  className={genderButtonStyles(selectedGender === 'female')}
                >
                  Female
                </button>
              </div>
            </div>
            <div className="flex justify-end">
              <button
                onClick={nextStep}
                className="relative md:px-10 px-6 py-3.5 overflow-hidden group bg-gradient-to-r from-gray-700 to-black hover:bg-gradient-to-r hover:from-gray-600 hover:to-black text-white transition-all ease-out duration-300"
              >
                <span className="absolute right-0 w-10 h-full top-0 transition-all duration-1000 transform translate-x-12 bg-white opacity-10 -skew-x-12 group-hover:-translate-x-36 ease" />
                <span className="relative text-xl font-semibold">Next</span>
              </button>
            </div>
          </>
        );

      case 2:
        return renderStepContainer(
          <>
            <div className="flex-grow">
              <div className="flex justify-between items-center">
                <p className="font-bold text-2xl">Step 2</p>
                <div className="bg-gray-300 p-2 cursor-pointer">
                  <img className="h-8" src={bell} alt="bell-png" />
                </div>
              </div>
              <p className="font-bold text-xl text-center">
                Control AI Conversation
              </p>
              <div className="mx-auto flex justify-center mt-10">
                <div className="flex flex-col space-y-4 font-semibold">
                  {[
                    'Expense Alerts',
                    'Low Balance Notifications',
                    'Payment Due Reminders',
                    'Savings Goal Progress',
                    'Suspicious Activity Alerts',
                    'Daily/Weekly Summary',
                  ].map((item) => (
                    <div key={item} className="flex justify-between items-center">
                      <p className="mr-10">{item}</p>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          defaultValue
                          className="sr-only peer"
                        />
                        <div className="group peer ring-0 bg-gradient-to-bl from-neutral-800 via-neutral-700 to-neutral-600 rounded-full outline-none duration-1000 after:duration-300 w-16 h-8 shadow-md peer-focus:outline-none after:content-[''] after:rounded-full after:absolute after:[background:#0D2B39] peer-checked:after:rotate-180 after:[background:conic-gradient(from_135deg,_#b2a9a9,_#b2a8a8,_#ffffff,_#d7dbd9_,_#ffffff,_#b2a8a8)] after:outline-none after:h-6 after:w-6 after:top-1 after:left-1 peer-checked:after:translate-x-8 peer-hover:after:scale-95 peer-checked:bg-gradient-to-r peer-checked:from-emerald-500 peer-checked:to-emerald-900"></div>
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="flex justify-between">
              <button
                onClick={previousStep}
                className="relative md:px-10 px-6 py-3.5 overflow-hidden group bg-gradient-to-r from-gray-500 to-gray-700 hover:bg-gradient-to-r hover:from-gray-400 hover:to-gray-600 text-white transition-all ease-out duration-300"
              >
                <span className="absolute right-0 w-10 h-full top-0 transition-all duration-1000 transform translate-x-12 bg-white opacity-10 -skew-x-12 group-hover:-translate-x-36 ease" />
                <span className="relative text-xl font-semibold">Back</span>
              </button>
              <button
                onClick={nextStep}
                className="relative md:px-10 px-6 py-3.5 overflow-hidden group bg-gradient-to-r from-gray-700 to-black hover:bg-gradient-to-r hover:from-gray-600 hover:to-black text-white transition-all ease-out duration-300"
              >
                <span className="absolute right-0 w-10 h-full top-0 transition-all duration-1000 transform translate-x-12 bg-white opacity-10 -skew-x-12 group-hover:-translate-x-36 ease" />
                <span className="relative text-xl font-semibold">Next</span>
              </button>
            </div>
          </>
        );

      case 3:
        return renderStepContainer(
          <>
            <div className="flex-grow">
              <div className="flex justify-between items-center">
                <p className="font-bold text-2xl">Step 3</p>
                <div className="bg-gray-300 p-2 cursor-pointer">
                  <img className="h-8" src={bell} alt="bell-png" />
                </div>
              </div>
              <p className="font-bold text-xl text-center">Set Up KYC</p>
              <div className="mx-auto flex justify-center mt-10">
                <div className="rounded-full flex justify-center items-center">
                  {/* Make the image more responsive */}
                  <img
                    className="md:h-[200px] h-[150px] object-contain"
                    src={bank}
                    alt="bank-icon"
                  />
                </div>
              </div>
              <div className="flex justify-center py-5">
                <button className="inline-flex items-center md:w-[200px] w-full justify-center py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150 ease-in-out bg-blue-600">
                  Complete your KYC
                </button>
              </div>
            </div>
            <div className="flex justify-between">
              <button
                onClick={previousStep}
                className="relative md:px-10 px-6 py-3.5 overflow-hidden group bg-gradient-to-r from-gray-500 to-gray-700 hover:bg-gradient-to-r hover:from-gray-400 hover:to-gray-600 text-white transition-all ease-out duration-300"
              >
                <span className="absolute right-0 w-10 h-full top-0 transition-all duration-1000 transform translate-x-12 bg-white opacity-10 -skew-x-12 group-hover:-translate-x-36 ease" />
                <span className="relative text-xl font-semibold">Back</span>
              </button>
              <button
                onClick={nextStep}
                className="relative md:px-10 px-6 py-3.5 overflow-hidden group bg-gradient-to-r from-gray-700 to-black hover:bg-gradient-to-r hover:from-gray-600 hover:to-black text-white transition-all ease-out duration-300"
              >
                <span className="absolute right-0 w-10 h-full top-0 transition-all duration-1000 transform translate-x-12 bg-white opacity-10 -skew-x-12 group-hover:-translate-x-36 ease" />
                <span className="relative text-xl font-semibold">Next</span>
              </button>
            </div>
          </>
        );

      case 4:
        return renderStepContainer(
          <>
            <div className="flex-grow">
              <p className="font-bold text-2xl"></p>
              <p className="font-bold text-xl text-center">
                You have successfully completed the setup!
              </p>
              <div className="mx-auto flex justify-center mt-10">
                <img
                  className="md:h-[350px] h-[300px] object-contain"
                  src={selectedGender === 'female' ? avatar2 : avatar1}
                  alt="Congratulations"
                />
              </div>
              <div className="flex justify-center items-center gap-2 mt-5">
                <p className="text-center text-2xl font-bold">
                  Congratulations
                </p>
                <img src={checked} alt="checked-png" className="h-7" />
              </div>
            </div>
            <div className="flex justify-between">
              <button
                onClick={previousStep}
                className="relative md:px-10 px-6 py-3.5 overflow-hidden group bg-gradient-to-r from-gray-500 to-gray-700 hover:bg-gradient-to-r hover:from-gray-400 hover:to-gray-600 text-white transition-all ease-out duration-300"
              >
                <span className="absolute right-0 w-10 h-full top-0 transition-all duration-1000 transform translate-x-12 bg-white opacity-10 -skew-x-12 group-hover:-translate-x-36 ease" />
                <span className="relative text-xl font-semibold">Back</span>
              </button>
              <button
                onClick={() => alert('Go to Dashboard')}
                className="relative md:px-10 px-6 py-3.5 overflow-hidden group bg-gradient-to-r from-gray-700 to-black hover:bg-gradient-to-r hover:from-gray-600 hover:to-black text-white transition-all ease-out duration-300"
              >
                <span className="absolute right-0 w-10 h-full top-0 transition-all duration-1000 transform translate-x-12 bg-white opacity-10 -skew-x-12 group-hover:-translate-x-36 ease" />
                <span className="relative text-xl font-semibold">
                  Go to Dashboard
                </span>
              </button>
            </div>
          </>
        );

      default:
        return null;
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      {renderStep()}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white rounded-lg shadow-lg p-6 w-[400px]">
            <p className="text-xl font-bold text-center">
              Please select a gender to continue.
            </p>
            <div className="flex justify-center mt-4">
              <button
                onClick={() => setShowModal(false)}
                className="bg-blue-600 text-white py-2 px-4 rounded"
              >
                OK
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
