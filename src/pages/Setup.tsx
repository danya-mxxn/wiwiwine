import { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { Search, ArrowRight, Check, Clock, Info } from 'lucide-react';
import { questions, categories, difficultyLabels, modeLabels } from '../lib/questions';
import { useProgress } from '../lib/progress';
import { shuffle } from '../lib/engine';
import { CategoryCard, CategoryIcon, Empty, PageTitle, topic } from '../components/ui';
import type { Mode, Difficulty, Session } from '../types';
export function Categories() {
  const [search, setSearch] = useState('');
  const [group, setGroup] = useState('Все');
  const filtered = categories.filter(c => (group === 'Все' || topic(c) === group) && `${c} ${questions.filter(q => q.category === c).map(q => q.subcategory).join(' ')}`.toLowerCase().includes(search.toLowerCase()));
  return <><PageTitle eyebrow="БИБЛИОТЕКА ЗНАНИЙ" title="Откройте свою следующую тему">{questions.length} вопросов · {categories.length} категорий · три больших мира напитков</PageTitle><div className="filter-row"><div className="tabs">{['Все','Вино','Крепкий алкоголь','Пиво'].map(g => <button className={group === g ? 'active' : ''} key={g} onClick={() => setGroup(g)}>{g}</button>)}</div><label className="search"><Search size={18} /><input value={search} onChange={e => setSearch(e.target.value)} placeholder="Найти тему…" aria-label="Поиск категорий" /></label></div><div className="category-grid">{filtered.map(c => <CategoryCard key={c} category={c} />)}</div>{!filtered.length && <p className="empty muted">По вашему запросу ничего не найдено.</p>}</>;
}
export function Setup({ mode }: { mode: Mode }) {
  const [params] = useSearchParams();
  const [chosen, setChosen] = useState<string[]>(params.get('category') ? [params.get('category')!] : []);
  const [difficulty, setDifficulty] = useState<Difficulty | 'all'>('all');
  const [count, setCount] = useState('10');
  const [minutes, setMinutes] = useState(20);
  const [replace, setReplace] = useState(false);
  const { progress, setProgress } = useProgress();
  const navigate = useNavigate();
  const pool = questions.filter(q => (!chosen.length || chosen.includes(q.category)) && (difficulty === 'all' || q.difficulty === difficulty) && (mode !== 'review' || progress.records[q.id]?.lastCorrect === false));
  const total = count === 'all' ? pool.length : Math.min(Number(count), pool.length);
  function start() {
    if (!total) return;
    if (progress.active && !replace) { setReplace(true); return; }
    const session: Session = { id: crypto.randomUUID(), mode, questionIds: shuffle(pool).slice(0, total).map(q => q.id), answers: [], index: 0, selected: [], revealed: false, startedAt: new Date().toISOString(), deadline: mode === 'exam' ? Date.now() + minutes * 60000 : null };
    setProgress(p => ({ ...p, active: session })); navigate('/quiz');
  }
  if (mode === 'review' && !questions.some(q => progress.records[q.id]?.lastCorrect === false)) return <><PageTitle eyebrow="ПОВТОРЕНИЕ" title="Работа над ошибками" /><Empty title="Сейчас нет вопросов для повторения">После неверного ответа вопрос появится здесь. Правильный ответ уберёт его из очереди.</Empty></>;
  return <><PageTitle eyebrow={mode === 'exam' ? 'ВЫЗОВ ВАШИМ ЗНАНИЯМ' : 'ВАШ ЛИЧНЫЙ МАРШРУТ'} title={modeLabels[mode]}>{mode === 'exam' ? 'Ответьте на вопросы до окончания времени. Разбор откроется после завершения.' : 'Выберите интересные темы и двигайтесь в комфортном темпе.'}</PageTitle>
    <div className="setup-layout"><div className="panel setup-form"><div className="form-section"><div className="flex justify-between items-center"><h2><span className="step-number">01</span> Категории</h2><button className="text-link" onClick={() => setChosen([])}>Все категории</button></div><p className="muted text-sm mb-5">Ничего не выбрано — используем всю доступную базу.</p><div className="category-choices">{categories.map(c => <button key={c} className={`category-choice ${chosen.includes(c) ? 'selected' : ''}`} aria-pressed={chosen.includes(c)} onClick={() => setChosen(prev => prev.includes(c) ? prev.filter(x => x !== c) : [...prev, c])}><CategoryIcon category={c} size={18} /><span>{c}</span>{chosen.includes(c) && <Check size={16} />}</button>)}</div></div>
    <div className="form-section"><h2><span className="step-number">02</span> Уровень сложности</h2><div className="tabs wide mt-5">{(['all','easy','medium','hard'] as const).map(d => <button key={d} className={difficulty === d ? 'active' : ''} onClick={() => setDifficulty(d)}>{d === 'all' ? 'Все уровни' : difficultyLabels[d]}</button>)}</div></div>
    <div className="form-section"><h2><span className="step-number">03</span> Количество вопросов</h2><div className="tabs mt-5">{['10','20','50','100','all'].map(n => <button className={count === n ? 'active' : ''} onClick={() => setCount(n)} key={n}>{n === 'all' ? 'Все' : n}</button>)}</div></div>
    {mode === 'exam' && <div className="form-section"><h2><Clock size={20} /> Время экзамена</h2><label className="select-label mt-5">Длительность<select value={minutes} onChange={e => setMinutes(Number(e.target.value))}>{[5,10,20,30,60].map(n => <option key={n} value={n}>{n} минут</option>)}</select></label></div>}</div>
    <aside className="panel session-summary"><span className="eyebrow">ВАШЕ ЗАНЯТИЕ</span><h2>{total} <span className="muted">вопросов</span></h2><p>{chosen.length ? `Выбрано категорий: ${chosen.length}` : 'Все категории'}</p><p className="muted">{difficulty === 'all' ? 'Все уровни сложности' : difficultyLabels[difficulty]}</p><hr /><p className="summary-hint"><Info size={18} />{mode === 'exam' ? `${minutes} мин. Таймер продолжает идти после закрытия вкладки. Каждый ответ окончательный.` : 'Без ограничения времени. После ответа вы увидите объяснение.'}</p>{count !== 'all' && Number(count) > pool.length && <p className="muted text-sm">По фильтрам доступно {pool.length} вопросов. Включим все найденные.</p>}{replace && <div className="notice block" role="alert">У вас есть незавершённое занятие. Новое заменит его, подтверждённые ответы останутся в статистике.<Link className="text-link mt-3" to="/quiz">Продолжить прежнее</Link></div>}<button className="btn primary w-full" disabled={!total} onClick={start}>{replace ? 'Заменить и начать' : mode === 'exam' ? 'Начать экзамен' : 'Начать занятие'}<ArrowRight size={17} /></button>{!total && <p className="muted text-sm mt-3" role="status">Нет вопросов. Измените фильтры.</p>}</aside></div>
  </>;
}
