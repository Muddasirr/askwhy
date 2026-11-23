// Vercel serverless function: forwards chat requests to Groq so the API key
// never ships in the browser bundle. Set GROQ_API_KEY in the Vercel project's
// environment variables.

const GROQ_URL = "https://api.groq.com/openai/v1/chat/completions";
const ALLOWED_MODELS = new Set(["llama-3.1-8b-instant"]);
const MAX_TOKENS = 200;
const MAX_MESSAGES = 20;
const MAX_CHARS_PER_MESSAGE = 4000;

type ChatMessage = { role: "system" | "user" | "assistant"; content: string };

function isValidMessages(value: unknown): value is ChatMessage[] {
  return (
    Array.isArray(value) &&
    value.length > 0 &&
    value.length <= MAX_MESSAGES &&
    value.every(
      (m) =>
        m &&
        ["system", "user", "assistant"].includes(m.role) &&
        typeof m.content === "string" &&
        m.content.length <= MAX_CHARS_PER_MESSAGE
    )
  );
}

export default async function handler(req: any, res: any) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed" });
  }

  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: "GROQ_API_KEY is not configured" });
  }

  const body = typeof req.body === "string" ? JSON.parse(req.body || "{}") : req.body ?? {};
  const { model, messages, temperature } = body;

  if (!ALLOWED_MODELS.has(model)) {
    return res.status(400).json({ error: "Unsupported model" });
  }
  if (!isValidMessages(messages)) {
    return res.status(400).json({ error: "Invalid messages" });
  }

  const upstream = await fetch(GROQ_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model,
      messages,
      temperature: typeof temperature === "number" ? Math.min(Math.max(temperature, 0), 1) : 0.7,
      max_tokens: Math.min(Number(body.max_tokens) || MAX_TOKENS, MAX_TOKENS),
    }),
  });

  const data = await upstream.json().catch(() => ({}));
  return res.status(upstream.status).json(data);
}
