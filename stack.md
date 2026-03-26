# Stack y Plan de Arquitectura Backend (Next.js + Supabase)

## 1) Contexto consolidado (repo + PDF)

Este plan toma como base:
- Documentación del repo (`README.md`, `esquema.md`, `modelo-negocio/*`).
- Frontend actual en `frontend/primexi-ui-app` (Next.js 14, mobile-first).
- Guía `otros/guia-backend-vis2 1.pdf` (VIS2-2026I):
  - Arquitectura de 3 capas (Frontend -> API Routes -> Supabase).
  - Flujo terminal-first (CLI + Vercel + Supabase).
  - Desarrollo incremental endpoint por endpoint.

## 2) Decisiones de arquitectura

### 2.1 Arquitectura objetivo

```text
[Mobile Frontend - Next.js]
        |
        v
[Backend BFF - API Routes Next.js]
        |
        v
[Supabase Postgres + Auth + RLS]
```

### 2.2 Decisiones técnicas clave

- Mantener **Next.js 14 Pages Router** para no romper la app actual.
- Implementar backend en `src/pages/api/v1/*` (consistente con endpoint existente).
- Usar **Supabase** como única capa de datos (sin servidor adicional).
- Separar clientes Supabase por contexto:
  - `supabasePublic` (anon key) para frontend.
  - `supabaseAdmin` (service role) solo en API Routes.
- Exponer contratos JSON estables para mobile-first (payloads pequeños, caché).

### 2.3 Estructura backend propuesta

```text
frontend/primexi-ui-app/
  src/
    lib/
      supabase.ts
      api-response.ts
      validators/
    pages/
      api/
        v1/
          health.ts
          gameweeks/
            current.ts
            [id]/summary.ts
          dashboard/
            home.ts
            top-players.ts
            revelation.ts
            news.ts
          squad/
            current.ts
            [managerId].ts
            [managerId]/stats.ts
            players/[playerId].ts
          transfers/
            recommendations.ts
            candidates.ts
            simulate.ts
            commit.ts
            history.ts
          profile/
            overview.ts
            ranking.ts
```

## 3) Diseño por dominios (alineado a tus tabs)

## 3.1 Inicio (`inicio`)

Objetivo: alimentar dashboard móvil (countdown, resumen GW, top players, revelation, news).

Endpoints:
- `GET /api/v1/gameweeks/current`
- `GET /api/v1/gameweeks/:id/summary`
- `GET /api/v1/dashboard/top-players?gameweek=XX`
- `GET /api/v1/dashboard/revelation?gameweek=XX`
- `GET /api/v1/dashboard/news?limit=10`

Tablas base sugeridas:
- `gameweeks`, `fixtures`, `players`, `player_gameweek_stats`, `news_items`.

## 3.2 Equipo (`equipo`)

Objetivo: servir once ideal/equipo actual, métricas y detalle de jugador.

Endpoints:
- `GET /api/v1/squad/current?managerId=...`
- `GET /api/v1/squad/:managerId/stats`
- `GET /api/v1/squad/players/:playerId?gameweek=XX`

Tablas base sugeridas:
- `managers`, `squads`, `squad_players`, `players`, `player_metrics`.

## 3.3 Traspasos (`traspasos`)

Objetivo: recomendar cambios, simular impacto xP y ejecutar transfer.

Endpoints:
- `GET /api/v1/transfers/recommendations?managerId=...&gameweek=...`
- `GET /api/v1/transfers/candidates?managerId=...`
- `POST /api/v1/transfers/simulate`
- `POST /api/v1/transfers/commit`
- `GET /api/v1/transfers/history?managerId=...&limit=20`

Tablas base sugeridas:
- `transfer_recommendations`, `transfer_simulations`, `transfers`, `manager_budgets`.

## 3.4 Perfil (`perfil`)

Objetivo: ranking, puntos, capitán vigente e histórico resumido.

Endpoints:
- `GET /api/v1/profile/overview?managerId=...`
- `GET /api/v1/profile/ranking?managerId=...`
- `GET /api/v1/transfers/history?managerId=...`

Tablas base sugeridas:
- `manager_profiles`, `manager_rankings`, `manager_gameweek_points`.

## 4) Contratos, seguridad y operación

### 4.1 Convención de respuesta API

- `200/201`: `{ data, meta? }`
- `4xx/5xx`: `{ error: { code, message, details? } }`

### 4.2 Variables de entorno (Vercel + local)

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`

Reglas:
- `SUPABASE_SERVICE_ROLE_KEY` solo en backend.
- `.env.local` fuera de git.

### 4.3 Seguridad

- RLS en tablas con datos de manager.
- Validación estricta de body/query en cada endpoint.
- Rate-limit básico en endpoints sensibles (`simulate`, `commit`).
- No exponer SQL errors crudos al cliente.

### 4.4 Performance y límites Vercel

- Objetivo por endpoint: < 700ms p95 (lectura), < 1200ms p95 (simulación).
- Timeouts < 10s por función (plan gratuito Vercel).
- Caching HTTP en lecturas (`s-maxage`, `stale-while-revalidate`).

## 5) Plan de implementación por fases

### Fase 0 - Fundaciones (1 sprint)
- Crear `src/lib/supabase.ts` con clientes público/admin.
- Crear utilidades de respuestas y manejo de errores.
- Crear `GET /api/v1/health`.
- Configurar variables en Vercel y `.env.local`.

### Fase 1 - Lecturas críticas (1 sprint)
- `gameweeks/current`, `dashboard/top-players`, `dashboard/news`.
- `squad/current`, `squad/:managerId/stats`.
- Sustituir datos mock del Home/Equipo por fetch real.

### Fase 2 - Traspasos (1 sprint)
- `transfers/candidates`, `transfers/recommendations`, `transfers/simulate`.
- Conectar `TransfersPage` a datos reales.

### Fase 3 - Escrituras controladas (1 sprint)
- `transfers/commit` + registro histórico.
- Reglas de consistencia (presupuesto, cupos, posiciones).

### Fase 4 - Perfil y cierre (1 sprint)
- `profile/overview`, `profile/ranking`, `transfers/history`.
- Hardening: errores, métricas, observabilidad y documentación final.

## 6) Criterios de aceptación

- Al menos 1 endpoint funcional por cada tab (`inicio`, `equipo`, `traspasos`, `perfil`).
- Frontend sin datos quemados en módulos principales.
- Deploy estable en Vercel (`preview` + `prod`).
- Seguridad básica activa (RLS + service key solo en server).
- `curl` exitoso para endpoints críticos en local y producción.

## 7) Checklist operativo (terminal-first)

```bash
# Entorno
vercel --version
vercel whoami
node --version
npm --version

# Variables
vercel env add NEXT_PUBLIC_SUPABASE_URL
vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY
vercel env add SUPABASE_SERVICE_ROLE_KEY
vercel env pull .env.local
vercel env ls

# Seguridad
grep ".env.local" .gitignore

# Desarrollo
npm install @supabase/supabase-js
npm run dev
curl http://localhost:3000/api/v1/health

# Deploy
vercel
vercel --prod
```

## 8) Nota de compatibilidad con tu estado actual

- Ya existe `src/pages/api/fpl/next-deadline.ts`; se conserva y se migra gradualmente a `v1`.
- Tu frontend actual usa mock data en varios componentes; el orden de fases prioriza reemplazarlo sin romper UX mobile-first.
- Si más adelante migras a App Router completo, esta arquitectura se puede portar a `src/app/api/*/route.ts` sin cambiar dominios ni contratos.
