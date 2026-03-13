import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { motion, type Variants } from "framer-motion";

export default function About() {
  const appleBezier = [0.32, 0.72, 0, 1];

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: appleBezier,
      },
    },
  };

  return (
    <motion.section
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      className="w-screen py-24 bg-[#f4f4f4] dark:bg-[#000000] overflow-hidden"
      id="about"
    >
      <div className="max-w-6xl mx-auto px-6">
        {/* Título com estilo Apple Newsroom */}
        <motion.div variants={itemVariants} className="mb-20 text-center md:text-left">
          <h2 className="text-sm font-semibold tracking-[0.15em] uppercase opacity-50 mb-4 dark:text-white">
            A História
          </h2>
          <h3 className="text-5xl md:text-7xl font-semibold tracking-tighter dark:text-white leading-[1.1]">
            Desenvolvedor por código. <br />
            <span className="text-black/40 dark:text-white/40">Criador por obstinação.</span>
          </h3>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Lottie em um container com "glassmorphism" sutil ou apenas respiro */}
          <motion.div 
            variants={itemVariants} 
            className="lg:col-span-5 flex justify-center items-center bg-white/50 dark:bg-white/5 rounded-[40px] aspect-square p-8"
          >
            <DotLottieReact 
              src="/panda.lottie" 
              loop 
              autoplay 
              className="w-full h-full max-w-[300px]"
            />
          </motion.div>

          {/* Texto com tipografia refinada e espaçamento */}
          <motion.div variants={itemVariants} className="lg:col-span-7">
            <div className="space-y-6 text-xl md:text-2xl font-medium leading-relaxed text-[#1d1d1f] dark:text-[#f5f5f7] opacity-90">
              <p>
                Acredito que a tecnologia é uma ferramenta poderosa para impactar o mundo em qualquer
                que seja o campo. Tabalho para criar soluções eficientes para problemas que as pessoas possuem.
              </p>
              <p className="text-black/50 dark:text-white/50">
                Atualmente, foco em construir sistemas web de maneira Fullstack,
                mas sempre buscando explorar novas tecnologias, áreas e possibilidades.
              </p>
            </div>
            
            {/* Um botão de call-to-action minimalista, bem estilo Apple */}
            <motion.div 
              variants={itemVariants}
              className="mt-10"
            >
              <a href="#contact" className="text-blue-600 dark:text-blue-400 font-semibold text-lg hover:underline decoration-2 underline-offset-4 transition-all">
                Entre em contato ↗
              </a>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}