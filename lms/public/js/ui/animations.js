/** Animations UI — compteurs, cercles, barres */
export function animateCounter(element, target, duration = 1200) {
  if (!element) return;
  const start = Number(element.textContent) || 0;
  const diff = target - start;
  if (diff === 0) return;

  const startTime = performance.now();
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (prefersReduced) {
    element.textContent = String(target);
    return;
  }

  function tick(now) {
    const elapsed = now - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - (1 - progress) ** 3;
    element.textContent = String(Math.round(start + diff * eased));
    if (progress < 1) requestAnimationFrame(tick);
  }

  requestAnimationFrame(tick);
}

export function animateProgressBar(bar, percent, duration = 800) {
  if (!bar) return;
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  bar.style.width = prefersReduced ? `${percent}%` : '0%';
  bar.setAttribute('aria-valuenow', percent);

  if (prefersReduced) return;

  requestAnimationFrame(() => {
    bar.style.transition = `width ${duration}ms cubic-bezier(0.4, 0, 0.2, 1)`;
    bar.style.width = `${percent}%`;
  });
}

export function animateRing(svgCircle, percent, circumference) {
  if (!svgCircle) return;
  const offset = circumference - (percent / 100) * circumference;
  svgCircle.style.strokeDashoffset = String(offset);
  svgCircle.setAttribute('aria-valuenow', percent);
}

export function createProgressRing(container, percent, options = {}) {
  const { size = 120, stroke = 8, color = 'var(--accent)', label = '' } = options;
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;

  container.innerHTML = `
    <div class="progress-ring" role="progressbar" aria-valuenow="${percent}" aria-valuemin="0" aria-valuemax="100" aria-label="${label}">
      <svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
        <circle class="ring-bg" cx="${size / 2}" cy="${size / 2}" r="${radius}" fill="none" stroke-width="${stroke}"/>
        <circle class="ring-fill" cx="${size / 2}" cy="${size / 2}" r="${radius}" fill="none" stroke-width="${stroke}"
          stroke="${color}" stroke-linecap="round"
          stroke-dasharray="${circumference}" stroke-dashoffset="${circumference}"
          transform="rotate(-90 ${size / 2} ${size / 2})"/>
      </svg>
      <span class="ring-value">${percent}%</span>
    </div>`;

  const circle = container.querySelector('.ring-fill');
  const valueEl = container.querySelector('.ring-value');
  valueEl.textContent = '0%';

  requestAnimationFrame(() => {
    animateRing(circle, percent, circumference);
    const start = performance.now();
    const duration = 1000;
    function tick(now) {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - (1 - p) ** 3;
      valueEl.textContent = `${Math.round(percent * eased)}%`;
      if (p < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  });
}

export function showBadgeToast(badge) {
  const toast = document.createElement('div');
  toast.className = 'badge-toast';
  toast.setAttribute('role', 'alert');
  toast.innerHTML = `
    <span class="badge-toast-icon">${badge.icon}</span>
    <div>
      <strong>Badge débloqué !</strong>
      <p>${badge.name} — ${badge.description}</p>
    </div>`;
  document.body.appendChild(toast);
  requestAnimationFrame(() => toast.classList.add('visible'));

  setTimeout(() => {
    toast.classList.remove('visible');
    setTimeout(() => toast.remove(), 400);
  }, 4500);
}

export function staggerIn(elements, delay = 60) {
  elements.forEach((el, i) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(12px)';
    setTimeout(() => {
      el.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
      el.style.opacity = '1';
      el.style.transform = 'translateY(0)';
    }, i * delay);
  });
}
