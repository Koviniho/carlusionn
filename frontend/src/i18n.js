import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// Assuming you have these translation files
import en from "../public/locales/en/translation.json";
import de from "../public/locales/de/translation.json";
import fr from "../public/locales/fr/translation.json";
import it from "../public/locales/it/translation.json";
// import fr from "./locales/fr.json";

const preferredLanguage = localStorage.getItem("preferredLanguage") || "en";

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: en,
    },
    de: {
      translation: de,
    },
    fr: {
      translation: fr,
    },
    it: {
      translation: it,
    },
  },
  lng: preferredLanguage, // Set the language based on localStorage
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
