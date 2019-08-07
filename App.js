import Main from "./src/Main";
import { UIManager } from "react-native";
if (!__DEV__) {
  global.console = {
    info: () => {},
    log: () => {},
    warn: () => {},
    debug: () => {},
    error: () => {}
  };
}
console.disableYellowBox = true;
UIManager.setLayoutAnimationEnabledExperimental &&
  UIManager.setLayoutAnimationEnabledExperimental(true);
export default Main;
