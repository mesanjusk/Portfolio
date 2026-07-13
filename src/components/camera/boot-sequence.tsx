"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Power } from "lucide-react";
import { Stickers } from "@/components/camera/stickers";

type BootPhase = "power" | "glitch" | "flash" | "reveal";

const NAME = "ALEX RIVER";

export function BootSequence({
  name = NAME,
  onDone,
}: {
  name?: string;
  onDone: () => void;
}) {
  const reduced = useReducedMotion();
  const [phase, setPhase] = useState<BootPhase>("power");
  const [typed, setTyped] = useState("");
  const doneRef = useRef(false);

  useEffect(() => {
    if (reduced) {
      onDone();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduced]);

  useEffect(() => {
    if (phase !== "reveal") return;
    let i = 0;
    const id = setInterval(() => {
      i += 1;
      setTyped(name.slice(0, i));
      if (i >= name.length) clearInterval(id);
    }, 55);
    return () => clearInterval(id);
  }, [phase, name]);

  useEffect(() => {
    if (phase !== "reveal" || doneRef.current) return;
    const t = setTimeout(() => {
      doneRef.current = true;
      onDone();
    }, 1500);
    return () => clearTimeout(t);
  }, [phase, onDone]);

  const powerOn = () => {
    if (phase !== "power") return;
    setPhase("glitch");
    setTimeout(() => setPhase("flash"), 420);
    setTimeout(() => setPhase("reveal"), 620);
  };

  if (reduced) return null;

  return (
    <motion.div
      role="button"
      tabIndex={0}
      aria-label="Power on"
      onClick={powerOn}
      onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && powerOn()}
      exit={{ opacity: 0, transition: { duration: 0.4 } }}
      className={`fixed inset-0 z-[400] flex cursor-pointer items-center justify-center overflow-hidden bg-black ${
        phase === "glitch" ? "cam-boot-glitch" : ""
      }`}
    >
      <div className="cam-grain" />

      {phase === "power" && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="relative z-10 flex flex-col items-center gap-4 text-white/80"
        >
          <motion.div
            animate={{ scale: [1, 1.08, 1], opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
            className="flex h-16 w-16 items-center justify-center rounded-full border border-white/30"
          >
            <Power size={26} />
          </motion.div>
          <p className="text-[11px] uppercase tracking-[0.35em] text-white/50">
            press to power on
          </p>
        </motion.div>
      )}

      {(phase === "glitch" || phase === "flash") && (
        <div className="relative z-10 font-mono text-xs uppercase tracking-[0.3em] text-white/40">
          booting camera OS…
        </div>
      )}

      {phase === "flash" && (
        <motion.div
          className="cam-flash"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 0] }}
          transition={{ duration: 0.32, times: [0, 0.4, 1] }}
        />
      )}

      {phase === "reveal" && (
        <div className="relative z-10 flex flex-col items-center gap-3 px-6 text-center">
          <Stickers variant="boot" />
          <motion.h1
            initial={{ filter: "blur(14px)", opacity: 0, letterSpacing: "0.5em" }}
            animate={{ filter: "blur(0px)", opacity: 1, letterSpacing: "0.08em" }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="font-mono text-3xl font-bold text-white sm:text-4xl"
          >
            <span className="cam-typewriter pr-1">{typed}</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="text-[11px] uppercase tracking-[0.35em] text-white/50"
          >
            developing your portfolio
          </motion.p>
        </div>
      )}
    </motion.div>
  );
}
