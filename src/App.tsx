import { NavLink, Route, Routes, Link, useLocation } from 'react-router-dom';
import { Wine, LayoutDashboard, BookOpen, Layers, GraduationCap, RotateCcw, ChartNoAxesCombined, ArrowUpRight, X, Menu, ChevronRight } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Home } from './pages/Home';
import { Setup, Categories } from './pages/Setup';
import { Quiz, Results } from './pages/Quiz';
import { Stats } from './pages/Stats';
import { useProgress } from './lib/progress';
import { questionErrors } from './lib/questions';
const nav = [
  ['/', 'Главная', LayoutDashboard], ['/learn', 'Обучение', BookOpen], ['/categories', 'База знаний', Layers],
  ['/exam', 'Экзамен', GraduationCap], ['/mistakes', 'Работа над ошибками', RotateCcw], ['/stats', 'Моя статистика', ChartNoAxesCombined],
] as const;
export default function App() {
  const { progress, storageError, dismissError } = useProgress();
  const [menu, setMenu] = useState(false);
  const location = useLocation();
  useEffect(() => { setMenu(false); window.scrollTo(0, 0); }, [location.pathname]);
  const mistakes = Object.values(progress.records).filter(r => !r.lastCorrect).length;
  return <div className="app-shell">
    <a className="skip-link" href="#main-content" onClick={e => { e.preventDefault(); document.getElementById('main-content')?.focus(); }}>Перейти к содержимому</a>
    {menu && <button className="sidebar-scrim" onClick={() => setMenu(false)} aria-label="Закрыть меню" />}
    <aside className={`sidebar ${menu ? 'is-open' : ''}`}>
      <Link to="/" className="brand"><span className="brand-icon"><Wine size={27} strokeWidth={1.5} /></span><span>Sommelier<span className="brand-sub">A C A D E M Y</span></span></Link>
      <span className="nav-caption">ВАШЕ ОБУЧЕНИЕ</span>
      <nav>{nav.map(([path, label, Icon]) => <NavLink key={path} to={path} end={path === '/'}><Icon size={20} strokeWidth={1.7} /><span>{label}</span>{path === '/mistakes' && mistakes > 0 && <b className="nav-count">{mistakes}</b>}</NavLink>)}</nav>
      <div className="sidebar-note"><span className="eyebrow">ОТ ЛЮБОПЫТСТВА К МАСТЕРСТВУ</span><Wine size={28} /><p>Большое знание начинается<br />с одного вопроса.</p><Link to="/learn">Продолжить путь <ArrowUpRight size={16} /></Link></div>
      <div className="sidebar-bottom"><span className="avatar">SA</span><div><strong>Личный кабинет</strong><small>Прогресс на этом устройстве</small></div><span className="online-dot" /></div>
    </aside>
    <div className="workspace">
      <header className="topbar"><button className="icon-button mobile-menu" onClick={() => setMenu(!menu)} aria-label="Открыть меню" aria-expanded={menu}><Menu size={22} /></button><span className="top-crumb">Академия <ChevronRight size={14} /><span>{nav.find(([p]) => p === location.pathname)?.[1] ?? 'Ваше обучение'}</span></span><div className="top-right"><span className="live-label"><i /> Учитесь в своём ритме</span><span className="avatar small">SA</span></div></header>
      <main id="main-content" tabIndex={-1}>
        {storageError && <div className="notice" role="alert">{storageError}<button onClick={dismissError} className="icon-button" aria-label="Скрыть предупреждение"><X size={18} /></button></div>}
        {questionErrors.length > 0 && <div className="notice" role="alert">Пропущены некорректные записи: {questionErrors.length}. Проверьте базу командой npm run validate.</div>}
        <Routes><Route path="/" element={<Home />} /><Route path="/learn" element={<Setup mode="learn" />} /><Route path="/exam" element={<Setup mode="exam" />} /><Route path="/mistakes" element={<Setup mode="review" />} /><Route path="/categories" element={<Categories />} /><Route path="/quiz" element={<Quiz />} /><Route path="/results/:id" element={<Results />} /><Route path="/stats" element={<Stats />} /><Route path="*" element={<div className="empty"><h1>Страница не найдена</h1><Link className="btn primary" to="/">На главную</Link></div>} /></Routes>
      </main>
      <footer><span>Sommelier Academy</span><span>Понимать больше. Чувствовать тоньше.</span><span>Учебная платформа · 18+</span></footer>
    </div>
  </div>;
}
