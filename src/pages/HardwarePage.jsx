/**
 * HardwarePage.jsx
 * 하드웨어 구성 상세 페이지
 */

import React from 'react';
import { useLanguage } from '../hooks';
import wiringPhoto from '../images/hardware_arch.png';
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
          <div className="detail-image-wrap">
            <img
              src={wiringPhoto}
              alt={t('Sender와 Receiver ESP32 보드를 노트북에 연결한 실제 구성 사진', 'Photo of the Sender and Receiver ESP32 boards wired to a laptop')}
              className="detail-image detail-image--sm"
            />
            <p className="detail-image-caption">
              {t('실제 ESP32 Sender / Receiver 보드와 노트북 연결 구성', 'Actual ESP32 Sender / Receiver board and laptop setup')}
            </p>
          </div>

          <div className="arch-cards arch-cards--spaced">
            {HARDWARE_SPECS.map((spec, index) => (
              <div key={index} className="arch-card">
                <div className="arch-card-label">{getText(spec.role)}</div>
                <h3 className="arch-card-title">{spec.name}</h3>
                <div className="arch-node-file arch-node-file--spaced">{spec.file}</div>
                <ul className="result-list">
                  {spec.details.map((detail, idx) => (
                    <li key={idx}>{getText(detail)}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="detail-block">
            <h3 className="sub-heading">
              {t('왜 커스텀 펌웨어를 사용했나', 'Why Custom Firmware?')}
            </h3>
            <p className="detail-text">
              {t(
                '표준 WiFi 통신을 그대로 쓰지 않고 ESP32에 직접 작성한 펌웨어를 플래시한 이유는 두 가지입니다. 첫째, 원하는 속도로 패킷을 송신하도록 직접 제어할 수 있습니다. 둘째, 표준 WiFi는 신호에 변화가 없으면 패킷을 보내지 않지만, 커스텀 펌웨어는 루프를 통해 변화 여부와 상관없이 패킷을 계속 전송하므로 CSI 데이터를 끊김 없이 수집할 수 있습니다.',
                'We flash custom firmware onto the ESP32 boards instead of relying on standard WiFi communication, for two reasons. First, it lets us control the exact rate at which packets are transmitted. Second, standard WiFi stops sending packets when there is no change to report, while our custom firmware loops continuously to keep transmitting regardless of change, so CSI data collection never drops out.'
              )}
            </p>
          </div>
          <br/>

          <div className="arch-flow">
            <div className="arch-node">
              <div className="arch-node-name">ESP32 Sender</div>
              <div className="arch-node-file">Sender.ino</div>
              <div className="arch-node-desc">{t('WiFi 패킷 전송', 'WiFi packet transmission')}</div>
            </div>
            <div className="arch-connector arch-connector--detailed">
              <span>{'>'}</span>
              <span className="arch-connector-label">{t('WiFi 신호', 'WiFi Signal')}</span>
            </div>
            <div className="arch-node">
              <div className="arch-node-name">ESP32 Receiver</div>
              <div className="arch-node-file">Receiver.ino</div>
              <div className="arch-node-desc">{t('CSI 수집', 'CSI Collection')}</div>
            </div>
            <div className="arch-connector arch-connector--detailed">
              <span>{'>'}</span>
              <span className="arch-connector-label">COM4 · 115200bps</span>
            </div>
            <div className="arch-node">
              <div className="arch-node-name">{t('노트북/PC', 'Laptop/PC')}</div>
              <div className="arch-node-file">detect.py</div>
              <div className="arch-node-desc">{t('CSI 분석 및 웹 서버', 'CSI analysis & web server')}</div>
            </div>
          </div>

          <div className="detail-block info-box">
            <h3 className="sub-heading">
              {t('설치 환경 요구사항', 'Installation Requirements')}
            </h3>
            <ul className="result-list">
              {REQUIREMENTS.map((req, idx) => (
                <li key={idx}>{getText(req)}</li>
              ))}
            </ul>
          </div>

          <div className="detail-block">
            <h3 className="sub-heading">
              {t('전시회 질문 — 기본 세팅', 'Exhibition Q&A — Basic Setup')}
            </h3>
            <div className="faq-list">
              <div className="faq-item">
                <p className="faq-q">
                  {t('와이파이를 이용한다면 벽을 넘어서도 감지하나요?', 'Since it uses WiFi, can it detect through walls?')}
                </p>
                <p className="faq-a">
                  {t(
                    '네. WiFi 신호는 벽과 같은 장애물을 투과하는 특성이 있어 벽 너머에서도 감지가 가능합니다. 실제로 문 근처에서의 움직임에도 반응하는 모습을 시연했습니다.',
                    'Yes. WiFi signals pass through obstacles like walls, so detection still works through them. We demonstrated this live, with movement near a door triggering a response.'
                  )}
                </p>
              </div>
              <div className="faq-item">
                <p className="faq-q">
                  {t('노트북에 연결한 와이파이는 공유기 와이파이인가요?', 'Is the WiFi connected to the laptop a regular router signal?')}
                </p>
                <p className="faq-a">
                  {t(
                    '아닙니다. ESP32 보드가 자체적으로 송출하는 전용 신호를 사용하며, 이는 가정에서 쓰는 WiFi 공유기와 같은 역할을 합니다. 기존 공유기 신호 대신 직접 만든 신호를 쓰는 이유는 원하는 방식과 속도로 패킷을 보내도록 직접 세팅했기 때문입니다.',
                    'No. We use a dedicated signal broadcast by the ESP32 board itself, playing the same role as a home WiFi router. We use our own signal instead of an existing router because we configured it ourselves to send packets at the exact rate and method we need.'
                  )}
                </p>
              </div>
              <div className="faq-item">
                <p className="faq-q">
                  {t('송신기는 왜 배터리에 연결했나요?', 'Why is the Sender powered by a battery?')}
                </p>
                <p className="faq-a">
                  {t(
                    '송신기는 감지하려는 공간에 독립적으로 배치되어야 하기 때문에, 노트북과 케이블로 연결하지 않고 배터리로 전원을 공급해 자유롭게 배치할 수 있도록 했습니다.',
                    'The Sender needs to be placed independently within the monitored space, so we power it with a battery instead of a cable connection, letting it be positioned freely.'
                  )}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default HardwarePage;
