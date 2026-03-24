import type { CreateExpressContextOptions } from "@trpc/server/adapters/express";
import type { User } from "../../drizzle/schema";
import { COOKIE_NAME } from "@shared/const";
import jwt from "jsonwebtoken";
import * as db from "../db";

export type TrpcContext = {
  req: CreateExpressContextOptions["req"];
  res: CreateExpressContextOptions["res"];
  user: User | null;
};
export async function createContext(
  opts: CreateExpressContextOptions
): Promise<TrpcContext> {
  let user: User | null = null;

  try {
    console.log("=== CONTEXT DEBUG ===");
    console.log("Cookies reçus:", opts.req.cookies);
    
    // Récupérer le cookie de session
    const sessionToken = opts.req.cookies?.[COOKIE_NAME];
    console.log("Session token trouvé:", sessionToken ? "OUI" : "NON");
    
    if (sessionToken) {
      console.log("Début décodage JWT...");
      
      // Décoder le JWT
      const { ENV } = await import("./env");
      const decoded = jwt.verify(
        sessionToken,
        ENV.jwtSecret || "votre-secret-temporaire-a-changer"
      ) as { openId: string; email: string; role: string };

      console.log("JWT décodé:", decoded);

      // Charger l'utilisateur depuis la base de données
      if (decoded.openId) {
        console.log("Recherche par openId:", decoded.openId);
        user = await db.getUserByOpenId(decoded.openId);
      } else if (decoded.email) {
        console.log("Recherche par email:", decoded.email);
        user = await db.getUserByEmail(decoded.email);
      }

      console.log("Utilisateur trouvé:", user ? `${user.name} (${user.role})` : "NON");
    }
    console.log("===================");
  } catch (error) {
    console.log("❌ ERREUR CONTEXTE:", error instanceof Error ? error.message : "Unknown");
    user = null;
  }

  return {
    req: opts.req,
    res: opts.res,
    user,
  };
}