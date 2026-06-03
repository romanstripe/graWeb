/**
 * ImplementationPage.jsx
 * 구현 과정 상세 페이지
 */

import React from 'react';
import { useLanguage } from '../hooks';
import '../styles/detail.css';

/**
 * 타임라인 데이터 (한글/영어)
 */
const TIMELINE_ITEMS = [
  {
    phase: { ko: '1단계', en: 'Phase 1' },
    status: 'done',
    title: { ko: 'ESP32 CSI 수집 환경 세팅', en: 'ESP32 CSI Collection Environment Setup' },
    body: { ko: 'ESP32 보드 2대를 활용한 CSI 데이터 수집 환경을 구축했습니다. Sender와 Receiver 펌웨어를 개발하고 시리얼 통신을 설정했습니다.', en: 'Built a CSI data collection environment using two ESP32 boards. Developed Sender and Receiver firmware and configured serial communication.' }
  },
  {
    phase: { ko: '2단계', en: 'Phase 2' },
    status: 'done',
    title: { ko: 'Python 알고리즘 구현', en: 'Python Algorithm Implementation' },
    body: { ko: 'CSI 데이터를 분석하는 Python 알고리즘을 개발했습니다. 진폭 계산, 워밍업 기준선 설정, 비대칭 EMA 스무딩을 구현했습니다.', en: 'Developed Python algorithms for analyzing CSI data. Implemented amplitude calculation, warmup baseline setting, and asymmetric EMA smoothing.' }
  },
  {
    phase: { ko: '3단계', en: 'Phase 3' },
    status: 'pivot',
    title: { ko: 'Windows subprocess stdout 버퍼링 문제 해결', en: 'Windows subprocess stdout Buffering Issue Resolution' },
    body: { ko: 'Windows 환경에서 subprocess stdout 버퍼링 문제가 발생했습니다. PYTHONUNBUFFERED=1 설정과 UTF-8 인코딩 이슈를 해결했습니다.', en: 'Encountered subprocess stdout buffering issues in Windows environment. Resolved with PYTHONUNBUFFERED=1 setting and UTF-8 encoding fixes.' }
  },
  {
    phase: { ko: '4단계', en: 'Phase 4' },
    status: 'done',
    title: { ko: '임계값 튜닝 실험', en: 'Threshold Tuning Experiments' },
    body: { ko: '다양한 환경에서 테스트를 수행하며 REL 임계값을 최적화했습니다. SAFE, DETECTED, ALERT 상태 구분을 위한 최적 값을 도출했습니다.', en: 'Conducted tests in various environments to optimize REL thresholds. Derived optimal values for distinguishing SAFE, DETECTED, and ALERT states.' }
  }
];

const ACHIEVEMENTS = [
  { ko: 'CSI 기반 분석으로 RSSI 단독 방식 대비 감지 성능 향상', en: 'Improved detection performance compared to RSSI-only methods through CSI-based analysis' },
  { ko: 'ESP32–Python–웹 연동 실시간 모니터링 시스템 구현', en: 'Implemented real-time monitoring system with ESP32-Python-Web integration' },
  { ko: '카메라 없이 Wi-Fi 신호만으로 움직임 감지 가능성 확인', en: 'Confirmed feasibility of motion detection using only WiFi signals without cameras' },
  { ko: '비대칭 EMA 적용으로 ALERT 상태 안정성 확보', en: 'Achieved ALERT state stability through asymmetric EMA application' }
];

const LIMITATIONS = [
  { ko: '워밍업 단계에서 방을 비워야 함', en: 'Room must be empty during warmup phase' },
  { ko: '환경 변화에 따라 임계값 재설정 필요', en: 'Threshold recalibration needed when environment changes' },
  { ko: 'COM 포트에 의존하여 현재 단일 PC 기반 환경에서만 동작', en: 'Currently operates only in single PC environment due to COM port dependency' }
];

function ImplementationPage() {
  const { lang, t } = useLanguage();
  const getText = (v) => typeof v === 'string' ? v : (lang === 'ko' ? v.ko : v.en);

  const getTimelineClass = (status) => {
    switch (status) {
      case 'done': return 'tl-done';
      case 'pivot': return 'tl-pivot';
      case 'fail': return 'tl-fail';
      default: return '';
    }
  };

  return (
    <div className="detail-page">
      <header className="detail-header">
        <div className="wrap">
          <h1>{t('구현 과정', 'Implementation')}</h1>
          <p className="detail-header-desc">
            {t('프로젝트 개발 과정에서 겪은 도전과 해결 방법, 그리고 최종 성과와 향후 개선점을 정리했습니다.', 'A summary of challenges faced during project development, solutions found, final achievements, and future improvements.')}
          </p>
        </div>
      </header>

      <section className="arch-section">
        <div className="wrap">
          <h2 style={{ fontSize: '24px', fontWeight: 700, marginBottom: '32px' }}>
            {t('개발 타임라인', 'Development Timeline')}
          </h2>
          
          <div className="timeline">
            {TIMELINE_ITEMS.map((item, index) => (
              <div key={index} className={`tl-item ${getTimelineClass(item.status)}`}>
                <div className="tl-dot" />
                <div className="tl-phase">{getText(item.phase)}</div>
                <h3 className="tl-title">{getText(item.title)}</h3>
                <p className="tl-body">{getText(item.body)}</p>
              </div>
            ))}
          </div>

          <div style={{ marginTop: '80px' }}>
            <h2 style={{ fontSize: '24px', fontWeight: 700, marginBottom: '20px' }}>
              {t('어려웠던 점', 'Challenges')}
            </h2>
            <p style={{ fontSize: '15px', color: 'var(--text2)', lineHeight: '1.8', maxWidth: '720px' }}>
              {t('초기에 선택한 핵심 하드웨어 플랫폼의 기술적 한계를 발견해 시스템을 전면 재구성하였습니다. 아키텍처를 재검토하고 ESP32 기반으로 전환하며 개발 및 실험 일정을 재조정해야 했지만, 이를 통해 안정적인 데이터 수집 환경을 구축할 수 있었습니다.', 'We discovered technical limitations in the initially selected core hardware platform and had to completely restructure the system. Although we had to review the architecture, transition to ESP32-based setup, and readjust development and testing schedules, this allowed us to build a stable data collection environment.')}
            </p>
          </div>

          <div style={{ marginTop: '80px' }}>
            <h2 style={{ fontSize: '24px', fontWeight: 700, marginBottom: '32px' }}>
              {t('결과 및 한계', 'Results & Limitations')}
            </h2>
            
            <div className="results-grid">
              <div className="result-card">
                <div className="result-head success">{t('성과', 'Achievements')}</div>
                <ul className="result-list">
                  {ACHIEVEMENTS.map((item, index) => (
                    <li key={index}>{getText(item)}</li>
                  ))}
                </ul>
              </div>
              
              <div className="result-card">
                <div className="result-head limit">{t('한계', 'Limitations')}</div>
                <ul className="result-list">
                  {LIMITATIONS.map((item, index) => (
                    <li key={index}>{getText(item)}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default ImplementationPage;
