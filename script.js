/**
 * Landing page — данные и логика (без backend).
 * Контент меняется через объекты ниже, без правок разметки секций.
 */

const ASSET_HERO = "./images/DSC01536.jpg";

const pageData = {
  whyHtaCards: [
    {
      id: "love",
      title: "Love School",
      stat: "82%",
      accent: "yellow",
      detail:
        "Высокий уровень вовлечённости и отношения к школе: ученики чувствуют себя частью сообщества HTA.",
    },
    {
      id: "skills",
      title: "Критические навыки",
      stat: "",
      accent: "green",
      detail:
        "Развиваем критическое мышление, коммуникацию, сотрудничество и самостоятельность — навыки для реальной жизни.",
    },
    {
      id: "mbacc",
      title: "Minerva Baccalaureate (MBacc)",
      stat: "",
      accent: "orange",
      detail:
        "Современная академическая программа с международным признанием и фокусом на проектное обучение.",
    },
  ],

  whyHtaResearchQuote:
    "Исследования показывают: чувство принадлежности к школе связано с мотивацией, вовлечённостью и учебными результатами учеников.",

  whyHtaStudentQuotes: [
    {
      text: "Здесь нас учат думать, а не зубрить — мне нравится работать над проектами.",
      name: "Арман",
      grade: "10 класс",
    },
    {
      text: "Учителя поддерживают и дают свободу выбирать направление развития.",
      name: "Сабина",
      grade: "8 класс",
    },
    {
      text: "Много возможностей для дебатов, олимпиад и внеурочной жизни.",
      name: "Данияр",
      grade: "11 класс",
    },
  ],

  uniqueFeatures: [
    {
      title: "Проекты из реальной жизни",
      image: ASSET_HERO,
      description: "Ученики решают задачи из практики: от социальных инициатив до технологических прототипов.",
    },
    {
      title: "Курс предпринимательства",
      image: ASSET_HERO,
      description: "Бизнес-модели, питчи, работа в командах и знакомство с основами стартапов.",
    },
    {
      title: "Курс архитектуры и дизайна",
      image: ASSET_HERO,
      description: "Пространство, эстетика и проектирование — от эскиза до презентации идеи.",
    },
    {
      title: "Sports & Arts",
      image: ASSET_HERO,
      description: "Спорт и искусство как часть баланса: команды, выступления и творческие студии.",
    },
    {
      title: "Дебаты",
      image: ASSET_HERO,
      description: "Аргументация, публичные выступления и участие в турнирах между школами.",
    },
    {
      title: "STEM и робототехника",
      image: ASSET_HERO,
      description: "Инженерное мышление, программирование и командные соревнования.",
    },
  ],

  lifeAtHtaImages: [ASSET_HERO, ASSET_HERO, ASSET_HERO, ASSET_HERO, ASSET_HERO, ASSET_HERO],

  achievements: [
    {
      image: ASSET_HERO,
      caption: "Команда HTA Goats в финале турнира по дебатам среди международных школ",
    },
    {
      image: ASSET_HERO,
      caption: "2 место на международном научном форуме Shoqan Ecology senior",
    },
    {
      image: ASSET_HERO,
      caption: "Победа в OyLab start up competition",
    },
  ],

  companies: [
    { name: "Компания A", logo: null },
    { name: "Компания B", logo: null },
    { name: "Компания C", logo: null },
    { name: "Компания D", logo: null },
    { name: "Компания E", logo: null },
    { name: "Компания F", logo: null },
  ],

  videoTestimonials: [
    {
      title: "Родитель, 7 класс",
      thumb: ASSET_HERO,
      embedUrl: null,
      placeholderHtml:
        "<p style='margin:0;padding:1rem'>Видео будет здесь. Подключите iframe или файл позже.</p>",
    },
    {
      title: "Выпускник 2024",
      thumb: ASSET_HERO,
      embedUrl: null,
      placeholderHtml:
        "<p style='margin:0;padding:1rem'>Заглушка: отзыв выпускника.</p>",
    },
    {
      title: "Семья из 9 класса",
      thumb: ASSET_HERO,
      embedUrl: null,
      placeholderHtml:
        "<p style='margin:0;padding:1rem'>Заглушка: отзыв родителей.</p>",
    },
  ],

  openDay: {
    dateLine: "Апрель 2026 — дата уточняется",
  },
};

/* --- Рендер: Why HTA --- */
function renderWhyHta() {
  const wrap = document.getElementById("why-hta-cards");
  const detailEl = document.getElementById("why-hta-detail");
  const detailText = document.getElementById("why-hta-detail-text");
  const quoteEl = document.getElementById("why-hta-research-quote");
  if (!wrap || !detailEl || !detailText || !quoteEl) return;

  quoteEl.textContent = pageData.whyHtaResearchQuote;

  let selectedId = pageData.whyHtaCards[0]?.id;

  const showDetail = (id) => {
    const card = pageData.whyHtaCards.find((c) => c.id === id);
    if (!card) return;
    selectedId = id;
    detailText.textContent = card.detail;
    detailEl.hidden = false;
    wrap.querySelectorAll(".why-card").forEach((btn) => {
      btn.classList.toggle("is-active", btn.dataset.id === id);
    });
  };

  pageData.whyHtaCards.forEach((card) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = `why-card why-card--${card.accent}`;
    btn.dataset.id = card.id;
    btn.innerHTML = `
      <h3 class="why-card-title">${escapeHtml(card.title)}</h3>
      ${card.stat ? `<p class="why-card-stat">${escapeHtml(card.stat)}</p>` : ""}
    `;
    btn.addEventListener("click", () => showDetail(card.id));
    wrap.appendChild(btn);
  });

  showDetail(selectedId);
}

function escapeHtml(str) {
  const div = document.createElement("div");
  div.textContent = str;
  return div.innerHTML;
}

/* --- Карусель отзывов учеников --- */
function initStudentCarousel() {
  const track = document.getElementById("student-carousel-track");
  const prev = document.getElementById("student-carousel-prev");
  const next = document.getElementById("student-carousel-next");
  if (!track || !prev || !next) return;

  const items = pageData.whyHtaStudentQuotes;
  let index = 0;

  const render = () => {
    const q = items[index];
    track.innerHTML = `
      <div class="student-quote-card">
        <p class="student-quote-text">«${escapeHtml(q.text)}»</p>
        <p class="student-quote-meta">${escapeHtml(q.name)} · ${escapeHtml(q.grade)}</p>
      </div>
    `;
  };

  prev.addEventListener("click", () => {
    index = (index - 1 + items.length) % items.length;
    render();
  });
  next.addEventListener("click", () => {
    index = (index + 1) % items.length;
    render();
  });
  render();
}

/* --- Unique features --- */
function renderUniqueFeatures() {
  const grid = document.getElementById("features-grid");
  if (!grid) return;
  const isCoarse = window.matchMedia("(hover: none), (pointer: coarse)").matches;

  pageData.uniqueFeatures.forEach((item, i) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "feature-card";
    btn.setAttribute("aria-expanded", "false");
    btn.innerHTML = `
      <img src="${item.image}" alt="" loading="lazy" />
      <div class="feature-card-title-wrap">
        <p class="feature-card-title">${escapeHtml(item.title)}</p>
      </div>
      <p class="feature-short">${escapeHtml(item.description)}</p>
      <div class="card-overlay" aria-hidden="true">
        <p class="card-overlay-text">${escapeHtml(item.description)}</p>
      </div>
    `;

    if (isCoarse) {
      btn.addEventListener("click", () => {
        const open = !btn.classList.contains("is-expanded");
        grid.querySelectorAll(".feature-card.is-expanded").forEach((el) => {
          if (el !== btn) {
            el.classList.remove("is-expanded");
            el.setAttribute("aria-expanded", "false");
          }
        });
        btn.classList.toggle("is-expanded", open);
        btn.setAttribute("aria-expanded", open ? "true" : "false");
      });
    }
    grid.appendChild(btn);
  });
}

/* --- Marquee Life --- */
function renderLifeMarquee() {
  const row1 = document.getElementById("marquee-row-1");
  const row2 = document.getElementById("marquee-row-2");
  if (!row1 || !row2) return;

  const imgs = pageData.lifeAtHtaImages;
  const duplicate = [...imgs, ...imgs];

  const buildRow = (container) => {
    duplicate.forEach((src) => {
      const img = document.createElement("img");
      img.src = src;
      img.alt = "";
      img.loading = "lazy";
      container.appendChild(img);
    });
  };

  buildRow(row1);
  buildRow(row2);
}

/* --- Achievements --- */
function renderAchievements() {
  const grid = document.getElementById("achievements-grid");
  if (!grid) return;
  pageData.achievements.forEach((a) => {
    const article = document.createElement("article");
    article.className = "achievement-card";
    article.innerHTML = `
      <img src="${a.image}" alt="" loading="lazy" />
      <p>${escapeHtml(a.caption)}</p>
    `;
    grid.appendChild(article);
  });
}

/* --- Companies --- */
function renderCompanies() {
  const wrap = document.getElementById("companies-logos");
  if (!wrap) return;
  pageData.companies.forEach((c) => {
    const div = document.createElement("div");
    div.className = "company-logo";
    if (c.logo) {
      div.innerHTML = `<img src="${c.logo}" alt="${escapeHtml(c.name)}" />`;
    } else {
      div.innerHTML = `<span>${escapeHtml(c.name)}</span>`;
    }
    wrap.appendChild(div);
  });
}

/* --- Video testimonials + modal --- */
let videoSlideIndex = 0;

function renderVideoSlides() {
  const track = document.getElementById("video-carousel-track");
  if (!track) return;
  track.innerHTML = "";
  pageData.videoTestimonials.forEach((v, i) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "video-card";
    btn.dataset.index = String(i);
    btn.innerHTML = `
      <img src="${v.thumb}" alt="" loading="lazy" />
      <div class="video-card-play"><span>▶</span></div>
      <div class="video-card-caption">${escapeHtml(v.title)}</div>
    `;
    btn.addEventListener("click", () => openVideoModal(i));
    track.appendChild(btn);
  });
}

function openVideoModal(index) {
  const backdrop = document.getElementById("video-modal-backdrop");
  const body = document.getElementById("video-modal-body");
  const title = document.getElementById("video-modal-title");
  if (!backdrop || !body || !title) return;

  const v = pageData.videoTestimonials[index];
  title.textContent = v.title;
  if (v.embedUrl) {
    body.innerHTML = `<iframe src="${escapeHtml(v.embedUrl)}" title="${escapeHtml(v.title)}" allowfullscreen></iframe>`;
  } else {
    body.innerHTML = v.placeholderHtml || "<p>Контент скоро появится.</p>";
  }
  backdrop.classList.add("is-open");
  backdrop.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}

function closeVideoModal() {
  const backdrop = document.getElementById("video-modal-backdrop");
  const body = document.getElementById("video-modal-body");
  if (!backdrop) return;
  backdrop.classList.remove("is-open");
  backdrop.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
  if (body) body.innerHTML = "";
}

function initVideoCarousel() {
  const prev = document.getElementById("video-carousel-prev");
  const next = document.getElementById("video-carousel-next");
  const track = document.getElementById("video-carousel-track");
  if (!prev || !next || !track) return;

  const total = pageData.videoTestimonials.length;

  const updateMobileSlide = () => {
    const cards = track.querySelectorAll(".video-card");
    cards.forEach((card, i) => {
      card.style.display = i === videoSlideIndex ? "" : "none";
    });
  };

  const mq = window.matchMedia("(max-width: 992px)");

  const go = (delta) => {
    if (!mq.matches) return;
    videoSlideIndex = (videoSlideIndex + delta + total) % total;
    updateMobileSlide();
  };

  prev.addEventListener("click", () => go(-1));
  next.addEventListener("click", () => go(1));

  const applyLayout = () => {
    const cards = track.querySelectorAll(".video-card");
    if (mq.matches) {
      track.style.display = "block";
      updateMobileSlide();
    } else {
      track.style.display = "";
      cards.forEach((card) => {
        card.style.display = "";
      });
    }
  };
  mq.addEventListener("change", applyLayout);
  applyLayout();
}

/* --- Hero form --- */
function initHeroForm() {
  const form = document.getElementById("hero-lead-form");
  if (!(form instanceof HTMLFormElement)) return;
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const fd = new FormData(form);
    const data = Object.fromEntries(fd.entries());
    console.log("Hero lead form:", data);
    form.reset();
  });
}

/* --- Open day CTA --- */
function initOpenDay() {
  const dateEl = document.getElementById("open-day-date");
  if (dateEl) dateEl.textContent = pageData.openDay.dateLine;

  const btn = document.getElementById("open-day-btn-register");
  if (btn) {
    btn.addEventListener("click", () => {
      document.getElementById("hero")?.scrollIntoView({ behavior: "smooth" });
    });
  }
}

/* --- Header: burger + lang (визуально) --- */
function initHeader() {
  const toggle = document.querySelector(".nav-toggle");
  const list = document.getElementById("nav-list");
  if (toggle && list) {
    toggle.addEventListener("click", () => {
      const open = list.classList.toggle("is-open");
      toggle.classList.toggle("is-open", open);
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
    list.addEventListener("click", (e) => {
      const t = e.target;
      if (t instanceof HTMLElement && t.closest("a")) {
        list.classList.remove("is-open");
        toggle.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  document.querySelectorAll(".lang-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const lang = btn.getAttribute("data-lang");
      document.querySelectorAll(".lang-btn").forEach((b) => b.classList.remove("is-active"));
      btn.classList.add("is-active");
      document.documentElement.setAttribute("lang", lang === "kz" ? "kk" : lang || "ru");
      localStorage.setItem("hta_lang", lang || "ru");
    });
  });

  const saved = localStorage.getItem("hta_lang");
  if (saved) {
    document.querySelectorAll(".lang-btn").forEach((b) => {
      b.classList.toggle("is-active", b.getAttribute("data-lang") === saved);
    });
    document.documentElement.setAttribute("lang", saved === "kz" ? "kk" : saved);
  }
}

/* --- Floating + consult modal --- */
function initConsultModal() {
  const backdrop = document.getElementById("consult-modal-backdrop");
  const closeBtn = document.getElementById("consult-modal-close");
  const form = document.getElementById("consult-modal-form");
  const floatBtn = document.getElementById("floating-consult-cta");
  const success = document.getElementById("consult-modal-success");

  const open = () => {
    backdrop?.classList.add("is-open");
    backdrop?.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  };
  const close = () => {
    backdrop?.classList.remove("is-open");
    backdrop?.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
    if (success) success.textContent = "";
  };

  floatBtn?.addEventListener("click", open);
  closeBtn?.addEventListener("click", close);
  backdrop?.addEventListener("click", (e) => {
    if (e.target === backdrop) close();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      close();
      closeVideoModal();
    }
  });

  form?.addEventListener("submit", (e) => {
    e.preventDefault();
    const fd = new FormData(form);
    console.log("Consult modal:", Object.fromEntries(fd.entries()));
    if (success) success.textContent = "Спасибо, мы свяжемся с вами";
    form.reset();
  });
}

/* --- Reveal on scroll --- */
function initReveal() {
  const obs = new IntersectionObserver(
    (entries) => {
      entries.forEach((en) => {
        if (en.isIntersecting) {
          en.target.classList.add("is-visible");
          obs.unobserve(en.target);
        }
      });
    },
    { threshold: 0.12 }
  );
  document.querySelectorAll(".reveal").forEach((el) => obs.observe(el));
}

/* --- Year --- */
function setYear() {
  const y = document.getElementById("year");
  if (y) y.textContent = String(new Date().getFullYear());
}

/* --- Video modal close --- */
function initVideoModalChrome() {
  document.getElementById("video-modal-close")?.addEventListener("click", closeVideoModal);
  document.getElementById("video-modal-backdrop")?.addEventListener("click", (e) => {
    if (e.target === e.currentTarget) closeVideoModal();
  });
}

document.addEventListener("DOMContentLoaded", () => {
  setYear();
  initHeader();
  renderWhyHta();
  initStudentCarousel();
  renderUniqueFeatures();
  renderLifeMarquee();
  renderAchievements();
  renderCompanies();
  renderVideoSlides();
  initVideoCarousel();
  initVideoModalChrome();
  initHeroForm();
  initOpenDay();
  initConsultModal();
  initReveal();
});
