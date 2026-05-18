function initHeader() {
  const toggle = document.querySelector(".nav-toggle");
  const navList = document.getElementById("nav-list");
  if (!(toggle instanceof HTMLButtonElement) || !(navList instanceof HTMLElement)) return;

  const closeMenu = () => {
    navList.classList.remove("is-open");
    toggle.classList.remove("is-open");
    toggle.setAttribute("aria-expanded", "false");
    document.body.classList.remove("nav-open");
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

  window.addEventListener("resize", () => {
    if (window.innerWidth > 760) closeMenu();
  });
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

function loadB24Form() {
  if (b24LoaderPromise) return b24LoaderPromise;

  b24LoaderPromise = new Promise((resolve, reject) => {
    const existingScript = document.querySelector('script[src*="/crm/form/loader_32.js"]');
    if (existingScript) {
      setTimeout(resolve, 300);
      return;
    }

    const script = document.createElement("script");
    script.async = true;
    script.src = `https://cdn-ru.bitrix24.kz/b18109524/crm/form/loader_32.js?${Math.floor(Date.now() / 180000)}`;
    script.dataset.b24Form = "click/32/3816ef";
    script.dataset.skipMoving = "true";
    script.onload = resolve;
    script.onerror = reject;
    document.head.appendChild(script);
  });

  return b24LoaderPromise;
}

function initLeadButtons() {
  const buttons = document.querySelectorAll(".b24-web-form-popup-btn-32");
  buttons.forEach((button) => {
    button.addEventListener("click", async (event) => {
      if (openB24Form()) {
        event.preventDefault();
        return;
      }

      try {
        await loadB24Form();

        if (openB24Form()) {
          event.preventDefault();
          return;
        }

        // If the widget initializes with a small delay, try opening it once more.
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

document.addEventListener("DOMContentLoaded", () => {
  initHeader();
  initSlider();
  initLeadButtons();
  initVideoModal();
});
