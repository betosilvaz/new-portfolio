import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import pt from './locales/pt.json';
import en from './locales/en.json';

i18n
    .use(LanguageDetector) // Detecta o idioma do navegador
    .use(initReactI18next) // Integra com o React
    .init({
        supportedLngs: ["pt", "en"],
        resources: {
            pt: { translation: pt },
            en: { translation: en }
        },
        fallbackLng: 'en', // Idioma padrão caso a detecção falhe
        interpolation: {
            escapeValue: false // React já protege contra XSS
        }
    });

export default i18n;