"use client";

import { useRouter } from "next/navigation";
import { useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

const panelVariants = {
  hidden:  { x: 60, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] as number[] },
  },
  exit: {
    x: 60,
    opacity: 0,
    transition: { duration: 0.3, ease: [0.55, 0, 1, 0.45] as number[] },
  },
};

const backdropVariants = {
  hidden:  { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.3 } },
  exit:    { opacity: 0, transition: { duration: 0.25 } },
};

interface OverlayShellProps {
  children: React.ReactNode;
}

export default function OverlayShell({ children }: OverlayShellProps) {
  const router = useRouter();

  const close = useCallback(() => router.back(), [router]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [close]);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  return (
    <AnimatePresence mode="wait">
      <div key="overlay-root" className="overlay-root">
        {/* Backdrop */}
        <motion.div
          key="overlay-backdrop"
          className="overlay-backdrop"
          variants={backdropVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          onClick={close}
          aria-hidden="true"
        />

        {/* Panel */}
        <motion.div
          key="overlay-panel"
          className="overlay-panel"
          variants={panelVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          role="dialog"
          aria-modal="true"
        >
          {children}
        </motion.div>
      </div>

      <style>{`
        .overlay-root {
          position: fixed;
          inset: 0;
          z-index: 100;
          display: flex;
          align-items: stretch;
          justify-content: flex-end;
        }
        .overlay-backdrop {
          position: absolute;
          inset: 0;
          background-color: rgba(0, 0, 0, 0.55);
          backdrop-filter: blur(4px);
          -webkit-backdrop-filter: blur(4px);
          cursor: pointer;
        }
        .overlay-panel {
          position: relative;
          z-index: 1;
          width: 100%;
          max-width: 780px;
          height: 100%;
          background-color: var(--light);
          overflow-y: auto;
          overflow-x: hidden;
          display: flex;
          flex-direction: column;
          box-shadow: -8px 0 40px rgba(0, 0, 0, 0.35);
        }
        .overlay-panel::-webkit-scrollbar { width: 5px; }
        .overlay-panel::-webkit-scrollbar-track { background: var(--light-2); }
        .overlay-panel::-webkit-scrollbar-thumb { background: var(--light-3); border-radius: 9999px; }
        @media (max-width: 640px) {
          .overlay-panel { max-width: 100%; }
        }
      `}</style>
    </AnimatePresence>
  );
}