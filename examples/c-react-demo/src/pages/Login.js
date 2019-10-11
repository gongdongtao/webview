import React, { Component } from 'react';
import IconFont from '../components/common/IconFont';
import GlobalHeader from '../components/layout/GlobalHeader';
import LoginForm from '../components/LoginForm';
import OtherLogin from '../components/OtherLogin';
import { Modal, Tabs } from 'antd';
const { TabPane } = Tabs;

export default class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            visible: false
        };
    }

    openModal = () => {
        this.setState({visible: true});
    }

    closeModal = () => {
        this.setState({visible: false});
    }

    renderTabBar = (props, DefaultTabBar) => {
        return (
            <div className="login-modal-header">
                <DefaultTabBar className="login-modal-tab" {...props} />
                <div className="login-modal-close" onClick={this.closeModal}>
                    <IconFont type="vc-guanbi" />
                </div>
            </div>
        )
    }

    render() {
        return (
            <div className="loginView">
                <div className="header">
                    <div className="brand-logo">
                        <div className="brand">华域安网</div>
                        <img src={require('../images/Logo_VLAN_White.png')} alt=""/>
                    </div>
                    <div className="header-container">
                        <GlobalHeader left={null} onProfileClick={this.openModal} {...this.props} />
                    </div>
                </div>
                <Modal
                    className="login-modal"
                    width={700}
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.closeModal}
                    footer={null}
                    destroyOnClose
                    centered
                >
                    <Tabs defaultActiveKey="1" renderTabBar={this.renderTabBar}>
                        <TabPane tab="账号密码登录" key="1">
                            <div className="login-modal-panel">
                                <div className="password-panel">
                                    <LoginForm {...this.props} />
                                </div>
                            </div>
                        </TabPane>
                        <TabPane tab="微信登录" key="2">
                        <div className="login-modal-panel">
                            <OtherLogin loginType="weixin" />
                        </div>
                        </TabPane>
                        <TabPane tab="QQ登录" key="3">
                        <div className="login-modal-panel">
                            <OtherLogin loginType="qq" />
                        </div>
                        </TabPane>
                    </Tabs>
                </Modal>
            </div>
        )
    }
}
