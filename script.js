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
/**
 * БЫСТРАЯ НАВИГАЦИЯ ДЛЯ РЕДАКТИРОВАНИЯ:
 * - Фото и папки: IMAGE_DIRS, PHOTO_HERO, PHOTO_ACHIEVEMENTS, PHOTO_VIDEO_THUMBS, PHOTO_LIFE.
 * - Логотипы: COMPANY_LOGO_* и PARTNER_LOGOS.
 * - Карточки, проекты, видео и даты: объект pageData.
 * - Видео Minerva/MBacc: MBACC_VIDEOS.
 *
 * Для обычных правок контента почти всегда достаточно менять верхнюю часть этого файла.
 * Функции ниже pageData отвечают за поведение сайта; их лучше трогать только разработчику.
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

/**
 * Логотипы для блока "Наши ученики предлагали решения...".
 * Чтобы заменить логотип, положите файл в ./logo/ и поменяйте путь здесь.
 */
const COMPANY_LOGO_1 = "./logo/logo-arbuz.png";
const COMPANY_LOGO_2 = "./logo/logo-kazbeef.jpg";
const COMPANY_LOGO_3 = "./logo/logo-jlc.png";
const COMPANY_LOGO_4 = "./logo/logo-shinlain.png";
const COMPANY_LOGO_5 = "./logo/logo-not-hta.svg";
const COMPANY_LOGO_6 = "./logo/logo-compass.jpg";

/**
 * Логотипы партнёров в блоке "Курс Предпринимательства".
 * Пустая строка означает, что логотип пока не показывается.
 * Стартапы специально рендерятся без логотипов.
 */
const PARTNER_LOGOS = {
  arbuz: "./logo/logo-arbuz.png",
  kazbeef: "./logo/logo-kazbeef.jpg",
  platformA: "./logo/logo-PlatformA.webp",
  shinLine: "./logo/logo-shinlain.png",
  compass: "./logo/logo-compass.jpg",
  jlc: "./logo/logo-jlc.png",
  uvu: "",
  almatyAirInitiative: "",
  amiran: "",
};

/** Главное фото hero-секции. */
const PHOTO_HERO = fromDir("hero", "главная.jpg");

/** Фото для карточек "Достижения наших учеников". */
const PHOTO_ACHIEVEMENTS = fromDirList("achievements", [
  "1.jpeg",
  "2.jfif",
  "3.jpg",
]);
/** Обложки видео для карусели "Голоса HTA". */
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
/**
 * Instagram-ссылки для карусели "Голоса HTA".
 * Для YouTube-видео используйте embedUrl внутри pageData.videoTestimonials.
 */
const INSTAGRAM_REEL_PERMALINKS = [
  "https://www.instagram.com/reel/DKhFaLBNlh-/?utm_source=ig_embed&utm_campaign=loading",

  "https://www.instagram.com/reel/DPvMWytD2eB/?utm_source=ig_embed&utm_campaign=loading",

  "https://www.instagram.com/reel/DWEMEoODe7q/?utm_source=ig_embed&utm_campaign=loading",

  "https://www.instagram.com/reel/DNfGpn5tFW5/?utm_source=ig_embed&utm_campaign=loading",
];

/**
 * ГЛАВНЫЙ КОНТЕНТ САЙТА.
 * Здесь редактируются повторяющиеся блоки: достижения, компании, проекты, стартапы,
 * видео-карусель и дата дня открытых дверей.
 */
const pageData = {
  /** Фото для бегущей галереи "Жизнь в HTA". */
  lifeAtHtaImages: PHOTO_LIFE,

  /** Карточки секции "Достижения наших учеников". */
  achievements: [
    {
      image: PHOTO_ACHIEVEMENTS[0],
      caption: "«Лучший инновационный проект» среди 80 команд из 20 стран.",
    },
    {
      image: PHOTO_ACHIEVEMENTS[1],
      caption: "Победа на Shanghai Speech and Debate Invitational, 450 спикеров,6 стран Азии",
    },
    {
      image: PHOTO_ACHIEVEMENTS[2],
      caption: "Грант в размере 200 000 тенге и 2 место - Shoqan Ecology Senior",
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

  /**
   * Курс предпринимательства.
   * projects: партнёр + проектное задание + логотип + ссылки.
   * startups: название + описание инициативы, без логотипов.
   * links: [] покажет "Ссылка скоро"; чтобы добавить ссылку:
   * links: [{ label: "Видео 1", url: "https://..." }]
   */
  entrepreneurship: {
    "2025-2026": {
      projects: [
        {
          partner: "UvU",
          logo: PARTNER_LOGOS.uvu,
          challenge: "создать план для UvU, чтобы запустить 1000 эко-шаттлов по городу за 3 года и завоевать рынок Алматы",
          links: [
            { label: "Видео 1", url: "https://www.instagram.com/reel/DPvMWytD2eB/?igsh=MWl1dGM0Z252d3EzdA==" },
            { label: "Видео 2", url: "https://www.instagram.com/p/DOoCyZfDOB3/?igsh=MXRoazliNHl6Y3hqcA==" },
          ],
        },
        {
          partner: "Almaty Air Initiative",
          logo: PARTNER_LOGOS.almatyAirInitiative,
          challenge: "разработать план новой организации, которая значительно улучшить качество воздуха в Алматы",
          links: [],
        },
        {
          partner: "Amiran",
          logo: PARTNER_LOGOS.amiran,
          challenge: "разработать стратегию для Amiran, чтобы выйти в прибыль за 9 месяцев, сохраняя верность миссии компании. Стратегия должна работать в рамках текущих возможностей компании",
          links: [],
        },
      ],
      startups: [
        { partner: "BARYTAN AI", initiative: "ученики разработали технологию, которая автоматически преобразует разговор между врачом и пациентом в структурированную медицинскую запись, тем самым экономя время и облегчая процесс записи данных", link: "#" },
        { partner: "RayHeart", initiative: "ученики разработали умный медицинский корсет с встроенными биосенсорами, который постоянно отслеживает показатели работы сердца, помогая предотвращать и заранее предупреждать о повторном сердечном приступе", link: "#" },
        { partner: "NEXTSTEP ", initiative: "ученики разработали двухнедельный интерактивный летний лагерь для подростков 15–18 лет, который в безопасной среде помогает им подготовиться к самостоятельной жизни, развивая практические навыки, связанные с реальными финансами и бытовыми задачами, через опыт и обучение", link: "#" },
      ],
    },
    "2024-2025": {
      projects: [
        { partner: "Platform A", logo: PARTNER_LOGOS.platformA, challenge: "разработать план по завоеванию рынка Алматы и Казахстана для Platforma Market", links: [] },
        { partner: "KazBeef", logo: PARTNER_LOGOS.kazbeef, challenge: "разработь план по созданию новой организации, которая решит проблему опустынивания в Казахстане. Обосновать предложение комплексным анализом существующих и возможных решений этой проблемы", links: [] },
        { partner: "Shin-Line", logo: PARTNER_LOGOS.shinLine, challenge: "создать стратегию для продукта \"Шин-Лайн\", чтобы стать лидером рынка на постсоветском пространстве", links: [] },
      ],
      startups: [
        { partner: "Silver Pear", initiative: "ученики решали проблему пищевых отходов, перерабатывая их в компост и корм для животных, снижая вред для окружающей среды и поддерживая устойчивое сельское хозяйство. Продукт был успешно протестирован в ЖК Dostyk Residence", link: "#" },
        { partner: "TAN", initiative: "ученики создали бренд кофейных напитков с концепцией «сам себе бариста», позволяющий пользователям создавать собственные напитки благодаря уникальному трехъярусному дизайну", link: "#" },
        { partner: "PET X", initiative: "ученики решали проблему переработки пластиковых бутылок, разработав машину для их превращения в филамент для 3D-принтеров", link: "#" },
      ],
    },
    "2023-2024": {
      projects: [
        { partner: "Arbuz", logo: PARTNER_LOGOS.arbuz, challenge: "разработать стратегию масштабирования компании Arbuz", links: [] },
        { partner: "Compass", logo: PARTNER_LOGOS.compass, challenge: "разработать технико-экономическое обоснование по одному из направлений развития компании Compass", links: [] },
      ],
      startups: [
        { partner: "POMOGI PRIUTU.KZ", initiative: "ученики решали проблему отсутствия финансирования приютов для животных, разработав приложение, в котором можно выбрать питомца, заботиться о нем и поддерживать его донатами", link: "#" },
        { partner: "Food Saving", initiative: "ученики решали проблему пищевых отходов и финансовых потерь у ресторанов и магазинов, предлагая платформу с акционными продуктами, доступными для студентов", link: "#" },
        { partner: "Aina", initiative: "ученики решали проблему оттока творческой молодежи из Казахстана, предлагая инициативу, которая усиливает интерес к современному искусству и повышает осведомленность о нем внутри страны", link: "#" },
      ],
    },
  },

  /**
   * Карусель "Голоса HTA".
   * thumb — обложка, instagramPermalink — Instagram, embedUrl — YouTube embed.
   */
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
  ],

  /** Текст даты в блоке "День открытых дверей". */
  openDay: {
    dateLine: "Апрель 2026 — дата уточняется",
  },
};

/* --- Why HTA: popup Love School + горизонтальные слайдеры карточек --- */
function initStudentsSlider() {
  document.querySelectorAll(".students-slider-wrapper").forEach((wrapper) => {
    const slider = wrapper.querySelector(".students-slider");
    if (!(slider instanceof HTMLElement)) return;
    const btnRight = wrapper.querySelector(".slider-btn.right");
    const btnLeft = wrapper.querySelector(".slider-btn.left");

    const getScrollStep = () => {
      const cards = slider.querySelectorAll(".student-card");
      if (cards.length >= 2) {
        const firstCard = cards[0];
        const secondCard = cards[1];
        if (firstCard instanceof HTMLElement && secondCard instanceof HTMLElement) {
          const delta = secondCard.offsetLeft - firstCard.offsetLeft;
          if (delta > 0) return delta;
        }
      }

      const firstCard = slider.querySelector(".student-card");
      if (!(firstCard instanceof HTMLElement)) return 300;
      const sliderStyles = window.getComputedStyle(slider);
      const gap =
        Number.parseFloat(sliderStyles.columnGap || sliderStyles.gap || "0") || 0;
      return firstCard.getBoundingClientRect().width + gap;
    };

    const canSlide = () =>
      slider.children.length > 1 && slider.scrollWidth > slider.clientWidth + 1;

    const setScrollInstant = (left) => {
      const previous = slider.style.scrollBehavior;
      slider.style.scrollBehavior = "auto";
      slider.scrollLeft = left;
      slider.style.scrollBehavior = previous;
    };

    const animationMs = window.matchMedia("(prefers-reduced-motion: reduce)").matches
      ? 0
      : 360;
    const smoothBehavior = animationMs === 0 ? "auto" : "smooth";
    let isAnimating = false;

    const lockForAnimation = () => {
      isAnimating = true;
      window.setTimeout(() => {
        isAnimating = false;
      }, animationMs + 40);
    };

    btnRight?.addEventListener("click", () => {
      if (isAnimating || !canSlide()) return;
      const step = getScrollStep();
      if (step <= 0) return;

      const startLeft = slider.scrollLeft;
      lockForAnimation();
      slider.scrollTo({ left: startLeft + step, behavior: smoothBehavior });

      window.setTimeout(() => {
        const firstCard = slider.firstElementChild;
        if (firstCard) slider.appendChild(firstCard);
        setScrollInstant(Math.max(0, slider.scrollLeft - step));
      }, animationMs + 20);
    });

    btnLeft?.addEventListener("click", () => {
      if (isAnimating || !canSlide()) return;
      const step = getScrollStep();
      if (step <= 0) return;

      const lastCard = slider.lastElementChild;
      if (lastCard) slider.insertBefore(lastCard, slider.firstElementChild);

      setScrollInstant(slider.scrollLeft + step);
      lockForAnimation();
      slider.scrollTo({
        left: Math.max(0, slider.scrollLeft - step),
        behavior: smoothBehavior,
      });
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

function setCollapsibleOpen(element, isOpen, openClass) {
  const animationMs = window.matchMedia("(prefers-reduced-motion: reduce)").matches ? 0 : 430;

  window.clearTimeout(element._collapseTimer);

  if (isOpen) {
    element.hidden = false;
    element.style.maxHeight = "0px";
    element.classList.remove(openClass);

    window.requestAnimationFrame(() => {
      element.classList.add(openClass);
      element.style.maxHeight = `${element.scrollHeight}px`;
    });

    element._collapseTimer = window.setTimeout(() => {
      element.style.maxHeight = "none";
    }, animationMs);
    return;
  }

  element.style.maxHeight = `${element.scrollHeight}px`;

  window.requestAnimationFrame(() => {
    element.classList.remove(openClass);
    element.style.maxHeight = "0px";
  });

  element._collapseTimer = window.setTimeout(() => {
    element.hidden = true;
  }, animationMs);
}

function initAchievementsList() {
  const button = document.getElementById("achievements-show-more");
  const more = document.getElementById("achievements-more");
  if (!(button instanceof HTMLButtonElement) || !(more instanceof HTMLElement)) return;

  button.addEventListener("click", () => {
    const isOpen = more.hidden;

    if (isOpen) {
      setCollapsibleOpen(more, true, "achievements-more--visible");
      button.textContent = "Скрыть";
      button.setAttribute("aria-expanded", "true");
    } else {
      setCollapsibleOpen(more, false, "achievements-more--visible");
      button.textContent = "Смотреть все";
      button.setAttribute("aria-expanded", "false");
    }
  });
}

/* --- Entrepreneurship course --- */
function renderEntrepreneurshipItems(year, type) {
  const grid = document.getElementById("entrepreneurship-projects-grid");
  if (!(grid instanceof HTMLElement)) return;

  const yearData = pageData.entrepreneurship?.[year];
  const items = yearData?.[type] || [];

  grid.innerHTML = "";
  const fragment = document.createDocumentFragment();

  items.forEach((item) => {
    const article = document.createElement("article");
    article.className = "entrepreneurship-project";
    const description =
      type === "startups"
        ? `<p>Инициатива: ${escapeHtml(item.initiative || "")}</p>`
        : `<p>Проектное задание: ${escapeHtml(item.challenge || "")}</p>`;
    const title =
      type === "startups"
        ? escapeHtml(item.partner)
        : `Партнер: ${escapeHtml(item.partner)}`;
    const logo = type === "projects" && item.logo
      ? `<div class="entrepreneurship-project-logo"><img src="${escapeHtml(item.logo)}" alt="Логотип ${escapeHtml(item.partner)}" loading="lazy" /></div>`
      : "";
    const links = Array.isArray(item.links)
      ? item.links
      : item.link && item.link !== "#"
        ? [{ label: "Link", url: item.link }]
        : [];
    const linksMarkup = links.length
      ? `<div class="entrepreneurship-project-links">${links
          .map((link, index) => {
            const label = link.label || `Link ${index + 1}`;
            return `<a href="${escapeHtml(link.url)}" target="_blank" rel="noopener noreferrer" aria-label="${escapeHtml(label)}: ${escapeHtml(item.partner)}">${escapeHtml(label)}</a>`;
          })
          .join("")}</div>`
      : `<div class="entrepreneurship-project-links entrepreneurship-project-links--empty"><span>Ссылка скоро</span></div>`;

    article.innerHTML = `
      <h3>${title}</h3>
      ${description}
      ${logo}
      ${linksMarkup}
    `;
    fragment.appendChild(article);
  });

  grid.appendChild(fragment);
}

function initEntrepreneurshipCourse() {
  const panel = document.getElementById("entrepreneurship-projects-panel");
  const yearButtons = Array.from(document.querySelectorAll(".entrepreneurship-year-btn"));
  const tabs = Array.from(document.querySelectorAll(".entrepreneurship-tab"));

  if (!(panel instanceof HTMLElement) || yearButtons.length === 0 || tabs.length === 0) return;

  let activeYear = null;
  let activeType = "projects";

  const setActiveTab = (type) => {
    activeType = type;
    tabs.forEach((tab) => {
      const isActive = tab instanceof HTMLElement && tab.dataset.type === type;
      tab.classList.toggle("is-active", isActive);
    });
  };

  const setActiveYear = (year) => {
    const shouldAnimateOpen = panel.hidden;
    activeYear = year;

    yearButtons.forEach((button) => {
      if (!(button instanceof HTMLButtonElement)) return;
      const isActive = button.dataset.year === year;
      button.classList.toggle("is-active", isActive);
      button.setAttribute("aria-expanded", String(isActive));
    });

    setActiveTab(activeType);
    renderEntrepreneurshipItems(year, activeType);
    if (shouldAnimateOpen) {
      setCollapsibleOpen(panel, true, "is-open");
    }
  };

  yearButtons.forEach((button) => {
    if (!(button instanceof HTMLButtonElement)) return;
    button.addEventListener("click", () => {
      const year = button.dataset.year;
      if (!year) return;
      if (activeYear === year && !panel.hidden) {
        setCollapsibleOpen(panel, false, "is-open");
        activeYear = null;
        button.classList.remove("is-active");
        button.setAttribute("aria-expanded", "false");
        return;
      }
      setActiveYear(year);
    });
  });

  tabs.forEach((tab) => {
    if (!(tab instanceof HTMLButtonElement)) return;
    tab.addEventListener("click", () => {
      const type = tab.dataset.type || "projects";
      setActiveTab(type);
      if (activeYear) renderEntrepreneurshipItems(activeYear, activeType);
    });
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

/**
 * Видео в блоке Minerva/MBacc.
 * Обложки задаются в CSS у .mbacc-video:nth-child(...).
 * Для замены видео меняйте только embedUrl.
 */
const MBACC_VIDEOS = [
  {
    title: "MBacc overview",
    embedUrl: "https://www.youtube.com/embed/i8Org9juGOc",
  },
  {
    title: "Research on Student Learning Outcomes",
    embedUrl: "https://www.youtube.com/embed/N47_mxtsPoo",
  },
];

function openEmbedVideoModal({ title: videoTitle, embedUrl }) {
  const backdrop = document.getElementById("video-modal-backdrop");
  const body = document.getElementById("video-modal-body");
  const title = document.getElementById("video-modal-title");
  if (!backdrop || !body || !title || !embedUrl) return;

  closeHeroVideoModal();

  title.textContent = videoTitle || "Видео";
  body.innerHTML = `<iframe src="${escapeHtml(embedUrl)}" title="${escapeHtml(videoTitle || "Видео")}" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`;
  backdrop.classList.add("is-open");
  backdrop.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}

function initMbaccVideos() {
  const buttons = Array.from(document.querySelectorAll(".mbacc-video-preview, .mbacc-dark-video-preview"));
  if (buttons.length === 0) return;

  buttons.forEach((button, index) => {
    if (!(button instanceof HTMLButtonElement)) return;
    const video = MBACC_VIDEOS[index % MBACC_VIDEOS.length];
    const title = button.parentElement?.querySelector(".mbacc-video-title, .mbacc-dark-video-title");
    if (title) title.textContent = video.title;
    button.addEventListener("click", () => openEmbedVideoModal(video));
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

function initOpenDayForm() {
  const host = document.getElementById("open-day-form-host");
  if (!host || host.childElementCount > 0) return;

  const script = document.createElement("script");
  script.setAttribute("data-b24-form", "click/48/qgzyxa");
  script.setAttribute("data-skip-moving", "true");
  script.text = "(function(w,d,u){var s=d.createElement('script');s.async=true;s.src=u+'?'+(Date.now()/180000|0);var h=d.getElementsByTagName('script')[0];h.parentNode.insertBefore(s,h);})(window,document,'https://cdn-ru.bitrix24.kz/b18109524/crm/form/loader_48.js');";
  host.appendChild(script);
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
  const playBtn = document.querySelector(".expert-video .video-button, .hero-video .video-button");
  const label = document.querySelector(".expert-video h2, .hero-video span");
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
  initEntrepreneurshipCourse();
  renderCompanies();
  initMbaccVideos();
  initVideoCarousel();
  initVideoModalChrome();
  initHeroForm();
  initOpenDay();
  initOpenDayForm();
  initConsultModal();
  initReveal();
});
