
  # PRIMEXI UI

  This is a code bundle for PRIMEXI. The original project is available at https://www.figma.com/design/sV46yFwfkQyekvI2CU1xDG/PRIMEXI.

  ## Running the code

  Run `npm i` to install the dependencies.

  Run `npm run dev` to start the development server (Next.js).

  ## Build

  Run `npm run build` to generate the production build.

  ## Deploy (Vercel)

  This project is a Next.js app. In Vercel, use:
  - Framework: `Next.js`
  - Build Command: `next build`
  - Output Directory: `.next` (managed automatically by Vercel)
  - Root Directory: `PRIMEXI_UI_APP`

  CLI deploy (from `PRIMEXI_UI_APP/`):
  - `npx vercel --prod`

  ## Project structure

  - `src/pages/index.tsx`: entry point (renders `src/app/App.tsx`).
  - `src/app/App.tsx`: main mobile-first layout and tab navigation.
  - `src/app/components/`: reusable UI sections.
  - `src/app/transfers/TransfersPage.tsx`: transfers screen.
  - `src/pages/api/fpl/next-deadline.ts`: API route for next Gameweek deadline.
  - `src/styles/`: global styles and theme tokens.

  ## API

  - `GET /api/fpl/next-deadline`
    - Returns `gameweek` and `deadlineTime` from the FPL bootstrap endpoint.
    - Cached for 5 minutes via `s-maxage`.
  
