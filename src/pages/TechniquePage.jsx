/**
 * TechniquePage.jsx
 * 작동 원리 상세 페이지
 */

import React from 'react';
import { useLanguage } from '../hooks';
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

          <div style={{ marginTop: '60px' }}>
            <h3 style={{ fontSize: '20px', fontWeight: 700, marginBottom: '20px' }}>
              {t('상태 판정 기준', 'State Classification Criteria')}
            </h3>
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
        </div>
      </section>
    </div>
  );
}

export default TechniquePage;
