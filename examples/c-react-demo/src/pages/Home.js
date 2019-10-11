import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as homeActions from '../redux/actions/home_action';
import { message, Button } from 'antd';


class Home extends Component {
  
  onBtnClick = () => {
    message.info('开始调用后台');
    var props = {
      name: 'hello',
      params: {
        age: 16
      },
      callbackName: 'setLoadingStatus'
    };
    window.external.invoke(JSON.stringify(props));
    this.props.homeActions.setLoadingStatus(true);
  }

  onClear = () => {
    this.props.homeActions.setHelloResult(null);
  }

  render() {
    return (
      <div style={{padding: '24px'}}>
        <Button type="primary" onClick={this.onBtnClick}>点击调用后台</Button>
        <Button onClick={this.onClear} style={{marginLeft: '16px'}}>清除结果</Button>
        <div style={{border: '1px solid #ddd', borderRadius: '4px', height: '200px', margin: '16px 0'}}>
          {this.props.helloResult && JSON.stringify(this.props.helloResult)}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  let { loadingStatus, helloResult } = state.homeReducer;
  return { loadingStatus, helloResult };
};

const mapDispatchToProps = dispatch => {
  return {
    homeActions: bindActionCreators(homeActions, dispatch)
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
