export type Difficulty = 'easy' | 'medium' | 'hard';
export type Mode = 'learn' | 'exam' | 'review';
export interface Question {
  id: string; category: string; subcategory: string; difficulty: Difficulty;
  question: string; options: string[]; correctAnswers: number[];
  explanation: string; image: string | null;
  sourceIds?: string[];
}
export interface KnowledgeSource {
  id: string; organization: string; title: string; url: string; checkedAt: string;
}
export interface Answer { questionId: string; selected: number[]; correct: boolean; at: string }
export interface Session {
  id: string; mode: Mode; questionIds: string[]; answers: Answer[];
  index: number; selected: number[]; revealed: boolean; startedAt: string;
  deadline: number | null;
}
export interface Result {
  id: string; mode: Mode; questionIds: string[]; answers: Answer[];
  startedAt: string; finishedAt: string;
}
export interface Progress {
  version: 1;
  records: Record<string, { attempts: number; correct: number; lastCorrect: boolean; lastAt: string }>;
  history: Result[]; active: Session | null;
}
