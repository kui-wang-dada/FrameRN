import React from "react";

import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import lang from "@/assets/lang";
export default class EndTip extends React.Component {
  render() {
    const tipText = this.props.visible
      ? lang.t("common.scroll.noMore")
      : lang.t("common.scroll.loading");
    return (
      <View
        style={styles.endTipContainer}
        ref={element => (this.endTip = element)}
      >
        {this.props.visible ? null : (
          <ActivityIndicator style={styles.endTipIcon} />
        )}
        <Text style={styles.endTipText}>{tipText}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  endTipContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 20
  },
  endTipIcon: {
    marginRight: 10
  },
  endTipText: {
    textAlign: "center",
    color: "#999"
  }
});
