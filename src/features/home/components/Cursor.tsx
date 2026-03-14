import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useState, createContext, useContext, type ReactNode } from "react";

type Variant = "default" | "clicking" | "hidden";

interface ContextReturn {
  variant: Variant,
  setVariant: (value: Variant) => void,
}

// ─── Context ──────────────────────────────────────────────────────────────────
const CursorContext = createContext<ContextReturn>({
  variant: "default", 
  setVariant: () => {},
});

export function CursorProvider({ children }: { children: ReactNode }) {
  const [variant, setVariant] = useState<Variant>("default");

  return (
    <CursorContext.Provider value={{ variant, setVariant }}>
      { children }
    </CursorContext.Provider>
  );
}

export const useCursor = () => useContext(CursorContext);

// ─── Cursor Component ─────────────────────────────────────────────────────────
export function FramerCursor() {
  const { variant, setVariant } = useCursor();

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Dot — segue instantaneamente
  const dotX = useSpring(mouseX, { stiffness: 1000, damping: 50 });
  const dotY = useSpring(mouseY, { stiffness: 1000, damping: 50 });

  // Ring — segue com leve atraso (característica do framer.com)
  const ringX = useSpring(mouseX, { stiffness: 150, damping: 20 });
  const ringY = useSpring(mouseY, { stiffness: 150, damping: 20 });

  useEffect(() => {
    const move = (e: any) => { mouseX.set(e.clientX); mouseY.set(e.clientY); };
    const down = () => setVariant("clicking");
    const up = () => setVariant("default");

    window.addEventListener("mousemove", move);
    window.addEventListener("mousedown", down);
    window.addEventListener("mouseup", up);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mousedown", down);
      window.removeEventListener("mouseup", up);
    };
  }, []);

  const variants = {
    default: {
      width: 12,
      height: 12,
      backgroundColor: "#fff",
      mixBlendMode: "difference",
      opacity: 1,
    },
    clicking: {
      width: 8,
      height: 8,
      backgroundColor: "#fff",
      mixBlendMode: "difference",
      opacity: 1,
    },
    hidden: {
      opacity: 0,
    },
  };

  return (
    <>
      <style>{`
        * { cursor: none !important; }
      `}</style>

      {/* Ring (anel externo com lag) */}
      <motion.div
        style={{
          x: ringX,
          y: ringY,
          translateX: "-50%",
          translateY: "-50%",
          position: "fixed",
          top: 0,
          left: 0,
          pointerEvents: "none",
          zIndex: 99999,
          borderRadius: "50%",
          border: "1.5px solid rgba(255,255,255,0.5)",
          width: 36,
          height: 36,
          mixBlendMode: "difference",
        }}
        animate={
          variant === "clicking"
            ? { width: 28, height: 28 }
            : variant === "hidden"
              ? { opacity: 0 }
              : { width: 36, height: 36, opacity: 1 }
        }
        transition={{ type: "spring", stiffness: 200, damping: 22 }}
      />

      {/* Dot central */}
      <motion.div
        style={{
          x: dotX,
          y: dotY,
          translateX: "-50%",
          translateY: "-50%",
          position: "fixed",
          top: 0,
          left: 0,
          pointerEvents: "none",
          zIndex: 99999,
          borderRadius: "50%",
          width: 28,
          height: 28,
        }}
        animate={variants[variant] || variants.default}
        transition={{ type: "spring", stiffness: 400, damping: 28 }}
      >
      </motion.div>
    </>
  );
}