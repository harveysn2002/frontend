/**
 * Storefront niche switch.
 *
 * `comfort` = the original neck/back/joint support store.
 * `watches` = the VORLAY watches store.
 *
 * Set NEXT_PUBLIC_NICHE=watches for the watches storefront.
 * Default is comfort (neck/back). Brand colors stay steel + champagne.
 */
export type NicheId = "comfort" | "watches";

const DEFAULT_NICHE: NicheId = "comfort";

function resolveNiche(): NicheId {
  const raw = (process.env.NEXT_PUBLIC_NICHE || "").trim().toLowerCase();
  return raw === "comfort" || raw === "watches" ? raw : DEFAULT_NICHE;
}

export const activeNiche: NicheId = resolveNiche();

export const isWatchesNiche = activeNiche === "watches";
export const isComfortNiche = activeNiche === "comfort";

/** Picks the value that matches the active niche. */
export function byNiche<T>(options: Record<NicheId, T>): T {
  return options[activeNiche];
}
