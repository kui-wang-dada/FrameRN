import React from "react";
import {
  Image as ReactNativeImage,
  StyleSheet,
  PixelRatio,
  Platform
} from "react-native";

import { commonStyle } from "@/utils";

export default class Image extends React.Component {
  static defaultProps = {
    defaultSource: require("@/assets/images/pic_not.png"),
    autoCalcSize: true
  };

  constructor(props) {
    super(props);
    this.state = this.initState(props);
  }
  initState = props => {
    this.hasLoadImage = false;
    let { source, style, defaultSource, autoCalcSize } = props;
    if (!defaultSource || typeof source === "number") {
      this.hasLoadImage = true;
      return {
        finalSource: source
      };
    }
    let finalSource = { ...source };

    // finalSource.cache = finalSource.uri.indexOf("http") === 0 && "force-cache";
    if (!autoCalcSize || !finalSource.uri) {
      return {
        finalSource
      };
    }

    let flattenStyle = style;
    if (typeof flattenStyle === "number") {
      flattenStyle = StyleSheet.flatten(style);
    } else if (Array.isArray(flattenStyle)) {
      flattenStyle = flattenStyle.reduce((total, next) => {
        if (typeof next === "number") {
          next = StyleSheet.flatten(next);
        }
        return { ...total, ...next };
      }, {});
    }

    let width = source.width || flattenStyle.width;
    let height = source.height || flattenStyle.height;
    if (!width && __DEV__) {
      throw `image 必须定义width,source:${JSON.stringify(
        source
      )},style:${JSON.stringify(flattenStyle)}`;
    }

    width = width || commonStyle.SCREEN_WIDTH;
    height = height || commonStyle.SCREEN_HEIGHT;
    let { uri } = finalSource;

    finalSource = {
      ...finalSource,
      uri,
      width,
      height
    };
    this.hasLoadImage = false;
    return {
      finalSource
    };
  };
  componentDidMount() {
    this.prefetchImage();
  }
  shouldComponentUpdate(nextProps) {
    if (typeof nextProps.source === "number")
      return nextProps.source !== this.props.source;
    let shouldUpdate = nextProps.source.uri !== this.props.source.uri;
    return shouldUpdate;
  }
  prefetchImage = () => {
    let { finalSource } = this.state;
    if (this.hasLoadImage || !finalSource.uri) return;
    this._isMounted = true;
    ReactNativeImage.prefetch(finalSource.uri).then(() => {
      this.hasLoadImage = true;
      if (!this.imageRef) return;
      let { style = {}, resizeMode = "cover" } = this.props;
      if (Array.isArray(style)) {
        style = [{ backgroundColor: "transparent" }, ...style];
      } else {
        style = [{ backgroundColor: "transparent" }, style];
      }

      if (Platform.OS === "ios") {
        this.imageRef.setNativeProps({
          style,
          resizeMode,
          source: [finalSource]
        });
      } else {
        this.imageRef.setNativeProps({
          style,
          resizeMode,
          src: [finalSource]
        });
      }
    });
  };
  componentDidUpdate(prevProps) {
    if (this.props.source !== prevProps.source) {
      let state = this.initState(this.props);
      this.setState(state, this.prefetchImage);
    }
    this.prefetchImage();
  }

  render() {
    let {
      defaultSource,
      style,
      source,
      resizeMode,
      defaultSourceStyle,
      ...restProps
    } = this.props;
    let { finalSource } = this.state;
    if (!this.hasLoadImage) {
      style = [style, { backgroundColor: "#f1f1f1" }, defaultSourceStyle];
      resizeMode = "cover";
    }
    return (
      <ReactNativeImage
        {...restProps}
        style={style}
        source={this.hasLoadImage ? finalSource : defaultSource}
        resizeMode={resizeMode}
        ref={r => (this.imageRef = r)}
      />
    );
  }
}
