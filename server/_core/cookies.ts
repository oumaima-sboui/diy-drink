import type { Request } from 'express';

export function getSessionCookieOptions(req: Request) {
  const isProd = process.env.NODE_ENV === 'production';
  const isRailway = process.env.RAILWAY_ENVIRONMENT === 'production';

  console.log('🍪 Cookie config:', {
    isProd,
    isRailway,
    host: req.get('host'),
    origin: req.get('origin')
  });

  if (isProd || isRailway) {
    return {
      httpOnly: true,
      secure: true, // HTTPS obligatoire
      sameSite: 'none' as const, // Permettre cross-origin
      path: '/',
      domain: undefined // Ne pas spécifier de domaine
    };
  }

  // Développement local
  return {
    httpOnly: true,
    secure: false,
    sameSite: 'lax' as const,
    path: '/'
  };
}