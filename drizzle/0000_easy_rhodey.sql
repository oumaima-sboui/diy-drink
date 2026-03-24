CREATE TABLE `categories` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`description` text,
	`imageUrl` text,
	`displayOrder` integer DEFAULT 0,
	`isActive` integer DEFAULT true NOT NULL,
	`createdAt` integer DEFAULT (unixepoch()) NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `categories_name_unique` ON `categories` (`name`);--> statement-breakpoint
CREATE TABLE `ingredients` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`unit` text NOT NULL,
	`stockQuantity` real DEFAULT 0 NOT NULL,
	`minStockLevel` real DEFAULT 10 NOT NULL,
	`maxStockLevel` real,
	`costPerUnit` real NOT NULL,
	`supplier` text,
	`createdAt` integer DEFAULT (unixepoch()) NOT NULL,
	`updatedAt` integer DEFAULT (unixepoch()) NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `ingredients_name_unique` ON `ingredients` (`name`);--> statement-breakpoint
CREATE TABLE `inventoryLogs` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`ingredientId` integer NOT NULL,
	`changeAmount` real NOT NULL,
	`previousQuantity` real NOT NULL,
	`newQuantity` real NOT NULL,
	`reason` text NOT NULL,
	`orderId` integer,
	`userId` integer,
	`notes` text,
	`createdAt` integer DEFAULT (unixepoch()) NOT NULL,
	FOREIGN KEY (`ingredientId`) REFERENCES `ingredients`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`orderId`) REFERENCES `orders`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `orderItems` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`orderId` integer NOT NULL,
	`productId` integer NOT NULL,
	`productName` text NOT NULL,
	`quantity` integer NOT NULL,
	`unitPrice` real NOT NULL,
	`subtotal` real NOT NULL,
	`specialInstructions` text,
	`createdAt` integer DEFAULT (unixepoch()) NOT NULL,
	FOREIGN KEY (`orderId`) REFERENCES `orders`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`productId`) REFERENCES `products`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `orders` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`orderNumber` text NOT NULL,
	`clientId` integer,
	`clientName` text,
	`clientPhone` text,
	`status` text DEFAULT 'pending_payment' NOT NULL,
	`totalAmount` real NOT NULL,
	`notes` text,
	`assignedTo` integer,
	`preparationStartedAt` integer,
	`readyAt` integer,
	`completedAt` integer,
	`createdAt` integer DEFAULT (unixepoch()) NOT NULL,
	`updatedAt` integer DEFAULT (unixepoch()) NOT NULL,
	FOREIGN KEY (`clientId`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`assignedTo`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE UNIQUE INDEX `orders_orderNumber_unique` ON `orders` (`orderNumber`);--> statement-breakpoint
CREATE TABLE `payments` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`orderId` integer NOT NULL,
	`amount` real NOT NULL,
	`paymentMethod` text NOT NULL,
	`status` text DEFAULT 'pending' NOT NULL,
	`transactionId` text,
	`stripePaymentIntentId` text,
	`paypalOrderId` text,
	`paidAt` integer,
	`refundedAt` integer,
	`failureReason` text,
	`metadata` text,
	`createdAt` integer DEFAULT (unixepoch()) NOT NULL,
	`updatedAt` integer DEFAULT (unixepoch()) NOT NULL,
	FOREIGN KEY (`orderId`) REFERENCES `orders`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `products` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`description` text,
	`price` real NOT NULL,
	`categoryId` integer NOT NULL,
	`imageUrl` text,
	`preparationTime` integer DEFAULT 5,
	`isAvailable` integer DEFAULT true NOT NULL,
	`isFeatured` integer DEFAULT false,
	`displayOrder` integer DEFAULT 0,
	`createdAt` integer DEFAULT (unixepoch()) NOT NULL,
	`updatedAt` integer DEFAULT (unixepoch()) NOT NULL,
	FOREIGN KEY (`categoryId`) REFERENCES `categories`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `recipes` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`productId` integer NOT NULL,
	`ingredientId` integer NOT NULL,
	`quantity` real NOT NULL,
	`createdAt` integer DEFAULT (unixepoch()) NOT NULL,
	FOREIGN KEY (`productId`) REFERENCES `products`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`ingredientId`) REFERENCES `ingredients`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`openId` text,
	`name` text NOT NULL,
	`email` text NOT NULL,
	`password` text,
	`phone` text,
	`loginMethod` text DEFAULT 'email' NOT NULL,
	`role` text DEFAULT 'client' NOT NULL,
	`isActive` integer DEFAULT true NOT NULL,
	`createdAt` integer DEFAULT (unixepoch()) NOT NULL,
	`updatedAt` integer DEFAULT (unixepoch()) NOT NULL,
	`lastSignedIn` integer
);
--> statement-breakpoint
CREATE UNIQUE INDEX `users_openId_unique` ON `users` (`openId`);--> statement-breakpoint
CREATE UNIQUE INDEX `users_email_unique` ON `users` (`email`);