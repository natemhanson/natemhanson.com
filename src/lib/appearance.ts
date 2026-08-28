export type ThemeMode = "light" | "dark";

export const THEME_KEY = "nate-theme";

export function getPreferredTheme(): ThemeMode {
  if (typeof window === "undefined") return "light";
  return window.localStorage.getItem(THEME_KEY) === "dark" ? "dark" : "light";
}

export function applyAppearance(theme: ThemeMode) {
  document.documentElement.dataset.theme = theme;
}
