import wallpaper from '../assets/white-wallpaper.jpg';
import darkwallpaper from '../assets/black-wallpaper.jpg';  
import { Label } from '../components/ui/label';
import { Input } from '../components/ui/input';
import { cn } from '@/lib/utils';
import {
  IconBrandGithub,
  IconBrandGoogle,
  IconBrandLinkedin,
  IconEye,
  IconEyeOff,
} from '@tabler/icons-react';
import { useState } from 'react';
import logo from '../assets/logo.png';
import { Link } from 'react-router-dom';

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted');
  };

  const handleRememberMeChange = () => {
    setRememberMe(!rememberMe);
  };

  return (
    <div
      className='min-h-screen w-full bg-cover bg-center flex items-center justify-center p-4'
      style={{ backgroundImage: `url(${wallpaper})` }}
    >
      <div className='w-full max-w-md mx-auto rounded-md p-6 md:p-8 shadow-input bg-white dark:bg-black/80'>
        <div className='flex justify-center w-full mb-4'>
          <img src={logo} alt='logo' className='w-16 h-16 sm:w-20 sm:h-20' />
        </div>

        <h2 className='font-bold text-lg sm:text-xl text-neutral-800 dark:text-neutral-200 text-center'>
          Welcome to GenFox
        </h2>

        <form className='my-6 sm:my-8' onSubmit={handleSubmit}>
          <LabelInputContainer className='mb-4'>
            <Label htmlFor='email'>Email Address</Label>
            <Input
              className='text-[12px] sm:text-[13px] font-medium'
              id='email'
              placeholder='genfox@gmail.com'
              type='email'
            />
          </LabelInputContainer>

          <LabelInputContainer className='mb-4'>
            <Label htmlFor='password'>Password</Label>
            <div className='relative'>
              <Input
                id='password'
                placeholder='••••••••'
                type={showPassword ? 'text' : 'password'}
                className='pr-10 text-[12px] sm:text-[13px] font-medium'
              />
              <button
                type='button'
                onClick={() => setShowPassword(!showPassword)}
                className='absolute inset-y-0 right-2 flex items-center text-neutral-700 dark:text-neutral-300'
              >
                {showPassword ? <IconEyeOff /> : <IconEye />}
              </button>
            </div>
          </LabelInputContainer>

          <div className='flex justify-between items-center mb-4'>
            <div className='flex items-center space-x-2'>
              <label className='flex items-center'>
                <input
                  type='checkbox'
                  className='w-4 h-4 cursor-pointer'
                  checked={rememberMe}
                  onChange={handleRememberMeChange}
                />
              </label>
              <span className='text-[12px] sm:text-[13px] font-semibold text-neutral-700 dark:text-neutral-300'>
                Remember me
              </span>
            </div>
            {/* <a
              href='#'
              className='text-[12px] sm:text-[13px] font-semibold text-black/60 hover:underline'
            >
              Forgot Password?
            </a> */}
          </div>

          <Link to='/form'>
            <button
              className='relative bg-gradient-to-br from-black to-neutral-600 block w-full text-white rounded-md h-10 sm:h-12 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset]'
              type='submit'
            >
              Sign Up &rarr;
              <BottomGradient />
            </button>
          </Link>

          <div className='flex items-center my-6 sm:my-8'>
            <div className='flex-grow bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent h-[1px]' />
            <span className='px-4 text-neutral-500 text-[10px] sm:text-[12px] font-medium'>
              Or continue with
            </span>
            <div className='flex-grow bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent h-[1px]' />
          </div>

          <div className='flex flex-col gap-y-4 sm:flex-row sm:gap-x-2 xl:flex-col xl:gap-y-4'>
            <OAuthButton icon={<IconBrandGithub className='text-white/50' />} text='GitHub' />
            <OAuthButton icon={<IconBrandGoogle className='text-white/50' />} text='Google' />
            <OAuthButton icon={<IconBrandLinkedin className='text-white/50' />} text='LinkedIn' />
          </div>
        </form>
        <div className='text-[12px] font-semibold underline flex justify-center cursor-pointer text-black/50'>
          <Link to='/signin'>Already have an account?</Link>
        </div>
      </div>
    </div>
  );
};

const OAuthButton = ({ icon, text }) => (
  <button
    className='relative group/btn flex space-x-2 items-center justify-start px-4 w-full text-black rounded-md h-10 sm:h-12 font-medium shadow-input bg-gray-50 dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_var(--neutral-800)]'
    type='button'
  >
    {icon}
    <span className='text-neutral-700 dark:text-neutral-300 text-[12px] sm:text-[13px]'>
      {text}
    </span>
    <BottomGradient />
  </button>
);

const BottomGradient = () => {
  return (
    <>
      <span className='group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent' />
      <span className='group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent' />
    </>
  );
};

const LabelInputContainer = ({ children, className }) => {
  return (
    <div className={cn('flex flex-col space-y-2 w-full', className)}>
      {children}
    </div>
  );
};

export default SignUp;
