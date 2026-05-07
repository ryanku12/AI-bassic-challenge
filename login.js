/**
 * 로그인 모듈
 * - localStorage에 사용자 이름을 저장하여 새로고침 후에도 로그인 상태를 유지합니다.
 * - 로그인 시 시간대에 맞는 인사말을 표시합니다.
 * - 로그아웃 시 사용자 이름과 투두리스트를 모두 비웁니다.
 */
(function () {
  "use strict";

  const STORAGE_KEY = "momentum.username";

  const loginForm = document.getElementById("login-form");
  const loginInput = document.getElementById("login-input");
  const dashboard = document.getElementById("dashboard");
  const greetingEl = document.getElementById("greeting");
  const logoutBtn = document.getElementById("logout-btn");

  /** 현재 시각에 따른 인사말 ("오전" / "오후" / "저녁") */
  function getGreetingByHour(hour) {
    if (hour < 12) return "좋은 아침이에요";
    if (hour < 18) return "좋은 오후에요";
    return "좋은 저녁이에요";
  }

  function showLoggedIn(username) {
    loginForm.classList.add("hidden");
    dashboard.classList.remove("hidden");
    logoutBtn.classList.remove("hidden");

    const greet = getGreetingByHour(new Date().getHours());
    greetingEl.textContent = `${greet}, ${username}님!`;
  }

  function showLoggedOut() {
    loginForm.classList.remove("hidden");
    dashboard.classList.add("hidden");
    logoutBtn.classList.add("hidden");
    loginInput.value = "";
  }

  function handleLogin(event) {
    event.preventDefault();
    const username = loginInput.value.trim();
    if (!username) return;

    localStorage.setItem(STORAGE_KEY, username);
    showLoggedIn(username);

    // 투두리스트 모듈에 로그인 사실을 알립니다 (재렌더 트리거).
    document.dispatchEvent(new CustomEvent("user:login"));
  }

  function handleLogout() {
    localStorage.removeItem(STORAGE_KEY);
    // 투두리스트도 함께 초기화합니다.
    document.dispatchEvent(new CustomEvent("user:logout"));
    showLoggedOut();
  }

  // 이벤트 바인딩
  loginForm.addEventListener("submit", handleLogin);
  logoutBtn.addEventListener("click", handleLogout);

  // 초기 상태: 저장된 사용자 이름이 있으면 자동 로그인
  const savedUsername = localStorage.getItem(STORAGE_KEY);
  if (savedUsername) {
    showLoggedIn(savedUsername);
  } else {
    showLoggedOut();
  }
})();
