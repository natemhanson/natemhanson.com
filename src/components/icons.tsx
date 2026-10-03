export function ArrowIcon() {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M7 17 17 7" />
      <path d="M8 7h9v9" />
    </svg>
  );
}

export function DownIcon() {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M12 5v14" />
      <path d="m19 12-7 7-7-7" />
    </svg>
  );
}

export function CheckIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 26 26" fill="none" aria-hidden="true">
      <rect
        x="2"
        y="2"
        width="22"
        height="22"
        rx="5"
        stroke="var(--line)"
        strokeWidth="2"
      />
      <path
        d="m7 13.5 4 4 8-9"
        stroke="var(--accent)"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function PaperClip({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="34"
      height="70"
      viewBox="0 0 34 70"
      fill="none"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
      aria-hidden="true"
    >
      <path d="M10 58V14a7 7 0 0 1 14 0v40a11 11 0 0 1-22 0V20" />
    </svg>
  );
}

export function HandArrow() {
  return (
    <svg
      width="64"
      height="36"
      viewBox="0 0 64 36"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M60 30C42 32 20 26 10 8" />
      <path d="M6 18 10 7l10 3" />
    </svg>
  );
}
