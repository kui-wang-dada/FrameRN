"use strict";

import React, { Component } from "react";
import { StyleSheet, Image, View, Text, TouchableOpacity } from "react-native";
import { FlowList } from "ui";
import { commonStyle, transformSize } from "@/utils";

const defaultCircleSize = 14;
const defaultCircleColor = commonStyle.color_blue;
const defaultLineWidth = 1;
const defaultLineColor = commonStyle.color_theme;
const defaultTimeTextColor = "black";
const defaultDotColor = "white";
const defaultInnerCircle = "none";

export default class Timeline extends Component {
  constructor(props, context) {
    super(props, context);

    this._renderRow = this._renderRow.bind(this);
    this.renderTime = (this.props.renderTime
      ? this.props.renderTime
      : this._renderTime
    ).bind(this);
    this.renderDetail = (this.props.renderDetail
      ? this.props.renderDetail
      : this._renderDetail
    ).bind(this);
    this.renderCircle = (this.props.renderCircle
      ? this.props.renderCircle
      : this._renderCircle
    ).bind(this);
    this.renderEvent = this._renderEvent.bind(this);

    this.state = {
      x: 0,
      width: 0
    };
  }

  render() {
    return (
      <View style={[styles.container, this.props.style]}>
        <FlowList
          ref="flowlist"
          style={[styles.listview, this.props.listViewStyle]}
          request={this.props.request}
          params={this.props.params}
          renderItem={this._renderRow}
        />
      </View>
    );
  }

  _renderRow({ item, index }) {
    let content = (
      <View style={[styles.rowContainer, this.props.rowContainerStyle]}>
        {this.renderTime(item, index)}
        {this.renderEvent(item, index)}
        {this.renderCircle(item, index)}
      </View>
    );

    return <View key={index}>{content}</View>;
  }

  _renderTime(rowData, rowID) {
    let timeWrapper = {
      alignItems: "flex-end"
    };

    return (
      <View style={timeWrapper}>
        <View style={[styles.timeContainer, this.props.timeContainerStyle]}>
          <Text style={[styles.time, this.props.timeStyle]}>
            {rowData.time}
          </Text>
        </View>
      </View>
    );
  }

  _renderEvent(rowData, rowID) {
    const lineWidth = rowData.lineWidth
      ? rowData.lineWidth
      : this.props.lineWidth;
    const isLast =
      this.refs.flowlist.state.data.length !== 1 &&
      this.refs.flowlist.state.data.length - 1 === rowID;
    const lineColor = isLast
      ? "rgba(0,0,0,0)"
      : rowData.lineColor
      ? rowData.lineColor
      : this.props.lineColor;
    let opStyle = null;

    opStyle = {
      borderColor: lineColor,
      borderLeftWidth: lineWidth,
      borderRightWidth: 0,
      //   marginLeft: transformSize(30),
      paddingLeft: transformSize(30)
    };

    return (
      <View
        style={[styles.details, opStyle]}
        onLayout={evt => {
          if (!this.state.x && !this.state.width) {
            const { x, width } = evt.nativeEvent.layout;
            this.setState({ x, width });
          }
        }}
      >
        <TouchableOpacity
          disabled={this.props.onEventPress == null}
          style={[this.props.detailContainerStyle]}
          onPress={() =>
            this.props.onEventPress ? this.props.onEventPress(rowData) : null
          }
        >
          <View style={styles.detail}>{this.renderDetail(rowData, rowID)}</View>
          {this._renderSeparator()}
        </TouchableOpacity>
      </View>
    );
  }

  _renderDetail(rowData) {
    let content = null;
    switch (rowData.doctype) {
      case "Contract":
        content = this.props.renderContract(rowData);
        break;
      case "Paylink Link":
        content = this.props.renderPaylink(rowData);
        break;
      case "Opportunity":
        content = this.props.renderMessage(rowData);
        break;
      case "File":
        content = this.props.renderReport(rowData);
        break;
      case "Tutoring Event":
        content = this.props.renderRecord(rowData);
        break;
      default:
        content = (
          <View style={styles.container}>
            <Text style={[styles.title, this.props.titleStyle]}>
              {rowData.title}
            </Text>
          </View>
        );
    }

    return <View style={styles.container}>{content}</View>;
  }

  _renderCircle(rowData) {
    var circleSize = rowData.circleSize
      ? rowData.circleSize
      : this.props.circleSize
      ? this.props.circleSize
      : defaultCircleSize;
    var circleColor = rowData.circleColor
      ? rowData.circleColor
      : this.props.circleColor
      ? this.props.circleColor
      : defaultCircleColor;
    var lineWidth = rowData.lineWidth
      ? rowData.lineWidth
      : this.props.lineWidth
      ? this.props.lineWidth
      : defaultLineWidth;

    var circleStyle = null;

    circleStyle = {
      width: this.state.x ? circleSize : 0,
      height: this.state.x ? circleSize : 0,
      borderRadius: circleSize / 2,
      backgroundColor: circleColor,
      left: this.state.x - circleSize / 2 + (lineWidth - 1) / 2
    };

    var innerCircle = null;
    switch (this.props.innerCircle) {
      case "icon":
        let iconSource = rowData.icon ? rowData.icon : this.props.icon;
        let iconStyle = {
          height: circleSize,
          width: circleSize
        };
        innerCircle = (
          <Image
            source={iconSource}
            style={[iconStyle, this.props.iconStyle]}
          />
        );
        break;
      case "dot":
        let dotStyle = {
          height: circleSize / 2,
          width: circleSize / 2,
          borderRadius: circleSize / 4,
          backgroundColor: rowData.dotColor
            ? rowData.dotColor
            : this.props.dotColor
            ? this.props.dotColor
            : defaultDotColor
        };
        innerCircle = <View style={[styles.dot, dotStyle]} />;
        break;
    }
    return (
      <View style={[styles.circle, circleStyle, this.props.circleStyle]}>
        {innerCircle}
      </View>
    );
  }

  _renderSeparator() {
    if (!this.props.separator) {
      return null;
    }
    return <View style={[styles.separator, this.props.separatorStyle]} />;
  }
}

Timeline.defaultProps = {
  circleSize: defaultCircleSize,
  circleColor: defaultCircleColor,
  lineWidth: defaultLineWidth,
  lineColor: defaultLineColor,
  innerCircle: defaultInnerCircle,
  columnFormat: "single-column-left",
  separator: false,
  showTime: true
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  listview: {
    flex: 1
  },

  rowContainer: {
    flexDirection: "row",
    flex: 1,
    //alignItems: 'stretch',
    justifyContent: "center"
  },
  timeContainer: {
    minWidth: transformSize(150)
  },
  time: {
    textAlign: "right",
    color: defaultTimeTextColor
  },
  circle: {
    width: 16,
    height: 16,
    borderRadius: 10,
    position: "absolute",
    left: -8,
    alignItems: "center",
    justifyContent: "center"
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: defaultDotColor
  },
  title: {
    fontSize: 16,
    fontWeight: "bold"
  },
  details: {
    borderLeftWidth: defaultLineWidth,
    flexDirection: "column",
    flex: 1,
    overflow: "hidden"
  },
  detail: { paddingBottom: transformSize(40) },
  description: {
    marginTop: 10
  },
  separator: {
    height: 1,
    backgroundColor: "#aaa",
    marginTop: 10,
    marginBottom: 10
  }
});
