import { motion } from 'motion/react';
import { Home, Users, ArrowLeftRight, Trophy, User } from 'lucide-react';

export type BottomNavId = 'inicio' | 'equipo' | 'traspasos' | 'ligas' | 'perfil';

type NavItem = {
  id: BottomNavId;
  icon: React.ElementType;
  label: string;
};

type BottomNavigationProps = {
  activeTab: BottomNavId;
  onChange: (tab: BottomNavId) => void;
};

const navItems: NavItem[] = [
  { id: 'inicio', icon: Home, label: 'Inicio' },
  { id: 'equipo', icon: Users, label: 'Equipo' },
  { id: 'traspasos', icon: ArrowLeftRight, label: 'Traspasos' },
  { id: 'ligas', icon: Trophy, label: 'Ligas' },
  { id: 'perfil', icon: User, label: 'Perfil' },
];

export function BottomNavigation({ activeTab, onChange }: BottomNavigationProps) {
  return (
    <motion.nav
      className="fixed bottom-0 left-0 right-0 bg-[#38003c]/95 backdrop-blur-lg border-t border-[#00ff85]/20 px-2 py-3 z-50"
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <div className="max-w-md mx-auto flex items-center justify-around">
        {navItems.map((item, index) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;

          return (
            <motion.button
              key={item.id}
              onClick={() => onChange(item.id)}
              className="relative flex flex-col items-center gap-1 px-4 py-2 rounded-xl transition-all"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              whileTap={{ scale: 0.9 }}
            >
              {isActive && (
                <motion.div
                  className="absolute inset-0 bg-[#00ff85]/20 rounded-xl border border-[#00ff85]/40"
                  layoutId="activeTab"
                  transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                />
              )}

              <Icon
                className={`w-6 h-6 relative z-10 transition-colors ${
                  isActive ? 'text-[#00ff85]' : 'text-white/50'
                }`}
              />
              <span
                className={`text-xs font-medium relative z-10 transition-colors ${
                  isActive ? 'text-[#00ff85]' : 'text-white/50'
                }`}
              >
                {item.label}
              </span>
            </motion.button>
          );
        })}
      </div>
    </motion.nav>
  );
}
