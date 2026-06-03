/**
 * Hero.jsx
 * 랜딩 페이지 히어로 섹션
 * - 메인 타이틀
 * - 프로젝트 설명
 * - CTA 버튼 (데모 보기, GitHub)
 * - 팀원 소개
 */

import React from 'react';
import { useLanguage } from '../../hooks';

/**
 * Hero 컴포넌트
 * 랜딩 페이지 최상단에 표시되는 메인 소개 영역
 * @param {function} onDemoClick - 데모 섹션으로 스크롤하는 함수
 */
function Hero({ onDemoClick }) {
  const { t } = useLanguage();

  return (
    <section className="hero">
      <div className="wrap">
        {/* 메인 타이틀 */}
        <h1>
          {t('WiFi CSI 기반', 'WiFi CSI-Based')}<br />
          <span className="accent">
            {t('실내 재실 감지 시스템', 'Indoor Presence Detection')}
          </span>
        </h1>

        {/* 프로젝트 설명 */}
        <p className="hero-desc">
          {t(
            'ESP32 보드와 채널 상태 정보(CSI)를 활용한 비침습적 움직임 감지 시스템입니다. 카메라나 PIR 센서 없이 WiFi 신호만으로 공간 내 사람의 존재와 움직임을 감지합니다.',
            'A non-invasive motion detection system using ESP32 boards and Channel State Information (CSI). Detects human presence and movement using only WiFi signals, without cameras or PIR sensors.'
          )}
        </p>

        {/* CTA 버튼들 */}
        <div className="hero-actions">
          <button 
            className="btn btn-dark" 
            onClick={onDemoClick}
          >
            {t('데모 보기 ↓', 'Watch Demo ↓')}
          </button>
        </div>

        {/* 팀 정보 */}
        <div className="hero-team">
          <span className="hero-team-label">
            {t('2026 졸업 프로젝트', '2026 Graduation Project')}
          </span>
          <span className="hero-team-names">
            박서연 · 이소현 · 김채영
          </span>
        </div>
      </div>
    </section>
  );
}

export default Hero;
