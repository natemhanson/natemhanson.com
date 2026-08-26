"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./ambient-play.module.css";

type Mote = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  base: number;
  phase: number;
  caught: boolean;
  catchFlash: number;
};

type Pointer = {
  x: number;
  y: number;
  active: boolean;
  coarse: boolean;
};

const DESKTOP_COUNT = 28;
const MOBILE_COUNT = 18;

/* Game palette is fixed and independent of dark / colorblind appearance modes. */
const PLAY_RGB_LIGHT = "132, 142, 88";
const PLAY_RGB_DARK = "186, 198, 148";

function createMotes(width: number, height: number, count: number): Mote[] {
  return Array.from({ length: count }, () => ({
    x: Math.random() * width,
    y: Math.random() * height,
    vx: (Math.random() - 0.5) * 0.18,
    vy: (Math.random() - 0.5) * 0.18,
    r: 1.2 + Math.random() * 2.4,
    base: 0.18 + Math.random() * 0.22,
    phase: Math.random() * Math.PI * 2,
    caught: false,
    catchFlash: 0,
  }));
}

function playRgb(): string {
  return document.documentElement.dataset.theme === "dark"
    ? PLAY_RGB_DARK
    : PLAY_RGB_LIGHT;
}

export function AmbientPlay() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [whisper, setWhisper] = useState<string | null>(null);
  const whisperTimer = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const pointer: Pointer = {
      x: window.innerWidth / 2,
      y: window.innerHeight / 2,
      active: false,
      coarse: window.matchMedia("(pointer: coarse)").matches,
    };

    let width = 0;
    let height = 0;
    let dpr = 1;
    const motes = createMotes(
      window.innerWidth,
      window.innerHeight,
      pointer.coarse ? MOBILE_COUNT : DESKTOP_COUNT,
    );
    let collected = 0;
    let frame = 0;
    let running = true;
    let raf = 0;
    let rgb = playRgb();

    const showWhisper = (text: string) => {
      setWhisper(text);
      if (whisperTimer.current) window.clearTimeout(whisperTimer.current);
      whisperTimer.current = window.setTimeout(() => setWhisper(null), 2200);
    };

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      rgb = playRgb();
    };

    const onPointerMove = (event: PointerEvent) => {
      pointer.x = event.clientX;
      pointer.y = event.clientY;
      pointer.active = true;
    };

    const onPointerDown = (event: PointerEvent) => {
      pointer.x = event.clientX;
      pointer.y = event.clientY;
      pointer.active = true;
      pointer.coarse = event.pointerType === "touch" || pointer.coarse;
    };

    const onPointerUp = () => {
      if (pointer.coarse) pointer.active = false;
    };

    const onPointerLeave = () => {
      if (!pointer.coarse) pointer.active = false;
    };

    // Only follow light/dark for mote visibility, never colorblind mode.
    const themeObserver = new MutationObserver(() => {
      rgb = playRgb();
    });
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });

    const tick = () => {
      if (!running) return;
      frame += 1;
      ctx.clearRect(0, 0, width, height);

      for (const mote of motes) {
        const dx = mote.x - pointer.x;
        const dy = mote.y - pointer.y;
        const dist = Math.hypot(dx, dy) || 1;

        if (pointer.coarse) {
          // Mobile: soft gathering toward touch, then gentle drift
          if (pointer.active && dist < 180) {
            const pull = (1 - dist / 180) * 0.045;
            mote.vx += (pointer.x - mote.x) * pull * 0.02;
            mote.vy += (pointer.y - mote.y) * pull * 0.02;
          } else {
            mote.vx += Math.sin(frame * 0.01 + mote.phase) * 0.004;
            mote.vy += Math.cos(frame * 0.008 + mote.phase) * 0.004;
          }

          if (pointer.active && dist < 28 && !mote.caught) {
            mote.caught = true;
            mote.catchFlash = 1;
            collected += 1;
            if (collected === 1 || collected % 5 === 0) {
              showWhisper(
                collected === 1
                  ? "a quiet catch"
                  : `${collected} quiet catches`,
              );
            }
          }
        } else {
          // Desktop: cursor gently parts the field; slow linger collects
          if (pointer.active && dist < 110) {
            const force = (1 - dist / 110) * 0.55;
            mote.vx += (dx / dist) * force * 0.08;
            mote.vy += (dy / dist) * force * 0.08;
          } else {
            mote.vx += Math.sin(frame * 0.008 + mote.phase) * 0.0035;
            mote.vy += Math.cos(frame * 0.007 + mote.phase) * 0.0035;
          }

          if (
            pointer.active &&
            dist < 18 &&
            Math.hypot(mote.vx, mote.vy) < 0.35 &&
            !mote.caught
          ) {
            mote.caught = true;
            mote.catchFlash = 1;
            collected += 1;
            if (collected === 1 || collected % 5 === 0) {
              showWhisper(
                collected === 1
                  ? "a quiet catch"
                  : `${collected} quiet catches`,
              );
            }
          }
        }

        mote.vx *= 0.96;
        mote.vy *= 0.96;
        mote.x += mote.vx;
        mote.y += mote.vy;

        if (mote.x < -20) mote.x = width + 20;
        if (mote.x > width + 20) mote.x = -20;
        if (mote.y < -20) mote.y = height + 20;
        if (mote.y > height + 20) mote.y = -20;

        if (mote.caught && mote.catchFlash <= 0.02) {
          mote.caught = false;
          mote.x = Math.random() * width;
          mote.y = Math.random() * height;
          mote.vx = 0;
          mote.vy = 0;
        }

        const pulse = 0.55 + 0.45 * Math.sin(frame * 0.03 + mote.phase);
        const flash = mote.catchFlash;
        const alpha = Math.min(0.55, mote.base * pulse + flash * 0.45);
        const radius = mote.r + flash * 2.4;

        ctx.beginPath();
        ctx.fillStyle = `rgba(${rgb}, ${alpha})`;
        ctx.arc(mote.x, mote.y, radius, 0, Math.PI * 2);
        ctx.fill();

        if (flash > 0.05) {
          ctx.beginPath();
          ctx.fillStyle = `rgba(${rgb}, ${flash * 0.12})`;
          ctx.arc(mote.x, mote.y, radius * 4, 0, Math.PI * 2);
          ctx.fill();
        }

        mote.catchFlash *= 0.9;
      }

      // Soft mobile touch bloom
      if (pointer.coarse && pointer.active) {
        const bloom = 0.04 + 0.02 * Math.sin(frame * 0.08);
        const gradient = ctx.createRadialGradient(
          pointer.x,
          pointer.y,
          0,
          pointer.x,
          pointer.y,
          90,
        );
        gradient.addColorStop(0, `rgba(${rgb}, ${bloom})`);
        gradient.addColorStop(1, `rgba(${rgb}, 0)`);
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(pointer.x, pointer.y, 90, 0, Math.PI * 2);
        ctx.fill();
      }

      raf = requestAnimationFrame(tick);
    };

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("pointerdown", onPointerDown, { passive: true });
    window.addEventListener("pointerup", onPointerUp, { passive: true });
    window.addEventListener("pointerleave", onPointerLeave, { passive: true });
    raf = requestAnimationFrame(tick);

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      themeObserver.disconnect();
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("pointerup", onPointerUp);
      window.removeEventListener("pointerleave", onPointerLeave);
      if (whisperTimer.current) window.clearTimeout(whisperTimer.current);
    };
  }, []);

  return (
    <>
      <canvas
        ref={canvasRef}
        className={styles.canvas}
        aria-hidden="true"
      />
      <div
        className={`${styles.whisper}${whisper ? ` ${styles.whisperVisible}` : ""}`}
        aria-live="polite"
      >
        {whisper ?? ""}
      </div>
    </>
  );
}
