import { createContext, useContext, useEffect, useState, type ReactNode, type Dispatch, type SetStateAction } from 'react';
import type { Progress } from '../types';
import { emptyProgress } from './engine';
import { parseProgress, STORAGE_KEY } from './storage';
import { questionMap } from './questions';

const Context = createContext<{
  progress: Progress; setProgress: Dispatch<SetStateAction<Progress>>;
  storageError: string; dismissError: () => void;
} | null>(null);
function load() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return { progress: raw ? parseProgress(raw, questionMap) : emptyProgress(), error: '' };
  } catch {
    return { progress: emptyProgress(), error: 'Не удалось прочитать сохранение. Можно импортировать резервную копию в статистике. Повреждённые данные не перезаписаны.' };
  }
}
export function ProgressProvider({ children }: { children: ReactNode }) {
  const [initial] = useState(load);
  const [progress, setProgress] = useState(initial.progress);
  const [storageError, setError] = useState(initial.error);
  useEffect(() => {
    // Do not overwrite a damaged save merely by opening the application.
    if (initial.error && progress === initial.progress) return;
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(progress)); }
    catch { setError('Браузер не разрешил сохранить прогресс. Экспортируйте резервную копию перед закрытием страницы.'); }
  }, [progress, initial]);
  return <Context.Provider value={{ progress, setProgress, storageError, dismissError: () => setError('') }}>{children}</Context.Provider>;
}
export function useProgress() {
  const value = useContext(Context);
  if (!value) throw new Error('ProgressProvider отсутствует');
  return value;
}
