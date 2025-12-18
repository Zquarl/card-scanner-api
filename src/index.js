import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer";

dotenv.config();

const app = express();
const upload = multer({ storage: multer.memoryStorage() });

app.use(cors());
app.use(express.json());

// Health check (Render uses this)
app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

// Scan endpoint (OCR + matching will go here)
app.post("/scan", upload.single("image"), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No image uploaded" });
  }

  // TEMP mock response
  res.json({
    matches: [
      {
        id: "demo-charizard",
        name: "Charizard",
        set: "Base Set",
        number: "4/102",
        image:
          "https://images.pokemontcg.io/base1/4.png"
      }
    ]
  });
});

// Confirm endpoint (pricing will go here)
app.post("/confirm", async (req, res) => {
  const { cardId } = req.body;

  if (!cardId) {
    return res.status(400).json({ error: "Missing cardId" });
  }

  // TEMP mock pricing response
  res.json({
    raw: {
      ebay: 342,
      tcg: 365,
      confidence: "High"
    },
    psa10: {
      ebay: 12800,
      confidence: "Medium"
    }
  });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`API running on port ${PORT}`);
});
