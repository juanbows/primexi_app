import { AnimatePresence, motion } from 'motion/react';
import { Newspaper, TrendingUp, Activity, Info, Sparkles } from 'lucide-react';
import { useState } from 'react';

type NewsItem = {
  id: number;
  type: 'injury' | 'form' | 'prediction' | 'confirmed';
  title: string;
  description: string;
  fullText: string;
  probability?: string;
  icon: React.ElementType;
  color: string;
  bgColor: string;
  borderColor: string;
};

const news: NewsItem[] = [
  {
    id: 1,
    type: 'prediction',
    title: 'De Bruyne - Alta Probabilidad de Jugar',
    description: 'IA predice 90% de probabilidad de titular',
    fullText:
      'El modelo combinó tendencia de minutos, carga de entreno y reportes del staff. Señales positivas en la semana elevan la probabilidad de titularidad. Riesgo principal: rotación tardía si el marcador es cómodo.',
    probability: '90%',
    icon: Activity,
    color: '#04f5ff',
    bgColor: 'from-[#04f5ff]/20 to-[#04f5ff]/5',
    borderColor: 'border-[#04f5ff]/40'
  },
  {
    id: 2,
    type: 'confirmed',
    title: 'Solanke Confirmado',
    description: '+135 managers lo ficharon en las últimas 24h',
    fullText:
      'Confirmado en el once inicial según reporte oficial. Opción sólida para capitanía diferencial: buen fixture y alta forma reciente. Se espera participación completa.',
    icon: TrendingUp,
    color: '#00ff85',
    bgColor: 'from-[#00ff85]/20 to-[#00ff85]/5',
    borderColor: 'border-[#00ff85]/40'
  },
  {
    id: 3,
    type: 'injury',
    title: 'Alerta: Salah Duda',
    description: 'Posible rotación según análisis del equipo',
    fullText:
      'Señales mixtas en entrenamientos y carga acumulada. El staff podría limitar minutos si el equipo toma ventaja temprano. Plan recomendado: preparar un sustituto directo en el banquillo.',
    icon: Info,
    color: '#e90052',
    bgColor: 'from-[#e90052]/20 to-[#e90052]/5',
    borderColor: 'border-[#e90052]/40'
  },
  {
    id: 4,
    type: 'form',
    title: 'Palmer en Racha',
    description: '4 goles en los últimos 3 partidos',
    fullText:
      'Está generando más tiros dentro del área y participa en acciones clave. El xG por 90 se disparó, y su rol a balón parado aumentó.',
    icon: Sparkles,
    color: '#04f5ff',
    bgColor: 'from-[#04f5ff]/20 to-[#04f5ff]/5',
    borderColor: 'border-[#04f5ff]/40'
  }
];

function NewsCard({
  item,
  index,
  isOpen,
  onToggle,
}: {
  item: NewsItem;
  index: number;
  isOpen: boolean;
  onToggle: () => void;
}) {
  const Icon = item.icon;
  
  return (
    <motion.button
      type="button"
      onClick={onToggle}
      className={`relative bg-gradient-to-br ${item.bgColor} rounded-2xl p-5 border-2 ${item.borderColor} backdrop-blur-sm overflow-hidden group cursor-pointer w-full text-left`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.7 + index * 0.1 }}
      whileHover={{ scale: 1.02, y: -3 }}
    >
      {/* Background glow effect */}
      <motion.div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background: `radial-gradient(circle at 50% 50%, ${item.color}15, transparent 70%)`
        }}
      />
      
      <div className="relative z-10 flex gap-4">
        {/* Icon */}
        <div 
          className="flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center shadow-lg"
          style={{ 
            backgroundColor: `${item.color}20`,
            border: `2px solid ${item.color}40`
          }}
        >
          <Icon 
            className="w-6 h-6" 
            style={{ color: item.color }}
          />
        </div>
        
        {/* Content */}
        <div className="flex-1 space-y-1">
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-bold text-white text-sm leading-tight">
              {item.title}
            </h3>
            {item.probability && (
              <motion.span 
                className="flex-shrink-0 px-2 py-1 rounded-lg text-xs font-bold"
                style={{ 
                  backgroundColor: `${item.color}30`,
                  color: item.color,
                  border: `1px solid ${item.color}60`
                }}
                animate={{
                  scale: [1, 1.05, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                {item.probability}
              </motion.span>
            )}
          </div>
          {!isOpen && (
            <p className="text-white/50 text-[11px]">
              Toca para leer la noticia completa
            </p>
          )}
        </div>
      </div>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            className="relative z-10 mt-4 space-y-2 text-white/80 text-xs leading-relaxed"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
          >
            <p className="text-white/70">{item.description}</p>
            <p>{item.fullText}</p>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Shimmer effect on hover */}
      <motion.div
        className="absolute inset-0 opacity-0 group-hover:opacity-20 pointer-events-none"
        animate={{
          backgroundPosition: ['0% 0%', '100% 100%'],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          repeatType: 'reverse'
        }}
        style={{
          background: `linear-gradient(45deg, transparent 40%, ${item.color} 50%, transparent 60%)`,
          backgroundSize: '200% 200%'
        }}
      />
    </motion.button>
  );
}

export function NewsIntelligence() {
  const [openId, setOpenId] = useState<number | null>(null);

  return (
    <motion.section
      className="space-y-4 pb-20"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.6 }}
    >
      <div className="flex items-center gap-2">
        <Newspaper className="w-6 h-6 text-[#04f5ff]" />
        <h2 className="text-xl font-bold text-white">Noticias Inteligentes</h2>
      </div>
      
      <p className="text-sm text-white/60">
        Actualizaciones en tiempo real impulsadas por IA
      </p>
      
      <div className="grid gap-3">
        {news.map((item, index) => (
          <NewsCard
            key={item.id}
            item={item}
            index={index}
            isOpen={openId === item.id}
            onToggle={() => setOpenId(openId === item.id ? null : item.id)}
          />
        ))}
      </div>
    </motion.section>
  );
}
