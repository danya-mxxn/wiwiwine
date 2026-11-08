import type { Question, KnowledgeSource } from '../types';

const nonempty = (v: unknown): v is string => typeof v === 'string' && v.trim().length > 0;
export function validateQuestions(files: Record<string, unknown>) {
  const questions: Question[] = [];
  const errors: string[] = [];
  const ids = new Set<string>();
  for (const [file, data] of Object.entries(files)) {
    if (!Array.isArray(data)) { errors.push(`${file}: ожидается массив вопросов`); continue; }
    data.forEach((raw: unknown, index: number) => {
      const location = `${file}, запись ${index + 1}`;
      if (!raw || typeof raw !== 'object') { errors.push(`${location}: ожидается объект`); return; }
      const q = raw as Record<string, unknown>;
      const valid = ['id', 'category', 'subcategory', 'question', 'explanation'].every(k => nonempty(q[k]))
        && ['easy', 'medium', 'hard'].includes(q.difficulty as string)
        && Array.isArray(q.options) && q.options.length >= 2 && q.options.every(nonempty)
        && new Set(q.options).size === q.options.length
        && Array.isArray(q.correctAnswers) && q.correctAnswers.length > 0
        && new Set(q.correctAnswers).size === q.correctAnswers.length
        && q.correctAnswers.every(n => Number.isInteger(n) && n >= 0 && n < (q.options as unknown[]).length)
        && (q.sourceIds === undefined || (Array.isArray(q.sourceIds) && q.sourceIds.length > 0 && q.sourceIds.every(nonempty) && new Set(q.sourceIds).size === q.sourceIds.length))
        && (q.image === null || (nonempty(q.image) && !q.image.startsWith('/') && !q.image.includes('..') && (/^https:\/\//.test(q.image) || !q.image.includes(':'))));
      if (!valid) { errors.push(`${location}: некорректная структура вопроса (${String(q.id ?? 'без ID')})`); return; }
      if (ids.has(q.id as string)) { errors.push(`${location}: повторяющийся ID ${q.id}`); return; }
      ids.add(q.id as string);
      questions.push(q as unknown as Question);
    });
  }
  return { questions, errors };
}

export function validateSources(data: unknown) {
  const sources: KnowledgeSource[] = [];
  const errors: string[] = [];
  const ids = new Set<string>();
  if (!Array.isArray(data)) return { sources, errors: ['Источники: ожидается массив'] };
  for (const raw of data) {
    const s = raw as Record<string, unknown> | null;
    let url: URL | null = null;
    try { url = new URL(String(s?.url)); } catch { /* handled below */ }
    if (!s || !['id','organization','title'].every(k => nonempty(s[k])) || !url || url.protocol !== 'https:'
      || url.username || url.password || typeof s.checkedAt !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(s.checkedAt)
      || !Number.isFinite(Date.parse(s.checkedAt)) || ids.has(s.id as string)) {
      errors.push(`Некорректный или повторяющийся источник: ${String(s?.id)}`); continue;
    }
    ids.add(s.id as string); sources.push(s as unknown as KnowledgeSource);
  }
  return { sources, errors };
}
export function validateSourceLinks(questions: Question[], sources: KnowledgeSource[]) {
  const ids = new Set(sources.map(s => s.id));
  return questions.flatMap(q => (q.sourceIds ?? []).filter(id => !ids.has(id)).map(id => `${q.id}: неизвестный источник ${id}`));
}
