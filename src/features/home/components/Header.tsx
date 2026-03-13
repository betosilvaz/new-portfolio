import { createPortal } from "react-dom";
import { Terminal, Sun, Moon } from 'lucide-react';
import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import useTheme from "@/hooks/useTheme";

function Header() {
  const { theme, toggleTheme } = useTheme();

  return createPortal((
    <header className="z-999 w-[95%] sm:w-4/5 flex justify-between items-center p-4 rounded-lg left-1/2 -translate-x-1/2 fixed top-3 dark:bg-[#111111]/70 backdrop-blur-md border dark:border-white/10 border-[#111111]/10 dark:text-white">
      {/* 1. Icone */}
      <motion.div 
        whileHover={{ scale: 1.3 }}
        whileTap={{ scale: 1 }}
      >
        <Link to="/">
          <Terminal color={theme === "dark" ? "white" : "black"} size={30}/>
        </Link>
      </motion.div>
      {/* 2. links */}
      <nav className="mix-blend-hard-light">
        <ul className="flex gap-10">
          <NavLink to="#home" label="Inicio"/>
          <NavLink to="#about" label="Sobre"/>
          <NavLink to="#stack" label="Tecnologias"/>
          <NavLink to="#project" label="Projetos"/>
          <NavLink to="#contact" label="Contato"/>
        </ul>
      </nav>
      {/* 3. botões */}
      <div className="">
        <motion.button
          key={theme}
          onClick={toggleTheme}
          initial={{ rotate: -90 }}
          animate={{ rotate: 20 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          transition={{ duration: 2, type: "spring", stiffness: 400, damping: 17 }}
          className="p-2 rounded-full bg-black/10 dark:bg-white/10"
        >
          {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
        </motion.button>
      </div>
    </header>
  ), document.body);
}

function NavLink({ to, label }: { to: string, label: string }) {
  return (
    <li>
      <a href={to} className="mix-blend-difference py-2 rounded-lg px-4 font-semibold dark:hover:bg-[#ffffff]/3 hover:bg-[#111111]/10 transition-all">
        { label }
      </a>
    </li>
  );
}

export default Header;