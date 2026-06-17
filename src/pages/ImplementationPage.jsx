/**
 * ImplementationPage.jsx
 * 구현 과정 상세 페이지
 */

import React from 'react';
import { useLanguage } from '../hooks';
import timelineImage from '../images/timeline.png';
import '../styles/detail.css';

/**
 * 타임라인 데이터 (한글/영어)
 */
const TIMELINE_ITEMS = [
  {
    phase: { ko: '개발 과정', en: 'Development Phase' },
    status: 'pivot',
    title: { ko: '라즈베리파이 기반 환경 시도', en: 'Raspberry Pi-Based Setup Attempt' },
    body: { ko: '초기에는 라즈베리파이로 시스템을 구성하려 했으나, CSI 데이터 수집과 통신 과정에서 예상보다 많은 제약이 발생했습니다. 환경 설정과 데이터 처리가 복잡해 프로젝트 기간 내 안정적인 결과를 얻기 어렵다고 판단해 방향을 전환했습니다.', en: 'We initially tried building the system around a Raspberry Pi, but ran into far more constraints than expected during CSI data collection and communication. Environment setup and data processing were too complex to yield stable results within the project timeline, so we changed direction.' }
  },
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
    status: 'done',
    title: { ko: 'Windows subprocess stdout 버퍼링 문제 해결', en: 'Windows subprocess stdout Buffering Issue Resolution' },
    body: { ko: 'Windows 환경에서 subprocess stdout 버퍼링 문제가 발생했습니다. PYTHONUNBUFFERED=1 설정과 UTF-8 인코딩 이슈를 해결했습니다.', en: 'Encountered subprocess stdout buffering issues in Windows environment. Resolved with PYTHONUNBUFFERED=1 setting and UTF-8 encoding fixes.' }
  },
  {
    phase: { ko: '4단계', en: 'Phase 4' },
    status: 'done',
    title: { ko: '임계값 튜닝 실험', en: 'Threshold Tuning Experiments' },
    body: { ko: 'ESP32 전환 이후 오탐지 문제가 발생해 다양한 환경에서 테스트를 수행하며 REL 임계값을 최적화했습니다. SAFE, DETECTED, ALERT 상태 구분을 위한 최적 값을 도출했습니다.', en: 'After switching to ESP32, false detections occurred, so we tested across various environments to optimize REL thresholds. We derived the optimal values for distinguishing SAFE, DETECTED, and ALERT states.' }
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
          <h2 className="section-heading">
            {t('개발 타임라인', 'Development Timeline')}
          </h2>

          <div className="detail-image-wrap">
            <img
              src={timelineImage}
              alt={t('CSI 수집 환경 세팅부터 임계값 튜닝까지 4단계 개발 과정 다이어그램', 'Four-phase development process diagram from CSI collection setup to threshold tuning')}
              className="detail-image"
            />
            <p className="detail-image-caption">
              {t('ESP32 전환 이후의 핵심 4단계 (라즈베리파이 시도 단계는 별도)', 'The four core phases after switching to ESP32 (the Raspberry Pi attempt is shown separately below)')}
            </p>
          </div>

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

          <div className="detail-block">
            <h2 className="section-heading">
              {t('어려웠던 점', 'Challenges')}
            </h2>
            <p className="detail-text">
              {t(
                '초기에는 라즈베리파이로 시스템을 구성하려 했으나 CSI 데이터 수집 및 통신 과정에서 예상보다 많은 제약이 발생해 ESP32 기반으로 전환했습니다. 전환 이후에는 오탐지 문제가 발생해, 수집한 CSI 데이터를 지속적으로 분석하며 탐지 기준을 조정했습니다. Relative 값과 현재 스코어, 배경 스코어 같은 지표를 반복적으로 비교하며 실제 움직임과 노이즈를 구분하는 기준을 찾기 위해 여러 차례 실험을 진행했습니다.',
                'We initially tried to build the system around a Raspberry Pi, but switched to an ESP32-based setup after running into far more constraints than expected during CSI data collection and communication. After switching, we ran into false-detection issues, so we continuously analyzed the collected CSI data and adjusted our detection criteria. We repeatedly compared metrics like the relative value, current score, and background score, running many experiments to find a threshold that could distinguish real movement from noise.'
              )}
            </p>
          </div>

          <div className="detail-block">
            <h2 className="section-heading">
              {t('느낀 점', 'Reflections')}
            </h2>
            <p className="detail-text">
              {t(
                '이번 프로젝트에서는 특정 문제를 해결하는 데 많은 시간을 투자했습니다. 라즈베리파이를 다루는 과정과, ESP32 전환 이후 탐지 정확도를 높이기 위해 임계값을 조정하는 과정에서 많은 시행착오를 겪었습니다. 정확도를 높이는 것은 중요했지만, 그만큼 다른 기능을 추가하거나 다양한 시도를 해볼 시간은 줄어들었습니다. 하나의 문제를 완벽히 해결하는 데만 집중하기보다 일정 수준의 성능을 확보한 뒤 다른 기능 개발을 함께 진행하는 방식이 더 효율적이었을 것이라고 생각합니다. 앞으로는 전체 목표를 고려해 우선순위를 조정하며 더 유연하게 개발을 진행하고자 합니다.',
                'We spent a lot of time solving specific problems in this project — working with the Raspberry Pi, and later tuning thresholds to improve detection accuracy after switching to ESP32. While improving accuracy was important, it left less time for adding other features or trying different approaches. Looking back, securing a reasonable level of performance and developing other features in parallel would likely have been more efficient than perfecting a single problem. Going forward, we want to weigh the overall goal, adjust priorities, and develop more flexibly.'
              )}
            </p>
            <p className="detail-text">
              {t(
                '전시회를 통해 사람들은 결과뿐만 아니라 그 결과가 도출되는 과정과 근거를 중요하게 생각한다는 점을 알게 되었습니다. 특히 탐지 알고리즘이 어떤 기준으로 동작하는지, 그리고 현재의 탐지 결과를 얼마나 신뢰할 수 있는지에 대한 설명이 필요하다는 것을 확인할 수 있었습니다.',
                'Through the exhibition, we learned that people care not only about the result, but also about the process and reasoning behind it. In particular, we realized visitors wanted to understand the criteria the detection algorithm uses, and how much they could trust the current detection result.'
              )}
            </p>
          </div>

          <div className="detail-block">
            <h2 className="section-heading">
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
