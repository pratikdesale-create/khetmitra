import { Router, type IRouter } from "express";
import { ListSchemesResponse } from "@workspace/api-zod";

const router: IRouter = Router();

const MOCK_SCHEMES = [
  {
    id: 1,
    name: "PM-KISAN (Pradhan Mantri Kisan Samman Nidhi)",
    description:
      "Direct income support of Rs 6,000 per year to small and marginal farmer families across the country, payable in three installments of Rs 2,000 each.",
    ministry: "Ministry of Agriculture & Farmers Welfare",
    eligibility:
      "All land-holding farmer families with combined cultivable agricultural land up to 2 hectares",
    benefit: "Rs 6,000 per year in three equal installments",
    applicationUrl: "https://pmkisan.gov.in",
    category: "Financial" as const,
    isActive: true,
  },
  {
    id: 2,
    name: "PMFBY (Pradhan Mantri Fasal Bima Yojana)",
    description:
      "Crop insurance scheme providing financial support to farmers suffering crop loss/damage due to unforeseen events like natural calamities, pests and diseases.",
    ministry: "Ministry of Agriculture & Farmers Welfare",
    eligibility:
      "All farmers growing notified crops in notified areas. Compulsory for loanee farmers",
    benefit:
      "Insurance coverage for crop losses with low premium rates (2% for Kharif, 1.5% for Rabi)",
    applicationUrl: "https://pmfby.gov.in",
    category: "Insurance" as const,
    isActive: true,
  },
  {
    id: 3,
    name: "Soil Health Card Scheme",
    description:
      "Government issues Soil Health Cards to farmers which carry crop-wise recommendations of nutrients and fertilizers required for individual farms to help improve soil health and its fertility.",
    ministry: "Department of Agriculture & Cooperation",
    eligibility: "All farmers who own agricultural land",
    benefit:
      "Free soil testing and nutrient recommendations to optimize fertilizer use and increase productivity",
    applicationUrl: "https://soilhealth.dac.gov.in",
    category: "Technology" as const,
    isActive: true,
  },
  {
    id: 4,
    name: "PKVY (Paramparagat Krishi Vikas Yojana)",
    description:
      "Promoting organic farming among farmers by providing financial assistance and training. Aims to reduce dependency on chemical inputs.",
    ministry: "Ministry of Agriculture & Farmers Welfare",
    eligibility:
      "Farmers willing to adopt organic farming methods in clusters of 50 acres",
    benefit:
      "Rs 50,000 per hectare over 3 years for organic farming certification and marketing support",
    applicationUrl: "https://pgsindia-ncof.gov.in",
    category: "Input" as const,
    isActive: true,
  },
  {
    id: 5,
    name: "KCC (Kisan Credit Card)",
    description:
      "Provides farmers with timely access to credit for their agricultural needs including crop cultivation, post-harvest expenses, and allied activities.",
    ministry: "Ministry of Finance / NABARD",
    eligibility: "All farmers — individual, joint borrowers, tenant farmers, and SHGs",
    benefit:
      "Short-term credit at subsidized interest rate of 4% per annum with flexible repayment",
    applicationUrl: "https://nabard.org/kcc",
    category: "Financial" as const,
    isActive: true,
  },
  {
    id: 6,
    name: "MIDH (Mission for Integrated Development of Horticulture)",
    description:
      "Holistic growth of horticulture sector covering fruits, vegetables, root & tuber crops, mushrooms, spices, flowers, and aromatic plants.",
    ministry: "Ministry of Agriculture & Farmers Welfare",
    eligibility:
      "Farmers, producer organizations, and agri-entrepreneurs in horticulture sector",
    benefit:
      "Up to 50% subsidy on infrastructure, planting material, post-harvest management",
    applicationUrl: "https://midh.gov.in",
    category: "Input" as const,
    isActive: true,
  },
  {
    id: 7,
    name: "RKVY (Rashtriya Krishi Vikas Yojana)",
    description:
      "Provides states flexibility to plan and execute programmes for development of agriculture and allied sectors through District Agriculture Plans.",
    ministry: "Ministry of Agriculture & Farmers Welfare",
    eligibility: "State governments, farmers' cooperatives, and agri-start-ups",
    benefit:
      "Grants for farm mechanization, soil health management, crop diversification",
    applicationUrl: "https://rkvy.nic.in",
    category: "Financial" as const,
    isActive: true,
  },
  {
    id: 8,
    name: "e-NAM (National Agriculture Market)",
    description:
      "Pan-India electronic trading portal networking the existing APMC mandis to create a unified national market for agricultural commodities.",
    ministry: "Ministry of Agriculture & Farmers Welfare",
    eligibility: "All farmers registered with their local APMC mandi",
    benefit:
      "Access to wider markets, transparent price discovery, and online payment",
    applicationUrl: "https://enam.gov.in",
    category: "Other" as const,
    isActive: true,
  },
];

router.get("/schemes", async (_req, res): Promise<void> => {
  res.json(ListSchemesResponse.parse(MOCK_SCHEMES));
});

export default router;
