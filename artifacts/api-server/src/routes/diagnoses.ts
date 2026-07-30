import { Router, type IRouter } from "express";
import { db, diagnosesTable } from "@workspace/db";
import { eq, desc } from "drizzle-orm";
import {
  CreateDiagnosisBody,
  GetDiagnosisParams,
  ListDiagnosesResponse,
  CreateDiagnosisResponse,
  GetDiagnosisResponse,
} from "@workspace/api-zod";

const router: IRouter = Router();

// Mock AI disease detection results
const MOCK_DISEASES = [
  {
    diseaseName: "Leaf Blight",
    confidence: 0.93,
    severity: "Moderate",
    recommendations: [
      "Spray copper-based fungicide every 7 days",
      "Avoid overhead irrigation",
      "Remove and destroy infected leaves immediately",
      "Improve field drainage to reduce humidity",
    ],
  },
  {
    diseaseName: "Powdery Mildew",
    confidence: 0.87,
    severity: "Low",
    recommendations: [
      "Apply sulfur-based fungicide",
      "Ensure adequate plant spacing for air circulation",
      "Avoid excess nitrogen fertilization",
      "Water at the base of plants early morning",
    ],
  },
  {
    diseaseName: "Bacterial Leaf Spot",
    confidence: 0.91,
    severity: "High",
    recommendations: [
      "Apply copper hydroxide spray",
      "Remove infected plant material",
      "Avoid working in fields when plants are wet",
      "Use certified disease-free seeds next season",
    ],
  },
  {
    diseaseName: "Root Rot",
    confidence: 0.78,
    severity: "Critical",
    recommendations: [
      "Improve soil drainage immediately",
      "Apply Trichoderma-based biocontrol agent",
      "Reduce irrigation frequency",
      "Treat soil with fungicide drench",
    ],
  },
  {
    diseaseName: "Rust Disease",
    confidence: 0.89,
    severity: "Moderate",
    recommendations: [
      "Apply propiconazole fungicide",
      "Monitor neighboring fields for spread",
      "Plant rust-resistant varieties next season",
      "Destroy crop debris after harvest",
    ],
  },
];

router.get("/diagnoses", async (req, res): Promise<void> => {
  const diagnoses = await db
    .select()
    .from(diagnosesTable)
    .orderBy(desc(diagnosesTable.createdAt));
  res.json(ListDiagnosesResponse.parse(diagnoses));
});

router.post("/diagnoses", async (req, res): Promise<void> => {
  const parsed = CreateDiagnosisBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }

  // Simulate AI detection with random mock result
  const mock = MOCK_DISEASES[Math.floor(Math.random() * MOCK_DISEASES.length)];

  const [diagnosis] = await db
    .insert(diagnosesTable)
    .values({
      cropName: parsed.data.cropName,
      imagePath: parsed.data.imagePath,
      affectedArea: parsed.data.affectedArea ?? null,
      location: parsed.data.location ?? null,
      diseaseName: mock.diseaseName,
      confidence: mock.confidence,
      severity: mock.severity,
      recommendations: mock.recommendations,
      status: "Diagnosed",
    })
    .returning();

  res.status(201).json(CreateDiagnosisResponse.parse(diagnosis));
});

router.get("/diagnoses/:id", async (req, res): Promise<void> => {
  const raw = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
  const params = GetDiagnosisParams.safeParse({ id: parseFloat(raw) });
  if (!params.success) {
    res.status(400).json({ error: "Invalid diagnosis ID" });
    return;
  }

  const [diagnosis] = await db
    .select()
    .from(diagnosesTable)
    .where(eq(diagnosesTable.id, params.data.id));

  if (!diagnosis) {
    res.status(404).json({ error: "Diagnosis not found" });
    return;
  }

  res.json(GetDiagnosisResponse.parse(diagnosis));
});

export default router;
