import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readdirSync, readFileSync } from 'node:fs';
import { validateQuestions, validateSources, validateSourceLinks } from '../src/lib/validation.ts';
import { emptyProgress, finishSession, isCorrect, progressStats, recordAnswer, shuffle } from '../src/lib/engine.ts';
import type { Answer, Question, Session } from '../src/types.ts';
import { parseProgress } from '../src/lib/storage.ts';
const files = Object.fromEntries(readdirSync(new URL('../src/data/questions/', import.meta.url)).filter(f => f.endsWith('.json')).map(f => [f, JSON.parse(readFileSync(new URL(`../src/data/questions/${f}`, import.meta.url), 'utf8'))]));
const { questions, errors } = validateQuestions(files);
const base = questions[0];
const sourceData = JSON.parse(readFileSync(new URL('../src/data/sources.json', import.meta.url), 'utf8'));
const sourceValidation = validateSources(sourceData);
test('База валидна, ID уникальны, все три направления присутствуют', () => {
  assert.deepEqual(errors, []); assert.ok(questions.length >= 70);
  assert.equal(new Set(questions.map(q => q.id)).size, questions.length);
  for (const category of ['Шампань','Креман','Просекко','Франчакорта','Виски','Бочки и выдержка','Стили пива','Почвы и терруар']) assert.ok(questions.some(q => q.category === category));
  assert.ok(questions.some(q => q.image)); assert.ok(questions.some(q => q.correctAnswers.length > 1));
});
test('Каждая категория содержит минимум 10 вопросов разных уровней', () => {
  const categories = [...new Set(questions.map(q => q.category))];
  assert.ok(categories.length >= 37);
  for (const category of categories) {
    const pool = questions.filter(q => q.category === category);
    assert.ok(pool.length >= 10, `${category}: только ${pool.length} вопросов`);
    assert.ok(new Set(pool.map(q => q.difficulty)).size >= 2, category);
    assert.ok(new Set(pool.map(q => q.subcategory)).size >= 3, category);
  }
});
test('Вся поставляемая база ссылается на валидные официальные источники', () => {
  assert.deepEqual(sourceValidation.errors, []);
  assert.deepEqual(validateSourceLinks(questions, sourceValidation.sources), []);
  for (const q of questions) assert.ok(q.sourceIds?.length, `${q.id}: отсутствует источник`);
  assert.ok(sourceValidation.sources.length >= 50);
});
test('Формулировки уникальны и не содержат повреждённой кодировки или заглушек', () => {
  const seen = new Set<string>();
  for (const q of questions) {
    const normalized = q.question.normalize('NFKC').toLocaleLowerCase('ru').replace(/[\s?.,!«»—–-]/g, '');
    assert.ok(!seen.has(normalized), `Дубликат формулировки: ${q.id}`);
    seen.add(normalized);
    for (const text of [q.question,q.explanation,q.category,...q.options]) assert.ok(!/\?{3,}|\uFFFD|TODO|TBD/.test(text), `${q.id}: повреждённый текст`);
  }
});
test('Валидатор источников отклоняет небезопасные URL и дубликаты', () => {
  const source=sourceValidation.sources[0];
  const result=validateSources([source,source,{...source,id:'bad',url:'javascript:alert(1)'},{...source,id:'auth',url:'https://user:pass@example.com/'},{...source,id:'date',checkedAt:'bad'}]);
  assert.equal(result.sources.length,1); assert.equal(result.errors.length,4);
  assert.equal(validateSourceLinks([{...base,sourceIds:['missing']}],result.sources).length,1);
});
test('Вопросы без sourceIds остаются совместимыми, некорректные ссылки отклоняются', () => {
  const { sourceIds, ...legacy } = base;
  assert.equal(validateQuestions({legacy:[legacy]}).questions.length,1);
  for (const sourceIds of [[],['a','a'],[12], 'a']) assert.equal(validateQuestions({bad:[{...base,sourceIds}]}).questions.length,0);
});
test('Одиночный ответ требует точного совпадения', () => {
  assert.equal(isCorrect(base, base.correctAnswers), true);
  assert.equal(isCorrect(base, []), false);
  assert.equal(isCorrect(base, [(base.correctAnswers[0] + 1) % 4]), false);
});
test('Множественный ответ: порядок не важен, подмножество, лишние и повторы неверны', () => {
  const q: Question = { ...base, correctAnswers: [0,2] };
  assert.ok(isCorrect(q,[2,0]));
  for (const selected of [[0],[0,1,2],[0,0],[2,2]]) assert.equal(isCorrect(q,selected),false);
});
test('Повреждённые записи изолируются и не вытесняют валидные', () => {
  const bad = [null, {}, { ...base, id:'bad-1', correctAnswers:[99] }, { ...base,id:'bad-2',correctAnswers:[0,0] }, { ...base,id:'bad-3',options:['a','a'] }, { ...base,id:'bad-4',difficulty:'extreme' }, { ...base,id:'bad-5',image:'javascript:alert(1)' }];
  const r = validateQuestions({ one:[...bad,base], two:[base], three:{} });
  assert.equal(r.questions.length,1); assert.equal(r.errors.length,bad.length+2);
});
test('Ошибка добавляет вопрос в очередь, правильное повторение удаляет его', () => {
  const wrong: Answer = { questionId:base.id,selected:[],correct:false,at:new Date().toISOString() };
  const p = recordAnswer(emptyProgress(),wrong);
  assert.equal(progressStats(p).mistakes,1);
  const p2 = recordAnswer(p,{ ...wrong,correct:true,selected:base.correctAnswers });
  assert.equal(progressStats(p2).mistakes,0); assert.equal(progressStats(p2).accuracy,50);
  assert.equal(progressStats(p2).answered,1); assert.equal(progressStats(p2,[]).answered,0);
});
test('Завершение идемпотентно и не дублирует попытки', () => {
  const a: Answer = {questionId:base.id,selected:base.correctAnswers,correct:true,at:new Date().toISOString()};
  const session: Session = {id:'session',mode:'learn',questionIds:[base.id],answers:[a],index:0,selected:a.selected,revealed:true,startedAt:a.at,deadline:null};
  const p = recordAnswer({...emptyProgress(),active:session},a);
  const done = finishSession(p,session); const twice = finishSession(done,session);
  assert.equal(twice.history.length,1); assert.equal(progressStats(twice).attempts,1); assert.equal(twice.active,null);
});
test('История ограничена 100 занятиями', () => {
  let p = emptyProgress();
  for(let i=0;i<105;i++) p = finishSession(p,{id:String(i),mode:'exam',questionIds:[base.id],answers:[],index:0,selected:[],revealed:false,startedAt:new Date().toISOString(),deadline:Date.now()});
  assert.equal(p.history.length,100); assert.equal(p.history[0].id,'104');
});
test('Перемешивание не теряет элементы и не изменяет исходник', () => {
  const input=[1,2,3,4,5]; assert.deepEqual(shuffle(input).sort(),input); assert.deepEqual(input,[1,2,3,4,5]);
});
const bank = new Map(questions.map(q => [q.id,q]));
test('Резервная копия корректно восстанавливается', () => {
  const p=recordAnswer(emptyProgress(),{questionId:base.id,selected:base.correctAnswers,correct:true,at:new Date().toISOString()});
  assert.deepEqual(parseProgress(JSON.stringify(p),bank),p);
});
test('Повреждённые и несовместимые резервные копии отклоняются', () => {
  for(const value of ['{','null','{}',JSON.stringify({...emptyProgress(),version:2}),JSON.stringify({...emptyProgress(),records:{a:{attempts:1,correct:3,lastCorrect:true,lastAt:'invalid'}}})]) assert.throws(()=>parseProgress(value,bank));
});
test('Обновление базы отменяет недоступный сеанс, сохраняя статистику', () => {
  const active:Session={id:'old',mode:'learn',questionIds:['removed-id'],answers:[],index:0,selected:[],revealed:false,startedAt:new Date().toISOString(),deadline:null};
  assert.equal(parseProgress(JSON.stringify({...emptyProgress(),active}),bank).active,null);
});
test('Повреждённая последовательность ответов не восстанавливается', () => {
  const active:Session={id:'bad',mode:'learn',questionIds:[base.id],answers:[],index:0,selected:[],revealed:true,startedAt:new Date().toISOString(),deadline:null};
  assert.throws(()=>parseProgress(JSON.stringify({...emptyProgress(),active}),bank));
});
