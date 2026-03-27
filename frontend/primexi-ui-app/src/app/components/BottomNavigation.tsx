import { motion } from 'motion/react';
import { Home, Users, ArrowLeftRight, User } from 'lucide-react';

export type BottomNavId = 'inicio' | 'equipo' | 'traspasos' | 'perfil';

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
  { id: 'perfil', icon: User, label: 'Perfil' },
];

export function BottomNavigation({ activeTab, onChange }: BottomNavigationProps) {
  return (
    <div className="fixed inset-x-0 bottom-0 z-50 px-4 pb-[calc(0.75rem+env(safe-area-inset-bottom))] pt-2">
      <motion.nav
        className="glass-panel mx-auto max-w-md rounded-3xl border-[#00ff85]/25 px-2 py-2"
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <div className="mx-auto flex items-center justify-around">
          {navItems.map((item, index) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;

            return (
              <motion.button
                key={item.id}
                onClick={() => onChange(item.id)}
                className="relative flex min-w-[72px] flex-col items-center gap-1 rounded-2xl px-3 py-2.5 transition-all"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                whileTap={{ scale: 0.9 }}
              >
                {isActive && (
                  <motion.div
                    className="absolute inset-0 rounded-2xl border border-[#00ff85]/40 bg-gradient-to-br from-[#00ff85]/28 to-[#04f5ff]/20"
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
                    isActive ? 'text-[#c9ffe9]' : 'text-white/55'
                  }`}
                >
                  {item.label}
                </span>
              </motion.button>
            );
          })}
        </div>
      </motion.nav>
    </div>
  );
}
