// Membaca isi folder data/ secara otomatis. Hanya dipakai di server (build time).
//
// Dua bentuk yang didukung:
//   1. data/nama.md atau .txt -> satu file = satu jenis konten
//   2. data/nama/ (folder)   -> semua file .md/.txt di dalamnya digabung berurutan
//                               (urut nama file), lalu dikirim sekaligus.
//                               File "_info.md" berisi nama, deskripsi, warna.

import fs from "node:fs";
import path from "node:path";

const isText = (f) => /\.(md|txt)$/i.test(f);
const stripExt = (f) => f.replace(/\.(md|txt)$/i, "");
const natural = (a, b) => a.localeCompare(b, undefined, { numeric: true });

function splitFrontmatter(raw) {
  const text = raw.replace(/^\uFEFF/, "").replace(/\r\n/g, "\n");
  const match = text.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);
  const meta = {};
  let body = text;
  if (match) {
    body = match[2];
    for (const line of match[1].split("\n")) {
      const i = line.indexOf(":");
      if (i > 0) meta[line.slice(0, i).trim()] = line.slice(i + 1).trim();
    }
  }
  return { meta, body: body.trim() };
}

// "animasi.jpg" -> "/covers/animasi.jpg"; "/x.png" dan "https://..." dibiarkan.
function asset(value, prefix) {
  if (!value) return "";
  if (/^(https?:)?\/\//.test(value) || value.startsWith("/")) return value;
  return prefix + value;
}

function build(id, meta, knowledge, parts) {
  const label = meta.label || id;
  return {
    id,
    label,
    description: meta.description || "",
    accent: meta.color || "#8B6CE8",
    cover: asset(meta.cover, "/covers/"),
    order: Number(meta.order) || 999,
    instruction:
      meta.instruction ||
      `Kamu adalah kreator konten ${label}. Gunakan knowledge di bawah sebagai acuan utama, lalu buatkan konten sesuai brief.`,
    knowledge,
    parts,
  };
}

function loadFile(file, id) {
  const { meta, body } = splitFrontmatter(fs.readFileSync(file, "utf8"));
  return build(id, meta, body, 1);
}

function loadFolder(dir, id) {
  const files = fs.readdirSync(dir).filter(isText).sort(natural);

  let meta = {};
  let intro = "";
  const sections = [];

  for (const f of files) {
    const { meta: m, body } = splitFrontmatter(fs.readFileSync(path.join(dir, f), "utf8"));
    if (stripExt(f) === "_info") {
      meta = m;
      intro = body;
      continue;
    }
    if (!body) continue;
    // Kalau file tidak punya judul sendiri, pakai nama file sebagai judul.
    const title = stripExt(f).replace(/^[\d\s._-]+/, "").replace(/[-_]+/g, " ");
    sections.push(body.startsWith("#") ? body : `## ${title}\n\n${body}`);
  }

  const knowledge = [intro, ...sections].filter(Boolean).join("\n\n---\n\n");
  return build(id, meta, knowledge, sections.length);
}

export function loadContentTypes() {
  const dir = path.join(process.cwd(), "data");
  return fs
    .readdirSync(dir, { withFileTypes: true })
    .flatMap((e) => {
      if (e.name.startsWith("_")) return [];
      if (e.isDirectory()) return [loadFolder(path.join(dir, e.name), e.name)];
      if (isText(e.name)) return [loadFile(path.join(dir, e.name), stripExt(e.name))];
      return [];
    })
    .sort((a, b) => a.order - b.order || a.label.localeCompare(b.label));
}

// Pengaturan tampilan situs dari data/_site.md (opsional).
export function loadSite() {
  const dir = path.join(process.cwd(), "data");
  const file = ["_site.md", "_site.txt"].map((f) => path.join(dir, f)).find((f) => fs.existsSync(f));
  const meta = file ? splitFrontmatter(fs.readFileSync(file, "utf8")).meta : {};
  return {
    brand: meta.brand || "Generator Konten",
    tagline: meta.tagline || "",
    title: meta.title || "Pilih Jenis Konten",
    countLabel: meta.count_label || "jenis konten tersedia",
    logo: asset(meta.logo, "/"),
  };
}
