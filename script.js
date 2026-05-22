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
    }, 2000);
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
      article.className = "project-card project-task-card";
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
    { type: "badge", text: "Корган" },
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
          title: "Партнер: UvU",
          description: "Проектная задача: создать план для UvU, чтобы запустить 1000 эко-шаттлов по городу за 3 года и завоевать рынок Алматы",
          image: "./images/Курс по предпринимательству/UvU транспорт.jpg",
          logo: "./logo/logo-uvu.png",
          links: [
            { label: "Видео 1" },
            { label: "Видео 2" },
          ],
        },
        {
          title: "Партнер: Almaty Air Initiative",
          description: "Проектная задача: разработать план новой организации, которая значительно улучшить качество воздуха в Алматы",
          image: "./images/Курс по предпринимательству/AIR Solution.jpg",
          logo: "./logo/logo-Almaty-Ait-Initiative.png",
          linkLabel: "Ссылка скоро",
        },
        {
          title: "Партнер: Amiran",
          description: "Проектная задача: разработать стратегию для Amiran, чтобы выйти в прибыль за 9 месяцев, сохраняя верность миссии компании. Стратегия должна работать в рамках текущих возможностей компании",
          image: "./images/Курс по предпринимательству/Амиран 2.jpg",
          logo: "./logo/logo-amiran.svg",
          linkLabel: "Ссылка скоро",
        },
      ],
      startups: [
        {
          title: "BARYTAN AI",
          description: "Инициатива: ученики разработали технологию, которая автоматически преобразует разговор между врачом и пациентом в структурированную медицинскую запись, тем самым экономя время и облегчая процесс записи данных",
          image: "./images/Курс по предпринимательству/стартап 1.jpg",
          linkLabel: "Ссылка скоро",
        },
        {
          title: "RayHeart",
          description: "Инициатива: ученики разработали умный медицинский корсет с встроенными биосенсорами, который постоянно отслеживает показатели работы сердца, помогая предотвращать и заранее предупреждать о повторном сердечном приступе",
          image: "./images/Курс по предпринимательству/DSC07286.jpg.jpeg",
          linkLabel: "Ссылка скоро",
        },
        {
          title: "NEXTSTEP",
          description: "Инициатива: ученики разработали двухнедельный интерактивный летний лагерь для подростков 15–18 лет, который в безопасной среде помогает им подготовиться к самостоятельной жизни, развивая практические навыки, связанные с реальными финансами и бытовыми задачами, через опыт и обучение",
          image: "./images/Курс по предпринимательству/UvU 3.jpg",
          linkLabel: "Ссылка скоро",
        },
      ],
    },
    "2024-2025": {
      projects: [
      {
          title: "Партнер: Platform A",
          description: "Проектная задача: разработать план по завоеванию рынка Алматы и Казахстана для Platforma Market",
          image: "./images/Курс по предпринимательству/проекты 2025-2026.webp",
          logo: "./logo/logo-PlatformA.webp",
          linkLabel: "Ссылка скоро",
        },
        {
          title: "Партнер: KazBeef",
          description: "Проектная задача: разработать план по созданию новой организации, которая решит проблему опустынивания в Казахстане. Обосновать предложение комплексным анализом существующих и возможных решений этой проблемы",
          image: "./images/Курс по предпринимательству/Air Solutin.jpg",
          logo: "./logo/logo-kazbeef.jpg",
          linkLabel: "Ссылка скоро",
        },
        {
          title: "Партнер: Shin-Line",
          description: "Проектная задача: создать стратегию для продукта “Шин-Лайн”, чтобы стать лидером рынка на постсоветском пространстве",
          image: "./images/Курс по предпринимательству/проекты 2023-2024.webp",
          logo: "./logo/logo-shinlain.png",
          linkLabel: "Ссылка скоро",
        },
      ],
      startups: [
        {
          title: "Silver Pear",
          description: "Инициатива: ученики решили проблему пищевых отходов, перерабатывая их в компост и корм для животных, снижая вред для окружающей среды и поддерживая устойчивое сельское хозяйство. Продукт был успешно протестирован в ЖК Dostyk Residence",
          image: "./images/Курс по предпринимательству/стартап 1.jpg",
          linkLabel: "Ссылка скоро",
        },
        {
          title: "TAN",
          description: "Инициатива: ученики создали бренд кофейных напитков с концепцией «сам себе бариста», позволяющий пользователям создавать собственные напитки благодаря уникальному трехъярусному дизайну",
          image: "./images/Курс по предпринимательству/DSC07286.jpg.jpeg",
          linkLabel: "Ссылка скоро",
        },
        {
          title: "PET X",
          description: "Инициатива: ученики решали проблему переработки пластиковых бутылок, разработав машину для их превращения в филамент для 3D-принтеров",
          image: "./images/Курс по предпринимательству/UvU 3.jpg",
          linkLabel: "Ссылка скоро",
        },
      ],
    },
    "2023-2024": {
      projects: [
        {
          title: "Партнер: Arbuz",
          description: "Проектная задача: разработать стратегию масштабирования компании Arbuz",
          image: "./images/Курс по предпринимательству/проекты 2023-2024.webp",
          logo: "./logo/logo-arbuz.png",
          linkLabel: "Ссылка скоро",
        },
        {
          title: "Партнер: Compass",
          description: "Проектная задача: разработать технико-экономическое обоснование по одному из направлений развития компании Compass",
          image: "./images/Курс по предпринимательству/DSC07286.jpg.jpeg",
          logo: "./logo/logo-compass.jpg",
          linkLabel: "Ссылка скоро",
        },
      ],
      startups: [
        {
          title: "POMOGI PRIUTU.KZ",
          description: "Инициатива: ученики решили проблему отсутствия финансирования приютов для животных, разработав приложение, в котором можно выбрать питомца, заботиться о нем и поддерживать его донатами",
          image: "./images/Курс по предпринимательству/стартап 1.jpg",
          linkLabel: "Ссылка скоро",
        },
        {
          title: "Food Saving",
          description: "Инициатива: ученики решили проблему пищевых отходов и финансовых потерь у ресторанов и магазинов, предлагая платформу с акционными продуктами, доступными для студентов",
          image: "./images/Курс по предпринимательству/UvU 3.jpg",
          linkLabel: "Ссылка скоро",
        },
        {
          title: "Aina",
          description: "Инициатива: ученики решили проблему оттока творческой молодежи из Казахстана, предлагая инициативу, которая усиливает интерес к современному искусству и повышает осведомленность о нем внутри страны",
          image: "./images/Курс по предпринимательству/DSC07286.jpg.jpeg",
          linkLabel: "Ссылка скоро",
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

  const getShortTitle = (item) => item.title.replace(/^Партнер:\s*/i, "");
  const getShortDescription = (item) => item.description.replace(/^(Проектная задача|Инициатива):\s*/i, "");
  const getInitials = (value) =>
    value
      .split(/\s+/)
      .filter(Boolean)
      .slice(0, 2)
      .map((part) => part[0])
      .join("")
      .toUpperCase();

  const renderLink = (item) => {
    if (Array.isArray(item.links) && item.links.length) {
      return item.links
        .map((link) => {
          if (!link.url) {
            return `<span class="entrepreneur-projects-extra__link entrepreneur-projects-extra__link--placeholder">${escapeHtml(link.label)}</span>`;
          }

          return `<a class="entrepreneur-projects-extra__link" href="${escapeHtml(link.url)}" target="_blank" rel="noopener noreferrer">${escapeHtml(link.label)}</a>`;
        })
        .join("");
    }

    if (!item.linkUrl) {
      return `<span class="entrepreneur-projects-extra__link entrepreneur-projects-extra__link--placeholder">${escapeHtml(item.linkLabel || "Ссылка скоро")}</span>`;
    }

    return `<a class="entrepreneur-projects-extra__link" href="${escapeHtml(item.linkUrl)}" target="_blank" rel="noopener noreferrer">${escapeHtml(item.linkLabel || "Подробнее")}</a>`;
  };

  const renderLogo = (item) => {
    if (item.logo) {
      return `<span class="entrepreneur-projects-extra__logo"><img src="${escapeHtml(item.logo)}" alt="${escapeHtml(getShortTitle(item))}" loading="lazy" /></span>`;
    }

    return `<span class="entrepreneur-projects-extra__logo entrepreneur-projects-extra__logo--text">${escapeHtml(getInitials(getShortTitle(item)))}</span>`;
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
    title.textContent = activeYear.replace("-", "–");

    if (!currentItems.length) {
      const empty = document.createElement("p");
      empty.className = "entrepreneur-projects-extra__empty";
      empty.textContent = "Информация скоро будет добавлена";
      grid.replaceChildren(empty);
      syncTabs();
      return;
    }

    if (activeItemIndex >= currentItems.length) activeItemIndex = 0;

    const activeItem = currentItems[activeItemIndex] || currentItems[0];
    const nav = document.createElement("div");
    nav.className = "entrepreneur-projects-extra__nav";
    nav.setAttribute("aria-label", "Список проектов");

    currentItems.forEach((item, index) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "entrepreneur-projects-extra__nav-card";
      button.classList.toggle("is-active", index === activeItemIndex);
      button.setAttribute("aria-pressed", String(index === activeItemIndex));
      button.dataset.itemIndex = String(index);
      button.innerHTML = `
        ${renderLogo(item)}
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
        ${renderLogo(activeItem)}
        <div class="entrepreneur-projects-extra__spotlight-copy">
          <h4 class="entrepreneur-projects-extra__spotlight-title">${escapeHtml(activeItem.title)}</h4>
          <p class="entrepreneur-projects-extra__spotlight-text">${escapeHtml(activeItem.description)}</p>
          <div class="entrepreneur-projects-extra__links">
            ${renderLink(activeItem)}
          </div>
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
    dot.setAttribute("aria-label", `Показать отзыв ${index + 1}`);
    dot.addEventListener("click", () => showSlide(index));
    dotsContainer.append(dot);
    return dot;
  });

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

/* function initCommunitySlider() {
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

  const communitySlides = [
    {
      src: "./images/Портрет выпускника/1.png",
      alt: "Мечтатель"
    },
    {
      src: "./images/Портрет выпускника/2.png",
      alt: "Критические мыслители"
    },
    {
      src: "./images/Портрет выпускника/3.png",
      alt: "Обучается на протяжении всей жизни"
    }
    {
      src: "./images/Портрет выпускника/4.png",
      alt: "Умеет сотрудничать"
    }
    {
      src: "./images/Портрет выпускника/5.png",
      alt: "Гражданин мира"
    }
    {
      src: "./images/Портрет выпускника/6.png",
      alt: "Решающий проблемы"
    }
    {
      src: "./images/Портрет выпускника/7.png",
      alt: "Искусный собеседник"
    }
    {
      src: "./images/Портрет выпускника/8.png",
      alt: "Эмоционально компетентный"
    }
  ];

  let activeIndex = 0;
  let touchStartX = 0;
  let touchCurrentX = 0;

  const dots = communitySlides.map((slide, index) => {
    const dot = document.createElement("button");
    dot.type = "button";
    dot.className = "community-slider__dot";
    dot.setAttribute("aria-label", `Открыть слайд ${index + 1}`);
    dot.addEventListener("click", () => renderSlide(index));
    dotsHost.append(dot);
    return dot;
  });

  const renderSlide = (nextIndex) => {
    activeIndex = (nextIndex + communitySlides.length) % communitySlides.length;
    const slide = communitySlides[activeIndex];

    image.classList.add("is-fading");
    window.setTimeout(() => {
      image.src = slide.src;
      image.alt = slide.alt;
      image.classList.remove("is-fading");
    }, 140);

    dots.forEach((dot, index) => {
      dot.classList.toggle("is-active", index === activeIndex);
      dot.setAttribute("aria-current", index === activeIndex ? "true" : "false");
    });
  };

  prevButton.addEventListener("click", () => renderSlide(activeIndex - 1));
  nextButton.addEventListener("click", () => renderSlide(activeIndex + 1));

  slider.addEventListener("touchstart", (event) => {
    touchStartX = event.changedTouches[0]?.clientX || 0;
    touchCurrentX = touchStartX;
  }, { passive: true });

  slider.addEventListener("touchmove", (event) => {
    touchCurrentX = event.changedTouches[0]?.clientX || touchCurrentX;
  }, { passive: true });

  slider.addEventListener("touchend", () => {
    const delta = touchCurrentX - touchStartX;
    if (Math.abs(delta) < 36) return;
    renderSlide(delta > 0 ? activeIndex - 1 : activeIndex + 1);
  });

  renderSlide(0);
} */

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

  const communitySlides = [
    { src: "./images/Портрет выпускника/1.png", alt: "Портрет выпускника HTA — мечтатель" },
    { src: "./images/Портрет выпускника/2.png", alt: "Портрет выпускника HTA — критически мыслящий" },
    { src: "./images/Портрет выпускника/3.png", alt: "Портрет выпускника HTA — обучающийся на протяжении всей жизни" },
    { src: "./images/Портрет выпускника/4.png", alt: "Портрет выпускника HTA — умеет сотрудничать" },
    { src: "./images/Портрет выпускника/5.png", alt: "Портрет выпускника HTA — гражданин мира" },
    { src: "./images/Портрет выпускника/6.png", alt: "Портрет выпускника HTA — решающий проблемы" },
    { src: "./images/Портрет выпускника/7.png", alt: "Портрет выпускника HTA — искусный собеседник" },
    { src: "./images/Портрет выпускника/8.png", alt: "Портрет выпускника HTA — эмоционально-компетентный" }
  ];

  let activeIndex = 0;
  let touchStartX = 0;
  let touchCurrentX = 0;

  dotsHost.replaceChildren();

  const dots = communitySlides.map((_, index) => {
    const dot = document.createElement("button");
    dot.type = "button";
    dot.className = "community-slider__dot";
    dot.setAttribute("aria-label", `Открыть слайд ${index + 1}`);
    dot.addEventListener("click", () => renderSlide(index));
    dotsHost.append(dot);
    return dot;
  });

  const renderSlide = (nextIndex) => {
    activeIndex = (nextIndex + communitySlides.length) % communitySlides.length;
    const slide = communitySlides[activeIndex];

    image.classList.add("is-fading");
    window.setTimeout(() => {
      image.src = slide.src;
      image.alt = slide.alt;
      image.classList.remove("is-fading");
    }, 140);

    dots.forEach((dot, index) => {
      dot.classList.toggle("is-active", index === activeIndex);
      dot.setAttribute("aria-current", index === activeIndex ? "true" : "false");
    });
  };

  prevButton.addEventListener("click", () => renderSlide(activeIndex - 1));
  nextButton.addEventListener("click", () => renderSlide(activeIndex + 1));

  slider.addEventListener("touchstart", (event) => {
    touchStartX = event.changedTouches[0]?.clientX || 0;
    touchCurrentX = touchStartX;
  }, { passive: true });

  slider.addEventListener("touchmove", (event) => {
    touchCurrentX = event.changedTouches[0]?.clientX || touchCurrentX;
  }, { passive: true });

  slider.addEventListener("touchend", () => {
    const delta = touchCurrentX - touchStartX;
    if (Math.abs(delta) < 36) return;
    renderSlide(delta > 0 ? activeIndex - 1 : activeIndex + 1);
  });

  renderSlide(0);
}

document.addEventListener("DOMContentLoaded", () => {
  initHeader();
  initHeroSlider();
  initSlider();
  initWhyQuotePlacement();
  initWhyAccents();
  initLearningAccent();
  initEntrepreneurProjectYearBlocks();
  initLifeCollage();
  initLeadButtons();
  initCommunitySlider();
  initInlineVideos();
  initVideoModal();
  initProjectTaskCards();
  initProjectTaskPartnerMarks();
  initProjectTaskVideoModal();
  initTestimonialCarousel();
});
