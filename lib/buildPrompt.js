// Brief user dalam bentuk daftar.
export function buildBrief(type, values) {
  return (type.fields || [])
    .filter((f) => values[f.name]?.trim())
    .map((f) => `- ${f.label}: ${values[f.name].trim()}`)
    .join("\n");
}

// Menggabungkan instruksi + knowledge + brief user menjadi satu prompt.
export function buildPrompt(type, values) {
  const brief = buildBrief(type, values);

  return [
    type.instruction,
    "## KNOWLEDGE",
    type.knowledge,
    "## BRIEF DARI USER",
    brief,
  ].join("\n\n");
}

// Batas aman panjang URL (setelah di-encode). Di atas ini, prompt tidak
// dikirim lewat URL, user cukup paste dari clipboard.
export const MAX_URL_LENGTH = 6000;

export function chatgptUrl(prompt) {
  const encoded = encodeURIComponent(prompt);
  if (encoded.length > MAX_URL_LENGTH) return { url: "https://chatgpt.com/", inUrl: false };
  return { url: `https://chatgpt.com/?q=${encoded}`, inUrl: true };
}
