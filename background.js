/**
 * 랜덤 배경 이미지 모듈
 * - /img 폴더에 배치된 이미지 중 하나를 랜덤으로 골라 body의 background-image로 설정합니다.
 * - 새 이미지를 추가하려면 IMAGES 배열에 파일명만 추가하세요.
 */
(function () {
  "use strict";

  // /img 폴더에 들어 있는 이미지 파일명 목록.
  // 이미지를 추가/교체할 때는 이 배열만 수정하면 됩니다.
  const IMAGES = ["0.jpg", "1.jpg", "2.jpg", "3.jpg", "4.jpg"];

  function pickRandom(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  }

  function setBackground(filename) {
    // 이미지 미리 로드 후 적용 → 깜빡임 방지
    const url = `img/${filename}`;
    const img = new Image();
    img.onload = () => {
      document.body.style.backgroundImage = `url("${url}")`;
    };
    img.onerror = () => {
      // 이미지가 없을 때를 대비해 단색 배경으로 폴백.
      document.body.style.backgroundImage = "";
      document.body.style.backgroundColor = "#1f2a44";
    };
    img.src = url;
  }

  setBackground(pickRandom(IMAGES));
})();
