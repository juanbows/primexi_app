import { useState } from 'react';
import {
  Bell,
  ImagePlus,
  LogOut,
  Mail,
  Moon,
  Sun,
  UserRound,
} from 'lucide-react';
import { ProfilePageLayout } from '../../app/components/profile/ProfilePageLayout';
import { ProfileCard } from '../../app/components/profile/ProfileCard';

export default function ProfileSettingsPage() {
  const [teamName, setTeamName] = useState('Midnight XI FC');
  const [notifications, setNotifications] = useState(true);
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const email = 'nicolas@primexi.app';

  return (
    <ProfilePageLayout
      title="Configuracion de perfil"
      subtitle="Ajustes y preferencias de cuenta"
    >
      <ProfileCard accent="purple" title="Equipo">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-[#00ff85] via-[#7c3aed] to-[#00d4ff] p-[2px]">
              <div className="flex h-full w-full items-center justify-center rounded-2xl bg-[#140015] text-sm font-semibold">
                NN
              </div>
            </div>
            <button
              type="button"
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-[#140015] px-3 py-2 text-xs text-white/70"
            >
              <ImagePlus className="h-4 w-4" />
              Cambiar avatar
            </button>
          </div>
          <div>
            <label className="text-xs text-white/60">Nombre del equipo</label>
            <div className="mt-2 flex items-center gap-2 rounded-2xl border border-white/10 bg-[#140015] px-3 py-2">
              <UserRound className="h-4 w-4 text-white/50" />
              <input
                value={teamName}
                onChange={(event) => setTeamName(event.target.value)}
                className="w-full bg-transparent text-sm outline-none"
              />
            </div>
          </div>
        </div>
      </ProfileCard>

      <ProfileCard accent="green" title="Preferencias">
        <div className="space-y-3">
          <div className="flex items-center justify-between rounded-2xl border border-white/5 bg-[#140015] px-3 py-3">
            <div className="flex items-center gap-2 text-sm">
              <Bell className="h-4 w-4 text-[#00ff85]" />
              Notificaciones
            </div>
            <button
              type="button"
              onClick={() => setNotifications((prev) => !prev)}
              className={`rounded-full px-3 py-1 text-xs font-semibold ${
                notifications
                  ? 'bg-[#00ff85] text-[#0b0b0b]'
                  : 'bg-[#2b002c] text-white/60'
              }`}
            >
              {notifications ? 'ON' : 'OFF'}
            </button>
          </div>
          <div className="flex items-center justify-between rounded-2xl border border-white/5 bg-[#140015] px-3 py-3">
            <div className="flex items-center gap-2 text-sm">
              {theme === 'dark' ? (
                <Moon className="h-4 w-4 text-[#7c3aed]" />
              ) : (
                <Sun className="h-4 w-4 text-[#facc15]" />
              )}
              Tema
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setTheme('dark')}
                className={`rounded-full px-3 py-1 text-xs font-semibold ${
                  theme === 'dark'
                    ? 'bg-[#7c3aed] text-white'
                    : 'bg-[#2b002c] text-white/60'
                }`}
              >
                Dark
              </button>
              <button
                type="button"
                onClick={() => setTheme('light')}
                className={`rounded-full px-3 py-1 text-xs font-semibold ${
                  theme === 'light'
                    ? 'bg-[#facc15] text-[#0b0b0b]'
                    : 'bg-[#2b002c] text-white/60'
                }`}
              >
                Light
              </button>
            </div>
          </div>
        </div>
      </ProfileCard>

      <ProfileCard accent="pink" title="Cuenta">
        <div className="space-y-3">
          <div className="flex items-center justify-between rounded-2xl border border-white/5 bg-[#140015] px-3 py-3 text-sm">
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-white/50" />
              {email}
            </div>
            <span className="rounded-full bg-[#7c3aed]/20 px-2 py-1 text-xs text-[#d9b7ff]">
              Verificado
            </span>
          </div>
          <button
            type="button"
            className="flex w-full items-center justify-between rounded-2xl border border-[#ff5a7a]/40 bg-[#ff5a7a]/10 px-3 py-3 text-sm text-[#ff5a7a]"
          >
            Cerrar sesion
            <LogOut className="h-4 w-4" />
          </button>
        </div>
      </ProfileCard>
    </ProfilePageLayout>
  );
}
