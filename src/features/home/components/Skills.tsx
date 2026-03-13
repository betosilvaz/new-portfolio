import { motion, type Variants } from "framer-motion";
import { Code2, Server, Terminal } from "lucide-react"; // Simulação de ícones premium

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 }
  }
};

const cardVariants: Variants = {
  hidden: { y: 50, opacity: 0 },
  visible: { 
    y: 0, 
    opacity: 1,
    transition: { type: "spring", stiffness: 100, damping: 15 }
  },
  hover: { 
    y: -8, 
    transition: { type: "spring", stiffness: 400, damping: 10 } 
  }
};

export default function Skills() {
  const skills = [
    { title: "Front-end", icon: <Code2 />, tech: ["HTML", "CSS", "Javascript", "Tailwind", "React"] },
    { title: "Back-end", icon: <Server />, tech: ["Java", "Spring Boot", "Node.js", "PostgreSQL"] },
    { title: "Ferramentas", icon: <Terminal />, tech: ["Docker", "Git", "GitHub", "Linux"] },
  ];

  return (
    <motion.section 
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={containerVariants}
      className="py-24 px-6 md:px-12 dark:bg-[#050505] bg-white dark:text-white"
      id="stack"
    >
      <div className="max-w-6xl mx-auto">
        <header className="mb-16">
          <h2 className="text-sm font-medium tracking-[0.2em] uppercase opacity-50 mb-4">Especialidades</h2>
          <h3 className="text-4xl md:text-5xl font-semibold tracking-tight">Meu arsenal</h3>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {skills.map((skill, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              whileHover="hover"
              className="group relative p-8 rounded-3xl bg-white border-[#000000]/10 dark:bg-[#121212] border dark:border-white/5 overflow-hidden"
            >
              {/* Efeito de brilho sutil no hover */}
              <div className="absolute inset-0 bg-linear-to-br from-blue-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="relative z-10">
                <div className="w-12 h-12 mb-6 flex items-center justify-center rounded-2xl bg-[#333333]/5 dark:bg-white/5 text-blue-400">
                  {skill.icon}
                </div>
                <h4 className="text-2xl font-medium mb-4">{skill.title}</h4>
                <ul className="space-y-2">
                  {skill.tech.map(t => (
                    <li key={t} className="text-[#050505]/40 dark:text-white/40 group-hover:text-[#050505]/80 dark:group-hover:text-white/80 transition-colors">
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}