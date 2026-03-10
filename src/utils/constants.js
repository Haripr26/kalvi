// ── DESIGN TOKENS ──────────────────────────────────────────
export const C = {
  maroon:     "#6B1A2A",
  maroonDark: "#4A0F1C",
  maroonDeep: "#3A0A15",
  gold:       "#C9922A",
  goldLight:  "#E8B84B",
  goldPale:   "#F5E6C8",
  cream:      "#FDF6EC",
  white:      "#FFFFFF",
  text:       "#2C1A10",
  textMuted:  "#7A5A48",
  success:    "#2E7D32",
  error:      "#C62828",
  warning:    "#F57C00",
};

export const FONT      = `'Playfair Display', Georgia, serif`;
export const FONT_BODY = `'Lato', 'Segoe UI', sans-serif`;

// ── EXAM CATEGORIES ──────────────────────────────────────────
export const EXAM_CATEGORIES = [
  { id: "tnpsc",   icon: "🏛️", name: "TNPSC",         sub: "Group 1 / 2 / 2A / 4",          count: 128 },
  { id: "upsc",    icon: "🇮🇳", name: "UPSC / IAS",    sub: "Civil Services Prelims & Mains",  count: 84  },
  { id: "banking", icon: "🏦", name: "Banking / SSC", sub: "IBPS · SBI · SSC-CGL · Railways", count: 96  },
  { id: "state",   icon: "📋", name: "State & Central",sub: "Other Government Exams",          count: 52  },
];

// ── MOCK EXAMS ───────────────────────────────────────────────
export const MOCK_EXAMS = [
  { id: 1, cat: "tnpsc",   title: "TNPSC Group 2 — General Studies Full Mock",    questions: 200, time: 180, attempts: 4821, free: true  },
  { id: 2, cat: "tnpsc",   title: "TNPSC Group 4 — Tamil Language & GK Combined", questions: 100, time: 90,  attempts: 7234, free: true  },
  { id: 3, cat: "upsc",    title: "UPSC Prelims Paper I — Full Length",            questions: 100, time: 120, attempts: 3102, free: false },
  { id: 4, cat: "banking", title: "IBPS PO Preliminary — Quantitative Aptitude",  questions: 35,  time: 20,  attempts: 5541, free: true  },
  { id: 5, cat: "tnpsc",   title: "TNPSC Group 1 — History & Geography Section",  questions: 150, time: 150, attempts: 2891, free: false },
  { id: 6, cat: "banking", title: "SSC-CGL Tier I Full Mock Test 2024",            questions: 100, time: 60,  attempts: 6102, free: true  },
  { id: 7, cat: "upsc",    title: "UPSC Indian Polity — Topic Wise Practice",      questions: 60,  time: 60,  attempts: 2200, free: true  },
  { id: 8, cat: "state",   title: "TN Police Constable — General Knowledge",       questions: 100, time: 90,  attempts: 3800, free: false },
];

// ── MOCK QUESTIONS ───────────────────────────────────────────
export const SAMPLE_QUESTIONS = [
  { id: 1, section: "General Studies",   q: "Who was the first Chief Minister of Tamil Nadu?",                              opts: ["P. T. Rajan", "O. P. Ramaswami Reddiyar", "K. Kamaraj", "C. N. Annadurai"],     correct: 1 },
  { id: 2, section: "Indian History",    q: "In which year did India gain independence?",                                   opts: ["1945", "1947", "1950", "1948"],                                                  correct: 1 },
  { id: 3, section: "Geography",         q: "How many districts are there in Tamil Nadu (as of 2024)?",                     opts: ["32", "36", "38", "40"],                                                          correct: 2 },
  { id: 4, section: "General Science",   q: "Which planet is known as the Red Planet?",                                     opts: ["Venus", "Jupiter", "Mars", "Saturn"],                                            correct: 2 },
  { id: 5, section: "Tamil Literature",  q: "Who authored the Thirukkural?",                                                opts: ["Kambar", "Thiruvalluvar", "Ilango Adigal", "Avvaiyar"],                          correct: 1 },
  { id: 6, section: "Indian Polity",     q: "How many Fundamental Rights are guaranteed by the Indian Constitution?",       opts: ["5", "6", "7", "8"],                                                              correct: 1 },
  { id: 7, section: "Current Affairs",   q: "Which organisation conducts the TNPSC examinations?",                          opts: ["UPSC", "SSC", "TNPSC Board", "State Government"],                               correct: 2 },
  { id: 8, section: "Aptitude",          q: "If the ratio of boys to girls in a class is 3:2 and there are 40 students, how many are boys?", opts: ["20", "22", "24", "16"],                                       correct: 2 },
];

// ── NAV LINKS ─────────────────────────────────────────────────
export const NAV_LINKS = [
  { id: "home",   label: "Home"     },
  { id: "exams",  label: "Exams"    },
  { id: "about",  label: "About"    },
];
