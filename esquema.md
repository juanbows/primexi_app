# Esquema de Arquitectura PRIME XI

Este repositorio se reorganizo con enfoque mobile-first y separacion por dominio de trabajo.

## Estructura objetivo

```text
/
├─ esquema.md
├─ README.md
├─ branding/
├─ modelo-negocio/
├─ frontend/
├─ flujos-usuario/
└─ otros/
```

## Distribucion por dominio

- `branding/`: identidad visual (logos, paleta, tipografias y lineamientos).
- `modelo-negocio/`: mision del producto, propuesta de valor y roadmap estrategico.
- `frontend/`: implementacion tecnica de la aplicacion y su interfaz.
- `flujos-usuario/`: estrategia UX, journeys, wireframes y flujos de interaccion.
- `otros/`: historicos, respaldos y material que no encaja directamente en las secciones principales.

## Frontend activo

La aplicacion principal vive en `frontend/primexi-ui-app/` (Next.js, pages router).

- `frontend/primexi-ui-app/src/pages/index.tsx`: entrypoint de la app.
- `frontend/primexi-ui-app/src/app/App.tsx`: layout principal mobile-first.
- `frontend/primexi-ui-app/src/app/components/`: componentes de UI y modulos funcionales.
- `frontend/primexi-ui-app/src/pages/api/fpl/next-deadline.ts`: endpoint para proximo deadline FPL.
- `frontend/primexi-ui-app/src/styles/`: estilos globales, tema y tipografias.

## Diagrama de capas (alto nivel)

```text
[Modelo de negocio]
        |
        v
[Flujos de usuario] ---> [Branding]
        |                    |
        v                    v
            [Frontend]
                |
                v
          [API FPL / Supabase]
```

## Convenciones operativas

- Nombres nuevos en `kebab-case` cuando es viable.
- Conservacion de archivos originales sin eliminacion de contenido.
- Material redundante o ambiguo almacenado en `otros/` para trazabilidad.
