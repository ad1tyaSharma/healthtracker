# Health Tracker Backend

Minimal Spring Boot backend for the Health Tracker frontend.

Run with Maven:

```bash
cd backend
# If you have Maven installed
mvn spring-boot:run

# Recommended: generate Maven wrapper locally (one-time) so others can run without installing Maven:
# mvn -N io.takari:maven:wrapper
# then use:
# ./mvnw spring-boot:run  (linux/mac)
# mvnw.cmd spring-boot:run (windows)
```

API endpoints (default http://localhost:8080):
- GET /api/members
- GET /api/members/{id}
- POST /api/members
- DELETE /api/members/{id}

Auth endpoints:
- POST /api/auth/signup  { email, password, name }
- POST /api/auth/login   { email, password }
- POST /api/auth/forgot-password { email }
- POST /api/auth/reset-password  { token, password }
- GET  /api/auth/verify?token=...

CORS is enabled for http://localhost:3000 — change if your Vite server uses a different port.

Notes:
- Update `src/main/resources/application.properties` with your MySQL credentials and a secure `app.jwt.secret` value (32+ random chars).
- OAuth2 Google login is scaffolded; set client id/secret in properties and configure the redirect in Google Cloud Console to `http://localhost:8080/login/oauth2/code/google` and also set the frontend redirect to `/auth/callback` if using the default handler.

CORS is enabled for http://localhost:3000 — change if your Vite server uses a different port.
