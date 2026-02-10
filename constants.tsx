
import React from 'react';
import { Step } from './types';

export const FLASK_HOSTING_OPTIONS = [
  {
    name: "Render",
    icon: "🚀",
    description: "Python Flask에 가장 친화적인 서비스입니다. 웹 서비스 무료 티어를 제공합니다.",
    pros: ["무료 배포 가능", "GitHub 자동 연동", "가장 쉬운 설정"]
  },
  {
    name: "Railway",
    icon: "🚉",
    description: "인프라 설정이 매우 직관적이며, 데이터베이스 연동이 강력합니다.",
    pros: ["분위기 있는 대시보드", "빠른 빌드 속도", "확장성 우수"]
  },
  {
    name: "Vercel (Python Runtime)",
    icon: "▲",
    description: "프론트엔드와 Flask를 함께 쓰고 싶을 때 최고의 선택입니다.",
    pros: ["전 세계 에지 배포", "Serverless 구조", "무료 도메인 SSL"]
  }
];

export const CONTENT_STRATEGY = [
  {
    title: "헤리티지 스토리텔링",
    desc: "골동품이나 전통 문화를 단순 판매하는 것이 아니라, 그 안에 깃든 '이야기'를 들려주세요.",
    icon: "📜"
  },
  {
    title: "시각적 미학 (Visuals)",
    desc: "고화질 사진과 여백의 미를 살린 웹 레이아웃으로 방문자의 시선을 머물게 하세요.",
    icon: "🎨"
  },
  {
    title: "커뮤니티 소통",
    desc: "질문 답변 코너를 통해 전통 문화에 대한 궁금증을 풀어주는 '지식인'이 되어보세요.",
    icon: "🤝"
  }
];

export const DEPLOY_STEPS: Step[] = [
  {
    id: 0,
    title: "브랜드 정체성 확립",
    description: "단순한 사이트가 아닌 'Antique Korea'만의 무드를 정의합니다.",
    icon: "✍️",
    details: ["핵심 컬러 및 폰트 설정", "대표 로고 및 슬로건 제작"]
  },
  {
    id: 1,
    title: "Python Flask 배포 최적화",
    description: "전 세계 어디서나 빠른 속도로 접속 가능한 인프라를 구축합니다.",
    icon: "💻",
    details: ["Render/Railway 배포 완료", "도메인 antique-korea.com 연결"]
  },
  {
    id: 2,
    title: "콘텐츠 큐레이션",
    description: "방문자의 마음을 사로잡을 정교한 콘텐츠를 배치합니다.",
    icon: "🎎",
    details: ["첫 페이지 스토리텔링", "이미지 최적화 배포"]
  }
];

export const TROUBLESHOOTING_GUIDE = [
  {
    code: "PYTHON_VERSION_MISMATCH",
    title: "파이썬 버전 불일치",
    reason: "내 로컬 환경과 배포 서버의 파이썬 버전이 다를 때 발생합니다.",
    solutions: [
      "runtime.txt 파일에 정확한 버전 기입 (예: python-3.11.x)",
      "requirements.txt 패키지 목록 업데이트"
    ]
  },
  {
    code: "ERR_CONNECTION_CLOSED",
    title: "보안 연결 대기 중",
    reason: "도메인 연결 직후 Vercel/Render가 SSL 인증서를 발급하는 과정입니다.",
    solutions: [
      "약 15분 후 다시 접속",
      "브라우저 캐시 삭제 또는 시크릿 모드 시도"
    ]
  }
];
