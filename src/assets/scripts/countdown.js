function initCountdown() {
  const countdownContainer = document.getElementById('hero-countdown');
  if (!countdownContainer) return;

  const startDate = new Date(2026, 5, 20, 10).getTime();
  const endDate = new Date(2026, 5, 21, 24).getTime();

  const daysEl = document.getElementById('cd-days');
  const hoursEl = document.getElementById('cd-hours');
  const minsEl = document.getElementById('cd-mins');
  const secsEl = document.getElementById('cd-secs');
  if (!daysEl || !hoursEl || !minsEl || !secsEl) return;

  function update() {
    const now = Date.now();
    const diff = startDate - now;

    if (now >= endDate) {
      clearInterval(timerId);
      countdownContainer.innerHTML = "<div class='hero__countdown-msg mb-0 p-2 bg-secondary rounded text-dark'><b>Les jornades ja han finalitzat!</b> T'esperem la pròxima edició.</div>";
      return;
    }

    if (now >= startDate) {
      clearInterval(timerId);
      countdownContainer.innerHTML = "<div class='hero__countdown-msg mb-0 p-2 bg-secondary rounded text-dark'>Les jornades ja han començat!</div>";
      return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const mins = Math.floor((diff / (1000 * 60)) % 60);
    const secs = Math.floor((diff / 1000) % 60);

    daysEl.textContent = String(days).padStart(2, '0');
    hoursEl.textContent = String(hours).padStart(2, '0');
    minsEl.textContent = String(mins).padStart(2, '0');
    secsEl.textContent = String(secs).padStart(2, '0');
  }

  const timerId = setInterval(update, 1000);
  update();
}

document.addEventListener('DOMContentLoaded', initCountdown);