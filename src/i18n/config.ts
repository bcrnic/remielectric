import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import sr from './locales/sr.json';
import en from './locales/en.json';
import ru from './locales/ru.json';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      sr: { translation: sr },
      en: { translation: en },
      ru: { translation: ru },
    },
    lng: 'sr', // default language
    fallbackLng: 'sr',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
