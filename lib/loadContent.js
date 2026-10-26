// Membaca isi folder data/ secara otomatis. Hanya dipakai di server (build time).
//
// Bentuk yang didukung:
//   1. data/NamaTools/ berisi input.js (+ opsi.js, prompt.js)  <- cara terbaru
//   2. data/nama.md atau .txt            -> satu file = satu jenis konten (cara lama)
//   3. data/nama/ berisi file .md/.txt   -> digabung berurutan (cara lama)
// Folder atau file yang namanya diawali "_" diabaikan.

import fs from "node:fs";
import path from "node:path";
import { fieldCatalog, defaultFields } from "./fields";

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
      if (line.trim().startsWith("#")) continue; // baris komentar
      const i = line.indexOf(":");
      if (i > 0) meta[line.slice(0, i).trim()] = line.slice(i + 1).trim();
    }
  }
  return { meta, body: body.trim() };
}

// "logo.png" -> "/logo.png"; "/x.png" dan "https://..." dibiarkan.
function asset(value, prefix) {
  if (!value) return "";
  if (/^(https?:)?\/\//.test(value) || value.startsWith("/")) return value;
  return prefix + value;
}

// Membaca daftar pilihan dari data/_opsi/<nama>.txt
//   - satu baris = satu pilihan
//   - baris berawalan "#" = judul kelompok pilihan
function loadOptions(name) {
  const file = path.join(process.cwd(), "data", "_opsi", `${name}.txt`);
  if (!fs.existsSync(file)) return [];
  let cur = { label: "", items: [] };
  const groups = [cur];
  for (const raw of fs.readFileSync(file, "utf8").replace(/^\uFEFF/, "").split(/\r?\n/)) {
    const line = raw.trim();
    if (!line) continue;
    if (line.startsWith("#")) {
      cur = { label: line.replace(/^#+\s*/, ""), items: [] };
      groups.push(cur);
    } else {
      cur.items.push(line);
    }
  }
  return groups.filter((g) => g.items.length);
}

function resolveFields(list) {
  return (list || defaultFields)
    .split(",")
    .map((n) => n.trim())
    .filter((n) => fieldCatalog[n])
    .map((name) => {
      const def = fieldCatalog[name];
      return { name, ...def, groups: def.options ? loadOptions(def.options) : undefined };
    });
}

// Ikon bawaan kalau baris `icon:` tidak ditulis.
const defaultIcons = {
  animation: "film",
  objektalk: "chat",
  faktaunik: "bulb",
  talkinghead: "person",
};

function build(id, meta, knowledge, parts) {
  const label = meta.label || id;
  return {
    id,
    label,
    description: meta.description || "",
    accent: meta.color || "#8B6CE8",
    icon: meta.icon || defaultIcons[id] || "sparkles",
    order: Number(meta.order) || 999,
    instruction:
      meta.instruction ||
      `Kamu adalah kreator konten ${label}. Gunakan knowledge di bawah sebagai acuan utama, lalu buatkan konten sesuai brief.`,
    knowledge,
    parts,
    fields: resolveFields(meta.fields),
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


// ---------------------------------------------------------------------------
// FORMAT BARU: data/NamaTools/input.js + opsi.js + prompt.js
// ---------------------------------------------------------------------------

const slugify = (t) =>
  String(t).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || "kolom";

// Modul bisa memakai `export default {...}` atau `export const ...`.
const unwrap = (mod) => (mod && mod.default !== undefined ? mod.default : mod);

// Array -> satu kelompok tanpa judul. Objek { "Judul": [..] } -> beberapa kelompok.
function toGroups(list) {
  if (Array.isArray(list)) return list.length ? [{ label: "", items: list.map(String) }] : [];
  if (list && typeof list === "object") {
    return Object.entries(list)
      .map(([label, items]) => ({ label, items: (items || []).map(String) }))
      .filter((g) => g.items.length);
  }
  return [];
}

const TYPE_ALIAS = {
  teks: "text",
  text: "text",
  "teks-panjang": "textarea",
  textarea: "textarea",
  pilihan: "choice",
  choice: "choice",
};

function resolveInputs(inputs, opsi, where) {
  return (inputs || []).map((it) => {
    const label = it.label || it.name || "Kolom";
    const type = TYPE_ALIAS[it.type || "teks-panjang"];
    if (!type) throw new Error(`${where}: tipe "${it.type}" tidak dikenal. Pakai: teks, teks-panjang, atau pilihan.`);

    const listKey = it.opsi || it.options;
    if (type === "choice" && listKey && !(listKey in opsi)) {
      throw new Error(`${where}: daftar opsi "${listKey}" tidak ada di opsi.js.`);
    }

    return {
      name: it.name || slugify(label),
      label,
      type,
      required: Boolean(it.wajib || it.required),
      placeholder: it.placeholder || "",
      rows: it.baris || it.rows,
      groups: type === "choice" ? toGroups(opsi[listKey]) : undefined,
      allowCustom: it.isiSendiri !== false,
      customPlaceholder: it.placeholderIsiSendiri || `Tulis ${label.toLowerCase()} sendiri`,
    };
  });
}

function readLooseKnowledge(dir) {
  return fs
    .readdirSync(dir)
    .filter((f) => isText(f) && !f.startsWith("_"))
    .sort(natural)
    .map((f) => splitFrontmatter(fs.readFileSync(path.join(dir, f), "utf8")).body)
    .filter(Boolean);
}

async function loadToolFolder(dir, name) {
  const where = `data/${name}`;
  try {
    const input = unwrap(await import(`../data/${name}/input.js`)) || {};
    const opsi = fs.existsSync(path.join(dir, "opsi.js"))
      ? unwrap(await import(`../data/${name}/opsi.js`)) || {}
      : {};
    const prompt = fs.existsSync(path.join(dir, "prompt.js"))
      ? unwrap(await import(`../data/${name}/prompt.js`)) || {}
      : {};

    // knowledge boleh berupa teks, atau daftar teks (digabung berurutan).
    // Kalau kosong, file .txt / .md di folder yang sama dipakai.
    let parts = Array.isArray(prompt.knowledge)
      ? prompt.knowledge
      : prompt.knowledge
      ? [prompt.knowledge]
      : readLooseKnowledge(dir);
    parts = parts.map((t) => String(t).trim()).filter(Boolean);

    const label = input.label || name;
    return {
      id: name,
      label,
      description: input.description || "",
      accent: input.color || "#8B6CE8",
      icon: input.icon || "sparkles",
      order: Number(input.order) || 999,
      instruction:
        prompt.instruction ||
        `Kamu adalah kreator konten ${label}. Gunakan knowledge di bawah sebagai acuan utama, lalu buatkan konten sesuai brief.`,
      knowledge: parts.join("\n\n---\n\n"),
      parts: parts.length,
      fields: resolveInputs(input.inputs, opsi, `${where}/input.js`),
    };
  } catch (err) {
    throw new Error(`Ada masalah di folder ${where}: ${err.message}`);
  }
}

export async function loadContentTypes() {
  const dir = path.join(process.cwd(), "data");
  const types = [];

  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    if (e.name.startsWith("_")) continue;
    const full = path.join(dir, e.name);

    if (e.isDirectory()) {
      // Folder dengan input.js = format baru. Selain itu = format lama (kumpulan .md/.txt).
      types.push(
        fs.existsSync(path.join(full, "input.js"))
          ? await loadToolFolder(full, e.name)
          : loadFolder(full, e.name)
      );
    } else if (isText(e.name)) {
      types.push(loadFile(full, stripExt(e.name)));
    }
  }

  return types.sort((a, b) => a.order - b.order || a.label.localeCompare(b.label));
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
