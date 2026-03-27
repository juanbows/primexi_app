import { User } from 'lucide-react';
import { motion } from 'motion/react';
import logo from '@/assets/b0f62bc00bc3ad9bbabb668780d54a186060d759.png';

export function Header() {
  const logoSrc = typeof logo === 'string' ? logo : logo.src;

  return (
    <motion.header
      className="safe-top px-4 pt-4"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="glass-panel flex items-center justify-between rounded-3xl px-4 py-3">
        <div className="flex items-center gap-3">
          <img src={logoSrc} alt="PRIME XI" className="h-11 drop-shadow-[0_10px_20px_rgba(0,0,0,0.35)]" />
        </div>

        <motion.button
          type="button"
          className="flex h-11 w-11 items-center justify-center rounded-2xl border border-[#00ff85]/45 bg-gradient-to-br from-[#00ff85] via-[#77ffd2] to-[#04f5ff] shadow-[0_12px_28px_-18px_rgba(4,245,255,0.9)]"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.94 }}
        >
          <User className="h-5 w-5 text-[#1f0030]" />
        </motion.button>
      </div>
    </motion.header>
  );
}
