import React from 'react';
import { useCart } from '../../context/CartContext';
import { CheckCircle2, Info, AlertTriangle, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const ToastContainer: React.FC = () => {
  const { toasts } = useCart();

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3 max-w-sm w-full pointer-events-none">
      <AnimatePresence>
        {toasts.map(toast => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            className={`pointer-events-auto flex items-center gap-3 p-4 rounded-xl shadow-xl border backdrop-blur-md transition-colors ${
              toast.type === 'success'
                ? 'bg-[#FFF8F0]/95 dark:bg-[#201815]/95 border-[#D4AF37]/40 text-[#5D4037] dark:text-[#F3E5AB]'
                : toast.type === 'warning'
                ? 'bg-amber-50 dark:bg-amber-950/80 border-amber-300 dark:border-amber-700 text-amber-900 dark:text-amber-200'
                : 'bg-stone-50 dark:bg-stone-900/90 border-stone-300 dark:border-stone-700 text-stone-800 dark:text-stone-200'
            }`}
          >
            {toast.type === 'success' && <CheckCircle2 className="w-5 h-5 text-[#D4AF37] shrink-0" />}
            {toast.type === 'warning' && <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0" />}
            {toast.type === 'info' && <Info className="w-5 h-5 text-amber-600 shrink-0" />}
            <span className="text-sm font-medium flex-1">{toast.message}</span>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};
