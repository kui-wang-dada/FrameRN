import React, { Component } from "react";
import {
  AppState,
  DeviceEventEmitter,
  PushNotificationIOS
} from "react-native";

import DeviceInfo from "react-native-device-info";
import PushNotification from "react-native-push-notification";
import AppNavigator from "./router";
import { getStorage } from "@/utils";

import store from "@/store/store";
import { getUserInfo } from "@/store/actions/user";
import { connect } from "react-redux";
import lang from "@/assets/lang";
import NotifService from "./NotifService";
import appConfig from "../app.json";
import $api from "@/plugins/api";
const mapStateToProps = state => {
  return {
    loginEmail: state.user.loginEmail,
    userInfo: state.user.userInfo
  };
};

const mapDispatchToProps = {
  getUserInfo
};
class WRoot extends Component {
  constructor(props) {
    super(props);
    this.state = {
      refresh: true,
      tabLabel: {
        home: lang.t("common.foot.home"),
        service: lang.t("common.foot.service"),
        my: lang.t("common.foot.my")
      },
      appState: AppState.currentState,
      senderId: appConfig.senderID
    };
  }
  render() {
    let { refresh, tabLabel } = this.state;
    return (
      <AppNavigator
        onNavigationStateChange={this.onNavigationStateChange}
        screenProps={{ refresh, tabLabel }}
      />
    );
  }
  componentDidMount = async () => {
    let loginEmail = await getStorage("loginEmail");
    this.setState({
      refresh: !this.state.refresh,
      tabLabel: {
        home: lang.t("common.foot.home"),
        service: lang.t("common.foot.service"),
        my: lang.t("common.foot.my")
      }
    });

    DeviceEventEmitter.addListener("Reload", () => {
      this.setState({
        refresh: !this.state.refresh,
        tabLabel: {
          home: lang.t("common.foot.home"),
          service: lang.t("common.foot.service"),
          my: lang.t("common.foot.my")
        }
      });
    });

    this.notif = new NotifService(
      this.onRegister.bind(this),
      this.onNotif.bind(this),
      appConfig.senderId
    );

    this._clearMessage();
    AppState.addEventListener("change", this._handleAppStateChange);
  };
  componentWillUnmount() {
    AppState.removeEventListener("change", this._handleAppStateChange);
  }

  onNavigationStateChange = (prevState, currentState) => {
    const currentScreen = getActiveRouteName(currentState);
    const prevScreen = getActiveRouteName(prevState);
    // DeviceEventEmitter.emit("onNavigationStateChange", {
    //   currentScreen: currentScreen,
    //   prevScreen: prevScreen
    // });
  };
  onRegister = async token => {
    // Alert.alert("Registered !", JSON.stringify(token));

    let session_id = await getStorage("session_id");
    console.log("token", token, session_id, this.props.userInfo);
    if (this.props.loginEmail) {
      let res = await $api["common/registerNotif"]({
        device_id: session_id,
        device_token: token.token,
        os: token.os,
        user: this.props.userInfo.name,
        brand: DeviceInfo.getBrand().toLowerCase(),
        active: 1,
        language: "",
        app_name: "com.wholerengroup.client"
      });
    }

    // PushNotification.localNotification({
    //   /* iOS and Android properties */
    //   title: "My Notification Title", // (optional)
    //   message: "My Notification Message", // (required)
    //   playSound: false, // (optional) default: true
    //   soundName: "default", // (optional) Sound to play when the notification is shown. Value of 'default' plays the default sound. It can be set to a custom sound such as 'android.resource://com.xyz/raw/my_sound'. It will look for the 'my_sound' audio file in 'res/raw' directory and play it. default: 'default' (default sound is played)
    //   number: 10, // (optional) Valid 32 bit integer specified as string. default: none (Cannot be zero)
    //   repeatType: "day", // (optional) Repeating interval. Check 'Repeating Notifications' section for more info.
    //   actions: '["Yes", "No"]' // (Android only) See the doc for notification actions to know more
    // });
  };

  onNotif(notif) {
    if (notif.foreground) {
      this._clearMessage();
    }
    // PushNotification.setApplicationIconBadgeNumber(notif.badge);
    // notif.finish(PushNotificationIOS.FetchResult.NoData);
  }

  _clearMessage = async () => {
    if (!this.props.loginEmail) {
      return;
    }
    let session_id = await getStorage("session_id");

    let res = await $api["common/clearNotification"]({
      user: this.props.userInfo.name,
      device_id: session_id,
      app_name: "com.wholerengroup.client"
    });
    PushNotification.setApplicationIconBadgeNumber(0);
  };
  _handleAppStateChange = nextAppState => {
    if (
      this.state.appState.match(/inactive|background/) &&
      nextAppState === "active"
    ) {
      this._clearMessage();
    }
    this.setState({ appState: nextAppState });
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WRoot);
// gets the current screen from navigation state
function getActiveRouteName(navigationState) {
  if (!navigationState) {
    return null;
  }
  const route = navigationState.routes[navigationState.index];
  // dive into nested navigators
  if (route.routes) {
    return getActiveRouteName(route);
  }
  return route.routeName;
}
