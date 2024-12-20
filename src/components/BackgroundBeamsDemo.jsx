import { BackgroundBeams } from '../components/ui/background-beams';
import ai_image from '../assets/Artificial-Intelligence-AI-scaled.jpg';

export function BackgroundBeamsDemo() {
  return (
    <div className='h-auto my-[150px] w-[95%] mx-auto rounded-3xl bg-[#1b1b1b] relative flex flex-col items-center justify-center antialiased'>
      <div className='w-full mx-auto px-4 z-10 sm:py-[150px] py-[60px]'>
        <h1 className='relative z-10 text-2xl sm:text-2xl md:text-7xl bg-clip-text text-transparent bg-gradient-to-b from-neutral-100 to-neutral-500 text-center font-sans font-bold'>
          Join the Waitlist
        </h1>
        <p className='text-neutral-500  max-w-sm sm:max-w-md mx-auto my-4 text-sm sm:text-base font-medium text-center relative z-10'>
          Your Charter wallet is packed with neat features that further assist
          you in operating your daily finances.
        </p>
        {/* Form Start here */}
        <div className='flex flex-col lg:flex-row items-center justify-center w-full lg:w-[80%] bg-[#1e1e1e] mx-auto my-[60px] sm:my-6 rounded-lg z-20'>
          <div className='w-full lg:w-[40%] flex flex-col px-4 sm:px-10 py-6 gap-y-6'>
            <div className='flex flex-col gap-2'>
              <p className='text-white/50 font-semibold text-lg sm:text-xl'>
                Chat with our team
              </p>
              <p className='text-white/20 text-sm sm:text-[13px]'>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                Eligendi quae reiciendis commodi?
              </p>
            </div>
            <div>
              <div className='flex flex-col sm:flex-row gap-4'>
                <input
                  type='text'
                  placeholder='First name'
                  className='w-full sm:w-1/2 border-b text-sm bg-transparent border-white/30 outline-none focus:ring-0 py-2 px-2 placeholder:text-neutral-700 text-white'
                />
                <input
                  type='text'
                  placeholder='Last name'
                  className='w-full sm:w-1/2 border-b bg-transparent text-sm outline-none border-white/30 focus:ring-0 py-2 px-2 placeholder:text-neutral-700 text-white'
                />
              </div>
              <input
                type='email'
                placeholder='Email address'
                className='w-full border-b bg-transparent text-sm outline-none border-white/30 focus:ring-0 mt-4 py-2 px-2 placeholder:text-neutral-700 text-white'
              />
              <input
                type='text'
                placeholder='+91 0000000000'
                className='w-full border-b bg-transparent text-sm outline-none border-white/30 focus:ring-0 mt-4 py-2 px-2 placeholder:text-neutral-700 text-white'
              />
            </div>
            <div className='mt-6'>
              <button className='bg-white/50 font-semibold rounded-lg text-sm p-3 w-full'>
                Get in Touch
              </button>
            </div>
          </div>

          <div className='lg:block hidden lg:w-[60%]'>
            <div className='w-full  flex justify-center relative p-4'>
              <img
                src={ai_image}
                alt='phone'
                className='rounded-lg h-[200px] sm:h-[300px] lg:h-[600px] object-cover w-full lg:w-auto blur-[2px]'
              />
              <div className='absolute bottom-4 left-4 text-white/60 p-3 rounded-md '>
                <p className='text-sm sm:text-[17px] font-medium'>
                  Untitled’s software helps us manage cash flow, financial
                  reporting, and payroll with ease. It’s a great solution for
                  startups looking for an efficient way to manage their finances
                  all-in-one.
                </p>
                <p className='mt-2 text-xs sm:text-[13px] font-semibold'>
                  Maya Rothwell
                </p>
                <p className='text-[10px] sm:text-[11px]'>Founder & CEO</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <BackgroundBeams />
    </div>
  );
}
