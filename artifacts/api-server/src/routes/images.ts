import { Router, type IRouter } from "express";

const router: IRouter = Router();

router.get("/images/search", async (req, res): Promise<void> => {
  const query = typeof req.query.query === "string" ? req.query.query : "crop field";

  try {
    const response = await fetch(
      `https://api.pexels.com/v1/search?query=${encodeURIComponent(query)}&per_page=1&orientation=square`,
      {
        headers: {
          Authorization: process.env.PEXELS_API_KEY || "",
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Pexels API returned ${response.status}`);
    }

    const data = await response.json();
    const photo = data.photos?.[0];

    if (!photo) {
      res.status(404).json({ error: "No image found" });
      return;
    }

    res.json({
      url: photo.src.large,
      thumbnailUrl: photo.src.medium,
      photographer: photo.photographer,
      alt: photo.alt || query,
    });
  } catch (err) {
    console.error("Image search failed:", err);
    res.status(502).json({ error: "Image search failed" });
  }
});

export default router;