import React, { useState } from 'react';
import wallpaper from '../assets/white-wallpaper.jpg';
import darkwallpaper from '../assets/black-wallpaper.jpg';
import { Label } from '../components/ui/label';
import { Input } from '../components/ui/input';
import { cn } from '@/lib/utils';
import logo from '../assets/logo.png';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useNavigate } from 'react-router-dom';

const PersonalDetailsForm = () => {
  const [gender, setGender] = useState('');
  const navigate = useNavigate();

  const handleGenderChange = (value) => {
    setGender(value);
    console.log('Selected gender:', value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = {
      fullName: e.target.fullName.value,
      gender,
      dob: e.target.dob.value,
      email: e.target.email.value,
      mobileNumber: e.target.mobileNumber.value,
    };
    console.log('Form submitted with data:', formData);

    // Save the fullName to Local Storage
    localStorage.setItem('userFullName', formData.fullName);

    // Navigate to the dashboard
    navigate('/dashboard/lobby');
  };

  return (
    <div
      className="min-h-screen w-full bg-cover bg-center flex items-center justify-center p-4"
      style={{ backgroundImage: `url(${darkwallpaper})` }}
    >
      <div className="w-full max-w-md mx-auto rounded-md p-6 md:p-8 shadow-input bg-white dark:bg-black/80">
        <div className="flex justify-center w-full mb-4">
          <img src={logo} alt="logo" className="w-16 h-16 sm:w-20 sm:h-20" />
        </div>

        <h2 className="font-bold text-lg sm:text-xl text-neutral-800 dark:text-neutral-200 text-center">
          Personal Details
        </h2>

        <form className="my-6 sm:my-8" onSubmit={handleSubmit}>
          <LabelInputContainer className="mb-4">
            <Label htmlFor="fullName">Full Name</Label>
            <Input
              id="fullName"
              name="fullName"
              placeholder="Enter your full name"
              type="text"
              className="text-[12px] sm:text-[13px] font-medium"
              required
            />
          </LabelInputContainer>

          <LabelInputContainer className="mb-4">
            <Label>Gender</Label>
            <Select onValueChange={handleGenderChange}>
              <SelectTrigger className="w-full bg-[#27272a] text-white/50 border-black">
                <SelectValue placeholder="Select a gender" />
              </SelectTrigger>
              <SelectContent className="bg-white bg-opacity-10 dark:bg-black dark:bg-opacity-10 backdrop-blur-lg border border-black dark:border-black border-opacity-30 dark:border-opacity-30 text-black dark:text-white rounded-lg">
                <SelectGroup>
                  <SelectLabel>Gender</SelectLabel>
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                  <SelectItem value="non_binary">Non-Binary</SelectItem>
                  <SelectItem value="prefer_not_to_say">
                    Prefer Not to Say
                  </SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </LabelInputContainer>

          <LabelInputContainer className="mb-4">
            <Label htmlFor="dob">DOB</Label>
            <div className="relative">
              <input
                id="dob"
                name="dob"
                placeholder="Enter your date of birth"
                type="text"
                onFocus={(e) => (e.target.type = 'date')}
                onBlur={(e) => (e.target.type = 'text')}
                className="w-full text-[12px] py-3 sm:text-[13px] font-medium pr-10 pl-3 rounded-md bg-[#27272a] text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </LabelInputContainer>

          <LabelInputContainer className="mb-4">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              placeholder="Enter your email"
              type="email"
              className="text-[12px] sm:text-[13px] font-medium"
              required
            />
          </LabelInputContainer>

          <LabelInputContainer className="mb-8">
            <Label htmlFor="mobileNumber">Mobile Number</Label>
            <Input
              id="mobileNumber"
              name="mobileNumber"
              placeholder="+91 123456789"
              type="number"
              className="text-[12px] sm:text-[13px] font-medium"
              required
            />
          </LabelInputContainer>

          <button
            className="relative bg-gradient-to-br from-black to-neutral-600 block w-full text-white rounded-md h-10 sm:h-12 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset]"
            type="submit"
          >
            Continue
          </button>
        </form>
      </div>
    </div>
  );
};

const LabelInputContainer = ({ children, className }) => {
  return (
    <div className={cn('flex flex-col space-y-2 w-full', className)}>
      {children}
    </div>
  );
};

export default PersonalDetailsForm;
