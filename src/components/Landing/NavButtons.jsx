/**
 * NavButtons.jsx
 * 상세 페이지로 이동하는 네비게이션 버튼 그리드
 * - 시스템 흐름 (Architecture)
 * - 작동 원리 (Technique)
 * - 하드웨어 구성 (Hardware)
 * - 구현 과정 (Implementation)
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../hooks';

/**
 * 네비게이션 버튼 데이터
 * 각 버튼의 경로, 아이콘, 제목, 설명 정의 (한글/영어)
 */
const NAV_BUTTONS = [
  {
    path: '/architecture',
    title: { ko: '시스템 흐름', en: 'Architecture' },
    description: { ko: 'ESP32 > Flask > 웹 연동 구조', en: 'ESP32 > Flask > Web integration' }
  },
  {
    path: '/technique',
    title: { ko: '작동 원리', en: 'Technique' },
    description: { ko: 'CSI 분석 및 상태 판정 알고리즘', en: 'CSI analysis & state detection algorithm' }
  },
  {
    path: '/hardware',
    title: { ko: '하드웨어 구성', en: 'Hardware' },
    description: { ko: 'ESP32 보드 2대 구성 및 연결', en: 'ESP32 board setup & connection' }
  },
  {
    path: '/implementation',
    title: { ko: '구현 과정', en: 'Implementation' },
    description: { ko: '개발 과정, 결과 및 한계점', en: 'Development process, results & limitations' }
  }
];

/**
 * NavButtons 컴포넌트
 * 4개의 상세 페이지로 이동하는 버튼 그리드
 */
function NavButtons() {
  const { lang } = useLanguage();

  return (
    <section className="nav-buttons-section">
      <div className="wrap">
        <div className="nav-buttons-grid">
          {NAV_BUTTONS.map((button, index) => (
            <Link 
              key={index} 
              to={button.path} 
              className="nav-button"
            >
              <span className="nav-button-title">
                {lang === 'ko' ? button.title.ko : button.title.en}
              </span>
              <span className="nav-button-desc">
                {lang === 'ko' ? button.description.ko : button.description.en}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export default NavButtons;
