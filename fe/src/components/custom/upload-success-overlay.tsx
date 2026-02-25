import { motion, AnimatePresence } from "motion/react";

type UploadSuccessOverlayProps = {
  show: boolean;
};

export function UploadSuccessOverlay({ show }: UploadSuccessOverlayProps) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-white/10 dark:bg-black/10 backdrop-blur-2xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.div
            className="relative mx-4 flex max-w-sm flex-col items-center gap-6"
            initial={{ scale: 0.85, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 25,
            }}
          >
            {/* glow behind icon */}
            <div className="absolute -top-4 left-1/2 h-32 w-32 -translate-x-1/2 rounded-full bg-primary/15 blur-2xl" />

            <motion.div
              className="relative flex size-20 items-center justify-center rounded-full bg-linear-to-br from-primary/30 to-primary/10 ring-4 ring-primary/20"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{
                type: "spring",
                stiffness: 400,
                damping: 18,
                delay: 0.08,
              }}
            >
              <svg
                className="size-10 text-primary"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2.5}
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <motion.path
                  d="M5 13l4 4L19 7"
                  initial={{ pathLength: 0.001 }}
                  animate={{ pathLength: 1 }}
                  transition={{
                    duration: 0.5,
                    delay: 0.25,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                />
              </svg>
            </motion.div>

            <div className="flex flex-col items-center gap-2 text-center">
              <motion.h2
                className="text-foreground text-2xl font-bold tracking-tight"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.35 }}
              >
                Upload concluído
              </motion.h2>
              <motion.p
                className="text-muted-foreground max-w-[240px] text-sm leading-relaxed"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.55, duration: 0.35 }}
              >
                Seu arquivo foi enviado com sucesso e está seguro na nuvem.
              </motion.p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
