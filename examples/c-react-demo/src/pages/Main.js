import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PostMessages from './PostMessages';
import * as homeActions from '../redux/actions/home_action';
import { Spin } from 'antd';

class Main extends Component {

  render() {
    return (
        <PostMessages>
          <Spin spinning={this.props.loadingStatus}>
            {this.props.children}
          </Spin>
        </PostMessages>
    );
  }
}

const mapStateToProps = (state) => {
  let { loadingStatus } = state.homeReducer;
  return {
    loadingStatus
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    homeActions: bindActionCreators(homeActions, dispatch),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Main))
