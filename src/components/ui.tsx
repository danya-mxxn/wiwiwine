import { ArrowUpRight, Grape, GlassWater, Wine, Beer, MapPin, Layers, Sparkles, FlaskConical, BookOpen } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { ReactNode } from 'react';
import { questions } from '../lib/questions';
import { useProgress } from '../lib/progress';
import { progressStats } from '../lib/engine';

export function topic(category: string) {
  if (['Пивоварение', 'Стили пива', 'Пивные стили: практика'].includes(category)) return 'Пиво';
  if (['Основы крепкого алкоголя','Бочки и выдержка','Виски','Стили виски','Коньяк и бренди','Ром','Текила и мескаль','Джин и водка','Ликёры и другие спирты'].includes(category)) return 'Крепкий алкоголь';
  return 'Вино';
}
export function CategoryIcon({ category, size = 22 }: { category: string; size?: number }) {
  const Icon = topic(category) === 'Пиво' ? Beer : topic(category) === 'Крепкий алкоголь' ? GlassWater
    : /сорта/.test(category) ? Grape : /регион|Франция|Италия|Испания|Германия|Португалия|Свет/.test(category) ? MapPin
    : /Почвы|Cru/.test(category) ? Layers : /Игрист|Шампань|Креман|Просекко|Франчакорта/.test(category) ? Sparkles
    : /Технология/.test(category) ? FlaskConical : Wine;
  return <Icon size={size} strokeWidth={1.6} />;
}
export function ProgressBar({ value }: { value: number }) {
  return <div className="progress-track" role="progressbar" aria-valuenow={value} aria-valuemin={0} aria-valuemax={100} aria-label="Прогресс"><span style={{ width: `${value}%` }} /></div>;
}
export function CategoryCard({ category }: { category: string }) {
  const { progress } = useProgress();
  const pool = questions.filter(q => q.category === category);
  const stats = progressStats(progress, pool.map(q => q.id));
  const percent = Math.round(stats.answered / pool.length * 100);
  return <Link to={`/learn?category=${encodeURIComponent(category)}`} className="category-card panel group">
    <div className="flex items-center justify-between"><span className="icon-tile"><CategoryIcon category={category} /></span><ArrowUpRight size={18} className="muted" /></div>
    <span className="eyebrow mt-5">{topic(category)}</span><h3>{category}</h3>
    <p className="muted text-sm">{pool.length} вопр. · {new Set(pool.map(q => q.subcategory)).size} темы</p>
    <div className="flex justify-between text-xs mt-6 mb-2"><span className="muted">Изучено {stats.answered} из {pool.length}</span><span>{percent}%</span></div><ProgressBar value={percent} />
  </Link>;
}
export function PageTitle({ eyebrow, title, children }: { eyebrow: string; title: string; children?: ReactNode }) {
  return <div className="page-heading"><p className="eyebrow">{eyebrow}</p><h1>{title}</h1>{children && <p className="muted">{children}</p>}</div>;
}
export function Empty({ title, children }: { title: string; children: ReactNode }) {
  return <div className="panel empty"><BookOpen size={36} className="gold" /><h2>{title}</h2><p className="muted">{children}</p><Link to="/learn" className="btn primary">Начать обучение</Link></div>;
}
