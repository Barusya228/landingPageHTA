const HERO_SLIDE_INTERVAL = 5000;
const ENTREPRENEURSHIP_SLIDE_INTERVAL = 2000;
const TESTIMONIAL_SLIDE_INTERVAL = 7000;
const COMMUNITY_SLIDE_INTERVAL = 10000;
const COMMUNITY_SLIDE_TRANSITION_DELAY = 140;
const COMMUNITY_SWIPE_THRESHOLD = 36;
const COMMUNITY_SLIDES = [
  { src: "./images/Портрет выпускника/1.png", altKey: "ALT_GRADUATE_DREAMER", fallbackAlt: "Портрет выпускника HTA — мечтатель" },
  { src: "./images/Портрет выпускника/2.png", altKey: "ALT_GRADUATE_CRITICAL_THINKER", fallbackAlt: "Портрет выпускника HTA — критически мыслящий" },
  { src: "./images/Портрет выпускника/3.png", altKey: "ALT_GRADUATE_LIFELONG_LEARNER", fallbackAlt: "Портрет выпускника HTA — обучающийся на протяжении всей жизни" },
  { src: "./images/Портрет выпускника/4.png", altKey: "ALT_GRADUATE_COLLABORATIVE", fallbackAlt: "Портрет выпускника HTA — умеет сотрудничать" },
  { src: "./images/Портрет выпускника/5.png", altKey: "ALT_GRADUATE_GLOBAL_CITIZEN", fallbackAlt: "Портрет выпускника HTA — гражданин мира" },
  { src: "./images/Портрет выпускника/6.png", altKey: "ALT_GRADUATE_PROBLEM_SOLVER", fallbackAlt: "Портрет выпускника HTA — решающий проблемы" },
  { src: "./images/Портрет выпускника/7.png", altKey: "ALT_GRADUATE_COMMUNICATOR", fallbackAlt: "Портрет выпускника HTA — искусный собеседник" },
  { src: "./images/Портрет выпускника/8.png", altKey: "ALT_GRADUATE_EMOTIONAL", fallbackAlt: "Портрет выпускника HTA — эмоционально-компетентный" },
];

function translate(key, fallback = "") {
  return typeof window.t === "function" ? window.t(key, fallback) : fallback;
}

function updateKordaMethodVideo(language = "ru") {
  const video = document.getElementById("korda-method-video");
  const source = document.getElementById("korda-method-video-source");

  if (!(video instanceof HTMLVideoElement) || !(source instanceof HTMLSourceElement)) return;

  const videoSrc = language === "ru"
    ? "./Видео/Дорис-RU.mp4"
    : "./Видео/Дорис-EN.mp4";

  if (source.getAttribute("src") === videoSrc) return;

  const wasPlaying = !video.paused;

  video.pause();
  source.setAttribute("src", videoSrc);
  video.load();

  if (wasPlaying) {
    video.play().catch(() => {});
  }
}

function preloadImages(imageSources) {
  [...new Set(imageSources.filter(Boolean))].forEach((src) => {
    const image = new Image();
    image.src = src;
  });
}

function getImageSources(selector, root = document) {
  return Array.from(root.querySelectorAll(selector))
    .map((image) => (image instanceof HTMLImageElement ? image.currentSrc || image.src : ""))
    .filter(Boolean);
}

function preloadCriticalImages() {
  preloadImages([
    ...getImageSources(".hero-slide"),
    ...getImageSources("#entrepreneurship-slider .slider-track img"),
    ...COMMUNITY_SLIDES.map(({ src }) => src),
  ]);
}

function restoreHashScroll() {
  window.setTimeout(() => {
    const hash = window.location.hash;
    if (!hash) return;
    if (hash === "#hero") {
      window.scrollTo(0, 0);
      return;
    }

    const target = document.querySelector(hash);
    if (target instanceof HTMLElement) {
      target.scrollIntoView({ behavior: "auto", block: "start" });
    }
  }, 120);
}

function renderGraduateLinkedInQuote() {
  if (!window.__graduateLinkedInQuoteLanguageListener) {
    window.__graduateLinkedInQuoteLanguageListener = true;
    window.addEventListener("languageChanged", renderGraduateLinkedInQuote);
  }

  const graduateTitle = document.querySelector('[data-i18n="COMMUNITY_MESSAGE_TITLE"]');
  const graduateSection = graduateTitle?.closest("section");

  if (!(graduateSection instanceof HTMLElement)) return;

  let quote = graduateSection.querySelector(".graduate-linkedin-quote");

  if (!quote) {
    quote = document.createElement("div");
    quote.className = "graduate-linkedin-quote";
    quote.innerHTML = `
      <div class="graduate-linkedin-quote__mark" aria-hidden="true">“</div>
      <blockquote class="graduate-linkedin-quote__text" data-i18n="GRADUATE_LINKEDIN_QUOTE"></blockquote>
      <p class="graduate-linkedin-quote__author" data-i18n="GRADUATE_LINKEDIN_AUTHOR"></p>
    `;
    
    const carousel =
      graduateSection.querySelector(".graduate-carousel") ||
      graduateSection.querySelector(".graduate-profile-carousel") ||
      graduateSection.querySelector(".profile-carousel") ||
      graduateSection.querySelector(".graduate-slider");

    if (carousel) {
      carousel.insertAdjacentElement("afterend", quote);
    } else {
      graduateSection.appendChild(quote);
    }
  }

  const text = quote.querySelector('[data-i18n="GRADUATE_LINKEDIN_QUOTE"]');
  const author = quote.querySelector('[data-i18n="GRADUATE_LINKEDIN_AUTHOR"]');

  if (text instanceof HTMLElement) {
    text.textContent = translate(
      "GRADUATE_LINKEDIN_QUOTE",
      "Любопытство, смелость, креативность, сострадание и коммуникация становятся особенно важными навыками в эпоху ИИ"
    );
  }

  if (author instanceof HTMLElement) {
    author.textContent = translate(
      "GRADUATE_LINKEDIN_AUTHOR",
      "Райан Рослански, CEO LinkedIn"
    );
  }
}

function initHeader() {
  const header = document.querySelector(".site-header");
  const headerInner = document.querySelector(".header-inner");
  const brand = document.querySelector(".brand");
  const headerActions = document.querySelector(".header-actions");
  const toggle = document.querySelector(".nav-toggle");
  const navList = document.getElementById("nav-list");
  if (
    !(header instanceof HTMLElement) ||
    !(headerInner instanceof HTMLElement) ||
    !(brand instanceof HTMLElement) ||
    !(headerActions instanceof HTMLElement) ||
    !(toggle instanceof HTMLButtonElement) ||
    !(navList instanceof HTMLElement)
  ) {
    return;
  }

  const closeMenu = () => {
    navList.classList.remove("is-open");
    toggle.classList.remove("is-open");
    toggle.setAttribute("aria-expanded", "false");
    document.body.classList.remove("nav-open");
  };

  const updateHeaderLayout = () => {
    const forceCollapsed = window.innerWidth <= 1100;
    const collisionGap = 12;

    header.classList.remove("is-collapsed");

    if (!forceCollapsed) {
      const brandRect = brand.getBoundingClientRect();
      const navRect = navList.getBoundingClientRect();
      const socialRect = headerActions.getBoundingClientRect();
      const hasLeftCollision = navRect.left <= brandRect.right + collisionGap;
      const hasRightCollision = navRect.right >= socialRect.left - collisionGap;

      if (hasLeftCollision || hasRightCollision) {
        header.classList.add("is-collapsed");
      }
    } else {
      header.classList.add("is-collapsed");
    }

    if (!header.classList.contains("is-collapsed")) {
      closeMenu();
    }
  };

  toggle.addEventListener("click", () => {
    const shouldOpen = !navList.classList.contains("is-open");
    navList.classList.toggle("is-open", shouldOpen);
    toggle.classList.toggle("is-open", shouldOpen);
    toggle.setAttribute("aria-expanded", shouldOpen ? "true" : "false");
    document.body.classList.toggle("nav-open", shouldOpen);
  });

  navList.addEventListener("click", (event) => {
    const target = event.target;
    if (target instanceof HTMLElement && target.closest("a")) closeMenu();
  });

  document.addEventListener("click", (event) => {
    const target = event.target;
    if (!(target instanceof Node)) return;
    if (!navList.contains(target) && !toggle.contains(target)) closeMenu();
  });

  window.addEventListener("resize", updateHeaderLayout);

  if (document.fonts?.ready) {
    document.fonts.ready.then(updateHeaderLayout).catch(() => {});
  }

  updateHeaderLayout();
}

function initSlider() {
  const slider = document.getElementById("entrepreneurship-slider");
  if (!(slider instanceof HTMLElement)) return;

  const slides = Array.from(slider.querySelectorAll(".slider-track img"));
  if (slides.length < 2) return;

  const dotsContainer = slider.querySelector(".slider-dots");
  let currentIndex = Math.max(0, slides.findIndex((img) => img.classList.contains("is-active")));
  if (currentIndex < 0) currentIndex = 0;
  let autoplayId = 0;

  const showSlide = (index) => {
    currentIndex = (index + slides.length) % slides.length;
    slides.forEach((img, i) => {
      img.classList.toggle("is-active", i === currentIndex);
    });
    dots.forEach((dot, i) => {
      dot.classList.toggle("is-active", i === currentIndex);
      dot.setAttribute("aria-selected", String(i === currentIndex));
    });
  };

  const stopAutoplay = () => {
    window.clearInterval(autoplayId);
    autoplayId = 0;
  };

  const startAutoplay = () => {
    stopAutoplay();
    autoplayId = window.setInterval(() => {
      showSlide(currentIndex + 1);
    }, ENTREPRENEURSHIP_SLIDE_INTERVAL);
  };

  const dots = dotsContainer instanceof HTMLElement
    ? slides.map((_, index) => {
        const dot = document.createElement("span");
        dot.className = "slider-dot";
        dot.setAttribute("aria-hidden", "true");
        dot.setAttribute("aria-selected", String(index === currentIndex));
        dotsContainer.append(dot);
        return dot;
      })
    : [];

  showSlide(currentIndex);
  startAutoplay();

  document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
      stopAutoplay();
      return;
    }

    startAutoplay();
  });

  window.addEventListener("pagehide", stopAutoplay, { once: true });
}

function initHeroSlider() {
  const slides = Array.from(document.querySelectorAll(".hero-slide"));
  if (slides.length < 2) return;

  let currentIndex = Math.max(0, slides.findIndex((slide) => slide.classList.contains("is-active")));
  let autoplayId = 0;

  slides.forEach((slide, index) => {
    if (index === currentIndex) {
      slide.classList.add("is-active");
    } else {
      slide.classList.remove("is-active", "is-exiting", "is-reset");
    }
  });

  const showNextSlide = () => {
    const currentSlide = slides[currentIndex];
    const nextIndex = (currentIndex + 1) % slides.length;
    const nextSlide = slides[nextIndex];

    nextSlide.classList.remove("is-reset");
    nextSlide.classList.add("is-active");
    currentSlide.classList.remove("is-active");
    currentSlide.classList.add("is-exiting");

    window.setTimeout(() => {
      currentSlide.classList.add("is-reset");
      currentSlide.classList.remove("is-exiting");
      void currentSlide.offsetWidth;
      currentSlide.classList.remove("is-reset");
      currentIndex = nextIndex;
    }, 920);
  };

  const stopAutoplay = () => {
    if (!autoplayId) return;
    window.clearInterval(autoplayId);
    autoplayId = 0;
  };

  const startAutoplay = () => {
    stopAutoplay();
    autoplayId = window.setInterval(showNextSlide, HERO_SLIDE_INTERVAL);
  };

  startAutoplay();

  document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
      stopAutoplay();
      return;
    }

    startAutoplay();
  });

  window.addEventListener("pagehide", stopAutoplay, { once: true });
}

function initMobileHeroBenefits() {
  const container = document.querySelector(".hero-benefits");
  if (!(container instanceof HTMLElement)) return;

  const cards = Array.from(container.querySelectorAll("article"));
  if (cards.length < 2) return;

  const mobileQuery = window.matchMedia("(max-width: 760px)");
  let activeIndex = 0;
  let intervalId = 0;

  const render = () => {
    cards.forEach((card, index) => {
      card.classList.toggle("is-active", index === activeIndex);
      card.setAttribute("aria-hidden", String(mobileQuery.matches && index !== activeIndex));
    });
  };

  const stop = () => {
    window.clearInterval(intervalId);
    intervalId = 0;
  };

  const start = () => {
    stop();

    if (!mobileQuery.matches) {
      container.classList.remove("is-mobile-carousel");
      cards.forEach((card) => {
        card.classList.remove("is-active");
        card.removeAttribute("aria-hidden");
      });
      return;
    }

    container.classList.add("is-mobile-carousel");
    activeIndex = 0;
    render();
    intervalId = window.setInterval(() => {
      activeIndex = (activeIndex + 1) % cards.length;
      render();
    }, 5000);
  };

  mobileQuery.addEventListener("change", start);
  start();

  window.addEventListener("pagehide", stop, { once: true });
}

function initMinervaCurriculumScrollHint() {
  const curriculum = document.querySelector(".minerva-curriculum");
  if (!(curriculum instanceof HTMLElement)) return;

  const scroller = curriculum.querySelector(".minerva-curriculum__scroller");
  const leftArrow = curriculum.querySelector(".minerva-curriculum__arrow--left");
  const rightArrow = curriculum.querySelector(".minerva-curriculum__arrow--right");

  if (
    !(scroller instanceof HTMLElement) ||
    !(leftArrow instanceof HTMLButtonElement) ||
    !(rightArrow instanceof HTMLButtonElement)
  ) {
    return;
  }

  const updateArrows = () => {
    const maxScroll = scroller.scrollWidth - scroller.clientWidth;
    leftArrow.classList.toggle("is-muted", scroller.scrollLeft <= 4);
    rightArrow.classList.toggle("is-muted", scroller.scrollLeft >= maxScroll - 4);
  };

  const scrollTable = (direction) => {
    scroller.scrollBy({
      left: direction * Math.round(scroller.clientWidth * 0.72),
      behavior: "smooth",
    });
  };

  leftArrow.addEventListener("click", () => scrollTable(-1));
  rightArrow.addEventListener("click", () => scrollTable(1));
  scroller.addEventListener("scroll", updateArrows, { passive: true });
  window.addEventListener("resize", updateArrows);

  updateArrows();
}

function initLifeCollage() {
  const cells = Array.from(document.querySelectorAll(".life-cell"));
  if (!cells.length) return;

  cells.forEach((cell, cellIndex) => {
    const images = Array.from(cell.querySelectorAll("img"));
    if (images.length < 2) return;

    let currentIndex = 0;
    const rotationInterval = 5000 + (cellIndex % 4) * 700;
    const startDelay = cellIndex * 220;

    images.forEach((image, imageIndex) => {
      image.classList.toggle("is-active", imageIndex === 0);
    });

    const showNextImage = () => {
      images[currentIndex].classList.remove("is-active");
      currentIndex = (currentIndex + 1) % images.length;
      images[currentIndex].classList.add("is-active");
    };

    window.setTimeout(() => {
      window.setInterval(showNextImage, rotationInterval);
    }, startDelay);
  });
}

function initWhyQuotePlacement() {
  const whyCopy = document.querySelector(".why-copy");
  const heading = whyCopy?.querySelector("h2");
  const quote = whyCopy?.querySelector(".why-quote");
  if (!(whyCopy instanceof HTMLElement) || !(heading instanceof HTMLElement) || !(quote instanceof HTMLElement)) return;

  heading.insertAdjacentElement("afterend", quote);
}

function initWhyAccents() {
  const whyCopy = document.querySelector(".why-copy");
  if (!(whyCopy instanceof HTMLElement)) return;

  const paragraphs = Array.from(whyCopy.querySelectorAll("p"));
  const replacements = [
    { match: "умеет делать", replacement: '<span class="why-accent">умеет делать</span>' },
  ];

  paragraphs.forEach((paragraph) => {
    let html = paragraph.innerHTML;
    let changed = false;

    replacements.forEach(({ match, replacement }) => {
      if (html.includes(match)) {
        html = html.replace(match, replacement);
        changed = true;
      }
    });

    if (changed) {
      paragraph.innerHTML = html;
    }
  });
}

function initLearningAccent() {
  const learningSection = document.querySelector(".section-learning");
  const paragraphs = learningSection ? Array.from(learningSection.querySelectorAll("p")) : [];
  if (!paragraphs.length) return;

  paragraphs.forEach((paragraph) => {
    if (paragraph.innerHTML.includes("единственная")) {
      paragraph.innerHTML = paragraph.innerHTML.replace(
        "единственная",
        '<span class="learning-accent">единственная</span>'
      );
    }
  });
}


function initProjectTaskCards() {
  const container = document.getElementById("korda-project-tasks");
  if (!(container instanceof HTMLElement)) return;

  // Replace videoUrl values here when final vertical videos are ready.
  const projectTasks = [
    {
      labelKey: "PROJECT_TASK_LABEL",
      titleKey: "PROJECT_1_TITLE",
      descriptionKey: "PROJECT_1_DESCRIPTION_SHORT",
      partnerKey: "PROJECT_1_PARTNER",
      fallbackLabel: "Проектная задача",
      fallbackTitle: "Права детей в Казахстане",
      fallbackDescription: "Разработать план по снижению насилия над детьми в Казахстане.",
      fallbackPartner: 'Партнер: волонтерская организация "Корган"',
      videoUrl: "./Видео/Снижение насилия над детьми.mp4",
    },
    {
      labelKey: "PROJECT_TASK_LABEL",
      titleKey: "PROJECT_2_TITLE",
      descriptionKey: "PROJECT_2_DESCRIPTION_SHORT",
      partnerKey: "PROJECT_2_PARTNER",
      fallbackLabel: "Проектная задача",
      fallbackTitle: "Безопасность в горах Алматы",
      fallbackDescription: "Разработать план по значительному снижению несчастных случаев в горах Алматы.",
      fallbackPartner: "Партнер: Shymbulak Outdoor",
      videoUrl: "./Видео/Безопасность в горах Алматы.mp4",
    },
    {
      labelKey: "PROJECT_TASK_LABEL",
      titleKey: "PROJECT_3_TITLE",
      descriptionKey: "PROJECT_3_DESCRIPTION_SHORT",
      partnerKey: "PROJECT_3_PARTNER",
      fallbackLabel: "Проектная задача",
      fallbackTitle: "Новый спортивный комплекс для HTA",
      fallbackDescription: "Разработать концепцию нового спортивного комплекса, который заменит существующий.",
      fallbackPartner: "Партнер: High Tech Academy",
      videoUrl: "./Видео/Новый спортивный зал.mp4",
    },
  ];

  const escapeHtml = (value = "") =>
    String(value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");

  const renderProjectTaskCards = () => {
    container.replaceChildren(
      ...projectTasks.map((task) => {
      const article = document.createElement("article");
      article.className = "project-card project-task-card";
      const label = translate(task.labelKey, task.fallbackLabel);
      const title = translate(task.titleKey, task.fallbackTitle);
      const description = translate(task.descriptionKey, task.fallbackDescription);
      const partner = translate(task.partnerKey, task.fallbackPartner);
      article.innerHTML = `
        <h3>${escapeHtml(title)}</h3>
        <span class="project-task-card__label">${escapeHtml(label)}</span>
        <p class="project-task-card__description">${escapeHtml(description)}</p>
        <div class="project-task-card__footer">
          <p class="project-task-card__partner">${escapeHtml(partner)}</p>
          <button
            type="button"
            class="project-task-card__button project-task-video-button"
            data-video-title="${escapeHtml(title)}"
            data-video-src="${escapeHtml(task.videoUrl)}"
          >
            ${escapeHtml(translate("BUTTON_WATCH_VIDEO", "Смотреть видео"))}
          </button>
        </div>
      `;
      return article;
    })
    );

    initProjectTaskPartnerMarks();
  };

  renderProjectTaskCards();
  window.addEventListener("languageChanged", renderProjectTaskCards);
}

function initProjectTaskPartnerMarks() {
  const cards = Array.from(document.querySelectorAll(".project-task-card"));
  if (!cards.length) return;

  const marks = [
    { type: "image", src: "./logo/logo-korgan.png" },
    { type: "image", src: "./logo/logo-Shymbulak Outdoor.svg", alt: "Shymbulak Outdoor" },
    { type: "image", src: "./logo/logo-HTA.png", alt: "High Tech Academy" },
  ];

  cards.forEach((card, index) => {
    const footer = card.querySelector(".project-task-card__footer");
    const button = card.querySelector(".project-task-video-button");

    if (!(footer instanceof HTMLElement) || !(button instanceof HTMLElement)) return;

    let actions = footer.querySelector(".project-task-card__actions");
    if (!(actions instanceof HTMLElement)) {
      actions = document.createElement("div");
      actions.className = "project-task-card__actions";
      footer.append(actions);
    }

    actions.append(button);

    const config = marks[index];
    if (!config) return;

    let mark = actions.querySelector(".project-task-card__partner-mark");
    if (!(mark instanceof HTMLElement)) {
      mark = document.createElement("div");
      mark.className = "project-task-card__partner-mark";
      actions.append(mark);
    }

    if (config.type === "image") {
      mark.innerHTML = `<img class="project-task-card__partner-logo" src="${config.src}" alt="${config.alt}" loading="lazy" />`;
    } else {
      mark.innerHTML = `<span class="project-task-card__partner-badge" aria-hidden="true">${config.text}</span>`;
    }
  });
}

function initProjectTaskVideoModal() {
  const modal = document.getElementById("video-modal");
  const modalBody = document.getElementById("video-modal-body");
  const modalTitle = document.getElementById("video-modal-title");

  if (!(modal instanceof HTMLElement) || !(modalBody instanceof HTMLElement) || !(modalTitle instanceof HTMLElement)) {
    return;
  }

  const closeModal = () => {
    const video = modalBody.querySelector("video");
    if (video instanceof HTMLVideoElement) {
      video.pause();
      video.removeAttribute("src");
      video.load();
    }

    modal.classList.remove("is-open");
    modal.classList.remove("is-portrait");
    modal.setAttribute("aria-hidden", "true");
    document.body.classList.remove("modal-open");
    modalBody.replaceChildren();
  };

  const openModal = (title, videoSrc) => {
    if (!videoSrc) return;

    const video = document.createElement("video");
    video.src = videoSrc;
    video.title = title;
    video.controls = true;
    video.preload = "metadata";
    video.playsInline = true;

    modalTitle.textContent = title;
    modalBody.replaceChildren(video);
    modal.classList.add("is-open", "is-portrait");
    modal.setAttribute("aria-hidden", "false");
    document.body.classList.add("modal-open");
  };

  document.addEventListener("click", (event) => {
    const target = event.target;
    const trigger = target instanceof HTMLElement ? target.closest(".project-task-video-button") : null;
    if (!(trigger instanceof HTMLElement)) return;
    openModal(trigger.dataset.videoTitle || translate("ENTRE_VIDEO_LABEL", "Видео"), trigger.dataset.videoSrc || "");
  });

  modal.querySelectorAll("[data-video-close]").forEach((control) => {
    control.addEventListener("click", closeModal);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && modal.classList.contains("is-open")) closeModal();
  });
}

function initEntrepreneurProjectYearBlocks() {
  const panel = document.getElementById("entrepreneur-projects-extra");
  const title = document.getElementById("entrepreneur-projects-extra-title");
  const grid = document.getElementById("entrepreneur-projects-extra-grid");
  const yearButtons = Array.from(document.querySelectorAll("[data-project-year-trigger]"));
  const tabs = Array.from(document.querySelectorAll(".entrepreneur-projects-extra__tab"));

  if (!(panel instanceof HTMLElement) || !(title instanceof HTMLElement) || !(grid instanceof HTMLElement) || !yearButtons.length || !tabs.length) {
    return;
  }

  const entrepreneurshipData = {
    "2025-2026": {
      projects: [
        {
          titleKey: "ENTRE_2025_UVU_PARTNER",
          descriptionKey: "ENTRE_2025_UVU_TASK",
          image: "./images/Курс по предпринимательству/Уву проект 2025-2026.png",
          logo: "./logo/logo-uvu.png",
          links: [
            { labelKey: "ENTRE_VIDEO_1", url: "https://www.instagram.com/reel/DPvMWytD2eB/?igsh=MWl1dGM0Z252d3EzdA%3D%3D" },
            { labelKey: "ENTRE_VIDEO_2", url: "https://www.instagram.com/p/DOoCyZfDOB3/?igsh=MXRoazliNHl6Y3hqcA%3D%3D" },
          ],
        },
        {
          titleKey: "ENTRE_2025_ALMATY_AIR_PARTNER",
          descriptionKey: "ENTRE_2025_ALMATY_AIR_TASK",
          image: "./images/Курс по предпринимательству/almaty air initiative проект.png",
          logo: "./logo/logo-Almaty-Ait-Initiative.png",
          links: [
            { labelKey: "ENTRE_VIDEO", url: "https://www.instagram.com/reel/DQlRIb7j73a/?igsh=N296N3Nram5jMThpm" },
          ],
        },
        {
          titleKey: "ENTRE_2025_AMIRAN_PARTNER",
          descriptionKey: "ENTRE_2025_AMIRAN_TASK",
          image: "./images/Курс по предпринимательству/Амиран 2.jpg",
          logo: "./logo/logo-amiran.svg",
          links: [
            { labelKey: "ENTRE_VIDEO_1", url: "https://www.instagram.com/reel/DSsPZMXjRab/?igsh=MW11bGN4NDF1MndmZQ==" },
            { labelKey: "ENTRE_VIDEO_2", url: "https://www.instagram.com/reel/DRRKiOFCK-7/?igsh=anhiaGl5dGNuNDUy" },
          ],
        },
      ],
      startups: [
        {
          titleKey: "ENTRE_2025_BARYTAN_TITLE",
          descriptionKey: "ENTRE_2025_BARYTAN_TEXT",
          image: "./images/Курс по предпринимательству/Barytan AI 2025 26.png",
        },
        {
          titleKey: "ENTRE_2025_RAYHEART_TITLE",
          descriptionKey: "ENTRE_2025_RAYHEART_TEXT",
          image: "./images/Курс по предпринимательству/RayHeart Стартап 2025-2026.png",
        },
        {
          titleKey: "ENTRE_2025_NEXTSTEP_TITLE",
          descriptionKey: "ENTRE_2025_NEXTSTEP_TEXT",
          image: "./images/Курс по предпринимательству/Летний лагерь 2025-2026.png",
        },
      ],
    },
    "2024-2025": {
      projects: [
      {
          titleKey: "ENTRE_2024_PLATFORMA_PARTNER",
          descriptionKey: "ENTRE_2024_PLATFORMA_TASK",
          image: "./images/Курс по предпринимательству/Проект Платформа 2024-2025.png",
          logo: "./logo/logo-PlatformA.webp",
          links: [
            { labelKey: "ENTRE_VIDEO", url: "https://www.instagram.com/reel/DAntohWtorV/?igsh=YnRocHExNjR0a3Ni" },
          ],
        },
        {
          titleKey: "ENTRE_2024_KAZBEEF_PARTNER",
          descriptionKey: "ENTRE_2024_KAZBEEF_TASK",
          image: "./images/Курс по предпринимательству/Казбиф 2024-2025.png",
          logo: "./logo/logo-kazbeef.jpg",
        },
        {
          titleKey: "ENTRE_2024_SHINLINE_PARTNER",
          descriptionKey: "ENTRE_2024_SHINLINE_TASK",
          image: "./images/Курс по предпринимательству/Шин-Лайн проект2024-2025.png",
          logo: "./logo/logo-shinlain.png",
        },
      ],
      startups: [
        {
          titleKey: "ENTRE_2024_SILVER_PEAR_TITLE",
          descriptionKey: "ENTRE_2024_SILVER_PEAR_TEXT",
          image: "./images/Курс по предпринимательству/Стартап Silver Pear 2024-2025.png",
        },
        {
          titleKey: "ENTRE_2024_TAN_TITLE",
          descriptionKey: "ENTRE_2024_TAN_TEXT",
          image: "./images/Курс по предпринимательству/Тан стартап 2024-2025.png",
        },
        {
          titleKey: "ENTRE_2024_PETX_TITLE",
          descriptionKey: "ENTRE_2024_PETX_TEXT",
          image: "./images/Курс по предпринимательству/Приют Стартап 2024-2025.png",
        },
      ],
    },
    "2023-2024": {
      projects: [
        {
          titleKey: "ENTRE_ARBUZ_PARTNER",
          descriptionKey: "ENTRE_ARBUZ_TASK",
          image: "./images/Курс по предпринимательству/Арбуз.jpg",
          logo: "./logo/logo-arbuz.png",
        },
        {
          titleKey: "ENTRE_COMPASS_PARTNER",
          descriptionKey: "ENTRE_COMPASS_TASK",
          image: "./images/Курс по предпринимательству/компас проект 2023-2024.png",
          logo: "./logo/logo-compass.jpg",
        },
      ],
      startups: [
        {
          titleKey: "ENTRE_2023_POMOGI_TITLE",
          descriptionKey: "ENTRE_2023_POMOGI_TEXT",
          image: "./images/Курс по предпринимательству/помоги приюту стартапы 2023-2024.png",
        },
        {
          titleKey: "ENTRE_2023_FOOD_SAVING_TITLE",
          descriptionKey: "ENTRE_2023_FOOD_SAVING_TEXT",
          image: "./images/Курс по предпринимательству/Food saving стартапы 2023-2024.png",
        },
        {
          titleKey: "ENTRE_2023_AINA_TITLE",
          descriptionKey: "ENTRE_2023_AINA_TEXT",
          image: "./images/Курс по предпринимательству/aina стартап 2023-2024.png",
        },
      ],
    },
  };

  let activeYear = "2025-2026";
  let activeCategory = "projects";
  let activeItemIndex = 0;

  const escapeHtml = (value = "") =>
    String(value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");

  const getLocalizedTitle = (item) => translate(item.titleKey, "");
  const getLocalizedDescription = (item) => translate(item.descriptionKey, "");
  const stripPrefix = (value = "") => String(value).replace(/^[^:]+:\s*/u, "");
  const getShortTitle = (item) => stripPrefix(getLocalizedTitle(item));
  const getShortDescription = (item) => stripPrefix(getLocalizedDescription(item));
  const getInitials = (value) =>
    value
      .split(/\s+/)
      .filter(Boolean)
      .slice(0, 2)
      .map((part) => part[0])
      .join("")
      .toUpperCase();

  const getValidLinks = (item) =>
    Array.isArray(item.links)
      ? item.links.filter((link) => link && link.url && (link.labelKey || link.label))
      : [];

  const getLinkLabel = (link) => translate(link.labelKey, link.label || translate("ENTRE_VIDEO", "Видео"));

  const renderLinks = (item) => {
    const links = getValidLinks(item);
    if (!links.length) return "";

    return `
      <div class="entrepreneur-projects-extra__links">
        ${links
          .map(
            (link) =>
              `<a class="entrepreneur-projects-extra__link" href="${escapeHtml(link.url)}" target="_blank" rel="noopener noreferrer">${escapeHtml(getLinkLabel(link))}</a>`
          )
          .join("")}
      </div>
    `;
  };

  const getBadgeAccentClass = (index = 0) => {
    const cycleIndex = ((index % 3) + 3) % 3;
    return `entrepreneur-projects-extra__logo--accent-${cycleIndex + 1}`;
  };

  const renderLogo = (item, badgeIndex = 0) => {
    if (item.logo) {
      return `<span class="entrepreneur-projects-extra__logo"><img src="${escapeHtml(item.logo)}" alt="${escapeHtml(getShortTitle(item))}" loading="lazy" /></span>`;
    }

    return `<span class="entrepreneur-projects-extra__logo entrepreneur-projects-extra__logo--text ${getBadgeAccentClass(badgeIndex)}">${escapeHtml(getInitials(getShortTitle(item)))}</span>`;
  };

  const syncTabs = () => {
    tabs.forEach((tab) => {
      if (!(tab instanceof HTMLButtonElement)) return;
      const isActive = tab.dataset.extraTab === activeCategory;
      tab.classList.toggle("is-active", isActive);
      tab.setAttribute("aria-selected", String(isActive));
    });
  };

  const renderSpotlight = () => {
    if (!activeYear) return;

    const yearData = entrepreneurshipData[activeYear];
    const currentItems = yearData?.[activeCategory] || [];
    title.textContent = translate(`ENTRE_YEAR_${activeYear.replace(/-/g, "_")}`, activeYear.replace("-", "–"));

    if (!currentItems.length) {
      const empty = document.createElement("p");
      empty.className = "entrepreneur-projects-extra__empty";
      empty.textContent = translate("ENTRE_EMPTY_MESSAGE", "Информация скоро будет добавлена");
      grid.replaceChildren(empty);
      syncTabs();
      return;
    }

    if (activeItemIndex >= currentItems.length) activeItemIndex = 0;

    const activeItem = currentItems[activeItemIndex] || currentItems[0];
    const nav = document.createElement("div");
    nav.className = "entrepreneur-projects-extra__nav";
    nav.setAttribute("aria-label", translate("ENTRE_PROJECT_LIST_LABEL", "Список проектов"));

    currentItems.forEach((item, index) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "entrepreneur-projects-extra__nav-card";
      button.classList.toggle("is-active", index === activeItemIndex);
      button.setAttribute("aria-pressed", String(index === activeItemIndex));
      button.dataset.itemIndex = String(index);
      button.innerHTML = `
        ${renderLogo(item, index)}
        <span class="entrepreneur-projects-extra__nav-copy">
          <span class="entrepreneur-projects-extra__nav-title">${escapeHtml(getShortTitle(item))}</span>
          <span class="entrepreneur-projects-extra__nav-text">${escapeHtml(getShortDescription(item))}</span>
        </span>
        <span class="entrepreneur-projects-extra__nav-arrow" aria-hidden="true">›</span>
      `;
      button.addEventListener("click", () => {
        activeItemIndex = index;
        renderSpotlight();
      });
      nav.append(button);
    });

    const hero = document.createElement("article");
    hero.className = "entrepreneur-projects-extra__spotlight";
    hero.innerHTML = `
      <img
        class="entrepreneur-projects-extra__spotlight-image"
        src="${escapeHtml(activeItem.image)}"
        alt="${escapeHtml(getShortTitle(activeItem))}"
        loading="lazy"
      />
      <div class="entrepreneur-projects-extra__spotlight-info">
        ${renderLogo(activeItem, activeItemIndex)}
        <div class="entrepreneur-projects-extra__spotlight-copy">
          <h4 class="entrepreneur-projects-extra__spotlight-title">${escapeHtml(getLocalizedTitle(activeItem))}</h4>
          <p class="entrepreneur-projects-extra__spotlight-text">${escapeHtml(getLocalizedDescription(activeItem))}</p>
          ${renderLinks(activeItem)}
        </div>
      </div>
    `;

    grid.replaceChildren(nav, hero);

    syncTabs();
  };

  const resetActiveItem = () => {
    activeItemIndex = 0;
  };

  const selectYear = (nextYear) => {
    activeYear = nextYear;
    activeCategory = "projects";
    resetActiveItem();
    syncYearButtons();
    renderSpotlight();
    openPanel();
  };

  const syncYearButtons = () => {
    yearButtons.forEach((button) => {
      if (!(button instanceof HTMLButtonElement)) return;
      const isActive = button.dataset.projectYearTrigger === activeYear;
      button.classList.toggle("is-active", isActive);
      button.setAttribute("aria-expanded", String(isActive));
    });
  };

  const openPanel = () => {
    panel.hidden = false;
    requestAnimationFrame(() => {
      panel.classList.add("is-open");
    });
  };

  yearButtons.forEach((button) => {
    button.addEventListener("click", () => {
      if (!(button instanceof HTMLButtonElement)) return;
      const nextYear = button.dataset.projectYearTrigger;
      if (!nextYear) return;
      selectYear(nextYear);
    });
  });

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      if (!(tab instanceof HTMLButtonElement) || !activeYear) return;
      const nextTab = tab.dataset.extraTab;
      if (!nextTab || nextTab === activeCategory) return;
      activeCategory = nextTab;
      resetActiveItem();
      renderSpotlight();
    });
  });

  syncYearButtons();
  renderSpotlight();
  openPanel();
  window.addEventListener("languageChanged", renderSpotlight);
}

function initTestimonialCarousel() {
  const carousel = document.getElementById("testimonial-carousel");
  const dotsContainer = document.querySelector(".testimonial-dots");
  if (!(carousel instanceof HTMLElement) || !(dotsContainer instanceof HTMLElement)) return;

  const slides = Array.from(carousel.querySelectorAll(".testimonial-slide"));
  const prevButton = carousel.querySelector(".testimonial-arrow--prev");
  const nextButton = carousel.querySelector(".testimonial-arrow--next");
  if (!(prevButton instanceof HTMLButtonElement) || !(nextButton instanceof HTMLButtonElement) || slides.length < 2) return;

  let currentIndex = Math.max(0, slides.findIndex((slide) => slide.classList.contains("is-active")));
  if (currentIndex < 0) currentIndex = 0;
  let autoplayId = 0;
  let touchStartX = 0;
  let touchEndX = 0;

  dotsContainer.replaceChildren();

  const freshPrevButton = prevButton.cloneNode(true);
  const freshNextButton = nextButton.cloneNode(true);
  prevButton.replaceWith(freshPrevButton);
  nextButton.replaceWith(freshNextButton);

  const dots = slides.map((_, index) => {
    const dot = document.createElement("button");
    dot.type = "button";
    dot.className = "testimonial-dot";
    dot.addEventListener("click", () => showSlide(index));
    dotsContainer.append(dot);
    return dot;
  });

  const syncDotLabels = () => {
    dots.forEach((dot, index) => {
      dot.setAttribute(
        "aria-label",
        translate("TESTIMONIAL_DOT_LABEL", "Показать отзыв {number}").replace("{number}", String(index + 1))
      );
    });
  };

  const showSlide = (index) => {
    currentIndex = (index + slides.length) % slides.length;
    slides.forEach((slide, slideIndex) => {
      slide.classList.toggle("is-active", slideIndex === currentIndex);
    });
    dots.forEach((dot, dotIndex) => {
      dot.classList.toggle("is-active", dotIndex === currentIndex);
      dot.setAttribute("aria-current", dotIndex === currentIndex ? "true" : "false");
    });
  };

  const showNext = () => showSlide(currentIndex + 1);
  const showPrev = () => showSlide(currentIndex - 1);

  const stopAutoplay = () => {
    if (autoplayId) {
      window.clearInterval(autoplayId);
      autoplayId = 0;
    }
  };

  const startAutoplay = () => {
    stopAutoplay();
    autoplayId = window.setInterval(showNext, 7000);
  };

  freshPrevButton.addEventListener("click", showPrev);
  freshNextButton.addEventListener("click", showNext);

  carousel.addEventListener("mouseenter", stopAutoplay);
  carousel.addEventListener("mouseleave", startAutoplay);

  carousel.addEventListener("touchstart", (event) => {
    touchStartX = event.changedTouches[0]?.clientX || 0;
  }, { passive: true });

  carousel.addEventListener("touchend", (event) => {
    touchEndX = event.changedTouches[0]?.clientX || 0;
    const delta = touchEndX - touchStartX;
    if (Math.abs(delta) < 40) return;
    if (delta < 0) showNext();
    if (delta > 0) showPrev();
  }, { passive: true });

  showSlide(currentIndex);
  syncDotLabels();
  startAutoplay();

  window.addEventListener("languageChanged", syncDotLabels);

  window.addEventListener("pagehide", stopAutoplay, { once: true });
}

const b24FormConfig = {
  id: "32",
  lang: "ru",
  sec: "3816ef",
  type: "popup",
};

let b24LoaderPromise = null;

function openB24Form() {
  if (typeof window.b24form !== "function") return false;
  window.b24form(b24FormConfig);
  return true;
}

function waitForB24Form(timeout = 8000) {
  if (typeof window.b24form === "function") {
    return Promise.resolve(true);
  }

  return new Promise((resolve) => {
    const startedAt = Date.now();
    const timer = window.setInterval(() => {
      if (typeof window.b24form === "function") {
        window.clearInterval(timer);
        resolve(true);
        return;
      }

      if (Date.now() - startedAt >= timeout) {
        window.clearInterval(timer);
        resolve(false);
      }
    }, 100);
  });
}

function loadB24Form() {
  if (b24LoaderPromise) return b24LoaderPromise;

  b24LoaderPromise = new Promise((resolve, reject) => {
    const existingScript = document.querySelector('script[src*="/crm/form/loader_32.js"]');
    if (existingScript) {
      if (typeof window.b24form === "function") {
        resolve();
        return;
      }

      const finishWhenReady = async () => {
        const ready = await waitForB24Form();
        if (ready) {
          resolve();
        } else {
          reject(new Error("Bitrix24 form loader script found, but form API did not initialize"));
        }
      };

      existingScript.addEventListener("load", finishWhenReady, { once: true });
      existingScript.addEventListener("error", () => reject(new Error("Bitrix24 form loader failed")), { once: true });
      window.setTimeout(() => {
        finishWhenReady().catch(reject);
      }, 150);
      return;
    }

    const script = document.createElement("script");
    script.async = true;
    script.src = `https://cdn-ru.bitrix24.kz/b18109524/crm/form/loader_32.js?${Math.floor(Date.now() / 180000)}`;
    script.dataset.b24Form = "click/32/3816ef";
    script.dataset.skipMoving = "true";
    script.onload = async () => {
      const ready = await waitForB24Form();
      if (ready) {
        resolve();
      } else {
        reject(new Error("Bitrix24 form API did not initialize after script load"));
      }
    };
    script.onerror = reject;
    document.head.appendChild(script);
  });

  return b24LoaderPromise;
}

function initLeadButtons() {
  const buttons = document.querySelectorAll(".b24-web-form-popup-btn-32");
  buttons.forEach((button) => {
    button.addEventListener("click", async (event) => {
      event.preventDefault();

      if (openB24Form()) {
        return;
      }

      try {
        await loadB24Form();

        if (openB24Form()) {
          return;
        }

        // If the widget initializes with a small delay after becoming available, try once more.
        window.setTimeout(() => {
          openB24Form();
        }, 350);
      } catch (error) {
        console.error("Bitrix24 form loader failed", error);
      }
    });
  });
}

function initAutoOpenBitrixFormFromUrl() {
  const params = new URLSearchParams(window.location.search);
  const shouldOpenBitrix = params.get("openForm") === "bitrix";
  if (!shouldOpenBitrix) return;

  let checks = 0;
  const maxChecks = 60;
  const intervalMs = 200;
  let isDone = false;

  const stop = (timerId) => {
    if (isDone) return;
    isDone = true;
    window.clearInterval(timerId);
  };

  const timerId = window.setInterval(async () => {
    if (isDone) return;
    checks += 1;

    if (openB24Form()) {
      stop(timerId);
      return;
    }

    const trigger = document.querySelector(".b24-web-form-popup-btn-32");
    if (trigger instanceof HTMLElement) {
      trigger.click();
      stop(timerId);
      return;
    }

    if (checks >= maxChecks) {
      try {
        await loadB24Form();
        if (openB24Form()) {
          stop(timerId);
          return;
        }
      } catch (error) {
        console.error("Bitrix24 auto-open failed", error);
      }
      stop(timerId);
    }
  }, intervalMs);
}

function initVideoModal() {
  const modal = document.getElementById("video-modal");
  const modalBody = document.getElementById("video-modal-body");
  const modalTitle = document.getElementById("video-modal-title");
  const triggers = Array.from(document.querySelectorAll(".video-trigger"));

  if (!(modal instanceof HTMLElement) || !(modalBody instanceof HTMLElement) || !(modalTitle instanceof HTMLElement) || !triggers.length) {
    return;
  }

  const closeModal = () => {
    modal.classList.remove("is-open");
    modal.classList.remove("is-portrait");
    modal.setAttribute("aria-hidden", "true");
    document.body.classList.remove("modal-open");
    modalBody.replaceChildren();
  };

  const openModal = (title, embedUrl, orientation) => {
    if (!embedUrl) return;

    const iframe = document.createElement("iframe");
    iframe.src = embedUrl;
    iframe.title = title;
    iframe.allow = "autoplay; encrypted-media; picture-in-picture; web-share";
    iframe.allowFullscreen = true;

    modalTitle.textContent = title;
    modalBody.replaceChildren(iframe);
    modal.classList.toggle("is-portrait", orientation === "portrait");
    modal.classList.add("is-open");
    modal.setAttribute("aria-hidden", "false");
    document.body.classList.add("modal-open");
  };

  triggers.forEach((trigger) => {
    trigger.addEventListener("click", () => {
      if (!(trigger instanceof HTMLElement)) return;
      const titleKey = trigger.dataset.videoTitleKey || "";
      openModal(
        titleKey
          ? translate(titleKey, trigger.dataset.videoTitle || translate("ENTRE_VIDEO_LABEL", "Video"))
          : trigger.dataset.videoTitle || translate("ENTRE_VIDEO_LABEL", "Video"),
        trigger.dataset.videoEmbed || "",
        trigger.dataset.videoOrientation || ""
      );
    });
  });

  modal.querySelectorAll("[data-video-close]").forEach((control) => {
    control.addEventListener("click", closeModal);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && modal.classList.contains("is-open")) closeModal();
  });
}

function initInlineVideos() {
  const inlineTriggers = Array.from(document.querySelectorAll(".video-inline-trigger"));
  if (!inlineTriggers.length) return;

  inlineTriggers.forEach((trigger) => {
    if (!(trigger instanceof HTMLButtonElement)) return;

    const cover = trigger.querySelector(".video-inline-cover");
    if (cover instanceof HTMLElement && trigger.dataset.inlineVideoCover) {
      cover.style.setProperty("--inline-video-cover", `url("${trigger.dataset.inlineVideoCover}")`);
    }

    trigger.addEventListener("click", () => {
      const embedUrl = trigger.dataset.inlineVideoEmbed || "";
      if (!embedUrl || trigger.querySelector("iframe")) return;

      const iframe = document.createElement("iframe");
      iframe.src = embedUrl;
      iframe.title = trigger.dataset.inlineVideoTitle || translate("ENTRE_VIDEO_LABEL", "Video");
      iframe.loading = "lazy";
      iframe.allow = "autoplay; encrypted-media; picture-in-picture; web-share";
      iframe.allowFullscreen = true;

      trigger.replaceChildren(iframe);
      trigger.classList.add("is-playing");
    });
  });
}

function initCommunitySlider() {
  const slider = document.querySelector("[data-community-slider]");
  if (!(slider instanceof HTMLElement)) return;

  const image = slider.querySelector("[data-community-image]");
  const prevButton = slider.querySelector("[data-community-prev]");
  const nextButton = slider.querySelector("[data-community-next]");
  const dotsHost = slider.querySelector("[data-community-dots]");

  if (
    !(image instanceof HTMLImageElement) ||
    !(prevButton instanceof HTMLButtonElement) ||
    !(nextButton instanceof HTMLButtonElement) ||
    !(dotsHost instanceof HTMLElement)
  ) {
    return;
  }

  const communitySlides = COMMUNITY_SLIDES;

  let activeIndex = 0;
  let touchStartX = 0;
  let touchCurrentX = 0;
  let autoplayId = 0;

  const freshPrevButton = prevButton.cloneNode(true);
  const freshNextButton = nextButton.cloneNode(true);
  prevButton.replaceWith(freshPrevButton);
  nextButton.replaceWith(freshNextButton);

  dotsHost.replaceChildren();

  const dots = communitySlides.map((_, index) => {
    const dot = document.createElement("button");
    dot.type = "button";
    dot.className = "community-slider__dot";
    dot.addEventListener("click", () => renderSlide(index));
    dotsHost.append(dot);
    return dot;
  });

  const syncDotLabels = () => {
    dots.forEach((dot, index) => {
      dot.setAttribute(
        "aria-label",
        translate("COMMUNITY_DOT_LABEL", "Открыть слайд {number}").replace("{number}", String(index + 1))
      );
    });
  };

  const getSlideAlt = (slide) => translate(slide.altKey, slide.fallbackAlt);

  const syncCurrentSlideAlt = () => {
    const slide = communitySlides[activeIndex];
    if (slide) image.alt = getSlideAlt(slide);
  };

  const renderSlide = (nextIndex) => {
    activeIndex = (nextIndex + communitySlides.length) % communitySlides.length;
    const slide = communitySlides[activeIndex];

      image.classList.add("is-fading");
      window.setTimeout(() => {
        image.src = slide.src;
      image.alt = getSlideAlt(slide);
      image.classList.remove("is-fading");
    }, COMMUNITY_SLIDE_TRANSITION_DELAY);

    dots.forEach((dot, index) => {
      dot.classList.toggle("is-active", index === activeIndex);
      dot.setAttribute("aria-current", index === activeIndex ? "true" : "false");
    });
  };

  const stopAutoplay = () => {
    if (!autoplayId) return;
    window.clearInterval(autoplayId);
    autoplayId = 0;
  };

  const startAutoplay = () => {
    stopAutoplay();
    autoplayId = window.setInterval(() => {
      renderSlide(activeIndex + 1);
    }, COMMUNITY_SLIDE_INTERVAL);
  };

  freshPrevButton.addEventListener("click", () => renderSlide(activeIndex - 1));
  freshNextButton.addEventListener("click", () => renderSlide(activeIndex + 1));

  slider.addEventListener("touchstart", (event) => {
    touchStartX = event.changedTouches[0]?.clientX || 0;
    touchCurrentX = touchStartX;
  }, { passive: true });

  slider.addEventListener("touchmove", (event) => {
    touchCurrentX = event.changedTouches[0]?.clientX || touchCurrentX;
  }, { passive: true });

  slider.addEventListener("touchend", () => {
    const delta = touchCurrentX - touchStartX;
    if (Math.abs(delta) < COMMUNITY_SWIPE_THRESHOLD) return;
    renderSlide(delta > 0 ? activeIndex - 1 : activeIndex + 1);
  });

  renderSlide(0);
  syncDotLabels();
  startAutoplay();

  window.addEventListener("languageChanged", () => {
    syncDotLabels();
    syncCurrentSlideAlt();
  });

  document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
      stopAutoplay();
      return;
    }

    startAutoplay();
  });

  window.addEventListener("pagehide", stopAutoplay, { once: true });
}

document.addEventListener("DOMContentLoaded", () => {
  initHeader();
  initHeroSlider();
  initMobileHeroBenefits();
  initMinervaCurriculumScrollHint();
  initSlider();
  initWhyQuotePlacement();
  initWhyAccents();
  initLearningAccent();
  initEntrepreneurProjectYearBlocks();
  renderGraduateLinkedInQuote();
  initLifeCollage();
  initLeadButtons();
  initAutoOpenBitrixFormFromUrl();
  initCommunitySlider();
  initInlineVideos();
  initVideoModal();
  initProjectTaskCards();
  initProjectTaskPartnerMarks();
  initProjectTaskVideoModal();
  initTestimonialCarousel();
  updateKordaMethodVideo(localStorage.getItem("siteLanguage") || "ru");

  restoreHashScroll();
  preloadCriticalImages();
});

window.addEventListener("languageChanged", (event) => {
  const language = event.detail?.language || "ru";
  updateKordaMethodVideo(language);
});
