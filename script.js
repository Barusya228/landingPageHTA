function initHeader() {
  const header = document.querySelector(".site-header");
  const headerInner = document.querySelector(".header-inner");
  const brand = document.querySelector(".brand");
  const socialLinks = document.querySelector(".header-social-links");
  const toggle = document.querySelector(".nav-toggle");
  const navList = document.getElementById("nav-list");
  if (
    !(header instanceof HTMLElement) ||
    !(headerInner instanceof HTMLElement) ||
    !(brand instanceof HTMLElement) ||
    !(socialLinks instanceof HTMLElement) ||
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
      const socialRect = socialLinks.getBoundingClientRect();
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
    { match: "безнадежно", replacement: '<span class="why-accent">безнадежно</span>' },
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
  const kordaSection = document.querySelector(".section-korda");
  const entrepreneurGrid = document.querySelector(".section-entrepreneur .entrepreneur-grid");
  if (!(kordaSection instanceof HTMLElement) || !(entrepreneurGrid instanceof HTMLElement)) return;

  const projectGrid = kordaSection.querySelector(".project-grid");
  const instagramLine = kordaSection.querySelector(".instagram-line");

  if (projectGrid instanceof HTMLElement) {
    entrepreneurGrid.appendChild(projectGrid);
  }

  if (instagramLine instanceof HTMLElement) {
    entrepreneurGrid.appendChild(instagramLine);
  }

  const strayProjectGrids = Array.from(document.querySelectorAll("main > .project-grid"));
  strayProjectGrids.forEach((grid) => grid.remove());

  const strayInstagramLines = Array.from(document.querySelectorAll("main > .instagram-line"));
  strayInstagramLines.forEach((line) => line.remove());
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
  initEntrepreneurProjectCards();
  initLifeCollage();
  initLeadButtons();
  initInlineVideos();
  initVideoModal();
});
