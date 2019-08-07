import React, { Component } from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";

export default class Main extends Component {
  constructor(props) {
    super(props);
  }
  static defaultProps = {
    title: "处理中..."
  };
  render() {
    let { title } = this.props;
    return (
      <View
        style={{
          padding: 20,
          backgroundColor: "rgba(0, 0, 0, 0.7)",
          borderRadius: 10
        }}
      >
        <ActivityIndicator animating={true} size="large" color="#fff" />
        <Text style={{ color: "#fff", marginTop: 10 }}>{title}</Text>
      </View>
    );
  }
  componentDidMount = async () => {};
}
const style = StyleSheet.create({});
