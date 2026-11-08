import { readdirSync, readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { validateQuestions, validateSources, validateSourceLinks } from '../src/lib/validation.ts';
const directory = fileURLToPath(new URL('../src/data/questions/', import.meta.url));
const files: Record<string, unknown> = {};
const errors: string[] = [];
for (const name of readdirSync(directory).filter(name => name.endsWith('.json'))) {
  try { files[name] = JSON.parse(readFileSync(`${directory}/${name}`, 'utf8')); }
  catch { errors.push(`${name}: ошибка синтаксиса JSON`); }
}
const result = validateQuestions(files);
errors.push(...result.errors);
const sourceValidation = validateSources(JSON.parse(readFileSync(new URL('../src/data/sources.json', import.meta.url), 'utf8')));
errors.push(...sourceValidation.errors, ...validateSourceLinks(result.questions, sourceValidation.sources));
if (!result.questions.length) errors.push('База не содержит вопросов');
for (const error of errors) console.error(error);
console.log(`Вопросов: ${result.questions.length}. Категорий: ${new Set(result.questions.map(q => q.category)).size}. Источников: ${sourceValidation.sources.length}. Ошибок: ${errors.length}.`);
if (errors.length) process.exitCode = 1;
