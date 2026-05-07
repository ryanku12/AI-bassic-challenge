/**
 * 랜덤 배경 이미지 모듈
 * - Picsum Photos(https://picsum.photos)에서 랜덤 풍경 사진을 가져옵니다.
 * - 인터넷이 안 되거나 서비스가 막힌 경우 그라디언트로 폴백합니다.
 */
(function () {
  "use strict";

  const USE_LOCAL = false;

  // 로컬 이미지 모드용 (USE_LOCAL = true 일 때만 사용)
  const IMAGES = ["0.jpg", "1.jpg", "2.jpg", "3.jpg", "4.jpg"];

  // Picsum seed 모음 — 미리 골라둔 깔끔한 풍경 사진들이 나옵니다.
  // 새 seed 추가 시 다른 사진이 더 섞입니다.
  const PICSUM_SEEDS = [
    "mountain", "ocean", "forest", "valley", "desert",
    "lake", "sunset", "aurora", "canyon", "cliff",
    "river", "snow", "field", "island", "sky",
  ];

  // 폴백 그라디언트 (이미지 로드 실패 시)
  const GRADIENTS = [
    "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    "linear-gradient(135deg, #2c3e50 0%, #4ca1af 100%)",
    "linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)",
    "linear-gradient(135deg, #0f2027 0%, #203a43 50%, #2c5364 100%)",
    "linear-gradient(135deg, #ee9ca7 0%, #ffdde1 100%)",
  ];

  function pickRandom(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  }

  function applyImage(url) {
    // 이미지 미리 로드 후 적용 → 깜빡임 방지
    const img = new Image();
    img.onload = () => {
      document.body.style.backgroundImage = `url("${url}")`;
    };
    img.onerror = () => {
      applyGradient();
    };
    img.src = url;
  }

  function applyGradient() {
    document.body.style.backgroundImage = pickRandom(GRADIENTS);
  }

  if (USE_LOCAL) {
    applyImage(`img/${pickRandom(IMAGES)}`);
  } else {
    const seed = pickRandom(PICSUM_SEEDS);
    // 화면 사이즈에 맞춰 1920x1080 이미지 요청
    applyImage(`https://picsum.photos/seed/${seed}/1920/1080`);
  }
})();
