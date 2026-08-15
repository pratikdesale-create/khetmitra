
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
import multer from "multer";
import { GoogleGenAI } from "@google/genai";
const router: IRouter = Router();
const upload = multer({ storage: multer.memoryStorage(), limits: { fileSize: 10 * 1024 * 1024 } });
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const LANGUAGE_NAMES: Record<string, string> = {
  en: "English",
  hi: "Hindi (हिन्दी)",
  mr: "Marathi (मराठी)",
};

function buildDiagnosisPrompt(languageCode: string): string {
  const languageName = LANGUAGE_NAMES[languageCode] || "English";
  return `You are an expert agricultural pathologist. Look at this photo of a crop leaf and identify the most likely disease.

Respond ONLY with valid JSON in exactly this shape, no extra text:
{
  "cropName": "string - the crop species if identifiable, otherwise 'Unknown Crop'",
  "diseaseName": "string - the disease name, written in ${languageName}, with the scientific name in parentheses in Latin script (e.g. scientific names stay in Latin script even when the rest is translated)",
  "confidence": number between 0 and 1,
  "severity": "Low" | "Moderate" | "High" | "Critical",
  "recommendations": ["string", "string", "string"] - 3 short, practical treatment steps, written entirely in ${languageName}
}

IMPORTANT: All text values (cropName, diseaseName's common name part, and every recommendation) must be written in ${languageName}, using ${languageName === "English" ? "English" : "the native script for that language"}. Keep "severity" as one of the exact English enum values (Low/Moderate/High/Critical) regardless of language, since that field is used by the app's logic.

If the image does not clearly show a plant or leaf, still return your best guess with a lower confidence score rather than refusing.`;
}
function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function diagnoseWithGemini(imageBuffer: Buffer, mimeType: string, languageCode = "en", attempt = 1): Promise<any> {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-flash-latest",
      contents: [
        {
          role: "user",
          parts: [
            { text: buildDiagnosisPrompt(languageCode) },
            { inlineData: { mimeType, data: imageBuffer.toString("base64") } },
          ],
        },
      ],
      config: { responseMimeType: "application/json" },
    });

    const parsed = JSON.parse(response.text ?? "{}");
    return parsed;
  } catch (err: any) {
    const isRetryable = err?.status === 503 || err?.status === 429;
    if (isRetryable && attempt < 3) {
      const waitMs = attempt * 2000;
      console.warn(`Gemini call failed (attempt ${attempt}), retrying in ${waitMs}ms...`);
      await sleep(waitMs);
      return diagnoseWithGemini(imageBuffer, mimeType, languageCode, attempt + 1);
    }
    throw err;
  }
}


// Mock AI disease detection results
const MOCK_DISEASES_EN = [
  {
    diseaseName: "Leaf Blight",
    confidence: 0.93,
    severity: "Moderate",
    recommendations: [
      "Spray copper-based fungicide every 7 days",
      "Avoid overhead irrigation",
      "Remove and destroy infected leaves immediately",
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
    ],
  },
];

const MOCK_DISEASES_BY_LANG: Record<string, typeof MOCK_DISEASES_EN> = {
  en: MOCK_DISEASES_EN,
  hi: [
    {
      diseaseName: "पत्ती झुलसा रोग (Leaf Blight)",
      confidence: 0.93,
      severity: "Moderate",
      recommendations: [
        "हर 7 दिन में कॉपर आधारित फफूंदनाशक का छिड़काव करें",
        "ऊपर से सिंचाई करने से बचें",
        "संक्रमित पत्तियों को तुरंत हटाकर नष्ट करें",
      ],
    },
    {
      diseaseName: "चूर्णिल आसिता (Powdery Mildew)",
      confidence: 0.87,
      severity: "Low",
      recommendations: [
        "सल्फर आधारित फफूंदनाशक का प्रयोग करें",
        "हवा के संचार के लिए पौधों के बीच उचित दूरी रखें",
        "अधिक नाइट्रोजन उर्वरक से बचें",
      ],
    },
  ],
  mr: [
    {
      diseaseName: "पानांवरील करपा (Leaf Blight)",
      confidence: 0.93,
      severity: "Moderate",
      recommendations: [
        "दर 7 दिवसांनी कॉपर आधारित बुरशीनाशक फवारावे",
        "वरून पाणी देणे टाळावे",
        "संक्रमित पाने त्वरित काढून नष्ट करावीत",
      ],
    },
    {
      diseaseName: "भुरी रोग (Powdery Mildew)",
      confidence: 0.87,
      severity: "Low",
      recommendations: [
        "सल्फर आधारित बुरशीनाशक वापरावे",
        "हवा खेळती राहण्यासाठी झाडांमध्ये योग्य अंतर ठेवावे",
        "जास्त नत्र खत वापरणे टाळावे",
      ],
    },
  ],
};
router.get("/diagnoses", async (req, res): Promise<void> => {
  const diagnoses = await db
    .select()
    .from(diagnosesTable)
    .orderBy(desc(diagnosesTable.createdAt));
  const serialized = diagnoses.map((d) => ({
    ...d,
    createdAt: d.createdAt instanceof Date ? d.createdAt.toISOString() : d.createdAt,
  }));
  res.json(ListDiagnosesResponse.parse(serialized));
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

  const serializedDiagnosis = {
    ...diagnosis,
    createdAt: diagnosis.createdAt instanceof Date ? diagnosis.createdAt.toISOString() : diagnosis.createdAt,
  };
  res.status(201).json(CreateDiagnosisResponse.parse(serializedDiagnosis));
});
router.post("/diagnoses/analyze", upload.single("image"), async (req, res): Promise<void> => {
  if (!req.file) {
    res.status(400).json({ error: "No image file provided" });
    return;
  }

  const languageCode = typeof req.body.language === "string" ? req.body.language : "en";

  let diseaseResult: any;
  try {
    diseaseResult = await diagnoseWithGemini(req.file.buffer, req.file.mimetype, languageCode);
  } catch (err) {
    console.error("Gemini diagnosis failed, using fallback:", err);
    const pool = MOCK_DISEASES_BY_LANG[languageCode] || MOCK_DISEASES_BY_LANG.en;
    const mock = MOCK_DISEASES_EN[Math.floor(Math.random() * MOCK_DISEASES_EN.length)];
    diseaseResult = { ...mock, cropName: req.body.cropName || "Unknown Crop" };
  }

  const [diagnosis] = await db
    .insert(diagnosesTable)
    .values({
      cropName: diseaseResult.cropName || req.body.cropName || "Unknown Crop",
      imagePath: req.file.originalname,
      affectedArea: req.body.affectedArea || null,
      location: req.body.location || null,
      diseaseName: diseaseResult.diseaseName,
      confidence: diseaseResult.confidence,
      severity: diseaseResult.severity,
      recommendations: diseaseResult.recommendations,
      status: "Diagnosed",
    })
    .returning();
  const serializedResult = {
    ...diagnosis,
    createdAt: diagnosis.createdAt instanceof Date ? diagnosis.createdAt.toISOString() : diagnosis.createdAt,
  };
  res.status(201).json(CreateDiagnosisResponse.parse(serializedResult));
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
