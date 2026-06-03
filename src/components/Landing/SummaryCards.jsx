/**
 * SummaryCards.jsx
 * 한 줄 요약 카드 3개 섹션
 * - 카메라 없이
 * - 실시간 감지
 * - 적응형 알고리즘
 */

import React from 'react';
import { useLanguage } from '../../hooks';

/**
 * 요약 카드 데이터
 * 각 카드의 제목과 설명 정의 (한글/영어)
 */
const SUMMARY_DATA = [
  {
    title: { ko: '카메라 없이', en: 'Camera-Free' },
    description: { ko: '카메라·PIR 센서 없이 WiFi 신호만으로 감지', en: 'Detection using only WiFi signals, no cameras or PIR sensors' }
  },
  {
    title: { ko: '실시간 감지', en: 'Real-Time' },
    description: { ko: '0.15초 간격으로 상태 업데이트', en: 'Status updates every 0.15 seconds' }
  },
  {
    title: { ko: '적응형 알고리즘', en: 'Adaptive' },
    description: { ko: '빈 방 기준선을 자동 설정·갱신', en: 'Auto-calibrates empty room baseline' }
  }
];

/**
 * SummaryCards 컴포넌트
 * 프로젝트의 핵심 특징을 3개 카드로 간결하게 표현
 */
function SummaryCards() {
  const { lang } = useLanguage();

  return (
    <section className="summary-section">
      <div className="wrap">
        <div className="summary-cards">
          {SUMMARY_DATA.map((card, index) => (
            <div key={index} className="summary-card">
              <h3 className="summary-card-title">
                {lang === 'ko' ? card.title.ko : card.title.en}
              </h3>
              <p className="summary-card-desc">
                {lang === 'ko' ? card.description.ko : card.description.en}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default SummaryCards;
