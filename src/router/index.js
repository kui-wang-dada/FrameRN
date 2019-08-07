/** @format */

import React, { Component } from "react";
import {
  createBottomTabNavigator,
  createStackNavigator,
  createAppContainer,
  getActiveChildNavigationOptions
} from "react-navigation";
import { Icon, Touchable, Button } from "ui";
import { StyleSheet, Platform, View } from "react-native";

import { transformSize } from "@/utils";
import lang from "@/assets/lang";
import home from "./home";

import login from "./login";

let tabNavRouteConfig = {
  home: {
    screen: home.home.screen,
    navigationOptions: ({ screenProps }) => ({
      tabBarLabel: screenProps.tabLabel.home,
      tabBarIcon: ({ tintColor, focused }) => (
        <Icon name={focused ? "home2" : "home1"} size={25} color={tintColor} />
      ),
      header: null
    })
  }
};

const TabNav = createBottomTabNavigator(tabNavRouteConfig, {
  animationEnabled: false,
  swipeEnabled: false,
  lazy: true,
  tabBarPosition: "bottom",
  tabBarOptions: {
    showIcon: true,
    activeTintColor: "#3fc375",
    inactiveTintColor: "#494949",
    labelStyle: {
      fontSize: transformSize(24)
    },
    style: {
      height: transformSize(110)
    }
  }
});

TabNav.navigationOptions = ({ navigation, screenProps }) => {
  return getActiveChildNavigationOptions(navigation, screenProps);
};
// const AppContainer = createAppContainer(TabNav);
const AppNavigator = createStackNavigator(
  {
    App: TabNav,
    ...home,
    ...login
  },
  {
    defaultNavigationOptions: ({ navigation }) => StackOptions({ navigation }),
    cardShadowEnabled: false,
    cardOverlayEnabled: true
  }
);

const AppContainer = createAppContainer(AppNavigator);

export default AppContainer;

const StackOptions = ({ navigation }) => {
  const tabBarVisible = false;
  const headerBackTitle = false;

  const headerStyle = {
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#edebed",
    elevation: 0
  };

  const headerTitleStyle = {
    flex: 1,
    textAlign: "center",
    fontWeight: "600",
    color: "#333",
    fontSize: transformSize(36)
  };
  const headerTintColor = "#3fc375";
  const headerLeft = (
    <Button
      style={s.backButton}
      onPress={() => {
        navigation.goBack();
      }}
      icon="back"
      iconSize={20}
      iconColor="#666"
      title={lang.t("common.back")}
      textStyle={{
        color: "#666",
        marginLeft: transformSize(10),
        fontSize: transformSize(28)
      }}
    />
  );
  const headerRight = <View style={s.rightView} />;
  return {
    tabBarVisible,
    headerBackTitle,
    headerStyle,
    headerTitleStyle,
    headerTintColor,
    headerLeft,
    headerRight
  };
};

const s = StyleSheet.create({
  backButton: {
    marginLeft: transformSize(24)
  },
  rightView: {
    marginRight: transformSize(24)
  }
});
