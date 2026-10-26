"use client";

import { useEffect, useState } from "react";
import { buildBrief, buildPrompt, chatgptUrl } from "../lib/buildPrompt";

const CUSTOM = "__custom__";


export default function Generator({ contentTypes, site }) {
  const [type, setType] = useState(null);
  const [values, setValues] = useState({});
  const [custom, setCustom] = useState({});
  const [status, setStatus] = useState("");
  const [canShareFile, setCanShareFile] = useState(false);

  // Menu Bagikan dengan file hanya ada di sebagian HP/browser (bukan iPad).
  useEffect(() => {
    try {
      // iPad (termasuk yang menyamar sebagai Mac) hanya memakai tombol Generate.
      const isIPad =
        /iPad/.test(navigator.userAgent) ||
        (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);
      const test = new File(["x"], "x.txt", { type: "text/plain" });
      setCanShareFile(!isIPad && Boolean(navigator.canShare && navigator.canShare({ files: [test] })));
    } catch {
      setCanShareFile(false);
    }
  }, []);

  const choose = (t) => {
    setType(t);
    setValues({});
    setCustom({});
    setStatus("");
    window.scrollTo({ top: 0 });
  };
  const goHome = () => {
    setType(null);
    setStatus("");
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
    const { url, inUrl } = chatgptUrl(prompt);
    // Buka tab dulu (harus langsung dari klik, kalau tidak diblokir browser).
    window.open(url, "_blank", "noopener");
    navigator.clipboard
      ?.writeText(prompt)
      .then(() =>
        setStatus(
          inUrl
            ? "ChatGPT dibuka dengan prompt terisi."
            : "Prompt terlalu panjang untuk dikirim lewat link, jadi sudah disalin otomatis. Di ChatGPT, tempel (paste) lalu kirim."
        )
      )
      .catch(() => setStatus("Gagal menyalin prompt otomatis. Coba klik Generate sekali lagi."));
  };

  // Knowledge dikirim sebagai file .txt, brief dikirim sebagai teks pesan.
  const shareAsFile = () => {
    const slug = type.id.replace(/[^a-z0-9]+/gi, "-").toLowerCase();
    const file = new File([type.knowledge], `${slug}-knowledge.txt`, { type: "text/plain" });
    const text = [
      type.instruction,
      "Ikuti file terlampir sebagai acuan utama.",
      "## BRIEF DARI USER",
      buildBrief(type, values),
    ].join("\n\n");

    // Cadangan: kalau ChatGPT hanya menerima file, teks pesan tinggal ditempel.
    navigator.clipboard?.writeText(text).catch(() => {});

    navigator
      .share({ files: [file], text, title: type.label })
      .then(() => setStatus("Kalau brief belum muncul di kolom pesan ChatGPT, tempel (paste). Teksnya sudah disalin."))
      .catch((e) => {
        if (e?.name !== "AbortError") setStatus("Menu Bagikan gagal dibuka. Pakai tombol Generate.");
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
                Generate
              </button>
              {canShareFile && (
                <button className="generate secondary" onClick={shareAsFile} disabled={missingRequired}>
                  Kirim sebagai file
                </button>
              )}
              {status && <p className="status" role="status">{status}</p>}
            </div>
          </section>
        )}
      </main>
    </>
  );
}
