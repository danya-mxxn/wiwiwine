import { validateQuestions, validateSources, validateSourceLinks } from './validation';
import sourceData from '../data/sources.json';
const rawFiles = import.meta.glob('../data/questions/*.json', { eager: true, query: '?raw', import: 'default' });
const files: Record<string, unknown> = {};
const parseErrors: string[] = [];
for (const [file, raw] of Object.entries(rawFiles)) {
  try { files[file] = JSON.parse(raw as string); }
  catch { parseErrors.push(`${file}: ошибка синтаксиса JSON`); }
}
const validated = validateQuestions(files);
const sourceValidation = validateSources(sourceData);
export const sources = sourceValidation.sources;
export const sourceMap = new Map(sources.map(s => [s.id, s]));
export const questions = validated.questions;
export const questionErrors = [...parseErrors, ...validated.errors, ...sourceValidation.errors, ...validateSourceLinks(questions, sources)];
export const questionMap = new Map(questions.map(q => [q.id, q]));
export const categories = [...new Set(questions.map(q => q.category))];
export const difficultyLabels = { easy: 'Базовый', medium: 'Продвинутый', hard: 'Экспертный' };
export const modeLabels = { learn: 'Обучение', exam: 'Экзамен', review: 'Работа над ошибками' };
export function assetUrl(path: string) {
  return /^https:\/\//.test(path) ? path : `${import.meta.env.BASE_URL}${path.replace(/^\//, '')}`;
}
