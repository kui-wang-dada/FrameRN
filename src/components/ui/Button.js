import React, { Component } from "react";
import { View, StyleSheet, Text } from "react-native";

import PropTypes from "prop-types";
import { transformSize } from "@/utils";
import { Icon, Touchable } from "ui";
export default class HomeHeader extends Component {
  constructor(props) {
    super(props);
  }

  renderIcon() {
    let { icon, iconColor, iconSize } = this.props;

    if (icon) {
      return (
        <Icon name={icon} disabled={true} color={iconColor} size={iconSize} />
      );
    } else {
      return null;
    }
  }

  static defaultProps = {
    textStyle: {
      fontSize: transformSize(28),
      color: "#333",
      marginVertical: 0
    },
    style: {}
  };

  render() {
    const title = this.props.title;
    const style = this.props.style;
    const onPress = this.props.onPress;
    return onPress ? (
      <Touchable
        {...this.props}
        style={[styles.main, style]}
        onPress={this.props.onPress}
        activeOpacity={0.8}
      >
        {this.renderIcon()}
        <Text style={this.props.textStyle}>{title}</Text>
      </Touchable>
    ) : (
      <View
        {...this.props}
        style={[styles.main, style]}
        onPress={this.props.onPress}
        activeOpacity={0.8}
      >
        {this.renderIcon()}
        <Text style={this.props.textStyle}>{title}</Text>
      </View>
    );
  }

  componentDidMount() {}

  renderMask() {
    const maskStyle = [
      style.mask,
      {
        opacity: this.state.pressing ? 0.1 : 0
      }
    ];

    return <View style={maskStyle} />;
  }

  handlePressIn() {
    this.setState({
      pressing: true
    });
  }

  handlePressOut() {
    this.setState({
      pressing: false
    });
  }

  state = {
    pressing: false
  };
}

propTypes = {
  icon: PropTypes.String,
  onPress: PropTypes.func,
  title: PropTypes.String,
  style: PropTypes.StyleSheet
};

const styles = StyleSheet.create({
  main: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden"
  }
});
