import About from '../components/About';
import Footer from '../components/Footer';
import Hero from '../components/Hero';
import Integration from '../components/Integration';
import { SmoothScrollHero } from '../components/SmoothScrollHero';
import { TimelineDemo } from '../components/TimelineDemo';
import Contact from '../components/Contact'
import { useRef } from 'react';
import Payment from '../components/Payment';
import { FloatingNavDemo } from '../components/navbar/FloatingNavDemo';

export const Home = () => {
  const contactRef = useRef(null);
  const nameInputRef = useRef(null);
  return (
    <div>
      <FloatingNavDemo />
    <SmoothScrollHero />
    <Hero contactRef={contactRef} nameInputRef={nameInputRef} />
    <About />
    <Integration />
    <TimelineDemo />
    <div ref={contactRef}>
      <Contact nameInputRef={nameInputRef} />
    </div>
    <Payment />
    <Footer />
  </div>
  );
};
