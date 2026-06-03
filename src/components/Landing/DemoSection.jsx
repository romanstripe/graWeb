/**
 * DemoSection.jsx
 * 데모 영상 섹션
 * - YouTube 임베드 영상
 * - 상태 캡션 (SAFE, DETECTED, ALERT)
 */

import React, { forwardRef } from 'react';
import { useLanguage } from '../../hooks';

/**
 * 상태 캡션 데이터
 * 각 감지 상태의 색상과 설명 (한글/영어)
 */
const STATUS_CAPTIONS = [
  { status: 'safe', label: 'SAFE', desc: { ko: '방 비어있음', en: 'Room empty' } },
  { status: 'detected', label: 'DETECTED', desc: { ko: '존재 감지', en: 'Presence detected' } },
  { status: 'alert', label: 'ALERT', desc: { ko: '움직임 감지', en: 'Motion detected' } }
];

/**
 * DemoSection 컴포넌트
 * 프로젝트 시연 영상을 표시하는 섹션
 * forwardRef를 사용하여 부모에서 스크롤 이동 가능
 */
const DemoSection = forwardRef((props, ref) => {
  const { lang, t } = useLanguage();

  return (
    <section className="demo-section" ref={ref}>
      <div className="wrap">
        {/* 섹션 타이틀 */}
        <h2 className="demo-title">{t('시연 영상', 'Demo Video')}</h2>

        {/* YouTube 영상 임베드 */}
        <div className="video-wrap">
          <iframe 
            src="https://www.youtube.com/embed/4m9Il-CLZz8" 
            title="Wilson Demo"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>

        {/* 상태 캡션 */}
        <div className="demo-caption">
          {STATUS_CAPTIONS.map((item, index) => (
            <div key={index} className="demo-caption-item">
              <span className={`status-dot ${item.status}`} />
              <span className="demo-caption-text">
                {item.label}: {lang === 'ko' ? item.desc.ko : item.desc.en}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
});

// displayName 설정 (DevTools에서 컴포넌트 이름 표시)
DemoSection.displayName = 'DemoSection';

export default DemoSection;
