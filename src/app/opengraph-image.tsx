import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const alt = "Nate Hanson — dad, builder, and co-founder of Arbor";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
  const [bold, regular, portrait] = await Promise.all([
    readFile(join(process.cwd(), "src/app/_og/Familjen-Bold.ttf")),
    readFile(join(process.cwd(), "src/app/_og/Familjen-Regular.ttf")),
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
          justifyContent: "center",
          background: "#e8edf4",
          fontFamily: "Familjen",
        }}
      >
        <div
          style={{
            display: "flex",
            gap: 56,
            width: 1072,
            height: 502,
            padding: "52px 56px",
            borderRadius: 32,
            background: "#ffffff",
            boxShadow: "0 24px 48px rgba(15,23,42,0.10)",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
            {/* Rendered to a PNG by Satori, so alt is inert — the card's
                alt text is the exported `alt` above. */}
            <img
              alt=""
              src={portraitSrc}
              width={120}
              height={120}
              style={{ borderRadius: 999, objectFit: "cover" }}
            />
            <div
              style={{
                display: "flex",
                marginTop: 26,
                fontSize: 76,
                fontWeight: 700,
                letterSpacing: "-0.035em",
                lineHeight: 1,
                color: "#0f172a",
              }}
            >
              Nate Hanson
            </div>
            <div
              style={{
                display: "flex",
                marginTop: 20,
                fontSize: 29,
                lineHeight: 1.4,
                color: "#475569",
              }}
            >
              I started Arbor so more families can raise their kids together.
            </div>
            <div
              style={{
                display: "flex",
                marginTop: "auto",
                fontSize: 22,
                color: "#475569",
              }}
            >
              natemhanson.com
            </div>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              width: 400,
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                padding: 36,
                borderRadius: 24,
                background: "#f4f7fb",
                border: "1px solid #e2e8f0",
              }}
            >
              <div
                style={{
                  display: "flex",
                  fontSize: 16,
                  fontWeight: 700,
                  letterSpacing: "0.12em",
                  color: "#475569",
                }}
              >
                WHAT I&rsquo;M BUILDING
              </div>
              <div
                style={{
                  display: "flex",
                  marginTop: 14,
                  fontSize: 64,
                  fontWeight: 700,
                  letterSpacing: "-0.03em",
                  lineHeight: 1,
                  color: "#0f172a",
                }}
              >
                Arbor
              </div>
              <div
                style={{
                  display: "flex",
                  marginTop: 14,
                  fontSize: 24,
                  lineHeight: 1.4,
                  color: "#334155",
                }}
              >
                A whole homeschool year, planned around your kid.
              </div>
              <div
                style={{
                  display: "flex",
                  marginTop: 22,
                  fontSize: 22,
                  fontWeight: 700,
                  color: "#2558e6",
                }}
              >
                arborhomeschool.com
              </div>
            </div>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Familjen", data: bold, style: "normal", weight: 700 },
        { name: "Familjen", data: regular, style: "normal", weight: 400 },
      ],
    },
  );
}
