import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer, decimal, timestamp, boolean, jsonb } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  email: text("email").notNull().unique(),
  displayName: text("display_name").notNull(),
  role: text("role").notNull().default("creator"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const creators = pgTable("creators", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull().references(() => users.id),
  channelName: text("channel_name").notNull(),
  totalRevenue: decimal("total_revenue", { precision: 10, scale: 2 }).default("0"),
  archiveValue: decimal("archive_value", { precision: 10, scale: 2 }).default("0"),
  wellnessScore: integer("wellness_score").default(85),
  activeBrandDeals: integer("active_brand_deals").default(0),
  biometricData: jsonb("biometric_data").$type<{
    heartRate?: number;
    stressLevel?: number;
    energyLevel?: number;
    lastUpdated?: string;
  }>(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const content = pgTable("content", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  creatorId: varchar("creator_id").notNull().references(() => creators.id),
  title: text("title").notNull(),
  description: text("description"),
  thumbnailUrl: text("thumbnail_url"),
  platform: text("platform").notNull(), // youtube, instagram, tiktok, etc
  platformId: text("platform_id"), // platform-specific video ID
  views: integer("views").default(0),
  publishedAt: timestamp("published_at"),
  isAiEnhanced: boolean("is_ai_enhanced").default(false),
  isTrending: boolean("is_trending").default(false),
  contentType: text("content_type").notNull(), // video, short, podcast, etc
  duration: integer("duration"), // in seconds
  metadata: jsonb("metadata").$type<{
    tags?: string[];
    category?: string;
    monetization?: {
      revenue?: number;
      sponsorships?: string[];
    };
  }>(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const oraclePredictions = pgTable("oracle_predictions", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  creatorId: varchar("creator_id").notNull().references(() => creators.id),
  predictionType: text("prediction_type").notNull(), // blue_ocean, trend_alert, market_simulation
  title: text("title").notNull(),
  description: text("description").notNull(),
  confidence: integer("confidence").notNull(), // 0-100
  projectedViews: integer("projected_views"),
  projectedRevenue: decimal("projected_revenue", { precision: 10, scale: 2 }),
  growthPercentage: integer("growth_percentage"),
  isUrgent: boolean("is_urgent").default(false),
  metadata: jsonb("metadata").$type<{
    keywords?: string[];
    competition?: string;
    timeline?: string;
    marketData?: any;
  }>(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const brandDeals = pgTable("brand_deals", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  creatorId: varchar("creator_id").notNull().references(() => creators.id),
  brandName: text("brand_name").notNull(),
  dealValue: decimal("deal_value", { precision: 10, scale: 2 }).notNull(),
  description: text("description").notNull(),
  status: text("status").notNull().default("pending"), // pending, accepted, declined, completed
  matchScore: integer("match_score").notNull(), // 0-100
  deliverables: jsonb("deliverables").$type<{
    contentType?: string;
    deadline?: string;
    requirements?: string[];
  }>(),
  aiVettingResults: jsonb("ai_vetting_results").$type<{
    brandFitScore?: number;
    riskFlags?: string[];
    recommendations?: string[];
  }>(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const ipViolations = pgTable("ip_violations", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  creatorId: varchar("creator_id").notNull().references(() => creators.id),
  originalContentId: varchar("original_content_id").references(() => content.id),
  violationPlatform: text("violation_platform").notNull(),
  violatorChannel: text("violator_channel").notNull(),
  violationUrl: text("violation_url").notNull(),
  status: text("status").notNull().default("detected"), // detected, claimed, resolved
  potentialRevenue: decimal("potential_revenue", { precision: 10, scale: 2 }),
  detectedAt: timestamp("detected_at").defaultNow(),
});

export const wellnessMetrics = pgTable("wellness_metrics", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  creatorId: varchar("creator_id").notNull().references(() => creators.id),
  date: timestamp("date").notNull(),
  creativeEnergy: integer("creative_energy").notNull(), // 0-100
  productivityScore: integer("productivity_score").notNull(), // 0-100
  stressLevel: integer("stress_level").notNull(), // 0-100
  hoursWorked: decimal("hours_worked", { precision: 4, scale: 2 }),
  breaksTaken: integer("breaks_taken").default(0),
  recommendedBreakTime: timestamp("recommended_break_time"),
  isEnforcedDowntime: boolean("is_enforced_downtime").default(false),
});

export const analytics = pgTable("analytics", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  creatorId: varchar("creator_id").notNull().references(() => creators.id),
  contentId: varchar("content_id").references(() => content.id),
  date: timestamp("date").notNull(),
  platform: text("platform").notNull(),
  views: integer("views").default(0),
  shares: integer("shares").default(0),
  comments: integer("comments").default(0),
  likes: integer("likes").default(0),
  websiteClicks: integer("website_clicks").default(0),
  conversionRate: decimal("conversion_rate", { precision: 5, scale: 2 }),
  revenue: decimal("revenue", { precision: 10, scale: 2 }).default("0"),
});

export const inspirationItems = pgTable("inspiration_items", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  title: text("title").notNull(),
  description: text("description").notNull(),
  imageUrl: text("image_url"),
  category: text("category").notNull(), // architecture, science, philosophy, art, etc
  tags: jsonb("tags").$type<string[]>(),
  source: text("source"),
  createdAt: timestamp("created_at").defaultNow(),
});

// Relations
export const usersRelations = relations(users, ({ one }) => ({
  creator: one(creators),
}));

export const creatorsRelations = relations(creators, ({ one, many }) => ({
  user: one(users, {
    fields: [creators.userId],
    references: [users.id],
  }),
  content: many(content),
  predictions: many(oraclePredictions),
  brandDeals: many(brandDeals),
  ipViolations: many(ipViolations),
  wellnessMetrics: many(wellnessMetrics),
  analytics: many(analytics),
}));

export const contentRelations = relations(content, ({ one, many }) => ({
  creator: one(creators, {
    fields: [content.creatorId],
    references: [creators.id],
  }),
  ipViolations: many(ipViolations),
  analytics: many(analytics),
}));

export const oraclePredictionsRelations = relations(oraclePredictions, ({ one }) => ({
  creator: one(creators, {
    fields: [oraclePredictions.creatorId],
    references: [creators.id],
  }),
}));

export const brandDealsRelations = relations(brandDeals, ({ one }) => ({
  creator: one(creators, {
    fields: [brandDeals.creatorId],
    references: [creators.id],
  }),
}));

export const ipViolationsRelations = relations(ipViolations, ({ one }) => ({
  creator: one(creators, {
    fields: [ipViolations.creatorId],
    references: [creators.id],
  }),
  originalContent: one(content, {
    fields: [ipViolations.originalContentId],
    references: [content.id],
  }),
}));

export const wellnessMetricsRelations = relations(wellnessMetrics, ({ one }) => ({
  creator: one(creators, {
    fields: [wellnessMetrics.creatorId],
    references: [creators.id],
  }),
}));

export const analyticsRelations = relations(analytics, ({ one }) => ({
  creator: one(creators, {
    fields: [analytics.creatorId],
    references: [creators.id],
  }),
  content: one(content, {
    fields: [analytics.contentId],
    references: [content.id],
  }),
}));

// Insert schemas
export const insertUserSchema = createInsertSchema(users).omit({
  id: true,
  createdAt: true,
});

export const insertCreatorSchema = createInsertSchema(creators).omit({
  id: true,
  createdAt: true,
});

export const insertContentSchema = createInsertSchema(content).omit({
  id: true,
  createdAt: true,
});

export const insertOraclePredictionSchema = createInsertSchema(oraclePredictions).omit({
  id: true,
  createdAt: true,
});

export const insertBrandDealSchema = createInsertSchema(brandDeals).omit({
  id: true,
  createdAt: true,
});

export const insertIpViolationSchema = createInsertSchema(ipViolations).omit({
  id: true,
});

export const insertWellnessMetricSchema = createInsertSchema(wellnessMetrics).omit({
  id: true,
});

export const insertAnalyticsSchema = createInsertSchema(analytics).omit({
  id: true,
});

export const insertInspirationItemSchema = createInsertSchema(inspirationItems).omit({
  id: true,
  createdAt: true,
});

// Types
export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;
export type Creator = typeof creators.$inferSelect;
export type InsertCreator = z.infer<typeof insertCreatorSchema>;
export type Content = typeof content.$inferSelect;
export type InsertContent = z.infer<typeof insertContentSchema>;
export type OraclePrediction = typeof oraclePredictions.$inferSelect;
export type InsertOraclePrediction = z.infer<typeof insertOraclePredictionSchema>;
export type BrandDeal = typeof brandDeals.$inferSelect;
export type InsertBrandDeal = z.infer<typeof insertBrandDealSchema>;
export type IpViolation = typeof ipViolations.$inferSelect;
export type InsertIpViolation = z.infer<typeof insertIpViolationSchema>;
export type WellnessMetric = typeof wellnessMetrics.$inferSelect;
export type InsertWellnessMetric = z.infer<typeof insertWellnessMetricSchema>;
export type Analytics = typeof analytics.$inferSelect;
export type InsertAnalytics = z.infer<typeof insertAnalyticsSchema>;
export type InspirationItem = typeof inspirationItems.$inferSelect;
export type InsertInspirationItem = z.infer<typeof insertInspirationItemSchema>;
