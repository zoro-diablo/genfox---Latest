/* eslint-disable react/prop-types */
import { useEffect } from "react";
import { motion, stagger, useAnimate } from "framer-motion";
import { cn } from "@/lib/utils";
import { useInView } from "react-intersection-observer";

const TextGenerateEffect = ({ words, className, filter = true, duration = 0.5 }) => {
  const [scope, animate] = useAnimate();
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const processWords = (text) => {
    const parts = [];
    const regex = /(<br\s*\/?>)|([^<\s]+)/g;
    let match;

    while ((match = regex.exec(text)) !== null) {
      if (match[1]) {
        parts.push("<br />");
      } else {
        parts.push(match[2]);
      }
    }

    return parts;
  };

  const wordsArray = processWords(words);

  useEffect(() => {
    if (inView) {
      animate(
        "span",
        {
          opacity: 1,
          filter: filter ? "blur(0px)" : "none",
        },
        {
          duration: duration ? duration : 1,
          delay: stagger(0.2),
        }
      );
    }
  }, [inView]);

  const renderWords = () => {
    return (
      <motion.div ref={scope}>
        {wordsArray.map((item, idx) => {
          if (item === "<br />") {
            return <br key={idx} />;
          }
          return (
            <motion.span
              key={item + idx}
              className="opacity-0"
              style={{
                filter: filter ? "blur(10px)" : "none",
              }}
            >
              {item}{" "}
            </motion.span>
          );
        })}
      </motion.div>
    );
  };

  return (
    <div ref={ref} className={cn("", className)}>
      <div>
        <div>{renderWords()}</div>
      </div>
    </div>
  );
};

export default TextGenerateEffect;
