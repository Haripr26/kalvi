import { C } from "../../utils/constants";

export default function Loader({ message = "Loading..." }) {
  return (
    <div style={{
      display: "flex", flexDirection: "column", alignItems: "center",
      justifyContent: "center", gap: 18, padding: 48,
    }}>
      <div style={{
        width: 52, height: 52,
        border: `5px solid rgba(201,146,42,0.2)`,
        borderTopColor: C.goldLight,
        borderRadius: "50%",
        animation: "spin 0.8s linear infinite",
      }} />
      <p style={{
        color: "rgba(245,230,200,0.6)",
        fontFamily: "'Lato',sans-serif",
        fontSize: 13,
      }}>{message}</p>
    </div>
  );
}
