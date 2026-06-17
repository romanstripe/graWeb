/**
 * LanguageContext.jsx
 * 언어 전환(한글/영어) 기능을 위한 Context
 * - 전역 언어 상태 관리
 * - 언어 전환 함수 제공
 */

import React, { createContext, useContext, useState, useCallback } from 'react';

/**
 * 언어 Context 생성
 * 기본값: 한국어 ('ko')
 */
const LanguageContext = createContext({
  lang: 'ko',
  toggleLang: () => {},
  t: (ko, en) => ko
});

/**
 * 언어 Provider 컴포넌트
 * 앱 전체에 언어 상태를 제공
 */
export function LanguageProvider({ children }) {
  const [lang, setLang] = useState('ko');

  /**
   * 언어 토글 함수
   * ko / en 전환
   */
  const toggleLang = useCallback(() => {
    setLang(prev => prev === 'ko' ? 'en' : 'ko');
  }, []);

  /**
   * 번역 함수
   * @param {string} ko - 한국어 텍스트
   * @param {string} en - 영어 텍스트
   * @returns {string} 현재 언어에 맞는 텍스트
   */
  const t = useCallback((ko, en) => {
    return lang === 'ko' ? ko : en;
  }, [lang]);

  return (
    <LanguageContext.Provider value={{ lang, toggleLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

/**
 * 언어 Context 사용 Hook
 * @returns {{ lang: string, toggleLang: function, t: function }}
 */
export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}

export default LanguageContext;
