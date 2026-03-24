import { describe, expect, it } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

type AuthenticatedUser = NonNullable<TrpcContext["user"]>;

function createAdminContext(): TrpcContext {
  const user: AuthenticatedUser = {
    id: 1,
    openId: "admin-user",
    email: "admin@example.com",
    name: "Admin User",
    loginMethod: "manus",
    role: "admin",
    createdAt: new Date(),
    updatedAt: new Date(),
    lastSignedIn: new Date(),
  };

  const ctx: TrpcContext = {
    user,
    req: {
      protocol: "https",
      headers: {},
    } as TrpcContext["req"],
    res: {
      clearCookie: () => {},
    } as TrpcContext["res"],
  };

  return ctx;
}

function createUserContext(): TrpcContext {
  const user: AuthenticatedUser = {
    id: 2,
    openId: "regular-user",
    email: "user@example.com",
    name: "Regular User",
    loginMethod: "manus",
    role: "user",
    createdAt: new Date(),
    updatedAt: new Date(),
    lastSignedIn: new Date(),
  };

  const ctx: TrpcContext = {
    user,
    req: {
      protocol: "https",
      headers: {},
    } as TrpcContext["req"],
    res: {
      clearCookie: () => {},
    } as TrpcContext["res"],
  };

  return ctx;
}

describe("products", () => {
  describe("listAll", () => {
    it("allows admin to list all products", async () => {
      const ctx = createAdminContext();
      const caller = appRouter.createCaller(ctx);

      const result = await caller.products.listAll();
      expect(Array.isArray(result)).toBe(true);
    });

    it("prevents non-admin from listing all products", async () => {
      const ctx = createUserContext();
      const caller = appRouter.createCaller(ctx);

      await expect(caller.products.listAll()).rejects.toThrow();
    });
  });

  describe("list", () => {
    it("allows public access to available products", async () => {
      const ctx: TrpcContext = {
        user: undefined,
        req: {
          protocol: "https",
          headers: {},
        } as TrpcContext["req"],
        res: {
          clearCookie: () => {},
        } as TrpcContext["res"],
      };
      const caller = appRouter.createCaller(ctx);

      const result = await caller.products.list();
      expect(Array.isArray(result)).toBe(true);
    });
  });

  describe("create", () => {
    it("allows admin to create products", async () => {
      const ctx = createAdminContext();
      const caller = appRouter.createCaller(ctx);

      const result = await caller.products.create({
        name: "Test Juice",
        description: "A test juice product",
        price: "5.50",
        category: "juice",
        imageUrl: "https://example.com/image.jpg",
        isAvailable: true,
      });

      expect(result.success).toBe(true);
      expect(typeof result.id).toBe("number");
    });

    it("prevents non-admin from creating products", async () => {
      const ctx = createUserContext();
      const caller = appRouter.createCaller(ctx);

      await expect(
        caller.products.create({
          name: "Test Juice",
          description: "A test juice product",
          price: "5.50",
          category: "juice",
          isAvailable: true,
        })
      ).rejects.toThrow();
    });
  });
});
