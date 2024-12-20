import { useEffect, useRef, useState } from 'react';
import { useInView } from 'framer-motion';
import linkedin from '../assets/linkedin.png';

const Payment = () => {
  const componentRef = useRef(null);
  const formRef = useRef(null);
  const isInView = useInView(componentRef, { once: true, margin: '-100px' });
  const [displayedHTML, setDisplayedHTML] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  const fullText = `Believe in our mission? 
    Show your <span class="text-blue-500">support</span> and help
    us drive innovation with 
    <span class="text-blue-500">GenFox AI</span>. Together, we can 
    <span class="text-blue-500">shape the future.</span>.`;

  const stripHTML = (html) => {
    const div = document.createElement('div');
    div.innerHTML = html;
    return div.textContent || div.innerText || '';
  };

  const plainText = stripHTML(fullText);

  useEffect(() => {
    if (isInView && formRef.current && !formRef.current.hasChildNodes()) {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/payment-button.js';
      script.setAttribute('data-payment_button_id', 'pl_PZ4LNSVWgD68hA');
      script.async = true;

      formRef.current.appendChild(script);

      
      return () => {
        if (formRef.current) {
          formRef.current.innerHTML = '';
        }
      };
    }
  }, [isInView]);

  useEffect(() => {
    if (isInView && currentIndex < plainText.length) {
      const timeout = setTimeout(() => {
        setDisplayedHTML((prev) => {
          let count = 0;
          let pos = 0;
          while (count < currentIndex && pos < fullText.length) {
            if (fullText[pos] === '<') {
              while (pos < fullText.length && fullText[pos] !== '>') {
                pos++;
              }
              pos++;
            } else {
              count++;
              pos++;
            }
          }
          return fullText.slice(0, pos);
        });
        setCurrentIndex(currentIndex + 1);
      }, 25);

      return () => clearTimeout(timeout);
    }
  }, [currentIndex, plainText, fullText, isInView]);

  return (
    <div
      ref={componentRef}
      className='border mx-4 md:mx-10 flex flex-col md:flex-row items-center relative z-20 bg-opacity-90 backdrop-filter backdrop-blur-lg rounded-lg w-[90%] md:w-auto'
    >
      <div className='w-full bg-grid-small-black/[0.2] gap-6 md:gap-20 relative flex flex-col md:flex-row items-center justify-between p-4 md:p-20'>
        {/* Text Container */}
        <div className='text-[#2e2e2e] flex flex-col justify-center items-center max-w-full md:max-w-2xl flex-1'>
          <div className='w-full'>
            {/* Fixed Height on Mobile */}
            <div className='h-34 md:h-auto overflow-hidden md:overflow-visible'>
              <p
                className='text-lg md:text-[22px] font-semibold custom-font text-center md:text-left'
                dangerouslySetInnerHTML={{ __html: displayedHTML }}
              ></p>
            </div>
          </div>
        </div>
        {/* Button Container */}
        <div className='flex flex-col items-center md:items-start text-center md:text-left max-w-full md:max-w-[210px] bg-white shadow-md rounded-md w-full relative flex-1 mt-4 md:mt-0'>
          <div className='absolute inset-0 rounded-md '></div>
          <div className='relative px-4 pt-4 rounded-md z-30 border pb-2 w-full'>
            <form ref={formRef}></form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
