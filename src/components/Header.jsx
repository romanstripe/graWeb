/**
 * Header.jsx
 * 공통 헤더 컴포넌트
 * - 로고 (홈으로 이동)
 * - 네비게이션 링크
 * - 언어 토글 버튼 (한글/영어)
 */

import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useLanguage } from '../hooks';
import '../styles/header.css';

/**
 * Header 컴포넌트
 * 모든 페이지에서 공유되는 상단 네비게이션 바
 * useLocation을 사용해 현재 페이지에 따른 스타일링 가능
 */
function Header() {
  const location = useLocation();
  const { lang, toggleLang, t } = useLanguage();
  
  /**
   * 현재 경로가 홈인지 확인
   * 홈이 아닌 경우 "돌아가기" 링크 표시 가능
   */
  const isHome = location.pathname === '/';

  return (
    <nav className="header-nav">
      <div className="wrap header-inner">
        {/* 로고 - 클릭시 홈으로 이동 */}
        <Link to="/" className="nav-logo">
          WILSON
        </Link>

        <div className="nav-right">
          {/* 네비게이션 메뉴 */}
          <ul className="nav-links">
            {/* 홈이 아닌 경우 홈으로 돌아가기 링크 표시 */}
            {!isHome && (
              <li>
                <Link to="/">{t('홈으로', 'Home')}</Link>
              </li>
            )}
            
            {/* 상세 페이지 링크들 */}
            <li>
              <Link to="/architecture">{t('시스템 흐름', 'Architecture')}</Link>
            </li>
            <li>
              <Link to="/technique">{t('작동 원리', 'Technique')}</Link>
            </li>
            <li>
              <Link to="/hardware">{t('하드웨어', 'Hardware')}</Link>
            </li>
            <li>
              <Link to="/implementation">{t('구현 과정', 'Implementation')}</Link>
            </li>
          </ul>

          {/* 언어 토글 버튼 */}
          <div className="nav-lang">
            <button 
              className={lang === 'ko' ? 'active' : ''} 
              onClick={() => lang !== 'ko' && toggleLang()}
            >
              KO
            </button>
            <button 
              className={lang === 'en' ? 'active' : ''} 
              onClick={() => lang !== 'en' && toggleLang()}
            >
              EN
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Header;
