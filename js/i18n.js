const DEFAULT_LANGUAGE = "ru";
const SUPPORTED_LANGUAGES = ["ru", "en", "kk"];
const LANGUAGE_STORAGE_KEY = "siteLanguage";

function getTranslationValue(translations, key) {
  if (Object.prototype.hasOwnProperty.call(translations, key)) {
    return translations[key];
  }

  return key.split(".").reduce((value, part) => {
    if (value && Object.prototype.hasOwnProperty.call(value, part)) {
      return value[part];
    }

    return null;
  }, translations);
}

function setElementTranslation(element, value) {
  if (!(element instanceof HTMLElement) || typeof value !== "string") {
    return;
  }

  const attr = element.getAttribute("data-i18n-attr");
  if (attr) {
    element.setAttribute(attr, value);
    return;
  }

  element.textContent = value;
}

function t(key, fallback = "") {
  if (!window.currentTranslations) return fallback;
  const value = getTranslationValue(window.currentTranslations, key);
  return typeof value === "string" ? value : fallback;
}

async function loadTranslations(language) {
  const safeLanguage = SUPPORTED_LANGUAGES.includes(language)
    ? language
    : DEFAULT_LANGUAGE;

  try {
    if (window.location.protocol === "file:") {
      console.warn(
        "i18n: translations cannot be loaded from file://. Open the site through a local server or GitHub Pages."
      );
    }

    const response = await fetch(`./locales/${safeLanguage}.json`, {
      cache: "no-cache",
    });

    if (!response.ok) {
      throw new Error(
        `Cannot load translation file: ${safeLanguage}. Status: ${response.status}`
      );
    }

    const translations = await response.json();
    const elements = document.querySelectorAll("[data-i18n]");

    window.currentTranslations = translations;
    window.currentLanguage = safeLanguage;
    window.t = t;

    if (!elements.length) {
      console.warn("i18n: no elements with data-i18n were found.");
    }

    elements.forEach((element) => {
      const key = element.getAttribute("data-i18n");
      if (!key) return;

      const value = getTranslationValue(translations, key);
      if (typeof value === "string") {
        setElementTranslation(element, value);
      } else {
        console.warn(`i18n: translation key not found: ${key}`);
      }
    });

    document.documentElement.lang = safeLanguage;
    localStorage.setItem(LANGUAGE_STORAGE_KEY, safeLanguage);

    document.querySelectorAll("[data-lang]").forEach((button) => {
      if (!(button instanceof HTMLButtonElement)) return;
      button.classList.toggle(
        "is-active",
        button.getAttribute("data-lang") === safeLanguage
      );
    });

    window.dispatchEvent(
      new CustomEvent("languageChanged", {
        detail: {
          language: safeLanguage,
          translations,
        },
      })
    );

    console.log(`i18n: language switched to ${safeLanguage}`);
  } catch (error) {
    console.error("Translation loading error:", error);
  }
}

function initLanguageSwitcher() {
  const buttons = document.querySelectorAll("[data-lang]");

  if (!buttons.length) {
    console.warn("i18n: language buttons with data-lang were not found.");
    return;
  }

  buttons.forEach((button) => {
    if (!(button instanceof HTMLButtonElement)) return;

    button.addEventListener("click", () => {
      const language = button.getAttribute("data-lang");
      if (!language) return;
      loadTranslations(language);
    });
  });

  const savedLanguage =
    localStorage.getItem(LANGUAGE_STORAGE_KEY) || DEFAULT_LANGUAGE;
  loadTranslations(savedLanguage);
}

document.addEventListener("DOMContentLoaded", () => {
  initLanguageSwitcher();
});

window.loadTranslations = loadTranslations;
window.t = t;
