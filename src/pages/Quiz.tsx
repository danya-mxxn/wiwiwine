import { useEffect, useState, useRef } from 'react';
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom';
import { ArrowRight, Check, X, Clock, Lightbulb, Flag, Trophy, RotateCcw } from 'lucide-react';
import { useProgress } from '../lib/progress';
import { questions, questionMap, difficultyLabels, modeLabels, assetUrl } from '../lib/questions';
import { finishSession, isCorrect, recordAnswer } from '../lib/engine';
import { Empty, PageTitle, ProgressBar } from '../components/ui';
import { QuestionSources } from '../components/QuestionSources';
import type { Answer } from '../types';
export function Quiz() {
  const { progress, setProgress } = useProgress();
  const session = progress.active;
  const navigate = useNavigate();
  const [now, setNow] = useState(Date.now());
  const [confirmEnd, setConfirmEnd] = useState(false);
  const lock = useRef(false);
  useEffect(() => { const timer = window.setInterval(() => setNow(Date.now()), 1000); return () => clearInterval(timer); }, []);
  useEffect(() => { lock.current = false; }, [session?.index, session?.revealed]);
  useEffect(() => {
    if (session?.deadline && now >= session.deadline) {
      setProgress(p => p.active?.id === session.id ? finishSession(p, p.active) : p);
      navigate(`/results/${session.id}`, { replace: true });
    }
  }, [now, session, setProgress, navigate]);
  if (!session) return <Empty title="Нет активного занятия">Выберите категории и начните новое занятие.</Empty>;
  const q = questionMap.get(session.questionIds[session.index]);
  if (!q) return <Navigate to="/learn" replace />;
  const multi = q.correctAnswers.length > 1;
  const remaining = session.deadline ? Math.max(0, Math.ceil((session.deadline - now) / 1000)) : null;
  function select(index: number) {
    setProgress(p => {
      if (!p.active || p.active.revealed) return p;
      const selected = multi ? p.active.selected.includes(index) ? p.active.selected.filter(n => n !== index) : [...p.active.selected, index] : [index];
      return { ...p, active: { ...p.active, selected } };
    });
  }
  function submit() {
    if (lock.current) return;
    if (session!.deadline && Date.now() >= session!.deadline) {
      end(); return;
    }
    lock.current = true;
    setProgress(p => {
      const s = p.active;
      if (!s || s.revealed || !s.selected.length) return p;
      if (s.deadline && Date.now() >= s.deadline) return finishSession(p, s);
      const question = questionMap.get(s.questionIds[s.index])!;
      const answer: Answer = { questionId: question.id, selected: s.selected, correct: isCorrect(question, s.selected), at: new Date().toISOString() };
      const next = { ...s, answers: [...s.answers, answer], revealed: s.mode !== 'exam' };
      const updated = recordAnswer(p, answer);
      if (s.mode !== 'exam') return { ...updated, active: next };
      if (s.index + 1 === s.questionIds.length) return finishSession(updated, next);
      return { ...updated, active: { ...next, index: s.index + 1, selected: [], revealed: false } };
    });
    if (session!.mode === 'exam' && session!.index + 1 === session!.questionIds.length) navigate(`/results/${session!.id}`);
  }
  function next() {
    if (session!.index + 1 === session!.questionIds.length) {
      setProgress(p => p.active ? finishSession(p, p.active) : p); navigate(`/results/${session!.id}`);
    } else setProgress(p => p.active ? { ...p, active: { ...p.active, index: p.active.index + 1, selected: [], revealed: false } } : p);
  }
  function end() { setProgress(p => p.active ? finishSession(p, p.active) : p); navigate(`/results/${session!.id}`); }
  const correct = session.answers.at(-1)?.correct;
  return <div className="quiz-container"><div className="quiz-top"><span className="eyebrow">{modeLabels[session.mode]}</span>{remaining !== null && <span className={`timer ${remaining < 60 ? 'danger-text' : ''}`} role="timer"><Clock size={17} />{Math.floor(remaining / 60)}:{String(remaining % 60).padStart(2, '0')}</span>}<button className="text-link" onClick={() => setConfirmEnd(true)}><Flag size={16} /> Завершить</button></div>
    <div className="flex justify-between text-sm mb-3"><span className="muted">Вопрос {session.index + 1} из {session.questionIds.length}</span><span>{Math.round(session.answers.length / session.questionIds.length * 100)}%</span></div><ProgressBar value={session.answers.length / session.questionIds.length * 100} />
    <section className="panel question-panel" key={q.id} aria-labelledby="question-title"><div className="flex flex-wrap gap-2"><span className="badge">{q.category}</span><span className="badge neutral">{difficultyLabels[q.difficulty]}</span></div><p className="eyebrow mt-6">{q.subcategory}</p><h1 id="question-title">{q.question}</h1><p className="muted text-sm mb-6">{multi ? `Выберите все правильные ответы (${q.correctAnswers.length})` : 'Выберите один правильный ответ'}</p>
    {q.image && <img className="question-image" src={assetUrl(q.image)} alt={`Иллюстрация: ${q.subcategory}`} onError={e => { e.currentTarget.hidden = true; }} />}
    <div className="answer-options" role="group" aria-label="Варианты ответа">{q.options.map((option, i) => <button disabled={session.revealed} key={i} aria-pressed={session.selected.includes(i)} onClick={() => select(i)} className={`answer-option ${session.selected.includes(i) ? 'selected' : ''} ${session.revealed ? q.correctAnswers.includes(i) ? 'correct' : session.selected.includes(i) ? 'incorrect' : '' : ''}`}><span className={`answer-marker ${multi ? 'square' : ''}`}>{session.revealed && q.correctAnswers.includes(i) ? <Check size={16} /> : session.revealed && session.selected.includes(i) ? <X size={16} /> : String.fromCharCode(65 + i)}</span><span>{option}</span></button>)}</div>
    {session.revealed && <div className={`feedback ${correct ? 'success' : 'error'}`} role="status"><strong>{correct ? <Check size={20} /> : <Lightbulb size={20} />}{correct ? 'Верно! Ещё один шаг вперёд.' : 'Хорошая возможность узнать новое.'}</strong><p>{q.explanation}</p><QuestionSources question={q} /></div>}
    <div className="question-actions"><span className="muted text-xs">{session.mode === 'exam' ? 'Разбор ответов — после экзамена' : 'Прогресс сохраняется автоматически'}</span>{session.revealed ? <button className="btn primary" onClick={next}>{session.index + 1 === session.questionIds.length ? 'Посмотреть результат' : 'Следующий вопрос'}<ArrowRight size={17} /></button> : <button className="btn primary" disabled={!session.selected.length} onClick={submit}>{session.mode === 'exam' ? 'Ответить и продолжить' : 'Проверить ответ'}<ArrowRight size={17} /></button>}</div></section>
    {confirmEnd && <div className="modal-overlay"><div className="panel modal" role="dialog" aria-modal="true" aria-labelledby="end-title"><h2 id="end-title">Завершить занятие?</h2><p className="muted">Подтверждённые ответы сохранятся. Остальные вопросы будут отмечены как пропущенные.</p><div className="flex gap-3 mt-6 flex-wrap"><button autoFocus className="btn secondary" onClick={() => setConfirmEnd(false)}>Продолжить</button><button className="btn primary" onClick={end}>Завершить</button></div></div></div>}
  </div>;
}
export function Results() {
  const { id } = useParams();
  const { progress } = useProgress();
  const result = progress.history.find(r => r.id === id);
  if (!result) return <Empty title="Результат не найден">История хранит последние 100 занятий на этом устройстве.</Empty>;
  const correct = result.answers.filter(a => a.correct).length;
  const percent = Math.round(correct / result.questionIds.length * 100);
  return <><PageTitle eyebrow={modeLabels[result.mode]} title="Каждый ответ — это опыт">Занятие завершено. Закрепите то, что узнали.</PageTitle><section className="panel result-hero"><Trophy size={42} className="gold" /><h2>{percent}%</h2><p>{correct} правильных из {result.questionIds.length} вопросов</p><span className="muted">Ответили: {result.answers.length} · Пропустили: {result.questionIds.length - result.answers.length}</span><div className="flex gap-3 mt-6 flex-wrap justify-center"><Link to="/learn" className="btn primary">Новое занятие <ArrowRight size={17} /></Link><Link to="/mistakes" className="btn secondary"><RotateCcw size={17} /> Повторить ошибки</Link></div></section><div className="section-heading"><h2>Разбор ответов</h2></div><div className="review-list">{result.questionIds.map((qid, index) => {
    const q = questionMap.get(qid); const a = result.answers.find(a => a.questionId === qid);
    if (!q) return <div className="panel review-card" key={qid}>Вопрос {qid} больше не доступен в базе.</div>;
    return <details className="panel review-card" key={qid}><summary><span className={`result-dot ${a?.correct ? 'yes' : a ? 'no' : ''}`}>{a?.correct ? <Check size={16} /> : a ? <X size={16} /> : '—'}</span><span><small className="muted">{index + 1}. {q.category}</small><strong>{q.question}</strong></span><span className="muted review-status">{a?.correct ? 'Верно' : a ? 'Ошибка' : 'Пропущен'}</span></summary><div className="review-body"><p><span className="muted">Ваш ответ: </span>{a ? a.selected.map(i => q.options[i] ?? 'Вариант удалён').join(', ') : 'Не дан'}</p><p className="success-text">Правильный ответ: {q.correctAnswers.map(i => q.options[i]).join(', ')}</p><p className="muted mt-3">{q.explanation}</p><QuestionSources question={q} /></div></details>;
  })}</div></>;
}
