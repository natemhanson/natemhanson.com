"use client";

import { useCallback, useSyncExternalStore } from "react";
import {
  THEME_KEY,
  COLORBLIND_KEY,
  applyAppearance,
  getPreferredTheme,
  getStoredColorblind,
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

function getColorblindSnapshot(): boolean {
  return getStoredColorblind();
}

function getServerTheme(): ThemeMode {
  return "light";
}

function getServerColorblind(): boolean {
  return false;
}

function MoonIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M20.5 14.2A8.2 8.2 0 0 1 9.8 3.5 7.5 7.5 0 1 0 20.5 14.2Z"
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
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.8" />
      <path
        d="M12 2.5v2.2M12 19.3v2.2M2.5 12h2.2M19.3 12h2.2M5.1 5.1l1.6 1.6M17.3 17.3l1.6 1.6M18.9 5.1l-1.6 1.6M6.7 17.3l-1.6 1.6"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

function VisionIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="3.2" stroke="currentColor" strokeWidth="1.8" />
      <path
        d="M2.8 12S6.4 5.8 12 5.8 21.2 12 21.2 12 17.6 18.2 12 18.2 2.8 12 2.8 12Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function AppearanceControls() {
  const theme = useSyncExternalStore(subscribe, getThemeSnapshot, getServerTheme);
  const colorblind = useSyncExternalStore(
    subscribe,
    getColorblindSnapshot,
    getServerColorblind,
  );

  const toggleTheme = useCallback(() => {
    const next: ThemeMode = theme === "dark" ? "light" : "dark";
    window.localStorage.setItem(THEME_KEY, next);
    applyAppearance(next, colorblind);
    emit();
  }, [theme, colorblind]);

  const toggleColorblind = useCallback(() => {
    const next = !colorblind;
    window.localStorage.setItem(COLORBLIND_KEY, next ? "on" : "off");
    applyAppearance(theme, next);
    emit();
  }, [theme, colorblind]);

  return (
    <div className={styles.controls} role="group" aria-label="Appearance">
      <button
        type="button"
        className={styles.button}
        aria-pressed={theme === "dark"}
        aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
        title={theme === "dark" ? "Light mode" : "Dark mode"}
        onClick={toggleTheme}
      >
        {theme === "dark" ? <SunIcon /> : <MoonIcon />}
      </button>
      <button
        type="button"
        className={styles.button}
        aria-pressed={colorblind}
        aria-label={
          colorblind ? "Turn off colorblind-friendly mode" : "Turn on colorblind-friendly mode"
        }
        title="Colorblind-friendly colors"
        onClick={toggleColorblind}
      >
        <VisionIcon />
      </button>
    </div>
  );
}
