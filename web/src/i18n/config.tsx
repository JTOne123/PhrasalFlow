import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';

export const supportedLngs = {
  uk: "Українською",
  ru: "По-русски",
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'ru',
    resources: {
      ru: {
        translation: {
          greeting: 'привет',
          greeting2: '222',
        },
      },
      uk: {
        translation: {
          greeting: 'привіт',
          greeting2: '2223',
        },
      },
    },
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;