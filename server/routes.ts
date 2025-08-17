import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertCreatorSchema, insertContentSchema, insertOraclePredictionSchema, 
         insertBrandDealSchema, insertIpViolationSchema, insertWellnessMetricSchema,
         insertAnalyticsSchema, insertInspirationItemSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  
  // Dashboard metrics endpoint
  app.get("/api/dashboard/:creatorId", async (req, res) => {
    try {
      const { creatorId } = req.params;
      
      const creator = await storage.getCreator(creatorId);
      if (!creator) {
        return res.status(404).json({ message: "Creator not found" });
      }

      const [content, predictions, brandDeals, violations, latestWellness, analytics] = await Promise.all([
        storage.getContentByCreator(creatorId),
        storage.getOraclePredictions(creatorId),
        storage.getBrandDeals(creatorId),
        storage.getIpViolations(creatorId),
        storage.getLatestWellnessMetric(creatorId),
        storage.getAnalytics(creatorId)
      ]);

      // Calculate metrics
      const totalViews = analytics.reduce((sum, a) => sum + (a.views || 0), 0);
      const totalRevenue = analytics.reduce((sum, a) => sum + parseFloat(a.revenue || "0"), 0);
      const activeBrandDeals = brandDeals.filter(deal => deal.status === "accepted").length;
      const pendingBrandDeals = brandDeals.filter(deal => deal.status === "pending").length;
      const activeViolations = violations.filter(v => v.status === "detected").length;
      const recoveryRevenue = violations
        .filter(v => v.status === "resolved")
        .reduce((sum, v) => sum + parseFloat(v.potentialRevenue || "0"), 0);

      res.json({
        creator,
        metrics: {
          totalRevenue: totalRevenue.toFixed(2),
          archiveValue: creator.archiveValue,
          wellnessScore: creator.wellnessScore,
          activeBrandDeals,
          pendingBrandDeals,
          totalViews,
          activeViolations,
          recoveryRevenue: recoveryRevenue.toFixed(2)
        },
        recentContent: content.slice(0, 5),
        predictions: predictions.slice(0, 3),
        brandDeals: brandDeals.slice(0, 5),
        wellness: latestWellness,
        analytics: analytics.slice(0, 30) // Last 30 days
      });
    } catch (error) {
      console.error("Dashboard error:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // Oracle predictions
  app.get("/api/oracle/:creatorId", async (req, res) => {
    try {
      const { creatorId } = req.params;
      const predictions = await storage.getOraclePredictions(creatorId);
      res.json(predictions);
    } catch (error) {
      console.error("Oracle predictions error:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.post("/api/oracle", async (req, res) => {
    try {
      const prediction = insertOraclePredictionSchema.parse(req.body);
      const created = await storage.createOraclePrediction(prediction);
      res.json(created);
    } catch (error) {
      console.error("Create prediction error:", error);
      res.status(400).json({ message: "Invalid prediction data" });
    }
  });

  // Archive management
  app.get("/api/archive/:creatorId", async (req, res) => {
    try {
      const { creatorId } = req.params;
      const content = await storage.getContentByCreator(creatorId);
      res.json(content);
    } catch (error) {
      console.error("Archive error:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.post("/api/archive/remaster/:contentId", async (req, res) => {
    try {
      const { contentId } = req.params;
      const updated = await storage.updateContent(contentId, { 
        isAiEnhanced: true,
        metadata: { ...req.body.metadata, aiEnhanced: true }
      });
      res.json(updated);
    } catch (error) {
      console.error("Remaster error:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // Brand deals
  app.get("/api/brand-deals/:creatorId", async (req, res) => {
    try {
      const { creatorId } = req.params;
      const deals = await storage.getBrandDeals(creatorId);
      res.json(deals);
    } catch (error) {
      console.error("Brand deals error:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.post("/api/brand-deals", async (req, res) => {
    try {
      const deal = insertBrandDealSchema.parse(req.body);
      const created = await storage.createBrandDeal(deal);
      res.json(created);
    } catch (error) {
      console.error("Create brand deal error:", error);
      res.status(400).json({ message: "Invalid deal data" });
    }
  });

  app.patch("/api/brand-deals/:dealId", async (req, res) => {
    try {
      const { dealId } = req.params;
      const updates = req.body;
      const updated = await storage.updateBrandDeal(dealId, updates);
      res.json(updated);
    } catch (error) {
      console.error("Update brand deal error:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // IP management
  app.get("/api/ip-violations/:creatorId", async (req, res) => {
    try {
      const { creatorId } = req.params;
      const violations = await storage.getIpViolations(creatorId);
      res.json(violations);
    } catch (error) {
      console.error("IP violations error:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.post("/api/ip-violations", async (req, res) => {
    try {
      const violation = insertIpViolationSchema.parse(req.body);
      const created = await storage.createIpViolation(violation);
      res.json(created);
    } catch (error) {
      console.error("Create IP violation error:", error);
      res.status(400).json({ message: "Invalid violation data" });
    }
  });

  // Wellness metrics
  app.get("/api/wellness/:creatorId", async (req, res) => {
    try {
      const { creatorId } = req.params;
      const { startDate, endDate } = req.query;
      
      const start = startDate ? new Date(startDate as string) : undefined;
      const end = endDate ? new Date(endDate as string) : undefined;
      
      const metrics = await storage.getWellnessMetrics(creatorId, start, end);
      res.json(metrics);
    } catch (error) {
      console.error("Wellness metrics error:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.post("/api/wellness", async (req, res) => {
    try {
      const metric = insertWellnessMetricSchema.parse(req.body);
      const created = await storage.createWellnessMetric(metric);
      res.json(created);
    } catch (error) {
      console.error("Create wellness metric error:", error);
      res.status(400).json({ message: "Invalid wellness data" });
    }
  });

  // Analytics
  app.get("/api/analytics/:creatorId", async (req, res) => {
    try {
      const { creatorId } = req.params;
      const { startDate, endDate } = req.query;
      
      const start = startDate ? new Date(startDate as string) : undefined;
      const end = endDate ? new Date(endDate as string) : undefined;
      
      const analytics = await storage.getAnalytics(creatorId, start, end);
      res.json(analytics);
    } catch (error) {
      console.error("Analytics error:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // Inspiration
  app.get("/api/inspiration/random", async (req, res) => {
    try {
      const inspiration = await storage.getRandomInspiration();
      if (!inspiration) {
        return res.status(404).json({ message: "No inspiration found" });
      }
      res.json(inspiration);
    } catch (error) {
      console.error("Random inspiration error:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.post("/api/inspiration", async (req, res) => {
    try {
      const inspiration = insertInspirationItemSchema.parse(req.body);
      const created = await storage.createInspiration(inspiration);
      res.json(created);
    } catch (error) {
      console.error("Create inspiration error:", error);
      res.status(400).json({ message: "Invalid inspiration data" });
    }
  });

  // Creators
  app.get("/api/creators/:userId", async (req, res) => {
    try {
      const { userId } = req.params;
      const creator = await storage.getCreatorByUserId(userId);
      if (!creator) {
        return res.status(404).json({ message: "Creator not found" });
      }
      res.json(creator);
    } catch (error) {
      console.error("Get creator error:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
