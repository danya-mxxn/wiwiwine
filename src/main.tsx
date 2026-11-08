import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import App from './App';
import { ProgressProvider } from './lib/progress';
import './styles.css';

class ErrorBoundary extends React.Component<{ children: React.ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  render() { return this.state.failed ? <div className="empty"><h1>Не удалось открыть приложение</h1><p>Обновите страницу. Сохранённый прогресс останется в браузере.</p><button className="btn primary" onClick={() => location.reload()}>Обновить</button></div> : this.props.children; }
}
ReactDOM.createRoot(document.getElementById('root')!).render(<React.StrictMode><ErrorBoundary><HashRouter><ProgressProvider><App /></ProgressProvider></HashRouter></ErrorBoundary></React.StrictMode>);
