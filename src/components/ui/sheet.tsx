"use client";

import * as React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

const Sheet = DialogPrimitive.Root;
const SheetTrigger = DialogPrimitive.Trigger;
const SheetClose = DialogPrimitive.Close;

function SheetContent({
  children,
  className,
  open,
}: {
  children: React.ReactNode;
  className?: string;
  open: boolean;
}) {
  return (
    <AnimatePresence>
      {open && (
        <DialogPrimitive.Portal forceMount>
          <DialogPrimitive.Overlay asChild forceMount>
            <motion.div
              className="fixed inset-0 z-[150] bg-ink/40 backdrop-blur-[2px]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            />
          </DialogPrimitive.Overlay>
          <DialogPrimitive.Content asChild forceMount>
            <motion.div
              className={cn(
                "fixed inset-y-0 right-0 z-[160] flex h-full w-full max-w-sm flex-col bg-paper p-8 shadow-2xl focus:outline-none",
                className
              )}
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              <DialogPrimitive.Title className="sr-only">
                Site navigation
              </DialogPrimitive.Title>
              <DialogPrimitive.Description className="sr-only">
                Jump to any room on the MahiiWay map
              </DialogPrimitive.Description>
              <SheetClose className="absolute right-6 top-6 rounded-full p-2 text-ink transition-colors hover:bg-ink/5 focus-visible:outline-none">
                <X className="h-5 w-5" />
                <span className="sr-only">Close menu</span>
              </SheetClose>
              {children}
            </motion.div>
          </DialogPrimitive.Content>
        </DialogPrimitive.Portal>
      )}
    </AnimatePresence>
  );
}

export { Sheet, SheetTrigger, SheetContent, SheetClose };
