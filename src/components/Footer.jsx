/**
 * Footer.jsx
 * 공통 푸터 컴포넌트
 * - GitHub 저장소 링크
 * - YouTube 링크
 */

import React from 'react';
import { useLanguage } from '../hooks';
import '../styles/footer.css';

const GITHUB_URL = 'https://github.com/Capstone-Design-Hongik/CamFree';
const YOUTUBE_URL = 'https://www.youtube.com/watch?v=4m9Il-CLZz8';

/**
 * Footer 컴포넌트
 * 모든 페이지 하단에 표시되는 외부 링크 모음
 */
function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="footer">
      <div className="wrap">
        <div className="footer-inner">
          <span className="footer-copyright">
            {t(
              '2026 졸업 프로젝트 — WiFi CSI 기반 실내 재실 감지 시스템',
              '2026 Graduation Project — WiFi CSI Indoor Presence Detection'
            )}
          </span>

          <div className="footer-links">
            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="footer-icon-link"
            >
              <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true">
                <path d="M12 .5C5.73.5.5 5.73.5 12c0 5.08 3.29 9.39 7.86 10.91.57.1.78-.25.78-.55 0-.27-.01-1.17-.02-2.12-3.2.7-3.88-1.36-3.88-1.36-.52-1.33-1.28-1.69-1.28-1.69-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.02 1.75 2.68 1.25 3.33.95.1-.74.39-1.25.71-1.54-2.56-.29-5.25-1.28-5.25-5.7 0-1.26.45-2.29 1.18-3.1-.12-.29-.51-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11 11 0 0 1 5.79 0c2.21-1.49 3.18-1.18 3.18-1.18.62 1.59.23 2.76.11 3.05.74.81 1.18 1.84 1.18 3.1 0 4.43-2.7 5.41-5.27 5.69.41.36.78 1.07.78 2.15 0 1.56-.01 2.81-.01 3.19 0 .31.21.66.79.55A10.51 10.51 0 0 0 23.5 12C23.5 5.73 18.27.5 12 .5Z" />
              </svg>
            </a>
            <a
              href={YOUTUBE_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="YouTube"
              className="footer-icon-link"
            >
              <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor" aria-hidden="true">
                <path d="M23.5 7.2s-.23-1.64-.94-2.36c-.9-.95-1.9-.95-2.36-1.01C16.9 3.5 12 3.5 12 3.5h-.01s-4.9 0-8.19.33c-.46.06-1.46.06-2.36 1.01C.74 5.56.5 7.2.5 7.2S.26 9.13.26 11.06v1.8c0 1.93.24 3.86.24 3.86s.24 1.64.94 2.36c.9.95 2.09.92 2.62 1.02 1.9.18 8.06.33 8.06.33s4.9-.01 8.19-.34c.46-.06 1.46-.06 2.36-1.01.71-.72.94-2.36.94-2.36s.24-1.93.24-3.86v-1.8c0-1.93-.24-3.86-.24-3.86ZM9.55 14.96V8.65l6.27 3.16-6.27 3.15Z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
