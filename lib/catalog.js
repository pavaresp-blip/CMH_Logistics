import { loadCatalogFor } from './pages.js';

/** คืน null ถ้าไม่มี sku นี้ในหน้านั้น — ห้าม fallback เป็นราคาอื่น */
export function findOffer(catalog, sku) {
  if (!catalog || typeof sku !== 'string') return null;
  return catalog.offers.find((o) => o.sku === sku) || null;
}

export const isValidLocation = (catalog, id) =>
  Boolean(catalog?.locations?.some((l) => l.id === id));
export const isValidService = (catalog, id) =>
  Boolean(catalog?.services?.some((s) => s.id === id));
export const propName = (catalog, short) => `${catalog.propertyPrefix}_${short}`;

/**
 * หน้านี้ไม่ให้ผู้ใช้เลือก "บริการที่สนใจ" ซ้ำในฟอร์ม (ตาม lead-form.md ที่ให้เก็บแค่ 3 ช่อง)
 * → เอา service จาก sku ที่เขากดมาจากการ์ดราคาแทน
 */
export function serviceFromOffer(catalog, offer) {
  if (!offer?.service) return null;
  return isValidService(catalog, offer.service) ? offer.service : null;
}

export { loadCatalogFor };
