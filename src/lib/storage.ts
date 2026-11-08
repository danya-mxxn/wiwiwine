import type { Answer, Progress, Session, Question } from '../types';
export const STORAGE_KEY = 'sommelier-academy:v1';
const obj = (v: unknown): v is Record<string, unknown> => !!v && typeof v === 'object' && !Array.isArray(v);
const date = (v: unknown): v is string => typeof v === 'string' && Number.isFinite(Date.parse(v));
const integer = (v: unknown): v is number => Number.isSafeInteger(v) && (v as number) >= 0;
const mode = (v: unknown) => v === 'learn' || v === 'exam' || v === 'review';
function answer(v: unknown): v is Answer {
  return obj(v) && typeof v.questionId === 'string' && Array.isArray(v.selected)
    && v.selected.every(integer) && new Set(v.selected).size === v.selected.length
    && typeof v.correct === 'boolean' && date(v.at);
}
function session(v: unknown): v is Session {
  if (!obj(v) || typeof v.id !== 'string' || !mode(v.mode) || !Array.isArray(v.questionIds)
    || !v.questionIds.length || !v.questionIds.every(id => typeof id === 'string')
    || new Set(v.questionIds).size !== v.questionIds.length || !Array.isArray(v.answers)
    || !v.answers.every(answer) || !date(v.startedAt)) return false;
  return new Set(v.answers.map(a => a.questionId)).size === v.answers.length
    && v.answers.every(a => (v.questionIds as string[]).includes(a.questionId));
}
export function parseProgress(raw: string, questionMap: ReadonlyMap<string, Question>): Progress {
  const v: unknown = JSON.parse(raw);
  if (!obj(v) || v.version !== 1 || !obj(v.records) || !Array.isArray(v.history) || v.history.length > 100)
    throw new Error('Неподдерживаемый формат резервной копии.');
  for (const r of Object.values(v.records)) {
    if (!obj(r) || !integer(r.attempts) || !integer(r.correct) || r.correct > r.attempts
      || typeof r.lastCorrect !== 'boolean' || !date(r.lastAt)) throw new Error('Повреждена статистика ответов.');
  }
  for (const r of v.history) {
    if (!session(r) || !obj(r) || !date(r.finishedAt)) throw new Error('Повреждена история занятий.');
  }
  if (new Set(v.history.map(r => r.id)).size !== v.history.length) throw new Error('Повторяющиеся сеансы.');
  if (v.active !== null) {
    const s = v.active;
    if (!session(s) || !obj(s) || !integer(s.index) || s.index >= s.questionIds.length
      || !Array.isArray(s.selected) || !s.selected.every(integer) || typeof s.revealed !== 'boolean'
      || !(s.deadline === null || (typeof s.deadline === 'number' && Number.isFinite(s.deadline))))
      throw new Error('Повреждён текущий сеанс.');
    // A changed question bank must not break an old session.
    if (!s.questionIds.every(id => questionMap.has(id))) v.active = null;
    else {
      const q = questionMap.get(s.questionIds[s.index])!;
      if (s.selected.some(i => i >= q.options.length) || new Set(s.selected).size !== s.selected.length
        || s.answers.length !== s.index + Number(s.revealed)
        || s.answers.some((a, i) => a.questionId !== s.questionIds[i])
        || (s.mode === 'exam' && s.revealed) || (s.mode === 'exam' && s.deadline === null))
        throw new Error('Нарушена последовательность текущего сеанса.');
    }
  }
  return v as unknown as Progress;
}
