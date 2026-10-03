import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import type { ReactNode } from "react";

export const alt = "Nate Hanson — dad and builder";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const INK = "#23262d";
const PEN = "#2450c8";

// Satori paints in DOM order, so the yellow bar drawn first sits under the text.
function Highlight({ children }: { children: ReactNode }) {
  return (
    <div style={{ display: "flex", position: "relative" }}>
      <div
        style={{
          position: "absolute",
          left: -6,
          right: -6,
          bottom: 6,
          height: "42%",
          background: "#ffe45c",
        }}
      />
      <div style={{ display: "flex" }}>{children}</div>
    </div>
  );
}

export default async function OpengraphImage() {
  const [extraBold, regular, hand, portrait] = await Promise.all([
    readFile(join(process.cwd(), "src/app/_og/Hanken-ExtraBold.ttf")),
    readFile(join(process.cwd(), "src/app/_og/Hanken-Regular.ttf")),
    readFile(join(process.cwd(), "src/app/_og/Caveat-Bold.ttf")),
    readFile(join(process.cwd(), "public/nate.jpg")),
  ]);

  const portraitSrc = `data:image/jpeg;base64,${portrait.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          gap: 56,
          padding: "0 84px",
          backgroundColor: "#fbfbf6",
          backgroundImage:
            "linear-gradient(rgba(36,80,200,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(36,80,200,0.08) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
          fontFamily: "Hanken",
          color: INK,
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
          <div
            style={{
              display: "flex",
              fontFamily: "Caveat",
              fontSize: 48,
              color: PEN,
              transform: "rotate(-2deg)",
            }}
          >
            hi, I&rsquo;m Nate
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              marginTop: 10,
              fontSize: 80,
              fontWeight: 800,
              lineHeight: 1.04,
              letterSpacing: "-0.035em",
            }}
          >
            <div style={{ display: "flex", gap: 20 }}>
              <div style={{ display: "flex" }}>I&rsquo;m a</div>
              <Highlight>dad and</Highlight>
            </div>
            <div style={{ display: "flex" }}>
              <Highlight>a builder.</Highlight>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              marginTop: 26,
              maxWidth: 600,
              fontSize: 27,
              lineHeight: 1.45,
              color: "#50545c",
            }}
          >
            Right now I&rsquo;m building Arbor, helping build Buffer, and
            hosting Faith Lab.
          </div>
          <div style={{ display: "flex", marginTop: 26, fontSize: 22, color: "#50545c" }}>
            natemhanson.com
          </div>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: 330,
          }}
        >
          <div
            style={{
              display: "flex",
              position: "relative",
              padding: 10,
              background: "#ffffff",
              transform: "rotate(-2deg)",
              boxShadow: "0 10px 24px rgba(35,38,45,0.16)",
            }}
          >
            {/* Rendered to a PNG by Satori, so alt is inert — the card's
                alt text is the exported `alt` above. */}
            <img
              alt=""
              src={portraitSrc}
              width={290}
              height={290}
              style={{ objectFit: "cover" }}
            />
            <svg
              width="30"
              height="62"
              viewBox="0 0 34 70"
              fill="none"
              stroke="#6b7079"
              strokeWidth="3"
              strokeLinecap="round"
              style={{ position: "absolute", top: -24, left: 26 }}
            >
              <path d="M10 58V14a7 7 0 0 1 14 0v40a11 11 0 0 1-22 0V20" />
            </svg>
          </div>
          <div
            style={{
              display: "flex",
              marginTop: 20,
              fontFamily: "Caveat",
              fontSize: 40,
              color: PEN,
              transform: "rotate(2deg)",
            }}
          >
            that&rsquo;s me, hi!
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Hanken", data: extraBold, style: "normal", weight: 800 },
        { name: "Hanken", data: regular, style: "normal", weight: 400 },
        { name: "Caveat", data: hand, style: "normal", weight: 700 },
      ],
    },
  );
}
