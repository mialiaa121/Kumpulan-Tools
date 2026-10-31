"use client";

import { useEffect, useState } from "react";
import { buildBrief, buildPrompt, chatgptUrl } from "../lib/buildPrompt";

const CUSTOM = "__custom__";

// Menyalin teks ke clipboard. Harus dipanggil langsung dari klik dan SEBELUM
// tab ChatGPT dibuka, karena setelah pindah tab, browser (terutama Android)
// menolak penyalinan. Mengembalikan true kalau berhasil.
function copyNow(text) {
  try {
    const ta = document.createElement("textarea");
    ta.value = text;
    ta.setAttribute("readonly", "");
    ta.style.cssText = "position:fixed;top:0;left:0;opacity:0;";
    document.body.appendChild(ta);
    ta.focus();
    ta.select();
    ta.setSelectionRange(0, text.length);
    const ok = document.execCommand("copy");
    document.body.removeChild(ta);
    return ok;
  } catch {
    return false;
  }
}

export default function Generator({ contentTypes, site }) {
  const [type, setType] = useState(null);
  const [values, setValues] = useState({});
  const [custom, setCustom] = useState({});
  const [status, setStatus] = useState("");
  const [canShareFile, setCanShareFile] = useState(false);
  const [result, setResult] = useState("");
  const [copied, setCopied] = useState(false);

  // Tombol file hanya muncul di perangkat/browser yang mendukung berbagi file
  // (HP dan tablet diperlakukan sama).
  useEffect(() => {
    try {
      const test = new File(["x"], "x.txt", { type: "text/plain" });
      setCanShareFile(Boolean(navigator.canShare && navigator.canShare({ files: [test] })));
    } catch {
      setCanShareFile(false);
    }
  }, []);

  const choose = (t) => {
    setType(t);
    setValues({});
    setCustom({});
    setStatus("");
    setResult("");
    window.scrollTo({ top: 0 });
  };
  const goHome = () => {
    setType(null);
    setStatus("");
    setResult("");
  };

  const setValue = (name, v) => setValues((prev) => ({ ...prev, [name]: v }));
  const pick = (name, v) => {
    if (v === CUSTOM) {
      setCustom((prev) => ({ ...prev, [name]: true }));
      setValue(name, "");
    } else {
      setCustom((prev) => ({ ...prev, [name]: false }));
      setValue(name, v);
    }
  };

  const fields = type?.fields ?? [];
  const missingRequired = fields.some((f) => f.required && !values[f.name]?.trim());
  const prompt = type ? buildPrompt(type, values) : "";

  const generate = () => {
    setResult(prompt);
    const { url, inUrl } = chatgptUrl(prompt);
    const done = inUrl
      ? "ChatGPT dibuka dengan prompt terisi."
      : ""
    // 1) Salin dulu, 2) baru buka ChatGPT (urutan ini penting di Android).
    if (copyNow(prompt)) {
      setStatus(done);
    } else {
      navigator.clipboard
        ?.writeText(prompt)
        .then(() => setStatus(done))
        .catch(() => setStatus("Gagal menyalin prompt otomatis. Coba tekan Mulai sekali lagi."));
    }
    window.open(url, "_blank", "noopener");
  };

  // Tombol "Salin" di kotak hasil.
  const copyAgain = () => {
    const mark = () => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    };
    if (copyNow(result)) mark();
    else
      navigator.clipboard
        ?.writeText(result)
        .then(mark)
        .catch(() => setStatus("Gagal menyalin. Tekan lama di kotak teks, lalu pilih Salin."));
  };

  // Knowledge dikirim sebagai file .txt, brief dikirim sebagai teks pesan.
  const shareAsFile = () => {
    setResult(prompt);
    const slug = type.id.replace(/[^a-z0-9]+/gi, "-").toLowerCase();
    const file = new File([type.knowledge], `${slug}-knowledge.txt`, { type: "text/plain" });
    const text = [
      type.instruction,
      "Knowledge ada di file terlampir. Ikuti file itu sebagai acuan utama.",
      "## BRIEF DARI USER",
      buildBrief(type, values),
    ].join("\n\n");

    // Cadangan: kalau ChatGPT hanya menerima file, teks pesan tinggal ditempel.
    if (!copyNow(text)) navigator.clipboard?.writeText(text).catch(() => {});

    navigator
      .share({ files: [file], text, title: type.label })
      .then(() => setStatus("Kalau brief belum muncul di kolom pesan ChatGPT, tempel (paste). Teksnya sudah disalin."))
      .catch((e) => {
        if (e?.name !== "AbortError") setStatus("Menu Bagikan gagal dibuka. Pakai tombol Mulai.");
      });
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
                      <span className="cover fallback" style={{ "--tint": t.accent || "#8b6ce8" }}>
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
                {fields.map((f) => {
                  const id = `f-${f.name}`;
                  return (
                    <div key={f.name} className="field">
                      <label htmlFor={id}>
                        {f.label}
                        {f.required && <em> (wajib)</em>}
                      </label>

                      {f.type === "textarea" && (
                        <textarea
                          id={id}
                          rows={f.rows || 4}
                          placeholder={f.placeholder}
                          value={values[f.name] || ""}
                          onChange={(e) => setValue(f.name, e.target.value)}
                        />
                      )}

                      {f.type === "text" && (
                        <input
                          id={id}
                          type="text"
                          placeholder={f.placeholder}
                          value={values[f.name] || ""}
                          onChange={(e) => setValue(f.name, e.target.value)}
                        />
                      )}

                      {f.type === "choice" && (
                        <>
                          <select
                            id={id}
                            value={custom[f.name] ? CUSTOM : values[f.name] || ""}
                            onChange={(e) => pick(f.name, e.target.value)}
                          >
                            <option value="">{f.placeholder || `Pilih ${f.label.toLowerCase()}`}</option>
                            {(f.groups || []).map((g, gi) =>
                              g.label ? (
                                <optgroup key={gi} label={g.label}>
                                  {g.items.map((o) => (
                                    <option key={o} value={o}>{o}</option>
                                  ))}
                                </optgroup>
                              ) : (
                                g.items.map((o) => (
                                  <option key={o} value={o}>{o}</option>
                                ))
                              )
                            )}
                            {f.allowCustom !== false && <option value={CUSTOM}>Isi sendiri…</option>}
                          </select>
                          {custom[f.name] && (
                            <input
                              type="text"
                              autoFocus
                              aria-label={`${f.label} (isi sendiri)`}
                              placeholder={f.customPlaceholder}
                              value={values[f.name] || ""}
                              onChange={(e) => setValue(f.name, e.target.value)}
                            />
                          )}
                        </>
                      )}
                    </div>
                  );
                })}
              </div>

              <button className="generate" onClick={generate} disabled={missingRequired}>
                Mulai
              </button>
              {canShareFile && (
                <button className="generate secondary" onClick={shareAsFile} disabled={missingRequired}>
                  Kirim sebagai file
                </button>
              )}
              {status && <p className="status" role="status">{status}</p>}

              {result && (
                <div className="result">
                  <div className="result-head">
                    <strong>Hasil prompt (knowledge + brief)</strong>
                    <button className="result-copy" onClick={copyAgain}>
                      {copied ? "Tersalin" : "Salin lagi"}
                    </button>
                  </div>
                  <textarea readOnly rows={8} value={result} onFocus={(e) => e.target.select()} />
                </div>
              )}
            </div>
          </section>
        )}
      </main>
    </>
  );
}
