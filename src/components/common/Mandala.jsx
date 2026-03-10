import { C } from "../../utils/constants";

export default function Mandala({ size = 400, style = {} }) {
  const rings    = [90, 68, 48, 28];
  const petals   = [0, 45, 90, 135, 180, 225, 270, 315];
  const spokes   = Array.from({ length: 12 }, (_, i) => i * 30);

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 200 200"
      style={{ position: "absolute", opacity: 0.065, pointerEvents: "none", ...style }}
    >
      {/* Rings */}
      {rings.map(r => (
        <circle key={r} cx="100" cy="100" r={r}
          stroke={C.gold} strokeWidth="0.5" fill="none"/>
      ))}
      {/* Spokes */}
      {spokes.map(a => (
        <line key={a}
          x1="100" y1="10" x2="100" y2="190"
          stroke={C.gold} strokeWidth="0.3"
          transform={`rotate(${a} 100 100)`}/>
      ))}
      {/* Petals */}
      {petals.map(a => (
        <ellipse key={a}
          cx="100" cy="38" rx="7" ry="16"
          stroke={C.gold} strokeWidth="0.4" fill="none"
          transform={`rotate(${a} 100 100)`}/>
      ))}
      {/* Dots at ring intersections */}
      {petals.map(a => (
        <circle key={`d-${a}`}
          cx="100" cy="32" r="2"
          fill={C.gold} opacity="0.5"
          transform={`rotate(${a} 100 100)`}/>
      ))}
    </svg>
  );
}
