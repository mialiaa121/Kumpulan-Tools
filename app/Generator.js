"use client";

import { useState } from "react";
import { fields } from "../lib/fields";
import { buildPrompt, chatgptUrl } from "../lib/buildPrompt";

export default function Generator({ contentTypes, site }) {
  const [type, setType] = useState(null);
  const [values, setValues] = useState({});
  const [status, setStatus] = useState("");

  const choose = (t) => {
    setType(t);
    setValues({});
    setStatus("");
    window.scrollTo({ top: 0 });
  };
  const goHome = () => {
    setType(null);
    setStatus("");
  };

  const missingRequired = fields.some((f) => f.required && !values[f.name]?.trim());
  const prompt = type ? buildPrompt(type, values) : "";

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
      .catch(() => setStatus("Gagal menyalin prompt otomatis. Coba klik Generate sekali lagi."));
  };

  return (
    <>
      <header className="topbar">
        <button className="brand" onClick={goHome} aria-label="Kembali ke halaman awal">
          <span className="logo">
            {site.logo ? <img src={site.logo} alt="" /> : site.brand.charAt(0).toUpperCase()}
          </span>
          <span className="brand-text">
            {site.tagline && <small>{site.tagline}</small>}
            <strong>{site.brand}</strong>
          </span>
        </button>
      </header>

      <main className="wrap">
        {!type ? (
          <section aria-labelledby="judul">
            <h1 id="judul" className="page-title">{site.title}</h1>
            <p className="page-sub">
              {contentTypes.length} {site.countLabel}
            </p>

            <ul className="grid">
              {contentTypes.map((t, i) => (
                <li key={t.id}>
                  <button className="card" onClick={() => choose(t)}>
                    {t.cover ? (
                      <span className="cover">
                        <img src={t.cover} alt="" loading="lazy" />
                      </span>
                    ) : (
                      <span className="cover fallback" style={{ "--tint": t.accent }}>
                        <span className="cover-label">{t.label}</span>
                        <span className="cover-brand">{site.brand}</span>
                      </span>
                    )}
                    <span className="card-title">
                      {i + 1}. {t.label}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </section>
        ) : (
          <section aria-labelledby="judul">
            <button className="back" onClick={goHome}>
              ← Semua jenis konten
            </button>
            <h1 id="judul" className="page-title">{type.label}</h1>
            {type.description && <p className="page-sub">{type.description}</p>}

            <div className="panel">
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
                Generate
              </button>
              {status && <p className="status" role="status">{status}</p>}
            </div>
          </section>
        )}
      </main>
    </>
  );
}
