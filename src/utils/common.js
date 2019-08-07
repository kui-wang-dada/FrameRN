import {
  Dimensions,
  View,
  Platform,
  PixelRatio,
  StyleSheet,
  AsyncStorage,
  ActivityIndicator
} from "react-native";
import React, { Component } from "react";
import modal from "./modal";
import { AXIOS_DEFAULT_CONFIG } from "@/config";

import ImageViewer from "react-native-image-zoom-viewer";

const DESIGN_WIDTH = 750;
export const SCREEN_WIDTH = Dimensions.get("window").width;
export const SCREEN_HEIGHT = Dimensions.get("window").height;
// ---function---
export function transformSize(designSize) {
  const number = (designSize / DESIGN_WIDTH) * SCREEN_WIDTH;

  let remainder = number % 1;
  const int = number - remainder;
  // 防止非标准Android屏，不做处理
  if (
    Platform.OS === "android" &&
    parseInt(PixelRatio.get()) !== PixelRatio.get()
  ) {
  } else {
    remainder =
      0.25 <= remainder && remainder < 0.75 ? 0.5 : Math.round(remainder);
  }
  return int + remainder;
}

/**
 * 默认图片，用于拼接图片地址&填充默认图片
 * @data {string} 图片地址
 * @isPic {boolean} 是否是图片模式，默认为头像模式
 */
export function checkImg(data) {
  if (data) {
    if (data.indexOf("http") > -1) {
      return data;
    } else {
      //   let base = AXIOS_DEFAULT_CONFIG.baseURL.replace(/\/apis/, "");
      //   let base = "https://erp.wholerengroup.com";
      let base = AXIOS_DEFAULT_CONFIG.baseURL.replace(/\/apis/, "");
      return base + data;
    }
  }
}

export async function checkReport(url) {
  let base = AXIOS_DEFAULT_CONFIG.baseURL.replace(/\/apis/, "");
  let params = "";
  let res = await getStorage("session_id");

  if (res) {
    params = `sid=${res}`;
    if (url.indexOf("?") > -1) {
      return base + url + "&" + params;
    }
    return base + url + "?" + params;
  }
}

export async function openReport(url, navigation, title) {
  let isPdf = url.indexOf(".pdf") > -1 || url.indexOf(".doc") > -1;
  let route = "webView";
  if (Platform.OS === "android") {
    route = "pdf";
  }
  if (isPdf) {
    navigation.navigate(route, { url: await checkReport(url), title });
  } else {
    let imgUrl = [
      {
        url: checkImg(url)
      }
    ];

    let Components = (
      <View style={{ width: SCREEN_WIDTH, height: SCREEN_HEIGHT }}>
        <ImageViewer
          imageUrls={imgUrl}
          enableImageZoom
          saveToLocalByLongPress={false}
          onClick={() => modal.close()}
          loadingRender={() => (
            <ActivityIndicator animating={true} size="large" color="#fff" />
          )}
        />
      </View>
    );
    modal.show(Components, "center");
  }
}

export async function openManyImg(urlArray, initIndex) {
  let imgUrl = urlArray.map(item => {
    return {
      url: checkImg(item)
    };
  });

  let Components = (
    <View style={{ width: SCREEN_WIDTH, height: SCREEN_HEIGHT }}>
      <ImageViewer
        imageUrls={imgUrl}
        enableImageZoom
        saveToLocalByLongPress={false}
        onClick={() => modal.close()}
        loadingRender={() => (
          <ActivityIndicator animating={true} size="large" color="#fff" />
        )}
        index={initIndex}
      />
    </View>
  );
  modal.show(Components, "center");
}

export async function getStorage(key) {
  return await AsyncStorage.getItem(key);
}
export async function setStorage(key, value) {
  await AsyncStorage.setItem(key, value);
}
export async function removeStorage(key) {
  await AsyncStorage.removeItem(key);
}
