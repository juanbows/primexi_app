# 📚 Documentacion del Repo PRIME XI

Este repo contiene la vision y la UI mobile-first de PRIME XI. La app principal vive en `PRIMEXI_UI_APP/` (Next.js). Los documentos de estrategia estan en `docs/` y la mision del proyecto en `ANTIGRAVITY.md`.

## Estructura

- `ANTIGRAVITY.md`: mision, rol del asistente y objetivos del producto.
- `README.md`: vision general y enlaces de documentacion.
- `docs/`: guias internas.
- `PRIMEXI_UI_APP/`: app Next.js (UI).

### UI (Next.js)

- `PRIMEXI_UI_APP/src/pages/index.tsx`: entry de la web. Renderiza `App`.
- `PRIMEXI_UI_APP/src/app/App.tsx`: layout principal y navegacion por tabs.
- `PRIMEXI_UI_APP/src/app/components/`: componentes de home, equipo, perfil y utilidades UI.
- `PRIMEXI_UI_APP/src/app/transfers/TransfersPage.tsx`: pantalla de traspasos.
- `PRIMEXI_UI_APP/src/pages/api/fpl/next-deadline.ts`: endpoint serverless para el proximo cierre de Gameweek.
- `PRIMEXI_UI_APP/src/styles/`: estilos globales (Tailwind y CSS base).

## Arranque local (UI)

Desde `PRIMEXI_UI_APP/`:

```bash
npm i
npm run dev
```

Build:

```bash
npm run build
```

## Flujo de pantallas actual

La UI actual usa una navegacion tipo “tab bar” en `App.tsx`:

- `inicio`: dashboard (home).
- `equipo`: formacion.
- `traspasos`: pagina de transfers.
- `perfil`: resumen de manager.

## API local

- `GET /api/fpl/next-deadline`
  - Fuente: API oficial de FPL (`bootstrap-static`).
  - Respuesta: `gameweek` y `deadlineTime`.
  - Cache: `s-maxage=300`.

## Convenciones clave

- Mobile-first en layout, tipografia y navegacion.
- Targets tactiles >= 44px.
- Fondos oscuros con acentos neon para contraste.

