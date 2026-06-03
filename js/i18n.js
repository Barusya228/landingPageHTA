const DEFAULT_LANGUAGE = "ru";
const SUPPORTED_LANGUAGES = ["ru", "en", "kk"];
const LANGUAGE_STORAGE_KEY = "siteLanguage";
const LOCALE_VERSION = "20260602-1";

let isLanguageSwitcherInitialized = false;

function getTranslationValue(translations, key) {
  if (!translations || !key) return null;

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
  if (!(element instanceof HTMLElement) || typeof value !== "string") return;

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
      console.warn("i18n: the site is opened through file://. Use a local server or GitHub Pages.");
    }

    const response = await fetch(
      `./locales/${safeLanguage}.json?v=${LOCALE_VERSION}`,
      {
        cache: "no-cache",
      }
    );

    if (!response.ok) {
      throw new Error(
        `Cannot load translation file: ${safeLanguage}. Status: ${response.status}`
      );
    }

    const translations = await response.json();

    window.currentTranslations = translations;
    window.currentLanguage = safeLanguage;
    window.t = t;

    const elements = document.querySelectorAll("[data-i18n]");

    console.log("i18n: selected language:", safeLanguage);
    console.log("i18n: translatable elements:", elements.length);

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
      if (!(button instanceof HTMLElement)) return;

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
    console.error("i18n: Translation loading error:", error);
  }
}

function initLanguageSwitcher() {
  if (isLanguageSwitcherInitialized) return;

  const buttons = document.querySelectorAll("[data-lang]");

  console.log("i18n: script loaded");
  console.log("i18n: language buttons:", buttons.length);
  console.log("i18n: document readyState:", document.readyState);

  if (!buttons.length) {
    console.warn("i18n: language buttons with data-lang were not found.");
    return;
  }

  isLanguageSwitcherInitialized = true;

  buttons.forEach((button) => {
    if (!(button instanceof HTMLElement)) return;

    button.addEventListener("click", () => {
      const language = button.getAttribute("data-lang");

      console.log("i18n: language button clicked:", language);

      if (!language) return;

      loadTranslations(language);
    });
  });

  const savedLanguage =
    localStorage.getItem(LANGUAGE_STORAGE_KEY) || DEFAULT_LANGUAGE;

  loadTranslations(savedLanguage);
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initLanguageSwitcher);
} else {
  initLanguageSwitcher();
}

window.loadTranslations = loadTranslations;
window.t = t;

