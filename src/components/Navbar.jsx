import { motion } from 'framer-motion';
import { ShiftingDropDown } from './ShiftingDropDown';

const Navbar = () => {
    return (
        <motion.div
            initial={{ y: -100, opacity: 0 }} 
            animate={{ y: 0, opacity: 1 }} 
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.5 }} 
            className="relative px-[96px] pt-[20px] sm:pt-[42px] flex items-center justify-between"
        >
            <div className="flex-shrink-0 flex items-center sm:justify-start justify-center w-full sm:w-auto">
                <img src="/logo.png" className="h-[40px]" alt="logo" />
                <p className="text-xl font-semibold tracking-tight ml-1 sm:pr-0 pr-4  sm:text-3xl">GenFox</p>
            </div>

            <div className="absolute left-1/2 transform -translate-x-1/2 z-20 hidden sm:block">
                <ShiftingDropDown />
            </div>
        </motion.div>
    );
};

export default Navbar;
