import { createContext, useContext, useState } from "react";

const ExamContext = createContext(null);

export function ExamProvider({ children }) {
  const [currentExam, setCurrentExam] = useState(null);
  const [answers, setAnswers]         = useState({});
  const [flagged, setFlagged]         = useState(new Set());
  const [result, setResult]           = useState(null);

  const resetExam = () => {
    setAnswers({});
    setFlagged(new Set());
    setResult(null);
  };

  const toggleFlag = (qId) => {
    setFlagged(prev => {
      const next = new Set(prev);
      next.has(qId) ? next.delete(qId) : next.add(qId);
      return next;
    });
  };

  const saveAnswer = (qId, optIndex) => {
    setAnswers(prev => ({ ...prev, [qId]: optIndex }));
  };

  const clearAnswer = (qId) => {
    setAnswers(prev => { const n = { ...prev }; delete n[qId]; return n; });
  };

  return (
    <ExamContext.Provider value={{
      currentExam, setCurrentExam,
      answers, saveAnswer, clearAnswer,
      flagged, toggleFlag,
      result, setResult,
      resetExam,
    }}>
      {children}
    </ExamContext.Provider>
  );
}

export const useExam = () => useContext(ExamContext);
