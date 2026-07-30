import { Router, type IRouter } from "express";
import { GetWeatherResponse } from "@workspace/api-zod";

const router: IRouter = Router();

const MOCK_WEATHER = {
  location: "Nashik, Maharashtra",
  temperature: 28,
  humidity: 72,
  rainChance: 35,
  windSpeed: 14,
  condition: "Partly Cloudy",
  diseaseRisk: "Medium" as const,
  alerts: [
    {
      type: "Fungal Risk",
      message: "High humidity levels increase risk of fungal diseases. Inspect crops for early signs of blight.",
      severity: "Medium" as const,
    },
    {
      type: "Rain Advisory",
      message: "Light rain expected in 2 days. Consider applying preventive fungicide spray before rainfall.",
      severity: "Low" as const,
    },
  ],
  forecast: [
    { day: "Today", high: 30, low: 22, condition: "Partly Cloudy", rainChance: 35 },
    { day: "Tue", high: 29, low: 21, condition: "Overcast", rainChance: 55 },
    { day: "Wed", high: 26, low: 19, condition: "Light Rain", rainChance: 80 },
    { day: "Thu", high: 27, low: 20, condition: "Cloudy", rainChance: 45 },
    { day: "Fri", high: 31, low: 23, condition: "Sunny", rainChance: 10 },
    { day: "Sat", high: 33, low: 24, condition: "Sunny", rainChance: 5 },
    { day: "Sun", high: 32, low: 23, condition: "Partly Cloudy", rainChance: 20 },
  ],
};

router.get("/weather", async (_req, res): Promise<void> => {
  res.json(GetWeatherResponse.parse(MOCK_WEATHER));
});

export default router;
