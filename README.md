# NIFT Design Portfolio

A MERN-stack portfolio site for showcasing fashion/textile design coursework — projects gallery, project detail pages, about, and contact, backed by a MongoDB-driven API.

## Structure

```
.
├── client/   React + Vite + Tailwind frontend (deploy to Vercel)
├── server/   Express + Mongoose API (deploy to Render)
└── render.yaml
```

## Prerequisites

- Node.js 18+
- A MongoDB database (e.g. free MongoDB Atlas cluster)

## Local development

1. Install dependencies from the repo root (npm workspaces):
   ```
   npm install
   ```
2. Copy env files and fill in real values:
   ```
   cp server/.env.example server/.env
   cp client/.env.example client/.env
   ```
   - `server/.env` — set `MONGODB_URI` to your Atlas connection string.
   - `client/.env` — optional for local development because Vite proxies `/api` to `http://localhost:5000`. Set `VITE_API_URL` only when the API is hosted on a different origin.
3. Seed the database with sample projects/profile content:
   ```
   npm run seed
   ```
4. Run both client and server together:
   ```
   npm run dev
   ```
   - Client: http://localhost:5173
   - Server/API: http://localhost:5000
   - If you start only the client, API requests will fail until the server is also running.

## Content

There is no admin UI — content lives directly in MongoDB. Edit `server/src/seed/data.js` and re-run `npm run seed` to reset content, or edit documents directly in Atlas/Compass for one-off changes.

## Deployment

### Backend (Render)

1. Push this repo to GitHub.
2. In Render, create a new **Web Service** from the repo, root directory `server` (or use the included `render.yaml` via "New Blueprint Instance").
3. Set environment variables: `MONGODB_URI`, `CLIENT_URL` (your deployed Vercel URL, e.g. `https://your-site.vercel.app`).
4. Build command: `npm install`, start command: `npm start`.

### Frontend (Vercel)

1. In Vercel, import the repo, set **Root Directory** to `client`.
2. Framework preset: Vite. Build command `npm run build`, output directory `dist` (Vercel auto-detects this).
3. Set environment variable `VITE_API_URL` to your deployed Render API URL, e.g. `https://your-api.onrender.com`.
4. Deploy.

After both are live, update the Render `CLIENT_URL` env var to match your final Vercel domain so CORS allows requests from the deployed frontend.
