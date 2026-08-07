import {
  pgTable,
  text,
  timestamp,
  boolean,
  integer,
  numeric,
  pgEnum,
  uuid,
} from "drizzle-orm/pg-core";

/* ────────────────────────────────────────────────────────────
 * Better Auth tables
 * Shape required by the Better Auth Drizzle adapter. If you run
 * `npm run auth:generate` later, keep these in sync.
 * ──────────────────────────────────────────────────────────── */

export const user = pgTable("user", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  emailVerified: boolean("email_verified")
    .$defaultFn(() => false)
    .notNull(),
  image: text("image"),
  // Custom column: gates who may reach the admin portal.
  role: text("role").default("viewer").notNull(),
  createdAt: timestamp("created_at")
    .$defaultFn(() => new Date())
    .notNull(),
  updatedAt: timestamp("updated_at")
    .$defaultFn(() => new Date())
    .notNull(),
});

export const session = pgTable("session", {
  id: text("id").primaryKey(),
  expiresAt: timestamp("expires_at").notNull(),
  token: text("token").notNull().unique(),
  createdAt: timestamp("created_at").notNull(),
  updatedAt: timestamp("updated_at").notNull(),
  ipAddress: text("ip_address"),
  userAgent: text("user_agent"),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
});

export const account = pgTable("account", {
  id: text("id").primaryKey(),
  accountId: text("account_id").notNull(),
  providerId: text("provider_id").notNull(),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  accessToken: text("access_token"),
  refreshToken: text("refresh_token"),
  idToken: text("id_token"),
  accessTokenExpiresAt: timestamp("access_token_expires_at"),
  refreshTokenExpiresAt: timestamp("refresh_token_expires_at"),
  scope: text("scope"),
  password: text("password"),
  createdAt: timestamp("created_at").notNull(),
  updatedAt: timestamp("updated_at").notNull(),
});

export const verification = pgTable("verification", {
  id: text("id").primaryKey(),
  identifier: text("identifier").notNull(),
  value: text("value").notNull(),
  expiresAt: timestamp("expires_at").notNull(),
  createdAt: timestamp("created_at").$defaultFn(() => new Date()),
  updatedAt: timestamp("updated_at").$defaultFn(() => new Date()),
});

/* ────────────────────────────────────────────────────────────
 * Domain tables (CTR content)
 * ──────────────────────────────────────────────────────────── */

export const driverCategory = pgEnum("driver_category", ["IRL", "F4"]);

export const articles = pgTable("articles", {
  id: uuid("id").primaryKey().defaultRandom(),
  title: text("title").notNull(),
  slug: text("slug").notNull().unique(),
  content: text("content").notNull(),
  excerpt: text("excerpt"),
  coverImageUrl: text("cover_image_url"),
  published: boolean("published").default(false).notNull(),
  authorId: text("author_id").references(() => user.id, {
    onDelete: "set null",
  }),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const drivers = pgTable("drivers", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
  carNumber: integer("car_number").notNull(),
  category: driverCategory("category").notNull(),
  bio: text("bio"),
  headshotUrl: text("headshot_url"),
  active: boolean("active").default(true).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// One row per machine/car. Race schedule dates live in raceEvents.
export const machineSpecs = pgTable("machine_specs", {
  id: uuid("id").primaryKey().defaultRandom(),
  carName: text("car_name").notNull(),
  horsepower: integer("horsepower"),
  topSpeedKph: integer("top_speed_kph"),
  weightKg: integer("weight_kg"),
  engine: text("engine"),
  gltfModelUrl: text("gltf_model_url"), // 3D .glb/.gltf asset
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const raceEvents = pgTable("race_events", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
  circuit: text("circuit"),
  category: driverCategory("category"),
  raceDate: timestamp("race_date").notNull(),
  resultSummary: text("result_summary"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Central record of every asset pushed through Uploadthing.
export const media = pgTable("media", {
  id: uuid("id").primaryKey().defaultRandom(),
  key: text("key").notNull().unique(), // Uploadthing file key
  url: text("url").notNull(),
  name: text("name").notNull(),
  type: text("type").notNull(), // "image" | "model"
  sizeBytes: integer("size_bytes"),
  uploadedBy: text("uploaded_by").references(() => user.id, {
    onDelete: "set null",
  }),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

/* Inferred types for use across server actions & components */
export type Article = typeof articles.$inferSelect;
export type NewArticle = typeof articles.$inferInsert;
export type Driver = typeof drivers.$inferSelect;
export type NewDriver = typeof drivers.$inferInsert;
export type MachineSpec = typeof machineSpecs.$inferSelect;
export type RaceEvent = typeof raceEvents.$inferSelect;
export type Media = typeof media.$inferSelect;
