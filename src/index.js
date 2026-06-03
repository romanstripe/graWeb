/**
 * index.js
 * React 애플리케이션 진입점
 * DOM에 React 앱을 마운트
 */

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

/**
 * React 18 createRoot API 사용
 * StrictMode로 개발 시 잠재적 문제 감지
 */
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
