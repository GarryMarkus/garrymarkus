import Link from "next/link";

export default function NotFound() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        fontFamily: "var(--font-mono)",
        color: "var(--muted)",
        gap: "16px",
      }}
    >
      <span style={{ fontSize: "0.58rem", textTransform: "uppercase", letterSpacing: "0.1em" }}>
        404
      </span>
      <span style={{ fontSize: "0.72rem", color: "var(--secondary)" }}>
        Page not found.
      </span>
      <Link
        href="/"
        style={{
          marginTop: "12px",
          fontSize: "0.62rem",
          textTransform: "uppercase",
          letterSpacing: "0.06em",
          color: "var(--muted)",
          border: "1px solid var(--border)",
          padding: "8px 20px",
          borderRadius: "0",
          transition: "color 0.2s ease, border-color 0.2s ease",
        }}
      >
        ← Home
      </Link>
    </div>
  );
}
