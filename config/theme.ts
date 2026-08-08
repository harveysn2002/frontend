import { byNiche } from "@/config/niche";

/**
 * Visual tokens. Both niches share the current VORLAY brand palette
 * (charcoal steel + champagne gold). Teal comfort colors are retired.
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

/** Shared brand look: charcoal steel + champagne */
export const brandTheme: NicheTheme = {
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

export const comfortTheme: NicheTheme = brandTheme;
export const watchesTheme: NicheTheme = brandTheme;

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
