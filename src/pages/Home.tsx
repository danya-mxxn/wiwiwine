import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight, BookOpen, GraduationCap, RotateCcw, ChartNoAxesCombined, Check, Target, Library, Sparkles, Wine } from 'lucide-react';
import { questions, categories } from '../lib/questions';
import { useProgress } from '../lib/progress';
import { progressStats } from '../lib/engine';
import { CategoryCard, ProgressBar } from '../components/ui';
export function Home() {
  const { progress } = useProgress();
  const s = progressStats(progress, questions.map(q => q.id));
  const modes = [
    { to: '/learn', icon: BookOpen, name: 'Обучение', label: 'Шаг за шагом', text: 'Изучайте темы в своём темпе. Каждый ответ — с подробным объяснением.', cta: 'Начать обучение', className: 'wine' },
    { to: '/exam', icon: GraduationCap, name: 'Экзамен', label: 'Проверьте себя', text: 'Соберите знания воедино. Вопросы на время и честная оценка результата.', cta: 'Пройти экзамен', className: 'golden' },
    { to: '/mistakes', icon: RotateCcw, name: 'Работа над ошибками', label: 'Закрепите знания', text: 'Вернитесь к сложным вопросам и превратите пробелы в уверенные знания.', cta: 'Повторить материал', className: 'sage' },
    { to: '/stats', icon: ChartNoAxesCombined, name: 'Моя статистика', label: 'Ваш личный рост', text: 'Следите за прогрессом, находите сильные стороны и ставьте новые цели.', cta: 'Посмотреть прогресс', className: 'slate' },
  ];
  return <>
    <div className="welcome"><div><p className="eyebrow">ВАШ ПУТЬ В МИР ВИНА И НАПИТКОВ</p><h1>Искусство знать больше<span className="gold">.</span></h1><p className="muted">Развивайте вкус к знаниям. Один вопрос за другим.</p></div><span className="edition">SOMMELIER ACADEMY <span>EST. 2026</span></span></div>
    <section className="hero"><div className="hero-content"><span className="hero-tag"><span /> ОБУЧЕНИЕ С ХАРАКТЕРОМ</span><h2>За каждым бокалом —<br /><em>целый мир.</em></h2><p>От первого знакомства с терруаром до тонкостей<br className="hidden md:block" /> выдержки. Откройте его вместе с нами.</p><Link to="/learn" className="btn cream">Начать обучение <ArrowRight size={18} /></Link><div className="hero-foot"><span><Check size={14} /> В своём темпе</span><span><Check size={14} /> Без регистрации</span><span><Check size={14} /> С объяснениями</span></div></div><div className="hero-art" aria-hidden="true"><div className="orbit orbit-one" /><div className="orbit orbit-two" /><span className="art-caption">IN VINO · SCIENTIA</span><div className="bottle"><div className="bottle-neck" /><div className="bottle-body"><div className="bottle-label"><Wine size={28} /><span>SOMMELIER</span><i>La connaissance</i><small>ACADEMY · CUVÉE 01</small></div></div></div><div className="drawn-glass"><div className="glass-bowl"><div className="wine-fill" /></div><div className="glass-stem" /><div className="glass-foot" /></div><span className="art-year">LE GOÛT DU SAVOIR</span></div></section>
    {progress.active && <div className="resume panel"><div><strong>Ваше занятие ждёт продолжения</strong><p className="muted text-sm">Пройдено {progress.active.answers.length} из {progress.active.questionIds.length} вопросов</p></div><Link to="/quiz" className="btn secondary">Продолжить <ArrowRight size={17} /></Link></div>}
    <div className="stats-grid">{[
      [Library, questions.length, 'Вопросов в базе', `${categories.length} категорий знаний`], [Check, s.answered, 'Вопросов пройдено', 'Каждый шаг имеет значение'], [Target, `${s.accuracy}%`, 'Правильных ответов', s.attempts ? `За ${s.attempts} попыток` : 'Ваш первый ответ впереди'], [RotateCcw, s.mistakes, 'Требуют повторения', s.mistakes ? 'Закрепите сложные темы' : 'Начните с чистого листа'],
    ].map(([Icon, value, label, note]) => { const I = Icon as typeof Library; return <div className="stat-card panel" key={String(label)}><div className="flex justify-between items-center"><span className="muted text-sm">{String(label)}</span><I size={18} className="gold" /></div><strong>{String(value)}</strong><small>{String(note)}</small></div>; })}</div>
    <div className="section-heading"><div><h2>Выберите свой формат</h2><p className="muted">Четыре способа стать увереннее в своих знаниях</p></div><span className="eyebrow desktop-label">УЧИТЬСЯ · ПРАКТИКОВАТЬ · РАСТИ</span></div>
    <div className="mode-grid">{modes.map(m => <Link to={m.to} className={`mode-card panel ${m.className}`} key={m.to}><div className="flex justify-between"><span className="mode-icon"><m.icon size={24} strokeWidth={1.5} /></span><ArrowUpRight size={18} className="muted" /></div><span className="eyebrow mt-6">{m.label}</span><h3>{m.name}</h3><p>{m.text}</p><span className="mode-cta">{m.cta} <ArrowRight size={16} /></span></Link>)}</div>
    <div className="section-heading"><div><h2>Мир знаний</h2><p className="muted">Вино, крепкий алкоголь и пиво — от основ к деталям</p></div><Link to="/categories" className="text-link">Все категории <ArrowRight size={16} /></Link></div>
    <div className="category-grid">{['Виноградные сорта','Винодельческие регионы','Шампань','Виски'].filter(c => categories.includes(c)).map(c => <CategoryCard key={c} category={c} />)}</div>
    <div className="journey panel"><span className="icon-tile"><Sparkles size={22} /></span><div><h3>Ваше мастерство начинается с любопытства</h3><p className="muted text-sm">Изучено {s.answered} из {questions.length} вопросов. Продолжайте открывать новое.</p></div><div className="journey-progress"><span>{Math.round(s.answered / Math.max(questions.length, 1) * 100)}% пути</span><ProgressBar value={s.answered / Math.max(questions.length, 1) * 100} /></div></div>
  </>;
}
