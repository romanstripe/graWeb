/**
 * TechniquePage.jsx
 * 작동 원리 상세 페이지
 */

import React from 'react';
import { useLanguage } from '../hooks';
import demoVideo from '../images/wilson-demo.mp4';
import '../styles/detail.css';

/**
 * 작동 원리 스텝 데이터 (한글/영어)
 */
const TECHNIQUE_STEPS = [
  {
    num: '01',
    title: { ko: 'CSI란?', en: 'What is CSI?' },
    body: { 
      ko: 'Wi-Fi 신호가 공간을 지나면서 어떻게 변화했는지를 나타내는 채널 정보입니다. 본 프로젝트의 경우 사람이 공간을 지나다니면 이 채널 정보가 변화한다는 특성을 이용하였습니다.',
      en: 'Channel State Information (CSI) represents how WiFi signals change as they pass through space. This project utilizes the characteristic that this channel information changes when people move through the space.'
    },
    formula: null
  },
  {
    num: '02',
    title: { ko: '워밍업 단계', en: 'Warmup Phase' },
    body: { 
      ko: '시스템이 시작되면 약 15초간 워밍업을 진행합니다. 이 단계에서는 빈 방 상태의 CSI 데이터 60프레임을 수집하여 환경별 배경 기준값을 자동으로 설정합니다. 수집 과정에서 중앙값의 1.5배를 초과하는 스파이크 프레임은 자동으로 제거되며, 이를 통해 워밍업 중 사람이 잠깐 지나가더라도 기준선이 오염되지 않도록 처리합니다. 최종 배경값은 정제된 프레임들의 하위 20번째 백분위수로 결정되어 노이즈에 강건한 기준선을 확보합니다.',
      en: 'When the system starts, it runs a warmup for about 15 seconds. During this phase, it collects 60 frames of CSI data from an empty room to automatically set the background baseline for each environment. Spike frames exceeding 1.5 times the median are automatically removed, preventing baseline contamination even if someone briefly passes through during warmup. The final background value is determined as the 20th percentile of the refined frames, ensuring a noise-robust baseline.'
    },
    formula: null
  },
  {
    num: '03',
    title: { ko: '움직임 점수 계산', en: 'Motion Score Calculation' },
    body: { 
      ko: '슬라이딩 윈도우 방식으로 최근 약 3초 분량인 20프레임의 데이터를 유지하면서 0.15초마다 실시간으로 평가합니다. 모션 스코어는 64개 서브캐리어 각각의 시간축 표준편차를 평균 내어 계산합니다. 기존 RSSI 방식이 두 보드 사이의 신호 세기만 반영하는 것과 달리, 서브캐리어별로 개별 계산하기 때문에 신호 상쇄 현상 없이 미세한 움직임에도 민감하게 반응합니다.',
      en: 'Using a sliding window approach, the system maintains the most recent 20 frames (~3 seconds) and evaluates in real-time every 0.15 seconds. The motion score is calculated by averaging the temporal standard deviation of each of the 64 subcarriers. Unlike traditional RSSI methods that only reflect signal strength between two boards, this per-subcarrier calculation responds sensitively to subtle movements without signal cancellation effects.'
    },
    formula: {
      expr: 'score = mean( std(A₁...A₆₄) )',
      desc: { ko: '64개 서브캐리어 진폭의 표준편차 평균', en: 'Average of 64 subcarrier amplitude standard deviations' }
    }
  },
  {
    num: '04',
    title: { ko: '비대칭 EMA 스무딩', en: 'Asymmetric EMA Smoothing' },
    body: { 
      ko: '계산된 스코어는 비대칭 EMA(Exponential Moving Average) 방식으로 스무딩됩니다. 움직임이 감지될 때는 빠르게 반응하고(α=0.45), 조용해질 때는 천천히 복귀하도록(α=0.10) 설계하여 순간적인 노이즈로 상태가 오락가락하는 것을 방지하면서도 실제 움직임에는 즉각 반응합니다.',
      en: 'The calculated score is smoothed using asymmetric EMA (Exponential Moving Average). It responds quickly to detected movement (α=0.45) and slowly returns when quiet (α=0.10), preventing state flickering from momentary noise while still immediately responding to actual movement.'
    },
    formula: {
      expr: 'EMA_t = α × score_t + (1-α) × EMA_{t-1}',
      desc: { ko: '상승 시 α=0.45, 하강 시 α=0.10', en: 'α=0.45 when rising, α=0.10 when falling' }
    }
  }
];        

/**
 * 상태 캡션 데이터
 * 각 감지 상태의 색상과 설명 (한글/영어)
 */
const STATUS_CAPTIONS = [
  { status: 'safe', label: 'SAFE', desc: { ko: '방 비어있음', en: 'Room empty' } },
  { status: 'detected', label: 'DETECTED', desc: { ko: '존재 감지', en: 'Presence detected' } },
  { status: 'alert', label: 'ALERT', desc: { ko: '움직임 감지', en: 'Motion detected' } }
];

const STATE_TABLE = [
  { rel: '< 1.6', state: 'SAFE', className: 's-safe' },
  { rel: '1.6 ~ 2.0', state: 'DETECTED', className: 's-detected' },
  { rel: '> 2.0', state: 'ALERT', className: 's-alert' }
];

function TechniquePage() {
  const { lang, t } = useLanguage();
  const getText = (v) => typeof v === 'string' ? v : (lang === 'ko' ? v.ko : v.en);

  return (
    <div className="detail-page">
      <header className="detail-header">
        <div className="wrap">
          <h1>{t('작동 원리', 'How It Works')}</h1>
          <p className="detail-header-desc">
            {t('WiFi 신호는 사람이 움직일 때 미세하게 변합니다. 이 변화의 크기를 측정하여 공간 내 존재와 움직임을 감지합니다.', 'WiFi signals change subtly when people move. The system quantifies this change to detect presence and movement in a space.')}
          </p>
        </div>
      </header>

      <section className="arch-section">
        <div className="wrap">
          <div className="steps">
            {TECHNIQUE_STEPS.map((step, index) => (
              <div key={index} className="step">
                <div className="step-num-col">
                  <div className="step-num">{step.num}</div>
                </div>
                <div className="step-content">
                  <h3 className="step-title">{getText(step.title)}</h3>
                  <p className="step-body">{getText(step.body)}</p>
                  {step.formula && (
                    <div className="formula">
                      <div className="formula-row">
                        <span className="formula-expr">{step.formula.expr}</span>
                        <span className="formula-desc">{getText(step.formula.desc)}</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="detail-block">
            <h3 className="sub-heading">
              {t('데이터 로그 및 상태', 'Data Log & Status')}
            </h3>
            <div className="video-wrap">
             <video
              src={demoVideo}
              title="Wilson Demo"
              controls
              autoPlay
              muted
              loop
              playsInlinepreload="metadata"
              >
              브라우저가 비디오 재생을 지원하지 않습니다.
              </video>
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


          <div className="detail-block">
            <h3 className="sub-heading">
              {t('상태 판정 기준', 'State Classification Criteria')}
            </h3>
            <p className="detail-text">
              {t(
                'REL 임계값은 실험을 통해 도출한 경험적인 값입니다. 임계값을 높이면 민감도가 낮아져 실제 위험 상황에서도 ALERT 인식이 늦어질 수 있고, 임계값을 낮추면 작은 움직임에도 ALERT가 발생할 수 있습니다. DETECTED는 이 두 상태 사이의 완충 구간으로, 사람이 근처에 있지만 위협적인 움직임은 아닌 상황을 나타냅니다.',
                'The REL threshold values are derived empirically through testing. Raising the threshold lowers sensitivity, which can delay ALERT recognition even in real danger; lowering it can trigger ALERT from even small movements. DETECTED acts as a buffer between the two states, representing a person nearby who is not exhibiting threatening movement.'
              )}
            </p>


            <table className="state-table">
              <thead>
                <tr>
                  <th>{t('REL 값', 'REL Value')}</th>
                  <th>{t('상태', 'State')}</th>
                </tr>
              </thead>
              <tbody>
                {STATE_TABLE.map((row, index) => (
                  <tr key={index}>
                    <td>{row.rel}</td>
                    <td className={row.className}>{row.state}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="detail-block">
            <h3 className="sub-heading">
              {t('전시회 이후 추가 검증', 'Post-Exhibition Validation')}
            </h3>
            <p className="detail-text">
              {t(
                '전시회 이후 추가 실험을 통해 임계값(1.6, 2.0)과 비대칭 EMA 파라미터를 다시 검증했고, 기존 설정이 가장 안정적이라는 결과를 확인했습니다. 워밍업 프레임 수와 하위 백분위수 기준도 조정해보았지만 큰 차이가 없었으며, 이는 값들이 경험적으로 도출되었다는 점에서 본 프로젝트의 한계로 남아있습니다.',
                'Following the exhibition, we re-validated the threshold values (1.6, 2.0) and the asymmetric EMA parameters through additional experiments, confirming the original settings remain the most stable. We also tried adjusting the warmup frame count and percentile cutoff, but found no significant improvement — a reminder that these values are empirically derived, which we consider a limitation of this project.'
              )}
            </p>
          </div>

          <div className="detail-block">
            <h3 className="sub-heading">
              {t('전시회 질문', 'Exhibition Q&A')}
            </h3>
            <div className="faq-list">
              <div className="faq-item">
                <p className="faq-q">
                  {t('relative 값, 현재 스코어와 배경 스코어는 어떻게 정해지나요?', 'How are the relative value, current score, and background score determined?')}
                </p>
                <p className="faq-a">
                  {t(
                    '경험적으로 도출된 값입니다. 상대값(REL)이 커지면 민감도가 낮아져 ALERT 인식이 늦어질 수 있고, 작아지면 작은 움직임에도 ALERT가 발생할 수 있습니다. 이를 보완하기 위해 SAFE와 ALERT 사이에 DETECTED라는 완충 상태를 두었습니다.',
                    'These are empirically derived values. As the relative value (REL) increases, sensitivity decreases and ALERT recognition can be delayed; as it decreases, even small movements can trigger ALERT. To compensate, we added DETECTED as a buffer state between SAFE and ALERT.'
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

export default TechniquePage;
