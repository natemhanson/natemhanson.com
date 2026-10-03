import Link from "next/link";
import type { ReactNode } from "react";
import styles from "./site-shell.module.css";

function AmericanFlag() {
  const cantonWidth = 7.6;
  const cantonHeight = (7 * 10) / 13;
  const stars: { cx: number; cy: number }[] = [];

  for (let row = 0; row < 9; row++) {
    const cols = row % 2 === 0 ? 6 : 5;
    const x0 = ((row % 2 === 0 ? 1 : 2) * cantonWidth) / 12;
    const y = ((row + 1) * cantonHeight) / 10;
    for (let col = 0; col < cols; col++) {
      stars.push({ cx: x0 + (col * cantonWidth) / 6, cy: y });
    }
  }

  return (
    <svg
      className={styles.flag}
      viewBox="0 0 19 10"
      width="18"
      height="10"
      role="img"
      aria-label="United States flag"
    >
      <rect width="19" height="10" fill="#b22234" />
      {[1, 3, 5, 7, 9, 11].map((stripe) => (
        <rect
          key={stripe}
          y={(stripe * 10) / 13}
          width="19"
          height={10 / 13}
          fill="#fff"
        />
      ))}
      <rect width={cantonWidth} height={cantonHeight} fill="#3c3b6e" />
      {stars.map((star) => (
        <circle
          key={`${star.cx}-${star.cy}`}
          cx={star.cx}
          cy={star.cy}
          r="0.18"
          fill="#fff"
        />
      ))}
    </svg>
  );
}

// The whole site is one card on a quiet ground: home, the story, and contact
// all share this frame and footer.
export function SiteShell({ children }: { children: ReactNode }) {
  return (
    <div className={styles.shell}>
      <main className={styles.card}>
        {children}
        <footer className={styles.footer}>
          <p className={styles.copyright}>
            <span>&copy; {new Date().getFullYear()} Nate Hanson</span>
            <AmericanFlag />
          </p>
          <nav className={styles.footerNav} aria-label="Site">
            <Link href="/">Home</Link>
            <Link href="/story">The short story</Link>
            <Link href="/contact">Contact</Link>
          </nav>
        </footer>
      </main>
    </div>
  );
}
