import { ImageResponse } from "next/og";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#F6F1E7",
          borderRadius: "50%",
        }}
      >
        <div
          style={{
            fontSize: 34,
            fontWeight: 700,
            color: "#A75336",
            fontFamily: "serif",
          }}
        >
          M
        </div>
      </div>
    ),
    { ...size }
  );
}
