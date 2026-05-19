import { defineRelations } from "drizzle-orm"
import { createTable } from "./utils/table.js"

// ═══════════════ AUTH TABLES ═══════════════

export const users = createTable("users", t => ({
  id: t.text("id").primaryKey(),
  name: t.text("name").notNull(),
  email: t.text("email").notNull().unique(),
  emailVerified: t.boolean("email_verified").default(false).notNull(),
  image: t.text("image"),
  createdAt: t.timestamp("created_at").notNull().defaultNow(),
  updatedAt: t.timestamp("updated_at").notNull().defaultNow(),
}))

export const sessions = createTable("sessions", t => ({
  id: t.text("id").primaryKey(),
  token: t.text("token").notNull().unique(),
  userId: t.text("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  expiresAt: t.timestamp("expires_at").notNull(),
  ipAddress: t.text("ip_address"),
  userAgent: t.text("user_agent"),
  createdAt: t.timestamp("created_at").notNull().defaultNow(),
  updatedAt: t.timestamp("updated_at").notNull().defaultNow(),
}))

export const accounts = createTable("accounts", t => ({
  id: t.text("id").primaryKey(),
  accountId: t.text("account_id").notNull(),
  providerId: t.text("provider_id").notNull(),
  userId: t.text("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  accessToken: t.text("access_token"),
  refreshToken: t.text("refresh_token"),
  password: t.text("password"),
  createdAt: t.timestamp("created_at").notNull().defaultNow(),
  updatedAt: t.timestamp("updated_at").notNull().defaultNow(),
}))

export const verifications = createTable("verifications", t => ({
  id: t.text("id").primaryKey(),
  identifier: t.text("identifier").notNull(),
  value: t.text("value").notNull(),
  expiresAt: t.timestamp("expires_at").notNull(),
  createdAt: t.timestamp("created_at").notNull().defaultNow(),
  updatedAt: t.timestamp("updated_at").notNull().defaultNow(),
}))

// ═══════════════ MODULE TABLES ═══════════════

export const farmers = createTable("farmers", t => ({
  id: t.serial("id").primaryKey(),
  fullName: t.text("full_name").notNull(),
  barangay: t.text("barangay").notNull(),
  farmSize: t.doublePrecision("farm_size").notNull(),
  contactNumber: t.text("contact_number"),
  registrationDate: t.timestamp("registration_date").notNull(),
  farmingType: t.text("farming_type").notNull(),
  isActive: t.boolean("is_active").default(false).notNull(),
  status: t.text("status").notNull().default("active"),
  authorId: t.text("author_id").references(() => users.id, { onDelete: "set null" }),
  createdAt: t.timestamp("created_at").notNull().defaultNow(),
  updatedAt: t.timestamp("updated_at").notNull().defaultNow(),
}))

export const crops = createTable("crops", t => ({
  id: t.serial("id").primaryKey(),
  cropName: t.text("crop_name").notNull(),
  variety: t.text("variety").notNull(),
  plantingDate: t.timestamp("planting_date").notNull(),
  harvestDate: t.timestamp("harvest_date"),
  areaPlanted: t.doublePrecision("area_planted").notNull(),
  farmerName: t.text("farmer_name").notNull(),
  estimatedYield: t.doublePrecision("estimated_yield"),
  status: t.text("status").notNull().default("active"),
  authorId: t.text("author_id").references(() => users.id, { onDelete: "set null" }),
  createdAt: t.timestamp("created_at").notNull().defaultNow(),
  updatedAt: t.timestamp("updated_at").notNull().defaultNow(),
}))

export const programs = createTable("programs", t => ({
  id: t.serial("id").primaryKey(),
  programName: t.text("program_name").notNull(),
  description: t.text("description").notNull(),
  startDate: t.timestamp("start_date").notNull(),
  endDate: t.timestamp("end_date").notNull(),
  budget: t.doublePrecision("budget").notNull(),
  beneficiariesCount: t.integer("beneficiaries_count"),
  status: t.text("status").notNull(),
  status: t.text("status").notNull().default("active"),
  authorId: t.text("author_id").references(() => users.id, { onDelete: "set null" }),
  createdAt: t.timestamp("created_at").notNull().defaultNow(),
  updatedAt: t.timestamp("updated_at").notNull().defaultNow(),
}))

export const landparcels = createTable("landparcels", t => ({
  id: t.serial("id").primaryKey(),
  parcelId: t.text("parcel_id").notNull(),
  ownerName: t.text("owner_name").notNull(),
  location: t.text("location").notNull(),
  area: t.doublePrecision("area").notNull(),
  soilType: t.text("soil_type"),
  irrigationType: t.text("irrigation_type"),
  titleNumber: t.text("title_number"),
  status: t.text("status").notNull().default("active"),
  authorId: t.text("author_id").references(() => users.id, { onDelete: "set null" }),
  createdAt: t.timestamp("created_at").notNull().defaultNow(),
  updatedAt: t.timestamp("updated_at").notNull().defaultNow(),
}))

export const dataprivacys = createTable("dataprivacys", t => ({
  id: t.serial("id").primaryKey(),
  requestType: t.text("request_type").notNull(),
  dataSubject: t.text("data_subject").notNull(),
  requestDetails: t.text("request_details").notNull(),
  filedDate: t.timestamp("filed_date").notNull(),
  status: t.text("status").notNull(),
  resolvedDate: t.timestamp("resolved_date"),
  consentGiven: t.boolean("consent_given").default(false).notNull(),
  privacyOfficer: t.text("privacy_officer").notNull(),
  status: t.text("status").notNull().default("active"),
  authorId: t.text("author_id").references(() => users.id, { onDelete: "set null" }),
  createdAt: t.timestamp("created_at").notNull().defaultNow(),
  updatedAt: t.timestamp("updated_at").notNull().defaultNow(),
}))

// ═══════════════ RELATIONS ═══════════════

export const relations = defineRelations({ users, sessions, accounts, farmers, crops, programs, landparcels, dataprivacys }, r => ({
  users: {
    sessions: r.many.sessions(),
    accounts: r.many.accounts(),
  },
  sessions: {
    user: r.one.users({ from: r.sessions.userId, to: r.users.id }),
  },
  accounts: {
    user: r.one.users({ from: r.accounts.userId, to: r.users.id }),
  },
  farmers: {
    author: r.one.users({ from: r.farmers.authorId, to: r.users.id }),
  },
  crops: {
    author: r.one.users({ from: r.crops.authorId, to: r.users.id }),
  },
  programs: {
    author: r.one.users({ from: r.programs.authorId, to: r.users.id }),
  },
  landparcels: {
    author: r.one.users({ from: r.landparcels.authorId, to: r.users.id }),
  },
  dataprivacys: {
    author: r.one.users({ from: r.dataprivacys.authorId, to: r.users.id }),
  },
}))

export const schema = Object.assign({ users, sessions, accounts, verifications, farmers, crops, programs, landparcels, dataprivacys }, relations)
