# Assets Manifest — หน้า import-china

> **source ทั้งหมด = Pixabay** (Pixabay Content License · ใช้เชิงพาณิชย์ได้ ไม่ต้องให้เครดิต)
> **ไม่ได้ใช้ KIE.ai** — key ที่ได้มาจากคลาสตอบ 401 (ดู `context/brand-identity/moodboard-prompt.txt`)
> ทุกใบคัดตาม photography direction ใน `visual-guideline.md` และเลี่ยงลักษณะที่ห้ามใช้

| filename | section | ขนาด | น้ำหนัก | alt (ไทย) | source |
|---|---|---|---|---|---|
| `hero-01.webp` | 1 Hero | 1400×788 (16:9) | 168KB | ลานตู้คอนเทนเนอร์ที่ท่าเรือ มองจากมุมสูง | Pixabay #2568196 · StockSnap |
| `usp-01.webp` | 4 Solution/USP | 800×600 (4:3) | 125KB | ตู้คอนเทนเนอร์เรียงซ้อนกันที่ลานพักตู้ | Pixabay #1601917 · 2427999 |
| `svc-01.webp` | 5 Services — FCL | 800×600 (4:3) | 75KB | เครนยกตู้คอนเทนเนอร์ขึ้นเรือที่ท่าเรือ | Pixabay #1097206 · patrickbaum |
| `svc-02.webp` | 5 Services — LCL | 600×600 (1:1) | 90KB | สินค้าจัดเก็บในคลังสินค้า รอรวมตู้ | Pixabay #4395773 · jotoler |
| `svc-03.webp` | 5 Services — พิธีการ | 600×600 (1:1) | 68KB | ทีมงานกำลังตรวจเอกสารบนโต๊ะทำงาน มองจากมุมสูง | Pixabay #2284501 · mwitt1337 |
| `svc-04.webp` | 5 Services — door-to-door | 800×600 (4:3) | 31KB | รถบรรทุกขนส่งสินค้าบนถนน | Pixabay #2946821 · 6734180 |
| `route-01.webp` | 9 เส้นทาง | 1400×600 (21:9) | 86KB | เรือคอนเทนเนอร์กลางทะเลระหว่างเดินทาง | Pixabay #105596 · Peter_Lindenau |
| `cta-01.webp` | 12 Final CTA | 1200×675 (16:9) | 93KB | ท่าเรือขนส่งสินค้าระหว่างประเทศช่วงเย็น | Pixabay #4020042 · ronaldlau |
| `og-image.jpg` | `<head>` OG/Twitter | 1200×630 | 129KB | — (มีข้อความไทยบนภาพ) | ประกอบเองจาก hero + Playwright |
| `favicon.png` | `<head>` | 32×32 | 1KB | — | ประกอบเอง (ตัวอักษร CMH) |

**รวมทั้งหมด: 888KB** (เป้า ≤3MB ต่อหน้า ✅ · hero ≤200KB ✅ · section ≤150KB ✅ · card ≤80KB — `svc-02` 90KB เกินเล็กน้อยแต่ยังต่ำกว่าเป้ารวมมาก)

## ตรวจกับ visual-guideline.md
- ✅ ทุกใบเป็นท่าเรือ/ตู้/เครน/เรือ/รถบรรทุก/คลัง ตาม photography direction
- ✅ `hero-01` และ `svc-03` เป็นมุมสูง = ลายเซ็นของแบรนด์
- ✅ `svc-03` คนกำลังทำงานกับเอกสารจริง ไม่ยิ้มใส่กล้อง
- ✅ ไม่มีเรือสำราญ/รีสอร์ต/3D เรนเดอร์/ลูกโลกเส้นเชื่อม/ภาพ AI
- ✅ ชื่อไฟล์ web-safe: ตัวเล็ก a–z 0–9 - . เท่านั้น ไม่มีอักษรไทย ไม่มีเว้นวรรค
- ⚠️ tint กรมท่าจะใส่ด้วย CSS overlay ตอน build (ไม่ได้เบิร์นลงไฟล์ เพื่อให้ปรับได้ทีหลัง)
