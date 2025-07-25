import { createI18n } from "vue-i18n";
import enMessages from "../localization/en.json";
import laMessages from "../localization/la.json";
import thMessages from "../localization/th.json";

const locale = localStorage.getItem("locale") || "la";

const i18n = createI18n({
  legacy: false,
  locale: locale, 
  fallbackLocale: "en",
  messages: {
    en: enMessages,
    la: laMessages,
    th: thMessages,
  },
});

export default i18n;
