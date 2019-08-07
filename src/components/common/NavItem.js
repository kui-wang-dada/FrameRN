import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import PropTypes from "prop-types";

import { transformSize, modal } from "@/utils";
// import Icon from "react-native-vector-icons/FontAwesome";
import { Icon, Touchable, Message } from "ui";

import lang from "@/assets/lang";
export default class NavItem extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let { icon, params, title, route, color } = this.props.data;

    return (
      <Touchable
        style={[style.navItem]}
        onPress={() => this.goToPages(route, params)}
      >
        <View style={style.imgWrap}>
          <Icon
            name={icon}
            size={transformSize(70)}
            color={color || "#3fc375"}
          />
        </View>
        <Text style={[style.label, this.props.textStyle]}>{lang.t(title)}</Text>
      </Touchable>
    );
  }
  static propTypes = {
    data: PropTypes.object
  };
  goToPages = (route, params) => {
    if (this.props.hasOwnProperty("loginEmail") && !this.props.loginEmail) {
      this.props.navigation.navigate("login");
      return;
    }
    if (route === "serviceCalendar") {
      modal.showToast(lang.t("common.message.build"));
      return;
    }

    this.props.navigation.navigate(route, params);
  };
}

const style = StyleSheet.create({
  navItem: {
    minWidth: "25%",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  },
  imgWrap: {
    width: transformSize(80),
    height: transformSize(80),
    justifyContent: "center",
    alignItems: "center",
    borderRadius: transformSize(40)
  },
  label: {
    fontSize: transformSize(28),
    color: "#333"
  }
});
