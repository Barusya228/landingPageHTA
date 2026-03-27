/**
 * Landing page — данные и логика (без backend).
 * Контент меняется через объекты ниже, без правок разметки секций.
 */

/** Все JPG из папки images (38 шт.), по имени файла */
const ALL_PHOTOS = [
  "./images/DSC01536.jpg",
  "./images/DSC01737.jpg",
  "./images/DSC02025.jpg",
  "./images/DSC03788.jpg",
  "./images/DSC03794.jpg",
  "./images/DSC03804.jpg",
  "./images/DSC03812.jpg",
  "./images/DSC03835.jpg",
  "./images/DSC03884.jpg",
  "./images/DSC03897.jpg",
  "./images/DSC04357.jpg",
  "./images/DSC05011.jpg",
  "./images/DSC05691.jpg",
  "./images/DSC05891.jpg",
  "./images/DSC06134.jpg",
  "./images/DSC06150.jpg",
  "./images/DSC06356.jpg",
  "./images/DSC06368.jpg",
  "./images/DSC06425.jpg",
  "./images/DSC06426.jpg",
  "./images/DSC06531.jpg",
  "./images/DSC06532.jpg",
  "./images/DSC06533.jpg",
  "./images/DSC06534.jpg",
  "./images/DSC06536.jpg",
  "./images/DSC06537.jpg",
  "./images/DSC06547.jpg",
  "./images/DSC06549.jpg",
  "./images/DSC06765.jpg",
  "./images/DSC06766.jpg",
  "./images/DSC06773.jpg",
  "./images/DSC06965.jpg",
  "./images/DSC06984.jpg",
  "./images/DSC07159.jpg",
  "./images/DSC07181.jpg",
  "./images/DSC07200.jpg",
  "./images/DSC07246.jpg",
  "./images/DSC07259.jpg",
];

const ASSET_LOGO = "./images/logo.png";

/** Распределение: 1 hero + 6 фич + 3 достижения + 3 превью видео + 25 в жизни школы = 38 */
const PHOTO_HERO = ALL_PHOTOS[0];
const PHOTO_FEATURES = ALL_PHOTOS.slice(1, 7);
const PHOTO_ACHIEVEMENTS = ALL_PHOTOS.slice(7, 10);
const PHOTO_VIDEO_THUMBS = ALL_PHOTOS.slice(10, 13);
const PHOTO_LIFE = ALL_PHOTOS.slice(13);
const LIFE_MARQUEE_MAX = 14;
const INSTAGRAM_REEL_PERMALINKS = [
  "https://www.instagram.com/reel/DWEMEoODe7q/?utm_source=ig_embed&utm_campaign=loading",
  "https://www.instagram.com/reel/DPvMWytD2eB/?utm_source=ig_embed&utm_campaign=loading",
  "https://www.instagram.com/reel/DKhFaLBNlh-/?utm_source=ig_embed&utm_campaign=loading",
];

const pageData = {
  uniqueFeatures: [
    {
      title: "Проекты из реальной жизни",
      image: PHOTO_FEATURES[0],
      description: "Ученики решают задачи из практики: от социальных инициатив до технологических прототипов.",
    },
    {
      title: "Курс предпринимательства",
      image: PHOTO_FEATURES[1],
      description: "Бизнес-модели, питчи, работа в командах и знакомство с основами стартапов.",
    },
    {
      title: "Курс архитектуры и дизайна",
      image: PHOTO_FEATURES[2],
      description: "Пространство, эстетика и проектирование — от эскиза до презентации идеи.",
    },
    {
      title: "Sports & Arts",
      image: PHOTO_FEATURES[3],
      description: "Спорт и искусство как часть баланса: команды, выступления и творческие студии.",
    },
    {
      title: "Дебаты",
      image: PHOTO_FEATURES[4],
      description: "Аргументация, публичные выступления и участие в турнирах между школами.",
    },
    {
      title: "STEM и робототехника",
      image: PHOTO_FEATURES[5],
      description: "Инженерное мышление, программирование и командные соревнования.",
    },
  ],

  lifeAtHtaImages: PHOTO_LIFE.slice(0, LIFE_MARQUEE_MAX),

  achievements: [
    {
      image: PHOTO_ACHIEVEMENTS[0],
      caption: "Команда HTA Goats в финале турнира по дебатам среди международных школ",
    },
    {
      image: PHOTO_ACHIEVEMENTS[1],
      caption: "2 место на международном научном форуме Shoqan Ecology senior",
    },
    {
      image: PHOTO_ACHIEVEMENTS[2],
      caption: "Победа в OyLab start up competition",
    },
  ],

  /** Логотип школы для блока партнёров (файл logo.png из images) */
  companies: [
    { name: "Партнёр 1", logo: ASSET_LOGO },
    { name: "Партнёр 2", logo: ASSET_LOGO },
    { name: "Партнёр 3", logo: ASSET_LOGO },
    { name: "Партнёр 4", logo: ASSET_LOGO },
    { name: "Партнёр 5", logo: ASSET_LOGO },
    { name: "Партнёр 6", logo: ASSET_LOGO },
  ],

  videoTestimonials: [
    {
      title: "Родитель, 7 класс",
      thumb: PHOTO_VIDEO_THUMBS[0],
      embedUrl: null,
      instagramPermalink: INSTAGRAM_REEL_PERMALINKS[0],
    },
    {
      title: "Выпускник 2024",
      thumb: PHOTO_VIDEO_THUMBS[1],
      embedUrl: null,
      instagramPermalink: INSTAGRAM_REEL_PERMALINKS[1],
    },
    {
      title: "Семья из 9 класса",
      thumb: PHOTO_VIDEO_THUMBS[2],
      embedUrl: null,
      instagramPermalink: INSTAGRAM_REEL_PERMALINKS[2],
    },
  ],

  openDay: {
    dateLine: "Апрель 2026 — дата уточняется",
  },
};

/* --- Why HTA: popup Love School + слайдер отзывов --- */
function initStudentsSlider() {
  const slider = document.getElementById("studentsSlider");
  const section = document.querySelector(".students-section");
  if (!slider || !section) return;
  const btnRight = section.querySelector(".slider-btn.right");
  const btnLeft = section.querySelector(".slider-btn.left");
  btnRight?.addEventListener("click", () => {
    slider.scrollBy({ left: 300, behavior: "smooth" });
  });
  btnLeft?.addEventListener("click", () => {
    slider.scrollBy({ left: -300, behavior: "smooth" });
  });
}

function initLoveSchoolPopup() {
  const loveCard = document.getElementById("love-school");
  const popup = document.getElementById("love-popup");
  const backdrop = document.getElementById("love-popup-backdrop");
  const closeBtn = document.getElementById("love-popup-close");
  if (!loveCard || !popup || !backdrop) return;

  let scrollLock = "";

  const open = () => {
    popup.classList.add("is-active");
    backdrop.classList.add("is-active");
    popup.setAttribute("aria-hidden", "false");
    backdrop.setAttribute("aria-hidden", "false");
    loveCard.setAttribute("aria-expanded", "true");
    scrollLock = document.body.style.overflow;
    document.body.style.overflow = "hidden";
  };

  const close = () => {
    popup.classList.remove("is-active");
    backdrop.classList.remove("is-active");
    popup.setAttribute("aria-hidden", "true");
    backdrop.setAttribute("aria-hidden", "true");
    loveCard.setAttribute("aria-expanded", "false");
    document.body.style.overflow = scrollLock;
  };

  loveCard.addEventListener("click", (e) => {
    e.stopPropagation();
    open();
  });

  loveCard.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      open();
    }
  });

  backdrop.addEventListener("click", () => close());

  closeBtn?.addEventListener("click", (e) => {
    e.stopPropagation();
    close();
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && popup.classList.contains("is-active")) close();
  });
}

function escapeHtml(str) {
  const div = document.createElement("div");
  div.textContent = str;
  return div.innerHTML;
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

/* --- Marquee Life (все кадры из PHOTO_LIFE; второй ряд — в обратном порядке) --- */
function renderLifeMarquee() {
  const row1 = document.getElementById("marquee-row-1");
  const row2 = document.getElementById("marquee-row-2");
  if (!row1 || !row2) return;

  const imgs = pageData.lifeAtHtaImages;
  const forward = [...imgs, ...imgs];
  const reversed = [...imgs].reverse();
  const backward = [...reversed, ...reversed];

  const buildRow = (container, sources) => {
    sources.forEach((src) => {
      const img = document.createElement("img");
      img.src = src;
      img.alt = "";
      img.loading = "lazy";
      container.appendChild(img);
    });
  };

  buildRow(row1, forward);
  buildRow(row2, backward);
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

function ensureInstagramEmbedScript() {
  if (window.instgrm?.Embeds) return;
  if (document.querySelector('script[src="https://www.instagram.com/embed.js"]')) return;
  const script = document.createElement("script");
  script.async = true;
  script.src = "https://www.instagram.com/embed.js";
  document.body.appendChild(script);
}

function renderInstagramEmbed(container, permalink) {
  container.innerHTML = `
    <blockquote
      class="instagram-media"
      data-instgrm-captioned
      data-instgrm-permalink="${escapeHtml(permalink)}"
      data-instgrm-version="14"
      style="background:#FFF;border:0;border-radius:3px;box-shadow:0 0 1px 0 rgba(0,0,0,.5),0 1px 10px 0 rgba(0,0,0,.15);margin:1px auto;max-width:540px;min-width:326px;padding:0;width:calc(100% - 2px);"
    ></blockquote>
  `;
  ensureInstagramEmbedScript();
  window.instgrm?.Embeds?.process();
}

function openVideoModal(index) {
  const backdrop = document.getElementById("video-modal-backdrop");
  const body = document.getElementById("video-modal-body");
  const title = document.getElementById("video-modal-title");
  if (!backdrop || !body || !title) return;

  const v = pageData.videoTestimonials[index];
  title.textContent = v.title;
  if (v.instagramPermalink) {
    renderInstagramEmbed(body, v.instagramPermalink);
  } else if (v.embedUrl) {
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
    const modal = document.getElementById("applicationModal");
    modal?.classList.remove("active");
    modal?.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  });
}

/* --- Application modal --- */
function initApplicationModal() {
  const openBtns = document.querySelectorAll(".open-modal");
  const modal = document.getElementById("applicationModal");
  if (!modal) return;

  const open = () => {
    modal.classList.add("active");
    modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  };

  const close = () => {
    modal.classList.remove("active");
    modal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  };

  openBtns.forEach((btn) => {
    btn.addEventListener("click", open);
  });

  modal.addEventListener("click", (e) => {
    if (e.target === modal) close();
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.classList.contains("active")) {
      close();
    }
  });
}

/* --- Open day CTA --- */
function initOpenDay() {
  const dateEl = document.getElementById("open-day-date");
  if (dateEl) dateEl.textContent = pageData.openDay.dateLine;
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
  const success = document.getElementById("consult-modal-success");

  const close = () => {
    backdrop?.classList.remove("is-open");
    backdrop?.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
    if (success) success.textContent = "";
  };

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

function initHeroBackground() {
  const hero = document.getElementById("hero");
  if (hero) {
    hero.style.backgroundImage = `url("${PHOTO_HERO}")`;
  }
}

document.addEventListener("DOMContentLoaded", () => {
  setYear();
  initHeroBackground();
  initHeader();
  initLoveSchoolPopup();
  initStudentsSlider();
  initApplicationModal();
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
