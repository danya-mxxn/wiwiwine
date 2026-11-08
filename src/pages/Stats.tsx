import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Download, Upload, Trash2, ArrowUpRight } from 'lucide-react';
import { useProgress } from '../lib/progress';
import { questions, categories, modeLabels, questionMap } from '../lib/questions';
import { emptyProgress, progressStats } from '../lib/engine';
import { parseProgress } from '../lib/storage';
import { PageTitle, ProgressBar } from '../components/ui';
import type { Progress } from '../types';
export function Stats() {
  const { progress, setProgress } = useProgress();
  const s = progressStats(progress, questions.map(q => q.id));
  const input = useRef<HTMLInputElement>(null);
  const [message, setMessage] = useState('');
  const [pending, setPending] = useState<Progress | 'reset' | null>(null);
  function download() {
    const url = URL.createObjectURL(new Blob([JSON.stringify(progress, null, 2)], { type: 'application/json' }));
    const link = document.createElement('a'); link.href = url; link.download = `sommelier-backup-${new Date().toISOString().slice(0,10)}.json`; link.click(); setTimeout(() => URL.revokeObjectURL(url), 1000);
  }
  async function upload(file?: File) {
    if (!file) return;
    try { if (file.size > 10 * 1024 * 1024) throw new Error('Файл слишком большой. Максимум 10 МБ.'); setPending(parseProgress(await file.text(), questionMap)); setMessage(''); }
    catch (error) { setMessage(error instanceof Error ? error.message : 'Не удалось прочитать файл.'); }
    if (input.current) input.current.value = '';
  }
  return <><PageTitle eyebrow="ВАШ ЛИЧНЫЙ РОСТ" title="Моя статистика">Знания накапливаются. Посмотрите, как далеко вы уже продвинулись.</PageTitle><div className="stats-grid">{[[s.answered,'Вопросов пройдено'],[`${s.accuracy}%`,'Точность всех ответов'],[s.mistakes,'В очереди повторения'],[progress.history.length,'Завершённых занятий']].map(([value,label]) => <div className="panel stat-card" key={label}><span className="muted text-sm">{label}</span><strong>{value}</strong></div>)}</div><div className="stats-layout"><section className="panel padded"><h2>Прогресс по категориям</h2><p className="muted text-sm mb-6">Доля вопросов, на которые вы хотя бы раз ответили</p><div className="category-progress-list">{categories.map(c => { const pool = questions.filter(q => q.category === c); const cs = progressStats(progress, pool.map(q => q.id)); const percent = Math.round(cs.answered / pool.length * 100); return <Link to={`/learn?category=${encodeURIComponent(c)}`} key={c}><div className="flex justify-between text-sm mb-2"><span>{c}</span><span className="muted">{cs.answered}/{pool.length} · {percent}%</span></div><ProgressBar value={percent} /></Link>; })}</div></section><section className="panel padded"><h2>История занятий</h2><p className="muted text-sm mb-6">Последние 100 завершённых занятий</p>{!progress.history.length && <p className="muted">Здесь появится ваше первое завершённое занятие.</p>}<div className="history-list">{progress.history.map(r => <Link key={r.id} to={`/results/${r.id}`}><div><strong>{modeLabels[r.mode]}</strong><small>{new Date(r.finishedAt).toLocaleString('ru-RU', { dateStyle: 'short', timeStyle: 'short' })} · {r.questionIds.length} вопр.</small></div><span>{Math.round(r.answers.filter(a => a.correct).length / r.questionIds.length * 100)}%</span><ArrowUpRight size={17} /></Link>)}</div></section></div><section className="panel padded mt-6"><h2>Ваши данные под вашим контролем</h2><p className="muted text-sm">Прогресс хранится только в этом браузере. Сохраните копию перед очисткой данных или переходом на другое устройство.</p><div className="flex gap-3 mt-6 flex-wrap"><button className="btn secondary" onClick={download}><Download size={17} /> Экспорт прогресса</button><button className="btn secondary" onClick={() => input.current?.click()}><Upload size={17} /> Импорт копии</button><button className="btn ghost danger-text" onClick={() => setPending('reset')}><Trash2 size={17} /> Сбросить прогресс</button><input hidden ref={input} type="file" accept=".json,application/json" onChange={e => upload(e.target.files?.[0])} /></div>{message && <p className="mt-4" role="status">{message}</p>}</section>{pending && <div className="modal-overlay"><div className="panel modal" role="dialog" aria-modal="true" aria-labelledby="data-title"><h2 id="data-title">{pending === 'reset' ? 'Сбросить весь прогресс?' : 'Заменить прогресс резервной копией?'}</h2><p className="muted">{pending === 'reset' ? 'История, ответы и текущее занятие будут удалены с этого устройства.' : 'Текущие ответы, история и занятие будут заменены данными файла.'} Сначала можно отменить действие и экспортировать данные.</p><div className="flex gap-3 mt-6"><button autoFocus className="btn secondary" onClick={() => setPending(null)}>Отмена</button><button className="btn primary" onClick={() => { setProgress(pending === 'reset' ? emptyProgress() : pending); setMessage(pending === 'reset' ? 'Прогресс сброшен.' : 'Резервная копия загружена.'); setPending(null); }}>Подтвердить</button></div></div></div>}</>;
}
