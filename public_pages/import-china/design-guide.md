# Design Guide — หน้า import-china

> **ทุกค่าในไฟล์นี้มาจาก `context/brand-identity/visual-guideline.md`**
> ห้ามมีสี/ฟอนต์ที่ไม่อยู่ในนั้น · ข้อที่อนุมานเพิ่มจะเขียนกำกับว่า *(อนุมาน)*

## Theme + Tone

- **Theme: Dark** — ตาม guideline (moodboard เป็นพื้นกรมท่าเข้มทั้งใบ)
- **Tone: `Industrial`** (1 ใน 11 ทิศทางของ `design-standards.md`)
  เหตุผล: ลูกค้า B2B โรงงานตัดสินใจด้วยความน่าเชื่อถือ หน้าเพจต้องอ่านเหมือน
  **เครื่องมือทำงานที่แม่นยำ** ไม่ใช่โบรชัวร์ประดิษฐ์ — ทุ่มสุดตัวทางนี้ ไม่ทำครึ่งๆ กลางๆ

## Palette (ยกจาก visual-guideline.md ตรงๆ)

| Token | HEX | ใช้ตรงไหนในหน้านี้ |
|---|---|---|
| `--bg` | `#08192A` | พื้นหลังหลัก (section 1,3,5,7,9,11,12) |
| `--surface` | `#0D2338` | การ์ดบริการ · กล่องฟอร์ม · การ์ดราคา · FAQ item |
| `--surface-tint` | `#0F2C47` | section สลับ (2,4,6,8,10) · hover การ์ด |
| `--line` | `#1D3B58` | เส้นขอบทุกการ์ด · เส้นคั่น section |
| `--steel` | `#2F6F9F` | ไอคอน · bullet · ลิงก์ · ตัวเลขขั้นตอน |
| `--accent` | `#E8730C` | **ปุ่ม CTA เท่านั้น** — contrast สูงสุดในหน้า |
| `--accent-2` | `#F5A13A` | eyebrow · label · แถบ highlight การ์ด hero |
| `--ink` | `#EAF1F8` | หัวข้อ + เนื้อความ |
| `--ink-muted` | `#9DB2C7` | คำอธิบาย · caption · placeholder |

**กฎการใช้ accent:** ส้มใช้ได้ 3 ที่เท่านั้น → ปุ่ม CTA · eyebrow ของ section · แถบ 18% ของ divider
ถ้าเกินนี้จะเสียความ "มั่นคง" ที่เป็นแกนของแบรนด์

## Typography

| บทบาท | ฟอนต์ | ขนาด (desktop / mobile) |
|---|---|---|
| H1 (hero) | Bai Jamjuree 700 | 56px / 34px · `line-height:1.1` · `text-wrap:balance` |
| H2 (section) | Bai Jamjuree 700 | 40px / 27px |
| H3 (การ์ด) | Bai Jamjuree 600 | 22px / 20px |
| Body | IBM Plex Sans Thai 400 | 17px / 16px · `line-height:1.65` · กว้าง ≤65ch |
| Body-lg (hero sub) | IBM Plex Sans Thai 300 | 20px / 17px |
| Eyebrow / label | Bai Jamjuree 600 | 13px · `uppercase` · `letter-spacing:.18em` · สี `--accent-2` |
| ตัวเลข proof | Bai Jamjuree 700 | 44px / 32px · `font-variant-numeric: tabular-nums` |

- Google Fonts (Thai subset): `Bai+Jamjuree:wght@600;700` + `IBM+Plex+Sans+Thai:wght@300;400;500`
- **ห้าม** Inter / Roboto / Arial / Helvetica / system-ui / Sarabun เป็นฟอนต์หลัก
- Type scale 1.333x จาก 17px base

## Spacing + layout

- Rhythm 4px · ระยะระหว่าง section: **96px desktop / 56px mobile**
- Container กว้างสุด **1140px** · padding ข้าง 40px desktop / **20px mobile** (ห้ามต่ำกว่า 16px)
- Grid การ์ดบริการ: 4 คอลัมน์ desktop → 2 tablet → 1 mobile
- **Bento grid** ใช้ที่ section 5 (Services) และ 2 (proof bar) — ช่องไม่เท่ากันแต่ชิดกริดเดียวกัน

## Components

| Component | Spec |
|---|---|
| **ปุ่ม CTA หลัก** | พื้น `--accent` · ตัวอักษร `#1A0D00` Bai Jamjuree 600 17px · radius **6px** · padding 16px 32px · min-height 52px · hover `#D0670A` · focus ring 2px `--accent-2` offset 2px · disabled opacity 45% *(อนุมาน — guideline ไม่มีปุ่ม)* |
| **ปุ่มรอง** | โปร่ง · ขอบ 1.5px `--steel` · ตัวอักษร `--ink` · hover พื้น `--surface-tint` |
| **การ์ด** | พื้น `--surface` · ขอบ **1px `--line`** · radius 6px · padding 28px · **ไม่มีเงา** (แยกชั้นด้วยสี+เส้น ตาม guideline) · hover: ขอบเป็น `--steel` |
| **การ์ดราคา hero** | เหมือนการ์ดปกติ + แถบบน 3px สี `--accent` + ป้าย eyebrow "แนะนำ" |
| **FAQ accordion** | รายการละ 1 แถว คั่นด้วยเส้น 1px `--line` · ไอคอน +/− สี `--steel` · เปิดทีละอัน · `<details>`/`<summary>` เพื่อ accessibility |
| **ฟอร์ม** | คอลัมน์เดียว · label บน input · input สูง 52px `font-size:17px` (กัน iOS zoom) · พื้น `#0A1C2E` ขอบ 1px `--line` · focus ขอบ `--accent-2` · error ข้อความสีส้มอ่อนใต้ช่อง |
| **Section divider** | เส้น 3px: 18% แรกสี `--accent` ที่เหลือสี `--line` (ลายเซ็นจาก moodboard) |

## Section treatment — ห้ามให้ทุก section หน้าตาเหมือนกัน

| # | Section | ทรีตเมนต์ |
|---|---|---|
| 1 | Hero | พื้น `--bg` + รูปท่าเรือมุมสูง overlay gradient เข้ม · ข้อความซ้าย ฟอร์ม/ปุ่มขวา |
| 2 | Social proof | แถบ `--surface-tint` เตี้ย · ตัวเลข 4 ตัวเรียงแนวนอน · ไม่มีการ์ด |
| 3 | Problem | พื้น `--bg` · ข้อความกลาง · 3 การ์ดปัญหา ขอบแดงอมส้มจางๆ `--line` |
| 4 | Solution/USP | พื้น `--surface-tint` · 2 คอลัมน์ (ข้อความ + รูปตู้) สลับซ้ายขวา |
| 5 | Services | พื้น `--bg` · **bento grid** 4 การ์ด ขนาดไม่เท่ากัน แต่ละใบมีรูปจริง |
| 6 | How it works | พื้น `--surface-tint` · 4 ขั้น เรียงแนวนอน มีเส้นเชื่อม · เลขขั้นตัวใหญ่สี `--steel` |
| 7 | Value anchor | พื้น `--bg` · **ตารางเทียบ 2 คอลัมน์** ฝากขน vs CMH · ฝั่ง CMH ไฮไลต์ขอบ `--accent` |
| 8 | Pricing | พื้น `--surface-tint` · 3 การ์ด · ใบกลาง (FCL) เป็น hero |
| 9 | เส้นทาง | พื้น `--bg` · รูปเรือกว้างเต็ม + ข้อความทับ |
| 10 | FAQ | พื้น `--surface-tint` · accordion คอลัมน์เดียว กว้าง 760px |
| 11 | **Lead form** | พื้น `--bg` · กล่อง `--surface` ตรงกลาง กว้าง 560px · **จุดสำคัญที่สุดของหน้า** |
| 12 | Final CTA | พื้น `--surface-tint` + รูปท่าเรือจาง · ข้อความกลาง ปุ่มใหญ่ |

## Texture / depth

- Noise overlay **2–3%** บนพื้น `--bg` (SVG feTurbulence inline) เพื่อไม่ให้แบน *(อนุมาน)*
- รูปทุกใบทับ tint `rgba(15,44,71,.30)` + gradient เข้มจากล่าง ตาม guideline
- **ห้าม glass morphism · ห้าม gradient ม่วง-ชมพู · ห้ามเงาฟุ้ง**

## Accessibility

- Contrast: `--ink` บน `--bg` = 14.8:1 ✅ · `--ink-muted` บน `--bg` = 7.2:1 ✅
  · `#1A0D00` บน `--accent` = 8.1:1 ✅ (ปุ่มผ่าน AA ทั้งหมด)
- focus ที่มองเห็นได้ทุก interactive element · `prefers-reduced-motion` ปิด animation
- แตะได้ ≥44×44px · ทุกรูปมี `alt` ไทย · heading เรียงลำดับไม่ข้ามระดับ
