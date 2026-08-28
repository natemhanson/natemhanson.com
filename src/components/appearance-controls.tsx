"use client";

import { useSyncExternalStore } from "react";
import {
  THEME_KEY,
  applyAppearance,
  getPreferredTheme,
  type ThemeMode,
} from "@/lib/appearance";
import styles from "./appearance-controls.module.css";

const listeners = new Set<() => void>();

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function emit() {
  for (const listener of listeners) listener();
}

function getThemeSnapshot(): ThemeMode {
  return getPreferredTheme();
}

function getServerTheme(): ThemeMode {
  return "light";
}

function MoonIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M20 14.2A8.2 8.2 0 0 1 9.8 4a8.4 8.4 0 1 0 10.2 10.2Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function SunIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.8" />
      <path
        d="M12 2.6v2.1M12 19.3v2.1M4.2 4.2l1.5 1.5M18.3 18.3l1.5 1.5M2.6 12h2.1M19.3 12h2.1M4.2 19.8l1.5-1.5M18.3 5.7l1.5-1.5"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function AppearanceControls() {
  const theme = useSyncExternalStore(subscribe, getThemeSnapshot, getServerTheme);
  const isDark = theme === "dark";

  function toggleTheme() {
    const next: ThemeMode = isDark ? "light" : "dark";
    window.localStorage.setItem(THEME_KEY, next);
    applyAppearance(next);
    emit();
  }

  return (
    <div className={styles.controls}>
      <button
        type="button"
        className={styles.trigger}
        aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
        aria-pressed={isDark}
        title={isDark ? "Light mode" : "Dark mode"}
        onClick={toggleTheme}
      >
        {isDark ? <SunIcon /> : <MoonIcon />}
      </button>
    </div>
  );
}
