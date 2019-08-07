import React, { Component } from "react";
import PropTypes from "prop-types";
import { StyleSheet, View, Text, Image } from "react-native";

import { commonStyle as styles, transformSize } from "@/utils";
import { Button } from "ui";
import lang from "@/assets/lang";
import success from "@/assets/images/emptyView/success.png";
import failed from "@/assets/images/emptyView/failed.png";
import favoriteEmpty from "@/assets/images/emptyView/emptyFavorite.png";
import noSearchResult from "@/assets/images/emptyView/searchFailed.png";
import noNetwork from "@/assets/images/emptyView/noNetwork.png";
import noData from "@/assets/images/emptyView/noData.png";
import notFound from "@/assets/images/emptyView/404.png";
import noMessage from "@/assets/images/emptyView/noMessage.png";
import wait from "@/assets/images/emptyView/wait.png";

export default class Message extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let config;

    let presets = {
      "request-success": {
        image: success,
        content: "成功！"
      },
      "request-failed": {
        image: failed,
        content: "失败！"
      },
      "no-favorite": {
        image: favoriteEmpty,
        content: "收藏夹为空！"
      },
      "no-search-result": {
        image: noSearchResult,
        content: "未搜到您想要的内容！"
      },
      "no-network": {
        image: noNetwork,
        content: lang.t("common.message.no_net"),
        button: "重新加载"
      },
      "no-data": {
        image: noData,
        content: this.props.messageTitle || lang.t("common.no_data")
      },
      "no-page": {
        image: notFound,
        content: "页面错误！"
      },
      "please-wait": {
        image: wait,
        title: "正在搭建，敬请期待！",
        button: "知道了"
      }
    };

    if (this.props.preset) {
      config = presets[this.props.preset];

      if (!config) {
        throw new Error(`Cannot find a preset named "${this.props.preset}".`);
      }
    } else {
      config = {
        image: this.props.image,
        title: this.props.title,
        content: this.props.content,
        button: this.props.button
      };
    }

    const image = config.image ? (
      <Image source={config.image} style={s.image} />
    ) : null;
    const title = config.title ? (
      <Text style={s.title}>{config.title}</Text>
    ) : null;
    const textColor = this.props.textColor
      ? this.props.textColor
      : styles.fontColor_assist_2;
    const content = config.content ? (
      <Text style={[s.content, { color: textColor }]}>{config.content}</Text>
    ) : null;
    const btn = config.button ? (
      <Button
        style={[s.btnWrap]}
        textStyle={s.btn}
        title={config.button}
        onPress={this.props.clickButton}
      />
    ) : null;

    return (
      <View style={[s.main].concat([this.props.style])}>
        {image}
        {title}
        {content}
        {btn}
      </View>
    );
  }

  static defaultProps = {
    style: {
      paddingVertical: transformSize(50)
    }
  };
}

propTypes = {
  style: PropTypes.style,
  preset: PropTypes.string,
  image: PropTypes.number,
  title: PropTypes.string,
  content: PropTypes.string,
  button: PropTypes.string,
  clickButton: PropTypes.func,
  textColor: PropTypes.string
};

const s = StyleSheet.create({
  main: {
    alignItems: "center",
    // backgroundColor: "#fff",
    paddingHorizontal: transformSize(40)
  },
  image: {
    marginBottom: transformSize(30)
  },
  title: {
    fontSize: transformSize(36),
    color: "#333",
    marginBottom: transformSize(30)
  },
  content: {
    fontSize: transformSize(30),
    color: "#666"
  },

  btnWrap: {
    marginTop: transformSize(30),
    paddingVertical: transformSize(24),
    paddingHorizontal: transformSize(40),
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FCFCFC",
    borderRadius: transformSize(4),
    borderWidth: transformSize(1),
    borderColor: "#ccc"
  },
  btn: {
    fontSize: transformSize(32),
    color: "#333"
  }
});
