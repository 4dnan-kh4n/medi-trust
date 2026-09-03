# mediTrust

Doctor discovery with structured profiles, admin operations, correction reporting, verification workflows, and non-diagnostic AI speciality guidance.

## Local development

1. Create `server/.env` from `server/.env.example` and set a local MongoDB URI, JWT secret, and admin credentials. Add `OPENAI_API_KEY` only when testing AI guidance.
2. Start the API: `cd server; npm run start`
3. Start the frontend: `npm run dev`
4. Open the Vite URL, normally `http://localhost:5174`.

## Production architecture

| Service | Responsibility |
| --- | --- |
| MongoDB Atlas | Managed database with a restricted user and production network rules. |
| API container | Express API, authentication, uploads, admin actions, and server-only AI calls. |
| Frontend container/static host | Vite production build with SPA route fallback. |
| Cloudinary | Durable doctor-photo storage. |

## Production variables

Set these only in your host’s encrypted environment settings. Never commit them.

```env
NODE_ENV=production
PORT=5000
CLIENT_URL=https://www.example.com
MONGODB_URI=mongodb+srv://...
JWT_SECRET=a-long-random-secret-of-at-least-32-characters
INITIAL_ADMIN_EMAIL=admin@example.com
INITIAL_ADMIN_PASSWORD=use-a-strong-unique-password
OPENAI_API_KEY=optional-server-only-key
OPENAI_GUIDANCE_MODEL=gpt-5.4-mini
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=server-only-api-key
CLOUDINARY_API_SECRET=server-only-api-secret
```

The frontend build needs `VITE_API_URL=https://api.example.com/api`. It must never contain a secret.

## Containers

```sh
docker build -t meditrust-api ./server
docker run --env-file ./server/.env -p 5000:5000 meditrust-api

docker build --build-arg VITE_API_URL=https://api.example.com/api -t meditrust-web .
docker run -p 8080:80 meditrust-web
```

The included Nginx config serves `index.html` for client routes such as `/doctors/bhopal/cardiologist`.

## Render deployment

This repository includes `render.yaml`, which creates:

- `meditrust-api`: a Docker web service that stores doctor photos in Cloudinary.
- `meditrust-web`: a static Vite site with SPA route rewrites.

In Render, create a new Blueprint from this repository and provide the requested secret values. Use the MongoDB Atlas production URI for `MONGODB_URI`, a strong unique value for `INITIAL_ADMIN_PASSWORD`, the server-only OpenAI key for `OPENAI_API_KEY` if AI guidance should be enabled, and the three server-only Cloudinary values for doctor-photo storage.

After Render assigns the public addresses, set `VITE_API_URL` to `https://YOUR-API.onrender.com/api` and `CLIENT_URL` to `https://YOUR-WEB.onrender.com`, then redeploy both services. Use the exact custom-domain URLs instead when you add them later.

The initial API deployment creates the configured admin account once. Do not run the fictional-data seed in production.

## Production checklist

- [ ] Create MongoDB Atlas with a least-privilege database user and production network access rules.
- [ ] Configure API secrets, then confirm `GET /api/health` returns `database: "connected"`.
- [ ] Set `CLIENT_URL` to the exact HTTPS frontend domain; CORS and secure admin cookies rely on it.
- [ ] Build the frontend with the final `VITE_API_URL`.
- [ ] Configure Cloudinary image storage and upload a doctor photo from the admin area.
- [ ] Configure HTTPS and DNS for the frontend domain and API subdomain.
- [ ] Verify admin sign-in, uploads, correction reports, verification, AI guidance, clean routes, and `/sitemap.xml`.
- [ ] Keep database credentials, JWT secret, admin password, and OpenAI key out of Git, logs, and frontend variables.
- [ ] Before releasing run `npm run lint`, `npm run build`, and `cd server && npm run check:models`.
