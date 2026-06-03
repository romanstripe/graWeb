# WiFi CSI 기반 실내 재실 감지 시스템

## 프로젝트 개요
ESP32 보드와 채널 상태 정보(CSI)를 활용한 비침습적 움직임 감지 시스템

## 기술 스택
- React 18
- React Router DOM v6
- CSS (Pretendard 폰트)

## 프로젝트 구조
```
src/
├── components/           # 재사용 가능한 컴포넌트
│   ├── Header.jsx       # 공통 헤더 (네비게이션)
│   ├── Footer.jsx       # 공통 푸터 (팀 정보)
│   └── Landing/         # 랜딩 페이지 전용 컴포넌트
│       ├── Hero.jsx
│       ├── SummaryCards.jsx
│       ├── DemoSection.jsx
│       ├── NavButtons.jsx
│       └── index.js     # 배럴 파일
├── pages/               # 페이지 컴포넌트
│   ├── LandingPage.jsx
│   ├── ArchitecturePage.jsx
│   ├── TechniquePage.jsx
│   ├── HardwarePage.jsx
│   ├── ImplementationPage.jsx
│   └── index.js
├── styles/              # CSS 파일 (역할별 분리)
│   ├── common.css       # 공통 변수, 리셋, 유틸리티
│   ├── header.css       # 헤더 스타일
│   ├── footer.css       # 푸터 스타일
│   ├── landing.css      # 랜딩 페이지 전용
│   └── detail.css       # 상세 페이지 전용
├── App.jsx              # 메인 앱 (라우팅)
└── index.js             # 진입점

public/
└── index.html           # HTML 템플릿
```

## 실행 방법
```bash
npm install
npm start
```

## 라우팅
- `/` - 랜딩 페이지
- `/architecture` - 시스템 흐름
- `/technique` - 작동 원리
- `/hardware` - 하드웨어 구성
- `/implementation` - 구현 과정

## 팀원
- 이소현: 프로젝트 기획, 실험 설계 및 성능 검증
- 박서연: ESP32 펌웨어 개발 및 CSI 데이터 수집
- 김채영: 프론트엔드 개발 및 발표 콘텐츠 제작
