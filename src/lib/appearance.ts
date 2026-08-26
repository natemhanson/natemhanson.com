export type ThemeMode = "light" | "dark";

export const THEME_KEY = "nate-theme";
export const COLORBLIND_KEY = "nate-colorblind";

export function getPreferredTheme(): ThemeMode {
  if (typeof window === "undefined") return "light";
  const stored = window.localStorage.getItem(THEME_KEY);
  if (stored === "light" || stored === "dark") return stored;
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

export function getStoredColorblind(): boolean {
  if (typeof window === "undefined") return false;
  return window.localStorage.getItem(COLORBLIND_KEY) === "on";
}

export function applyAppearance(theme: ThemeMode, colorblind: boolean) {
  const root = document.documentElement;
  root.dataset.theme = theme;
  if (colorblind) {
    root.dataset.colorblind = "on";
  } else {
    delete root.dataset.colorblind;
  }
}
