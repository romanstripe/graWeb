/**
 * ExhibitionFaq.jsx
 * 전시회에서 받은 질문 중 프로젝트 목적/활용 방안에 대한 반응
 */

import React from 'react';
import { useLanguage } from '../../hooks';

/**
 * ExhibitionFaq 컴포넌트
 * 전시회 관람객의 질문과 답변, 활용 아이디어를 짧게 소개
 */
function ExhibitionFaq() {
  const { t } = useLanguage();

  return (
    <section className="exhibition-section">
      <div className="wrap">
        <h3 className="sub-heading">
          {t('전시회 질문 — 목적과 활용', 'Exhibition Q&A — Purpose & Use')}
        </h3>
        <div className="faq-list">
          <div className="faq-item">
            <p className="faq-q">
              {t('카메라보다 안전한 방식인가요?', 'Is this safer than using a camera?')}
            </p>
            <p className="faq-a">
              {t(
                '네. 영상이 직접 촬영되지 않기 때문에 사생활 침해나 영상 유출 위험이 없습니다. 전시 관람객들도 카메라보다 안전하다는 반응을 보여주셨고, 폐건물 등 사람이 없는 공간에 미리 배치해 잠복 감시용으로 활용하면 좋겠다는 아이디어도 제안받았습니다.',
                'Yes. Since no video is captured, there is no risk of privacy invasion or footage leaks. Exhibition visitors agreed it felt safer than a camera, and some suggested using it for stakeout-style monitoring by placing it in advance in empty spaces like abandoned buildings.'
              )}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ExhibitionFaq;
