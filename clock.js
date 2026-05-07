/**
 * 실시간 시계 모듈
 * - HH:MM:SS 형식의 시간을 1초마다 갱신합니다.
 * - "YYYY년 MM월 DD일 요일" 형식의 한국어 날짜를 함께 표시합니다.
 */
(function () {
  "use strict";

  const timeEl = document.getElementById("clock-time");
  const dateEl = document.getElementById("clock-date");

  const DAYS = ["일", "월", "화", "수", "목", "금", "토"];

  /** 한 자리 숫자 앞에 0을 붙여 두 자리로 만듭니다. */
  const pad = (n) => String(n).padStart(2, "0");

  function render() {
    const now = new Date();

    const hh = pad(now.getHours());
    const mm = pad(now.getMinutes());
    const ss = pad(now.getSeconds());
    timeEl.textContent = `${hh}:${mm}:${ss}`;

    const year = now.getFullYear();
    const month = pad(now.getMonth() + 1);
    const day = pad(now.getDate());
    const weekday = DAYS[now.getDay()];
    dateEl.textContent = `${year}년 ${month}월 ${day}일 ${weekday}요일`;
  }

  // 즉시 1회 렌더 후 1초 간격으로 갱신
  render();
  setInterval(render, 1000);
})();
