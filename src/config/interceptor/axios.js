/** @format */

import axios from "axios";
import uuid from "uuid";
import { CONSOLE_REQUEST_ENABLE, CONSOLE_RESPONSE_ENABLE } from "../index";
import store from "@/store/store";
// import AsyncStorage from "@react-native-community/async-storage";
import { getStorage, setStorage, removeStorage, modal } from "@/utils";
// import { Navigation } from "@/router";
const CancelToken = axios.CancelToken;
let CancelPromise = {};

/**
 * 请求成功拦截器
 * @param req 请求参数
 * @returns {*}
 */
export async function requestSuccessFunc(req) {
  let session_id;
  let res = await getStorage("session_id");

  if (!res) {
    session_id = uuid.v1();
    setStorage("session_id", session_id);
  } else {
    session_id = res;
  }

  req.headers["X-APIS-SID"] = session_id;
  req.headers["X-APIS-Version"] = "v2";
  req.headers["X-APIS-Application"] = "usercenter";
  //取消重复请求

  if (CancelPromise[req.url]) {
    CancelPromise[req.url]();
  }

  req.cancelToken = new CancelToken(c => {
    CancelPromise[req.url] = c;
  });

  CONSOLE_REQUEST_ENABLE &&
    console.info("requestInterceptorFunc", `url:${req.url}`, req);
  // 自定义请求拦截逻辑，处理权限，请求发送监控等
  return req;
}

/**
 * 请求失败拦截器
 * @param reqError 失败信息
 * @returns {Promise.<*>}
 */
export function requestFailFunc(reqError) {
  // 自定义请求失败逻辑，处理断网，请求发送监控等
  return Promise.reject(reqError);
}

/**
 * 响应成功拦截器
 * @param res 返回数据
 * @returns {*}
 */
export function responseSuccessFunc(response) {
  // 自定义响应成功逻辑，全局拦截接口，根据不同业务做不同处理，响应成功监控等
  CONSOLE_RESPONSE_ENABLE && console.info("responseInterceptorFunc", response);
  if (response && response.data) {
    let status = response.data.status;
    if (status.code !== 200 && status.code !== 401) {
      modal.showToast(response.data.status.message);
    }
    if (status.code === 401) {
      modal.showToast(response.data.status.message);

      setStorage("loginEmail", null);
    }

    return response.data;
  } else {
    // 异常处理
    console.log("warning", response.data.msg);
    return Promise.reject(
      "error：" + (response && response.data && response.data.msg)
    );
  }
}

/**
 * 响应失败拦截器
 * @param resError 失败信息
 * @returns {Promise.<*>}
 */
export function responseFailFunc(resError) {
  //如果是取消，返回空，前端不提示消息
  if (resError.toString() == "Cancel") {
    resError = "";
  }

  console.log("fail", resError.response);
  let res = resError.response.data.app_response;
  if (res && res.auth === 1) {
    modal.showToast("登录失效，请重新登录", () => {
      removeStorage("loginEmail");
      removeStorage("session_id");
      store.dispatch({ type: "LOGIN_EMAIL", payload: { loginEmail: "" } });
      store.dispatch({ type: "USER_INFO", payload: { userInfo: {} } });
      // Navigation.goBack();
      return Promise.reject(resError);
    });
  } else {
    modal.showToast(resError.message);
    return Promise.reject(resError);
  }
}
