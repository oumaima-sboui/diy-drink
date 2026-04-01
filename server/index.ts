import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import path from 'path';
import { fileURLToPath } from 'url';
import { createExpressMiddleware } from '@trpc/server/adapters/express';
import { appRouter } from './routers';
import { createContext } from './_core/context';
import { initDatabase } from './db';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

console.log('🚀 Démarrage du serveur...');
console.log('📍 NODE_ENV:', process.env.NODE_ENV);
console.log('📍 PORT:', PORT);

// Middleware
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? ['https://diy-drink-production.up.railway.app']
    : ['http://localhost:5000', 'http://localhost:5173'],
  credentials: true
}));

app.use(express.json());
app.use(cookieParser());

// Health check
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'Server is running',
    env: process.env.NODE_ENV,
    database: 'PostgreSQL'
  });
});

// tRPC API
app.use(
  '/api/trpc',
  createExpressMiddleware({
    router: appRouter,
    createContext,
  })
);

// Servir le frontend en production
if (process.env.NODE_ENV === 'production') {
  const distPath = path.join(__dirname, '../dist');
  console.log('📂 Serving static files from:', distPath);
  
  app.use(express.static(distPath));
  
  app.get('*', (req, res) => {
    res.sendFile(path.join(distPath, 'index.html'));
  });
}

// Initialiser la base de données puis démarrer le serveur
initDatabase().then(() => {
  app.listen(PORT, () => {
    console.log(`✅ Server running on port ${PORT}`);
    console.log(`🌐 Health check: http://localhost:${PORT}/api/health`);
  });
}).catch(error => {
  console.error('❌ Failed to start server:', error);
  process.exit(1);
});