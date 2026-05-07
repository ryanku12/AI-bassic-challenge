/**
 * 날씨 모듈
 * - 브라우저 Geolocation API로 현재 위치(위경도)를 얻습니다.
 * - OpenWeatherMap API로 도시명, 기온(℃), 날씨 설명을 받아옵니다.
 *
 * 사용 전 준비:
 *   1) https://openweathermap.org/api 에서 무료 API 키 발급
 *   2) 아래 API_KEY 상수에 본인 키 입력
 *   3) HTTPS 환경(GitHub Pages 등)에서만 Geolocation이 동작합니다.
 */
(function () {
  "use strict";

  // ⚠️ 본인의 OpenWeatherMap API 키로 교체하세요.
  const API_KEY = "YOUR_OPENWEATHERMAP_API_KEY";

  const weatherEl = document.getElementById("weather");
  const cityEl = document.getElementById("weather-city");
  const tempEl = document.getElementById("weather-temp");
  const descEl = document.getElementById("weather-desc");

  function show(city, tempC, description) {
    cityEl.textContent = city;
    tempEl.textContent = `${Math.round(tempC)}°C`;
    descEl.textContent = description;
    weatherEl.classList.remove("hidden");
  }

  function showFallback() {
    cityEl.textContent = "위치 정보 없음";
    tempEl.textContent = "—";
    descEl.textContent = "날씨를 불러올 수 없어요";
    weatherEl.classList.remove("hidden");
  }

  async function fetchWeather(lat, lon) {
    if (!API_KEY || API_KEY === "YOUR_OPENWEATHERMAP_API_KEY") {
      console.warn(
        "[weather] OpenWeatherMap API 키가 설정되지 않았습니다. js/weather.js의 API_KEY를 교체하세요."
      );
      showFallback();
      return;
    }

    const url =
      `https://api.openweathermap.org/data/2.5/weather` +
      `?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&lang=kr`;

    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();

      const city = data.name || "Unknown";
      const tempC = data.main?.temp ?? 0;
      const description = data.weather?.[0]?.description ?? "";

      show(city, tempC, description);
    } catch (err) {
      console.error("[weather] 요청 실패:", err);
      showFallback();
    }
  }

  function onGeoSuccess(position) {
    const { latitude, longitude } = position.coords;
    fetchWeather(latitude, longitude);
  }

  function onGeoError(err) {
    console.warn("[weather] 위치 정보를 가져오지 못했습니다:", err.message);
    showFallback();
  }

  if (!("geolocation" in navigator)) {
    showFallback();
    return;
  }

  navigator.geolocation.getCurrentPosition(onGeoSuccess, onGeoError, {
    enableHighAccuracy: false,
    timeout: 10000,
    maximumAge: 5 * 60 * 1000, // 5분 캐시
  });
})();
