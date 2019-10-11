import React, { Component } from "react";
import Utils from "../script/Utils";

let _state = Utils.guid();

class OtherLogin extends Component {

  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      loginType: this.props.loginType || 'qq'
    };
  }
    
  componentDidMount() {
    // window.receiveMessageFromIndex = event => {
    //   if (event !== undefined) {
    //     if (event.data.messageType === "iframe") {
    //       let params = event.data.data;
    //       if (
    //         params.hasOwnProperty("type") &&
    //         params.hasOwnProperty("code") &&
    //         params.hasOwnProperty("state")
    //       ) {
    //         if (params.state === _state) {
    //           this.setState({loading: true});
    //           this.props.userActions.otherLogin(params, (flag, data) => {
    //               this.setState({loading: false});
    //               if (flag) {
    //                 Store.set("localUserName", data.username);
    //                 if (data.password) {
    //                   Store.get("localUserPwd", window.btoa(data.password));
    //                 }
    //                 Store.set("localUserId", data.userid);
    //                 Store.set("userLogin", true);
    //                 Store.set("loginType", this.state.loginType);
    //                 Store.set("openid", data.openid);
    //                 this.props.history.push("/");
    //               } else {
    //                 //登录失败  返回登录页
    //                 this.props.history.push("/login");
    //               }
    //             }
    //           );
    //         } else {
    //           Utils.openNotificationWithIcons('提示', 'state不一致，请重试！', 'warning');
    //           this.props.history.push("/login");
    //         }
    //       }
    //     }
    //   }
    // };
    // //监听message事件
    // window.addEventListener("message", window.receiveMessageFromIndex, false);
  }

  componentWillUnmount() {
    // window.removeEventListener("message", window.receiveMessageFromIndex, false);
  }

  render() {
    const { loginType } = this.state;
    return (
        <iframe
          title="jsx-a11y/iframe-has-title"
          style={{ height: "100%", width: "100%" }}
          src={`https://api-qa.vlan.cn/vppn/api/v2/auth/${loginType === 'qq' ? 'qqlogin' : 'weixinlogin'}?state=${_state}`}
          frameBorder="0"
        />
    );
  }
}

export default OtherLogin;
