# FPL API - Guia Practica para PRIME XI

Ultima verificacion: **2026-03-27**.

## 1) Contexto rapido

La Fantasy Premier League expone endpoints JSON bajo:

- `https://fantasy.premierleague.com/api/`

No existe una documentacion oficial consolidada tipo OpenAPI/Swagger publica.  
Por eso esta guia se basa en validacion directa contra endpoints reales.

## 2) Publico vs autenticado

### Endpoints publicos (acceso anonimo)

Responden `200` sin sesion:

- `/bootstrap-static/`
- `/fixtures/` (y con filtro `?event=<gw>`)
- `/event/<gw>/live/`
- `/event-status/`
- `/element-summary/<player_id>/`
- `/entry/<entry_id>/`
- `/entry/<entry_id>/history/`
- `/entry/<entry_id>/event/<gw>/picks/`
- `/entry/<entry_id>/transfers/`
- `/leagues-classic/<league_id>/standings/?page_standings=<n>`
- `/dream-team/<gw>/`
- `/me/` (sin login devuelve `{"player":null,"watched":[]}`)

### Endpoints privados (requieren autenticacion)

- `/my-team/<entry_id>/` responde `403` sin credenciales.

## 3) Endpoints clave para PRIME XI

### A. Bootstrap global

- `GET /bootstrap-static/`
- Uso: catalogo maestro (jugadores, equipos, gameweeks, reglas, stats base).
- Estructura top-level verificada:
  - `chips`, `events`, `game_settings`, `game_config`, `phases`, `teams`,
  - `total_players`, `element_stats`, `element_types`, `elements`

Ejemplo:

```bash
curl -sS https://fantasy.premierleague.com/api/bootstrap-static/
```

### B. Fixtures

- `GET /fixtures/`
- `GET /fixtures/?event=<gw>`
- Uso: calendario y resultado por partido.
- Campos relevantes por fixture:
  - `id`, `event`, `kickoff_time`, `team_h`, `team_a`, `team_h_score`, `team_a_score`,
  - `finished`, `started`, `stats`, `team_h_difficulty`, `team_a_difficulty`

### C. Live por Gameweek

- `GET /event/<gw>/live/`
- Uso: puntos/eventos por jugador en tiempo real o casi real.
- Estructura:
  - top-level: `elements`
  - cada elemento: `id`, `stats`, `explain`, `modified`

### D. Resumen de jugador

- `GET /element-summary/<player_id>/`
- Uso: historial detallado de un jugador + proximos fixtures.
- Estructura:
  - `fixtures`: proximos/relacionados al jugador
  - `history`: detalle por partido (xG, xA, puntos, minutos, etc.)
  - `history_past`: historico por temporada

### E. Datos de manager (publicos)

- `GET /entry/<entry_id>/`
- `GET /entry/<entry_id>/history/`
- `GET /entry/<entry_id>/event/<gw>/picks/`
- `GET /entry/<entry_id>/transfers/`

Uso:

- Perfil general del manager, ranking y liga.
- Rendimiento por GW.
- XI elegido por GW.
- Historial de transferencias.

### F. Ligas y estado global

- `GET /leagues-classic/<league_id>/standings/?page_standings=<n>`
- `GET /event-status/`
- `GET /dream-team/<gw>/`

Uso:

- Tabla de liga clasica con paginacion.
- Estado de procesamiento de puntos/bonos.
- Dream team de la jornada.

## 4) Recomendaciones de backend para este repo

### 4.1 Endpoints internos sugeridos (server-side)

Exponer en Next API (o backend dedicado) rutas internas con cache:

- `/api/fpl/bootstrap`
- `/api/fpl/fixtures?gw=<n>`
- `/api/fpl/live?gw=<n>`
- `/api/fpl/player/<id>`
- `/api/fpl/entry/<id>/summary`

### 4.2 Politica de cache sugerida

- `bootstrap-static`: 1h a 6h
- `fixtures`: 5m a 15m
- `event/<gw>/live`: 30s a 2m (depende de consumo)
- `element-summary/<id>`: 5m a 30m
- `entry/*`: 1m a 10m

### 4.3 Normalizacion recomendada

Crear modelos internos para no acoplar la UI al payload crudo:

- `FplPlayer`
- `FplFixture`
- `FplGameweek`
- `FplEntrySummary`

### 4.4 Errores a contemplar

- `403` en endpoints privados sin cookies/sesion.
- `404` en IDs invalidos o rutas no soportadas.
- Campos opcionales `null` en pre-partido (`team_h_score`, `team_a_score`, etc.).

## 5) Notas de integracion en PRIME XI

Ya existe en el repo:

- `GET /api/fpl/next-deadline` en `PRIMEXI_UI_APP/src/pages/api/fpl/next-deadline.ts`.

Siguiente evolucion recomendada:

1. Crear un cliente `fplClient` reutilizable con timeouts/retry.
2. Centralizar tipos TypeScript de FPL en un modulo (`src/lib/fpl/types.ts`).
3. Reemplazar mocks de `TopPlayers`, `TeamFormation` y `NewsIntelligence` por datos normalizados.

## 6) Fuentes verificadas

Fuentes oficiales (endpoints reales):

- https://fantasy.premierleague.com/api/bootstrap-static/
- https://fantasy.premierleague.com/api/fixtures/
- https://fantasy.premierleague.com/api/event/1/live/
- https://fantasy.premierleague.com/api/element-summary/1/
- https://fantasy.premierleague.com/api/entry/1/
- https://fantasy.premierleague.com/api/entry/1/history/
- https://fantasy.premierleague.com/api/entry/1/event/1/picks/
- https://fantasy.premierleague.com/api/entry/1/transfers/
- https://fantasy.premierleague.com/api/leagues-classic/314/standings/?page_standings=1
- https://fantasy.premierleague.com/api/event-status/
- https://fantasy.premierleague.com/api/dream-team/1/
- https://fantasy.premierleague.com/api/me/
- https://fantasy.premierleague.com/api/my-team/1/
