import { createClient } from "@supabase/supabase-js";
import sharp from "sharp";

const URL = "https://opgcudohhcpmmzvkivtg.supabase.co";
const KEY = process.env.SRK;
const BUCKET = "listing-photos";
const QUALITY = 80;
const sb = createClient(URL, KEY);

async function listAll(prefix = "") {
  const out = [];
  let offset = 0;
  while (true) {
    const { data, error } = await sb.storage.from(BUCKET).list(prefix, { limit: 1000, offset });
    if (error) throw error;
    if (!data || data.length === 0) break;
    for (const item of data) {
      const path = prefix ? `${prefix}/${item.name}` : item.name;
      if (item.id === null) out.push(...(await listAll(path)));
      else out.push({ path, size: item.metadata?.size ?? 0 });
    }
    if (data.length < 1000) break;
    offset += 1000;
  }
  return out;
}

const pub = (p) => sb.storage.from(BUCKET).getPublicUrl(p).data.publicUrl;

async function run() {
  const files = await listAll("");
  console.log(`Found ${files.length} files`);
  let totalOrig = 0, totalWebp = 0, ok = 0, skip = 0, err = 0;

  for (const f of files) {
    const ext = f.path.split(".").pop()?.toLowerCase();
    if (!["jpg", "jpeg", "png"].includes(ext)) { skip++; continue; }
    const webpPath = f.path.replace(/\.(jpe?g|png)$/i, ".webp");

    try {
      const { data: blob, error: dlErr } = await sb.storage.from(BUCKET).download(f.path);
      if (dlErr) throw dlErr;
      const buf = Buffer.from(await blob.arrayBuffer());
      const webp = await sharp(buf, { failOn: "none" }).rotate().webp({ quality: QUALITY }).toBuffer();

      const { error: upErr } = await sb.storage.from(BUCKET)
        .upload(webpPath, webp, { contentType: "image/webp", upsert: true });
      if (upErr) throw upErr;

      const oldUrl = pub(f.path);
      const newUrl = pub(webpPath);
      await sb.from("listing_images").update({ image_url: newUrl }).eq("image_url", oldUrl);
      await sb.from("listings").update({ image_url: newUrl }).eq("image_url", oldUrl);

      totalOrig += buf.length; totalWebp += webp.length; ok++;
      console.log(`✓ ${f.path}  ${(buf.length/1024).toFixed(0)}KB → ${(webp.length/1024).toFixed(0)}KB (-${Math.round((1-webp.length/buf.length)*100)}%)`);
    } catch (e) {
      err++;
      console.log(`✗ ${f.path}: ${e.message}`);
    }
  }
  console.log(`\n=== DONE ===`);
  console.log(`Converted: ${ok} | Skipped: ${skip} | Errors: ${err}`);
  console.log(`Total: ${(totalOrig/1024/1024).toFixed(2)}MB → ${(totalWebp/1024/1024).toFixed(2)}MB`);
  console.log(`Saved: ${((totalOrig-totalWebp)/1024/1024).toFixed(2)}MB (-${Math.round((1-totalWebp/totalOrig)*100)}%)`);
}
run().catch((e) => { console.error(e); process.exit(1); });
