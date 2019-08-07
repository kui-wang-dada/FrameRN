import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import { transformSize, commonStyle } from "@/utils";
export default class Main extends Component {
  constructor(props) {
    super(props);
  }
  static defaultProps = {
    height: 30
  };
  render() {
    let { percent, height } = this.props;
    let { color_blue, color_theme } = commonStyle;
    return (
      <View style={[style.progress, { height }]} ref="progress">
        <View
          style={[
            style.progressBar,
            { width: transformSize((percent > 100 ? 100 : percent) * 6.7) }
          ]}
          ref="progressBar"
        />
        <Text
          style={[
            style.text,
            percent > 10
              ? {
                  left:
                    transformSize((percent > 100 ? 100 : percent) * 6.7) - 35
                }
              : { left: transformSize(percent * 6.7) + 5, color: color_blue }
          ]}
          ref="text"
        >
          {percent + "%"}
        </Text>
      </View>
    );
  }
  componentDidMount = async () => {};
}
const style = StyleSheet.create({
  progress: {
    position: "relative",
    backgroundColor: "#e5e5e5",
    borderRadius: transformSize(10)
  },
  progressBar: {
    position: "absolute",
    // width: 100,
    height: "100%",
    backgroundColor: commonStyle.color_blue,
    borderRadius: transformSize(10)
  },
  text: {
    position: "absolute",
    fontSize: transformSize(24),
    top: "50%",
    transform: [
      {
        translateY: -transformSize(12)
      }
    ],
    // left: 70,
    color: "#fff"
  }
});
