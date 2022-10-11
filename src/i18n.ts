import Vue from "vue";
import VueI18n from "vue-i18n";
import { en } from "./locales/en";
import { tr } from "./locales/tr";

Vue.use(VueI18n);

export default new VueI18n({
  locale: localStorage.getItem("language") || "en",
  fallbackLocale: localStorage.getItem("language") || "en",
  messages: { en, tr },
});
