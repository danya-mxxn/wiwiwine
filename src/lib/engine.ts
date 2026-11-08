import type { Answer, Progress, Question, Session } from '../types';
export const emptyProgress = (): Progress => ({ version: 1, records: {}, history: [], active: null });
export function isCorrect(question: Question, selected: number[]) {
  return selected.length === question.correctAnswers.length && new Set(selected).size === selected.length
    && selected.every(index => question.correctAnswers.includes(index));
}
export function shuffle<T>(items: T[]): T[] {
  const result = [...items];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}
export function recordAnswer(progress: Progress, answer: Answer): Progress {
  const previous = progress.records[answer.questionId];
  return { ...progress, records: { ...progress.records, [answer.questionId]: {
    attempts: (previous?.attempts ?? 0) + 1,
    correct: (previous?.correct ?? 0) + Number(answer.correct),
    lastCorrect: answer.correct, lastAt: answer.at,
  } } };
}
export function finishSession(progress: Progress, session: Session): Progress {
  if (progress.history.some(r => r.id === session.id)) return { ...progress, active: null };
  // Answers are recorded as submitted, including in unfinished sessions.
  return { ...progress, active: null, history: [{
    id: session.id, mode: session.mode, questionIds: session.questionIds,
    answers: session.answers, startedAt: session.startedAt, finishedAt: new Date().toISOString(),
  }, ...progress.history].slice(0, 100) };
}
export function progressStats(progress: Progress, ids?: string[]) {
  const allowed = ids ? new Set(ids) : null;
  const records = Object.entries(progress.records).filter(([id]) => !allowed || allowed.has(id)).map(([, r]) => r);
  const attempts = records.reduce((sum, r) => sum + r.attempts, 0);
  const correct = records.reduce((sum, r) => sum + r.correct, 0);
  return { answered: records.length, attempts, correct, accuracy: attempts ? Math.round(correct / attempts * 100) : 0,
    mistakes: records.filter(r => !r.lastCorrect).length, mastered: records.filter(r => r.lastCorrect).length };
}
