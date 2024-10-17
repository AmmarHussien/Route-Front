import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import enTranslation from "./locales/en/translation.json";
import arTranslation from "./locales/ar/translation.json";
import LanguageDetector from "i18next-browser-languagedetector";
import Backend from "i18next-http-backend"; // Optional, for loading translations

i18n
  .use(Backend)
  .use(LanguageDetector) // Add this line
  .use(initReactI18next) // Pass the i18n instance to react-i18next.
  .init({
    resources: {
      en: {
        translation: enTranslation,
      },
      ar: {
        translation: arTranslation,
      },
    },

    fallbackLng: "en", // Fallback language in case the current language translation is not available
    debug: true,
    detection: {
      order: ["localStorage", "cookie", "navigator"], // Define detection order
      caches: ["localStorage"], // Cache the language in localStorage
    },
    backend: {
      loadPathEn: "/locales/en/translation.json", // Path to your JSON file
      loadPathAr: "/locales/ar/translation.json", // Path to your JSON file
    },
    interpolation: {
      escapeValue: false, // React already escapes values
    },
    // Optional: Set right-to-left (RTL) support for Arabic
    react: {
      useSuspense: false,
    },
  });

export default i18n;
