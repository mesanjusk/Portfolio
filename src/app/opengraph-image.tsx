import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "#F6F1E7",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: -80,
            left: -80,
            width: 380,
            height: 380,
            borderRadius: "50%",
            background: "rgba(167, 83, 54, 0.16)",
            display: "flex",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: -100,
            right: -60,
            width: 420,
            height: 420,
            borderRadius: "50%",
            background: "rgba(43, 38, 34, 0.06)",
            display: "flex",
          }}
        />
        <div
          style={{
            fontSize: 104,
            fontFamily: "serif",
            fontWeight: 700,
            color: "#2B2622",
            display: "flex",
          }}
        >
          Mahii<span style={{ color: "#A75336", fontStyle: "italic" }}>Way</span>
        </div>
        <div
          style={{
            marginTop: 24,
            fontSize: 30,
            color: "#5A5049",
            fontFamily: "sans-serif",
            display: "flex",
          }}
        >
          An interactive creative world, not a portfolio you scroll
        </div>
      </div>
    ),
    { ...size }
  );
}
