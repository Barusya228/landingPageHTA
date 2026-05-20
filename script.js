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
    const forceCollapsed = window.innerWidth <= 1120;
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

  let currentIndex = Math.max(0, slides.findIndex((img) => img.classList.contains("is-active")));

  const showSlide = (index) => {
    slides.forEach((img, i) => {
      img.classList.toggle("is-active", i === index);
    });
  };

  slider.querySelector(".slider-prev")?.addEventListener("click", () => {
    currentIndex = (currentIndex - 1 + slides.length) % slides.length;
    showSlide(currentIndex);
  });

  slider.querySelector(".slider-next")?.addEventListener("click", () => {
    currentIndex = (currentIndex + 1) % slides.length;
    showSlide(currentIndex);
  });
}

function initHeroSlider() {
  const slides = Array.from(document.querySelectorAll(".hero-slide"));
  if (slides.length < 2) return;

  let currentIndex = Math.max(0, slides.findIndex((slide) => slide.classList.contains("is-active")));
  let isAnimating = false;

  slides.forEach((slide, index) => {
    if (index !== currentIndex) {
      slide.classList.remove("is-active", "is-exiting");
    }
  });

  const showNextSlide = () => {
    if (isAnimating) return;
    isAnimating = true;

    const currentSlide = slides[currentIndex];
    const nextIndex = (currentIndex + 1) % slides.length;
    const nextSlide = slides[nextIndex];

    nextSlide.classList.remove("is-exiting");

    window.requestAnimationFrame(() => {
      currentSlide.classList.add("is-exiting");
      nextSlide.classList.add("is-active");
    });

    window.setTimeout(() => {
      currentSlide.classList.add("is-reset");
      currentSlide.classList.remove("is-active", "is-exiting");
      void currentSlide.offsetWidth;
      currentSlide.classList.remove("is-reset");
      currentIndex = nextIndex;
      isAnimating = false;
    }, 920);
  };

  window.setInterval(showNextSlide, 5500);
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

function initEntrepreneurProjectCards() {
  const toggle = document.getElementById("entrepreneur-projects-toggle");
  const panel = document.getElementById("entrepreneur-projects-extra");
  const grid = document.getElementById("entrepreneur-projects-extra-grid");
  const tabs = Array.from(document.querySelectorAll(".entrepreneur-projects-extra__tab"));

  if (!(toggle instanceof HTMLButtonElement) || !(panel instanceof HTMLElement) || !(grid instanceof HTMLElement) || !tabs.length) {
    return;
  }

  const extraProjectTabs = {
    projects: [
      {
        partner: "UvU",
        task: "Создать план для UvU, чтобы запустить 1000 эко-шаттлов по городу за 3 года и завоевать рынок Алматы.",
        logo: "./logo/logo-uvu.png",
        links: [
          { label: "Видео 1", url: "#" },
          { label: "Видео 2", url: "#" },
        ],
      },
      {
        partner: "Almaty Air Initiative",
        task: "Разработать план новой организации, которая значительно улучшит качество воздуха в Алматы.",
        logo: "./logo/logo-Almaty-Ait-Initiative.png",
        links: [],
      },
      {
        partner: "Amiran",
        task: "Разработать стратегию для Amiran, чтобы выйти в прибыль за 9 месяцев, сохраняя верность миссии компании. Стратегия должна работать в рамках текущих возможностей компании.",
        logo: "./logo/logo-amiran.svg",
        links: [],
      },
    ],
    startups: [
      {
        title: "BARYTAN AI",
        partner: "Инициатива",
        task: "Ученики разработали технологию, которая автоматически преобразует разговор между врачом и пациентом в структурированную медицинскую запись, тем самым экономя время и облегчая процесс записи данных.",
        badge: "AI",
        links: [],
      },
      {
        title: "RayHeart",
        partner: "Инициатива",
        task: "Ученики разработали умный медицинский корсет с встроенными биосенсорами, который постоянно отслеживает показатели работы сердца, помогая предотвращать и заранее предупреждать о повторном сердечном приступе.",
        badge: "RH",
        links: [],
      },
      {
        title: "NEXTSTEP",
        partner: "Инициатива",
        task: "Ученики разработали двухнедельный интерактивный летний лагерь для подростков 15–18 лет, который в безопасной среде помогает им подготовиться к самостоятельной жизни, развивая практические навыки, связанные с реальными финансами и бытовыми задачами, через опыт и обучение.",
        badge: "NS",
        links: [],
      },
    ],
  };

  let showExtraProjects = false;
  let activeExtraTab = "projects";

  const renderLinks = (links) => {
    if (!links.length) {
      return `<span class="entrepreneur-projects-extra__status">Ссылка скоро</span>`;
    }

    return links
      .map((link) => {
        if (!link.url || link.url === "#") {
          return `<span class="entrepreneur-projects-extra__link entrepreneur-projects-extra__link--placeholder">${link.label}</span>`;
        }

        return `<a class="entrepreneur-projects-extra__link" href="${link.url}" target="_blank" rel="noopener noreferrer">${link.label}</a>`;
      })
      .join("");
  };

  const renderLogo = (item) => {
    if (item.logo) {
      const alt = item.partner || item.title || "Логотип";
      return `<img src="${item.logo}" alt="${alt}" loading="lazy" />`;
    }

    return `<span class="entrepreneur-projects-extra__card-logo-badge" aria-hidden="true">${item.badge || "LOGO"}</span>`;
  };

  const renderCards = () => {
    const items = extraProjectTabs[activeExtraTab] || [];

    grid.replaceChildren(
      ...items.map((item) => {
        const article = document.createElement("article");
        article.className = "entrepreneur-projects-extra__card";

        article.innerHTML = `
          ${item.title ? `<h3 class="entrepreneur-projects-extra__card-title">${item.title}</h3>` : `<p class="entrepreneur-projects-extra__card-partner">Партнер: ${item.partner}</p>`}
          ${item.title ? `<p class="entrepreneur-projects-extra__card-label">Партнер: ${item.partner}</p>` : ""}
          <p class="entrepreneur-projects-extra__card-label">Проектная задача:</p>
          <p class="entrepreneur-projects-extra__card-task">${item.task}</p>
          <div class="entrepreneur-projects-extra__card-logo">
            ${renderLogo(item)}
          </div>
          <div class="entrepreneur-projects-extra__links">
            ${renderLinks(item.links || [])}
          </div>
        `;

        return article;
      })
    );

    tabs.forEach((tab) => {
      const isActive = tab.dataset.extraTab === activeExtraTab;
      tab.classList.toggle("is-active", isActive);
      tab.setAttribute("aria-selected", String(isActive));
    });
  };

  const openPanel = () => {
    panel.hidden = false;
    requestAnimationFrame(() => {
      panel.classList.add("is-open");
    });
  };

  const closePanel = () => {
    panel.classList.remove("is-open");
    window.setTimeout(() => {
      if (!showExtraProjects) panel.hidden = true;
    }, 220);
  };

  toggle.addEventListener("click", () => {
    showExtraProjects = !showExtraProjects;
    toggle.textContent = showExtraProjects ? "Скрыть проекты" : "Показать больше проектов";
    toggle.setAttribute("aria-expanded", String(showExtraProjects));

    if (showExtraProjects) {
      renderCards();
      openPanel();
    } else {
      closePanel();
    }
  });

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      const nextTab = tab.dataset.extraTab;
      if (!nextTab || nextTab === activeExtraTab) return;
      activeExtraTab = nextTab;
      renderCards();
    });
  });
}

function initProjectTaskCards() {
  const container = document.getElementById("korda-project-tasks");
  if (!(container instanceof HTMLElement)) return;

  // Replace videoUrl values here when final vertical videos are ready.
  const projectTasks = [
    {
      label: "Проектная задача",
      title: "Права детей в Казахстане",
      description: "Разработать план по снижению насилия над детьми в Казахстане.",
      partner: 'волонтерская организация "Корган"',
      videoUrl: "./Видео/Снижение насилия над детьми.mp4",
    },
    {
      label: "Проектная задача",
      title: "Безопасность в горах Алматы",
      description: "Разработать план по значительному снижению несчастных случаев в горах Алматы.",
      partner: "Shymbulak Outdoor",
      videoUrl: "./Видео/Безопасность в горах Алматы.mp4",
    },
    {
      label: "Проектная задача",
      title: "Новый спортивный комплекс для HTA",
      description: "Разработать концепцию нового спортивного комплекса, который заменит существующее.",
      partner: "High Tech Academy",
      videoUrl: "./Видео/Новый спортивный зал.mp4",
    },
  ];

  container.replaceChildren(
    ...projectTasks.map((task, index) => {
      const article = document.createElement("article");
      article.className = "project-task-card";
      const partnerLogoMarkup =
        index === 2
          ? `<img class="project-task-card__partner-logo" src="./logo/HTA_SISU.webp" alt="${task.partner}" loading="lazy" />`
          : `<span class="project-task-card__partner-badge" aria-label="${task.partner}">${index === 0 ? "K" : "SO"}</span>`;
      article.innerHTML = `
        <h3>${task.title}</h3>
        <span class="project-task-card__label">${task.label}</span>
        <p class="project-task-card__description">${task.description}</p>
        <div class="project-task-card__footer">
          <p class="project-task-card__partner"><strong>Партнер:</strong> ${task.partner}</p>
          <button
            type="button"
            class="project-task-card__button project-task-video-button"
            data-video-title="${task.title}"
            data-video-src="${task.videoUrl}"
          >
            Смотреть видео
          </button>
        </div>
      `;
      return article;
    })
  );
}

function initProjectTaskPartnerMarks() {
  const cards = Array.from(document.querySelectorAll(".project-task-card"));
  if (!cards.length) return;

  const marks = [
    { type: "badge", text: "K" },
    { type: "badge", text: "SO" },
    { type: "image", src: "./logo/HTA_SISU.webp", alt: "High Tech Academy" },
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
  const triggers = Array.from(document.querySelectorAll(".project-task-video-button"));

  if (!(modal instanceof HTMLElement) || !(modalBody instanceof HTMLElement) || !(modalTitle instanceof HTMLElement) || !triggers.length) {
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

  triggers.forEach((trigger) => {
    trigger.addEventListener("click", () => {
      if (!(trigger instanceof HTMLElement)) return;
      openModal(trigger.dataset.videoTitle || "Видео", trigger.dataset.videoSrc || "");
    });
  });

  modal.querySelectorAll("[data-video-close]").forEach((control) => {
    control.addEventListener("click", closeModal);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && modal.classList.contains("is-open")) closeModal();
  });
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
  let autoplayId = 0;
  let touchStartX = 0;
  let touchEndX = 0;

  const dots = slides.map((_, index) => {
    const dot = document.createElement("button");
    dot.type = "button";
    dot.className = "testimonial-dot";
    dot.setAttribute("aria-label", `Показать отзыв ${index + 1}`);
    dot.addEventListener("click", () => showSlide(index));
    dotsContainer.appendChild(dot);
    return dot;
  });

  const showSlide = (index) => {
    currentIndex = (index + slides.length) % slides.length;
    slides.forEach((slide, slideIndex) => {
      slide.classList.toggle("is-active", slideIndex === currentIndex);
    });
    dots.forEach((dot, dotIndex) => {
      dot.classList.toggle("is-active", dotIndex === currentIndex);
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

  prevButton.addEventListener("click", showPrev);
  nextButton.addEventListener("click", showNext);

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
  startAutoplay();
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
      openModal(
        trigger.dataset.videoTitle || "Видео",
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
      iframe.title = trigger.dataset.inlineVideoTitle || "Видео";
      iframe.loading = "lazy";
      iframe.allow = "autoplay; encrypted-media; picture-in-picture; web-share";
      iframe.allowFullscreen = true;

      trigger.replaceChildren(iframe);
      trigger.classList.add("is-playing");
    });
  });
}

document.addEventListener("DOMContentLoaded", () => {
  initHeader();
  initHeroSlider();
  initSlider();
  initWhyQuotePlacement();
  initWhyAccents();
  initLearningAccent();
  initProjectTaskCards();
  initProjectTaskPartnerMarks();
  initEntrepreneurProjectCards();
  initLifeCollage();
  initLeadButtons();
  initInlineVideos();
  initVideoModal();
  initProjectTaskVideoModal();
  initTestimonialCarousel();
});
