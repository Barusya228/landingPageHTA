/**
 * Landing page — данные и логика (без backend).
 * Контент меняется через объекты ниже, без правок разметки секций.
 */

/**
 * Архитектура ассетов по папкам секций:
 * ./images/Банер/
 * ./images/Что делает нас уникальными/
 * ./images/Достижения наших учеников/
 * ./images/Что говорят родители/
 * ./images/Жизнь в HTA/
 */
const IMAGE_DIRS = {
  hero: "./images/Банер",
  features: "./images/Что делает нас уникальными",
  achievements: "./images/Достижения наших учеников",
  video: "./images/Что говорят родители",
  life: "./images/Жизнь в HTA",
};

function fromDir(dir, fileName) {
  return `${IMAGE_DIRS[dir]}/${fileName}`;
}

function fromDirList(dir, fileNames) {
  return fileNames.map((fileName) => fromDir(dir, fileName));
}

const COMPANY_LOGO_1 = "./logo/logo-arbuz.png";
const COMPANY_LOGO_2 = "./logo/Frame-824631.png";
const COMPANY_LOGO_3 = "./logo/logo-kazbeef.jpg";
const COMPANY_LOGO_4 = "./logo/logo-shinlain.png";
const COMPANY_LOGO_5 = "./logo/logo-not-hta.svg";
const COMPANY_LOGO_6 = "./logo/l6ghb57yon3kcs6f1iucm5klma1mq985.svg";

/** Файлы задаются внутри своей папки секции (без общего массива и slice) */
const PHOTO_HERO = fromDir("hero", "главная.jpg");
const PHOTO_FEATURES = fromDirList("features", [
  "Проекты из реальной жизни.jpg",
  "Предпринимательство.jpg",
  "Архитектура и дизайн.jpg",
  "Sports & Arts.jpg",
  "Дебаты.jpg",
  "STEM и робототехника.jpg",
]);
const PHOTO_ACHIEVEMENTS = fromDirList("achievements", [
  "1.jpg",
  "2.jpg",
  "3.jpg",
]);
const PHOTO_VIDEO_THUMBS = fromDirList("video", [
  "1.jpg",
  "2.jpg",
  "3.jpg",
  "HD_Teschers.jpg",
]);
const PHOTO_LIFE = fromDirList("life", [
  "1.jpg",
  "2.jpg",
  "3.jpg",
  "4.jpg",
  "5.jpg",
  "6.jpg",
  "7.jpg",
  "8.jpg",
  "9.jpg",
  "10.jpg",
  "11.jpg",
  "12.jpg",
  "13.jpg",
  "14.jpg",
  "15.jpg",
  "16.jpg",
  "17.jpg",
  "18.jpg",
  "19.jpg",
  "20.jpg",
  "21.jpg",
  "22.jpg",
  "23.jpg",
  "24.jpg",
  "25.jpg",
  "26.jpg",
  "27.jpg",
  "28.jpg",
  "29.jpg",
  "30.jpg",
  "31.jpg",
  "32.jpg",
  "33.jpg",
  "34.jpg",
  "35.jpg",
  "36.jpg",
  "37.jpg",
  "38.jpg",
  "39.jpg",
  "40.jpg",
  "41.jpg",
  "42.jpg",
  "43.jpg",
  "44.jpg",
  "45.jpg",
  "46.jpg",
  "47.jpg",
  "48.jpg",
  "49.jpg",
  "50.jpg",
  "51.jpg",
  "52.jpg",
  "53.jpg",
  "54.jpg",
]);
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

  /** Логотипы компаний для секции "Наши ученики предлагали решения..." */
  companies: [
    { name: "Компания 1", logo: COMPANY_LOGO_1 },
    { name: "Компания 2", logo: COMPANY_LOGO_2 },
    { name: "Компания 3", logo: COMPANY_LOGO_3 },
    { name: "Компания 4", logo: COMPANY_LOGO_4 },
    { name: "Компания 5", logo: COMPANY_LOGO_5 },
    { name: "Компания 6", logo: COMPANY_LOGO_6 },
  ],

  videoTestimonials: [
    {
      title: "Куда поступают выпускники HTA?",
      thumb: PHOTO_VIDEO_THUMBS[0],
      embedUrl: null,
      instagramPermalink: INSTAGRAM_REEL_PERMALINKS[0],
    },
    {
      title: "Что говорят партнеры?",
      thumb: PHOTO_VIDEO_THUMBS[1],
      embedUrl: null,
      instagramPermalink: INSTAGRAM_REEL_PERMALINKS[1],
    },
    {
      title: "Чему учатся дети во время проектов?",
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
  const fragment = document.createDocumentFragment();

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
    fragment.appendChild(btn);
  });
  grid.appendChild(fragment);
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
    const fragment = document.createDocumentFragment();
    sources.forEach((src) => {
      const img = document.createElement("img");
      img.src = src;
      img.alt = "";
      img.loading = "lazy";
      fragment.appendChild(img);
    });
    container.appendChild(fragment);
  };

  buildRow(row1, forward);
  buildRow(row2, backward);
}

/* --- Achievements --- */
function renderAchievements() {
  const grid = document.getElementById("achievements-grid");
  if (!grid) return;
  const fragment = document.createDocumentFragment();
  pageData.achievements.forEach((a) => {
    const article = document.createElement("article");
    article.className = "achievement-card";
    article.innerHTML = `
      <img src="${a.image}" alt="" loading="lazy" decoding="async" />
      <p>${escapeHtml(a.caption)}</p>
    `;
    fragment.appendChild(article);
  });
  grid.appendChild(fragment);
}

/* --- Companies --- */
function renderCompanies() {
  const wrap = document.getElementById("companies-logos");
  if (!wrap) return;
  const fragment = document.createDocumentFragment();
  pageData.companies.forEach((c) => {
    const div = document.createElement("div");
    div.className = "company-logo";
    if (c.logo) {
      div.innerHTML = `<img src="${c.logo}" alt="${escapeHtml(c.name)}" />`;
    } else {
      div.innerHTML = `<span>${escapeHtml(c.name)}</span>`;
    }
    fragment.appendChild(div);
  });
  wrap.appendChild(fragment);
}

/* --- Video testimonials + modal --- */
let videoSlideIndex = 0;

function renderVideoSlides() {
  const track = document.getElementById("video-carousel-track");
  if (!track) return;
  track.innerHTML = "";
  const fragment = document.createDocumentFragment();
  pageData.videoTestimonials.forEach((v, i) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "video-card";
    btn.dataset.index = String(i);
    btn.innerHTML = `
      <img src="${v.thumb}" alt="" loading="lazy" decoding="async" />
      <div class="video-card-play"><span>▶</span></div>
      <div class="video-card-caption">${escapeHtml(v.title)}</div>
    `;
    btn.addEventListener("click", () => openVideoModal(i));
    fragment.appendChild(btn);
  });
  track.appendChild(fragment);
}

function openVideo(videoId) {
  const modal = document.getElementById("video-modal");
  const frame = document.getElementById("video-frame");

  frame.src = `https://www.youtube.com/embed/D-Ktmq9T94s?si=mYV-oAS-3Bx1lrVM`;
  modal.style.display = "flex";
}

// кнопка на главном экране
document.querySelector(".video-button").addEventListener("click", function () {
  const videoId = this.dataset.video;
  openVideo(videoId);
});

// закрытие
document.querySelector(".video-modal-close").addEventListener("click", function () {
  document.getElementById("video-modal").style.display = "none";
  document.getElementById("video-frame").src = "";
});

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

  closeHeroVideoModal();

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
    void Object.fromEntries(fd.entries());
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

  const langButtons = document.querySelectorAll(".lang-btn");
  langButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const lang = btn.getAttribute("data-lang");
      langButtons.forEach((b) => b.classList.remove("is-active"));
      btn.classList.add("is-active");
      document.documentElement.setAttribute("lang", lang === "kz" ? "kk" : lang || "ru");
      localStorage.setItem("hta_lang", lang || "ru");
    });
  });

  const saved = localStorage.getItem("hta_lang");
  if (saved) {
    langButtons.forEach((b) => {
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
      closeHeroVideoModal();
    }
  });

  form?.addEventListener("submit", (e) => {
    e.preventDefault();
    const fd = new FormData(form);
    void Object.fromEntries(fd.entries());
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

/** ID ролика; в embed не используем параметр si= из «поделиться» — он вызывает Error 153 в плеере */
const HERO_YOUTUBE_VIDEO_ID = "D-Ktmq9T94s";

function buildHeroYoutubeEmbedSrc() {
  const params = new URLSearchParams({
    autoplay: "1",
    rel: "0",
    modestbranding: "1",
    playsinline: "1",
  });
  return `https://www.youtube.com/embed/${HERO_YOUTUBE_VIDEO_ID}?${params.toString()}`;
}

function getHeroYoutubeIframe() {
  const el = document.getElementById("hero-youtube-embed");
  return el instanceof HTMLIFrameElement ? el : null;
}

function closeHeroVideoModal() {
  const backdrop = document.getElementById("hero-video-modal-backdrop");
  const iframe = getHeroYoutubeIframe();
  if (iframe) {
    iframe.src = "about:blank";
  }
  if (!backdrop) return;
  backdrop.classList.remove("is-open");
  backdrop.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}

function openHeroVideoModal() {
  const backdrop = document.getElementById("hero-video-modal-backdrop");
  if (!backdrop) return;
  closeVideoModal();
  backdrop.classList.add("is-open");
  backdrop.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
  const iframe = getHeroYoutubeIframe();
  if (iframe) {
    iframe.src = buildHeroYoutubeEmbedSrc();
  }
  document.getElementById("hero-video-modal-close")?.focus();
}

function initHeroVideoModal() {
  const playBtn = document.querySelector(".hero-video .video-button");
  const label = document.querySelector(".hero-video span");
  const backdrop = document.getElementById("hero-video-modal-backdrop");
  const closeBtn = document.getElementById("hero-video-modal-close");
  const open = (e) => {
    e.preventDefault();
    openHeroVideoModal();
  };
  playBtn?.addEventListener("click", open);
  label?.addEventListener("click", open);
  closeBtn?.addEventListener("click", () => closeHeroVideoModal());
  backdrop?.addEventListener("click", (e) => {
    if (e.target === backdrop) closeHeroVideoModal();
  });
}

document.addEventListener("DOMContentLoaded", () => {
  setYear();
  initHeroBackground();
  initHeroVideoModal();
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
