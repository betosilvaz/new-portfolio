import photo from '@/assets/photo.jpeg';
import { TypeAnimation } from 'react-type-animation';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

export default function Hero() {
  const { t } = useTranslation();

  const phrases = [
    t("hero.phrases.first"),
    2000,
    t("hero.phrases.second"),
    2000,
    t("hero.phrases.third"),
    2000,
  ];

  const appleBezier = [0.32, 0.72, 0, 1] as const;

  return (
    <motion.section 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="h-screen w-full flex flex-col justify-center items-center bg-[#fbfbfd] dark:bg-[#000000] overflow-hidden"
      id="home"
    >

      <div className="relative z-10 flex flex-col items-center">
        
        {/* Container da Foto */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1, ease: appleBezier }}
          className="relative mb-10"
        >
          {/* Brilho externo sutil */}
          <div className="absolute inset-0 rounded-full bg-linear-to-tr from-blue-500 to-purple-500 blur-xl opacity-20 dark:opacity-40 animate-pulse" />
          
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          >
            <img 
              src={photo} 
              alt="Gilberto Silva" 
              className="h-44 w-44 md:h-60 md:w-60 rounded-full object-cover border-[1px] border-black/5 dark:border-white/10 shadow-2xl" 
            />
          </motion.div>
        </motion.div>

        {/* Labels e Títulos */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8, ease: appleBezier }}
          className="text-center"
        >
          <span className="text-xs md:text-sm font-bold tracking-[0.3em] uppercase text-blue-600 dark:text-blue-400 mb-4 block">
            {t("hero.aka")}
          </span>
          
          <h1 className="text-6xl md:text-8xl font-extrabold dark:text-white tracking-tighter leading-[1.1] mb-6">
            Gilberto Silva
          </h1>

          <div className="h-10"> {/* Altura fixa para evitar saltos no layout */}
            <TypeAnimation
              sequence={phrases}
              wrapper="span"
              cursor={true}
              repeat={Infinity}
              className="text-xl md:text-2xl font-medium tracking-tight text-black/60 dark:text-white/60"
            />
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}