import { 
  users, creators, content, oraclePredictions, brandDeals, ipViolations, 
  wellnessMetrics, analytics, inspirationItems,
  type User, type InsertUser, type Creator, type InsertCreator,
  type Content, type InsertContent, type OraclePrediction, type InsertOraclePrediction,
  type BrandDeal, type InsertBrandDeal, type IpViolation, type InsertIpViolation,
  type WellnessMetric, type InsertWellnessMetric, type Analytics, type InsertAnalytics,
  type InspirationItem, type InsertInspirationItem
} from "@shared/schema";
import { db } from "./db";
import { eq, desc, and, gte, lte, sql } from "drizzle-orm";

export interface IStorage {
  // User management
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;

  // Creator management
  getCreator(id: string): Promise<Creator | undefined>;
  getCreatorByUserId(userId: string): Promise<Creator | undefined>;
  createCreator(creator: InsertCreator): Promise<Creator>;
  updateCreator(id: string, updates: Partial<Creator>): Promise<Creator>;

  // Content management
  getContent(id: string): Promise<Content | undefined>;
  getContentByCreator(creatorId: string): Promise<Content[]>;
  createContent(content: InsertContent): Promise<Content>;
  updateContent(id: string, updates: Partial<Content>): Promise<Content>;

  // Oracle predictions
  getOraclePredictions(creatorId: string): Promise<OraclePrediction[]>;
  createOraclePrediction(prediction: InsertOraclePrediction): Promise<OraclePrediction>;

  // Brand deals
  getBrandDeals(creatorId: string): Promise<BrandDeal[]>;
  createBrandDeal(deal: InsertBrandDeal): Promise<BrandDeal>;
  updateBrandDeal(id: string, updates: Partial<BrandDeal>): Promise<BrandDeal>;

  // IP violations
  getIpViolations(creatorId: string): Promise<IpViolation[]>;
  createIpViolation(violation: InsertIpViolation): Promise<IpViolation>;
  updateIpViolation(id: string, updates: Partial<IpViolation>): Promise<IpViolation>;

  // Wellness metrics
  getWellnessMetrics(creatorId: string, startDate?: Date, endDate?: Date): Promise<WellnessMetric[]>;
  createWellnessMetric(metric: InsertWellnessMetric): Promise<WellnessMetric>;
  getLatestWellnessMetric(creatorId: string): Promise<WellnessMetric | undefined>;

  // Analytics
  getAnalytics(creatorId: string, startDate?: Date, endDate?: Date): Promise<Analytics[]>;
  createAnalytics(analytics: InsertAnalytics): Promise<Analytics>;

  // Inspiration
  getRandomInspiration(): Promise<InspirationItem | undefined>;
  getAllInspiration(): Promise<InspirationItem[]>;
  createInspiration(inspiration: InsertInspirationItem): Promise<InspirationItem>;
}

export class DatabaseStorage implements IStorage {
  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db.insert(users).values(insertUser).returning();
    return user;
  }

  async getCreator(id: string): Promise<Creator | undefined> {
    const [creator] = await db.select().from(creators).where(eq(creators.id, id));
    return creator || undefined;
  }

  async getCreatorByUserId(userId: string): Promise<Creator | undefined> {
    const [creator] = await db.select().from(creators).where(eq(creators.userId, userId));
    return creator || undefined;
  }

  async createCreator(insertCreator: InsertCreator): Promise<Creator> {
    const [creator] = await db.insert(creators).values([insertCreator]).returning();
    return creator;
  }

  async updateCreator(id: string, updates: Partial<Creator>): Promise<Creator> {
    const [creator] = await db.update(creators).set(updates).where(eq(creators.id, id)).returning();
    return creator;
  }

  async getContent(id: string): Promise<Content | undefined> {
    const [contentItem] = await db.select().from(content).where(eq(content.id, id));
    return contentItem || undefined;
  }

  async getContentByCreator(creatorId: string): Promise<Content[]> {
    return await db.select().from(content)
      .where(eq(content.creatorId, creatorId))
      .orderBy(desc(content.publishedAt));
  }

  async createContent(insertContent: InsertContent): Promise<Content> {
    const [contentItem] = await db.insert(content).values([insertContent]).returning();
    return contentItem;
  }

  async updateContent(id: string, updates: Partial<Content>): Promise<Content> {
    const [contentItem] = await db.update(content).set(updates).where(eq(content.id, id)).returning();
    return contentItem;
  }

  async getOraclePredictions(creatorId: string): Promise<OraclePrediction[]> {
    return await db.select().from(oraclePredictions)
      .where(eq(oraclePredictions.creatorId, creatorId))
      .orderBy(desc(oraclePredictions.createdAt));
  }

  async createOraclePrediction(prediction: InsertOraclePrediction): Promise<OraclePrediction> {
    const [predictionItem] = await db.insert(oraclePredictions).values([prediction]).returning();
    return predictionItem;
  }

  async getBrandDeals(creatorId: string): Promise<BrandDeal[]> {
    return await db.select().from(brandDeals)
      .where(eq(brandDeals.creatorId, creatorId))
      .orderBy(desc(brandDeals.createdAt));
  }

  async createBrandDeal(deal: InsertBrandDeal): Promise<BrandDeal> {
    const [brandDeal] = await db.insert(brandDeals).values([deal]).returning();
    return brandDeal;
  }

  async updateBrandDeal(id: string, updates: Partial<BrandDeal>): Promise<BrandDeal> {
    const [brandDeal] = await db.update(brandDeals).set(updates).where(eq(brandDeals.id, id)).returning();
    return brandDeal;
  }

  async getIpViolations(creatorId: string): Promise<IpViolation[]> {
    return await db.select().from(ipViolations)
      .where(eq(ipViolations.creatorId, creatorId))
      .orderBy(desc(ipViolations.detectedAt));
  }

  async createIpViolation(violation: InsertIpViolation): Promise<IpViolation> {
    const [ipViolation] = await db.insert(ipViolations).values(violation).returning();
    return ipViolation;
  }

  async updateIpViolation(id: string, updates: Partial<IpViolation>): Promise<IpViolation> {
    const [ipViolation] = await db.update(ipViolations).set(updates).where(eq(ipViolations.id, id)).returning();
    return ipViolation;
  }

  async getWellnessMetrics(creatorId: string, startDate?: Date, endDate?: Date): Promise<WellnessMetric[]> {
    let query = db.select().from(wellnessMetrics);
    
    if (startDate && endDate) {
      query = query.where(
        and(
          eq(wellnessMetrics.creatorId, creatorId),
          gte(wellnessMetrics.date, startDate),
          lte(wellnessMetrics.date, endDate)
        )
      );
    } else {
      query = query.where(eq(wellnessMetrics.creatorId, creatorId));
    }
    
    return await query.orderBy(desc(wellnessMetrics.date));
  }

  async createWellnessMetric(metric: InsertWellnessMetric): Promise<WellnessMetric> {
    const [wellnessMetric] = await db.insert(wellnessMetrics).values(metric).returning();
    return wellnessMetric;
  }

  async getLatestWellnessMetric(creatorId: string): Promise<WellnessMetric | undefined> {
    const [metric] = await db.select().from(wellnessMetrics)
      .where(eq(wellnessMetrics.creatorId, creatorId))
      .orderBy(desc(wellnessMetrics.date))
      .limit(1);
    return metric || undefined;
  }

  async getAnalytics(creatorId: string, startDate?: Date, endDate?: Date): Promise<Analytics[]> {
    let query = db.select().from(analytics);
    
    if (startDate && endDate) {
      query = query.where(
        and(
          eq(analytics.creatorId, creatorId),
          gte(analytics.date, startDate),
          lte(analytics.date, endDate)
        )
      );
    } else {
      query = query.where(eq(analytics.creatorId, creatorId));
    }
    
    return await query.orderBy(desc(analytics.date));
  }

  async createAnalytics(insertAnalytics: InsertAnalytics): Promise<Analytics> {
    const [analyticsItem] = await db.insert(analytics).values(insertAnalytics).returning();
    return analyticsItem;
  }

  async getRandomInspiration(): Promise<InspirationItem | undefined> {
    const [inspiration] = await db.select().from(inspirationItems)
      .orderBy(sql`RANDOM()`)
      .limit(1);
    return inspiration || undefined;
  }

  async getAllInspiration(): Promise<InspirationItem[]> {
    return await db.select().from(inspirationItems).orderBy(desc(inspirationItems.createdAt));
  }

  async createInspiration(inspiration: InsertInspirationItem): Promise<InspirationItem> {
    const [inspirationItem] = await db.insert(inspirationItems).values([inspiration]).returning();
    return inspirationItem;
  }
}

export const storage = new DatabaseStorage();
