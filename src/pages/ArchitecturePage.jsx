/**
 * ArchitecturePage.jsx
 * 시스템 흐름/아키텍처 상세 페이지
 * - 시스템 아키텍처 다이어그램 설명
 * - ESP32 > Flask > 웹 연동 구조
 * - 프론트엔드/백엔드 API 연동 방식
 */

import React from 'react';
import { useLanguage } from '../hooks';
import architectureDiagram from '../images/dataflow.png';
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
          <div className="detail-image-wrap">
            <img
              src={architectureDiagram}
              alt={t('하드웨어, 백엔드, 프론트엔드로 이어지는 시스템 아키텍처 다이어그램', 'System architecture diagram from hardware to backend to frontend')}
              className="detail-image"
            />
            <p className="detail-image-caption">
              {t('하드웨어 > 백엔드 > 프론트엔드로 이어지는 전체 데이터 흐름', 'Full data flow from hardware to backend to frontend')}
            </p>
          </div>

          <div className="arch-flow">
            {ARCH_NODES.map((node, index) => (
              <React.Fragment key={index}>
                <div className="arch-node">
                  <div className="arch-node-name">{getText(node.name)}</div>
                  <div className="arch-node-file">{node.file}</div>
                  <div className="arch-node-desc">{getText(node.desc)}</div>
                </div>
                {index < ARCH_NODES.length - 1 && <div className="arch-connector">{'>'}</div>}
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

          <div className="detail-block">
            <h3 className="sub-heading">
              {t('데이터 흐름 상세', 'Data Flow Details')}
            </h3>
            <p className="detail-text">
              {t(
                'ESP32 보드 2대를 사용합니다. 한쪽 보드(Sender)가 WiFi 신호를 송신하고, 다른 한쪽 보드(Receiver)가 이를 수집해 시리얼 통신으로 PC에 전달합니다. 전달된 데이터는 백엔드 서버인 detect.py에서 분석됩니다. 사용자가 보는 프론트엔드 페이지는 백엔드 서버의 /events 주소에 SSE 방식으로 연결되어 있습니다. 일반적인 폴링 방식 대신 서버에서 상태 변화가 발생했을 때만 데이터를 전송하는 방식을 사용하여 실시간성과 효율성을 모두 높였습니다.',
                'Using two ESP32 boards, one (the Sender) transmits WiFi signals while the other (the Receiver) collects them and forwards the data to the PC via serial communication. The data is then analyzed by the backend server, detect.py. The frontend page the user sees connects to the backend server\'s /events endpoint via SSE. Instead of traditional polling, the server only pushes data when a state change occurs, improving both real-time responsiveness and efficiency.'
              )}
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default ArchitecturePage;
