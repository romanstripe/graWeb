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
 * 팀원 데이터
 * 각 팀원의 이름과 담당 역할 정의 (한글/영어)
 */
const TEAM_MEMBERS = [
  {
    name: '김채영',
    role: { ko: '프론트엔드 개발 및 발표 콘텐츠 제작', en: 'Frontend Development & Presentation' }
  },
  {
    name: '박서연',
    role: { ko: 'ESP32 펌웨어 개발 및 CSI 데이터 수집', en: 'ESP32 Firmware & CSI Data Collection' }
  },
  {
    name: '이소현',
    role: { ko: '프로젝트 기획, 실험 설계 및 성능 검증', en: 'Project Planning, Experiment Design & Validation' }
  }
];

/**
 * Hero 컴포넌트
 * 랜딩 페이지 최상단에 표시되는 메인 소개 영역
 * @param {function} onDemoClick - 데모 섹션으로 스크롤하는 함수
 */
function Hero({ onDemoClick }) {
  const { lang, t } = useLanguage();

  return (
    <section className="hero">
      <div className="wrap">
        {/* 메인 타이틀 */}
        <h1>
          {t('WiFi CSI 기반', 'WiFi CSI-Based')}<br />
          {t('실내 재실 감지 시스템', 'Indoor Presence Detection')}
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
            {t('데모 보기', 'Watch Demo')}
          </button>
        </div>

        {/* 팀 정보 - 졸업 프로젝트 및 팀원별 담당 역할 */}
        <div className="hero-team">
          <div className="hero-team-members">
            {TEAM_MEMBERS.map((member, index) => (
              <div key={index} className="hero-team-member">
                <span className="hero-team-member-name">{member.name}</span>
                <span className="hero-team-member-role">
                  {lang === 'ko' ? member.role.ko : member.role.en}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
