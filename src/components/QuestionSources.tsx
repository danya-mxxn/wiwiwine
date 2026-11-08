import { ExternalLink } from 'lucide-react';
import type { Question } from '../types';
import { sourceMap } from '../lib/questions';

export function QuestionSources({ question }: { question: Question }) {
  const sources = (question.sourceIds ?? []).flatMap(id => {
    const source = sourceMap.get(id); return source ? [source] : [];
  });
  if (!sources.length) return null;
  return <div className="question-sources"><span>По материалам официальных источников</span>{sources.map(s => <a key={s.id} href={s.url} target="_blank" rel="noopener noreferrer"><ExternalLink size={13} aria-hidden="true" /><span>{s.organization} · {s.title}<small>Проверено {new Date(s.checkedAt + 'T00:00:00').toLocaleDateString('ru-RU')}</small></span></a>)}</div>;
}
