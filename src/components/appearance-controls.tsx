"use client";

import { useEffect, useId, useRef, useState, useSyncExternalStore } from "react";
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

function SettingsIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.8" />
      <path
        d="M12 3.2v1.8M12 19v1.8M4.9 6.4l1.3 1.3M17.8 16.3l1.3 1.3M3.2 12h1.8M19 12h1.8M4.9 17.6l1.3-1.3M17.8 7.7l1.3-1.3"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
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
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const menuId = useId();

  useEffect(() => {
    if (!open) return;

    function onPointerDown(event: PointerEvent) {
      const root = rootRef.current;
      if (!root) return;
      if (event.target instanceof Node && !root.contains(event.target)) {
        setOpen(false);
      }
    }

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }

    window.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  function toggleTheme() {
    const next: ThemeMode = theme === "dark" ? "light" : "dark";
    window.localStorage.setItem(THEME_KEY, next);
    applyAppearance(next, colorblind);
    emit();
  }

  function toggleColorblind() {
    const next = !colorblind;
    window.localStorage.setItem(COLORBLIND_KEY, next ? "on" : "off");
    applyAppearance(theme, next);
    emit();
  }

  return (
    <div className={styles.controls} ref={rootRef}>
      <button
        type="button"
        className={styles.trigger}
        aria-label="Appearance settings"
        aria-haspopup="true"
        aria-expanded={open}
        aria-controls={menuId}
        title="Appearance"
        onClick={() => setOpen((value) => !value)}
      >
        <SettingsIcon />
      </button>

      {open ? (
        <div className={styles.menu} id={menuId} role="menu" aria-label="Appearance">
          <button
            type="button"
            className={styles.item}
            role="menuitemcheckbox"
            aria-checked={theme === "dark"}
            onClick={toggleTheme}
          >
            <span>Dark mode</span>
            <span className={styles.switch} data-on={theme === "dark" ? "true" : "false"} />
          </button>
          <button
            type="button"
            className={styles.item}
            role="menuitemcheckbox"
            aria-checked={colorblind}
            onClick={toggleColorblind}
          >
            <span>Colorblind mode</span>
            <span className={styles.switch} data-on={colorblind ? "true" : "false"} />
          </button>
        </div>
      ) : null}
    </div>
  );
}
