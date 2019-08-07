import $api from "@/plugins/api";
import { doAction } from "./index";

export const HOME_DATA = "HOME_DATA";

export const NEW_DETAIL_DATA = "NEW_DETAIL_DATA";

export const getHomeData = params =>
  doAction(params, "user/userInfo", "HOME_DATA", "homeData");

export const getNewDetailData = (params, url) =>
  doAction(
    params,
    "home/newsDetail",
    "NEW_DETAIL_DATA",
    "newDetailData",
    null,
    url
  );
