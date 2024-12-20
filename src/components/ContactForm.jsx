import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import '../page.css';

const ContactForm = () => {
  const { ref, inView } = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });

  const variants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <>
      <div ref={ref} className='container my-[100px]'>
        <motion.span
          className='big-circle'
          initial={{ x: -200, y: -100, opacity: 0 }}
          animate={{ x: -125, y: 100, opacity: 1 }}
          transition={{
            duration: 1,
            ease: 'easeInOut',
          }}
        ></motion.span>

        <motion.img
          src='img/shape.png'
          className='square'
          alt=''
          initial='hidden'
          animate={inView ? 'visible' : 'hidden'}
          variants={{
            hidden: { x: 100, opacity: 0 },
            visible: { x: 0, opacity: 1 },
          }}
          transition={{ duration: 1, delay: 0.3 }}
        />
        <motion.div
          className='form'
          initial='hidden'
          animate={inView ? 'visible' : 'hidden'}
          variants={variants}
          transition={{ duration: 0.7, delay: 0.5 }}
        >
          <motion.div
            className='contact-info'
            initial='hidden'
            animate={inView ? 'visible' : 'hidden'}
            variants={{
              hidden: { x: -100, opacity: 0 },
              visible: { x: 0, opacity: 1 },
            }}
            transition={{ duration: 0.7 }}
          >
            <h3 className='title'>Let's get in touch</h3>
            <p className='text'>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe
              dolorum adipisci recusandae praesentium dicta!
            </p>
            <div className='info'>
              <div className='information'>
                <img src='img/location.png' className='icon' alt='' />
                <p>92 Cherry Drive Uniondale, NY 11553</p>
              </div>
              <div className='information'>
                <img src='img/email.png' className='icon' alt='' />
                <p>lorem@ipsum.com</p>
              </div>
              <div className='information'>
                <img src='img/phone.png' className='icon' alt='' />
                <p>123-456-789</p>
              </div>
            </div>
            <div className='social-media'>
              <p>Connect with us :</p>
              <div className='social-icons'>
                <motion.a
                  href='#'
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <i className='fab fa-facebook-f'></i>
                </motion.a>
                <motion.a
                  href='#'
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <i className='fab fa-twitter'></i>
                </motion.a>
                <motion.a
                  href='#'
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <i className='fab fa-instagram'></i>
                </motion.a>
                <motion.a
                  href='#'
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <i className='fab fa-linkedin-in'></i>
                </motion.a>
              </div>
            </div>
          </motion.div>

          <motion.div
            className='contact-form'
            initial='hidden'
            animate={inView ? 'visible' : 'hidden'}
            variants={{
              hidden: { x: 100, opacity: 0 },
              visible: { x: 0, opacity: 1 },
            }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <motion.span
              className='circle one'
              initial='hidden'
              animate={inView ? 'visible' : 'hidden'}
              variants={{ hidden: { scale: 0 }, visible: { scale: 1 } }}
              transition={{ duration: 0.6, delay: 0.5 }}
            ></motion.span>
            <motion.span
              className='circle two'
              initial='hidden'
              animate={inView ? 'visible' : 'hidden'}
              variants={{ hidden: { scale: 0 }, visible: { scale: 1 } }}
              transition={{ duration: 0.6, delay: 0.8 }}
            ></motion.span>
            <form action='index.html' autoComplete='off'>
              <h3 className='title'>Contact us</h3>
              <div className='input-container'>
                <input
                  type='text'
                  name='name'
                  className='input'
                  onFocus={(e) => e.target.parentNode.classList.add('focus')}
                  onBlur={(e) => {
                    if (e.target.value === '')
                      e.target.parentNode.classList.remove('focus');
                  }}
                />
                <label>Username</label>
                <span>Username</span>
              </div>
              <div className='input-container'>
                <input
                  type='email'
                  name='email'
                  className='input'
                  onFocus={(e) => e.target.parentNode.classList.add('focus')}
                  onBlur={(e) => {
                    if (e.target.value === '')
                      e.target.parentNode.classList.remove('focus');
                  }}
                />
                <label>Email</label>
                <span>Email</span>
              </div>
              <div className='input-container'>
                <input
                  type='tel'
                  name='phone'
                  className='input'
                  onFocus={(e) => e.target.parentNode.classList.add('focus')}
                  onBlur={(e) => {
                    if (e.target.value === '')
                      e.target.parentNode.classList.remove('focus');
                  }}
                />
                <label>Phone</label>
                <span>Phone</span>
              </div>
              <div className='input-container textarea'>
                <textarea
                  name='message'
                  className='input'
                  onFocus={(e) => e.target.parentNode.classList.add('focus')}
                  onBlur={(e) => {
                    if (e.target.value === '')
                      e.target.parentNode.classList.remove('focus');
                  }}
                ></textarea>
                <label>Message</label>
                <span>Message</span>
              </div>
              <motion.input
                type='submit'
                value='Send'
                className='btn'
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              />
            </form>
          </motion.div>
        </motion.div>
      </div>
    </>
  );
};

export default ContactForm;
