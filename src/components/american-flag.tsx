export function AmericanFlag({ className }: { className?: string }) {
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
      className={className}
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
