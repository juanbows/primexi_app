# 📱 Estrategia Mobile-First: PRIME XI

Este documento define las reglas de oro para el desarrollo de PRIME XI, asegurando que cada línea de código priorice la experiencia en dispositivos móviles.

## 1. Ergonomía del Pulgar (The Thumb Zone)
- **Navegación:** Menú principal siempre accesible en la parte inferior (Tab Bar).
- **Acciones Críticas:** Botones de "Confirmar Traspaso" o "Cambiar Capitán" en la franja central-inferior.
- **Zonas de Peligro:** Evitar colocar elementos interactivos pequeños en las esquinas superiores.

## 2. Visualización Táctica (Vertical Pitch)
- El campo de fútbol no se verá horizontal como en TV, sino **vertical** como en un esquema táctico de smartphone.
- **Jugadores:** Cards verticales con foto, nombre y xP.
- **Interacción:** Al tocar un jugador, se despliega un "BottomSheet" (panel de abajo hacia arriba) con sus métricas.

## 3. Optimización de Performance Móvil
- **Lazy Loading:** Imágenes de jugadores y logos de equipos se cargan solo cuando son visibles.
- **Bundle Size:** Minimizar librerías externas pesadas.
- **Skeleton Screens:** Mostrar placeholders de carga para dar sensación de velocidad instantánea.

## 4. Estética en Pantallas Pequeñas
- **Tipografía Fluida:** Usar `clamp()` en CSS para que los títulos se ajusten perfectamente al ancho de pantalla.
- **Contraste:** Asegurar que el verde neón sea legible sobre el Midnight Navy en exteriores (alta luminosidad).
- **Densidad de Información:** Menos es más. Usar menús desplegables (accordions) para detalles técnicos que no sean críticos para el 11 inicial.

## 5. Checklist de Desarrollo
1.  **¿Se ve bien en un iPhone SE / Google Pixel 5?** (Nuestro baseline).
2.  **¿Puedo realizar la acción principal con una sola mano?**
3.  **¿La animación es fluida en una red 4G?**
4.  **¿El touch target es de al menos 44px?**
