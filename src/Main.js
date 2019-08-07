import React, { Component } from "react";

import store, { StoreProvider } from "./store/store";

import { modal } from "@/utils";
import { WModal } from "ui";
import Root from "./Root";
import CodePush from "react-native-code-push";
export default class Main extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <StoreProvider store={store}>
        <Root />

        <WModal ref={ref => modal.setInstance(ref)} />
      </StoreProvider>
    );
  }
  componentDidMount = () => {
    CodePush.sync(
      {
        installMode: CodePush.InstallMode.IMMEDIATE,
        updateDialog: {
          optionalIgnoreButtonLabel: "稍后",
          optionalInstallButtonLabel: "立即更新",
          optionalUpdateMessage: "有新版本了，是否更新？",
          title: "更新提示"
        }
      },
      this.codePushStatusDidChange.bind(this),
      this.codePushDownloadDidProgress.bind(this)
    );
  };

  codePushDownloadDidProgress(progress) {
    console.log("codepush1");
    // this.setState({ progress: progress.receivedBytes / progress.totalBytes });
  }
  codePushStatusDidChange(syncStatus) {
    switch (syncStatus) {
      case CodePush.SyncStatus.CHECKING_FOR_UPDATE:
        console.log("codepush2");
        // this.setState({ syncMessage: "检查更新" });
        break;
      case CodePush.SyncStatus.DOWNLOADING_PACKAGE:
        console.log("codepush3");
        // this.setState({ syncMessage: "下载安装包" });
        break;
      case CodePush.SyncStatus.AWAITING_USER_ACTION:
        console.log("codepush4");
        // this.setState({ syncMessage: "等待用户协作" });
        break;
      case CodePush.SyncStatus.INSTALLING_UPDATE:
        console.log("codepush5");
        // this.setState({ syncMessage: "Installing update." });
        break;
      case CodePush.SyncStatus.UP_TO_DATE:
        console.log("codepush6");
        // this.setState({ syncMessage: "已经是最新版本了", progress: false });
        break;
      case CodePush.SyncStatus.UPDATE_IGNORED:
        console.log("codepush7");
        // this.setState({ syncMessage: "取消更新", progress: false });
        break;
      case CodePush.SyncStatus.UPDATE_INSTALLED:
        console.log("codepush8");
        // this.setState({ syncMessage: "更新完成", progress: false });
        break;
      case CodePush.SyncStatus.UNKNOWN_ERROR:
        console.log("codepush9");
        // this.setState({ syncMessage: "An unknown error occurred.", progress: false });
        break;
    }
  }
}
