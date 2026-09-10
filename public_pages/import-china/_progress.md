# Progress — หน้า import-china

| Stop | สถานะ | ไฟล์ |
|---|---|---|
| 0 เตรียม folder + brief | ✅ เสร็จ | `salepage-brief.md` |
| 1 Offer building | ✅ Gate B ผ่าน | `offer-building.md` |
| 2 Design guide + wireframe | ✅ เสร็จ | `design-guide.md` + `wireframe-copywriting.md` (ส่วน A) |
| 3 Copywriting | ✅ Gate C ผ่าน | `wireframe-copywriting.md` (ส่วน B) |
| 4 Assets prep | ✅ เสร็จ | `manifest.md` · 10 ไฟล์ 888KB (Pixabay) |
| 5a Build | ✅ เสร็จ | `lib/` `api/lead.js` `public/index.html` |
| 5b Preview + CRO | ✅ Gate D ผ่าน | `cro-report.md` ≈8.1/10 |
| 5c Production | ✅ live — **รอ Gate E** | https://cmh-logistics-x1ry.vercel.app/import-china |

## Context ที่ใช้
- `context/{company,clients,offers,voice}.md` — CMH Logistics (ของจริง ไม่ใช่แบรนด์ตัวอย่าง)
- `context/brand-identity/visual-guideline.md` — Industrial · dark · navy #08192A + amber #E8730C
- `public_pages/import-china/catalog.json` — 3 sku, HubSpot product id ครบ, Stripe = null

## การตัดสินใจสำคัญ
- **ไม่มีขั้นชำระเงิน** — freight คิดราคา quote รายเคส หน้าเพจจบที่ฟอร์มเก็บ lead
- **ไม่มี testimonial** — ยังไม่มีของจริง ห้ามแต่ง (ผลกระทบ: Perceived Likelihood ต้องพึ่งตัวเลข+กระบวนการแทน)
- **ไม่มี countdown/urgency ปลอม** — ตาม brief

## สถานะ production (ณ Gate E)

- URL: https://cmh-logistics-x1ry.vercel.app/import-china (HTTP 200)
- branch `claude/github-copy-prep-pd8cag` = production branch ของ Vercel (repo ยังไม่มี `main`)
- `/api/health` → `catalogs: ["import-china"]` ✅ · `hubspotStages.ready: true` ✅
- ❌ `envReady: false` — ยังไม่มี `HUBSPOT_PRIVATE_APP_TOKEN` ใน Vercel → **ฟอร์มยังส่ง lead ไม่ได้**
- ⚠️ มี Vercel project ซ้ำผูก repo เดียวกัน: `cmh-logistics` (ไม่ได้ใช้) และ `cmh-logistics-x1ry` (ตัวจริง)
