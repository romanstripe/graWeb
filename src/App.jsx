/**
 * App.jsx
 * 메인 애플리케이션 컴포넌트
 * - React Router 설정
 * - 전역 레이아웃 (Header, Footer)
 * - 페이지 라우팅
 * - 언어 Context Provider
 */

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// 공통 컴포넌트
import Header from './components/Header';
import Footer from './components/Footer';

// 페이지 컴포넌트
import {
  LandingPage,
  ArchitecturePage,
  TechniquePage,
  HardwarePage,
  ImplementationPage
} from './pages';

// 언어 Context
import { LanguageProvider } from './hooks';

// 전역 스타일
import './styles/common.css';

/**
 * App 컴포넌트
 * 애플리케이션의 루트 컴포넌트
 * 라우팅과 전역 레이아웃을 관리
 */
function App() {
  return (
    <LanguageProvider>
      <Router>
        {/* 전역 레이아웃 구조 */}
        <div className="app">
          {/* 공통 헤더 - 모든 페이지에서 표시 */}
          <Header />
          
          {/* 페이지 라우팅 */}
          <Routes>
            {/* 랜딩/메인 페이지 */}
            <Route path="/" element={<LandingPage />} />
            
            {/* 시스템 흐름 (아키텍처) 페이지 */}
            <Route path="/architecture" element={<ArchitecturePage />} />
            
            {/* 작동 원리 (테크닉) 페이지 */}
            <Route path="/technique" element={<TechniquePage />} />
            
            {/* 하드웨어 구성 페이지 */}
            <Route path="/hardware" element={<HardwarePage />} />
            
            {/* 구현 과정 페이지 */}
            <Route path="/implementation" element={<ImplementationPage />} />
          </Routes>
          
          {/* 공통 푸터 - 모든 페이지에서 표시 */}
          <Footer />
        </div>
      </Router>
    </LanguageProvider>
  );
}

export default App;
