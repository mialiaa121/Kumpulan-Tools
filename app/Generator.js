"use client";

import { useState } from "react";
import { fields } from "../lib/fields";
import { buildPrompt, chatgptUrl } from "../lib/buildPrompt";

export default function Generator({ contentTypes }) {
  const [type, setType] = useState(null);
  const [values, setValues] = useState({});
  const [status, setStatus] = useState("");

  const choose = (t) => {
    setType(t);
    setValues({});
    setStatus("");
  };

  const missingRequired = fields.some((f) => f.required && !values[f.name]?.trim());
  const prompt = type ? buildPrompt(type, values) : "";
  const size = prompt.length;
  const nf = (n) => n.toLocaleString("id-ID");

  const generate = () => {
    const { url, inUrl } = chatgptUrl(prompt);
    // Buka tab dulu (harus langsung dari klik, kalau tidak diblokir browser).
    window.open(url, "_blank", "noopener");
    navigator.clipboard
      ?.writeText(prompt)
      .then(() =>
        setStatus(
          inUrl
            ? "ChatGPT dibuka dengan prompt terisi. Salinan prompt juga ada di clipboard."
            : "Prompt terlalu panjang untuk dikirim lewat link. Di ChatGPT, tempel dengan paste (Ctrl+V / tahan lalu Tempel)."
        )
      )
      .catch(() => setStatus("Gagal menyalin otomatis. Buka 'Lihat prompt' di bawah lalu salin manual."));
  };

  return (
    <main className="wrap">
      <header className="head">
        <h1>Brief konten, langsung ke ChatGPT</h1>
        <p>Pilih jenis konten, isi brief, dan knowledge-nya ikut terkirim.</p>
      </header>

      {!type ? (
        <section aria-labelledby="pilih">
          <h2 id="pilih" className="step">Mau buat konten apa?</h2>
          <ul className="choices">
            {contentTypes.map((t) => (
              <li key={t.id}>
                <button className="choice" style={{ "--accent": t.accent }} onClick={() => choose(t)}>
                  <span className="choice-title">{t.label}</span>
                  <span className="choice-desc">{t.description}</span>
                </button>
              </li>
            ))}
          </ul>
        </section>
      ) : (
        <section aria-labelledby="brief" style={{ "--accent": type.accent }}>
          <button className="back" onClick={() => setType(null)}>
            Ganti jenis konten
          </button>
          <h2 id="brief" className="step">
            Brief untuk <span className="tag">{type.label}</span>
          </h2>

          <div className="form">
            {fields.map((f) => (
              <label key={f.name} className="field">
                <span>
                  {f.label}
                  {f.required && <em> (wajib)</em>}
                </span>
                {f.type === "textarea" ? (
                  <textarea
                    rows={4}
                    placeholder={f.placeholder}
                    value={values[f.name] || ""}
                    onChange={(e) => setValues({ ...values, [f.name]: e.target.value })}
                  />
                ) : (
                  <select
                    value={values[f.name] || ""}
                    onChange={(e) => setValues({ ...values, [f.name]: e.target.value })}
                  >
                    <option value="">Bebas</option>
                    {f.options.map((o) => (
                      <option key={o}>{o}</option>
                    ))}
                  </select>
                )}
              </label>
            ))}
          </div>

          <button className="generate" onClick={generate} disabled={missingRequired}>
            Generate di ChatGPT
          </button>
          {missingRequired && <p className="hint">Isi kolom yang wajib dulu.</p>}
          {status && <p className="status" role="status">{status}</p>}

          <p className="size">
            {type.parts > 1 && <>{type.parts} knowledge digabung · </>}
            Panjang prompt: {nf(size)} karakter
          </p>
          {size > 30000 && (
            <p className="hint">
              Prompt ini sangat panjang. Kalau ChatGPT menolak atau hasilnya kurang patuh, ringkas knowledge-nya.
            </p>
          )}

          <details className="preview">
            <summary>Lihat prompt</summary>
            <pre>{prompt}</pre>
          </details>
        </section>
      )}
    </main>
  );
}
