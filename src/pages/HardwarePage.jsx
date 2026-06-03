/**
 * HardwarePage.jsx
 * 하드웨어 구성 상세 페이지
 */

import React from 'react';
import { useLanguage } from '../hooks';
import '../styles/detail.css';

/**
 * 하드웨어 스펙 데이터 (한글/영어)
 */
const HARDWARE_SPECS = [
  {
    name: 'ESP32 Sender',
    file: 'Sender.ino',
    role: { ko: 'WiFi 패킷 전송', en: 'WiFi Packet Transmission' },
    details: [
      { ko: 'WiFi 패킷을 지속적으로 브로드캐스트', en: 'Continuously broadcasts WiFi packets' },
      { ko: '동일 공간 내 Receiver로 신호 전달', en: 'Transmits signals to Receiver in the same space' },
      { ko: 'ESP-NOW 또는 표준 WiFi 프로토콜 사용', en: 'Uses ESP-NOW or standard WiFi protocol' }
    ]
  },
  {
    name: 'ESP32 Receiver',
    file: 'Receiver.ino',
    role: { ko: 'CSI 수집 후 시리얼 출력', en: 'CSI Collection & Serial Output' },
    details: [
      { ko: 'Sender로부터 WiFi 패킷 수신', en: 'Receives WiFi packets from Sender' },
      { ko: '패킷의 CSI(채널 상태 정보) 추출', en: 'Extracts CSI (Channel State Information) from packets' },
      { ko: 'COM4, 115200bps로 PC에 시리얼 전송', en: 'Sends serial data to PC at COM4, 115200bps' }
    ]
  }
];

const REQUIREMENTS = [
  { ko: 'ESP32 개발 보드 2개 (ESP32-WROOM-32 권장)', en: '2 ESP32 development boards (ESP32-WROOM-32 recommended)' },
  { ko: 'USB 케이블 (Receiver 연결용)', en: 'USB cable (for Receiver connection)' },
  { ko: '전원 공급 (Sender용 - USB 또는 배터리)', en: 'Power supply (for Sender - USB or battery)' },
  { ko: 'Python 3.8+ 환경이 설치된 PC', en: 'PC with Python 3.8+ installed' },
  { ko: '두 보드는 같은 실내 공간에 배치', en: 'Both boards placed in the same indoor space' }
];

function HardwarePage() {
  const { lang, t } = useLanguage();
  const getText = (v) => typeof v === 'string' ? v : (lang === 'ko' ? v.ko : v.en);

  return (
    <div className="detail-page">
      <header className="detail-header">
        <div className="wrap">
          <h1>{t('하드웨어 구성', 'Hardware Setup')}</h1>
          <p className="detail-header-desc">
            {t('ESP32 보드 2대를 사용하여 WiFi 신호를 송수신합니다. 한쪽에서 신호를 보내고, 다른 한쪽에서 CSI 데이터를 수집하여 PC로 전달합니다.', 'Uses two ESP32 boards to transmit and receive WiFi signals. One sends signals while the other collects CSI data and transmits it to the PC.')}
          </p>
        </div>
      </header>

      <section className="arch-section">
        <div className="wrap">
          <div className="arch-cards" style={{ marginBottom: '40px' }}>
            {HARDWARE_SPECS.map((spec, index) => (
              <div key={index} className="arch-card">
                <div className="arch-card-label">{getText(spec.role)}</div>
                <h3 className="arch-card-title">{spec.name}</h3>
                <div className="arch-node-file" style={{ marginBottom: '12px' }}>{spec.file}</div>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {spec.details.map((detail, idx) => (
                    <li key={idx} style={{ fontSize: '14px', color: 'var(--text2)', lineHeight: '1.6', paddingLeft: '16px', position: 'relative' }}>
                      <span style={{ position: 'absolute', left: 0, top: '10px', width: '6px', height: '1px', background: 'var(--muted)' }} />
                      {getText(detail)}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="arch-flow">
            <div className="arch-node">
              <div className="arch-node-name">ESP32 Sender</div>
              <div className="arch-node-file">Sender.ino</div>
              <div className="arch-node-desc">{t('WiFi 패킷 전송', 'WiFi packet transmission')}</div>
            </div>
            <div className="arch-connector" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
              <span>- - - - →</span>
              <span style={{ fontSize: '11px', color: 'var(--muted)' }}>{t('WiFi 신호', 'WiFi Signal')}</span>
            </div>
            <div className="arch-node">
              <div className="arch-node-name">ESP32 Receiver</div>
              <div className="arch-node-file">Receiver.ino</div>
              <div className="arch-node-desc">{t('CSI 수집', 'CSI Collection')}</div>
            </div>
            <div className="arch-connector" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
              <span>→</span>
              <span style={{ fontSize: '11px', color: 'var(--muted)' }}>COM4</span>
              <span style={{ fontSize: '10px', color: 'var(--muted)' }}>115200bps</span>
            </div>
            <div className="arch-node">
              <div className="arch-node-name">{t('노트북/PC', 'Laptop/PC')}</div>
              <div className="arch-node-file">detect.py</div>
              <div className="arch-node-desc">{t('CSI 분석 및 웹 서버', 'CSI analysis & web server')}</div>
            </div>
          </div>

          <div style={{ marginTop: '40px', padding: '32px', background: 'var(--surface)', borderRadius: '8px', border: '1px solid var(--border)' }}>
            <h3 style={{ fontSize: '17px', fontWeight: 700, marginBottom: '16px' }}>
              {t('설치 환경 요구사항', 'Installation Requirements')}
            </h3>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {REQUIREMENTS.map((req, idx) => (
                <li key={idx} style={{ fontSize: '14px', color: 'var(--text2)', lineHeight: '1.6' }}>
                  • {getText(req)}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}

export default HardwarePage;
