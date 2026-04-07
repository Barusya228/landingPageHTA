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

/** Путь к WebP-версии того же файла в папке «Жизнь в HTA» (рядом с .jpg/.png). */
function lifeImageWebpSrc(fallbackSrc) {
  return String(fallbackSrc).replace(/\.(jpe?g|png)$/i, ".webp");
}

const COMPANY_LOGO_1 = "./logo/logo-arbuz.png";
const COMPANY_LOGO_2 = "./logo/Frame-824631.png";
const COMPANY_LOGO_3 = "./logo/logo-kazbeef.jpg";
const COMPANY_LOGO_4 = "./logo/logo-shinlain.png";
const COMPANY_LOGO_5 = "./logo/logo-not-hta.svg";
const COMPANY_LOGO_6 = "./logo/logo-compass.jpg";

/** Файлы задаются внутри своей папки секции (без общего массива и slice) */
const PHOTO_HERO = fromDir("hero", "главная.jpg");
const PHOTO_ACHIEVEMENTS = fromDirList("achievements", [
  "1.jfif",
  "2.webp",
  "3.jpg",
]);
const PHOTO_VIDEO_THUMBS = fromDirList("video", [
  "1.jpg",
  "2.jpg",
  "3.jpg",
  "4.jpg",
  "5.jpg",
  "6.jpg",
  "HD_Teschers.jpg",
]);
/** Галерея «Жизнь в HTA»: 22 кадра (верх/низ ленты делятся в renderLifeMarquee) */
const PHOTO_LIFE = fromDirList("life", [
  "1.webp",
  "2.webp",
  "3.webp",
  "4.webp",
  "5.webp",
  "6.webp",
  "7.webp",
  "8.webp",
  "9.webp",
  "10.webp",
  "11.webp",
  "12.webp",
  "13.webp",
  "14.webp",
  "15.webp",
  "16.webp",
  "17.webp",
  "18.webp",
  "19.webp",
  "20.webp",
  "21.webp",
  "22.webp",
]);
const INSTAGRAM_REEL_PERMALINKS = [
  "https://www.instagram.com/reel/DWEMEoODe7q/?utm_source=ig_embed&utm_campaign=loading",
  "https://www.instagram.com/reel/DPvMWytD2eB/?utm_source=ig_embed&utm_campaign=loading",
  "https://www.instagram.com/reel/DKhFaLBNlh-/?utm_source=ig_embed&utm_campaign=loading",
  "https://www.instagram.com/reel/DRRKiOFCK-7/?utm_source=ig_embed&utm_campaign=loading",
  "https://www.instagram.com/reel/DNfGpn5tFW5/?utm_source=ig_embed&utm_campaign=loading",
];

const pageData = {
  lifeAtHtaImages: PHOTO_LIFE,

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
    {
      title: "Что говорят родители?",
      thumb: PHOTO_VIDEO_THUMBS[3],
      embedUrl: null,
      instagramPermalink: INSTAGRAM_REEL_PERMALINKS[3],
    },
    {
      title: "Видео 5",
      thumb: PHOTO_VIDEO_THUMBS[4],
      embedUrl: null,
      instagramPermalink: INSTAGRAM_REEL_PERMALINKS[4],
    },
  ],

  openDay: {
    dateLine: "Апрель 2026 — дата уточняется",
  },
};

/* --- Why HTA: popup Love School + горизонтальные слайдеры карточек --- */
function initStudentsSlider() {
  document.querySelectorAll(".students-slider-wrapper").forEach((wrapper) => {
    const slider = wrapper.querySelector(".students-slider");
    if (!slider) return;
    const btnRight = wrapper.querySelector(".slider-btn.right");
    const btnLeft = wrapper.querySelector(".slider-btn.left");
    btnRight?.addEventListener("click", () => {
      slider.scrollBy({ left: 300, behavior: "smooth" });
    });
    btnLeft?.addEventListener("click", () => {
      slider.scrollBy({ left: -300, behavior: "smooth" });
    });
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

  // Убраны обработчики клика и клавиатуры для отключения открытия модального окна
  // loveCard.addEventListener("click", (e) => {
  //   e.stopPropagation();
  //   open();
  // });

  // loveCard.addEventListener("keydown", (e) => {
  //   if (e.key === "Enter" || e.key === " ") {
  //     e.preventDefault();
  //     open();
  //   }
  // });

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


/**
 * Инициализация карточек функций: обработчик кликов для мобильных устройств
 */
function initFeatureCards() {
  const cards = document.querySelectorAll(".feature-card");
  const isCoarse = window.matchMedia("(hover: none), (pointer: coarse)").matches;

  if (isCoarse) {
    cards.forEach((card) => {
      card.addEventListener("click", () => {
        const isExpanded = card.classList.contains("is-expanded");
        
        // Закрыть все остальные карточки
        cards.forEach((otherCard) => {
          if (otherCard !== card && otherCard.classList.contains("is-expanded")) {
            otherCard.classList.remove("is-expanded");
            otherCard.setAttribute("aria-expanded", "false");
          }
        });
        
        // Переключить текущую карточку
        card.classList.toggle("is-expanded", !isExpanded);
        card.setAttribute("aria-expanded", !isExpanded ? "true" : "false");
      });
    });
  }
}

/**
 * Одна лента «Жизнь в HTA»: бесконечный цикл через дублирование массива.
 * WebP через <picture> + fallback на исходный JPG/PNG.
 */
function renderLifeRow(trackElement, photosArray) {
  const loopPhotos = [...photosArray, ...photosArray];
  const fragment = document.createDocumentFragment();

  loopPhotos.forEach((photo) => {
    const picture = document.createElement("picture");

    const sourceWebp = document.createElement("source");
    sourceWebp.srcset = lifeImageWebpSrc(photo);
    sourceWebp.type = "image/webp";

    const img = document.createElement("img");
    img.src = photo;
    img.alt = "";
    img.width = 280;
    img.height = 180;
    img.loading = "lazy";
    img.decoding = "async";
    img.className = "life-photo";

    picture.appendChild(sourceWebp);
    picture.appendChild(img);
    fragment.appendChild(picture);
  });

  trackElement.appendChild(fragment);
}

function renderLifeMarquee() {
  const row1 = document.getElementById("marquee-row-1");
  const row2 = document.getElementById("marquee-row-2");
  if (!row1 || !row2) return;

  const imgs = pageData.lifeAtHtaImages;
  const half = Math.ceil(imgs.length / 2);
  const imgsRow1 = imgs.slice(0, half);
  const imgsRow2 = imgs.slice(half);

  renderLifeRow(row1, imgsRow1);
  renderLifeRow(row2, imgsRow2);
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

function initAchievementsList() {
  const button = document.getElementById("achievements-show-more");
  const more = document.getElementById("achievements-more");
  if (!(button instanceof HTMLButtonElement) || !(more instanceof HTMLElement)) return;

  button.addEventListener("click", () => {
    more.hidden = !more.hidden;
    const isOpen = !more.hidden;

    if (isOpen) {
      more.classList.add("achievements-more--visible");
      button.textContent = "Скрыть";
      button.setAttribute("aria-expanded", "true");
    } else {
      more.classList.remove("achievements-more--visible");
      button.textContent = "Смотреть все";
      button.setAttribute("aria-expanded", "false");
    }
  });
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

function createVideoSlide(video, originalIndex) {
  const btn = document.createElement("button");
  btn.type = "button";
  btn.className = "video-card";
  btn.dataset.index = String(originalIndex);
  btn.innerHTML = `
    <img src="${video.thumb}" alt="" loading="lazy" decoding="async" />
    <div class="video-card-play"><span>▶</span></div>
    <div class="video-card-caption">${escapeHtml(video.title)}</div>
  `;
  btn.addEventListener("click", () => openVideoModal(originalIndex));
  return btn;
}

function renderVideoSlides(
  slides = pageData.videoTestimonials.map((video, originalIndex) => ({
    video,
    originalIndex,
  }))
) {
  const track = document.getElementById("video-carousel-track");
  if (!track) return null;
  track.innerHTML = "";

  const strip = document.createElement("div");
  strip.className = "video-carousel-strip";

  slides.forEach(({ video, originalIndex }) => {
    strip.appendChild(createVideoSlide(video, originalIndex));
  });

  track.appendChild(strip);
  return strip;
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
  const mq = window.matchMedia("(max-width: 992px)");
  let visibleCount = mq.matches ? 1 : 3;
  let strip = null;
  let currentTrackIndex = 0;
  let isAnimating = false;

  const updateVisibleCount = () => {
    visibleCount = mq.matches ? 1 : 3;
    track.style.setProperty("--video-visible-count", String(visibleCount));
  };

  const getSlidesForTrack = () => {
    const originals = pageData.videoTestimonials.map((video, originalIndex) => ({
      video,
      originalIndex,
    }));

    if (total <= visibleCount) {
      return originals;
    }

    return [
      ...originals.slice(-visibleCount),
      ...originals,
      ...originals.slice(0, visibleCount),
    ];
  };

  const getStepSize = () => {
    const card = strip?.querySelector(".video-card");
    if (!(card instanceof HTMLElement) || !strip) return 0;

    const styles = window.getComputedStyle(strip);
    const gap = parseFloat(styles.columnGap || styles.gap || "0");
    return card.getBoundingClientRect().width + (Number.isFinite(gap) ? gap : 0);
  };

  const setTrackPosition = (index, animate) => {
    if (!strip) return;

    strip.style.transition = animate
      ? "transform 560ms cubic-bezier(0.22, 1, 0.36, 1)"
      : "none";
    strip.style.transform = `translate3d(-${getStepSize() * index}px, 0, 0)`;
  };

  const syncControls = () => {
    const shouldShowControls = total > visibleCount;
    prev.style.visibility = shouldShowControls ? "visible" : "hidden";
    next.style.visibility = shouldShowControls ? "visible" : "hidden";
  };

  const handleTransitionEnd = (event) => {
    if (!strip || event.target !== strip || event.propertyName !== "transform") return;

    if (currentTrackIndex >= total + visibleCount) {
      currentTrackIndex -= total;
      setTrackPosition(currentTrackIndex, false);
    } else if (currentTrackIndex < visibleCount) {
      currentTrackIndex += total;
      setTrackPosition(currentTrackIndex, false);
    }

    isAnimating = false;
  };

  const rebuildTrack = () => {
    updateVisibleCount();
    strip = renderVideoSlides(getSlidesForTrack());
    if (!strip) return;

    strip.addEventListener("transitionend", handleTransitionEnd);

    videoSlideIndex = total > 0 ? ((videoSlideIndex % total) + total) % total : 0;
    currentTrackIndex = total > visibleCount ? videoSlideIndex + visibleCount : 0;
    syncControls();

    requestAnimationFrame(() => {
      setTrackPosition(currentTrackIndex, false);
    });
  };

  const go = (delta) => {
    if (isAnimating || total <= visibleCount) {
      return;
    }

    videoSlideIndex = (videoSlideIndex + delta + total) % total;
    currentTrackIndex += delta;
    isAnimating = true;
    setTrackPosition(currentTrackIndex, true);
  };

  prev.addEventListener("click", () => go(-1));
  next.addEventListener("click", () => go(1));

  const applyLayout = () => {
    isAnimating = false;
    rebuildTrack();
  };

  mq.addEventListener("change", applyLayout);
  window.addEventListener("resize", () => {
    if (!strip) return;
    setTrackPosition(currentTrackIndex, false);
  });

  rebuildTrack();
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
  initFeatureCards();
  renderLifeMarquee();
  renderAchievements();
  initAchievementsList();
  renderCompanies();
  initVideoCarousel();
  initVideoModalChrome();
  initHeroForm();
  initOpenDay();
  initConsultModal();
  initReveal();
});
