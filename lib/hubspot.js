/**
 * HubSpot REST wrapper — ห้าม log ค่า token เด็ดขาด
 */
const BASE = 'https://api.hubapi.com';

async function hs(path, { method = 'GET', body } = {}) {
  const token = process.env.HUBSPOT_PRIVATE_APP_TOKEN;
  if (!token) {
    const err = new Error('ยังไม่ได้ตั้ง HUBSPOT_PRIVATE_APP_TOKEN ใน Vercel');
    err.status = 500;
    throw err;
  }
  const res = await fetch(BASE + path, {
    method,
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    ...(body ? { body: JSON.stringify(body) } : {}),
  });

  const text = await res.text();
  let parsed = null;
  try { parsed = text ? JSON.parse(text) : null; } catch { /* ไม่ใช่ JSON */ }

  if (!res.ok) {
    const err = new Error(`HubSpot ${res.status} ${path}`);
    err.status = res.status;
    err.body = parsed;
    throw err;
  }
  return parsed;
}

/** contact ที่มีอยู่แล้วจะได้ 409 → search แล้ว PATCH (ห้ามใช้ batch/upsert ด้วย email) */
export async function upsertContact({ email, firstname, phone }) {
  const properties = {
    email,
    ...(firstname && { firstname }),
    ...(phone && { phone }),
  };
  try {
    const created = await hs('/crm/v3/objects/contacts', { method: 'POST', body: { properties } });
    return { id: created.id, created: true };
  } catch (err) {
    if (err.status !== 409) throw err;
    let id = String(err.body?.message || '').match(/(\d{4,})/)?.[1] || null;
    if (!id) {
      const found = await hs('/crm/v3/objects/contacts/search', {
        method: 'POST',
        body: {
          filterGroups: [{ filters: [{ propertyName: 'email', operator: 'EQ', value: email }] }],
          properties: ['email'],
          limit: 1,
        },
      });
      id = found?.results?.[0]?.id || null;
    }
    if (!id) throw new Error('contact ซ้ำแต่หา id ไม่เจอ');
    await hs(`/crm/v3/objects/contacts/${id}`, { method: 'PATCH', body: { properties } });
    return { id, created: false };
  }
}

export async function createDeal(properties, contactId, associationTypeId = 3) {
  return hs('/crm/v3/objects/deals', {
    method: 'POST',
    body: {
      properties,
      associations: [
        {
          to: { id: String(contactId) },
          types: [{ associationCategory: 'HUBSPOT_DEFINED', associationTypeId }],
        },
      ],
    },
  });
}

/**
 * stage id อยู่ใน catalog.json ที่ deploy ไป ซึ่งอาจเก่ากว่าของจริงใน HubSpot
 * (ผู้ใช้แก้ pipeline ทีหลังได้) → ถ้า 400 เรื่อง stage ให้สร้าง deal โดยไม่ระบุสเตจ
 * **lead หายเพราะสเตจผิด คือกรณีที่แย่ที่สุด — ยอมได้สเตจ default ดีกว่าไม่ได้ lead**
 */
export async function createDealWithStage(baseProperties, contactId, hubspot) {
  const withStage = {
    ...baseProperties,
    ...(hubspot.pipeline ? { pipeline: hubspot.pipeline } : {}),
    ...(hubspot.stageOnLead ? { dealstage: hubspot.stageOnLead } : {}),
  };
  try {
    return await createDeal(withStage, contactId, hubspot.dealToContactAssociationTypeId ?? 3);
  } catch (err) {
    const msg = String(err.body?.message || err.message || '');
    if (err.status !== 400 || !/dealstage|pipeline/i.test(msg)) throw err;
    console.error('[lead] stage ใน catalog ใช้ไม่ได้ → สร้าง deal โดยไม่ระบุสเตจ:', msg);
    return createDeal(baseProperties, contactId, hubspot.dealToContactAssociationTypeId ?? 3);
  }
}
