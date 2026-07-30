import { pgTable, text, serial, timestamp, doublePrecision } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const diagnosesTable = pgTable("diagnoses", {
  id: serial("id").primaryKey(),
  cropName: text("crop_name").notNull(),
  imagePath: text("image_path").notNull(),
  diseaseName: text("disease_name").notNull(),
  confidence: doublePrecision("confidence").notNull(),
  severity: text("severity").notNull().default("Moderate"), // Low, Moderate, High, Critical
  recommendations: text("recommendations").array().notNull().default([]),
  affectedArea: text("affected_area"),
  location: text("location"),
  status: text("status").notNull().default("Diagnosed"), // Pending, Diagnosed, Treated, Recovered
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export const insertDiagnosisSchema = createInsertSchema(diagnosesTable).omit({
  id: true,
  createdAt: true,
});
export type InsertDiagnosis = z.infer<typeof insertDiagnosisSchema>;
export type Diagnosis = typeof diagnosesTable.$inferSelect;
