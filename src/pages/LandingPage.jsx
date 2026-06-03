/**
 * LandingPage.jsx
 * 메인 랜딩 페이지
 * - Hero 섹션
 * - 요약 카드
 * - 데모 영상
 * - 상세 페이지 네비게이션 버튼
 */

import React, { useRef, useCallback } from 'react';
import { Hero, SummaryCards, DemoSection, NavButtons } from '../components/Landing';
import '../styles/landing.css';

/**
 * LandingPage 컴포넌트
 * 프로젝트의 메인 랜딩 페이지
 * useRef와 useCallback을 사용하여 데모 섹션 스크롤 기능 구현
 */
function LandingPage() {
  /**
   * 데모 섹션 참조
   * Hero에서 "데모 보기" 버튼 클릭 시 스크롤 이동에 사용
   */
  const demoRef = useRef(null);

  /**
   * 데모 섹션으로 스무스 스크롤
   * Hero 컴포넌트에 props로 전달
   */
  const scrollToDemo = useCallback(() => {
    if (demoRef.current) {
      demoRef.current.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  }, []);

  return (
    <main>
      {/* 히어로 섹션 - 메인 타이틀, 설명, CTA */}
      <Hero onDemoClick={scrollToDemo} />
      
      {/* 구분선 */}
      <hr className="rule" />
      
      {/* 요약 카드 3개 - 핵심 특징 */}
      <SummaryCards />
      
      {/* 구분선 */}
      <hr className="rule" />
      
      {/* 데모 영상 섹션 */}
      <DemoSection ref={demoRef} />
      
      {/* 구분선 */}
      <hr className="rule" />
      
      {/* 상세 페이지 네비게이션 버튼 4개 */}
      <NavButtons />
    </main>
  );
}

export default LandingPage;
