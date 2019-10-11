import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as homeActions from "../redux/actions/home_action";
import { message } from 'antd';
class PostMessages extends React.Component {
  componentDidMount() {
    window.addEventListener("invoke-message", e => {
      setTimeout(() => {
        message.info("后台已回调 ---- 回调参数：" + JSON.stringify(e.detail));
        this.props.homeActions.setLoadingStatus(false);
        this.props.homeActions.setHelloResult(e.detail);
      }, 3000);
    });
  }

  render() {
    return this.props.children;
  }
}

const mapStateToProps = state => {
  let { loadingStatus } = state.homeReducer;
  return { loadingStatus };
};

const mapDispatchToProps = dispatch => {
  return {
    homeActions: bindActionCreators(homeActions, dispatch)
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PostMessages);
