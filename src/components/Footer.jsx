/**
 * Footer.jsx
 * 공통 푸터 컴포넌트
 * - 팀원 정보 (이름, 역할)
 * - 프로젝트 정보
 */

import React from 'react';
import { useLanguage } from '../hooks';
import '../styles/footer.css';

/**
 * 팀원 데이터
 * 각 팀원의 이름과 담당 역할 정의 (한글/영어)
 */
const TEAM_MEMBERS = [
  {
    name: '이소현',
    role: { ko: '프로젝트 기획, 실험 설계 및 성능 검증', en: 'Project Planning, Experiment Design & Validation' }
  },
  {
    name: '박서연',
    role: { ko: 'ESP32 펌웨어 개발 및 CSI 데이터 수집', en: 'ESP32 Firmware & CSI Data Collection' }
  },
  {
    name: '김채영',
    role: { ko: '프론트엔드 개발 및 발표 콘텐츠 제작', en: 'Frontend Development & Presentation' }
  }
];

/**
 * Footer 컴포넌트
 * 모든 페이지 하단에 표시되는 팀 정보와 프로젝트 메타 정보
 */
function Footer() {
  const { lang, t } = useLanguage();

  return (
    <footer className="footer">
      <div className="wrap">
        <div className="footer-inner">
          {/* 팀원 정보 영역 */}
          <div className="footer-team">
            <span className="footer-team-title">Team Members</span>
            <div className="footer-members">
              {TEAM_MEMBERS.map((member, index) => (
                <div key={index} className="footer-member">
                  <span className="footer-member-name">{member.name}</span>
                  <span className="footer-member-role">
                    {lang === 'ko' ? member.role.ko : member.role.en}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* 우측 정보 영역 */}
          <div className="footer-right">
            <span className="footer-copyright">
              {t(
                '2026 졸업 프로젝트 — WiFi CSI 기반 실내 재실 감지 시스템',
                '2026 Graduation Project — WiFi CSI Indoor Presence Detection'
              )}
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
