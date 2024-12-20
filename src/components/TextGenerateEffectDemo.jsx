import TextGenerateEffect from './ui/TextGenerateEffect';

const words = `Simplify Your Life, <br /> One Step at a Time`; 

const TextGenerateEffectDemo = () => {
  return (
    <div className="p-4 sm:mx-[100px] custom-font text-[22px] whitespace-nowrap sm:text-[38px] text-[#2e2e2e]">
      <TextGenerateEffect duration={2} filter={false} words={words} />
    </div>
  );
};

export default TextGenerateEffectDemo;
