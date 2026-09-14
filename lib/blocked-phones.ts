import { normalizeMoroccanMobile } from "@/lib/phone";

/** Local 06/07 numbers blocked from checkout (spam / fake COD). */
const BLOCKED_LOCAL_PHONES = new Set(["0784735891"]);

export function isBlockedCheckoutPhone(input: string) {
  const normalized = normalizeMoroccanMobile(input);
  if (!normalized) return false;
  return BLOCKED_LOCAL_PHONES.has(normalized.local);
}
