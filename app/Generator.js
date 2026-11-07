"use client";

import { useEffect, useState } from "react";
import { buildBrief, buildPrompt, chatgptUrl } from "../lib/buildPrompt";

// Isi awal kolom (dari `isi:` di input.js), bisa diedit user.
const initialValues = (t) =>
  Object.fromEntries((t.fields || []).filter((f) => f.initial).map((f) => [f.name, f.initial]));

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
  const [status, setStatus] = useState("");
  const [canShareFile, setCanShareFile] = useState(false);
  const [result, setResult] = useState("");
  const [showErrors, setShowErrors] = useState(false);
  const [copied, setCopied] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

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
    setValues(initialValues(t));
    setStatus("");
    setResult("");
    setShowErrors(false);
    window.scrollTo({ top: 0 });
  };
  const goHome = () => {
    setType(null);
    setStatus("");
    setResult("");
    setShowErrors(false);
  };

  const setValue = (name, v) => setValues((prev) => ({ ...prev, [name]: v }));
  const fields = type?.fields ?? [];
  const missing = fields.filter((f) => f.required && !values[f.name]?.trim());

  // Kalau masih ada kolom wajib yang kosong: tandai, geser ke kolom pertama, jangan lanjut.
  const blocked = () => {
    if (missing.length === 0) return false;
    setShowErrors(true);
    setStatus(`Isi dulu kolom yang wajib: ${missing.map((f) => f.label).join(", ")}.`);
    const el = document.getElementById(`f-${missing[0].name}`);
    el?.scrollIntoView({ behavior: "smooth", block: "center" });
    el?.focus({ preventScroll: true });
    return true;
  };
  const prompt = type ? buildPrompt(type, values) : "";

  const generate = () => {
    if (blocked()) return;
    setResult(prompt);
    const { url, inUrl } = chatgptUrl(prompt);
    const done = inUrl
      ? "ChatGPT dibuka dengan prompt terisi."
      : "Prompt terlalu panjang untuk dikirim lewat link, jadi sudah disalin otomatis. Di ChatGPT, tempel (paste) lalu kirim.";

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

  // Tombol "Salin lagi" di kotak hasil.
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
        .catch(() => setStatus("Gagal menyalin. Tekan lama di kotak teks, pilih Pilih semua, lalu Salin."));
  };

  // Knowledge dikirim sebagai file .txt, brief dikirim sebagai teks pesan.
  const shareAsFile = () => {
    if (blocked()) return;
    setResult(prompt);
    const slug = type.id.replace(/[^a-z0-9]+/gi, "-").toLowerCase();
    const file = new File([type.knowledge], `${slug}-knowledge.txt`, { type: "text/plain" });
    const text = [
      type.instruction,
      "Knowledge ada di file terlampir. Ikuti file itu sebagai acuan utama.",
      "## BRIEF DARI USER",
      buildBrief(type, values),
    ]
      .filter(Boolean)
      .join("\n\n");

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
        <button
          className="brand"
          onClick={() => {
            goHome();
            setMenuOpen(false);
          }}
          aria-label="Kembali ke halaman awal"
        >
          <span className="logo">
            {site.logo ? <img src={site.logo} alt="" /> : site.brand.charAt(0).toUpperCase()}
          </span>
          <span className="brand-name">{site.brand}</span>
        </button>

        <button
          className="burger"
          aria-label="Menu"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((o) => !o)}
        >
          <span />
          <span />
          <span />
        </button>

        {menuOpen && (
          <nav className="menu" aria-label="Menu">
            <button
              onClick={() => {
                goHome();
                setMenuOpen(false);
              }}
            >
              Beranda
            </button>
            {contentTypes.map((t) => (
              <button
                key={t.id}
                onClick={() => {
                  choose(t);
                  setMenuOpen(false);
                }}
              >
                {t.label}
              </button>
            ))}
          </nav>
        )}
      </header>

      <main className="wrap">
        {!type ? (
          <section aria-labelledby="judul">
            {site.tagline && <p className="eyebrow">{site.tagline}</p>}
            <h1 id="judul" className="page-title">{site.title}</h1>
            <span className="bar" />

            <ul className="list">
              {contentTypes.map((t, i) => (
                <li key={t.id}>
                  <button className="card" onClick={() => choose(t)}>
                    <span className="num">{i + 1}</span>
                    <span className="card-title">{t.label}</span>
                    <span className="go" aria-hidden="true">
                      <svg
                        viewBox="0 0 24 24"
                        width="16"
                        height="16"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M12 5v14M6 13l6 6 6-6" />
                      </svg>
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
            <span className="bar" />
            {type.description && <p className="page-sub">{type.description}</p>}

            <div className="panel">
              <div className="form">
                {fields.map((f) => {
                  const id = `f-${f.name}`;
                  return (
                    <div
                      key={f.name}
                      className={`field${showErrors && missing.includes(f) ? " invalid" : ""}`}
                    >
                      <label htmlFor={id}>
                        {f.label}
                        {f.required && <em> (wajib)</em>}
                      </label>
                      {showErrors && missing.includes(f) && <small className="error">Kolom ini wajib diisi</small>}

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
                            value={(f.groups || []).some((g) => g.items.includes(values[f.name])) ? values[f.name] : ""}
                            onChange={(e) => setValue(f.name, e.target.value)}
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
                          </select>
                          {/* Pilihan di atas mengisi kotak ini. Teksnya bisa diedit atau ditulis sendiri. */}
                          {f.allowCustom !== false && (
                            <textarea
                              rows={f.rows || 2}
                              aria-label={`${f.label} (bisa diedit)`}
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

              <button className="generate" onClick={generate}>
                Mulai
              </button>
              {canShareFile && (
                <button className="generate secondary" onClick={shareAsFile}>
                  Kirim sebagai file
                </button>
              )}
              {status && <p className="status" role="status">{status}</p>}

              {result && (
                <div className="result">
                  <div className="result-head">
                    <strong>Hasil prompt (boleh diedit)</strong>
                    <button className="result-copy" onClick={copyAgain}>
                      {copied ? "Tersalin" : "Salin lagi"}
                    </button>
                  </div>
                  <textarea rows={8} value={result} onChange={(e) => setResult(e.target.value)} />
                </div>
              )}
            </div>
          </section>
        )}
      </main>
    </>
  );
}
