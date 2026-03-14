import { createPortal, flushSync } from "react-dom";
import { Terminal, Sun, Moon, Menu, X } from 'lucide-react';
import { Link } from "@tanstack/react-router";
import { AnimatePresence, motion, type Variants } from "framer-motion";
import { useEffect, useState } from "react";

import useTheme from "@/hooks/useTheme";
import useViewport from "@/hooks/useViewport"
import { useTranslation } from "react-i18next";

export default function Header() {
  const { theme, toggleTheme } = useTheme();
  const viewport = useViewport();
  const { t, i18n } = useTranslation();
  const [menu, setMenu] = useState<Boolean>(false);
  const [popover, setPopover] = useState<Boolean>(false);

  const toggleMenu = (): void => {
    setMenu(p => !p);
  }

  // Troca de idioma
  const changeLanguage = (lang: string): void => {
    setPopover(false);

    if (!document.startViewTransition) {
      i18n.changeLanguage(lang);
      return;
    }

    document.documentElement.classList.add('lang-transition');

    const transition = document.startViewTransition(() => {
      flushSync(() => {
        i18n.changeLanguage(lang);
      });
    });

    transition.finished.finally(() => {
      document.documentElement.classList.remove('lang-transition');
    });
  };

  const togglePopover = (): void => {
    setPopover(p => !p);
  }

  useEffect(() => {
    if (menu) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = "unset";
    }
  }, [menu]);

  return (
    <>
      <AnimatePresence>
        {menu && viewport.width <= 1024 && <SideBar onClose={toggleMenu} />}
      </AnimatePresence>
      <header className="z-999 w-[95%] sm:w-4/5 flex justify-between items-center p-4 rounded-lg left-1/2 -translate-x-1/2 fixed top-3 dark:bg-[#111111]/70 backdrop-blur-md border dark:border-white/10 border-[#111111]/10 dark:text-white">
        {/* 1. Icone */}
        <motion.div
          whileHover={{ scale: 1.3 }}
          whileTap={{ scale: 1 }}
        >
          <Link to="/">
            <Terminal color={theme === "dark" ? "white" : "black"} size={30} />
          </Link>
        </motion.div>
        {/* 2. links */}
        <nav className="mix-blend-difference hidden lg:block" >
          <ul className="flex gap-10">
            <NavLink to="#home" label={t("header.menu.home")} />
            <NavLink to="#about" label={t("header.menu.about")} />
            <NavLink to="#stack" label={t("header.menu.skills")} />
            <NavLink to="#projects" label={t("header.menu.projects")} />
            <NavLink to="#contact" label={t("header.menu.contact")} />
          </ul>
        </nav>
        {/* 3. botões */}
        <div className="flex justify-center items-center gap-3">
          <motion.button
            whileHover={{ scale: 1.1 }}
            className="relative rounded-full p-2 bg-black/10 uppercase text-sm dark:bg-white/10 hidden lg:block"
            onClick={togglePopover}
          >
            {i18n.language}
            {popover && (
              <div className="absolute top-full mt-2 right-0 p-2 rounded-xl bg-white dark:bg-[#181818] border border-black/10 dark:border-white/10 shadow-xl flex flex-col min-w-[100px] overflow-hidden">
                {(i18n.options.supportedLngs as string[])
                  .filter(l => l !== 'cimode')
                  .map(l => (
                    <button
                      key={l}
                      onClick={() => changeLanguage(l)}
                      className="px-4 py-2 text-xs font-bold uppercase hover:bg-black/5 dark:hover:bg-white/5 rounded-lg transition-colors text-left dark:text-white text-black"
                    >
                      {l}
                    </button>
                  ))
                }
              </div>
            )}
          </motion.button>
          <motion.button
            key={theme}
            onClick={toggleTheme}
            initial={{ rotate: -90 }}
            animate={{ rotate: 20 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            transition={{ duration: 2, type: "spring", stiffness: 400, damping: 17 }}
            className="p-2 rounded-full bg-black/10 dark:bg-white/10 hidden lg:block"
          >
            {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
          </motion.button>
          <button className="lg:hidden" onClick={toggleMenu}>
            <Menu strokeWidth="2" />
          </button>
        </div>
      </header>
    </>
  );
}

function NavLink({ to, label }: { to: string, label: string }) {
  return (
    <li>
      <a href={to} className="mix-blend-difference py-2 rounded-lg px-4 font-semibold dark:hover:bg-[#ffffff]/3 hover:bg-[#111111]/10 transition-all">
        {label}
      </a>
    </li>
  );
}

function SideBar({ onClose }: { onClose: () => void }) {
  const { theme, toggleTheme } = useTheme();
  const { t, i18n } = useTranslation();
  const [popover, setPopover] = useState<Boolean>(false);

  const togglePopover = (): void => {
    setPopover(p => !p);
  }

  const changeLanguage = (lang: string): void => {
    setPopover(false);

    if (!document.startViewTransition) {
      i18n.changeLanguage(lang);
      return;
    }

    document.documentElement.classList.add('lang-transition');

    const transition = document.startViewTransition(() => {
      flushSync(() => {
        i18n.changeLanguage(lang);
      });
    });

    transition.finished.finally(() => {
      document.documentElement.classList.remove('lang-transition');
    });
  };

  const containerVariants: Variants = {
    hidden: {
      x: "100%",
    },
    visible: {
      x: 0,
      transition: {
        duration: 1, type: "spring", stiffness: 100, damping: 15
      }
    }
  }

  return createPortal((
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="hidden"
      className="fixed inset-0 h-[100dvh] w-full z-[999] bg-white dark:bg-[#050505] text-[#050505] dark:text-white flex flex-col p-8 overflow-y-scroll"
    >
      {/* 1. Botões de ação */}
      <div className="flex justify-between mb-8">
        <button onClick={onClose}><X size={30} /></button>

        <div className="flex gap-6">
          <motion.button
            whileHover={{ scale: 1.1 }}
            className="relative rounded-full p-4 bg-black/10 uppercase text-sm dark:bg-white/10"
            onClick={togglePopover}
          >
            {i18n.language}
            {popover && (
              <div className="absolute top-full mt-2 right-0 p-2 rounded-xl bg-white dark:bg-[#181818] border border-black/10 dark:border-white/10 shadow-xl flex flex-col min-w-[100px] overflow-hidden">
                {(i18n.options.supportedLngs as string[])
                  .filter(l => l !== 'cimode')
                  .map(l => (
                    <button
                      key={l}
                      onClick={() => changeLanguage(l)}
                      className="px-4 py-2 text-xs font-bold uppercase hover:bg-black/5 dark:hover:bg-white/5 rounded-lg transition-colors text-left dark:text-white text-black"
                    >
                      {l}
                    </button>
                  ))
                }
              </div>
            )}
          </motion.button>
          <motion.button
            key={theme}
            onClick={toggleTheme}
            initial={{ rotate: -90 }}
            animate={{ rotate: 0 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            transition={{ duration: 2, type: "spring", stiffness: 400, damping: 17 }}
            className="p-4 rounded-full bg-black/10 dark:bg-white/10"
          >
            {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
          </motion.button>
        </div>
      </div>
      {/* 2. Links */}
      <ul className="flex flex-col gap-6">
        <li><a href="#home" onClick={onClose} className="block py-4 px-4 font-semibold dark:hover:bg-[#ffffff]/3 hover:bg-[#111111]/10 transition-all border-b border-b-blue-400">{t("header.menu.home")}</a></li>
        <li><a href="#about" onClick={onClose} className="block py-2 px-4 font-semibold dark:hover:bg-[#ffffff]/3 hover:bg-[#111111]/10 transition-all border-b border-b-blue-400">{t("header.menu.about")}</a></li>
        <li><a href="#stack" onClick={onClose} className="block py-2 px-4 font-semibold dark:hover:bg-[#ffffff]/3 hover:bg-[#111111]/10 transition-all border-b border-b-blue-400">{t("header.menu.skills")}</a></li>
        <li><a href="#projects" onClick={onClose} className="block py-2 px-4 font-semibold dark:hover:bg-[#ffffff]/3 hover:bg-[#111111]/10 transition-all border-b border-b-blue-400">{t("header.menu.projects")}</a></li>
        <li><a href="#contact" onClick={onClose} className="block py-2 px-4 font-semibold dark:hover:bg-[#ffffff]/3 hover:bg-[#111111]/10 transition-all border-b border-b-blue-400">{t("header.menu.contact")}</a></li>
      </ul>
    </motion.div>
  ), document.body);
}