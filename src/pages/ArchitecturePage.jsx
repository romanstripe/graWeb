/**
 * ArchitecturePage.jsx
 * 시스템 흐름/아키텍처 상세 페이지
 * - 시스템 아키텍처 다이어그램 설명
 * - ESP32 → Flask → 웹 연동 구조
 * - 프론트엔드/백엔드 API 연동 방식
 */

import React from 'react';
import { useLanguage } from '../hooks';
import '../styles/detail.css';

/**
 * 아키텍처 노드 데이터 (한글/영어)
 */
const ARCH_NODES = [
  { name: 'ESP32 Sender', file: 'sender.ino', desc: { ko: 'WiFi 패킷 지속 전송', en: 'Broadcasts WiFi packets' } },
  { name: 'ESP32 Receiver', file: 'receiver.ino', desc: { ko: 'CSI 수집 · 시리얼 출력', en: 'Collects CSI · serial output' } },
  { name: { ko: 'Python 분석기', en: 'Python Analyzer' }, file: 'detect.py', desc: { ko: 'CSI 파싱 · 상태 판정', en: 'Parses CSI · classifies state' } },
  { name: 'Flask Server', file: 'detect.py', desc: { ko: 'subprocess · SSE 스트리밍', en: 'subprocess · SSE streaming' } },
  { name: { ko: '브라우저', en: 'Browser' }, file: 'index.html', desc: { ko: '실시간 대시보드', en: 'Real-time dashboard' } }
];

/**
 * 아키텍처 카드 데이터 (한글/영어)
 */
const ARCH_CARDS = [
  {
    label: { ko: '하드웨어', en: 'Hardware' },
    title: { ko: 'ESP32 보드 2대', en: 'Two ESP32 Boards' },
    body: { ko: 'Sender가 WiFi 패킷을 지속적으로 방출하고, Receiver가 수신한 패킷의 CSI를 시리얼(COM4, 115200bps)로 PC에 전달합니다. 두 보드는 같은 공간 안에 배치됩니다.', en: 'The Sender continuously broadcasts WiFi packets while the Receiver captures CSI and forwards it to the PC via serial (COM4, 115200bps). Both boards are placed in the same room.' }
  },
  {
    label: { ko: '소프트웨어', en: 'Software' },
    title: 'Python + Flask SSE',
    body: { ko: 'detect.py가 Flask 기반 API 서버로 구성되어 있습니다. SSE(Server-Sent Events) 방식으로 브라우저에 실시간 스트리밍합니다. Windows에서의 stdout 버퍼링 문제는 PYTHONUNBUFFERED=1로 해결했습니다.', en: 'detect.py serves as a Flask-based API server. It streams state updates to the browser via SSE (Server-Sent Events). On Windows, stdout buffering was resolved using PYTHONUNBUFFERED=1.' }
  }
];

/**
 * ArchitecturePage 컴포넌트
 */
function ArchitecturePage() {
  const { lang, t } = useLanguage();
  const getText = (v) => typeof v === 'string' ? v : (lang === 'ko' ? v.ko : v.en);

  return (
    <div className="detail-page">
      <header className="detail-header">
        <div className="wrap">
          <h1>{t('시스템 흐름', 'System Architecture')}</h1>
          <p className="detail-header-desc">
            {t('프론트엔드와 백엔드를 API 방식으로 연동하여 실시간 감지 결과를 사용자 화면에 표시하는 구조입니다. ESP32는 데이터를 수집하는 하드웨어 역할을 합니다.', 'A system architecture that connects frontend and backend via API to display real-time detection results. ESP32 serves as the hardware for data collection.')}
          </p>
        </div>
      </header>

      <section className="arch-section">
        <div className="wrap">
          <div className="arch-flow">
            {ARCH_NODES.map((node, index) => (
              <React.Fragment key={index}>
                <div className="arch-node">
                  <div className="arch-node-name">{getText(node.name)}</div>
                  <div className="arch-node-file">{node.file}</div>
                  <div className="arch-node-desc">{getText(node.desc)}</div>
                </div>
                {index < ARCH_NODES.length - 1 && <div className="arch-connector">→</div>}
              </React.Fragment>
            ))}
          </div>

          <div className="arch-cards">
            {ARCH_CARDS.map((card, index) => (
              <div key={index} className="arch-card">
                <div className="arch-card-label">{getText(card.label)}</div>
                <h3 className="arch-card-title">{getText(card.title)}</h3>
                <p className="arch-card-body">{getText(card.body)}</p>
              </div>
            ))}
          </div>

          <div style={{ marginTop: '40px' }}>
            <h3 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '16px' }}>
              {t('데이터 흐름 상세', 'Data Flow Details')}
            </h3>
            <p style={{ fontSize: '14px', color: 'var(--text2)', lineHeight: '1.8' }}>
              {t(
                'ESP32 보드 2대를 사용하며, 한쪽에서 전류를 통해 흘려보낸 WiFi 신호를 한쪽에서 수집합니다. 이러한 시리얼 통신으로 전달된 데이터를 백엔드 서버인 detect.py에서 분석합니다. 사용자가 실제로 보는 프론트엔드 웹 페이지는 백엔드 서버의 /events 주소에 SSE 방식으로 연결하였습니다. 일반적인 폴링 방식이 아닌 서버에서 상태변화가 생겼을 때 전송하는 것이 실시간성과 효율성을 높일 수 있다고 판단하여, 프론트엔드에서 요청을 보내면 detect.py가 데이터를 분석해 그 결과값을 기반으로 화면의 상태를 변경하도록 구성하였습니다.',
                'Using two ESP32 boards, one transmits WiFi signals and the other collects them. The data transmitted via serial communication is analyzed by the backend server detect.py. The frontend web page connects to the backend server\'s /events endpoint via SSE. Rather than using traditional polling, we determined that having the server push updates when state changes occur would improve real-time performance and efficiency.'
              )}
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default ArchitecturePage;
