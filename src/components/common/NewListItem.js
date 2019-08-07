import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import { transformSize, checkImg } from "@/utils";
import { Image, Touchable } from "ui";
export default class NewListItem extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    let { title, date, cover_image, name, _user_tags } = this.props.data;
    let tags =
      _user_tags &&
      _user_tags
        .split(",")
        .filter((item, index) => {
          return item !== "";
        })
        .slice(0, 3);

    return (
      <Touchable onPress={() => this.goToNewDetail(name)}>
        <View style={style.newListItem}>
          <Image
            style={style.leftWrap}
            source={{ uri: checkImg(cover_image) }}
          />
          <View style={style.rightWrap}>
            <Text style={style.title}>{title}</Text>
            <Text style={style.date}>{date}</Text>
            <View style={style.tagWrap}>
              {tags &&
                tags.map((item, index) => {
                  return (
                    <Text style={style.tag} key={index}>
                      {item}
                    </Text>
                  );
                })}
            </View>
          </View>
        </View>
      </Touchable>
    );
  }

  goToNewDetail(name) {
    this.props.navigation.navigate("newDetail", { name: name });
  }
}

const style = StyleSheet.create({
  newListItem: {
    padding: transformSize(20),
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#fff",
    borderBottomWidth: transformSize(1),
    borderBottomColor: "#f0f0f0"
  },
  leftWrap: {
    alignItems: "center",
    justifyContent: "center",
    width: transformSize(144),
    height: transformSize(144),
    borderRadius: transformSize(6),
    resizeMode: "cover"
  },
  rightWrap: {
    marginLeft: transformSize(20),
    flex: 1
  },

  title: {
    fontSize: transformSize(28),
    lineHeight: transformSize(35),
    color: "#333",
    marginBottom: transformSize(15),
    overflow: "hidden"
  },
  date: {
    marginBottom: transformSize(15),
    fontSize: transformSize(24),
    color: "#999"
  },
  tagWrap: {
    flexDirection: "row"
  },
  tag: {
    padding: transformSize(10),
    marginRight: transformSize(20),
    borderRadius: transformSize(4),
    fontSize: transformSize(24),
    color: "#666",
    backgroundColor: "#f0f0f0"
  }
});
