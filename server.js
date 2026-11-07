require("dotenv").config();

const express = require("express");
const cors = require("cors");
const OpenAI = require("openai");

const app = express();
app.use(cors());
app.use(express.json({ limit: "2mb" }));

const PORT = process.env.PORT || 3000;
const MODEL = process.env.OPENAI_MODEL || "gpt-5-mini";

app.get("/", (_req, res) => {
  res.json({ name: "NEXORA API", status: "online" });
});

app.get("/api/health", (_req, res) => {
  res.json({ ok: true, service: "NEXORA API" });
});

app.post("/api/chat", async (req, res) => {
  try {
    if (!process.env.OPENAI_API_KEY) {
      return res.status(503).json({ error: "Le moteur IA n'est pas encore configuré." });
    }

    const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
    const messages = Array.isArray(req.body.messages) ? req.body.messages : [];
    const latestMessage = req.body.message || messages.map(m => m.content || "").join("\n");

    if (!latestMessage.trim()) {
      return res.status(400).json({ error: "Message vide." });
    }

    const mode = req.body.mode || "chat";
    const effort = req.body.effort || "medium";

    const response = await client.responses.create({
      model: MODEL,
      instructions:
        "Tu es NEXORA AI, un assistant utile, clair et prudent. " +
        "Mode: " + mode + ". Niveau de détail demandé: " + effort + ". " +
        "Réponds dans la langue de l'utilisateur.",
      input: messages.length ? messages : latestMessage
    });

    res.json({ reply: response.output_text || "Je n'ai pas pu générer de réponse." });
  } catch (error) {
    console.error("Erreur /api/chat:", error);
    res.status(500).json({ error: "Erreur du serveur NEXORA." });
  }
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`NEXORA API listening on port ${PORT}`);
});
