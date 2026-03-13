import { User } from 'lucide-react';
import { motion } from 'motion/react';
import logo from 'figma:asset/b0f62bc00bc3ad9bbabb668780d54a186060d759.png';

export function Header() {
  return (
    <motion.header 
      className="flex items-center justify-between p-4"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center gap-3">
        <img src={logo} alt="PRIME XI" className="h-12" />
      </div>
      
      <motion.div 
        className="w-12 h-12 rounded-full bg-gradient-to-br from-[#00ff85] to-[#04f5ff] flex items-center justify-center cursor-pointer"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <User className="w-6 h-6 text-[#38003c]" />
      </motion.div>
    </motion.header>
  );
}