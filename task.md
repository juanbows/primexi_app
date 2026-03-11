# Roadmap de Desarrollo: PRIME XI (Mobile Edition) 📱

Este documento detalla las tareas actuales enfocadas en el desarrollo **Mobile-First**.

## 🚀 Fase 1: Arquitectura & UX Base
- [ ] Configurar proyecto Next.js 14/15 con Tailwind CSS (Preferencia Mobile).
- [ ] Implementar la **Bottom Navigation Bar** (Inicio, Mi Equipo, Mercado, Perfil).
- [ ] Definir el sistema de colores "Midnight Precision" en `tailwind.config.js`.
- [ ] Crear el layout responsivo base con `max-width: mobile-size` para pruebas.

## ⚽ Fase 2: El Once Ideal (Pitch View Mobile)
- [ ] Crear el componente **PitchViewVertical** (Campo de juego en vertical).
- [ ] Diseñar el **PlayerCardMobile** (Simplificado para pantallas pequeñas).
- [ ] Implementar **BottomSheet UX** para ver detalles de jugadores al hacer tap.
- [ ] Integrar indicadores de Capitán (C) y Vice-capitán (V) responsivos.

## 📊 Fase 3: Datos & IA (Backend Sync)
- [ ] Configurar cliente de **Supabase** para el nuevo proyecto.
- [ ] Adaptar scripts de ingesta de datos FPL para actualizaciones incrementales.
- [ ] Diseñar el motor de cálculo de xP (Expected Points) para la jornada actual.
- [ ] Endpoint de API para servir el "Once Ideal" optimizado.

## ✨ Fase 4: Micro-interacciones & Pulido
- [ ] Animaciones de transición suaves entre pestañas de navegación.
- [ ] Feedback visual al tocar jugadores (Ripple effects / Scale).
- [ ] Skeleton Loaders para las estadísticas de los jugadores.
- [ ] Optimización de imágenes (WebP) para carga rápida en redes móviles.

---
*Estado actual: Planeación y Contextualización completada por Bottby.*
