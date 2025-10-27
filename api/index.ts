import express, { type Request, Response, NextFunction } from "express";
import session from "express-session";
import ConnectPgSimple from "connect-pg-simple";
import { registerRoutes } from "../server/routes";

// Initialize Express app at module scope (runs once on cold start)
const app = express();

// Trust proxy for secure cookies when behind Vercel's reverse proxy
app.set('trust proxy', 1);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// PostgreSQL session store for Vercel
const PgStore = ConnectPgSimple(session);

app.use(session({
  secret: process.env.SESSION_SECRET || 'your-strong-secret-key-change-in-production',
  store: new PgStore({
    conString: process.env.DATABASE_URL,
    createTableIfMissing: true,
  }),
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000, // 24 hours
    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
  }
}));

// Initialize routes at module scope
const routesPromise = (async () => {
  try {
    const server = await registerRoutes(app);
    
    // Error handling middleware must be registered AFTER routes
    app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
      const status = err.status || err.statusCode || 500;
      const message = err.message || "Internal Server Error";
      res.status(status).json({ message });
    });
    
    return server;
  } catch (error) {
    console.error('Failed to initialize routes:', error);
    throw error;
  }
})();

// Export for Vercel serverless
export default async function handler(req: any, res: any) {
  // Wait for routes to be registered (only happens once)
  await routesPromise;
  return app(req, res);
}
