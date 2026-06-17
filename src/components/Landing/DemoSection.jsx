/**
 * DemoSection.jsx
 * 데모 영상 섹션
 * - YouTube 임베드 영상
 * - 상태 캡션 (SAFE, DETECTED, ALERT)
 */

import React, { forwardRef } from 'react';
import { useLanguage } from '../../hooks';


/**
 * DemoSection 컴포넌트
 * 프로젝트 설명 영상을 표시하는 섹션
 * forwardRef를 사용하여 부모에서 스크롤 이동 가능
 */
const DemoSection = forwardRef((props, ref) => {
  const { lang, t } = useLanguage();

  return (
    <section className="demo-section" ref={ref}>
      <div className="wrap">
        {/* 섹션 타이틀 */}
        <h2 className="demo-title">{t('프로젝트 설명 영상', 'Project Video')}</h2>

        {/* YouTube 영상 임베드 */}
        <div className="video-wrap">
          <iframe 
            src="https://www.youtube.com/embed/4m9Il-CLZz8" 
            title="Wilson Demo"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      </div>
    </section>
  );
});

// displayName 설정 (DevTools에서 컴포넌트 이름 표시)
DemoSection.displayName = 'DemoSection';

export default DemoSection;
