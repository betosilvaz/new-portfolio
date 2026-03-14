import { motion, type Variants } from "framer-motion";
import useTheme from "@/hooks/useTheme";
import { useTranslation } from "react-i18next";

const appleBezier = [0.32, 0.72, 0, 1];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 }
  }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.8, ease: appleBezier } 
  }
};

export default function Contact() {
  const { t, i18n } = useTranslation();

  return (
    <motion.section 
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={containerVariants}
      className="w-full py-32 bg-[#fbfbfd] dark:bg-[#000000] text-[#1d1d1f] dark:text-[#f5f5f7] overflow-hidden" 
      id="contact"
    >
      <div className="max-w-6xl mx-auto px-6">
        <header className="mb-20">
          <motion.h2 variants={itemVariants} className="text-sm font-semibold tracking-[0.2em] uppercase opacity-50 mb-4">
            {t("contact.subtitle")}
          </motion.h2>
          <motion.h3 variants={itemVariants} className="text-5xl md:text-6xl font-semibold tracking-tighter">
            {t("contact.title1")} <br />
            <span className="text-black/30 dark:text-white/30">{t("contact.title2")}</span>
          </motion.h3>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Formulário Estilo Clean */}
          <motion.div variants={itemVariants} className="lg:col-span-7 bg-white dark:bg-[#121212] rounded-[40px] p-8 md:p-12 border border-black/5 dark:border-white/5 shadow-sm">
            <form className="flex flex-col gap-10">
              <div className="group flex flex-col gap-2 border-b border-black/10 dark:border-white/10 pb-4 focus-within:border-blue-500 transition-colors">
                <label className="text-xs font-bold uppercase tracking-widest opacity-40">{t("contact.form.name.label")}</label>
                <input 
                  type="text" 
                  placeholder={t("contact.form.name.placeholder")} 
                  className="bg-transparent text-xl outline-none placeholder:opacity-20"
                />
              </div>

              <div className="group flex flex-col gap-2 border-b border-black/10 dark:border-white/10 pb-4 focus-within:border-blue-500 transition-colors">
                <label className="text-xs font-bold uppercase tracking-widest opacity-40">{t("contact.form.email.label")}</label>
                <input 
                  type="email" 
                  placeholder={t("contact.form.email.placeholder")} 
                  className="bg-transparent text-xl outline-none placeholder:opacity-20"
                />
              </div>

              <motion.button 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="mt-4 py-4 px-8 bg-blue-600 text-white rounded-full font-semibold text-lg self-start transition-all hover:bg-blue-500 shadow-lg shadow-blue-500/20"
              >
                {t("contact.form.button")}
              </motion.button>
            </form>
          </motion.div>

          {/* Cards de Social - Estilo Widgets */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <SocialCard 
              href="https://github.com/betosilvaz" 
              icon={<Github />} 
              label="GitHub" 
              username="@betosilvaz" 
            />
            <SocialCard 
              href="https://www.linkedin.com/in/gilberto-silva-3623ba190/" 
              icon={<Linkedin />} 
              label="LinkedIn" 
              username="Gilberto Silva" 
            />
          </div>
        </div>
      </div>
    </motion.section>
  );
}

function SocialCard({ href, icon, label, username }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer">
      <motion.div
        variants={itemVariants}
        whileHover={{ y: -5, backgroundColor: "rgba(0,0,0,0.03)" }}
        className="group w-full flex items-center justify-between rounded-[32px] bg-black/[0.02] dark:bg-white/[0.05] p-8 transition-colors border border-transparent hover:border-black/5 dark:hover:border-white/10"
      >
        <div className="flex items-center gap-6">
          <div className="text-black dark:text-white opacity-80 group-hover:opacity-100 transition-opacity">
            {icon}
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-widest opacity-40">{label}</p>
            <p className="text-lg font-medium tracking-tight">{username}</p>
          </div>
        </div>
        <div className="text-2xl opacity-0 group-hover:opacity-100 transition-all -translate-x-4 group-hover:translate-x-0">
          ↗
        </div>
      </motion.div>
    </a>
  );
}

// ... Mantém suas funções Github e Linkedin SVG aqui abaixo

function Github({ size = 30, color, ...props }) {
  const { theme } = useTheme();
  const cor = color ?? (theme === "dark" ? "white" : "#050505");

  return (
    <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" style={{ width: size, height: size, fill: cor }} {...props}>
      <title>GitHub</title>
      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
    </svg>
  )
}

function Linkedin({ size = 30, color, ...props }) {
  const { theme } = useTheme();
  const cor = color ?? (theme === "dark" ? "white" : "#050505");

  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"  style={{ width: size, height: size, fill: cor }} {...props}>
      <path d="M512 96L127.9 96C110.3 96 96 110.5 96 128.3L96 511.7C96 529.5 110.3 544 127.9 544L512 544C529.6 544 544 529.5 544 511.7L544 128.3C544 110.5 529.6 96 512 96zM231.4 480L165 480L165 266.2L231.5 266.2L231.5 480L231.4 480zM198.2 160C219.5 160 236.7 177.2 236.7 198.5C236.7 219.8 219.5 237 198.2 237C176.9 237 159.7 219.8 159.7 198.5C159.7 177.2 176.9 160 198.2 160zM480.3 480L413.9 480L413.9 376C413.9 351.2 413.4 319.3 379.4 319.3C344.8 319.3 339.5 346.3 339.5 374.2L339.5 480L273.1 480L273.1 266.2L336.8 266.2L336.8 295.4L337.7 295.4C346.6 278.6 368.3 260.9 400.6 260.9C467.8 260.9 480.3 305.2 480.3 362.8L480.3 480z"/>
    </svg>
  )
}