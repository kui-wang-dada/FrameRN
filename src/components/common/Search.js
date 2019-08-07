import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  SafeAreaView,
  Keyboard
} from "react-native";
import { transformSize, SCREEN_WIDTH, SCREEN_HEIGHT, modal } from "@/utils";

import { Icon, Button, EndTip, FlowList, Touchable } from "ui";

import $api from "@/plugins/api";

export default class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchValue: "",
      searchData: [],
      searchFlag: false
    };
  }
  static navigationOptions = ({ navigation, screenProps }) => {
    return {
      header: null
    };
  };

  render() {
    let { searchValue, searchData, searchFlag } = this.state;
    return (
      <Touchable type="withoutFeedback" onPress={() => Keyboard.dismiss()}>
        <SafeAreaView style={style.wrap}>
          <View>
            <View style={style.searchBar}>
              <Button
                icon="back"
                iconSize={transformSize(40)}
                iconColor={"#666"}
                onPress={() => modal.close()}
                style={style.iconBack}
              />
              <View style={style.inputWrap}>
                <Icon
                  name="search"
                  color="#999"
                  size={transformSize(40)}
                  style={style.searchIcon}
                />
                <TextInput
                  placeholder={this.props.title || "搜索学校名字"}
                  autoFocus
                  style={{ flex: 1, height: "100%" }}
                  onChangeText={text => {
                    this.setState({ searchValue: text });
                  }}
                  value={this.state.searchValue}
                  returnKeyType="search"
                  onSubmitEditing={this.confirm}
                />
                <Button
                  icon="close1"
                  iconColor="#999"
                  iconSize={transformSize(40)}
                  onPress={() =>
                    this.setState({
                      searchValue: "",
                      searchData: [],
                      searchFlag: false
                    })
                  }
                  style={style.iconClear}
                />
              </View>
              {/* <Button
                title={"搜索"}
                onPress={() => this.confirm()}
                style={style.btnWrap}
                textStyle={style.btn}
              /> */}
            </View>
            {searchFlag && this.renderSearch()}
          </View>
        </SafeAreaView>
      </Touchable>
    );
  }
  static defaultProps = {
    type: "school",
    params: ""
  };
  componentDidMount = async () => {};

  renderSearch() {
    let { table, key, handle } = this.props.params;
    let { type } = this.props;
    let params = {
      filters: JSON.stringify([
        [table, key, handle, `%${this.state.searchValue}%`]
      ])
    };
    let request = type === "school" ? this.getSchool : null;
    return (
      <FlowList
        listKey={(item, index) => "b" + index.toString()}
        ref="searchList"
        request={request}
        params={params}
        renderItem={this.renderSearchItem}
      />
    );
  }
  renderSearchItem = ({ item, index }) => {
    return (
      <Touchable
        style={style.searchWrap}
        onPress={() => this.props.chooseItem(item.school)}
      >
        <Text style={style.searchText}>{item.school}</Text>
      </Touchable>
    );
  };
  getSchool = params => {
    return new Promise((resolve, reject) => {
      $api["service/searchSchool"](params)
        .then(res => {
          resolve(res.data.display);
        })
        .catch(err => {
          reject(err);
        });
    });
  };
  confirm = async () => {
    this.setState({ searchFlag: true }, () => {
      this.refs.searchList.refreshData();
    });
  };
}

const style = StyleSheet.create({
  wrap: {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
    backgroundColor: "#fff"
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: transformSize(40),
    paddingRight: transformSize(40)
  },
  iconBack: {
    marginHorizontal: transformSize(30)
  },
  inputWrap: {
    flexDirection: "row",
    alignItems: "center",
    position: "relative",
    backgroundColor: "#f0f0f0",
    height: transformSize(70),
    borderRadius: transformSize(10),
    flex: 1
  },
  searchIcon: {
    marginHorizontal: transformSize(30)
  },
  iconClear: {
    position: "absolute",
    right: transformSize(30),
    top: transformSize(15)
  },
  btnWrap: {
    paddingHorizontal: transformSize(30),
    height: "100%"
  },
  searchWrap: {
    paddingVertical: transformSize(40),
    marginHorizontal: transformSize(40),
    borderBottomWidth: transformSize(1),
    borderBottomColor: "#ccc"
  },
  searchText: {
    fontSize: transformSize(28),
    color: "#333"
  }
});
