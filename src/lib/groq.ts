const GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions";
const GROQ_MODEL = "llama-3.3-70b-versatile";
const MAX_RETRIES = 3;

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// Groq's on-demand tier has a per-minute token budget - generating several
// posts back-to-back reliably hits it. On a 429, Groq's error body includes
// a "try again in Xs" hint; parse it (with a safety margin) and retry rather
// than losing the post outright.
function parseRetryDelayMs(errorText: string): number {
  const match = errorText.match(/try again in ([\d.]+)s/i);
  if (match) {
    return Math.ceil(parseFloat(match[1]) * 1000) + 1000;
  }
  return 15000;
}

// Calls Groq's OpenAI-compatible chat completions API and parses the response
// as JSON. The caller's system prompt must instruct the model to return a
// single JSON object - Groq's json_object mode only guarantees valid JSON
// syntax, not the caller's expected shape, so the caller is responsible for
// validating the parsed fields it actually needs.
export async function groqChatJSON(
  systemPrompt: string,
  userPrompt: string
): Promise<Record<string, unknown>> {
  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) {
    throw new Error("GROQ_API_KEY is not set");
  }

  let lastError: Error = new Error("Groq API call did not run");

  for (let attempt = 0; attempt <= MAX_RETRIES; attempt++) {
    const response = await fetch(GROQ_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: GROQ_MODEL,
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt },
        ],
        response_format: { type: "json_object" },
        temperature: 0.8,
        max_tokens: 4096,
      }),
    });

    if (response.ok) {
      const data = await response.json();
      const raw = data.choices?.[0]?.message?.content;
      if (!raw || typeof raw !== "string") {
        throw new Error("Groq API returned no content");
      }
      return JSON.parse(raw);
    }

    const text = await response.text();
    lastError = new Error(`Groq API error ${response.status}: ${text}`);

    if (response.status === 429 && attempt < MAX_RETRIES) {
      await sleep(parseRetryDelayMs(text));
      continue;
    }

    throw lastError;
  }

  throw lastError;
}
