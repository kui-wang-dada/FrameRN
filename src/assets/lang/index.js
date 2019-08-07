/** @format */

import I18n from "react-native-i18n";
import { getStorage } from "@/utils";
import enLocale from "./en";
import zhLocale from "./zh";

const messages = {
  zh: {
    ...zhLocale
  },
  en: {
    ...enLocale
  }
};

I18n.fallbacks = true;
I18n.translations = messages;
getStorage("language").then(res => {
  if (res) {
    I18n.locale = res;
  }
});
export default I18n;
