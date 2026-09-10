/**
 * POST /api/lead — รับฟอร์มขอใบเสนอราคา → HubSpot Contact + Deal
 *
 * โปรเจกต์นี้ไม่มีขั้นชำระเงิน (freight คิดราคา quote รายเคส)
 * lead จบที่นี่ ทีมงานติดต่อกลับเพื่อออกใบเสนอราคา
 *
 * body: { page, name, email, phone, sku }
 * ราคา/บริการ อ่านจาก catalog.json ฝั่ง server เท่านั้น — browser ส่งมาแค่ sku
 */
import { loadCatalogFor, findOffer, propName, serviceFromOffer } from '../lib/catalog.js';
import { upsertContact, createDealWithStage } from '../lib/hubspot.js';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

async function readBody(req) {
  if (req.body && typeof req.body === 'object') return req.body;
  const chunks = [];
  for await (const c of req) chunks.push(c);
  const raw = Buffer.concat(chunks).toString('utf8');
  try { return raw ? JSON.parse(raw) : {}; } catch { return {}; }
}

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');
  if (req.method !== 'POST') {
    return res.status(405).json({ ok: false, error: 'ใช้ POST เท่านั้น' });
  }

  const body = await readBody(req);

  // 1) หาว่ามาจากหน้าไหน แล้วโหลด catalog ของหน้านั้น
  const page = String(body.page || '').trim();
  const catalog = loadCatalogFor(page);
  if (!catalog) {
    return res.status(400).json({ ok: false, error: 'ไม่รู้ว่ามาจากหน้าไหน ลองรีเฟรชหน้าแล้วส่งใหม่' });
  }

  // 2) validate ฝั่ง server ซ้ำกับ client เสมอ
  const name = String(body.name || '').trim();
  const email = String(body.email || '').trim().toLowerCase();
  const phoneRaw = String(body.phone || '').trim();
  const phone = phoneRaw.replace(/[\s-]/g, '');

  const errors = {};
  if (name.length < 2) errors.name = 'กรอกชื่อของคุณด้วย จะได้เรียกถูกตอนติดต่อกลับ';
  if (!EMAIL_RE.test(email)) errors.email = 'อีเมลยังไม่ถูกรูปแบบ ตรวจดูอีกครั้ง เช่น name@company.com';
  if (!/^\d{9,10}$/.test(phone)) errors.phone = 'เบอร์โทรต้องเป็นตัวเลข 9–10 หลัก ไม่ต้องใส่ขีด';

  const offer = findOffer(catalog, String(body.sku || '').trim());
  if (!offer) errors.sku = 'ไม่พบบริการนี้ ลองเลือกใหม่อีกครั้ง';

  if (Object.keys(errors).length) return res.status(400).json({ ok: false, errors });

  // 3) ยิงเข้า HubSpot
  try {
    const contact = await upsertContact({ email, firstname: name, phone });

    const service = serviceFromOffer(catalog, offer);
    const properties = {
      dealname: `${catalog.brand} — ${offer.name} — ${name}`,
      amount: String(offer.price),                       // จาก catalog ไม่ใช่ body
      [propName(catalog, 'package')]: offer.sku,
      [propName(catalog, 'source_page')]: page,
      ...(service ? { [propName(catalog, 'service_interest')]: service } : {}),
    };

    const deal = await createDealWithStage(properties, contact.id, catalog.hubspot);

    return res.status(200).json({
      ok: true,
      contactId: contact.id,
      dealId: deal.id,
      offer: { sku: offer.sku, name: offer.name },
    });
  } catch (err) {
    // log ไว้ debug ได้ แต่ไม่ส่งรายละเอียดระบบกลับไปที่ client
    console.error('[lead] ส่งเข้า HubSpot ไม่สำเร็จ:', err.status || '', err.message, err.body || '');
    return res.status(502).json({
      ok: false,
      error: 'ส่งข้อมูลไม่สำเร็จ ลองใหม่อีกครั้ง หรือติดต่อเราทาง LINE @CMHlogistics · โทร 064-554-6655',
    });
  }
}
