import { byNiche } from "@/config/niche";

/**
 * Visual tokens per niche. Comfort = original teal/ivory store.
 * Watches = charcoal steel + champagne boutique.
 * Applied as CSS variables on <html data-niche="...">.
 */
export type NicheTheme = {
  primary: string;
  dark: string;
  soft: string;
  gold: string;
  ivory: string;
  ink: string;
  muted: string;
  pageBg: string;
  pageGlow: string;
  selection: string;
  glassBorder: string;
};

/** Original comfort look: teal + warm ivory */
export const comfortTheme: NicheTheme = {
  primary: "#0F766E",
  dark: "#115E59",
  soft: "#CCFBF1",
  gold: "#C9A24A",
  ivory: "#FFF7ED",
  ink: "#1F2933",
  muted: "#667085",
  pageBg: "#fff7ed",
  pageGlow: "rgba(204, 251, 241, 0.55)",
  selection: "#ccfbf1",
  glassBorder: "rgba(15, 118, 110, 0.14)",
};

/** Charcoal steel + champagne — watches boutique */
export const watchesTheme: NicheTheme = {
  primary: "#1A2332",
  dark: "#0F1621",
  soft: "#E8EAED",
  gold: "#B8956C",
  ivory: "#F3F1EC",
  ink: "#121820",
  muted: "#6B7280",
  pageBg: "#f3f1ec",
  pageGlow: "rgba(184, 149, 108, 0.22)",
  selection: "#e8eaed",
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
    "--brand-ivory": theme.ivory,
    "--brand-ink": theme.ink,
    "--brand-muted": theme.muted,
    "--page-bg": theme.pageBg,
    "--page-glow": theme.pageGlow,
    "--selection": theme.selection,
    "--glass-border": theme.glassBorder,
  };
}
