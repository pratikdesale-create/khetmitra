import { Router, type IRouter } from "express";
import { db, diagnosesTable } from "@workspace/db";
import { desc } from "drizzle-orm";
import { GetDashboardSummaryResponse } from "@workspace/api-zod";

const router: IRouter = Router();

router.get("/dashboard/summary", async (req, res): Promise<void> => {
  const allDiagnoses = await db
    .select()
    .from(diagnosesTable)
    .orderBy(desc(diagnosesTable.createdAt));

  const recentDiagnoses = allDiagnoses.slice(0, 5);

  // Build monthly counts for last 6 months
  const now = new Date();
  const monthlyCounts: Record<string, number> = {};
  for (let i = 5; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const label = d.toLocaleString("default", { month: "short" });
    monthlyCounts[label] = 0;
  }
  for (const diag of allDiagnoses) {
    const d = new Date(diag.createdAt);
    const label = d.toLocaleString("default", { month: "short" });
    if (label in monthlyCounts) {
      monthlyCounts[label] = (monthlyCounts[label] ?? 0) + 1;
    }
  }

  const monthlyDiagnosesCount = Object.entries(monthlyCounts).map(
    ([month, count]) => ({ month, count }),
  );

  const activeDiseases = allDiagnoses.filter(
    (d) => d.status === "Diagnosed" || d.status === "Pending",
  ).length;

  const summary = {
    totalDiagnoses: allDiagnoses.length,
    activeDiseases,
    nearbyShops: 10,
    schemesAvailable: 8,
    weatherRisk: "Medium" as const,
    recentDiagnoses,
    monthlyDiagnosesCount,
  };

  res.json(GetDashboardSummaryResponse.parse(summary));
});

export default router;
