import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const alt =
  "Nate Hanson — dad, builder, and co-founder of Arbor";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
  const [bold, regular, portrait] = await Promise.all([
    readFile(join(process.cwd(), "src/app/_og/Bricolage-ExtraBold.ttf")),
    readFile(join(process.cwd(), "src/app/_og/Bricolage-Regular.ttf")),
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
          justifyContent: "space-between",
          padding: "0 84px",
          background: "#fff7ea",
          fontFamily: "Bricolage",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            maxWidth: 600,
          }}
        >
          <div style={{ display: "flex", gap: 12, marginBottom: 26 }}>
            <div
              style={{
                display: "flex",
                background: "#ffe9be",
                border: "2px solid #e8ce9c",
                color: "#7a5e33",
                fontSize: 21,
                fontWeight: 800,
                padding: "7px 20px",
                borderRadius: 999,
              }}
            >
              Dad
            </div>
            <div
              style={{
                display: "flex",
                background: "#e7eedf",
                border: "2px solid #c4d2b4",
                color: "#4c6340",
                fontSize: 21,
                fontWeight: 800,
                padding: "7px 20px",
                borderRadius: 999,
              }}
            >
              Builder
            </div>
          </div>

          <div
            style={{
              display: "flex",
              fontSize: 92,
              fontWeight: 800,
              lineHeight: 1.02,
              letterSpacing: "-0.02em",
              color: "#3b2e20",
            }}
          >
            Nate Hanson
          </div>

          <svg
            width="300"
            height="20"
            viewBox="0 0 230 16"
            fill="none"
            style={{ marginTop: 10 }}
          >
            <path
              d="M4 10 C 24 2, 44 14, 64 8 S 104 2, 124 9 S 164 14, 184 6 S 216 4, 226 9"
              stroke="#2b6cb0"
              strokeWidth="5"
              strokeLinecap="round"
            />
          </svg>

          <div
            style={{
              display: "flex",
              fontSize: 31,
              lineHeight: 1.45,
              color: "#5b4b38",
              marginTop: 26,
            }}
          >
            I started Arbor to take the hard parts of homeschooling off
            parents&rsquo; plates.
          </div>

          <div
            style={{
              display: "flex",
              fontSize: 23,
              color: "#8a7660",
              marginTop: 30,
            }}
          >
            natemhanson.com
          </div>
        </div>

        <div style={{ display: "flex", position: "relative" }}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              background: "#fffdf8",
              padding: 16,
              paddingBottom: 14,
              borderRadius: 20,
              boxShadow: "0 18px 40px rgba(59,46,32,0.16)",
              transform: "rotate(2.5deg)",
            }}
          >
            {/* Rendered to a PNG by Satori, so alt is inert — the card's
                alt text is the exported `alt` above. */}
            <img
              alt=""
              src={portraitSrc}
              width={330}
              height={330}
              style={{ borderRadius: 12, objectFit: "cover" }}
            />
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                width: 330,
                marginTop: 14,
                fontSize: 21,
                color: "#8a7660",
              }}
            >
              hi, that&rsquo;s me
            </div>
          </div>

          <svg
            width="104"
            height="104"
            viewBox="0 0 88 88"
            style={{ position: "absolute", top: -30, right: -22 }}
          >
            <circle cx="44" cy="44" r="20" fill="#ffc94d" />
            <g stroke="#ffc94d" strokeWidth="5" strokeLinecap="round">
              <line x1="44" y1="6" x2="44" y2="16" />
              <line x1="44" y1="72" x2="44" y2="82" />
              <line x1="6" y1="44" x2="16" y2="44" />
              <line x1="72" y1="44" x2="82" y2="44" />
              <line x1="17" y1="17" x2="24" y2="24" />
              <line x1="64" y1="64" x2="71" y2="71" />
              <line x1="71" y1="17" x2="64" y2="24" />
              <line x1="24" y1="64" x2="17" y2="71" />
            </g>
          </svg>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Bricolage", data: bold, style: "normal", weight: 800 },
        { name: "Bricolage", data: regular, style: "normal", weight: 400 },
      ],
    },
  );
}
