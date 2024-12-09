import { motion } from "framer-motion";
import { useState } from "react";
import { styles } from "../../constants/styles";
import { ComputersCanvas } from "../canvas";
import { config } from "../../constants/config";
import cvPdf from "../../assets/reda.dev.pdf";

const Hero = () => {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <section className={`relative mx-auto h-screen w-full`}>
      <div
        className={`absolute inset-0 top-[120px] mx-auto max-w-7xl ${styles.paddingX} flex flex-row items-start gap-5`}
      >
        <div className="mt-5 flex flex-col items-center justify-center">
          <div className="h-5 w-5 rounded-full bg-[#915EFF]" />
          <div className="violet-gradient h-40 w-1 sm:h-80" />
        </div>

        <div>
          <h1 className={`${styles.heroHeadText} text-white`}>
            Hi, I'm <span className="text-[#915EFF]">{config.hero.name}</span>
          </h1>
          <p className={`${styles.heroSubText} text-white-100 mt-2`}>
            {config.hero.p[0]} <br className="hidden sm:block" />
            {config.hero.p[1]}
          </p>
          <br />
          <button
        style={{
          fontWeight: '500',
          color: isHovered ? '#121212' : '#fff',
          border: '1px solid #fff',
          padding: '10px 34px',
          fontSize: '15px',
          position: 'relative',
          backgroundColor: '#915EFF',
          cursor: 'pointer',
          overflow: 'hidden',
          transition: 'color 0.3s ease-in-out',
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={() => {
          window.open(cvPdf);
        }}
      >
        <span
          style={{
            position: 'relative',
            zIndex: 1,
          }}
        >
          Download CV
        </span>
        <span
          style={{
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            width: isHovered ? '100%' : '0%',
            height: '100%',
            backgroundColor: '#fff',
            zIndex: -1,
            transition: 'width 0.3s ease-in-out',
          }}
        ></span>
      </button>
        </div>
      </div>

      <ComputersCanvas />

      <div className="xs:bottom-10 absolute bottom-32 flex w-full items-center justify-center">
        <a href="#about">
          <div className="border-secondary flex h-[64px] w-[35px] items-start justify-center rounded-3xl border-4 p-2">
            <motion.div
              animate={{
                y: [0, 24, 0],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                repeatType: "loop",
              }}
              className="bg-secondary mb-1 h-3 w-3 rounded-full"
            />
          </div>
        </a>
      </div>
    </section>
  );
};

export default Hero;
