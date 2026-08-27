import { byNiche } from "@/config/niche";

/**
 * Visual tokens per niche. Comfort = VORLAY teal / ivory / gold brand.
 * Watches = charcoal steel + champagne boutique.
 * Applied as CSS variables on <html data-niche="...">.
 */
export type NicheTheme = {
  primary: string;
  dark: string;
  soft: string;
  gold: string;
  goldSoft: string;
  ivory: string;
  sand: string;
  ink: string;
  muted: string;
  border: string;
  error: string;
  success: string;
  pageBg: string;
  pageGlow: string;
  selection: string;
  glassBorder: string;
};

/** VORLAY comfort brand: Deep Teal + Warm Gold + Ivory */
export const comfortTheme: NicheTheme = {
  primary: "#0F766E",
  dark: "#115E59",
  soft: "#CCFBF1",
  gold: "#C9A24A",
  goldSoft: "#F7E7B4",
  ivory: "#FFF7ED",
  sand: "#F5EFE6",
  ink: "#1F2933",
  muted: "#667085",
  border: "#E7DDD0",
  error: "#B42318",
  success: "#067647",
  pageBg: "#FFF7ED",
  pageGlow: "rgba(204, 251, 241, 0.55)",
  selection: "#CCFBF1",
  glassBorder: "rgba(15, 118, 110, 0.14)",
};

/** Charcoal steel + champagne — watches boutique */
export const watchesTheme: NicheTheme = {
  primary: "#1A2332",
  dark: "#0F1621",
  soft: "#E8EAED",
  gold: "#B8956C",
  goldSoft: "#F0E6D8",
  ivory: "#F3F1EC",
  sand: "#EDE9E3",
  ink: "#121820",
  muted: "#6B7280",
  border: "#E5E1DA",
  error: "#B42318",
  success: "#067647",
  pageBg: "#F3F1EC",
  pageGlow: "rgba(184, 149, 108, 0.22)",
  selection: "#E8EAED",
  glassBorder: "rgba(26, 35, 50, 0.12)",
};

export const activeTheme: NicheTheme = byNiche({
  comfort: comfortTheme,
  watches: watchesTheme,
});

export function themeCssVars(theme: NicheTheme = activeTheme): Record<string, string> {
  return {
    "--brand-primary": theme.primary,
    "--brand-dark": theme.dark,
    "--brand-soft": theme.soft,
    "--brand-gold": theme.gold,
    "--brand-gold-soft": theme.goldSoft,
    "--brand-ivory": theme.ivory,
    "--brand-sand": theme.sand,
    "--brand-ink": theme.ink,
    "--brand-muted": theme.muted,
    "--brand-border": theme.border,
    "--brand-error": theme.error,
    "--brand-success": theme.success,
    "--page-bg": theme.pageBg,
    "--page-glow": theme.pageGlow,
    "--selection": theme.selection,
    "--glass-border": theme.glassBorder,
  };
}
