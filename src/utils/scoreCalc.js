/**
 * calculateScore
 * @param {Array}  questions  - array of { id, correct }
 * @param {Object} answers    - { [questionId]: selectedIndex }
 * @param {number} negMark    - negative marks per wrong (default 0.33)
 */
export function calculateScore(questions, answers, negMark = 0.33) {
  let correct = 0, wrong = 0, skipped = 0;

  questions.forEach(q => {
    const ans = answers[q.id];
    if (ans === undefined || ans === null) {
      skipped++;
    } else if (ans === q.correct) {
      correct++;
    } else {
      wrong++;
    }
  });

  const rawScore = correct - wrong * negMark;
  const score    = Math.max(0, Math.round(rawScore * 10) / 10);
  const total    = questions.length;
  const percent  = Math.round((score / total) * 100);

  return { correct, wrong, skipped, score, total, percent };
}

/**
 * getSectionBreakdown
 * Returns per-section stats.
 */
export function getSectionBreakdown(questions, answers) {
  const sections = {};
  questions.forEach(q => {
    if (!sections[q.section]) sections[q.section] = { correct: 0, total: 0 };
    sections[q.section].total++;
    if (answers[q.id] === q.correct) sections[q.section].correct++;
  });
  return Object.entries(sections).map(([name, v]) => ({
    name,
    score:   v.correct,
    max:     v.total,
    percent: Math.round((v.correct / v.total) * 100),
  }));
}

/** Grade label from percent */
export function getGrade(percent) {
  if (percent >= 80) return { label: "Excellent",  color: "#2E7D32", emoji: "🏆" };
  if (percent >= 65) return { label: "Good",        color: "#388E3C", emoji: "🎉" };
  if (percent >= 50) return { label: "Average",     color: "#F57C00", emoji: "👍" };
  return                     { label: "Needs Work",  color: "#C62828", emoji: "💪" };
}
